'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { useLanguage } from '@/components/layout/LanguageContext';
import { Sun, Calendar, Clock, MapPin, Users, CheckCircle2, Heart } from 'lucide-react';

export default function EventsPage() {
  const { lang, dict } = useLanguage();
  const [events, setEvents] = useState<any[]>([]);
  const [selectedEvent, setSelectedEvent] = useState<any>(null);
  const [regName, setRegName] = useState('');
  const [regEmail, setRegEmail] = useState('');
  const [regPhone, setRegPhone] = useState('');
  const [regVolunteering, setRegVolunteering] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  useEffect(() => {
    fetch('/api/events')
      .then((res) => res.json())
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

  const handleRegister = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedEvent) return;
    try {
      const res = await fetch('/api/events/register', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          eventId: selectedEvent._id,
          eventTitle: selectedEvent.title.hi || selectedEvent.title.en,
          name: regName,
          email: regEmail,
          phone: regPhone,
          volunteeringInterest: regVolunteering,
        }),
      });
      if (res.ok) {
        setSubmitted(true);
      }
    } catch (err) {
      console.error(err);
    }
  };

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
          {displayEvents.map((evt) => (
            <div
              key={evt._id}
              className="p-6 sm:p-8 rounded-3xl bg-white border border-cream-300 shadow-soft hover:shadow-card transition-all space-y-4 flex flex-col justify-between"
            >
              <div className="space-y-4">
                <div className="flex items-center justify-between text-xs">
                  <span className="px-3 py-1 rounded-full bg-maroon-100 text-maroon-800 font-bold">
                    {evt.category}
                  </span>
                  <span className="px-2.5 py-0.5 rounded-full bg-forest-50 text-forest-700 font-semibold uppercase text-[10px]">
                    {evt.status}
                  </span>
                </div>

                <h2 className="text-xl sm:text-2xl font-serif font-bold text-maroon-900 leading-snug">
                  {lang === 'hi' ? evt.title.hi : evt.title.en}
                </h2>

                <p className="text-xs sm:text-sm text-gray-600 leading-relaxed">
                  {lang === 'hi' ? evt.description.hi : evt.description.en}
                </p>

                <div className="space-y-2 text-xs text-gray-700 bg-cream-50 p-4 rounded-xl border border-cream-200">
                  <div className="flex items-center gap-2">
                    <Calendar className="w-4 h-4 text-saffron-600 shrink-0" />
                    <span>{evt.date}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Clock className="w-4 h-4 text-saffron-600 shrink-0" />
                    <span>{evt.time}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <MapPin className="w-4 h-4 text-maroon-800 shrink-0" />
                    <span>{evt.location}</span>
                  </div>
                </div>
              </div>

              <div className="pt-4 border-t border-cream-200">
                <button
                  onClick={() => {
                    setSelectedEvent(evt);
                    setSubmitted(false);
                  }}
                  className="w-full py-3 rounded-xl bg-saffron-600 hover:bg-saffron-700 text-white font-bold text-xs sm:text-sm shadow transition-colors"
                >
                  {lang === 'hi' ? 'कार्यक्रम में भाग लें / पंजीकरण' : 'Register for Event'}
                </button>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Registration Modal */}
      {selectedEvent && (
        <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-white rounded-3xl p-6 sm:p-8 max-w-md w-full shadow-2xl border border-cream-300 relative space-y-6">
            <button
              onClick={() => setSelectedEvent(null)}
              className="absolute top-4 right-4 text-gray-400 hover:text-gray-600 font-bold"
            >
              ✕
            </button>

            {submitted ? (
              <div className="text-center space-y-4 py-4">
                <CheckCircle2 className="w-12 h-12 text-forest-700 mx-auto" />
                <h3 className="text-xl font-serif font-bold text-maroon-900">
                  {lang === 'hi' ? 'पंजीकरण सफल!' : 'Registration Successful!'}
                </h3>
                <p className="text-xs text-gray-600">
                  {lang === 'hi' ? 'कार्यक्रम में आपकी उपस्थिति हेतु धन्यवाद।' : 'Thank you for registering.'}
                </p>
                <button
                  onClick={() => setSelectedEvent(null)}
                  className="px-6 py-2 rounded-full bg-maroon-800 text-white text-xs font-bold"
                >
                  Close
                </button>
              </div>
            ) : (
              <form onSubmit={handleRegister} className="space-y-4">
                <h3 className="text-xl font-serif font-bold text-maroon-900">
                  {lang === 'hi' ? 'कार्यक्रम पंजीकरण' : 'Event Registration'}
                </h3>
                <p className="text-xs text-saffron-700 font-semibold">
                  {lang === 'hi' ? selectedEvent.title.hi : selectedEvent.title.en}
                </p>

                <div className="space-y-3 text-xs">
                  <div>
                    <label className="block font-medium text-gray-700 mb-1">{dict.volunteer.name} *</label>
                    <input
                      type="text"
                      required
                      value={regName}
                      onChange={(e) => setRegName(e.target.value)}
                      className="w-full px-3 py-2 rounded-lg border border-cream-300 bg-cream-50"
                    />
                  </div>
                  <div>
                    <label className="block font-medium text-gray-700 mb-1">{dict.volunteer.email} *</label>
                    <input
                      type="email"
                      required
                      value={regEmail}
                      onChange={(e) => setRegEmail(e.target.value)}
                      className="w-full px-3 py-2 rounded-lg border border-cream-300 bg-cream-50"
                    />
                  </div>
                  <div>
                    <label className="block font-medium text-gray-700 mb-1">{dict.volunteer.phone} *</label>
                    <input
                      type="tel"
                      required
                      value={regPhone}
                      onChange={(e) => setRegPhone(e.target.value)}
                      className="w-full px-3 py-2 rounded-lg border border-cream-300 bg-cream-50"
                    />
                  </div>
                  <div className="flex items-center gap-2">
                    <input
                      type="checkbox"
                      id="vol"
                      checked={regVolunteering}
                      onChange={(e) => setRegVolunteering(e.target.checked)}
                    />
                    <label htmlFor="vol" className="text-xs text-gray-700">
                      {lang === 'hi' ? 'कार्यक्रम में स्वयंसेवक के रूप में मदद करना चाहते हैं' : 'Interested in volunteering during event'}
                    </label>
                  </div>
                </div>

                <button
                  type="submit"
                  className="w-full py-3 rounded-full bg-saffron-600 hover:bg-saffron-700 text-white font-bold text-xs shadow"
                >
                  {lang === 'hi' ? 'जमा करें' : 'Confirm Registration'}
                </button>
              </form>
            )}
          </div>
        </div>
      )}
    </div>
  );
}
