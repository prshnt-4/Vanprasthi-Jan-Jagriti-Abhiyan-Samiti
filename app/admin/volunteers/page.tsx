'use client';

import React, { useState, useEffect } from 'react';
import { Users, CheckCircle, XCircle, Trash2 } from 'lucide-react';

export default function AdminVolunteersPage() {
  const [volunteers, setVolunteers] = useState<any[]>([]);

  const fetchVolunteers = () => {
    fetch('/api/volunteers')
      .then((res) => res.json())
      .then((data) => {
        if (Array.isArray(data)) setVolunteers(data);
      })
      .catch((err) => console.error(err));
  };

  useEffect(() => {
    fetchVolunteers();
  }, []);

  const updateStatus = async (id: string, status: string) => {
    await fetch(`/api/volunteers/${id}`, {
      method: 'PATCH',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ status }),
    });
    fetchVolunteers();
  };

  const deleteVol = async (id: string) => {
    if (confirm('Delete volunteer application?')) {
      await fetch(`/api/volunteers/${id}`, { method: 'DELETE' });
      fetchVolunteers();
    }
  };

  return (
    <div className="space-y-6">
      <div className="bg-white p-6 rounded-3xl border border-cream-300 shadow-soft">
        <h1 className="text-2xl font-serif font-bold text-maroon-900">Volunteer Applications</h1>
        <p className="text-xs text-gray-500">Review and approve volunteer registrations</p>
      </div>

      <div className="bg-white rounded-3xl border border-cream-300 p-6 space-y-4 shadow-soft">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead className="bg-cream-100 text-maroon-900 font-serif border-b border-cream-300">
              <tr>
                <th className="p-3">Applicant Name</th>
                <th className="p-3">Contact</th>
                <th className="p-3">City / Age</th>
                <th className="p-3">Areas of Interest</th>
                <th className="p-3">Status</th>
                <th className="p-3 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-cream-200">
              {volunteers.length === 0 ? (
                <tr>
                  <td colSpan={6} className="p-6 text-center text-gray-500">
                    No volunteer applications found.
                  </td>
                </tr>
              ) : (
                volunteers.map((v) => (
                  <tr key={v._id} className="hover:bg-cream-50">
                    <td className="p-3 font-bold text-maroon-900">{v.name}</td>
                    <td className="p-3 text-gray-600">{v.phone}<br />{v.email}</td>
                    <td className="p-3">{v.city} {v.age ? `(${v.age} yrs)` : ''}</td>
                    <td className="p-3 max-w-xs">{v.areas ? v.areas.join(', ') : '—'}</td>
                    <td className="p-3">
                      <span className={`px-2.5 py-1 rounded-full text-[10px] font-bold ${
                        v.status === 'approved'
                          ? 'bg-forest-100 text-forest-800'
                          : v.status === 'rejected'
                          ? 'bg-red-100 text-red-800'
                          : 'bg-saffron-100 text-saffron-800'
                      }`}>
                        {v.status}
                      </span>
                    </td>
                    <td className="p-3 text-right space-x-2">
                      <button
                        onClick={() => updateStatus(v._id, 'approved')}
                        title="Approve"
                        className="p-1 rounded bg-forest-50 text-forest-700 hover:bg-forest-100"
                      >
                        <CheckCircle className="w-4 h-4" />
                      </button>
                      <button
                        onClick={() => updateStatus(v._id, 'rejected')}
                        title="Reject"
                        className="p-1 rounded bg-red-50 text-red-700 hover:bg-red-100"
                      >
                        <XCircle className="w-4 h-4" />
                      </button>
                      <button
                        onClick={() => deleteVol(v._id)}
                        title="Delete"
                        className="p-1 rounded bg-gray-100 text-gray-600 hover:bg-gray-200"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
