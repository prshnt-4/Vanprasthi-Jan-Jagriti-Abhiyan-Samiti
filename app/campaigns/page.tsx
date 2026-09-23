'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { useLanguage } from '@/components/layout/LanguageContext';
import { Sun, Heart, Users, MapPin, Calendar, ArrowRight } from 'lucide-react';

export default function CampaignsPage() {
  const { lang, dict } = useLanguage();
  const [campaigns, setCampaigns] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch('/api/campaigns')
      .then((res) => res.json())
      .then((data) => {
        if (Array.isArray(data)) setCampaigns(data);
      })
      .catch((err) => console.error(err))
      .finally(() => setLoading(false));
  }, []);

  const sampleCampaigns = [
    {
      _id: 'c1',
      title: {
        en: 'Swachhata Awareness Drive — Roorkee Neighborhoods',
        hi: 'भारत स्वच्छता जनजागृति अभियान — रुड़की नगर क्षेत्र',
      },
      description: {
        en: 'Community cleanup drives, waste segregation guidance, and health sanitation workshops organized by senior volunteers.',
        hi: 'वरिष्ठ समाजसेवियों व स्वयंसेवकों द्वारा नगर सफाई, कचरा प्रबंधन व स्वास्थ्य जागरूकता अभियान।',
      },
      coverImage: '/images/hero-ngo.jpg',
      location: 'Roorkee, Uttarakhand',
      startDate: '2026-04-01',
      category: 'Swachhata Abhiyan',
    },
    {
      _id: 'c2',
      title: {
        en: 'Community Education & Civic Awareness Drive',
        hi: 'सामाजिक शिक्षा एवं नागरिक जागरूकता अभियान',
      },
      description: {
        en: 'Awareness sessions on public hygiene, right conduct, and responsible citizenship for local communities.',
        hi: 'स्थानीय समुदायों में स्वच्छता, सामाजिक व्यवहार और उत्तरदायी नागरिकता पर जागरूकता सत्र।',
      },
      coverImage: '/images/hero-ngo.jpg',
      location: 'Roorkee, Uttarakhand',
      startDate: '2026-05-15',
      category: 'Social Education',
    },
  ];

  const displayCampaigns = campaigns.length > 0 ? campaigns : sampleCampaigns;

  return (
    <div className="space-y-16 py-12">
      <section className="bg-gradient-to-r from-maroon-900 via-maroon-800 to-maroon-900 text-cream-100 py-16 border-b-4 border-saffron-600">
        <div className="max-w-7xl mx-auto px-4 text-center space-y-4">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-maroon-950 text-saffron-400 text-xs font-semibold border border-maroon-700">
            <Sun className="w-4 h-4" />
            <span>{dict.nav.campaigns}</span>
          </div>
          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold font-serif text-cream-50">
            {lang === 'hi' ? 'संस्था के प्रमुख सामाजिक अभियान' : 'Active Social Campaigns'}
          </h1>
          <p className="text-sm sm:text-base text-cream-200 max-w-3xl mx-auto leading-relaxed">
            {lang === 'hi'
              ? 'स्वच्छता, सामाजिक शिक्षा, बालिका विकास व भ्रष्टाचार निवारण के लिए जारी हमारे अभियान।'
              : 'Empowering communities through active drives across Roorkee and Haridwar district.'}
          </p>
        </div>
      </section>

      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {displayCampaigns.map((camp) => (
            <div
              key={camp._id}
              className="p-6 sm:p-8 rounded-3xl bg-white border border-cream-300 shadow-soft hover:shadow-card transition-all space-y-6 flex flex-col justify-between"
            >
              <div className="space-y-4">
                <div className="flex items-center justify-between text-xs">
                  <span className="px-3 py-1 rounded-full bg-saffron-100 text-saffron-700 font-bold">
                    {camp.category}
                  </span>
                  <span className="flex items-center gap-1 text-gray-500">
                    <MapPin className="w-3.5 h-3.5 text-maroon-800" />
                    {camp.location}
                  </span>
                </div>

                <h2 className="text-xl sm:text-2xl font-serif font-bold text-maroon-900 leading-snug">
                  {lang === 'hi' ? camp.title.hi : camp.title.en}
                </h2>

                <p className="text-xs sm:text-sm text-gray-600 leading-relaxed">
                  {lang === 'hi' ? camp.description.hi : camp.description.en}
                </p>
              </div>

              <div className="pt-4 border-t border-cream-200 flex flex-wrap items-center justify-between gap-4">
                <Link
                  href="/donate"
                  className="px-5 py-2.5 rounded-full bg-saffron-600 hover:bg-saffron-700 text-white font-bold text-xs shadow flex items-center gap-1.5"
                >
                  <Heart className="w-3.5 h-3.5 fill-white" />
                  <span>{dict.hero.ctaDonate}</span>
                </Link>

                <Link
                  href="/volunteer"
                  className="px-5 py-2.5 rounded-full bg-maroon-800 hover:bg-maroon-900 text-white font-bold text-xs shadow flex items-center gap-1.5"
                >
                  <Users className="w-3.5 h-3.5 text-saffron-400" />
                  <span>{dict.hero.ctaJoin}</span>
                </Link>
              </div>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}
