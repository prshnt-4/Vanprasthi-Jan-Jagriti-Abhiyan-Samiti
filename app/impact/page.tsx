'use client';

import React, { useState, useEffect } from 'react';
import { useLanguage } from '@/components/layout/LanguageContext';
import { Sun, GraduationCap, Users, Sparkles, HeartHandshake, ShieldCheck } from 'lucide-react';

export default function ImpactPage() {
  const { lang, dict } = useLanguage();
  const [metrics, setMetrics] = useState<any[]>([]);

  useEffect(() => {
    fetch('/api/impact')
      .then((res) => res.json())
      .then((data) => {
        if (Array.isArray(data)) setMetrics(data);
      })
      .catch((err) => console.error(err));
  }, []);

  const defaultMetrics = [
    {
      metricId: '1',
      label: { hi: 'सामाजिक सहभागी', en: 'Community Participants' },
      value: '—',
      description: { hi: 'सामाजिक सेवा में सक्रिय लोग', en: 'Citizens engaged in community service' },
    },
    {
      metricId: '2',
      label: { hi: 'सक्रिय स्वयंसेवक', en: 'Active Senior Volunteers' },
      value: '—',
      description: { hi: 'निस्वार्थ सेवा में समर्पित नागरिक', en: 'Citizens dedicated to community service' },
    },
    {
      metricId: '3',
      label: { hi: 'स्वच्छता अभियान', en: 'Cleanliness Drives' },
      value: '—',
      description: { hi: 'सफाई व स्वास्थ्य जागरूकता', en: 'Sanitation and hygiene drives' },
    },
    {
      metricId: '4',
      label: { hi: 'योजना लाभांवित', en: 'Welfare Scheme Guidance' },
      value: '—',
      description: { hi: 'सरकारी योजनाओं का मार्गदर्शन', en: 'Assisting families in accessing welfare' },
    },
  ];

  const displayMetrics = metrics.length > 0 ? metrics : defaultMetrics;

  return (
    <div className="space-y-16 py-12">
      <section className="bg-gradient-to-r from-maroon-900 via-maroon-800 to-maroon-900 text-cream-100 py-16 border-b-4 border-saffron-600">
        <div className="max-w-7xl mx-auto px-4 text-center space-y-4">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-maroon-950 text-saffron-400 text-xs font-semibold border border-maroon-700">
            <Sun className="w-4 h-4" />
            <span>{dict.nav.impact}</span>
          </div>
          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold font-serif text-cream-50">
            {lang === 'hi' ? 'संस्था का सामाजिक प्रभाव' : 'Verified Organizational Impact'}
          </h1>
          <p className="text-sm sm:text-base text-cream-200 max-w-3xl mx-auto leading-relaxed">
            {lang === 'hi'
              ? 'बिना किसी काल्पनिक आंकड़ों के, संस्था द्वारा निष्पादित प्रामाणिक सामाजिक प्रभाव।'
              : 'Empirically managed impact metrics updated via our administrative system.'}
          </p>
        </div>
      </section>

      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {displayMetrics.map((m) => (
            <div
              key={m.metricId || m._id}
              className="p-8 rounded-3xl bg-white border border-cream-300 shadow-soft text-center space-y-3"
            >
              <div className="text-4xl font-bold font-serif text-maroon-900">{m.value}</div>
              <h3 className="text-base font-bold text-gray-800">
                {lang === 'hi' ? m.label.hi : m.label.en}
              </h3>
              <p className="text-xs text-gray-500">
                {lang === 'hi' ? m.description.hi : m.description.en}
              </p>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}
