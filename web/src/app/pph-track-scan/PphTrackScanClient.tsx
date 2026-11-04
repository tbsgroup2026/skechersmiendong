'use client';

import { useEffect, useState } from 'react';
import { useSearchParams } from 'next/navigation';
import {
  IconBuildingFactory2,
  IconCircleCheck,
  IconClock,
  IconAlertTriangle,
  IconUsers,
  IconChartBar,
  IconChevronRight,
  IconUserCheck,
  IconPencil,
  IconRefresh,
  IconPlus,
  IconTrash,
  IconRuler2,
  IconBug,
} from '@tabler/icons-react';

// Trang quét QR của module MỚI "Theo dõi chuyền" — ĐỘC LẬP hoàn toàn với PPH (/pph-scan), không
// đăng nhập, không có "Cập nhật đầu ca" riêng. 4 điểm quét (point) cho cùng 1 Tổ (team):
//   khutaptrung (Khu tập trung) / dauvao (Đầu vào) — nhiều dòng size+số lượng mỗi khung giờ
//   daura (Đầu ra) — 1 số lượng duy nhất mỗi khung giờ, không size
//   qc (QC) — nhiều dòng size + loại lỗi (danh mục cố định) + số lượng lỗi mỗi khung giờ
// Dùng chung 8 khung giờ + luật chặn giờ với PPH (xem handlePphTrack() bên _worker.js).

type TrackRow = { size: string | null; qty: number; defectType: string | null };
type TrackEntry = { slot: string; filled: boolean; rows: TrackRow[] };
type TrackInfo = {
  success: boolean;
  error?: string;
  team?: { id: string; name: string; lineName: string; areaName: string; factoryName: string };
  point?: string;
  pointLabel?: string;
  date?: string;
  entries?: TrackEntry[];
  defectTypes?: string[];
  nextAction?: 'quantity' | 'wait' | 'done';
  targetSlot?: string | null;
  nextSlot?: string;
};

const REMEMBERED_NAME_KEY = 'pph_track_scan_reporter_name';
const VALID_POINTS = ['khutaptrung', 'dauvao', 'daura', 'qc'];

