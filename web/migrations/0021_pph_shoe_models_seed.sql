-- Seed mapping ma giay -> anh (pph_shoe_models), lay tu file IE thuc te cua Nha May Mien Dong
-- "PHAN LOAI MU GIAY THEO CO CAU LAO DONG.xlsx" (13 ma dang chay tai thoi diem lap file).
-- Anh da upload len R2 rieng (skechersmiendong-img) qua /cdn-r2/, khong dung Cloudinary.
INSERT INTO pph_shoe_models (code, image_url, updated_at) VALUES
  ('139222', 'https://skechersmiendong.tbsgroup2026.workers.dev/cdn-r2/uploads/pph_shoe_model/2026/10/mdshoe_139222.png', '2026-10-28T00:00:00.000Z'),
  ('139223', 'https://skechersmiendong.tbsgroup2026.workers.dev/cdn-r2/uploads/pph_shoe_model/2026/10/mdshoe_139223.jpg', '2026-10-28T00:00:00.000Z'),
  ('136451', 'https://skechersmiendong.tbsgroup2026.workers.dev/cdn-r2/uploads/pph_shoe_model/2026/10/mdshoe_136451.png', '2026-10-28T00:00:00.000Z'),
  ('205659', 'https://skechersmiendong.tbsgroup2026.workers.dev/cdn-r2/uploads/pph_shoe_model/2026/10/mdshoe_205659.png', '2026-10-28T00:00:00.000Z'),
  ('136543', 'https://skechersmiendong.tbsgroup2026.workers.dev/cdn-r2/uploads/pph_shoe_model/2026/10/mdshoe_136543.jpg', '2026-10-28T00:00:00.000Z'),
  ('139459', 'https://skechersmiendong.tbsgroup2026.workers.dev/cdn-r2/uploads/pph_shoe_model/2026/10/mdshoe_139459.jpg', '2026-10-28T00:00:00.000Z'),
  ('1916806', 'https://skechersmiendong.tbsgroup2026.workers.dev/cdn-r2/uploads/pph_shoe_model/2026/10/mdshoe_1916806.jpg', '2026-10-28T00:00:00.000Z'),
  ('136210', 'https://skechersmiendong.tbsgroup2026.workers.dev/cdn-r2/uploads/pph_shoe_model/2026/10/mdshoe_136210.png', '2026-10-28T00:00:00.000Z'),
  ('138182', 'https://skechersmiendong.tbsgroup2026.workers.dev/cdn-r2/uploads/pph_shoe_model/2026/10/mdshoe_138182.png', '2026-10-28T00:00:00.000Z'),
  ('139216', 'https://skechersmiendong.tbsgroup2026.workers.dev/cdn-r2/uploads/pph_shoe_model/2026/10/mdshoe_139216.png', '2026-10-28T00:00:00.000Z'),
  ('139329', 'https://skechersmiendong.tbsgroup2026.workers.dev/cdn-r2/uploads/pph_shoe_model/2026/10/mdshoe_139329.png', '2026-10-28T00:00:00.000Z'),
  ('136504', 'https://skechersmiendong.tbsgroup2026.workers.dev/cdn-r2/uploads/pph_shoe_model/2026/10/mdshoe_136504.png', '2026-10-28T00:00:00.000Z'),
  ('138181', 'https://skechersmiendong.tbsgroup2026.workers.dev/cdn-r2/uploads/pph_shoe_model/2026/10/mdshoe_138181.png', '2026-10-28T00:00:00.000Z')
ON CONFLICT(code) DO UPDATE SET image_url = excluded.image_url, updated_at = excluded.updated_at;
