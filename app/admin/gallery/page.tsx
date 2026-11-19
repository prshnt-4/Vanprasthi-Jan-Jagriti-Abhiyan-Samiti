'use client';

import React, { useState, useEffect } from 'react';
import { Plus } from 'lucide-react';
import { ImageUploadField } from '@/components/admin/ImageUploadField';
import { DeleteCmsItemButton } from '@/components/admin/DeleteCmsItemButton';
import { getGalleryImages, addGalleryImage } from '@/lib/firestoreService';

export default function AdminGalleryPage() {
  const [images, setImages] = useState<any[]>([]);
  const [titleHi, setTitleHi] = useState('');
  const [titleEn, setTitleEn] = useState('');
  const [category, setCategory] = useState('Cleanliness');
  const [imageUrl, setImageUrl] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const fetchGallery = async () => {
    try {
      const data = await getGalleryImages();
      if (Array.isArray(data)) setImages(data);
    } catch (err: any) {
      console.error(err);
    }
  };

  useEffect(() => {
    fetchGallery();
  }, []);

  const handleAdd = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!imageUrl) return;
    setLoading(true);
    setError('');
    try {
      await addGalleryImage({
        title: { hi: titleHi, en: titleEn },
        category,
        imageUrl,
      });
      setTitleHi('');
      setTitleEn('');
      setImageUrl('');
      await fetchGallery();
    } catch (err: any) {
      console.error('Failed to add gallery image:', err);
      setError(err?.message || 'Failed to save image.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="space-y-6">
      <div className="bg-white p-6 rounded-3xl border border-cream-300 shadow-soft">
        <h1 className="text-2xl font-serif font-bold text-maroon-900">Gallery Manager</h1>
        <p className="text-xs text-gray-500">Upload photos for cleanliness drives, education outreach, and community service events</p>
      </div>

      <form onSubmit={handleAdd} className="p-6 rounded-3xl bg-white border border-cream-300 shadow-soft space-y-4 text-xs">
        <h3 className="font-serif font-bold text-sm text-maroon-900">Add Photo to Gallery</h3>
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
          <div className="sm:col-span-2">
            <ImageUploadField value={imageUrl} onChange={setImageUrl} />
          </div>
        </div>

        <button
          type="submit"
          disabled={!imageUrl || loading}
          className="px-5 py-2.5 rounded-xl bg-saffron-600 text-white font-bold text-xs shadow flex items-center gap-1.5 disabled:cursor-not-allowed disabled:opacity-50"
        >
          <Plus className="w-4 h-4" />
          <span>{loading ? 'Saving Image...' : 'Save Image'}</span>
        </button>
      </form>

      <div className="bg-white rounded-3xl border border-cream-300 p-6 shadow-soft space-y-4">
        <div className="divide-y divide-cream-200">
          {images.length === 0 ? (
            <p className="text-xs text-gray-500 py-3">No images uploaded yet.</p>
          ) : (
            images.map((img) => {
              const docId = img._id || img.id;
              return (
                <div key={docId} className="py-2 flex justify-between items-center text-xs">
                  <div className="flex items-center gap-3">
                    <img src={img.imageUrl} alt={img.title?.en} className="h-14 w-20 rounded-lg object-cover" />
                    <span className="font-bold text-maroon-900">{img.title?.hi} ({img.category})</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <span className="text-gray-500 truncate max-w-[200px]">{img.imageUrl}</span>
                    <DeleteCmsItemButton
                      collection="gallery_images"
                      docId={docId}
                      itemLabel={img.title?.en || 'Image'}
                      onDeleted={fetchGallery}
                    />
                  </div>
                </div>
              );
            })
          )}
        </div>
      </div>
    </div>
  );
}
