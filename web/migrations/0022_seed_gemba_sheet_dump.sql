-- Seed script for Gemba Gas Integration
-- Auto-generated from sheet_dump.json

INSERT OR REPLACE INTO gemba_settings (key, value) VALUES ('FOLDER_DOC_ID', '1-Gb9vIzIG-XC1fkpt9ByUAPG6JH52ue6');
INSERT OR REPLACE INTO gemba_settings (key, value) VALUES ('LOGIN_GROUPS', 'VP Chuỗi, VP Khu vực, PX Đầu vào, PX May, PX Gò');
INSERT OR REPLACE INTO gemba_settings (key, value) VALUES ('LOGIN_TITLE', 'Chào mừng đến TBS Group!');
INSERT OR REPLACE INTO gemba_settings (key, value) VALUES ('APP_DOT', 'Pro');
INSERT OR REPLACE INTO gemba_settings (key, value) VALUES ('APP_NAME', 'Gemba');
INSERT OR REPLACE INTO gemba_settings (key, value) VALUES ('SLA_DAYS_LOW', '14');
INSERT OR REPLACE INTO gemba_settings (key, value) VALUES ('APP_ORG', 'TBS Group');
INSERT OR REPLACE INTO gemba_settings (key, value) VALUES ('DEPARTMENTS', 'Sản xuất, Kỹ thuật, Chất lượng');
INSERT OR REPLACE INTO gemba_settings (key, value) VALUES ('SLA_DAYS', '2');
INSERT OR REPLACE INTO gemba_settings (key, value) VALUES ('ZALO_BOT_TOKEN', '4038673078688912847:tiQCYEnLyLXlMNNCylfVqmpdtDrtCRnfsttebypErXRZfXdKYniVOreNrToilJMo');
INSERT OR REPLACE INTO gemba_settings (key, value) VALUES ('ZALO_GROUP_CHAT_ID', '');
INSERT OR REPLACE INTO gemba_settings (key, value) VALUES ('POSITIONS', 'Nhân viên, Tổ trưởng, Quản đốc');
INSERT OR REPLACE INTO gemba_settings (key, value) VALUES ('LOGIN_SUBTITLE', 'Hệ thống quản lý Gemba — Nhà máy SK Miền Đông');
INSERT OR REPLACE INTO gemba_settings (key, value) VALUES ('SLA_DAYS_CRITICAL', '1');
INSERT OR REPLACE INTO gemba_settings (key, value) VALUES ('APP_SUBTITLE', 'NM SK Miền Đông');
INSERT OR REPLACE INTO gemba_settings (key, value) VALUES ('FOLDER_IMG_ID', '1-Gb9vIzIG-XC1fkpt9ByUAPG6JH52ue6');
INSERT OR REPLACE INTO gemba_settings (key, value) VALUES ('SLA_DAYS_MEDIUM', '7');
INSERT OR REPLACE INTO gemba_settings (key, value) VALUES ('SLA_DAYS_HIGH', '3');
INSERT OR REPLACE INTO gemba_gas_categories (code, name, status) VALUES ('7S', '7S', 'Active');
INSERT OR REPLACE INTO gemba_gas_categories (code, name, status) VALUES ('Tuân thủ', 'Tuân thủ', 'Active');
INSERT OR REPLACE INTO gemba_gas_categories (code, name, status) VALUES ('8W', '8W', 'Active');
INSERT OR REPLACE INTO gemba_gas_categories (code, name, status) VALUES ('Chất lượng', 'Chất lượng', 'Active');
INSERT OR REPLACE INTO gemba_gas_categories (code, name, status) VALUES ('MMTB', 'MMTB', 'Active');
INSERT OR REPLACE INTO gemba_gas_categories (code, name, status) VALUES ('Khác', 'Khác', 'Active');
INSERT OR IGNORE INTO gemba_gas_dm_nml (factory, line, team, assignee, assignee_backup, status) VALUES ('PX Đầu vào', 'LINE CHẶT 1', 'Cắt', 'TRẦN VĂN HOÁ', 'Điều hành NM MĐ', 'Active');
INSERT OR IGNORE INTO gemba_gas_dm_nml (factory, line, team, assignee, assignee_backup, status) VALUES ('PX Đầu vào', 'LINE CHẶT 1', 'Lạng-cán dán-đồng bộ', 'TRẦN VĂN HOÁ', 'Điều hành NM MĐ', 'Active');
INSERT OR IGNORE INTO gemba_gas_dm_nml (factory, line, team, assignee, assignee_backup, status) VALUES ('PX Đầu vào', 'LINE IN ÉP 1', 'In-ép', 'TRẦN VĂN HOÁ', 'Điều hành NM MĐ', 'Active');
INSERT OR IGNORE INTO gemba_gas_dm_nml (factory, line, team, assignee, assignee_backup, status) VALUES ('PX Đầu vào', 'LINE IN ÉP 1', 'Da lót tẩy', 'TRẦN VĂN HOÁ', 'Điều hành NM MĐ', 'Active');
INSERT OR IGNORE INTO gemba_gas_dm_nml (factory, line, team, assignee, assignee_backup, status) VALUES ('PX May', 'LINE_HTM 1', 'Tổ may 1', 'HOÀNG QUỐC NGHỊ', 'Điều hành NM MĐ', 'Active');
INSERT OR IGNORE INTO gemba_gas_dm_nml (factory, line, team, assignee, assignee_backup, status) VALUES ('PX May', 'LINE_HTM 1', 'Tổ may 2', 'HOÀNG QUỐC NGHỊ', 'Điều hành NM MĐ', 'Active');
INSERT OR IGNORE INTO gemba_gas_dm_nml (factory, line, team, assignee, assignee_backup, status) VALUES ('PX May', 'LINE_HTM 1', 'Tổ may 3', 'HOÀNG QUỐC NGHỊ', 'Điều hành NM MĐ', 'Active');
INSERT OR IGNORE INTO gemba_gas_dm_nml (factory, line, team, assignee, assignee_backup, status) VALUES ('PX May', 'LINE_HTM 1', 'Tổ may 4', 'HOÀNG QUỐC NGHỊ', 'Điều hành NM MĐ', 'Active');
INSERT OR IGNORE INTO gemba_gas_dm_nml (factory, line, team, assignee, assignee_backup, status) VALUES ('PX May', 'LINE_HTM 1', 'Tổ may 5', 'HOÀNG QUỐC NGHỊ', 'Điều hành NM MĐ', 'Active');
INSERT OR IGNORE INTO gemba_gas_dm_nml (factory, line, team, assignee, assignee_backup, status) VALUES ('PX May', 'LINE_HTM 2', 'Tổ may 6', 'HOÀNG QUỐC NGHỊ', 'Điều hành NM MĐ', 'Active');
INSERT OR IGNORE INTO gemba_gas_dm_nml (factory, line, team, assignee, assignee_backup, status) VALUES ('PX May', 'LINE_HTM 2', 'Tổ may 7', 'HOÀNG QUỐC NGHỊ', 'Điều hành NM MĐ', 'Active');
INSERT OR IGNORE INTO gemba_gas_dm_nml (factory, line, team, assignee, assignee_backup, status) VALUES ('PX Gò', 'LINE_HTG 1', 'Tổ công đoạn 1', 'LÊ VĂN THUỶ', 'Điều hành NM MĐ', 'Active');
INSERT OR IGNORE INTO gemba_gas_dm_nml (factory, line, team, assignee, assignee_backup, status) VALUES ('PX Gò', 'LINE_HTG 1', 'Tổ công đoạn 2', 'LÊ VĂN THUỶ', 'Điều hành NM MĐ', 'Active');
INSERT OR IGNORE INTO gemba_gas_dm_nml (factory, line, team, assignee, assignee_backup, status) VALUES ('PX Gò', 'LINE_HTG 1', 'Tổ công đoạn 3', 'LÊ VĂN THUỶ', 'Điều hành NM MĐ', 'Active');
INSERT OR IGNORE INTO gemba_gas_dm_nml (factory, line, team, assignee, assignee_backup, status) VALUES ('PX Gò', 'LINE_HTG 2', 'Tổ công đoạn 1', 'LÊ VĂN THUỶ', 'Điều hành NM MĐ', 'Active');
INSERT OR IGNORE INTO gemba_gas_dm_nml (factory, line, team, assignee, assignee_backup, status) VALUES ('PX Gò', 'LINE_HTG 2', 'Tổ công đoạn 2', 'LÊ VĂN THUỶ', 'Điều hành NM MĐ', 'Active');
INSERT OR IGNORE INTO gemba_gas_dm_nml (factory, line, team, assignee, assignee_backup, status) VALUES ('PX Gò', 'LINE_HTG 2', 'Tổ công đoạn 3', 'LÊ VĂN THUỶ', 'Điều hành NM MĐ', 'Active');
INSERT OR IGNORE INTO gemba_gas_dm_nml (factory, line, team, assignee, assignee_backup, status) VALUES ('PX Gò', 'LINE_HTG 3', 'Tổ công đoạn 1', 'LÊ VĂN THUỶ', 'Điều hành NM MĐ', 'Active');
INSERT OR IGNORE INTO gemba_gas_dm_nml (factory, line, team, assignee, assignee_backup, status) VALUES ('PX Gò', 'LINE_HTG 3', 'Tổ công đoạn 2', 'LÊ VĂN THUỶ', 'Điều hành NM MĐ', 'Active');
INSERT OR IGNORE INTO gemba_gas_dm_nml (factory, line, team, assignee, assignee_backup, status) VALUES ('PX Gò', 'LINE_HTG 3', 'Tổ công đoạn 3', 'LÊ VĂN THUỶ', 'Điều hành NM MĐ', 'Active');
INSERT OR REPLACE INTO gemba_gas_users (username, full_name, group_name, factory, line, team, department, position, email, phone, role, password, token, zalo_chat_id, status) VALUES ('Admin', 'LÊ KHẢI', 'VP Chuỗi', '', '', '', 'IT', '', '', '', 'Admin', '123456', '', '', 'Active');
INSERT OR REPLACE INTO gemba_gas_users (username, full_name, group_name, factory, line, team, department, position, email, phone, role, password, token, zalo_chat_id, status) VALUES ('TGĐ Chuỗi', 'PHẠM MINH TÙNG', 'VP Chuỗi', '', '', '', 'Ban Giám Đốc', '', '', '', 'Tổng Giám đốc', '123456', '', '', 'Active');
INSERT OR REPLACE INTO gemba_gas_users (username, full_name, group_name, factory, line, team, department, position, email, phone, role, password, token, zalo_chat_id, status) VALUES ('CN- CI Chuỗi', 'LÊ HUY TUẤN', 'VP Chuỗi', '', '', '', 'CI – Cải tiến', '', '', '', 'Giám đốc', '123456', '', '', 'Active');
INSERT OR REPLACE INTO gemba_gas_users (username, full_name, group_name, factory, line, team, department, position, email, phone, role, password, token, zalo_chat_id, status) VALUES ('QLCL Chuỗi TPR', '', 'VP Chuỗi', '', '', '', 'Chất lượng', '', '', '', 'Giám đốc', '123456', '', '', 'Active');
INSERT OR REPLACE INTO gemba_gas_users (username, full_name, group_name, factory, line, team, department, position, email, phone, role, password, token, zalo_chat_id, status) VALUES ('MMTB Chuỗi', '', 'VP Chuỗi', '', '', '', 'CI – Cải tiến', '', '', '', 'Giám đốc', '123456', '', '', 'Active');
INSERT OR REPLACE INTO gemba_gas_users (username, full_name, group_name, factory, line, team, department, position, email, phone, role, password, token, zalo_chat_id, status) VALUES ('GĐ NM  MĐ', 'ĐỖ ĐẮC MIỀN', 'VP Khu vực', '', '', '', 'Ban Giám Đốc', '', '', '', 'Tổng Giám đốc', '123456', '', '', 'Active');
INSERT OR REPLACE INTO gemba_gas_users (username, full_name, group_name, factory, line, team, department, position, email, phone, role, password, token, zalo_chat_id, status) VALUES ('CN - CI SK MĐ', 'PHAN THỊ THANH TÂM', 'VP Khu vực', '', '', '', 'CI – Cải tiến', '', '', '', 'Giám đốc', '123456', '', '', 'Active');
INSERT OR REPLACE INTO gemba_gas_users (username, full_name, group_name, factory, line, team, department, position, email, phone, role, password, token, zalo_chat_id, status) VALUES ('QLCL SK MĐ', 'CAO THỊ MỸ HẠNH', 'VP Khu vực', '', '', '', 'Chất lượng', '', '', '', 'Giám đốc', '123456', '', '', 'Active');
INSERT OR REPLACE INTO gemba_gas_users (username, full_name, group_name, factory, line, team, department, position, email, phone, role, password, token, zalo_chat_id, status) VALUES ('MMTB  SK MĐ', 'CÔNG HOÀNG CHIẾN', 'VP Khu vực', '', '', '', 'CI – Cải tiến', '', '', '', 'Giám đốc', '123456', '', '', 'Active');
INSERT OR REPLACE INTO gemba_gas_users (username, full_name, group_name, factory, line, team, department, position, email, phone, role, password, token, zalo_chat_id, status) VALUES ('ĐH PX Đầu vào', 'TRẦN VĂN HOÁ', 'PX Đầu vào', 'PX Đầu vào', '', '', 'Điều hành SX', '', '', '', 'Giám đốc', '123456', '', '', 'Active');
INSERT OR REPLACE INTO gemba_gas_users (username, full_name, group_name, factory, line, team, department, position, email, phone, role, password, token, zalo_chat_id, status) VALUES ('QLCL PX Đầu vào', 'ĐẶNG THỊ LÀI', 'PX Đầu vào', 'PX Đầu vào', '', '', 'Chất lượng', '', '', '', 'Giám đốc', '123456', '', '', 'Active');
INSERT OR REPLACE INTO gemba_gas_users (username, full_name, group_name, factory, line, team, department, position, email, phone, role, password, token, zalo_chat_id, status) VALUES ('Trưởng Line Chặt', '', 'PX Đầu vào', 'PX Đầu vào', 'LINE CHẶT 1', '', 'Điều hành SX', '', '', '', 'Giám đốc', '123456', '', '', 'Active');
INSERT OR REPLACE INTO gemba_gas_users (username, full_name, group_name, factory, line, team, department, position, email, phone, role, password, token, zalo_chat_id, status) VALUES ('Tổ Cắt', 'LĂNG VĂN QUẾ', 'PX Đầu vào', 'PX Đầu vào', 'LINE CHẶT 1', 'Cắt', 'Sản xuất', '', '', '', 'Giám đốc', '123456', '', '', 'Active');
INSERT OR REPLACE INTO gemba_gas_users (username, full_name, group_name, factory, line, team, department, position, email, phone, role, password, token, zalo_chat_id, status) VALUES ('Tổ Lạng-Cán dán&Đồng bộ', 'NGUYỄN THỊ LOA', 'PX Đầu vào', 'PX Đầu vào', 'LINE CHẶT 1', 'Lạng-cán dán-đồng bộ', 'Sản xuất', '', '', '', 'Giám đốc', '123456', '', '', 'Active');
INSERT OR REPLACE INTO gemba_gas_users (username, full_name, group_name, factory, line, team, department, position, email, phone, role, password, token, zalo_chat_id, status) VALUES ('Trưởng Line In Ép', '', 'PX Đầu vào', 'PX Đầu vào', 'LINE IN ÉP 1', '', 'Điều hành SX', '', '', '', 'Giám đốc', '123456', '', '', 'Active');
INSERT OR REPLACE INTO gemba_gas_users (username, full_name, group_name, factory, line, team, department, position, email, phone, role, password, token, zalo_chat_id, status) VALUES ('Tổ In-ép', 'NGUYỄN HOÀI HƯNG', 'PX Đầu vào', 'PX Đầu vào', 'LINE IN ÉP 1', 'In-ép', 'Sản xuất', '', '', '', 'Giám đốc', '123456', '', '', 'Active');
INSERT OR REPLACE INTO gemba_gas_users (username, full_name, group_name, factory, line, team, department, position, email, phone, role, password, token, zalo_chat_id, status) VALUES ('Tổ Da lót tẩy', 'NGUYỄN HOÀI HƯNG', 'PX Đầu vào', 'PX Đầu vào', 'LINE IN ÉP 1', 'Da lót tẩy', 'Sản xuất', '', '', '', 'Giám đốc', '123456', '', '', 'Active');
INSERT OR REPLACE INTO gemba_gas_users (username, full_name, group_name, factory, line, team, department, position, email, phone, role, password, token, zalo_chat_id, status) VALUES ('ĐH PX May', 'HOÀNG QUỐC NGHỊ', 'PX May', 'PX May', '', '', 'Điều hành SX', '', '', '', 'Giám đốc', '123456', '', '', 'Active');
INSERT OR REPLACE INTO gemba_gas_users (username, full_name, group_name, factory, line, team, department, position, email, phone, role, password, token, zalo_chat_id, status) VALUES ('QLCL PX May', 'VŨ THỊ HƯỜNG', 'PX May', 'PX May', '', '', 'Chất lượng', '', '', '', 'Giám đốc', '123456', '', '', 'Active');
INSERT OR REPLACE INTO gemba_gas_users (username, full_name, group_name, factory, line, team, department, position, email, phone, role, password, token, zalo_chat_id, status) VALUES ('Trưởng Line May 1', '', 'PX May', 'PX May', 'LINE_HTM 1', '', 'Điều hành SX', '', '', '', 'Giám đốc', '123456', '', '', 'Active');
INSERT OR REPLACE INTO gemba_gas_users (username, full_name, group_name, factory, line, team, department, position, email, phone, role, password, token, zalo_chat_id, status) VALUES ('Tổ May 1', 'LÊ VĂN TUẤN', 'PX May', 'PX May', 'LINE_HTM 1', 'Tổ May 1', 'Sản xuất', '', '', '', 'Giám đốc', '123456', '', '', 'Active');
INSERT OR REPLACE INTO gemba_gas_users (username, full_name, group_name, factory, line, team, department, position, email, phone, role, password, token, zalo_chat_id, status) VALUES ('Tổ May 2', 'HỒ KHẮC NGHĨA', 'PX May', 'PX May', 'LINE_HTM 1', 'Tổ May 2', 'Sản xuất', '', '', '', 'Giám đốc', '123456', '', '', 'Active');
INSERT OR REPLACE INTO gemba_gas_users (username, full_name, group_name, factory, line, team, department, position, email, phone, role, password, token, zalo_chat_id, status) VALUES ('Tổ May 3', 'NGUYỄN THẠCH TRƯỜNG', 'PX May', 'PX May', 'LINE_HTM 1', 'Tổ May 3', 'Sản xuất', '', '', '', 'Giám đốc', '123456', '', '', 'Active');
INSERT OR REPLACE INTO gemba_gas_users (username, full_name, group_name, factory, line, team, department, position, email, phone, role, password, token, zalo_chat_id, status) VALUES ('Tổ May 4', 'MAI ĐỨC VIỆT', 'PX May', 'PX May', 'LINE_HTM 1', 'Tổ May 4', 'Sản xuất', '', '', '', 'Giám đốc', '123456', '', '', 'Active');
INSERT OR REPLACE INTO gemba_gas_users (username, full_name, group_name, factory, line, team, department, position, email, phone, role, password, token, zalo_chat_id, status) VALUES ('Tổ May 5', 'LÊ VĂN CƯỜNG', 'PX May', 'PX May', 'LINE_HTM 1', 'Tổ May 5', 'Sản xuất', '', '', '', 'Giám đốc', '123456', '', '', 'Active');
INSERT OR REPLACE INTO gemba_gas_users (username, full_name, group_name, factory, line, team, department, position, email, phone, role, password, token, zalo_chat_id, status) VALUES ('Trưởng Line May 2', '', 'PX May', 'PX May', 'LINE_HTM 2', '', 'Điều hành SX', '', '', '', 'Giám đốc', '123456', '', '', 'Active');
INSERT OR REPLACE INTO gemba_gas_users (username, full_name, group_name, factory, line, team, department, position, email, phone, role, password, token, zalo_chat_id, status) VALUES ('Tổ May 6', 'NGUYỄN THỊ NHUNG', 'PX May', 'PX May', 'LINE_HTM 2', 'Tổ May 6', 'Sản xuất', '', '', '', 'Giám đốc', '123456', '', '', 'Active');
INSERT OR REPLACE INTO gemba_gas_users (username, full_name, group_name, factory, line, team, department, position, email, phone, role, password, token, zalo_chat_id, status) VALUES ('Tổ May 7', 'NGUYỄN THỊ LOAN', 'PX May', 'PX May', 'LINE_HTM 2', 'Tổ May 7', 'Sản xuất', '', '', '', 'Giám đốc', '123456', '', '', 'Active');
INSERT OR REPLACE INTO gemba_gas_users (username, full_name, group_name, factory, line, team, department, position, email, phone, role, password, token, zalo_chat_id, status) VALUES ('ĐH PX Gò', 'LÊ VĂN THUỶ', 'PX Gò', 'PX Gò', '', '', 'Điều hành SX', '', '', '', 'Giám đốc', '123456', '', '', 'Active');
INSERT OR REPLACE INTO gemba_gas_users (username, full_name, group_name, factory, line, team, department, position, email, phone, role, password, token, zalo_chat_id, status) VALUES ('QLCL PX Gò', 'NGUYỄN THỊ DIỆU', 'PX Gò', 'PX Gò', '', '', 'Chất lượng', '', '', '', 'Giám đốc', '123456', '', '', 'Active');
INSERT OR REPLACE INTO gemba_gas_users (username, full_name, group_name, factory, line, team, department, position, email, phone, role, password, token, zalo_chat_id, status) VALUES ('Trưởng Line Gò 1', 'PHẠM VĂN TUẤN', 'PX Gò', 'PX Gò', 'LINE_HTG 1', '', 'Điều hành SX', '', '', '', 'Giám đốc', '123456', '', '', 'Active');
INSERT OR REPLACE INTO gemba_gas_users (username, full_name, group_name, factory, line, team, department, position, email, phone, role, password, token, zalo_chat_id, status) VALUES ('Gò 1 - Tổ CĐ 1', 'LÝ HỒNG THÁI', 'PX Gò', 'PX Gò', 'LINE_HTG 1', 'Tổ Công Đoạn 1', 'Sản xuất', '', '', '', 'Giám đốc', '123456', '', '', 'Active');
INSERT OR REPLACE INTO gemba_gas_users (username, full_name, group_name, factory, line, team, department, position, email, phone, role, password, token, zalo_chat_id, status) VALUES ('Gò 1 - Tổ CĐ 2', '', 'PX Gò', 'PX Gò', 'LINE_HTG 1', 'Tổ Công Đoạn 2', 'Sản xuất', '', '', '', 'Giám đốc', '123456', '', '', 'Active');
INSERT OR REPLACE INTO gemba_gas_users (username, full_name, group_name, factory, line, team, department, position, email, phone, role, password, token, zalo_chat_id, status) VALUES ('Gò 1 - Tổ CĐ 3', 'THẠCH SANH', 'PX Gò', 'PX Gò', 'LINE_HTG 1', 'Tổ Công Đoạn 3', 'Sản xuất', '', '', '', 'Giám đốc', '123456', '', '', 'Active');
INSERT OR REPLACE INTO gemba_gas_users (username, full_name, group_name, factory, line, team, department, position, email, phone, role, password, token, zalo_chat_id, status) VALUES ('QLCL Line Gò 1', '', 'PX Gò', 'PX Gò', 'LINE_HTG 1', '', 'Chất lượng', '', '', '', 'Giám đốc', '123456', '', '', 'Active');
INSERT OR REPLACE INTO gemba_gas_users (username, full_name, group_name, factory, line, team, department, position, email, phone, role, password, token, zalo_chat_id, status) VALUES ('Trưởng Line Gò 2', 'TRẦN VĂN TUÂN', 'PX Gò', 'PX Gò', 'LINE_HTG 2', '', 'Điều hành SX', '', '', '', 'Giám đốc', '123456', '', '', 'Active');
INSERT OR REPLACE INTO gemba_gas_users (username, full_name, group_name, factory, line, team, department, position, email, phone, role, password, token, zalo_chat_id, status) VALUES ('Gò 2 - Tổ CĐ 1', 'NGUYỄN THỊ THU HIỀN', 'PX Gò', 'PX Gò', 'LINE_HTG 2', 'Tổ Công Đoạn 1', 'Sản xuất', '', '', '', 'Giám đốc', '123456', '', '', 'Active');
INSERT OR REPLACE INTO gemba_gas_users (username, full_name, group_name, factory, line, team, department, position, email, phone, role, password, token, zalo_chat_id, status) VALUES ('Gò 2 - Tổ CĐ 2', '', 'PX Gò', 'PX Gò', 'LINE_HTG 2', 'Tổ Công Đoạn 2', 'Sản xuất', '', '', '', 'Giám đốc', '123456', '', '', 'Active');
INSERT OR REPLACE INTO gemba_gas_users (username, full_name, group_name, factory, line, team, department, position, email, phone, role, password, token, zalo_chat_id, status) VALUES ('Gò 2 - Tổ CĐ 3', 'NGUYỄN HOÀI LINH', 'PX Gò', 'PX Gò', 'LINE_HTG 2', 'Tổ Công Đoạn 3', 'Sản xuất', '', '', '', 'Giám đốc', '123456', '', '', 'Active');
INSERT OR REPLACE INTO gemba_gas_users (username, full_name, group_name, factory, line, team, department, position, email, phone, role, password, token, zalo_chat_id, status) VALUES ('QLCL Line Gò 2', '', 'PX Gò', 'PX Gò', 'LINE_HTG 2', '', 'Chất lượng', '', '', '', 'Giám đốc', '123456', '', '', 'Active');
INSERT OR REPLACE INTO gemba_gas_users (username, full_name, group_name, factory, line, team, department, position, email, phone, role, password, token, zalo_chat_id, status) VALUES ('Trưởng Line Gò 3', 'TRẦN DUY CHƯƠNG', 'PX Gò', 'PX Gò', 'LINE_HTG 3', '', 'Điều hành SX', '', '', '', 'Giám đốc', '123456', '', '', 'Active');
INSERT OR REPLACE INTO gemba_gas_users (username, full_name, group_name, factory, line, team, department, position, email, phone, role, password, token, zalo_chat_id, status) VALUES ('Gò 3 - Tổ CĐ 1', 'TRẦN DUY CHƯƠNG', 'PX Gò', 'PX Gò', 'LINE_HTG 3', 'Tổ Công Đoạn 1', 'Sản xuất', '', '', '', 'Giám đốc', '123456', '', '', 'Active');
INSERT OR REPLACE INTO gemba_gas_users (username, full_name, group_name, factory, line, team, department, position, email, phone, role, password, token, zalo_chat_id, status) VALUES ('Gò 3 - Tổ CĐ 2', 'PHẠM VĂN ĐĂNG', 'PX Gò', 'PX Gò', 'LINE_HTG 3', 'Tổ Công Đoạn 2', 'Sản xuất', '', '', '', 'Giám đốc', '123456', '', '', 'Active');
INSERT OR REPLACE INTO gemba_gas_users (username, full_name, group_name, factory, line, team, department, position, email, phone, role, password, token, zalo_chat_id, status) VALUES ('Gò 3 - Tổ CĐ 3', 'THẠCH SÀ RINH', 'PX Gò', 'PX Gò', 'LINE_HTG 3', 'Tổ Công Đoạn 3', 'Sản xuất', '', '', '', 'Giám đốc', '123456', '', '', 'Active');
INSERT OR REPLACE INTO gemba_gas_users (username, full_name, group_name, factory, line, team, department, position, email, phone, role, password, token, zalo_chat_id, status) VALUES ('QLCL Line Gò 3', '', 'PX Gò', 'PX Gò', 'LINE_HTG 3', '', 'Chất lượng', '', '', '', 'Giám đốc', '123456', '', '', 'Active');
INSERT OR REPLACE INTO gemba_gas_users (username, full_name, group_name, factory, line, team, department, position, email, phone, role, password, token, zalo_chat_id, status) VALUES ('Tinhnguyenvan', 'Nguyễn văn Tình', 'VP Chuỗi', '', '', '', '', '', 'tinh.pacific@gmail.com', '935194250', 'Viewer', '123456', '', '', 'Active');
INSERT OR REPLACE INTO gemba_gas_records (
      id, status, priority, recorded_date, week, factory, line, team, location,
      type_code, issue_name, title, description, product_code, proposal,
      img_before, video, files, creator_user, creator_name, assignee_user, assignee_name,
      created_at, started_at, result, img_after, completed_at, process_hours, reject_reason, sync_status
    ) VALUES (
      'GB-2026-0001', 'Hoàn thành', 'High', '2026-08-13T02:24:05.652Z', 'W33-2026', 'PX May', 'LINE_HTM 1', 'Tổ may 1', '',
      'Khác', 'Khác', 'Nghiên cứu May Lập trình TT thân', 'Cải thiện PPH', '144238', '',
      'https://drive.google.com/thumbnail?id=1DoTFsYxlVPhI4A5QNmT104yEFW_LlEpg&sz=w1600', 'https://drive.google.com/file/d/19qHveKyLiDVlUTmA13hMMI4VWq2TGGsG/view', '', 'Tổ May 1', 'LÊ VĂN TUẤN', 'HOÀNG QUỐC NGHỊ', 'HOÀNG QUỐC NGHỊ',
      '2026-08-13T02:24:05.652Z', '2026-08-13T04:19:18.978Z', 'May tt thân TN bằng máy lập trình', 'https://drive.google.com/thumbnail?id=1pV_suT9q1oKuYj4YcCRSt5enpHr1bKcG&sz=w1600', '2026-08-13T04:22:12.840Z', 0, '', 'SYNCED'
    );
