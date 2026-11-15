import { NextRequest, NextResponse } from 'next/server';
import { connectData, db } from '@/lib/dataAccess';
import { getAuthTokenFromRequest, verifyJwtToken } from '@/lib/auth';

export async function POST(req: NextRequest) {
  try {
    await connectData();
    const body = await req.json();

    const donation = await db.Donation.create(body);
    return NextResponse.json({ success: true, donation }, { status: 201 });
  } catch (error: any) {
    console.error('Donation Creation Error:', error);
    return NextResponse.json({ error: error.message || 'Failed to save donation' }, { status: 500 });
  }
}

export async function GET(req: NextRequest) {
  try {
    const token = getAuthTokenFromRequest(req);
    const payload = token ? verifyJwtToken(token) : null;
    if (!payload || payload.role !== 'admin') {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    await connectData();
    const donations = await db.Donation.find().sort({ createdAt: -1 });
    return NextResponse.json(donations);
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
