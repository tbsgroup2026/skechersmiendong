// Theo dõi chuyền: nhiều mã giày trong 1 ngày. DÙNG CHUNG cho Worker (web/public/_worker.js) và form nhập.
//
// Mỗi "lượt mã" (run) là 1 khoảng sản xuất 1 mã trên 1 trạm của 1 Tổ:
//   - Lượt đầu tiên chính là đầu ca (pph_track_shift_setup), id = '' và không có giờ bắt đầu.
//   - Mỗi lần chuyển mã thêm 1 lượt (pph_track_runs), bắt đầu từ lúc dừng mã cũ (startTime).
//
// Thời gian chuyển mã (startTime → resumedAt) vẫn nằm trong giờ công của mã MỚI, nên chuyển mã lâu thì PPH
// của mã mới giảm. PPH kế hoạch và thực hiện luôn tính theo từng mã vì mỗi mã có layout và công đoạn khác nhau.
import { laborHours, meetsPlan, pphFromLaborHours } from './pphCalc.ts';

export type TrackRun = {
  id: string;
  teamId?: string;
  point?: string;
  model: string;
  color: string;
  size: string;
  shiftHours: number;
  workerCount: number;
  plannedQty: number;
  planPph: number | null;
  perHourTarget: number;
  startTime: string | null;
  resumedAt: string | null;
};
export type TrackRowInput = {
  team_id?: string;
  point: string;
  slot: string;
  qty: number;
  run_id?: string | null;
  worker_count?: number | null;
  work_hours?: number | null;
};

// Nghỉ trưa không tính vào thời gian làm việc: khớp 8 giờ chuẩn của các khung 07:30 → 16:30.
const LUNCH_START = 11 * 60 + 30;
const LUNCH_END = 12 * 60 + 30;

export function timeToMinutes(time: string): number {
  const [hour, minute] = time.split(':').map(Number);
  return hour * 60 + minute;
}

export function isValidTime(time: unknown): time is string {
  return typeof time === 'string' && /^([01]\d|2[0-3]):[0-5]\d$/.test(time);
}

const round2 = (value: number) => Math.round(value * 100) / 100;
const normalizeModel = (model: string | null | undefined) => String(model ?? '').trim().toUpperCase();

// Số phút làm việc giữa 2 mốc, đã trừ nghỉ trưa.
function workingMinutes(from: number, to: number): number {
  if (to <= from) return 0;
  const lunch = Math.max(0, Math.min(to, LUNCH_END) - Math.max(from, LUNCH_START));
  return to - from - lunch;
}

// Null khi chưa ghi nhận có sản lượng lại.
export function changeoverMinutes(run: Pick<TrackRun, 'startTime' | 'resumedAt'>): number | null {
  if (!run.startTime || !run.resumedAt) return null;
  return workingMinutes(timeToMinutes(run.startTime), timeToMinutes(run.resumedAt));
}

// Mỗi khung báo cáo số từ lần báo cáo trước tới mốc của khung. Khung sau nghỉ trưa chỉ tính từ lúc vào làm lại.
function slotWindow(slots: string[], slot: string): { start: number; end: number } {
  const end = timeToMinutes(slot);
  const index = slots.indexOf(slot);
  const previous = index > 0 ? timeToMinutes(slots[index - 1]) : end;
  return { start: previous <= LUNCH_START && end > LUNCH_END ? LUNCH_END : previous, end };
}

export type SlotPart = { run: TrackRun; workHours: number | null };

// Các mã chạy trong 1 khung giờ. Có đổi mã giữa khung thì trả nhiều phần, kèm giờ làm tự tính để điền sẵn; thời
// gian chuyển mã nằm trong phần của mã mới. Chỉ 1 mã thì workHours = null để giữ mặc định của form.
export function slotParts(runs: TrackRun[], slots: string[], slot: string): SlotPart[] {
  const { start, end } = slotWindow(slots, slot);
  const spans = runs.map((run, i) => {
    const next = runs[i + 1];
    return {
      run,
      from: run.startTime ? timeToMinutes(run.startTime) : -Infinity,
      to: next?.startTime ? timeToMinutes(next.startTime) : Infinity,
    };
  });
  const active = spans.filter((s) => s.from < end && s.to > start);
  if (active.length <= 1) {
    const only = active[0]?.run ?? [...spans].reverse().find((s) => s.from < end)?.run ?? runs[0];
    return only ? [{ run: only, workHours: null }] : [];
  }
  return active.map((s) => ({
    run: s.run,
    workHours: round2(workingMinutes(Math.max(s.from, start), Math.min(s.to, end)) / 60),
  }));
}

