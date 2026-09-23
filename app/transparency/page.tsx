'use client';

import React, { useState, useEffect } from 'react';
import { useLanguage } from '@/components/layout/LanguageContext';
import { Sun, FileText, Download, ShieldCheck, CheckCircle2 } from 'lucide-react';

export default function TransparencyPage() {
  const { lang, dict } = useLanguage();
  const [documents, setDocuments] = useState<any[]>([]);

  useEffect(() => {
    fetch('/api/documents')
      .then((res) => res.json())
      .then((data) => {
        if (Array.isArray(data)) setDocuments(data);
      })
      .catch((err) => console.error(err));
  }, []);

  const sampleDocs = [
    {
      _id: 'doc1',
      title: {
        hi: 'गैर-राजनीतिक संस्था पंजीकरण प्रमाण पत्र (संख्या 052/2016-2017)',
        en: 'Society Registration Certificate (Reg. No. 052/2016-2017)',
      },
      category: 'Registration',
      uploadDate: '06.06.2016',
      description: {
        hi: 'उत्तराखण्ड सरकार द्वारा 06 जून 2016 को जारी पंजीकृत प्रमाण पत्र।',
        en: 'Official Society Registration Certificate issued on 06.06.2016 in Roorkee.',
      },
      fileUrl: '/docs/registration-052-2016-2017.pdf',
    },
  ];

  const displayDocs = documents.length > 0 ? documents : sampleDocs;

  return (
    <div className="space-y-16 py-12">
      <section className="bg-gradient-to-r from-maroon-900 via-maroon-800 to-maroon-900 text-cream-100 py-16 border-b-4 border-saffron-600">
        <div className="max-w-7xl mx-auto px-4 text-center space-y-4">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-maroon-950 text-saffron-400 text-xs font-semibold border border-maroon-700">
            <ShieldCheck className="w-4 h-4 text-forest-700" />
            <span>{dict.nav.transparency}</span>
          </div>
          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold font-serif text-cream-50">
            {lang === 'hi' ? 'विधिक दस्तावेज एवं वित्तीय पारदर्शिता' : 'Legal Compliance & Transparency'}
          </h1>
          <p className="text-sm sm:text-base text-cream-200 max-w-3xl mx-auto leading-relaxed">
            {lang === 'hi'
              ? 'वानप्रस्थी जन-जागृति अभियान समिति (पंजीयन 052/2016-2017) के आधिकारिक दस्तावेज व रिपोर्ट।'
              : 'Public records, society registration details, and official documentation.'}
          </p>
        </div>
      </section>

      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {displayDocs.map((doc) => (
            <div
              key={doc._id}
              className="p-6 sm:p-8 rounded-3xl bg-white border border-cream-300 shadow-soft space-y-4 flex flex-col justify-between"
            >
              <div className="space-y-3">
                <div className="flex items-center justify-between text-xs">
                  <span className="px-3 py-1 rounded-full bg-forest-50 text-forest-700 font-bold border border-forest-200">
                    {doc.category}
                  </span>
                  <span className="text-gray-500 font-medium">Date: {doc.uploadDate}</span>
                </div>

                <h2 className="text-lg font-serif font-bold text-maroon-900">
                  {lang === 'hi' ? doc.title.hi : doc.title.en}
                </h2>

                <p className="text-xs text-gray-600 leading-relaxed">
                  {lang === 'hi' ? doc.description.hi : doc.description.en}
                </p>
              </div>

              <div className="pt-4 border-t border-cream-200">
                <a
                  href={doc.fileUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-maroon-800 hover:bg-maroon-900 text-white font-bold text-xs shadow transition-colors"
                >
                  <Download className="w-4 h-4 text-saffron-400" />
                  <span>{lang === 'hi' ? 'दस्तावेज़ देखें / डाउनलोड करें' : 'View / Download PDF'}</span>
                </a>
              </div>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}
