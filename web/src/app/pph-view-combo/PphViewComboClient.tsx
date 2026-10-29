'use client';

// Màn hình CHIẾU TV GỘP NHIỀU LINE — 1 TV vật lý nhưng Xưởng có 2+ Line (VD LINE MAY 1 + LINE MAY
// 2), không đủ máy chiếu riêng từng Line như PphViewClient.tsx (/pph-view?lineId=...) vẫn dùng khi
// mỗi Line có TV riêng. Thiết kế đã chốt với người dùng (không dồn chung 1 lúc — chữ phải thu nhỏ
// mất khả năng đọc từ xa, đúng mục đích màn TV):
//   1. Dải tóm tắt MỎNG, CỐ ĐỊNH trên cùng — liệt kê MỌI Line (không rotate), mỗi Line 1 nút nhỏ
//      hiện %PPH + SLTH/Target + dấu ⚠ nếu Line đó đang có Tổ trễ nhập — bấm vào để nhảy thẳng sang
//      Line đó (reset luôn giờ đếm ngược). Bù lại điểm mù khi Line đó không phải lượt đang chiếu.
//   2. PHẦN CHI TIẾT (board to, y hệt PphViewClient — Target/Thực hiện PPH, biểu đồ giờ, thẻ Tổ) —
//      LUÂN PHIÊN giữa các Line theo ?intervalMin= (mặc định 5 phút), giữ NGUYÊN cỡ chữ gốc.
// Link: /pph-view-combo?lineIds=<mã 1>,<mã 2>[,<mã 3>...]&intervalMin=5 — mỗi mã lấy y hệt cách lấy
// link TV từng Line hiện có (nút 📺 ở mỗi ô Line trong /work/?module=production), chỉ việc nối chuỗi
// bằng dấu phẩy. KHÔNG có date-picker/media-slot quảng cáo (giữ phạm vi gọn, xem PphViewClient.tsx
// nếu cần bản đầy đủ cho 1 Line/1 TV riêng).
import { useEffect, useMemo, useRef, useState } from 'react';
import { useSearchParams } from 'next/navigation';
import { IconVolume, IconVolumeOff, IconMaximize, IconMinimize } from '@tabler/icons-react';
import {
  LineBoard,
  rollup,
  toneFor,
  TONE_LIGHT,
  fmtInt,
  todayVNStr,
  POLL_MS,
  FS_DESIGN_W,
  DEFAULT_TARGET_PPH,
  pphLineTitle,
  PPH_ALERT_AUDIO_BASE,
  type PphFactory,
  type DashLine,
  type PphLeaf,
  type FactoryConfig,
} from '@/modules/production/ProductionPerformanceModule';

const DEFAULT_INTERVAL_MIN = 5;

type ResolvedLine = { lineId: string; factory: PphFactory | null; leaves: PphLeaf[]; areaName: string; lineName: string };

// Y HỆT logic suy Line ở PphViewClient.tsx (resolved useMemo) — tách thành hàm thuần để lặp lại
// được cho NHIỀU mã cùng lúc: Line đã cấu hình ở Cài Đặt (DashLine thật) ưu tiên; chưa cấu hình thì
// mã chính là leaf.id (mỗi điểm quét tự đứng riêng 1 "Line", xem areaToLines() bên _worker.js).
function resolveOneLine(id: string, factories: PphFactory[], lines: DashLine[]): ResolvedLine | null {
  const dashLine = lines.find((l) => l.id === id);
  if (dashLine) {
    const factory = factories.find((f) => f.leaves.some((l) => l.areaId === dashLine.areaId)) ?? null;
    const byId = new Map((factory?.leaves ?? []).map((l) => [l.id, l]));
    const leaves = dashLine.leafIds.map((lid) => byId.get(lid)).filter((x): x is PphLeaf => !!x);
    const areaName = leaves[0]?.areaName ?? dashLine.name;
    return { lineId: id, factory, leaves, areaName, lineName: dashLine.name };
  }
  const found = factories.flatMap((f) => f.leaves.map((l) => ({ f, l }))).find(({ l }) => l.id === id);
  if (found) {
    return { lineId: id, factory: found.f, leaves: [found.l], areaName: found.l.areaName ?? found.l.name, lineName: found.l.name };
  }
  return null;
}

