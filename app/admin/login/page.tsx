'use client';

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import { Sun, Lock, Mail, ArrowRight } from 'lucide-react';

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

    try {
      const res = await fetch('/api/auth/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password }),
      });

      const data = await res.json();
      if (res.ok && data.success) {
        router.push('/admin');
      } else {
        setError(data.error || 'Invalid credentials');
      }
    } catch (err: any) {
      setError('Connection failed. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-cream-100 flex items-center justify-center p-4">
      <div className="max-w-md w-full bg-white rounded-3xl p-8 border border-cream-300 shadow-xl space-y-6">
        <div className="text-center space-y-2">
          <div className="w-12 h-12 rounded-full bg-maroon-900 text-saffron-500 mx-auto flex items-center justify-center shadow">
            <Sun className="w-6 h-6 animate-pulse" />
          </div>
          <h1 className="text-2xl font-serif font-bold text-maroon-900">
            Admin CMS Login
          </h1>
          <p className="text-xs text-gray-600">
            Vanprasthi Jan-Jagriti Abhiyan Samiti, Roorkee
          </p>
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
                className="w-full pl-9 pr-3.5 py-2.5 rounded-xl border border-cream-300 bg-cream-50 focus:ring-2 focus:ring-saffron-500"
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
                placeholder="AdminPass@2026!"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full pl-9 pr-3.5 py-2.5 rounded-xl border border-cream-300 bg-cream-50 focus:ring-2 focus:ring-saffron-500"
              />
            </div>
          </div>

          <div className="p-3 rounded-xl bg-saffron-50 border border-saffron-200 text-[11px] text-saffron-800">
            <span className="font-bold">Initial Admin Credentials:</span><br />
            Email: <code className="bg-saffron-100 px-1 rounded">admin@vanprasthisamiti.org</code><br />
            Password: <code className="bg-saffron-100 px-1 rounded">AdminPass@2026!</code>
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full py-3.5 rounded-full bg-maroon-800 hover:bg-maroon-900 text-white font-bold text-xs shadow transition-all flex items-center justify-center gap-2"
          >
            <span>{loading ? 'Authenticating...' : 'Sign In to Dashboard'}</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </form>
      </div>
    </div>
  );
}
