import { NextRequest, NextResponse } from 'next/server';
import { isAdminAuthenticated } from '@/lib/adminAuth';

export async function GET(request: NextRequest) {
  if (!isAdminAuthenticated(request)) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  const url = request.nextUrl.searchParams.get('url');
  if (!url) {
    return NextResponse.json({ error: 'url parametresi gerekli' }, { status: 400 });
  }

  let fetchUrl = url;
  if (url.startsWith('/')) {
    const host = request.headers.get('host') ?? 'localhost:3000';
    const protocol = host.includes('localhost') ? 'http' : 'https';
    fetchUrl = `${protocol}://${host}${url}`;
  }

  const response = await fetch(fetchUrl, { cache: 'no-store' });
  if (!response.ok) {
    return NextResponse.json({ error: 'Görsel alınamadı' }, { status: 502 });
  }

  const buffer = await response.arrayBuffer();
  const base64 = Buffer.from(buffer).toString('base64');
  const contentType = response.headers.get('content-type') ?? 'image/jpeg';

  return NextResponse.json({ dataUrl: `data:${contentType};base64,${base64}` });
}
