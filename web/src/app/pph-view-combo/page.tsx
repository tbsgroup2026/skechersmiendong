import React, { Suspense } from 'react';
import PphViewComboClient from './PphViewComboClient';

// Static export (output:'export') KHÔNG hỗ trợ route động mà không biết trước danh sách giá trị
// lúc build — dùng query string (?lineIds=...) đọc ở CLIENT, đúng khuôn /pph-view?lineId=... đã có.
// useSearchParams() bắt buộc nằm trong Suspense boundary (Next.js yêu cầu với static export).
export default function PphViewComboPage() {
  return (
    <Suspense
      fallback={
        <div className="flex min-h-screen items-center justify-center bg-white">
          <span className="text-sm font-bold text-gray-400">Đang tải dữ liệu...</span>
        </div>
      }
    >
      <PphViewComboClient />
    </Suspense>
  );
}
