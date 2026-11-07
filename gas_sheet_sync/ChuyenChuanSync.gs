    // Đẩy số chuyền chuẩn từ hệ thống PPH lên tab "SL & PPH", các tab "SL theo giờ dd-MM" và tab "Báo cáo SL" của Sheet dự án.
    // Đọc đúng API màn TV /pph-view đang dùng. Chỉ ghi vào ô nhập liệu, công thức và định dạng của mẫu giữ nguyên.
    // Tab "SL theo giờ" chỉ để xem: chọn ngày ở ô D4 thì bảng hiện số của tab ngày đó, script không ghi số vào tab này.
    //
    // Cài đặt: mở Sheet bằng tài khoản có quyền sửa, vào Tiện ích mở rộng > Apps Script, dán file này.
    // Lần đầu: chọn hàm setupTrigger, bấm Chạy và cấp quyền.
    // Đã cài từ trước: chọn hàm setupRealtime, bấm Chạy. Hàm này không xoá ghi chú nhập tay.

    const CONFIG = {
      SHEET_ID: '1Df2lsV01nfZklIcIxX0jd72N8O60tOL2t0eqF5rAV_A',
      API_BASE: 'https://skechersmiendong.tbsgroup2026.workers.dev',
      // Chuyền chuẩn = Tổ 1 + Tổ 4, 2 tổ cùng mã 139222: cộng lại khoảng 64 người và 46,8 đôi/giờ, khớp thông số trong Sheet.
      TEAM_IDS: ['pphorg_mv6fi3ay_mi0yvh', 'pphorg_mv6figu7_k5yfwd'],
      // Ngày đầu tiên ghi số lên Sheet, cũng là ngày bắt đầu ở ô D4 của tab SL & PPH.
      // Cột Ngày của SL & PPH tính từ ô D4: đổi sang ngày sau thì các ngày trước đó mất dòng trên bảng.
      START_DATE: '2026-11-04',
      // Từ ngày này lấy số từ Theo dõi chuyền. 3 link quét không kèm mã tổ nên đều nhập vào Tổ 1.
      TRACK_FROM: '2026-11-05',
      TRACK_TEAM_ID: 'pphorg_mv6fi3ay_mi0yvh',
      // Đọc lại cả các ngày gần đây để số được nhập bù hoặc sửa muộn cũng lên Sheet.
      DAYS_TO_REFRESH: 3,
      // 1 phút là mức nhanh nhất Apps Script cho phép.
      TRIGGER_MINUTES: 1,
      // Ngoài giờ này lịch tự động không đọc API, để không dùng hết hạn mức 90 phút chạy mỗi ngày của Apps Script.
      ACTIVE_FROM: '06:30',
      ACTIVE_TO: '20:00',
      TIME_ZONE: 'Asia/Ho_Chi_Minh',
      // Giờ làm việc chuẩn của 1 ca, khớp ô "Giờ làm việc / ngày" của Sheet.
      SHIFT_HOURS: 8,
    };

    // Khung giờ của Theo dõi chuyền; mốc đầu tiên chỉ là nửa giờ 07:00-07:30.
    const TRACK_SLOTS = ['07:30', '08:30', '09:30', '10:30', '11:30', '13:30', '14:30', '15:30', '16:30'];

    const DAILY = {
      name: 'SL & PPH',
      headerRow: 20,
      firstRow: 22,
      lastRow: 39,
      headers: { 1: 'Ngày', 4: 'Số CN thực tế', 5: 'Giờ làm thực tế', 7: 'SL đạt (đôi)', 14: 'Tỷ lệ lỗi (%)' },
    };
    const HOURLY = {
      name: 'SL theo giờ',
      // Tab trắng để tạo tab cho từng ngày.
      templateName: 'Mẫu',
      headerRow: 8,
      firstRow: 9,
      headers: { 2: 'Khung giờ', 4: 'Đầu vào (đôi)', 5: 'Đầu ra (đôi)', 11: 'Top lỗi chất lượng', 12: 'Sự cố / ghi chú' },
      // 10 dòng của mẫu: 9 khung ca chính (từ 07:30 = khung 07:00-07:30) rồi 1 khung tăng ca.
      slots: ['07:30', '08:30', '09:30', '10:30', '11:30', '13:30', '14:30', '15:30', '16:30', '18:00'],
      mainShiftSlots: 9,
      // Các cột của tab xem lấy số từ tab ngày: [cột đầu, số cột].
      viewColumns: [[2, 1], [4, 2], [11, 2]],
    };
    // Tab báo cáo 1 ngày: cột 8h30 … 16h30 (D … L), mỗi cột là 1 khung của Theo dõi chuyền; cột 12h30 là giờ nghỉ trưa, để trống.
    const REPORT = {
      name: 'Báo cáo SL',
      dateCell: 'C2',
      headerRow: 3,
      firstCol: 4,
      lastCol: 13,
      // Dòng SLKH (kế hoạch) là mục tiêu/giờ của TV.
      plan: 50,
      // Số dòng theo bố cục hiện tại: Khu Tập Chung ở dòng 5, Khu Đầu vào ở dòng 9, Khu Đầu ra ở dòng 13 (các dòng này chỉ là tiêu đề).
      // Đã bỏ dòng "Lũy kế trong ngày" (trùng với SLTH Đầu ra). "Tỷ lệ RFT" ở dòng 17.
      rows: { centralPlan: 6, central: 7, centralDiff: 8, inPlan: 10, in: 11, inDiff: 12, outPlan: 14, out: 15, outDiff: 16, rft: 17 },
      groupRows: [5, 9, 13],
      // Dưới dòng RFT: mỗi loại lỗi 1 dòng (cột C là tên lỗi, D … L là số lượng theo khung). Tối đa số dòng này.
      maxDefectRows: 8,
    };

    // Chạy 1 lần sau khi dán script: dựng tab xem theo ngày, đặt ngày bắt đầu, tạo lịch tự động và ghi toàn bộ số từ START_DATE.
    function setupTrigger() {
      const spreadsheet = SpreadsheetApp.openById(CONFIG.SHEET_ID);
      templateSheet_(spreadsheet);
      setupHourlyView_(spreadsheet);
      installTrigger_();
      setStartDate_(spreadsheet);
      syncAll();
    }

    // Chạy tay khi đã cài từ trước: đổi lịch sang mỗi phút và ghi lại số ngay, không xoá ghi chú nhập tay.
    function setupRealtime() {
      installTrigger_();
      setStartDate_(SpreadsheetApp.openById(CONFIG.SHEET_ID));
      syncAll();
    }

    function setStartDate_(spreadsheet) {
      const daily = spreadsheet.getSheetByName(DAILY.name);
      daily.getRange('D4').setValue(dateSerial_(CONFIG.START_DATE));
      // Cột Tuần tính theo ngày bắt đầu ở D4: cứ 7 ngày là 1 tuần, nên đổi ngày bắt đầu thì tuần tự cập nhật theo.
      const rowCount = DAILY.lastRow - DAILY.firstRow + 1;
      const weekFormulas = Array.from({ length: rowCount }, (_, i) => [`=INT(($A${DAILY.firstRow + i}-$D$4)/7)+1`]);
      daily.getRange(DAILY.firstRow, 3, rowCount, 1).setFormulas(weekFormulas);
      setDailyFormulas_(daily);
      setReportFormulas_(spreadsheet.getSheetByName(REPORT.name));
      // Cột Ngày và Tuần tính xong thì lần ghi sau mới tìm đúng dòng.
      SpreadsheetApp.flush();
    }

    // Ô trên tab ngày "SL theo giờ dd-MM" ứng với ngày ở dateRef (ô ngày của SL & PPH hoặc C2 báo cáo). Ô trống thì trả về "".
    function dayCell_(dateRef, cell) {
      const ref = `INDIRECT("'${HOURLY.name} "&TEXT(${dateRef};"dd-mm")&"'!${cell}")`;
      return `IFERROR(IF(${ref}="";"";${ref});"")`;
    }

    // Cột D, E, G, N, O của SL & PPH đọc từ tab ngày: đổi ngày ở D4 là hiện ngay.
    function setDailyFormulas_(daily) {
      for (let r = DAILY.firstRow; r <= DAILY.lastRow; r++) {
        const a = `$A${r}`;
        const outRange = `"'${HOURLY.name} "&TEXT(${a};"dd-mm")&"'!E${HOURLY.firstRow}:E${HOURLY.firstRow + HOURLY.slots.length - 1}"`;
        daily.getRange(r, 4).setFormula(`=${dayCell_(a, 'P4')}`);
        daily.getRange(r, 5).setFormula(`=${dayCell_(a, 'P5')}`);
        daily.getRange(r, 7).setFormula(`=IFERROR(IF(COUNT(INDIRECT(${outRange}))=0;"";SUM(INDIRECT(${outRange})));"")`);
        daily.getRange(r, 14).setFormula(`=IFERROR(IF(${dayCell_(a, 'P6')}="";"";${dayCell_(a, 'P6')}/G${r});"")`);
        daily.getRange(r, 15).setFormula(`=${dayCell_(a, 'P7')}`);
      }
    }

    // Báo cáo SL đọc số từ tab ngày đang chọn ở C2: đổi ngày là hiện ngay. Dòng SLKH là mục tiêu cố định.
    function setReportFormulas_(report) {
      const width = REPORT.lastCol - REPORT.firstCol + 1;
      const headers = report.getRange(REPORT.headerRow, REPORT.firstCol, 1, width).getDisplayValues()[0];
      const R = REPORT.rows;
      // Các dòng tiêu đề (Khu Tập Trung, Khu Đầu vào, Khu Đầu ra) còn số cũ từ bố cục trước: xoá để không hiện số lạc chỗ.
      REPORT.groupRows.forEach((row) => report.getRange(row, REPORT.firstCol + 1, 1, REPORT.lastCol - REPORT.firstCol).clearContent());
      const slotIndexOf = (title) => {
        const match = String(title).match(/^(\d{1,2})h30$/);
        return match ? HOURLY.slots.indexOf(`${match[1].padStart(2, '0')}:30`) : -1;
      };
      headers.forEach((title, i) => {
        // Cột LŨY KẾ do người dùng tự tính trên Sheet: script không ghi đè.
        if (String(title).trim().toUpperCase() === 'LŨY KẾ') return;
        const col = REPORT.firstCol + i;
        const L = String.fromCharCode(64 + col);
        [R.centralPlan, R.inPlan, R.outPlan].forEach((row) => report.getRange(row, col).setValue(REPORT.plan));
        const slotIndex = slotIndexOf(title);
        if (slotIndex < 0) {
          [R.central, R.centralDiff, R.in, R.inDiff, R.out, R.outDiff, R.rft].forEach((row) => report.getRange(row, col).clearContent());
          return;
        }
        const dr = HOURLY.firstRow + slotIndex;
        const c = '$C$2';
        report.getRange(R.central, col).setFormula(`=${dayCell_(c, `M${dr}`)}`);
        report.getRange(R.centralDiff, col).setFormula(`=IF(${L}${R.central}="";"";${L}${R.central}-${L}${R.centralPlan})`);
        report.getRange(R.in, col).setFormula(`=${dayCell_(c, `D${dr}`)}`);
        report.getRange(R.inDiff, col).setFormula(`=IF(${L}${R.in}="";"";${L}${R.in}-${L}${R.inPlan})`);
        report.getRange(R.out, col).setFormula(`=${dayCell_(c, `E${dr}`)}`);
        report.getRange(R.outDiff, col).setFormula(`=IF(${L}${R.out}="";"";${L}${R.out}-${L}${R.outPlan})`);
        report.getRange(R.rft, col).setNumberFormat('0.0%').setFormula(`=IFERROR((${L}${R.out}-${dayCell_(c, `N${dr}`)})/${L}${R.out};"")`);
      });
      setDiffColorRules_(report);
    }

    // Các dòng +/- của báo cáo: số âm hiện màu đỏ. Chỉ thay quy tắc của 3 dòng này, các quy tắc khác giữ nguyên.
    function setDiffColorRules_(report) {
      const rows = [REPORT.rows.centralDiff, REPORT.rows.inDiff, REPORT.rows.outDiff];
      const width = REPORT.lastCol - REPORT.firstCol + 1;
      const ranges = rows.map((row) => report.getRange(row, REPORT.firstCol, 1, width));
      const kept = report.getConditionalFormatRules().filter((rule) => rule.getRanges().every((r) => !rows.includes(r.getRow())));
      const negative = SpreadsheetApp.newConditionalFormatRule()
        .whenNumberLessThan(0)
        .setBackground('#e06666')
        .setFontColor('#ffffff')
        .setRanges(ranges)
        .build();
      report.setConditionalFormatRules([...kept, negative]);
    }

    function installTrigger_() {
      ScriptApp.getProjectTriggers()
        .filter((trigger) => ['syncSheet', 'onReportDateEdit'].includes(trigger.getHandlerFunction()))
        .forEach((trigger) => ScriptApp.deleteTrigger(trigger));
      ScriptApp.newTrigger('syncSheet').timeBased().everyMinutes(CONFIG.TRIGGER_MINUTES).create();
      // Trigger khi sửa: đổi ngày ở ô C2 của tab Báo cáo SL thì ghi báo cáo ngay, không chờ lịch 1 phút.
      ScriptApp.newTrigger('onReportDateEdit').forSpreadsheet(SpreadsheetApp.openById(CONFIG.SHEET_ID)).onEdit().create();
    }

    // Đổi ngày ở ô C2 của tab Báo cáo SL thì ghi báo cáo cho ngày đó ngay.
    function onReportDateEdit(e) {
      if (!e || !e.range) return;
      const range = e.range;
      if (range.getSheet().getName() !== REPORT.name || range.getA1Notation() !== REPORT.dateCell) return;
      const date = cellDate_(range.getValue());
      if (!date) return;
      const spreadsheet = range.getSheet().getParent();
      const day = date >= CONFIG.TRACK_FROM
        ? fetchTrackDays_([date])[0]
        : summarizeDay_(fetchDays_([date])[0]);
      writeReport_(spreadsheet, day);
      SpreadsheetApp.flush();
    }

    // Chạy tay khi chỉ cần dựng lại tab xem: không đụng tới số đã ghi và lịch tự động.
    function setupView() {
      setupHourlyView_(SpreadsheetApp.openById(CONFIG.SHEET_ID));
    }

    // Tab xem: ô D4 chọn ngày trên lịch, bảng bên dưới lấy số từ tab "SL theo giờ dd-MM" của ngày đó.
    // Các cột còn lại của mẫu (lũy kế, % đạt) giữ nguyên công thức và tự tính theo số vừa lấy.
    function setupHourlyView_(spreadsheet) {
      const view = spreadsheet.getSheetByName(HOURLY.name);
      assertLayout_(view, HOURLY);
      const dateRule = SpreadsheetApp.newDataValidation().requireDate().setAllowInvalid(false).build();
      view.getRange('D4').setDataValidation(dateRule).setNumberFormat('dd/mm/yyyy');
      view.getRange('A2').setValue(`Bấm đúp ô D4 để chọn ngày. Tab này chỉ để xem, số được ghi ở các tab "${HOURLY.name} dd-mm".`);
      // File dùng định dạng Việt Nam nên công thức phân cách bằng dấu chấm phẩy; dấu phẩy sẽ báo #ERROR!.
      const formula = `=IFERROR(INDIRECT("'${HOURLY.name} "&TEXT($D$4;"dd-mm")&"'!"&ADDRESS(ROW();COLUMN())))`;
      HOURLY.viewColumns.forEach(([col, count]) => {
        view.getRange(HOURLY.firstRow, col, HOURLY.slots.length, count).setFormula(formula);
      });
      hideEmptyDay_(view);
    }

    // Ngày chưa có Đầu vào và Đầu ra thì ẩn cả bảng và dòng Tổng bằng màu chữ trùng màu nền, công thức của mẫu giữ nguyên.
    function hideEmptyDay_(view) {
      const rows = HOURLY.slots.length;
      const lastRow = HOURLY.firstRow + rows - 1;
      const formula = `=COUNT($D$${HOURLY.firstRow}:$E$${lastRow})=0`;
      const hide = (range, color) => SpreadsheetApp.newConditionalFormatRule()
        .whenFormulaSatisfied(formula).setFontColor(color).setRanges([range]).build();
      const totals = view.getRange(lastRow + 1, 2, 1, 11);
      // Chạy lại không tạo trùng quy tắc; quy tắc ẩn đứng đầu để thắng các quy tắc màu của mẫu.
      const kept = view.getConditionalFormatRules().filter((rule) => {
        const condition = rule.getBooleanCondition();
        return !condition || condition.getCriteriaValues()[0] !== formula;
      });
      view.setConditionalFormatRules([
        hide(view.getRange(HOURLY.firstRow, 2, rows, 11), '#ffffff'),
        hide(totals, view.getRange(lastRow + 1, 2).getBackground()),
        ...kept,
      ]);
    }

    // Xoá số nguồn PPH đã ghi cho các ngày từ TRACK_FROM, vì ngày chưa có số mới thì lần ghi sau sẽ không đụng tới.
    function clearOldSourceFromTrackDate_(spreadsheet) {
      const daily = spreadsheet.getSheetByName(DAILY.name);
      const rowCount = DAILY.lastRow - DAILY.firstRow + 1;
      daily.getRange(DAILY.firstRow, 1, rowCount, 1).getValues().forEach(([date], i) => {
        if (cellDate_(date) < CONFIG.TRACK_FROM) return;
        const row = DAILY.firstRow + i;
        daily.getRange(row, 4, 1, 2).clearContent();
        daily.getRange(row, 7).clearContent();
        daily.getRange(row, 14).clearContent();
      });
      spreadsheet.getSheets().filter((sheet) => sheet.getName().startsWith(`${HOURLY.name} `)).forEach((sheet) => {
        if (cellDate_(sheet.getRange('D4').getValue()) < CONFIG.TRACK_FROM) return;
        sheet.getRange(HOURLY.firstRow, 2, HOURLY.slots.length, 1).clearContent();
        sheet.getRange(HOURLY.firstRow, 5, HOURLY.slots.length, 1).clearContent();
        sheet.getRange(HOURLY.firstRow, 12, HOURLY.slots.length, 1).clearContent();
      });
    }

    function syncSheet() {
      const now = Utilities.formatDate(new Date(), CONFIG.TIME_ZONE, 'HH:mm');
      if (now < CONFIG.ACTIVE_FROM || now > CONFIG.ACTIVE_TO) return;
      runSync_(datesFrom_(CONFIG.DAYS_TO_REFRESH), false);
    }

    // Chạy tay khi cần ghi lại toàn bộ từ START_DATE, ví dụ sau khi lịch tự động bị dừng nhiều ngày.
    function syncAll() {
      runSync_(datesFrom_(Infinity), true);
    }

    function runSync_(dates, force) {
      const lock = LockService.getScriptLock();
      if (!lock.tryLock(30000)) return; // Lần chạy khác đang ghi, lần sau sẽ cập nhật.
      try {
        // Lấy đủ số rồi mới ghi: API lỗi thì dừng ở đây, Sheet giữ nguyên.
        // Ngày chưa có khung giờ nào thì bỏ qua: không xoá số đã ghi và không làm ngày đó bị tính là đã nhập.
        const pphDates = dates.filter((date) => date < CONFIG.TRACK_FROM);
        const trackDates = dates.filter((date) => date >= CONFIG.TRACK_FROM);
        const trackDays = fetchTrackDays_(trackDates);
        const pphDays = fetchDays_(pphDates).map(summarizeDay_);
        const spreadsheet = SpreadsheetApp.openById(CONFIG.SHEET_ID);
        const daily = spreadsheet.getSheetByName(DAILY.name);
        // Số không đổi thì khỏi ghi: lần chạy chỉ tốn vài giây nên chạy mỗi phút vẫn trong hạn mức của Apps Script.
        // Ngày ở ô D4 cũng nằm trong dấu vân tay, để đổi ngày bắt đầu là bảng được ghi lại ngay.
        const properties = PropertiesService.getScriptProperties();
        const reportSheet = spreadsheet.getSheetByName(REPORT.name);
        const fingerprint = fingerprint_([...pphDays, ...trackDays])
          + '|' + cellDate_(daily.getRange('D4').getValue())
          + '|' + cellDate_(reportSheet.getRange(REPORT.dateCell).getValue());
        if (!force && properties.getProperty('lastSync') === fingerprint) return;
        const days = [...pphDays, ...trackDays].filter((day) => day.slots.size > 0);
        const template = templateSheet_(spreadsheet);
        assertLayout_(daily, DAILY);
        // Chạy tay (force): đặt lại công thức của SL & PPH và Báo cáo SL theo code hiện tại, để không còn công thức cũ lệch dòng.
        if (force) {
          setDailyFormulas_(daily);
          setReportFormulas_(reportSheet);
        }
        // Ngày theo dõi chưa có Đầu ra (chưa nhập, hoặc đã xoá hết): xoá số cũ trên tab ngày để SL & PPH và báo cáo không hiện số cũ.
        trackDays.filter((day) => !day.hasOutput).forEach((day) => clearDay_(spreadsheet, day.date));
        const problems = writeHourlyTabs_(spreadsheet, template, days);
        // Tab báo cáo hiển thị ngày đang chọn ở ô C2. Ô C2 trống thì lấy ngày Theo dõi chuyền gần nhất có số.
        // Ngày không có số thì các ô trong báo cáo để trống.
        const reportDate = cellDate_(reportSheet.getRange(REPORT.dateCell).getValue());
        const latest = trackDays.filter((day) => day.slots.size > 0).at(-1);
        const reportDay = reportDate
          ? ([...pphDays, ...trackDays].find((day) => day.date === reportDate) || { date: reportDate, slots: new Map(), defectBySlot: new Map() })
          : latest;
        // Log để kiểm tra: ô C2 đọc ra ngày nào và có tìm thấy dữ liệu của ngày đó không.
        console.log(`[BAO CAO] C2="${reportDate}" tim thay=${!!reportDay && reportDay.slots.size > 0} ngay_co_so=${days.map((day) => day.date).join(',')}`);
        if (reportDay) writeReport_(spreadsheet, reportDay);
        // Ghi xong phần còn lại rồi mới báo, để 1 ngày không có chỗ ghi không chặn các ngày khác.
        if (problems.length) throw new Error(`Có số chưa ghi được: ${problems.join('; ')}`);
        SpreadsheetApp.flush();
        properties.setProperty('lastSync', fingerprint);
      } finally {
        lock.releaseLock();
      }
    }

    function fingerprint_(days) {
      const text = JSON.stringify(days.map((day) => ({ ...day, slots: [...day.slots.entries()] })));
      return Utilities.base64Encode(Utilities.computeDigest(Utilities.DigestAlgorithm.MD5, text, Utilities.Charset.UTF_8));
    }

    // Các ngày từ START_DATE tới hôm nay, tối đa maxDays ngày gần nhất.
    function datesFrom_(maxDays) {
      const dayMs = 86400000;
      const format = (ms) => Utilities.formatDate(new Date(ms), CONFIG.TIME_ZONE, 'yyyy-MM-dd');
      const now = Date.now();
      const dates = [];
      for (let i = 0; i < maxDays && format(now - i * dayMs) >= CONFIG.START_DATE; i++) dates.unshift(format(now - i * dayMs));
      return dates;
    }

    function fetchDays_(dates) {
      const requests = dates.map((date) => ({ url: `${CONFIG.API_BASE}/api/pph/dashboard?date=${date}`, muteHttpExceptions: true }));
      return UrlFetchApp.fetchAll(requests).map((response, i) => {
        const status = response.getResponseCode();
        if (status !== 200) throw new Error(`API ngày ${dates[i]} trả HTTP ${status}.`);
        const body = JSON.parse(response.getContentText());
        if (!body.success || !body.data) throw new Error(`API ngày ${dates[i]} báo lỗi: ${body.error}`);
        return body.data;
      });
    }

    // Số Theo dõi chuyền của từng ngày: 3 trạm Tập trung, Đầu vào, Đầu ra / QC (đọc đúng dữ liệu của form quét).
    const TRACK_POINTS = ['khutaptrung', 'dauvao', 'daura'];
    function fetchTrackDays_(dates) {
      const url = (date, point) => `${CONFIG.API_BASE}/api/pph-track/scan-info?team=${CONFIG.TRACK_TEAM_ID}&point=${point}&date=${date}`;
      const requests = dates.flatMap((date) => TRACK_POINTS.map((point) => ({ url: url(date, point), muteHttpExceptions: true })));
      const bodies = UrlFetchApp.fetchAll(requests).map((response) => {
        const status = response.getResponseCode();
        if (status !== 200) throw new Error(`API Theo dõi chuyền trả HTTP ${status}.`);
        const body = JSON.parse(response.getContentText());
        if (!body.success) throw new Error(`API Theo dõi chuyền báo lỗi: ${body.error}`);
        // API đổi cấu trúc thì dừng, không hiểu nhầm là ngày chưa nhập rồi xoá số trên Sheet.
        if (!Array.isArray(body.hourly) || !Array.isArray(body.entries)) throw new Error('API Theo dõi chuyền đã đổi cấu trúc.');
        return body;
      });
      const n = TRACK_POINTS.length;
      return dates.map((date, i) => summarizeTrackDay_(date, bodies[i * n], bodies[i * n + 1], bodies[i * n + 2]));
    }

    function summarizeTrackDay_(date, centralBody, inputBody, outputBody) {
      const slots = new Map();
      const itemOf = (slot) => {
        if (!slots.has(slot)) slots.set(slot, { qty: null, input: null, central: null, defects: 0, topDefect: '', notes: [] });
        return slots.get(slot);
      };
      centralBody.hourly.filter((hour) => hour.qty != null).forEach((hour) => {
        itemOf(hour.slot).central = Number(hour.qty);
      });
      inputBody.hourly.filter((hour) => hour.qty != null).forEach((hour) => {
        itemOf(hour.slot).input = Number(hour.qty);
      });
      // Dòng có loại lỗi là dòng QC, dòng còn lại trong entries là Đầu ra.
      const defectsBySlot = new Map();
      const defectTotals = new Map();
      outputBody.entries.forEach((entry) => {
        const slotDefects = new Map();
        entry.rows.filter((row) => row.defectType).forEach((row) => {
          slotDefects.set(row.defectType, (slotDefects.get(row.defectType) || 0) + Number(row.qty));
          defectTotals.set(row.defectType, (defectTotals.get(row.defectType) || 0) + Number(row.qty));
        });
        defectsBySlot.set(entry.slot, slotDefects);
        const qcAll = entry.rows.filter((row) => row.point === 'qc' || row.defectType).reduce((sum, row) => sum + Number(row.qty), 0);
        if (qcAll) itemOf(entry.slot).defects = qcAll;
      });
      let qty = 0;
      let hours = 0;
      const outputHours = outputBody.hourly.filter((hour) => hour.qty != null);
      outputHours.forEach((hour) => {
        const item = itemOf(hour.slot);
        item.qty = Number(hour.qty);
        item.topDefect = topKey_(defectsBySlot.get(hour.slot) || new Map());
        qty += item.qty;
        hours += Number(hour.workHours || 0);
      });
      const dayOutput = Number((outputBody.qcContext && outputBody.qcContext.dayOutput) || 0);
      if (dayOutput > 0 && !outputHours.length) throw new Error(`API ngày ${date} có ${dayOutput} đôi nhưng không có số theo giờ.`);
      const defects = Number((outputBody.qcContext && outputBody.qcContext.dayDefects) || 0);
      return {
        date,
        slotList: TRACK_SLOTS,
        // Số CN như ô Người lao động trên TV: cộng số người khai đầu ca của cả 3 trạm.
        workers: [centralBody, inputBody, outputBody].reduce((sum, body) => sum + Number((body.setup && body.setup.workerCount) || 0), 0),
        hours: outputHours.length > 0 ? CONFIG.SHIFT_HOURS : '',
        qty,
        hasOutput: outputHours.length > 0,
        errorRate: qty > 0 ? defects / qty : '',
        topDefect: topKey_(defectTotals),
        defectTotal: defects,
        defectBySlot: defectsBySlot,
        slots,
      };
    }

    function topKey_(totals) {
      return [...totals.entries()].sort((a, b) => b[1] - a[1])[0]?.[0] || '';
    }

    // Cộng số của các tổ trong chuyền chuẩn. Giờ làm = số khung giờ đã có số, mỗi khung 1 giờ, để PPH chỉ tính
    // trên phần sản lượng đã nhập (giờ khai đầu ca của tổ gồm cả tăng ca chưa chắc đã làm).
    function summarizeDay_(data) {
      const leaves = data.factories.flatMap((factory) => factory.leaves);
      const teams = CONFIG.TEAM_IDS.map((id) => {
        const team = leaves.find((leaf) => leaf.id === id);
        if (!team) throw new Error(`API ngày ${data.date} không có tổ ${id}.`);
        return team;
      });
      const slots = new Map();
      let errors = 0;
      let qualifiedQty = 0;
      teams.forEach((team) => {
        team.slots.filter((slot) => slot.filled).forEach((slot) => {
          const item = slots.get(slot.slot) || { qty: 0, notes: [] };
          item.qty += slot.actualQty || 0;
          if (slot.shortfallReason) item.notes.push(`${team.name}: ${slot.shortfallReason}`);
          slots.set(slot.slot, item);
          // Cùng cách tính % Quality trên TV: chỉ tính các khung có nhập số lỗi.
          if (slot.errorCount != null) {
            errors += slot.errorCount;
            qualifiedQty += slot.actualQty || 0;
          }
        });
      });
      return {
        date: data.date,
        slotList: HOURLY.slots,
        hasOutput: slots.size > 0,
        topDefect: '',
        workers: teams.reduce((sum, team) => sum + ((team.setup && team.setup.workerCount) || 0), 0),
        hours: slots.size > 0 ? CONFIG.SHIFT_HOURS : '',
        qty: [...slots.values()].reduce((sum, item) => sum + item.qty, 0),
        errorRate: qualifiedQty > 0 ? errors / qualifiedQty : '',
        defectTotal: '',
        defectBySlot: new Map(),
        slots,
      };
    }

    // Xoá số sản lượng của 1 ngày trên SL & PPH và trên tab "SL theo giờ dd-MM" của ngày đó.
    // Đầu vào và Top lỗi nhập tay trên tab giờ được giữ lại, chỉ xoá đầu ra, lỗi và ghi chú do hệ thống điền.
    function clearDay_(spreadsheet, date) {
      const dayTab = spreadsheet.getSheetByName(dayTabName_(date));
      if (!dayTab) return;
      const rows = HOURLY.slots.length;
      dayTab.getRange(HOURLY.firstRow, 5, rows, 1).clearContent();
      dayTab.getRange(HOURLY.firstRow, 11, rows, 1).clearContent();
      dayTab.getRange(HOURLY.firstRow, 12, rows, 1).clearContent();
      // Cột Tập trung, lỗi theo khung và tổng hợp ngày: để SL & PPH và báo cáo không đọc số cũ.
      dayTab.getRange(HOURLY.firstRow, 13, rows, 2).clearContent();
      dayTab.getRange('P4:P7').clearContent();
    }

    // Mẫu đổi cột thì dừng, không ghi nhầm vào ô khác.
    function assertLayout_(sheet, tab) {
      if (!sheet) throw new Error(`Không thấy tab "${tab.name}".`);
      const header = sheet.getRange(tab.headerRow, 1, 1, sheet.getLastColumn()).getDisplayValues()[0];
      Object.entries(tab.headers).forEach(([col, title]) => {
        if (header[col - 1] !== title) throw new Error(`Tab "${tab.name}" đã đổi mẫu: cột ${col} không còn là "${title}".`);
      });
    }

    // Tab ngày sao chép từ tab Mẫu, nên Mẫu phải đúng cột và không được chứa công thức của tab xem.
    function templateSheet_(spreadsheet) {
      const template = spreadsheet.getSheetByName(HOURLY.templateName);
      assertLayout_(template, { ...HOURLY, name: HOURLY.templateName });
      const formulas = template.getRange(HOURLY.firstRow, 1, HOURLY.slots.length, template.getLastColumn()).getFormulas();
      if (formulas.flat().some((formula) => formula.includes('INDIRECT'))) {
        throw new Error(`Tab "${HOURLY.templateName}" đang chứa công thức của tab xem: hãy xoá các công thức INDIRECT ở tab này.`);
      }
      return template;
    }

    // Tab "Báo cáo SL": cột 8h30 … 16h30 ứng với khung 08:30 … 16:30 của TV. Cột 12h30 không có khung nên để trống.
    // Dòng SLKH là mục tiêu/giờ; dòng +/- là SLTH trừ SLKH; RFT = (đầu ra − lỗi trong khung) / đầu ra.
    function writeReport_(spreadsheet, day) {
      const sheet = spreadsheet.getSheetByName(REPORT.name);
      if (!sheet) throw new Error(`Không thấy tab "${REPORT.name}".`);
      const width = REPORT.lastCol - REPORT.firstCol + 1;
      const headers = sheet.getRange(REPORT.headerRow, REPORT.firstCol, 1, width).getDisplayValues()[0];
      // Số các khung của báo cáo là công thức (setReportFormulas_), script chỉ ghi danh sách loại lỗi.
      writeDefectRows_(sheet, day, headers);
    }

    // Dưới dòng RFT: cùng 1 loại lỗi thì gộp 1 dòng, xếp theo tổng lỗi giảm dần. Ô trống nghĩa là khung đó không có lỗi loại này.
    function writeDefectRows_(sheet, day, headers) {
      const first = REPORT.rows.rft + 1;
      const width = REPORT.lastCol - REPORT.firstCol + 1;
      const block = sheet.getRange(first, REPORT.firstCol, REPORT.maxDefectRows, width);
      sheet.getRange(first, 3, REPORT.maxDefectRows, width + 1).clearContent();
      // Ô dưới dòng RFT đang mang định dạng % của mẫu: đặt lại thành số đếm để 5 lỗi hiện là 5, không phải 500%.
      block.setNumberFormat('0');
      const totals = new Map();
      day.defectBySlot.forEach((types) => types.forEach((qty, type) => totals.set(type, (totals.get(type) || 0) + qty)));
      const types = [...totals.keys()].sort((a, b) => totals.get(b) - totals.get(a)).slice(0, REPORT.maxDefectRows);
      types.forEach((type, i) => {
        const row = first + i;
        sheet.getRange(row, 3).setValue(type);
        headers.forEach((title, j) => {
          const match = String(title).match(/^(\d{1,2})h30$/);
          if (!match) return;
          const qty = day.defectBySlot.get(`${match[1].padStart(2, '0')}:30`)?.get(type);
          sheet.getRange(row, REPORT.firstCol + j).setValue(qty || '');
        });
      });
    }

    function dayTabName_(date) {
      return `${HOURLY.name} ${date.slice(8, 10)}-${date.slice(5, 7)}`;
    }

    // Xoá số đầu ra, lỗi, số CN, giờ làm của các dòng thuộc khoảng ngày vừa đọc nhưng không có số.
    function clearStaleRows_(daily, dates, days) {
      const withOutput = new Set(days.filter((day) => day.hasOutput).map((day) => day.date));
      const today = Utilities.formatDate(new Date(), CONFIG.TIME_ZONE, 'yyyy-MM-dd');
      const rowCount = DAILY.lastRow - DAILY.firstRow + 1;
      daily.getRange(DAILY.firstRow, 1, rowCount, 1).getValues().forEach(([value], i) => {
        const date = cellDate_(value);
        // Dòng trong khoảng vừa đọc, hoặc dòng của ngày sau hôm nay (chưa có số): không có số thì xoá số cũ.
        if (!date || withOutput.has(date) || (!dates.includes(date) && date <= today)) return;
        const row = DAILY.firstRow + i;
        daily.getRange(row, 4, 1, 2).clearContent();
        daily.getRange(row, 7).clearContent();
        daily.getRange(row, 14).clearContent();
        daily.getRange(row, 15).clearContent();
      });
    }

    function writeDaily_(sheet, days) {
      const rowCount = DAILY.lastRow - DAILY.firstRow + 1;
      const rowByDate = new Map(
        sheet.getRange(DAILY.firstRow, 1, rowCount, 1).getValues().map(([date], i) => [cellDate_(date), DAILY.firstRow + i]),
      );
      const problems = [];
      // Mới có Đầu vào, chưa có Đầu ra thì chưa ghi, để ngày đó không bị tính là đã nhập sản lượng.
      days.filter((day) => day.hasOutput).forEach((day) => {
        const row = rowByDate.get(day.date);
        if (!row) {
          problems.push(`${DAILY.name} không có dòng cho ngày ${day.date}`);
          return;
        }
        sheet.getRange(row, 4, 1, 2).setValues([[day.workers, day.hours]]);
        sheet.getRange(row, 7).setValue(day.qty);
        sheet.getRange(row, 14).setNumberFormat('0.0%').setValue(day.errorRate);
        if (day.topDefect) sheet.getRange(row, 15).setValue(day.topDefect);
      });
      return problems;
    }

    // Mỗi ngày có 1 tab "SL theo giờ dd-MM", chưa có thì tạo từ tab Mẫu.
    function writeHourlyTabs_(spreadsheet, template, days) {
      return days.flatMap((day) => {
        const dayTab = spreadsheet.getSheetByName(dayTabName_(day.date));
        return writeHourly_(dayTab || template.copyTo(spreadsheet).setName(dayTabName_(day.date)), day, !dayTab);
      });
    }

    function writeHourly_(sheet, day, isNewDate) {
      const rows = HOURLY.slots.length;
      sheet.getRange('D4').setNumberFormat('dd/mm/yyyy').setValue(dateSerial_(day.date));
      // Đầu vào, Top lỗi, ghi chú là ô nhập tay: chỉ xoá khi tab mới tạo, còn lại giữ nguyên.
      if (isNewDate) {
        sheet.getRange(HOURLY.firstRow, 4, rows, 1).clearContent();
        sheet.getRange(HOURLY.firstRow, 11, rows, 2).clearContent();
      }
      // Mỗi dòng của tab luôn ứng với đúng 1 khung trong HOURLY.slots (dòng 9 = 08:30), để báo cáo và SL & PPH đọc đúng dòng.
      HOURLY.slots.forEach((slot, i) => {
        const row = HOURLY.firstRow + i;
        const item = day.slots.get(slot);
        sheet.getRange(row, 2).setValue(i < HOURLY.mainShiftSlots || item ? slotLabel_(slot) : '');
        sheet.getRange(row, 5).setValue(item && item.qty != null ? item.qty : '');
        // Ngày theo dõi chuyền: Đầu vào lấy từ trạm Đầu vào, khung chưa có thì để trống (xoá số cũ). Ngày PPH giữ ô nhập tay.
        if (day.date >= CONFIG.TRACK_FROM) sheet.getRange(row, 4).setValue(item && item.input != null ? item.input : '');
        else if (item && item.input != null) sheet.getRange(row, 4).setValue(item.input);
        if (item && item.topDefect) sheet.getRange(row, 11).setValue(item.topDefect);
        // Khung có lý do hụt trong hệ thống thì hiện lý do đó, khung khác giữ nguyên ghi chú nhập tay.
        if (item && item.notes.length) sheet.getRange(row, 12).setValue(item.notes.join('; '));
        // Cột M, N: Tập trung và lỗi theo khung, để tab Báo cáo SL và SL & PPH đọc công thức.
        sheet.getRange(row, 13).setValue(item && item.central != null ? item.central : '');
        sheet.getRange(row, 14).setValue(item && item.qty != null && item.defects != null ? item.defects : '');
      });
      // Tổng hợp ngày (P4–P7) cho SL & PPH đọc: số CN, giờ làm, tổng lỗi, lỗi nhiều nhất.
      sheet.getRange('P4').setValue(day.workers === '' ? '' : day.workers);
      sheet.getRange('P5').setValue(day.hours);
      sheet.getRange('P6').setValue(day.defectTotal);
      sheet.getRange('P7').setValue(day.topDefect || '');
      // Khung 07:30 của Theo dõi chuyền (07:00-07:30) không có dòng trên tab giờ nên không báo lỗi.
      return [...day.slots.keys()]
        .filter((slot) => !HOURLY.slots.includes(slot) && slot !== TRACK_SLOTS[0])
        .map((slot) => `${HOURLY.name} ngày ${day.date} không có dòng cho khung ${slot}`);
    }

    // Mốc 08:30 là khung 07:30-08:30. Công thức này đúng cả sau nghỉ trưa (13:30 là 12:30-13:30) và tăng ca.
    function slotLabel_(slot) {
      if (slot === '07:30') return '07:00-07:30';
      const [hour, minute] = slot.split(':');
      return `${String(Number(hour) - 1).padStart(2, '0')}:${minute}-${slot}`;
    }

    // Số ngày kiểu Google Sheets, không phụ thuộc múi giờ và ngôn ngữ của file.
    function dateSerial_(date) {
      const [year, month, day] = date.split('-').map(Number);
      return Date.UTC(year, month - 1, day) / 86400000 + 25569;
    }

    // Ô ngày trả về Date lúc nửa đêm theo múi giờ của file, mà getSpreadsheetTimeZone có lúc không trả về múi giờ.
    // Làm tròn về ngày UTC gần nhất thì ra đúng ngày với mọi múi giờ trong khoảng ±12 giờ, không cần biết múi giờ.
    function cellDate_(value) {
      if (!(value instanceof Date)) return '';
      return new Date(Math.round(value.getTime() / 86400000) * 86400000).toISOString().slice(0, 10);
    }
    