INSERT OR REPLACE INTO gemba_gas_records (
      id, status, priority, recorded_date, week, factory, line, team, location,
      type_code, issue_name, title, description, product_code, proposal,
      img_before, video, files, creator_user, creator_name, assignee_user, assignee_name,
      created_at, started_at, result, img_after, completed_at, process_hours, reject_reason, sync_status
    ) VALUES (
      'GB-2026-0002', 'Hoàn thành', 'Medium', '2026-08-13T03:09:06.475Z', 'W33-2026', 'PX Đầu vào', 'LINE CHẶT 1', 'Lạng-cán dán-đồng bộ', 'Ép pho mũi ',
      'Chất lượng', 'Chất lượng sản phẩm', 'Ép pho mũi co rút', 'Pho mũi co rút 3mm sau khi ép', '144225', '',
      'https://drive.google.com/thumbnail?id=1S--17czgtfVYz92vtqRhCJO6bP0025-3&sz=w1600', '', '', 'Tổ Lạng-Cán dán&Đồng bộ', 'NGUYỄN THỊ LOA', 'Tổ Lạng-Cán dán&Đồng bộ', 'NGUYỄN THỊ LOA',
      '2026-08-13T03:09:06.475Z', '2026-08-13T07:10:55.962Z', 'Đã xử lý ok', 'https://drive.google.com/thumbnail?id=1uQ5LZnqlbyWkpiwR5ZaJNu7FXFt6B1d7&sz=w1600', '2026-08-13T07:21:26.175Z', 0.2, '', 'SYNCED'
    );
INSERT OR REPLACE INTO gemba_gas_records (
      id, status, priority, recorded_date, week, factory, line, team, location,
      type_code, issue_name, title, description, product_code, proposal,
      img_before, video, files, creator_user, creator_name, assignee_user, assignee_name,
      created_at, started_at, result, img_after, completed_at, process_hours, reject_reason, sync_status
    ) VALUES (
      'GB-2026-0003', 'Hoàn thành', 'Medium', '2026-08-13T07:16:48.527Z', 'W33-2026', 'PX Gò', 'LINE_HTG 1', 'Tổ công đoạn 1', 'máy ép gót nóng lạnh',
      'MMTB', 'Máy móc hư hỏng chưa xử lý', 'máy hư chờ sữa', 'máy ép chậm hơi yếu', '', '',
      'https://drive.google.com/thumbnail?id=1tme_Nsk0cWQsYVVANbCZ9RSgroMRUG1T&sz=w1600', '', '', 'Trưởng Line Gò 1', 'PHẠM VĂN TUẤN', 'MMTB  SK MĐ', 'MMTB  SK MĐ',
      '2026-08-13T07:16:48.527Z', '2026-08-13T07:35:17.779Z', 'máy hư do thao tác, đã sửa xong', 'https://drive.google.com/thumbnail?id=1Oid2k270fzpazuwU43hQ9yESfpd3YnGa&sz=w1600', '2026-08-13T07:38:10.314Z', 0, '', 'SYNCED'
    );
INSERT OR REPLACE INTO gemba_gas_records (
      id, status, priority, recorded_date, week, factory, line, team, location,
      type_code, issue_name, title, description, product_code, proposal,
      img_before, video, files, creator_user, creator_name, assignee_user, assignee_name,
      created_at, started_at, result, img_after, completed_at, process_hours, reject_reason, sync_status
    ) VALUES (
      'GB-2026-0004', 'Hoàn thành', 'High', '2026-08-13T07:42:40.594Z', 'W33-2026', 'PX May', 'LINE_HTM 2', 'Tổ may 6', '',
      'Chất lượng', 'Chất lượng sản phẩm', 'Viền lên keo nhiều , không viền được', 'Vướng chất lượng ảnh hưởng PPH , nguồn thu nhập người LĐ', '144225', '',
      'https://drive.google.com/thumbnail?id=1C3Oasoxk5UEfuZIzb23JhSFN7yGsJmlX&sz=w1600', '', '', 'Tổ May 6', 'NGUYỄN THỊ NHUNG', 'HOÀNG QUỐC NGHỊ', 'HOÀNG QUỐC NGHỊ',
      '2026-08-13T07:42:40.594Z', '2026-08-15T08:13:55.085Z', 'Làm lại viền cũ', 'https://drive.google.com/thumbnail?id=1F97nkcyX7v6doN8wkTxcljnt0K9Fnds9&sz=w1600', '2026-08-15T08:14:22.285Z', 0, '', 'SYNCED'
    );
INSERT OR REPLACE INTO gemba_gas_records (
      id, status, priority, recorded_date, week, factory, line, team, location,
      type_code, issue_name, title, description, product_code, proposal,
      img_before, video, files, creator_user, creator_name, assignee_user, assignee_name,
      created_at, started_at, result, img_after, completed_at, process_hours, reject_reason, sync_status
    ) VALUES (
      'GB-2026-0005', 'Hoàn thành', 'Medium', '2026-08-13T07:51:02.064Z', 'W33-2026', 'PX Gò', 'LINE_HTG 3', 'Tổ công đoạn 2', 'May ép đe',
      'MMTB', 'Máy móc hư hỏng chưa xử lý', 'May hu', 'May bi hu bo ép', '', 'Thay bo ép',
      'https://drive.google.com/thumbnail?id=1bPMMizOVqDEo2hanflD3sRn1k-Zl-8t_&sz=w1600', '', '', 'Trưởng Line Gò 3', 'TRẦN DUY CHƯƠNG', 'MMTB  SK MĐ', 'MMTB  SK MĐ',
      '2026-08-13T07:51:02.064Z', '2026-08-13T07:53:17.595Z', 'Da thay the', 'https://drive.google.com/thumbnail?id=1ssLKT50eqpdoRNAP1Inb-ULvKV-f6oB7&sz=w1600|https://drive.google.com/thumbnail?id=1beSvaOoyvGvYGIuIqsEfZFRZmr1r8MP1&sz=w1600', '2026-08-13T07:54:57.900Z', 0, '', 'SYNCED'
    );