// Mã đang chạy ở cuối khung giờ, dùng cho mục tiêu sản lượng và PPH kế hoạch của giờ chưa nhập.
export function runAtSlot(runs: TrackRun[], slots: string[], slot: string): TrackRun | undefined {
  return slotParts(runs, slots, slot).at(-1)?.run;
}

function groupByTeam(runs: TrackRun[]): TrackRun[][] {
  const teams = new Map<string, TrackRun[]>();
  for (const run of runs) {
    const key = run.teamId ?? '';
    teams.set(key, [...(teams.get(key) ?? []), run]);
  }
  return Array.from(teams.values());
}

function findRun(runs: TrackRun[], teamId: string | undefined, runId: string | null | undefined): TrackRun | undefined {
  const id = runId ?? '';
  return runs.find((r) => r.id === id && (teamId == null || r.teamId == null || r.teamId === teamId));
}

type HourBase = { slot: string; qty: number | null; cumulativeQty: number | null };

// Bảng Đầu ra theo giờ cho form nhập (1 Tổ) và TV (cả Line). PPH kế hoạch của giờ đã nhập lấy trung bình các mã
// theo giờ công; giờ chưa nhập lấy theo mã đang chạy và số công nhân. Dòng thiếu lao động hoặc giờ làm không tính PPH.
// totalWorkers (TV cả Line): PPH thực hiện = sản lượng đạt chất lượng / (tổng công nhân 3 khu × giờ làm), không
// dùng số người khai riêng ở Đầu ra. PPH kế hoạch = sản lượng kế hoạch của giờ / tổng công nhân 3 khu. Không truyền
// totalWorkers thì tính như cũ.
export function trackOutputHourly(series: HourBase[], rows: TrackRowInput[], runs: TrackRun[], slots: string[], totalWorkers?: number) {
  const teams = groupByTeam(runs);
  return series.map((hour) => {
    const entered = rows.filter((r) => r.point === 'daura' && r.slot === hour.slot && r.worker_count != null && r.work_hours != null);
    // Hai mã trong cùng giờ vẫn là 1 nhóm người: lấy số lớn nhất của Tổ, không cộng trùng.
    const workersByTeam = new Map<string, number>();
    let labor = 0;
    let goodQty = 0;
    let planWeighted = 0;
    let planLabor = 0;
    for (const row of entered) {
      const key = row.team_id ?? '';
      workersByTeam.set(key, Math.max(workersByTeam.get(key) ?? 0, Number(row.worker_count)));
      const rowLabor = laborHours(row.worker_count, row.work_hours) ?? 0;
      labor += rowLabor;
      goodQty += Number(row.qty);
      const plan = findRun(runs, row.team_id, row.run_id)?.planPph;
      if (plan != null && rowLabor > 0) {
        planWeighted += plan * rowLabor;
        planLabor += rowLabor;
      }
    }
    let planPph: number | null;
    if (planLabor > 0) {
      planPph = round2(planWeighted / planLabor);
    } else {
      const active = teams.map((team) => runAtSlot(team, slots, hour.slot)).filter((r): r is TrackRun => !!r && r.planPph != null && r.workerCount > 0);
      const workers = active.reduce((sum, r) => sum + r.workerCount, 0);
      planPph = workers > 0 ? round2(active.reduce((sum, r) => sum + (r.planPph as number) * r.workerCount, 0) / workers) : null;
    }
    if (totalWorkers != null && totalWorkers > 0) {
      const hourWorkHours = entered.length ? Math.max(...entered.map((r) => Number(r.work_hours))) : 0;
      const lineLabor = entered.length && hourWorkHours > 0 ? totalWorkers * hourWorkHours : 0;
      // PPH kế hoạch của giờ = sản lượng kế hoạch của giờ / tổng lao động 3 khu; PPH thực hiện cùng mẫu số.
      const hourTarget = teams.reduce((sum, team) => sum + (runAtSlot(team, slots, hour.slot)?.perHourTarget ?? 0), 0);
      const linePlan = hourTarget > 0 ? round2(hourTarget / totalWorkers) : null;
      const lineActual = pphFromLaborHours(goodQty, lineLabor);
      return {
        ...hour,
        workerCount: entered.length ? totalWorkers : null,
        workHours: entered.length ? round2(hourWorkHours) : null,
        laborHours: entered.length ? round2(lineLabor) : null,
        planPph: linePlan,
        actualPph: lineActual,
        met: meetsPlan(lineActual, linePlan),
      };
    }
    const workers = Array.from(workersByTeam.values()).reduce((sum, value) => sum + value, 0);
    const actual = pphFromLaborHours(goodQty, labor);
    return {
      ...hour,
      workerCount: entered.length ? workers : null,
      workHours: entered.length && workers > 0 ? round2(labor / workers) : null,
      laborHours: entered.length ? round2(labor) : null,
      planPph,
      actualPph: actual,
      met: meetsPlan(actual, planPph),
    };
  });
}

