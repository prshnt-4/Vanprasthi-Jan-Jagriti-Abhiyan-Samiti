'use client';

import React, { useState } from 'react';
import { useLanguage } from '@/components/layout/LanguageContext';
import { Users, CheckCircle2, Heart, Sun } from 'lucide-react';

export default function GetInvolvedPage() {
  const { lang, dict } = useLanguage();

  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [city, setCity] = useState('');
  const [selectedInterests, setSelectedInterests] = useState<string[]>([]);
  const [message, setMessage] = useState('');

  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);

  const interestOptions = [
    { id: 'Donate', labelHi: 'वित्तीय दान / अंशदान', labelEn: 'Financial Donation' },
    { id: 'Sponsor educational needs', labelHi: 'छात्रा शिक्षा प्रायोजन (Scholarship)', labelEn: 'Sponsor Educational Needs' },
    { id: 'Provide books', labelHi: 'पुस्तकें व लेखन सामग्री सहयोग', labelEn: 'Provide Books & Stationery' },
    { id: 'Provide clothing', labelHi: 'वस्त्र व गणवेश सहयोग', labelEn: 'Provide Clothing & Uniforms' },
    { id: 'Support food', labelHi: 'सात्विक भोजन व अन्नदान सहयोग', labelEn: 'Support Food & Nutrition' },
    { id: 'Support infrastructure', labelHi: 'अवसंरचना व छात्रावास विकास', labelEn: 'Support Hostel Infrastructure' },
    { id: 'Volunteer', labelHi: 'सामाजिक सेवा स्वयंसेवक', labelEn: 'Community Volunteer Service' },
    { id: 'Other', labelHi: 'अन्य प्रकार का सहयोग', labelEn: 'Other Support' },
  ];

  const toggleInterest = (id: string) => {
    setSelectedInterests((prev) =>
      prev.includes(id) ? prev.filter((item) => item !== id) : [...prev, id]
    );
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!name || !email || !phone || !city) {
      alert(lang === 'hi' ? 'कृपया सभी आवश्यक फ़ील्ड भरें।' : 'Please fill all required fields.');
      return;
    }

    setLoading(true);
    try {
      const res = await fetch('/api/volunteers', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          name,
          email,
          phone,
          city,
          areas: selectedInterests,
          message,
        }),
      });

      if (res.ok) {
        setSuccess(true);
      } else {
        const data = await res.json();
        alert(data.error || 'Submission failed');
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
            <Users className="w-4 h-4" />
            <span>{dict.nav.volunteer}</span>
          </div>
          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold font-serif text-cream-50">
            {dict.volunteer.title}
          </h1>
          <p className="text-sm sm:text-base text-cream-200 max-w-3xl mx-auto leading-relaxed">
            {dict.volunteer.sub}
          </p>
        </div>
      </section>

      <section className="max-w-4xl mx-auto px-4">
        {success ? (
          <div className="p-8 sm:p-12 rounded-3xl bg-white border-2 border-forest-600 shadow-2xl text-center space-y-6">
            <div className="w-16 h-16 rounded-full bg-forest-100 text-forest-700 mx-auto flex items-center justify-center">
              <CheckCircle2 className="w-10 h-10" />
            </div>
            <h2 className="text-2xl font-serif font-bold text-maroon-900">
              {lang === 'hi' ? 'आवेदन सफलतापूर्वक जमा हुआ!' : 'Form Submitted Successfully!'}
            </h2>
            <p className="text-sm text-gray-600 max-w-lg mx-auto">
              {dict.volunteer.successMsg}
            </p>
            <button
              onClick={() => {
                setSuccess(false);
                setName('');
                setEmail('');
                setPhone('');
                setCity('');
              }}
              className="px-8 py-3 rounded-full bg-maroon-800 text-white font-bold text-xs shadow"
            >
              {lang === 'hi' ? 'नया फॉर्म भरें' : 'Submit Another Form'}
            </button>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="p-8 sm:p-12 rounded-3xl bg-white border border-cream-300 shadow-soft space-y-8">
            <h2 className="text-2xl font-serif font-bold text-maroon-900 border-b border-cream-300 pb-4">
              {dict.volunteer.formHeading}
            </h2>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs sm:text-sm">
              <div>
                <label className="block font-medium text-gray-700 mb-1">{dict.volunteer.name} *</label>
                <input
                  type="text"
                  required
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className="w-full px-3.5 py-2.5 rounded-xl border border-cream-300 bg-cream-50"
                />
              </div>

              <div>
                <label className="block font-medium text-gray-700 mb-1">{dict.volunteer.email} *</label>
                <input
                  type="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full px-3.5 py-2.5 rounded-xl border border-cream-300 bg-cream-50"
                />
              </div>

              <div>
                <label className="block font-medium text-gray-700 mb-1">{dict.volunteer.phone} *</label>
                <input
                  type="tel"
                  required
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  className="w-full px-3.5 py-2.5 rounded-xl border border-cream-300 bg-cream-50"
                />
              </div>

              <div>
                <label className="block font-medium text-gray-700 mb-1">{dict.volunteer.city} *</label>
                <input
                  type="text"
                  required
                  value={city}
                  onChange={(e) => setCity(e.target.value)}
                  className="w-full px-3.5 py-2.5 rounded-xl border border-cream-300 bg-cream-50"
                />
              </div>
            </div>

            <div className="space-y-3">
              <label className="block font-medium text-gray-700 text-xs sm:text-sm">{dict.volunteer.areas}:</label>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                {interestOptions.map((item) => {
                  const isChecked = selectedInterests.includes(item.id);
                  return (
                    <button
                      key={item.id}
                      type="button"
                      onClick={() => toggleInterest(item.id)}
                      className={`p-3 rounded-xl border text-xs font-semibold text-left transition-all ${
                        isChecked
                          ? 'bg-maroon-900 text-cream-50 border-maroon-900 shadow-sm'
                          : 'bg-cream-50 text-gray-700 border-cream-300 hover:bg-cream-100'
                      }`}
                    >
                      {lang === 'hi' ? item.labelHi : item.labelEn}
                    </button>
                  );
                })}
              </div>
            </div>

            <div>
              <label className="block font-medium text-gray-700 mb-1 text-xs sm:text-sm">{dict.volunteer.message}</label>
              <textarea
                rows={3}
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                className="w-full px-3.5 py-2.5 rounded-xl border border-cream-300 bg-cream-50 text-xs sm:text-sm"
              />
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full py-4 rounded-full bg-maroon-800 hover:bg-maroon-900 text-white font-bold text-sm sm:text-base shadow-lg transition-all"
            >
              {loading ? 'Submitting Form...' : dict.volunteer.submit}
            </button>
          </form>
        )}
      </section>
    </div>
  );
}
