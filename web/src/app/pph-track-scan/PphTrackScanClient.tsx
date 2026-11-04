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
  IconShoe,
  IconPalette,
} from '@tabler/icons-react';

// Trang quét QR của module MỚI "Theo dõi chuyền" — ĐỘC LẬP hoàn toàn với PPH (/pph-scan), không
// đăng nhập. Mỗi trạm nhập đầu ca, sau đó mỗi giờ nhập 1 số sản lượng:
//   khutaptrung (Khu tập trung) / dauvao (Đầu vào) — chỉ sản lượng giờ
//   daura + qc (Đầu ra / QC, cùng 1 form) — sản lượng giờ + các dòng size + loại lỗi + số lượng lỗi
// Xem handlePphTrack() bên _worker.js.

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
  supply?: { collected: number; input: number; gap: number };
  qcContext?: { dayOutput: number; dayDefects: number };
  setup?: { shiftHours: number; workerCount: number; plannedQty: number; model: string; color: string; size: string; perHourTarget: number } | null;
  nextAction?: 'setup' | 'quantity' | 'wait' | 'done';
  targetSlot?: string | null;
  nextSlot?: string;
  currentSlot?: string | null;
  missingSlots?: string[];
};

const REMEMBERED_NAME_KEY = 'pph_track_scan_reporter_name';
const VALID_POINTS = ['khutaptrung', 'dauvao', 'daura', 'qc'];

// Đổi Uint8Array VAPID key cho PushManager.subscribe — BẢN SAO rút gọn của hàm cùng tên (không
// export) ở web/src/lib/browserNotifications.ts, vì trang này KHÔNG đăng nhập nên không dùng được
// syncPushSubscriptionToServer() (gắn /api/push/subscribe cần cookie đăng nhập) — xem registerTrackPush().
function urlBase64ToUint8Array(base64String: string): Uint8Array {
  const padding = '='.repeat((4 - (base64String.length % 4)) % 4);
  const base64 = (base64String + padding).replace(/-/g, '+').replace(/_/g, '/');
  const rawData = window.atob(base64);
  const outputArray = new Uint8Array(rawData.length);
  for (let i = 0; i < rawData.length; ++i) outputArray[i] = rawData.charCodeAt(i);
  return outputArray;
}

// Đăng ký Web Push nhắc "quên nhập" cho ĐÚNG (Tổ, điểm) vừa submit — đè lên đăng ký cũ (nếu có) của
// chính (team, point) đó, đúng ý đã chốt "nhắc người vừa nộp khung gần nhất" — dùng CHUNG sw.js đã
// có sẵn (không đăng ký Service Worker thứ 2), KHÔNG dùng bảng/endpoint push_subscriptions cũ (đòi
// đăng nhập) — xem POST /api/pph-track/push-subscribe ở _worker.js. Lỗi/từ chối quyền thì bỏ qua
// lặng lẽ, KHÔNG được chặn luồng nhập số liệu chính (chỉ là tiện ích nhắc thêm).
async function registerTrackPush(teamId: string, point: string, submittedBy: string) {
  try {
    if (typeof window === 'undefined' || !('serviceWorker' in navigator) || !('PushManager' in window) || !('Notification' in window)) return;
    if (Notification.permission === 'denied') return;
    if (Notification.permission !== 'granted') {
      const perm = await Notification.requestPermission();
      if (perm !== 'granted') return;
    }
    const reg = await navigator.serviceWorker.register('/sw.js', { scope: '/' });
    await navigator.serviceWorker.ready;
    let sub = await reg.pushManager.getSubscription();
    if (!sub) {
      const publicVapidKey =
        process.env.NEXT_PUBLIC_VAPID_PUBLIC_KEY || 'BC8JBKkxGTW34UgLCgb8l1Y-6kjGiMqqRL5-OtQ4pNOVx2re-qurzaKF2cSYHydAzG3zcIG-G4F91CHCvNABImw';
      sub = await reg.pushManager.subscribe({
        userVisibleOnly: true,
        applicationServerKey: urlBase64ToUint8Array(publicVapidKey) as unknown as BufferSource,
      });
    }
    await fetch('/api/pph-track/push-subscribe', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ team: teamId, point, submittedBy, subscription: sub.toJSON() }),
    });
  } catch {
    // Im lặng bỏ qua — đăng ký Push chỉ là tiện ích thêm, không phải luồng chính.
  }
}

