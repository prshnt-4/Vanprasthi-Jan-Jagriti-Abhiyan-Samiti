'use client';

import React, { useState } from 'react';
import { ImagePlus, LoaderCircle } from 'lucide-react';

type ImageUploadFieldProps = {
  value: string;
  onChange: (url: string) => void;
};

export function ImageUploadField({ value, onChange }: ImageUploadFieldProps) {
  const [uploading, setUploading] = useState(false);
  const [error, setError] = useState('');

  const uploadImage = async (file?: File) => {
    if (!file) return;

    setError('');
    onChange('');
    setUploading(true);
    try {
      const formData = new FormData();
      formData.set('image', file);
      const response = await fetch('/api/uploads/images', {
        method: 'POST',
        body: formData,
      });
      const result = await response.json();

      if (!response.ok) {
        throw new Error(result.error || 'Image upload failed.');
      }

      onChange(result.url);
    } catch (uploadError) {
      setError(uploadError instanceof Error ? uploadError.message : 'Image upload failed.');
    } finally {
      setUploading(false);
    }
  };

  return (
    <div className="space-y-2">
      <label className="block font-medium text-gray-700 mb-1">Upload image from your device</label>
      <label className="inline-flex cursor-pointer items-center gap-2 rounded-xl border border-cream-300 bg-cream-50 px-4 py-2.5 font-semibold text-forest-800 hover:bg-cream-100">
        {uploading ? (
          <LoaderCircle className="h-4 w-4 animate-spin" />
        ) : (
          <ImagePlus className="h-4 w-4" />
        )}
        <span>{uploading ? 'Uploading image…' : 'Choose image'}</span>
        <input
          type="file"
          accept="image/jpeg,image/png,image/webp,image/gif"
          className="sr-only"
          disabled={uploading}
          onChange={(event) => {
            void uploadImage(event.target.files?.[0]);
            event.currentTarget.value = '';
          }}
        />
      </label>
      <p className="text-[11px] text-gray-500">JPEG, PNG, WebP or GIF. Maximum size: 8 MB.</p>
      {error && <p role="alert" className="text-xs font-medium text-red-700">{error}</p>}
      {value && (
        <div className="space-y-2">
          <img
            src={value}
            alt="Selected image preview"
            className="h-32 w-full rounded-xl border border-cream-300 object-cover sm:w-56"
          />
          <button
            type="button"
            onClick={() => onChange('')}
            className="text-xs font-semibold text-red-700 underline"
          >
            Remove image
          </button>
        </div>
      )}
    </div>
  );
}
