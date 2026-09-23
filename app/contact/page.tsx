'use client';

import React, { useState } from 'react';
import { useLanguage } from '@/components/layout/LanguageContext';
import { Sun, MapPin, Phone, Mail, CheckCircle2, Send } from 'lucide-react';

export default function ContactPage() {
  const { lang, dict } = useLanguage();
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [subject, setSubject] = useState('');
  const [message, setMessage] = useState('');
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!name || !email || !message) {
      alert(lang === 'hi' ? 'कृपया आवश्यक फ़ील्ड भरें।' : 'Please fill required fields.');
      return;
    }

    setLoading(true);
    try {
      const res = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ name, email, phone, subject, message }),
      });
      if (res.ok) {
        setSubmitted(true);
      }
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="space-y-16 py-12">
      <section className="bg-gradient-to-r from-maroon-900 via-maroon-800 to-maroon-900 text-cream-100 py-16 border-b-4 border-saffron-600">
        <div className="max-w-7xl mx-auto px-4 text-center space-y-4">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-maroon-950 text-saffron-400 text-xs font-semibold border border-maroon-700">
            <Sun className="w-4 h-4" />
            <span>{dict.orgNameShort}</span>
          </div>
          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold font-serif text-cream-50">
            {lang === 'hi' ? 'संपर्क करें' : 'Contact Us'}
          </h1>
          <p className="text-sm sm:text-base text-cream-200 max-w-3xl mx-auto leading-relaxed">
            {lang === 'hi'
              ? 'वानप्रस्थी जन-जागृति अभियान समिति, रुड़की (उत्तराखण्ड)'
              : 'Vanprasthi Jan-Jagriti Abhiyan Samiti, Roorkee (Uttarakhand).'}
          </p>
        </div>
      </section>

      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          {/* Verified Contact Card */}
          <div className="lg:col-span-5 p-8 rounded-3xl bg-maroon-950 text-cream-100 border border-maroon-800 shadow-xl space-y-6">
            <h2 className="text-2xl font-serif font-bold text-saffron-400 border-b border-maroon-800 pb-4">
              {lang === 'hi' ? 'संपर्क जानकारी' : 'Contact Information'}
            </h2>

            <div className="space-y-4 text-xs sm:text-sm text-cream-200">
              <div className="flex items-start gap-3">
                <MapPin className="w-5 h-5 text-saffron-500 shrink-0 mt-0.5" />
                <div>
                  <span className="font-bold text-white block mb-0.5">{lang === 'hi' ? 'मुख्यालय पता:' : 'Office Address:'}</span>
                  <span className="leading-relaxed">{dict.address}</span>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <Phone className="w-5 h-5 text-saffron-500 shrink-0 mt-0.5" />
                <div>
                  <span className="font-bold text-white block mb-0.5">{lang === 'hi' ? 'संपर्क सूत्र:' : 'Phone Numbers:'}</span>
                  <span>{dict.phones}</span>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <Mail className="w-5 h-5 text-saffron-500 shrink-0 mt-0.5" />
                <div>
                  <span className="font-bold text-white block mb-0.5">ईमेल (Email):</span>
                  <span>{dict.email}</span>
                </div>
              </div>
            </div>
          </div>

          {/* Contact Form */}
          <div className="lg:col-span-7 p-8 rounded-3xl bg-white border border-cream-300 shadow-soft">
            {submitted ? (
              <div className="text-center space-y-4 py-8">
                <CheckCircle2 className="w-12 h-12 text-forest-700 mx-auto" />
                <h3 className="text-2xl font-serif font-bold text-maroon-900">
                  {lang === 'hi' ? 'संदेश सफलतापूर्वक भेजा गया!' : 'Message Sent Successfully!'}
                </h3>
                <p className="text-xs text-gray-600">
                  {lang === 'hi' ? 'हमारी टीम जल्द ही आपसे संपर्क करेगी।' : 'Thank you for contacting Vanprasthi Jan-Jagriti Abhiyan Samiti.'}
                </p>
                <button
                  onClick={() => setSubmitted(false)}
                  className="px-6 py-2.5 rounded-full bg-maroon-800 text-white font-bold text-xs"
                >
                  {lang === 'hi' ? 'दूसरा संदेश भेजें' : 'Send Another Message'}
                </button>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-4">
                <h2 className="text-2xl font-serif font-bold text-maroon-900 border-b border-cream-300 pb-4">
                  {lang === 'hi' ? 'ऑनलाइन संदेश भेजें' : 'Send Inquiry Message'}
                </h2>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
                  <div>
                    <label className="block font-medium text-gray-700 mb-1">Name *</label>
                    <input
                      type="text"
                      required
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      className="w-full px-3.5 py-2.5 rounded-xl border border-cream-300 bg-cream-50"
                    />
                  </div>
                  <div>
                    <label className="block font-medium text-gray-700 mb-1">Email *</label>
                    <input
                      type="email"
                      required
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      className="w-full px-3.5 py-2.5 rounded-xl border border-cream-300 bg-cream-50"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
                  <div>
                    <label className="block font-medium text-gray-700 mb-1">Phone</label>
                    <input
                      type="tel"
                      value={phone}
                      onChange={(e) => setPhone(e.target.value)}
                      className="w-full px-3.5 py-2.5 rounded-xl border border-cream-300 bg-cream-50"
                    />
                  </div>
                  <div>
                    <label className="block font-medium text-gray-700 mb-1">Subject</label>
                    <input
                      type="text"
                      value={subject}
                      onChange={(e) => setSubject(e.target.value)}
                      className="w-full px-3.5 py-2.5 rounded-xl border border-cream-300 bg-cream-50"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-medium text-gray-700 mb-1">Message *</label>
                  <textarea
                    rows={4}
                    required
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                    className="w-full px-3.5 py-2.5 rounded-xl border border-cream-300 bg-cream-50 text-xs"
                  />
                </div>

                <button
                  type="submit"
                  disabled={loading}
                  className="w-full py-3.5 rounded-full bg-saffron-600 hover:bg-saffron-700 text-white font-bold text-xs sm:text-sm shadow flex items-center justify-center gap-2"
                >
                  <Send className="w-4 h-4" />
                  <span>{loading ? 'Sending...' : lang === 'hi' ? 'संदेश जमा करें' : 'Send Message'}</span>
                </button>
              </form>
            )}
          </div>
        </div>
      </section>
    </div>
  );
}