export type TrackModelSummary = {
  model: string;
  plannedQty: number;
  outputQty: number;
  defectQty: number;
  laborHours: number;
  planPph: number | null;
  actualPph: number | null;
  met: boolean | null;
  changeoverCount: number;
  changeoverMinutes: number;
  changingOver: boolean;
  running: boolean;
};

// Tổng hợp cả ngày theo từng mã. Cùng 1 mã chạy lại trong ngày hoặc chạy ở nhiều Tổ thì gộp làm 1 dòng.
export function trackModelSummary(rows: TrackRowInput[], runs: TrackRun[]): TrackModelSummary[] {
  const currentRuns = new Set(groupByTeam(runs).map((team) => team[team.length - 1]));
  const models = new Map<string, TrackModelSummary & { planWeighted: number; planLabor: number; planFallback: number | null }>();
  for (const run of runs) {
    const key = normalizeModel(run.model);
    const item = models.get(key) ?? {
      model: run.model,
      plannedQty: 0,
      outputQty: 0,
      defectQty: 0,
      laborHours: 0,
      planPph: null,
      actualPph: null,
      met: null,
      changeoverCount: 0,
      changeoverMinutes: 0,
      changingOver: false,
      running: false,
      planWeighted: 0,
      planLabor: 0,
      planFallback: null,
    };
    item.plannedQty += run.plannedQty;
    item.planFallback ??= run.planPph;
    if (run.startTime) {
      item.changeoverCount += 1;
      item.changeoverMinutes += changeoverMinutes(run) ?? 0;
      if (!run.resumedAt) item.changingOver = true;
    }
    if (currentRuns.has(run)) item.running = true;
    models.set(key, item);
  }
  for (const row of rows) {
    const run = findRun(runs, row.team_id, row.run_id);
    const item = run && models.get(normalizeModel(run.model));
    if (!run || !item) continue;
    if (row.point === 'qc') item.defectQty += Number(row.qty);
    if (row.point !== 'daura') continue;
    item.outputQty += Number(row.qty);
    const labor = laborHours(row.worker_count, row.work_hours) ?? 0;
    item.laborHours += labor;
    if (run.planPph != null && labor > 0) {
      item.planWeighted += run.planPph * labor;
      item.planLabor += labor;
    }
  }
  return Array.from(models.values()).map(({ planWeighted, planLabor, planFallback, ...item }) => {
    const planPph = planLabor > 0 ? round2(planWeighted / planLabor) : planFallback;
    const actualPph = pphFromLaborHours(item.outputQty, item.laborHours);
    return { ...item, laborHours: round2(item.laborHours), planPph, actualPph, met: meetsPlan(actualPph, planPph) };
  });
}

// Mục tiêu tới hiện tại: mỗi khung đã mở tính theo mã chạy trong khung đó, không vượt tổng kế hoạch.
export function trackTargetSoFar(runs: TrackRun[], slots: string[], openSlots: string[]): number {
  const planned = runs.reduce((sum, r) => sum + r.plannedQty, 0);
  const target = groupByTeam(runs).reduce(
    (total, team) => total + openSlots.reduce((sum, slot) => sum + (runAtSlot(team, slots, slot)?.perHourTarget ?? 0), 0),
    0,
  );
  return Math.min(planned, target);
}

// Người đang làm: số của giờ gần nhất thuộc mã đang chạy; mã đó chưa nhập giờ nào thì lấy số khai khi vào mã.
export function trackActiveWorkers(rows: TrackRowInput[], runs: TrackRun[]): number {
  return groupByTeam(runs).reduce((sum, team) => {
    const current = team[team.length - 1];
    const latest = rows
      .filter((r) => r.point === 'daura' && r.worker_count != null && (r.team_id == null || r.team_id === current.teamId) && (r.run_id ?? '') === current.id)
      .sort((a, b) => a.slot.localeCompare(b.slot))
      .pop();
    return sum + (latest ? Number(latest.worker_count) : current.workerCount);
  }, 0);
}

// Tập trung → Đầu vào của riêng 1 mã. runs gồm lượt của cả 2 trạm để biết mỗi dòng thuộc mã nào.
export function trackSupplyForModel(rows: TrackRowInput[], runs: TrackRun[], model: string) {
  const target = normalizeModel(model);
  const sum = (point: string) =>
    rows
      .filter((r) => r.point === point)
      .filter((r) => normalizeModel(runs.find((run) => run.point === point && run.id === (r.run_id ?? ''))?.model) === target)
      .reduce((total, r) => total + Number(r.qty), 0);
  const collected = sum('khutaptrung');
  const input = sum('dauvao');
  return { collected, input, gap: collected - input };
}
