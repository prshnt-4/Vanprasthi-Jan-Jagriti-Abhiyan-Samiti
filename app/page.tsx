'use client';

import React from 'react';
import Link from 'next/link';
import { useLanguage } from '@/components/layout/LanguageContext';
import {
  Sun,
  Heart,
  BookOpen,
  Sparkles,
  Users,
  ShieldCheck,
  HeartHandshake,
  ArrowRight,
  MapPin,
  Phone,
  FileText,
  ChevronRight,
  CheckCircle2,
  Award
} from 'lucide-react';

export default function HomePage() {
  const { lang, dict } = useLanguage();

  return (
    <div className="space-y-16 sm:space-y-24 pb-16">
      {/* 1. HERO SECTION */}
      <section className="relative overflow-hidden hero-mesh text-white pt-10 pb-20 lg:pt-16 lg:pb-28 shadow-hero">
        <div className="absolute inset-0 opacity-20 pointer-events-none bg-[url('https://images.unsplash.com/photo-1464226184884-fa280b87f399?auto=format&fit=crop&w=1600&q=80')] bg-cover bg-center mix-blend-overlay" />

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
            {/* Left Content */}
            <div className="lg:col-span-7 space-y-6 text-center lg:text-left">
              <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white/10 border border-white/20 text-gold-400 text-xs sm:text-sm font-semibold backdrop-blur-sm">
                <Sun className="w-4 h-4" />
                <span>{dict.hero.badge}</span>
              </div>

              <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold font-serif leading-tight">
                {lang === 'hi'
                  ? 'हृदय से समाज को स्वच्छ, शिक्षित व निष्पक्ष बनाएं'
                  : 'Shape a Cleaner, Educated & Accountable Society Together'}
              </h1>

              <p className="text-base sm:text-lg text-cream-100/90 leading-relaxed max-w-2xl mx-auto lg:mx-0">
                {dict.hero.subheadline}
              </p>

              {/* Slogan Banner */}
              <div className="p-3.5 rounded-xl bg-forest-950/50 text-cream-100 text-xs sm:text-sm font-medium border-l-4 border-gold-500 backdrop-blur-sm">
                <span className="text-gold-400 font-bold block sm:inline mr-2">
                  {lang === 'hi' ? 'ध्येय वाक्य:' : 'Creed:'}
                </span>
                &ldquo;{dict.slogan}&rdquo;
              </div>

              {/* Explore our work */}
              <div className="flex flex-wrap items-center justify-center lg:justify-start gap-4 pt-2">
                <Link
                  href="/our-work"
                  className="px-5 py-3.5 rounded-full bg-white/10 hover:bg-white/15 text-white font-bold text-sm border border-white/25 transition-all flex items-center gap-1.5 backdrop-blur-sm"
                >
                  <span>{dict.hero.ctaWork}</span>
                  <ChevronRight className="w-4 h-4" />
                </Link>
              </div>

            </div>

            {/* Right Visual Card */}
            <div className="lg:col-span-5 relative">
              <div className="relative rounded-3xl overflow-hidden shadow-card border-4 border-cream-50 bg-gradient-to-br from-forest-800 to-forest-900 text-cream-50 p-6 sm:p-8 space-y-6">
                <div className="absolute top-0 right-0 p-8 opacity-10 pointer-events-none">
                  <Sun className="w-48 h-48 text-saffron-500" />
                </div>

                <div className="flex items-center justify-between border-b border-forest-700 pb-4">
                  <span className="text-xs font-bold text-saffron-400 uppercase tracking-wider">
                    {lang === 'hi' ? 'संस्था पंजीकरण जानकारी' : 'Registration Info'}
                  </span>
                  <span className="text-xs bg-saffron-600/30 text-saffron-300 px-2.5 py-1 rounded-full border border-saffron-500/30">
                    Reg. 052/2016-2017
                  </span>
                </div>

                <div className="space-y-4">
                  <h3 className="text-xl sm:text-2xl font-serif font-bold text-saffron-400">
                    {dict.orgName}
                  </h3>
                  <p className="text-xs sm:text-sm text-cream-200 leading-relaxed">
                    {lang === 'hi'
                      ? 'वानप्रस्थी जन-जागृति अभियान समिति (रुड़की) एक गैर-राजनीतिक पंजीकृत संस्था है (संख्या 052/2016-2017 दिनांक 06.06.2016)। संस्था का मुख्य ध्येय वरिष्ठ नागरिकों व स्वयंसेवकों के माध्यम से देश को स्वच्छ, शिक्षित व भ्रष्टाचार मुक्त बनाना है।'
                      : 'A non-political registered NGO in Roorkee (Reg. No. 052/2016-2017 dated 06.06.2016) channelizing senior citizen experience toward cleanliness, social education, and anti-corruption.'}
                  </p>
                </div>

                <div className="p-4 rounded-xl bg-forest-950/60 border border-forest-700 space-y-2 text-xs">
                  <div className="flex items-center justify-between">
                    <span className="text-saffron-400 font-semibold">{dict.presidentTitle}:</span>
                    <span className="text-cream-100 font-bold">{dict.president}</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-saffron-400 font-semibold">{lang === 'hi' ? 'पंजीकरण तिथि:' : 'Reg Date:'}</span>
                    <span className="text-cream-100 font-medium">06.06.2016</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-saffron-400 font-semibold">{lang === 'hi' ? 'मुख्यालय:' : 'HQ:'}</span>
                    <span className="text-cream-100 font-medium">रुड़की, उत्तराखण्ड</span>
                  </div>
                </div>

              </div>
            </div>
          </div>
        </div>

        <div className="section-wave-top absolute bottom-0 left-0 right-0 text-white">
          <svg viewBox="0 0 1440 48" preserveAspectRatio="none" aria-hidden>
            <path
              fill="currentColor"
              d="M0,32 C240,48 480,8 720,24 C960,40 1200,16 1440,32 L1440,48 L0,48 Z"
            />
          </svg>
        </div>
      </section>

      {/* 2. FOUR CORE INITIATIVES SECTION */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
        <div className="text-center space-y-3">
          <span className="text-xs font-bold text-saffron-600 uppercase tracking-widest bg-saffron-100 px-3 py-1 rounded-full">
            {lang === 'hi' ? 'आधिकारिक पंजीकरण पर आधारित' : 'Based on Official Registration'}
          </span>
          <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold font-serif text-forest-800">
            {lang === 'hi' ? 'हमारे प्रमुख 4 सामाजिक अभियान' : 'Our Four Major Core Initiatives'}
          </h2>
          <p className="text-sm text-gray-600 max-w-2xl mx-auto">
            {lang === 'hi'
              ? 'आधिकारिक संस्था पंजीकरण दस्तावेज संख्या 052/2016-2017 के अनुसार हमारी संस्था निम्नलिखित चार मुख्य क्षेत्रों में समर्पित है:'
              : 'As documented in Society Registration No. 052/2016-2017, our organization works across four official verticals:'}
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {/* Card 1: Cleanliness */}
          <div className="p-6 sm:p-8 rounded-3xl bg-white border border-cream-300 shadow-soft hover:shadow-card transition-all space-y-4 flex flex-col justify-between">
            <div className="space-y-4">
              <div className="w-12 h-12 rounded-2xl bg-forest-100 text-forest-700 flex items-center justify-center font-bold">
                <Sparkles className="w-6 h-6 text-forest-700" />
              </div>
              <h3 className="text-xl font-bold font-serif text-forest-800">
                🧹 {dict.pillars.cleanlinessTitle}
              </h3>
              <p className="text-xs sm:text-sm text-gray-600 leading-relaxed">
                {dict.pillars.cleanlinessDesc}
              </p>
            </div>
            <div className="pt-4 border-t border-cream-200">
              <Link
                href="/our-work/cleanliness"
                className="inline-flex items-center gap-1.5 text-xs font-bold text-saffron-600 hover:underline"
              >
                <span>{lang === 'hi' ? 'विस्तार से देखें' : 'Learn More'}</span>
                <ArrowRight className="w-4 h-4" />
              </Link>
            </div>
          </div>

          {/* Card 2: Social Education */}
          <div className="p-6 sm:p-8 rounded-3xl bg-white border border-cream-300 shadow-soft hover:shadow-card transition-all space-y-4 flex flex-col justify-between">
            <div className="space-y-4">
              <div className="w-12 h-12 rounded-2xl bg-saffron-100 text-saffron-700 flex items-center justify-center font-bold">
                <BookOpen className="w-6 h-6 text-saffron-700" />
              </div>
              <h3 className="text-xl font-bold font-serif text-forest-800">
                📚 {dict.pillars.socialEduTitle}
              </h3>
              <p className="text-xs sm:text-sm text-gray-600 leading-relaxed">
                {dict.pillars.socialEduDesc}
              </p>
            </div>
            <div className="pt-4 border-t border-cream-200">
              <Link
                href="/our-work/social-education"
                className="inline-flex items-center gap-1.5 text-xs font-bold text-saffron-600 hover:underline"
              >
                <span>{lang === 'hi' ? 'विस्तार से देखें' : 'Learn More'}</span>
                <ArrowRight className="w-4 h-4" />
              </Link>
            </div>
          </div>

          {/* Card 3: Anti-Corruption */}
          <div className="p-6 sm:p-8 rounded-3xl bg-white border border-cream-300 shadow-soft hover:shadow-card transition-all space-y-4 flex flex-col justify-between">
            <div className="space-y-4">
              <div className="w-12 h-12 rounded-2xl bg-maroon-100 text-maroon-800 flex items-center justify-center font-bold">
                <ShieldCheck className="w-6 h-6 text-maroon-800" />
              </div>
              <h3 className="text-xl font-bold font-serif text-forest-800">
                ⚖️ {dict.pillars.antiCorruptionTitle}
              </h3>
              <p className="text-xs sm:text-sm text-gray-600 leading-relaxed">
                {dict.pillars.antiCorruptionDesc}
              </p>
            </div>
            <div className="pt-4 border-t border-cream-200">
              <Link
                href="/our-work/anti-corruption"
                className="inline-flex items-center gap-1.5 text-xs font-bold text-saffron-600 hover:underline"
              >
                <span>{lang === 'hi' ? 'विस्तार से देखें' : 'Learn More'}</span>
                <ArrowRight className="w-4 h-4" />
              </Link>
            </div>
          </div>

          {/* Card 4: Assistance Service */}
          <div className="p-6 sm:p-8 rounded-3xl bg-white border border-cream-300 shadow-soft hover:shadow-card transition-all space-y-4 flex flex-col justify-between">
            <div className="space-y-4">
              <div className="w-12 h-12 rounded-2xl bg-forest-100 text-forest-800 flex items-center justify-center font-bold">
                <HeartHandshake className="w-6 h-6 text-forest-800" />
              </div>
              <h3 className="text-xl font-bold font-serif text-forest-800">
                🤝 {dict.pillars.assistanceTitle}
              </h3>
              <p className="text-xs sm:text-sm text-gray-600 leading-relaxed">
                {dict.pillars.assistanceDesc}
              </p>
            </div>
            <div className="pt-4 border-t border-cream-200">
              <Link
                href="/our-work/social-service"
                className="inline-flex items-center gap-1.5 text-xs font-bold text-saffron-600 hover:underline"
              >
                <span>{lang === 'hi' ? 'विस्तार से देखें' : 'Learn More'}</span>
                <ArrowRight className="w-4 h-4" />
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* 5. CONTACT HEADQUARTERS CARD */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          <div className="lg:col-span-5 p-8 rounded-3xl bg-forest-950 text-cream-100 border border-forest-800 shadow-soft space-y-6">
            <h3 className="text-2xl font-serif font-bold text-saffron-400 border-b border-forest-800 pb-4">
              {lang === 'hi' ? 'मुख्यालय संपर्क विवरण' : 'Headquarters Contact'}
            </h3>

            <div className="space-y-4 text-xs sm:text-sm">
              <div className="flex items-start gap-3">
                <MapPin className="w-5 h-5 text-saffron-400 shrink-0 mt-1" />
                <div>
                  <span className="font-bold text-white block">{lang === 'hi' ? 'कार्यालय पता:' : 'Address:'}</span>
                  <span className="text-cream-200 leading-relaxed text-xs sm:text-sm">{dict.address}</span>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <Phone className="w-5 h-5 text-saffron-400 shrink-0 mt-1" />
                <div>
                  <span className="font-bold text-white block">{lang === 'hi' ? 'संपर्क सूत्र:' : 'Phone Numbers:'}</span>
                  <span className="text-cream-200 text-xs sm:text-sm">{dict.phones}</span>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <Award className="w-5 h-5 text-saffron-400 shrink-0 mt-1" />
                <div>
                  <span className="font-bold text-white block">{dict.presidentTitle}:</span>
                  <span className="text-saffron-300 font-bold">{dict.president}</span>
                </div>
              </div>
            </div>

            <div className="pt-2">
              <Link
                href="/contact"
                className="w-full py-3 rounded-xl bg-saffron-600 hover:bg-saffron-700 text-white font-bold text-xs sm:text-sm text-center block transition-colors shadow"
              >
                {lang === 'hi' ? 'ऑनलाइन संदेश भेजें' : 'Send Inquiry Message'}
              </Link>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
