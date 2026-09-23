'use client';

import React, { useState } from 'react';
import { useLanguage } from '@/components/layout/LanguageContext';
import { Heart, CheckCircle2, Download } from 'lucide-react';
import { createPaymentOrder } from '@/lib/payment';

export default function DonatePage() {
  const { lang, dict } = useLanguage();

  const [purpose, setPurpose] = useState('General NGO Support');
  const [amount, setAmount] = useState<number>(1000);
  const [customAmount, setCustomAmount] = useState<string>('');
  const [donorName, setDonorName] = useState('');
  const [donorEmail, setDonorEmail] = useState('');
  const [donorPhone, setDonorPhone] = useState('');
  const [panNumber, setPanNumber] = useState('');
  const [address, setAddress] = useState('');
  const [isAnonymous, setIsAnonymous] = useState(false);

  const [loading, setLoading] = useState(false);
  const [receiptData, setReceiptData] = useState<any>(null);

  const donationPurposes = [
    { id: 'स्वच्छता अभियान', labelHi: '🧹 स्वच्छता अभियान', labelEn: 'Swachhata Cleanliness Drive' },
    { id: 'सामाजिक शिक्षा', labelHi: '📚 सामाजिक शिक्षा अभियान', labelEn: 'Social Education Drive' },
    { id: 'भ्रष्टाचार निवारण', labelHi: '⚖️ भ्रष्टाचार निवारण अभियान', labelEn: 'Anti-Corruption Drive' },
    { id: 'सहायता सेवा', labelHi: '🤝 सहायता सेवा अभियान', labelEn: 'Community Welfare Support' },
    { id: 'General NGO Support', labelHi: 'सामान्य संस्था कोष', labelEn: 'General NGO Fund' },
  ];

  const presetAmounts = [500, 1000, 5000, 10000];

  const finalAmount = customAmount ? parseFloat(customAmount) || 0 : amount;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!finalAmount || finalAmount < 1) {
      alert(lang === 'hi' ? 'कृपया वैध राशि चुनें।' : 'Please enter a valid amount.');
      return;
    }
    if (!donorName || !donorEmail || !donorPhone) {
      alert(lang === 'hi' ? 'कृपया आवश्यक जानकारी भरें।' : 'Please fill required fields.');
      return;
    }

    setLoading(true);
    try {
      const receiptId = `REC-${Date.now()}`;
      const order = await createPaymentOrder({
        amount: finalAmount,
        receiptId,
      });

      const res = await fetch('/api/donations', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          transactionId: order.id,
          amount: finalAmount,
          purpose,
          donorName,
          donorEmail,
          donorPhone,
          panNumber,
          address,
          isAnonymous,
          status: 'completed',
          paymentMode: order.isMock ? 'mock' : 'razorpay',
        }),
      });

      const data = await res.json();
      if (res.ok) {
        setReceiptData({
          transactionId: order.id,
          receiptNumber: receiptId,
          amount: finalAmount,
          purpose,
          donorName,
          donorEmail,
          donorPhone,
          panNumber,
          date: new Date().toLocaleDateString('en-IN'),
        });
      } else {
        alert(data.error || 'Donation failed');
      }
    } catch (err) {
      console.error(err);
      alert('Error processing donation');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="space-y-12 py-12">
      <section className="bg-gradient-to-r from-forest-800 via-forest-700 to-forest-800 text-cream-100 py-12 border-b-4 border-saffron-600">
        <div className="max-w-5xl mx-auto px-4 text-center space-y-3">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-forest-950 text-saffron-400 text-xs font-semibold border border-forest-600">
            <Heart className="w-4 h-4 fill-saffron-400" />
            <span>{dict.orgNameShort}</span>
          </div>
          <h1 className="text-3xl sm:text-4xl font-serif font-bold text-cream-50">
            {dict.donate.title}
          </h1>
          <p className="text-xs sm:text-sm text-cream-200 max-w-2xl mx-auto">
            {dict.donate.sub}
          </p>
        </div>
      </section>

      <section className="max-w-4xl mx-auto px-4">
        {receiptData ? (
          <div className="p-8 rounded-3xl bg-white border-2 border-forest-600 shadow-2xl space-y-6">
            <div className="text-center space-y-2 border-b border-cream-300 pb-6">
              <div className="w-16 h-16 rounded-full bg-forest-100 text-forest-700 mx-auto flex items-center justify-center">
                <CheckCircle2 className="w-10 h-10" />
              </div>
              <h2 className="text-2xl font-serif font-bold text-forest-800">
                {lang === 'hi' ? 'सहयोग रसीद' : 'Donation Receipt'}
              </h2>
            </div>

            <div className="bg-cream-50 p-6 rounded-2xl border border-cream-200 text-xs space-y-3">
              <div className="flex justify-between border-b border-cream-200 pb-2">
                <span className="text-gray-600">रसीद संख्या:</span>
                <span className="font-bold text-forest-800">{receiptData.receiptNumber}</span>
              </div>
              <div className="flex justify-between border-b border-cream-200 pb-2">
                <span className="text-gray-600">लेन-देन संख्या:</span>
                <span className="font-mono text-gray-800">{receiptData.transactionId}</span>
              </div>
              <div className="flex justify-between border-b border-cream-200 pb-2">
                <span className="text-gray-600">दान राशि:</span>
                <span className="font-bold text-base text-forest-700">₹{receiptData.amount.toLocaleString('en-IN')}</span>
              </div>
              <div className="flex justify-between border-b border-cream-200 pb-2">
                <span className="text-gray-600">उद्देश्य:</span>
                <span className="font-semibold text-gray-800">{receiptData.purpose}</span>
              </div>
              <div className="flex justify-between border-b border-cream-200 pb-2">
                <span className="text-gray-600">दाता का नाम:</span>
                <span className="font-semibold text-gray-800">{receiptData.donorName}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600">दिनांक:</span>
                <span className="text-gray-800">{receiptData.date}</span>
              </div>
            </div>

            <div className="flex justify-between items-center gap-4 pt-2">
              <button
                onClick={() => window.print()}
                className="px-6 py-2.5 rounded-xl bg-forest-800 hover:bg-forest-900 text-white text-xs font-bold flex items-center gap-2"
              >
                <Download className="w-4 h-4" />
                <span>{lang === 'hi' ? 'रसीद प्रिंट करें' : 'Print Receipt'}</span>
              </button>
              <button
                onClick={() => setReceiptData(null)}
                className="px-6 py-2.5 rounded-xl bg-cream-200 hover:bg-cream-300 text-gray-800 text-xs font-bold"
              >
                {lang === 'hi' ? 'पुनः सहयोग करें' : 'Donate Again'}
              </button>
            </div>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="p-8 sm:p-10 rounded-3xl bg-white border border-cream-300 shadow-soft space-y-8">
            <div className="space-y-3">
              <label className="block text-sm font-serif font-bold text-forest-800">
                1. {dict.donate.purposeSelect}
              </label>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
                {donationPurposes.map((item) => (
                  <button
                    key={item.id}
                    type="button"
                    onClick={() => setPurpose(item.id)}
                    className={`p-3 rounded-xl border text-xs font-semibold text-left transition-all ${
                      purpose === item.id
                        ? 'bg-forest-800 text-cream-50 border-forest-800 shadow-sm'
                        : 'bg-cream-50 text-gray-700 border-cream-300 hover:bg-cream-100'
                    }`}
                  >
                    {lang === 'hi' ? item.labelHi : item.labelEn}
                  </button>
                ))}
              </div>
            </div>

            <div className="space-y-3">
              <label className="block text-sm font-serif font-bold text-forest-800">
                2. {dict.donate.amountSelect}
              </label>
              <div className="flex flex-wrap gap-3">
                {presetAmounts.map((amt) => (
                  <button
                    key={amt}
                    type="button"
                    onClick={() => {
                      setAmount(amt);
                      setCustomAmount('');
                    }}
                    className={`px-5 py-2.5 rounded-full border text-xs sm:text-sm font-bold transition-all ${
                      amount === amt && !customAmount
                        ? 'bg-saffron-600 text-white border-saffron-600 shadow'
                        : 'bg-cream-50 text-gray-800 border-cream-300 hover:bg-cream-100'
                    }`}
                  >
                    ₹{amt.toLocaleString('en-IN')}
                  </button>
                ))}
              </div>

              <div className="pt-2">
                <input
                  type="number"
                  placeholder={dict.donate.customAmount}
                  value={customAmount}
                  onChange={(e) => setCustomAmount(e.target.value)}
                  className="w-full sm:w-64 px-4 py-2.5 rounded-xl border border-cream-300 bg-cream-50 text-xs sm:text-sm"
                />
              </div>
            </div>

            <div className="space-y-4 pt-4 border-t border-cream-200">
              <h3 className="text-sm font-serif font-bold text-forest-800">
                3. {dict.donate.donorInfo}
              </h3>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
                <div>
                  <label className="block font-medium text-gray-700 mb-1">{dict.donate.name} *</label>
                  <input
                    type="text"
                    required
                    value={donorName}
                    onChange={(e) => setDonorName(e.target.value)}
                    className="w-full px-3.5 py-2.5 rounded-xl border border-cream-300 bg-cream-50"
                  />
                </div>
                <div>
                  <label className="block font-medium text-gray-700 mb-1">{dict.donate.email} *</label>
                  <input
                    type="email"
                    required
                    value={donorEmail}
                    onChange={(e) => setDonorEmail(e.target.value)}
                    className="w-full px-3.5 py-2.5 rounded-xl border border-cream-300 bg-cream-50"
                  />
                </div>
                <div>
                  <label className="block font-medium text-gray-700 mb-1">{dict.donate.phone} *</label>
                  <input
                    type="tel"
                    required
                    value={donorPhone}
                    onChange={(e) => setDonorPhone(e.target.value)}
                    className="w-full px-3.5 py-2.5 rounded-xl border border-cream-300 bg-cream-50"
                  />
                </div>
                <div>
                  <label className="block font-medium text-gray-700 mb-1">{dict.donate.pan}</label>
                  <input
                    type="text"
                    placeholder="ABCDE1234F"
                    value={panNumber}
                    onChange={(e) => setPanNumber(e.target.value.toUpperCase())}
                    className="w-full px-3.5 py-2.5 rounded-xl border border-cream-300 bg-cream-50 uppercase"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-medium text-gray-700 mb-1">{dict.donate.address}</label>
                <input
                  type="text"
                  value={address}
                  onChange={(e) => setAddress(e.target.value)}
                  className="w-full px-3.5 py-2.5 rounded-xl border border-cream-300 bg-cream-50 text-xs"
                />
              </div>

              <div className="flex items-center gap-2 pt-1">
                <input
                  type="checkbox"
                  id="anonVan"
                  checked={isAnonymous}
                  onChange={(e) => setIsAnonymous(e.target.checked)}
                />
                <label htmlFor="anonVan" className="text-xs text-gray-700">
                  {dict.donate.anonymous}
                </label>
              </div>
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full py-4 rounded-full bg-gradient-to-r from-saffron-600 to-saffron-500 text-white font-bold text-sm sm:text-base shadow-lg transition-all flex items-center justify-center gap-2"
            >
              <Heart className="w-5 h-5 fill-white" />
              <span>{loading ? 'Processing...' : `${dict.donate.proceed} (₹${finalAmount.toLocaleString('en-IN')})`}</span>
            </button>
          </form>
        )}
      </section>
    </div>
  );
}
