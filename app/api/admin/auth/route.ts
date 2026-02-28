import { NextRequest, NextResponse } from 'next/server';
import * as bcrypt from 'bcrypt';

const ADMIN_EMAIL = process.env.NEXT_PUBLIC_ADMIN_EMAIL || 'admin@ter-aseramik.com';
const ADMIN_PASSWORD_HASH = process.env.ADMIN_PASSWORD_HASH || '';

// Simple session store (production'da database veya Redis kullan)
const sessions = new Map<string, { email: string; expiresAt: number }>();

function generateSessionToken(): string {
  return require('crypto').randomBytes(32).toString('hex');
}

export async function GET(request: NextRequest) {
  try {
    const token = request.cookies.get('adminToken')?.value;

    if (!token || !sessions.has(token)) {
      return NextResponse.json({ authenticated: false }, { status: 401 });
    }

    const session = sessions.get(token)!;

    if (Date.now() > session.expiresAt) {
      sessions.delete(token);
      return NextResponse.json({ authenticated: false }, { status: 401 });
    }

    return NextResponse.json({ authenticated: true, email: session.email });
  } catch (error) {
    console.error('Auth check error:', error);
    return NextResponse.json({ authenticated: false }, { status: 401 });
  }
}

export async function POST(request: NextRequest) {
  try {
    const { email, password } = await request.json();

    // Validate email
    if (email !== ADMIN_EMAIL) {
      return NextResponse.json(
        { success: false, error: 'Geçersiz e-posta veya şifre' },
        { status: 401 }
      );
    }

    // Compare password with bcrypt
    const isPasswordValid = await bcrypt.compare(password, ADMIN_PASSWORD_HASH);

    if (!isPasswordValid) {
      return NextResponse.json(
        { success: false, error: 'Geçersiz e-posta veya şifre' },
        { status: 401 }
      );
    }

    const token = generateSessionToken();
    const expiresAt = Date.now() + 24 * 60 * 60 * 1000; // 24 saat

    sessions.set(token, { email, expiresAt });

    const response = NextResponse.json({
      success: true,
      email: email,
      message: 'Başarıyla giriş yaptınız',
    });

    response.cookies.set('adminToken', token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'strict',
      maxAge: 24 * 60 * 60,
    });

    return response;
  } catch (error) {
    console.error('Login error:', error);
    return NextResponse.json(
      { success: false, error: 'Login hatası' },
      { status: 500 }
    );
  }
}

export async function DELETE(request: NextRequest) {
  try {
    const token = request.cookies.get('adminToken')?.value;

    if (token) {
      sessions.delete(token);
    }

    const response = NextResponse.json({ success: true, message: 'Çıkış yapıldı' });
    response.cookies.delete('adminToken');

    return response;
  } catch (error) {
    console.error('Logout error:', error);
    return NextResponse.json({ success: false }, { status: 500 });
  }
}
