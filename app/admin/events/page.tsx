'use client';

import React, { useState, useEffect } from 'react';
import { Plus } from 'lucide-react';
import { ImageUploadField } from '@/components/admin/ImageUploadField';
import { getEvents, addEvent, EventItem } from '@/lib/firestoreService';

export default function AdminEventsPage() {
  const [events, setEvents] = useState<EventItem[]>([]);
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
      setEvents(data);
    } catch (err) {
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
      setError(err?.message || 'Failed to create event. Check Firestore rules & Firebase config.');
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
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          <div>
            <label className="block font-medium text-gray-700 mb-1">Date</label>
            <input
              type="text"
              placeholder="e.g. 15 Oct 2026"
              value={dateStr}
              onChange={(e) => setDateStr(e.target.value)}
              className="w-full px-3 py-2 rounded-xl border border-cream-300 bg-cream-50"
            />
          </div>
          <div>
            <label className="block font-medium text-gray-700 mb-1">Time</label>
            <input
              type="text"
              placeholder="e.g. 10:00 AM - 1:00 PM"
              value={timeStr}
              onChange={(e) => setTimeStr(e.target.value)}
              className="w-full px-3 py-2 rounded-xl border border-cream-300 bg-cream-50"
            />
          </div>
          <div>
            <label className="block font-medium text-gray-700 mb-1">Location</label>
            <input
              type="text"
              value={location}
              onChange={(e) => setLocation(e.target.value)}
              className="w-full px-3 py-2 rounded-xl border border-cream-300 bg-cream-50"
            />
          </div>
        </div>

        <div>
          <ImageUploadField value={imageUrl} onChange={setImageUrl} />
        </div>

        <button
          type="submit"
          disabled={loading}
          className="px-5 py-2.5 rounded-xl bg-saffron-600 text-white font-bold text-xs shadow flex items-center gap-1.5 disabled:opacity-50"
        >
          <Plus className="w-4 h-4" />
          <span>{loading ? 'Creating...' : 'Create Event'}</span>
        </button>
      </form>

      <div className="bg-white rounded-3xl border border-cream-300 p-6 shadow-soft space-y-4">
        <div className="divide-y divide-cream-200">
          {events.length === 0 ? (
            <p className="text-xs text-gray-500 py-3">No events found.</p>
          ) : (
            events.map((ev) => (
              <div key={ev._id || ev.id} className="py-3 flex justify-between items-center text-xs">
                <div>
                  <span className="font-bold text-maroon-900 block">{ev.title.hi} / {ev.title.en}</span>
                  <span className="text-gray-500">{ev.date} • {ev.location}</span>
                </div>
                <span className="px-2.5 py-1 rounded-full bg-cream-100 text-maroon-900 font-semibold text-[10px]">
                  {ev.status}
                </span>
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  );
}
