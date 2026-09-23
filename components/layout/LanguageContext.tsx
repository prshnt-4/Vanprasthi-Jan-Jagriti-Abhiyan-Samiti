'use client';

import React, { createContext, useContext, useState, useEffect } from 'react';
import { Language, dictionary } from '@/lib/dictionary';

interface LanguageContextType {
  lang: Language;
  setLang: (lang: Language) => void;
  t: (keyPath: string) => any;
  dict: typeof dictionary['en'];
}

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

export const LanguageProvider = ({ children }: { children: React.ReactNode }) => {
  const [lang, setLangState] = useState<Language>('hi'); // Default to Hindi as source material is Hindi

  useEffect(() => {
    const saved = localStorage.getItem('ngo_lang') as Language;
    if (saved && (saved === 'en' || saved === 'hi')) {
      setLangState(saved);
    }
  }, []);

  const normalizedLang: Language = lang === 'en' || lang === 'hi' ? lang : 'hi';
  const currentDict = dictionary[normalizedLang] ?? dictionary.hi;

  const setLang = (newLang: Language) => {
    const nextLang = newLang === 'en' || newLang === 'hi' ? newLang : 'hi';
    setLangState(nextLang);
    localStorage.setItem('ngo_lang', nextLang);
  };

  const t = (keyPath: string) => {
    const keys = keyPath.split('.');
    let current: any = currentDict;
    for (const k of keys) {
      if (current && current[k] !== undefined) {
        current = current[k];
      } else {
        // Fallback to English if translation missing
        let fallback: any = dictionary['en'];
        for (const fk of keys) {
          if (fallback && fallback[fk] !== undefined) {
            fallback = fallback[fk];
          } else {
            return keyPath;
          }
        }
        return fallback;
      }
    }
    return current;
  };

  return (
    <LanguageContext.Provider value={{ lang: normalizedLang, setLang, t, dict: currentDict }}>
      {children}
    </LanguageContext.Provider>
  );
};

export const useLanguage = () => {
  const context = useContext(LanguageContext);
  if (!context) {
    throw new Error('useLanguage must be used within a LanguageProvider');
  }
  return context;
};