INSERT OR REPLACE INTO gemba_gas_records (
      id, status, priority, recorded_date, week, factory, line, team, location,
      type_code, issue_name, title, description, product_code, proposal,
      img_before, video, files, creator_user, creator_name, assignee_user, assignee_name,
      created_at, started_at, result, img_after, completed_at, process_hours, reject_reason, sync_status
    ) VALUES (
      'GB-2026-0006', 'Hoàn thành', 'Medium', '2026-08-13T07:59:52.073Z', 'W33-2026', 'PX May', 'LINE_HTM 1', 'Tổ may 5', '',
      'Khác', 'Khác', 'Kết xuất hàng nhiều màu', 'Thay đổi màu chỉ', '144487w', '',
      'https://drive.google.com/thumbnail?id=1JkhMdg65TTyH4lIIsB4pgg0KZunhSKsv&sz=w1600', '', '', 'Tổ May 5', 'LÊ VĂN CƯỜNG', 'HOÀNG QUỐC NGHỊ', 'HOÀNG QUỐC NGHỊ',
      '2026-08-13T07:59:52.073Z', '2026-08-15T08:03:28.133Z', 'Đã xử lý ok', 'https://drive.google.com/thumbnail?id=1mB4HeUGcbsTTadLXgn4-KpAE9hoV2EoL&sz=w1600', '2026-08-15T08:05:07.574Z', 0, '', 'SYNCED'
    );
INSERT OR REPLACE INTO gemba_gas_records (
      id, status, priority, recorded_date, week, factory, line, team, location,
      type_code, issue_name, title, description, product_code, proposal,
      img_before, video, files, creator_user, creator_name, assignee_user, assignee_name,
      created_at, started_at, result, img_after, completed_at, process_hours, reject_reason, sync_status
    ) VALUES (
      'GB-2026-0007', 'Hoàn thành', 'Medium', '2026-08-13T08:03:18.109Z', 'W33-2026', 'PX May', 'LINE_HTM 1', 'Tổ may 4', '',
      'Khác', 'Khác', 'Chuyển đổi đơn hàng', 'Ảnh hưởng sản lượng', '144225', '',
      'https://drive.google.com/thumbnail?id=1fDv__RvdQ8GxYRVL-748dHx_NE6iPNmi&sz=w1600', '', '', 'Tổ May 4', 'MAI ĐỨC VIỆT', 'HOÀNG QUỐC NGHỊ', 'HOÀNG QUỐC NGHỊ',
      '2026-08-13T08:03:18.109Z', '2026-08-13T08:17:59.109Z', 'Đã xử lý ok', 'https://drive.google.com/thumbnail?id=1JOslBRDgHie36Y20KrUmJQ2-y9uUnze9&sz=w1600', '2026-08-15T07:46:50.615Z', 47.5, '', 'SYNCED'
    );
INSERT OR REPLACE INTO gemba_gas_records (
      id, status, priority, recorded_date, week, factory, line, team, location,
      type_code, issue_name, title, description, product_code, proposal,
      img_before, video, files, creator_user, creator_name, assignee_user, assignee_name,
      created_at, started_at, result, img_after, completed_at, process_hours, reject_reason, sync_status
    ) VALUES (
      'GB-2026-0008', 'Hoàn thành', 'Medium', '2026-08-13T08:08:18.080Z', 'W33-2026', 'PX Gò', 'LINE_HTG 2', 'Tổ công đoạn 1', 'May go got',
      'MMTB', 'Máy móc hư hỏng chưa xử lý', 'May hu', 'May go ko lên', '', 'Sua chua',
      'https://drive.google.com/thumbnail?id=1jj3y2kkr9xCUYXekahq34StFAC95IJap&sz=w1600', '', '', 'Trưởng Line Gò 2', 'TRẦN VĂN TUÂN', 'MMTB  SK MĐ', 'MMTB  SK MĐ',
      '2026-08-13T08:08:18.080Z', '2026-08-13T08:09:01.472Z', 'Do rôle may hu', 'https://drive.google.com/thumbnail?id=1PvDY38CccZz-TpqwiuPyvRc_ppom0a_K&sz=w1600', '2026-08-13T08:10:11.558Z', 0, '', 'SYNCED'
    );
INSERT OR REPLACE INTO gemba_gas_records (
      id, status, priority, recorded_date, week, factory, line, team, location,
      type_code, issue_name, title, description, product_code, proposal,
      img_before, video, files, creator_user, creator_name, assignee_user, assignee_name,
      created_at, started_at, result, img_after, completed_at, process_hours, reject_reason, sync_status
    ) VALUES (
      'GB-2026-0009', 'Hoàn thành', 'Medium', '2026-08-13T08:11:18.504Z', 'W33-2026', 'PX May', 'LINE_HTM 2', 'Tổ may 7', '',
      '7S', 'Sạch sẽ - Săn sóc - Sẵn sàng', 'Ý thức công nhân', 'Nhà xưởng chưa gọn gàng', '', '',
      'https://drive.google.com/thumbnail?id=1MG6mB3I17rIe4lW6GbtFlLBD9EyBiZOn&sz=w1600', '', '', 'Tổ May 7', 'NGUYỄN THỊ LOAN', 'HOÀNG QUỐC NGHỊ', 'HOÀNG QUỐC NGHỊ',
      '2026-08-13T08:11:18.504Z', '2026-08-14T06:45:54.777Z', 'Đã xử lý ok', 'https://drive.google.com/thumbnail?id=1ISgP1fuhUO9JH7GoBPxUGRWWdjDx5dDQ&sz=w1600', '2026-08-15T07:42:04.080Z', 24.9, '', 'SYNCED'
    );
INSERT OR REPLACE INTO gemba_gas_records (
      id, status, priority, recorded_date, week, factory, line, team, location,
      type_code, issue_name, title, description, product_code, proposal,
      img_before, video, files, creator_user, creator_name, assignee_user, assignee_name,
      created_at, started_at, result, img_after, completed_at, process_hours, reject_reason, sync_status
    ) VALUES (
      'GB-2026-0010', 'Hoàn thành', 'Medium', '2026-08-13T08:34:22.088Z', 'W33-2026', 'PX May', 'LINE_HTM 1', 'Tổ may 3', '',
      '7S', 'Sạch sẽ - Săn sóc - Sẵn sàng', 'Vệ sinh nhà xưởng', 'Ý thức công nhân', '', '',
      'https://drive.google.com/thumbnail?id=1BV2fgRfF2oAIfZiTqNL-lFq5rxtEUaD-&sz=w1600', '', '', 'Tổ May 3', 'NGUYỄN THẠCH TRƯỜNG', 'HOÀNG QUỐC NGHỊ', 'HOÀNG QUỐC NGHỊ',
      '2026-08-13T08:34:22.088Z', '2026-08-15T07:53:04.256Z', 'Đã xử lý ok', 'https://drive.google.com/thumbnail?id=1GrmDS3HUkjn1xW7fgvJ7RfLu0UIETw1k&sz=w1600', '2026-08-15T07:58:55.335Z', 0.1, '', 'SYNCED'
    );
INSERT OR REPLACE INTO gemba_gas_records (
      id, status, priority, recorded_date, week, factory, line, team, location,
      type_code, issue_name, title, description, product_code, proposal,
      img_before, video, files, creator_user, creator_name, assignee_user, assignee_name,
      created_at, started_at, result, img_after, completed_at, process_hours, reject_reason, sync_status
    ) VALUES (
      'GB-2026-0011', 'Hoàn thành', 'Medium', '2026-08-13T09:07:01.337Z', 'W33-2026', 'PX Đầu vào', 'LINE CHẶT 1', 'Cắt', 'Chặt máy số 2',
      'Chất lượng', 'Chất lượng sản phẩm', 'Mẫu 144487 VT bị lỗi sợi, lỏng chỉ và đút chỉ', 'VT nhập về kém chất lượng bị lỏng chỉ, đứt chỉ nên phải kiểm tra né tránh khí đạt dao chặt.', '144487', '',
      'https://drive.google.com/thumbnail?id=1hxAmfWac0CFnlb9OOFChrUpsayuQ9jrs&sz=w1600|https://drive.google.com/thumbnail?id=1u4EqfT-ABpOKcRC6u_pm45xPl9eDhABr&sz=w1600', '', '', 'Tổ Cắt', 'LĂNG VĂN QUẾ', 'Tổ Cắt', 'LĂNG VĂN QUẾ',
      '2026-08-13T09:07:01.337Z', '2026-08-14T03:19:09.916Z', 'Kiểm tra đánh dấu,khi chặt đạt dao né tránh lỗi đã đc đánh dấu', 'https://drive.google.com/thumbnail?id=1vrS-DIgn7GMz4U5ulQjVPj7cy4dk8ajP&sz=w1600', '2026-08-14T08:04:34.829Z', 4.8, '', 'SYNCED'
    );
INSERT OR REPLACE INTO gemba_gas_records (
      id, status, priority, recorded_date, week, factory, line, team, location,
      type_code, issue_name, title, description, product_code, proposal,
      img_before, video, files, creator_user, creator_name, assignee_user, assignee_name,
      created_at, started_at, result, img_after, completed_at, process_hours, reject_reason, sync_status
    ) VALUES (
      'GB-2026-0012', 'Hoàn thành', 'Medium', '2026-08-14T02:07:47.246Z', 'W33-2026', 'PX Đầu vào', 'LINE IN ÉP 1', 'Da lót tẩy', '',
      'MMTB', 'Không bảo dưỡng, bảo trì', 'Máy cắt dây hỏng', 'Không cắt gập được', '', '',
      'https://drive.google.com/thumbnail?id=1_eFD24eA5AsOd1mhbb97-3Sn3C6Hv_KF&sz=w1600', '', '', 'Tổ Da lót tẩy', 'NGUYỄN HOÀI HƯNG', 'ĐH PX Đầu vào', 'TRẦN VĂN HOÁ',
      '2026-08-14T02:07:47.246Z', '2026-08-14T02:48:11.091Z', 'Đã sửa ok', 'https://drive.google.com/thumbnail?id=1h5R-SYWU61WpS0GPrE1O95AKr4l0vtpv&sz=w1600', '2026-08-15T03:06:29.827Z', 24.3, '', 'SYNCED'
    );
INSERT OR REPLACE INTO gemba_gas_records (
      id, status, priority, recorded_date, week, factory, line, team, location,
      type_code, issue_name, title, description, product_code, proposal,
      img_before, video, files, creator_user, creator_name, assignee_user, assignee_name,
      created_at, started_at, result, img_after, completed_at, process_hours, reject_reason, sync_status
    ) VALUES (
      'GB-2026-0013', 'Hoàn thành', 'Medium', '2026-08-14T04:02:06.046Z', 'W33-2026', 'PX May', 'LINE_HTM 1', 'Tổ may 5', '',
      'Chất lượng', 'Chất lượng sản phẩm', 'Long chi gia công ông vong co', 'Long chi gia công ông vong co', '144487', '',
      'https://drive.google.com/thumbnail?id=1B4HxRK0MDfhvbaqcfTS3IOtNqCwmoNKq&sz=w1600', '', '', 'Tổ May 5', 'LÊ VĂN CƯỜNG', 'QLCL PX Đầu vào', 'ĐẶNG THỊ LÀI',
      '2026-08-14T04:02:06.046Z', '2026-08-17T02:45:42.472Z', 'Đã xử lý ok', 'https://drive.google.com/thumbnail?id=18iUFbdP54rgH3oQaE1LieRhcHikqgNbE&sz=w1600', '2026-08-17T02:46:02.704Z', 0, '', 'SYNCED'
    );
INSERT OR REPLACE INTO gemba_gas_records (
      id, status, priority, recorded_date, week, factory, line, team, location,
      type_code, issue_name, title, description, product_code, proposal,
      img_before, video, files, creator_user, creator_name, assignee_user, assignee_name,
      created_at, started_at, result, img_after, completed_at, process_hours, reject_reason, sync_status
    ) VALUES (
      'GB-2026-0014', 'Hoàn thành', 'Medium', '2026-08-15T00:52:16.603Z', 'W33-2026', 'PX May', 'LINE_HTM 1', 'Tổ may 5', '',
      'Chất lượng', 'Chất lượng sản phẩm', 'Long chi ông vong co', 'Long chỉ ông vong co', '144487', '',
      'https://drive.google.com/thumbnail?id=1LH6IwRDnFToALocu_CF2z5Jr5MB-bCnz&sz=w1600', '', '', 'Tổ May 5', 'LÊ VĂN CƯỜNG', 'HOÀNG QUỐC NGHỊ', 'HOÀNG QUỐC NGHỊ',
      '2026-08-15T00:52:16.603Z', '2026-08-17T02:46:30.008Z', 'ĐÃ XỬ LÝ OK', 'https://drive.google.com/thumbnail?id=11-pVALtiWgd4u3jhHdG12HzisdrlD7F3&sz=w1600', '2026-08-17T02:46:50.259Z', 0, '', 'SYNCED'
    );
INSERT OR REPLACE INTO gemba_gas_records (
      id, status, priority, recorded_date, week, factory, line, team, location,
      type_code, issue_name, title, description, product_code, proposal,
      img_before, video, files, creator_user, creator_name, assignee_user, assignee_name,
      created_at, started_at, result, img_after, completed_at, process_hours, reject_reason, sync_status
    ) VALUES (
      'GB-2026-0015', 'Hoàn thành', 'High', '2026-08-15T01:33:35.947Z', 'W33-2026', 'PX May', 'LINE_HTM 1', 'Tổ may 2', '',
      'Khác', 'Khác', 'Nghiên cứu may lập trình tt cổ thân', 'Cải thiện nhăn cổ giày', 'Sn144238', '',
      'https://drive.google.com/thumbnail?id=1ApZ1l_5PcoPj4QMK_7WtLZwNJp9ZSz7k&sz=w1600', '', '', 'Tổ May 2', 'HỒ KHẮC NGHĨA', 'ĐH PX May', 'HOÀNG QUỐC NGHỊ',
      '2026-08-15T01:33:35.947Z', '2026-08-16T02:43:02.570Z', 'Đã xử lý ok', 'https://drive.google.com/thumbnail?id=1g9opJdP-6zeu42e_yyB6ep8ae6tzurha&sz=w1600', '2026-08-17T02:45:05.094Z', 24, '', 'SYNCED'
    );
INSERT OR REPLACE INTO gemba_gas_records (
      id, status, priority, recorded_date, week, factory, line, team, location,
      type_code, issue_name, title, description, product_code, proposal,
      img_before, video, files, creator_user, creator_name, assignee_user, assignee_name,
      created_at, started_at, result, img_after, completed_at, process_hours, reject_reason, sync_status
    ) VALUES (
      'GB-2026-0016', 'Hoàn thành', 'Medium', '2026-08-18T02:13:37.955Z', 'W34-2026', 'PX Đầu vào', 'LINE CHẶT 1', 'Lạng-cán dán-đồng bộ', 'Máy ép pho mũi',
      'Chất lượng', 'Chất lượng sản phẩm', 'Ép pho mũi hằn ngấn lên vt', 'ít kg ảnh hưởng sx', '', '',
      'https://drive.google.com/thumbnail?id=1T7sIoxdnq_IEd20wj--AQcaMfVCe8LHT&sz=w1600', '', '', 'Tổ Lạng-Cán dán&Đồng bộ', 'NGUYỄN THỊ LOA', 'Tổ Lạng-Cán dán&Đồng bộ', 'NGUYỄN THỊ LOA',
      '2026-08-18T02:13:37.955Z', '2026-08-18T02:18:32.265Z', 'Lót giấy bóng lên pho mũi ép lại .', 'https://drive.google.com/thumbnail?id=1lKHXtZW0ptrufNb5cBJhj6KPkgvo5PET&sz=w1600|https://drive.google.com/thumbnail?id=1zEuQFtvKm_c3Jd8gGE6iJRhhTCQHJRmn&sz=w1600|https://drive.google.com/thumbnail?id=1HEcCnQfpBbZBxwrJy3HZfOHBG6zFmGry&sz=w1600', '2026-08-18T09:07:15.342Z', 6.8, '', 'SYNCED'
    );
INSERT OR REPLACE INTO gemba_gas_records (
      id, status, priority, recorded_date, week, factory, line, team, location,
      type_code, issue_name, title, description, product_code, proposal,
      img_before, video, files, creator_user, creator_name, assignee_user, assignee_name,
      created_at, started_at, result, img_after, completed_at, process_hours, reject_reason, sync_status
    ) VALUES (
      'GB-2026-0017', 'Hoàn thành', 'Critical', '2026-08-18T03:09:14.659Z', 'W34-2026', 'PX Đầu vào', 'LINE CHẶT 1', 'Cắt', 'Vị trí Máy chặt số 18',
      'Chất lượng', 'Chất lượng sản phẩm', 'Lỗ đinh định vị Dao không khớp với rập', 'Tk mẫu mới khi kiểm tra ccdc dao không khớp với rập ,', 'Mẫu giày 118433', '',
      'https://drive.google.com/thumbnail?id=1Ox8xMnvNwD997_iu-MnnnFq1NquKHxsS&sz=w1600', '', '', 'Tổ Cắt', 'LĂNG VĂN QUẾ', 'CN - CI SK MĐ', 'CN - CI SK MĐ',
      '2026-08-18T03:09:14.659Z', '2026-08-18T03:18:03.619Z', 'Đã xlok', 'https://drive.google.com/thumbnail?id=1W7x2ql1rqQcCxlfQCW7XdxvYMy4Yn6jW&sz=w1600', '2026-08-20T02:31:54.589Z', 47.2, '', 'SYNCED'
    );
