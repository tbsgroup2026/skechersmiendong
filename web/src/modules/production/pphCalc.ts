// Công thức PPH và sản lượng lũy kế DÙNG CHUNG cho Worker (web/public/_worker.js), form nhập và dashboard.
// Chỉ sửa công thức ở file này để Frontend và Backend không bao giờ tính khác nhau.
//
//   Tổng giờ công  = Số lao động × Số giờ làm việc thực tế
//   PPH thực hiện  = Sản lượng đạt chất lượng / Tổng giờ công   (đôi/giờ công)
//   Lũy kế tại giờ N = Tổng sản lượng đạt chất lượng của các giờ đã nhập từ đầu ca đến giờ N
//
// Thiếu dữ liệu thì trả null, không trả 0: giờ chưa nhập không được hiện thành PPH = 0.

type NumberInput = number | null | undefined;

// null khi chưa đủ dữ liệu hoặc không có giờ công thực tế (số lao động hoặc số giờ <= 0).
export function laborHours(workers: NumberInput, hours: NumberInput): number | null {
  if (workers == null || hours == null) return null;
  const labor = Number(workers) * Number(hours);
  return Number.isFinite(labor) && Number(workers) > 0 && Number(hours) > 0 ? labor : null;
}

// Dùng khi đã có tổng giờ công, VD cộng nhiều Tổ trong 1 Line: tổng sản lượng / tổng giờ công.
export function pphFromLaborHours(goodQty: NumberInput, labor: NumberInput): number | null {
  if (goodQty == null || labor == null || !(Number(labor) > 0)) return null;
  const pph = Number(goodQty) / Number(labor);
  return Number.isFinite(pph) ? Math.round(pph * 100) / 100 : null;
}

export function actualPph(goodQty: NumberInput, workers: NumberInput, hours: NumberInput): number | null {
  return pphFromLaborHours(goodQty, laborHours(workers, hours));
}

// Lũy kế tính lại từ số từng giờ mỗi lần đọc, không lưu riêng, nên sửa hoặc xoá 1 giờ thì các giờ sau tự
// đúng. Giờ chưa nhập trả null nhưng tổng vẫn cộng tiếp cho giờ sau.
export function cumulativeSeries(values: NumberInput[]): (number | null)[] {
  let total = 0;
  return values.map((value) => {
    if (value == null) return null;
    total += Number(value);
    return total;
  });
}

export function meetsPlan(actual: NumberInput, plan: NumberInput): boolean | null {
  if (actual == null || plan == null) return null;
  return Number(actual) >= Number(plan);
}
