import { NextRequest, NextResponse } from 'next/server';
import { connectData } from '@/lib/dataAccess';
import { getAuthTokenFromRequest, verifyJwtToken } from '@/lib/auth';

type DeletableCollection = {
  findByIdAndDelete(id: string): Promise<unknown>;
};

export async function deleteCmsItem(
  req: NextRequest,
  id: string,
  collection: DeletableCollection
) {
  const token = getAuthTokenFromRequest(req);
  const payload = token ? verifyJwtToken(token) : null;
  if (!payload || payload.role !== 'admin') {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  if (!/^[a-f\d]{24}$/i.test(id)) {
    return NextResponse.json({ error: 'Invalid item ID.' }, { status: 400 });
  }

  try {
    await connectData();
    const deleted = await collection.findByIdAndDelete(id);
    if (!deleted) {
      return NextResponse.json({ error: 'Item not found.' }, { status: 404 });
    }
    return NextResponse.json({ success: true });
  } catch (error) {
    console.error('CMS item deletion failed:', error);
    return NextResponse.json({ error: 'Unable to delete this item.' }, { status: 500 });
  }
}
