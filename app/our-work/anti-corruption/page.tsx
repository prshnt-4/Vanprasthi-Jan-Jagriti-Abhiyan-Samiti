'use client';

import React from 'react';
import Link from 'next/link';
import { useLanguage } from '@/components/layout/LanguageContext';
import { ShieldCheck, CheckCircle2 } from 'lucide-react';

export default function AntiCorruptionPage() {
  const { lang, dict } = useLanguage();

  return (
    <div className="space-y-16 py-12">
      <section className="bg-gradient-to-r from-forest-800 via-forest-700 to-forest-800 text-cream-100 py-16 border-b-4 border-saffron-600">
        <div className="max-w-7xl mx-auto px-4 text-center space-y-4">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-forest-950 text-saffron-400 text-xs font-semibold border border-forest-600">
            <ShieldCheck className="w-4 h-4" />
            <span>उद्देश्य 3</span>
          </div>
          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold font-serif text-cream-50">
            ⚖️ {dict.pillars.antiCorruptionTitle}
          </h1>
          <p className="text-sm sm:text-base text-cream-200 max-w-3xl mx-auto leading-relaxed">
            {lang === 'hi'
              ? 'भ्रष्टाचार उन्मूलन हेतु जन-जागृति, पारदर्शी नागरिक कर्तव्यों की जानकारी एवं शोषण-मुक्त समाज का निर्माण।'
              : 'Promoting civic consciousness, legal literacy, and transparent public participation against corruption.'}
          </p>
        </div>
      </section>

      <section className="max-w-5xl mx-auto px-4 space-y-8">
        <div className="p-8 sm:p-12 rounded-3xl bg-white border border-cream-300 shadow-soft space-y-6">
          <h2 className="text-2xl font-serif font-bold text-forest-800 border-b border-cream-300 pb-4">
            {lang === 'hi' ? 'भ्रष्टाचार उन्मूलन एवं नागरिक अधिकार' : 'Civic Awareness & Anti-Corruption Work'}
          </h2>

          <div className="space-y-4 text-xs sm:text-sm text-gray-700 leading-relaxed">
            <div className="flex items-start gap-3 p-4 rounded-xl bg-cream-50 border border-cream-200">
              <CheckCircle2 className="w-5 h-5 text-maroon-800 shrink-0 mt-0.5" />
              <div>
                <span className="font-bold text-forest-800 block">नागरिक अधिकार व कर्तव्य जागरूकता</span>
                <span>नागरिकों को उनके संवैधानिक अधिकारों, सूचना के अधिकार (RTI) व कर्तव्यों की जानकारी देना।</span>
              </div>
            </div>

            <div className="flex items-start gap-3 p-4 rounded-xl bg-cream-50 border border-cream-200">
              <CheckCircle2 className="w-5 h-5 text-maroon-800 shrink-0 mt-0.5" />
              <div>
                <span className="font-bold text-forest-800 block">पारदर्शी जन-सहभागिता</span>
                <span>सरकारी व गैर-सरकारी तंत्र में शुचिता व पारदर्शिता बनाए रखने हेतु जन-जागृति अभियान।</span>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