INSERT OR REPLACE INTO gemba_gas_records (
      id, status, priority, recorded_date, week, factory, line, team, location,
      type_code, issue_name, title, description, product_code, proposal,
      img_before, video, files, creator_user, creator_name, assignee_user, assignee_name,
      created_at, started_at, result, img_after, completed_at, process_hours, reject_reason, sync_status
    ) VALUES (
      'GB-2026-0018', 'Hoàn thành', 'Medium', '2026-08-18T06:37:40.636Z', 'W34-2026', 'PX Đầu vào', 'LINE IN ÉP 1', 'Da lót tẩy', '',
      'Khác', 'Khác', 'Không có dao chặt rập 138651', 'Không có dao', '', '',
      'https://drive.google.com/thumbnail?id=1QHdvhc8ZrVrgRbXTeRoRHj73oAqPMtxb&sz=w1600', '', '', 'Tổ Da lót tẩy', 'NGUYỄN HOÀI HƯNG', 'CN - CI SK MĐ', 'CN - CI SK MĐ',
      '2026-08-18T06:37:40.636Z', '2026-08-20T02:25:18.094Z', 'Đã xử lý ok', 'https://drive.google.com/thumbnail?id=1_C35v95-uDlcz-4nVreP6QdEEDchlYUo&sz=w1600', '2026-08-20T02:25:44.916Z', 0, '', 'SYNCED'
    );
INSERT OR REPLACE INTO gemba_gas_records (
      id, status, priority, recorded_date, week, factory, line, team, location,
      type_code, issue_name, title, description, product_code, proposal,
      img_before, video, files, creator_user, creator_name, assignee_user, assignee_name,
      created_at, started_at, result, img_after, completed_at, process_hours, reject_reason, sync_status
    ) VALUES (
      'GB-2026-0019', 'Hoàn thành', 'Medium', '2026-08-20T02:52:51.041Z', 'W34-2026', 'PX Gò', 'LINE_HTG 1', 'Tổ công đoạn 3', 'May lanh hư',
      'MMTB', 'Máy móc hư hỏng chưa xử lý', 'May hư', 'May ko đat', '', 'Bao tri sửa',
      'https://drive.google.com/thumbnail?id=1xKTmZLICfb830AN7hqRPfyVI0PgGQnh0&sz=w1600', '', '', 'QLCL Line Gò 1', 'QLCL Line Gò 1', 'GĐ NM  MĐ', 'GĐ NM  MĐ',
      '2026-08-20T02:52:51.041Z', '', 'Da sửa xong', 'https://drive.google.com/thumbnail?id=11dzKlrGVC-CREMp6X9JMpExqbxCvPqKW&sz=w1600', '2026-08-28T06:31:54.760Z', 195.7, '', 'SYNCED'
    );
INSERT OR REPLACE INTO gemba_gas_records (
      id, status, priority, recorded_date, week, factory, line, team, location,
      type_code, issue_name, title, description, product_code, proposal,
      img_before, video, files, creator_user, creator_name, assignee_user, assignee_name,
      created_at, started_at, result, img_after, completed_at, process_hours, reject_reason, sync_status
    ) VALUES (
      'GB-2026-0020', 'Hoàn thành', 'Medium', '2026-08-20T08:12:29.432Z', 'W34-2026', 'PX Gò', 'LINE_HTG 3', 'Tổ công đoạn 2', 'May hơ đế',
      'MMTB', 'Máy móc hư hỏng chưa xử lý', 'May không co nhiệt', 'May không co nhiệt độ', '', 'Cho sua chua',
      'https://drive.google.com/thumbnail?id=1te5LZwDqt60g_UY83WJdEdZ4_rHV-5aW&sz=w1600', '', '', 'Trưởng Line Gò 3', 'TRẦN DUY CHƯƠNG', 'MMTB  SK MĐ', 'MMTB  SK MĐ',
      '2026-08-20T08:12:29.432Z', '', 'Da sua xong', 'https://drive.google.com/thumbnail?id=1clgFESnxBky2vIo2W6jfb7lP_1We0sDe&sz=w1600', '2026-08-28T04:49:37.887Z', 188.6, '', 'SYNCED'
    );
INSERT OR REPLACE INTO gemba_gas_records (
      id, status, priority, recorded_date, week, factory, line, team, location,
      type_code, issue_name, title, description, product_code, proposal,
      img_before, video, files, creator_user, creator_name, assignee_user, assignee_name,
      created_at, started_at, result, img_after, completed_at, process_hours, reject_reason, sync_status
    ) VALUES (
      'GB-2026-0021', 'Hoàn thành', 'Medium', '2026-08-29T04:05:02.605Z', 'W35-2026', 'PX May', 'LINE_HTM 1', 'Tổ may 5', '',
      'Chất lượng', 'Chất lượng sản phẩm', 'Long chi vật tư ông vong co', 'Long chi ông vong co', '144487', '',
      'https://drive.google.com/thumbnail?id=1UVC3QHuMNCe5eFgoacEGBQ30_L37I4sZ&sz=w1600', '', '', 'Tổ May 5', 'LÊ VĂN CƯỜNG', 'HOÀNG QUỐC NGHỊ', 'HOÀNG QUỐC NGHỊ',
      '2026-08-29T04:05:02.605Z', '2026-08-31T06:59:21.167Z', 'Kiểm tra BTP sau chặt - qoét keo mặt trái BTP- khâu tay số lượng ko đạt CL ( nhà cung cấp trả chi phí)', 'https://drive.google.com/thumbnail?id=1AxrlngtUlhFvpEpYqg_Rt1Y6Fn8P_Gc6&sz=w1600', '2026-08-31T08:01:15.363Z', 1, '', 'SYNCED'
    );
INSERT OR REPLACE INTO gemba_gas_records (
      id, status, priority, recorded_date, week, factory, line, team, location,
      type_code, issue_name, title, description, product_code, proposal,
      img_before, video, files, creator_user, creator_name, assignee_user, assignee_name,
      created_at, started_at, result, img_after, completed_at, process_hours, reject_reason, sync_status
    ) VALUES (
      'GB-2026-0022', 'Hoàn thành', 'Medium', '2026-08-31T01:05:29.181Z', 'W36-2026', 'PX Đầu vào', 'LINE IN ÉP 1', 'In-ép', '',
      'MMTB', 'Máy móc hư hỏng chưa xử lý', 'Máy ép cao tần (ép không lên điện)', 'Không sx được', '', '',
      'https://drive.google.com/thumbnail?id=12oQzy63WaN1AYUfI_q_OEhZGMX1IcunI&sz=w1600', '', '', 'Tổ In-ép', 'NGUYỄN HOÀI HƯNG', 'MMTB  SK MĐ', 'MMTB  SK MĐ',
      '2026-08-31T01:05:29.181Z', '2026-08-31T07:03:58.476Z', 'Đã sửa ok', 'https://drive.google.com/thumbnail?id=1vt4pAP7VZY0jD7ww3WbXHG1VdLH8SSR-&sz=w1600', '2026-09-07T08:32:32.032Z', 169.5, '', 'SYNCED'
    );
INSERT OR REPLACE INTO gemba_gas_records (
      id, status, priority, recorded_date, week, factory, line, team, location,
      type_code, issue_name, title, description, product_code, proposal,
      img_before, video, files, creator_user, creator_name, assignee_user, assignee_name,
      created_at, started_at, result, img_after, completed_at, process_hours, reject_reason, sync_status
    ) VALUES (
      'GB-2026-0023', 'Hoàn thành', 'High', '2026-08-31T06:16:03.163Z', 'W36-2026', 'PX Gò', 'LINE_HTG 3', 'Tổ công đoạn 2', 'Bang chuyen cd2',
      'MMTB', 'Máy móc hư hỏng chưa xử lý', 'Hu bang chuyen', 'Bang chuyen tha giay bi hu', '', 'Sua chưa lai',
      'https://drive.google.com/thumbnail?id=1SiMGj5UHMb3wblA2y1oQd8Vz8E_2nr7F&sz=w1600|https://drive.google.com/thumbnail?id=11p0zmnECI_XKk31aaQGTO8L-T-7P__RA&sz=w1600|https://drive.google.com/thumbnail?id=19834kKYgARHC9LkFdKVmSNUEPbWJMZsJ&sz=w1600|https://drive.google.com/thumbnail?id=1pQvO34PtgaM3Otml-Tmi3OW--0TSje-P&sz=w1600', '', '', 'Trưởng Line Gò 3', 'TRẦN DUY CHƯƠNG', 'MMTB  SK MĐ', 'MMTB  SK MĐ',
      '2026-08-31T06:16:03.163Z', '2026-08-31T07:20:05.086Z', 'Da sua chua', 'https://drive.google.com/thumbnail?id=1drQo4aI2uAOejBhLB69j88_mQYF4HXNM&sz=w1600', '2026-08-31T07:21:10.775Z', 0, '', 'SYNCED'
    );
INSERT OR REPLACE INTO gemba_gas_records (
      id, status, priority, recorded_date, week, factory, line, team, location,
      type_code, issue_name, title, description, product_code, proposal,
      img_before, video, files, creator_user, creator_name, assignee_user, assignee_name,
      created_at, started_at, result, img_after, completed_at, process_hours, reject_reason, sync_status
    ) VALUES (
      'GB-2026-0024', 'Hoàn thành', 'High', '2026-09-04T05:45:42.365Z', 'W36-2026', 'PX Đầu vào', 'LINE CHẶT 1', 'Cắt', 'Máy số 4 cắt laze ',
      'MMTB', 'Máy móc hư hỏng chưa xử lý', 'Máy laze 1 dao không có lửa', 'Bật máy khởi động cắt ,1 dao hoạt động không có tia lửa', '', '',
      'https://drive.google.com/thumbnail?id=1TrA7DjyqvhZlW7EmKCM8Pficz26N7WJ7&sz=w1600', '', '', 'Tổ Cắt', 'LĂNG VĂN QUẾ', 'MMTB  SK MĐ', 'MMTB  SK MĐ',
      '2026-09-04T05:45:42.365Z', '2026-09-04T11:14:06.950Z', 'Đã sửa ok', 'https://drive.google.com/thumbnail?id=1Xgj2xNwxPhUy5noNIyjQGMa3Jci2CzF6&sz=w1600', '2026-09-04T11:17:35.358Z', 0.1, '', 'SYNCED'
    );
INSERT OR REPLACE INTO gemba_gas_records (
      id, status, priority, recorded_date, week, factory, line, team, location,
      type_code, issue_name, title, description, product_code, proposal,
      img_before, video, files, creator_user, creator_name, assignee_user, assignee_name,
      created_at, started_at, result, img_after, completed_at, process_hours, reject_reason, sync_status
    ) VALUES (
      'GB-2026-0025', 'Hoàn thành', 'Critical', '2026-09-11T02:33:10.143Z', 'W37-2026', 'PX Đầu vào', 'LINE CHẶT 1', 'Cắt', 'Dao chặt Thiếu đinh ô dê ',
      'Khác', 'Khác', 'Dao thiếu đinh ô dê', 'Dao thiếu đinh ô dê không đưa vào sx được', '233459w', 'Sửa khoan thêm lỗ đinh giống rập',
      'https://drive.google.com/thumbnail?id=1HK6ECLQHebgExsFgpistv-fnYP9QQssr&sz=w1600', '', '', 'Tổ Cắt', 'LĂNG VĂN QUẾ', 'CN - CI SK MĐ', 'CN - CI SK MĐ',
      '2026-09-11T02:33:10.143Z', '', 'Đã sửa gắn đinh đúng rập', 'https://drive.google.com/thumbnail?id=1dmUfQNyJ2ACGlNqTIqF1C_cT8YmShrnX&sz=w1600', '2026-09-15T03:18:03.600Z', 96.7, '', 'SYNCED'
    );
INSERT OR REPLACE INTO gemba_gas_records (
      id, status, priority, recorded_date, week, factory, line, team, location,
      type_code, issue_name, title, description, product_code, proposal,
      img_before, video, files, creator_user, creator_name, assignee_user, assignee_name,
      created_at, started_at, result, img_after, completed_at, process_hours, reject_reason, sync_status
    ) VALUES (
      'GB-2026-0026', 'Hoàn thành', 'Medium', '2026-09-15T01:36:11.695Z', 'W38-2026', 'PX Đầu vào', 'LINE IN ÉP 1', 'In-ép', '',
      'MMTB', 'Máy móc hư hỏng chưa xử lý', 'Dây điện máy sấy thả dưới nền nhà', 'Đã báo bảo trì nhưng chưa đc sửa', '', '',
      'https://drive.google.com/thumbnail?id=1JPRBnNM5auzvSa2Xh7yE3a4UJ2hNJTHT&sz=w1600|https://drive.google.com/thumbnail?id=1-nIhtKhP0y5ue9nNotGtA5ZEFKQh_5tn&sz=w1600', '', '', 'Tổ Cắt', 'LĂNG VĂN QUẾ', 'TRẦN VĂN HOÁ', 'TRẦN VĂN HOÁ',
      '2026-09-15T01:36:11.695Z', '', 'Đã khắc phục', 'https://drive.google.com/thumbnail?id=1a8iU9tgAuu_JBlaQHnzz2-3e5RKuApGx&sz=w1600', '2026-09-25T08:57:35.134Z', 247.4, '', 'SYNCED'
    );
INSERT OR REPLACE INTO gemba_gas_records (
      id, status, priority, recorded_date, week, factory, line, team, location,
      type_code, issue_name, title, description, product_code, proposal,
      img_before, video, files, creator_user, creator_name, assignee_user, assignee_name,
      created_at, started_at, result, img_after, completed_at, process_hours, reject_reason, sync_status
    ) VALUES (
      'GB-2026-0027', 'Hoàn thành', 'High', '2026-09-15T03:31:38.659Z', 'W38-2026', 'PX May', 'LINE_HTM 2', 'Tổ may 7', 'Máy đục lỗ oze ',
      'MMTB', 'Máy móc hư hỏng chưa xử lý', 'Máy không sử dụng được', 'Không đáp ứng sản lượng Theo giờ', 'GR', 'Sửa chữa thay thế',
      'https://drive.google.com/thumbnail?id=1N5GfX-8I5aBYhjqAIdR_mNen7QBD5DnB&sz=w1600', '', '', 'Tổ May 7', 'NGUYỄN THỊ LOAN', 'MMTB  SK MĐ', 'MMTB  SK MĐ',
      '2026-09-15T03:31:38.659Z', '2026-09-17T03:46:44.116Z', 'ĐÃ XỬ LÝ OK', 'https://drive.google.com/thumbnail?id=1x6kouytd-F98hgbHbGpleIfagLhYffTm&sz=w1600', '2026-09-17T03:48:57.831Z', 0, '', 'SYNCED'
    );
INSERT OR REPLACE INTO gemba_gas_records (
      id, status, priority, recorded_date, week, factory, line, team, location,
      type_code, issue_name, title, description, product_code, proposal,
      img_before, video, files, creator_user, creator_name, assignee_user, assignee_name,
      created_at, started_at, result, img_after, completed_at, process_hours, reject_reason, sync_status
    ) VALUES (
      'GB-2026-0028', 'Hoàn thành', 'High', '2026-09-16T08:12:22.194Z', 'W38-2026', 'PX Gò', 'LINE_HTG 3', 'Tổ công đoạn 2', 'Thùng Mai ',
      'MMTB', 'Máy móc hư hỏng chưa xử lý', 'May hu', 'May hu', '', 'Sua chua',
      'https://drive.google.com/thumbnail?id=1jryvN3xVWDqUSwF8lBYi-p7IFVt580P1&sz=w1600', '', '', 'Trưởng Line Gò 3', 'TRẦN DUY CHƯƠNG', 'MMTB  SK MĐ', 'MMTB  SK MĐ',
      '2026-09-16T08:12:22.194Z', '2026-09-17T03:37:45.760Z', 'Da sua', 'https://drive.google.com/thumbnail?id=14mGc0cktTFmm1B8f0V52KOneWsRIeH0P&sz=w1600', '2026-09-17T03:38:15.734Z', 0, '', 'SYNCED'
    );
INSERT OR REPLACE INTO gemba_gas_records (
      id, status, priority, recorded_date, week, factory, line, team, location,
      type_code, issue_name, title, description, product_code, proposal,
      img_before, video, files, creator_user, creator_name, assignee_user, assignee_name,
      created_at, started_at, result, img_after, completed_at, process_hours, reject_reason, sync_status
    ) VALUES (
      'GB-2026-0029', 'Hoàn thành', 'Medium', '2026-09-17T12:40:35.539Z', 'W38-2026', 'PX May', 'LINE_HTM 1', 'Tổ may 5', '',
      'MMTB', 'Máy móc hư hỏng chưa xử lý', 'Máy tán hat bị hư bay hạt bày Long den', 'Máy tán hat hư', '211146', '',
      'https://drive.google.com/thumbnail?id=1AHNMh6zYhQgak5K7fsTjs1gRArMtWNs7&sz=w1600|https://drive.google.com/thumbnail?id=1AKenKy9uJfg7p2ZaSoxz8nuNm5Wgf3H0&sz=w1600', '', '', 'Tổ May 5', 'LÊ VĂN CƯỜNG', 'HOÀNG QUỐC NGHỊ', 'HOÀNG QUỐC NGHỊ',
      '2026-09-17T12:40:35.539Z', '2026-09-19T00:28:47.912Z', 'Đã xử lý ok', 'https://drive.google.com/thumbnail?id=1hd6uKyHa9lT2Kl2OHcb7VjbCSPBpDrk7&sz=w1600', '2026-09-19T00:29:24.022Z', 0, '', 'SYNCED'
    );
