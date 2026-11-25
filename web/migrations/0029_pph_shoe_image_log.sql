-- ============================================================
-- MIGRATION 0029: LỊCH SỬ TẢI / THAY / XOÁ ẢNH GIÀY (pph_shoe_image_log)
-- ============================================================
-- Mỗi lần tải (THEM), thay (THAY) hoặc xoá (XOA) ảnh theo mã giày đều ghi 1 dòng,
-- giữ nguyên link ảnh cũ. Worker cũng tự tạo bảng này khi chạy (CREATE TABLE IF NOT EXISTS),
-- nên file này chạy lại an toàn.
CREATE TABLE IF NOT EXISTS pph_shoe_image_log (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  code TEXT NOT NULL,
  color TEXT,
  image_url TEXT NOT NULL,
  action TEXT NOT NULL,
  by_name TEXT,
  created_at TEXT NOT NULL
);
CREATE INDEX IF NOT EXISTS idx_pph_shoe_image_log_code ON pph_shoe_image_log (code);
