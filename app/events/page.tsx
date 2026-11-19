'use client';

import React, { useState, useEffect } from 'react';
import { useLanguage } from '@/components/layout/LanguageContext';
import { Sun, Calendar, Clock, MapPin } from 'lucide-react';
import { getEvents } from '@/lib/firestoreService';

export default function EventsPage() {
  const { lang, dict } = useLanguage();
  const [events, setEvents] = useState<any[]>([]);

  useEffect(() => {
    getEvents()
      .then((data) => {
        if (Array.isArray(data)) setEvents(data);
      })
      .catch((err) => console.error(err));
  }, []);

  const sampleEvents = [
    {
      _id: 'e1',
      title: {
        en: 'Annual Swachhata & Social Awareness Seminar',
        hi: 'वार्षिक स्वच्छता एवं सामाजिक शिक्षा विचार गोष्ठी',
      },
      description: {
        en: 'Senior citizens and volunteers gather to plan neighborhood cleanliness drives and Anti-Corruption awareness.',
        hi: 'वानप्रस्थी नागरिक व स्वयंसेवक स्वच्छता अभियान व सामाजिक कुरीतियों के उन्मूलन हेतु विचार विमर्श करेंगे।',
      },
      date: '15 October 2026',
      time: '10:00 AM - 01:00 PM',
      location: 'HQ Sheelanchal, 19 Bhagirath Kunj, Roorkee',
      category: 'Social Awareness',
      status: 'upcoming',
    },
    {
      _id: 'e2',
      title: {
        en: 'Community Awareness & Cleanliness Seminar',
        hi: 'सामुदायिक जागरूकता एवं स्वच्छता संगोष्ठी',
      },
      description: {
        en: 'Volunteer-led sessions on cleanliness, civic responsibility, and community participation.',
        hi: 'स्वच्छता, नागरिक कर्तव्य और सामुदायिक सहभागिता पर स्वयंसेवक-प्रेरित परिचर्चा।',
      },
      date: '25 November 2026',
      time: '11:00 AM - 03:00 PM',
      location: 'Roorkee, Uttarakhand',
      category: 'Community Awareness',
      status: 'upcoming',
    },
  ];

  const displayEvents = events.length > 0 ? events : sampleEvents;

  return (
    <div className="space-y-16 py-12">
      <section className="bg-gradient-to-r from-maroon-900 via-maroon-800 to-maroon-900 text-cream-100 py-16 border-b-4 border-saffron-600">
        <div className="max-w-7xl mx-auto px-4 text-center space-y-4">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-maroon-950 text-saffron-400 text-xs font-semibold border border-maroon-700">
            <Sun className="w-4 h-4" />
            <span>{dict.nav.events}</span>
          </div>
          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold font-serif text-cream-50">
            {lang === 'hi' ? 'आगामी व विगत सामाजिक कार्यक्रम' : 'Upcoming & Past Events'}
          </h1>
          <p className="text-sm sm:text-base text-cream-200 max-w-3xl mx-auto leading-relaxed">
            {lang === 'hi'
              ? 'संस्था द्वारा आयोजित स्वच्छता संगोष्ठी, सामाजिक शिक्षा कार्यक्रम और जनजागृति बैठकें।'
              : 'Participate in our social awareness seminars, community outreach sessions, and cleanliness rallies.'}
          </p>
        </div>
      </section>

      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {displayEvents.map((evt) => {
            const eventId = evt._id || evt.id;
            const titleText = (lang === 'hi' ? evt.title?.hi : evt.title?.en) || evt.title?.hi || evt.title?.en || 'Event';
            const descText = (lang === 'hi' ? evt.description?.hi : evt.description?.en) || evt.description?.hi || evt.description?.en || '';
            const eventImage = Array.isArray(evt.images) && evt.images[0] ? evt.images[0] : (evt.imageUrl || '');

            return (
              <div
                key={eventId}
                className="p-6 sm:p-8 rounded-3xl bg-white border border-cream-300 shadow-soft hover:shadow-card transition-all space-y-4 flex flex-col justify-between"
              >
                <div className="space-y-4">
                  {eventImage && (
                    <img
                      src={eventImage}
                      alt={titleText}
                      className="aspect-video w-full rounded-2xl object-cover"
                    />
                  )}
                  <div className="flex items-center justify-between text-xs">
                    <span className="px-3 py-1 rounded-full bg-maroon-100 text-maroon-800 font-bold">
                      {evt.category || 'General'}
                    </span>
                    <span className="px-2.5 py-0.5 rounded-full bg-forest-50 text-forest-700 font-semibold uppercase text-[10px]">
                      {evt.status || 'upcoming'}
                    </span>
                  </div>

                  <h2 className="text-xl sm:text-2xl font-serif font-bold text-maroon-900 leading-snug">
                    {titleText}
                  </h2>

                  {descText && (
                    <p className="text-xs sm:text-sm text-gray-600 leading-relaxed">
                      {descText}
                    </p>
                  )}

                  <div className="space-y-2 text-xs text-gray-700 bg-cream-50 p-4 rounded-xl border border-cream-200">
                    <div className="flex items-center gap-2">
                      <Calendar className="w-4 h-4 text-saffron-600 shrink-0" />
                      <span>{evt.date || 'TBD'}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Clock className="w-4 h-4 text-saffron-600 shrink-0" />
                      <span>{evt.time || '10:00 AM'}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <MapPin className="w-4 h-4 text-maroon-800 shrink-0" />
                      <span>{evt.location || 'Roorkee, Uttarakhand'}</span>
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </section>
    </div>
  );
}
