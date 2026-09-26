import { JwtPayload } from './auth';

/** Allows admin sign-in in development when MongoDB is not running. */
export function authenticateDevAdmin(email: string, password: string): JwtPayload | null {
  if (process.env.NODE_ENV === 'production') {
    return null;
  }

  const adminEmail = (process.env.ADMIN_EMAIL || 'admin@vanprasthisamiti.org').toLowerCase().trim();
  const adminPassword = process.env.ADMIN_PASSWORD || 'AdminPass@2026!';

  if (email.toLowerCase().trim() === adminEmail && password === adminPassword) {
    return {
      userId: 'dev-admin-local',
      email: adminEmail,
      role: 'admin',
      name: 'Development Admin',
    };
  }

  return null;
}
