'use client';

import React, { useState, useEffect } from 'react';
import { Plus } from 'lucide-react';
import { ImageUploadField } from '@/components/admin/ImageUploadField';
import { getNews, addNews, NewsItem } from '@/lib/firestoreService';

export default function AdminNewsPage() {
  const [news, setNews] = useState<NewsItem[]>([]);
  const [titleHi, setTitleHi] = useState('');
  const [titleEn, setTitleEn] = useState('');
  const [contentHi, setContentHi] = useState('');
  const [contentEn, setContentEn] = useState('');
  const [coverImage, setCoverImage] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const fetchNews = async () => {
    try {
      const data = await getNews();
      setNews(data);
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => {
    fetchNews();
  }, []);

  const handleAdd = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError('');
    try {
      await addNews({
        title: { hi: titleHi, en: titleEn },
        content: { hi: contentHi, en: contentEn },
        coverImage: coverImage || '/images/hero-ngo.jpg',
        publishDate: new Date().toLocaleDateString('en-IN'),
        category: 'News',
      });
      setTitleHi('');
      setTitleEn('');
      setContentHi('');
      setContentEn('');
      setCoverImage('');
      await fetchNews();
    } catch (err: any) {
      console.error('Failed to add news:', err);
      setError(err?.message || 'Failed to publish article. Check Firestore rules & Firebase config.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="space-y-6">
      <div className="bg-white p-6 rounded-3xl border border-cream-300 shadow-soft">
        <h1 className="text-2xl font-serif font-bold text-maroon-900">News & Press CMS</h1>
        <p className="text-xs text-gray-500">Publish NGO news, press releases and activity reports</p>
      </div>

      <form onSubmit={handleAdd} className="p-6 rounded-3xl bg-white border border-cream-300 shadow-soft space-y-4 text-xs">
        <h3 className="font-serif font-bold text-sm text-maroon-900">Publish News Article</h3>
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

        <div>
          <ImageUploadField value={coverImage} onChange={setCoverImage} />
        </div>

        <button
          type="submit"
          disabled={loading}
          className="px-5 py-2.5 rounded-xl bg-saffron-600 text-white font-bold text-xs shadow flex items-center gap-1.5 disabled:opacity-50"
        >
          <Plus className="w-4 h-4" />
          <span>{loading ? 'Publishing...' : 'Publish Article'}</span>
        </button>
      </form>

      <div className="bg-white rounded-3xl border border-cream-300 p-6 shadow-soft space-y-4">
        <div className="divide-y divide-cream-200">
          {news.length === 0 ? (
            <p className="text-xs text-gray-500 py-3">No news published yet.</p>
          ) : (
            news.map((item) => (
              <div key={item._id || item.id} className="py-3 text-xs space-y-1">
                <span className="font-bold text-maroon-900 block">{item.title.hi} / {item.title.en}</span>
                <p className="text-gray-600 line-clamp-2">{item.content.en || item.content.hi}</p>
                <span className="text-[10px] text-gray-400">{item.publishDate}</span>
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  );
}
