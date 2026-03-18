import { NextRequest } from 'next/server';
import crypto from 'crypto';

// JWT secret: önce ADMIN_JWT_SECRET, yoksa ADMIN_PASSWORD_HASH kullan
function getSecret(): string {
  return process.env.ADMIN_JWT_SECRET || process.env.ADMIN_PASSWORD_HASH || 'fallback-secret';
}

function base64url(input: string): string {
  return Buffer.from(input).toString('base64url');
}

function fromBase64url(input: string): string {
  return Buffer.from(input, 'base64url').toString('utf-8');
}

export function signAdminJWT(email: string, expiresInSeconds: number): string {
  const header = base64url(JSON.stringify({ alg: 'HS256', typ: 'JWT' }));
  const payload = base64url(JSON.stringify({
    email,
    exp: Math.floor(Date.now() / 1000) + expiresInSeconds,
  }));
  const signature = crypto
    .createHmac('sha256', getSecret())
    .update(`${header}.${payload}`)
    .digest('base64url');
  return `${header}.${payload}.${signature}`;
}

export function verifyAdminJWT(token: string): { email: string } | null {
  try {
    const parts = token.split('.');
    if (parts.length !== 3) return null;
    const [header, payload, signature] = parts;
    const expected = crypto
      .createHmac('sha256', getSecret())
      .update(`${header}.${payload}`)
      .digest('base64url');
    if (signature !== expected) return null;
    const data = JSON.parse(fromBase64url(payload));
    if (!data.exp || data.exp < Math.floor(Date.now() / 1000)) return null;
    return { email: data.email };
  } catch {
    return null;
  }
}

export function isAdminAuthenticated(request: NextRequest): boolean {
  const token = request.cookies.get('adminToken')?.value;
  if (!token) return false;
  return verifyAdminJWT(token) !== null;
}

// Geriye dönük uyumluluk için boş export — artık kullanılmıyor
export const adminSessions = new Map<string, { email: string; expiresAt: number }>();
