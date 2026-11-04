import React, { Suspense } from 'react';
import type { Metadata } from 'next';
import PphTrackAdminClient from './PphTrackAdminClient';

export const metadata: Metadata = { title: 'Quản trị dữ liệu chuyền — TBS' };

export default function PphTrackAdminPage() {
  return (
    <Suspense fallback={<div className="min-h-screen bg-[#f4f7f5]" />}>
      <PphTrackAdminClient />
    </Suspense>
  );
}