export default function PphTrackScanClient() {
  const searchParams = useSearchParams();
  const teamId = searchParams.get('team') || '';
  const point = searchParams.get('point') || '';

  const [mounted, setMounted] = useState(false);
  useEffect(() => setMounted(true), []);

  const [info, setInfo] = useState<TrackInfo | null>(null);
  const [loading, setLoading] = useState(true);
  const [submittedBy, setSubmittedBy] = useState('');
  const [rememberedName, setRememberedName] = useState('');
  const [editingName, setEditingName] = useState(false);
  const [rows, setRows] = useState<{ size: string; qty: string; defectType: string }[]>([{ size: '', qty: '', defectType: '' }]);
  const [singleQty, setSingleQty] = useState('');
  const [submitting, setSubmitting] = useState(false);
  const [formError, setFormError] = useState<string | null>(null);
  const [success, setSuccess] = useState<{ slot: string } | null>(null);

  useEffect(() => {
    try {
      const saved = window.localStorage.getItem(REMEMBERED_NAME_KEY) || '';
      if (saved) {
        setRememberedName(saved);
        setSubmittedBy(saved);
      }
    } catch {}
  }, []);

  const load = async (opts?: { silent?: boolean }) => {
    if (!teamId || !VALID_POINTS.includes(point)) {
      setLoading(false);
      return;
    }
    try {
      if (!opts?.silent) setLoading(true);
      const res = await fetch(`/api/pph-track/scan-info?team=${encodeURIComponent(teamId)}&point=${encodeURIComponent(point)}`).then((r) => r.json());
      setInfo(res);
      setRows([{ size: '', qty: '', defectType: '' }]);
      setSingleQty('');
    } catch {
      if (!opts?.silent) setInfo({ success: false, error: 'Không kết nối được tới hệ thống' });
    } finally {
      if (!opts?.silent) setLoading(false);
    }
  };

  useEffect(() => {
    load();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [teamId, point]);

  // Ghi nhận xong tự quay lại form (khung kế tiếp) sau ~1.8s, giống /pph-scan.
  useEffect(() => {
    if (!success) return;
    const t = setTimeout(() => {
      setSuccess(null);
      load({ silent: true });
    }, 1800);
    return () => clearTimeout(t);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [success]);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!info?.success || !info.team) return;
    const name = submittedBy.trim();
    if (!name) {
      setFormError('Vui lòng nhập tên người báo cáo');
      return;
    }
    const needsSize = point === 'khutaptrung' || point === 'dauvao' || point === 'qc';
    const needsDefect = point === 'qc';

    let payloadRows: { size?: string; qty: number; defectType?: string }[] = [];
    if (point === 'daura') {
      const qty = Number(singleQty);
      if (!Number.isFinite(qty) || qty <= 0 || !Number.isInteger(qty)) {
        setFormError('Vui lòng nhập đúng Số lượng');
        return;
      }
      payloadRows = [{ qty }];
    } else {
      for (let i = 0; i < rows.length; i++) {
        const r = rows[i];
        const qty = Number(r.qty);
        if (!Number.isFinite(qty) || qty <= 0 || !Number.isInteger(qty)) {
          setFormError(`Dòng ${i + 1}: Vui lòng nhập đúng Số lượng`);
          return;
        }
        if (needsSize && !r.size.trim()) {
          setFormError(`Dòng ${i + 1}: Vui lòng nhập Size`);
          return;
        }
        if (needsDefect && !r.defectType) {
          setFormError(`Dòng ${i + 1}: Vui lòng chọn Loại lỗi`);
          return;
        }
        payloadRows.push({ size: needsSize ? r.size.trim() : undefined, qty, defectType: needsDefect ? r.defectType : undefined });
      }
    }

    setSubmitting(true);
    setFormError(null);
    try {
      const res = await fetch('/api/pph-track/scan', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ team: teamId, point, submittedBy: name, expectedSlot: info.targetSlot, rows: payloadRows }),
      }).then((r) => r.json());
      if (!res.success) {
        setFormError(res.error || 'Không lưu được, vui lòng thử lại');
        return;
      }
      try {
        window.localStorage.setItem(REMEMBERED_NAME_KEY, name);
      } catch {}
      setRememberedName(name);
      setEditingName(false);
      setSuccess({ slot: res.slot });
    } catch {
      setFormError('Không kết nối được tới hệ thống');
    } finally {
      setSubmitting(false);
    }
  }

  if (!mounted || loading) {
    return (
      <ScanShell>
        <div className="flex items-center justify-center py-10">
          <div className="w-8 h-8 rounded-full border-4 border-amber-600 border-t-transparent animate-spin" />
        </div>
      </ScanShell>
    );
  }

  if (!teamId || !VALID_POINTS.includes(point)) {
    return (
      <ScanShell>
        <StateCard icon={IconAlertTriangle} tone="rose" title="Mã QR không hợp lệ" desc="Đường dẫn thiếu Tổ/điểm quét — vui lòng quét lại mã đã dán." />
      </ScanShell>
    );
  }

  if (!info?.success || !info.team) {
    return (
      <ScanShell>
        <StateCard icon={IconAlertTriangle} tone="rose" title="Không tìm thấy Tổ" desc={info?.error || 'Mã QR có thể đã cũ — liên hệ quản lý để lấy mã mới.'} />
      </ScanShell>
    );
  }

  if (success) {
    return (
      <ScanShell team={info.team} pointLabel={info.pointLabel}>
        <StateCard icon={IconCircleCheck} tone="emerald" title="Đã ghi nhận!" desc={`Cập nhật khung giờ ${success.slot} thành công. Cảm ơn bạn!`} />
        <p className="text-center text-[11px] text-slate-400 font-semibold -mt-2">Đang chuyển sang khung tiếp theo...</p>
      </ScanShell>
    );
  }

  if (info.nextAction === 'wait') {
    return (
      <ScanShell team={info.team} pointLabel={info.pointLabel} slotBadgeLabel={info.nextSlot}>
        <StateCard icon={IconClock} tone="amber" title="Chưa tới giờ nhập" desc={`Khung tiếp theo lúc ${info.nextSlot}. Quay lại quét sau nhé.`} />
      </ScanShell>
    );
  }

  if (info.nextAction === 'done') {
    return (
      <ScanShell team={info.team} pointLabel={info.pointLabel}>
        <StateCard icon={IconCircleCheck} tone="emerald" title="Đã cập nhật đủ hôm nay" desc="Cảm ơn bạn đã báo cáo đầy đủ các khung giờ hôm nay!" />
      </ScanShell>
    );
  }

  const needsSize = point === 'khutaptrung' || point === 'dauvao' || point === 'qc';
  const needsDefect = point === 'qc';

  return (
    <ScanShell team={info.team} pointLabel={info.pointLabel} slotBadgeLabel={info.targetSlot ?? undefined}>
      <div className="mb-4 flex items-center gap-2 px-3.5 py-2.5 rounded-xl bg-amber-50 border border-amber-200 text-amber-800 text-xs font-bold">
        <IconClock size={14} />
        <span className="flex-1">Khung giờ {info.targetSlot}</span>
      </div>

      <form onSubmit={handleSubmit} className="space-y-3.5">
        {point === 'daura' ? (
          <Field label={`Số lượng (${info.targetSlot}) *`} icon={IconChartBar}>
            <input
              type="number"
              inputMode="numeric"
              min={1}
              value={singleQty}
              onChange={(e) => setSingleQty(e.target.value)}
              placeholder="VD: 120"
              className="w-full px-3.5 py-3 bg-slate-50 border border-slate-200 rounded-xl text-sm font-semibold focus:outline-none focus:border-amber-500"
              required
              autoFocus
            />
          </Field>
        ) : (
          <>
            {rows.map((r, idx) => (
              <div key={idx} className="relative space-y-3 p-3.5 rounded-xl bg-amber-50/50 border border-amber-200">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-black text-amber-700 uppercase tracking-wide">Dòng #{idx + 1}</span>
                  {rows.length > 1 && (
                    <button
                      type="button"
                      onClick={() => setRows((prev) => prev.filter((_, i) => i !== idx))}
                      className="flex h-7 w-7 items-center justify-center rounded-lg text-rose-500 hover:bg-rose-100"
                    >
                      <IconTrash size={15} />
                    </button>
                  )}
                </div>
                <Field label="Size *" icon={IconRuler2}>
                  <input
                    value={r.size}
                    onChange={(e) => setRows((prev) => prev.map((x, i) => (i === idx ? { ...x, size: e.target.value } : x)))}
                    placeholder="VD: 40"
                    className="w-full px-3.5 py-3 bg-white border border-amber-200 rounded-xl text-sm font-semibold focus:outline-none focus:border-amber-500"
                  />
                </Field>
                {needsDefect && (
                  <Field label="Loại lỗi *" icon={IconBug}>
                    <select
                      value={r.defectType}
                      onChange={(e) => setRows((prev) => prev.map((x, i) => (i === idx ? { ...x, defectType: e.target.value } : x)))}
                      className="w-full px-3.5 py-3 bg-white border border-amber-200 rounded-xl text-sm font-semibold focus:outline-none focus:border-amber-500"
                    >
                      <option value="">— Chọn loại lỗi —</option>
                      {(info.defectTypes || []).map((d) => (
                        <option key={d} value={d}>
                          {d}
                        </option>
                      ))}
                    </select>
                  </Field>
                )}
                <Field label={needsDefect ? 'Số lượng lỗi *' : 'Số lượng *'} icon={IconChartBar}>
                  <input
                    type="number"
                    inputMode="numeric"
                    min={1}
                    value={r.qty}
                    onChange={(e) => setRows((prev) => prev.map((x, i) => (i === idx ? { ...x, qty: e.target.value } : x)))}
                    placeholder="VD: 20"
                    className="w-full px-3.5 py-3 bg-white border border-amber-200 rounded-xl text-sm font-semibold focus:outline-none focus:border-amber-500"
                  />
                </Field>
              </div>
            ))}
            <button
              type="button"
              onClick={() => setRows((prev) => [...prev, { size: '', qty: '', defectType: '' }])}
              className="w-full flex items-center justify-center gap-1.5 py-3 rounded-xl border-2 border-dashed border-amber-300 text-amber-700 text-xs font-bold hover:bg-amber-50"
            >
              <IconPlus size={15} /> Thêm size khác
            </button>
          </>
        )}

        {rememberedName && !editingName ? (
          <div className="flex items-center gap-2.5 px-3.5 py-3 bg-slate-50 border border-slate-200 rounded-xl">
            <IconUserCheck size={16} className="text-amber-700 shrink-0" />
            <span className="flex-1 text-sm font-semibold text-slate-700 truncate">
              Báo cáo bởi <span className="font-black text-slate-900">{rememberedName}</span>
            </span>
            <button
              type="button"
              onClick={() => setEditingName(true)}
              className="text-[11px] font-bold text-amber-700 hover:underline flex items-center gap-1 shrink-0"
            >
              <IconPencil size={12} /> Đổi tên
            </button>
          </div>
        ) : (
          <Field label="Tên người báo cáo *" icon={IconUsers}>
            <input
              type="text"
              value={submittedBy}
              onChange={(e) => setSubmittedBy(e.target.value)}
              placeholder="Nhập họ tên của bạn"
              className="w-full px-3.5 py-3 bg-slate-50 border border-slate-200 rounded-xl text-sm font-semibold focus:outline-none focus:border-amber-500"
              required
              autoFocus={!!rememberedName}
            />
          </Field>
        )}

        {formError && <div className="p-3 rounded-xl bg-rose-50 border border-rose-200 text-rose-700 text-xs font-semibold">⚠️ {formError}</div>}

        <button
          type="submit"
          disabled={submitting}
          className="w-full py-3.5 rounded-xl bg-amber-600 text-white text-sm font-black hover:opacity-90 disabled:opacity-50 transition"
        >
          {submitting ? 'Đang lưu...' : 'Xác Nhận Cập Nhật'}
        </button>
      </form>
    </ScanShell>
  );
}

