-- Migration 0022: Full Gemba.Pro Google Apps Script Integration & 2-Way Sync
-- Preserves 100% of the GAS schema, columns, user accounts, and tickets

CREATE TABLE IF NOT EXISTS gemba_settings (
    key TEXT PRIMARY KEY,
    value TEXT NOT NULL,
    updated_at DATETIME DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE IF NOT EXISTS gemba_gas_users (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    username TEXT UNIQUE NOT NULL,
    full_name TEXT NOT NULL,
    group_name TEXT,
    factory TEXT,
    line TEXT,
    team TEXT,
    department TEXT,
    position TEXT,
    email TEXT,
    phone TEXT,
    role TEXT DEFAULT 'Viewer',
    password TEXT DEFAULT '123456',
    token TEXT,
    zalo_chat_id TEXT,
    status TEXT DEFAULT 'Active',
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
    updated_at DATETIME DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE IF NOT EXISTS gemba_gas_records (
    id TEXT PRIMARY KEY,
    status TEXT DEFAULT 'Mới',
    priority TEXT DEFAULT 'Medium',
    recorded_date DATETIME,
    week TEXT,
    factory TEXT,
    line TEXT,
    team TEXT,
    location TEXT,
    type_code TEXT,
    issue_name TEXT,
    title TEXT NOT NULL,
    description TEXT,
    product_code TEXT,
    proposal TEXT,
    img_before TEXT,
    video TEXT,
    files TEXT,
    creator_user TEXT,
    creator_name TEXT,
    assignee_user TEXT,
    assignee_name TEXT,
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
    started_at DATETIME,
    result TEXT,
    img_after TEXT,
    completed_at DATETIME,
    process_hours REAL DEFAULT 0,
    reject_reason TEXT,
    sync_status TEXT DEFAULT 'SYNCED',
    updated_at DATETIME DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE IF NOT EXISTS gemba_gas_dm_nml (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    factory TEXT NOT NULL,
    line TEXT NOT NULL,
    team TEXT NOT NULL,
    assignee TEXT,
    assignee_backup TEXT,
    status TEXT DEFAULT 'Active'
);

CREATE TABLE IF NOT EXISTS gemba_gas_categories (
    code TEXT PRIMARY KEY,
    name TEXT NOT NULL,
    status TEXT DEFAULT 'Active'
);

CREATE TABLE IF NOT EXISTS gemba_gas_history (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    gemba_id TEXT NOT NULL,
    action TEXT,
    from_status TEXT,
    to_status TEXT,
    user TEXT,
    name TEXT,
    timestamp DATETIME DEFAULT CURRENT_TIMESTAMP,
    note TEXT,
    FOREIGN KEY (gemba_id) REFERENCES gemba_gas_records(id) ON DELETE CASCADE
);

CREATE TABLE IF NOT EXISTS gemba_gas_notifications (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    receiver TEXT NOT NULL,
    sender TEXT,
    sender_name TEXT,
    type TEXT DEFAULT 'info',
    title TEXT,
    content TEXT,
    gemba_id TEXT,
    is_read INTEGER DEFAULT 0,
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
    read_at DATETIME
);

CREATE INDEX IF NOT EXISTS idx_gemba_gas_records_status ON gemba_gas_records(status);
CREATE INDEX IF NOT EXISTS idx_gemba_gas_records_created ON gemba_gas_records(created_at DESC);
CREATE INDEX IF NOT EXISTS idx_gemba_gas_records_assignee ON gemba_gas_records(assignee_user);
CREATE INDEX IF NOT EXISTS idx_gemba_gas_users_username ON gemba_gas_users(username);
CREATE INDEX IF NOT EXISTS idx_gemba_gas_history_gemba ON gemba_gas_history(gemba_id);
CREATE INDEX IF NOT EXISTS idx_gemba_gas_notif_receiver ON gemba_gas_notifications(receiver, is_read);

