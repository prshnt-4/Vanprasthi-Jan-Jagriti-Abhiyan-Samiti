import { NextRequest } from 'next/server';
import { db } from '@/lib/dataAccess';
import { deleteCmsItem } from '@/lib/deleteCmsItem';

export async function DELETE(req: NextRequest, { params }: { params: { id: string } }) {
  return deleteCmsItem(req, params.id, db.NewsPost);
}