INSERT OR REPLACE INTO gemba_gas_records (
      id, status, priority, recorded_date, week, factory, line, team, location,
      type_code, issue_name, title, description, product_code, proposal,
      img_before, video, files, creator_user, creator_name, assignee_user, assignee_name,
      created_at, started_at, result, img_after, completed_at, process_hours, reject_reason, sync_status
    ) VALUES (
      'GB-2026-0033', 'Hoàn thành', 'Medium', '2026-09-23T06:57:57.883Z', 'W39-2026', 'PX Gò', 'LINE_HTG 1', 'Tổ công đoạn 2', 'Máy gò CĐ2',
      '7S', 'Sạch sẽ - Săn sóc - Sẵn sàng', 'Đồ cá nhân trên nóc máy', 'Dơ', '', 'Dọn dẹp',
      'https://drive.google.com/thumbnail?id=1cfHIHMqgNfqUKbfWurxiTnlb077SA34e&sz=w1600', '', '', 'CN - CI SK MĐ', 'CN - CI SK MĐ', 'LÊ VĂN THUỶ', 'LÊ VĂN THUỶ',
      '2026-09-23T06:57:57.883Z', '2026-09-24T01:59:29.224Z', 'đã xử lý', 'https://drive.google.com/thumbnail?id=1nd0H9uaTw4JnYIVAdEnppiDX5xhHaNfQ&sz=w1600', '2026-09-24T02:03:43.971Z', 0.1, '', 'SYNCED'
    );
INSERT OR REPLACE INTO gemba_gas_records (
      id, status, priority, recorded_date, week, factory, line, team, location,
      type_code, issue_name, title, description, product_code, proposal,
      img_before, video, files, creator_user, creator_name, assignee_user, assignee_name,
      created_at, started_at, result, img_after, completed_at, process_hours, reject_reason, sync_status
    ) VALUES (
      'GB-2026-0035', 'Hoàn thành', 'Medium', '2026-09-28T05:09:20.263Z', 'W40-2026', 'PX May', 'LINE_HTM 1', 'Tổ may 3', '',
      '7S', 'Sạch sẽ - Săn sóc - Sẵn sàng', 'Máy may 1k tổ 3 không dọn chỉ thừa', 'Máy may 1k tổ 3 không dọn chỉ thừa', '', '',
      'https://drive.google.com/thumbnail?id=1732F2UC8-yoBPOHQSdnVirslYnnxgsmV&sz=w1600', '', '', 'CN- CI Chuỗi', 'CN- CI Chuỗi', 'HOÀNG QUỐC NGHỊ', 'HOÀNG QUỐC NGHỊ',
      '2026-09-28T05:09:20.263Z', '2026-09-28T13:23:06.807Z', 'CN  may lót chưa cắt từng chiếc .Hướng dẫn, yêu cẩu công nhân tuân thủ may tới đâu cắt tới đó', 'https://drive.google.com/thumbnail?id=1ihXVdBCT0xeWHDHwBnoCWDHfwR-_aHMQ&sz=w1600', '2026-09-28T13:26:42.537Z', 0.1, '', 'SYNCED'
    );
INSERT OR REPLACE INTO gemba_gas_records (
      id, status, priority, recorded_date, week, factory, line, team, location,
      type_code, issue_name, title, description, product_code, proposal,
      img_before, video, files, creator_user, creator_name, assignee_user, assignee_name,
      created_at, started_at, result, img_after, completed_at, process_hours, reject_reason, sync_status
    ) VALUES (
      'GB-2026-0040', 'Hoàn thành', 'Medium', '2026-09-30T10:55:10.625Z', 'W40-2026', 'PX May', 'LINE_HTM 1', 'Tổ may 5', '',
      'MMTB', 'Máy móc hư hỏng chưa xử lý', 'May viền zz ba chân go hư', 'Máy viền Zz ba chân go hư', '139459', '',
      'https://drive.google.com/thumbnail?id=14Al5Sr1M8o5pQbm97y68ezJ-98G6U02P&sz=w1600', '', '', 'Tổ May 5', 'LÊ VĂN CƯỜNG', 'MMTB  SK MĐ', 'CÔNG HOÀNG CHIẾN',
      '2026-09-30T10:55:10.625Z', '', 'Đã Xử lý ok', 'https://drive.google.com/thumbnail?id=1SWABq8tbKO38GSD3428vWoEuzKr7zdul&sz=w1600', '2026-10-01T08:21:35.668Z', 21.4, '', 'SYNCED'
    );
INSERT OR REPLACE INTO gemba_gas_records (
      id, status, priority, recorded_date, week, factory, line, team, location,
      type_code, issue_name, title, description, product_code, proposal,
      img_before, video, files, creator_user, creator_name, assignee_user, assignee_name,
      created_at, started_at, result, img_after, completed_at, process_hours, reject_reason, sync_status
    ) VALUES (
      'GB-2026-0041', 'Hoàn thành', 'Medium', '2026-10-01T07:18:40.905Z', 'W40-2026', 'PX Gò', 'LINE_HTG 1', 'Tổ công đoạn 2', '',
      '7S', 'Sạch sẽ - Săn sóc - Sẵn sàng', 'Dụng cụ vệ sinh, đồ dùng cá nhân để không đúng nơi quy định', 'Dụng cụ vệ sinh không để đúng nơi.
Trên thùng máy sấy để đồ dùng cá nhân.', '', 'Dọn dẹp, Vệ sinh khu vực làm việc',
      'https://drive.google.com/thumbnail?id=1Z4t7Kl8Cs-zEAIB7rOBFREqEy19Lz-w9&sz=w1600|https://drive.google.com/thumbnail?id=1-9L2OcXjnAuZpy0slFM6vondb4woIrL9&sz=w1600', '', '', 'Admin', 'Admin', 'LÊ VĂN THUỶ', 'LÊ VĂN THUỶ',
      '2026-10-01T07:18:40.905Z', '2026-10-01T08:22:29.369Z', 'CN chưa để đúng vị trí , vệ sinh 7S chưa gọn gàng', 'https://drive.google.com/thumbnail?id=1x42rrCAyhWDfG45hdNl6tYa8WxwPxi5Z&sz=w1600|https://drive.google.com/thumbnail?id=1qnpzebO-5cokUMYxZytbtwpQ0mDnQ0Fx&sz=w1600', '2026-10-01T08:23:39.230Z', 0, '', 'SYNCED'
    );
INSERT OR REPLACE INTO gemba_gas_records (
      id, status, priority, recorded_date, week, factory, line, team, location,
      type_code, issue_name, title, description, product_code, proposal,
      img_before, video, files, creator_user, creator_name, assignee_user, assignee_name,
      created_at, started_at, result, img_after, completed_at, process_hours, reject_reason, sync_status
    ) VALUES (
      'GB-2026-0042', 'Hoàn thành', 'Critical', '2026-10-10T06:46:39.599Z', 'W41-2026', 'PX Đầu vào', 'LINE IN ÉP 1', 'Da lót tẩy', '',
      'MMTB', 'Máy móc hư hỏng chưa xử lý', 'Lỗi phần mềm', 'Không vào phần mềm để sx được', '', '',
      'https://drive.google.com/thumbnail?id=1W_agHHudSMxYcSdfhshodlU9jjhGFp-0&sz=w1600', '', '', 'Tổ Da lót tẩy', 'NGUYỄN HOÀI HƯNG', 'MMTB  SK MĐ', 'CÔNG HOÀNG CHIẾN',
      '2026-10-10T06:46:39.599Z', '2026-10-10T09:08:10.527Z', 'Đã sửa ok', 'https://drive.google.com/thumbnail?id=1zszlbf2fKu1ON117J58hG19KvMLruCKy&sz=w1600', '2026-10-10T09:08:44.707Z', 0, '', 'SYNCED'
    );
INSERT OR REPLACE INTO gemba_gas_records (
      id, status, priority, recorded_date, week, factory, line, team, location,
      type_code, issue_name, title, description, product_code, proposal,
      img_before, video, files, creator_user, creator_name, assignee_user, assignee_name,
      created_at, started_at, result, img_after, completed_at, process_hours, reject_reason, sync_status
    ) VALUES (
      'GB-2026-0043', 'Hoàn thành', 'Medium', '2026-10-13T08:25:58.267Z', 'W42-2026', 'PX Đầu vào', 'LINE CHẶT 1', 'Cắt', 'Máy Tính hư bị  lỗi- không chuyển file SX được ',
      'MMTB', 'Máy móc hư hỏng chưa xử lý', 'Máy tính bị lỗi không chuyển file cho máy cắt được.', 'Phần mềm bị lỗi không mở filel đc', '', '',
      'https://drive.google.com/thumbnail?id=1PugULzzoMeZQkovuJoaS35I6HFlGjgdn&sz=w1600', '', '', 'Tổ Cắt', 'LĂNG VĂN QUẾ', 'MMTB  SK MĐ', 'CÔNG HOÀNG CHIẾN',
      '2026-10-13T08:25:58.267Z', '2026-10-17T08:16:45.513Z', 'Đã sửa xong lỗi phần mềm', 'https://drive.google.com/thumbnail?id=1VbL3YHEAAS8RGrUwrPl7TPMxpYF-CD09&sz=w1600', '2026-10-17T08:19:20.914Z', 0, '', 'SYNCED'
    );
INSERT OR REPLACE INTO gemba_gas_records (
      id, status, priority, recorded_date, week, factory, line, team, location,
      type_code, issue_name, title, description, product_code, proposal,
      img_before, video, files, creator_user, creator_name, assignee_user, assignee_name,
      created_at, started_at, result, img_after, completed_at, process_hours, reject_reason, sync_status
    ) VALUES (
      'GB-2026-0044', 'Hoàn thành', 'High', '2026-10-14T06:47:19.064Z', 'W42-2026', 'PX Gò', 'LINE_HTG 3', 'Tổ công đoạn 3', 'Thùng lạnh',
      'MMTB', 'Máy móc hư hỏng chưa xử lý', 'Lệch bang tai', 'Bang tai may lanh bi lệch không chạy được', '', 'Sua chua',
      'https://drive.google.com/thumbnail?id=1x5yUThoUj-YohLnQVFNw80Nj5fqzXJRN&sz=w1600|https://drive.google.com/thumbnail?id=1D2eM6rs9lxL7CGo2290NwQJju9BVM30C&sz=w1600', '', '', 'Trưởng Line Gò 3', 'TRẦN DUY CHƯƠNG', 'MMTB  SK MĐ', 'CÔNG HOÀNG CHIẾN',
      '2026-10-14T06:47:19.064Z', '2026-10-15T03:04:31.960Z', 'Da sua xong', 'https://drive.google.com/thumbnail?id=11UeodjyW3iLp0P8P0XG4FTjuqOAkO4Jb&sz=w1600', '2026-10-15T03:05:12.536Z', 0, '', 'SYNCED'
    );
INSERT OR REPLACE INTO gemba_gas_records (
      id, status, priority, recorded_date, week, factory, line, team, location,
      type_code, issue_name, title, description, product_code, proposal,
      img_before, video, files, creator_user, creator_name, assignee_user, assignee_name,
      created_at, started_at, result, img_after, completed_at, process_hours, reject_reason, sync_status
    ) VALUES (
      'GB-2026-0045', 'Hoàn thành', 'Medium', '2026-10-15T06:35:14.235Z', 'W42-2026', 'PX May', 'LINE_HTM 2', 'Tổ may 6', '',
      'Chất lượng', 'Chất lượng sản phẩm', 'ĐH CR 1917019 LỖI VT', 'ĐH CR VT HƯ CHUYỂN SANG MAY', '', '',
      'https://drive.google.com/thumbnail?id=1doO44n7SJ7zGEJ-lt7N6vkbegRDwYq3q&sz=w1600', '', '', 'ĐH PX May', 'HOÀNG QUỐC NGHỊ', 'HOÀNG QUỐC NGHỊ', 'HOÀNG QUỐC NGHỊ',
      '2026-10-15T06:35:14.235Z', '', 'LẬP BIÊN BẢN TRẢ TỔNG KHO', 'https://drive.google.com/thumbnail?id=1Xl7SnEpy-NXnkmcXeODNiBnWJm-iOPXG&sz=w1600', '2026-10-15T08:37:12.939Z', 2, '', 'SYNCED'
    );
INSERT OR REPLACE INTO gemba_gas_records (
      id, status, priority, recorded_date, week, factory, line, team, location,
      type_code, issue_name, title, description, product_code, proposal,
      img_before, video, files, creator_user, creator_name, assignee_user, assignee_name,
      created_at, started_at, result, img_after, completed_at, process_hours, reject_reason, sync_status
    ) VALUES (
      'GB-2026-0046', 'Hoàn thành', 'High', '2026-10-17T02:53:40.210Z', 'W42-2026', 'PX Gò', 'LINE_HTG 3', 'Tổ công đoạn 3', 'May lạnh ',
      'MMTB', 'Máy móc hư hỏng chưa xử lý', 'May không lạnh', 'May khong du nhiệt do lạnh', '', 'Sua chua',
      'https://drive.google.com/thumbnail?id=1tdJLHUYUrev0d2vNg5EY8_Ea8jkqFgs0&sz=w1600', '', '', 'Trưởng Line Gò 3', 'TRẦN DUY CHƯƠNG', 'MMTB  SK MĐ', 'CÔNG HOÀNG CHIẾN',
      '2026-10-17T02:53:40.210Z', '2026-10-17T09:49:59.893Z', 'Da sua', 'https://drive.google.com/thumbnail?id=1wx8JJh_2L0Xkarv_s5LAU1glp0I8hxRT&sz=w1600', '2026-10-17T09:50:24.383Z', 0, '', 'SYNCED'
    );
INSERT OR REPLACE INTO gemba_gas_records (
      id, status, priority, recorded_date, week, factory, line, team, location,
      type_code, issue_name, title, description, product_code, proposal,
      img_before, video, files, creator_user, creator_name, assignee_user, assignee_name,
      created_at, started_at, result, img_after, completed_at, process_hours, reject_reason, sync_status
    ) VALUES (
      'GB-2026-0047', 'Hoàn thành', 'Medium', '2026-10-19T03:16:31.621Z', 'W43-2026', 'PX Đầu vào', 'LINE CHẶT 1', 'Cắt', '205659 VT bị lỗi sọc ',
      'Chất lượng', 'NVL không đạt tiêu chuẩn', 'VT bị lỗi sọc chạy dài trên cây', 'VT bị lỗi', 'VT MA060 -HABR + 2MM FOAM+TC', '',
      'https://drive.google.com/thumbnail?id=18liZ0qjOvIzJfIK5-CBZdx1fZPJb3WXF&sz=w1600', '', '', 'Tổ Cắt', 'LĂNG VĂN QUẾ', 'QLCL PX Đầu vào', 'ĐẶNG THỊ LÀI',
      '2026-10-19T03:16:31.621Z', '2026-10-19T06:06:24.868Z', 'Chặt loại bỏ lỗi sọc đổi xác', 'https://drive.google.com/thumbnail?id=1KO2EIZ0yyKSN8yu-r8436sBAZxa97ziC&sz=w1600', '2026-10-19T06:08:25.369Z', 0, '', 'SYNCED'
    );
INSERT OR REPLACE INTO gemba_gas_records (
      id, status, priority, recorded_date, week, factory, line, team, location,
      type_code, issue_name, title, description, product_code, proposal,
      img_before, video, files, creator_user, creator_name, assignee_user, assignee_name,
      created_at, started_at, result, img_after, completed_at, process_hours, reject_reason, sync_status
    ) VALUES (
      'GB-2026-0048', 'Hoàn thành', 'Medium', '2026-10-19T11:48:15.784Z', 'W43-2026', 'PX Đầu vào', 'LINE CHẶT 1', 'Cắt', 'Vt YR-16061+JERSEY Bị lỗi sọc ',
      'Chất lượng', 'NVL không đạt tiêu chuẩn', 'Vt bị sọc chạy dài trên cây', 'Vy không đạt chất lượng , không đưa vào sx được.', 'Mẫu 136210 ct mũi,TT gót', '',
      'https://drive.google.com/thumbnail?id=1DwGKPCJX8UbiDRs3ThUlymuZmd9MMndL&sz=w1600', '', '', 'Tổ Cắt', 'LĂNG VĂN QUẾ', 'QLCL PX Đầu vào', 'ĐẶNG THỊ LÀI',
      '2026-10-19T11:48:15.784Z', '2026-10-20T02:46:10.777Z', 'Chặt loại bỏ lỗi sọc đổi xác vt', 'https://drive.google.com/thumbnail?id=1gC-Ae6S90c5EOcW2_C4PMYboOVYML8Zu&sz=w1600', '2026-10-20T02:49:18.110Z', 0.1, '', 'SYNCED'
    );
INSERT OR REPLACE INTO gemba_gas_records (
      id, status, priority, recorded_date, week, factory, line, team, location,
      type_code, issue_name, title, description, product_code, proposal,
      img_before, video, files, creator_user, creator_name, assignee_user, assignee_name,
      created_at, started_at, result, img_after, completed_at, process_hours, reject_reason, sync_status
    ) VALUES (
      'GB-2026-0049', 'Hoàn thành', 'Medium', '2026-10-20T00:28:22.638Z', 'W43-2026', 'PX Gò', 'LINE_HTG 2', 'Tổ công đoạn 3', 'Mô to băng chuyền cd3',
      'MMTB', 'Máy móc hư hỏng chưa xử lý', 'Đit dây cô loa', 'Dây cô loa bi đit khi đang sc', '', '',
      'https://drive.google.com/thumbnail?id=1X-JecsRkyoEuvNdHYR8BVCV-_L9s_I53&sz=w1600', '', '', 'QLCL Line Gò 2', 'QLCL Line Gò 2', 'MMTB  SK MĐ', 'CÔNG HOÀNG CHIẾN',
      '2026-10-20T00:28:22.638Z', '2026-10-20T02:46:31.635Z', 'Đa thay moi', 'https://drive.google.com/thumbnail?id=1HG8F-Q-MTZgKfSam1TTpGMfMpQzLxgZ4&sz=w1600', '2026-10-20T02:48:02.247Z', 0, '', 'SYNCED'
    );
