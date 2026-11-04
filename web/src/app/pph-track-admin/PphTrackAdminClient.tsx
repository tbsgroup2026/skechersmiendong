'use client';

import { useSearchParams } from 'next/navigation';
import PphTrackDataView from '@/modules/production/PphTrackDataView';

// Link riêng của màn quản trị dữ liệu. Mặc định là Line May 1; đổi Line bằng ?lineId=...
// Trang mở công khai nhưng mọi API đều bắt đăng nhập.
const DEFAULT_LINE_ID = 'pphline_mvj5xlfa_ugml9m32';

export default function PphTrackAdminClient() {
  const lineId = useSearchParams().get('lineId') || DEFAULT_LINE_ID;
  return (
    <main className="min-h-screen bg-[#f4f7f5] p-4 text-slate-900">
      <div className="mx-auto max-w-6xl">
        <PphTrackDataView lineId={lineId} />
      </div>
    </main>
  );
}
