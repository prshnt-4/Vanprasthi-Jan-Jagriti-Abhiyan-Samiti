'use client';

import React, { useState, useEffect } from 'react';
import { Users, CheckCircle, XCircle, Trash2 } from 'lucide-react';
import { getVolunteers, updateVolunteerStatus, deleteVolunteer, VolunteerItem } from '@/lib/firestoreService';

export default function AdminVolunteersPage() {
  const [volunteers, setVolunteers] = useState<VolunteerItem[]>([]);

  const fetchVolunteers = async () => {
    try {
      const data = await getVolunteers();
      setVolunteers(data);
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => {
    fetchVolunteers();
  }, []);

  const updateStatus = async (id: string, status: 'pending' | 'approved' | 'rejected') => {
    await updateVolunteerStatus(id, status);
    fetchVolunteers();
  };

  const deleteVol = async (id: string) => {
    if (confirm('Delete volunteer application?')) {
      await deleteVolunteer(id);
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
                <th className="p-3">Email & Phone</th>
                <th className="p-3">City / Occupation</th>
                <th className="p-3">Interest Areas</th>
                <th className="p-3">Status</th>
                <th className="p-3 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-cream-200">
              {volunteers.length === 0 ? (
                <tr>
                  <td colSpan={6} className="p-4 text-center text-gray-500">
                    No volunteer applications received yet.
                  </td>
                </tr>
              ) : (
                volunteers.map((v) => (
                  <tr key={v._id || v.id} className="hover:bg-cream-50">
                    <td className="p-3 font-bold text-maroon-900">{v.name}</td>
                    <td className="p-3 text-gray-600">
                      <div>{v.email}</div>
                      <div className="text-[10px] text-gray-400">{v.phone}</div>
                    </td>
                    <td className="p-3 text-gray-600">{v.city || '—'} / {v.occupation || '—'}</td>
                    <td className="p-3 text-gray-600">
                      {v.interestAreas && v.interestAreas.length > 0
                        ? v.interestAreas.join(', ')
                        : 'General Social Service'}
                    </td>
                    <td className="p-3">
                      <span
                        className={`px-2 py-0.5 rounded-full text-[10px] font-bold ${
                          v.status === 'approved'
                            ? 'bg-emerald-100 text-emerald-800'
                            : v.status === 'rejected'
                            ? 'bg-rose-100 text-rose-800'
                            : 'bg-amber-100 text-amber-800'
                        }`}
                      >
                        {v.status.toUpperCase()}
                      </span>
                    </td>
                    <td className="p-3 text-right space-x-2">
                      <button
                        onClick={() => updateStatus(v._id || v.id!, 'approved')}
                        className="text-emerald-700 hover:text-emerald-900"
                        title="Approve"
                      >
                        <CheckCircle className="w-4 h-4 inline" />
                      </button>
                      <button
                        onClick={() => updateStatus(v._id || v.id!, 'rejected')}
                        className="text-rose-700 hover:text-rose-900"
                        title="Reject"
                      >
                        <XCircle className="w-4 h-4 inline" />
                      </button>
                      <button
                        onClick={() => deleteVol(v._id || v.id!)}
                        className="text-gray-400 hover:text-red-700"
                        title="Delete"
                      >
                        <Trash2 className="w-4 h-4 inline" />
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
