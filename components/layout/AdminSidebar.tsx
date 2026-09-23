'use client';

import React from 'react';
import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';
import {
  Sun,
  LayoutDashboard,
  HeartHandshake,
  Users,
  Target,
  Calendar,
  Image as ImageIcon,
  Newspaper,
  FileText,
  BarChart2,
  LogOut,
  ArrowLeft
} from 'lucide-react';

export const AdminSidebar = () => {
  const pathname = usePathname();
  const router = useRouter();

  const menuItems = [
    { href: '/admin', label: 'Dashboard Overview', icon: LayoutDashboard },
    { href: '/admin/donations', label: 'Donations & Receipts', icon: HeartHandshake },
    { href: '/admin/volunteers', label: 'Volunteer Registrations', icon: Users },
    { href: '/admin/campaigns', label: 'Campaigns CMS', icon: Target },
    { href: '/admin/events', label: 'Events Manager', icon: Calendar },
    { href: '/admin/gallery', label: 'Gallery Manager', icon: ImageIcon },
    { href: '/admin/news', label: 'News & Articles', icon: Newspaper },
    { href: '/admin/documents', label: 'Legal PDFs & Reports', icon: FileText },
    { href: '/admin/impact', label: 'Impact Metrics (Zero Invention)', icon: BarChart2 },
  ];

  const handleLogout = async () => {
    await fetch('/api/auth/logout', { method: 'POST' });
    router.push('/admin/login');
  };

  return (
    <aside className="w-64 bg-forest-950 text-cream-100 min-h-screen border-r border-forest-800 flex flex-col justify-between p-4 shrink-0">
      <div className="space-y-6">
        <div className="flex items-center gap-3 border-b border-forest-800 pb-4">
          <div className="w-10 h-10 rounded-full bg-saffron-600 flex items-center justify-center text-white shadow">
            <Sun className="w-6 h-6" />
          </div>
          <div>
            <h2 className="font-serif font-bold text-sm text-saffron-400">NGO Admin CMS</h2>
            <p className="text-[10px] text-cream-300">Vanprasthi Samiti Roorkee</p>
          </div>
        </div>

        <nav className="space-y-1">
          {menuItems.map((item) => {
            const Icon = item.icon;
            const isActive = pathname === item.href;
            return (
              <Link
                key={item.href}
                href={item.href}
                className={`flex items-center gap-3 px-3.5 py-2.5 rounded-xl text-xs font-semibold transition-all ${
                  isActive
                    ? 'bg-saffron-600 text-white shadow-md'
                    : 'text-cream-200 hover:bg-forest-900 hover:text-white'
                }`}
              >
                <Icon className="w-4 h-4 shrink-0" />
                <span>{item.label}</span>
              </Link>
            );
          })}
        </nav>
      </div>

      <div className="pt-4 border-t border-forest-800 space-y-2">
        <Link
          href="/"
          className="flex items-center gap-2 px-3 py-2 rounded-lg text-xs text-cream-300 hover:text-saffron-400 transition-colors"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>View Public Website</span>
        </Link>
        <button
          onClick={handleLogout}
          className="w-full flex items-center gap-2 px-3.5 py-2.5 rounded-xl bg-forest-900 hover:bg-red-900 text-cream-200 text-xs font-bold transition-colors"
        >
          <LogOut className="w-4 h-4" />
          <span>Sign Out</span>
        </button>
      </div>
    </aside>
  );
};
