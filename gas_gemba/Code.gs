const SHEET_USER     = 'USER';
const SHEET_DM_NML   = 'Phòng ban';
const SHEET_DM_LOAI  = 'Loại vấn đề';
const SHEET_GEMBA    = 'GEMBA';
const SHEET_LICHSU   = 'LICH_SU';
const SHEET_SETTINGS = 'SETTINGS';
const SHEET_THONGBAO = 'THONG_BAO';
const SHEET_SESSION  = 'SESSION';

const SESSION_TTL_DAYS  = 30;
const PROP_APP_VERSION  = 'APP_VERSION';
const PROP_KILL_SWITCH  = 'KILL_SWITCH';
const PROP_FORCE_RELOAD = 'FORCE_RELOAD_AT';

const CACHE_KEYS = {
  SETTINGS:   'APP_SETTINGS',
  METADATA:   'APP_METADATA',
  GEMBA_RAW:  'GEMBA_RAW_V1',
  USER_RAW:   'USER_RAW_V1',
  DM_NML_RAW: 'DM_NML_RAW_V1'
};

const TYPE_ORDER = ['7S', 'Tuân thủ', 'Chất lượng', 'MMTB', 'Lãng phí', 'Khác'];

const STATUS = {
  NEW:        'Mới',
  PROCESSING: 'Đang xử lý',
  DONE:       'Hoàn thành',
  REJECTED:   'Từ chối',
  OVERDUE:    'Quá hạn',
  REOPEN:     'Chờ xử lý lại'
};

const ROLES_CAN_VIEW_DASHBOARD = ['Admin', 'Tổng Giám đốc', 'Giám đốc', 'Trưởng Line', 'Tổ trưởng'];
const ROLES_CAN_MANAGE         = ['Admin', 'Tổng Giám đốc', 'Giám đốc', 'Trưởng Line'];

const SCHEMA = {
  USER: {
    ID:         ['ID'],
    USERNAME:   ['USERNAME', 'USER', 'TÊN ĐĂNG NHẬP'],
    FULL_NAME:  ['HỌ VÀ TÊN', 'HO VA TEN', 'FULLNAME', 'FULL NAME', 'TÊN'],
    GROUP:      ['NHÓM ĐĂNG NHẬP', 'NHOM DANG NHAP', 'GROUP', 'NHÓM'],
    FACTORY:    ['NHÀ MÁY', 'NHA MAY', 'FACTORY'],
    LINE:       ['LINE', 'CHUYỀN'],
    TEAM:       ['TỔ', 'TO', 'TEAM'],
    DEPT:       ['PHÒNG BAN', 'PHONG BAN', 'DEPARTMENT', 'DEPT'],
    POSITION:   ['CHỨC VỤ', 'CHUC VU', 'POSITION'],
    EMAIL:      ['EMAIL', 'E-MAIL', 'MAIL'],
    PHONE:      ['SĐT', 'SDT', 'PHONE', 'ĐIỆN THOẠI'],
    ROLE:       ['QUYỀN', 'QUYEN', 'ROLE'],
    PASSWORD:   ['MẬT KHẨU', 'MAT KHAU', 'PASSWORD', 'PWD'],
    STATUS:     ['TRẠNG THÁI', 'TRANG THAI', 'STATUS'],
    CREATED_AT: ['NGÀY TẠO', 'NGAY TAO', 'CREATED AT', 'CREATED'],
    TOKEN:      ['TOKEN', 'MMTB TOKEN', 'TOKEN MMTB'],

    ZALO_CHAT_ID: [
      'ZALO CHAT ID',
      'ZALO_CHAT_ID',
      'CHAT ID ZALO',
      'ZALO ID'
    ]
  },

  SESSION: {
    TOKEN:      ['TOKEN'],
    USERNAME:   ['USERNAME'],
    CREATED_AT: ['CREATED AT', 'NGÀY TẠO'],
    EXPIRES_AT: ['EXPIRES AT', 'HẾT HẠN'],
    LAST_SEEN:  ['LAST SEEN', 'TRUY CẬP CUỐI'],
    USER_AGENT: ['USER AGENT', 'UA'],
    STATUS:     ['STATUS', 'TRẠNG THÁI']
  },
  GEMBA: {
    ID:             ['ID', 'MÃ PHIẾU'],
    STATUS:         ['TRẠNG THÁI', 'TRANG THAI', 'STATUS'],
    PRIORITY:       ['MỨC ƯU TIÊN', 'MUC UU TIEN', 'PRIORITY'],
    RECORDED_DATE:  ['NGÀY GHI NHẬN', 'NGAY GHI NHAN', 'RECORDED DATE'],
    WEEK:           ['TUẦN', 'TUAN', 'WEEK'],
    FACTORY:        ['NHÀ MÁY', 'NHA MAY', 'FACTORY'],
    LINE:           ['LINE', 'CHUYỀN'],
    TEAM:           ['TỔ', 'TO', 'TEAM'],
    LOCATION:       ['VỊ TRÍ CHI TIẾT', 'VI TRI CHI TIET', 'LOCATION'],
    TYPE_CODE:      ['MÃ LOẠI VẤN ĐỀ', 'MA LOAI VAN DE', 'TYPE CODE', 'MÃ VẤN ĐỀ'],
    ISSUE_NAME:     ['TÊN VẤN ĐỀ', 'TEN VAN DE', 'ISSUE NAME'],
    TITLE:          ['VẤN ĐỀ GHI NHẬN', 'VAN DE GHI NHAN', 'TITLE'],
    DESCRIPTION:    ['MÔ TẢ VẤN ĐỀ', 'MO TA VAN DE', 'DESCRIPTION', 'MÔ TẢ'],
    PRODUCT_CODE:   ['MÃ HÀNG / SP LIÊN QUAN', 'MA HANG', 'PRODUCT CODE', 'MÃ HÀNG'],
    PROPOSAL:       ['ĐỀ XUẤT GIẢI PHÁP', 'DE XUAT GIAI PHAP', 'PROPOSAL'],
    IMG_BEFORE:     ['ẢNH VẤN ĐỀ (BEFORE)', 'ANH BEFORE', 'IMG BEFORE', 'ẢNH BEFORE'],
    VIDEO:          ['VIDEO VẤN ĐỀ', 'VIDEO', 'VIDEO BEFORE'],
    FILES:          ['FILE ĐÍNH KÈM', 'FILE DINH KEM', 'FILES', 'ATTACHMENTS'],
    CREATOR_USER:   ['NGƯỜI TẠO (USERNAME)', 'NGUOI TAO USERNAME', 'CREATOR USERNAME'],
    CREATOR_NAME:   ['NGƯỜI TẠO (HỌ TÊN)', 'NGUOI TAO HO TEN', 'CREATOR NAME'],
    ASSIGNEE_USER:  ['NGƯỜI PHỤ TRÁCH (USERNAME)', 'NGUOI PHU TRACH USERNAME', 'ASSIGNEE USERNAME'],
    ASSIGNEE_NAME:  ['NGƯỜI PHỤ TRÁCH (HỌ TÊN)', 'NGUOI PHU TRACH HO TEN', 'ASSIGNEE NAME'],
    CREATED_AT:     ['TG TẠO', 'TG TAO', 'CREATED AT', 'CREATED'],
    STARTED_AT:     ['NGÀY BẮT ĐẦU XỬ LÝ', 'NGAY BAT DAU', 'STARTED AT'],
    RESULT:         ['KẾT QUẢ', 'KET QUA', 'RESULT'],
    IMG_AFTER:      ['ẢNH KẾT QUẢ (AFTER)', 'ANH AFTER', 'IMG AFTER', 'ẢNH AFTER'],
    COMPLETED_AT:   ['NGÀY HOÀN THÀNH', 'NGAY HOAN THANH', 'COMPLETED AT'],
    PROCESS_HOURS:  ['THỜI GIAN XỬ LÝ (GIỜ)', 'THOI GIAN XU LY', 'PROCESS HOURS'],
    REJECT_REASON:  ['LÝ DO TỪ CHỐI', 'LY DO TU CHOI', 'REJECT REASON']
  },
  DM_NML: {
    FACTORY:         ['NHÀ MÁY', 'NHA MAY', 'FACTORY'],
    LINE:            ['LINE', 'CHUYỀN'],
    TEAM:            ['TỔ', 'TO', 'TEAM'],
    ASSIGNEE:        ['NGƯỜI PHỤ TRÁCH', 'NGUOI PHU TRACH', 'ASSIGNEE'],
    ASSIGNEE_BACKUP: ['NGƯỜI PHỤ TRÁCH BACKUP', 'BACKUP', 'ASSIGNEE BACKUP'],
    STATUS:          ['TRẠNG THÁI', 'TRANG THAI', 'STATUS']
  },
  DM_LOAI: {
    CODE:   ['MÃ VẤN ĐỀ', 'MA VAN DE', 'MÃ', 'CODE'],
    NAME:   ['TÊN VẤN ĐỀ', 'TEN VAN DE', 'TÊN LOẠI', 'NAME'],
    STATUS: ['TRẠNG THÁI', 'TRANG THAI', 'STATUS']
  },
  LICHSU: {
    LOG_ID:      ['LOG ID', 'LOGID', 'ID LOG'],
    GEMBA_ID:    ['GEMBA ID', 'GEMBAID', 'ID PHIẾU'],
    ACTION:      ['HÀNH ĐỘNG', 'HANH DONG', 'ACTION'],
    FROM_STATUS: ['TRẠNG THÁI TRƯỚC', 'FROM STATUS'],
    TO_STATUS:   ['TRẠNG THÁI SAU', 'TO STATUS'],
    USER:        ['NGƯỜI THỰC HIỆN (USERNAME)', 'USER'],
    NAME:        ['NGƯỜI THỰC HIỆN (HỌ TÊN)', 'NAME'],
    TIMESTAMP:   ['THỜI GIAN', 'TIMESTAMP', 'TIME'],
    NOTE:        ['GHI CHÚ / BÌNH LUẬN', 'NOTE', 'GHI CHÚ']
  },
  THONGBAO: {
    ID:          ['ID', 'NOTIF ID'],
    RECEIVER:    ['NGƯỜI NHẬN (USERNAME)', 'NGUOI NHAN', 'RECEIVER'],
    SENDER:      ['NGƯỜI GỬI (USERNAME)', 'NGUOI GUI', 'SENDER'],
    SENDER_NAME: ['NGƯỜI GỬI (HỌ TÊN)', 'NGUOI GUI HO TEN', 'SENDER NAME'],
    TYPE:        ['LOẠI', 'LOAI', 'TYPE'],
    TITLE:       ['TIÊU ĐỀ', 'TIEU DE', 'TITLE'],
    CONTENT:     ['NỘI DUNG', 'NOI DUNG', 'CONTENT'],
    GEMBA_ID:    ['GEMBA ID', 'ID PHIẾU'],
    IS_READ:     ['ĐÃ ĐỌC', 'DA DOC', 'IS READ', 'READ'],
    CREATED_AT:  ['THỜI GIAN TẠO', 'TG TẠO', 'CREATED AT'],
    READ_AT:     ['THỜI GIAN ĐỌC', 'TG ĐỌC', 'READ AT']
  }
};

function doGet(e) {
  return HtmlService.createTemplateFromFile('Index')
    .evaluate()
    .setTitle('Gemba.Pro — TBS Group | NM SK Miền Đông')
    .setXFrameOptionsMode(HtmlService.XFrameOptionsMode.ALLOWALL)
    .addMetaTag('viewport', 'width=device-width, initial-scale=1.0');
}
/**
 * ============================================================
 * ZALO BOT WEBHOOK
 * Dùng để bắt payload thật từ Zalo
 * ============================================================
 */
function doPost(e) {

  try {

    var rawBody = '';

    if (
      e &&
      e.postData &&
      e.postData.contents
    ) {
      rawBody =
        String(
          e.postData.contents
        );
    }


    // Ghi payload để debug
    _saveZaloWebhookLog(
      rawBody
    );


    if (rawBody) {

      try {

        var update =
          JSON.parse(rawBody);


        console.log(
          '[ZALO WEBHOOK]',
          JSON.stringify(update)
        );


        var message =
          update &&
          update.message
            ? update.message
            : null;


        var chat =
          message &&
          message.chat
            ? message.chat
            : null;


        if (
          chat &&
          chat.id
        ) {

          var chatId =
            String(
              chat.id
            ).trim();


          var chatType =
            String(
              chat.chat_type ||
              ''
            )
            .trim()
            .toUpperCase();


          console.log(
            '[ZALO CHAT]',
            'ID=' + chatId,
            'TYPE=' + chatType
          );


          /*
           * CHỈ LƯU GROUP
           *
           * PRIVATE → không lưu
           * GROUP   → lưu làm ZALO_GROUP_CHAT_ID
           */
          if (
            chatType === 'GROUP'
          ) {

            _setZaloGroupChatId(
              chatId
            );


            console.log(
              '[ZALO GROUP CHAT ID SAVED]',
              chatId
            );
          }
        }


      } catch (jsonError) {

        console.error(
          '[ZALO WEBHOOK JSON ERROR]',
          jsonError
        );
      }
    }


    return ContentService
      .createTextOutput(
        JSON.stringify({
          success: true,
          received: true
        })
      )
      .setMimeType(
        ContentService
          .MimeType
          .JSON
      );


  } catch (error) {

    console.error(
      '[ZALO WEBHOOK ERROR]',
      error
    );


    return ContentService
      .createTextOutput(
        JSON.stringify({
          success: false,
          received: false,
          error:
            String(error)
        })
      )
      .setMimeType(
        ContentService
          .MimeType
          .JSON
      );
  }
}


/**
 * ============================================================
 * LƯU RAW PAYLOAD ZALO VÀO GOOGLE SHEET
 * ============================================================
 */
function _saveZaloWebhookLog(rawBody) {

  var ss = SpreadsheetApp.getActiveSpreadsheet();

  var sheetName = 'ZALO_WEBHOOK_LOG';

  var sh = ss.getSheetByName(sheetName);

  // Chưa có sheet thì tự tạo
  if (!sh) {

    sh = ss.insertSheet(sheetName);

    sh.appendRow([
      'TIMESTAMP',
      'RAW_PAYLOAD'
    ]);

    sh.setFrozenRows(1);
  }

  // Ghi payload
  sh.appendRow([
    new Date(),
    rawBody || ''
  ]);
}
function include(filename) { return HtmlService.createHtmlOutputFromFile(filename).getContent(); }
function getScriptUrl()    { return ScriptApp.getService().getUrl(); }

function _ss()           { return SpreadsheetApp.getActiveSpreadsheet(); }
function _sheet(name)    { var s = _ss().getSheetByName(name); if (!s) throw new Error('Không tìm thấy sheet: ' + name); return s; }
function _cache()        { return CacheService.getScriptCache(); }
function _now()          { return new Date(); }
function _safeStr(s)     { return s == null ? '' : String(s).trim(); }
function _normalizeStatus(s) { return String(s || '').trim(); }
function _isClosed(status)   { var s = _normalizeStatus(status); return s === STATUS.DONE || s === STATUS.REJECTED; }

/* ════════════════════════════════════════════════════════════
   MULTI-VALUE HELPERS
════════════════════════════════════════════════════════════ */
function _splitMulti(s) {
  if (s == null) return [];
  return String(s)
    .split(/[,;|]/)
    .map(function(x) { return _norm(x); })
    .filter(function(x) { return x !== ''; });
}

function _scopeMatch(userScopeStr, rowVal) {
  var scopes = _splitMulti(userScopeStr);
  if (!scopes.length) return true;
  var target = _norm(rowVal);
  if (target === '') return true;
  return scopes.indexOf(target) >= 0;
}

function _readAll(sheet) {
  if (!sheet) return { headers: [], rows: [] };
  var lastRow = sheet.getLastRow(), lastCol = sheet.getLastColumn();
  if (lastRow < 1 || lastCol < 1) return { headers: [], rows: [] };
  var values = sheet.getRange(1, 1, lastRow, lastCol).getValues();
  if (!values.length) return { headers: [], rows: [] };
  return { headers: values[0] || [], rows: values.length > 1 ? values.slice(1) : [] };
}

function _canViewDashboard(role) { return ROLES_CAN_VIEW_DASHBOARD.indexOf(String(role || '')) >= 0; }
function _canManageRole(role)    { return ROLES_CAN_MANAGE.indexOf(String(role || '')) >= 0; }
function _isAdminRole(role)      { return String(role || '') === 'Admin'; }

function _safeDate(v) {
  if (!v) return '';
  if (v instanceof Date) return isNaN(v.getTime()) ? '' : v.toISOString();
  return String(v);
}

function _getCacheJson(key) {
  try { var raw = _cache().get(key); return raw ? JSON.parse(raw) : null; } catch (e) { return null; }
}
function _setCacheJson(key, value, seconds) {
  try { var json = JSON.stringify(value); if (json.length > 95000) return; _cache().put(key, json, seconds || 300); } catch (e) {}
}
function _removeCache(key) { try { _cache().remove(key); } catch (e) {} }

function _getCacheVersion() { return PropertiesService.getScriptProperties().getProperty('CACHE_VERSION') || '1'; }
function _bumpCacheVersion() {
  var p = PropertiesService.getScriptProperties();
  var v = String(Number(p.getProperty('CACHE_VERSION') || '1') + 1);
  p.setProperty('CACHE_VERSION', v);
  return v;
}
function _invalidateGembaCache() { _removeCache(CACHE_KEYS.GEMBA_RAW); _bumpCacheVersion(); }
function _invalidateUserCache()  { _removeCache(CACHE_KEYS.USER_RAW); _bumpCacheVersion(); }
function _invalidateMetadata()   { _removeCache(CACHE_KEYS.METADATA); _removeCache(CACHE_KEYS.DM_NML_RAW); _bumpCacheVersion(); }

function _clearAppCache() {
  _removeCache(CACHE_KEYS.SETTINGS); _removeCache(CACHE_KEYS.METADATA);
  _removeCache(CACHE_KEYS.GEMBA_RAW); _removeCache(CACHE_KEYS.USER_RAW);
  _removeCache(CACHE_KEYS.DM_NML_RAW); _bumpCacheVersion();
}

/* ════════════════════════════════════════════════════════════
   ADMIN: XOÁ CACHE THỦ CÔNG (dùng khi sửa trực tiếp trên Sheet)
════════════════════════════════════════════════════════════ */
function forceClearAllCache(caller) {
  try {
    if (!_isAdminRole(caller && caller.role))
      return { success: false, message: 'Chỉ Admin được thao tác' };
    _clearAppCache();
    _HEADER_MAP_CACHE = {};
    return { success: true, message: 'Đã xoá toàn bộ cache máy chủ' };
  } catch (e) { return { success: false, message: e.toString() }; }
}

function _norm(s) {
  if (s == null) return '';
  return String(s).normalize('NFD').replace(/[\u0300-\u036f]/g, '')
    .replace(/đ/gi, 'd').replace(/\s+/g, ' ').trim().toUpperCase();
}

var _HEADER_MAP_CACHE = {};

function _buildHeaderMap(headers) {
  var sig = headers.join('\u0001');
  if (_HEADER_MAP_CACHE[sig]) return _HEADER_MAP_CACHE[sig];
  var map = {};
  for (var i = 0; i < headers.length; i++) map[_norm(headers[i])] = i;
  _HEADER_MAP_CACHE[sig] = map;
  return map;
}

function _colByKey(headers, sheetKey, fieldKey) {
  var aliases = (SCHEMA[sheetKey] || {})[fieldKey];
  if (!aliases || !aliases.length) return -1;
  var map = _buildHeaderMap(headers);
  for (var j = 0; j < aliases.length; j++) {
    var idx = map[_norm(aliases[j])];
    if (idx != null && idx >= 0) return idx;
  }
  return -1;
}

function _buildColMap(headers, sheetKey) {
  var fields = SCHEMA[sheetKey] || {}, hMap = _buildHeaderMap(headers), result = {};
  Object.keys(fields).forEach(function(field) {
    var aliases = fields[field]; result[field] = -1;
    for (var j = 0; j < aliases.length; j++) { var idx = hMap[_norm(aliases[j])]; if (idx != null && idx >= 0) { result[field] = idx; break; } }
  });
  return result;
}

function _getByKey(row, headers, sheetKey, fieldKey) {
  var i = _colByKey(headers, sheetKey, fieldKey);
  if (i < 0) return '';
  var v = row[i];
  if (v instanceof Date) return v.toISOString();
  return v == null ? '' : v;
}

function _setByKey(row, headers, sheetKey, fieldKey, value) {
  var i = _colByKey(headers, sheetKey, fieldKey);
  if (i >= 0) { row[i] = value; return true; }
  return false;
}

function _cellByCol(row, cols, field) {
  var idx = cols[field];
  if (idx == null || idx < 0) return '';
  var v = row[idx];
  return v == null ? '' : v;
}

function _matchTypeKey(code) {
  if (!code) return 'Khác';
  var norm = _norm(code);
  for (var i = 0; i < TYPE_ORDER.length; i++) { if (_norm(TYPE_ORDER[i]) === norm) return TYPE_ORDER[i]; }
  for (var j = 0; j < TYPE_ORDER.length; j++) { if (norm.indexOf(_norm(TYPE_ORDER[j])) >= 0) return TYPE_ORDER[j]; }
  return 'Khác';
}

function _getGembaRaw() {
  var cached = _getCacheJson(CACHE_KEYS.GEMBA_RAW);
  if (cached) return cached;
  var sh = _sheet(SHEET_GEMBA);
  if (sh.getLastRow() < 2) return { headers: [], rows: [], cols: {} };
  var rd = _readAll(sh), cols = _buildColMap(rd.headers, 'GEMBA');
  var rows = rd.rows.map(function(r) { return r.map(function(v) { return v instanceof Date ? v.toISOString() : v; }); });
  var result = { headers: rd.headers, rows: rows, cols: cols };
  _setCacheJson(CACHE_KEYS.GEMBA_RAW, result, 90);
  return result;
}

function _getUserRaw() {
  var cached = _getCacheJson(CACHE_KEYS.USER_RAW);
  if (cached) return cached;
  var sh = _sheet(SHEET_USER), rd = _readAll(sh), cols = _buildColMap(rd.headers, 'USER');
  var rows = rd.rows.map(function(r) { return r.map(function(v) { return v instanceof Date ? v.toISOString() : v; }); });
  var result = { headers: rd.headers, rows: rows, cols: cols };
  _setCacheJson(CACHE_KEYS.USER_RAW, result, 300);
  return result;
}

