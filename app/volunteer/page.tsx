'use client';

import React, { useState } from 'react';
import { useLanguage } from '@/components/layout/LanguageContext';
import { Users, CheckCircle2, ShieldCheck, Sun } from 'lucide-react';

export default function VolunteerPage() {
  const { lang, dict } = useLanguage();

  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [city, setCity] = useState('');
  const [age, setAge] = useState('');
  const [skills, setSkills] = useState('');
  const [selectedAreas, setSelectedAreas] = useState<string[]>([]);
  const [availability, setAvailability] = useState('');
  const [message, setMessage] = useState('');

  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);

  const areasList = [
    { id: 'स्वच्छता अभियान', labelHi: '🧹 स्वच्छता अभियान', labelEn: 'Swachhata Drive' },
    { id: 'सामाजिक शिक्षा', labelHi: '📚 सामाजिक शिक्षा', labelEn: 'Social Education' },
    { id: 'भ्रष्टाचार जागरूकता', labelHi: '⚖️ भ्रष्टाचार जागरूकता', labelEn: 'Anti-Corruption Awareness' },
    { id: 'सहायता सेवा', labelHi: '🤝 सहायता सेवा', labelEn: 'Community Assistance' },
    { id: 'Events', labelHi: '📅 कार्यक्रम आयोजन (Events)', labelEn: 'Event Management' },
    { id: 'Community Work', labelHi: '🏘️ सामुदायिक विकास कार्य', labelEn: 'Community Work' },
    { id: 'Other', labelHi: 'अन्य क्षेत्र', labelEn: 'Other Areas' },
  ];

  const toggleArea = (areaId: string) => {
    setSelectedAreas((prev) =>
      prev.includes(areaId) ? prev.filter((a) => a !== areaId) : [...prev, areaId]
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
          age: age ? parseInt(age) : undefined,
          skills,
          areas: selectedAreas,
          availability,
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
      alert('Failed to submit application');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="space-y-16 py-12">
      {/* Header */}
      <section className="bg-gradient-to-r from-forest-800 via-forest-700 to-forest-800 text-cream-100 py-16 border-b-4 border-saffron-600">
        <div className="max-w-7xl mx-auto px-4 text-center space-y-4">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-forest-950 text-saffron-400 text-xs font-semibold border border-forest-600">
            <Users className="w-4 h-4" />
            <span>{dict.orgNameShort}</span>
          </div>
          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold font-serif text-cream-50">
            "{dict.volunteer.title}"
          </h1>
          <p className="text-sm sm:text-base text-cream-200 max-w-3xl mx-auto leading-relaxed">
            {dict.volunteer.sub}
          </p>
        </div>
      </section>

      {/* Form Container */}
      <section className="max-w-4xl mx-auto px-4">
        {success ? (
          <div className="p-8 sm:p-12 rounded-3xl bg-white border-2 border-forest-600 shadow-2xl text-center space-y-6">
            <div className="w-16 h-16 rounded-full bg-forest-100 text-forest-700 mx-auto flex items-center justify-center">
              <CheckCircle2 className="w-10 h-10" />
            </div>
            <h2 className="text-2xl font-serif font-bold text-forest-800">
              {lang === 'hi' ? 'पंजीयन सफलतापूर्वक जमा हुआ!' : 'Registration Submitted Successfully!'}
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
              className="px-8 py-3 rounded-full bg-forest-800 text-white font-bold text-xs shadow"
            >
              {lang === 'hi' ? 'दूसरा फॉर्म भरें' : 'Submit Another Form'}
            </button>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="p-8 sm:p-12 rounded-3xl bg-white border border-cream-300 shadow-soft space-y-8">
            <h2 className="text-2xl font-serif font-bold text-forest-800 border-b border-cream-300 pb-4">
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
                  className="w-full px-3.5 py-2.5 rounded-xl border border-cream-300 bg-cream-50 focus:ring-2 focus:ring-saffron-500"
                />
              </div>

              <div>
                <label className="block font-medium text-gray-700 mb-1">{dict.volunteer.email} *</label>
                <input
                  type="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full px-3.5 py-2.5 rounded-xl border border-cream-300 bg-cream-50 focus:ring-2 focus:ring-saffron-500"
                />
              </div>

              <div>
                <label className="block font-medium text-gray-700 mb-1">{dict.volunteer.phone} *</label>
                <input
                  type="tel"
                  required
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  className="w-full px-3.5 py-2.5 rounded-xl border border-cream-300 bg-cream-50 focus:ring-2 focus:ring-saffron-500"
                />
              </div>

              <div>
                <label className="block font-medium text-gray-700 mb-1">{dict.volunteer.city} *</label>
                <input
                  type="text"
                  required
                  value={city}
                  onChange={(e) => setCity(e.target.value)}
                  className="w-full px-3.5 py-2.5 rounded-xl border border-cream-300 bg-cream-50 focus:ring-2 focus:ring-saffron-500"
                />
              </div>

              <div>
                <label className="block font-medium text-gray-700 mb-1">{dict.volunteer.age}</label>
                <input
                  type="number"
                  placeholder="e.g. 55"
                  value={age}
                  onChange={(e) => setAge(e.target.value)}
                  className="w-full px-3.5 py-2.5 rounded-xl border border-cream-300 bg-cream-50 focus:ring-2 focus:ring-saffron-500"
                />
              </div>

              <div>
                <label className="block font-medium text-gray-700 mb-1">{dict.volunteer.availability}</label>
                <input
                  type="text"
                  placeholder="e.g. 4 Hours / Week"
                  value={availability}
                  onChange={(e) => setAvailability(e.target.value)}
                  className="w-full px-3.5 py-2.5 rounded-xl border border-cream-300 bg-cream-50 focus:ring-2 focus:ring-saffron-500"
                />
              </div>
            </div>

            <div>
              <label className="block font-medium text-gray-700 mb-1 text-xs sm:text-sm">{dict.volunteer.skills}</label>
              <input
                type="text"
                placeholder={lang === 'hi' ? 'उदा. सेवानिवृत्त अधिकारी, सामाजिक कार्यकर्ता, डॉक्टर, शिक्षक' : 'e.g. Retd. Officer, Social Worker, Teacher, Doctor'}
                value={skills}
                onChange={(e) => setSkills(e.target.value)}
                className="w-full px-3.5 py-2.5 rounded-xl border border-cream-300 bg-cream-50 text-xs sm:text-sm focus:ring-2 focus:ring-saffron-500"
              />
            </div>

            {/* Areas Checkbox */}
            <div className="space-y-3">
              <label className="block font-medium text-gray-700 text-xs sm:text-sm">{dict.volunteer.areas}:</label>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-2.5">
                {areasList.map((item) => {
                  const isChecked = selectedAreas.includes(item.id);
                  return (
                    <button
                      key={item.id}
                      type="button"
                      onClick={() => toggleArea(item.id)}
                      className={`p-3 rounded-xl border text-xs font-semibold text-left transition-all ${
                        isChecked
                          ? 'bg-forest-800 text-cream-50 border-forest-800 shadow-sm'
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
              className="w-full py-4 rounded-full bg-forest-800 hover:bg-forest-900 text-white font-bold text-sm sm:text-base shadow-lg transition-all"
            >
              {loading ? 'Submitting Form...' : dict.volunteer.submit}
            </button>
          </form>
        )}
      </section>
    </div>
  );
}
