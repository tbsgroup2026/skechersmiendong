'use client';

// Sao lưu Excel lên Google Drive (12:00 & 17:00 giờ VN): nhật ký mọi thao tác + dữ liệu hệ thống,
// khôi phục dữ liệu theo bảng từ một bản sao lưu, tra cứu nhật ký thao tác.

import React, { useCallback, useEffect, useState } from 'react';
import { IconAlertTriangle, IconCloudUpload, IconExternalLink, IconFileSpreadsheet, IconLoader2, IconRefresh, IconRestore, IconSearch, IconX } from '@tabler/icons-react';

type Backup = {
  id: string;
  kind: 'SCHEDULED' | 'MANUAL' | 'PRE_RESTORE' | 'RESTORE';
  created_at: string;
  created_by: string | null;
  status: string;
  error: string | null;
  log_rows: number | null;
  log_file_id: string | null;
  log_file_name: string | null;
  data_file_id: string | null;
  data_file_name: string | null;
  table_count: number | null;
  row_count: number | null;
  note: string | null;
};
type ListResp = { items: Backup[]; schedule: string[]; pendingLogs: number; driveConfigured: boolean; canRestore: boolean };
type TableInfo = { table: string; sheet: string; rows: number; columns: string[]; pk: string[]; truncatedRows: number; redactedColumns: string[]; existsNow: boolean };
type RestoreResult = { table: string; ok: boolean; written: number; skipped: number; message: string };
type LogItem = { id: number; at: string; emp_code: string | null; user_name: string | null; role_code: string | null; module: string | null; action: string | null; method: string; path: string; status: number; ip: string | null; detail: string | null };

const KIND_LABEL: Record<Backup['kind'], string> = { SCHEDULED: 'Tự động', MANUAL: 'Thủ công', PRE_RESTORE: 'Bản an toàn trước khôi phục', RESTORE: 'Khôi phục' };
const driveUrl = (id: string) => `https://drive.google.com/file/d/${id}/view`;

async function api<T>(path: string, init?: { method?: string; body?: unknown }): Promise<T> {
  const token = typeof window !== 'undefined' ? localStorage.getItem('tbs_token') || sessionStorage.getItem('tbs_token') : '';
  const res = await fetch(path, {
    method: init?.method || 'GET',
    headers: { ...(init?.body ? { 'Content-Type': 'application/json' } : {}), ...(token ? { Authorization: `Bearer ${token}` } : {}) },
    body: init?.body ? JSON.stringify(init.body) : undefined,
    cache: 'no-store',
  });
  const json = await res.json().catch(() => ({}));
  if (!res.ok) throw new Error(json.message || json.error || `Lỗi máy chủ (${res.status})`);
  return json as T;
}

const card = 'bg-slate-900/80 rounded-2xl p-5 border border-slate-800';
const btn = 'inline-flex items-center justify-center gap-2 rounded-xl px-4 py-2 text-sm font-semibold transition disabled:opacity-50 disabled:cursor-not-allowed';
const input = 'rounded-xl border border-slate-700 bg-slate-950 px-3 py-2 text-sm text-slate-100 outline-none focus:border-blue-500';

