'use client';

import React from 'react';
import Link from 'next/link';
import {
  ShieldCheck,
  Calendar,
  ImageIcon,
  Target,
  Mail,
  ArrowRight,
} from 'lucide-react';

export default function AdminDashboardPage() {
  const quickLinks = [
    {
      href: '/admin/events',
      title: 'Events Manager',
      desc: 'Add and manage upcoming events, dates, and locations.',
      icon: Calendar,
      color: 'bg-saffron-50 text-saffron-700 border-saffron-200',
    },
    {
      href: '/admin/campaigns',
      title: 'Campaigns CMS',
      desc: 'Create public awareness initiatives and drives.',
      icon: Target,
      color: 'bg-maroon-50 text-maroon-800 border-maroon-200',
    },
    {
      href: '/admin/gallery',
      title: 'Gallery Manager',
      desc: 'Upload photo albums and activity pictures.',
      icon: ImageIcon,
      color: 'bg-forest-50 text-forest-700 border-forest-200',
    },
    {
      href: '/admin/messages',
      title: 'Contact Messages',
      desc: 'View public contact form inquiries and add internal notes.',
      icon: Mail,
      color: 'bg-amber-50 text-amber-800 border-amber-200',
    },
  ];

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 bg-white p-6 rounded-3xl border border-cream-300 shadow-soft">
        <div>
          <span className="text-xs font-bold text-saffron-600 uppercase tracking-wider">
            NGO Administration Console
          </span>
          <h1 className="text-2xl font-serif font-bold text-forest-800 mt-1">
            Dashboard Overview
          </h1>
          <p className="text-xs text-gray-500">
            वानप्रस्थी जन-जागृति अभियान समिति, रुड़की (Reg. 052/2016-2017)
          </p>
        </div>

        {/* Impact metrics button commented out as requested */}
        {/* <div className="flex gap-3">
          <Link
            href="/admin/impact"
            className="px-4 py-2 rounded-xl bg-saffron-600 text-white font-bold text-xs shadow hover:bg-saffron-700 transition-colors"
          >
            Edit Impact Metrics
          </Link>
        </div> */}
      </div>

      {/* Overview Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-2 gap-6">
        <div className="p-6 rounded-2xl bg-white border border-cream-300 shadow-soft space-y-2">
          <div className="flex items-center justify-between text-xs text-gray-500">
            <span>Official Legal Entity</span>
            <ShieldCheck className="w-5 h-5 text-forest-800" />
          </div>
          <div className="text-xl font-bold font-serif text-forest-800">
            052/2016-2017
          </div>
          <p className="text-[11px] text-gray-500">Registered 06.06.2016 (Roorkee, Uttarakhand)</p>
        </div>

        <div className="p-6 rounded-2xl bg-white border border-cream-300 shadow-soft space-y-2">
          <div className="flex items-center justify-between text-xs text-gray-500">
            <span>Leadership</span>
            <span className="text-xs px-2.5 py-0.5 rounded-full bg-cream-100 text-maroon-900 font-semibold">President</span>
          </div>
          <div className="text-xl font-bold font-serif text-forest-800">
            Col. M.P. Sharma (Retd.)
          </div>
          <p className="text-[11px] text-gray-500">Vanprasthi Jan-Jagriti Abhiyan Samiti</p>
        </div>
      </div>

      {/* Quick Action Navigation Modules */}
      <div className="space-y-4">
        <h2 className="font-serif font-bold text-lg text-maroon-900">CMS Quick Access</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
          {quickLinks.map((item) => {
            const Icon = item.icon;
            return (
              <Link
                key={item.href}
                href={item.href}
                className="p-6 rounded-3xl bg-white border border-cream-300 shadow-soft hover:shadow-card hover:border-saffron-400 transition-all flex items-start gap-4 group"
              >
                <div className={`p-3.5 rounded-2xl border ${item.color} shrink-0`}>
                  <Icon className="w-6 h-6" />
                </div>
                <div className="flex-1 space-y-1">
                  <div className="flex items-center justify-between">
                    <h3 className="font-bold text-sm text-maroon-900 group-hover:text-saffron-600 transition-colors">
                      {item.title}
                    </h3>
                    <ArrowRight className="w-4 h-4 text-gray-400 group-hover:text-saffron-600 group-hover:translate-x-1 transition-all" />
                  </div>
                  <p className="text-xs text-gray-500 leading-relaxed">{item.desc}</p>
                </div>
              </Link>
            );
          })}
        </div>
      </div>
    </div>
  );
}
