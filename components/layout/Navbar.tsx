'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useLanguage } from './LanguageContext';
import { Menu, X, Heart, Sun, Phone, ShieldCheck } from 'lucide-react';

export const Navbar = () => {
  const { lang, setLang, dict } = useLanguage();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const pathname = usePathname();

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { href: '/', label: dict.nav.home },
    { href: '/about', label: dict.nav.about },
    { href: '/mission', label: dict.nav.mission },
    { href: '/our-work', label: dict.nav.ourWork },
    { href: '/campaigns', label: dict.nav.campaigns },
    { href: '/events', label: dict.nav.events },
    { href: '/impact', label: dict.nav.impact },
    { href: '/gallery', label: dict.nav.gallery },
    { href: '/volunteer', label: dict.nav.volunteer },
    { href: '/contact', label: dict.nav.contact },
  ];

  return (
    <header className="sticky top-0 z-50 w-full transition-all duration-300">
      {/* Top Banner Bar */}
      <div className="bg-forest-800 text-cream-100 text-xs py-1.5 px-4">
        <div className="max-w-7xl mx-auto flex flex-wrap justify-between items-center gap-2">
          <div className="flex items-center gap-4 text-[11px] sm:text-xs">
            <span className="inline-flex items-center gap-1 font-medium text-saffron-400">
              <ShieldCheck className="w-3.5 h-3.5" />
              Reg. No. 052/2016-2017 (06.06.2016)
            </span>
            <span className="hidden md:inline text-forest-300">|</span>
            <span className="hidden md:inline-flex items-center gap-1">
              <Phone className="w-3 h-3 text-saffron-400" />
              {dict.phones}
            </span>
          </div>

          <div className="flex items-center gap-3 ml-auto">
            {/* Bilingual Switcher */}
            <div className="flex items-center bg-forest-900 rounded-full p-0.5 border border-forest-700">
              <button
                onClick={() => setLang('hi')}
                className={`px-2.5 py-0.5 rounded-full text-xs font-semibold transition-all ${
                  lang === 'hi'
                    ? 'bg-saffron-600 text-white shadow'
                    : 'text-cream-300 hover:text-white'
                }`}
              >
                हिन्दी
              </button>
              <button
                onClick={() => setLang('en')}
                className={`px-2.5 py-0.5 rounded-full text-xs font-semibold transition-all ${
                  lang === 'en'
                    ? 'bg-saffron-600 text-white shadow'
                    : 'text-cream-300 hover:text-white'
                }`}
              >
                English
              </button>
            </div>

            <Link
              href="/admin/login"
              className="text-[11px] text-cream-300 hover:text-saffron-400 transition-colors underline"
            >
              {dict.nav.admin}
            </Link>
          </div>
        </div>
      </div>

      {/* Main Navbar */}
      <nav
        className={`w-full bg-cream-50/95 backdrop-blur-md transition-all duration-200 border-b border-cream-200 ${
          scrolled ? 'shadow-soft py-2' : 'py-3'
        }`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between">
          {/* Brand Logo & Name */}
          <Link href="/" className="flex items-center gap-3 group">
            <div className="w-10 h-10 sm:w-11 sm:h-11 rounded-full bg-gradient-to-br from-forest-700 to-forest-800 border-2 border-saffron-500 flex items-center justify-center text-saffron-400 shadow-md group-hover:scale-105 transition-transform">
              <Sun className="w-6 h-6 animate-pulse" />
            </div>
            <div className="flex flex-col">
              <span className="text-sm sm:text-base font-bold text-forest-800 font-serif leading-tight">
                {lang === 'hi' ? 'वानप्रस्थी जन-जागृति अभियान समिति' : 'Vanprasthi Jan-Jagriti Abhiyan Samiti'}
              </span>
              <span className="text-[10px] sm:text-[11px] text-forest-700 font-medium tracking-wide">
                रुड़की, उत्तराखण्ड (Roorkee, Uttarakhand)
              </span>
            </div>
          </Link>

          {/* Desktop Navigation Links */}
          <div className="hidden xl:flex items-center space-x-1">
            {navLinks.map((link) => {
              const isActive = pathname === link.href;
              return (
                <Link
                  key={link.href}
                  href={link.href}
                  className={`px-2.5 py-1.5 rounded-lg text-xs font-semibold transition-colors ${
                    isActive
                      ? 'text-forest-800 bg-forest-50 border-b-2 border-saffron-600 font-bold'
                      : 'text-gray-700 hover:text-forest-800 hover:bg-cream-100'
                  }`}
                >
                  {link.label}
                </Link>
              );
            })}
          </div>

          {/* Desktop Donate Button */}
          <div className="hidden xl:flex items-center gap-3">
            <Link
              href="/donate"
              className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-gradient-to-r from-saffron-600 to-saffron-500 hover:from-saffron-700 hover:to-saffron-600 text-white font-bold text-xs shadow-md hover:shadow-lg transition-all transform hover:-translate-y-0.5 active:translate-y-0"
            >
              <Heart className="w-4 h-4 fill-white animate-bounce" />
              <span>{lang === 'hi' ? 'सहयोग करें / दान दें' : 'DONATE / सहयोग करें'}</span>
            </Link>
          </div>

          {/* Mobile Hamburger Button */}
          <div className="flex xl:hidden items-center gap-2">
            <Link
              href="/donate"
              className="inline-flex items-center gap-1 px-3 py-1.5 rounded-full bg-saffron-600 text-white text-xs font-bold shadow"
            >
              <Heart className="w-3.5 h-3.5 fill-white" />
              <span>{lang === 'hi' ? 'दान दें' : 'DONATE'}</span>
            </Link>
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-2 rounded-lg text-forest-800 hover:bg-cream-200 transition-colors focus:outline-none"
              aria-label="Toggle menu"
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>

        {/* Mobile Navigation Drawer */}
        {mobileMenuOpen && (
          <div className="xl:hidden bg-cream-50 border-b border-cream-200 px-4 pt-2 pb-6 space-y-1 shadow-lg">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                onClick={() => setMobileMenuOpen(false)}
                className={`block px-3 py-2 rounded-md text-sm font-semibold ${
                  pathname === link.href
                    ? 'text-forest-800 bg-forest-100 font-bold border-l-4 border-saffron-600'
                    : 'text-gray-700 hover:bg-cream-100 hover:text-forest-800'
                }`}
              >
                {link.label}
              </Link>
            ))}
            <div className="pt-3 border-t border-cream-200">
              <Link
                href="/donate"
                onClick={() => setMobileMenuOpen(false)}
                className="w-full flex items-center justify-center gap-2 py-2.5 rounded-xl bg-saffron-600 text-white font-bold text-sm shadow"
              >
                <Heart className="w-4 h-4 fill-white" />
                <span>{lang === 'hi' ? 'सहयोग करें / दान दें' : 'DONATE NOW'}</span>
              </Link>
            </div>
          </div>
        )}
      </nav>
    </header>
  );
};