function _getDmNmlRaw() {
  var cached = _getCacheJson(CACHE_KEYS.DM_NML_RAW);
  if (cached) return cached;
  var sh = _ss().getSheetByName(SHEET_DM_NML);
  if (!sh || sh.getLastRow() < 2) return { headers: [], rows: [], cols: {} };
  var rd = _readAll(sh), cols = _buildColMap(rd.headers, 'DM_NML');
  var result = { headers: rd.headers, rows: rd.rows, cols: cols };
  _setCacheJson(CACHE_KEYS.DM_NML_RAW, result, 600);
  return result;
}

function _getSettings() {
  try {
    var cached = _getCacheJson(CACHE_KEYS.SETTINGS);
    if (cached) return cached;
    var sh = _ss().getSheetByName(SHEET_SETTINGS);
    if (!sh || sh.getLastRow() < 2) return {};
    var data = sh.getRange(2, 1, sh.getLastRow() - 1, 2).getValues();
    var map = {};
    data.forEach(function(r) { if (r[0]) map[String(r[0]).trim()] = String(r[1] == null ? '' : r[1]).trim(); });
    _setCacheJson(CACHE_KEYS.SETTINGS, map, 600);
    return map;
  } catch (e) { return {}; }
}

function _getSetting(key, def) {
  var s = _getSettings();
  return s[key] != null && s[key] !== '' ? s[key] : (def == null ? '' : def);
}

function _getWeekLabel(d) {
  d = new Date(d);
  var target = new Date(Date.UTC(d.getFullYear(), d.getMonth(), d.getDate()));
  var dayNr = (target.getUTCDay() + 6) % 7;
  target.setUTCDate(target.getUTCDate() - dayNr + 3);
  var firstThursday = new Date(Date.UTC(target.getUTCFullYear(), 0, 4));
  var diff = target.getTime() - firstThursday.getTime();
  var week = 1 + Math.round(diff / 604800000);
  return 'W' + week + '-' + target.getUTCFullYear();
}

function getLoginGroups() {
  try {
    var raw = _getSetting('LOGIN_GROUPS', '');
    return raw.split(',').map(function(s) { return s.trim(); }).filter(Boolean);
  } catch (e) { return []; }
}

function getUsersByGroup(group) {
  try {
    var cacheKey = 'USERS_BY_GROUP_' + _getCacheVersion() + '_' + String(group || '').replace(/\s+/g, '_');
    var cached = _getCacheJson(cacheKey);
    if (cached) return cached;
    var rd = _getUserRaw(), cols = rd.cols, list = [], targetGroup = String(group).trim();
    rd.rows.forEach(function(r) {
      var g = String(_cellByCol(r, cols, 'GROUP') || '').trim();
      var st = String(_cellByCol(r, cols, 'STATUS') || 'Active').trim();
      var u = _cellByCol(r, cols, 'USERNAME');
      if (g === targetGroup && st.toLowerCase() !== 'inactive' && u) {
        list.push({ username: String(u), fullName: String(_cellByCol(r, cols, 'FULL_NAME') || u) });
      }
    });
    list.sort(function(a, b) { return a.fullName.localeCompare(b.fullName, 'vi'); });
    _setCacheJson(cacheKey, list, 300);
    return list;
  } catch (e) { return []; }
}

function _userRowToInfo(row, cols) {
  var u = _cellByCol(row, cols, 'USERNAME');
  var factoryRaw = String(_cellByCol(row, cols, 'FACTORY') || '');
  var lineRaw    = String(_cellByCol(row, cols, 'LINE') || '');
  var toRaw      = String(_cellByCol(row, cols, 'TEAM') || '');
  return {
    username:   String(u),
    fullName:   String(_cellByCol(row, cols, 'FULL_NAME') || u),
    group:      String(_cellByCol(row, cols, 'GROUP') || ''),
    factory:    factoryRaw,
    line:       lineRaw,
    to:         toRaw,
    factories:  _splitMulti(factoryRaw),
    lines:      _splitMulti(lineRaw),
    tos:        _splitMulti(toRaw),
    department: String(_cellByCol(row, cols, 'DEPT') || ''),
    position:   String(_cellByCol(row, cols, 'POSITION') || ''),
    email:      String(_cellByCol(row, cols, 'EMAIL') || ''),
    phone:      String(_cellByCol(row, cols, 'PHONE') || ''),
    role:       String(_cellByCol(row, cols, 'ROLE') || 'User'),
    token: String(_cellByCol(row, cols, 'TOKEN') || ''),
    zaloChatId: String(_cellByCol(row, cols, 'ZALO_CHAT_ID') || ''),
    status: 'Active'
  };
}

function _getUserByUsername(username) {
  var rd = _getUserRaw(), cols = rd.cols, unameLower = String(username).toLowerCase();
  for (var i = 0; i < rd.rows.length; i++) {
    var u = _cellByCol(rd.rows[i], cols, 'USERNAME');
    if (String(u).toLowerCase() === unameLower) {
      var st = String(_cellByCol(rd.rows[i], cols, 'STATUS') || 'Active').toLowerCase();
      if (st === 'inactive') return null;
      return _userRowToInfo(rd.rows[i], cols);
    }
  }
  return null;
}

function loginByGroup(group, username, password, userAgent) {
  try {
    if (!group || !username || !password) return { success: false, message: 'Vui lòng nhập đầy đủ' };
    var rd = _getUserRaw(), cols = rd.cols;
    var unameLower = String(username).toLowerCase(), groupTrim = String(group).trim();
    for (var i = 0; i < rd.rows.length; i++) {
      var r = rd.rows[i];
      var u = _cellByCol(r, cols, 'USERNAME');
      if (String(u).toLowerCase() !== unameLower) continue;
      var g = String(_cellByCol(r, cols, 'GROUP') || '').trim();
      if (g !== groupTrim) return { success: false, message: 'User không thuộc nhóm này' };
      var pwd = _cellByCol(r, cols, 'PASSWORD');
      if (String(pwd) !== String(password)) return { success: false, message: 'Sai mật khẩu' };
      var st = String(_cellByCol(r, cols, 'STATUS') || 'Active').toLowerCase();
      if (st === 'inactive') return { success: false, message: 'Tài khoản đã bị khóa' };
      var userInfo = _userRowToInfo(r, cols);
      var token = _createSession(userInfo.username, userAgent || '');
      var v = getAppVersion();
      return { success: true, user: userInfo, token: token, appVersion: v.version };
    }
    return { success: false, message: 'Không tìm thấy user' };
  } catch (e) { return { success: false, message: 'Lỗi: ' + e.toString() }; }
}

function _genRandomPassword(len) {
  len = len || 10;
  var chars = 'ABCDEFGHJKLMNPQRSTUVWXYZabcdefghijkmnpqrstuvwxyz23456789', out = '';
  for (var i = 0; i < len; i++) out += chars.charAt(Math.floor(Math.random() * chars.length));
  return out;
}

function _isValidEmail(email) { return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(String(email || '').trim()); }

function registerUser(data) {
  try {
    if (!data) return { success: false, message: 'Thiếu dữ liệu' };
    var username = String(data.username || '').trim();
    var fullName = String(data.fullName || '').trim();
    var email    = String(data.email    || '').trim().toLowerCase();
    var group    = String(data.group    || '').trim();
    var factory  = String(data.factory  || '').trim();
    var line     = String(data.line     || '').trim();
    var to       = String(data.to       || '').trim();
    var phone    = String(data.phone    || '').trim();

    var groupLower = group.toLowerCase();
    var isVpGroup  = (groupLower === 'vp chuỗi' || groupLower === 'vp chuoi' ||
                      groupLower === 'vp khu vực' || groupLower === 'vp khu vuc');

    if (isVpGroup) { factory = ''; line = ''; to = ''; }
    else {
      factory = group;
      if (!line) return { success: false, message: 'Vui lòng chọn Line' };
      if (!to)   return { success: false, message: 'Vui lòng chọn Tổ' };
    }

    if (!username) return { success: false, message: 'Vui lòng nhập tên đăng nhập' };
    if (!/^[a-zA-Z0-9._-]{3,30}$/.test(username)) return { success: false, message: 'Username 3-30 ký tự, chỉ chữ/số/._-' };
    if (!fullName) return { success: false, message: 'Vui lòng nhập họ tên' };
    if (!email || !_isValidEmail(email)) return { success: false, message: 'Email không hợp lệ' };
    if (!group) return { success: false, message: 'Vui lòng chọn nhóm đăng nhập' };

    var lock = LockService.getScriptLock();
    lock.waitLock(8000);
    try {
      var sh = _sheet(SHEET_USER), rd = _readAll(sh), H = rd.headers;
      var unameLower = username.toLowerCase(), maxId = 0;
      for (var i = 0; i < rd.rows.length; i++) {
        var r = rd.rows[i];
        var u  = String(_getByKey(r, H, 'USER', 'USERNAME') || '').toLowerCase();
        var em = String(_getByKey(r, H, 'USER', 'EMAIL')    || '').toLowerCase();
        if (u === unameLower) return { success: false, message: 'Tên đăng nhập đã tồn tại' };
        if (em && em === email) return { success: false, message: 'Email đã được sử dụng' };
        var n = Number(_getByKey(r, H, 'USER', 'ID') || 0);
        if (n > maxId) maxId = n;
      }

      var newPwd = _genRandomPassword(10);
      var row = new Array(H.length).fill('');
      _setByKey(row, H, 'USER', 'ID',         maxId + 1);
      _setByKey(row, H, 'USER', 'USERNAME',   username);
      _setByKey(row, H, 'USER', 'FULL_NAME',  fullName);
      _setByKey(row, H, 'USER', 'GROUP',      group);
      _setByKey(row, H, 'USER', 'FACTORY',    factory);
      _setByKey(row, H, 'USER', 'LINE',        line);
      _setByKey(row, H, 'USER', 'TEAM',        to);
      _setByKey(row, H, 'USER', 'EMAIL',       email);
      _setByKey(row, H, 'USER', 'PHONE',       phone);
      _setByKey(row, H, 'USER', 'ROLE',        'Viewer');
      _setByKey(row, H, 'USER', 'PASSWORD',   newPwd);
      _setByKey(row, H, 'USER', 'STATUS',      'Active');
      _setByKey(row, H, 'USER', 'CREATED_AT', new Date());
      _setByKey(row, H, 'USER', 'TOKEN',       data.token || '');
      sh.appendRow(row);
      _invalidateUserCache();

      var emailSent = _sendRegistrationEmail(email, fullName, username, newPwd);
      try { _notifyAdminsNewRegistration(username, fullName, email); } catch (e) {}

      return {
        success: true, emailSent: emailSent,
        message: emailSent
          ? 'Đăng ký thành công! Mật khẩu đã gửi qua email ' + email
          : 'Đăng ký thành công nhưng gửi email thất bại. Vui lòng liên hệ admin.'
      };
    } finally { lock.releaseLock(); }
  } catch (e) { return { success: false, message: 'Lỗi: ' + e.toString() }; }
}

function _sendRegistrationEmail(email, fullName, username, password) {
  try {
    var appUrl  = ScriptApp.getService().getUrl() || '';
    var subject = '[Gemba.Pro] Tài khoản của bạn đã được tạo';
    var html =
      '<div style="font-family:Arial,sans-serif;max-width:600px;margin:0 auto;background:#f5f7fb;padding:24px">' +
        '<div style="background:#fff;border-radius:12px;padding:28px;box-shadow:0 2px 8px rgba(0,0,0,.06)">' +
          '<div style="text-align:center;margin-bottom:20px">' +
            '<img src="https://tbs-group.info/wp-content/uploads/2025/11/TBS-Group-logo.png" alt="TBS Group" style="height:48px">' +
            '<h2 style="color:#2f7d57;margin:12px 0 4px">Gemba.Pro — TBS Group</h2>' +
            '<p style="color:#94a3b8;margin:0;font-size:13px">NM SK Miền Đông</p>' +
          '</div>' +
          '<h3 style="color:#101828">Xin chào ' + fullName + ',</h3>' +
          '<p>Tài khoản Gemba.Pro của bạn đã được tạo thành công. Dưới đây là thông tin đăng nhập:</p>' +
          '<div style="background:#f4f7fb;border-radius:8px;padding:16px;margin:16px 0">' +
            '<p style="margin:6px 0"><strong>Tên đăng nhập:</strong> <code style="background:#fff;padding:3px 8px;border-radius:4px">' + username + '</code></p>' +
            '<p style="margin:6px 0"><strong>Mật khẩu tạm thời:</strong> <code style="background:#fff;padding:3px 8px;border-radius:4px;color:#e25b5b;font-weight:700">' + password + '</code></p>' +
          '</div>' +
          '<div style="background:#fff6e8;border-left:4px solid #f0b96a;padding:12px;border-radius:6px;margin:16px 0">' +
            '<strong style="color:#d48e19">⚠️ Lưu ý quan trọng:</strong>' +
            '<ul style="margin:8px 0 0;padding-left:18px;color:#5f6b7c;font-size:14px">' +
              '<li>Vui lòng <strong>đổi mật khẩu</strong> ngay sau lần đăng nhập đầu tiên.</li>' +
              '<li>Tài khoản của bạn đang ở quyền <strong>Viewer</strong> (chỉ xem).</li>' +
              '<li>Admin sẽ cấp quyền chính thức cho bạn sau khi xác minh.</li>' +
            '</ul>' +
          '</div>' +
          (appUrl ? '<div style="text-align:center;margin:20px 0"><a href="' + appUrl + '" style="display:inline-block;background:#2f7d57;color:#fff;text-decoration:none;padding:12px 28px;border-radius:8px;font-weight:600">Đăng nhập ngay</a></div>' : '') +
          '<hr style="border:none;border-top:1px solid #e5e8ed;margin:20px 0">' +
          '<p style="color:#94a3b8;font-size:12px;text-align:center;margin:0">Email này được gửi tự động. Vui lòng không trả lời.<br>© 2026 TBS Group — Gemba.Pro</p>' +
        '</div>' +
      '</div>';
    MailApp.sendEmail({ to: email, subject: subject, htmlBody: html });
    return true;
  } catch (e) { return false; }
}

function _notifyAdminsNewRegistration(username, fullName, email) {
  try {
    var rd = _getUserRaw(), cols = rd.cols;
    rd.rows.forEach(function(r) {
      var role = String(_cellByCol(r, cols, 'ROLE') || '');
      var st   = String(_cellByCol(r, cols, 'STATUS') || 'Active').toLowerCase();
      if (st === 'inactive' || role !== 'Admin') return;
      var adminUser = _cellByCol(r, cols, 'USERNAME');
      if (adminUser) {
        _createNotification(String(adminUser), { username: 'system', fullName: 'Hệ thống' }, 'info',
          'Có người dùng mới đăng ký',
          fullName + ' (' + username + ' • ' + email + ') vừa đăng ký. Vui lòng kiểm tra và cấp quyền phù hợp.', '');
      }
    });
  } catch (e) {}
}

function requestResetPassword(usernameOrEmail) {
  try {
    var key = String(usernameOrEmail || '').trim().toLowerCase();
    if (!key) return { success: false, message: 'Vui lòng nhập username hoặc email' };
    var sh = _sheet(SHEET_USER), rd = _readAll(sh), H = rd.headers;
    var iPwd = _colByKey(H, 'USER', 'PASSWORD');
    if (iPwd < 0) return { success: false, message: 'Sheet USER thiếu cột mật khẩu' };
    for (var i = 0; i < rd.rows.length; i++) {
      var r  = rd.rows[i];
      var u  = String(_getByKey(r, H, 'USER', 'USERNAME') || '').toLowerCase();
      var em = String(_getByKey(r, H, 'USER', 'EMAIL')    || '').toLowerCase();
      if (u === key || (em && em === key)) {
        var emailAddr = String(_getByKey(r, H, 'USER', 'EMAIL') || '').trim();
        if (!emailAddr) return { success: false, message: 'Tài khoản chưa có email. Liên hệ admin.' };
        var fullName = String(_getByKey(r, H, 'USER', 'FULL_NAME') || u);
        var newPwd   = _genRandomPassword(10);
        sh.getRange(i + 2, iPwd + 1).setValue(newPwd);
        _invalidateUserCache();
        var ok = _sendRegistrationEmail(emailAddr, fullName, String(_getByKey(r, H, 'USER', 'USERNAME')), newPwd);
        return { success: true, message: ok ? 'Mật khẩu mới đã gửi tới email ' + emailAddr : 'Đã đặt lại mật khẩu nhưng gửi email thất bại. Liên hệ admin.' };
      }
    }
    return { success: false, message: 'Không tìm thấy tài khoản' };
  } catch (e) { return { success: false, message: e.toString() }; }
}

function changePassword(username, oldPwd, newPwd) {
  try {
    if (!username || !oldPwd || !newPwd) return { success: false, message: 'Thiếu thông tin' };
    if (String(newPwd).length < 6) return { success: false, message: 'Mật khẩu mới ≥ 6 ký tự' };
    var sh = _sheet(SHEET_USER), rd = _readAll(sh), H = rd.headers;
    var iPwd = _colByKey(H, 'USER', 'PASSWORD');
    if (iPwd < 0) return { success: false, message: 'Sheet USER thiếu cột MẬT KHẨU' };
    for (var i = 0; i < rd.rows.length; i++) {
      var u = _getByKey(rd.rows[i], H, 'USER', 'USERNAME');
      if (String(u).toLowerCase() === String(username).toLowerCase()) {
        var curPwd = _getByKey(rd.rows[i], H, 'USER', 'PASSWORD');
        if (String(curPwd) !== String(oldPwd)) return { success: false, message: 'Mật khẩu cũ không đúng' };
        sh.getRange(i + 2, iPwd + 1).setValue(newPwd);
        _invalidateUserCache();
        return { success: true };
      }
    }
    return { success: false, message: 'Không tìm thấy user' };
  } catch (e) { return { success: false, message: e.toString() }; }
}

function getUserList() {
  try {
    var rd = _getUserRaw(), cols = rd.cols;
    return rd.rows.filter(function(r) { return _cellByCol(r, cols, 'USERNAME'); }).map(function(r) {
      return {
        id:         _cellByCol(r, cols, 'ID'),
        username:   _cellByCol(r, cols, 'USERNAME'),
        fullName:   _cellByCol(r, cols, 'FULL_NAME'),
        group:      _cellByCol(r, cols, 'GROUP'),
        factory:    _cellByCol(r, cols, 'FACTORY'),
        line:       _cellByCol(r, cols, 'LINE'),
        to:         _cellByCol(r, cols, 'TEAM'),
        department: _cellByCol(r, cols, 'DEPT'),
        position:   _cellByCol(r, cols, 'POSITION'),
        email:      _cellByCol(r, cols, 'EMAIL'),
        phone:      _cellByCol(r, cols, 'PHONE'),
        role:       _cellByCol(r, cols, 'ROLE'),
        token:      _cellByCol(r, cols, 'TOKEN') || '',
        zaloChatId: _cellByCol(r, cols, 'ZALO_CHAT_ID') || '',
        status:     _cellByCol(r, cols, 'STATUS') || 'Active'
      };
    });
  } catch (e) { return []; }
}

function addNewUser(data) {
  try {
    if (!data || !data.username || !data.fullName) return { success: false, message: 'Thiếu username/họ tên' };
    var lock = LockService.getScriptLock();
    lock.waitLock(5000);
    try {
      var sh = _sheet(SHEET_USER), rd = _readAll(sh), H = rd.headers;
      var unameLower = String(data.username).toLowerCase(), maxId = 0, exists = false;
      for (var i = 0; i < rd.rows.length; i++) {
        var r = rd.rows[i];
        if (String(_getByKey(r, H, 'USER', 'USERNAME')).toLowerCase() === unameLower) { exists = true; break; }
        var n = Number(_getByKey(r, H, 'USER', 'ID') || 0);
        if (n > maxId) maxId = n;
      }
      if (exists) return { success: false, message: 'Username đã tồn tại' };

      var row = new Array(H.length).fill('');
      _setByKey(row, H, 'USER', 'ID',         maxId + 1);
      _setByKey(row, H, 'USER', 'USERNAME',   data.username);
      _setByKey(row, H, 'USER', 'FULL_NAME',  data.fullName);
      _setByKey(row, H, 'USER', 'GROUP',      data.group      || '');
      _setByKey(row, H, 'USER', 'FACTORY',    data.factory    || '');
      _setByKey(row, H, 'USER', 'LINE',        data.line       || '');
      _setByKey(row, H, 'USER', 'TEAM',        data.to         || '');
      _setByKey(row, H, 'USER', 'DEPT',        data.department || '');
      _setByKey(row, H, 'USER', 'POSITION',   data.position   || '');
      _setByKey(row, H, 'USER', 'EMAIL',       data.email      || '');
      _setByKey(row, H, 'USER', 'PHONE',       data.phone      || '');
      _setByKey(row, H, 'USER', 'ROLE',        data.role       || 'Nhân viên');
      _setByKey(row, H, 'USER', 'PASSWORD',   data.password   || '123456');
      _setByKey(row, H, 'USER', 'STATUS',      data.status     || 'Active');
      _setByKey(row, H, 'USER', 'CREATED_AT', new Date());
      sh.appendRow(row);
      _invalidateUserCache();
      return { success: true };
    } finally { lock.releaseLock(); }
  } catch (e) { return { success: false, message: e.toString() }; }
}

