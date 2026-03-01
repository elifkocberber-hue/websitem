import { NextResponse } from 'next/server';

// Shared in-memory user store
const users: Map<string, { id: string; email: string; password: string; firstName: string; lastName: string }> = new Map();

// Make it accessible globally for the login route
if (typeof globalThis !== 'undefined') {
  (globalThis as Record<string, unknown>).__users_store = (globalThis as Record<string, unknown>).__users_store || users;
}

function getUserStore() {
  if (typeof globalThis !== 'undefined' && (globalThis as Record<string, unknown>).__users_store) {
    return (globalThis as Record<string, unknown>).__users_store as typeof users;
  }
  return users;
}

export async function POST(request: Request) {
  try {
    const { email, password, firstName, lastName } = await request.json();

    if (!email || !password || !firstName || !lastName) {
      return NextResponse.json({ error: 'Tüm alanlar gereklidir' }, { status: 400 });
    }

    if (password.length < 6) {
      return NextResponse.json({ error: 'Şifre en az 6 karakter olmalıdır' }, { status: 400 });
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return NextResponse.json({ error: 'Geçerli bir e-posta adresi giriniz' }, { status: 400 });
    }

    const store = getUserStore();
    if (store.has(email.toLowerCase())) {
      return NextResponse.json({ error: 'Bu e-posta adresi zaten kayıtlı' }, { status: 409 });
    }

    const id = crypto.randomUUID();
    const newUser = {
      id,
      email: email.toLowerCase(),
      password,
      firstName: firstName.trim(),
      lastName: lastName.trim(),
    };

    store.set(email.toLowerCase(), newUser);

    return NextResponse.json({
      user: {
        id: newUser.id,
        email: newUser.email,
        firstName: newUser.firstName,
        lastName: newUser.lastName,
      },
    }, { status: 201 });
  } catch {
    return NextResponse.json({ error: 'Bir hata oluştu' }, { status: 500 });
  }
}