function ScanShell({
  team,
  pointLabel,
  slotBadgeLabel,
  children,
}: {
  team?: { name: string; lineName: string; areaName: string; factoryName: string };
  pointLabel?: string;
  slotBadgeLabel?: string;
  children: React.ReactNode;
}) {
  return (
    <div
      className="min-h-screen bg-[#fdf8f0] flex items-start justify-center px-4 sm:px-6 pb-4 sm:pb-6"
      style={{ paddingTop: 'calc(env(safe-area-inset-top, 0px) + 1.5rem)' }}
    >
      <button
        type="button"
        onClick={() => window.location.reload()}
        title="Tải lại trang"
        className="fixed right-4 z-50 flex h-14 w-14 items-center justify-center rounded-full bg-amber-600 text-white shadow-lg shadow-amber-900/20 hover:opacity-90 active:scale-95 transition"
        style={{ top: 'calc(env(safe-area-inset-top, 0px) + 1rem)' }}
      >
        <IconRefresh size={26} />
      </button>
      <div className="w-full max-w-sm">
        <div className="flex items-center gap-2.5 mb-4 justify-center">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src="/images/tbs-logo.png" alt="TBS Group" className="h-7 w-auto object-contain" />
          <span className="text-xs font-black text-slate-700 uppercase tracking-wide">Theo Dõi Chuyền{pointLabel ? ` · ${pointLabel}` : ''}</span>
        </div>
        <div className="bg-white rounded-3xl shadow-xl border border-slate-200/70 p-5 sm:p-6">
          {team && (
            <div className="flex items-center gap-3 pb-4 mb-4 border-b border-slate-100">
              <div className="w-10 h-10 rounded-xl bg-amber-100 text-amber-700 flex items-center justify-center flex-shrink-0">
                <IconBuildingFactory2 size={18} />
              </div>
              <div className="min-w-0 flex-1">
                <div className="font-black text-slate-900 text-sm truncate">{team.name}</div>
                <div className="text-[11px] text-slate-400 font-semibold truncate">
                  {[team.factoryName, team.areaName, team.lineName].filter(Boolean).join(' › ')}
                </div>
              </div>
              {slotBadgeLabel && (
                <div className="shrink-0 flex items-center gap-1 pl-2.5 pr-1.5 py-1.5 rounded-xl bg-slate-50 border border-slate-200">
                  <IconClock size={13} className="text-amber-700" />
                  <span className="text-xs font-black text-slate-700">{slotBadgeLabel}</span>
                  <IconChevronRight size={13} className="text-slate-400" />
                </div>
              )}
            </div>
          )}
          {children}
        </div>
      </div>
    </div>
  );
}

