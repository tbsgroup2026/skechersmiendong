-- Migration: Ensure 6 allowed Gemba users exist with full profile in gemba_gas_users
INSERT INTO gemba_gas_users (username, full_name, group_name, factory, department, position, role, password, status, token)
VALUES ('Admin', 'LÊ KHẢI', 'VP Chuỗi', 'SK Miền Đông', 'IT - Team Chuyển Đổi Số', 'Admin', 'Admin', '123456', 'Active', '202112003')
ON CONFLICT(username) DO UPDATE SET 
  full_name = 'LÊ KHẢI', 
  group_name = 'VP Chuỗi', 
  department = 'IT - Team Chuyển Đổi Số', 
  role = 'Admin', 
  status = 'Active',
  token = '202112003';

INSERT INTO gemba_gas_users (username, full_name, group_name, factory, department, position, role, password, status, token)
VALUES ('TGĐ Chuỗi', 'PHẠM MINH TÙNG', 'VP Chuỗi', 'SK Miền Đông', 'Ban Giám Đốc', 'Tổng Giám đốc', 'Tổng Giám đốc', '123456', 'Active', '200405004')
ON CONFLICT(username) DO UPDATE SET 
  full_name = 'PHẠM MINH TÙNG', 
  group_name = 'VP Chuỗi', 
  department = 'Ban Giám Đốc', 
  role = 'Tổng Giám đốc', 
  status = 'Active',
  token = '200405004';

INSERT INTO gemba_gas_users (username, full_name, group_name, factory, department, position, role, password, status, token)
VALUES ('GĐ NM  MĐ', 'ĐỖ ĐẮC MIỀN', 'VP Khu vực', 'SK Miền Đông', 'Ban Giám Đốc', 'Giám đốc NM', 'Tổng Giám đốc', '123456', 'Active', 'GDDACMIEN')
ON CONFLICT(username) DO UPDATE SET 
  full_name = 'ĐỖ ĐẮC MIỀN', 
  group_name = 'VP Khu vực', 
  department = 'Ban Giám Đốc', 
  role = 'Tổng Giám đốc', 
  status = 'Active';

INSERT INTO gemba_gas_users (username, full_name, group_name, factory, department, position, role, password, status, token)
VALUES ('Dư Thị Thanh Tình', 'DƯ THỊ THANH TÌNH', 'VP Khu vực', 'SK Miền Đông', 'Nhân Sự - HC', 'Trưởng Phòng NS-HC', 'Giám đốc', '123456', 'Active', '222102020')
ON CONFLICT(username) DO UPDATE SET 
  full_name = 'DƯ THỊ THANH TÌNH', 
  group_name = 'VP Khu vực', 
  department = 'Nhân Sự - HC', 
  role = 'Giám đốc', 
  status = 'Active',
  token = '222102020';

INSERT INTO gemba_gas_users (username, full_name, group_name, factory, department, position, role, password, status, token)
VALUES ('Trần Ngọc Huy', 'TRẦN NGỌC HUY', 'VP Chuỗi', 'SK Miền Đông', 'IT - Team Chuyển Đổi Số', 'NV Lập Trình', 'Admin', '123456', 'Active', '202608002')
ON CONFLICT(username) DO UPDATE SET 
  full_name = 'TRẦN NGỌC HUY', 
  group_name = 'VP Chuỗi', 
  department = 'IT - Team Chuyển Đổi Số', 
  role = 'Admin', 
  status = 'Active',
  token = '202608002';

INSERT INTO gemba_gas_users (username, full_name, group_name, factory, department, position, role, password, status, token)
VALUES ('Phạm Nguyễn Anh Huy', 'PHẠM NGUYỄN ANH HUY', 'VP Chuỗi', 'SK Miền Đông', 'CI – Cải tiến', 'Trưởng Ban CI & CĐS', 'Admin', '123456', 'Active', '202608001')
ON CONFLICT(username) DO UPDATE SET 
  full_name = 'PHẠM NGUYỄN ANH HUY', 
  group_name = 'VP Chuỗi', 
  department = 'CI – Cải tiến', 
  role = 'Admin', 
  status = 'Active',
  token = '202608001';

