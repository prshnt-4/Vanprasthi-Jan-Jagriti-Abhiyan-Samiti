'use client';

import React, { useState, useEffect } from 'react';
import { Plus, FileText, Download } from 'lucide-react';
import { getLegalDocuments, addLegalDocument, DocumentItem } from '@/lib/firestoreService';

export default function AdminDocumentsPage() {
  const [docs, setDocs] = useState<DocumentItem[]>([]);
  const [titleHi, setTitleHi] = useState('');
  const [titleEn, setTitleEn] = useState('');
  const [category, setCategory] = useState('Registration');
  const [fileUrl, setFileUrl] = useState('/docs/registration-052-2016-2017.pdf');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const fetchDocs = async () => {
    try {
      const data = await getLegalDocuments();
      setDocs(data);
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => {
    fetchDocs();
  }, []);

  const handleAdd = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError('');
    try {
      await addLegalDocument({
        title: { hi: titleHi, en: titleEn },
        category,
        fileUrl,
        uploadDate: new Date().toLocaleDateString('en-IN'),
      });
      setTitleHi('');
      setTitleEn('');
      await fetchDocs();
    } catch (err: any) {
      console.error('Failed to add document:', err);
      setError(err?.message || 'Failed to add document. Check Firestore rules & Firebase config.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="space-y-6">
      <div className="bg-white p-6 rounded-3xl border border-cream-300 shadow-soft">
        <h1 className="text-2xl font-serif font-bold text-maroon-900">Legal Documents CMS</h1>
        <p className="text-xs text-gray-500">Upload official registration certificates & annual reports</p>
      </div>

      <form onSubmit={handleAdd} className="p-6 rounded-3xl bg-white border border-cream-300 shadow-soft space-y-4 text-xs">
        <h3 className="font-serif font-bold text-sm text-maroon-900">Add Legal Document</h3>
        {error && (
          <div className="p-3 rounded-xl bg-red-50 border border-red-200 text-red-700 text-xs font-medium">
            ⚠️ {error}
          </div>
        )}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div>
            <label className="block font-medium text-gray-700 mb-1">Title (Hindi) *</label>
            <input
              type="text"
              required
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
              value={titleEn}
              onChange={(e) => setTitleEn(e.target.value)}
              className="w-full px-3 py-2 rounded-xl border border-cream-300 bg-cream-50"
            />
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div>
            <label className="block font-medium text-gray-700 mb-1">Category</label>
            <select
              value={category}
              onChange={(e) => setCategory(e.target.value)}
              className="w-full px-3 py-2 rounded-xl border border-cream-300 bg-cream-50"
            >
              <option value="Registration">Registration Certificate</option>
              <option value="Audit">Audit & Financials</option>
              <option value="By-laws">By-laws & Constitution</option>
              <option value="Reports">Annual Activity Reports</option>
            </select>
          </div>
          <div>
            <label className="block font-medium text-gray-700 mb-1">Document Link / Path *</label>
            <input
              type="text"
              required
              value={fileUrl}
              onChange={(e) => setFileUrl(e.target.value)}
              placeholder="/docs/filename.pdf or https://..."
              className="w-full px-3 py-2 rounded-xl border border-cream-300 bg-cream-50"
            />
          </div>
        </div>

        <button
          type="submit"
          disabled={loading}
          className="px-5 py-2.5 rounded-xl bg-saffron-600 text-white font-bold text-xs shadow flex items-center gap-1.5 disabled:opacity-50"
        >
          <Plus className="w-4 h-4" />
          <span>{loading ? 'Adding Document...' : 'Add Document'}</span>
        </button>
      </form>

      <div className="bg-white rounded-3xl border border-cream-300 p-6 shadow-soft space-y-4">
        <div className="divide-y divide-cream-200">
          {docs.length === 0 ? (
            <p className="text-xs text-gray-500 py-3">No documents added yet.</p>
          ) : (
            docs.map((d) => (
              <div key={d._id || d.id} className="py-3 flex justify-between items-center text-xs">
                <div className="flex items-center gap-3">
                  <div className="p-2 rounded-lg bg-cream-100 text-maroon-900">
                    <FileText className="w-4 h-4" />
                  </div>
                  <div>
                    <span className="font-bold text-maroon-900 block">{d.title.hi} / {d.title.en}</span>
                    <span className="text-[10px] text-gray-500">{d.category} • Uploaded {d.uploadDate}</span>
                  </div>
                </div>
                <a
                  href={d.fileUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="p-2 rounded-lg hover:bg-cream-100 text-saffron-600 font-bold flex items-center gap-1"
                >
                  <Download className="w-4 h-4" />
                  <span>Download</span>
                </a>
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  );
}
