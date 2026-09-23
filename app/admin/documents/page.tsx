'use client';

import React, { useState, useEffect } from 'react';
import { Plus, FileText, Download, Trash2 } from 'lucide-react';

export default function AdminDocumentsPage() {
  const [docs, setDocs] = useState<any[]>([]);
  const [titleHi, setTitleHi] = useState('');
  const [titleEn, setTitleEn] = useState('');
  const [category, setCategory] = useState('Registration');
  const [fileUrl, setFileUrl] = useState('/docs/registration-052-2016-2017.pdf');

  const fetchDocs = () => {
    fetch('/api/documents')
      .then((res) => res.json())
      .then((data) => {
        if (Array.isArray(data)) setDocs(data);
      })
      .catch((err) => console.error(err));
  };

  useEffect(() => {
    fetchDocs();
  }, []);

  const handleAdd = async (e: React.FormEvent) => {
    e.preventDefault();
    await fetch('/api/documents', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        title: { hi: titleHi, en: titleEn },
        category,
        fileUrl,
        uploadDate: new Date().toLocaleDateString('en-IN'),
      }),
    });
    setTitleHi('');
    setTitleEn('');
    fetchDocs();
  };

  return (
    <div className="space-y-6">
      <div className="bg-white p-6 rounded-3xl border border-cream-300 shadow-soft">
        <h1 className="text-2xl font-serif font-bold text-maroon-900">Legal Documents CMS</h1>
        <p className="text-xs text-gray-500">Upload official registration certificates & annual reports</p>
      </div>

      {/* Add Document Form */}
      <form onSubmit={handleAdd} className="p-6 rounded-3xl bg-white border border-cream-300 shadow-soft space-y-4 text-xs">
        <h3 className="font-serif font-bold text-sm text-maroon-900">Add New Document Record</h3>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div>
            <label className="block font-medium text-gray-700 mb-1">Title (Hindi) *</label>
            <input
              type="text"
              required
              placeholder="उदा. संस्था पंजीकरण प्रमाण पत्र"
              value={titleHi}
              onChange={(e) => setTitleHi(e.target.value)}
              className="w-full px-3 py-2 rounded-xl border border-cream-300 bg-cream-50"
            />
          </div>
          <div>
            <label className="block font-medium text-gray-700 mb-1">Title (English) *</label>
            <input
              type="text"
              required
              placeholder="e.g. Society Registration Certificate"
              value={titleEn}
              onChange={(e) => setTitleEn(e.target.value)}
              className="w-full px-3 py-2 rounded-xl border border-cream-300 bg-cream-50"
            />
          </div>
          <div>
            <label className="block font-medium text-gray-700 mb-1">Category</label>
            <select
              value={category}
              onChange={(e) => setCategory(e.target.value)}
              className="w-full px-3 py-2 rounded-xl border border-cream-300 bg-cream-50"
            >
              <option value="Registration">Registration</option>
              <option value="Annual Report">Annual Report</option>
              <option value="Financial Report">Financial Report</option>
              <option value="Certificate">Certificate</option>
              <option value="Brochure">Brochure</option>
            </select>
          </div>
          <div>
            <label className="block font-medium text-gray-700 mb-1">File URL / PDF Path</label>
            <input
              type="text"
              value={fileUrl}
              onChange={(e) => setFileUrl(e.target.value)}
              className="w-full px-3 py-2 rounded-xl border border-cream-300 bg-cream-50"
            />
          </div>
        </div>
        <button
          type="submit"
          className="px-5 py-2.5 rounded-xl bg-saffron-600 text-white font-bold text-xs shadow flex items-center gap-1.5"
        >
          <Plus className="w-4 h-4" />
          <span>Save Document Record</span>
        </button>
      </form>

      {/* Docs List */}
      <div className="bg-white rounded-3xl border border-cream-300 p-6 shadow-soft space-y-4">
        <div className="divide-y divide-cream-200">
          {docs.map((d) => (
            <div key={d._id} className="py-3 flex justify-between items-center text-xs">
              <div>
                <span className="font-bold text-maroon-900 block">{d.title.hi} / {d.title.en}</span>
                <span className="text-gray-500">{d.category} • Date: {d.uploadDate}</span>
              </div>
              <a
                href={d.fileUrl}
                target="_blank"
                rel="noreferrer"
                className="px-3 py-1.5 rounded-lg bg-cream-100 text-maroon-900 font-bold flex items-center gap-1"
              >
                <Download className="w-3.5 h-3.5" />
                <span>Download</span>
              </a>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
