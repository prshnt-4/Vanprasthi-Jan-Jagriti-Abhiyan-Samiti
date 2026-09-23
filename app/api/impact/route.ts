import { NextRequest, NextResponse } from 'next/server';
import { connectToDatabase } from '@/lib/db';
import { ImpactMetric } from '@/models/ImpactMetric';
import { getAuthTokenFromRequest, verifyJwtToken } from '@/lib/auth';

export async function GET() {
  try {
    await connectToDatabase();
    const metrics = await ImpactMetric.find({ isVisible: true }).sort({ order: 1 });
    return NextResponse.json(metrics);
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}

export async function PUT(req: NextRequest) {
  try {
    const token = getAuthTokenFromRequest(req);
    const payload = token ? verifyJwtToken(token) : null;
    if (!payload || payload.role !== 'admin') {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    await connectToDatabase();
    const body = await req.json(); // array of metrics or single metric update
    if (Array.isArray(body)) {
      for (const item of body) {
        await ImpactMetric.findByIdAndUpdate(item._id, item, { new: true });
      }
      return NextResponse.json({ success: true });
    } else {
      const metric = await ImpactMetric.findByIdAndUpdate(body._id, body, { new: true });
      return NextResponse.json(metric);
    }
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
