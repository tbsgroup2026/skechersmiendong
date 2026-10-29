"use client";

import React, { useEffect } from "react";

export default function GembaMainPage() {
  useEffect(() => {
    // If inside client-side router, redirect directly to /work/gemba.html
    if (typeof window !== "undefined") {
      window.location.replace("/work/gemba.html");
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
