"use client";

import React, { useEffect } from "react";

export default function GembaMainPage() {
  useEffect(() => {
    // Đổi từ /work/gemba.html sang /work/gemba-app.html — tên cũ trùng với CHÍNH đường dẫn export
    // tĩnh của trang Next này (route /work/gemba -> out/work/gemba.html), nên lúc build 2 file
    // cùng tranh 1 chỗ, Next ghi đè file HTML portal thật bằng đúng cái spinner này -> bấm vào
    // redirect lại ra chính nó, lặp vô hạn. Đổi tên khác hẳn để không còn đụng hàng.
    if (typeof window !== "undefined") {
      window.location.replace("/work/gemba-app.html");
    }
  }, []);

  return (
    <div className="flex h-screen w-full items-center justify-center bg-[#f4f6f8] font-sans">
      <div className="text-center space-y-3">
        <div className="w-10 h-10 border-4 border-emerald-600 border-t-transparent rounded-full animate-spin mx-auto"></div>
        <p className="text-sm font-semibold text-slate-600">Đang tải phân hệ Gemba.Pro...</p>
      </div>
    </div>
  );
}
