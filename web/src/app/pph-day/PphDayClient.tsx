'use client';

// Bảng xem sản lượng theo ngày: chọn khoảng ngày (từ … đến …), mỗi ngày 1 bảng, và tải về Excel.
// Hàng = hàng CHUYỀN CHUẨN (đầu ra), rồi từng Xưởng với các Tổ. Cột = toàn bộ khung giờ (cố định + khung
// phát sinh trong khoảng ngày đã chọn), rồi CN, Giờ công, SLKH/giờ, SLKH, SLTH, chênh lệch (SLTH − SLKH).
// Nguồn số của hàng Chuyền chuẩn giống Sheet: trước 05/11 cộng Tổ 1 + Tổ 4 (API PPH), từ 05/11 lấy trạm
// Đầu ra của Theo dõi chuyền.
import { useEffect, useMemo, useState } from 'react';
import * as XLSX from 'xlsx';
import { todayVNStr, type PphFactory, type PphLeaf } from '@/modules/production/ProductionPerformanceModule';

// Khung không đưa vào bảng (giống Sheet: khung 07:00-07:30 không tính).
const SKIP_SLOT = '07:30';
// Từ khung này trở đi là tăng ca (18:00-20:00), không xét thiếu nhập.
const OVERTIME_FROM = '18:00';
// Các khung luôn hiện, kể cả khi ngày đó chưa có số (đủ ca chính + tăng ca như Sheet).
const BASE_SLOTS = ['08:30', '09:30', '10:30', '11:30', '13:30', '14:30', '15:30', '16:30', '18:00', '19:00', '20:00'];
// Tổ 1 và Tổ 4 (Line May 1): không hiện thành hàng riêng, được gộp vào hàng Chuyền chuẩn.
const CHUYEN_LEAF_IDS = ['pphorg_mv6fi3ay_mi0yvh', 'pphorg_mv6figu7_k5yfwd'];
const HIDDEN_LEAF_IDS = new Set(CHUYEN_LEAF_IDS);
// Từ ngày này hàng Chuyền chuẩn lấy từ Theo dõi chuyền (cùng mốc TRACK_FROM của Sheet).
const TRACK_FROM = '2026-11-05';
const TRACK_TEAM_ID = 'pphorg_mv6fi3ay_mi0yvh';
const TRACK_POINTS = ['khutaptrung', 'dauvao', 'daura'];
// Giới hạn số ngày 1 lần xem, để không gọi API quá nhiều.
const MAX_DAYS = 31;

type ChuyenRow = {
  workers: number;
  labor: number;
  perHour: number;
  perSlot: Map<string, number>;
  plan: number;
  actual: number;
};

type DayData = {
  date: string;
  factories: PphFactory[];
  chuyen: ChuyenRow;
};

// 1 dòng của bảng (cũng là 1 dòng của file Excel).
type Row = {
  kind: 'chuyen' | 'area' | 'leaf' | 'total';
  label: string;
  cn: number | null;
  labor: number | null;
  hours: number | null;
  perHour: number | null;
  perSlot: Map<string, number>;
  plan: number;
  actual: number;
  // Sản lượng đạt chất lượng (SLTH − lỗi) để tính PPH TH; PPH KH = PPH chuẩn/mục tiêu cho 1 người/giờ.
  good: number;
  pphKh: number | null;
  pphTh: number | null;
  leaf?: PphLeaf;
};

// PPH (1 người/giờ) — 2 chữ số thập phân, giống màn TV.
function fmtPph(n: number | null | undefined): string {
  if (n === null || n === undefined || Number.isNaN(n)) return '';
  return n.toLocaleString('vi-VN', { minimumFractionDigits: 2, maximumFractionDigits: 2 });
}
// Đơn vị PPH = sản lượng / giờ công; không có giờ công thì không tính.
function pphOf(qty: number, labor: number | null | undefined): number | null {
  return labor && labor > 0 ? qty / labor : null;
}

// Nhãn khung kiểu Sheet: mốc 08:30 = 07:30-08:30.
function slotLabel(slot: string): string {
  const [h, m] = slot.split(':');
  return `${String(Number(h) - 1).padStart(2, '0')}:${m}-${slot}`;
}

