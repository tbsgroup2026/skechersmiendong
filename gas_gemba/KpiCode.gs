function _kpiNew(len) { return { y: 0, m: new Array(len).fill(0), c: null }; }
function _kpiKid(n, key, len) {
  if (!n.c) n.c = {};
  if (!n.c[key]) n.c[key] = _kpiNew(len);
  return n.c[key];
}
function _kpiBump(n, mi) { n.y++; n.m[mi]++; }
function _kpiVi(a, b) { return String(a).localeCompare(String(b), 'vi'); }

function _kpiKids(n, order) {
  if (!n || !n.c) return [];
  var keys = Object.keys(n.c);
  if (order) {
    var rest = keys.filter(function (k) { return order.indexOf(k) < 0; }).sort(_kpiVi);
    keys = order.filter(function (k) { return n.c[k]; }).concat(rest);
  } else keys.sort(_kpiVi);
  return keys.map(function (k) {
    var x = n.c[k];
    return { name: k, y: x.y, m: x.m, c: _kpiKids(x) };
  });
}

function _kpiNumSort(a, b) {
  var na = parseInt(String(a).replace(/\D+/g, ''), 10), nb = parseInt(String(b).replace(/\D+/g, ''), 10);
  if (!isNaN(na) && !isNaN(nb) && na !== nb) return na - nb;
  return _kpiVi(a, b);
}

