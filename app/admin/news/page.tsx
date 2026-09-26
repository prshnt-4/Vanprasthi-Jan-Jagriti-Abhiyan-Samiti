'use client';

import React, { useState, useEffect } from 'react';
import { Plus, Newspaper } from 'lucide-react';
import { ImageUploadField } from '@/components/admin/ImageUploadField';

export default function AdminNewsPage() {
  const [news, setNews] = useState<any[]>([]);
  const [titleHi, setTitleHi] = useState('');
  const [titleEn, setTitleEn] = useState('');
  const [slug, setSlug] = useState('');
  const [contentHi, setContentHi] = useState('');
  const [contentEn, setContentEn] = useState('');
  const [coverImage, setCoverImage] = useState('');

  const fetchNews = () => {
    fetch('/api/news')
      .then((res) => res.json())
      .then((data) => {
        if (Array.isArray(data)) setNews(data);
      })
      .catch((err) => console.error(err));
  };

  useEffect(() => {
    fetchNews();
  }, []);

  const handleAdd = async (e: React.FormEvent) => {
    e.preventDefault();
    const generatedSlug = slug || titleEn.toLowerCase().replace(/[^a-z0-9]+/g, '-');
    await fetch('/api/news', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        title: { hi: titleHi, en: titleEn },
        slug: generatedSlug,
        content: { hi: contentHi, en: contentEn },
        coverImage: coverImage || '/images/hero-ngo.jpg',
        publishedDate: new Date().toLocaleDateString('en-IN'),
        category: 'News',
      }),
    });
    setTitleHi('');
    setTitleEn('');
    setSlug('');
    setContentHi('');
    setContentEn('');
    fetchNews();
  };

  return (
    <div className="space-y-6">
      <div className="bg-white p-6 rounded-3xl border border-cream-300 shadow-soft">
        <h1 className="text-2xl font-serif font-bold text-maroon-900">News & Articles CMS</h1>
        <p className="text-xs text-gray-500">Publish press releases and news updates</p>
      </div>

      <form onSubmit={handleAdd} className="p-6 rounded-3xl bg-white border border-cream-300 shadow-soft space-y-4 text-xs">
        <h3 className="font-serif font-bold text-sm text-maroon-900">Publish Article</h3>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div>
            <label className="block font-medium text-gray-700 mb-1">Headline (Hindi) *</label>
            <input
              type="text"
              required
              value={titleHi}
              onChange={(e) => setTitleHi(e.target.value)}
              className="w-full px-3 py-2 rounded-xl border border-cream-300 bg-cream-50"
            />
          </div>
          <div>
            <label className="block font-medium text-gray-700 mb-1">Headline (English) *</label>
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
            <label className="block font-medium text-gray-700 mb-1">Content (Hindi)</label>
            <textarea
              rows={3}
              value={contentHi}
              onChange={(e) => setContentHi(e.target.value)}
              className="w-full px-3 py-2 rounded-xl border border-cream-300 bg-cream-50"
            />
          </div>
          <div>
            <label className="block font-medium text-gray-700 mb-1">Content (English)</label>
            <textarea
              rows={3}
              value={contentEn}
              onChange={(e) => setContentEn(e.target.value)}
              className="w-full px-3 py-2 rounded-xl border border-cream-300 bg-cream-50"
            />
          </div>
        </div>

        <ImageUploadField value={coverImage} onChange={setCoverImage} />

        <button
          type="submit"
          className="px-5 py-2.5 rounded-xl bg-saffron-600 text-white font-bold text-xs shadow flex items-center gap-1.5"
        >
          <Plus className="w-4 h-4" />
          <span>Publish News Article</span>
        </button>
      </form>

      <div className="bg-white rounded-3xl border border-cream-300 p-6 shadow-soft space-y-4">
        <div className="divide-y divide-cream-200">
          {news.map((item) => (
            <div key={item._id} className="py-2 text-xs space-y-1">
              {item.coverImage && (
                <img src={item.coverImage} alt={item.title.en} className="mb-2 h-24 w-36 rounded-lg object-cover" />
              )}
              <span className="font-bold text-maroon-900 block">{item.title.hi} / {item.title.en}</span>
              <span className="text-gray-500">Date: {item.publishedDate} • Slug: {item.slug}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