// Thứ trong tuần của 1 ngày (yyyy-mm-dd): CN, Thứ 2 … Thứ 7.
const WEEKDAYS = ['CN', 'Thứ 2', 'Thứ 3', 'Thứ 4', 'Thứ 5', 'Thứ 6', 'Thứ 7'];
function weekdayOf(iso: string): string {
  return WEEKDAYS[new Date(`${iso}T00:00:00Z`).getUTCDay()];
}

function fmt(n: number | null | undefined): string {
  if (n === null || n === undefined || Number.isNaN(n)) return '';
  return Math.round(n).toLocaleString('vi-VN');
}

// Các ngày từ `from` đến `to` (gồm cả 2 đầu), tối đa MAX_DAYS.
function datesBetween(from: string, to: string): string[] {
  let a = from, b = to;
  if (a > b) [a, b] = [b, a];
  const out: string[] = [];
  const d = new Date(`${a}T00:00:00Z`);
  const end = new Date(`${b}T00:00:00Z`);
  while (d <= end && out.length < MAX_DAYS) {
    out.push(d.toISOString().slice(0, 10));
    d.setUTCDate(d.getUTCDate() + 1);
  }
  return out;
}

// Số khung đã nhập sản lượng của 1 Tổ (mỗi khung 1 giờ), bỏ khung 07:30.
function leafHours(l: PphLeaf): number {
  return l.slots.filter((s) => s.filled && s.slot !== SKIP_SLOT).length;
}
// Khung tăng ca của 1 ca: mỗi giờ trên 8 là 1 khung, bắt đầu từ 18:00 (VD 12 giờ → 18:00 … 21:00).
function extraSlotsOf(productionHours: number | null | undefined): string[] {
  const extra = Math.round((productionHours ?? 0) - 8);
  if (!(extra > 0)) return [];
  return Array.from({ length: extra }, (_, i) => `${String(18 + i).padStart(2, '0')}:00`);
}
// Giờ công của 1 Tổ = "Thời gian sản xuất" Tổ khai lúc Cập nhật đầu ca. Chưa khai thì rớt về số khung đã nhập.
function leafWorkHours(l: PphLeaf): number {
  const h = l.setup?.productionHours;
  return h && h > 0 ? h : leafHours(l);
}

// Chuyền chuẩn trước 05/11: cộng Tổ 1 + Tổ 4 theo khung đã nhập.
function pphChuyen(leaves: PphLeaf[]): ChuyenRow {
  const members = leaves.filter((l) => CHUYEN_LEAF_IDS.includes(l.id));
  const perSlot = new Map<string, number>();
  members.forEach((l) => l.slots.forEach((s) => {
    if (!s.filled || s.slot === SKIP_SLOT) return;
    perSlot.set(s.slot, (perSlot.get(s.slot) || 0) + (s.actualQty || 0));
  }));
  return {
    workers: members.reduce((n, l) => n + (l.setup?.workerCount ?? 0), 0),
    labor: members.reduce((n, l) => n + (l.setup?.workerCount ?? 0) * leafWorkHours(l), 0),
    perHour: members.reduce((n, l) => n + (l.perHourTarget || 0), 0),
    perSlot,
    plan: members.reduce((n, l) => n + (l.cumulativeTarget || 0), 0),
    actual: members.reduce((n, l) => n + (l.cumulativeActual || 0), 0),
  };
}

// Chuyền chuẩn từ 05/11: trạm Đầu ra của Theo dõi chuyền. CN = 3 trạm cộng lại (như Sheet).
async function trackChuyen(date: string): Promise<ChuyenRow> {
  const bodies = await Promise.all(
    TRACK_POINTS.map((point) =>
      fetch(`/api/pph-track/scan-info?team=${TRACK_TEAM_ID}&point=${point}&date=${date}`).then((r) => r.json()),
    ),
  );
  bodies.forEach((b) => {
    if (!b?.success) throw new Error(b?.error || 'Không tải được Theo dõi chuyền');
  });
  const output = bodies[2];
  const perSlot = new Map<string, number>();
  (output.hourly || []).forEach((h: { slot: string; qty: number | null }) => {
    if (h.qty === null || h.qty === undefined || h.slot === SKIP_SLOT) return;
    perSlot.set(h.slot, Number(h.qty));
  });
  const perHour = Number(output.setup?.perHourTarget || 0);
  const workers = bodies.reduce((n, b) => n + Number(b.setup?.workerCount || 0), 0);
  return {
    workers,
    labor: workers * perSlot.size,
    perHour,
    perSlot,
    plan: perHour * perSlot.size,
    actual: [...perSlot.values()].reduce((n, q) => n + q, 0),
  };
}

