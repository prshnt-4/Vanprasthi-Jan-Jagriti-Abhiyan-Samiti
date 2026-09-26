'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useLanguage } from './LanguageContext';
import { Menu, X, Heart, Sun, Phone, ShieldCheck, ArrowUpRight } from 'lucide-react';

export const Navbar = () => {
  const { lang, setLang, dict } = useLanguage();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const pathname = usePathname();

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    handleScroll();
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
      <div className="bg-forest-950 text-cream-100 text-xs py-2 px-4 border-b border-forest-800">
        <div className="max-w-7xl mx-auto flex flex-wrap justify-between items-center gap-2">
          <div className="flex items-center gap-4 text-[11px] sm:text-xs">
            <span className="inline-flex items-center gap-1 font-medium text-gold-400">
              <ShieldCheck className="w-3.5 h-3.5" />
              Reg. No. 052/2016-2017 (06.06.2016)
            </span>
            <span className="hidden md:inline text-forest-600">|</span>
            <span className="hidden md:inline-flex items-center gap-1 text-cream-200">
              <Phone className="w-3 h-3 text-gold-400" />
              {dict.phones}
            </span>
          </div>

          <div className="flex items-center gap-3 ml-auto">
            <Link href="/donate" className="btn-pill-gold hidden sm:inline-flex">
              <Heart className="w-3.5 h-3.5 fill-forest-900" />
              {lang === 'hi' ? 'अभी दान करें' : 'Donate Now'}
            </Link>
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
        className={`w-full backdrop-blur-md transition-all duration-200 ${
          scrolled
            ? 'bg-white border-b border-cream-300 shadow-soft'
            : 'bg-forest-900 border-b border-forest-800'
        } ${scrolled ? 'py-2' : 'py-3.5'}`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between">
          {/* Brand Logo & Name */}
          <Link href="/" className="flex items-center gap-3 group">
            <div className="w-10 h-10 sm:w-11 sm:h-11 rounded-full bg-gradient-to-br from-forest-700 to-forest-800 border-2 border-saffron-500 flex items-center justify-center text-saffron-400 shadow-md group-hover:scale-105 transition-transform">
              <Sun className="w-6 h-6 animate-pulse" />
            </div>
            <div className="flex flex-col">
              <span className={`text-sm sm:text-base font-bold font-serif leading-tight ${scrolled ? 'text-forest-950' : 'text-white'}`}>
                {lang === 'hi' ? 'वानप्रस्थी जन-जागृति अभियान समिति' : 'Vanprasthi Jan-Jagriti Abhiyan Samiti'}
              </span>
              <span className={`text-[10px] sm:text-[11px] font-medium tracking-wide ${scrolled ? 'text-forest-700' : 'text-forest-200'}`}>
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
                      ? scrolled
                        ? 'text-forest-950 bg-forest-100 border-b-2 border-gold-500 font-bold'
                        : 'text-white bg-forest-800 border-b-2 border-gold-500 font-bold'
                      : scrolled
                        ? 'text-forest-800 hover:text-forest-950 hover:bg-forest-50'
                        : 'text-cream-200 hover:text-white hover:bg-forest-800/80'
                  }`}
                >
                  {link.label}
                </Link>
              );
            })}
          </div>

          {/* Desktop Donate Button */}
          <div className="hidden xl:flex items-center gap-3">
            <Link href="/get-involved" className="btn-pill-primary text-xs">
              <span>{lang === 'hi' ? 'और जानें' : 'Explore More'}</span>
              <span className="btn-pill-icon">
                <ArrowUpRight className="w-4 h-4" />
              </span>
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
              className={`p-2 rounded-lg transition-colors focus:outline-none ${
                scrolled ? 'text-forest-800 hover:bg-forest-100' : 'text-white hover:bg-forest-800'
              }`}
              aria-label="Toggle menu"
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>

        {/* Mobile Navigation Drawer */}
        {mobileMenuOpen && (
          <div className={`xl:hidden px-4 pt-2 pb-6 space-y-1 shadow-lg ${
            scrolled ? 'bg-white border-b border-cream-300' : 'bg-forest-900 border-b border-forest-800'
          }`}>
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                onClick={() => setMobileMenuOpen(false)}
                className={`block px-3 py-2 rounded-md text-sm font-semibold ${
                  pathname === link.href
                    ? scrolled
                      ? 'text-forest-950 bg-forest-100 font-bold border-l-4 border-gold-500'
                      : 'text-white bg-forest-800 font-bold border-l-4 border-gold-500'
                    : scrolled
                      ? 'text-forest-800 hover:bg-forest-100 hover:text-forest-950'
                      : 'text-cream-200 hover:bg-forest-800 hover:text-white'
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
