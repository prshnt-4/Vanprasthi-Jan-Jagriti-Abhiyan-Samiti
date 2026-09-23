'use client';

import React from 'react';
import { useLanguage } from '@/components/layout/LanguageContext';

export default function TermsPage() {
  const { lang } = useLanguage();

  return (
    <div className="max-w-4xl mx-auto px-4 py-16 space-y-8">
      <div className="border-b border-cream-300 pb-6 space-y-2">
        <h1 className="text-3xl font-serif font-bold text-maroon-900">
          {lang === 'hi' ? 'नियम एवं शर्तें (Terms & Conditions)' : 'Terms & Conditions'}
        </h1>
        <p className="text-xs text-gray-500">Reg. No. 052/2016-2017 | Roorkee, Uttarakhand</p>
      </div>

      <div className="prose prose-maroon text-xs sm:text-sm text-gray-700 leading-relaxed space-y-4">
        <p>
          {lang === 'hi'
            ? 'वानप्रस्थी जन-जागृति अभियान समिति की वेबसाइट का उपयोग करके आप निम्नलिखित नियमों का पालन करने की सहमति व्यक्त करते हैं:'
            : 'By accessing the official website of Vanprasthi Jan-Jagriti Abhiyan Samiti, Roorkee, you agree to comply with the following terms:'}
        </p>

        <h3 className="text-base font-bold text-maroon-900">
          {lang === 'hi' ? '1. संस्था का स्वरूप' : '1. Non-Profit Status'}
        </h3>
        <p>
          {lang === 'hi'
            ? 'यह संस्था उत्तराखण्ड सरकार के अंतर्गत पंजीकृत एक गैर-राजनीतिक व गैर-लाभकारी संस्था है।'
            : 'This organization is a registered non-political and non-profit NGO under Society Registration No. 052/2016-2017.'}
        </p>
      </div>
    </div>
  );
}