/* ════════════════════════════════════════════════════════════
   updateUser — TỐI ƯU
   - GROUP (Nhóm đăng nhập) và DEPT (Phòng ban) là 2 trường ĐỘC LẬP
   - Xoá cache đúng cách + trả về bản ghi user mới nhất
════════════════════════════════════════════════════════════ */
function updateUser(data) {
  try {
    if (!data || !data.username) return { success: false, message: 'Thiếu username' };
    var sh = _sheet(SHEET_USER), rd = _readAll(sh), H = rd.headers;
    var unameLower = String(data.username).toLowerCase();
    for (var i = 0; i < rd.rows.length; i++) {
      var u = _getByKey(rd.rows[i], H, 'USER', 'USERNAME');
      if (String(u).toLowerCase() !== unameLower) continue;

      var realRow   = i + 2;
      var rowValues = sh.getRange(realRow, 1, 1, H.length).getValues()[0];

      function setC(fieldKey, val) {
        if (val === undefined || val === null) return;
        _setByKey(rowValues, H, 'USER', fieldKey, val);
      }

      setC('FULL_NAME', data.fullName);
      setC('GROUP',     data.group);        // Nhóm đăng nhập — độc lập
      setC('FACTORY',   data.factory);
      setC('LINE',      data.line);
      setC('TEAM',      data.to);
      setC('DEPT',      data.department);    // Phòng ban — độc lập, KHÔNG ảnh hưởng GROUP
      setC('POSITION',  data.position);
      setC('EMAIL',     data.email);
      setC('PHONE',     data.phone);
      setC('ROLE',      data.role);
      setC('STATUS',    data.status);
      if (data.password && String(data.password).trim()) setC('PASSWORD', data.password);
      if (data.token !== undefined) setC('TOKEN', data.token);

      sh.getRange(realRow, 1, 1, rowValues.length).setValues([rowValues]);

      _invalidateUserCache();

      var updatedUser = _userRowToInfo(rowValues, _buildColMap(H, 'USER'));
      return { success: true, user: updatedUser };
    }
    return { success: false, message: 'Không tìm thấy user' };
  } catch (e) { return { success: false, message: e.toString() }; }
}

function deleteUser(username) {
  try {
    var sh = _sheet(SHEET_USER), rd = _readAll(sh), H = rd.headers;
    var unameLower = String(username).toLowerCase();
    for (var i = 0; i < rd.rows.length; i++) {
      var u = _getByKey(rd.rows[i], H, 'USER', 'USERNAME');
      if (String(u).toLowerCase() === unameLower) { sh.deleteRow(i + 2); _invalidateUserCache(); return { success: true }; }
    }
    return { success: false, message: 'Không tìm thấy user' };
  } catch (e) { return { success: false, message: e.toString() }; }
}

function importUsersBatch(list) {
  try {
    if (!list || !list.length) return { success: false, message: 'Không có dữ liệu để import' };
    if (list.length > 500)     return { success: false, message: 'Tối đa 500 dòng mỗi lần import' };
    var lock = LockService.getScriptLock();
    lock.waitLock(15000);
    try {
      var sh = _sheet(SHEET_USER), rd = _readAll(sh), H = rd.headers;
      var iUser = _colByKey(H, 'USER', 'USERNAME'), iName = _colByKey(H, 'USER', 'FULL_NAME');
      if (iUser < 0 || iName < 0) return { success: false, message: 'Sheet USER thiếu cột USERNAME hoặc HỌ VÀ TÊN' };

      var existedUsernameMap = {}, existedEmailMap = {}, maxId = 0;
      rd.rows.forEach(function(r) {
        var u  = String(_getByKey(r, H, 'USER', 'USERNAME') || '').toLowerCase().trim();
        var em = String(_getByKey(r, H, 'USER', 'EMAIL')    || '').toLowerCase().trim();
        var n  = Number(_getByKey(r, H, 'USER', 'ID')       || 0);
        if (u)  existedUsernameMap[u]  = true;
        if (em) existedEmailMap[em]    = true;
        if (n > maxId) maxId = n;
      });

      var rowsToAppend = [], added = 0, skipped = 0, errors = [], now = new Date();
      list.forEach(function(data, idx) {
        var rowNum   = idx + 2;
        var username = String(data.username || '').trim();
        var fullName = String(data.fullName || '').trim();
        if (!username || !fullName) { errors.push('Dòng ' + rowNum + ': Thiếu username hoặc họ tên → bỏ qua'); skipped++; return; }
        if (!/^[a-zA-Z0-9._-]{3,30}$/.test(username)) { errors.push('Dòng ' + rowNum + ' (' + username + '): Username không hợp lệ → bỏ qua'); skipped++; return; }
        if (existedUsernameMap[username.toLowerCase()]) { errors.push('Dòng ' + rowNum + ' (' + username + '): Username đã tồn tại → bỏ qua'); skipped++; return; }

        var email = String(data.email || '').trim().toLowerCase();
        if (email) {
          if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) { errors.push('Dòng ' + rowNum + ' (' + username + '): Email không hợp lệ → bỏ qua email'); email = ''; }
          else if (existedEmailMap[email]) { errors.push('Dòng ' + rowNum + ' (' + username + '): Email đã được dùng → bỏ qua'); skipped++; return; }
        }

        var allowedRoles = ['Admin', 'Tổng Giám đốc', 'Giám đốc', 'Trưởng Line', 'Tổ trưởng', 'Nhân viên', 'Viewer'];
        var role = String(data.role || 'Nhân viên').trim();
        if (allowedRoles.indexOf(role) < 0) { errors.push('Dòng ' + rowNum + ' (' + username + '): Role "' + role + '" không hợp lệ → dùng "Nhân viên"'); role = 'Nhân viên'; }

        var status = String(data.status || 'Active').trim();
        if (status !== 'Active' && status !== 'Inactive') status = 'Active';

        existedUsernameMap[username.toLowerCase()] = true;
        if (email) existedEmailMap[email] = true;
        maxId++;

        var row = new Array(H.length).fill('');
        _setByKey(row, H, 'USER', 'ID',         maxId);
        _setByKey(row, H, 'USER', 'USERNAME',   username);
        _setByKey(row, H, 'USER', 'FULL_NAME',  fullName);
        _setByKey(row, H, 'USER', 'GROUP',      String(data.group      || '').trim());
        _setByKey(row, H, 'USER', 'FACTORY',    String(data.factory    || '').trim());
        _setByKey(row, H, 'USER', 'LINE',        String(data.line       || '').trim());
        _setByKey(row, H, 'USER', 'TEAM',        String(data.to         || '').trim());
        _setByKey(row, H, 'USER', 'DEPT',        String(data.department || '').trim());
        _setByKey(row, H, 'USER', 'POSITION',   String(data.position   || '').trim());
        _setByKey(row, H, 'USER', 'EMAIL',       email);
        _setByKey(row, H, 'USER', 'PHONE',       String(data.phone      || '').trim());
        _setByKey(row, H, 'USER', 'ROLE',        role);
        _setByKey(row, H, 'USER', 'PASSWORD',   String(data.password   || '123456').trim());
        _setByKey(row, H, 'USER', 'STATUS',      status);
        _setByKey(row, H, 'USER', 'CREATED_AT', now);
        _setByKey(row, H, 'USER', 'TOKEN',       String(data.token      || '').trim());
        rowsToAppend.push(row);
        added++;
      });

      if (rowsToAppend.length) { var startRow = sh.getLastRow() + 1; sh.getRange(startRow, 1, rowsToAppend.length, H.length).setValues(rowsToAppend); }
      _invalidateUserCache();
      return { success: true, added: added, skipped: skipped, total: list.length, errors: errors, message: 'Import xong: thêm ' + added + ', bỏ qua ' + skipped + '/' + list.length + ' dòng.' };
    } finally { lock.releaseLock(); }
  } catch (e) { return { success: false, message: 'Lỗi: ' + e.toString() }; }
}

function getAppMetadata() {
  try {
    var cached = _getCacheJson(CACHE_KEYS.METADATA);
    if (cached) return cached;

    var ss = _ss(), factories = {}, linesByFactory = {}, toByLine = {};
    var rdNML = _getDmNmlRaw();
    if (rdNML.rows && rdNML.rows.length) {
      var cols = rdNML.cols;
      rdNML.rows.forEach(function(r) {
        var st = String(_cellByCol(r, cols, 'STATUS') || 'Active');
        if (st.toLowerCase() === 'inactive') return;
        var fac = String(_cellByCol(r, cols, 'FACTORY') || '').trim();
        var ln  = String(_cellByCol(r, cols, 'LINE')    || '').trim();
        var to  = String(_cellByCol(r, cols, 'TEAM')    || '').trim();
        if (!fac) return;
        factories[fac] = true;
        if (ln) {
          if (!linesByFactory[fac]) linesByFactory[fac] = {};
          linesByFactory[fac][ln] = true;
          var key = fac + '||' + ln;
          if (!toByLine[key]) toByLine[key] = {};
          if (to) toByLine[key][to] = true;
        }
      });
    }

    var facList = Object.keys(factories).sort();
    var linesByFactoryArr = {};
    Object.keys(linesByFactory).forEach(function(f) { linesByFactoryArr[f] = Object.keys(linesByFactory[f]).sort(); });
    var toByLineArr = {};
    Object.keys(toByLine).forEach(function(k) { toByLineArr[k] = Object.keys(toByLine[k]).sort(); });

    var issueCategories = [], issuesByCategory = {};
    var sLoai = ss.getSheetByName(SHEET_DM_LOAI);
    if (sLoai && sLoai.getLastRow() > 1) {
      var rd2 = _readAll(sLoai), H2 = rd2.headers, seenCodes = {};
      rd2.rows.forEach(function(r) {
        var st   = String(_getByKey(r, H2, 'DM_LOAI', 'STATUS') || 'Active');
        if (st.toLowerCase() === 'inactive') return;
        var code = String(_getByKey(r, H2, 'DM_LOAI', 'CODE') || '').trim();
        var name = String(_getByKey(r, H2, 'DM_LOAI', 'NAME') || '').trim();
        if (!code) return;
        if (!seenCodes[code]) { seenCodes[code] = true; issueCategories.push({ code: code, name: code }); }
        if (!issuesByCategory[code]) issuesByCategory[code] = [];
        if (name) issuesByCategory[code].push({ name: name });
      });
    }

    var s = _getSettings();
    var sla = {
      Low:      parseInt(s.SLA_DAYS_LOW      || '14', 10),
      Medium:   parseInt(s.SLA_DAYS_MEDIUM   || '7',  10),
      High:     parseInt(s.SLA_DAYS_HIGH     || '3',  10),
      Critical: parseInt(s.SLA_DAYS_CRITICAL || '1',  10),
      Default:  parseInt(s.SLA_DAYS          || '2',  10)
    };

    var result = {
      factories: facList, linesByFactory: linesByFactoryArr, toByLine: toByLineArr,
      gembaTypes: issueCategories, issueCategories: issueCategories, issuesByCategory: issuesByCategory,
      priorities: ['Low', 'Medium', 'High', 'Critical'],
      statuses:   [STATUS.NEW, STATUS.REOPEN, STATUS.PROCESSING, STATUS.DONE, STATUS.REJECTED],
      sla: sla, loginGroups: getLoginGroups(),
      branding: getBranding(),
      departments: _getSetting('DEPARTMENTS', '').split(',').map(function(s){return s.trim();}).filter(Boolean),
      positions:   _getSetting('POSITIONS', '').split(',').map(function(s){return s.trim();}).filter(Boolean)
    };
    _setCacheJson(CACHE_KEYS.METADATA, result, 600);
    return result;
  } catch (e) {
    return { factories: [], linesByFactory: {}, toByLine: {}, gembaTypes: [], issueCategories: [], issuesByCategory: {}, priorities: ['Low', 'Medium', 'High', 'Critical'], statuses: [STATUS.NEW, STATUS.REOPEN, STATUS.PROCESSING, STATUS.DONE, STATUS.REJECTED], sla: {} };
  }
}

function getAssigneeByLineTo(factory, line, to) {
  try {
    var rdNML = _getDmNmlRaw();
    if (!rdNML.rows || !rdNML.rows.length) return null;
    var cols = rdNML.cols, facTrim = String(factory).trim(), lnTrim = String(line).trim(), toTrim = String(to).trim(), assigneeUsername = '';
    for (var i = 0; i < rdNML.rows.length; i++) {
      var r  = rdNML.rows[i];
      var st = String(_cellByCol(r, cols, 'STATUS') || 'Active').toLowerCase();
      if (st === 'inactive') continue;
      if (String(_cellByCol(r, cols, 'FACTORY') || '').trim() === facTrim &&
          String(_cellByCol(r, cols, 'LINE')    || '').trim() === lnTrim  &&
          String(_cellByCol(r, cols, 'TEAM')    || '').trim() === toTrim) {
        var ass = String(_cellByCol(r, cols, 'ASSIGNEE') || '').trim();
        var bk  = String(_cellByCol(r, cols, 'ASSIGNEE_BACKUP') || '').trim();
        assigneeUsername = ass || bk;
        break;
      }
    }
    if (!assigneeUsername) {
      var s = _getSettings(), keyFac = String(factory).replace(/\s+/g, '').toUpperCase();
      var keyCandidates = ['DEFAULT_MANAGER_' + keyFac, 'DEFAULT_MANAGER_NM1', 'DEFAULT_MANAGER_NM2'];
      for (var k = 0; k < keyCandidates.length; k++) { if (s[keyCandidates[k]]) { assigneeUsername = s[keyCandidates[k]]; break; } }
    }
    if (!assigneeUsername) return null;
    var user = _getUserByUsername(assigneeUsername);
    if (user) return { username: user.username, fullName: user.fullName };
    return { username: assigneeUsername, fullName: assigneeUsername };
  } catch (e) { return null; }
}

function _canViewRow(user, row, cols) {
  if (!user) return false;
  var role = String(user.role || '');

  if (role === 'Admin' || role === 'Tổng Giám đốc' || role === 'Giám đốc') return true;

  if (role === 'Trưởng Line' || role === 'Tổ trưởng' || role === 'Viewer') {
    var rowFac  = _cellByCol(row, cols, 'FACTORY');
    var rowLine = _cellByCol(row, cols, 'LINE');
    var rowTo   = _cellByCol(row, cols, 'TEAM');
    if (!_scopeMatch(user.factory, rowFac))  return false;
    if (!_scopeMatch(user.line,    rowLine)) return false;
    if (!_scopeMatch(user.to,      rowTo))   return false;
    return true;
  }

  var creator  = String(_cellByCol(row, cols, 'CREATOR_USER')  || '').toLowerCase();
  var assignee = String(_cellByCol(row, cols, 'ASSIGNEE_USER') || '').toLowerCase();
  var me = String(user.username).toLowerCase();
  return creator === me || assignee === me;
}

function _genGembaIdLocked(sh) {
  if (sh.getLastRow() < 2) return 'GB-' + new Date().getFullYear() + '-0001';
  var rd = _readAll(sh), H = rd.headers, year = new Date().getFullYear(), maxSeq = 0;
  rd.rows.forEach(function(r) {
    var id = String(_getByKey(r, H, 'GEMBA', 'ID') || '').trim();
    var m = id.match(/^GB-(\d{4})-(\d{4,})$/);
    if (m && Number(m[1]) === year) maxSeq = Math.max(maxSeq, Number(m[2]));
  });
  return 'GB-' + year + '-' + String(maxSeq + 1).padStart(4, '0');
}

function _computeOverdue(statusVi, createdAt, priority, sla, startedAt) {
  if (_isClosed(statusVi)) return statusVi;
  var baseDate;
  if (statusVi === STATUS.PROCESSING && startedAt) baseDate = new Date(startedAt);
  else if (createdAt) baseDate = new Date(createdAt);
  else return statusVi;
  if (isNaN(baseDate.getTime())) return statusVi;
  var days = (sla && (sla[priority] || sla.Default)) || 7;
  var deadline = new Date(baseDate.getTime() + days * 86400000);
  if (new Date() > deadline) return STATUS.OVERDUE;
  return statusVi;
}

function _rowToObjFast(row, cols, sla) {
  var status    = _cellByCol(row, cols, 'STATUS') || STATUS.NEW;
  var createdAt = _cellByCol(row, cols, 'CREATED_AT');
  var startedAt = _cellByCol(row, cols, 'STARTED_AT');
  var priority  = _cellByCol(row, cols, 'PRIORITY') || 'Medium';
  var displayStatus = _computeOverdue(status, createdAt, priority, sla, startedAt);
  return {
    id:               _safeStr(_cellByCol(row, cols, 'ID')),
    status:           displayStatus,
    realStatus:       status,
    priority:         priority,
    createdDate:      _safeDate(_cellByCol(row, cols, 'RECORDED_DATE')),
    week:             _safeStr(_cellByCol(row, cols, 'WEEK')),
    factory:          _safeStr(_cellByCol(row, cols, 'FACTORY')),
    line:             _safeStr(_cellByCol(row, cols, 'LINE')),
    to:               _safeStr(_cellByCol(row, cols, 'TEAM')),
    location:         _safeStr(_cellByCol(row, cols, 'LOCATION')),
    typeCode:         _safeStr(_cellByCol(row, cols, 'TYPE_CODE')),
    issueName:        _safeStr(_cellByCol(row, cols, 'ISSUE_NAME')),
    title:            _safeStr(_cellByCol(row, cols, 'TITLE')),
    description:      _safeStr(_cellByCol(row, cols, 'DESCRIPTION')),
    productCode:      _safeStr(_cellByCol(row, cols, 'PRODUCT_CODE')),
    proposal:         _safeStr(_cellByCol(row, cols, 'PROPOSAL')),
    imagesBefore:     _safeStr(_cellByCol(row, cols, 'IMG_BEFORE')),
    video:            _safeStr(_cellByCol(row, cols, 'VIDEO')),
    files:            _safeStr(_cellByCol(row, cols, 'FILES')),
    creatorUsername:  _safeStr(_cellByCol(row, cols, 'CREATOR_USER')),
    creatorFullName:  _safeStr(_cellByCol(row, cols, 'CREATOR_NAME')),
    assigneeUsername: _safeStr(_cellByCol(row, cols, 'ASSIGNEE_USER')),
    assigneeFullName: _safeStr(_cellByCol(row, cols, 'ASSIGNEE_NAME')),
    createdAt:        _safeDate(createdAt),
    startedAt:        _safeDate(startedAt),
    result:           _safeStr(_cellByCol(row, cols, 'RESULT')),
    imagesAfter:      _safeStr(_cellByCol(row, cols, 'IMG_AFTER')),
    completedAt:      _safeDate(_cellByCol(row, cols, 'COMPLETED_AT')),
    processHours:     _cellByCol(row, cols, 'PROCESS_HOURS') || 0,
    rejectReason:     _safeStr(_cellByCol(row, cols, 'REJECT_REASON'))
  };
}

function _logHistory(gembaId, action, fromStatus, toStatus, user, note) {
  try {
    var ss = _ss(), sh = ss.getSheetByName(SHEET_LICHSU);
    if (!sh) {
      sh = ss.insertSheet(SHEET_LICHSU);
      sh.appendRow(['LOG ID', 'GEMBA ID', 'HÀNH ĐỘNG', 'TRẠNG THÁI TRƯỚC', 'TRẠNG THÁI SAU', 'NGƯỜI THỰC HIỆN (USERNAME)', 'NGƯỜI THỰC HIỆN (HỌ TÊN)', 'THỜI GIAN', 'GHI CHÚ / BÌNH LUẬN']);
      sh.getRange(1, 1, 1, 9).setFontWeight('bold').setBackground('#f4f7fb');
      sh.setFrozenRows(1);
    }
    var H   = sh.getRange(1, 1, 1, sh.getLastColumn()).getValues()[0];
    var row = new Array(H.length).fill('');
    var logId = 'L-' + new Date().getTime() + '-' + Math.floor(Math.random() * 10000);
    _setByKey(row, H, 'LICHSU', 'LOG_ID',      logId);
    _setByKey(row, H, 'LICHSU', 'GEMBA_ID',    gembaId);
    _setByKey(row, H, 'LICHSU', 'ACTION',       action);
    _setByKey(row, H, 'LICHSU', 'FROM_STATUS', fromStatus || '');
    _setByKey(row, H, 'LICHSU', 'TO_STATUS',   toStatus   || '');
    _setByKey(row, H, 'LICHSU', 'USER',         (user && user.username) || '');
    _setByKey(row, H, 'LICHSU', 'NAME',         (user && user.fullName) || '');
    _setByKey(row, H, 'LICHSU', 'TIMESTAMP',   new Date());
    _setByKey(row, H, 'LICHSU', 'NOTE',         note || '');
    sh.appendRow(row);
  } catch (e) {}
}

function _buildDriveDirectUrl(fileId) { return 'https://drive.google.com/thumbnail?id=' + fileId + '&sz=w1600'; }
function _buildDriveViewUrl(fileId)   { return 'https://drive.google.com/file/d/' + fileId + '/view'; }

function _uploadFiles(files, folderId) {
  if (!files || !files.length || !folderId) return { urls: [], fileIds: [] };
  try {
    var folder = DriveApp.getFolderById(folderId), urls = [], fileIds = [];
    files.forEach(function(f) {
      try {
        var blob = Utilities.newBlob(Utilities.base64Decode(f.data), f.type || MimeType.PLAIN_TEXT, f.name || ('file_' + new Date().getTime()));
        var file = folder.createFile(blob);
        try { file.setSharing(DriveApp.Access.ANYONE_WITH_LINK, DriveApp.Permission.VIEW); } catch (e1) {}
        var fileId = file.getId();
        fileIds.push(fileId);
        var mime = String(file.getMimeType() || '').toLowerCase();
        urls.push(mime.indexOf('image/') === 0 ? _buildDriveDirectUrl(fileId) : _buildDriveViewUrl(fileId));
      } catch (e) {}
    });
    return { urls: urls, fileIds: fileIds };
  } catch (e) { return { urls: [], fileIds: [] }; }
}

function _rollbackFiles(fileIds) {
  if (!fileIds || !fileIds.length) return;
  fileIds.forEach(function(id) { try { DriveApp.getFileById(id).setTrashed(true); } catch (e) {} });
}

function getGembaList(params) {
  try {
    params = params || {};
    var user = params.user || null;
    var rd   = _getGembaRaw();
    if (!rd.rows.length) return [];
    var cols = rd.cols, meta = getAppMetadata(), sla = meta.sla, list = [];
    for (var i = 0; i < rd.rows.length; i++) {
      var r = rd.rows[i];
      if (!_cellByCol(r, cols, 'ID')) continue;
      if (user && !_canViewRow(user, r, cols)) continue;
      list.push(_rowToObjFast(r, cols, sla));
    }
    list.sort(function(a, b) { return (new Date(b.createdAt).getTime() || 0) - (new Date(a.createdAt).getTime() || 0); });
    return list;
  } catch (e) { return []; }
}

function getGembaById(id) {
  try {
    var rd = _getGembaRaw();
    if (!rd.rows.length) return null;
    var cols = rd.cols, idStr = String(id).trim(), meta = getAppMetadata();
    for (var i = 0; i < rd.rows.length; i++) {
      if (String(_cellByCol(rd.rows[i], cols, 'ID')).trim() === idStr) return _rowToObjFast(rd.rows[i], cols, meta.sla);
    }
    return null;
  } catch (e) { return null; }
}

