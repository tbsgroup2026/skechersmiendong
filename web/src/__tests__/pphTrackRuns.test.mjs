// Chạy từ thư mục web: node --test src/__tests__/pphTrackRuns.test.mjs
import assert from 'node:assert/strict';
import test from 'node:test';
import {
  changeoverMinutes,
  runAtSlot,
  slotParts,
  trackActiveWorkers,
  trackModelSummary,
  trackOutputHourly,
  trackSupplyForModel,
  trackTargetSoFar,
} from '../modules/production/pphTrackRuns.ts';

const SLOTS = ['07:00', '07:30', '08:30', '09:30', '10:30', '11:30', '13:30', '14:30', '15:30', '16:30'];
const run = (over = {}) => ({
  id: '',
  teamId: 't1',
  point: 'daura',
  model: 'A',
  color: 'BLK',
  size: '40',
  shiftHours: 8,
  workerCount: 40,
  plannedQty: 800,
  planPph: 5,
  perHourTarget: 100,
  startTime: null,
  resumedAt: null,
  ...over,
});
const runB = (over = {}) => run({ id: 'b', model: 'B', planPph: 3, plannedQty: 200, perHourTarget: 50, workerCount: 30, startTime: '09:00', resumedAt: '09:20', ...over });
const output = (slot, qty, runId, workers, hours, team = 't1') => ({ team_id: team, point: 'daura', slot, qty, run_id: runId, worker_count: workers, work_hours: hours });
const series = (values) => SLOTS.slice(1).map((slot) => ({ slot, qty: values[slot] ?? null, cumulativeQty: null }));

test('không chuyển mã thì mỗi khung chỉ có 1 mã và giữ giờ làm mặc định', () => {
  assert.deepEqual(slotParts([run()], SLOTS, '09:30').map((p) => [p.run.model, p.workHours]), [['A', null]]);
});

test('đổi mã giữa khung tách giờ làm, thời gian chuyển mã tính cho mã mới', () => {
  const parts = slotParts([run(), runB()], SLOTS, '09:30');
  assert.deepEqual(parts.map((p) => [p.run.model, p.workHours]), [['A', 0.5], ['B', 0.5]]);
});

test('khung trước và sau khi đổi mã chỉ có 1 mã', () => {
  const runs = [run(), runB()];
  assert.equal(slotParts(runs, SLOTS, '08:30').length, 1);
  assert.equal(runAtSlot(runs, SLOTS, '08:30').model, 'A');
  assert.equal(slotParts(runs, SLOTS, '10:30').length, 1);
  assert.equal(runAtSlot(runs, SLOTS, '10:30').model, 'B');
});

test('đổi mã đúng mốc khung thì không tách', () => {
  assert.equal(slotParts([run(), runB({ startTime: '09:30' })], SLOTS, '09:30')[0].run.model, 'A');
  assert.equal(slotParts([run(), runB({ startTime: '09:30' })], SLOTS, '09:30').length, 1);
  assert.equal(slotParts([run(), runB({ startTime: '09:30' })], SLOTS, '10:30')[0].run.model, 'B');
});

test('nhiều lần đổi mã trong 1 khung tách đủ các mã và tổng giờ vẫn là 1', () => {
  const parts = slotParts([run(), runB({ startTime: '08:45' }), runB({ id: 'c', model: 'C', startTime: '09:15' })], SLOTS, '09:30');
  assert.deepEqual(parts.map((p) => p.workHours), [0.25, 0.5, 0.25]);
});

test('TV cả Line: PPH chia cho tổng lao động của Line, không chỉ người khai ở Đầu ra', () => {
  // 50 đôi kế hoạch/giờ, 61 người cả Line, Đầu ra khai 19 người, thực tế 51 đôi trong 1 giờ.
  const runs = [run({ planPph: 2.63, plannedQty: 400, perHourTarget: 50, workerCount: 19 })];
  const [hour] = trackOutputHourly(series({ '09:30': 51 }).filter((h) => h.slot === '09:30'), [output('09:30', 51, '', 19, 1)], runs, SLOTS, 61);
  assert.equal(hour.planPph, 0.82);
  assert.equal(hour.actualPph, 0.84);
  assert.equal(hour.laborHours, 61);
  assert.equal(hour.met, true);
});

test('khung sau nghỉ trưa không tính giờ nghỉ', () => {
  const parts = slotParts([run(), runB({ startTime: '13:00' })], SLOTS, '13:30');
  assert.deepEqual(parts.map((p) => p.workHours), [0.5, 0.5]);
  assert.equal(slotParts([run(), runB({ startTime: '12:00' })], SLOTS, '13:30').length, 1);
});

test('thời gian chuyển mã tính bằng phút, trừ nghỉ trưa, chưa có sản lượng lại thì null', () => {
  assert.equal(changeoverMinutes({ startTime: '09:00', resumedAt: '09:35' }), 35);
  assert.equal(changeoverMinutes({ startTime: '11:00', resumedAt: '13:00' }), 60);
  assert.equal(changeoverMinutes({ startTime: '09:00', resumedAt: null }), null);
});

