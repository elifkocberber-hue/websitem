import { NextResponse } from 'next/server';

// Shared in-memory user store (synced via globalThis)
function getUserStore() {
  if (typeof globalThis !== 'undefined' && (globalThis as Record<string, unknown>).__users_store) {
    return (globalThis as Record<string, unknown>).__users_store as Map<string, { id: string; email: string; password: string; firstName: string; lastName: string }>;
  }
  return new Map<string, { id: string; email: string; password: string; firstName: string; lastName: string }>();
}

export async function POST(request: Request) {
  try {
    const { email, password } = await request.json();

    if (!email || !password) {
      return NextResponse.json({ error: 'E-posta ve şifre gereklidir' }, { status: 400 });
    }

    const store = getUserStore();
    const user = store.get(email.toLowerCase());
    if (!user || user.password !== password) {
      return NextResponse.json({ error: 'E-posta veya şifre hatalı' }, { status: 401 });
    }

    return NextResponse.json({
      user: {
        id: user.id,
        email: user.email,
        firstName: user.firstName,
        lastName: user.lastName,
      },
    });
  } catch {
    return NextResponse.json({ error: 'Bir hata oluştu' }, { status: 500 });
  }
}
