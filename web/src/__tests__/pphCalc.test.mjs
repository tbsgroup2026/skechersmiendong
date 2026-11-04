// Chạy từ thư mục web: node --test src/__tests__/pphCalc.test.mjs
import assert from 'node:assert/strict';
import test from 'node:test';
import { actualPph, cumulativeSeries, laborHours, meetsPlan, pphFromLaborHours } from '../modules/production/pphCalc.ts';

test('PPH = sản lượng đạt chất lượng / (lao động × giờ thực tế)', () => {
  assert.equal(actualPph(240, 40, 1), 6);
  assert.equal(actualPph(120, 40, 0.5), 6);
  assert.equal(actualPph(180, 40, 1), 4.5);
});

test('tổng giờ công đúng và thay đổi theo lao động, theo giờ', () => {
  assert.equal(laborHours(40, 1), 40);
  assert.equal(laborHours(40, 0.5), 20);
  assert.equal(actualPph(240, 30, 1), 8);
  assert.equal(actualPph(240, 40, 0.75), 8);
});

test('thiếu dữ liệu trả null, không tự thành 0', () => {
  assert.equal(actualPph(null, 40, 1), null);
  assert.equal(actualPph(240, null, 1), null);
  assert.equal(actualPph(240, 40, null), null);
  assert.equal(actualPph(0, 40, 0), null);
  assert.equal(actualPph(240, 0, 1), null);
  assert.equal(pphFromLaborHours(10, 0), null);
});

test('giờ có nhập nhưng sản lượng 0 thì PPH thật sự bằng 0', () => {
  assert.equal(actualPph(0, 40, 1), 0);
});

test('nhiều Tổ cộng tổng sản lượng rồi chia tổng giờ công, không lấy trung bình', () => {
  assert.equal(pphFromLaborHours(100 + 50, laborHours(20, 1) + laborHours(5, 1)), 6);
});

test('lũy kế cộng dồn đúng và tính lại khi sửa, xoá', () => {
  assert.deepEqual(cumulativeSeries([150, 90, 120]), [150, 240, 360]);
  assert.deepEqual(cumulativeSeries([150, 100, 120]), [150, 250, 370]);
  assert.deepEqual(cumulativeSeries([150, null, 120]), [150, null, 270]);
  assert.deepEqual(cumulativeSeries([null, null]), [null, null]);
});

test('so với kế hoạch', () => {
  assert.equal(meetsPlan(6, 6), true);
  assert.equal(meetsPlan(4.5, 6), false);
  assert.equal(meetsPlan(null, 6), null);
  assert.equal(meetsPlan(6, null), null);
});