function getGembaHistory(id) {
  try {
    var sh = _ss().getSheetByName(SHEET_LICHSU);
    if (!sh || sh.getLastRow() < 2) return [];
    var rd = _readAll(sh), H = rd.headers, cols = _buildColMap(H, 'LICHSU'), idStr = String(id).trim(), list = [];
    rd.rows.forEach(function(r) {
      if (String(_cellByCol(r, cols, 'GEMBA_ID')).trim() !== idStr) return;
      var ts = _cellByCol(r, cols, 'TIMESTAMP');
      list.push({ action: _cellByCol(r, cols, 'ACTION'), fromStatus: _cellByCol(r, cols, 'FROM_STATUS'), toStatus: _cellByCol(r, cols, 'TO_STATUS'), username: _cellByCol(r, cols, 'USER'), fullName: _cellByCol(r, cols, 'NAME'), timestamp: ts instanceof Date ? ts.toISOString() : ts, note: _cellByCol(r, cols, 'NOTE') });
    });
    list.sort(function(a, b) { return new Date(b.timestamp).getTime() - new Date(a.timestamp).getTime(); });
    return list;
  } catch (e) { return []; }
}
function createGemba(payload) {
  var uploadedFileIds = [];

  try {
    /* =========================================================
       1. VALIDATE
    ========================================================= */

    if (!payload) {
      return {
        success: false,
        message: 'Thiếu dữ liệu'
      };
    }

    if (!payload.factory || !payload.line || !payload.to) {
      return {
        success: false,
        message: 'Thiếu Nhà máy / Line / Tổ'
      };
    }

    if (!payload.typeCode) {
      return {
        success: false,
        message: 'Thiếu Mã vấn đề'
      };
    }

    if (!payload.title) {
      return {
        success: false,
        message: 'Thiếu Vấn đề ghi nhận'
      };
    }

    if (!payload.description) {
      return {
        success: false,
        message: 'Thiếu Mô tả'
      };
    }

    if (
      !payload.imagesBefore ||
      !payload.imagesBefore.length
    ) {
      return {
        success: false,
        message: 'Bắt buộc upload ít nhất 1 ảnh Before'
      };
    }

    if (
      !payload.creator ||
      !payload.creator.username
    ) {
      return {
        success: false,
        message: 'Thiếu thông tin người tạo'
      };
    }


    /* =========================================================
       2. SETTINGS + UPLOAD FILE
    ========================================================= */

    var s = _getSettings();

    var folderImg =
      s.FOLDER_IMG_ID || '';

    var folderDoc =
      s.FOLDER_DOC_ID || '';


    // Ảnh Before
    var imgBeforeResult =
      _uploadFiles(
        payload.imagesBefore,
        folderImg
      );

    uploadedFileIds =
      uploadedFileIds.concat(
        imgBeforeResult.fileIds || []
      );

    if (
      !imgBeforeResult.urls ||
      !imgBeforeResult.urls.length
    ) {
      return {
        success: false,
        message: 'Upload ảnh Before thất bại'
      };
    }


    // Video
    var videoResult = {
      urls: [],
      fileIds: []
    };

    if (
      payload.video &&
      payload.video.length
    ) {
      videoResult =
        _uploadFiles(
          payload.video,
          folderImg
        );

      uploadedFileIds =
        uploadedFileIds.concat(
          videoResult.fileIds || []
        );
    }


    // File đính kèm
    var filesResult = {
      urls: [],
      fileIds: []
    };

    if (
      payload.files &&
      payload.files.length
    ) {
      filesResult =
        _uploadFiles(
          payload.files,
          folderDoc
        );

      uploadedFileIds =
        uploadedFileIds.concat(
          filesResult.fileIds || []
        );
    }


    /* =========================================================
       3. XÁC ĐỊNH NGƯỜI PHỤ TRÁCH
    ========================================================= */

    var assignee = null;


    // Nếu frontend chỉ định người phụ trách
    if (payload.assigneeUsername) {

      var selectedUser =
        _getUserByUsername(
          payload.assigneeUsername
        );

      if (selectedUser) {
        assignee = {
          username:
            selectedUser.username,

          fullName:
            selectedUser.fullName
        };
      }
    }


    // Nếu chưa có → tự động lấy theo Nhà máy / Line / Tổ
    if (!assignee) {

      assignee =
        getAssigneeByLineTo(
          payload.factory,
          payload.line,
          payload.to
        );
    }


    if (!assignee) {

      _rollbackFiles(
        uploadedFileIds
      );

      return {
        success: false,
        message:
          'Không tìm thấy người phụ trách cho Tổ này.'
      };
    }


    /* =========================================================
       4. TẠO GEMBA
    ========================================================= */

    var lock =
      LockService.getScriptLock();

    lock.waitLock(10000);

    var newId = '';

    try {

      var sh =
        _sheet(SHEET_GEMBA);

      var H =
        sh
          .getRange(
            1,
            1,
            1,
            sh.getLastColumn()
          )
          .getValues()[0];


      // Generate ID trong lock
      newId =
        _genGembaIdLocked(sh);


      var now =
        new Date();


      var ngayGhiNhan =
        payload.createdDate
          ? new Date(payload.createdDate)
          : now;


      var week =
        _getWeekLabel(
          ngayGhiNhan
        );


      var row =
        new Array(H.length).fill('');


      var K = 'GEMBA';


      /* =======================================================
         SET DATA
      ======================================================= */

      _setByKey(
        row,
        H,
        K,
        'ID',
        newId
      );


      _setByKey(
        row,
        H,
        K,
        'STATUS',
        STATUS.NEW
      );


      _setByKey(
        row,
        H,
        K,
        'PRIORITY',
        payload.priority || 'Medium'
      );


      _setByKey(
        row,
        H,
        K,
        'RECORDED_DATE',
        ngayGhiNhan
      );


      _setByKey(
        row,
        H,
        K,
        'WEEK',
        week
      );


      _setByKey(
        row,
        H,
        K,
        'FACTORY',
        payload.factory
      );


      _setByKey(
        row,
        H,
        K,
        'LINE',
        payload.line
      );


      _setByKey(
        row,
        H,
        K,
        'TEAM',
        payload.to
      );


      _setByKey(
        row,
        H,
        K,
        'LOCATION',
        payload.location || ''
      );


      _setByKey(
        row,
        H,
        K,
        'TYPE_CODE',
        payload.typeCode
      );


      _setByKey(
        row,
        H,
        K,
        'ISSUE_NAME',
        payload.issueName || ''
      );


      _setByKey(
        row,
        H,
        K,
        'TITLE',
        payload.title
      );


      _setByKey(
        row,
        H,
        K,
        'DESCRIPTION',
        payload.description
      );


      _setByKey(
        row,
        H,
        K,
        'PRODUCT_CODE',
        payload.productCode || ''
      );


      _setByKey(
        row,
        H,
        K,
        'PROPOSAL',
        payload.proposal || ''
      );


      _setByKey(
        row,
        H,
        K,
        'IMG_BEFORE',
        imgBeforeResult.urls.join('|')
      );


      _setByKey(
        row,
        H,
        K,
        'VIDEO',
        (videoResult.urls || []).join('|')
      );


      _setByKey(
        row,
        H,
        K,
        'FILES',
        (filesResult.urls || []).join('|')
      );


      _setByKey(
        row,
        H,
        K,
        'CREATOR_USER',
        payload.creator.username
      );


      _setByKey(
        row,
        H,
        K,
        'CREATOR_NAME',
        payload.creator.fullName ||
        payload.creator.username
      );


      _setByKey(
        row,
        H,
        K,
        'ASSIGNEE_USER',
        assignee.username
      );


      _setByKey(
        row,
        H,
        K,
        'ASSIGNEE_NAME',
        assignee.fullName
      );


      _setByKey(
        row,
        H,
        K,
        'CREATED_AT',
        now
      );


      /* =======================================================
         WRITE SHEET
      ======================================================= */

      sh.appendRow(row);

    } finally {

      lock.releaseLock();
    }


    /* =========================================================
       5. INVALIDATE CACHE
    ========================================================= */

    _invalidateGembaCache();


    /* =========================================================
       6. GHI LỊCH SỬ
    ========================================================= */

    _logHistory(
      newId,
      'Tạo phiếu',
      '',
      STATUS.NEW,
      payload.creator,
      'Auto gán cho ' +
        (
          assignee.fullName ||
          assignee.username
        )
    );
     try {
      var zr = sendCreatedGembaToZalo(newId);
      if (!zr || !zr.success) _zaloEnqueue(newId);   // lỗi thì đưa vào hàng đợi
    } catch (ze) {
      try { _zaloEnqueue(newId); } catch (e2) {}
    };

    /* =========================================================
       7. NOTIFICATION NỘI BỘ
       Zalo KHÔNG gửi trong createGemba().
       Frontend sẽ gọi sendCreatedGembaToZalo(newId)
       bằng request riêng sau khi createGemba thành công.
    ========================================================= */

    if (
      assignee.username &&
      String(assignee.username).toLowerCase() !==
      String(payload.creator.username).toLowerCase()
    ) {
      _createNotification(
        assignee.username,
        payload.creator,
        'assigned',
        'Bạn có phiếu Gemba mới: ' + newId,
        'Phiếu "' +
          payload.title +
          '" tại ' +
          payload.factory +
          ' / ' +
          payload.line +
          ' / ' +
          payload.to +
          ' đã được gán cho bạn.',
        newId
      );
    }


    /* =========================================================
       8. SUCCESS
    ========================================================= */

    return {
      success: true,
      id: newId,
      assignee: assignee
    };


  } catch (e) {

    /* =========================================================
       ROLLBACK FILE NẾU CREATE GEMBA FAIL
    ========================================================= */

    try {
      _rollbackFiles(
        uploadedFileIds
      );
    } catch (rollbackError) {

      console.error(
        '[CREATE GEMBA][ROLLBACK ERROR]',
        rollbackError
      );
    }


    console.error(
      '[CREATE GEMBA ERROR]',
      e
    );


    return {
      success: false,
      message:
        'Lỗi: ' +
        e.toString()
    };
  }
}


/* ============================================================
   ZALO BACKGROUND NOTIFICATION
   Gửi phiếu vừa tạo bằng một request riêng từ frontend.
   Không block createGemba().
============================================================ */

/**
 * Chuyển chuỗi URL dạng url1|url2|url3 thành array
 */
function _zaloSplitUrls(raw) {
  if (!raw) return [];

  return String(raw)
    .split('|')
    .map(function(x) {
      return String(x || '').trim();
    })
    .filter(function(x) {
      return !!x;
    });
}


/**
 * Format ngày cho tin nhắn Zalo
 */
function _zaloFormatDate(value, pattern) {
  if (!value) return '—';

  try {
    var d = new Date(value);

    if (isNaN(d.getTime())) {
      return String(value);
    }

    return Utilities.formatDate(
      d,
      Session.getScriptTimeZone(),
      pattern || 'dd/MM/yyyy HH:mm:ss'
    );

  } catch (e) {
    return String(value || '—');
  }
}


/**
 * Chia message thành nhiều phần.
 *
 * _sendZaloMessage hiện giới hạn khoảng 2000 ký tự,
 * nên chia ~1700 để KHÔNG mất nội dung.
 */
function _zaloChunkText(text, maxLength) {
  text = String(text || '');
  maxLength = maxLength || 1700;

  if (text.length <= maxLength) {
    return [text];
  }

  var lines = text.split('\n');

  var chunks = [];
  var current = '';

  lines.forEach(function(line) {

    line = String(line || '');

    var candidate =
      current
        ? current + '\n' + line
        : line;

    if (candidate.length <= maxLength) {
      current = candidate;
      return;
    }

    if (current) {
      chunks.push(current);
      current = '';
    }

    // Một dòng riêng lẻ quá dài
    while (line.length > maxLength) {
      chunks.push(
        line.substring(0, maxLength)
      );

      line = line.substring(maxLength);
    }

    current = line;
  });

  if (current) {
    chunks.push(current);
  }

  return chunks;
}


/**
 * Gửi message dài vào Group Zalo.
 * Có thể chia thành nhiều message để giữ ĐẦY ĐỦ thông tin.
 */
function _sendZaloGroupLongMessage(text) {

  var chunks =
    _zaloChunkText(text, 1700);

  var results = [];

  for (
    var i = 0;
    i < chunks.length;
    i++
  ) {

    var prefix = '';

    if (chunks.length > 1) {
      prefix =
        '📨 [' +
        (i + 1) +
        '/' +
        chunks.length +
        ']\n';
    }

    var result =
      _sendZaloGroupMessage(
        prefix + chunks[i]
      );

    results.push(result);

    if (
      !result ||
      !result.success
    ) {
      return {
        success: false,
        failedPart: i + 1,
        totalParts: chunks.length,
        result: result,
        results: results
      };
    }

    // Giảm khả năng gửi quá nhanh
    if (i < chunks.length - 1) {
      Utilities.sleep(150);
    }
  }

  return {
    success: true,
    parts: chunks.length,
    results: results
  };
}


/**
 * ============================================================
 * GỬI PHIẾU GEMBA VỪA TẠO SANG GROUP ZALO
 * ============================================================
 *
 * Frontend gọi hàm này SAU KHI createGemba trả success.
 *
 * Chỉ truyền gembaId.
 * Server tự đọc dữ liệu thật từ Sheet.
 *
 * => Không tin payload frontend.
 * => Không cần gửi ảnh base64 lần 2.
 * => Không block nút Tạo phiếu.
 */
function sendCreatedGembaToZalo(gembaId) {

  try {

    gembaId =
      String(gembaId || '').trim();

    if (!gembaId) {
      return {
        success: false,
        message: 'Thiếu Gemba ID'
      };
    }


    /* ========================================================
      CHECK CONFIG
    ======================================================== */

    var token =
      _getZaloBotToken();

    if (!token) {
      return {
        success: false,
        message:
          'Chưa cấu hình ZALO_BOT_TOKEN'
      };
    }


    var groupChatId =
      _getZaloGroupChatId();

    if (!groupChatId) {
      return {
        success: false,
        message:
          'Chưa cấu hình ZALO_GROUP_CHAT_ID'
      };
    }


    /* ========================================================
      CHỐNG GỬI DUPLICATE
    ======================================================== */

    var cache =
      CacheService.getScriptCache();

    var dedupeKey =
      'ZALO_GEMBA_SENT_' +
      gembaId;

    if (
      cache.get(dedupeKey) === '1'
    ) {
      return {
        success: true,
        skipped: true,
        message:
          'Thông báo Zalo của phiếu này đã được gửi'
      };
    }


    /* ========================================================
      ĐỌC DỮ LIỆU GEMBA THẬT TỪ SHEET
    ======================================================== */

    var g =
      getGembaById(gembaId);

    if (!g) {
      return {
        success: false,
        message:
          'Không tìm thấy phiếu ' +
          gembaId
      };
    }


    /* ========================================================
      BUILD MESSAGE
    ======================================================== */

    var lines = [];

    lines.push(
      '🔔 GEMBA.PRO — PHIẾU MỚI'
    );

    lines.push('');

    lines.push(
      '🆔 Mã phiếu: ' +
      (g.id || '—')
    );

    lines.push(
      '📌 Trạng thái: ' +
      (
        g.realStatus ||
        g.status ||
        'Mới'
      )
    );

    lines.push(
      '📅 Ngày ghi nhận: ' +
      _zaloFormatDate(
        g.createdDate,
        'dd/MM/yyyy'
      )
    );

    lines.push(
      '🕐 Thời gian tạo: ' +
      _zaloFormatDate(
        g.createdAt,
        'dd/MM/yyyy HH:mm:ss'
      )
    );

    if (g.week) {
      lines.push(
        '📆 Tuần: ' +
        g.week
      );
    }


    lines.push('');

    lines.push(
      '🏭 Nhà máy: ' +
      (g.factory || '—')
    );

    lines.push(
      '📍 Line: ' +
      (g.line || '—')
    );

    lines.push(
      '👥 Tổ: ' +
      (g.to || '—')
    );

    lines.push(
      '📌 Vị trí chi tiết: ' +
      (g.location || '—')
    );


    lines.push('');

    lines.push(
      '⚠️ Mã vấn đề: ' +
      (g.typeCode || '—')
    );

    lines.push(
      '🏷️ Tên vấn đề: ' +
      (g.issueName || '—')
    );

    lines.push(
      '📝 Vấn đề ghi nhận: ' +
      (g.title || '—')
    );

    lines.push(
      '📄 Mô tả: ' +
      (g.description || '—')
    );


    lines.push('');

    lines.push(
      '📦 Mã hàng / SP: ' +
      (g.productCode || '—')
    );

    lines.push(
      '💡 Đề xuất giải pháp: ' +
      (g.proposal || '—')
    );

    lines.push(
      '🔥 Mức ưu tiên: ' +
      (g.priority || 'Medium')
    );


    lines.push('');

    lines.push(
      '👤 Người tạo: ' +
      (
        g.creatorFullName ||
        g.creatorUsername ||
        '—'
      )
    );

    if (g.creatorUsername) {
      lines.push(
        '   ↳ Username: ' +
        g.creatorUsername
      );
    }


    lines.push(
      '👷 Người phụ trách: ' +
      (
        g.assigneeFullName ||
        g.assigneeUsername ||
        '—'
      )
    );

    if (g.assigneeUsername) {
      lines.push(
        '   ↳ Username: ' +
        g.assigneeUsername
      );
    }


    /* ========================================================
      ẢNH BEFORE
    ======================================================== */

    var images =
      _zaloSplitUrls(
        g.imagesBefore
      );

    if (images.length) {

      lines.push('');
      lines.push(
        '🖼️ ẢNH BEFORE:'
      );

      images.forEach(
        function(url, index) {

          lines.push(
            'Ảnh ' +
            (index + 1) +
            ': ' +
            url
          );

        }
      );
    }


    /* ========================================================
      VIDEO
    ======================================================== */

    var videos =
      _zaloSplitUrls(
        g.video
      );

    if (videos.length) {

      lines.push('');
      lines.push(
        '🎥 VIDEO:'
      );

      videos.forEach(
        function(url, index) {

          lines.push(
            'Video ' +
            (index + 1) +
            ': ' +
            url
          );

        }
      );
    }


    /* ========================================================
      FILE ĐÍNH KÈM
    ======================================================== */

    var files =
      _zaloSplitUrls(
        g.files
      );

    if (files.length) {

      lines.push('');
      lines.push(
        '📎 FILE ĐÍNH KÈM:'
      );

      files.forEach(
        function(url, index) {

          lines.push(
            'File ' +
            (index + 1) +
            ': ' +
            url
          );

        }
      );
    }


    /* ========================================================
      LINK WEB APP
    ======================================================== */

    var appUrl =
      ScriptApp
        .getService()
        .getUrl() || '';

    if (appUrl) {

      lines.push('');

      lines.push(
        '🔗 Mở Gemba.Pro: ' +
        appUrl
      );
    }


    lines.push('');
    lines.push(
      '────────────────'
    );

    lines.push(
      'Gemba.Pro — TBS Group'
    );

    lines.push(
      'NM SK Miền Đông'
    );


    /* ========================================================
      SEND
    ======================================================== */

    var message =
      lines.join('\n');

    var result =
      _sendZaloGroupLongMessage(
        message
      );


    /* ========================================================
      CHỈ MARK SENT KHI ZALO THÀNH CÔNG
    ======================================================== */

    if (
      result &&
      result.success
    ) {

      cache.put(
        dedupeKey,
        '1',
        21600
      ); // 6 giờ

    }


    console.log(
      '[ZALO BACKGROUND][' +
      gembaId +
      ']',
      JSON.stringify(result)
    );


    return result;


  } catch (e) {

    console.error(
      '[ZALO BACKGROUND ERROR]',
      gembaId,
      e
    );

    return {
      success: false,
      message: e.toString()
    };
  }
}


function completeGemba(payload, user) {
  var uploadedFileIds = [];
  try {
    if (!payload || !payload.id) return { success: false, message: 'Thiếu ID' };
    if (!user) return { success: false, message: 'Thiếu user' };
    if (!_safeStr(payload.result)) return { success: false, message: 'Thiếu Kết quả' };
    var hasAfterFiles    = payload.imagesAfter && payload.imagesAfter.length;
    var hasExistingAfter = payload.existingImagesAfter && String(payload.existingImagesAfter).trim();
    if (!hasAfterFiles && !hasExistingAfter) return { success: false, message: 'Bắt buộc upload ít nhất 1 ảnh After' };

    var sh = _sheet(SHEET_GEMBA), rd = _readAll(sh), H = rd.headers, idStr = String(payload.id).trim(), found = false;
    for (var i = 0; i < rd.rows.length; i++) {
      if (String(_getByKey(rd.rows[i], H, 'GEMBA', 'ID')).trim() !== idStr) continue;
      found = true;
      var realRow   = i + 2;
      var oldStatus = String(_getByKey(rd.rows[i], H, 'GEMBA', 'STATUS'));
      if (oldStatus === STATUS.DONE)     return { success: false, message: 'Phiếu đã hoàn thành' };
      if (oldStatus === STATUS.REJECTED) return { success: false, message: 'Phiếu đã bị từ chối' };
      var assignee = String(_getByKey(rd.rows[i], H, 'GEMBA', 'ASSIGNEE_USER')).toLowerCase();
      if (assignee !== String(user.username).toLowerCase() && !_canManageRole(user.role)) return { success: false, message: 'Không có quyền báo hoàn thành' };

      var s = _getSettings(), imgResult = _uploadFiles(payload.imagesAfter || [], s.FOLDER_IMG_ID || '');
      uploadedFileIds = imgResult.fileIds;
      var finalImgAfter = imgResult.urls.join('|');
      if (hasExistingAfter) finalImgAfter = finalImgAfter ? (payload.existingImagesAfter + '|' + finalImgAfter) : payload.existingImagesAfter;

      var rowValues   = sh.getRange(realRow, 1, 1, H.length).getValues()[0];
      var creatorUser = String(_getByKey(rd.rows[i], H, 'GEMBA', 'CREATOR_USER') || '');
      var titleVal    = String(_getByKey(rd.rows[i], H, 'GEMBA', 'TITLE')        || '');
      var now         = new Date();
      _setByKey(rowValues, H, 'GEMBA', 'RESULT',      payload.result);
      _setByKey(rowValues, H, 'GEMBA', 'IMG_AFTER',   finalImgAfter);
      _setByKey(rowValues, H, 'GEMBA', 'STATUS',      STATUS.DONE);
      _setByKey(rowValues, H, 'GEMBA', 'COMPLETED_AT', now);
      var startedAt = _getByKey(rd.rows[i], H, 'GEMBA', 'STARTED_AT');
      var createdAt = _getByKey(rd.rows[i], H, 'GEMBA', 'CREATED_AT');
      var baseDate  = startedAt || createdAt;
      if (baseDate) { var hrs = (now.getTime() - new Date(baseDate).getTime()) / 3600000; _setByKey(rowValues, H, 'GEMBA', 'PROCESS_HOURS', Math.round(hrs * 10) / 10); }
      sh.getRange(realRow, 1, 1, H.length).setValues([rowValues]);
      _invalidateGembaCache();
      _logHistory(payload.id, 'Báo hoàn thành', oldStatus, STATUS.DONE, user, payload.result);
      if (creatorUser && String(creatorUser).toLowerCase() !== String(user.username).toLowerCase()) {
        _createNotification(creatorUser, user, 'completed', 'Phiếu ' + payload.id + ' đã hoàn thành', (user.fullName || user.username) + ' đã báo cáo hoàn thành phiếu "' + titleVal + '".', payload.id);
      }
      return { success: true };
    }
    _rollbackFiles(uploadedFileIds);
    return { success: false, message: 'Không tìm thấy phiếu' };
  } catch (e) { _rollbackFiles(uploadedFileIds); return { success: false, message: e.toString() }; }
}

