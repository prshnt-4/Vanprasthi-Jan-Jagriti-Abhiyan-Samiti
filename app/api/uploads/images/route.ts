import { randomUUID } from 'crypto';
import { mkdir, writeFile } from 'fs/promises';
import path from 'path';
import { NextRequest, NextResponse } from 'next/server';
import { getAuthTokenFromRequest, verifyJwtToken } from '@/lib/auth';

export const runtime = 'nodejs';

const MAX_IMAGE_SIZE = 8 * 1024 * 1024;
const MAX_REQUEST_SIZE = MAX_IMAGE_SIZE + 1024 * 1024;
const IMAGE_TYPES = {
  'image/jpeg': { extension: 'jpg', signature: (data: Buffer) => data[0] === 0xff && data[1] === 0xd8 && data[2] === 0xff },
  'image/png': { extension: 'png', signature: (data: Buffer) => data.subarray(0, 8).equals(Buffer.from([0x89, 0x50, 0x4e, 0x47, 0x0d, 0x0a, 0x1a, 0x0a])) },
  'image/webp': { extension: 'webp', signature: (data: Buffer) => data.toString('ascii', 0, 4) === 'RIFF' && data.toString('ascii', 8, 12) === 'WEBP' },
  'image/gif': { extension: 'gif', signature: (data: Buffer) => data.toString('ascii', 0, 3) === 'GIF' },
} as const;

export async function POST(req: NextRequest) {
  const token = getAuthTokenFromRequest(req);
  const payload = token ? verifyJwtToken(token) : null;
  if (!payload || payload.role !== 'admin') {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  const contentLength = Number(req.headers.get('content-length') || 0);
  if (contentLength > MAX_REQUEST_SIZE) {
    return NextResponse.json({ error: 'Image must be smaller than 8 MB.' }, { status: 413 });
  }

  try {
    const formData = await req.formData();
    const file = formData.get('image');
    if (!(file instanceof File)) {
      return NextResponse.json({ error: 'Choose an image to upload.' }, { status: 400 });
    }
    if (file.size === 0 || file.size > MAX_IMAGE_SIZE) {
      return NextResponse.json({ error: 'Image must be smaller than 8 MB.' }, { status: 413 });
    }

    const imageType = IMAGE_TYPES[file.type as keyof typeof IMAGE_TYPES];
    if (!imageType) {
      return NextResponse.json({ error: 'Use a JPEG, PNG, WebP, or GIF image.' }, { status: 415 });
    }

    const image = Buffer.from(await file.arrayBuffer());
    if (!imageType.signature(image)) {
      return NextResponse.json({ error: 'The selected file is not a valid image.' }, { status: 415 });
    }

    const filename = `${randomUUID()}.${imageType.extension}`;
    const uploadDirectory = path.join(process.cwd(), 'public', 'uploads');
    await mkdir(uploadDirectory, { recursive: true });
    await writeFile(path.join(uploadDirectory, filename), image, { flag: 'wx' });

    return NextResponse.json({ url: `/uploads/${filename}` }, { status: 201 });
  } catch (error) {
    console.error('Image upload failed:', error);
    return NextResponse.json({ error: 'Unable to upload image.' }, { status: 500 });
  }
}
