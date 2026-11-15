'use client';

import React, { useEffect, useState } from 'react';
import { usePathname, useRouter } from 'next/navigation';
import { onAuthStateChanged } from 'firebase/auth';
import { AdminSidebar } from '@/components/layout/AdminSidebar';
import { auth, isFirebaseConfigured } from '@/lib/firebase';

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname() || '';
  const router = useRouter();

  // Normalize pathname to handle both '/admin/login' and '/admin/login/'
  const normalizedPath = pathname.replace(/\/$/, '');
  const isLoginPage = normalizedPath === '/admin/login';

  const [loading, setLoading] = useState(!isLoginPage);

  useEffect(() => {
    if (isLoginPage) {
      setLoading(false);
      return;
    }

    if (isFirebaseConfigured && auth) {
      const unsubscribe = onAuthStateChanged(auth, (user) => {
        if (user) {
          setLoading(false);
        } else {
          router.replace('/admin/login/');
        }
      });
      return () => unsubscribe();
    } else {
      // If Firebase is not configured or user is not logged in, redirect to login
      router.replace('/admin/login/');
    }
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