function rejectGemba(id, reason, user) {
  try {
    if (!id || !reason) return { success: false, message: 'Thiếu lý do từ chối' };
    if (!_canManageRole(user && user.role)) return { success: false, message: 'Không có quyền từ chối' };
    var sh = _sheet(SHEET_GEMBA), rd = _readAll(sh), H = rd.headers, idStr = String(id).trim();
    for (var i = 0; i < rd.rows.length; i++) {
      if (String(_getByKey(rd.rows[i], H, 'GEMBA', 'ID')).trim() !== idStr) continue;
      var realRow     = i + 2;
      var oldStatus   = String(_getByKey(rd.rows[i], H, 'GEMBA', 'STATUS'));
      if (_isClosed(oldStatus)) return { success: false, message: 'Phiếu đã đóng' };
      var rowValues    = sh.getRange(realRow, 1, 1, H.length).getValues()[0];
      var creatorUser  = String(_getByKey(rd.rows[i], H, 'GEMBA', 'CREATOR_USER')  || '');
      var assigneeUser = String(_getByKey(rd.rows[i], H, 'GEMBA', 'ASSIGNEE_USER') || '');
      var titleVal     = String(_getByKey(rd.rows[i], H, 'GEMBA', 'TITLE')         || '');
      _setByKey(rowValues, H, 'GEMBA', 'STATUS',        STATUS.REJECTED);
      _setByKey(rowValues, H, 'GEMBA', 'REJECT_REASON', reason);
      sh.getRange(realRow, 1, 1, H.length).setValues([rowValues]);
      _invalidateGembaCache();
      _logHistory(id, 'Từ chối', oldStatus, STATUS.REJECTED, user, reason);
      var notified = {};
      [creatorUser, assigneeUser].forEach(function(u) {
        if (!u) return;
        var key = String(u).toLowerCase();
        if (key === String(user.username).toLowerCase() || notified[key]) return;
        notified[key] = true;
        _createNotification(u, user, 'rejected', 'Phiếu ' + id + ' bị từ chối', 'Phiếu "' + titleVal + '" đã bị từ chối. Lý do: ' + reason, id);
      });
      return { success: true };
    }
    return { success: false, message: 'Không tìm thấy phiếu' };
  } catch (e) { return { success: false, message: e.toString() }; }
}

function updateGembaContent(payload, user) {
  var uploadedFileIds = [];
  try {
    if (!payload || !payload.id) return { success: false, message: 'Thiếu ID phiếu' };
    if (!user)                   return { success: false, message: 'Thiếu thông tin người dùng' };
    var sh = _sheet(SHEET_GEMBA), rd = _readAll(sh), H = rd.headers, idStr = String(payload.id).trim();
    for (var i = 0; i < rd.rows.length; i++) {
      if (String(_getByKey(rd.rows[i], H, 'GEMBA', 'ID')).trim() !== idStr) continue;
      var realRow   = i + 2;
      var oldStatus = String(_getByKey(rd.rows[i], H, 'GEMBA', 'STATUS'));
      var EDITABLE_STATUSES = [STATUS.NEW, STATUS.PROCESSING, STATUS.OVERDUE];
      var isEditable = false;
      for (var ei = 0; ei < EDITABLE_STATUSES.length; ei++) { if (oldStatus === EDITABLE_STATUSES[ei]) { isEditable = true; break; } }
      if (!isEditable) return { success: false, message: 'Không thể sửa phiếu đã đóng (Hoàn thành / Từ chối)' };
      var creator = String(_getByKey(rd.rows[i], H, 'GEMBA', 'CREATOR_USER')).toLowerCase();
      if (creator !== String(user.username).toLowerCase() && !_isAdminRole(user.role)) return { success: false, message: 'Không có quyền sửa phiếu này' };

      var s = _getSettings(), rowValues = sh.getRange(realRow, 1, 1, H.length).getValues()[0];
      function setC(fieldKey, v) { if (v === undefined || v === null) return; _setByKey(rowValues, H, 'GEMBA', fieldKey, v); }
      setC('TITLE',        payload.title        != null ? String(payload.title).trim()        : null);
      setC('DESCRIPTION',  payload.description  != null ? String(payload.description).trim()  : null);
      setC('TYPE_CODE',    payload.typeCode      != null ? String(payload.typeCode).trim()     : null);
      setC('ISSUE_NAME',   payload.issueName     != null ? String(payload.issueName).trim()    : null);
      setC('PRIORITY',     payload.priority      != null ? String(payload.priority).trim()     : null);
      setC('LOCATION',     payload.location      != null ? String(payload.location).trim()     : null);
      setC('PRODUCT_CODE', payload.productCode   != null ? String(payload.productCode).trim()  : null);
      setC('PROPOSAL',     payload.proposal      != null ? String(payload.proposal).trim()     : null);

      if (_isAdminRole(user.role)) {
        setC('FACTORY', payload.factory != null ? String(payload.factory).trim() : null);
        setC('LINE',    payload.line    != null ? String(payload.line).trim()    : null);
        setC('TEAM',    payload.to      != null ? String(payload.to).trim()      : null);
        if (payload.factory && payload.line && payload.to) {
          var newAssignee = null;
          if (payload.assigneeUsername) { var u2 = _getUserByUsername(payload.assigneeUsername); if (u2) newAssignee = { username: u2.username, fullName: u2.fullName }; }
          if (!newAssignee) newAssignee = getAssigneeByLineTo(payload.factory, payload.line, payload.to);
          if (newAssignee) { setC('ASSIGNEE_USER', newAssignee.username); setC('ASSIGNEE_NAME', newAssignee.fullName); }
        }
      }

      var newImgBeforeUrls = '';
      if (payload.newImagesBefore && payload.newImagesBefore.length) {
        var folderImg = s.FOLDER_IMG_ID || '';
        if (!folderImg) { return { success: false, message: 'Chưa cấu hình FOLDER_IMG_ID trong SETTINGS' }; }
        var imgResult = _uploadFiles(payload.newImagesBefore, folderImg);
        uploadedFileIds = imgResult.fileIds;
        newImgBeforeUrls = imgResult.urls.join('|');
      }
      if (newImgBeforeUrls) {
        var existingImgs = String(_getByKey(rd.rows[i], H, 'GEMBA', 'IMG_BEFORE') || '').trim();
        setC('IMG_BEFORE', existingImgs ? existingImgs + '|' + newImgBeforeUrls : newImgBeforeUrls);
      }
      if (payload.removeImagesBefore && payload.removeImagesBefore.length) {
        var currentImgs = String(_getByKey(rd.rows[i], H, 'GEMBA', 'IMG_BEFORE') || '');
        var removeSet   = {};
        payload.removeImagesBefore.forEach(function(url) { removeSet[url.trim()] = true; });
        var filteredImgs = currentImgs.split('|').map(function(u) { return u.trim(); }).filter(function(u) { return u && !removeSet[u]; });
        if (!filteredImgs.length && !newImgBeforeUrls) { _rollbackFiles(uploadedFileIds); return { success: false, message: 'Phải giữ lại ít nhất 1 ảnh Before' }; }
        setC('IMG_BEFORE', filteredImgs.join('|'));
      }

      sh.getRange(realRow, 1, 1, H.length).setValues([rowValues]);
      _invalidateGembaCache();
      var note = [];
      if (payload.title)       note.push('Tiêu đề');
      if (payload.description) note.push('Mô tả');
      if (payload.typeCode)    note.push('Mã vấn đề');
      if (payload.priority)    note.push('Ưu tiên');
      if (newImgBeforeUrls)    note.push('Ảnh Before');
      _logHistory(payload.id, 'Cập nhật nội dung', oldStatus, oldStatus, user, 'Đã sửa: ' + (note.length ? note.join(', ') : 'thông tin phiếu'));
      return { success: true, message: 'Cập nhật thành công' };
    }
    _rollbackFiles(uploadedFileIds);
    return { success: false, message: 'Không tìm thấy phiếu ' + idStr };
  } catch (e) { _rollbackFiles(uploadedFileIds); return { success: false, message: 'Lỗi: ' + e.toString() }; }
}

function getUserListSimple() {
  try {
    var rd = _getUserRaw(), cols = rd.cols;
    return rd.rows
      .filter(function(r) { var st = String(_cellByCol(r, cols, 'STATUS') || 'Active').toLowerCase(); return _cellByCol(r, cols, 'USERNAME') && st !== 'inactive'; })
      .map(function(r) { var u = _cellByCol(r, cols, 'USERNAME'); return { username: String(u), fullName: String(_cellByCol(r, cols, 'FULL_NAME') || u), factory: String(_cellByCol(r, cols, 'FACTORY') || ''), role: String(_cellByCol(r, cols, 'ROLE') || '') }; })
      .sort(function(a, b) { return a.fullName.localeCompare(b.fullName, 'vi'); });
  } catch (e) { return []; }
}

function deleteGemba(id, user) {
  try {
    if (!_isAdminRole(user && user.role)) return { success: false, message: 'Chỉ Admin được xoá' };
    var sh = _sheet(SHEET_GEMBA), rd = _readAll(sh), H = rd.headers, idStr = String(id).trim();
    for (var i = 0; i < rd.rows.length; i++) {
      if (String(_getByKey(rd.rows[i], H, 'GEMBA', 'ID')).trim() === idStr) {
        sh.deleteRow(i + 2); _invalidateGembaCache(); _logHistory(id, 'Xoá phiếu', '', '', user, ''); return { success: true };
      }
    }
    return { success: false, message: 'Không tìm thấy' };
  } catch (e) { return { success: false, message: e.toString() }; }
}

function reopenGemba(id, reason, user) {
  try {
    if (!id || !user) return { success: false, message: 'Thiếu thông tin' };
    if (!reason || !String(reason).trim()) return { success: false, message: 'Vui lòng nhập lý do yêu cầu xử lý lại' };
    var sh = _sheet(SHEET_GEMBA), rd = _readAll(sh), H = rd.headers, idStr = String(id).trim();
    for (var i = 0; i < rd.rows.length; i++) {
      if (String(_getByKey(rd.rows[i], H, 'GEMBA', 'ID')).trim() !== idStr) continue;
      var oldStatus  = String(_getByKey(rd.rows[i], H, 'GEMBA', 'STATUS'));
      var creator    = String(_getByKey(rd.rows[i], H, 'GEMBA', 'CREATOR_USER')  || '').toLowerCase();
      var assignee   = String(_getByKey(rd.rows[i], H, 'GEMBA', 'ASSIGNEE_USER') || '');
      var titleVal   = String(_getByKey(rd.rows[i], H, 'GEMBA', 'TITLE')         || '');
      if (oldStatus !== STATUS.DONE) return { success: false, message: 'Chỉ được yêu cầu xử lý lại phiếu đã "Hoàn thành"' };
      if (String(user.username).toLowerCase() !== creator && !_isAdminRole(user.role)) return { success: false, message: 'Chỉ người tạo hoặc Admin được yêu cầu xử lý lại' };
      var realRow   = i + 2;
      var rowValues = sh.getRange(realRow, 1, 1, H.length).getValues()[0];
      _setByKey(rowValues, H, 'GEMBA', 'STATUS',        STATUS.REOPEN);
      _setByKey(rowValues, H, 'GEMBA', 'STARTED_AT',    '');
      _setByKey(rowValues, H, 'GEMBA', 'RESULT',         '');
      _setByKey(rowValues, H, 'GEMBA', 'IMG_AFTER',      '');
      _setByKey(rowValues, H, 'GEMBA', 'COMPLETED_AT',   '');
      _setByKey(rowValues, H, 'GEMBA', 'PROCESS_HOURS',  0);
      _setByKey(rowValues, H, 'GEMBA', 'REJECT_REASON',  '[Chờ xử lý lại] ' + String(reason).trim());
      sh.getRange(realRow, 1, 1, H.length).setValues([rowValues]);
      _invalidateGembaCache();
      _logHistory(id, 'Yêu cầu xử lý lại', oldStatus, STATUS.REOPEN, user, 'Lý do: ' + String(reason).trim());
      if (assignee && String(assignee).toLowerCase() !== String(user.username).toLowerCase()) {
        _createNotification(assignee, user, 'reminder', 'Phiếu ' + id + ' cần xử lý lại', (user.fullName || user.username) + ' yêu cầu xử lý lại phiếu "' + titleVal + '". Lý do: ' + String(reason).trim(), id);
      }
      return { success: true };
    }
    return { success: false, message: 'Không tìm thấy phiếu' };
  } catch (e) { return { success: false, message: e.toString() }; }
}

function _ensureNotifSheet() {
  var ss = _ss(), sh = ss.getSheetByName(SHEET_THONGBAO);
  if (!sh) {
    sh = ss.insertSheet(SHEET_THONGBAO);
    sh.appendRow(['ID', 'NGƯỜI NHẬN (USERNAME)', 'NGƯỜI GỬI (USERNAME)', 'NGƯỜI GỬI (HỌ TÊN)', 'LOẠI', 'TIÊU ĐỀ', 'NỘI DUNG', 'GEMBA ID', 'ĐÃ ĐỌC', 'THỜI GIAN TẠO', 'THỜI GIAN ĐỌC']);
    sh.getRange(1, 1, 1, 11).setFontWeight('bold').setBackground('#f4f7fb');
    sh.setFrozenRows(1);
  }
  return sh;
}

function _invalidateNotifCache(username) { if (!username) return; _removeCache('NOTIF_UNREAD_' + String(username).toLowerCase()); }

function _createNotification(receiver, sender, type, title, content, gembaId) {
  try {
    if (!receiver) return null;
    var sh = _ensureNotifSheet(), H = sh.getRange(1, 1, 1, sh.getLastColumn()).getValues()[0];
    var row = new Array(H.length).fill('');
    var newId = 'N-' + new Date().getTime() + '-' + Math.floor(Math.random() * 1000);
    _setByKey(row, H, 'THONGBAO', 'ID',          newId);
    _setByKey(row, H, 'THONGBAO', 'RECEIVER',    receiver || '');
    _setByKey(row, H, 'THONGBAO', 'SENDER',      (sender && sender.username)  || 'system');
    _setByKey(row, H, 'THONGBAO', 'SENDER_NAME', (sender && sender.fullName)  || 'Hệ thống');
    _setByKey(row, H, 'THONGBAO', 'TYPE',         type     || 'info');
    _setByKey(row, H, 'THONGBAO', 'TITLE',        title    || '');
    _setByKey(row, H, 'THONGBAO', 'CONTENT',      content  || '');
    _setByKey(row, H, 'THONGBAO', 'GEMBA_ID',     gembaId  || '');
    _setByKey(row, H, 'THONGBAO', 'IS_READ',      'No');
    _setByKey(row, H, 'THONGBAO', 'CREATED_AT',  new Date());
    sh.appendRow(row);
    _invalidateNotifCache(receiver);
    return newId;
  } catch (e) { return null; }
}

function getMyNotifications(username, opts) {
  try {
    if (!username) return [];
    opts = opts || {};
    var sh = _ss().getSheetByName(SHEET_THONGBAO);
    if (!sh || sh.getLastRow() < 2) return [];
    var rd = _readAll(sh), H = rd.headers, cols = _buildColMap(H, 'THONGBAO'), list = [], meUser = String(username).toLowerCase();
    rd.rows.forEach(function(r) {
      var rec = String(_cellByCol(r, cols, 'RECEIVER') || '').toLowerCase();
      if (rec !== meUser && rec !== '*') return;
      var isRead = String(_cellByCol(r, cols, 'IS_READ') || 'No').toLowerCase() === 'yes';
      if (opts.unreadOnly && isRead) return;
      var ca = _cellByCol(r, cols, 'CREATED_AT'), ra = _cellByCol(r, cols, 'READ_AT');
      list.push({ id: _cellByCol(r, cols, 'ID'), sender: _cellByCol(r, cols, 'SENDER'), senderName: _cellByCol(r, cols, 'SENDER_NAME'), type: _cellByCol(r, cols, 'TYPE'), title: _cellByCol(r, cols, 'TITLE'), content: _cellByCol(r, cols, 'CONTENT'), gembaId: _cellByCol(r, cols, 'GEMBA_ID'), isRead: isRead, createdAt: ca instanceof Date ? ca.toISOString() : ca, readAt: ra instanceof Date ? ra.toISOString() : ra });
    });
    list.sort(function(a, b) { return new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime(); });
    return opts.limit ? list.slice(0, opts.limit) : list;
  } catch (e) { return []; }
}

function getUnreadCount(username) {
  try {
    if (!username) return 0;
    var cacheKey = 'NOTIF_UNREAD_' + String(username).toLowerCase();
    var cached = _cache().get(cacheKey);
    if (cached != null) return Number(cached) || 0;
    var sh = _ss().getSheetByName(SHEET_THONGBAO);
    if (!sh || sh.getLastRow() < 2) { _cache().put(cacheKey, '0', 60); return 0; }
    var rd = _readAll(sh), H = rd.headers, cols = _buildColMap(H, 'THONGBAO'), meUser = String(username).toLowerCase(), count = 0;
    rd.rows.forEach(function(r) {
      var rec = String(_cellByCol(r, cols, 'RECEIVER') || '').toLowerCase();
      if (rec !== meUser && rec !== '*') return;
      if (String(_cellByCol(r, cols, 'IS_READ') || 'No').toLowerCase() !== 'yes') count++;
    });
    _cache().put(cacheKey, String(count), 60);
    return count;
  } catch (e) { return 0; }
}

function pollNotifLight(username) {
  try { if (!username) return { unread: 0 }; return { unread: getUnreadCount(username), ts: new Date().getTime() }; }
  catch (e) { return { unread: 0, error: e.toString() }; }
}

function markNotificationRead(notifId, username) {
  try {
    if (!notifId || !username) return { success: false, message: 'Thiếu thông tin' };
    var sh = _ss().getSheetByName(SHEET_THONGBAO);
    if (!sh) return { success: false, message: 'Chưa có thông báo' };
    var rd = _readAll(sh), H = rd.headers;
    var iRead = _colByKey(H, 'THONGBAO', 'IS_READ'), iReadAt = _colByKey(H, 'THONGBAO', 'READ_AT');
    for (var i = 0; i < rd.rows.length; i++) {
      if (String(_getByKey(rd.rows[i], H, 'THONGBAO', 'ID')) !== String(notifId)) continue;
      var rec = String(_getByKey(rd.rows[i], H, 'THONGBAO', 'RECEIVER') || '').toLowerCase();
      if (rec !== String(username).toLowerCase() && rec !== '*') return { success: false, message: 'Không có quyền' };
      if (iRead >= 0) sh.getRange(i + 2, iRead + 1).setValue('Yes');
      if (iReadAt >= 0) sh.getRange(i + 2, iReadAt + 1).setValue(new Date());
      _invalidateNotifCache(username);
      return { success: true };
    }
    return { success: false, message: 'Không tìm thấy' };
  } catch (e) { return { success: false, message: e.toString() }; }
}

function markAllNotificationsRead(username) {
  try {
    if (!username) return { success: false, message: 'Thiếu username' };
    var sh = _ss().getSheetByName(SHEET_THONGBAO);
    if (!sh || sh.getLastRow() < 2) return { success: true, count: 0 };
    var rd = _readAll(sh), H = rd.headers;
    var iRead = _colByKey(H, 'THONGBAO', 'IS_READ'), iReadAt = _colByKey(H, 'THONGBAO', 'READ_AT');
    var meUser = String(username).toLowerCase(), now = new Date(), count = 0;
    if (iRead >= 0) {
      var readRange = sh.getRange(2, iRead + 1, rd.rows.length, 1), readValues = readRange.getValues();
      var readAtRange = iReadAt >= 0 ? sh.getRange(2, iReadAt + 1, rd.rows.length, 1) : null;
      var readAtValues = readAtRange ? readAtRange.getValues() : null;
      for (var i = 0; i < rd.rows.length; i++) {
        var rec    = String(_getByKey(rd.rows[i], H, 'THONGBAO', 'RECEIVER') || '').toLowerCase();
        var isRead = String(readValues[i][0] || 'No').toLowerCase() === 'yes';
        if ((rec === meUser || rec === '*') && !isRead) { readValues[i][0] = 'Yes'; if (readAtValues) readAtValues[i][0] = now; count++; }
      }
      if (count > 0) { readRange.setValues(readValues); if (readAtRange) readAtRange.setValues(readAtValues); }
    }
    _invalidateNotifCache(username);
    return { success: true, count: count };
  } catch (e) { return { success: false, message: e.toString() }; }
}

function deleteNotification(notifId, username) {
  try {
    if (!notifId || !username) return { success: false, message: 'Thiếu thông tin' };
    var sh = _ss().getSheetByName(SHEET_THONGBAO);
    if (!sh) return { success: false, message: 'Không tìm thấy' };
    var rd = _readAll(sh), H = rd.headers;
    for (var i = 0; i < rd.rows.length; i++) {
      if (String(_getByKey(rd.rows[i], H, 'THONGBAO', 'ID')) !== String(notifId)) continue;
      var rec = String(_getByKey(rd.rows[i], H, 'THONGBAO', 'RECEIVER') || '').toLowerCase();
      if (rec !== String(username).toLowerCase() && rec !== '*') return { success: false, message: 'Không có quyền' };
      sh.deleteRow(i + 2); _invalidateNotifCache(username); return { success: true };
    }
    return { success: false, message: 'Không tìm thấy' };
  } catch (e) { return { success: false, message: e.toString() }; }
}

