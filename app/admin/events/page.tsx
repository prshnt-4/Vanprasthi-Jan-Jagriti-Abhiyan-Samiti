'use client';

import React, { useState, useEffect } from 'react';
import { Plus } from 'lucide-react';
import { ImageUploadField } from '@/components/admin/ImageUploadField';
import { DeleteCmsItemButton } from '@/components/admin/DeleteCmsItemButton';
import { getEvents, addEvent } from '@/lib/firestoreService';

export default function AdminEventsPage() {
  const [events, setEvents] = useState<any[]>([]);
  const [titleHi, setTitleHi] = useState('');
  const [titleEn, setTitleEn] = useState('');
  const [dateStr, setDateStr] = useState('');
  const [timeStr, setTimeStr] = useState('');
  const [location, setLocation] = useState('Roorkee, Uttarakhand');
  const [imageUrl, setImageUrl] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const fetchEvents = async () => {
    try {
      const data = await getEvents();
      if (Array.isArray(data)) setEvents(data);
    } catch (err: any) {
      console.error(err);
    }
  };

  useEffect(() => {
    fetchEvents();
  }, []);

  const handleAdd = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError('');
    try {
      await addEvent({
        title: { hi: titleHi, en: titleEn },
        description: { hi: titleHi, en: titleEn },
        date: dateStr || 'Upcoming Date',
        time: timeStr || '10:00 AM',
        location,
        images: imageUrl ? [imageUrl] : [],
        category: 'Social Event',
        status: 'upcoming',
      });
      setTitleHi('');
      setTitleEn('');
      setDateStr('');
      setTimeStr('');
      setImageUrl('');
      await fetchEvents();
    } catch (err: any) {
      console.error('Failed to add event:', err);
      setError(err?.message || 'Failed to save event.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="space-y-6">
      <div className="bg-white p-6 rounded-3xl border border-cream-300 shadow-soft">
        <h1 className="text-2xl font-serif font-bold text-maroon-900">Events Management</h1>
        <p className="text-xs text-gray-500">Add upcoming seminars & view registrations</p>
      </div>

      <form onSubmit={handleAdd} className="p-6 rounded-3xl bg-white border border-cream-300 shadow-soft space-y-4 text-xs">
        <h3 className="font-serif font-bold text-sm text-maroon-900">Add New Event</h3>
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
            <label className="block font-medium text-gray-700 mb-1">Date</label>
            <input
              type="text"
              placeholder="e.g. 15 October 2026"
              value={dateStr}
              onChange={(e) => setDateStr(e.target.value)}
              className="w-full px-3 py-2 rounded-xl border border-cream-300 bg-cream-50"
            />
          </div>
          <div>
            <label className="block font-medium text-gray-700 mb-1">Time</label>
            <input
              type="text"
              placeholder="e.g. 10:00 AM - 01:00 PM"
              value={timeStr}
              onChange={(e) => setTimeStr(e.target.value)}
              className="w-full px-3 py-2 rounded-xl border border-cream-300 bg-cream-50"
            />
          </div>
          <div className="sm:col-span-2">
            <ImageUploadField value={imageUrl} onChange={setImageUrl} />
          </div>
        </div>

        <button
          type="submit"
          disabled={loading}
          className="px-5 py-2.5 rounded-xl bg-saffron-600 text-white font-bold text-xs shadow flex items-center gap-1.5 disabled:opacity-50"
        >
          <Plus className="w-4 h-4" />
          <span>{loading ? 'Saving...' : 'Save Event'}</span>
        </button>
      </form>

      <div className="bg-white rounded-3xl border border-cream-300 p-6 shadow-soft space-y-4">
        <div className="divide-y divide-cream-200">
          {events.length === 0 ? (
            <p className="text-xs text-gray-500 py-3">No events found.</p>
          ) : (
            events.map((evt) => {
              const docId = evt._id || evt.id;
              return (
                <div key={docId} className="py-3 text-xs space-y-1">
                  <div className="flex items-center justify-between gap-4">
                    <div>
                      {evt.images?.[0] && (
                        <img src={evt.images[0]} alt={evt.title?.en} className="mb-2 h-24 w-36 rounded-lg object-cover" />
                      )}
                      <span className="font-bold text-maroon-900 block">{evt.title?.hi} / {evt.title?.en}</span>
                      <p className="text-gray-600">{evt.date} • {evt.location}</p>
                    </div>
                    <DeleteCmsItemButton
                      collection="events"
                      docId={docId}
                      itemLabel={evt.title?.en || 'Event'}
                      onDeleted={fetchEvents}
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
