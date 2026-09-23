'use client';

import React, { useState, useEffect } from 'react';
import { Download, HeartHandshake } from 'lucide-react';

export default function AdminDonationsPage() {
  const [donations, setDonations] = useState<any[]>([]);
  const [search, setSearch] = useState('');

  useEffect(() => {
    fetch('/api/donations')
      .then((res) => res.json())
      .then((data) => {
        if (Array.isArray(data)) setDonations(data);
      })
      .catch((err) => console.error(err));
  }, []);

  const filtered = donations.filter(
    (d) =>
      d.donorName?.toLowerCase().includes(search.toLowerCase()) ||
      d.donorEmail?.toLowerCase().includes(search.toLowerCase()) ||
      d.purpose?.toLowerCase().includes(search.toLowerCase())
  );

  const exportCSV = () => {
    const headers = ['TxnID,Amount,Purpose,DonorName,DonorEmail,DonorPhone,PAN,Date'];
    const rows = donations.map((d) =>
      `"${d.transactionId}",${d.amount},"${d.purpose}","${d.donorName}","${d.donorEmail}","${d.donorPhone}","${d.panNumber || ''}","${new Date(d.createdAt).toLocaleDateString('en-IN')}"`
    );
    const csvContent = 'data:text/csv;charset=utf-8,' + [headers, ...rows].join('\n');
    const encodedUri = encodeURI(csvContent);
    const link = document.createElement('a');
    link.setAttribute('href', encodedUri);
    link.setAttribute('download', 'donations_report.csv');
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 bg-white p-6 rounded-3xl border border-cream-300 shadow-soft">
        <div>
          <h1 className="text-2xl font-serif font-bold text-maroon-900">Donations Management</h1>
          <p className="text-xs text-gray-500">View received contributions and tax receipt records</p>
        </div>
        <button
          onClick={exportCSV}
          className="px-4 py-2.5 rounded-xl bg-maroon-800 text-white font-bold text-xs shadow flex items-center gap-2"
        >
          <Download className="w-4 h-4" />
          <span>Export CSV Report</span>
        </button>
      </div>

      <div className="bg-white rounded-3xl border border-cream-300 p-6 space-y-4 shadow-soft">
        <input
          type="text"
          placeholder="Search donor name, email or purpose..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="w-full max-w-sm px-4 py-2 rounded-xl border border-cream-300 bg-cream-50 text-xs"
        />

        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead className="bg-cream-100 text-maroon-900 font-serif border-b border-cream-300">
              <tr>
                <th className="p-3">Txn ID</th>
                <th className="p-3">Amount</th>
                <th className="p-3">Purpose</th>
                <th className="p-3">Donor Name</th>
                <th className="p-3">Contact</th>
                <th className="p-3">PAN</th>
                <th className="p-3">Date</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-cream-200">
              {filtered.length === 0 ? (
                <tr>
                  <td colSpan={7} className="p-6 text-center text-gray-500">
                    No donation records found.
                  </td>
                </tr>
              ) : (
                filtered.map((d) => (
                  <tr key={d._id} className="hover:bg-cream-50">
                    <td className="p-3 font-mono text-gray-600">{d.transactionId}</td>
                    <td className="p-3 font-bold text-forest-700">₹{d.amount}</td>
                    <td className="p-3">{d.purpose}</td>
                    <td className="p-3 font-semibold text-maroon-900">{d.donorName}</td>
                    <td className="p-3 text-gray-600">{d.donorPhone}<br />{d.donorEmail}</td>
                    <td className="p-3 uppercase font-mono">{d.panNumber || '—'}</td>
                    <td className="p-3 text-gray-500">{new Date(d.createdAt).toLocaleDateString('en-IN')}</td>
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
