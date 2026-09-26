'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { useLanguage } from '@/components/layout/LanguageContext';
import { Sun, Calendar, User, ArrowRight } from 'lucide-react';

export default function NewsPage() {
  const { lang, dict } = useLanguage();
  const [posts, setPosts] = useState<any[]>([]);

  useEffect(() => {
    fetch('/api/news')
      .then((res) => res.json())
      .then((data) => {
        if (Array.isArray(data)) setPosts(data);
      })
      .catch((err) => console.error(err));
  }, []);

  const samplePosts = [
    {
      _id: 'n1',
      slug: 'swachhata-campaign-roorkee',
      title: {
        en: 'Cleanliness Awareness Drive Conducted Across Roorkee Neighborhoods',
        hi: 'रुड़की शहर में व्यापक स्वच्छता जनजागृति अभियान संपन्न',
      },
      content: {
        en: 'Senior citizens and volunteers organized neighborhood cleanup guidance and waste segregation awareness.',
        hi: 'वानप्रस्थी नागरिकों व स्वयंसेवकों ने मोहल्ला स्वच्छता व कचरा प्रबंधन पर जागरूकता अभियान चलाया।',
      },
      author: 'Vanprasthi Samiti Editorial',
      publishedDate: '2026-08-20',
      category: 'Swachhata',
    },
    {
      _id: 'n2',
      slug: 'community-education-drive',
      title: {
        en: 'Community Education Drive on Civic Responsibility',
        hi: 'नागरिक जिम्मेदारी पर सामुदायिक शिक्षा अभियान',
      },
      content: {
        en: 'Volunteers conducted awareness sessions on cleanliness, respect for elders, and social harmony.',
        hi: 'स्वयंसेवकों ने स्वच्छता, बुजुर्गों का सम्मान और सामाजिक सौहार्द पर जागरूकता सत्र आयोजित किए।',
      },
      author: 'Vanprasthi Samiti Editorial',
      publishedDate: '2026-09-05',
      category: 'Social Education',
    },
  ];

  const displayPosts = posts.length > 0 ? posts : samplePosts;

  return (
    <div className="space-y-16 py-12">
      <section className="bg-gradient-to-r from-maroon-900 via-maroon-800 to-maroon-900 text-cream-100 py-16 border-b-4 border-saffron-600">
        <div className="max-w-7xl mx-auto px-4 text-center space-y-4">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-maroon-950 text-saffron-400 text-xs font-semibold border border-maroon-700">
            <Sun className="w-4 h-4" />
            <span>{dict.nav.news}</span>
          </div>
          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold font-serif text-cream-50">
            {lang === 'hi' ? 'समाचार एवं विचार' : 'News & Press Releases'}
          </h1>
        </div>
      </section>

      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {displayPosts.map((post) => (
            <div
              key={post._id}
              className="p-6 sm:p-8 rounded-3xl bg-white border border-cream-300 shadow-soft hover:shadow-card transition-all space-y-4 flex flex-col justify-between"
            >
              <div className="space-y-3">
                {post.coverImage && (
                  <img
                    src={post.coverImage}
                    alt={lang === 'hi' ? post.title.hi : post.title.en}
                    className="aspect-video w-full rounded-2xl object-cover"
                  />
                )}
                <div className="flex items-center justify-between text-xs text-gray-500">
                  <span className="px-3 py-1 rounded-full bg-saffron-100 text-saffron-700 font-bold">
                    {post.category}
                  </span>
                  <span className="flex items-center gap-1">
                    <Calendar className="w-3.5 h-3.5 text-maroon-800" />
                    {post.publishedDate}
                  </span>
                </div>

                <h2 className="text-xl font-serif font-bold text-maroon-900 leading-snug">
                  {lang === 'hi' ? post.title.hi : post.title.en}
                </h2>

                <p className="text-xs sm:text-sm text-gray-600 leading-relaxed line-clamp-3">
                  {lang === 'hi' ? post.content.hi : post.content.en}
                </p>
              </div>

              <div className="pt-4 border-t border-cream-200">
                <Link
                  href={`/news/${post.slug}`}
                  className="inline-flex items-center gap-1.5 text-xs font-bold text-saffron-600 hover:underline"
                >
                  <span>{lang === 'hi' ? 'पूरा लेख पढ़ें' : 'Read Full Article'}</span>
                  <ArrowRight className="w-4 h-4" />
                </Link>
              </div>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}
