'use client';

import React from 'react';
import { useLanguage } from '@/components/layout/LanguageContext';

export default function DonationPolicyPage() {
  const { lang } = useLanguage();

  return (
    <div className="max-w-4xl mx-auto px-4 py-16 space-y-8">
      <div className="border-b border-cream-300 pb-6 space-y-2">
        <h1 className="text-3xl font-serif font-bold text-maroon-900">
          {lang === 'hi' ? 'दान नीति (Donation Policy)' : 'Donation Policy'}
        </h1>
        <p className="text-xs text-gray-500">Reg. No. 052/2016-2017</p>
      </div>

      <div className="prose prose-maroon text-xs sm:text-sm text-gray-700 leading-relaxed space-y-4">
        <p>
          {lang === 'hi'
            ? 'संस्था को प्राप्त प्रत्येक दान राशि का उपयोग स्वच्छता अभियान, सामाजिक शिक्षा, भ्रष्टाचार जागरूकता, सहायता सेवा तथा सामान्य संस्था विकास हेतु किया जाता है।'
            : 'All donations received by Vanprasthi Jan-Jagriti Abhiyan Samiti, Roorkee are used for cleanliness campaigns, social education, anti-corruption awareness, community support, and general organizational activities.'}
        </p>
        <p>
          {lang === 'hi'
            ? 'प्रत्येक दानकर्ता को आधिकारिक रसीद प्रदान की जाती है।'
            : 'Official tax acknowledged receipts are generated for all contributions.'}
        </p>
      </div>
    </div>
  );
}
