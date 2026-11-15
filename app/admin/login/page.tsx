'use client';

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import { Leaf, Lock, Mail, ArrowRight, AlertCircle } from 'lucide-react';
import { signInWithEmailAndPassword } from 'firebase/auth';
import { auth, isFirebaseConfigured } from '@/lib/firebase';

export default function AdminLoginPage() {
  const router = useRouter();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    try {
      if (!isFirebaseConfigured || !auth) {
        throw new Error('Firebase Authentication is not configured. Please set your Firebase credentials in .env.local.');
      }

      // Strictly authenticate via Firebase Authentication
      await signInWithEmailAndPassword(auth, email.trim(), password);
      router.push('/admin/');
    } catch (authError: any) {
      console.error('Firebase Login Error:', authError);
      if (
        authError.code === 'auth/invalid-credential' ||
        authError.code === 'auth/user-not-found' ||
        authError.code === 'auth/wrong-password'
      ) {
        setError('Invalid credentials. Check your email and password registered in Firebase Console.');
      } else if (authError.code === 'auth/too-many-requests') {
        setError('Too many failed attempts. Please wait a moment and try again.');
      } else {
        setError(authError.message || 'Firebase authentication failed. Please verify credentials.');
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
          <div className="p-3 rounded-xl bg-red-50 text-red-700 text-xs font-semibold border border-red-200 flex items-start gap-2">
            <AlertCircle className="w-4 h-4 shrink-0 mt-0.5" />
            <span>{error}</span>
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
                placeholder="admin@vanprasthisamiti.org"
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
                placeholder="Enter admin password"
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
            <span>{loading ? 'Authenticating with Firebase...' : 'Sign In to Dashboard'}</span>
            <span className="btn-pill-icon">
              <ArrowRight className="w-4 h-4" />
            </span>
          </button>
        </form>
      </div>
    </div>
  );
}
