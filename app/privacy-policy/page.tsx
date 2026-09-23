'use client';

import React from 'react';
import { useLanguage } from '@/components/layout/LanguageContext';
import { ShieldCheck } from 'lucide-react';

export default function PrivacyPolicyPage() {
  const { lang } = useLanguage();

  return (
    <div className="max-w-4xl mx-auto px-4 py-16 space-y-8">
      <div className="border-b border-cream-300 pb-6 space-y-2">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-maroon-100 text-maroon-800 text-xs font-bold">
          <ShieldCheck className="w-4 h-4 text-maroon-800" />
          <span>Legal Document</span>
        </div>
        <h1 className="text-3xl font-serif font-bold text-maroon-900">
          {lang === 'hi' ? 'गोपनीयता नीति (Privacy Policy)' : 'Privacy Policy'}
        </h1>
        <p className="text-xs text-gray-500">Last updated: September 2026 | Reg. No. 052/2016-2017</p>
      </div>

      <div className="prose prose-maroon text-xs sm:text-sm text-gray-700 leading-relaxed space-y-4">
        <p>
          {lang === 'hi'
            ? 'वानप्रस्थी जन-जागृति अभियान समिति, रुड़की आपके द्वारा प्रदान की गई व्यक्तिगत जानकारी की गोपनीयता की रक्षा के प्रति पूर्णतः प्रतिबद्ध है।'
            : 'Vanprasthi Jan-Jagriti Abhiyan Samiti, Roorkee is dedicated to protecting the privacy of all donors, volunteers, and website visitors.'}
        </p>

        <h3 className="text-base font-bold text-maroon-900 pt-2">
          {lang === 'hi' ? '1. व्यक्तिगत जानकारी का संग्रहण' : '1. Information We Collect'}
        </h3>
        <p>
          {lang === 'hi'
            ? 'दान व स्वयंसेवक आवेदन के समय हम आपका नाम, ईमेल, फोन नंबर, पता एवं पैन नंबर (ऐच्छिक) एकत्र करते हैं। कार्ड या बैंक पासवर्ड हमारे सर्वर पर कदापि संग्रहित नहीं किए जाते।'
            : 'We collect name, email, phone number, address, and optional PAN number for tax receipt issuance. We never store payment card credentials on our servers.'}
        </p>

        <h3 className="text-base font-bold text-maroon-900 pt-2">
          {lang === 'hi' ? '2. डेटा सुरक्षा व गोपनीयता' : '2. Data Protection'}
        </h3>
        <p>
          {lang === 'hi'
            ? 'आपकी जानकारी किसी भी तृतीय पक्ष को बेची या साझा नहीं की जाती। इसका उपयोग केवल दान रसीद भेजने व संस्था गतिविधियों की जानकारी देने हेतु किया जाता है।'
            : 'Your data is strictly confidential and never sold or shared with commercial third parties. It is used solely for donation receipts and official communications.'}
        </p>
      </div>
    </div>
  );
}
