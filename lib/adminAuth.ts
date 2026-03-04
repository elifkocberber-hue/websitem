import { NextRequest } from 'next/server';

/**
 * Shared admin session store (via globalThis for cross-route access).
 * In production, replace with Redis or database-backed sessions.
 */
const sessions = ((globalThis as Record<string, unknown>).__admin_sessions as Map<string, { email: string; expiresAt: number }>) || new Map<string, { email: string; expiresAt: number }>();
(globalThis as Record<string, unknown>).__admin_sessions = sessions;

export { sessions as adminSessions };

export function isAdminAuthenticated(request: NextRequest): boolean {
  const token = request.cookies.get('adminToken')?.value;
  if (!token || !sessions.has(token)) return false;
  const session = sessions.get(token)!;
  if (Date.now() > session.expiresAt) {
    sessions.delete(token);
    return false;
  }
  return true;
}
