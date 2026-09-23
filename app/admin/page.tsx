'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import {
  HeartHandshake,
  Users,
  ShieldCheck,
  BarChart2,
  ArrowUpRight
} from 'lucide-react';

export default function AdminDashboardPage() {
  const [donations, setDonations] = useState<any[]>([]);
  const [volunteers, setVolunteers] = useState<any[]>([]);

  useEffect(() => {
    fetch('/api/donations')
      .then((res) => res.json())
      .then((data) => {
        if (Array.isArray(data)) setDonations(data);
      })
      .catch((err) => console.error(err));

    fetch('/api/volunteers')
      .then((res) => res.json())
      .then((data) => {
        if (Array.isArray(data)) setVolunteers(data);
      })
      .catch((err) => console.error(err));
  }, []);

  const totalDonationAmount = donations.reduce((sum, d) => sum + (d.amount || 0), 0);

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

        <div className="flex gap-3">
          <Link
            href="/admin/impact"
            className="px-4 py-2 rounded-xl bg-saffron-600 text-white font-bold text-xs shadow hover:bg-saffron-700 transition-colors"
          >
            Edit Impact Metrics
          </Link>
        </div>
      </div>

      {/* Metrics Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        <div className="p-6 rounded-2xl bg-white border border-cream-300 shadow-soft space-y-2">
          <div className="flex items-center justify-between text-xs text-gray-500">
            <span>Total Donations</span>
            <HeartHandshake className="w-5 h-5 text-saffron-600" />
          </div>
          <div className="text-2xl font-bold font-serif text-forest-800">
            ₹{totalDonationAmount.toLocaleString('en-IN')}
          </div>
          <p className="text-[11px] text-gray-500">{donations.length} total completed records</p>
        </div>

        <div className="p-6 rounded-2xl bg-white border border-cream-300 shadow-soft space-y-2">
          <div className="flex items-center justify-between text-xs text-gray-500">
            <span>Volunteer Applications</span>
            <Users className="w-5 h-5 text-forest-700" />
          </div>
          <div className="text-2xl font-bold font-serif text-forest-800">
            {volunteers.length}
          </div>
          <p className="text-[11px] text-gray-500">
            {volunteers.filter((v) => v.status === 'pending').length} pending review
          </p>
        </div>

        <div className="p-6 rounded-2xl bg-white border border-cream-300 shadow-soft space-y-2">
          <div className="flex items-center justify-between text-xs text-gray-500">
            <span>Official Legal Entity</span>
            <ShieldCheck className="w-5 h-5 text-forest-800" />
          </div>
          <div className="text-lg font-bold font-serif text-forest-800">
            052/2016-2017
          </div>
          <p className="text-[11px] text-gray-500">Registered 06.06.2016</p>
        </div>

        <div className="p-6 rounded-2xl bg-white border border-cream-300 shadow-soft space-y-2">
          <div className="flex items-center justify-between text-xs text-gray-500">
            <span>Leadership</span>
            <BarChart2 className="w-5 h-5 text-saffron-600" />
          </div>
          <div className="text-sm font-bold font-serif text-forest-800">
            Col. M.P. Sharma (Retd.)
          </div>
          <p className="text-[11px] text-gray-500">President</p>
        </div>
      </div>

      {/* Recent Activity Tables */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        <div className="p-6 rounded-3xl bg-white border border-cream-300 shadow-soft space-y-4">
          <div className="flex justify-between items-center border-b border-cream-200 pb-3">
            <h3 className="font-serif font-bold text-base text-forest-800">Recent Donations</h3>
            <Link href="/admin/donations" className="text-xs font-bold text-saffron-600 hover:underline flex items-center gap-1">
              <span>View All</span>
              <ArrowUpRight className="w-3.5 h-3.5" />
            </Link>
          </div>

          <div className="space-y-3">
            {donations.length === 0 ? (
              <p className="text-xs text-gray-500 py-4 text-center">No donations recorded yet.</p>
            ) : (
              donations.slice(0, 5).map((d) => (
                <div key={d._id} className="p-3 rounded-xl bg-cream-50 border border-cream-200 flex justify-between items-center text-xs">
                  <div>
                    <span className="font-bold text-forest-800 block">{d.donorName}</span>
                    <span className="text-[11px] text-gray-500">{d.purpose}</span>
                  </div>
                  <div className="text-right">
                    <span className="font-bold text-forest-700 block">₹{d.amount}</span>
                    <span className="text-[10px] text-gray-400">{d.paymentMode}</span>
                  </div>
                </div>
              ))
            )}
          </div>
        </div>

        <div className="p-6 rounded-3xl bg-white border border-cream-300 shadow-soft space-y-4">
          <div className="flex justify-between items-center border-b border-cream-200 pb-3">
            <h3 className="font-serif font-bold text-base text-forest-800">Volunteer Applicants</h3>
            <Link href="/admin/volunteers" className="text-xs font-bold text-saffron-600 hover:underline flex items-center gap-1">
              <span>Manage</span>
              <ArrowUpRight className="w-3.5 h-3.5" />
            </Link>
          </div>

          <div className="space-y-3">
            {volunteers.length === 0 ? (
              <p className="text-xs text-gray-500 py-4 text-center">No volunteer applications submitted yet.</p>
            ) : (
              volunteers.slice(0, 5).map((v) => (
                <div key={v._id} className="p-3 rounded-xl bg-cream-50 border border-cream-200 flex justify-between items-center text-xs">
                  <div>
                    <span className="font-bold text-forest-800 block">{v.name} ({v.city})</span>
                    <span className="text-[11px] text-gray-500">{v.phone} • {v.email}</span>
                  </div>
                  <span className={`px-2.5 py-1 rounded-full text-[10px] font-bold ${
                    v.status === 'approved' ? 'bg-forest-100 text-forest-800' : 'bg-saffron-100 text-saffron-800'
                  }`}>
                    {v.status}
                  </span>
                </div>
              ))
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