function getKpiData(params) {
  try {
    params = params || {};
    var user = params.user || null;
    if (user && !_canViewDashboard(user.role)) return { success: false, message: 'Bạn không có quyền xem báo cáo KPI' };

    var rd = _getGembaRaw();
    var meta = getAppMetadata();
    var sla = meta.sla || {};
    var target = sla.Default || 2;
    var now = new Date(), curYear = now.getFullYear(), curMonth = now.getMonth() + 1, L = curMonth;
    var months = [];
    for (var mm = 1; mm <= curMonth; mm++) months.push({ m: mm, label: 'Th' + mm });

    var total = _kpiNew(L), orgRoot = _kpiNew(L), typeRoot = _kpiNew(L), subRoot = _kpiNew(L), subFacRoot = {};

    function seedSub(root) {
      TYPE_ORDER.forEach(function (t) {
        var tn = _kpiKid(root, t, L);
        ((meta.issuesByCategory || {})[t] || []).forEach(function (it) { if (it.name) _kpiKid(tn, it.name, L); });
      });
    }
    seedSub(subRoot);
    (meta.factories || []).forEach(function (f) {
      var fn = _kpiKid(orgRoot, f, L);
      ((meta.linesByFactory || {})[f] || []).forEach(function (ln) {
        var lo = _kpiKid(fn, ln, L);
        ((meta.toByLine || {})[f + '||' + ln] || []).forEach(function (tm) { _kpiKid(lo, tm, L); });
      });
      var tf = _kpiKid(typeRoot, f, L);
      TYPE_ORDER.forEach(function (t) { _kpiKid(tf, t, L); });
      subFacRoot[f] = _kpiNew(L); seedSub(subFacRoot[f]);
    });

    var ptFac = {}, ptFL = {}, ptType = {}, ptFT = {}, ptTS = {}, ptFTS = {}, ptAll = { s: 0, c: 0 };
    function add(map, key, d) { var o = map[key] || (map[key] = { s: 0, c: 0 }); o.s += d; o.c++; }
    function av(o) { return o && o.c ? Math.round((o.s / o.c) * 100) / 100 : 0; }

    var cols = rd.cols || {};
    var rows = rd.rows || [];
    for (var i = 0; i < rows.length; i++) {
      var r = rows[i];
      if (!_cellByCol(r, cols, 'ID')) continue;
      if (user && !_canViewRow(user, r, cols)) continue;

      var fac   = String(_cellByCol(r, cols, 'FACTORY') || '').trim() || 'Khác';
      var ln    = String(_cellByCol(r, cols, 'LINE') || '').trim() || 'Chung';
      var tm    = String(_cellByCol(r, cols, 'TEAM') || '').trim() || 'Chung';
      var issue = String(_cellByCol(r, cols, 'ISSUE_NAME') || '').trim() || 'Khác';
      var tk    = _matchTypeKey(_cellByCol(r, cols, 'TYPE_CODE'));
      var ref   = _cellByCol(r, cols, 'CREATED_AT') || _cellByCol(r, cols, 'RECORDED_DATE');
      var d     = ref ? new Date(ref) : null;

      if (d && !isNaN(d.getTime()) && d.getFullYear() === curYear) {
        var mi = d.getMonth();
        if (mi < L) {
          _kpiBump(total, mi);
          var fo = _kpiKid(orgRoot, fac, L); _kpiBump(fo, mi);
          var lo = _kpiKid(fo, ln, L); _kpiBump(lo, mi);
          _kpiBump(_kpiKid(lo, tm, L), mi);

          var ft = _kpiKid(typeRoot, fac, L); _kpiBump(ft, mi);
          _kpiBump(_kpiKid(ft, tk, L), mi);

          var sg = _kpiKid(subRoot, tk, L); _kpiBump(sg, mi);
          _kpiBump(_kpiKid(sg, issue, L), mi);

          if (!subFacRoot[fac]) { subFacRoot[fac] = _kpiNew(L); seedSub(subFacRoot[fac]); }
          var sf = _kpiKid(subFacRoot[fac], tk, L); _kpiBump(sf, mi);
          _kpiBump(_kpiKid(sf, issue, L), mi);
        }
      }

      if (String(_cellByCol(r, cols, 'STATUS') || '') === STATUS.DONE) {
        var hrs = Number(_cellByCol(r, cols, 'PROCESS_HOURS') || 0);
        if (hrs > 0 && !isNaN(hrs)) {
          var days = Math.round((hrs / 24) * 100) / 100;
          add(ptFac, fac, days); add(ptFL, fac + '||' + ln, days);
          add(ptType, tk, days); add(ptFT, fac + '||' + tk, days);
          add(ptTS, tk + '||' + issue, days); add(ptFTS, fac + '||' + tk + '||' + issue, days);
          ptAll.s += days; ptAll.c++;
        }
      }
    }

    var facs = Object.keys(orgRoot.c || {}).sort(_kpiVi);
    var byType = function (a, b) { return TYPE_ORDER.indexOf(a.name) - TYPE_ORDER.indexOf(b.name); };

    var org = _kpiKids(orgRoot);
    var types = _kpiKids(typeRoot).map(function (f) { f.c.sort(byType); return f; });
    var subAll = _kpiKids(subRoot).sort(byType);
    var subByFac = {};
    Object.keys(subFacRoot).forEach(function (f) { subByFac[f] = _kpiKids(subFacRoot[f]).sort(byType); });

    var lineSet = {};
    Object.keys(ptFL).forEach(function (k) { lineSet[k.split('||')[1]] = true; });
    var lines = Object.keys(lineSet).sort(_kpiNumSort);

    function typeList(map, prefix) {
      return TYPE_ORDER.map(function (t) {
        var o = map[prefix ? prefix + t : t];
        return { label: t, value: av(o), count: o ? o.c : 0 };
      });
    }
    function subMap(map, prefix) {
      var res = {};
      Object.keys(map).forEach(function (k) {
        if (prefix && k.indexOf(prefix) !== 0) return;
        var parts = (prefix ? k.slice(prefix.length) : k).split('||');
        var t = parts[0], name = parts.slice(1).join('||');
        (res[t] = res[t] || []).push({ label: name, avgDays: av(map[k]), count: map[k].c });
      });
      Object.keys(res).forEach(function (t) { res[t].sort(function (a, b) { return b.avgDays - a.avgDays; }); });
      return res;
    }

    var pt = {
      target: target,
      avg: av(ptAll),
      byFactory: facs.map(function (f) { return { label: f, value: av(ptFac[f]), count: ptFac[f] ? ptFac[f].c : 0 }; }),
      lines: lines,
      lineSeries: facs.map(function (f) {
        return { factory: f, data: lines.map(function (ln) { return av(ptFL[f + '||' + ln]); }) };
      }),
      byType: { all: typeList(ptType), byFactory: {} },
      bySub: { all: subMap(ptTS), byFactory: {} }
    };
    facs.forEach(function (f) {
      pt.byType.byFactory[f] = typeList(ptFT, f + '||');
      pt.bySub.byFactory[f] = subMap(ptFTS, f + '||');
    });

    return {
      success: true, curYear: curYear, curMonth: curMonth, months: months, typeOrder: TYPE_ORDER,
      total: { y: total.y, m: total.m },
      org: org, types: types,
      sub: { all: subAll, byFactory: subByFac },
      pt: pt
    };
  } catch (e) {
    return { success: false, message: 'Lỗi KPI: ' + e.toString() };
  }
}
