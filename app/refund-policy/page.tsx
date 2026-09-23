'use client';

import React from 'react';
import { useLanguage } from '@/components/layout/LanguageContext';

export default function RefundPolicyPage() {
  const { lang } = useLanguage();

  return (
    <div className="max-w-4xl mx-auto px-4 py-16 space-y-8">
      <div className="border-b border-cream-300 pb-6 space-y-2">
        <h1 className="text-3xl font-serif font-bold text-maroon-900">
          {lang === 'hi' ? 'वापसी नीति (Refund & Cancellation Policy)' : 'Refund & Cancellation Policy'}
        </h1>
        <p className="text-xs text-gray-500">Reg. No. 052/2016-2017</p>
      </div>

      <div className="prose prose-maroon text-xs sm:text-sm text-gray-700 leading-relaxed space-y-4">
        <p>
          {lang === 'hi'
            ? 'संस्था में प्राप्त दान स्वैच्छिक योगदान होता है। यदि किसी तकनीकी त्रुटि के कारण दोहरा दान कट गया हो, तो 7 दिनों के भीतर हमसे ईमेल द्वारा संपर्क करें।'
            : 'Donations made to the NGO are voluntary contributions. If a duplicate transaction occurs due to a technical failure, please contact info@vanprasthisamiti.org within 7 days for resolution.'}
        </p>
      </div>
    </div>
  );
}
