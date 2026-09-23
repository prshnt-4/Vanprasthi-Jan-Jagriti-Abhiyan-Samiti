'use client';

import React, { useState, useEffect } from 'react';
import { Plus, Image as ImageIcon } from 'lucide-react';

export default function AdminGalleryPage() {
  const [images, setImages] = useState<any[]>([]);
  const [titleHi, setTitleHi] = useState('');
  const [titleEn, setTitleEn] = useState('');
  const [category, setCategory] = useState('Cleanliness');
  const [imageUrl, setImageUrl] = useState('/images/hero-ngo.jpg');

  const fetchGallery = () => {
    fetch('/api/gallery')
      .then((res) => res.json())
      .then((data) => {
        if (Array.isArray(data)) setImages(data);
      })
      .catch((err) => console.error(err));
  };

  useEffect(() => {
    fetchGallery();
  }, []);

  const handleAdd = async (e: React.FormEvent) => {
    e.preventDefault();
    await fetch('/api/gallery', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        title: { hi: titleHi, en: titleEn },
        category,
        imageUrl,
      }),
    });
    setTitleHi('');
    setTitleEn('');
    fetchGallery();
  };

  return (
    <div className="space-y-6">
      <div className="bg-white p-6 rounded-3xl border border-cream-300 shadow-soft">
        <h1 className="text-2xl font-serif font-bold text-maroon-900">Gallery Manager</h1>
        <p className="text-xs text-gray-500">Upload photos for cleanliness drives, education outreach, and community service events</p>
      </div>

      <form onSubmit={handleAdd} className="p-6 rounded-3xl bg-white border border-cream-300 shadow-soft space-y-4 text-xs">
        <h3 className="font-serif font-bold text-sm text-maroon-900">Add Photo to Gallery</h3>
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
          <div>
            <label className="block font-medium text-gray-700 mb-1">Category</label>
            <select
              value={category}
              onChange={(e) => setCategory(e.target.value)}
              className="w-full px-3 py-2 rounded-xl border border-cream-300 bg-cream-50"
            >
             <option value="Cleanliness">Cleanliness</option>
             <option value="Social Education">Social Education</option>
             <option value="Anti-Corruption Awareness">Anti-Corruption Awareness</option>
             <option value="Community Service">Community Service</option>
             <option value="Events">Events</option>
             <option value="Volunteers">Volunteers</option>
            </select>
          </div>
          <div>
            <label className="block font-medium text-gray-700 mb-1">Image URL / Path</label>
            <input
              type="text"
              value={imageUrl}
              onChange={(e) => setImageUrl(e.target.value)}
              className="w-full px-3 py-2 rounded-xl border border-cream-300 bg-cream-50"
            />
          </div>
        </div>

        <button
          type="submit"
          className="px-5 py-2.5 rounded-xl bg-saffron-600 text-white font-bold text-xs shadow flex items-center gap-1.5"
        >
          <Plus className="w-4 h-4" />
          <span>Save Image</span>
        </button>
      </form>

      <div className="bg-white rounded-3xl border border-cream-300 p-6 shadow-soft space-y-4">
        <div className="divide-y divide-cream-200">
          {images.map((img) => (
            <div key={img._id} className="py-2 flex justify-between items-center text-xs">
              <span className="font-bold text-maroon-900">{img.title.hi} ({img.category})</span>
              <span className="text-gray-500">{img.imageUrl}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
