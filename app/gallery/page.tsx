'use client';

import React, { useState, useEffect } from 'react';
import { useLanguage } from '@/components/layout/LanguageContext';
import { Sun, Image as ImageIcon, X } from 'lucide-react';

export default function GalleryPage() {
  const { lang, dict } = useLanguage();
  const [images, setImages] = useState<any[]>([]);
  const [activeCategory, setActiveCategory] = useState('All');
  const [selectedImage, setSelectedImage] = useState<any>(null);

  useEffect(() => {
    fetch('/api/gallery')
      .then((res) => res.json())
      .then((data) => {
        if (Array.isArray(data)) setImages(data);
      })
      .catch((err) => console.error(err));
  }, []);

  const categories = [
    'All',
    'Cleanliness',
    'Social Education',
    'Anti-Corruption Awareness',
    'Community Service',
    'Events',
    'Volunteers',
  ];

  const sampleImages = [
    {
      _id: 'g1',
      title: { en: 'Cleanliness Awareness Drive', hi: 'स्वच्छता जागरूकता अभियान' },
      imageUrl: '/images/hero-ngo.jpg',
      category: 'Cleanliness',
      caption: { en: 'Volunteers conducting a neighborhood cleanup and awareness drive.', hi: 'स्वयंसेवक मोहल्ले की सफाई और जागरूकता अभियान चलाते हुए।' },
    },
    {
      _id: 'g2',
      title: { en: 'Community Service and Education Outreach', hi: 'सामुदायिक सेवा एवं शिक्षा जनजागृति' },
      imageUrl: '/images/hero-ngo.jpg',
      category: 'Social Education',
      caption: { en: 'Local citizens participating in awareness and service activities.', hi: 'स्थानीय नागरिक सामाजिक सेवा और शिक्षा कार्यक्रम में भाग लेते हुए।' },
    },
  ];

  const displayImages = images.length > 0 ? images : sampleImages;

  const filtered =
    activeCategory === 'All'
      ? displayImages
      : displayImages.filter((img) => img.category === activeCategory);

  return (
    <div className="space-y-16 py-12">
      <section className="bg-gradient-to-r from-maroon-900 via-maroon-800 to-maroon-900 text-cream-100 py-16 border-b-4 border-saffron-600">
        <div className="max-w-7xl mx-auto px-4 text-center space-y-4">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-maroon-950 text-saffron-400 text-xs font-semibold border border-maroon-700">
            <Sun className="w-4 h-4" />
            <span>{dict.nav.gallery}</span>
          </div>
          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold font-serif text-cream-50">
            {lang === 'hi' ? 'चित्र दीर्घा एवं गतिविधियां' : 'Photo Gallery & Activities'}
          </h1>
        </div>
      </section>

      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
        {/* Category Filters */}
        <div className="flex flex-wrap items-center justify-center gap-2">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setActiveCategory(cat)}
              className={`px-4 py-2 rounded-full text-xs font-bold transition-all ${
                activeCategory === cat
                  ? 'bg-saffron-600 text-white shadow'
                  : 'bg-cream-100 text-gray-700 hover:bg-cream-200'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* Gallery Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {filtered.map((img) => (
            <div
              key={img._id}
              onClick={() => setSelectedImage(img)}
              className="group relative rounded-2xl overflow-hidden shadow-soft border border-cream-300 bg-maroon-900 aspect-video cursor-pointer"
            >
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent z-10 opacity-80 group-hover:opacity-90 transition-opacity" />

              <div className="absolute bottom-0 left-0 right-0 p-4 z-20 space-y-1">
                <span className="text-[10px] font-bold text-saffron-400 uppercase tracking-wider bg-maroon-950/80 px-2 py-0.5 rounded">
                  {img.category}
                </span>
                <h3 className="text-sm font-bold text-white leading-snug">
                  {lang === 'hi' ? img.title.hi : img.title.en}
                </h3>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Lightbox Modal */}
      {selectedImage && (
        <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-md flex items-center justify-center p-4">
          <div className="max-w-3xl w-full bg-maroon-950 rounded-3xl p-6 border border-maroon-800 text-cream-100 space-y-4 relative">
            <button
              onClick={() => setSelectedImage(null)}
              className="absolute top-4 right-4 text-cream-300 hover:text-white"
            >
              <X className="w-6 h-6" />
            </button>
            <h3 className="text-xl font-serif font-bold text-saffron-400">
              {lang === 'hi' ? selectedImage.title.hi : selectedImage.title.en}
            </h3>
            <p className="text-xs text-cream-200">
              {selectedImage.caption ? (lang === 'hi' ? selectedImage.caption.hi : selectedImage.caption.en) : ''}
            </p>
          </div>
        </div>
      )}
    </div>
  );
}