// Tải 1 ngày: bảng Tổ (đã bỏ Tổ 1, Tổ 4) và hàng Chuyền chuẩn.
async function loadDay(date: string): Promise<DayData> {
  const res = await fetch(`/api/pph/dashboard?date=${date}`).then((r) => r.json());
  if (!res?.success || !res.data) throw new Error(res?.error || `Không tải được dữ liệu ngày ${date}`);
  const all: PphFactory[] = res.data.factories || [];
  const chuyen = date < TRACK_FROM ? pphChuyen(all.flatMap((f) => f.leaves)) : await trackChuyen(date);
  return {
    date,
    factories: all.map((f) => ({ ...f, leaves: f.leaves.filter((l) => !HIDDEN_LEAF_IDS.has(l.id)) })),
    chuyen,
  };
}

// Dựng các dòng của 1 ngày: Chuyền chuẩn, từng Xưởng (kèm các Tổ), rồi TỔNG.
function buildRows(day: DayData): Row[] {
  const { chuyen, factories } = day;
  const groups = new Map<string, PphLeaf[]>();
  factories.forEach((f) => f.leaves.forEach((l) => {
    const key = l.areaName || f.name;
    groups.set(key, [...(groups.get(key) || []), l]);
  }));

  const rows: Row[] = [];
  rows.push({
    kind: 'chuyen',
    label: 'CHUYỀN CHUẨN',
    cn: chuyen.workers,
    labor: chuyen.labor,
    hours: chuyen.perSlot.size,
    perHour: chuyen.perHour,
    perSlot: chuyen.perSlot,
    plan: chuyen.plan,
    actual: chuyen.actual,
    good: chuyen.actual,
    pphKh: chuyen.workers ? chuyen.perHour / chuyen.workers : null,
    pphTh: pphOf(chuyen.actual, chuyen.labor),
  });

  const areaRows: Row[] = [];
  groups.forEach((leaves, area) => {
    const perSlot = new Map<string, number>();
    leaves.forEach((l) => l.slots.forEach((s) => {
      if (!s.filled || s.slot === SKIP_SLOT) return;
      perSlot.set(s.slot, (perSlot.get(s.slot) || 0) + (s.actualQty || 0));
    }));
    const leafRows: Row[] = leaves.map((l) => {
      const leafSlots = new Map<string, number>();
      l.slots.forEach((s) => {
        if (s.filled && s.slot !== SKIP_SLOT) leafSlots.set(s.slot, s.actualQty || 0);
      });
      const cn = l.setup?.workerCount ?? null;
      const workHours = leafWorkHours(l);
      const labor = cn === null ? null : cn * workHours;
      const good = (l.cumulativeActual || 0) - (l.cumulativeErrors ?? 0);
      // Giống ô PPH trên TV: PPH chuẩn IE nếu có, không thì mục tiêu/giờ ÷ công nhân.
      const pphKh = l.pphStandard ?? (cn ? (l.perHourTarget || 0) / cn : null);
      return {
        kind: 'leaf',
        label: `   ${l.name}`,
        cn,
        labor,
        hours: workHours,
        perHour: l.perHourTarget || 0,
        perSlot: leafSlots,
        plan: l.cumulativeTarget || 0,
        actual: l.cumulativeActual || 0,
        good,
        pphKh,
        pphTh: pphOf(good, labor),
        leaf: l,
      };
    });
    const areaGood = leafRows.reduce((n, r) => n + r.good, 0);
    const areaCn = leafRows.reduce((n, r) => n + (r.cn ?? 0), 0);
    // PPH KH của Xưởng = trung bình theo công nhân của các Tổ (bằng mục tiêu/giờ ÷ công nhân khi không có PPH chuẩn).
    const khWeighted = leafRows.filter((r) => r.pphKh !== null && r.cn);
    const areaKh = khWeighted.length
      ? khWeighted.reduce((n, r) => n + (r.pphKh as number) * (r.cn as number), 0) / khWeighted.reduce((n, r) => n + (r.cn as number), 0)
      : null;
    const areaLabor = leafRows.reduce((n, r) => n + (r.labor ?? 0), 0);
    areaRows.push({
      kind: 'area',
      label: area,
      cn: areaCn,
      labor: areaLabor,
      hours: perSlot.size,
      perHour: leafRows.reduce((n, r) => n + (r.perHour ?? 0), 0),
      perSlot,
      plan: leafRows.reduce((n, r) => n + r.plan, 0),
      actual: leafRows.reduce((n, r) => n + r.actual, 0),
      good: areaGood,
      pphKh: areaKh,
      pphTh: pphOf(areaGood, areaLabor),
    });
    rows.push(areaRows[areaRows.length - 1], ...leafRows);
  });

  const total = new Map<string, number>();
  [chuyen.perSlot, ...areaRows.map((r) => r.perSlot)].forEach((m) => {
    m.forEach((v, k) => total.set(k, (total.get(k) || 0) + v));
  });
  rows.push({
    kind: 'total',
    label: 'TỔNG',
    cn: chuyen.workers + areaRows.reduce((n, r) => n + (r.cn ?? 0), 0),
    labor: chuyen.labor + areaRows.reduce((n, r) => n + (r.labor ?? 0), 0),
    hours: null,
    perHour: null,
    perSlot: total,
    plan: chuyen.plan + areaRows.reduce((n, r) => n + r.plan, 0),
    actual: chuyen.actual + areaRows.reduce((n, r) => n + r.actual, 0),
    good: chuyen.actual + areaRows.reduce((n, r) => n + r.good, 0),
    pphKh: null,
    pphTh: pphOf(
      chuyen.actual + areaRows.reduce((n, r) => n + r.good, 0),
      chuyen.labor + areaRows.reduce((n, r) => n + (r.labor ?? 0), 0),
    ),
  });
  return rows;
}

