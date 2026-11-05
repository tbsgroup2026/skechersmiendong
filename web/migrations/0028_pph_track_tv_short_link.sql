-- ============================================================
-- MIGRATION 0028: LINK RÚT GỌN RIÊNG CHO BẢNG "THEO DÕI CHUYỀN" (Line May 1)
-- ============================================================
-- /tv/w7hte -> /pph-view?lineId=pphline_mvj5xlfa_ugml9m32&board=track
-- /tv/yzram (link TV sẵn có của Line) giữ nguyên, trở lại bảng "Line May 1" cũ.
-- Chỉ thêm 1 dòng, chạy lại an toàn.
INSERT OR IGNORE INTO pph_tv_short_links (code, line_id, target_type, created_at)
VALUES ('w7hte', 'pphline_mvj5xlfa_ugml9m32', 'track', '2026-11-05T00:00:00.000Z');
