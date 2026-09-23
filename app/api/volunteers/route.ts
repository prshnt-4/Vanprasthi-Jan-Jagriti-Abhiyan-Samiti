import { NextRequest, NextResponse } from 'next/server';
import { connectToDatabase } from '@/lib/db';
import { Volunteer } from '@/models/Volunteer';
import { getAuthTokenFromRequest, verifyJwtToken } from '@/lib/auth';

export async function POST(req: NextRequest) {
  try {
    await connectToDatabase();
    const body = await req.json();

    const volunteer = await Volunteer.create(body);
    return NextResponse.json({ success: true, volunteer }, { status: 201 });
  } catch (error: any) {
    console.error('Volunteer Application Error:', error);
    return NextResponse.json({ error: error.message || 'Failed to save application' }, { status: 500 });
  }
}

export async function GET(req: NextRequest) {
  try {
    const token = getAuthTokenFromRequest(req);
    const payload = token ? verifyJwtToken(token) : null;
    if (!payload || payload.role !== 'admin') {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    await connectToDatabase();
    const volunteers = await Volunteer.find().sort({ createdAt: -1 });
    return NextResponse.json(volunteers);
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