INSERT OR REPLACE INTO gemba_gas_records (
      id, status, priority, recorded_date, week, factory, line, team, location,
      type_code, issue_name, title, description, product_code, proposal,
      img_before, video, files, creator_user, creator_name, assignee_user, assignee_name,
      created_at, started_at, result, img_after, completed_at, process_hours, reject_reason, sync_status
    ) VALUES (
      'GB-2026-0050', 'Hoàn thành', 'Medium', '2026-10-20T03:36:23.500Z', 'W43-2026', 'PX Gò', 'LINE_HTG 2', 'Tổ công đoạn 3', 'Khu vực QC',
      'Chất lượng', 'Chất lượng sản phẩm', 'Lem keo vệ sinh , méo', 'Lem keo , dán đế méo', '138606w', 'Stop chuyền xử lý , hướng dẫn lại thao tác công nhân , kiểm tra thường xuyên',
      'https://drive.google.com/thumbnail?id=1tncuZ_llazM-LjGUr9HCrLNkDqlBNRhr&sz=w1600|https://drive.google.com/thumbnail?id=1jJFrWm7TSHpcbKqSRCrEhx6Yzp8fufOR&sz=w1600', '', '', 'QLCL SK MĐ', 'CAO THỊ MỸ HẠNH', 'Gò 2 - Tổ CĐ 2', 'Gò 2 - Tổ CĐ 2',
      '2026-10-20T03:36:23.500Z', '2026-10-20T09:25:29.480Z', 'Chuyền đa nhắc nho va sinh hoat huong dẵn lai thao tac cn', 'https://drive.google.com/thumbnail?id=1myf69FwgghMvGnuWb4bPaBvH3wiMgHNC&sz=w1600|https://drive.google.com/thumbnail?id=1ZZ_YJlFtwsBL7YT2Q_QkBiphG2ReTLE_&sz=w1600', '2026-10-20T09:29:59.285Z', 0.1, '', 'SYNCED'
    );
INSERT OR REPLACE INTO gemba_gas_records (
      id, status, priority, recorded_date, week, factory, line, team, location,
      type_code, issue_name, title, description, product_code, proposal,
      img_before, video, files, creator_user, creator_name, assignee_user, assignee_name,
      created_at, started_at, result, img_after, completed_at, process_hours, reject_reason, sync_status
    ) VALUES (
      'GB-2026-0051', 'Hoàn thành', 'Medium', '2026-10-20T04:06:43.462Z', 'W43-2026', 'PX May', 'LINE_HTM 1', 'Tổ may 5', 'Máy lập trình bị rớt ốc chưa được bao tri',
      'MMTB', 'Không bảo dưỡng, bảo trì', 'May lập trình bị rớt ốc chưa được bao tri', 'Máy lập trình bị rớt ốc chưa duoc bao trì', '', '',
      'https://drive.google.com/thumbnail?id=1lJ8h5Hqu22ykbgZOS84yYgYavtojajLR&sz=w1600', '', '', 'Tổ May 5', 'LÊ VĂN CƯỜNG', 'MMTB  SK MĐ', 'CÔNG HOÀNG CHIẾN',
      '2026-10-20T04:06:43.462Z', '', 'Đã xử lý ok', 'https://drive.google.com/thumbnail?id=1h-SjPsQgKriFxSi1S2ZIL0s7iCAHPZB1&sz=w1600', '2026-10-20T06:35:58.492Z', 2.5, '', 'SYNCED'
    );
INSERT OR REPLACE INTO gemba_gas_records (
      id, status, priority, recorded_date, week, factory, line, team, location,
      type_code, issue_name, title, description, product_code, proposal,
      img_before, video, files, creator_user, creator_name, assignee_user, assignee_name,
      created_at, started_at, result, img_after, completed_at, process_hours, reject_reason, sync_status
    ) VALUES (
      'GB-2026-0052', 'Hoàn thành', 'Medium', '2026-10-21T02:18:21.533Z', 'W43-2026', 'PX May', 'LINE_HTM 2', 'Tổ may 6', 'May dằn cánh lưỡi gà dư',
      'Chất lượng', 'Chất lượng sản phẩm', 'May dằn cánh lưỡi gà dư', 'May dằn cánh lưỡi gà dư', 'Craft', 'Yêu cầu cbql hướng dẫn lại thao tác công nhân, thường xuyên kiểm tra',
      'https://drive.google.com/thumbnail?id=10x8F-WMH2E_136y0XjflWNzON_34_B6a&sz=w1600', '', '', 'QLCL PX May', 'VŨ THỊ HƯỜNG', 'Tổ May 6', 'NGUYỄN THỊ NHUNG',
      '2026-10-21T02:18:21.533Z', '', 'Đã xử lý ok', 'https://drive.google.com/thumbnail?id=14f8a8jjP7wXJY5cguNCj5YYBa103yAif&sz=w1600', '2026-10-21T06:28:12.957Z', 4.2, '', 'SYNCED'
    );
INSERT OR REPLACE INTO gemba_gas_records (
      id, status, priority, recorded_date, week, factory, line, team, location,
      type_code, issue_name, title, description, product_code, proposal,
      img_before, video, files, creator_user, creator_name, assignee_user, assignee_name,
      created_at, started_at, result, img_after, completed_at, process_hours, reject_reason, sync_status
    ) VALUES (
      'GB-2026-0053', 'Hoàn thành', 'Medium', '2026-10-21T03:26:49.855Z', 'W43-2026', 'PX May', 'LINE_HTM 1', 'Tổ may 4', '',
      'MMTB', 'Không bảo dưỡng, bảo trì', 'Ổ cắm ,dây điên ,bể ,nối ,', 'Không an toàn trong sản xuất', '', '',
      'https://drive.google.com/thumbnail?id=1qP-UvVkDLQxPyg-8uML_mrJmhxG1XyFn&sz=w1600', '', '', 'Trưởng Line May 1', 'Trưởng Line May 1', 'HOÀNG QUỐC NGHỊ', 'HOÀNG QUỐC NGHỊ',
      '2026-10-21T03:26:49.855Z', '', 'Đã xử lý ok', 'https://drive.google.com/thumbnail?id=1-so_NvXAOGhBw-MKRQPA6uuZX_qcYJEb&sz=w1600', '2026-10-21T06:50:45.439Z', 3.4, '', 'SYNCED'
    );
INSERT OR REPLACE INTO gemba_gas_records (
      id, status, priority, recorded_date, week, factory, line, team, location,
      type_code, issue_name, title, description, product_code, proposal,
      img_before, video, files, creator_user, creator_name, assignee_user, assignee_name,
      created_at, started_at, result, img_after, completed_at, process_hours, reject_reason, sync_status
    ) VALUES (
      'GB-2026-0054', 'Hoàn thành', 'High', '2026-10-21T04:24:47.895Z', 'W43-2026', 'PX Gò', 'LINE_HTG 3', 'Tổ công đoạn 3', 'May lanh',
      'MMTB', 'Máy móc hư hỏng chưa xử lý', 'Nhiệt do khong đat', 'Khong du nhiệt do lanh', '', 'Sua chua',
      'https://drive.google.com/thumbnail?id=1s7NTwf0ZeF9GoiJOhoqH0WGZgD0gRlG5&sz=w1600', '', '', 'Trưởng Line Gò 3', 'TRẦN DUY CHƯƠNG', 'MMTB  SK MĐ', 'CÔNG HOÀNG CHIẾN',
      '2026-10-21T04:24:47.895Z', '2026-10-21T06:40:49.296Z', 'Da sửa xong', 'https://drive.google.com/thumbnail?id=13YEyWp8qUk9BHbYOw0W4BBVCMOhQBWCq&sz=w1600', '2026-10-21T06:41:18.033Z', 0, '', 'SYNCED'
    );
INSERT OR REPLACE INTO gemba_gas_records (
      id, status, priority, recorded_date, week, factory, line, team, location,
      type_code, issue_name, title, description, product_code, proposal,
      img_before, video, files, creator_user, creator_name, assignee_user, assignee_name,
      created_at, started_at, result, img_after, completed_at, process_hours, reject_reason, sync_status
    ) VALUES (
      'GB-2026-0055', 'Hoàn thành', 'Medium', '2026-10-21T06:28:32.872Z', 'W43-2026', 'PX May', 'LINE_HTM 1', 'Tổ may 1', '',
      'Khác', 'Khác', 'Máy phun keo không đủ độ sáng', 'Máy phun keo không đủ độ sáng anh hưởng thao tác', '', '',
      'https://drive.google.com/thumbnail?id=14_Ar6JPzS-fwMD90sJnLG-kWv_-K6urH&sz=w1600', '', '', 'Tổ May 1', 'LÊ VĂN TUẤN', 'ĐH PX May', 'HOÀNG QUỐC NGHỊ',
      '2026-10-21T06:28:32.872Z', '', 'Đã xử lý ok', 'https://drive.google.com/thumbnail?id=1pVGN7IHmmCBvag_SCoGT8d-rpT_maG-T&sz=w1600', '2026-10-21T08:50:33.758Z', 2.4, '', 'SYNCED'
    );
INSERT OR REPLACE INTO gemba_gas_records (
      id, status, priority, recorded_date, week, factory, line, team, location,
      type_code, issue_name, title, description, product_code, proposal,
      img_before, video, files, creator_user, creator_name, assignee_user, assignee_name,
      created_at, started_at, result, img_after, completed_at, process_hours, reject_reason, sync_status
    ) VALUES (
      'GB-2026-0056', 'Hoàn thành', 'Medium', '2026-10-21T06:39:59.583Z', 'W43-2026', 'PX May', 'LINE_HTM 1', 'Tổ may 2', '',
      'Chất lượng', 'Chất lượng sản phẩm', 'Sắp xếp pho gót lộn xộn', 'Sắp xếp pho gót lộn xộn dính keo khó lấy dán', '205659', '',
      'https://drive.google.com/thumbnail?id=1vursSPw43MZHWU6Un69UA8lh6jxd8vG_&sz=w1600', '', '', 'Tổ May 2', 'HỒ KHẮC NGHĨA', 'HOÀNG QUỐC NGHỊ', 'HOÀNG QUỐC NGHỊ',
      '2026-10-21T06:39:59.583Z', '', 'Đã sắp xếp gọn gàng', 'https://drive.google.com/thumbnail?id=1bMAXu2QclWba5QtR8FmubGK_wTnI-zQt&sz=w1600', '2026-10-21T07:32:18.539Z', 0.9, '', 'SYNCED'
    );
INSERT OR REPLACE INTO gemba_gas_records (
      id, status, priority, recorded_date, week, factory, line, team, location,
      type_code, issue_name, title, description, product_code, proposal,
      img_before, video, files, creator_user, creator_name, assignee_user, assignee_name,
      created_at, started_at, result, img_after, completed_at, process_hours, reject_reason, sync_status
    ) VALUES (
      'GB-2026-0057', 'Hoàn thành', 'Medium', '2026-10-21T07:54:46.665Z', 'W43-2026', 'PX Đầu vào', 'LINE CHẶT 1', 'Cắt', 'Máy chặt số 10  để nhiều loại VT.',
      '7S', 'Sàng lọc - Sắp xếp', 'để nhiều loại VT trên bàn máy chặt', 'Máy ko hoạt động cơ để nhiều loại VT trên bàn máy chặt', '', '',
      'https://drive.google.com/thumbnail?id=1Naenv10DyRuieaM_xVnkI9m72GYSzoFC&sz=w1600', '', '', 'Tổ Cắt', 'LĂNG VĂN QUẾ', 'Tổ Cắt', 'LĂNG VĂN QUẾ',
      '2026-10-21T07:54:46.665Z', '2026-10-21T08:33:06.223Z', 'Sắp xếp lại VT ok', 'https://drive.google.com/thumbnail?id=10j9ssar__TaPxhz-FfZciKtwAWwk5nLX&sz=w1600', '2026-10-21T08:36:18.487Z', 0.1, '', 'SYNCED'
    );
INSERT OR REPLACE INTO gemba_gas_records (
      id, status, priority, recorded_date, week, factory, line, team, location,
      type_code, issue_name, title, description, product_code, proposal,
      img_before, video, files, creator_user, creator_name, assignee_user, assignee_name,
      created_at, started_at, result, img_after, completed_at, process_hours, reject_reason, sync_status
    ) VALUES (
      'GB-2026-0058', 'Hoàn thành', 'Medium', '2026-10-21T08:00:32.450Z', 'W43-2026', 'PX Đầu vào', 'LINE CHẶT 1', 'Cắt', 'Máy chặt số 9 cắt  chi tiết lót gót không đứt ',
      'Chất lượng', 'Chất lượng sản phẩm', 'Cắt VT lót gót không đứt , phải dùng kéo cắt', 'Do chất liệu VT bằng nylon, và chỉnh lực máy chưa hợp lý.', '', 'Chêm eva vào dao chặt và chỉnh lại lực máy chặt cho phù hợp.',
      'https://drive.google.com/thumbnail?id=1urgjnCPWkYXSPpao9PGoY9za3JK69MpO&sz=w1600', '', '', 'Tổ Cắt', 'LĂNG VĂN QUẾ', 'Tổ Cắt', 'LĂNG VĂN QUẾ',
      '2026-10-21T08:00:32.450Z', '2026-10-21T08:00:49.267Z', 'Dùng eva chêm vào dao chặt, và chỉnh lại lực máy chặt cho phù hợp.', 'https://drive.google.com/thumbnail?id=1uQ9Q7AbBkgsoz0dZmpn6SOEWgGh4Mvey&sz=w1600|https://drive.google.com/thumbnail?id=1Enw6diPliEvuVwQF8JNQiUqCJ4H8fT2U&sz=w1600', '2026-10-21T08:02:48.535Z', 0, '', 'SYNCED'
    );
INSERT OR REPLACE INTO gemba_gas_records (
      id, status, priority, recorded_date, week, factory, line, team, location,
      type_code, issue_name, title, description, product_code, proposal,
      img_before, video, files, creator_user, creator_name, assignee_user, assignee_name,
      created_at, started_at, result, img_after, completed_at, process_hours, reject_reason, sync_status
    ) VALUES (
      'GB-2026-0059', 'Hoàn thành', 'Medium', '2026-10-22T00:16:53.225Z', 'W43-2026', 'PX May', 'LINE_HTM 2', 'Tổ may 7', 'Khu vực để nước uống công nhân dơ ',
      '7S', 'Sạch sẽ - Săn sóc - Sẵn sàng', 'Vệ sinh dơ', 'Vệ sinh dơ', '', '',
      'https://drive.google.com/thumbnail?id=10Oghu-mTpK-lOg55FVVvNLa1CNlVyHC_&sz=w1600', '', '', 'Tổ May 7', 'NGUYỄN THỊ LOAN', 'Tổ May 7', 'NGUYỄN THỊ LOAN',
      '2026-10-22T00:16:53.225Z', '2026-10-22T00:37:30.223Z', 'Đã xử lý ok', 'https://drive.google.com/thumbnail?id=1hU7Rh_O_3JdIAW8C3wDP56UDUyRMAD-j&sz=w1600', '2026-10-22T00:39:42.600Z', 0, '', 'SYNCED'
    );
INSERT OR REPLACE INTO gemba_gas_records (
      id, status, priority, recorded_date, week, factory, line, team, location,
      type_code, issue_name, title, description, product_code, proposal,
      img_before, video, files, creator_user, creator_name, assignee_user, assignee_name,
      created_at, started_at, result, img_after, completed_at, process_hours, reject_reason, sync_status
    ) VALUES (
      'GB-2026-0060', 'Hoàn thành', 'Medium', '2026-10-22T01:49:50.515Z', 'W43-2026', 'PX Gò', 'LINE_HTG 2', 'Tổ công đoạn 2', 'May ep để',
      'MMTB', 'Máy móc hư hỏng chưa xử lý', 'May ep đế ko lên ap luc lần 2', 'Anh huong đển bođinh sp', '', '',
      'https://drive.google.com/thumbnail?id=1u_fkvVNS3dYxlZ2Fpg3vubuuZjuvoDTT&sz=w1600', '', '', 'QLCL Line Gò 2', 'QLCL Line Gò 2', 'MMTB  SK MĐ', 'CÔNG HOÀNG CHIẾN',
      '2026-10-22T01:49:50.515Z', '2026-10-22T02:32:54.784Z', 'Bao tri đa sua chua', 'https://drive.google.com/thumbnail?id=1kyiiHsTBnU9t2ZThWqOJdKtg0CmgtGVY&sz=w1600', '2026-10-22T02:33:57.366Z', 0, '', 'SYNCED'
    );
