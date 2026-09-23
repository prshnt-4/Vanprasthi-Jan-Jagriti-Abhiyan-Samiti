'use client';

import React, { useState, useEffect } from 'react';
import { Plus, Target } from 'lucide-react';

export default function AdminCampaignsPage() {
  const [campaigns, setCampaigns] = useState<any[]>([]);
  const [titleHi, setTitleHi] = useState('');
  const [titleEn, setTitleEn] = useState('');
  const [descHi, setDescHi] = useState('');
  const [descEn, setDescEn] = useState('');
  const [category, setCategory] = useState('Swachhata Abhiyan');

  const fetchCampaigns = () => {
    fetch('/api/campaigns')
      .then((res) => res.json())
      .then((data) => {
        if (Array.isArray(data)) setCampaigns(data);
      })
      .catch((err) => console.error(err));
  };

  useEffect(() => {
    fetchCampaigns();
  }, []);

  const handleAdd = async (e: React.FormEvent) => {
    e.preventDefault();
    await fetch('/api/campaigns', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        title: { hi: titleHi, en: titleEn },
        description: { hi: descHi, en: descEn },
        coverImage: '/images/hero-ngo.jpg',
        startDate: new Date().toLocaleDateString('en-IN'),
        category,
      }),
    });
    setTitleHi('');
    setTitleEn('');
    setDescHi('');
    setDescEn('');
    fetchCampaigns();
  };

  return (
    <div className="space-y-6">
      <div className="bg-white p-6 rounded-3xl border border-cream-300 shadow-soft">
        <h1 className="text-2xl font-serif font-bold text-maroon-900">Campaigns CMS</h1>
        <p className="text-xs text-gray-500">Create & manage NGO social initiatives and awareness drives</p>
      </div>

      <form onSubmit={handleAdd} className="p-6 rounded-3xl bg-white border border-cream-300 shadow-soft space-y-4 text-xs">
        <h3 className="font-serif font-bold text-sm text-maroon-900">Create New Campaign</h3>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div>
            <label className="block font-medium text-gray-700 mb-1">Title (Hindi) *</label>
            <input
              type="text"
              required
              value={titleHi}
              onChange={(e) => setTitleHi(e.target.value)}
              className="w-full px-3 py-2 rounded-xl border border-cream-300 bg-cream-50"
            />
          </div>
          <div>
            <label className="block font-medium text-gray-700 mb-1">Title (English) *</label>
            <input
              type="text"
              required
              value={titleEn}
              onChange={(e) => setTitleEn(e.target.value)}
              className="w-full px-3 py-2 rounded-xl border border-cream-300 bg-cream-50"
            />
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div>
            <label className="block font-medium text-gray-700 mb-1">Description (Hindi)</label>
            <textarea
              rows={2}
              value={descHi}
              onChange={(e) => setDescHi(e.target.value)}
              className="w-full px-3 py-2 rounded-xl border border-cream-300 bg-cream-50"
            />
          </div>
          <div>
            <label className="block font-medium text-gray-700 mb-1">Description (English)</label>
            <textarea
              rows={2}
              value={descEn}
              onChange={(e) => setDescEn(e.target.value)}
              className="w-full px-3 py-2 rounded-xl border border-cream-300 bg-cream-50"
            />
          </div>
        </div>

        <button
          type="submit"
          className="px-5 py-2.5 rounded-xl bg-saffron-600 text-white font-bold text-xs shadow flex items-center gap-1.5"
        >
          <Plus className="w-4 h-4" />
          <span>Publish Campaign</span>
        </button>
      </form>

      <div className="bg-white rounded-3xl border border-cream-300 p-6 shadow-soft space-y-4">
        <div className="divide-y divide-cream-200">
          {campaigns.map((c) => (
            <div key={c._id} className="py-3 text-xs space-y-1">
              <span className="font-bold text-maroon-900 block">{c.title.hi} / {c.title.en}</span>
              <p className="text-gray-600">{c.description.en}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