export default function PphDayClient() {
  const today = todayVNStr();
  const [from, setFrom] = useState<string>(today);
  const [to, setTo] = useState<string>(today);
  const [days, setDays] = useState<DayData[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [updatedAt, setUpdatedAt] = useState<string | null>(null);
  // Nhập sản lượng ngay trên trang: mở đúng form của trang quét Tổ (/pph-scan) trong khung nổi, cùng luật
  // và cùng nơi lưu như tổ trưởng quét QR dưới nhà máy. Đóng khung thì tải lại bảng.
  const [entryTeam, setEntryTeam] = useState<{ id: string; name: string } | null>(null);
  const [refreshTick, setRefreshTick] = useState(0);

  useEffect(() => {
    document.title = 'Sản lượng theo ngày — TBS';
  }, []);

  const dates = useMemo(() => datesBetween(from, to), [from, to]);
  const truncated = useMemo(() => {
    const a = from > to ? to : from;
    const b = from > to ? from : to;
    const span = Math.round((new Date(`${b}T00:00:00Z`).getTime() - new Date(`${a}T00:00:00Z`).getTime()) / 86400000) + 1;
    return span > MAX_DAYS;
  }, [from, to]);

  useEffect(() => {
    let cancelled = false;
    const run = () =>
      Promise.all(dates.map(loadDay))
        .then((result) => {
          if (cancelled) return;
          setDays(result);
          setError(null);
          setUpdatedAt(new Date().toLocaleTimeString('vi-VN'));
        })
        .catch((e) => {
          if (cancelled) return;
          setError(e instanceof Error ? e.message : 'Không kết nối được tới hệ thống');
        });
    setLoading(true);
    run().finally(() => {
      if (!cancelled) setLoading(false);
    });
    // Tự làm mới mỗi 30 giây (tải lại âm thầm, không hiện "Đang tải"), không cần F5 khi số liệu thay đổi.
    const timer = setInterval(() => {
      if (!cancelled) run();
    }, 30000);
    return () => {
      cancelled = true;
      clearInterval(timer);
    };
  }, [dates, refreshTick]);

  // Mọi khung của cả khoảng: khung cố định + khung phát sinh (VD tăng ca) ở bất kỳ ngày nào.
  const slots = useMemo(() => {
    const set = new Set<string>(BASE_SLOTS);
    days.forEach((d) => {
      d.chuyen.perSlot.forEach((_, k) => set.add(k));
      d.factories.forEach((f) => f.leaves.forEach((l) => {
        l.slots.forEach((s) => {
          if (s.filled && s.slot !== SKIP_SLOT) set.add(s.slot);
        });
        // Tổ khai Thời gian sản xuất > 8 giờ (VD 12 giờ → tăng ca 18:00, 19:00, 20:00, 21:00): thêm đủ cột
        // tăng ca đó dù chưa có số, để ngày nhập ca dài có sẵn cột 21:00 như ca đã khai.
        extraSlotsOf(l.setup?.productionHours).forEach((k) => set.add(k));
      }));
    });
    return [...set].sort();
  }, [days]);

  const model = useMemo(() => days.map((d) => ({ date: d.date, rows: buildRows(d) })), [days]);

  function exportExcel() {
    const n = (v: number | null | undefined) => (v === null || v === undefined ? '' : Math.round(v));
    const aoa: (string | number)[][] = [
      ['Ngày', 'Tổ', 'CN', 'Tổng giờ công sử dụng (CN x Giờ)', 'Giờ công', 'SLKH/giờ', ...slots.map(slotLabel), 'SLKH', 'SLTH', '+/-', 'PPH KH', 'PPH TH'],
    ];
    model.forEach(({ date, rows }) => {
      rows.forEach((r) => {
        aoa.push([
          `${date} (${weekdayOf(date)})`,
          r.label.trim(),
          n(r.cn),
          n(r.labor),
          n(r.hours),
          n(r.perHour),
          ...slots.map((s) => n(r.perSlot.get(s))),
          n(r.plan),
          n(r.actual),
          Math.round(r.actual - r.plan),
          r.pphKh === null ? '' : Math.round(r.pphKh * 100) / 100,
          r.pphTh === null ? '' : Math.round(r.pphTh * 100) / 100,
        ]);
      });
    });
    const ws = XLSX.utils.aoa_to_sheet(aoa);
    const wb = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(wb, ws, 'Sản lượng');
    XLSX.writeFile(wb, `SL_chuyen_chuan_${dates[0]}_${dates[dates.length - 1]}.xlsx`);
  }

  return (
    <div className="min-h-screen bg-white p-4 text-slate-900">
      <div className="mb-3 flex flex-wrap items-center gap-3">
        <h1 className="text-lg font-black">SẢN LƯỢNG CHUYỀN CHUẨN THEO NGÀY</h1>
        <label className="flex items-center gap-2 text-sm font-bold">
          Từ ngày
          <input
            type="date"
            value={from}
            onChange={(e) => e.target.value && setFrom(e.target.value)}
            className="rounded border border-slate-300 px-2 py-1"
          />
        </label>
        <label className="flex items-center gap-2 text-sm font-bold">
          Đến ngày
          <input
            type="date"
            value={to}
            onChange={(e) => e.target.value && setTo(e.target.value)}
            className="rounded border border-slate-300 px-2 py-1"
          />
        </label>
        <button
          type="button"
          onClick={exportExcel}
          disabled={loading || days.length === 0}
          className="rounded bg-[#1f3864] px-3 py-1.5 text-sm font-bold text-white disabled:opacity-40"
        >
          Tải Excel
        </button>
        {loading && <span className="text-sm text-slate-400">Đang tải...</span>}
        {updatedAt && !loading && (
          <span className="text-xs text-slate-400">Cập nhật lúc {updatedAt} · tự làm mới mỗi 30 giây</span>
        )}
      </div>

      {truncated && (
        <div className="mb-3 rounded bg-amber-50 p-2 text-xs font-bold text-amber-700">
          Chỉ hiện tối đa {MAX_DAYS} ngày đầu tiên của khoảng đã chọn.
        </div>
      )}
      {error && <div className="mb-3 rounded bg-rose-50 p-3 text-sm font-bold text-rose-600">⚠ {error}</div>}

      {!loading && !error && days.length === 0 && (
        <div className="rounded bg-slate-50 p-6 text-center text-sm text-slate-500">Chưa có dữ liệu cho khoảng ngày này.</div>
      )}

      {model.map((m) => (
        <DayTable
          key={m.date}
          date={m.date}
          rows={m.rows}
          slots={slots}
          onEnter={setEntryTeam}
          onSaved={() => setRefreshTick((t) => t + 1)}
        />
      ))}

      {entryTeam && (
        <div className="fixed inset-0 z-50 flex flex-col bg-black/50 p-2 sm:p-6">
          <div className="mx-auto flex h-full w-full max-w-3xl flex-col overflow-hidden rounded-xl bg-white shadow-xl">
            <div className="flex items-center justify-between gap-2 border-b border-slate-200 px-4 py-2">
              <span className="text-sm font-black">Nhập sản lượng — {entryTeam.name}</span>
              <button
                type="button"
                onClick={() => {
                  setEntryTeam(null);
                  setRefreshTick((t) => t + 1);
                }}
                className="rounded border border-slate-300 px-3 py-1 text-sm font-bold"
              >
                Đóng
              </button>
            </div>
            <iframe
              key={entryTeam.id}
              src={`/pph-scan?team=${encodeURIComponent(entryTeam.id)}&embed=1`}
              title="Nhập sản lượng"
              className="w-full flex-1 border-0"
            />
          </div>
        </div>
      )}
    </div>
  );
}

// Giờ hiện tại theo giờ VN (HH:MM), để biết khung nào đã tới giờ nhưng chưa nhập.
function vnNowHM(): string {
  return new Date().toLocaleTimeString('en-GB', { timeZone: 'Asia/Ho_Chi_Minh', hour: '2-digit', minute: '2-digit', hour12: false });
}
// Khung ca chính: từ 08:00 đến trước 18:00 (bỏ 07:30 và các khung tăng ca 18:00 trở đi).
function isRegularSlot(slot: string): boolean {
  return slot > SKIP_SLOT && slot < OVERTIME_FROM;
}
// Khung đã tới giờ để nhập: ngày trước hôm nay thì mọi khung đều đã qua; hôm nay thì khung <= giờ hiện tại.
function isSlotDue(date: string, slot: string, today: string, nowHM: string): boolean {
  if (date < today) return true;
  if (date === today) return slot <= nowHM;
  return false;
}

// Ô sửa trực tiếp kiểu Excel: bấm để sửa, Enter hoặc rời ô để lưu, Esc để hủy. Không đổi gì thì không ghi.
function EditableTd({
  display,
  initial,
  editable,
  className,
  title,
  onCommit,
}: {
  display: string;
  initial: string;
  editable: boolean;
  className?: string;
  title?: string;
  onCommit: (raw: string) => Promise<string | null>;
}) {
  const [editing, setEditing] = useState(false);
  const [draft, setDraft] = useState(initial);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState<string | null>(null);

  if (!editable) return <td className={className} title={title}>{display}</td>;

  if (!editing) {
    return (
      <td
        className={`${className ?? ''} cursor-pointer hover:bg-emerald-50`}
        title={error ?? title ?? 'Bấm để sửa'}
        onClick={() => {
          setDraft(initial);
          setError(null);
          setEditing(true);
        }}
      >
        {display}
      </td>
    );
  }

  async function commit() {
    if (saving) return;
    if (draft.trim() === initial.trim()) {
      setEditing(false);
      return;
    }
    setSaving(true);
    const err = await onCommit(draft.trim());
    setSaving(false);
    if (err) {
      setError(err);
      return;
    }
    setEditing(false);
  }

  return (
    <td className={`${className ?? ''} !p-0.5`}>
      <input
        autoFocus
        type="number"
        step="any"
        value={draft}
        disabled={saving}
        onChange={(e) => setDraft(e.target.value)}
        onKeyDown={(e) => {
          if (e.key === 'Enter') commit();
          if (e.key === 'Escape') {
            setError(null);
            setEditing(false);
          }
        }}
        onBlur={commit}
        className={`w-20 rounded border-2 bg-white px-1 py-0.5 text-center text-sm font-bold text-slate-900 outline-none ${
          error ? 'border-rose-500' : 'border-emerald-600'
        }`}
      />
      {error && <div className="mt-0.5 max-w-[12rem] whitespace-normal text-[10px] font-bold leading-tight text-rose-600">{error}</div>}
    </td>
  );
}

// Bảng 1 ngày: cùng bộ cột với mọi ngày khác trong khoảng đã chọn.
function DayTable({
  date,
  rows,
  slots,
  onEnter,
  onSaved,
}: {
  date: string;
  rows: Row[];
  slots: string[];
  onEnter?: (team: { id: string; name: string }) => void;
  onSaved?: () => void;
}) {
  const hasData = rows.some((r) => r.perSlot.size > 0);
  const today = todayVNStr();
  const nowHM = vnNowHM();

  // Ghi 1 ô đã sửa qua PUT /api/pph/scan — cùng API với form quét. Ngày khác hôm nay thì gửi kèm entryDate
  // (server chỉ nhận ngày trong khoảng nhập bù). Trả về thông báo lỗi, hoặc null nếu lưu được.
  async function putScan(body: Record<string, unknown>): Promise<string | null> {
    const payload: Record<string, unknown> = { ...body, submittedBy: 'Sửa trực tiếp trên /pph-day' };
    if (date !== today) payload.entryDate = date;
    const res = await fetch('/api/pph/scan', {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(payload),
    })
      .then((r) => r.json())
      .catch(() => ({ success: false, error: 'Không kết nối được tới hệ thống' }));
    if (!res.success) return res.error || 'Không lưu được';
    onSaved?.();
    return null;
  }

  return (
    <div className="mb-6">
      <div className="mb-1 text-sm font-black">
        Ngày {date} ({weekdayOf(date)})
        <span className="ml-3 text-xs font-bold text-amber-700">Ô vàng = khung ca chính đã tới giờ nhưng chưa nhập (không tính tăng ca)</span>
      </div>
      {!hasData && <div className="mb-2 rounded bg-slate-50 p-2 text-xs text-slate-500">Ngày {date} chưa có số sản lượng.</div>}
      <div className="overflow-x-auto">
        <table className="min-w-full border-collapse text-center text-sm">
          <thead>
            <tr className="bg-[#1f3864] text-white">
              <th className="sticky left-0 z-10 bg-[#1f3864] px-2 py-1 text-left">Tổ</th>
              <th className="px-2 py-1">CN</th>
              <th className="px-2 py-1">Tổng giờ công sử dụng (CN x Giờ)</th>
              <th className="px-2 py-1">Giờ công</th>
              <th className="px-2 py-1">SLKH/giờ</th>
              {slots.map((s) => (
                <th key={s} className="whitespace-nowrap px-2 py-1">{slotLabel(s)}</th>
              ))}
              <th className="px-2 py-1">SLKH</th>
              <th className="px-2 py-1">SLTH</th>
              <th className="px-2 py-1">+/-</th>
              <th className="px-2 py-1">PPH KH</th>
              <th className="px-2 py-1">PPH TH</th>
            </tr>
          </thead>
          <tbody>
            {rows.map((r, i) => {
              const rowCls =
                r.kind === 'chuyen' ? 'bg-[#fff2cc] font-black'
                  : r.kind === 'area' ? 'bg-[#e2efda] font-bold'
                    : r.kind === 'total' ? 'bg-[#d9e1f2] font-black'
                      : 'border-b border-slate-200';
              const leafId = r.kind === 'leaf' ? r.leaf?.id : undefined;
              return (
                <tr key={`${r.kind}-${r.label}-${i}`} className={rowCls}>
                  <td className={`sticky left-0 px-2 py-1 text-left ${r.kind === 'leaf' ? 'bg-white' : r.kind === 'chuyen' ? 'bg-[#fff2cc]' : r.kind === 'area' ? 'bg-[#e2efda]' : 'bg-[#d9e1f2]'}`}>
                    {r.label}
                    {leafId && onEnter && (
                      <button
                        type="button"
                        onClick={() => onEnter({ id: leafId, name: `${date} · ${r.label.trim()}` })}
                        className="ml-2 rounded bg-emerald-600 px-1.5 py-0.5 text-[10px] font-bold text-white hover:bg-emerald-700"
                      >
                        Nhập
                      </button>
                    )}
                  </td>
                  <EditableTd
                    className="px-2 py-1"
                    display={fmt(r.cn)}
                    initial={r.cn == null ? '' : String(r.cn)}
                    editable={!!leafId}
                    onCommit={(raw) => {
                      const wc = Number(raw);
                      if (!Number.isFinite(wc) || wc <= 0) return Promise.resolve('Số công nhân không hợp lệ');
                      return putScan({ teamId: leafId ?? '', workerCount: wc });
                    }}
                  />
                  <td className="px-2 py-1">{fmt(r.labor)}</td>
                  <td className="px-2 py-1">{fmt(r.hours)}</td>
                  <EditableTd
                    className="px-2 py-1"
                    display={r.kind === 'total' ? '' : fmt(r.perHour)}
                    initial={r.kind === 'leaf' && r.perHour != null ? String(Math.round(r.perHour * 100) / 100) : ''}
                    editable={!!leafId}
                    title="SLKH/giờ — bấm để sửa"
                    onCommit={(raw) => {
                      const ph = Number(raw);
                      if (!Number.isFinite(ph) || ph <= 0) return Promise.resolve('SLKH/giờ không hợp lệ');
                      return putScan({ teamId: leafId ?? '', perHourTarget: ph });
                    }}
                  />
                  {slots.map((s) => {
                    const q = r.perSlot.get(s);
                    const below = r.leaf && q !== undefined && r.leaf.perHourTarget > 0 && q < r.leaf.perHourTarget;
                    // Tổ đã có Cập nhật đầu ca (cn không rỗng), khung ca chính đã tới giờ mà chưa có số → tô vàng.
                    const missing = r.kind === 'leaf' && r.cn !== null && q === undefined
                      && isRegularSlot(s) && isSlotDue(date, s, today, nowHM);
                    const cls = missing ? 'bg-amber-200 font-bold text-amber-900' : below ? 'font-bold text-rose-600' : '';
                    // Chỉ sửa được khung ĐÃ CÓ số. Khung trống thì dùng nút "Nhập" (đúng luật nộp số).
                    const slotRow = r.kind === 'leaf' ? r.leaf?.slots.find((x) => x.slot === s) : undefined;
                    const filledSlot = !!slotRow?.filled;
                    return (
                      <EditableTd
                        key={s}
                        className={`px-2 py-1 ${cls}`}
                        display={q === undefined ? '' : fmt(q)}
                        initial={q === undefined ? '' : String(q)}
                        editable={filledSlot && !!leafId}
                        title={missing ? 'Chưa nhập khung giờ này' : filledSlot ? 'Bấm để sửa số lượng' : undefined}
                        onCommit={(raw) => {
                          const aq = Number(raw);
                          if (!Number.isFinite(aq) || aq < 0) return Promise.resolve('Số lượng không hợp lệ');
                          return putScan({
                            teamId: leafId ?? '',
                            slot: s,
                            actualQty: aq,
                            errorCount: slotRow?.errorCount ?? 0,
                          });
                        }}
                      />
                    );
                  })}
                  <td className="px-2 py-1">{fmt(r.plan)}</td>
                  <td className="px-2 py-1">{fmt(r.actual)}</td>
                  <DiffCell plan={r.plan} actual={r.actual} />
                  <td className="px-2 py-1">{fmtPph(r.pphKh)}</td>
                  <PphThCell th={r.pphTh} kh={r.pphKh} />
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
}

// PPH TH tô theo độ lệch so với PPH KH: thấp hơn (âm) tô đỏ, cao hơn (dương) tô xanh — cùng màu với cột +/-.
function PphThCell({ th, kh }: { th: number | null; kh: number | null }) {
  const diff = th !== null && kh !== null ? th - kh : null;
  const cls = diff === null ? '' : diff < 0 ? 'bg-[#e06666] text-white' : diff > 0 ? 'bg-[#93c47d]' : '';
  return <td className={`px-2 py-1 font-bold ${cls}`}>{fmtPph(th)}</td>;
}

function DiffCell({ plan, actual }: { plan: number; actual: number }) {
  const diff = actual - plan;
  const cls = diff < 0 ? 'bg-[#e06666] text-white' : diff > 0 ? 'bg-[#93c47d]' : '';
  return <td className={`px-2 py-1 font-bold ${cls}`}>{fmt(diff)}</td>;
}
