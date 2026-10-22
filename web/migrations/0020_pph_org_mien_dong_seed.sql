-- Seed du lieu cay to chuc PPH (Nha may > Xuong > Chuyen/To) cua rieng Nha May Mien Dong,
-- mang nguyen tu D1 that cua vpchuoiskechers sang (khong dong gi den Van Phong Chuoi/Kien Giang).
INSERT INTO pph_org (id, type, name, parent_id, order_num, created_at, image_url, paused) VALUES
  ('pphorg_mudsmfw4_ym96cm', 'FACTORY', 'NHÀ MÁY MIỀN ĐÔNG', NULL, 0, '2026-09-23T07:40:16.756Z', NULL, 0),
  ('pphorg_mv6esd1a_ig3w1q', 'AREA', 'May', 'pphorg_mudsmfw4_ym96cm', 0, '2026-10-13T08:18:17.470Z', NULL, 0),
  ('pphorg_mv6espz2_kasqx9', 'AREA', 'Gò', 'pphorg_mudsmfw4_ym96cm', 0, '2026-10-13T08:18:34.238Z', NULL, 0),
  ('pphorg_mv6fmamg_cvazw8', 'LINE', 'CHUYỀN 1', 'pphorg_mv6espz2_kasqx9', 0, '2026-10-13T08:41:34.024Z', NULL, 0),
  ('pphorg_mv6fmgu7_co9mhp', 'LINE', 'CHUYỀN 2', 'pphorg_mv6espz2_kasqx9', 0, '2026-10-13T08:41:42.079Z', NULL, 0),
  ('pphorg_mv6fi3ay_mi0yvh', 'TEAM', 'TỔ 1', 'pphorg_mv6esd1a_ig3w1q', 0, '2026-10-13T08:38:17.914Z', NULL, 0),
  ('pphorg_mv6fib7w_rjyde1', 'TEAM', 'TỔ 2', 'pphorg_mv6esd1a_ig3w1q', 0, '2026-10-13T08:38:28.172Z', NULL, 0),
  ('pphorg_mv6fieb4_b49zgl', 'TEAM', 'TỔ 3', 'pphorg_mv6esd1a_ig3w1q', 0, '2026-10-13T08:38:32.176Z', NULL, 0),
  ('pphorg_mv6figu7_k5yfwd', 'TEAM', 'TỔ 4', 'pphorg_mv6esd1a_ig3w1q', 0, '2026-10-13T08:38:35.455Z', NULL, 0),
  ('pphorg_mv6fiix6_k0jpbt', 'TEAM', 'TỔ 5', 'pphorg_mv6esd1a_ig3w1q', 0, '2026-10-13T08:38:38.154Z', NULL, 0),
  ('pphorg_mv6fimhn_aepdgo', 'TEAM', 'TỔ 6', 'pphorg_mv6esd1a_ig3w1q', 0, '2026-10-13T08:38:42.779Z', NULL, 0),
  ('pphorg_mv6fip72_90ockz', 'TEAM', 'TỔ 7', 'pphorg_mv6esd1a_ig3w1q', 0, '2026-10-13T08:38:46.286Z', NULL, 0);
