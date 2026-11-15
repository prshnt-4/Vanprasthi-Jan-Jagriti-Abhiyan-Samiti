import { NextRequest, NextResponse } from 'next/server';
import { connectData, db } from '@/lib/dataAccess';

export async function POST(req: NextRequest) {
  try {
    await connectData();
    const body = await req.json();
    const registration = await db.EventRegistration.create(body);
    return NextResponse.json({ success: true, registration }, { status: 201 });
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
