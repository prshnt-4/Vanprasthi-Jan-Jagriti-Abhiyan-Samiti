'use client';

import React, { useState, useEffect } from 'react';
import { Plus, Calendar } from 'lucide-react';

export default function AdminEventsPage() {
  const [events, setEvents] = useState<any[]>([]);
  const [titleHi, setTitleHi] = useState('');
  const [titleEn, setTitleEn] = useState('');
  const [dateStr, setDateStr] = useState('');
  const [timeStr, setTimeStr] = useState('');
  const [location, setLocation] = useState('Roorkee, Uttarakhand');

  const fetchEvents = () => {
    fetch('/api/events')
      .then((res) => res.json())
      .then((data) => {
        if (Array.isArray(data)) setEvents(data);
      })
      .catch((err) => console.error(err));
  };

  useEffect(() => {
    fetchEvents();
  }, []);

  const handleAdd = async (e: React.FormEvent) => {
    e.preventDefault();
    await fetch('/api/events', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        title: { hi: titleHi, en: titleEn },
        description: { hi: titleHi, en: titleEn },
        date: dateStr || 'Upcoming Date',
        time: timeStr || '10:00 AM',
        location,
        category: 'Social Event',
        status: 'upcoming',
      }),
    });
    setTitleHi('');
    setTitleEn('');
    setDateStr('');
    fetchEvents();
  };

  return (
    <div className="space-y-6">
      <div className="bg-white p-6 rounded-3xl border border-cream-300 shadow-soft">
        <h1 className="text-2xl font-serif font-bold text-maroon-900">Events Management</h1>
        <p className="text-xs text-gray-500">Add upcoming seminars & view registrations</p>
      </div>

      <form onSubmit={handleAdd} className="p-6 rounded-3xl bg-white border border-cream-300 shadow-soft space-y-4 text-xs">
        <h3 className="font-serif font-bold text-sm text-maroon-900">Add New Event</h3>
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
        </div>

        <button
          type="submit"
          className="px-5 py-2.5 rounded-xl bg-saffron-600 text-white font-bold text-xs shadow flex items-center gap-1.5"
        >
          <Plus className="w-4 h-4" />
          <span>Save Event</span>
        </button>
      </form>

      <div className="bg-white rounded-3xl border border-cream-300 p-6 shadow-soft space-y-4">
        <div className="divide-y divide-cream-200">
          {events.map((evt) => (
            <div key={evt._id} className="py-3 text-xs space-y-1">
              <span className="font-bold text-maroon-900 block">{evt.title.hi} / {evt.title.en}</span>
              <p className="text-gray-600">{evt.date} • {evt.location}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
