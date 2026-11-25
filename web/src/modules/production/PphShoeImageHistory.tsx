'use client';

import { useEffect, useMemo, useState } from 'react';
import { IconHistory, IconSearch } from '@tabler/icons-react';

type ShoeImageLog = {
  id: number;
  code: string;
  color: string | null;
  imageUrl: string;
  action: 'THEM' | 'THAY' | 'XOA' | string;
  by: string | null;
  createdAt: string;
};

const ACTION_LABEL: Record<string, { text: string; cls: string }> = {
  THEM: { text: 'Tải mới', cls: 'bg-emerald-50 text-emerald-700 border-emerald-200' },
  THAY: { text: 'Thay ảnh', cls: 'bg-sky-50 text-sky-700 border-sky-200' },
  XOA: { text: 'Xoá', cls: 'bg-rose-50 text-rose-700 border-rose-200' },
};

function formatTime(iso: string) {
  const d = new Date(iso);
  if (Number.isNaN(d.getTime())) return iso;
  return d.toLocaleString('vi-VN', { timeZone: 'Asia/Ho_Chi_Minh', hour12: false });
}

// Lịch sử tải / thay / xoá ảnh giày: ảnh cũ được giữ lại, lọc được theo mã và màu. Đọc từ GET /api/pph/shoe-image-log.
export default function PphShoeImageHistory() {
  const [logs, setLogs] = useState<ShoeImageLog[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [codeFilter, setCodeFilter] = useState('');
  const [colorFilter, setColorFilter] = useState('');

  useEffect(() => {
    let cancelled = false;
    fetch('/api/pph/shoe-image-log')
      .then((r) => r.json())
      .then((res) => {
        if (cancelled) return;
        if (res.success) setLogs(res.logs || []);
        else setError(res.error || 'Không tải được lịch sử ảnh');
      })
      .catch(() => {
        if (!cancelled) setError('Không kết nối được tới hệ thống');
      })
      .finally(() => {
        if (!cancelled) setLoading(false);
      });
    return () => {
      cancelled = true;
    };
  }, []);

  const filtered = useMemo(() => {
    const c = codeFilter.trim().toLowerCase();
    const k = colorFilter.trim().toLowerCase();
    return logs.filter(
      (l) =>
        (!c || l.code.toLowerCase().includes(c)) && (!k || (l.color || '').toLowerCase().includes(k)),
    );
  }, [logs, codeFilter, colorFilter]);

  return (
    <section className="rounded-2xl bg-white border border-slate-200/80 shadow-sm p-4 space-y-4">
      <div className="flex items-center gap-2">
        <IconHistory size={18} className="text-[#006838]" />
        <h3 className="text-base font-black text-slate-900">Lịch sử ảnh giày (mã · màu)</h3>
        <span className="text-xs text-slate-400 font-semibold">Ảnh cũ được giữ lại tại đây</span>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
        <div className="relative">
          <IconSearch size={15} className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
          <input
            value={codeFilter}
            onChange={(e) => setCodeFilter(e.target.value)}
            placeholder="Lọc theo mã giày"
            className="w-full pl-9 pr-3 py-2 bg-slate-50 border border-slate-200 rounded-xl text-sm font-semibold focus:outline-none focus:border-[#006838]"
          />
        </div>
        <div className="relative">
          <IconSearch size={15} className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
          <input
            value={colorFilter}
            onChange={(e) => setColorFilter(e.target.value)}
            placeholder="Lọc theo màu giày"
            className="w-full pl-9 pr-3 py-2 bg-slate-50 border border-slate-200 rounded-xl text-sm font-semibold focus:outline-none focus:border-[#006838]"
          />
        </div>
      </div>

      {error && <div className="p-3 rounded-xl bg-rose-50 border border-rose-200 text-rose-700 text-sm font-semibold">⚠️ {error}</div>}

      {loading ? (
        <div className="p-8 text-center text-sm text-slate-400">Đang tải...</div>
      ) : (
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="text-left text-xs uppercase tracking-wide text-slate-500 border-b border-slate-200">
                <th className="py-2 pr-3 font-black">Thời gian</th>
                <th className="py-2 pr-3 font-black">Mã giày</th>
                <th className="py-2 pr-3 font-black">Màu</th>
                <th className="py-2 pr-3 font-black">Thao tác</th>
                <th className="py-2 pr-3 font-black">Người thao tác</th>
                <th className="py-2 font-black">Ảnh</th>
              </tr>
            </thead>
            <tbody>
              {filtered.map((l) => {
                const act = ACTION_LABEL[l.action] || { text: l.action, cls: 'bg-slate-50 text-slate-600 border-slate-200' };
                return (
                  <tr key={l.id} className="border-b border-slate-100 align-middle">
                    <td className="py-2 pr-3 whitespace-nowrap text-slate-600">{formatTime(l.createdAt)}</td>
                    <td className="py-2 pr-3 font-black text-slate-900">{l.code}</td>
                    <td className="py-2 pr-3 font-semibold text-slate-700">{l.color || '—'}</td>
                    <td className="py-2 pr-3">
                      <span className={`inline-block rounded-md border px-2 py-0.5 text-xs font-bold ${act.cls}`}>{act.text}</span>
                    </td>
                    <td className="py-2 pr-3 text-slate-600">{l.by || '—'}</td>
                    <td className="py-2">
                      {l.action !== 'XOA' && l.imageUrl ? (
                        <a href={l.imageUrl} target="_blank" rel="noreferrer" title="Mở ảnh gốc">
                          {/* eslint-disable-next-line @next/next/no-img-element */}
                          <img src={l.imageUrl} alt={l.code} className="h-14 w-14 rounded-lg border border-slate-200 bg-white object-cover" />
                        </a>
                      ) : (
                        <span className="text-xs text-slate-400">—</span>
                      )}
                    </td>
                  </tr>
                );
              })}
              {filtered.length === 0 && (
                <tr>
                  <td colSpan={6} className="py-8 text-center text-sm text-slate-400">
                    {logs.length === 0 ? 'Chưa có lịch sử tải ảnh' : 'Không có dòng phù hợp'}
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      )}
    </section>
  );
}