type FormRow = { size: string; qty: string; defectType: string };
const EMPTY_SETUP = { shiftHours: '', workerCount: '', model: '', color: '', size: '', plannedQty: '' };

export default function PphTrackScanClient() {
  const searchParams = useSearchParams();
  const teamIdParam = searchParams.get('team') || '';
  const lineIdParam = searchParams.get('lineId') || '';
  const point = searchParams.get('point') || '';

  // Link không kèm mã Tổ (kể cả mã QC dùng chung theo Line) tự vào Tổ 1, không bắt người nhập chọn Tổ.
  const [defaultTeamId, setDefaultTeamId] = useState('');
  const [defaultTeamError, setDefaultTeamError] = useState<string | null>(null);
  const teamId = teamIdParam || defaultTeamId;
  const resolvingDefaultTeam = !teamIdParam && !defaultTeamId && !defaultTeamError && VALID_POINTS.includes(point);

  useEffect(() => {
    if (!resolvingDefaultTeam) return;
    let cancelled = false;
    const query = lineIdParam ? `?lineId=${encodeURIComponent(lineIdParam)}` : '';
    fetch(`/api/pph-track/default-team${query}`)
      .then((r) => r.json())
      .then((res) => {
        if (cancelled) return;
        if (res.success) setDefaultTeamId(res.teamId);
        else setDefaultTeamError(res.error || 'Không tìm thấy Tổ 1');
      })
      .catch(() => {
        if (!cancelled) setDefaultTeamError('Không kết nối được tới hệ thống');
      });
    return () => {
      cancelled = true;
    };
  }, [resolvingDefaultTeam, lineIdParam]);

  const [mounted, setMounted] = useState(false);
  useEffect(() => setMounted(true), []);

  const [info, setInfo] = useState<TrackInfo | null>(null);
  const [loading, setLoading] = useState(true);
  const [submittedBy, setSubmittedBy] = useState('');
  const [rememberedName, setRememberedName] = useState('');
  const [editingName, setEditingName] = useState(false);
  const [rows, setRows] = useState<FormRow[]>([]);
  const [singleQty, setSingleQty] = useState('');
  const [setupForm, setSetupForm] = useState(EMPTY_SETUP);
  const [editingSetup, setEditingSetup] = useState(false);
  // Khung giờ chọn để nhập bù; rỗng = khung của giờ hiện tại do server trả về.
  const [pickedSlot, setPickedSlot] = useState('');
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
      setRows([]);
      setSingleQty('');
      setEditingSetup(false);
      setPickedSlot('');
      const s = res?.setup;
      setSetupForm(s ? { shiftHours: String(s.shiftHours), workerCount: String(s.workerCount), model: s.model, color: s.color, size: s.size, plannedQty: String(s.plannedQty) } : EMPTY_SETUP);
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

  // Ghi nhận xong tự quay lại form (khung kế tiếp) sau ~1.8s, giống /pph-scan — đồng thời ĐĂNG KÝ
  // Web Push nhắc (fire-and-forget, không await/không chặn gì) cho đúng (Tổ, điểm) vừa nộp, xem
  // registerTrackPush() ở trên.
  useEffect(() => {
    if (!success) return;
    void registerTrackPush(teamId, point, submittedBy.trim() || rememberedName);
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
    const hourQty = Number(singleQty);
    if (singleQty.trim() === '' || !Number.isInteger(hourQty) || hourQty < 0) {
      setFormError('Vui lòng nhập đúng sản lượng của giờ này');
      return;
    }
    const payloadRows: { size: string; qty: number; defectType: string }[] = [];
    for (let i = 0; i < rows.length; i++) {
      const r = rows[i];
      const qty = Number(r.qty);
      if (!Number.isInteger(qty) || qty <= 0) {
        setFormError(`Dòng ${i + 1}: Vui lòng nhập đúng Số lượng`);
        return;
      }
      if (!r.size.trim()) {
        setFormError(`Dòng ${i + 1}: Vui lòng nhập Size`);
        return;
      }
      if (!r.defectType) {
        setFormError(`Dòng ${i + 1}: Vui lòng chọn Loại lỗi`);
        return;
      }
      payloadRows.push({ size: r.size.trim(), qty, defectType: r.defectType });
    }

    setSubmitting(true);
    setFormError(null);
    try {
      const res = await fetch('/api/pph-track/scan', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ team: teamId, point, submittedBy: name, expectedSlot: pickedSlot || info.targetSlot, rows: payloadRows, qty: hourQty }),
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

  async function handleSetupSubmit(e: React.FormEvent) {
    e.preventDefault();
    const name = submittedBy.trim();
    if (!name) {
      setFormError('Vui lòng nhập tên người báo cáo');
      return;
    }
    setSubmitting(true);
    setFormError(null);
    try {
      const res = await fetch('/api/pph-track/setup', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          team: teamId,
          point,
          submittedBy: name,
          shiftHours: Number(setupForm.shiftHours),
          workerCount: Number(setupForm.workerCount),
          plannedQty: Number(setupForm.plannedQty),
          model: setupForm.model,
          color: setupForm.color,
          size: setupForm.size,
        }),
      }).then((r) => r.json());
      if (!res.success) {
        setFormError(res.error || 'Không lưu được đầu ca');
        return;
      }
      try {
        window.localStorage.setItem(REMEMBERED_NAME_KEY, name);
      } catch {}
      setRememberedName(name);
      setEditingName(false);
      await load({ silent: true });
    } catch {
      setFormError('Không kết nối được tới hệ thống');
    } finally {
      setSubmitting(false);
    }
  }

  // Mục tiêu sản lượng giờ = Số lượng kế hoạch cả ca / Thời gian sản xuất, tự tính khi đang gõ.
  const setupHours = Number(setupForm.shiftHours);
  const setupPlanned = Number(setupForm.plannedQty);
  const setupTarget = setupHours > 0 && setupPlanned > 0 ? Math.round(setupPlanned / setupHours) : null;

  const reporterField =
    rememberedName && !editingName ? (
      <div className="flex items-center gap-2.5 px-3.5 py-3 bg-slate-50 border border-slate-200 rounded-xl">
        <IconUserCheck size={16} className="text-emerald-700 shrink-0" />
        <span className="flex-1 text-sm font-semibold text-slate-700 truncate">
          Báo cáo bởi <span className="font-black text-slate-900">{rememberedName}</span>
        </span>
        <button type="button" onClick={() => setEditingName(true)} className="text-[11px] font-bold text-emerald-700 hover:underline flex items-center gap-1 shrink-0">
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
          className="w-full px-3.5 py-3 bg-slate-50 border border-slate-200 rounded-xl text-sm font-semibold focus:outline-none focus:border-[#006838]"
          required
          autoFocus={!!rememberedName}
        />
      </Field>
    );
  const editSetupButton =
    info?.setup ? (
      <button type="button" onClick={() => setEditingSetup(true)} className="w-full py-2.5 rounded-xl border border-slate-200 text-xs font-bold text-slate-600 hover:bg-slate-50">
        Sửa đầu ca
      </button>
    ) : null;

  const activeSlot = pickedSlot || info?.targetSlot || '';
  // Giờ đã qua mà chưa nhập, bấm để nhập bù. Khung giờ hiện tại đã là mặc định nên không cần nút riêng.
  const backfillSlots = (info?.missingSlots || []).filter((s) => s !== info?.currentSlot);
  const backfillChips =
    backfillSlots.length > 0 ? (
      <div className="mb-4 space-y-1.5">
        <p className="text-xs font-bold text-slate-600">Giờ trước chưa nhập — bấm để nhập bù:</p>
        <div className="flex flex-wrap gap-1.5">
          {backfillSlots.map((s) => (
            <button
              key={s}
              type="button"
              aria-pressed={pickedSlot === s}
              onClick={() => setPickedSlot((prev) => (prev === s ? '' : s))}
              className={`min-h-[44px] rounded-lg border px-3 py-2 text-sm font-black ${pickedSlot === s ? 'border-[#006838] bg-[#006838] text-white' : 'border-slate-200 bg-white text-slate-700'}`}
            >
              {s}
            </button>
          ))}
        </div>
      </div>
    ) : null;

  if (!mounted || loading || resolvingDefaultTeam) {
    return (
      <ScanShell>
        <div className="flex items-center justify-center py-10">
          <div className="w-8 h-8 rounded-full border-4 border-[#006838] border-t-transparent animate-spin" />
        </div>
      </ScanShell>
    );
  }

  if (defaultTeamError) {
    return (
      <ScanShell>
        <StateCard icon={IconAlertTriangle} tone="rose" title="Không tìm thấy Tổ" desc={defaultTeamError} />
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

  if (info.nextAction === 'setup' || editingSetup) {
    const input = 'w-full px-3.5 py-3 bg-slate-50 border border-slate-200 rounded-xl text-sm font-semibold focus:outline-none focus:border-[#006838]';
    const set = (key: keyof typeof EMPTY_SETUP) => (e: React.ChangeEvent<HTMLInputElement>) => setSetupForm((prev) => ({ ...prev, [key]: e.target.value }));
    return (
      <ScanShell team={info.team} pointLabel={info.pointLabel} slotBadgeLabel="07:00">
        <div className="mb-4 flex items-center gap-2 px-3.5 py-2.5 rounded-xl bg-emerald-50 border border-emerald-200 text-emerald-700 text-xs font-bold">
          <IconClock size={14} />
          <span className="flex-1">Nhập đầu ca</span>
        </div>
        <form onSubmit={handleSetupSubmit} className="space-y-3.5">
          <Field label="Thời gian sản xuất (giờ) *" icon={IconClock}>
            <input type="number" inputMode="decimal" min={0.5} max={24} step={0.5} value={setupForm.shiftHours} onChange={set('shiftHours')} placeholder="VD: 8" className={input} required />
          </Field>
          <Field label="Số lượng công nhân *" icon={IconUsers}>
            <input type="number" inputMode="numeric" min={1} max={1000} value={setupForm.workerCount} onChange={set('workerCount')} placeholder="VD: 25" className={input} required />
          </Field>
          <Field label="Mã giày *" icon={IconShoe}>
            <input value={setupForm.model} onChange={set('model')} maxLength={40} placeholder="VD: 139222" className={input} required />
          </Field>
          <Field label="Màu sắc *" icon={IconPalette}>
            <input value={setupForm.color} onChange={set('color')} maxLength={40} placeholder="VD: BLK" className={input} required />
          </Field>
          <Field label="Size *" icon={IconRuler2}>
            <input value={setupForm.size} onChange={set('size')} maxLength={40} placeholder="VD: 40" className={input} required />
          </Field>
          <Field label="Số lượng kế hoạch cả ca *" icon={IconChartBar}>
            <input type="number" inputMode="numeric" min={1} value={setupForm.plannedQty} onChange={set('plannedQty')} placeholder="VD: 1000" className={input} required />
          </Field>
          <div className="rounded-xl bg-emerald-50 border border-emerald-200 px-3.5 py-3 text-sm font-black text-emerald-700">
            Mục tiêu sản lượng giờ: {setupTarget == null ? '—' : `${setupTarget} đôi`}
          </div>
          {reporterField}
          {formError && <div role="alert" className="p-3 rounded-xl bg-rose-50 border border-rose-200 text-rose-700 text-xs font-semibold">⚠️ {formError}</div>}
          <button type="submit" disabled={submitting} className="w-full py-3.5 rounded-xl bg-[#006838] text-white text-sm font-black hover:opacity-90 disabled:opacity-50 transition">
            {submitting ? 'Đang lưu...' : 'Lưu đầu ca'}
          </button>
          {editingSetup && (
            <button type="button" onClick={() => setEditingSetup(false)} className="w-full py-2.5 rounded-xl border border-slate-200 text-xs font-bold text-slate-600">
              Huỷ
            </button>
          )}
        </form>
      </ScanShell>
    );
  }

  if (info.nextAction === 'wait' && !pickedSlot) {
    return (
      <ScanShell team={info.team} pointLabel={info.pointLabel} slotBadgeLabel={info.nextSlot}>
        <StateCard icon={IconClock} tone="amber" title="Chưa tới giờ nhập" desc={`Khung tiếp theo lúc ${info.nextSlot}. Quay lại quét sau nhé.`} />
        {backfillChips}
        {editSetupButton}
      </ScanShell>
    );
  }

  if (info.nextAction === 'done' && !pickedSlot) {
    return (
      <ScanShell team={info.team} pointLabel={info.pointLabel}>
        <StateCard
          icon={IconCircleCheck}
          tone="emerald"
          title={backfillSlots.length ? 'Đã nhập khung giờ cuối' : 'Đã cập nhật đủ hôm nay'}
          desc={backfillSlots.length ? 'Vẫn còn giờ trước chưa nhập, xem bên dưới.' : 'Cảm ơn bạn đã báo cáo đầy đủ các khung giờ hôm nay!'}
        />
        {backfillChips}
      </ScanShell>
    );
  }

  const isOutputForm = point === 'daura' || point === 'qc';

  // Chỉ CẢNH BÁO, không chặn nộp: các trạm nhập độc lập nên Tập trung có thể nhập sau trong cùng giờ.
  const hourQty = Number(singleQty) || 0;
  const available = info.supply ? Math.max(0, info.supply.gap) : 0;
  const defectEntering = rows.reduce((sum, x) => sum + (Number(x.qty) || 0), 0);
  const qc = info.qcContext;

  return (
    <ScanShell team={info.team} pointLabel={info.pointLabel} slotBadgeLabel={activeSlot || undefined}>
      <div className="mb-4 flex items-center gap-2 px-3.5 py-2.5 rounded-xl bg-emerald-50 border border-emerald-200 text-emerald-700 text-xs font-bold">
        <IconClock size={14} />
        <span className="flex-1">Khung giờ {activeSlot}{pickedSlot ? ' (nhập bù)' : ' (giờ hiện tại)'}</span>
      </div>

      {backfillChips}

      {qc && (
        <div className="mb-4 rounded-xl border border-slate-200 bg-slate-50 px-3.5 py-2.5 text-xs font-bold text-slate-700">
          Hôm nay: Đầu ra {qc.dayOutput} đôi · Lỗi {qc.dayDefects} đôi
        </div>
      )}

      {info.setup && (
        <div className="mb-4 rounded-xl border border-slate-200 bg-slate-50 px-3.5 py-2.5 text-xs font-bold text-slate-700">
          <p className="text-sm font-black text-emerald-700">Mục tiêu sản lượng giờ: {info.setup.perHourTarget} đôi</p>
          <p>Mã {info.setup.model} · {info.setup.color} · Size {info.setup.size}</p>
          <p>{info.setup.workerCount} công nhân · Kế hoạch {info.setup.plannedQty} đôi/{info.setup.shiftHours} giờ</p>
          {info.supply && <p>Tập trung còn {available} đôi (đã nhận {info.supply.collected}, Đầu vào đã lấy {info.supply.input})</p>}
        </div>
      )}

      <form onSubmit={handleSubmit} className="space-y-3.5">
        <Field label={`${isOutputForm ? 'Sản lượng Đầu ra' : 'Sản lượng'} giờ ${activeSlot} *`} icon={IconChartBar}>
          <input
            type="number"
            inputMode="numeric"
            min={0}
            value={singleQty}
            onChange={(e) => setSingleQty(e.target.value)}
            placeholder="VD: 120"
            className="w-full px-3.5 py-3 bg-slate-50 border border-slate-200 rounded-xl text-sm font-semibold focus:outline-none focus:border-[#006838]"
            required
            autoFocus
          />
        </Field>
        {point === 'dauvao' && info.supply && hourQty > available && (
          <p role="status" className="text-xs font-bold text-rose-700">⚠ Vượt {hourQty - available} đôi so với Khu tập trung — kiểm tra lại</p>
        )}
        {isOutputForm && defectEntering > hourQty && singleQty.trim() !== '' && (
          <p role="status" className="text-xs font-bold text-rose-700">⚠ Số lỗi ({defectEntering}) nhiều hơn Đầu ra giờ này — kiểm tra lại</p>
        )}
        {isOutputForm && (
          <>
            {rows.map((r, idx) => (
              <div key={idx} className="relative space-y-3 p-3.5 rounded-xl bg-rose-50 border border-rose-200">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-black text-rose-700 uppercase tracking-wide">Dòng #{idx + 1}</span>
                  <button
                    type="button"
                    onClick={() => setRows((prev) => prev.filter((_, i) => i !== idx))}
                    className="flex h-7 w-7 items-center justify-center rounded-lg text-rose-500 hover:bg-rose-100"
                  >
                    <IconTrash size={15} />
                  </button>
                </div>
                <Field label="Size *" icon={IconRuler2}>
                  <input
                    value={r.size}
                    onChange={(e) => setRows((prev) => prev.map((x, i) => (i === idx ? { ...x, size: e.target.value } : x)))}
                    placeholder="VD: 40"
                    className="w-full px-3.5 py-3 bg-white border border-rose-200 rounded-xl text-sm font-semibold focus:outline-none focus:border-rose-400"
                  />
                </Field>
                <div className="space-y-1.5">
                  <span className="flex items-center gap-1.5 text-xs font-bold text-slate-600">
                    <IconBug size={13} className="text-slate-400 shrink-0" /> Loại lỗi *
                  </span>
                  <div className="grid grid-cols-2 gap-1.5">
                    {(info.defectTypes || []).map((d) => (
                      <button
                        key={d}
                        type="button"
                        aria-pressed={r.defectType === d}
                        onClick={() => setRows((prev) => prev.map((x, i) => (i === idx ? { ...x, defectType: d } : x)))}
                        className={`min-h-[44px] rounded-lg border px-2 py-2 text-xs font-black ${r.defectType === d ? 'border-rose-600 bg-rose-600 text-white' : 'border-rose-200 bg-white text-slate-700'}`}
                      >
                        {d}
                      </button>
                    ))}
                  </div>
                </div>
                <Field label="Số lượng lỗi *" icon={IconChartBar}>
                  <input
                    type="number"
                    inputMode="numeric"
                    min={1}
                    value={r.qty}
                    onChange={(e) => setRows((prev) => prev.map((x, i) => (i === idx ? { ...x, qty: e.target.value } : x)))}
                    placeholder="VD: 20"
                    className="w-full px-3.5 py-3 bg-white border border-rose-200 rounded-xl text-sm font-semibold focus:outline-none focus:border-rose-400"
                  />
                </Field>
              </div>
            ))}
            <button
              type="button"
              onClick={() => setRows((prev) => [...prev, { size: '', qty: '', defectType: '' }])}
              className="w-full flex items-center justify-center gap-1.5 py-3 rounded-xl border-2 border-dashed border-rose-300 text-rose-700 text-xs font-bold hover:bg-rose-50"
            >
              <IconPlus size={15} /> Thêm dòng lỗi
            </button>
          </>
        )}

        {reporterField}

        {formError && <div className="p-3 rounded-xl bg-rose-50 border border-rose-200 text-rose-700 text-xs font-semibold">⚠️ {formError}</div>}

        <button
          type="submit"
          disabled={submitting}
          className="w-full py-3.5 rounded-xl bg-[#006838] text-white text-sm font-black hover:opacity-90 disabled:opacity-50 transition"
        >
          {submitting ? 'Đang lưu...' : 'Xác Nhận Cập Nhật'}
        </button>
        {editSetupButton}
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
      className="min-h-screen bg-[#f4f7f5] flex items-start justify-center px-4 sm:px-6 pb-4 sm:pb-6"
      style={{ paddingTop: 'calc(env(safe-area-inset-top, 0px) + 1.5rem)' }}
    >
      <button
        type="button"
        onClick={() => window.location.reload()}
        title="Tải lại trang"
        className="fixed right-4 z-50 flex h-14 w-14 items-center justify-center rounded-full bg-[#006838] text-white shadow-lg shadow-emerald-900/20 hover:opacity-90 active:scale-95 transition"
        style={{ top: 'calc(env(safe-area-inset-top, 0px) + 1rem)' }}
      >
        <IconRefresh size={26} />
      </button>
      <div className="w-full max-w-sm">
        {/* pr-14 chừa chỗ cho nút tải lại nổi ở góc phải, không che tên trạm đang nhập. */}
        <div className="flex items-center justify-center gap-2.5 mb-4 pr-14">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src="/images/tbs-logo.png" alt="TBS Group" className="h-7 w-auto object-contain" />
          <span className="text-xs font-black text-slate-700 uppercase tracking-wide">Theo Dõi Chuyền{pointLabel ? ` · ${pointLabel}` : ''}</span>
        </div>
        <div className="bg-white rounded-3xl shadow-xl border border-slate-200/70 p-5 sm:p-6">
          {team && (
            <div className="flex items-center gap-3 pb-4 mb-4 border-b border-slate-100">
              <div className="w-10 h-10 rounded-xl bg-emerald-100 text-emerald-700 flex items-center justify-center flex-shrink-0">
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
                  <IconClock size={13} className="text-emerald-700" />
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
