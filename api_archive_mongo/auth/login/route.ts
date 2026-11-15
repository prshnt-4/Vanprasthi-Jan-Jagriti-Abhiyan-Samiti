import { NextRequest, NextResponse } from 'next/server';
import { connectData, db } from '@/lib/dataAccess';
import { comparePassword, signJwtToken, JwtPayload } from '@/lib/auth';
import { authenticateDevAdmin } from '@/lib/devAdminAuth';

function loginResponse(payload: JwtPayload, user: { id?: string; email: string; name: string; role: string }) {
  const token = signJwtToken(payload);

  const response = NextResponse.json({
    success: true,
    user,
    token,
  });

  response.cookies.set('token', token, {
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production',
    maxAge: 60 * 60 * 24 * 7,
    path: '/',
  });

  return response;
}

export async function POST(req: NextRequest) {
  const body = await req.json();
  const { email, password } = body;

  if (!email || !password) {
    return NextResponse.json({ error: 'Email and password required' }, { status: 400 });
  }

  try {
    await connectData();

    const user = await db.User.findOne({ email: email.toLowerCase().trim() });
    if (
      !user ||
      typeof user !== 'object' ||
      !('password' in user) ||
      !('email' in user) ||
      !('name' in user) ||
      !('role' in user) ||
      !('_id' in user) ||
      typeof user.password !== 'string' ||
      typeof user.email !== 'string' ||
      typeof user.name !== 'string' ||
      (user.role !== 'admin' && user.role !== 'volunteer' && user.role !== 'user') ||
      user._id == null
    ) {
      return NextResponse.json({ error: 'Invalid credentials' }, { status: 401 });
    }

    const isValid = await comparePassword(password, user.password);
    if (!isValid) {
      return NextResponse.json({ error: 'Invalid credentials' }, { status: 401 });
    }

    return loginResponse(
      {
        userId: String(user._id),
        email: user.email,
        role: user.role,
        name: user.name,
      },
      { id: String(user._id), email: user.email, name: user.name, role: user.role }
    );
  } catch (error: unknown) {
    console.error('Login error:', error);

    const devAdmin = authenticateDevAdmin(email, password);
    if (devAdmin) {
      console.warn('[auth] MongoDB unavailable — using development admin credentials.');
      return loginResponse(devAdmin, {
        email: devAdmin.email,
        name: devAdmin.name,
        role: devAdmin.role,
      });
    }

    const message = error instanceof Error ? error.message : '';
    const isDbUnavailable =
      message.includes('ECONNREFUSED') ||
      message.includes('MongoServerSelectionError') ||
      message.includes('connect ETIMEDOUT');

    if (isDbUnavailable) {
      return NextResponse.json(
        {
          error:
            'Database is not reachable. Start MongoDB locally or set MONGODB_URI in .env.local (see .env.example).',
        },
        { status: 503 }
      );
    }

    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}
