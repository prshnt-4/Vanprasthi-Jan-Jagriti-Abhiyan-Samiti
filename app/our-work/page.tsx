'use client';

import React from 'react';
import Link from 'next/link';
import { useLanguage } from '@/components/layout/LanguageContext';
import { Sun, Sparkles, BookOpen, ShieldCheck, HeartHandshake, ArrowRight } from 'lucide-react';

export default function OurWorkPage() {
  const { lang, dict } = useLanguage();

  const initiatives = [
    {
      id: 'cleanliness',
      title: '🧹 ' + dict.pillars.cleanlinessTitle,
      subtitle: lang === 'hi' ? 'स्वच्छ व स्वस्थ भारत का निर्माण' : 'Clean & Healthy India',
      desc: lang === 'hi'
        ? 'रुड़की एवं आसपास के क्षेत्रों में गली-मोहल्ला स्वच्छता अभियान, सार्वजनिक स्थलों की सफाई, कचरा निस्तारण एवं स्वास्थ्य जागरूकता।'
        : 'Neighborhood cleanup drives, waste segregation guidance, and health sanitation awareness across Roorkee and Uttarakhand.',
      link: '/our-work/cleanliness',
      icon: Sparkles,
    },
    {
      id: 'social-education',
      title: '📚 ' + dict.pillars.socialEduTitle,
      subtitle: lang === 'hi' ? 'संस्कारित युवा व सामाजिक सौहार्द' : 'Social Education & Values',
      desc: lang === 'hi'
        ? 'बुजुर्गों व माता-पिता का सम्मान, बाल श्रम व कूड़ा चुनने वाले बच्चों को स्कूल में प्रवेश कराने का प्रयास, सामाजिक अंधविश्वास उन्मूलन।'
        : 'Respecting elders, anti-superstition campaigns, and rehabilitating street/ragpicker children into formal schooling.',
      link: '/our-work/social-education',
      icon: BookOpen,
    },
    {
      id: 'anti-corruption',
      title: '⚖️ ' + dict.pillars.antiCorruptionTitle,
      subtitle: lang === 'hi' ? 'भ्रष्टाचार मुक्त पारदर्शी समाज' : 'Anti-Corruption Awareness',
      desc: lang === 'hi'
        ? 'नागरिकों को उनके संवैधानिक अधिकारों व कर्तव्यों की जानकारी देना, भ्रष्टाचार के खिलाफ जनजागृति एवं पारदर्शी व्यवस्था।'
        : 'Educating citizens on their legal rights and duties, fighting exploitation, and promoting transparency.',
      link: '/our-work/anti-corruption',
      icon: ShieldCheck,
    },
    {
      id: 'social-service',
      title: '🤝 ' + dict.pillars.assistanceTitle,
      subtitle: lang === 'hi' ? 'वंचित व अभावग्रस्त वर्ग की सहायता' : 'Community Service & Welfare',
      desc: lang === 'hi'
        ? 'गरीब व अभावग्रस्त वर्ग के परिवारों की सहायता, आपदा राहत एवं सरकारी व गैर-सरकारी कल्याणकारी योजनाओं की जानकारी व लाभ।'
        : 'Providing assistance to disadvantaged families and helping eligible citizens access government welfare schemes.',
      link: '/our-work/social-service',
      icon: HeartHandshake,
    },
  ];

  return (
    <div className="space-y-16 py-12">
      <section className="bg-gradient-to-r from-forest-800 via-forest-700 to-forest-800 text-cream-100 py-16 border-b-4 border-saffron-600">
        <div className="max-w-7xl mx-auto px-4 text-center space-y-4">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-forest-950 text-saffron-400 text-xs font-semibold border border-forest-600">
            <Sun className="w-4 h-4" />
            <span>{dict.nav.ourWork}</span>
          </div>
          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold font-serif text-cream-50">
            {lang === 'hi' ? 'हमारे मुख्य 4 सामाजिक अभियान' : 'Four Core Pillars of Social Work'}
          </h1>
          <p className="text-sm sm:text-base text-cream-200 max-w-3xl mx-auto leading-relaxed">
            {lang === 'hi'
              ? 'आधिकारिक पंजीयन संख्या 052/2016-2017 पर आधारित संस्था की प्रमुख गतिविधियां।'
              : 'Detailed breakdown of our official objectives as registered under Society Registration No. 052/2016-2017.'}
          </p>
        </div>
      </section>

      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {initiatives.map((item) => {
            const Icon = item.icon;
            return (
              <div
                key={item.id}
                className="p-8 rounded-3xl bg-white border border-cream-300 shadow-soft hover:shadow-card transition-all space-y-4 flex flex-col justify-between"
              >
                <div className="space-y-4">
                  <div className="w-12 h-12 rounded-2xl bg-forest-100 text-forest-700 flex items-center justify-center">
                    <Icon className="w-6 h-6 text-forest-700" />
                  </div>
                  <div>
                    <span className="text-xs font-bold text-saffron-600 uppercase tracking-wider block">
                      {item.subtitle}
                    </span>
                    <h2 className="text-2xl font-serif font-bold text-forest-800 mt-1">{item.title}</h2>
                  </div>
                  <p className="text-xs sm:text-sm text-gray-600 leading-relaxed">{item.desc}</p>
                </div>

                <div className="pt-4 border-t border-cream-200">
                  <Link
                    href={item.link}
                    className="inline-flex items-center gap-1.5 text-xs font-bold text-saffron-600 hover:text-saffron-700 hover:underline"
                  >
                    <span>{lang === 'hi' ? 'विस्तार से देखें' : 'Learn More'}</span>
                    <ArrowRight className="w-4 h-4" />
                  </Link>
                </div>
              </div>
            );
          })}
        </div>
      </section>
    </div>
  );
}
