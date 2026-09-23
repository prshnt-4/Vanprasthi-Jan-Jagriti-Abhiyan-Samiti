'use client';

import React from 'react';
import Link from 'next/link';
import { useLanguage } from '@/components/layout/LanguageContext';
import { BookOpen, CheckCircle2 } from 'lucide-react';

export default function SocialEducationPage() {
  const { lang, dict } = useLanguage();

  return (
    <div className="space-y-16 py-12">
      <section className="bg-gradient-to-r from-forest-800 via-forest-700 to-forest-800 text-cream-100 py-16 border-b-4 border-saffron-600">
        <div className="max-w-7xl mx-auto px-4 text-center space-y-4">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-forest-950 text-saffron-400 text-xs font-semibold border border-forest-600">
            <BookOpen className="w-4 h-4" />
            <span>उद्देश्य 2</span>
          </div>
          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold font-serif text-cream-50">
            📚 {dict.pillars.socialEduTitle}
          </h1>
          <p className="text-sm sm:text-base text-cream-200 max-w-3xl mx-auto leading-relaxed">
            {lang === 'hi'
              ? 'सामाजिक शिक्षा के माध्यम से देश के लिए अच्छा सोचना, अच्छा बोलना और केवल अच्छा कार्य करने हेतु जनता को जागरूक करना।'
              : 'Promoting moral values, communal harmony, elder respect, and encouraging education for all children.'}
          </p>
        </div>
      </section>

      <section className="max-w-5xl mx-auto px-4 space-y-8">
        <div className="p-8 sm:p-12 rounded-3xl bg-white border border-cream-300 shadow-soft space-y-6">
          <h2 className="text-2xl font-serif font-bold text-forest-800 border-b border-cream-300 pb-4">
            {lang === 'hi' ? 'सामाजिक शिक्षा के प्रमुख कार्य बिंदु (दस्तावेज अनुसार)' : 'Key Focus Areas from NGO Brochure'}
          </h2>

          <div className="space-y-4 text-xs sm:text-sm text-gray-700 leading-relaxed">
            <div className="flex items-start gap-3 p-4 rounded-xl bg-cream-50 border border-cream-200">
              <CheckCircle2 className="w-5 h-5 text-saffron-600 shrink-0 mt-0.5" />
              <div>
                <span className="font-bold text-forest-800 block">(अ) सकारात्मक विचार व आचरण</span>
                <span>सकारात्मक सोच, मधुर वाणी व केवल समाजहित कार्य करने हेतु नागरिकों को जागरूक करना।</span>
              </div>
            </div>

            <div className="flex items-start gap-3 p-4 rounded-xl bg-cream-50 border border-cream-200">
              <CheckCircle2 className="w-5 h-5 text-saffron-600 shrink-0 mt-0.5" />
              <div>
                <span className="font-bold text-forest-800 block">(ब) बुजुर्गों का सम्मान व युवा संस्कार</span>
                <span>माता-पिता व बड़ों का सम्मान, छोटों से प्यार, धैर्य व सहनशीलता धारण करने की शिक्षा युवा वर्ग को देना।</span>
              </div>
            </div>

            <div className="flex items-start gap-3 p-4 rounded-xl bg-cream-50 border border-cream-200">
              <CheckCircle2 className="w-5 h-5 text-saffron-600 shrink-0 mt-0.5" />
              <div>
                <span className="font-bold text-forest-800 block">(स) सांप्रदायिक सौहार्द</span>
                <span>"हिन्दू-मुस्लिम-सिख-ईसाई आपस में हैं भाई भाई" के भाव को समाज के सभी सम्प्रदायों में सुदृढ़ करना।</span>
              </div>
            </div>

            <div className="flex items-start gap-3 p-4 rounded-xl bg-cream-50 border border-cream-200">
              <CheckCircle2 className="w-5 h-5 text-saffron-600 shrink-0 mt-0.5" />
              <div>
                <span className="font-bold text-forest-800 block">(द) वंचित बच्चों को स्कूल भेजने का प्रयास</span>
                <span>भिखारी, बाल मजदूर एवं कूड़ा चुनने वाले बच्चों को स्कूल भेजने का निरंतर प्रयास करना।</span>
              </div>
            </div>

            <div className="flex items-start gap-3 p-4 rounded-xl bg-cream-50 border border-cream-200">
              <CheckCircle2 className="w-5 h-5 text-saffron-600 shrink-0 mt-0.5" />
              <div>
                <span className="font-bold text-forest-800 block">(ध) कुरीतियों व अंधविश्वास के विरुद्ध जागृति</span>
                <span>सामाजिक अंधविश्वास एवं कुरीतियों के विरुद्ध जनता को जागरूक करना और उन्हें समाप्त करने हेतु प्रेरित करना।</span>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
