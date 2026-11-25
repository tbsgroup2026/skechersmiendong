import React, { Suspense } from 'react';
import PphDayClient from './PphDayClient';

// Trang xem số sản lượng theo NGÀY, dạng bảng: chọn ngày ở ô trên cùng, bảng hiện từng Tổ theo từng khung giờ
// (CN, SLKH/giờ, SLTH theo khung, SLKH và SLTH cả ngày, chênh lệch). Dữ liệu đọc từ cùng API /api/pph/dashboard.
export default function PphDayPage() {
  return (
    <Suspense
      fallback={
        <div className="flex min-h-screen items-center justify-center bg-white">
          <span className="text-sm font-bold text-gray-400">Đang tải dữ liệu...</span>
        </div>
      }
    >
      <PphDayClient />
    </Suspense>
  );
}
