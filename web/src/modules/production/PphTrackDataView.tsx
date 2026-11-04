'use client';

import { useCallback, useEffect, useState } from 'react';
import { IconArrowLeft, IconDatabase, IconRefresh } from '@tabler/icons-react';

// Cài Đặt › Dữ liệu Theo dõi chuyền: xem và xoá số đã nhập theo ngày. API bắt đăng nhập.
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

const POINT_LABEL: Record<string, string> = { khutaptrung: 'Tập trung', dauvao: 'Đầu vào', daura: 'Đầu ra / QC' };
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

export default function PphTrackDataView({ onBack }: { onBack: () => void }) {
  const [date, setDate] = useState(todayVN());
  const [entries, setEntries] = useState<Entry[]>([]);
  const [setups, setSetups] = useState<Setup[]>([]);
  const [teamNames, setTeamNames] = useState<Record<string, string>>({});
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  // Xoá phải bấm 2 lần: lần đầu chỉ đổi nút sang trạng thái xác nhận.
  const [confirmKey, setConfirmKey] = useState('');
  const [busy, setBusy] = useState(false);

  const load = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      const res = await fetch(`/api/pph-track/admin-data?date=${date}`, { cache: 'no-store' }).then((r) => r.json());
      if (!res.success) throw new Error(res.message || res.error || 'Không tải được dữ liệu');
      setEntries(res.entries);
      setSetups(res.setups);
      setTeamNames(res.teamNames);
    } catch (e) {
      setError(e instanceof Error ? e.message : 'Không tải được dữ liệu');
    } finally {
      setLoading(false);
    }
  }, [date]);

  useEffect(() => {
    load();
  }, [load]);

  async function remove(key: string, url: string) {
    if (confirmKey !== key) {
      setConfirmKey(key);
      return;
    }
    setBusy(true);
    setError(null);
    try {
      const res = await fetch(url, { method: 'DELETE' }).then((r) => r.json());
      if (!res.success) throw new Error(res.message || res.error || 'Không xoá được');
      setConfirmKey('');
      await load();
    } catch (e) {
      setError(e instanceof Error ? e.message : 'Không xoá được');
    } finally {
      setBusy(false);
    }
  }

  const q = (teamId: string, point: string) => `team=${encodeURIComponent(teamId)}&point=${point}&date=${date}`;
  const th = 'px-2 py-2 text-left text-[11px] font-black uppercase text-slate-500 whitespace-nowrap';
  const td = 'px-2 py-2 text-sm text-slate-800 whitespace-nowrap';
  const deleteButton = (key: string, url: string, label: string) => (
    <button
      type="button"
      disabled={busy}
      aria-label={label}
      onClick={() => remove(key, url)}
      className={`min-h-[36px] rounded-lg border px-3 text-xs font-bold disabled:opacity-50 ${confirmKey === key ? 'border-rose-600 bg-rose-600 text-white' : 'border-rose-200 text-rose-700 hover:bg-rose-50'}`}
    >
      {confirmKey === key ? 'Bấm lần nữa để xoá' : 'Xoá'}
    </button>
  );
  const hours = groupHours(entries);

  return (
    <div className="space-y-5 my-auto">
      <div className="flex flex-wrap items-center gap-3">
        <button type="button" onClick={onBack} title="Về Cài Đặt" className="w-10 h-10 rounded-xl bg-white border border-slate-200 text-slate-500 hover:bg-slate-50 flex items-center justify-center flex-shrink-0">
          <IconArrowLeft size={18} />
        </button>
        <h2 className="flex-1 text-xl font-black text-slate-900 flex items-center gap-2">
          <IconDatabase size={22} className="text-[#006838]" /> Dữ liệu Theo dõi chuyền
        </h2>
        <label className="text-sm font-bold text-slate-600">
          Ngày{' '}
          <input type="date" value={date} onChange={(e) => e.target.value && setDate(e.target.value)} className="rounded-xl border border-slate-200 px-3 py-2 text-sm" />
        </label>
        <button type="button" onClick={load} className="flex items-center gap-1.5 px-4 py-2.5 rounded-xl bg-white border border-slate-200 text-sm font-bold text-slate-600 hover:bg-slate-50">
          <IconRefresh size={16} /> Tải lại
        </button>
      </div>

      {error && <p role="alert" className="rounded-xl bg-rose-50 border border-rose-200 px-4 py-3 text-sm font-semibold text-rose-700">{error}</p>}
      {loading && <p className="text-sm font-semibold text-slate-400">Đang tải...</p>}

      <section className="bg-white rounded-2xl border border-slate-200 shadow-sm p-4">
        <h3 className="mb-2 font-black text-slate-900">Đầu ca ({setups.length})</h3>
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
                  const team = teamNames[s.team_id] || s.team_id;
                  return (
                    <tr key={key} className="border-b border-slate-100">
                      <td className={td}>{team}</td>
                      <td className={td}>{POINT_LABEL[s.point] || s.point}</td>
                      <td className={td}>{s.shift_hours}</td>
                      <td className={td}>{s.worker_count}</td>
                      <td className={td}>{s.planned_qty}</td>
                      <td className={td}>{s.model} / {s.color} / {s.size}</td>
                      <td className={td}>{s.plan_pph ?? '–'}</td>
                      <td className={td}>{s.submitted_by} · {timeVN(s.submitted_at)}</td>
                      <td className={td}>{deleteButton(key, `/api/pph-track/setup?${q(s.team_id, s.point)}`, `Xoá đầu ca ${team} ${POINT_LABEL[s.point] || s.point}`)}</td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        )}
      </section>

      <section className="bg-white rounded-2xl border border-slate-200 shadow-sm p-4">
        <h3 className="mb-2 font-black text-slate-900">Số liệu theo giờ ({hours.length})</h3>
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
                  const team = teamNames[h.teamId] || h.teamId;
                  return (
                    <tr key={h.key} className="border-b border-slate-100">
                      <td className={td}>{team}</td>
                      <td className={td}>{POINT_LABEL[h.point] || h.point}</td>
                      <td className={`${td} font-black`}>{h.slot}</td>
                      <td className={`${td} font-black`}>{output.reduce((sum, r) => sum + r.qty, 0)}</td>
                      <td className={td}>{main?.worker_count ?? '–'}</td>
                      <td className={td}>{main?.work_hours ?? '–'}</td>
                      <td className={td}>{defects.length ? defects.map((r) => `${r.defect_type} (size ${r.size}): ${r.qty}`).join('; ') : '–'}</td>
                      <td className={td}>{latest.submitted_by} · {timeVN(latest.submitted_at)}</td>
                      <td className={td}>{deleteButton(h.key, `/api/pph-track/scan?${q(h.teamId, h.point)}&slot=${encodeURIComponent(h.slot)}`, `Xoá ${team} ${POINT_LABEL[h.point] || h.point} giờ ${h.slot}`)}</td>
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
