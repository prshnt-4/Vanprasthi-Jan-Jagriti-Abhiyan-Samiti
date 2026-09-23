'use client';

import React from 'react';
import { useLanguage } from '@/components/layout/LanguageContext';

export default function DisclaimerPage() {
  const { lang } = useLanguage();

  return (
    <div className="max-w-4xl mx-auto px-4 py-16 space-y-8">
      <div className="border-b border-cream-300 pb-6 space-y-2">
        <h1 className="text-3xl font-serif font-bold text-maroon-900">
          {lang === 'hi' ? 'अस्वीकरण (Disclaimer)' : 'Disclaimer'}
        </h1>
        <p className="text-xs text-gray-500">Reg. No. 052/2016-2017</p>
      </div>

      <div className="prose prose-maroon text-xs sm:text-sm text-gray-700 leading-relaxed space-y-4">
        <p>
          {lang === 'hi'
            ? 'इस वेबसाइट पर उपलब्ध सभी जानकारी संस्था के आधिकारिक पंजीकरण एवं विवरणिका दस्तावेजों पर आधारित है।'
            : 'All information displayed on this portal is strictly based on the official registration and brochure documents of Vanprasthi Jan-Jagriti Abhiyan Samiti Roorkee.'}
        </p>
      </div>
    </div>
  );
}