function sendNotification(payload, sender) {
  try {
    if (!payload || !payload.receivers || !payload.receivers.length) return { success: false, message: 'Thiếu người nhận' };
    if (!payload.title || !payload.content) return { success: false, message: 'Thiếu tiêu đề/nội dung' };
    if (!_canManageRole(sender && sender.role)) return { success: false, message: 'Không có quyền gửi thông báo' };
    var count = 0;
    payload.receivers.forEach(function(receiver) {
      if (!receiver) return;
      var id = _createNotification(receiver, sender, payload.type || 'announcement', payload.title, payload.content, payload.gembaId || '');
      if (id) count++;
    });
    return { success: true, count: count };
  } catch (e) { return { success: false, message: e.toString() }; }
}

function sendGembaReminder(gembaId, customMessage, sender) {
  try {
    if (!gembaId) return { success: false, message: 'Thiếu Gemba ID' };
    if (!_canManageRole(sender && sender.role)) return { success: false, message: 'Không có quyền gửi nhắc nhở' };
    var g = getGembaById(gembaId);
    if (!g) return { success: false, message: 'Không tìm thấy phiếu' };
    if (_isClosed(g.realStatus)) return { success: false, message: 'Phiếu đã đóng' };
    var receiver = g.assigneeUsername;
    if (!receiver) return { success: false, message: 'Phiếu chưa có người phụ trách' };
    var content = customMessage && String(customMessage).trim() ? String(customMessage).trim() : 'Phiếu Gemba ' + gembaId + ' (' + (g.title || '') + ') cần được xử lý sớm.';
    var id = _createNotification(receiver, sender, 'reminder', 'Nhắc xử lý phiếu ' + gembaId, content, gembaId);
    return { success: !!id, message: id ? 'Đã gửi nhắc nhở' : 'Lỗi gửi' };
  } catch (e) { return { success: false, message: e.toString() }; }
}

function getNotificationRecipients(senderUser) {
  try {
    var rd = _getUserRaw(), cols = rd.cols, list = [];
    var senderUname = senderUser ? String(senderUser.username || '').toLowerCase() : '';
    var senderRole  = senderUser ? String(senderUser.role     || '')               : '';
    var senderFac   = senderUser ? String(senderUser.factory  || '')               : '';
    var senderGrp   = senderUser ? String(senderUser.group    || '')               : '';

    var senderFacList = _splitMulti(senderFac);
    var factoryScope = (senderRole === 'Trưởng Line') && (senderGrp.indexOf('Nhà Máy') === 0 || senderFacList.length > 0);

    rd.rows.forEach(function(r) {
      var st = String(_cellByCol(r, cols, 'STATUS') || 'Active').toLowerCase();
      if (st === 'inactive') return;
      var u = _cellByCol(r, cols, 'USERNAME');
      if (!u || (senderUname && String(u).toLowerCase() === senderUname)) return;
      if (factoryScope) {
        var userFac = String(_cellByCol(r, cols, 'FACTORY') || '');
        if (senderFacList.length) {
          var userFacList = _splitMulti(userFac);
          var overlap = userFacList.some(function(f) { return senderFacList.indexOf(f) >= 0; });
          if (userFacList.length && !overlap) return;
        }
      }
      list.push({ username: String(u), fullName: String(_cellByCol(r, cols, 'FULL_NAME') || u), group: String(_cellByCol(r, cols, 'GROUP') || ''), factory: String(_cellByCol(r, cols, 'FACTORY') || ''), line: String(_cellByCol(r, cols, 'LINE') || ''), to: String(_cellByCol(r, cols, 'TEAM') || ''), role: String(_cellByCol(r, cols, 'ROLE') || 'User') });
    });
    list.sort(function(a, b) { return a.fullName.localeCompare(b.fullName, 'vi'); });
    return list;
  } catch (e) { return []; }
}

function _emptyDashboard() {
  return {
    kpi: { total: 0, open: 0, inProgress: 0, done: 0, overdue: 0, thisMonth: 0, completionRate: 0 },
    byFactory: [], byStatus: [], recent: [],
    advanced: { factoryList: [], typeOrder: TYPE_ORDER, monthIssues: { total: 0, byFactory: [] }, statusCurrent: { total: { waiting: 0, processing: 0 }, byFactory: [] }, groupIssues: { total: [], byFactory: [] }, monthTable: { months: [], total: { yearTotal: 0, months: {} }, rows: [] }, topByFactory: [], processTime: { avg: 0, target: 2, byFactory: [] }, top5Long: { target: 2, items: [] } }
  };
}

function getDashboardData(params) {
  try {
    params = params || {};
    var user = params.user || null, range = params.range || 'all', factoryFilter = params.factory || '';
    if (user && !_canViewDashboard(user.role)) return _emptyDashboard();

    var cacheKey = 'DASH_' + (range || 'all') + '_' + (factoryFilter || 'ALL') + '_' + (user ? String(user.role || 'User').replace(/\s+/g, '') + '_' + String(user.username || '') : 'anon');
    var cachedDash = _getCacheJson(cacheKey);
    if (cachedDash) return cachedDash;

    var rd = _getGembaRaw();
    if (!rd.rows.length) return _emptyDashboard();

    var cols = rd.cols, meta = getAppMetadata(), sla = meta.sla;
    var now = new Date(), curYear = now.getFullYear(), curMonth = now.getMonth() + 1;
    var thisMonthStart = new Date(now.getFullYear(), now.getMonth(), 1), startDate = null;
    if      (range === 'today')   startDate = new Date(now.getFullYear(), now.getMonth(), now.getDate());
    else if (range === 'week')  { startDate = new Date(now); startDate.setDate(now.getDate() - 7); }
    else if (range === 'month')   startDate = thisMonthStart;
    else if (range === 'quarter'){ startDate = new Date(now); startDate.setMonth(now.getMonth() - 3); }
    else if (range === 'year')    startDate = new Date(now.getFullYear(), 0, 1);

    var factoryList = factoryFilter ? [factoryFilter] : (meta.factories && meta.factories.length ? meta.factories.slice() : []);

    var statusCount = {}; statusCount[STATUS.NEW] = 0; statusCount[STATUS.PROCESSING] = 0; statusCount[STATUS.DONE] = 0; statusCount[STATUS.OVERDUE] = 0; statusCount[STATUS.REJECTED] = 0;
    var byFactory = {}, thisMonthCount = 0, total = 0;
    var monthByFac = {}, statusByFac = {}, groupByFac = {}, statusTotal = { waiting: 0, processing: 0 }, groupTotal = {};
    var tableByFac = {}, tableTotal = { yearTotal: 0, months: {} };
    var topByFac = {}, ptByFac = {}, ptTotal = { sum: 0, count: 0 }, byTypeName = {}, recentList = [];

    factoryList.forEach(function(f) {
      monthByFac[f] = 0; statusByFac[f] = { waiting: 0, processing: 0 }; groupByFac[f] = {}; topByFac[f] = {};
      TYPE_ORDER.forEach(function(t) { groupByFac[f][t] = 0; topByFac[f][t] = 0; });
      tableByFac[f] = { yearTotal: 0, months: {} }; ptByFac[f] = { sum: 0, count: 0 };
    });
    TYPE_ORDER.forEach(function(t) { groupTotal[t] = 0; });

    var monthsToShow = [];
    for (var im = 0; im < 5; im++) { var mm = curMonth - im, yy = curYear; while (mm <= 0) { mm += 12; yy--; } monthsToShow.push({ year: yy, month: mm, label: 'Tháng ' + mm }); }
    monthsToShow.reverse();
    monthsToShow.forEach(function(mo) { var key = mo.year + '-' + mo.month; tableTotal.months[key] = 0; factoryList.forEach(function(f) { tableByFac[f].months[key] = 0; }); });

    for (var i = 0; i < rd.rows.length; i++) {
      var r = rd.rows[i];
      if (!_cellByCol(r, cols, 'ID')) continue;
      if (user && !_canViewRow(user, r, cols)) continue;
      var rFac = String(_cellByCol(r, cols, 'FACTORY') || '').trim();
      if (factoryFilter && rFac !== factoryFilter) continue;
      var rStatus = _cellByCol(r, cols, 'STATUS') || STATUS.NEW;
      var rCreatedAt = _cellByCol(r, cols, 'CREATED_AT'), rPriority = _cellByCol(r, cols, 'PRIORITY') || 'Medium', rStartedAt = _cellByCol(r, cols, 'STARTED_AT');
      var displayStatus = _computeOverdue(rStatus, rCreatedAt, rPriority, sla, rStartedAt);
      var ctDate = rCreatedAt ? new Date(rCreatedAt) : null, validCt = ctDate && !isNaN(ctDate);
      var inRange = !startDate || (validCt && ctDate >= startDate), safeFac = rFac || 'Khác';
      var inFactoryList = factoryList.indexOf(safeFac) >= 0;

      if (inRange) {
        total++; statusCount[displayStatus] = (statusCount[displayStatus] || 0) + 1; byFactory[safeFac] = (byFactory[safeFac] || 0) + 1;
        if (validCt && ctDate >= thisMonthStart) thisMonthCount++;
        if (recentList.length < 50) recentList.push({ id: _cellByCol(r, cols, 'ID'), title: _cellByCol(r, cols, 'TITLE'), factory: rFac, line: _cellByCol(r, cols, 'LINE'), to: _cellByCol(r, cols, 'TEAM'), status: displayStatus, createdBy: _cellByCol(r, cols, 'CREATOR_NAME'), createdAt: rCreatedAt, _t: validCt ? ctDate.getTime() : 0 });
      }

      if (!inFactoryList) continue;

      if (displayStatus === STATUS.NEW) { statusByFac[safeFac].waiting++; statusTotal.waiting++; }
      else if (displayStatus === STATUS.PROCESSING || displayStatus === STATUS.OVERDUE) { statusByFac[safeFac].processing++; statusTotal.processing++; }

      var recordedDate = _cellByCol(r, cols, 'RECORDED_DATE'), refDate = rCreatedAt || recordedDate, rd2 = refDate ? new Date(refDate) : null;
      if (rd2 && !isNaN(rd2)) {
        var ry = rd2.getFullYear(), rmm = rd2.getMonth() + 1;
        var code = String(_cellByCol(r, cols, 'TYPE_CODE') || '').trim(), typeKey = _matchTypeKey(code);
        if (ry === curYear && rmm === curMonth) { monthByFac[safeFac] = (monthByFac[safeFac] || 0) + 1; groupByFac[safeFac][typeKey] = (groupByFac[safeFac][typeKey] || 0) + 1; groupTotal[typeKey] = (groupTotal[typeKey] || 0) + 1; }
        if (ry === curYear) { tableByFac[safeFac].yearTotal++; tableTotal.yearTotal++; topByFac[safeFac][typeKey] = (topByFac[safeFac][typeKey] || 0) + 1; }
        var monthKey = ry + '-' + rmm;
        if (tableByFac[safeFac].months[monthKey] != null) { tableByFac[safeFac].months[monthKey]++; tableTotal.months[monthKey] = (tableTotal.months[monthKey] || 0) + 1; }
      }

      if (rStatus === STATUS.DONE) {
        var hrs = Number(_cellByCol(r, cols, 'PROCESS_HOURS') || 0);
        if (hrs && !isNaN(hrs)) {
          var days = hrs / 24; ptByFac[safeFac].sum += days; ptByFac[safeFac].count++; ptTotal.sum += days; ptTotal.count++;
          var tc = String(_cellByCol(r, cols, 'TYPE_CODE')  || '').trim(), tn = String(_cellByCol(r, cols, 'ISSUE_NAME') || '').trim();
          if (tc || tn) { var label = (tc && tn) ? (tc + ' : ' + tn) : (tc || tn); if (!byTypeName[label]) byTypeName[label] = { sum: 0, count: 0 }; byTypeName[label].sum += days; byTypeName[label].count++; }
        }
      }
    }

    recentList.sort(function(a, b) { return b._t - a._t; });
    var recent = recentList.slice(0, 10).map(function(x) { delete x._t; return x; });

    var done = statusCount[STATUS.DONE] || 0, inProgress = statusCount[STATUS.PROCESSING] || 0;
    var newCount = statusCount[STATUS.NEW] || 0, overdue = statusCount[STATUS.OVERDUE] || 0;

    var ptResult = {};
    factoryList.forEach(function(f) { var p = ptByFac[f] || { sum: 0, count: 0 }; ptResult[f] = p.count > 0 ? Math.round((p.sum / p.count) * 100) / 100 : 0; });
    var ptAvg = ptTotal.count > 0 ? Math.round((ptTotal.sum / ptTotal.count) * 100) / 100 : 0;

    var top5List = Object.keys(byTypeName).map(function(k) { var it = byTypeName[k]; return { label: k, avgDays: Math.round((it.sum / it.count) * 100) / 100, count: it.count }; }).sort(function(a, b) { return b.avgDays - a.avgDays; }).slice(0, 5);

    var slaTarget = (sla && sla.Default) ? sla.Default : 2;

    var advanced = {
      factoryList: factoryList, typeOrder: TYPE_ORDER, filterFactory: factoryFilter || '',
      monthIssues: { total: factoryList.reduce(function(s, f) { return s + (monthByFac[f] || 0); }, 0), byFactory: factoryList.map(function(f) { return { label: f, value: monthByFac[f] || 0 }; }) },
      statusCurrent: { total: statusTotal, byFactory: factoryList.map(function(f) { var sv = statusByFac[f] || { waiting: 0, processing: 0 }; return { label: f, waiting: sv.waiting, processing: sv.processing }; }) },
      groupIssues: { total: TYPE_ORDER.map(function(t) { return { type: t, value: groupTotal[t] || 0 }; }), byFactory: factoryList.map(function(f) { return { label: f, values: TYPE_ORDER.map(function(t) { return { type: t, value: (groupByFac[f] && groupByFac[f][t]) || 0 }; }) }; }) },
      monthTable: { months: monthsToShow, total: tableTotal, rows: factoryList.map(function(f) { return { factory: f, yearTotal: (tableByFac[f] || {}).yearTotal || 0, months: monthsToShow.map(function(mo) { return { key: mo.year + '-' + mo.month, label: mo.label, value: ((tableByFac[f] || {}).months || {})[mo.year + '-' + mo.month] || 0 }; }) }; }) },
      topByFactory: factoryList.map(function(f) { var data = topByFac[f] || {}; return { factory: f, items: TYPE_ORDER.map(function(t) { return { type: t, value: data[t] || 0 }; }).sort(function(a, b) { return b.value - a.value; }) }; }),
      processTime: { avg: ptAvg, target: slaTarget, byFactory: factoryList.map(function(f) { return { label: f, value: ptResult[f] || 0 }; }) },
      top5Long: { target: slaTarget, items: top5List }
    };

    var result = {
      kpi: { total: total, open: newCount, inProgress: inProgress, done: done, overdue: overdue, thisMonth: thisMonthCount, completionRate: total > 0 ? Number(((done / total) * 100).toFixed(1)) : 0 },
      byFactory: Object.keys(byFactory).map(function(k) { return { label: k, value: byFactory[k] }; }),
      byStatus: Object.keys(statusCount).filter(function(k) { return statusCount[k] > 0; }).map(function(k) { return { label: k, value: statusCount[k] }; }),
      recent: recent, advanced: advanced
    };
    _setCacheJson(cacheKey, result, 60);
    return result;
  } catch (e) { return _emptyDashboard(); }
}

function getGembaTreeStats(params) {
  try {
    params = params || {};
    var user = params.user || null;
    var rd = _getGembaRaw();
    if (!rd.rows.length) return { tree: [], total: 0, unfinished: 0 };
    var cols = rd.cols, meta = getAppMetadata(), sla = meta.sla, tree = {}, total = 0, unfinished = 0;
    rd.rows.forEach(function(r) {
      if (!_cellByCol(r, cols, 'ID')) return;
      if (user && !_canViewRow(user, r, cols)) return;
      var fac = String(_cellByCol(r, cols, 'FACTORY') || 'Chưa xác định');
      var line = String(_cellByCol(r, cols, 'LINE') || 'Chung');
      var to   = String(_cellByCol(r, cols, 'TEAM') || 'Chung');
      var status = _cellByCol(r, cols, 'STATUS') || STATUS.NEW;
      var displayStatus = _computeOverdue(status, _cellByCol(r, cols, 'CREATED_AT'), _cellByCol(r, cols, 'PRIORITY'), sla, _cellByCol(r, cols, 'STARTED_AT'));
      var isUnfinished = !_isClosed(displayStatus);
      if (!tree[fac]) tree[fac] = { total: 0, unfinished: 0, lines: {} };
      if (!tree[fac].lines[line]) tree[fac].lines[line] = { total: 0, unfinished: 0, tos: {} };
      if (!tree[fac].lines[line].tos[to]) tree[fac].lines[line].tos[to] = { total: 0, unfinished: 0, statuses: {} };
      tree[fac].total++; tree[fac].lines[line].total++; tree[fac].lines[line].tos[to].total++;
      if (isUnfinished) { tree[fac].unfinished++; tree[fac].lines[line].unfinished++; tree[fac].lines[line].tos[to].unfinished++; unfinished++; }
      tree[fac].lines[line].tos[to].statuses[displayStatus] = (tree[fac].lines[line].tos[to].statuses[displayStatus] || 0) + 1;
      total++;
    });
    var result = Object.keys(tree).sort().map(function(fac) {
      var f = tree[fac];
      return { name: fac, total: f.total, unfinished: f.unfinished, lines: Object.keys(f.lines).sort().map(function(ln) {
        var L = f.lines[ln];
        return { name: ln, total: L.total, unfinished: L.unfinished, tos: Object.keys(L.tos).sort().map(function(to) {
          var T = L.tos[to];
          return { name: to, total: T.total, unfinished: T.unfinished, statuses: Object.keys(T.statuses).sort().map(function(s) { return { name: s, count: T.statuses[s] }; }) };
        })};
      })};
    });
    return { tree: result, total: total, unfinished: unfinished };
  } catch (e) { return { tree: [], total: 0, unfinished: 0 }; }
}

function getMyTasks(username, user) {
  try {
    if (!username) return [];
    var rd = _getGembaRaw();
    if (!rd.rows.length) return [];
    var cols = rd.cols, meta = getAppMetadata(), list = [], meUser = String(username).toLowerCase();

    // Nếu là Trưởng Line/Tổ trưởng: lấy tất cả phiếu CHƯA ĐÓNG trong phạm vi quản lý.
    // Nếu không có user hoặc là nhân viên: chỉ lấy phiếu gán trực tiếp cho mình.
    var role = user ? String(user.role || '') : '';
    var scopeMode = user && (role === 'Trưởng Line' || role === 'Tổ trưởng');

    rd.rows.forEach(function(r) {
      if (!_cellByCol(r, cols, 'ID')) return;
      var status = String(_cellByCol(r, cols, 'STATUS'));
      if (_isClosed(status)) return;

      var isMine;
      if (scopeMode) {
        // Trong phạm vi quản lý (Line/Tổ) HOẶC được gán trực tiếp
        var assignee = String(_cellByCol(r, cols, 'ASSIGNEE_USER')).toLowerCase();
        isMine = _canViewRow(user, r, cols) || assignee === meUser;
      } else {
        var assignee2 = String(_cellByCol(r, cols, 'ASSIGNEE_USER')).toLowerCase();
        isMine = assignee2 === meUser;
      }

      if (isMine) list.push(_rowToObjFast(r, cols, meta.sla));
    });

    list.sort(function(a, b) { return (new Date(b.createdAt).getTime() || 0) - (new Date(a.createdAt).getTime() || 0); });
    return list;
  } catch (e) { return []; }
}

function getBootstrapData(payload) {
  try {
    payload = payload || {};
    var user = payload.user || null, page = payload.page || 'dashboard', factory = payload.factory || '', range = payload.range || 'all';
    var canDash = user && _canViewDashboard(user.role), canMng = user && _canManageRole(user.role), isAdm = user && _isAdminRole(user.role);
    var result = {
      metadata:     getAppMetadata(),
      treeStats:    canDash ? getGembaTreeStats({ user: user }) : { tree: [], total: 0, unfinished: 0 },
      myTasks:      user && user.username ? getMyTasks(user.username, user) : [],
      notifications: user && user.username ? getMyNotifications(user.username, { limit: 50 }) : [],
      unreadCount:  user && user.username ? getUnreadCount(user.username) : 0,
      permissions:  { canViewDashboard: !!canDash, canManage: !!canMng, isAdmin: !!isAdm, role: user ? user.role : '' }
    };
    if (page === 'dashboard' && canDash) result.dashboard = getDashboardData({ user: user, range: range, factory: factory });
    if (page === 'gemba') result.gembaList = getGembaList({ user: user });
    return { success: true, data: result };
  } catch (e) { return { success: false, message: e.toString() }; }
}

function getMutationDelta(payload) {
  try {
    payload = payload || {};
    var user = payload.user || null, gembaId = payload.gembaId || null;
    var result = { success: true, data: { treeStats: getGembaTreeStats({ user: user }), myTasks: user && user.username ? getMyTasks(user.username, user) : [], unreadCount: user && user.username ? getUnreadCount(user.username) : 0 } };
    if (gembaId) result.data.updatedGemba = getGembaById(gembaId);
    return result;
  } catch (e) { return { success: false, message: e.toString() }; }
}

function getGembaDetailBundle(id) {
  try {
    if (!id) return { success: false, message: 'Thiếu ID', detail: null, history: [] };
    var result = { success: true, detail: getGembaById(id), history: getGembaHistory(id) || [] };
    if (!result.detail) { result.success = false; result.message = 'Không tìm thấy phiếu'; }
    return result;
  } catch (e) { return { success: false, message: e.toString(), detail: null, history: [] }; }
}

function _ensureSessionSheet() {
  var ss = _ss(), sh = ss.getSheetByName(SHEET_SESSION);
  if (!sh) {
    sh = ss.insertSheet(SHEET_SESSION);
    sh.appendRow(['TOKEN', 'USERNAME', 'CREATED AT', 'EXPIRES AT', 'LAST SEEN', 'USER AGENT', 'STATUS']);
    sh.getRange(1, 1, 1, 7).setFontWeight('bold').setBackground('#f4f7fb');
    sh.setFrozenRows(1);
  }
  return sh;
}

