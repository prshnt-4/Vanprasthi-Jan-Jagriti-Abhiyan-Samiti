'use client';

import React, { useState } from 'react';
import { ImagePlus, LoaderCircle, AlertCircle } from 'lucide-react';

type ImageUploadFieldProps = {
  value: string;
  onChange: (url: string) => void;
};

// Generates SHA-1 signature for Cloudinary signed upload
async function generateSha1Signature(message: string): Promise<string> {
  const encoder = new TextEncoder();
  const data = encoder.encode(message);
  const hashBuffer = await crypto.subtle.digest('SHA-1', data);
  const hashArray = Array.from(new Uint8Array(hashBuffer));
  return hashArray.map((b) => b.toString(16).padStart(2, '0')).join('');
}

export function ImageUploadField({ value, onChange }: ImageUploadFieldProps) {
  const [uploading, setUploading] = useState(false);
  const [error, setError] = useState('');

  const uploadImage = async (file?: File) => {
    if (!file) return;

    setError('');
    setUploading(true);

    try {
      const cloudName = process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME;
      const apiKey = process.env.NEXT_PUBLIC_CLOUDINARY_API_KEY;
      const apiSecret = process.env.NEXT_PUBLIC_CLOUDINARY_API_SECRET;
      const uploadPreset = process.env.NEXT_PUBLIC_CLOUDINARY_UPLOAD_PRESET;

      if (!cloudName) {
        throw new Error('Cloudinary Cloud Name is missing. Please set NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME in .env.local.');
      }

      const formData = new FormData();
      formData.append('file', file);

      // Method 1: Signed Upload (if API Secret & API Key are provided)
      if (apiSecret && apiKey) {
        const timestamp = Math.round(Date.now() / 1000);
        const paramsToSign = `timestamp=${timestamp}${apiSecret}`;
        const signature = await generateSha1Signature(paramsToSign);

        formData.append('api_key', apiKey);
        formData.append('timestamp', timestamp.toString());
        formData.append('signature', signature);
      }
      // Method 2: Unsigned Upload Preset (standard safe upload for frontend apps)
      else if (uploadPreset) {
        formData.append('upload_preset', uploadPreset);
        if (apiKey) {
          formData.append('api_key', apiKey);
        }
      } else {
        throw new Error(
          'Cloudinary configuration incomplete. Provide NEXT_PUBLIC_CLOUDINARY_API_SECRET & NEXT_PUBLIC_CLOUDINARY_API_KEY, or NEXT_PUBLIC_CLOUDINARY_UPLOAD_PRESET in .env.local.'
        );
      }

      const response = await fetch(
        `https://api.cloudinary.com/v1_1/${cloudName}/image/upload`,
        {
          method: 'POST',
          body: formData,
        }
      );

      const result = await response.json();

      if (!response.ok) {
        throw new Error(result.error?.message || `Upload failed with status ${response.status}`);
      }

      const uploadedUrl = result.secure_url || result.url;
      if (!uploadedUrl) {
        throw new Error('Cloudinary response did not contain an image URL.');
      }

      onChange(uploadedUrl);
    } catch (uploadError: any) {
      console.error('Cloudinary upload error:', uploadError);
      setError(uploadError.message || 'Image upload failed. Please verify Cloudinary credentials.');
    } finally {
      setUploading(false);
    }
  };

  return (
    <div className="space-y-2">
      <label className="block font-medium text-gray-700 mb-1">Upload photo from your device</label>
      <label className="inline-flex cursor-pointer items-center gap-2 rounded-xl border border-cream-300 bg-cream-50 px-4 py-2.5 font-semibold text-forest-800 hover:bg-cream-100">
        {uploading ? (
          <LoaderCircle className="h-4 w-4 animate-spin" />
        ) : (
          <ImagePlus className="h-4 w-4" />
        )}
        <span>{uploading ? 'Uploading to Cloudinary…' : 'Choose image'}</span>
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
      <p className="text-[11px] text-gray-500">
        JPEG, PNG, WebP or GIF. Powered by Cloudinary CDN.
      </p>
      {error && (
        <div className="flex items-center gap-1.5 text-xs font-medium text-red-700 bg-red-50 p-2.5 rounded-xl border border-red-200">
          <AlertCircle className="w-4 h-4 shrink-0" />
          <span>{error}</span>
        </div>
      )}
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