function Field({ label, icon: Icon, children }: { label: string; icon: typeof IconUsers; children: React.ReactNode }) {
  return (
    <label className="block space-y-1.5">
      <span className="flex items-center gap-1.5 min-w-0 text-xs font-bold text-slate-600">
        <Icon size={13} className="text-slate-400 shrink-0" />
        <span className="truncate">{label}</span>
      </span>
      {children}
    </label>
  );
}

const TONE_CLS: Record<string, { bg: string; text: string; iconBg: string }> = {
  emerald: { bg: 'bg-emerald-50', text: 'text-emerald-700', iconBg: 'bg-emerald-100' },
  amber: { bg: 'bg-amber-50', text: 'text-amber-700', iconBg: 'bg-amber-100' },
  rose: { bg: 'bg-rose-50', text: 'text-rose-700', iconBg: 'bg-rose-100' },
};

function StateCard({ icon: Icon, tone, title, desc }: { icon: typeof IconCircleCheck; tone: 'emerald' | 'amber' | 'rose'; title: string; desc: string }) {
  const t = TONE_CLS[tone];
  return (
    <div className="text-center py-6 space-y-3">
      <div className={`w-14 h-14 mx-auto rounded-2xl ${t.iconBg} ${t.text} flex items-center justify-center`}>
        <Icon size={26} />
      </div>
      <h3 className="font-black text-slate-900 text-base">{title}</h3>
      <p className="text-xs text-slate-500 leading-relaxed px-2">{desc}</p>
    </div>
  );
}
