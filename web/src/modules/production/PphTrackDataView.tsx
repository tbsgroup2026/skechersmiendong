'use client';

import { useCallback, useEffect, useState } from 'react';
import { IconArrowLeft, IconDatabase, IconPlus, IconRefresh } from '@tabler/icons-react';

// Xem, thêm, sửa, xoá số Theo dõi chuyền theo ngày. Dùng ở Cài Đặt (toàn bộ) và trang riêng
// /pph-track-admin (theo Line). Mọi API ở đây đều bắt đăng nhập.
type Entry = {
  team_id: string;
  point: string;
  slot: string;
  size: string | null;
  qty: number;
  defect_type: string | null;
  worker_count: number | null;
  work_hours: number | null;
  submitted_by: string | null;
  submitted_at: string;
};
type Setup = {
  team_id: string;
  point: string;
  shift_hours: number;
  worker_count: number;
  planned_qty: number;
  model: string;
  color: string;
  size: string;
  plan_pph: number | null;
  submitted_by: string;
  submitted_at: string;
};
type HourGroup = { key: string; teamId: string; point: string; slot: string; rows: Entry[] };
type DefectRow = { size: string; defectType: string; qty: string };
type HourForm = { isNew: boolean; team: string; point: string; slot: string; qty: string; workerCount: string; workHours: string; rows: DefectRow[] };
type SetupForm = { isNew: boolean; team: string; point: string; shiftHours: string; workerCount: string; plannedQty: string; model: string; color: string; size: string; planPph: string };

const POINT_LABEL: Record<string, string> = { khutaptrung: 'Tập trung', dauvao: 'Đầu vào', daura: 'Đầu ra / QC' };
const POINTS = Object.keys(POINT_LABEL);
const EDITOR_KEY = 'pph_track_admin_editor';
const todayVN = () => new Date(Date.now() + 7 * 3600000).toISOString().slice(0, 10);
const timeVN = (iso: string) => new Date(new Date(iso).getTime() + 7 * 3600000).toISOString().slice(11, 16);

// Đầu ra và QC cùng 1 form nên gộp thành 1 giờ, xoá thì xoá cả số đạt lẫn dòng lỗi của giờ đó.
function groupHours(entries: Entry[]): HourGroup[] {
  const groups = new Map<string, HourGroup>();
  for (const row of entries) {
    const point = row.point === 'qc' ? 'daura' : row.point;
    const key = `${row.team_id}|${point}|${row.slot}`;
    const group = groups.get(key) || { key, teamId: row.team_id, point, slot: row.slot, rows: [] };
    group.rows.push(row);
    groups.set(key, group);
  }
  return Array.from(groups.values());
}

