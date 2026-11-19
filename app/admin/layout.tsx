'use client';

import React, { useEffect, useState } from 'react';
import { usePathname, useRouter } from 'next/navigation';
import { onAuthStateChanged } from 'firebase/auth';
import { auth, isFirebaseConfigured } from '@/lib/firebase';
import { AdminSidebar } from '@/components/layout/AdminSidebar';

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const router = useRouter();
  const [loading, setLoading] = useState(true);

  // Normalize trailing slash for static export compatibility
  const normalizedPath = pathname.replace(/\/$/, '') || '/';
  const isLoginPage = normalizedPath === '/admin/login';

  useEffect(() => {
    if (isLoginPage) {
      setLoading(false);
      return;
    }

    if (!isFirebaseConfigured || !auth) {
      router.push('/admin/login');
      return;
    }

    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (!user) {
        router.push('/admin/login');
      } else {
        setLoading(false);
      }
    });

    return () => unsubscribe();
  }, [normalizedPath, isLoginPage, router]);

  if (isLoginPage) {
    return <>{children}</>;
  }

  if (loading) {
    return (
      <div className="min-h-screen bg-cream-100 flex items-center justify-center text-xs font-semibold text-gray-600">
        Verifying Admin Access...
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-cream-100 flex">
      <AdminSidebar />
      <main className="flex-1 p-6 sm:p-10 overflow-y-auto">{children}</main>
    </div>
  );
}
