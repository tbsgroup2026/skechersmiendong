-- Migration: Grant Gemba access to Nguyễn Văn Tình
INSERT INTO gemba_gas_users (username, full_name, group_name, factory, department, position, role, password, status, token, emp_code)
VALUES ('Tinhnguyenvan', 'NGUYỄN VĂN TÌNH', 'VP Chuỗi', 'SK Miền Đông', 'Nhân Sự', 'Trưởng Nhóm Quản Trị Nguồn Nhân Lực', 'Giám đốc', '123456', 'Active', '211206004', '211206004')
ON CONFLICT(username) DO UPDATE SET 
  full_name = 'NGUYỄN VĂN TÌNH', 
  group_name = 'VP Chuỗi', 
  factory = 'SK Miền Đông',
  department = 'Nhân Sự', 
  position = 'Trưởng Nhóm Quản Trị Nguồn Nhân Lực',
  role = 'Giám đốc', 
  status = 'Active',
  token = '211206004',
  emp_code = '211206004';

INSERT OR IGNORE INTO gemba_user_scopes (id, emp_code, gemba_role, status)
VALUES ('scope_211206004', '211206004', 'MANAGER', 'ACTIVE');