export default function PphTrackDataView({ onBack, lineId }: { onBack?: () => void; lineId?: string }) {
  const [date, setDate] = useState(todayVN());
  const [entries, setEntries] = useState<Entry[]>([]);
  const [setups, setSetups] = useState<Setup[]>([]);
  const [teamNames, setTeamNames] = useState<Record<string, string>>({});
  const [teamIds, setTeamIds] = useState<string[]>([]);
  const [slots, setSlots] = useState<string[]>([]);
  const [defectTypes, setDefectTypes] = useState<string[]>([]);
  const [lineName, setLineName] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);
  const [needLogin, setNeedLogin] = useState(false);
  const [forbidden, setForbidden] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [editor, setEditor] = useState('');
  const [hourForm, setHourForm] = useState<HourForm | null>(null);
  const [setupForm, setSetupForm] = useState<SetupForm | null>(null);
  // Xoá phải bấm 2 lần: lần đầu chỉ đổi nút sang trạng thái xác nhận.
  const [confirmKey, setConfirmKey] = useState('');
  const [busy, setBusy] = useState(false);

  useEffect(() => {
    try {
      setEditor(window.localStorage.getItem(EDITOR_KEY) || '');
    } catch {}
  }, []);

  const load = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      const query = `date=${date}${lineId ? `&lineId=${encodeURIComponent(lineId)}` : ''}`;
      const response = await fetch(`/api/pph-track/admin-data?${query}`, { cache: 'no-store' });
      if (response.status === 401) {
        setNeedLogin(true);
        return;
      }
      if (response.status === 403) {
        setForbidden(true);
        return;
      }
      const res = await response.json();
      if (!res.success) throw new Error(res.message || res.error || 'Không tải được dữ liệu');
      setNeedLogin(false);
      setEntries(res.entries);
      setSetups(res.setups);
      setTeamNames(res.teamNames);
      setTeamIds(res.teamIds);
      setSlots(res.slots);
      setDefectTypes(res.defectTypes);
      setLineName(res.lineName);
    } catch (e) {
      setError(e instanceof Error ? e.message : 'Không tải được dữ liệu');
    } finally {
      setLoading(false);
    }
  }, [date, lineId]);

  useEffect(() => {
    load();
  }, [load]);

  async function send(url: string, method: string, body?: unknown): Promise<boolean> {
    setBusy(true);
    setError(null);
    try {
      const response = await fetch(url, {
        method,
        headers: body ? { 'Content-Type': 'application/json' } : undefined,
        body: body ? JSON.stringify(body) : undefined,
      });
      if (response.status === 401) {
        setNeedLogin(true);
        return false;
      }
      if (response.status === 403) {
        setForbidden(true);
        return false;
      }
      const res = await response.json();
      if (!res.success) throw new Error(res.message || res.error || 'Không lưu được');
      await load();
      return true;
    } catch (e) {
      setError(e instanceof Error ? e.message : 'Không lưu được');
      return false;
    } finally {
      setBusy(false);
    }
  }

  async function remove(key: string, url: string) {
    if (confirmKey !== key) {
      setConfirmKey(key);
      return;
    }
    if (await send(url, 'DELETE')) setConfirmKey('');
  }

  function rememberEditor() {
    try {
      window.localStorage.setItem(EDITOR_KEY, editor.trim());
    } catch {}
  }

  async function saveHour(e: React.FormEvent) {
    e.preventDefault();
    if (!hourForm) return;
    rememberEditor();
    const isOutput = hourForm.point === 'daura';
    const ok = await send('/api/pph-track/admin-hour', 'PUT', {
      team: hourForm.team,
      point: hourForm.point,
      slot: hourForm.slot,
      date,
      submittedBy: editor,
      qty: hourForm.qty,
      workerCount: isOutput ? hourForm.workerCount : undefined,
      workHours: isOutput ? hourForm.workHours : undefined,
      rows: isOutput ? hourForm.rows : [],
    });
    if (ok) setHourForm(null);
  }

  async function saveSetup(e: React.FormEvent) {
    e.preventDefault();
    if (!setupForm) return;
    rememberEditor();
    const ok = await send('/api/pph-track/admin-setup', 'POST', { ...setupForm, date, submittedBy: editor });
    if (ok) setSetupForm(null);
  }

  const q = (teamId: string, point: string) => `team=${encodeURIComponent(teamId)}&point=${point}&date=${date}`;
  const th = 'px-2 py-2 text-left text-[11px] font-black uppercase text-slate-500 whitespace-nowrap';
  const td = 'px-2 py-2 text-sm text-slate-800 whitespace-nowrap';
  const input = 'w-full rounded-lg border border-slate-200 bg-white px-3 py-2 text-sm font-semibold focus:outline-none focus:border-[#006838]';
  const labelCls = 'block space-y-1 text-xs font-bold text-slate-600';
  const btn = 'min-h-[36px] rounded-lg border px-3 text-xs font-bold disabled:opacity-50';
  const primary = 'min-h-[40px] rounded-lg bg-[#006838] px-4 text-sm font-black text-white disabled:opacity-50';
  const deleteButton = (key: string, url: string, label: string) => (
    <button
      type="button"
      disabled={busy}
      aria-label={label}
      onClick={() => remove(key, url)}
      className={`${btn} ${confirmKey === key ? 'border-rose-600 bg-rose-600 text-white' : 'border-rose-200 text-rose-700 hover:bg-rose-50'}`}
    >
      {confirmKey === key ? 'Bấm lần nữa để xoá' : 'Xoá'}
    </button>
  );
  const editButton = (label: string, onClick: () => void) => (
    <button type="button" aria-label={label} onClick={onClick} className={`${btn} mr-1.5 border-slate-200 text-emerald-700 hover:bg-emerald-50`}>
      Sửa
    </button>
  );
  const teamName = (id: string) => teamNames[id] || id;
  const hours = groupHours(entries);
  const hourExists = hourForm?.isNew && hours.some((h) => h.teamId === hourForm.team && h.point === hourForm.point && h.slot === hourForm.slot);
  const setupExists = setupForm?.isNew && setups.some((s) => s.team_id === setupForm.team && s.point === setupForm.point);

  if (forbidden) {
    return (
      <div className="mx-auto mt-20 max-w-sm rounded-2xl border border-slate-200 bg-white p-6 text-center shadow-sm">
        <h1 className="text-lg font-black">Không có quyền truy cập</h1>
        <p className="mt-2 text-sm text-slate-600">Tài khoản này không được xem màn quản trị dữ liệu.</p>
        {onBack && <button type="button" onClick={onBack} className="mt-4 rounded-lg border border-slate-200 px-4 py-2.5 text-sm font-bold text-slate-600">Quay lại</button>}
      </div>
    );
  }

  if (needLogin) {
    return (
      <div className="mx-auto mt-20 max-w-sm rounded-2xl border border-slate-200 bg-white p-6 text-center shadow-sm">
        <h1 className="text-lg font-black">Cần đăng nhập</h1>
        <p className="mt-2 text-sm text-slate-600">Đăng nhập tài khoản rồi mở lại link này để quản trị dữ liệu.</p>
        <a href="/login" className="mt-4 inline-block rounded-lg bg-[#006838] px-4 py-2.5 text-sm font-black text-white">Đăng nhập</a>
      </div>
    );
  }

  return (
    <div className="space-y-5 my-auto">
      <div className="flex flex-wrap items-center gap-3">
        {onBack && (
          <button type="button" onClick={onBack} title="Về Cài Đặt" className="w-10 h-10 rounded-xl bg-white border border-slate-200 text-slate-500 hover:bg-slate-50 flex items-center justify-center flex-shrink-0">
            <IconArrowLeft size={18} />
          </button>
        )}
        <h2 className="flex-1 text-xl font-black text-slate-900 flex items-center gap-2">
          <IconDatabase size={22} className="text-[#006838]" /> Quản trị dữ liệu{lineName ? ` — ${lineName}` : ' Theo dõi chuyền'}
        </h2>
        <label className="text-sm font-bold text-slate-600">
          Ngày{' '}
          <input type="date" value={date} max={todayVN()} onChange={(e) => e.target.value && setDate(e.target.value)} className="rounded-xl border border-slate-200 px-3 py-2 text-sm" />
        </label>
        <button type="button" onClick={load} className="flex items-center gap-1.5 px-4 py-2.5 rounded-xl bg-white border border-slate-200 text-sm font-bold text-slate-600 hover:bg-slate-50">
          <IconRefresh size={16} /> Tải lại
        </button>
      </div>

      {error && <p role="alert" className="rounded-xl bg-rose-50 border border-rose-200 px-4 py-3 text-sm font-semibold text-rose-700">{error}</p>}
      {loading && <p className="text-sm font-semibold text-slate-400">Đang tải...</p>}

      <section className="bg-white rounded-2xl border border-slate-200 shadow-sm p-4">
        <div className="mb-2 flex items-center justify-between gap-2">
          <h3 className="font-black text-slate-900">Đầu ca ({setups.length})</h3>
          <button
            type="button"
            onClick={() => setSetupForm({ isNew: true, team: teamIds[0] || '', point: 'daura', shiftHours: '8', workerCount: '', plannedQty: '', model: '', color: '', size: '', planPph: '' })}
            className={`${btn} flex items-center gap-1 border-slate-200 text-emerald-700 hover:bg-emerald-50`}
          >
            <IconPlus size={14} /> Thêm đầu ca
          </button>
        </div>
        {setupForm && (
          <form onSubmit={saveSetup} className="mb-3 grid grid-cols-2 gap-2 rounded-xl bg-slate-50 p-3 md:grid-cols-4">
            <label className={labelCls}>Tổ
              <select disabled={!setupForm.isNew} value={setupForm.team} onChange={(e) => setSetupForm({ ...setupForm, team: e.target.value })} className={input}>
                {teamIds.map((id) => <option key={id} value={id}>{teamName(id)}</option>)}
              </select>
            </label>
            <label className={labelCls}>Trạm
              <select disabled={!setupForm.isNew} value={setupForm.point} onChange={(e) => setSetupForm({ ...setupForm, point: e.target.value })} className={input}>
                {POINTS.map((p) => <option key={p} value={p}>{POINT_LABEL[p]}</option>)}
              </select>
            </label>
            <label className={labelCls}>Số giờ ca
              <input required type="number" min={0.5} max={24} step="any" value={setupForm.shiftHours} onChange={(e) => setSetupForm({ ...setupForm, shiftHours: e.target.value })} className={input} />
            </label>
            <label className={labelCls}>Công nhân
              <input required type="number" min={1} max={1000} value={setupForm.workerCount} onChange={(e) => setSetupForm({ ...setupForm, workerCount: e.target.value })} className={input} />
            </label>
            <label className={labelCls}>Kế hoạch cả ca
              <input required type="number" min={1} value={setupForm.plannedQty} onChange={(e) => setSetupForm({ ...setupForm, plannedQty: e.target.value })} className={input} />
            </label>
            <label className={labelCls}>Mã giày
              <input required value={setupForm.model} onChange={(e) => setSetupForm({ ...setupForm, model: e.target.value })} className={input} />
            </label>
            <label className={labelCls}>Màu
              <input required value={setupForm.color} onChange={(e) => setSetupForm({ ...setupForm, color: e.target.value })} className={input} />
            </label>
            <label className={labelCls}>Size
              <input required value={setupForm.size} onChange={(e) => setSetupForm({ ...setupForm, size: e.target.value })} className={input} />
            </label>
            {setupForm.point === 'daura' && (() => {
              // PPH kế hoạch tự tính = Kế hoạch cả ca / (Công nhân × Số giờ ca), server tính lại khi lưu.
              const h = Number(setupForm.shiftHours);
              const w = Number(setupForm.workerCount);
              const p = Number(setupForm.plannedQty);
              const pph = h > 0 && w > 0 && p > 0 ? Math.round((p / (w * h)) * 100) / 100 : null;
              return (
                <div className={labelCls}>PPH kế hoạch (tự tính)
                  <div className={`${input} bg-amber-50 font-bold text-amber-700`}>{pph == null ? '—' : pph.toLocaleString('vi-VN')}</div>
                </div>
              );
            })()}
            <label className={labelCls}>Người sửa
              <input required value={editor} onChange={(e) => setEditor(e.target.value)} className={input} />
            </label>
            {setupExists && <p role="status" className="col-span-full text-xs font-bold text-amber-700">Tổ và trạm này đã có đầu ca, lưu sẽ thay thế.</p>}
            <div className="col-span-full flex gap-2">
              <button type="submit" disabled={busy} className={primary}>Lưu đầu ca</button>
              <button type="button" onClick={() => setSetupForm(null)} className={`${btn} border-slate-200 text-slate-600`}>Huỷ</button>
            </div>
          </form>
        )}
        {setups.length === 0 ? (
          <p className="text-sm text-slate-500">Ngày này chưa có đầu ca.</p>
        ) : (
          <div className="overflow-x-auto">
            <table className="min-w-full border-collapse">
              <thead>
                <tr className="border-b border-slate-200">
                  {['Tổ', 'Trạm', 'Giờ ca', 'Công nhân', 'Kế hoạch', 'Mã / Màu / Size', 'PPH KH', 'Người nhập', ''].map((h) => (
                    <th key={h} className={th}>{h}</th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {setups.map((s) => {
                  const key = `setup|${s.team_id}|${s.point}`;
                  const station = POINT_LABEL[s.point] || s.point;
                  return (
                    <tr key={key} className="border-b border-slate-100">
                      <td className={td}>{teamName(s.team_id)}</td>
                      <td className={td}>{station}</td>
                      <td className={td}>{s.shift_hours}</td>
                      <td className={td}>{s.worker_count}</td>
                      <td className={td}>{s.planned_qty}</td>
                      <td className={td}>{s.model} / {s.color} / {s.size}</td>
                      <td className={td}>{s.plan_pph ?? '–'}</td>
                      <td className={td}>{s.submitted_by} · {timeVN(s.submitted_at)}</td>
                      <td className={td}>
                        {editButton(`Sửa đầu ca ${teamName(s.team_id)} ${station}`, () =>
                          setSetupForm({
                            isNew: false,
                            team: s.team_id,
                            point: s.point,
                            shiftHours: String(s.shift_hours),
                            workerCount: String(s.worker_count),
                            plannedQty: String(s.planned_qty),
                            model: s.model,
                            color: s.color,
                            size: s.size,
                            planPph: s.plan_pph != null ? String(s.plan_pph) : '',
                          }),
                        )}
                        {deleteButton(key, `/api/pph-track/setup?${q(s.team_id, s.point)}`, `Xoá đầu ca ${teamName(s.team_id)} ${station}`)}
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        )}
      </section>

      <section className="bg-white rounded-2xl border border-slate-200 shadow-sm p-4">
        <div className="mb-2 flex items-center justify-between gap-2">
          <h3 className="font-black text-slate-900">Số liệu theo giờ ({hours.length})</h3>
          <button
            type="button"
            onClick={() => setHourForm({ isNew: true, team: teamIds[0] || '', point: 'daura', slot: slots[0] || '', qty: '', workerCount: '', workHours: '1', rows: [] })}
            className={`${btn} flex items-center gap-1 border-slate-200 text-emerald-700 hover:bg-emerald-50`}
          >
            <IconPlus size={14} /> Thêm số giờ
          </button>
        </div>
        {hourForm && (
          <form onSubmit={saveHour} className="mb-3 grid grid-cols-2 gap-2 rounded-xl bg-slate-50 p-3 md:grid-cols-4">
            <label className={labelCls}>Tổ
              <select disabled={!hourForm.isNew} value={hourForm.team} onChange={(e) => setHourForm({ ...hourForm, team: e.target.value })} className={input}>
                {teamIds.map((id) => <option key={id} value={id}>{teamName(id)}</option>)}
              </select>
            </label>
            <label className={labelCls}>Trạm
              <select disabled={!hourForm.isNew} value={hourForm.point} onChange={(e) => setHourForm({ ...hourForm, point: e.target.value })} className={input}>
                {POINTS.map((p) => <option key={p} value={p}>{POINT_LABEL[p]}</option>)}
              </select>
            </label>
            <label className={labelCls}>Giờ
              <select disabled={!hourForm.isNew} value={hourForm.slot} onChange={(e) => setHourForm({ ...hourForm, slot: e.target.value })} className={input}>
                {slots.map((s) => <option key={s} value={s}>{s}</option>)}
              </select>
            </label>
            <label className={labelCls}>{hourForm.point === 'daura' ? 'Đầu ra đạt chất lượng' : 'Sản lượng'}
              <input required type="number" min={0} value={hourForm.qty} onChange={(e) => setHourForm({ ...hourForm, qty: e.target.value })} className={input} />
            </label>
            {hourForm.point === 'daura' && (
              <>
                <label className={labelCls}>Số lao động
                  <input required type="number" min={1} max={1000} value={hourForm.workerCount} onChange={(e) => setHourForm({ ...hourForm, workerCount: e.target.value })} className={input} />
                </label>
                <label className={labelCls}>Giờ làm thực tế
                  <input required type="number" min={0} max={24} step="any" value={hourForm.workHours} onChange={(e) => setHourForm({ ...hourForm, workHours: e.target.value })} className={input} />
                </label>
              </>
            )}
            <label className={labelCls}>Người sửa
              <input required value={editor} onChange={(e) => setEditor(e.target.value)} className={input} />
            </label>
            {hourForm.point === 'daura' && (
              <div className="col-span-full space-y-2">
                {hourForm.rows.map((row, i) => {
                  const setRow = (patch: Partial<DefectRow>) => setHourForm({ ...hourForm, rows: hourForm.rows.map((r, k) => (k === i ? { ...r, ...patch } : r)) });
                  return (
                    <div key={i} className="grid grid-cols-[1fr_2fr_1fr_auto] items-end gap-2 rounded-lg bg-rose-50 p-2">
                      <label className={labelCls}>Size lỗi
                        <input required value={row.size} onChange={(e) => setRow({ size: e.target.value })} className={input} />
                      </label>
                      <label className={labelCls}>Loại lỗi
                        <select required value={row.defectType} onChange={(e) => setRow({ defectType: e.target.value })} className={input}>
                          <option value="">Chọn</option>
                          {defectTypes.map((d) => <option key={d} value={d}>{d}</option>)}
                        </select>
                      </label>
                      <label className={labelCls}>Số lỗi
                        <input required type="number" min={1} value={row.qty} onChange={(e) => setRow({ qty: e.target.value })} className={input} />
                      </label>
                      <button type="button" onClick={() => setHourForm({ ...hourForm, rows: hourForm.rows.filter((_, k) => k !== i) })} className={`${btn} border-rose-200 text-rose-700`}>Bỏ</button>
                    </div>
                  );
                })}
                <button type="button" onClick={() => setHourForm({ ...hourForm, rows: [...hourForm.rows, { size: '', defectType: '', qty: '' }] })} className={`${btn} border-rose-200 text-rose-700`}>
                  Thêm dòng lỗi
                </button>
              </div>
            )}
            {hourExists && <p role="status" className="col-span-full text-xs font-bold text-amber-700">Giờ này đã có số, lưu sẽ thay thế.</p>}
            <div className="col-span-full flex gap-2">
              <button type="submit" disabled={busy} className={primary}>Lưu số giờ</button>
              <button type="button" onClick={() => setHourForm(null)} className={`${btn} border-slate-200 text-slate-600`}>Huỷ</button>
            </div>
          </form>
        )}
        {hours.length === 0 ? (
          <p className="text-sm text-slate-500">Ngày này chưa có số liệu.</p>
        ) : (
          <div className="overflow-x-auto">
            <table className="min-w-full border-collapse">
              <thead>
                <tr className="border-b border-slate-200">
                  {['Tổ', 'Trạm', 'Giờ', 'Sản lượng', 'Lao động', 'Giờ làm', 'Lỗi', 'Người nhập', ''].map((h) => (
                    <th key={h} className={th}>{h}</th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {hours.map((h) => {
                  const output = h.rows.filter((r) => r.point !== 'qc');
                  const main = output[0];
                  const defects = h.rows.filter((r) => r.point === 'qc');
                  const latest = h.rows[h.rows.length - 1];
                  const qty = output.reduce((sum, r) => sum + r.qty, 0);
                  const station = POINT_LABEL[h.point] || h.point;
                  return (
                    <tr key={h.key} className="border-b border-slate-100">
                      <td className={td}>{teamName(h.teamId)}</td>
                      <td className={td}>{station}</td>
                      <td className={`${td} font-black`}>{h.slot}</td>
                      <td className={`${td} font-black`}>{qty}</td>
                      <td className={td}>{main?.worker_count ?? '–'}</td>
                      <td className={td}>{main?.work_hours ?? '–'}</td>
                      <td className={td}>{defects.length ? defects.map((r) => `${r.defect_type} (size ${r.size}): ${r.qty}`).join('; ') : '–'}</td>
                      <td className={td}>{latest.submitted_by} · {timeVN(latest.submitted_at)}</td>
                      <td className={td}>
                        {editButton(`Sửa ${teamName(h.teamId)} ${station} giờ ${h.slot}`, () =>
                          setHourForm({
                            isNew: false,
                            team: h.teamId,
                            point: h.point,
                            slot: h.slot,
                            qty: String(qty),
                            workerCount: main?.worker_count != null ? String(main.worker_count) : '',
                            workHours: main?.work_hours != null ? String(main.work_hours) : '1',
                            rows: defects.map((r) => ({ size: r.size || '', defectType: r.defect_type || '', qty: String(r.qty) })),
                          }),
                        )}
                        {deleteButton(h.key, `/api/pph-track/scan?${q(h.teamId, h.point)}&slot=${encodeURIComponent(h.slot)}`, `Xoá ${teamName(h.teamId)} ${station} giờ ${h.slot}`)}
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        )}
      </section>
    </div>
  );
}
