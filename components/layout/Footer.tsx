'use client';

import React from 'react';
import Link from 'next/link';
import { useLanguage } from './LanguageContext';
import { Sun, Heart, MapPin, Phone, Mail, FileText, ShieldCheck } from 'lucide-react';

export const Footer = () => {
  const { lang, dict } = useLanguage();
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-forest-800 text-cream-100 border-t-4 border-saffron-600 pt-12 pb-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-10">
          {/* Column 1: Organization Overview */}
          <div className="space-y-4">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-full bg-saffron-600 flex items-center justify-center text-white">
                <Sun className="w-6 h-6" />
              </div>
              <span className="font-serif font-bold text-lg text-cream-50 leading-tight">
                {dict.orgNameShort}
              </span>
            </div>
            <p className="text-xs text-cream-300 leading-relaxed">
              {dict.footer.legalText}
            </p>
            <div className="p-3 rounded-lg bg-forest-900/90 border border-forest-700 text-xs">
              <span className="text-saffron-400 font-semibold block mb-1">
                {lang === 'hi' ? 'पंजीकृत नाम:' : 'Registered Entity:'}
              </span>
              <span className="text-cream-200">वानप्रस्थी जन-जागृति अभियान समिति रूड़की (संख्या 052/2016-2017)</span>
            </div>
          </div>

          {/* Column 2: Quick Links */}
          <div className="space-y-3">
            <h4 className="font-serif font-bold text-base text-saffron-400 border-b border-forest-700 pb-2">
              {dict.footer.quickLinks}
            </h4>
            <ul className="space-y-2 text-xs text-cream-200">
              <li>
                <Link href="/about" className="hover:text-saffron-400 transition-colors flex items-center gap-1.5">
                  <span>›</span> {dict.nav.about}
                </Link>
              </li>
              <li>
                <Link href="/mission" className="hover:text-saffron-400 transition-colors flex items-center gap-1.5">
                  <span>›</span> {dict.nav.mission}
                </Link>
              </li>
              <li>
                <Link href="/our-work" className="hover:text-saffron-400 transition-colors flex items-center gap-1.5">
                  <span>›</span> {dict.nav.ourWork}
                </Link>
              </li>
              <li>
                <Link href="/campaigns" className="hover:text-saffron-400 transition-colors flex items-center gap-1.5">
                  <span>›</span> {dict.nav.campaigns}
                </Link>
              </li>
              <li>
                <Link href="/transparency" className="hover:text-saffron-400 transition-colors flex items-center gap-1.5">
                  <span>›</span> {dict.nav.transparency}
                </Link>
              </li>
            </ul>
          </div>

          {/* Column 3: 4 Core Pillars */}
          <div className="space-y-3">
            <h4 className="font-serif font-bold text-base text-saffron-400 border-b border-forest-700 pb-2">
              {dict.footer.initiatives}
            </h4>
            <ul className="space-y-2 text-xs text-cream-200">
              <li>
                <Link href="/our-work/cleanliness" className="hover:text-saffron-400 transition-colors">
                  • 🧹 {dict.pillars.cleanlinessTitle}
                </Link>
              </li>
              <li>
                <Link href="/our-work/social-education" className="hover:text-saffron-400 transition-colors">
                  • 📚 {dict.pillars.socialEduTitle}
                </Link>
              </li>
              <li>
                <Link href="/our-work/anti-corruption" className="hover:text-saffron-400 transition-colors">
                  • ⚖️ {dict.pillars.antiCorruptionTitle}
                </Link>
              </li>
              <li>
                <Link href="/our-work/social-service" className="hover:text-saffron-400 transition-colors">
                  • 🤝 {dict.pillars.assistanceTitle}
                </Link>
              </li>
              <li className="pt-2">
                <Link
                  href="/volunteer"
                  className="inline-flex items-center gap-1 text-saffron-400 font-bold hover:underline"
                >
                  <FileText className="w-3.5 h-3.5" />
                  <span>{dict.hero.ctaJoin}</span>
                </Link>
              </li>
            </ul>
          </div>

          {/* Column 4: Verified Contact Info */}
          <div className="space-y-3">
            <h4 className="font-serif font-bold text-base text-saffron-400 border-b border-forest-700 pb-2">
              {dict.footer.contactInfo}
            </h4>
            <div className="space-y-2 text-xs text-cream-200">
              <div className="flex items-start gap-2">
                <MapPin className="w-4 h-4 text-saffron-400 shrink-0 mt-0.5" />
                <span>{dict.address}</span>
              </div>
              <div className="flex items-center gap-2">
                <Phone className="w-4 h-4 text-saffron-400 shrink-0" />
                <span>{dict.phones}</span>
              </div>
              <div className="pt-1 text-[11px] text-cream-300">
                <span className="font-semibold text-saffron-400">{dict.presidentTitle}: </span>
                <span>{dict.president}</span>
              </div>
            </div>
          </div>
        </div>

        {/* Legal Links Bar */}
        <div className="border-t border-forest-700 pt-6 mt-6 flex flex-col md:flex-row justify-between items-center gap-4 text-xs text-cream-300">
          <div>
            © {currentYear} {dict.orgName}. {dict.footer.rights}
          </div>
          <div className="flex flex-wrap gap-4 text-[11px]">
            <Link href="/privacy-policy" className="hover:text-saffron-400 transition-colors">
              Privacy Policy
            </Link>
            <Link href="/terms" className="hover:text-saffron-400 transition-colors">
              Terms & Conditions
            </Link>
            <Link href="/donation-policy" className="hover:text-saffron-400 transition-colors">
              Donation Policy
            </Link>
            <Link href="/refund-policy" className="hover:text-saffron-400 transition-colors">
              Refund Policy
            </Link>
            <Link href="/disclaimer" className="hover:text-saffron-400 transition-colors">
              Disclaimer
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
};
