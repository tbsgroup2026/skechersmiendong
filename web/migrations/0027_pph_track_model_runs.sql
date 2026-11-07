-- ============================================================
-- MIGRATION 0027: THEO DÕI CHUYỀN — NHIỀU MÃ GIÀY TRONG 1 NGÀY
-- ============================================================
-- Worker tự chạy các lệnh này ở lần gọi API đầu tiên (pphTrackEnsureTable trong
-- public/_worker.js, an toàn khi chạy lại). File này để soát trước khi áp lên D1
-- production và giữ lịch sử migration, giống 0026.
-- Chỉ THÊM bảng và cột, không sửa hay xoá dữ liệu. pph_track_shift_setup vẫn là mã đầu
-- tiên của ngày; dòng số liệu có run_id NULL thuộc về mã đầu tiên đó.

-- 1. MỖI LẦN CHUYỂN MÃ theo Tổ + ngày + trạm. start_time là lúc dừng mã cũ, resumed_at là
-- lúc có sản lượng lại (HH:MM giờ Việt Nam). resumed_at NULL nghĩa là đang chuyển mã.
CREATE TABLE IF NOT EXISTS pph_track_runs (
  id TEXT PRIMARY KEY,
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
  start_time TEXT NOT NULL,
  resumed_at TEXT,
  submitted_by TEXT NOT NULL,
  submitted_at TEXT NOT NULL
);
CREATE INDEX IF NOT EXISTS idx_pph_track_runs_lookup ON pph_track_runs(team_id, entry_date, point, start_time);

-- 2. Mỗi dòng số liệu thuộc mã nào.
ALTER TABLE pph_track_entries ADD COLUMN run_id TEXT;
