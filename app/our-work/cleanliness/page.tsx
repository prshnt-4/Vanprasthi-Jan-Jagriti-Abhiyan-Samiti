'use client';

import React from 'react';
import Link from 'next/link';
import { useLanguage } from '@/components/layout/LanguageContext';
import { Sparkles, CheckCircle2, ArrowRight } from 'lucide-react';

export default function CleanlinessPage() {
  const { lang, dict } = useLanguage();

  return (
    <div className="space-y-16 py-12">
      <section className="bg-gradient-to-r from-forest-800 via-forest-700 to-forest-800 text-cream-100 py-16 border-b-4 border-saffron-600">
        <div className="max-w-7xl mx-auto px-4 text-center space-y-4">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-forest-950 text-saffron-400 text-xs font-semibold border border-forest-600">
            <Sparkles className="w-4 h-4" />
            <span>उद्देश्य 1</span>
          </div>
          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold font-serif text-cream-50">
            🧹 {dict.pillars.cleanlinessTitle}
          </h1>
          <p className="text-sm sm:text-base text-cream-200 max-w-3xl mx-auto leading-relaxed">
            {lang === 'hi'
              ? 'भारत स्वच्छता अभियान — स्वच्छ और स्वस्थ भारत के निर्माण हेतु जन-जागृति।'
              : 'Swachhata Abhiyan — Community mobilization for a clean and healthy nation.'}
          </p>
        </div>
      </section>

      <section className="max-w-5xl mx-auto px-4 space-y-8">
        <div className="p-8 sm:p-12 rounded-3xl bg-white border border-cream-300 shadow-soft space-y-6">
          <h2 className="text-2xl font-serif font-bold text-forest-800 border-b border-cream-300 pb-4">
            {lang === 'hi' ? 'सफाई एवं जन-सहभागिता गतिविधियां' : 'Cleanliness Awareness Activities'}
          </h2>

          <div className="space-y-4 text-xs sm:text-sm text-gray-700 leading-relaxed">
            <div className="flex items-start gap-3 p-4 rounded-xl bg-cream-50 border border-cream-200">
              <CheckCircle2 className="w-5 h-5 text-forest-700 shrink-0 mt-0.5" />
              <div>
                <span className="font-bold text-forest-800 block">गली-मोहल्ला स्वच्छता अभियान</span>
                <span>रुड़की शहर एवं ग्रामीण क्षेत्रों के विभिन्न वार्डों में नियमित सफाई अभियान का आयोजन।</span>
              </div>
            </div>

            <div className="flex items-start gap-3 p-4 rounded-xl bg-cream-50 border border-cream-200">
              <CheckCircle2 className="w-5 h-5 text-forest-700 shrink-0 mt-0.5" />
              <div>
                <span className="font-bold text-forest-800 block">कचरा निस्तारण व डस्टबिन जागरूकता</span>
                <span>नागरिकों को सूखा व गीला कचरा अलग करने तथा सार्वजनिक स्वच्छता बनाए रखने के प्रति प्रेरित करना।</span>
              </div>
            </div>

            <div className="flex items-start gap-3 p-4 rounded-xl bg-cream-50 border border-cream-200">
              <CheckCircle2 className="w-5 h-5 text-forest-700 shrink-0 mt-0.5" />
              <div>
                <span className="font-bold text-forest-800 block">स्वास्थ्य व स्वच्छता कार्यशालाएं</span>
                <span>संक्रामक बीमारियों से बचाव एवं व्यक्तिगत स्वच्छता पर जागरूकता संगोष्ठी।</span>
              </div>
            </div>
          </div>

          <div className="pt-4 flex flex-wrap gap-4">
            <Link
              href="/volunteer"
              className="px-6 py-3 rounded-full bg-saffron-600 hover:bg-saffron-700 text-white font-bold text-xs shadow"
            >
              {lang === 'hi' ? 'स्वच्छता अभियान से जुड़ें' : 'Join Cleanliness Drive'}
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