INSERT OR REPLACE INTO gemba_gas_records (
      id, status, priority, recorded_date, week, factory, line, team, location,
      type_code, issue_name, title, description, product_code, proposal,
      img_before, video, files, creator_user, creator_name, assignee_user, assignee_name,
      created_at, started_at, result, img_after, completed_at, process_hours, reject_reason, sync_status
    ) VALUES (
      'GB-2026-0061', 'Hoàn thành', 'Medium', '2026-10-22T07:56:15.895Z', 'W43-2026', 'PX May', 'LINE_HTM 1', 'Tổ may 5', '',
      'MMTB', 'Máy móc hư hỏng chưa xử lý', 'Máy định hình hư khong sửa duoc', 'Máy định hình hư k sửa duoc', '144202', '',
      'https://drive.google.com/thumbnail?id=1ktWUsEIzlojQb0_0DD3ZTDiqaB9wRSoF&sz=w1600', '', '', 'Tổ May 5', 'LÊ VĂN CƯỜNG', 'MMTB  SK MĐ', 'CÔNG HOÀNG CHIẾN',
      '2026-10-22T07:56:15.895Z', '2026-10-23T00:37:05.788Z', 'Đã sử lý xong', 'https://drive.google.com/thumbnail?id=13nvStAsZkzXrcPAXNNOAAgzkfBgPsKU8&sz=w1600', '2026-10-23T00:45:11.061Z', 0.1, '', 'SYNCED'
    );
INSERT OR REPLACE INTO gemba_gas_records (
      id, status, priority, recorded_date, week, factory, line, team, location,
      type_code, issue_name, title, description, product_code, proposal,
      img_before, video, files, creator_user, creator_name, assignee_user, assignee_name,
      created_at, started_at, result, img_after, completed_at, process_hours, reject_reason, sync_status
    ) VALUES (
      'GB-2026-0062', 'Hoàn thành', 'High', '2026-10-22T08:18:23.011Z', 'W43-2026', 'PX May', 'LINE_HTM 1', 'Tổ may 3', '',
      '7S', 'Sàng lọc - Sắp xếp', 'Chai nước để không đúng vị trí', 'Chai nước đưa vào vị trí làm viêc', '', '',
      'https://drive.google.com/thumbnail?id=1W8HUHcT3YOmvoVJaeaDdP7PxIQf2z66h&sz=w1600', '', '', 'Tổ May 3', 'NGUYỄN THẠCH TRƯỜNG', 'Tổ May 3', 'NGUYỄN THẠCH TRƯỜNG',
      '2026-10-22T08:18:23.011Z', '2026-10-22T08:18:48.969Z', 'Sắp xếp lại', 'https://drive.google.com/thumbnail?id=1gE5Z28qGxwuz6_LqqYZFEtm-8cD6jXFg&sz=w1600', '2026-10-22T08:57:41.910Z', 0.6, '', 'SYNCED'
    );
INSERT OR REPLACE INTO gemba_gas_records (
      id, status, priority, recorded_date, week, factory, line, team, location,
      type_code, issue_name, title, description, product_code, proposal,
      img_before, video, files, creator_user, creator_name, assignee_user, assignee_name,
      created_at, started_at, result, img_after, completed_at, process_hours, reject_reason, sync_status
    ) VALUES (
      'GB-2026-0063', 'Hoàn thành', 'Medium', '2026-10-23T02:13:12.412Z', 'W43-2026', 'PX Đầu vào', 'LINE CHẶT 1', 'Lạng-cán dán-đồng bộ', 'Máy ép cl',
      'Chất lượng', 'Chất lượng sản phẩm', 'Độ bám dính yếu', 'Đặt btp sát mép mâm', '', '',
      'https://drive.google.com/thumbnail?id=1jOREZXEO1CoAZnB2e38s0pklcBP5CT9e&sz=w1600', '', '', 'Tổ Lạng-Cán dán&Đồng bộ', 'NGUYỄN THỊ LOA', 'Tổ Lạng-Cán dán&Đồng bộ', 'NGUYỄN THỊ LOA',
      '2026-10-23T02:13:12.412Z', '2026-10-23T02:13:35.197Z', 'Đặt btp sát mép mâm . Hướng dẫn lại công nhân đặt đúng vị trí và kg được để sát ra mép mâm', 'https://drive.google.com/thumbnail?id=1xH3dIlqz9fbRUU3mnt3ttengCg7D4EjJ&sz=w1600', '2026-10-23T02:18:29.105Z', 0.1, '', 'SYNCED'
    );
INSERT OR REPLACE INTO gemba_gas_records (
      id, status, priority, recorded_date, week, factory, line, team, location,
      type_code, issue_name, title, description, product_code, proposal,
      img_before, video, files, creator_user, creator_name, assignee_user, assignee_name,
      created_at, started_at, result, img_after, completed_at, process_hours, reject_reason, sync_status
    ) VALUES (
      'GB-2026-0064', 'Hoàn thành', 'High', '2026-10-23T03:14:31.960Z', 'W43-2026', 'PX Gò', 'LINE_HTG 1', 'Tổ công đoạn 2', 'MÁY UV ',
      'MMTB', 'Máy móc hư hỏng chưa xử lý', 'máy hư chờ sữa', 'MÁY UV KHÔNG LẠNH', '', 'SỮA CHỮA',
      'https://drive.google.com/thumbnail?id=1t_RCuPfb320QGpxoDKFpi3LIhlnIuUDv&sz=w1600', '', '', 'Trưởng Line Gò 1', 'PHẠM VĂN TUẤN', 'MMTB  SK MĐ', 'CÔNG HOÀNG CHIẾN',
      '2026-10-23T03:14:31.960Z', '', 'đã có 1 máy dự phòng thay thế làm tạm', 'https://drive.google.com/thumbnail?id=1OWcx2ZSZP2rtBTu81sxLZPvN_jo3rioy&sz=w1600', '2026-10-27T09:22:40.443Z', 102.1, '', 'SYNCED'
    );
INSERT OR REPLACE INTO gemba_gas_records (
      id, status, priority, recorded_date, week, factory, line, team, location,
      type_code, issue_name, title, description, product_code, proposal,
      img_before, video, files, creator_user, creator_name, assignee_user, assignee_name,
      created_at, started_at, result, img_after, completed_at, process_hours, reject_reason, sync_status
    ) VALUES (
      'GB-2026-0065', 'Hoàn thành', 'Medium', '2026-10-23T03:39:53.788Z', 'W43-2026', 'PX May', 'LINE_HTM 1', 'Tổ may 4', '',
      '8W', 'Lãng phí năng lực', 'Máy phun hỏng', 'Máy phun hỏng , lãng phí người chờ máy', '', '',
      'https://drive.google.com/thumbnail?id=1Gjg6Ljb7h4yZjYEKpvfYJ_eWkz_iDO-c&sz=w1600', '', '', 'Tổ May 4', 'MAI ĐỨC VIỆT', 'HOÀNG QUỐC NGHỊ', 'HOÀNG QUỐC NGHỊ',
      '2026-10-23T03:39:53.788Z', '', 'Đã xử lý ok', 'https://drive.google.com/thumbnail?id=19rzy6HwYobTbhGjZVkbEvdNZmxva521y&sz=w1600', '2026-10-23T06:21:42.532Z', 2.7, '', 'SYNCED'
    );
INSERT OR REPLACE INTO gemba_gas_records (
      id, status, priority, recorded_date, week, factory, line, team, location,
      type_code, issue_name, title, description, product_code, proposal,
      img_before, video, files, creator_user, creator_name, assignee_user, assignee_name,
      created_at, started_at, result, img_after, completed_at, process_hours, reject_reason, sync_status
    ) VALUES (
      'GB-2026-0066', 'Hoàn thành', 'Medium', '2026-10-23T03:42:41.119Z', 'W43-2026', 'PX May', 'LINE_HTM 1', 'Tổ may 2', '',
      '8W', 'Hãng lỗi', 'Hàng lỗi nhiều', 'Hàng lỗi nhiều , lãng phí công sửa chữa', '', '',
      'https://drive.google.com/thumbnail?id=14IX9N-w9UQACJRT3HA4Zuiiblni560Gs&sz=w1600', '', '', 'Tổ May 2', 'HỒ KHẮC NGHĨA', 'HOÀNG QUỐC NGHỊ', 'HOÀNG QUỐC NGHỊ',
      '2026-10-23T03:42:41.119Z', '', 'Đã cải thiện', 'https://drive.google.com/thumbnail?id=1bL8dqHsffC5y04jS576GiBWbLDLeAYmn&sz=w1600', '2026-10-23T06:23:10.555Z', 2.7, '', 'SYNCED'
    );
INSERT OR REPLACE INTO gemba_gas_records (
      id, status, priority, recorded_date, week, factory, line, team, location,
      type_code, issue_name, title, description, product_code, proposal,
      img_before, video, files, creator_user, creator_name, assignee_user, assignee_name,
      created_at, started_at, result, img_after, completed_at, process_hours, reject_reason, sync_status
    ) VALUES (
      'GB-2026-0067', 'Hoàn thành', 'Medium', '2026-10-23T03:45:51.092Z', 'W43-2026', 'PX May', 'LINE_HTM 1', 'Tổ may 1', '',
      '8W', 'Chờ đợi', 'Việc chờ người', 'Chờ đợi người', '', '',
      'https://drive.google.com/thumbnail?id=1X0RMJOnDYPODK5udpg3R4hF40K4k0jkv&sz=w1600', '', '', 'Tổ May 1', 'LÊ VĂN TUẤN', 'HOÀNG QUỐC NGHỊ', 'HOÀNG QUỐC NGHỊ',
      '2026-10-23T03:45:51.092Z', '', 'Đã cải thiện', 'https://drive.google.com/thumbnail?id=1i7pOIsyr1Yt8WE27VdCwUMz6CVXkMrEJ&sz=w1600', '2026-10-23T06:24:35.831Z', 2.6, '', 'SYNCED'
    );
INSERT OR REPLACE INTO gemba_gas_records (
      id, status, priority, recorded_date, week, factory, line, team, location,
      type_code, issue_name, title, description, product_code, proposal,
      img_before, video, files, creator_user, creator_name, assignee_user, assignee_name,
      created_at, started_at, result, img_after, completed_at, process_hours, reject_reason, sync_status
    ) VALUES (
      'GB-2026-0068', 'Hoàn thành', 'High', '2026-10-23T03:50:21.832Z', 'W43-2026', 'PX Gò', 'LINE_HTG 1', 'Tổ công đoạn 3', 'CD3/C1',
      '8W', 'Chờ đợi', 'cung  cấp dlt thíêu phải chờ đợi', 'hiện tại mỗi màu sản xuất thíu ít nhất 3 đến 5 đôi phải chờ', '', 'cung ứng dlt đầy đủ kịp thời',
      'https://drive.google.com/thumbnail?id=1vVLpIQ7HVBA3e8dQmLvcMZ8HRPQsUl6i&sz=w1600', '', '', 'ĐH PX Gò', 'LÊ VĂN THUỶ', 'LÊ VĂN THUỶ', 'LÊ VĂN THUỶ',
      '2026-10-23T03:50:21.832Z', '2026-10-23T06:22:31.129Z', 'DLT THIẾU KH
PKH ĐÃ XỬ LÝ', 'https://drive.google.com/thumbnail?id=1j7fewl2vHRysNh3H-b1lPdEHfdOSdT0s&sz=w1600', '2026-10-23T06:25:13.683Z', 0, '', 'SYNCED'
    );
INSERT OR REPLACE INTO gemba_gas_records (
      id, status, priority, recorded_date, week, factory, line, team, location,
      type_code, issue_name, title, description, product_code, proposal,
      img_before, video, files, creator_user, creator_name, assignee_user, assignee_name,
      created_at, started_at, result, img_after, completed_at, process_hours, reject_reason, sync_status
    ) VALUES (
      'GB-2026-0069', 'Hoàn thành', 'High', '2026-10-23T04:05:29.248Z', 'W43-2026', 'PX Gò', 'LINE_HTG 1', 'Tổ công đoạn 3', 'CD3/C1',
      '8W', 'Lãng phí năng lực', 'bố trí lao động ko hợp lý', 'bố trí sắp xếp lao động dư thừa ko hợp lý', '', 'sắp xếp lại , bố trí đúng và đủ',
      'https://drive.google.com/thumbnail?id=1wKqNo8i1y-gd6wRYUBzjC5lERLnCVkK5&sz=w1600', '', '', 'Trưởng Line Gò 1', 'PHẠM VĂN TUẤN', 'Trưởng Line Gò 1', 'PHẠM VĂN TUẤN',
      '2026-10-23T04:05:29.248Z', '2026-10-23T05:51:34.701Z', 'bố trí lao động chưa hợp lý
đã sắp xếp đúng và đủ', 'https://drive.google.com/thumbnail?id=1izu5lmefameYn0MJTfSp051pGpqkYHgk&sz=w1600', '2026-10-23T05:53:04.623Z', 0, '', 'SYNCED'
    );
INSERT OR REPLACE INTO gemba_gas_records (
      id, status, priority, recorded_date, week, factory, line, team, location,
      type_code, issue_name, title, description, product_code, proposal,
      img_before, video, files, creator_user, creator_name, assignee_user, assignee_name,
      created_at, started_at, result, img_after, completed_at, process_hours, reject_reason, sync_status
    ) VALUES (
      'GB-2026-0070', 'Hoàn thành', 'High', '2026-10-23T04:09:26.921Z', 'W43-2026', 'PX Gò', 'LINE_HTG 3', 'Tổ công đoạn 3', 'CD3/C3',
      '8W', 'Bố trí dư thừa lao động', 'bố trí lao động ko hợp lý', 'cân băng chuyền', '', 'tốc độ băng chuyền, bố trí lao động hợp lý',
      'https://drive.google.com/thumbnail?id=1Xcu8y6s9ublV7lQhsU0qtiUHR6IySQ05&sz=w1600', '', '', 'Trưởng Line Gò 3', 'TRẦN DUY CHƯƠNG', 'Gò 3 - Tổ CĐ 1', 'TRẦN DUY CHƯƠNG',
      '2026-10-23T04:09:26.921Z', '2026-10-23T05:54:06.972Z', 'Cân bằng chuyền và bố trí lao động chưa hợp lý
đã sắp xếp lao động đúng IE', 'https://drive.google.com/thumbnail?id=1g-mnsKYiQ1dDCpwn7_BUyH_zialX81Ke&sz=w1600', '2026-10-23T05:55:12.761Z', 0, '', 'SYNCED'
    );
INSERT OR REPLACE INTO gemba_gas_records (
      id, status, priority, recorded_date, week, factory, line, team, location,
      type_code, issue_name, title, description, product_code, proposal,
      img_before, video, files, creator_user, creator_name, assignee_user, assignee_name,
      created_at, started_at, result, img_after, completed_at, process_hours, reject_reason, sync_status
    ) VALUES (
      'GB-2026-0071', 'Hoàn thành', 'Medium', '2026-10-23T05:35:22.072Z', 'W43-2026', 'PX Đầu vào', 'LINE CHẶT 1', 'Cắt', '',
      '8W', 'Thao tác thừa', 'Đào chặt không đứt', 'Lãng phí công cắt bằng kéo', '', '',
      'https://drive.google.com/thumbnail?id=1BvIn9nLCIDGhyQvHyH4khCz-NKj56U2o&sz=w1600', '', '', 'ĐH PX Đầu vào', 'TRẦN VĂN HOÁ', 'TRẦN VĂN HOÁ', 'TRẦN VĂN HOÁ',
      '2026-10-23T05:35:22.072Z', '2026-10-23T06:45:33.889Z', 'Đã chỉnh lại máy và mài dao chặt', 'https://drive.google.com/thumbnail?id=1pNvJL4U2433VgQ8xJmC52sEwG6fDzoGl&sz=w1600', '2026-10-23T06:47:25.569Z', 0, '', 'SYNCED'
    );
INSERT OR REPLACE INTO gemba_gas_records (
      id, status, priority, recorded_date, week, factory, line, team, location,
      type_code, issue_name, title, description, product_code, proposal,
      img_before, video, files, creator_user, creator_name, assignee_user, assignee_name,
      created_at, started_at, result, img_after, completed_at, process_hours, reject_reason, sync_status
    ) VALUES (
      'GB-2026-0072', 'Hoàn thành', 'Medium', '2026-10-23T05:38:21.663Z', 'W43-2026', 'PX Đầu vào', 'LINE CHẶT 1', 'Lạng-cán dán-đồng bộ', '',
      '8W', 'Vận chuyển', 'Bố trí xiêm và ép quá xa', 'Lãng phí vận chuyển', '', '',
      'https://drive.google.com/thumbnail?id=1s9ELxyylTvKaRscJVxzpHNySnVJm3IAd&sz=w1600', '', '', 'ĐH PX Đầu vào', 'TRẦN VĂN HOÁ', 'Tổ Lạng-Cán dán&Đồng bộ', 'NGUYỄN THỊ LOA',
      '2026-10-23T05:38:21.663Z', '2026-10-23T06:53:53.428Z', 'Đã layout lại  cho phù hợp. Xiêm và ép', 'https://drive.google.com/thumbnail?id=18D0RwwW3TxiM8CZuutnU7109Pk9jo9M7&sz=w1600', '2026-10-23T06:55:13.135Z', 0, '', 'SYNCED'
    );
INSERT OR REPLACE INTO gemba_gas_records (
      id, status, priority, recorded_date, week, factory, line, team, location,
      type_code, issue_name, title, description, product_code, proposal,
      img_before, video, files, creator_user, creator_name, assignee_user, assignee_name,
      created_at, started_at, result, img_after, completed_at, process_hours, reject_reason, sync_status
    ) VALUES (
      'GB-2026-0073', 'Hoàn thành', 'High', '2026-10-23T10:20:08.925Z', 'W43-2026', 'PX Gò', 'LINE_HTG 3', 'Tổ công đoạn 1', 'May ép mũi ',
      'MMTB', 'Máy móc hư hỏng chưa xử lý', 'May hu', 'May ép mui hu không su dung được', '', 'Sua chua',
      'https://drive.google.com/thumbnail?id=1z33vQOQ9M3OlxCLG4fJLAltGm-__rThS&sz=w1600', '', '', 'Trưởng Line Gò 3', 'TRẦN DUY CHƯƠNG', 'MMTB  SK MĐ', 'CÔNG HOÀNG CHIẾN',
      '2026-10-23T10:20:08.925Z', '2026-10-23T11:40:19.647Z', 'Da sửa', 'https://drive.google.com/thumbnail?id=15OmI3fftFg-kxUYNMxKej4FXnSnDkmxs&sz=w1600', '2026-10-23T11:40:44.221Z', 0, '', 'SYNCED'
    );
