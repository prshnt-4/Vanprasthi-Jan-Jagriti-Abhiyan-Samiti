'use client';

import React, { useState, useEffect } from 'react';
import { Save, AlertTriangle } from 'lucide-react';

export default function AdminImpactPage() {
  const [metrics, setMetrics] = useState<any[]>([]);
  const [savedMsg, setSavedMsg] = useState('');

  useEffect(() => {
    fetch('/api/impact')
      .then((res) => res.json())
      .then((data) => {
        if (Array.isArray(data)) setMetrics(data);
      })
      .catch((err) => console.error(err));
  }, []);

  const handleChange = (id: string, field: string, val: any) => {
    setMetrics((prev) =>
      prev.map((m) => {
        if (m._id === id) {
          if (field.startsWith('label.')) {
            const lang = field.split('.')[1];
            return { ...m, label: { ...m.label, [lang]: val } };
          }
          if (field.startsWith('desc.')) {
            const lang = field.split('.')[1];
            return { ...m, description: { ...m.description, [lang]: val } };
          }
          return { ...m, [field]: val };
        }
        return m;
      })
    );
  };

  const handleSave = async () => {
    setSavedMsg('');
    try {
      const res = await fetch('/api/impact', {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(metrics),
      });
      if (res.ok) {
        setSavedMsg('Metrics updated successfully!');
      }
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 bg-white p-6 rounded-3xl border border-cream-300 shadow-soft">
        <div>
          <h1 className="text-2xl font-serif font-bold text-maroon-900">Impact Metrics CMS</h1>
          <p className="text-xs text-gray-500">
            Strict Zero-Invention Policy: Set verified numbers or use "—" as placeholder
          </p>
        </div>
        <button
          onClick={handleSave}
          className="px-6 py-2.5 rounded-xl bg-saffron-600 hover:bg-saffron-700 text-white font-bold text-xs shadow flex items-center gap-2"
        >
          <Save className="w-4 h-4" />
          <span>Save Metrics</span>
        </button>
      </div>

      {savedMsg && (
        <div className="p-3 rounded-xl bg-forest-50 text-forest-800 text-xs font-bold border border-forest-200">
          {savedMsg}
        </div>
      )}

      <div className="space-y-4">
        {metrics.map((m) => (
          <div key={m._id} className="p-6 rounded-3xl bg-white border border-cream-300 shadow-soft space-y-4 text-xs">
            <div className="flex justify-between items-center border-b border-cream-200 pb-2">
              <span className="font-bold text-maroon-900 text-sm">Metric ID: {m.metricId}</span>
              <label className="flex items-center gap-2 text-gray-600">
                <input
                  type="checkbox"
                  checked={m.isVisible}
                  onChange={(e) => handleChange(m._id, 'isVisible', e.target.checked)}
                />
                Visible on Public Site
              </label>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              <div>
                <label className="block font-bold text-gray-700 mb-1">Value (e.g. "—" or "150")</label>
                <input
                  type="text"
                  value={m.value}
                  onChange={(e) => handleChange(m._id, 'value', e.target.value)}
                  className="w-full px-3 py-2 rounded-xl border border-cream-300 bg-cream-50 font-mono font-bold text-sm"
                />
              </div>

              <div>
                <label className="block font-bold text-gray-700 mb-1">Label (English)</label>
                <input
                  type="text"
                  value={m.label.en}
                  onChange={(e) => handleChange(m._id, 'label.en', e.target.value)}
                  className="w-full px-3 py-2 rounded-xl border border-cream-300 bg-cream-50"
                />
              </div>

              <div>
                <label className="block font-bold text-gray-700 mb-1">Label (Hindi)</label>
                <input
                  type="text"
                  value={m.label.hi}
                  onChange={(e) => handleChange(m._id, 'label.hi', e.target.value)}
                  className="w-full px-3 py-2 rounded-xl border border-cream-300 bg-cream-50 font-serif"
                />
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
