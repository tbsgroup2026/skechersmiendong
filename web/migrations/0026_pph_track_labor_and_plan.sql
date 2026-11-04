-- ============================================================
-- MIGRATION 0026: THEO DÕI CHUYỀN — ĐẦU CA, GIỜ CÔNG TỪNG GIỜ, PPH KẾ HOẠCH
-- ============================================================
-- Worker tự chạy các lệnh này ở lần gọi API đầu tiên (pphTrackEnsureTable trong
-- public/_worker.js, an toàn khi chạy lại). File này để soát trước khi áp lên D1
-- production và giữ lịch sử migration, giống 0012.
-- Chỉ THÊM bảng và cột, không sửa hay xoá dữ liệu. Dòng cũ có worker_count và
-- work_hours NULL: không tính PPH cho các dòng này cho tới khi được nhập bổ sung.

-- 1. ĐẦU CA theo Tổ + ngày + trạm. plan_pph chỉ có ở trạm Đầu ra (point = 'daura').
CREATE TABLE IF NOT EXISTS pph_track_shift_setup (
  team_id TEXT NOT NULL,
  entry_date TEXT NOT NULL,
  point TEXT NOT NULL,
  shift_hours REAL NOT NULL,
  worker_count INTEGER NOT NULL,
  planned_qty INTEGER NOT NULL,
  model TEXT NOT NULL,
  color TEXT NOT NULL,
  size TEXT NOT NULL,
  plan_pph REAL,
  submitted_by TEXT NOT NULL,
  submitted_at TEXT NOT NULL,
  PRIMARY KEY (team_id, entry_date, point)
);

-- 2. GIỜ CÔNG TỪNG GIỜ trên dòng Đầu ra (point = 'daura').
ALTER TABLE pph_track_entries ADD COLUMN worker_count INTEGER;
ALTER TABLE pph_track_entries ADD COLUMN work_hours REAL;