function _genToken() {
  return Utilities.getUuid().replace(/-/g, '') + Utilities.base64EncodeWebSafe(String(new Date().getTime())).replace(/=/g, '');
}

function getAppVersion() {
  var p = PropertiesService.getScriptProperties();
  return { version: p.getProperty(PROP_APP_VERSION) || '1', killSwitch: p.getProperty(PROP_KILL_SWITCH) === 'ON', forceReloadAt: Number(p.getProperty(PROP_FORCE_RELOAD) || 0) };
}

function killAllClients() {
  var p = PropertiesService.getScriptProperties();
  p.setProperty(PROP_KILL_SWITCH, 'ON');
  p.setProperty(PROP_FORCE_RELOAD, String(new Date().getTime()));
  try { var sh = _ss().getSheetByName(SHEET_SESSION); if (sh && sh.getLastRow() > 1) sh.getRange(2, 1, sh.getLastRow() - 1, sh.getLastColumn()).clearContent(); } catch (e) {}
  _clearAppCache();
  return { success: true, message: 'Đã ngắt toàn bộ client' };
}

function reopenClients() {
  var p = PropertiesService.getScriptProperties();
  p.deleteProperty(PROP_KILL_SWITCH);
  var v = String(Number(p.getProperty(PROP_APP_VERSION) || '1') + 1);
  p.setProperty(PROP_APP_VERSION, v);
  p.setProperty(PROP_FORCE_RELOAD, String(new Date().getTime()));
  return { success: true, version: v };
}

function bumpAppVersion() {
  var p = PropertiesService.getScriptProperties();
  var v = String(Number(p.getProperty(PROP_APP_VERSION) || '1') + 1);
  p.setProperty(PROP_APP_VERSION, v);
  p.setProperty(PROP_FORCE_RELOAD, String(new Date().getTime()));
  return { success: true, version: v };
}

function _createSession(username, userAgent) {
  try {
    var sh = _ensureSessionSheet(), token = _genToken(), now = new Date();
    var expires = new Date(now.getTime() + SESSION_TTL_DAYS * 86400000);
    sh.appendRow([token, username, now, expires, now, userAgent || '', 'Active']);
    return token;
  } catch (e) { return null; }
}

function loginByToken(token) {
  try {
    var v = getAppVersion();
    if (v.killSwitch) return { success: false, killed: true, message: 'Hệ thống đang bảo trì.' };
    if (!token) return { success: false, message: 'Thiếu token' };
    var sh = _ss().getSheetByName(SHEET_SESSION);
    if (!sh || sh.getLastRow() < 2) return { success: false, message: 'Token không tồn tại' };
    var rd = _readAll(sh), H = rd.headers, now = new Date();
    for (var i = 0; i < rd.rows.length; i++) {
      var t = String(_getByKey(rd.rows[i], H, 'SESSION', 'TOKEN') || '');
      if (t !== token) continue;
      var status = String(_getByKey(rd.rows[i], H, 'SESSION', 'STATUS') || '').toLowerCase();
      if (status !== 'active') return { success: false, message: 'Phiên đã bị thu hồi' };
      var exp = _getByKey(rd.rows[i], H, 'SESSION', 'EXPIRES_AT');
      if (exp && new Date(exp) < now) return { success: false, expired: true, message: 'Phiên đã hết hạn' };
      var username = String(_getByKey(rd.rows[i], H, 'SESSION', 'USERNAME') || '');
      if (!username) return { success: false, message: 'Token lỗi' };
      var iLastSeen = _colByKey(H, 'SESSION', 'LAST_SEEN');
      if (iLastSeen >= 0) sh.getRange(i + 2, iLastSeen + 1).setValue(now);
      var user = _getUserByUsername(username);
      if (!user) return { success: false, message: 'User không còn tồn tại' };
      return { success: true, user: user, appVersion: v.version };
    }
    return { success: false, message: 'Token không hợp lệ' };
  } catch (e) { return { success: false, message: e.toString() }; }
}

function logoutToken(token) {
  try {
    if (!token) return { success: true };
    var sh = _ss().getSheetByName(SHEET_SESSION);
    if (!sh || sh.getLastRow() < 2) return { success: true };
    var rd = _readAll(sh), H = rd.headers, iStatus = _colByKey(H, 'SESSION', 'STATUS');
    for (var i = 0; i < rd.rows.length; i++) {
      if (String(_getByKey(rd.rows[i], H, 'SESSION', 'TOKEN')) === token) { if (iStatus >= 0) sh.getRange(i + 2, iStatus + 1).setValue('Revoked'); return { success: true }; }
    }
    return { success: true };
  } catch (e) { return { success: false, message: e.toString() }; }
}

function pingApp(token, clientVersion) {
  try {
    var v = getAppVersion();
    var result = { version: v.version, killSwitch: v.killSwitch, forceReloadAt: v.forceReloadAt, needReload: false, ts: new Date().getTime() };
    if (clientVersion && String(clientVersion) !== String(v.version)) result.needReload = true;
    if (v.killSwitch) { result.killed = true; result.message = 'Hệ thống đang bảo trì'; }
    if (token) {
      try {
        var sh = _ss().getSheetByName(SHEET_SESSION);
        if (sh && sh.getLastRow() > 1) {
          var rd = _readAll(sh), H = rd.headers, iLastSeen = _colByKey(H, 'SESSION', 'LAST_SEEN');
          for (var i = 0; i < rd.rows.length; i++) { if (String(_getByKey(rd.rows[i], H, 'SESSION', 'TOKEN')) === token) { if (iLastSeen >= 0) sh.getRange(i + 2, iLastSeen + 1).setValue(new Date()); break; } }
        }
      } catch (e) {}
    }
    return result;
  } catch (e) { return { error: e.toString() }; }
}

const MMTB_BASE_URL = 'https://script.google.com/a/macros/tbsbag.com/s/AKfycbwvnEBIOlAAD78Q2gIm_lBKFGGKYcnKZyHevlwrKuJHIQ8Ypip2g-lfYG1DaFSlueTn0Q/exec';

function getMmtbRequestUrl(username) {
  try {
    if (!username) return { success: false, message: 'Thiếu username' };
    var user = _getUserByUsername(username);
    if (!user) return { success: false, message: 'Không tìm thấy user' };
    if (!user.token) return { success: false, message: 'Tài khoản chưa có Token MMTB. Liên hệ Admin để được cấp.' };
    var url = MMTB_BASE_URL + '?page=ycau&token=' + encodeURIComponent(user.token);
    return { success: true, url: url, token: user.token };
  } catch (e) { return { success: false, message: e.toString() }; }
}

function _genMmtbToken() {
  var chars = '0123456789ABCDEF', out = '';
  for (var i = 0; i < 8; i++) out += chars.charAt(Math.floor(Math.random() * chars.length));
  return out;
}

function generateMmtbTokenForUser(username, caller) {
  try {
    if (!_isAdminRole(caller && caller.role)) return { success: false, message: 'Chỉ Admin được thao tác' };
    if (!username) return { success: false, message: 'Thiếu username' };
    var sh = _sheet(SHEET_USER), rd = _readAll(sh), H = rd.headers;
    var iToken = _colByKey(H, 'USER', 'TOKEN');
    if (iToken < 0) return { success: false, message: 'Sheet USER chưa có cột TOKEN. Hãy thêm header "TOKEN" vào cột P.' };
    var unameLower = String(username).toLowerCase();
    for (var i = 0; i < rd.rows.length; i++) {
      var u = String(_getByKey(rd.rows[i], H, 'USER', 'USERNAME') || '').toLowerCase();
      if (u !== unameLower) continue;
      var newToken, tries = 0;
      do { newToken = _genMmtbToken(); tries++; } while (_isTokenDuplicate(rd.rows, H, newToken, i) && tries < 10);
      sh.getRange(i + 2, iToken + 1).setValue(newToken);
      _invalidateUserCache();
      return { success: true, token: newToken };
    }
    return { success: false, message: 'Không tìm thấy user' };
  } catch (e) { return { success: false, message: e.toString() }; }
}

function _isTokenDuplicate(rows, headers, token, skipIdx) {
  for (var i = 0; i < rows.length; i++) {
    if (i === skipIdx) continue;
    if (String(_getByKey(rows[i], headers, 'USER', 'TOKEN') || '').trim().toUpperCase() === String(token).toUpperCase()) return true;
  }
  return false;
}

function clearMmtbTokenForUser(username, caller) {
  try {
    if (!_isAdminRole(caller && caller.role)) return { success: false, message: 'Chỉ Admin được thao tác' };
    if (!username) return { success: false, message: 'Thiếu username' };
    var sh = _sheet(SHEET_USER), rd = _readAll(sh), H = rd.headers;
    var iToken = _colByKey(H, 'USER', 'TOKEN');
    if (iToken < 0) return { success: false, message: 'Sheet USER chưa có cột TOKEN' };
    var unameLower = String(username).toLowerCase();
    for (var i = 0; i < rd.rows.length; i++) {
      if (String(_getByKey(rd.rows[i], H, 'USER', 'USERNAME') || '').toLowerCase() === unameLower) { sh.getRange(i + 2, iToken + 1).setValue(''); _invalidateUserCache(); return { success: true }; }
    }
    return { success: false, message: 'Không tìm thấy user' };
  } catch (e) { return { success: false, message: e.toString() }; }
}

function setMmtbTokenForUser(username, token, caller) {
  try {
    if (!_isAdminRole(caller && caller.role)) return { success: false, message: 'Chỉ Admin được thao tác' };
    if (!username) return { success: false, message: 'Thiếu username' };
    var tokenUpper = String(token || '').trim().toUpperCase();
    if (!/^[0-9A-F]{8}$/.test(tokenUpper)) return { success: false, message: 'Token phải đúng 8 ký tự HEX (0-9, A-F)' };
    var sh = _sheet(SHEET_USER), rd = _readAll(sh), H = rd.headers;
    var iToken = _colByKey(H, 'USER', 'TOKEN');
    if (iToken < 0) return { success: false, message: 'Sheet USER chưa có cột TOKEN' };
    var unameLower = String(username).toLowerCase(), targetIdx = -1;
    for (var i = 0; i < rd.rows.length; i++) { if (String(_getByKey(rd.rows[i], H, 'USER', 'USERNAME') || '').toLowerCase() === unameLower) { targetIdx = i; break; } }
    if (targetIdx < 0) return { success: false, message: 'Không tìm thấy user' };
    if (_isTokenDuplicate(rd.rows, H, tokenUpper, targetIdx)) return { success: false, message: 'Token này đã được dùng bởi user khác' };
    sh.getRange(targetIdx + 2, iToken + 1).setValue(tokenUpper);
    _invalidateUserCache();
    return { success: true, token: tokenUpper };
  } catch (e) { return { success: false, message: e.toString() }; }
}

function sendCreatorNote(gembaId, customMessage, sender) {
  try {
    if (!gembaId) return { success: false, message: 'Thiếu Gemba ID' };
    if (!sender || !sender.username) return { success: false, message: 'Thiếu thông tin người gửi' };

    var g = getGembaById(gembaId);
    if (!g) return { success: false, message: 'Không tìm thấy phiếu' };

    var receiver = g.creatorUsername;
    if (!receiver) return { success: false, message: 'Phiếu chưa có người tạo' };

    if (String(receiver).toLowerCase() === String(sender.username).toLowerCase()) {
      return { success: false, message: 'Bạn là người tạo phiếu này, không cần gửi cho chính mình' };
    }

    var content = customMessage && String(customMessage).trim()
      ? String(customMessage).trim()
      : (sender.fullName || sender.username) + ' có phản hồi về phiếu ' + gembaId + ' (' + (g.title || '') + ').';

    var id = _createNotification(
      receiver, sender, 'info',
      'Phản hồi về phiếu ' + gembaId, content, gembaId
    );
    return { success: !!id, message: id ? 'Đã gửi cho người tạo' : 'Lỗi gửi' };
  } catch (e) { return { success: false, message: e.toString() }; }
}
/* ════════════════════════════════════════════════════════════
   BRANDING & ADMIN SETTINGS (cấu hình động, không hard-code)
════════════════════════════════════════════════════════════ */

// Danh sách các key được phép chỉnh qua giao diện Admin
var EDITABLE_SETTING_KEYS = [
  'APP_NAME', 'APP_DOT', 'APP_SUBTITLE', 'APP_ORG',
  'LOGIN_TITLE', 'LOGIN_SUBTITLE',
  'LOGIN_GROUPS', 'DEPARTMENTS', 'POSITIONS',
  'SLA_DAYS_LOW', 'SLA_DAYS_MEDIUM', 'SLA_DAYS_HIGH', 'SLA_DAYS_CRITICAL', 'SLA_DAYS',
  'ZALO_BOT_TOKEN', 'ZALO_GROUP_CHAT_ID'
];

// Trả về thông tin thương hiệu để frontend hiển thị
function getBranding() {
  return {
    appName:     _getSetting('APP_NAME',     'Gemba'),
    appDot:      _getSetting('APP_DOT',      'Pro'),
    appSubtitle: _getSetting('APP_SUBTITLE', 'NM SK Miền Đông'),
    appOrg:      _getSetting('APP_ORG',      'TBS Group'),
    loginTitle:    _getSetting('LOGIN_TITLE',    'Chào mừng đến TBS Group!'),
    loginSubtitle: _getSetting('LOGIN_SUBTITLE', 'Hệ thống quản lý Gemba — Nhà máy SK Miền Đông')
  };
}

// Đọc toàn bộ settings để hiển thị lên form Admin
function getAdminSettings(caller) {
  try {
    if (!_isAdminRole(caller && caller.role)) return { success: false, message: 'Chỉ Admin được xem' };
    var s = _getSettings();
    var out = {};
    EDITABLE_SETTING_KEYS.forEach(function(k) { out[k] = s[k] != null ? s[k] : ''; });
    return { success: true, settings: out };
  } catch (e) { return { success: false, message: e.toString() }; }
}

// Lưu settings từ form Admin vào sheet SETTINGS
function saveAdminSettings(data, caller) {
  try {
    if (!_isAdminRole(caller && caller.role)) return { success: false, message: 'Chỉ Admin được thao tác' };
    if (!data) return { success: false, message: 'Thiếu dữ liệu' };

    var lock = LockService.getScriptLock();
    lock.waitLock(8000);
    try {
      var ss = _ss();
      var sh = ss.getSheetByName(SHEET_SETTINGS);
      if (!sh) {
        sh = ss.insertSheet(SHEET_SETTINGS);
        sh.appendRow(['KEY', 'VALUE']);
        sh.getRange(1, 1, 1, 2).setFontWeight('bold').setBackground('#f4f7fb');
        sh.setFrozenRows(1);
      }

      // Đọc toàn bộ key hiện có để biết dòng nào cần cập nhật
      var lastRow = sh.getLastRow();
      var existRows = lastRow > 1 ? sh.getRange(2, 1, lastRow - 1, 1).getValues() : [];
      var keyRowMap = {}; // key -> số dòng thật trên sheet
      for (var i = 0; i < existRows.length; i++) {
        var k = String(existRows[i][0] || '').trim();
        if (k) keyRowMap[k] = i + 2;
      }

      EDITABLE_SETTING_KEYS.forEach(function(key) {
        if (!Object.prototype.hasOwnProperty.call(data, key)) return;
        var val = data[key] == null ? '' : String(data[key]).trim();
        if (keyRowMap[key]) {
          sh.getRange(keyRowMap[key], 2).setValue(val);
        } else {
          sh.appendRow([key, val]);
        }
      });

      // Xoá cache để lần đọc sau lấy giá trị mới
      _removeCache(CACHE_KEYS.SETTINGS);
      _invalidateMetadata();

      return { success: true, message: 'Đã lưu cấu hình' };
    } finally { lock.releaseLock(); }
  } catch (e) { return { success: false, message: 'Lỗi: ' + e.toString() }; }
}

// code test//

function kiemTraPhanXuongVaLine() {
  // Ép xóa cache triệt để để lấy dữ liệu tươi nhất
  CacheService.getScriptCache().removeAll(['DM_NML_RAW_V1', 'APP_METADATA']);
  PropertiesService.getScriptProperties().setProperty('CACHE_VERSION', String(new Date().getTime()));

  var rd = _getDmNmlRaw();
  var cols = rd.cols;

  Logger.log("--- BẮT ĐẦU ĐỌC SHEET PHÒNG BAN ---");
  if (cols['FACTORY'] < 0 || cols['LINE'] < 0) {
    Logger.log("❌ LỖI: Không tìm thấy cột 'NHÀ MÁY' hoặc 'LINE' (Dòng 1 bị sai tiêu đề).");
    return;
  }

  var count = 0;
  for (var i = 0; i < rd.rows.length; i++) {
    var r = rd.rows[i];
    var fac = _cellByCol(r, cols, 'FACTORY');
    var ln = _cellByCol(r, cols, 'LINE');
    var to = _cellByCol(r, cols, 'TEAM');

    // Chỉ in ra những dòng có chữ "PX" để dễ nhìn
    if (fac && String(fac).indexOf('PX') >= 0) {
       // Dùng dấu ngoặc vuông để phát hiện khoảng trắng thừa
       Logger.log("Dòng " + (i+2) + ": Nhà máy [" + fac + "] -> Line [" + ln + "] -> Tổ [" + to + "]");
       count++;
    }
  }
  Logger.log("=> Đã đọc " + count + " dòng có chứa chữ PX.");

  // Khớp thử với hệ thống Metadata (Cơ chế đẩy dữ liệu ra Frontend)
  var meta = getAppMetadata();
  var checkKey = 'PX chặt';
  
  Logger.log("--- KIỂM TRA LIÊN KẾT LINE CỦA [" + checkKey + "] ---");
  var lines = meta.linesByFactory[checkKey];
  
  if (lines && lines.length > 0) {
     Logger.log("✅ Thành công! Tìm thấy " + lines.length + " Line: " + lines.join(', '));
  } else {
     Logger.log("❌ THẤT BẠI: Dữ liệu bị đứt đoạn. Hệ thống KHÔNG CÓ Line nào thuộc chính xác cụm từ [" + checkKey + "].");
     Logger.log("👉 Các Nhà máy mà hệ thống thực sự nhận diện được là: " + JSON.stringify(meta.factories));
  }
}

function DONG_BO_CHINH_TA_TU_DONG() {
  var ss = SpreadsheetApp.getActiveSpreadsheet();
  
  // 1. Chuẩn hoá Sheet Phòng ban
  var shPB = ss.getSheetByName('Phòng ban');
  if(shPB) {
    var data = shPB.getDataRange().getValues();
    for(var i=1; i<data.length; i++) {
      data[i][0] = String(data[i][0]).trim().normalize('NFC'); // NHÀ MÁY
      data[i][1] = String(data[i][1]).trim().normalize('NFC'); // LINE
      data[i][2] = String(data[i][2]).trim().normalize('NFC'); // TỔ
    }
    shPB.getDataRange().setValues(data);
  }
  
  // 2. Chuẩn hoá Sheet SETTINGS
  var shST = ss.getSheetByName('SETTINGS');
  if(shST) {
    var data2 = shST.getDataRange().getValues();
    for(var i=1; i<data2.length; i++) {
      if(data2[i][0] === 'LOGIN_GROUPS') {
         var parts = String(data2[i][1]).split(',');
         for(var j=0; j<parts.length; j++) {
           parts[j] = parts[j].trim().normalize('NFC');
         }
         data2[i][1] = parts.join(', ');
      }
    }
    shST.getDataRange().setValues(data2);
  }
  
  // 3. Chuẩn hoá Sheet USER
  var shU = ss.getSheetByName('USER');
  if(shU) {
    var data3 = shU.getDataRange().getValues();
    for(var i=1; i<data3.length; i++) {
      if(data3[i][3]) data3[i][3] = String(data3[i][3]).trim().normalize('NFC'); // Cột D: Nhóm
      if(data3[i][4]) data3[i][4] = String(data3[i][4]).trim().normalize('NFC'); // Cột E: Nhà máy
      if(data3[i][5]) data3[i][5] = String(data3[i][5]).trim().normalize('NFC'); // Cột F: Line
    }
    shU.getDataRange().setValues(data3);
  }

  // 4. Quét sạch Cache
  CacheService.getScriptCache().removeAll(['APP_SETTINGS', 'APP_METADATA', 'DM_NML_RAW_V1', 'USER_RAW_V1']);
  PropertiesService.getScriptProperties().setProperty('CACHE_VERSION', String(new Date().getTime()));
  
  Logger.log("🎉 ĐÃ CHUẨN HOÁ XONG! BẠN HÃY F5 LẠI TRANG WEB VÀ THỬ ĐĂNG KÝ!");
  
}
/* ════════════════════════════════════════════════════════════
   ZALO BOT INTEGRATION
════════════════════════════════════════════════════════════ */

const PROP_ZALO_BOT_TOKEN = 'ZALO_BOT_TOKEN';

function _getZaloBotToken() {
   var props = PropertiesService.getScriptProperties();

  return String(
    props.getProperty('ZALO_BOT_TOKEN') ||
    _getSetting('ZALO_BOT_TOKEN', '') ||
    ''
  ).trim();
}


/**
 * Gửi tin nhắn trực tiếp tới Zalo Bot chat_id
 */
function _sendZaloMessage(chatId, text) {
  try {
    chatId = String(chatId || '').trim();
    text   = String(text || '').trim();

    if (!chatId) {
      return {
        success: false,
        message: 'Thiếu Zalo chat_id'
      };
    }

    if (!text) {
      return {
        success: false,
        message: 'Nội dung Zalo trống'
      };
    }

    var token = _getZaloBotToken();

    if (!token) {
      return {
        success: false,
        message: 'Chưa cấu hình ZALO_BOT_TOKEN'
      };
    }

    // Zalo giới hạn text tối đa 2000 ký tự
    if (text.length > 2000) {
      text = text.substring(0, 1997) + '...';
    }

    var url =
      'https://bot-api.zaloplatforms.com/bot' +
      token +
      '/sendMessage';

    var payload = {
      chat_id: chatId,
      text: text
    };

    var response = UrlFetchApp.fetch(url, {
      method: 'post',
      contentType: 'application/json',
      payload: JSON.stringify(payload),
      muteHttpExceptions: true
    });

    var statusCode = response.getResponseCode();
    var body = response.getContentText();

    var json = null;

    try {
      json = JSON.parse(body);
    } catch (parseError) {}

    if (
      statusCode >= 200 &&
      statusCode < 300 &&
      json &&
      json.ok
    ) {
      return {
        success: true,
        result: json.result || null
      };
    }

    console.error(
      '[ZALO BOT] Send failed:',
      statusCode,
      body
    );

    return {
      success: false,
      statusCode: statusCode,
      response: json || body
    };

  } catch (e) {

    console.error('[ZALO BOT ERROR]', e);

    return {
      success: false,
      message: e.toString()
    };
  }
}


