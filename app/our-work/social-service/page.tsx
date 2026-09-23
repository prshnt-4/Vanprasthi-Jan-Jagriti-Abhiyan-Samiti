'use client';

import React from 'react';
import Link from 'next/link';
import { useLanguage } from '@/components/layout/LanguageContext';
import { HeartHandshake, CheckCircle2 } from 'lucide-react';

export default function SocialServicePage() {
  const { lang, dict } = useLanguage();

  return (
    <div className="space-y-16 py-12">
      <section className="bg-gradient-to-r from-forest-800 via-forest-700 to-forest-800 text-cream-100 py-16 border-b-4 border-saffron-600">
        <div className="max-w-7xl mx-auto px-4 text-center space-y-4">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-forest-950 text-saffron-400 text-xs font-semibold border border-forest-600">
            <HeartHandshake className="w-4 h-4" />
            <span>उद्देश्य 4</span>
          </div>
          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold font-serif text-cream-50">
            🤝 {dict.pillars.assistanceTitle}
          </h1>
          <p className="text-sm sm:text-base text-cream-200 max-w-3xl mx-auto leading-relaxed">
            {lang === 'hi'
              ? 'वंचित एवं अभावग्रस्त वर्ग की सहायता तथा जन-कल्याणकारी योजनाओं का लाभ जनता तक पहुंचाना।'
              : 'Community assistance for disadvantaged families and guidance regarding official welfare schemes.'}
          </p>
        </div>
      </section>

      <section className="max-w-5xl mx-auto px-4 space-y-8">
        <div className="p-8 sm:p-12 rounded-3xl bg-white border border-cream-300 shadow-soft space-y-6">
          <h2 className="text-2xl font-serif font-bold text-forest-800 border-b border-cream-300 pb-4">
            {lang === 'hi' ? 'सहायता सेवा के प्रमुख कार्य' : 'Social Service & Scheme Guidance'}
          </h2>

          <div className="space-y-4 text-xs sm:text-sm text-gray-700 leading-relaxed">
            <div className="flex items-start gap-3 p-4 rounded-xl bg-cream-50 border border-cream-200">
              <CheckCircle2 className="w-5 h-5 text-forest-700 shrink-0 mt-0.5" />
              <div>
                <span className="font-bold text-forest-800 block">सरकारी व गैर-सरकारी योजनाओं की जानकारी</span>
                <span>जो सरकारी एवं गैर-सरकारी योजनाएं जनता के लिए बनाई जाती हैं, समिति जनता को उनके बारे में जागरूक कर धरातल पर मापदंडों के अनुसार कराने का प्रयास करती है।</span>
              </div>
            </div>

            <div className="flex items-start gap-3 p-4 rounded-xl bg-cream-50 border border-cream-200">
              <CheckCircle2 className="w-5 h-5 text-forest-700 shrink-0 mt-0.5" />
              <div>
                <span className="font-bold text-forest-800 block">वंचित व अभावग्रस्त वर्ग की सहायता</span>
                <span>जरूरतमंद, बेसहारा व अभावग्रस्त वर्ग के परिवारों को राशन, गर्म कपड़े व मूलभूत सहायता उपलब्ध कराना।</span>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
