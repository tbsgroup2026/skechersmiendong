function _anUserDeptInfo() {
  var userDept = {}, deptHeadcount = {};
  var sh = _ss().getSheetByName(SHEET_USER);
  if (!sh) return { userDept: userDept, deptHeadcount: deptHeadcount };
  var rd = _readAll(sh);
  if (!rd.rows.length) return { userDept: userDept, deptHeadcount: deptHeadcount };
  var cols = _buildColMap(rd.headers, 'USER');
  if (cols.USERNAME < 0 || cols.DEPT < 0) return { userDept: userDept, deptHeadcount: deptHeadcount };

  rd.rows.forEach(function (r) {
    var u = _cellByCol(r, cols, 'USERNAME');
    if (!u) return;
    var key  = String(u).trim();
    var dept = String(_cellByCol(r, cols, 'DEPT') || '').trim() || null;
    userDept[key] = dept;
    var st = String(_cellByCol(r, cols, 'STATUS') || 'Active').trim().toLowerCase();
    if (dept && st !== 'inactive') deptHeadcount[dept] = (deptHeadcount[dept] || 0) + 1;
  });
  return { userDept: userDept, deptHeadcount: deptHeadcount };
}

function getAnalyticsData() {
  var ss    = _ss();
  var sheet = _sheet(SHEET_GEMBA);
  var tz    = ss.getSpreadsheetTimeZone();
  var values = sheet.getDataRange().getValues();
  var headers = values.length ? values[0].map(function (h) { return String(h).trim(); }) : [];
  var rows = [];

  for (var i = 1; i < values.length; i++) {
    var row = values[i];
    if (row[0] === '' || row[0] === null) continue;
    var obj = {};
    for (var c = 0; c < headers.length; c++) {
      var h = headers[c];
      if (!h) continue;
      var v = row[c];
      if (v instanceof Date) v = Utilities.formatDate(v, tz, "yyyy-MM-dd'T'HH:mm:ss");
      else if (v === '') v = null;
      obj[h] = v;
    }
    rows.push(obj);
  }

  var info = _anUserDeptInfo();
  var sla = {};
  try { sla = getAppMetadata().sla || {}; } catch (e) {}
  return { rows: rows, userDept: info.userDept, deptHeadcount: info.deptHeadcount, sla: sla };
}
