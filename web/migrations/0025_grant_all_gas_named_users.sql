
      UPDATE gemba_gas_users 
      SET status = 'Active', 
          full_name = 'LÊ KHẢI',
          emp_code = CASE WHEN (emp_code IS NULL OR emp_code = '' OR emp_code LIKE 'GMB-%') AND '202112003' != '' THEN '202112003' ELSE emp_code END,
          token = CASE WHEN (token IS NULL OR token = '' OR token LIKE 'GMB-%') AND '202112003' != '' THEN '202112003' ELSE token END
      WHERE username = 'Admin';
    

        INSERT OR IGNORE INTO gemba_user_scopes (id, emp_code, gemba_role, status)
        VALUES ('scope_202112003', '202112003', 'MANAGER', 'ACTIVE');
      

      UPDATE gemba_gas_users 
      SET status = 'Active', 
          full_name = 'PHẠM MINH TÙNG',
          emp_code = CASE WHEN (emp_code IS NULL OR emp_code = '' OR emp_code LIKE 'GMB-%') AND '200405004' != '' THEN '200405004' ELSE emp_code END,
          token = CASE WHEN (token IS NULL OR token = '' OR token LIKE 'GMB-%') AND '200405004' != '' THEN '200405004' ELSE token END
      WHERE username = 'TGĐ Chuỗi';
    

        INSERT OR IGNORE INTO gemba_user_scopes (id, emp_code, gemba_role, status)
        VALUES ('scope_200405004', '200405004', 'MANAGER', 'ACTIVE');
      

      UPDATE gemba_gas_users 
      SET status = 'Active', 
          full_name = 'LÊ HUY TUẤN',
          emp_code = CASE WHEN (emp_code IS NULL OR emp_code = '' OR emp_code LIKE 'GMB-%') AND '201711002' != '' THEN '201711002' ELSE emp_code END,
          token = CASE WHEN (token IS NULL OR token = '' OR token LIKE 'GMB-%') AND '201711002' != '' THEN '201711002' ELSE token END
      WHERE username = 'CN- CI Chuỗi';
    

        INSERT OR IGNORE INTO gemba_user_scopes (id, emp_code, gemba_role, status)
        VALUES ('scope_201711002', '201711002', 'MANAGER', 'ACTIVE');
      

      UPDATE gemba_gas_users 
      SET status = 'Active', 
          full_name = 'ĐỖ ĐẮC MIỀN',
          emp_code = CASE WHEN (emp_code IS NULL OR emp_code = '' OR emp_code LIKE 'GMB-%') AND '249507002' != '' THEN '249507002' ELSE emp_code END,
          token = CASE WHEN (token IS NULL OR token = '' OR token LIKE 'GMB-%') AND '249507002' != '' THEN '249507002' ELSE token END
      WHERE username = 'GĐ NM  MĐ';
    

        INSERT OR IGNORE INTO gemba_user_scopes (id, emp_code, gemba_role, status)
        VALUES ('scope_249507002', '249507002', 'MANAGER', 'ACTIVE');
      

      UPDATE gemba_gas_users 
      SET status = 'Active', 
          full_name = 'PHAN THỊ THANH TÂM',
          emp_code = CASE WHEN (emp_code IS NULL OR emp_code = '' OR emp_code LIKE 'GMB-%') AND '200212001' != '' THEN '200212001' ELSE emp_code END,
          token = CASE WHEN (token IS NULL OR token = '' OR token LIKE 'GMB-%') AND '200212001' != '' THEN '200212001' ELSE token END
      WHERE username = 'CN - CI SK MĐ';
    

        INSERT OR IGNORE INTO gemba_user_scopes (id, emp_code, gemba_role, status)
        VALUES ('scope_200212001', '200212001', 'MANAGER', 'ACTIVE');
      

      UPDATE gemba_gas_users 
      SET status = 'Active', 
          full_name = 'CAO THỊ MỸ HẠNH',
          emp_code = CASE WHEN (emp_code IS NULL OR emp_code = '' OR emp_code LIKE 'GMB-%') AND 'GMB-003' != '' THEN 'GMB-003' ELSE emp_code END,
          token = CASE WHEN (token IS NULL OR token = '' OR token LIKE 'GMB-%') AND 'GMB-003' != '' THEN 'GMB-003' ELSE token END
      WHERE username = 'QLCL SK MĐ';
    

      UPDATE gemba_gas_users 
      SET status = 'Active', 
          full_name = 'CÔNG HOÀNG CHIẾN',
          emp_code = CASE WHEN (emp_code IS NULL OR emp_code = '' OR emp_code LIKE 'GMB-%') AND 'GMB-004' != '' THEN 'GMB-004' ELSE emp_code END,
          token = CASE WHEN (token IS NULL OR token = '' OR token LIKE 'GMB-%') AND 'GMB-004' != '' THEN 'GMB-004' ELSE token END
      WHERE username = 'MMTB  SK MĐ';
    

      UPDATE gemba_gas_users 
      SET status = 'Active', 
          full_name = 'TRẦN VĂN HOÁ',
          emp_code = CASE WHEN (emp_code IS NULL OR emp_code = '' OR emp_code LIKE 'GMB-%') AND '210906005' != '' THEN '210906005' ELSE emp_code END,
          token = CASE WHEN (token IS NULL OR token = '' OR token LIKE 'GMB-%') AND '210906005' != '' THEN '210906005' ELSE token END
      WHERE username = 'ĐH PX Đầu vào';
    

        INSERT OR IGNORE INTO gemba_user_scopes (id, emp_code, gemba_role, status)
        VALUES ('scope_210906005', '210906005', 'MANAGER', 'ACTIVE');
      

      UPDATE gemba_gas_users 
      SET status = 'Active', 
          full_name = 'ĐẶNG THỊ LÀI',
          emp_code = CASE WHEN (emp_code IS NULL OR emp_code = '' OR emp_code LIKE 'GMB-%') AND 'GMB-005' != '' THEN 'GMB-005' ELSE emp_code END,
          token = CASE WHEN (token IS NULL OR token = '' OR token LIKE 'GMB-%') AND 'GMB-005' != '' THEN 'GMB-005' ELSE token END
      WHERE username = 'QLCL PX Đầu vào';
    

      UPDATE gemba_gas_users 
      SET status = 'Active', 
          full_name = 'LĂNG VĂN QUẾ',
          emp_code = CASE WHEN (emp_code IS NULL OR emp_code = '' OR emp_code LIKE 'GMB-%') AND '222407082' != '' THEN '222407082' ELSE emp_code END,
          token = CASE WHEN (token IS NULL OR token = '' OR token LIKE 'GMB-%') AND '222407082' != '' THEN '222407082' ELSE token END
      WHERE username = 'Tổ Cắt';
    

        INSERT OR IGNORE INTO gemba_user_scopes (id, emp_code, gemba_role, status)
        VALUES ('scope_222407082', '222407082', 'MANAGER', 'ACTIVE');
      

      UPDATE gemba_gas_users 
      SET status = 'Active', 
          full_name = 'NGUYỄN THỊ LOA',
          emp_code = CASE WHEN (emp_code IS NULL OR emp_code = '' OR emp_code LIKE 'GMB-%') AND '222407041' != '' THEN '222407041' ELSE emp_code END,
          token = CASE WHEN (token IS NULL OR token = '' OR token LIKE 'GMB-%') AND '222407041' != '' THEN '222407041' ELSE token END
      WHERE username = 'Tổ Lạng-Cán dán&Đồng bộ';
    

        INSERT OR IGNORE INTO gemba_user_scopes (id, emp_code, gemba_role, status)
        VALUES ('scope_222407041', '222407041', 'MANAGER', 'ACTIVE');
      

      UPDATE gemba_gas_users 
      SET status = 'Active', 
          full_name = 'NGUYỄN HOÀI HƯNG',
          emp_code = CASE WHEN (emp_code IS NULL OR emp_code = '' OR emp_code LIKE 'GMB-%') AND '222509018' != '' THEN '222509018' ELSE emp_code END,
          token = CASE WHEN (token IS NULL OR token = '' OR token LIKE 'GMB-%') AND '222509018' != '' THEN '222509018' ELSE token END
      WHERE username = 'Tổ In-ép';
    

        INSERT OR IGNORE INTO gemba_user_scopes (id, emp_code, gemba_role, status)
        VALUES ('scope_222509018', '222509018', 'MANAGER', 'ACTIVE');
      

      UPDATE gemba_gas_users 
      SET status = 'Active', 
          full_name = 'HOÀNG QUỐC NGHỊ',
          emp_code = CASE WHEN (emp_code IS NULL OR emp_code = '' OR emp_code LIKE 'GMB-%') AND '222502031' != '' THEN '222502031' ELSE emp_code END,
          token = CASE WHEN (token IS NULL OR token = '' OR token LIKE 'GMB-%') AND '222502031' != '' THEN '222502031' ELSE token END
      WHERE username = 'ĐH PX May';
    

        INSERT OR IGNORE INTO gemba_user_scopes (id, emp_code, gemba_role, status)
        VALUES ('scope_222502031', '222502031', 'MANAGER', 'ACTIVE');
      

      UPDATE gemba_gas_users 
      SET status = 'Active', 
          full_name = 'VŨ THỊ HƯỜNG',
          emp_code = CASE WHEN (emp_code IS NULL OR emp_code = '' OR emp_code LIKE 'GMB-%') AND 'GMB-008' != '' THEN 'GMB-008' ELSE emp_code END,
          token = CASE WHEN (token IS NULL OR token = '' OR token LIKE 'GMB-%') AND 'GMB-008' != '' THEN 'GMB-008' ELSE token END
      WHERE username = 'QLCL PX May';
    

      UPDATE gemba_gas_users 
      SET status = 'Active', 
          full_name = 'LÊ VĂN TUẤN',
          emp_code = CASE WHEN (emp_code IS NULL OR emp_code = '' OR emp_code LIKE 'GMB-%') AND '211209006' != '' THEN '211209006' ELSE emp_code END,
          token = CASE WHEN (token IS NULL OR token = '' OR token LIKE 'GMB-%') AND '211209006' != '' THEN '211209006' ELSE token END
      WHERE username = 'Tổ May 1';
    

        INSERT OR IGNORE INTO gemba_user_scopes (id, emp_code, gemba_role, status)
        VALUES ('scope_211209006', '211209006', 'MANAGER', 'ACTIVE');
      

      UPDATE gemba_gas_users 
      SET status = 'Active', 
          full_name = 'HỒ KHẮC NGHĨA',
          emp_code = CASE WHEN (emp_code IS NULL OR emp_code = '' OR emp_code LIKE 'GMB-%') AND '211104005' != '' THEN '211104005' ELSE emp_code END,
          token = CASE WHEN (token IS NULL OR token = '' OR token LIKE 'GMB-%') AND '211104005' != '' THEN '211104005' ELSE token END
      WHERE username = 'Tổ May 2';
    

        INSERT OR IGNORE INTO gemba_user_scopes (id, emp_code, gemba_role, status)
        VALUES ('scope_211104005', '211104005', 'MANAGER', 'ACTIVE');
      

      UPDATE gemba_gas_users 
      SET status = 'Active', 
          full_name = 'NGUYỄN THẠCH TRƯỜNG',
          emp_code = CASE WHEN (emp_code IS NULL OR emp_code = '' OR emp_code LIKE 'GMB-%') AND '222308001' != '' THEN '222308001' ELSE emp_code END,
          token = CASE WHEN (token IS NULL OR token = '' OR token LIKE 'GMB-%') AND '222308001' != '' THEN '222308001' ELSE token END
      WHERE username = 'Tổ May 3';
    

        INSERT OR IGNORE INTO gemba_user_scopes (id, emp_code, gemba_role, status)
        VALUES ('scope_222308001', '222308001', 'MANAGER', 'ACTIVE');
      

      UPDATE gemba_gas_users 
      SET status = 'Active', 
          full_name = 'MAI ĐỨC VIỆT',
          emp_code = CASE WHEN (emp_code IS NULL OR emp_code = '' OR emp_code LIKE 'GMB-%') AND '211404028' != '' THEN '211404028' ELSE emp_code END,
          token = CASE WHEN (token IS NULL OR token = '' OR token LIKE 'GMB-%') AND '211404028' != '' THEN '211404028' ELSE token END
      WHERE username = 'Tổ May 4';
    

        INSERT OR IGNORE INTO gemba_user_scopes (id, emp_code, gemba_role, status)
        VALUES ('scope_211404028', '211404028', 'MANAGER', 'ACTIVE');
      

      UPDATE gemba_gas_users 
      SET status = 'Active', 
          full_name = 'LÊ VĂN CƯỜNG',
          emp_code = CASE WHEN (emp_code IS NULL OR emp_code = '' OR emp_code LIKE 'GMB-%') AND '222306186' != '' THEN '222306186' ELSE emp_code END,
          token = CASE WHEN (token IS NULL OR token = '' OR token LIKE 'GMB-%') AND '222306186' != '' THEN '222306186' ELSE token END
      WHERE username = 'Tổ May 5';
    

        INSERT OR IGNORE INTO gemba_user_scopes (id, emp_code, gemba_role, status)
        VALUES ('scope_222306186', '222306186', 'MANAGER', 'ACTIVE');
      

      UPDATE gemba_gas_users 
      SET status = 'Active', 
          full_name = 'NGUYỄN THỊ NHUNG',
          emp_code = CASE WHEN (emp_code IS NULL OR emp_code = '' OR emp_code LIKE 'GMB-%') AND '210807002' != '' THEN '210807002' ELSE emp_code END,
          token = CASE WHEN (token IS NULL OR token = '' OR token LIKE 'GMB-%') AND '210807002' != '' THEN '210807002' ELSE token END
      WHERE username = 'Tổ May 6';
    

        INSERT OR IGNORE INTO gemba_user_scopes (id, emp_code, gemba_role, status)
        VALUES ('scope_210807002', '210807002', 'MANAGER', 'ACTIVE');
      

      UPDATE gemba_gas_users 
      SET status = 'Active', 
          full_name = 'NGUYỄN THỊ LOAN',
          emp_code = CASE WHEN (emp_code IS NULL OR emp_code = '' OR emp_code LIKE 'GMB-%') AND '210303003' != '' THEN '210303003' ELSE emp_code END,
          token = CASE WHEN (token IS NULL OR token = '' OR token LIKE 'GMB-%') AND '210303003' != '' THEN '210303003' ELSE token END
      WHERE username = 'Tổ May 7';
    

        INSERT OR IGNORE INTO gemba_user_scopes (id, emp_code, gemba_role, status)
        VALUES ('scope_210303003', '210303003', 'MANAGER', 'ACTIVE');
      

      UPDATE gemba_gas_users 
      SET status = 'Active', 
          full_name = 'LÊ VĂN THUỶ',
          emp_code = CASE WHEN (emp_code IS NULL OR emp_code = '' OR emp_code LIKE 'GMB-%') AND '211003016' != '' THEN '211003016' ELSE emp_code END,
          token = CASE WHEN (token IS NULL OR token = '' OR token LIKE 'GMB-%') AND '211003016' != '' THEN '211003016' ELSE token END
      WHERE username = 'ĐH PX Gò';
    

        INSERT OR IGNORE INTO gemba_user_scopes (id, emp_code, gemba_role, status)
        VALUES ('scope_211003016', '211003016', 'MANAGER', 'ACTIVE');
      

      UPDATE gemba_gas_users 
      SET status = 'Active', 
          full_name = 'NGUYỄN THỊ DIỆU',
          emp_code = CASE WHEN (emp_code IS NULL OR emp_code = '' OR emp_code LIKE 'GMB-%') AND 'GMB-011' != '' THEN 'GMB-011' ELSE emp_code END,
          token = CASE WHEN (token IS NULL OR token = '' OR token LIKE 'GMB-%') AND 'GMB-011' != '' THEN 'GMB-011' ELSE token END
      WHERE username = 'QLCL PX Gò';
    

      UPDATE gemba_gas_users 
      SET status = 'Active', 
          full_name = 'PHẠM VĂN TUẤN',
          emp_code = CASE WHEN (emp_code IS NULL OR emp_code = '' OR emp_code LIKE 'GMB-%') AND '222404007' != '' THEN '222404007' ELSE emp_code END,
          token = CASE WHEN (token IS NULL OR token = '' OR token LIKE 'GMB-%') AND '222404007' != '' THEN '222404007' ELSE token END
      WHERE username = 'Trưởng Line Gò 1';
    

        INSERT OR IGNORE INTO gemba_user_scopes (id, emp_code, gemba_role, status)
        VALUES ('scope_222404007', '222404007', 'MANAGER', 'ACTIVE');
      

      UPDATE gemba_gas_users 
      SET status = 'Active', 
          full_name = 'LÝ HỒNG THÁI',
          emp_code = CASE WHEN (emp_code IS NULL OR emp_code = '' OR emp_code LIKE 'GMB-%') AND '222506057' != '' THEN '222506057' ELSE emp_code END,
          token = CASE WHEN (token IS NULL OR token = '' OR token LIKE 'GMB-%') AND '222506057' != '' THEN '222506057' ELSE token END
      WHERE username = 'Gò 1 - Tổ CĐ 1';
    

        INSERT OR IGNORE INTO gemba_user_scopes (id, emp_code, gemba_role, status)
        VALUES ('scope_222506057', '222506057', 'MANAGER', 'ACTIVE');
      

      UPDATE gemba_gas_users 
      SET status = 'Active', 
          full_name = 'THẠCH SANH',
          emp_code = CASE WHEN (emp_code IS NULL OR emp_code = '' OR emp_code LIKE 'GMB-%') AND '222507014' != '' THEN '222507014' ELSE emp_code END,
          token = CASE WHEN (token IS NULL OR token = '' OR token LIKE 'GMB-%') AND '222507014' != '' THEN '222507014' ELSE token END
      WHERE username = 'Gò 1 - Tổ CĐ 3';
    

        INSERT OR IGNORE INTO gemba_user_scopes (id, emp_code, gemba_role, status)
        VALUES ('scope_222507014', '222507014', 'MANAGER', 'ACTIVE');
      

      UPDATE gemba_gas_users 
      SET status = 'Active', 
          full_name = 'TRẦN VĂN TUÂN',
          emp_code = CASE WHEN (emp_code IS NULL OR emp_code = '' OR emp_code LIKE 'GMB-%') AND '222504006' != '' THEN '222504006' ELSE emp_code END,
          token = CASE WHEN (token IS NULL OR token = '' OR token LIKE 'GMB-%') AND '222504006' != '' THEN '222504006' ELSE token END
      WHERE username = 'Trưởng Line Gò 2';
    

        INSERT OR IGNORE INTO gemba_user_scopes (id, emp_code, gemba_role, status)
        VALUES ('scope_222504006', '222504006', 'MANAGER', 'ACTIVE');
      

      UPDATE gemba_gas_users 
      SET status = 'Active', 
          full_name = 'NGUYỄN THỊ THU HIỀN',
          emp_code = CASE WHEN (emp_code IS NULL OR emp_code = '' OR emp_code LIKE 'GMB-%') AND '201507008' != '' THEN '201507008' ELSE emp_code END,
          token = CASE WHEN (token IS NULL OR token = '' OR token LIKE 'GMB-%') AND '201507008' != '' THEN '201507008' ELSE token END
      WHERE username = 'Gò 2 - Tổ CĐ 1';
    

        INSERT OR IGNORE INTO gemba_user_scopes (id, emp_code, gemba_role, status)
        VALUES ('scope_201507008', '201507008', 'MANAGER', 'ACTIVE');
      

      UPDATE gemba_gas_users 
      SET status = 'Active', 
          full_name = 'NGUYỄN HOÀI LINH',
          emp_code = CASE WHEN (emp_code IS NULL OR emp_code = '' OR emp_code LIKE 'GMB-%') AND 'GMB-015' != '' THEN 'GMB-015' ELSE emp_code END,
          token = CASE WHEN (token IS NULL OR token = '' OR token LIKE 'GMB-%') AND 'GMB-015' != '' THEN 'GMB-015' ELSE token END
      WHERE username = 'Gò 2 - Tổ CĐ 3';
    

      UPDATE gemba_gas_users 
      SET status = 'Active', 
          full_name = 'TRẦN DUY CHƯƠNG',
          emp_code = CASE WHEN (emp_code IS NULL OR emp_code = '' OR emp_code LIKE 'GMB-%') AND '222604025' != '' THEN '222604025' ELSE emp_code END,
          token = CASE WHEN (token IS NULL OR token = '' OR token LIKE 'GMB-%') AND '222604025' != '' THEN '222604025' ELSE token END
      WHERE username = 'Trưởng Line Gò 3';
    

        INSERT OR IGNORE INTO gemba_user_scopes (id, emp_code, gemba_role, status)
        VALUES ('scope_222604025', '222604025', 'MANAGER', 'ACTIVE');
      

      UPDATE gemba_gas_users 
      SET status = 'Active', 
          full_name = 'PHẠM VĂN ĐĂNG',
          emp_code = CASE WHEN (emp_code IS NULL OR emp_code = '' OR emp_code LIKE 'GMB-%') AND '222506012' != '' THEN '222506012' ELSE emp_code END,
          token = CASE WHEN (token IS NULL OR token = '' OR token LIKE 'GMB-%') AND '222506012' != '' THEN '222506012' ELSE token END
      WHERE username = 'Gò 3 - Tổ CĐ 2';
    

        INSERT OR IGNORE INTO gemba_user_scopes (id, emp_code, gemba_role, status)
        VALUES ('scope_222506012', '222506012', 'MANAGER', 'ACTIVE');
      

      UPDATE gemba_gas_users 
      SET status = 'Active', 
          full_name = 'THẠCH SÀ RINH',
          emp_code = CASE WHEN (emp_code IS NULL OR emp_code = '' OR emp_code LIKE 'GMB-%') AND '222408050' != '' THEN '222408050' ELSE emp_code END,
          token = CASE WHEN (token IS NULL OR token = '' OR token LIKE 'GMB-%') AND '222408050' != '' THEN '222408050' ELSE token END
      WHERE username = 'Gò 3 - Tổ CĐ 3';
    

        INSERT OR IGNORE INTO gemba_user_scopes (id, emp_code, gemba_role, status)
        VALUES ('scope_222408050', '222408050', 'MANAGER', 'ACTIVE');
      

      UPDATE gemba_gas_users 
      SET status = 'Active', 
          full_name = 'NGUYỄN VĂN TÌNH',
          emp_code = CASE WHEN (emp_code IS NULL OR emp_code = '' OR emp_code LIKE 'GMB-%') AND '211206004' != '' THEN '211206004' ELSE emp_code END,
          token = CASE WHEN (token IS NULL OR token = '' OR token LIKE 'GMB-%') AND '211206004' != '' THEN '211206004' ELSE token END
      WHERE username = 'Tinhnguyenvan';
    

        INSERT OR IGNORE INTO gemba_user_scopes (id, emp_code, gemba_role, status)
        VALUES ('scope_211206004', '211206004', 'MANAGER', 'ACTIVE');
      

      UPDATE gemba_gas_users 
      SET status = 'Active', 
          full_name = 'DƯ THỊ THANH TÌNH',
          emp_code = CASE WHEN (emp_code IS NULL OR emp_code = '' OR emp_code LIKE 'GMB-%') AND '222102020' != '' THEN '222102020' ELSE emp_code END,
          token = CASE WHEN (token IS NULL OR token = '' OR token LIKE 'GMB-%') AND '222102020' != '' THEN '222102020' ELSE token END
      WHERE username = 'Dư Thị Thanh Tình';
    

        INSERT OR IGNORE INTO gemba_user_scopes (id, emp_code, gemba_role, status)
        VALUES ('scope_222102020', '222102020', 'MANAGER', 'ACTIVE');
      

      UPDATE gemba_gas_users 
      SET status = 'Active', 
          full_name = 'TRẦN NGỌC HUY',
          emp_code = CASE WHEN (emp_code IS NULL OR emp_code = '' OR emp_code LIKE 'GMB-%') AND '202608002' != '' THEN '202608002' ELSE emp_code END,
          token = CASE WHEN (token IS NULL OR token = '' OR token LIKE 'GMB-%') AND '202608002' != '' THEN '202608002' ELSE token END
      WHERE username = 'Trần Ngọc Huy';
    

        INSERT OR IGNORE INTO gemba_user_scopes (id, emp_code, gemba_role, status)
        VALUES ('scope_202608002', '202608002', 'MANAGER', 'ACTIVE');
      

      UPDATE gemba_gas_users 
      SET status = 'Active', 
          full_name = 'PHẠM NGUYỄN ANH HUY',
          emp_code = CASE WHEN (emp_code IS NULL OR emp_code = '' OR emp_code LIKE 'GMB-%') AND '202608001' != '' THEN '202608001' ELSE emp_code END,
          token = CASE WHEN (token IS NULL OR token = '' OR token LIKE 'GMB-%') AND '202608001' != '' THEN '202608001' ELSE token END
      WHERE username = 'Phạm Nguyễn Anh Huy';
    

        INSERT OR IGNORE INTO gemba_user_scopes (id, emp_code, gemba_role, status)
        VALUES ('scope_202608001', '202608001', 'MANAGER', 'ACTIVE');
      