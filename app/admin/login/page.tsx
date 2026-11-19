'use client';

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import { signInWithEmailAndPassword } from 'firebase/auth';
import { auth, isFirebaseConfigured } from '@/lib/firebase';
import { Leaf, Lock, Mail, ArrowRight } from 'lucide-react';

export default function AdminLoginPage() {
  const router = useRouter();
  const [email, setEmail] = useState('admin@vanprasthisamiti.org');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    if (!isFirebaseConfigured || !auth) {
      setError('Firebase is not configured. Please set Firebase environment variables in .env.local');
      setLoading(false);
      return;
    }

    try {
      await signInWithEmailAndPassword(auth, email, password);
      router.push('/admin');
    } catch (err: any) {
      if (err?.code === 'auth/invalid-credential' || err?.code === 'auth/wrong-password') {
        setError('Invalid email or password.');
      } else if (err?.code === 'auth/user-not-found') {
        setError('No admin account found with this email.');
      } else if (err?.code === 'auth/too-many-requests') {
        setError('Too many failed attempts. Please try again later.');
      } else {
        setError(err?.message || 'Login failed. Please try again.');
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen hero-mesh flex items-center justify-center p-4 relative">
      <div className="absolute inset-0 opacity-15 bg-[url('https://images.unsplash.com/photo-1464226184884-fa280b87f399?auto=format&fit=crop&w=1200&q=80')] bg-cover bg-center mix-blend-overlay pointer-events-none" />

      <div className="max-w-md w-full bg-white/95 backdrop-blur-md rounded-3xl p-8 border border-forest-200 shadow-hero space-y-6 relative z-10">
        <div className="text-center space-y-2">
          <div className="w-12 h-12 rounded-full bg-forest-800 text-gold-400 mx-auto flex items-center justify-center shadow">
            <Leaf className="w-6 h-6" />
          </div>
          <h1 className="text-2xl font-serif font-bold text-forest-900">Admin CMS Login</h1>
          <p className="text-xs text-gray-600">Vanprasthi Jan-Jagriti Abhiyan Samiti, Roorkee</p>
        </div>

        {error && (
          <div className="p-3 rounded-xl bg-red-50 text-red-700 text-xs font-semibold border border-red-200">
            {error}
          </div>
        )}

        <form onSubmit={handleLogin} className="space-y-4 text-xs">
          <div>
            <label className="block font-medium text-gray-700 mb-1">Admin Email</label>
            <div className="relative">
              <Mail className="w-4 h-4 text-gray-400 absolute left-3 top-3" />
              <input
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full pl-9 pr-3.5 py-2.5 rounded-xl border border-forest-200 bg-white focus:ring-2 focus:ring-gold-500"
              />
            </div>
          </div>

          <div>
            <label className="block font-medium text-gray-700 mb-1">Password</label>
            <div className="relative">
              <Lock className="w-4 h-4 text-gray-400 absolute left-3 top-3" />
              <input
                type="password"
                required
                placeholder="Enter password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full pl-9 pr-3.5 py-2.5 rounded-xl border border-forest-200 bg-white focus:ring-2 focus:ring-gold-500"
              />
            </div>
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full btn-pill-primary justify-center text-xs disabled:opacity-60"
          >
            <span>{loading ? 'Authenticating...' : 'Sign In to Dashboard'}</span>
            <span className="btn-pill-icon">
              <ArrowRight className="w-4 h-4" />
            </span>
          </button>
        </form>
      </div>
    </div>
  );
}