test('giờ tách 2 mã: không cộng trùng người, PPH thực hiện và kế hoạch đúng theo giờ công', () => {
  const rows = [output('09:30', 100, null, 40, 0.5), output('09:30', 30, 'b', 40, 0.5)];
  const [hour] = trackOutputHourly(series({ '09:30': 130 }).filter((h) => h.slot === '09:30'), rows, [run(), runB()], SLOTS);
  assert.equal(hour.workerCount, 40);
  assert.equal(hour.workHours, 1);
  assert.equal(hour.laborHours, 40);
  assert.equal(hour.actualPph, 3.25);
  assert.equal(hour.planPph, 4);
  assert.equal(hour.met, false);
});

test('PPH đi theo từng mã; thời gian chuyển mã làm giảm PPH của mã mới', () => {
  const rows = [
    output('08:30', 200, null, 40, 1),
    output('09:30', 100, null, 40, 0.5),
    output('09:30', 10, 'b', 40, 0.5),
    output('10:30', 60, 'b', 30, 1),
  ];
  const [a, b] = trackModelSummary(rows, [run(), runB()]);
  assert.equal(a.model, 'A');
  assert.equal(a.outputQty, 300);
  assert.equal(a.actualPph, 5);
  assert.equal(a.met, true);
  assert.equal(b.outputQty, 70);
  assert.equal(b.laborHours, 50);
  assert.equal(b.actualPph, 1.4);
  assert.equal(b.planPph, 3);
  assert.equal(b.met, false);
  assert.equal(b.changeoverMinutes, 20);
  assert.equal(b.running, true);
  assert.equal(a.running, false);
});

test('mã chưa có số vẫn hiện kế hoạch; đang chuyển mã được đánh dấu', () => {
  const [, b] = trackModelSummary([], [run(), runB({ resumedAt: null })]);
  assert.equal(b.planPph, 3);
  assert.equal(b.actualPph, null);
  assert.equal(b.changingOver, true);
});

test('giờ chưa nhập lấy PPH kế hoạch của mã đang chạy ở giờ đó', () => {
  const hours = trackOutputHourly(series({}), [], [run(), runB()], SLOTS);
  assert.equal(hours.find((h) => h.slot === '08:30').planPph, 5);
  assert.equal(hours.find((h) => h.slot === '10:30').planPph, 3);
});

test('dữ liệu cũ chỉ có đầu ca vẫn tính như trước', () => {
  const [hour] = trackOutputHourly(series({ '07:30': 240 }).slice(0, 1), [output('07:30', 240, null, 40, 1)], [run()], SLOTS);
  assert.equal(hour.actualPph, 6);
  assert.equal(hour.planPph, 5);
  assert.equal(hour.met, true);
});

test('nhiều Tổ cộng số người và cộng giờ công', () => {
  const runs = [run(), run({ teamId: 't2', workerCount: 20, planPph: 2 })];
  const rows = [output('07:30', 200, null, 40, 1), output('07:30', 40, null, 20, 1, 't2')];
  const [hour] = trackOutputHourly(series({ '07:30': 240 }).slice(0, 1), rows, runs, SLOTS);
  assert.equal(hour.workerCount, 60);
  assert.equal(hour.actualPph, 4);
  assert.equal(hour.planPph, 4);
});

test('mục tiêu tới hiện tại đi theo mã từng khung và không vượt tổng kế hoạch', () => {
  assert.equal(trackTargetSoFar([run(), runB()], SLOTS, ['08:30', '10:30']), 150);
  assert.equal(trackTargetSoFar([run({ plannedQty: 120 })], SLOTS, ['08:30', '09:30']), 120);
});

test('người đang làm lấy theo mã đang chạy, mã mới chưa nhập thì lấy số khai khi chuyển', () => {
  assert.equal(trackActiveWorkers([output('08:30', 10, null, 40, 1)], [run(), runB()]), 30);
  assert.equal(trackActiveWorkers([output('08:30', 10, null, 40, 1), output('10:30', 10, 'b', 28, 1)], [run(), runB()]), 28);
  assert.equal(trackActiveWorkers([output('08:30', 10, null, 38, 1)], [run()]), 38);
});

test('đối soát Tập trung → Đầu vào theo đúng mã, không phụ thuộc chữ hoa chữ thường', () => {
  const runs = [
    run({ point: 'khutaptrung', model: 'a' }),
    run({ id: 'k2', point: 'khutaptrung', model: 'B', startTime: '09:00' }),
    run({ point: 'dauvao', model: 'A' }),
    run({ id: 'd2', point: 'dauvao', model: 'B', startTime: '09:30' }),
  ];
  const rows = [
    { point: 'khutaptrung', slot: '08:30', qty: 100, run_id: null },
    { point: 'khutaptrung', slot: '09:30', qty: 70, run_id: 'k2' },
    { point: 'dauvao', slot: '08:30', qty: 90, run_id: null },
    { point: 'dauvao', slot: '10:30', qty: 80, run_id: 'd2' },
  ];
  assert.deepEqual(trackSupplyForModel(rows, runs, 'A'), { collected: 100, input: 90, gap: 10 });
  assert.deepEqual(trackSupplyForModel(rows, runs, 'B'), { collected: 70, input: 80, gap: -10 });
});
