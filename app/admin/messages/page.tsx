'use client';

import React, { useState, useEffect } from 'react';
import { Mail, Phone, Calendar, Trash2, CheckCircle2, MessageSquare, StickyNote, Save } from 'lucide-react';
import { getContactMessages, updateContactMessage, deleteContactMessage } from '@/lib/firestoreService';

export default function AdminMessagesPage() {
  const [messages, setMessages] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [editingNotes, setEditingNotes] = useState<{ [id: string]: string }>({});
  const [savingNoteId, setSavingNoteId] = useState<string | null>(null);

  const fetchMessages = async () => {
    try {
      const data = await getContactMessages();
      if (Array.isArray(data)) {
        setMessages(data);
        const notesMap: { [id: string]: string } = {};
        data.forEach((m) => {
          const id = m._id || m.id;
          notesMap[id] = m.adminNote || '';
        });
        setEditingNotes(notesMap);
      }
    } catch (err) {
      console.error('Failed to load contact messages:', err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchMessages();
  }, []);

  const handleSaveNote = async (id: string) => {
    setSavingNoteId(id);
    try {
      await updateContactMessage(id, {
        adminNote: editingNotes[id] || '',
      });
      await fetchMessages();
    } catch (err: any) {
      alert('Failed to save note: ' + (err?.message || 'Unknown error'));
    } finally {
      setSavingNoteId(null);
    }
  };

  const handleToggleStatus = async (id: string, currentStatus: string) => {
    const nextStatus = currentStatus === 'resolved' ? 'unread' : 'resolved';
    try {
      await updateContactMessage(id, { status: nextStatus });
      await fetchMessages();
    } catch (err: any) {
      alert('Failed to update status: ' + (err?.message || 'Unknown error'));
    }
  };

  const handleDelete = async (id: string, senderName: string) => {
    if (!window.confirm(`Delete message from "${senderName}"? This cannot be undone.`)) {
      return;
    }
    try {
      await deleteContactMessage(id);
      await fetchMessages();
    } catch (err: any) {
      alert('Failed to delete message: ' + (err?.message || 'Unknown error'));
    }
  };

  return (
    <div className="space-y-6">
      <div className="bg-white p-6 rounded-3xl border border-cream-300 shadow-soft">
        <h1 className="text-2xl font-serif font-bold text-maroon-900">Contact Form Messages</h1>
        <p className="text-xs text-gray-500">
          Messages received from website contact form with note-taking and resolution tracker.
        </p>
      </div>

      <div className="space-y-4">
        {loading ? (
          <div className="bg-white p-8 rounded-3xl border border-cream-300 text-center text-xs text-gray-500">
            Loading messages...
          </div>
        ) : messages.length === 0 ? (
          <div className="bg-white p-8 rounded-3xl border border-cream-300 text-center text-xs text-gray-500 space-y-2">
            <MessageSquare className="w-8 h-8 text-gray-300 mx-auto" />
            <p className="font-semibold text-gray-600">No contact messages received yet.</p>
            <p className="text-[11px] text-gray-400">New submissions from the /contact page will appear here instantly.</p>
          </div>
        ) : (
          messages.map((item) => {
            const id = item._id || item.id;
            const isResolved = item.status === 'resolved';

            return (
              <div
                key={id}
                className={`p-6 rounded-3xl bg-white border transition-all space-y-4 text-xs ${
                  isResolved ? 'border-cream-200 opacity-80' : 'border-cream-300 shadow-soft'
                }`}
              >
                {/* Header row */}
                <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-2 border-b border-cream-200 pb-3">
                  <div className="space-y-0.5">
                    <div className="flex items-center gap-2">
                      <span className="font-bold text-maroon-900 text-sm">{item.name || 'Anonymous'}</span>
                      <span
                        className={`px-2 py-0.5 rounded-full text-[10px] font-bold ${
                          isResolved ? 'bg-forest-100 text-forest-800' : 'bg-saffron-100 text-saffron-800'
                        }`}
                      >
                        {isResolved ? 'Resolved' : 'New / Unread'}
                      </span>
                    </div>
                    {item.subject && (
                      <p className="font-medium text-gray-700">Subject: {item.subject}</p>
                    )}
                  </div>

                  <div className="flex items-center gap-2">
                    <button
                      type="button"
                      onClick={() => handleToggleStatus(id, item.status)}
                      className={`inline-flex items-center gap-1 px-3 py-1.5 rounded-lg font-semibold transition-colors ${
                        isResolved
                          ? 'bg-cream-100 text-gray-700 hover:bg-cream-200'
                          : 'bg-forest-50 text-forest-700 hover:bg-forest-100'
                      }`}
                    >
                      <CheckCircle2 className="w-3.5 h-3.5" />
                      <span>{isResolved ? 'Mark Unread' : 'Mark Resolved'}</span>
                    </button>
                    <button
                      type="button"
                      onClick={() => handleDelete(id, item.name)}
                      className="inline-flex items-center gap-1 px-3 py-1.5 rounded-lg bg-red-50 text-red-700 font-semibold hover:bg-red-100 transition-colors"
                    >
                      <Trash2 className="w-3.5 h-3.5" />
                      <span>Delete</span>
                    </button>
                  </div>
                </div>

                {/* Contact info metadata */}
                <div className="flex flex-wrap items-center gap-4 text-gray-600 bg-cream-50 p-3 rounded-xl border border-cream-200">
                  <div className="flex items-center gap-1.5">
                    <Mail className="w-3.5 h-3.5 text-saffron-600" />
                    <a href={`mailto:${item.email}`} className="hover:underline font-medium text-maroon-900">
                      {item.email}
                    </a>
                  </div>
                  {item.phone && (
                    <div className="flex items-center gap-1.5">
                      <Phone className="w-3.5 h-3.5 text-forest-700" />
                      <a href={`tel:${item.phone}`} className="hover:underline">
                        {item.phone}
                      </a>
                    </div>
                  )}
                  {item.createdAt && (
                    <div className="flex items-center gap-1.5 text-gray-400 text-[11px] ml-auto">
                      <Calendar className="w-3.5 h-3.5" />
                      <span>{new Date(item.createdAt).toLocaleString('en-IN')}</span>
                    </div>
                  )}
                </div>

                {/* Message body */}
                <div className="space-y-1">
                  <label className="font-bold text-gray-700 block text-[11px] uppercase tracking-wider">
                    Message:
                  </label>
                  <p className="p-3.5 rounded-xl bg-cream-50 text-gray-800 whitespace-pre-wrap leading-relaxed border border-cream-200">
                    {item.message}
                  </p>
                </div>

                {/* Admin Note Section */}
                <div className="pt-2 border-t border-cream-200 space-y-2">
                  <label className="flex items-center gap-1.5 font-bold text-maroon-900 text-xs">
                    <StickyNote className="w-3.5 h-3.5 text-saffron-600" />
                    <span>Admin Internal Note:</span>
                  </label>
                  <div className="flex flex-col sm:flex-row gap-2">
                    <input
                      type="text"
                      placeholder="e.g. Called donor on 19 Nov, invited to samiti office..."
                      value={editingNotes[id] ?? ''}
                      onChange={(e) =>
                        setEditingNotes((prev) => ({ ...prev, [id]: e.target.value }))
                      }
                      className="flex-1 px-3 py-2 rounded-xl border border-cream-300 bg-cream-50 text-xs focus:ring-2 focus:ring-saffron-500"
                    />
                    <button
                      type="button"
                      disabled={savingNoteId === id}
                      onClick={() => handleSaveNote(id)}
                      className="px-4 py-2 rounded-xl bg-saffron-600 hover:bg-saffron-700 text-white font-bold text-xs shadow flex items-center justify-center gap-1.5 disabled:opacity-60"
                    >
                      <Save className="w-3.5 h-3.5" />
                      <span>{savingNoteId === id ? 'Saving...' : 'Save Note'}</span>
                    </button>
                  </div>
                </div>
              </div>
            );
          })
        )}
      </div>
    </div>
  );
}
