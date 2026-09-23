'use client';

import React from 'react';
import Link from 'next/link';
import { useLanguage } from '@/components/layout/LanguageContext';
import { Sun, ShieldCheck, HeartHandshake, BookOpen, Sparkles } from 'lucide-react';

export default function MissionPage() {
  const { lang, dict } = useLanguage();

  return (
    <div className="space-y-16 py-12">
      <section className="bg-gradient-to-r from-forest-800 via-forest-700 to-forest-800 text-cream-100 py-16 border-b-4 border-saffron-600">
        <div className="max-w-7xl mx-auto px-4 text-center space-y-4">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-forest-950 text-saffron-400 text-xs font-semibold border border-forest-600">
            <Sun className="w-4 h-4" />
            <span>{dict.nav.mission}</span>
          </div>
          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold font-serif text-cream-50">
            {dict.about.missionTitle}
          </h1>
          <p className="text-sm sm:text-base text-cream-200 max-w-3xl mx-auto leading-relaxed">
            {dict.about.missionDesc}
          </p>
        </div>
      </section>

      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <div className="p-8 rounded-3xl bg-forest-900 text-cream-100 space-y-4 shadow-lg border border-forest-800">
            <h3 className="text-2xl font-serif font-bold text-saffron-400">
              {dict.about.missionTitle}
            </h3>
            <p className="text-xs sm:text-sm text-cream-200 leading-relaxed">
              {dict.about.missionDesc}
            </p>
          </div>

          <div className="p-8 rounded-3xl bg-saffron-600 text-white space-y-4 shadow-lg">
            <h3 className="text-2xl font-serif font-bold">
              {dict.about.visionTitle}
            </h3>
            <p className="text-xs sm:text-sm text-saffron-100 leading-relaxed">
              {dict.about.visionDesc}
            </p>
          </div>
        </div>
      </section>
    </div>
  );
}
