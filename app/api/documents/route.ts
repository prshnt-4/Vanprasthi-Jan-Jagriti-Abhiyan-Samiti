import { NextRequest, NextResponse } from 'next/server';
import { connectToDatabase } from '@/lib/db';
import { LegalDocument } from '@/models/Document';
import { getAuthTokenFromRequest, verifyJwtToken } from '@/lib/auth';

export async function GET() {
  try {
    await connectToDatabase();
    const docs = await LegalDocument.find().sort({ createdAt: -1 });
    return NextResponse.json(docs);
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}

export async function POST(req: NextRequest) {
  try {
    const token = getAuthTokenFromRequest(req);
    const payload = token ? verifyJwtToken(token) : null;
    if (!payload || payload.role !== 'admin') {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    await connectToDatabase();
    const body = await req.json();
    const doc = await LegalDocument.create(body);
    return NextResponse.json(doc, { status: 201 });
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