export default function PphViewComboClient() {
  const searchParams = useSearchParams();
  const lineIds = useMemo(
    () => (searchParams.get('lineIds') || '').split(',').map((s) => s.trim()).filter(Boolean),
    [searchParams],
  );
  // Sàn 1 phút — phòng nhập bậy trên link (VD quên số/0) khỏi xoay tít không ai đọc kịp.
  const intervalMin = Math.max(1, Number(searchParams.get('intervalMin')) || DEFAULT_INTERVAL_MIN);
  const intervalMs = intervalMin * 60 * 1000;

  const [factories, setFactories] = useState<PphFactory[]>([]);
  const [lines, setLines] = useState<DashLine[]>([]);
  const [configs, setConfigs] = useState<FactoryConfig[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [now, setNow] = useState(() => new Date());
  const [scale, setScale] = useState(1);
  // Icon loa cạnh ô ngày giờ — y hệt PphViewClient.tsx, xem giải thích đầy đủ ở đó (giới hạn cứng
  // trình duyệt, chỉ mở khoá ĐÚNG LẦN TẢI TRANG này). Dùng CHUNG cho mọi Line luân phiên qua — mở
  // khoá 1 lần là đủ cho cả phiên xem, không cần bấm lại mỗi khi đổi Line.
  const [audioUnlocked, setAudioUnlocked] = useState(false);
  function handleEnableAudio() {
    setAudioUnlocked(true);
    const a = new Audio(`${PPH_ALERT_AUDIO_BASE}dau-vao.mp3`);
    a.play().catch(() => {});
  }
  const [designW, setDesignW] = useState(FS_DESIGN_W);
  const contentRef = useRef<HTMLDivElement>(null);
  const adjustedRef = useRef(false);

  const [fs, setFs] = useState(false);
  useEffect(() => {
    const onFs = () => {
      setFs(!!document.fullscreenElement);
      adjustedRef.current = false;
      setDesignW(FS_DESIGN_W);
    };
    document.addEventListener('fullscreenchange', onFs);
    return () => document.removeEventListener('fullscreenchange', onFs);
  }, []);
  function toggleFs() {
    if (document.fullscreenElement) document.exitFullscreen().catch(() => {});
    else document.documentElement.requestFullscreen().catch(() => {});
  }

  useEffect(() => {
    const t = setInterval(() => setNow(new Date()), 15000);
    return () => clearInterval(t);
  }, []);

  useEffect(() => {
    document.title = 'Kết quả sản xuất — TBS';
  }, []);

  useEffect(() => {
    let cancelled = false;
    async function load(fresh: boolean) {
      try {
        const d = todayVNStr();
        const [dashRes, lineRes, cfgRes] = await Promise.allSettled([
          fetch(`/api/pph/dashboard?date=${d}${fresh ? '&fresh=1' : ''}`).then((r) => r.json()),
          fetch('/api/pph/dashboard-lines').then((r) => r.json()),
          fetch('/api/pph/factory-config').then((r) => r.json()),
        ]);
        if (cancelled) return;
        if (dashRes.status === 'fulfilled' && dashRes.value?.success && dashRes.value.data) {
          setFactories(dashRes.value.data.factories || []);
          if (lineRes.status === 'fulfilled' && lineRes.value?.success) setLines(lineRes.value.lines || []);
          if (cfgRes.status === 'fulfilled' && cfgRes.value?.success) setConfigs(cfgRes.value.configs || []);
          setError(null);
        } else {
          setError((dashRes.status === 'fulfilled' && dashRes.value?.error) || 'Không tải được dữ liệu');
        }
      } catch {
        if (!cancelled) setError('Không kết nối được tới hệ thống');
      } finally {
        if (!cancelled) setLoading(false);
      }
    }
    load(true);
    const t = setInterval(() => load(false), POLL_MS);
    return () => {
      cancelled = true;
      clearInterval(t);
    };
  }, []);

  // Tự phát hiện bản deploy mới rồi tự tải lại — y hệt PphViewClient.tsx, xem giải thích đầy đủ ở đó.
  useEffect(() => {
    let cancelled = false;
    let myVersion: string | null = null;
    function checkVersion() {
      fetch('/api/pph/tv-version', { cache: 'no-store' })
        .then((r) => r.json())
        .then((res) => {
          if (cancelled || !res?.success || !res.version) return;
          if (myVersion === null) {
            myVersion = res.version;
            return;
          }
          if (res.version !== myVersion) {
            window.location.reload();
          }
        })
        .catch(() => {});
    }
    checkVersion();
    const iv = setInterval(checkVersion, 60 * 1000);
    return () => {
      cancelled = true;
      clearInterval(iv);
    };
  }, []);

  const resolvedList = useMemo(
    () => lineIds.map((id) => resolveOneLine(id, factories, lines)).filter((x): x is ResolvedLine => !!x),
    [lineIds, factories, lines],
  );

  const [activeIdx, setActiveIdx] = useState(0);
  // Tăng mỗi lần cần KHỞI ĐỘNG LẠI đồng hồ đếm ngược (bấm tay chọn Line) — nằm trong dependency của
  // effect luân phiên bên dưới để buộc effect chạy lại (huỷ interval cũ, đặt interval mới từ 0).
  const [resetTick, setResetTick] = useState(0);
  function goTo(i: number) {
    setActiveIdx(i);
    setResetTick((t) => t + 1);
  }
  useEffect(() => {
    if (resolvedList.length <= 1) return;
    const iv = setInterval(() => {
      setActiveIdx((i) => (i + 1) % resolvedList.length);
    }, intervalMs);
    return () => clearInterval(iv);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [resolvedList.length, intervalMs, resetTick]);
  // Danh sách rút ngắn lại (hiếm, VD đổi link) sau khi đã chọn 1 chỉ số cao hơn độ dài mới — kẹp về 0.
  useEffect(() => {
    if (activeIdx >= resolvedList.length && resolvedList.length > 0) setActiveIdx(0);
  }, [activeIdx, resolvedList.length]);

  // Đổi Line đang chiếu → số Tổ/chiều cao nội dung đổi hẳn (VD 4 Tổ ↔ 3 Tổ) — tính lại designW tối
  // ưu từ đầu, giống hệt lúc bật/thoát toàn màn hình (xem effect fullscreenchange ở trên).
  useEffect(() => {
    adjustedRef.current = false;
    setDesignW(FS_DESIGN_W);
  }, [activeIdx]);

  // Co giãn vừa đúng 1 màn hình — Y HỆT PphViewClient.tsx, xem giải thích đầy đủ ở đó.
  useEffect(() => {
    const fit = () => {
      const el = contentRef.current;
      if (!el) return;
      const naturalH = el.scrollHeight;
      if (naturalH <= 0) return;
      if (!adjustedRef.current) {
        adjustedRef.current = true;
        const sw0 = window.innerWidth / designW;
        const sh0 = window.innerHeight / naturalH;
        if (Number.isFinite(sh0) && sh0 > 0 && sh0 < sw0) {
          setDesignW(Math.round(Math.min(4800, Math.max(1000, designW * (sw0 / sh0)))));
          return;
        }
      }
      const sw = window.innerWidth / designW;
      const sh = window.innerHeight / naturalH;
      const s = Math.min(sw, sh);
      setScale(Number.isFinite(s) && s > 0 ? Math.min(s, 3) : 1);
    };
    fit();
    const ro = new ResizeObserver(fit);
    if (contentRef.current) ro.observe(contentRef.current);
    window.addEventListener('resize', fit);
    const iv = window.setInterval(fit, 3000);
    return () => {
      ro.disconnect();
      window.removeEventListener('resize', fit);
      window.clearInterval(iv);
    };
  }, [designW]);

  const active = resolvedList[activeIdx] ?? null;
  const factoryCfg = active?.factory ? configs.find((c) => c.factoryId === active.factory!.id) : undefined;
  const targetPph = factoryCfg?.targetPphPct ?? DEFAULT_TARGET_PPH;
  const clock = now.toLocaleTimeString('vi-VN', { hour: '2-digit', minute: '2-digit' });
  const dateStr = `${String(now.getDate()).padStart(2, '0')}-${String(now.getMonth() + 1).padStart(2, '0')}-${now.getFullYear()}`;

  if (loading && factories.length === 0) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-white">
        <span className="text-sm font-bold text-gray-400">Đang tải dữ liệu...</span>
      </div>
    );
  }

  if (lineIds.length === 0 || resolvedList.length === 0) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-white px-6 text-center">
        <span className="text-sm font-bold text-rose-500">
          {lineIds.length === 0
            ? 'Thiếu mã Line trên link — dùng ?lineIds=<mã 1>,<mã 2> (lấy từng mã ở nút 📺 Lấy link TV tại mỗi Line).'
            : error || 'Không tìm thấy Line nào trong danh sách — kiểm tra lại các mã trên link.'}
        </span>
      </div>
    );
  }

  if (!active) return null;

  return (
    <div className="flex min-h-screen w-full items-start justify-center overflow-y-auto bg-white text-tbs-dark">
      <style>{`@keyframes pphComboCountdown { from { transform: scaleX(1); } to { transform: scaleX(0); } }`}</style>
      <div ref={contentRef} className="shrink-0" style={{ width: designW, transform: `scale(${scale})`, transformOrigin: 'top center' }}>
        {resolvedList.length > 1 && (
          <div className="flex flex-wrap items-center gap-2 border-b border-gray-100 bg-gray-50 px-4 py-2">
            {resolvedList.map((r, i) => {
              const roll = rollup(r.leaves);
              const tone = toneFor(roll.pct);
              const missing = r.leaves.filter((l) => l.entryStatus === 'missing').length;
              const t = TONE_LIGHT[tone];
              return (
                <button
                  key={r.lineId}
                  type="button"
                  onClick={() => goTo(i)}
                  className={`flex items-center gap-1.5 rounded-full border-2 px-3 py-1.5 text-sm font-black transition ${t.chipBg} ${t.text} ${
                    i === activeIdx ? 'shadow-md' : 'opacity-60 hover:opacity-100'
                  }`}
                  style={{ borderColor: t.ring }}
                >
                  {missing > 0 && <span className="animate-pulse text-rose-600">⚠</span>}
                  {pphLineTitle(r.areaName, r.lineName)}: {roll.pct == null ? '—' : `${roll.pct}%`} ({fmtInt(roll.actual)}/{fmtInt(roll.fullTarget)})
                </button>
              );
            })}
            {/* Thanh đếm ngược mảnh — tự chạy hết trong đúng intervalMs bằng CSS animation thuần
                (không tick JS riêng); key đổi theo activeIdx/resetTick để CHẠY LẠI TỪ ĐẦU mỗi lần
                đổi Line, dù tự động hay bấm tay. */}
            <div className="ml-auto h-1 w-24 shrink-0 overflow-hidden rounded-full bg-gray-200">
              <div
                key={`${activeIdx}-${resetTick}`}
                className="h-full w-full origin-left bg-[#006838]"
                style={{ animation: `pphComboCountdown ${intervalMs}ms linear forwards` }}
              />
            </div>
          </div>
        )}

        <div className="relative flex flex-wrap items-center justify-between gap-3 border-b border-gray-100 px-6 py-2">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src="/images/tbs-logo.png" alt="TBS" className="h-10 w-auto shrink-0 object-contain" />
          <h2 className="pointer-events-none absolute left-1/2 top-1/2 max-w-[55%] -translate-x-1/2 -translate-y-1/2 truncate text-center text-4xl font-black uppercase tracking-wide text-tbs-dark">
            {pphLineTitle(active.areaName, active.lineName)}
          </h2>
          <div className="flex items-center gap-2">
            <button
              type="button"
              onClick={handleEnableAudio}
              title={audioUnlocked ? 'Đã bật nhắc giọng đọc' : 'Bấm để bật nhắc giọng đọc'}
              className={`flex h-9 w-9 shrink-0 items-center justify-center rounded-full transition ${
                audioUnlocked ? 'bg-emerald-500 text-white' : 'animate-pulse bg-rose-500 text-white'
              }`}
            >
              {audioUnlocked ? <IconVolume size={18} /> : <IconVolumeOff size={18} />}
            </button>
            <button
              type="button"
              onClick={toggleFs}
              title="Toàn màn hình"
              className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-gray-100 text-gray-600 transition hover:bg-gray-200"
            >
              {fs ? <IconMinimize size={18} /> : <IconMaximize size={18} />}
            </button>
            <div className="overflow-hidden rounded-lg border border-gray-200">
              <div className="bg-[#006838] px-3 py-1 text-center">
                <span className="font-mono text-sm font-black tracking-wide text-white">{dateStr}</span>
              </div>
              <div className="bg-[#0a1a2f] px-3 py-1 text-center">
                <span className="font-mono text-lg font-black tabular-nums text-white">{clock}</span>
              </div>
            </div>
          </div>
        </div>
        <div className="space-y-2 p-3">
          {/* key={active.lineId} — ĐỔI LINE PHẢI REMOUNT LineBoard: nó tự giữ hàng chờ âm thanh nhắc
              trễ nhập (audioQueueRef/lastAnnouncedRef, xem LineBoard) theo Tổ của Line TRƯỚC — không
              remount thì đổi sang Line khác vẫn có thể phát nốt câu nhắc còn sót của Line cũ. */}
          <LineBoard
            key={active.lineId}
            sel={{ areaName: active.areaName, name: active.lineName, leafIds: active.leaves.map((l) => l.id) }}
            leaves={active.leaves}
            targetPph={targetPph}
            light
            tv
            alertOverdue
            audioUnlocked={audioUnlocked}
          />
        </div>
      </div>
    </div>
  );
}
