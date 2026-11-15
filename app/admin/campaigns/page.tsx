'use client';

import React, { useState, useEffect } from 'react';
import { Plus } from 'lucide-react';
import { getCampaigns, addCampaign, CampaignItem } from '@/lib/firestoreService';

export default function AdminCampaignsPage() {
  const [campaigns, setCampaigns] = useState<CampaignItem[]>([]);
  const [titleHi, setTitleHi] = useState('');
  const [titleEn, setTitleEn] = useState('');
  const [descHi, setDescHi] = useState('');
  const [descEn, setDescEn] = useState('');
  const [category, setCategory] = useState('Swachhata Abhiyan');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const fetchCampaigns = async () => {
    try {
      const data = await getCampaigns();
      setCampaigns(data);
    } catch (err) {
      console.error('Error fetching campaigns:', err);
    }
  };

  useEffect(() => {
    fetchCampaigns();
  }, []);

  const handleAdd = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError('');
    try {
      await addCampaign({
        title: { hi: titleHi, en: titleEn },
        description: { hi: descHi, en: descEn },
        coverImage: '/images/hero-ngo.jpg',
        startDate: new Date().toLocaleDateString('en-IN'),
        category,
        status: 'active',
      });
      setTitleHi('');
      setTitleEn('');
      setDescHi('');
      setDescEn('');
      await fetchCampaigns();
    } catch (err: any) {
      console.error('Failed to add campaign:', err);
      setError(err?.message || 'Failed to create campaign. Check Firestore rules & Firebase config.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="space-y-6">
      <div className="bg-white p-6 rounded-3xl border border-cream-300 shadow-soft">
        <h1 className="text-2xl font-serif font-bold text-maroon-900">Campaigns CMS</h1>
        <p className="text-xs text-gray-500">Create & manage NGO social initiatives and awareness drives</p>
      </div>

      <form onSubmit={handleAdd} className="p-6 rounded-3xl bg-white border border-cream-300 shadow-soft space-y-4 text-xs">
        <h3 className="font-serif font-bold text-sm text-maroon-900">Create New Campaign</h3>
        {error && (
          <div className="p-3 rounded-xl bg-red-50 border border-red-200 text-red-700 text-xs font-medium">
            ⚠️ {error}
          </div>
        )}
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
          disabled={loading}
          className="px-5 py-2.5 rounded-xl bg-saffron-600 text-white font-bold text-xs shadow flex items-center gap-1.5 disabled:opacity-50"
        >
          <Plus className="w-4 h-4" />
          <span>{loading ? 'Publishing...' : 'Publish Campaign'}</span>
        </button>
      </form>

      <div className="bg-white rounded-3xl border border-cream-300 p-6 shadow-soft space-y-4">
        <div className="divide-y divide-cream-200">
          {campaigns.length === 0 ? (
            <p className="text-xs text-gray-500 py-3">No campaigns published yet.</p>
          ) : (
            campaigns.map((c) => (
              <div key={c._id || c.id} className="py-3 text-xs space-y-1">
                <span className="font-bold text-maroon-900 block">{c.title.hi} / {c.title.en}</span>
                <p className="text-gray-600">{c.description.en}</p>
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  );
}