export function ExcelBackupView() {
  const [data, setData] = useState<ListResp | null>(null);
  const [loading, setLoading] = useState(false);
  const [running, setRunning] = useState(false);
  const [msg, setMsg] = useState<{ ok: boolean; text: string } | null>(null);
  const [restoreFrom, setRestoreFrom] = useState<Backup | null>(null);

  const load = useCallback(async () => {
    setLoading(true);
    try {
      setData(await api<ListResp>('/api/admin/excel-backup'));
    } catch (e) {
      setMsg({ ok: false, text: (e as Error).message });
    } finally {
      setLoading(false);
    }
  }, []);
  useEffect(() => {
    load();
  }, [load]);

  const runNow = async () => {
    setRunning(true);
    setMsg(null);
    try {
      const r = await api<{ success: boolean; message: string; logRows?: number; tables?: number; rows?: number }>('/api/admin/excel-backup/run', { method: 'POST' });
      setMsg({ ok: r.success, text: r.success ? `Đã sao lưu lên Google Drive: ${r.logRows ?? 0} thao tác, ${r.tables ?? 0} bảng, ${(r.rows ?? 0).toLocaleString('vi-VN')} dòng dữ liệu.` : r.message });
      await load();
    } catch (e) {
      setMsg({ ok: false, text: (e as Error).message });
      await load();
    } finally {
      setRunning(false);
    }
  };

  return (
    <div className="space-y-6">
      <div className={card}>
        <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
          <div className="space-y-1.5">
            <h2 className="flex items-center gap-2 text-xl font-bold text-white">
              <IconFileSpreadsheet className="h-6 w-6 text-emerald-400" /> Sao lưu Excel lên Google Drive
            </h2>
            <p className="max-w-2xl text-sm text-slate-300">
              Mọi thao tác ghi dữ liệu (thời gian, MSNV, họ tên, chức năng, chi tiết) được ghi ngay vào hệ thống. Lúc{' '}
              <b className="text-white">{data?.schedule.join(' và ') || '12:00 và 17:00'}</b> hằng ngày, hệ thống tải lên Drive 2 file Excel: nhật ký thao tác và toàn bộ dữ liệu. Có thể khôi phục từng bảng từ bất kỳ bản sao lưu nào.
            </p>
            {data && (
              <p className="text-xs text-slate-400">
                {data.pendingLogs.toLocaleString('vi-VN')} thao tác chờ lần sao lưu tới · Drive: {data.driveConfigured ? 'đã cấu hình' : 'CHƯA cấu hình'}
              </p>
            )}
          </div>
          <div className="flex gap-2">
            <button type="button" onClick={load} disabled={loading} className={`${btn} border border-slate-700 text-slate-200 hover:bg-slate-800`}>
              <IconRefresh className="h-4 w-4" /> Làm mới
            </button>
            <button type="button" onClick={runNow} disabled={running || !data?.driveConfigured} className={`${btn} bg-emerald-600 text-white hover:bg-emerald-500`}>
              {running ? <IconLoader2 className="h-4 w-4 animate-spin" /> : <IconCloudUpload className="h-4 w-4" />}
              {running ? 'Đang sao lưu...' : 'Sao lưu ngay'}
            </button>
          </div>
        </div>
        {msg && <p className={`mt-3 rounded-xl px-3 py-2 text-sm ${msg.ok ? 'bg-emerald-950 text-emerald-200' : 'bg-rose-950 text-rose-200'}`}>{msg.text}</p>}
      </div>

      <div className={`${card} overflow-x-auto p-0`}>
        <table className="w-full min-w-[900px] text-sm">
          <thead className="bg-slate-950/60 text-left text-xs uppercase tracking-wide text-slate-400">
            <tr>
              <th className="p-3">Thời gian (VN)</th>
              <th className="p-3">Loại</th>
              <th className="p-3">Người thực hiện</th>
              <th className="p-3">Nhật ký thao tác</th>
              <th className="p-3">Dữ liệu hệ thống</th>
              <th className="p-3">Trạng thái</th>
              <th className="p-3" />
            </tr>
          </thead>
          <tbody>
            {!data?.items.length ? (
              <tr>
                <td colSpan={7} className="p-6 text-center text-slate-400">{loading ? 'Đang tải...' : 'Chưa có bản sao lưu Excel nào'}</td>
              </tr>
            ) : (
              data.items.map((b) => (
                <tr key={b.id} className="border-t border-slate-800 align-top text-slate-200">
                  <td className="whitespace-nowrap p-3">{b.created_at}</td>
                  <td className="p-3">{KIND_LABEL[b.kind] || b.kind}</td>
                  <td className="p-3">{b.created_by || '—'}</td>
                  <td className="p-3">
                    {b.log_file_id ? (
                      <a href={driveUrl(b.log_file_id)} target="_blank" rel="noreferrer" className="inline-flex items-center gap-1 text-blue-300 hover:underline">
                        {(b.log_rows ?? 0).toLocaleString('vi-VN')} thao tác <IconExternalLink className="h-3.5 w-3.5" />
                      </a>
                    ) : (
                      '—'
                    )}
                  </td>
                  <td className="p-3">
                    {b.data_file_id ? (
                      <a href={driveUrl(b.data_file_id)} target="_blank" rel="noreferrer" className="inline-flex items-center gap-1 text-blue-300 hover:underline">
                        {b.table_count} bảng · {(b.row_count ?? 0).toLocaleString('vi-VN')} dòng <IconExternalLink className="h-3.5 w-3.5" />
                      </a>
                    ) : (
                      <span className="text-slate-400">{b.note || '—'}</span>
                    )}
                  </td>
                  <td className="p-3">
                    <span className={b.status === 'SUCCESS' ? 'text-emerald-300' : b.status === 'RUNNING' ? 'text-amber-300' : 'text-rose-300'}>
                      {b.status === 'SUCCESS' ? 'Thành công' : b.status === 'RUNNING' ? 'Đang chạy' : b.status === 'PARTIAL' ? 'Một phần' : 'Lỗi'}
                    </span>
                    {b.error && <div className="max-w-xs text-xs text-rose-300">{b.error}</div>}
                  </td>
                  <td className="p-3 text-right">
                    {data.canRestore && b.data_file_id && b.status === 'SUCCESS' && (
                      <button type="button" onClick={() => setRestoreFrom(b)} className={`${btn} border border-amber-600/60 px-3 py-1.5 text-xs text-amber-200 hover:bg-amber-950`}>
                        <IconRestore className="h-4 w-4" /> Khôi phục
                      </button>
                    )}
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>

      <ActivityLog />

      {restoreFrom && <RestoreModal backup={restoreFrom} onClose={() => setRestoreFrom(null)} onDone={load} />}
    </div>
  );
}

function RestoreModal({ backup, onClose, onDone }: { backup: Backup; onClose: () => void; onDone: () => void }) {
  const [tables, setTables] = useState<TableInfo[] | null>(null);
  const [err, setErr] = useState('');
  const [picked, setPicked] = useState<string[]>([]);
  const [filter, setFilter] = useState('');
  const [mode, setMode] = useState<'upsert' | 'replace'>('upsert');
  const [confirm, setConfirm] = useState('');
  const [busy, setBusy] = useState(false);
  const [results, setResults] = useState<RestoreResult[] | null>(null);

  useEffect(() => {
    api<{ tables: TableInfo[] }>(`/api/admin/excel-backup/${encodeURIComponent(backup.id)}/tables`)
      .then((r) => setTables(r.tables))
      .catch((e) => setErr((e as Error).message));
  }, [backup.id]);

  const go = async () => {
    setBusy(true);
    setErr('');
    try {
      const r = await api<{ success: boolean; results?: RestoreResult[]; message?: string }>(`/api/admin/excel-backup/${encodeURIComponent(backup.id)}/restore`, { method: 'POST', body: { tables: picked, mode, confirm } });
      if (r.results) setResults(r.results);
      else setErr(r.message || 'Khôi phục lỗi');
      onDone();
    } catch (e) {
      setErr((e as Error).message);
    } finally {
      setBusy(false);
    }
  };

  const shown = (tables || []).filter((t) => !filter || t.table.toLowerCase().includes(filter.toLowerCase()));
  return (
    <div className="fixed inset-0 z-[80] flex items-end justify-center bg-black/60 p-0 sm:items-center sm:p-4" role="dialog" aria-modal="true" aria-label="Khôi phục dữ liệu">
      <div className="max-h-[92vh] w-full max-w-3xl overflow-y-auto rounded-t-2xl border border-slate-700 bg-slate-900 p-5 text-slate-100 sm:rounded-2xl">
        <div className="flex items-start justify-between gap-3">
          <div>
            <h3 className="text-lg font-bold text-white">Khôi phục dữ liệu từ bản {backup.created_at}</h3>
            <p className="text-xs text-slate-400">{backup.data_file_name}</p>
          </div>
          <button type="button" onClick={onClose} aria-label="Đóng" className="rounded-lg p-1 text-slate-300 hover:bg-slate-800">
            <IconX className="h-5 w-5" />
          </button>
        </div>

        {results ? (
          <div className="mt-4 space-y-2">
            <p className="text-sm text-slate-300">Đã tạo bản sao an toàn của dữ liệu trước khi khôi phục (loại “Bản an toàn trước khôi phục” trong danh sách).</p>
            {results.map((r) => (
              <div key={r.table} className={`rounded-xl px-3 py-2 text-sm ${r.ok ? 'bg-emerald-950 text-emerald-200' : 'bg-rose-950 text-rose-200'}`}>
                <b>{r.table}</b>: {r.ok ? `đã ghi ${r.written.toLocaleString('vi-VN')} dòng` : 'không khôi phục'} · {r.message}
              </div>
            ))}
            <button type="button" onClick={onClose} className={`${btn} mt-2 w-full bg-slate-700 text-white hover:bg-slate-600`}>Đóng</button>
          </div>
        ) : (
          <>
            <div className="mt-4 flex items-start gap-2 rounded-xl border border-amber-700/60 bg-amber-950/60 p-3 text-sm text-amber-100">
              <IconAlertTriangle className="mt-0.5 h-5 w-5 shrink-0" />
              <span>Dữ liệu hiện tại của các bảng được chọn sẽ bị ghi đè. Hệ thống tự sao lưu các bảng này lên Drive trước khi khôi phục; nếu không sao lưu được thì dừng, không ghi gì. Mật khẩu và cột bí mật không được khôi phục (giữ giá trị hiện tại).</span>
            </div>

            {err && <p className="mt-3 rounded-xl bg-rose-950 px-3 py-2 text-sm text-rose-200">{err}</p>}
            {!tables && !err && (
              <p className="mt-4 flex items-center gap-2 text-sm text-slate-300">
                <IconLoader2 className="h-4 w-4 animate-spin" /> Đang đọc file sao lưu từ Drive...
              </p>
            )}

            {tables && (
              <>
                <div className="mt-4 flex flex-wrap items-center gap-2">
                  <input value={filter} onChange={(e) => setFilter(e.target.value)} placeholder="Lọc tên bảng..." className={`${input} flex-1`} aria-label="Lọc tên bảng" />
                  <span className="text-xs text-slate-400">Đã chọn {picked.length}</span>
                </div>
                <div className="mt-2 max-h-72 overflow-y-auto rounded-xl border border-slate-800">
                  {shown.map((t) => (
                    <label key={t.table} className="flex cursor-pointer items-center gap-3 border-b border-slate-800 px-3 py-2 text-sm last:border-0 hover:bg-slate-800/60">
                      <input type="checkbox" checked={picked.includes(t.table)} onChange={(e) => setPicked((p) => (e.target.checked ? [...p, t.table] : p.filter((x) => x !== t.table)))} />
                      <span className="flex-1 font-mono text-slate-100">{t.table}</span>
                      <span className="text-xs text-slate-400">
                        {t.rows.toLocaleString('vi-VN')} dòng{t.pk.length ? '' : ' · không có khóa chính'}
                        {t.truncatedRows ? ` · ${t.truncatedRows} dòng bị cắt` : ''}
                        {!t.existsNow ? ' · bảng không còn trong hệ thống' : ''}
                      </span>
                    </label>
                  ))}
                </div>

                <fieldset className="mt-4 space-y-2 text-sm">
                  <legend className="mb-1 font-semibold text-slate-200">Cách khôi phục</legend>
                  <label className="flex items-start gap-2">
                    <input type="radio" name="mode" checked={mode === 'upsert'} onChange={() => setMode('upsert')} className="mt-1" />
                    <span>
                      <b>Ghi đè dòng trùng</b> (khuyên dùng): dòng có trong bản sao lưu được đưa về giá trị lúc sao lưu; dòng tạo sau đó được giữ nguyên.
                    </span>
                  </label>
                  <label className="flex items-start gap-2">
                    <input type="radio" name="mode" checked={mode === 'replace'} onChange={() => setMode('replace')} className="mt-1" />
                    <span>
                      <b>Thay toàn bộ bảng</b>: xóa hết dữ liệu hiện tại của bảng rồi nạp đúng bản sao lưu. Dữ liệu tạo sau thời điểm sao lưu sẽ mất.
                    </span>
                  </label>
                </fieldset>

                <label className="mt-4 block space-y-1 text-sm">
                  <span className="font-semibold text-slate-200">
                    Gõ <b className="text-amber-300">KHOI PHUC</b> để xác nhận
                  </span>
                  <input value={confirm} onChange={(e) => setConfirm(e.target.value)} className={`${input} w-full`} />
                </label>

                <div className="mt-5 flex gap-2">
                  <button type="button" onClick={onClose} className={`${btn} flex-1 border border-slate-700 text-slate-200 hover:bg-slate-800`}>Hủy</button>
                  <button type="button" onClick={go} disabled={busy || !picked.length || confirm.trim().toUpperCase() !== 'KHOI PHUC'} className={`${btn} flex-1 bg-amber-600 text-white hover:bg-amber-500`}>
                    {busy ? <IconLoader2 className="h-4 w-4 animate-spin" /> : <IconRestore className="h-4 w-4" />}
                    {busy ? 'Đang khôi phục...' : `Khôi phục ${picked.length} bảng`}
                  </button>
                </div>
              </>
            )}
          </>
        )}
      </div>
    </div>
  );
}

function ActivityLog() {
  const [items, setItems] = useState<LogItem[]>([]);
  const [total, setTotal] = useState(0);
  const [page, setPage] = useState(1);
  const [filters, setFilters] = useState({ from: '', to: '', emp: '', q: '' });
  const [applied, setApplied] = useState(filters);
  const [loading, setLoading] = useState(false);
  const [err, setErr] = useState('');
  const [open, setOpen] = useState<number | null>(null);

  useEffect(() => {
    let alive = true;
    setLoading(true);
    setErr('');
    const qs = new URLSearchParams({ page: String(page) });
    Object.entries(applied).forEach(([k, v]) => v && qs.set(k, v));
    api<{ items: LogItem[]; total: number }>(`/api/admin/activity?${qs}`)
      .then((r) => {
        if (!alive) return;
        setItems(r.items);
        setTotal(r.total);
      })
      .catch((e) => alive && setErr((e as Error).message))
      .finally(() => alive && setLoading(false));
    return () => {
      alive = false;
    };
  }, [applied, page]);

  const set = (k: keyof typeof filters, v: string) => setFilters((f) => ({ ...f, [k]: v }));
  const pages = Math.max(1, Math.ceil(total / 50));
  return (
    <div className={card}>
      <h2 className="text-lg font-bold text-white">Nhật ký thao tác (thời gian thực)</h2>
      <form
        className="mt-3 flex flex-wrap items-end gap-2"
        onSubmit={(e) => {
          e.preventDefault();
          setPage(1);
          setApplied(filters);
        }}
      >
        <label className="space-y-1 text-xs text-slate-300">
          <span className="block">Từ ngày</span>
          <input type="date" value={filters.from} onChange={(e) => set('from', e.target.value)} className={input} />
        </label>
        <label className="space-y-1 text-xs text-slate-300">
          <span className="block">Đến ngày</span>
          <input type="date" value={filters.to} onChange={(e) => set('to', e.target.value)} className={input} />
        </label>
        <label className="space-y-1 text-xs text-slate-300">
          <span className="block">MSNV</span>
          <input value={filters.emp} onChange={(e) => set('emp', e.target.value.toUpperCase())} className={`${input} w-32`} />
        </label>
        <label className="flex-1 space-y-1 text-xs text-slate-300">
          <span className="block">Từ khóa (thao tác, chức năng, nội dung)</span>
          <input value={filters.q} onChange={(e) => set('q', e.target.value)} className={`${input} w-full`} />
        </label>
        <button type="submit" disabled={loading} className={`${btn} bg-blue-600 text-white hover:bg-blue-500`}>
          <IconSearch className="h-4 w-4" /> Tìm
        </button>
      </form>
      {err && <p className="mt-3 rounded-xl bg-rose-950 px-3 py-2 text-sm text-rose-200">{err}</p>}
      <div className="mt-3 overflow-x-auto">
        <table className="w-full min-w-[860px] text-sm">
          <thead className="text-left text-xs uppercase tracking-wide text-slate-400">
            <tr>
              <th className="p-2">Thời gian</th>
              <th className="p-2">Người dùng</th>
              <th className="p-2">Chức năng</th>
              <th className="p-2">Thao tác</th>
              <th className="p-2">Kết quả</th>
            </tr>
          </thead>
          <tbody>
            {!items.length ? (
              <tr>
                <td colSpan={5} className="p-4 text-center text-slate-400">{loading ? 'Đang tải...' : 'Chưa có thao tác nào'}</td>
              </tr>
            ) : (
              items.map((it) => (
                <React.Fragment key={it.id}>
                  <tr className="cursor-pointer border-t border-slate-800 text-slate-200 hover:bg-slate-800/50" onClick={() => setOpen(open === it.id ? null : it.id)} aria-expanded={open === it.id}>
                    <td className="whitespace-nowrap p-2">{it.at}</td>
                    <td className="p-2">
                      {it.user_name || '—'} <span className="text-xs text-slate-400">{it.emp_code}</span>
                    </td>
                    <td className="p-2">{it.module}</td>
                    <td className="p-2">{it.action}</td>
                    <td className={`p-2 ${it.status < 400 ? 'text-emerald-300' : 'text-rose-300'}`}>{it.status < 400 ? 'Thành công' : `Lỗi ${it.status}`}</td>
                  </tr>
                  {open === it.id && (
                    <tr className="bg-slate-950/60">
                      <td colSpan={5} className="p-3 text-xs text-slate-300">
                        <div>
                          {it.method} {it.path} · IP {it.ip || '—'} · Vai trò {it.role_code || '—'}
                        </div>
                        {it.detail && <pre className="mt-1 max-h-48 overflow-auto whitespace-pre-wrap break-all">{it.detail}</pre>}
                      </td>
                    </tr>
                  )}
                </React.Fragment>
              ))
            )}
          </tbody>
        </table>
      </div>
      <div className="mt-3 flex items-center justify-between text-xs text-slate-400">
        <span>{total.toLocaleString('vi-VN')} thao tác</span>
        <div className="flex items-center gap-2">
          <button type="button" disabled={page <= 1 || loading} onClick={() => setPage((p) => p - 1)} className={`${btn} border border-slate-700 px-3 py-1 text-slate-200`}>Trước</button>
          <span>
            Trang {page}/{pages}
          </span>
          <button type="button" disabled={page >= pages || loading} onClick={() => setPage((p) => p + 1)} className={`${btn} border border-slate-700 px-3 py-1 text-slate-200`}>Sau</button>
        </div>
      </div>
    </div>
  );
}