INSERT OR REPLACE INTO gemba_gas_records (
      id, status, priority, recorded_date, week, factory, line, team, location,
      type_code, issue_name, title, description, product_code, proposal,
      img_before, video, files, creator_user, creator_name, assignee_user, assignee_name,
      created_at, started_at, result, img_after, completed_at, process_hours, reject_reason, sync_status
    ) VALUES (
      'GB-2026-0074', 'Hoàn thành', 'Medium', '2026-10-24T02:50:14.900Z', 'W43-2026', 'PX Gò', 'LINE_HTG 1', 'Tổ công đoạn 2', 'máy UV',
      '8W', 'Vận chuyển', 'máy UV hư, chờ sữa, mất 1 cn bốc đế qua lại', 'lãng phí 1 công nhân bốc đế qua lại, do máy UV hư', '', 'nhanh chóng sữa chữa máy UV',
      'https://drive.google.com/thumbnail?id=1c_5aunfx7DyRR35eo0kcay4tiMPVKhzA&sz=w1600|https://drive.google.com/thumbnail?id=1e1wicX7CBrergGWQPC5VuzWVUuJNeS9F&sz=w1600', '', '', 'ĐH PX Gò', 'LÊ VĂN THUỶ', 'ĐH PX Gò', 'LÊ VĂN THUỶ',
      '2026-10-24T02:50:14.900Z', '2026-10-24T06:50:36.699Z', 'đã cải thiện và sắp xếp cv', 'https://drive.google.com/thumbnail?id=1OQfEgaS53IcQDv5tAH6kuhXfOJxQieQa&sz=w1600', '2026-10-24T06:52:40.372Z', 0, '', 'SYNCED'
    );
INSERT OR REPLACE INTO gemba_gas_records (
      id, status, priority, recorded_date, week, factory, line, team, location,
      type_code, issue_name, title, description, product_code, proposal,
      img_before, video, files, creator_user, creator_name, assignee_user, assignee_name,
      created_at, started_at, result, img_after, completed_at, process_hours, reject_reason, sync_status
    ) VALUES (
      'GB-2026-0075', 'Hoàn thành', 'Medium', '2026-10-24T03:08:27.880Z', 'W43-2026', 'PX May', 'LINE_HTM 1', 'Tổ may 5', '',
      'MMTB', 'Không bảo dưỡng, bảo trì', 'Cây đo đây treo puy trình bị gay', 'Cay treo puy trình bị gãy', '', '',
      'https://drive.google.com/thumbnail?id=1-tEgtpSxRwNRuyDqPEu1qUkU22hX7xP9&sz=w1600', '', '', 'Tổ May 5', 'LÊ VĂN CƯỜNG', 'MMTB  SK MĐ', 'CÔNG HOÀNG CHIẾN',
      '2026-10-24T03:08:27.880Z', '', 'Đã xử lý', 'https://drive.google.com/thumbnail?id=1Tjf3mxa_H8roIuccCOaX6SGxpmrp3mAD&sz=w1600', '2026-10-24T08:49:39.175Z', 5.7, '', 'SYNCED'
    );
INSERT OR REPLACE INTO gemba_gas_records (
      id, status, priority, recorded_date, week, factory, line, team, location,
      type_code, issue_name, title, description, product_code, proposal,
      img_before, video, files, creator_user, creator_name, assignee_user, assignee_name,
      created_at, started_at, result, img_after, completed_at, process_hours, reject_reason, sync_status
    ) VALUES (
      'GB-2026-0076', 'Hoàn thành', 'Medium', '2026-10-26T03:26:22.830Z', 'W44-2026', 'PX May', 'LINE_HTM 1', 'Tổ may 5', '',
      'MMTB', 'Không bảo dưỡng, bảo trì', 'Phích cắm điện bị bể', 'Phích cắm điện bị bể', '', '',
      'https://drive.google.com/thumbnail?id=1nrQ_4zfZUqd1MpEGRuC5VdIgOYCtxWWc&sz=w1600', '', '', 'Tổ May 5', 'LÊ VĂN CƯỜNG', 'MMTB  SK MĐ', 'CÔNG HOÀNG CHIẾN',
      '2026-10-26T03:26:22.830Z', '', 'Đã xử lý', 'https://drive.google.com/thumbnail?id=1qeZQY7iexYxlKRlRnUbHMtZJInAmnRt2&sz=w1600', '2026-10-26T06:22:41.462Z', 2.9, '', 'SYNCED'
    );
INSERT OR REPLACE INTO gemba_gas_records (
      id, status, priority, recorded_date, week, factory, line, team, location,
      type_code, issue_name, title, description, product_code, proposal,
      img_before, video, files, creator_user, creator_name, assignee_user, assignee_name,
      created_at, started_at, result, img_after, completed_at, process_hours, reject_reason, sync_status
    ) VALUES (
      'GB-2026-0077', 'Hoàn thành', 'Medium', '2026-10-26T07:34:35.361Z', 'W44-2026', 'PX May', 'LINE_HTM 1', 'Tổ may 2', '',
      'Chất lượng', 'Chất lượng sản phẩm', 'Không may thử bước chỉ', 'Công nhân ngồi máy không kiểm tra bước chỉ , căng chỉ', '', '',
      'https://drive.google.com/thumbnail?id=1wC-M2hZCKB96KPPcWcO7lxXYh9Aq9WC8&sz=w1600', '', '', 'Tổ May 2', 'HỒ KHẮC NGHĨA', 'HOÀNG QUỐC NGHỊ', 'HOÀNG QUỐC NGHỊ',
      '2026-10-26T07:34:35.361Z', '', 'Đã xử lý', 'https://drive.google.com/thumbnail?id=1iScETzqqTVVhISHDC45mWKqvX_fshCH2&sz=w1600', '2026-10-26T08:12:38.877Z', 0.6, '', 'SYNCED'
    );
INSERT OR REPLACE INTO gemba_gas_records (
      id, status, priority, recorded_date, week, factory, line, team, location,
      type_code, issue_name, title, description, product_code, proposal,
      img_before, video, files, creator_user, creator_name, assignee_user, assignee_name,
      created_at, started_at, result, img_after, completed_at, process_hours, reject_reason, sync_status
    ) VALUES (
      'GB-2026-0078', 'Hoàn thành', 'Critical', '2026-10-27T02:31:44.188Z', 'W44-2026', 'PX Đầu vào', 'LINE CHẶT 1', 'Lạng-cán dán-đồng bộ', '',
      'MMTB', 'Máy móc hư hỏng chưa xử lý', 'Máy cán Nosew lệch, rách băng tải', 'Máy cán Nosew lệch rách băng tải', '', '',
      'https://drive.google.com/thumbnail?id=105bHGLeV79ydiQry-4A_VWraQaDaTqeb&sz=w1600', '', '', 'Tổ Lạng-Cán dán&Đồng bộ', 'NGUYỄN THỊ LOA', 'MMTB  SK MĐ', 'CÔNG HOÀNG CHIẾN',
      '2026-10-27T02:31:44.188Z', '', 'Rách băng tải đã thay xong', 'https://drive.google.com/thumbnail?id=1aECEhVI3jcDmtD22IwSAbXZqUx6Is7bu&sz=w1600', '2026-10-28T04:02:02.950Z', 25.5, '', 'SYNCED'
    );
INSERT OR REPLACE INTO gemba_gas_records (
      id, status, priority, recorded_date, week, factory, line, team, location,
      type_code, issue_name, title, description, product_code, proposal,
      img_before, video, files, creator_user, creator_name, assignee_user, assignee_name,
      created_at, started_at, result, img_after, completed_at, process_hours, reject_reason, sync_status
    ) VALUES (
      'GB-2026-0079', 'Hoàn thành', 'Critical', '2026-10-27T11:58:49.851Z', 'W44-2026', 'PX May', 'LINE_HTM 2', 'Tổ may 7', 'Máy tán hạt chờ sửa ',
      'MMTB', 'Máy móc hư hỏng chưa xử lý', 'Máy tán hạt vào mã 139223', 'Không kịp tiến độ triển khai', '', '',
      'https://drive.google.com/thumbnail?id=1084u9EYdLWePJDoBcHiNuruX_xbvQdPR&sz=w1600', '', '', 'Tổ May 7', 'NGUYỄN THỊ LOAN', 'MMTB  SK MĐ', 'CÔNG HOÀNG CHIẾN',
      '2026-10-27T11:58:49.851Z', '', 'Đã xử lý', 'https://drive.google.com/thumbnail?id=15F0T8mjYPLNoI4fTAZ-l0Iby_qNIcRLO&sz=w1600', '2026-10-29T02:06:49.809Z', 38.1, '', 'SYNCED'
    );
INSERT OR REPLACE INTO gemba_gas_records (
      id, status, priority, recorded_date, week, factory, line, team, location,
      type_code, issue_name, title, description, product_code, proposal,
      img_before, video, files, creator_user, creator_name, assignee_user, assignee_name,
      created_at, started_at, result, img_after, completed_at, process_hours, reject_reason, sync_status
    ) VALUES (
      'GB-2026-0080', 'Hoàn thành', 'Medium', '2026-10-28T02:17:56.704Z', 'W44-2026', 'PX May', 'LINE_HTM 2', 'Tổ may 6', '',
      'MMTB', 'Không bảo dưỡng, bảo trì', 'Cây treo qui trình', 'Cây treo qui trình gãy', '', '',
      'https://drive.google.com/thumbnail?id=1nt7RhVncbsOS7CrKSvkG0EO9Nxrw0qAj&sz=w1600', '', '', 'Tổ May 6', 'NGUYỄN THỊ NHUNG', 'MMTB  SK MĐ', 'CÔNG HOÀNG CHIẾN',
      '2026-10-28T02:17:56.704Z', '', 'Đã Xử Lý', 'https://drive.google.com/thumbnail?id=1LRrJCk8-lXgqPvBAx7LfNlaihwLfyTni&sz=w1600', '2026-10-29T01:14:06.230Z', 22.9, '', 'SYNCED'
    );
INSERT OR REPLACE INTO gemba_gas_records (
      id, status, priority, recorded_date, week, factory, line, team, location,
      type_code, issue_name, title, description, product_code, proposal,
      img_before, video, files, creator_user, creator_name, assignee_user, assignee_name,
      created_at, started_at, result, img_after, completed_at, process_hours, reject_reason, sync_status
    ) VALUES (
      'GB-2026-0081', 'Hoàn thành', 'Medium', '2026-10-28T02:44:02.689Z', 'W44-2026', 'PX Đầu vào', 'LINE IN ÉP 1', 'Da lót tẩy', '',
      '7S', 'Sàng lọc - Sắp xếp', '5s', 'Sắp xếp chưa gọn gàn', '', 'Sắp xếp lại',
      'https://drive.google.com/thumbnail?id=1Zv_64IY-VumqqqPkGKHdK5ZzZvfaXWrv&sz=w1600', '', '', 'Tổ In-ép', 'NGUYỄN HOÀI HƯNG', 'Tổ Da lót tẩy', 'NGUYỄN HOÀI HƯNG',
      '2026-10-28T02:44:02.689Z', '2026-10-28T02:54:52.989Z', 'Sặp xếp,5s gọn gàn lại', 'https://drive.google.com/thumbnail?id=11RigKSwOhsM_NcrAV1zqzT4qshgKAi1g&sz=w1600', '2026-10-28T11:52:44.593Z', 9, '', 'SYNCED'
    );
INSERT OR REPLACE INTO gemba_gas_records (
      id, status, priority, recorded_date, week, factory, line, team, location,
      type_code, issue_name, title, description, product_code, proposal,
      img_before, video, files, creator_user, creator_name, assignee_user, assignee_name,
      created_at, started_at, result, img_after, completed_at, process_hours, reject_reason, sync_status
    ) VALUES (
      'GB-2026-0082', 'Hoàn thành', 'Medium', '2026-10-28T04:21:56.986Z', 'W44-2026', 'PX Đầu vào', 'LINE CHẶT 1', 'Cắt', 'Máy số 19 để nhiều loại VT trên bàn máy chặt ',
      '7S', 'Sàng lọc - Sắp xếp', '5s'''' sắp xếp', 'Để nhiều loại VT trên bàn máy chặt', '', '',
      'https://drive.google.com/thumbnail?id=10qiX4qQRUV9I1GKZxdftqeZmIWCJ5vPF&sz=w1600', '', '', 'Tổ Cắt', 'LĂNG VĂN QUẾ', 'Tổ Cắt', 'LĂNG VĂN QUẾ',
      '2026-10-28T04:21:56.986Z', '2026-10-28T06:34:45.275Z', 'Đã sàng lọc sắp xếp ok', 'https://drive.google.com/thumbnail?id=1q6K77zqsW1DbiDsEgC0LzhiIZK2LyNga&sz=w1600', '2026-10-28T06:36:33.587Z', 0, '', 'SYNCED'
    );
INSERT OR REPLACE INTO gemba_gas_records (
      id, status, priority, recorded_date, week, factory, line, team, location,
      type_code, issue_name, title, description, product_code, proposal,
      img_before, video, files, creator_user, creator_name, assignee_user, assignee_name,
      created_at, started_at, result, img_after, completed_at, process_hours, reject_reason, sync_status
    ) VALUES (
      'GB-2026-0083', 'Hoàn thành', 'High', '2026-10-28T04:53:23.405Z', 'W44-2026', 'PX May', 'LINE_HTM 1', 'Tổ may 1', '',
      'MMTB', 'Máy móc hư hỏng chưa xử lý', 'Máy tán hạt tán bị tróc sơn hạt', 'Máy tán hạt tán bị tróc sơn hạt', 'Sn139222', '',
      'https://drive.google.com/thumbnail?id=1sWAxOV7Xv5h0VPyqKGTVW_ErsRNyiznA&sz=w1600|https://drive.google.com/thumbnail?id=1YwE4ONhc5-60zVsfUo-wA0YT4s-8twZe&sz=w1600', '', '', 'Tổ May 1', 'LÊ VĂN TUẤN', 'MMTB  SK MĐ', 'CÔNG HOÀNG CHIẾN',
      '2026-10-28T04:53:23.405Z', '', 'Cối tán bị lỗi và thay cối tán mới', 'https://drive.google.com/thumbnail?id=1UzU_sstY-grhLuresTo1BHO0Qe_biUZ-&sz=w1600', '2026-10-28T07:47:13.614Z', 2.9, '', 'SYNCED'
    );
INSERT OR REPLACE INTO gemba_gas_records (
      id, status, priority, recorded_date, week, factory, line, team, location,
      type_code, issue_name, title, description, product_code, proposal,
      img_before, video, files, creator_user, creator_name, assignee_user, assignee_name,
      created_at, started_at, result, img_after, completed_at, process_hours, reject_reason, sync_status
    ) VALUES (
      'GB-2026-0084', 'Hoàn thành', 'Medium', '2026-10-29T03:20:03.086Z', 'W44-2026', 'PX May', 'LINE_HTM 1', 'Tổ may 3', '',
      '7S', 'Sàng lọc - Sắp xếp', 'Btp đê ko đúng nơi quy định', 'Btp đê ko gon gang', '138182', 'Cân doi lao dong lai',
      'https://drive.google.com/thumbnail?id=1TJBCrKMZIO4f_Cb4j51bS7n8Tx_Xv-EX&sz=w1600', '', '', 'Tổ May 3', 'NGUYỄN THẠCH TRƯỜNG', 'HOÀNG QUỐC NGHỊ', 'HOÀNG QUỐC NGHỊ',
      '2026-10-29T03:20:03.086Z', '2026-10-29T03:20:32.494Z', 'Đã xử lý ok', 'https://drive.google.com/thumbnail?id=13Pa11AA_QVfa0VPZfcz5KlNnDblX84P3&sz=w1600', '2026-10-29T03:41:19.298Z', 0.3, '', 'SYNCED'
    );
INSERT OR REPLACE INTO gemba_gas_records (
      id, status, priority, recorded_date, week, factory, line, team, location,
      type_code, issue_name, title, description, product_code, proposal,
      img_before, video, files, creator_user, creator_name, assignee_user, assignee_name,
      created_at, started_at, result, img_after, completed_at, process_hours, reject_reason, sync_status
    ) VALUES (
      'GB-2026-0085', 'Hoàn thành', 'Medium', '2026-10-29T03:27:18.369Z', 'W44-2026', 'PX May', 'LINE_HTM 1', 'Tổ may 2', '',
      'Tuân thủ', 'Quy trình sản xuất', 'Btp để ko gọn gàng', 'Btp để ko gọn gàng trong thùng máy phun keo', '138182', 'Btp để ra ngoài máy phun keo lấy từng chi tiết rồi đưa vào máy phun .',
      'https://drive.google.com/thumbnail?id=1GWkMO6xHOV3AYPahJSPQMSBjCwurS18_&sz=w1600', '', '', 'Tổ May 2', 'HỒ KHẮC NGHĨA', 'Tổ May 2', 'HỒ KHẮC NGHĨA',
      '2026-10-29T03:27:18.369Z', '2026-10-29T03:55:16.474Z', 'Lấy từng btp 1 đưa vào máy rồi phun keo.', 'https://drive.google.com/thumbnail?id=1yMlcNEt4rSl5ZYd_r1YwMRgmGvU8vx3y&sz=w1600', '2026-10-29T03:56:38.936Z', 0, '', 'SYNCED'
    );
