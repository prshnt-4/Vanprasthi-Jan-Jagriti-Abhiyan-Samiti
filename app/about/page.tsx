'use client';

import React from 'react';
import Link from 'next/link';
import { useLanguage } from '@/components/layout/LanguageContext';
import { Sun, ShieldCheck, Award, CheckCircle2 } from 'lucide-react';

export default function AboutPage() {
  const { lang, dict } = useLanguage();

  return (
    <div className="space-y-16 py-12">
      {/* Hero Header */}
      <section className="bg-gradient-to-r from-forest-800 via-forest-700 to-forest-800 text-cream-100 py-16 border-b-4 border-saffron-600">
        <div className="max-w-7xl mx-auto px-4 text-center space-y-4">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-forest-950 text-saffron-400 text-xs font-semibold border border-forest-600">
            <Sun className="w-4 h-4" />
            <span>Reg. No. 052/2016-2017 | Dated 06.06.2016</span>
          </div>
          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold font-serif text-cream-50">
            {dict.about.title}
          </h1>
          <p className="text-sm sm:text-base text-cream-200 max-w-3xl mx-auto leading-relaxed">
            {dict.orgName}
          </p>
        </div>
      </section>

      {/* Main Story & Ashrama Philosophy */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
        <div className="p-8 sm:p-12 rounded-3xl bg-cream-100 border border-cream-300 shadow-soft space-y-6">
          <h2 className="text-2xl sm:text-3xl font-serif font-bold text-forest-800 border-b border-cream-300 pb-4">
            {dict.about.ashramaTitle}
          </h2>

          <div className="prose prose-forest max-w-none text-xs sm:text-sm text-gray-700 leading-relaxed space-y-4">
            <p>{dict.about.ashramaDesc}</p>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 pt-2">
              <div className="p-4 rounded-xl bg-white border border-cream-300 shadow-sm space-y-2">
                <span className="text-xs font-bold text-saffron-600 uppercase">1. ब्रह्मचर्य आश्रम (0-25 वर्ष)</span>
                <p className="text-xs text-gray-600">विद्या व ज्ञान प्राप्त कर पालन पोषण का आधार।</p>
              </div>
              <div className="p-4 rounded-xl bg-white border border-cream-300 shadow-sm space-y-2">
                <span className="text-xs font-bold text-forest-700 uppercase">2. गृहस्थ जीवन (26-50 वर्ष)</span>
                <p className="text-xs text-gray-600">परिवार व गृहस्थी स्थापित कर समाज ऋण स्वीकारना।</p>
              </div>
              <div className="p-4 rounded-xl bg-white border border-cream-300 shadow-sm space-y-2">
                <span className="text-xs font-bold text-saffron-600 uppercase">3. वानप्रस्थ आश्रम (51-75 वर्ष)</span>
                <p className="text-xs text-gray-600">ज्ञान व 50 वर्ष के अनुभव से समाज को निस्वार्थ सेवा देकर ऋण से मुक्ति।</p>
              </div>
              <div className="p-4 rounded-xl bg-white border border-cream-300 shadow-sm space-y-2">
                <span className="text-xs font-bold text-maroon-800 uppercase">4. सन्यास आश्रम (76-100 वर्ष)</span>
                <p className="text-xs text-gray-600">आत्म उन्नति एवं समाज का मार्गदर्शक बनकर जीवन यापन।</p>
              </div>
            </div>
          </div>
        </div>

        {/* 4 Objectives Section */}
        <div className="p-8 sm:p-12 rounded-3xl bg-white border border-cream-300 shadow-soft space-y-6">
          <h3 className="text-2xl font-serif font-bold text-forest-800 border-b border-cream-300 pb-4">
            {dict.about.coreObjectives}
          </h3>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 text-xs sm:text-sm text-gray-700">
            <div className="flex items-start gap-3 p-4 rounded-xl bg-cream-50 border border-cream-200">
              <CheckCircle2 className="w-5 h-5 text-saffron-600 shrink-0 mt-0.5" />
              <div>
                <span className="font-bold text-forest-800 block">1. 🧹 स्वच्छता अभियान</span>
                <span>गली-मोहल्लों में स्वच्छता जनजागृति व सफाई अभियान।</span>
              </div>
            </div>

            <div className="flex items-start gap-3 p-4 rounded-xl bg-cream-50 border border-cream-200">
              <CheckCircle2 className="w-5 h-5 text-saffron-600 shrink-0 mt-0.5" />
              <div>
                <span className="font-bold text-forest-800 block">2. 📚 सामाजिक शिक्षा अभियान</span>
                <span>बुजुर्गों का सम्मान, सांप्रदायिक सौहार्द, वंचित बच्चों की शिक्षा।</span>
              </div>
            </div>

            <div className="flex items-start gap-3 p-4 rounded-xl bg-cream-50 border border-cream-200">
              <CheckCircle2 className="w-5 h-5 text-saffron-600 shrink-0 mt-0.5" />
              <div>
                <span className="font-bold text-forest-800 block">3. ⚖️ भ्रष्टाचार निवारण अभियान</span>
                <span>नागरिक अधिकारों की जानकारी एवं पारदर्शी व्यवस्था।</span>
              </div>
            </div>

            <div className="flex items-start gap-3 p-4 rounded-xl bg-cream-50 border border-cream-200">
              <CheckCircle2 className="w-5 h-5 text-saffron-600 shrink-0 mt-0.5" />
              <div>
                <span className="font-bold text-forest-800 block">4. 🤝 सहायता सेवा अभियान</span>
                <span>सरकारी व गैर-सरकारी जन-कल्याणकारी योजनाओं की जानकारी व सहायता।</span>
              </div>
            </div>
          </div>
        </div>

        {/* Governance Info */}
        <div className="p-8 rounded-3xl bg-forest-950 text-cream-100 border border-forest-800 space-y-6">
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 border-b border-forest-800 pb-4">
            <h3 className="text-xl font-serif font-bold text-saffron-400">
              {lang === 'hi' ? 'संस्था प्रशासनिक विवरण' : 'Official Registered Details'}
            </h3>
            <span className="text-xs text-cream-300 bg-forest-900 px-3 py-1 rounded-full border border-forest-700">
              Reg. No. 052/2016-2017
            </span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 text-xs text-cream-200">
            <div>
              <span className="text-saffron-400 font-bold block mb-1">अध्यक्ष (President):</span>
              <span className="font-semibold text-white">{dict.president}</span>
            </div>
            <div>
              <span className="text-saffron-400 font-bold block mb-1">पंजीकरण तिथि:</span>
              <span className="font-semibold text-white">06 जून 2016 (06.06.2016)</span>
            </div>
            <div>
              <span className="text-saffron-400 font-bold block mb-1">मुख्यालय पता:</span>
              <span className="font-semibold text-white">{dict.address}</span>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