/**
 * Lấy Zalo chat_id từ username
 */
function _getZaloChatIdByUsername(username) {
  try {

    if (!username) return '';

    var rd   = _getUserRaw();
    var cols = rd.cols;

    var target = String(username)
      .trim()
      .toLowerCase();

    for (var i = 0; i < rd.rows.length; i++) {

      var rowUsername = String(
        _cellByCol(
          rd.rows[i],
          cols,
          'USERNAME'
        ) || ''
      ).trim().toLowerCase();

      if (rowUsername !== target) continue;

      return String(
        _cellByCol(
          rd.rows[i],
          cols,
          'ZALO_CHAT_ID'
        ) || ''
      ).trim();
    }

    return '';

  } catch (e) {
    console.error('[ZALO CHAT ID ERROR]', e);
    return '';
  }
}


/**
 * Gửi Zalo theo username hệ thống
 */
function _sendZaloToUser(username, title, content, gembaId) {
  try {

    var chatId =
      _getZaloChatIdByUsername(username);

    if (!chatId) {
      return {
        success: false,
        skipped: true,
        message: 'User chưa liên kết Zalo'
      };
    }

    var lines = [];

    if (title) {
      lines.push('🔔 ' + title);
    }

    if (gembaId) {
      lines.push('');
      lines.push('📋 Phiếu: ' + gembaId);
    }

    if (content) {
      lines.push('');
      lines.push(content);
    }

    lines.push('');
    lines.push('— Gemba.Pro | TBS Group');

    return _sendZaloMessage(
      chatId,
      lines.join('\n')
    );

  } catch (e) {

    return {
      success: false,
      message: e.toString()
    };
  }
}
/* ============================================================
   ZALO GROUP - BỔ SUNG CHO MODULE ZALO ĐÃ CÓ
============================================================ */

const PROP_ZALO_GROUP_CHAT_ID = 'ZALO_GROUP_CHAT_ID';

function _getZaloGroupChatId() {
  var props = PropertiesService.getScriptProperties();

  return String(
    props.getProperty('ZALO_GROUP_CHAT_ID') ||
    _getSetting('ZALO_GROUP_CHAT_ID', '') ||
    ''
  ).trim();
}

function _setZaloGroupChatId(chatId) {
  chatId = String(chatId || '').trim();

  if (!chatId) {
    throw new Error('chat_id Group trống');
  }

  PropertiesService
    .getScriptProperties()
    .setProperty(PROP_ZALO_GROUP_CHAT_ID, chatId);

  return chatId;
}

function _sendZaloGroupMessage(text) {
  var chatId = _getZaloGroupChatId();

  if (!chatId) {
    return {
      success: false,
      message: 'Chưa cấu hình ZALO_GROUP_CHAT_ID'
    };
  }

  // Dùng lại hàm đã có, KHÔNG khai báo lại
  return _sendZaloMessage(chatId, text);
}

function _sendGembaToZaloGroup(title, content, gembaId) {
  var lines = [];

  lines.push('🔔 GEMBA.PRO');

  if (title) {
    lines.push('');
    lines.push(String(title));
  }

  if (gembaId) {
    lines.push('');
    lines.push('📋 Mã phiếu: ' + String(gembaId));
  }

  if (content) {
    lines.push('');
    lines.push(String(content));
  }

  lines.push('');
  lines.push('────────────────');
  lines.push('Gemba.Pro — TBS Group');
  lines.push('NM SK Miền Đông');

  return _sendZaloGroupMessage(lines.join('\n'));
}


/* ============================================================
   TEST CONFIG
============================================================ */

function TEST_ZALO_CONFIG() {
  var token = _getZaloBotToken();
  var groupId = _getZaloGroupChatId();

  var result = {
    success: !!token,
    tokenConfigured: !!token,
    groupConfigured: !!groupId,
    groupChatId: groupId || '',
    message: !token
      ? 'Chưa có ZALO_BOT_TOKEN'
      : (!groupId
          ? 'Bot Token OK - chưa có Group Chat ID'
          : 'Cấu hình Zalo Bot + Group OK')
  };

  Logger.log(JSON.stringify(result, null, 2));
  return result;
}


/* ============================================================
   TEST GỬI GROUP
============================================================ */

function TEST_ZALO_GROUP() {
  var result = _sendZaloGroupMessage(
    '🧪 TEST GEMBA.PRO\n\n' +
    'Kết nối Zalo Group thành công.\n\n' +
    'Thời gian: ' +
    Utilities.formatDate(
      new Date(),
      Session.getScriptTimeZone(),
      'dd/MM/yyyy HH:mm:ss'
    )
  );

  Logger.log(JSON.stringify(result, null, 2));

  return result;
}
function TEST_ZALO_WEBHOOK_SELF() {

  // DÁN ĐÚNG WEB APP URL /exec Ở ĐÂY
  var url =
    'https://script.google.com/macros/s/AKfycbwDzeXmQtzcfN8N-w2UHqDwVZUWI-Yybk5Pf_8-19RToSVVipQecXG4U7_Ra7o6AqBaDg/exec';

  // Chỉ test webhook, KHÔNG fake ZALO_GROUP_CHAT_ID
  var payload = {
    source: 'SELF_TEST',
    timestamp: new Date().toISOString(),
    text: 'TEST WEBHOOK'
  };

  var response = UrlFetchApp.fetch(url, {
    method: 'post',
    contentType: 'application/json',
    payload: JSON.stringify(payload),
    muteHttpExceptions: true,
    followRedirects: true
  });

  Logger.log(
    'HTTP CODE = ' + response.getResponseCode()
  );

  Logger.log(
    'RESPONSE = ' + response.getContentText()
  );
}
/* ============================================================
   TEST WEBHOOK URL HIỆN ZALO ĐANG GIỮ
============================================================ */

function TEST_CURRENT_ZALO_WEBHOOK_URL() {
  try {
    var url =
      'https://script.google.com/macros/s/AKfycbwDzeXmQtzcfN8N-w2UHqDwVZUWI-Yybk5Pf_8-19RToSVVipQecXG4U7_Ra7o6AqBaDg/exec';

    var payload = {
      source: 'TEST_CURRENT_ZALO_WEBHOOK_URL',
      timestamp: new Date().toISOString(),
      text: 'TEST CURRENT ZALO WEBHOOK URL'
    };

    var response = UrlFetchApp.fetch(url, {
      method: 'post',
      contentType: 'application/json',
      payload: JSON.stringify(payload),
      muteHttpExceptions: true,
      followRedirects: true
    });

    Logger.log(
      'HTTP = ' + response.getResponseCode()
    );

    Logger.log(
      'RESPONSE = ' + response.getContentText()
    );

    return {
      success: true,
      httpCode: response.getResponseCode(),
      response: response.getContentText()
    };

  } catch (error) {

    Logger.log(
      'ERROR = ' + error.toString()
    );

    return {
      success: false,
      error: error.toString()
    };
  }
}


/* ============================================================
   TEST GET UPDATES TỪ ZALO BOT
============================================================ */

function TEST_ZALO_GET_UPDATES() {
  try {
    var token = _getZaloBotToken();

    if (!token) {
      throw new Error(
        'Chưa có ZALO_BOT_TOKEN'
      );
    }

    var url =
      'https://bot-api.zaloplatforms.com/bot' +
      token +
      '/getUpdates';

    var response = UrlFetchApp.fetch(url, {
      method: 'post',
      contentType: 'application/json',
      payload: JSON.stringify({}),
      muteHttpExceptions: true
    });

    var httpCode =
      response.getResponseCode();

    var body =
      response.getContentText();

    Logger.log(
      'HTTP = ' + httpCode
    );

    Logger.log(
      'RESPONSE = ' + body
    );

    return {
      success: true,
      httpCode: httpCode,
      response: body
    };

  } catch (error) {

    Logger.log(
      'ERROR = ' + error.toString()
    );

    return {
      success: false,
      error: error.toString()
    };
  }
}
function TEMP_DELETE_ZALO_WEBHOOK() {
  var token = _getZaloBotToken();

  if (!token) {
    throw new Error('Chưa có ZALO_BOT_TOKEN');
  }

  var url =
    'https://bot-api.zaloplatforms.com/bot' +
    token +
    '/deleteWebhook';

  var response = UrlFetchApp.fetch(url, {
    method: 'post',
    contentType: 'application/json',
    payload: '{}',
    muteHttpExceptions: true
  });

  Logger.log(
    'HTTP = ' + response.getResponseCode()
  );

  Logger.log(
    'RESPONSE = ' + response.getContentText()
  );
}
function CAPTURE_ZALO_GROUP_CHAT_ID() {
  var token = _getZaloBotToken();

  if (!token) {
    throw new Error('Chưa có ZALO_BOT_TOKEN');
  }

  var url =
    'https://bot-api.zaloplatforms.com/bot' +
    token +
    '/getUpdates';

  var response = UrlFetchApp.fetch(url, {
    method: 'post',
    contentType: 'application/json',
    payload: JSON.stringify({
      timeout: '5'
    }),
    muteHttpExceptions: true
  });

  var body = response.getContentText();

  Logger.log(
    'HTTP = ' + response.getResponseCode()
  );

  Logger.log(
    'RAW = ' + body
  );

  var json = JSON.parse(body);

  if (!json || !json.ok) {
    throw new Error(
      'getUpdates lỗi: ' + body
    );
  }

  var update = json.result;

  // Có SDK trả object, có nơi có thể trả array
  if (Array.isArray(update)) {
    if (!update.length) {
      throw new Error(
        'Chưa có update. Hãy nhắn @Bot trong group rồi chạy lại.'
      );
    }

    update = update[update.length - 1];
  }

  var chat =
    update &&
    update.message &&
    update.message.chat
      ? update.message.chat
      : null;

  if (!chat || !chat.id) {
    throw new Error(
      'Update chưa có message.chat.id. RAW = ' + body
    );
  }

  var chatId =
    String(chat.id).trim();

  var chatType =
    String(
      chat.chat_type ||
      chat.type ||
      ''
    )
    .trim()
    .toUpperCase();

  Logger.log(
    'CHAT ID = ' + chatId
  );

  Logger.log(
    'CHAT TYPE = ' + chatType
  );

  if (
    chatType &&
    chatType !== 'GROUP'
  ) {
    throw new Error(
      'Update này không phải GROUP. TYPE=' +
      chatType
    );
  }

  _setZaloGroupChatId(chatId);

  Logger.log(
    '✅ ĐÃ LƯU ZALO_GROUP_CHAT_ID = ' +
    chatId
  );

  return {
    success: true,
    groupChatId: chatId,
    chatType: chatType
  };
}
function RESTORE_ZALO_WEBHOOK() {
  try {
    var token = _getZaloBotToken();

    if (!token) {
      throw new Error(
        'Chưa cấu hình ZALO_BOT_TOKEN'
      );
    }


    var webhookUrl =
      ScriptApp
        .getService()
        .getUrl();


    if (!webhookUrl) {
      throw new Error(
        'Không lấy được Web App URL hiện tại'
      );
    }


    var secret =
      PropertiesService
        .getScriptProperties()
        .getProperty(
          'ZALO_WEBHOOK_SECRET'
        );


    if (!secret) {
      throw new Error(
        'Chưa cấu hình ZALO_WEBHOOK_SECRET trong Script Properties'
      );
    }


    var apiUrl =
      'https://bot-api.zaloplatforms.com/bot' +
      token +
      '/setWebhook';


    Logger.log(
      'WEBHOOK URL = ' +
      webhookUrl
    );


    var response =
      UrlFetchApp.fetch(
        apiUrl,
        {
          method: 'post',

          contentType:
            'application/json',

          payload:
            JSON.stringify({
              url: webhookUrl,
              secret_token: secret
            }),

          muteHttpExceptions: true
        }
      );


    var httpCode =
      response.getResponseCode();

    var body =
      response.getContentText();


    Logger.log(
      'HTTP = ' +
      httpCode
    );

    Logger.log(
      'RESPONSE = ' +
      body
    );


    var json = null;

    try {
      json =
        JSON.parse(body);
    } catch (parseError) {
      throw new Error(
        'Zalo trả response không phải JSON: ' +
        body
      );
    }


    if (
      !json ||
      !json.ok
    ) {
      throw new Error(
        'Set webhook thất bại: ' +
        body
      );
    }


    Logger.log(
      '✅ RESTORE ZALO WEBHOOK THÀNH CÔNG'
    );

    Logger.log(
      '✅ URL = ' +
      webhookUrl
    );


    return {
      success: true,
      webhookUrl: webhookUrl,
      zaloResponse: json
    };


  } catch (error) {

    Logger.log(
      '❌ RESTORE_ZALO_WEBHOOK ERROR = ' +
      error.toString()
    );

    throw error;
  }
}
function _zaloEnqueue(gembaId) {
  var lock = LockService.getScriptLock();
  lock.waitLock(5000);
  try {
    var p = PropertiesService.getScriptProperties();
    var q = JSON.parse(p.getProperty('ZALO_QUEUE') || '{}');
    if (!q[gembaId]) q[gembaId] = 0;
    p.setProperty('ZALO_QUEUE', JSON.stringify(q));
  } finally { lock.releaseLock(); }
}

function ZALO_RETRY_QUEUE() {
  var lock = LockService.getScriptLock();
  lock.waitLock(20000);
  try {
    var p = PropertiesService.getScriptProperties();
    var q = JSON.parse(p.getProperty('ZALO_QUEUE') || '{}');
    Object.keys(q).forEach(function(id) {
      var r = sendCreatedGembaToZalo(id);
      if ((r && r.success) || ++q[id] >= 12) delete q[id];   // tối đa 12 lần
    });
    p.setProperty('ZALO_QUEUE', JSON.stringify(q));
  } finally { lock.releaseLock(); }
}

function SETUP_ZALO_TRIGGERS() {
  ScriptApp.getProjectTriggers().forEach(function(t) {
    if (t.getHandlerFunction() === 'ZALO_RETRY_QUEUE') ScriptApp.deleteTrigger(t);
  });
  ScriptApp.newTrigger('ZALO_RETRY_QUEUE').timeBased().everyMinutes(1).create();
}
function DEBUG_ZALO_GEMBA() {
  var id = 'GB-2026-0035';               // phiếu CN-CI vừa tạo
  CacheService.getScriptCache().remove('ZALO_GEMBA_SENT_' + id);  // bỏ dedupe để gửi lại
  var g = getGembaById(id);
  Logger.log('GEMBA = ' + JSON.stringify(g));
  var r = sendCreatedGembaToZalo(id);
  Logger.log('RESULT = ' + JSON.stringify(r));
}
/* ============================================================
   BÁO CÁO TUẦN GỬI GROUP ZALO (Thứ 7 12:00)
============================================================ */

function _zaloTrunc(s, n) {
  s = String(s || '').replace(/\s+/g, ' ').trim();
  return s.length > n ? s.substring(0, n - 1) + '…' : s;
}

function _zaloBuildWeeklyReport(now) {
  now = now || new Date();

  // Thứ 2 00:00 của tuần hiện tại
  var start = new Date(now);
  start.setDate(now.getDate() - ((now.getDay() + 6) % 7));
  start.setHours(0, 0, 0, 0);

  var sh   = _sheet(SHEET_GEMBA);
  var rd   = _readAll(sh);                       // đọc trực tiếp, không qua cache
  var cols = _buildColMap(rd.headers, 'GEMBA');
  var sla  = getAppMetadata().sla;

  var total = 0, done = 0, rejected = 0;
  var byAssignee = {};          // username -> { name, items: [] }
  var backlogOld = 0, backlogOldOverdue = 0;

  rd.rows.forEach(function(r) {
    var id = String(_cellByCol(r, cols, 'ID') || '').trim();
    if (!id) return;

    var createdRaw = _cellByCol(r, cols, 'CREATED_AT') || _cellByCol(r, cols, 'RECORDED_DATE');
    var created = createdRaw ? new Date(createdRaw) : null;
    if (!created || isNaN(created.getTime())) return;

    var realStatus = String(_cellByCol(r, cols, 'STATUS') || STATUS.NEW).trim();
    var closed = _isClosed(realStatus);
    var display = _computeOverdue(
      realStatus, createdRaw,
      _cellByCol(r, cols, 'PRIORITY') || 'Medium',
      sla, _cellByCol(r, cols, 'STARTED_AT')
    );

    // Tồn đọng từ tuần trước
    if (created < start) {
      if (!closed) {
        backlogOld++;
        if (display === STATUS.OVERDUE) backlogOldOverdue++;
      }
      return;
    }
    if (created > now) return;

    // Phiếu tạo trong tuần
    total++;
    if (realStatus === STATUS.DONE)          { done++; return; }
    if (realStatus === STATUS.REJECTED)      { rejected++; return; }

    var user = String(_cellByCol(r, cols, 'ASSIGNEE_USER') || '').trim() || '(chưa gán)';
    var name = String(_cellByCol(r, cols, 'ASSIGNEE_NAME') || '').trim() || user;
    if (!byAssignee[user]) byAssignee[user] = { name: name, items: [] };
    byAssignee[user].items.push({
      id: id,
      title: _zaloTrunc(_cellByCol(r, cols, 'TITLE'), 60),
      place: [_cellByCol(r, cols, 'LINE'), _cellByCol(r, cols, 'TEAM')]
               .filter(function(x) { return x; }).join(' / '),
      status: display
    });
  });

  var pending = total - done - rejected;
  var rate = total > 0 ? Math.round((done / total) * 1000) / 10 : 0;
  var tz = Session.getScriptTimeZone();

  var L = [];
  L.push('📊 GEMBA.PRO — BÁO CÁO TUẦN ' + _getWeekLabel(now));
  L.push('🗓 Từ ' + Utilities.formatDate(start, tz, 'dd/MM') +
         ' đến ' + Utilities.formatDate(now, tz, 'dd/MM/yyyy HH:mm'));
  L.push('');
  L.push('📝 Tổng phiếu tạo trong tuần: ' + total);
  L.push('✅ Đã xử lý: ' + done + (total ? ' (' + rate + '%)' : ''));
  L.push('⏳ Chưa xử lý: ' + pending);
  if (rejected) L.push('🚫 Từ chối: ' + rejected);

  if (pending > 0) {
    L.push('');
    L.push('👷 DANH SÁCH CHƯA XỬ LÝ THEO NGƯỜI PHỤ TRÁCH:');

    Object.keys(byAssignee)
      .sort(function(a, b) { return byAssignee[b].items.length - byAssignee[a].items.length; })
      .forEach(function(u) {
        var g = byAssignee[u];
        L.push('');
        L.push('▶ ' + g.name + (u !== g.name && u !== '(chưa gán)' ? ' (' + u + ')' : '') +
               ' — ' + g.items.length + ' phiếu');
        g.items.forEach(function(it) {
          L.push('  • ' + it.id + ' — ' + it.title +
                 (it.place ? ' [' + it.place + ']' : '') +
                 (it.status === STATUS.OVERDUE ? ' ⚠️ Quá hạn' : ' (' + it.status + ')'));
        });
      });
  } else if (total > 0) {
    L.push('');
    L.push('🎉 Tất cả phiếu trong tuần đã được xử lý.');
  } else {
    L.push('');
    L.push('Tuần này chưa có phiếu nào được tạo.');
  }

  if (backlogOld > 0) {
    L.push('');
    L.push('📌 Tồn từ các tuần trước: ' + backlogOld + ' phiếu chưa đóng' +
           (backlogOldOverdue ? ' (' + backlogOldOverdue + ' quá hạn)' : ''));
  }

  var appUrl = ScriptApp.getService().getUrl() || '';
  if (appUrl) { L.push(''); L.push('🔗 Mở Gemba.Pro: ' + appUrl); }
  L.push('────────────────');
  L.push('Gemba.Pro — TBS Group');
  L.push('NM SK Miền Đông');

  return { text: L.join('\n'), weekLabel: _getWeekLabel(now) };
}

function _zaloSendWeeklyReport(force) {
  var now = new Date();
  var rep = _zaloBuildWeeklyReport(now);

  var cache = CacheService.getScriptCache();
  var key = 'ZALO_WEEKLY_' + rep.weekLabel;
  if (!force && cache.get(key) === '1') {
    return { success: true, skipped: true, message: 'Báo cáo tuần này đã gửi' };
  }

  var result = null;
  for (var i = 0; i < 3; i++) {                  // thử tối đa 3 lần
    result = _sendZaloGroupLongMessage(rep.text);
    if (result && result.success) {
      if (!force) cache.put(key, '1', 21600);
      break;
    }
    Utilities.sleep(2000 * (i + 1));
  }

  console.log('[ZALO WEEKLY]', JSON.stringify(result));
  return result;
}

/* Hàm được trigger gọi (KHÔNG nhận tham số) */
function ZALO_WEEKLY_REPORT() {
  return _zaloSendWeeklyReport(false);
}

/* Chạy tay để xem thử ngay, luôn gửi, không bị chặn trùng */
function TEST_ZALO_WEEKLY_REPORT() {
  var rep = _zaloBuildWeeklyReport(new Date());
  Logger.log(rep.text);                          // xem nội dung trước
  var r = _zaloSendWeeklyReport(true);
  Logger.log('RESULT = ' + JSON.stringify(r));
  return r;
}

/* Cài trigger: chạy 1 lần duy nhất */
function SETUP_ZALO_WEEKLY_TRIGGER() {
  ScriptApp.getProjectTriggers().forEach(function(t) {
    if (t.getHandlerFunction() === 'ZALO_WEEKLY_REPORT') ScriptApp.deleteTrigger(t);
  });
  ScriptApp.newTrigger('ZALO_WEEKLY_REPORT')
    .timeBased()
    .onWeekDay(ScriptApp.WeekDay.SATURDAY)
    .atHour(16)
    .nearMinute(0)
    .create();
  Logger.log('✅ Đã cài báo cáo tuần: Thứ 7 ~16:00');
}