'use client';

import React, { useState } from 'react';
import { LoaderCircle, Trash2 } from 'lucide-react';

type DeleteCmsItemButtonProps = {
  endpoint: string;
  itemLabel: string;
  onDeleted: () => void;
};

export function DeleteCmsItemButton({
  endpoint,
  itemLabel,
  onDeleted,
}: DeleteCmsItemButtonProps) {
  const [deleting, setDeleting] = useState(false);
  const [error, setError] = useState('');

  const deleteItem = async () => {
    if (!window.confirm(`Delete "${itemLabel}"? This cannot be undone.`)) return;

    setDeleting(true);
    setError('');
    try {
      const response = await fetch(endpoint, { method: 'DELETE' });
      const result = await response.json();
      if (!response.ok) {
        throw new Error(result.error || 'Unable to delete this item.');
      }
      onDeleted();
    } catch (deleteError) {
      setError(deleteError instanceof Error ? deleteError.message : 'Unable to delete this item.');
    } finally {
      setDeleting(false);
    }
  };

  return (
    <div className="flex flex-col items-end gap-1">
      <button
        type="button"
        onClick={deleteItem}
        disabled={deleting}
        aria-label={`Delete ${itemLabel}`}
        className="inline-flex items-center gap-1.5 rounded-lg bg-red-50 px-3 py-1.5 font-semibold text-red-700 hover:bg-red-100 disabled:cursor-wait disabled:opacity-60"
      >
        {deleting ? <LoaderCircle className="h-4 w-4 animate-spin" /> : <Trash2 className="h-4 w-4" />}
        <span>{deleting ? 'Deleting…' : 'Delete'}</span>
      </button>
      {error && <p role="alert" className="max-w-48 text-right text-[11px] text-red-700">{error}</p>}
    </div>
  );
}
