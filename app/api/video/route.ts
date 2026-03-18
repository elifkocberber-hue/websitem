import { NextRequest, NextResponse } from 'next/server';

const SUPABASE_HOSTNAME = 'zpqtdaoyeokavrkosuii.supabase.co';

export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url);
  const videoUrl = searchParams.get('url');

  if (!videoUrl) {
    return new NextResponse('Missing url', { status: 400 });
  }

  let parsed: URL;
  try {
    parsed = new URL(videoUrl);
  } catch {
    return new NextResponse('Invalid URL', { status: 400 });
  }

  if (parsed.hostname !== SUPABASE_HOSTNAME) {
    return new NextResponse('Forbidden', { status: 403 });
  }

  const range = request.headers.get('range');
  const upstreamHeaders: HeadersInit = {
    'Accept': '*/*',
    'Accept-Encoding': 'identity', // disable compression so content-length is accurate
  };
  if (range) upstreamHeaders['Range'] = range;

  let upstream: Response;
  try {
    upstream = await fetch(videoUrl, { headers: upstreamHeaders });
  } catch (err) {
    return new NextResponse(`Fetch failed: ${String(err)}`, { status: 502 });
  }

  if (!upstream.ok && upstream.status !== 206) {
    return new NextResponse(`Upstream error: ${upstream.status}`, { status: upstream.status });
  }

  const upstreamType = upstream.headers.get('content-type') ?? '';
  const path = parsed.pathname.toLowerCase();
  const contentType = upstreamType.startsWith('video/')
    ? upstreamType
    : /\.webm$/.test(path) ? 'video/webm'
    : /\.mov$/.test(path) ? 'video/quicktime'
    : 'video/mp4';

  const resHeaders = new Headers();
  resHeaders.set('Content-Type', contentType);
  resHeaders.set('Accept-Ranges', 'bytes');
  resHeaders.set('Cache-Control', 'public, max-age=86400');

  for (const h of ['content-length', 'content-range', 'etag', 'last-modified']) {
    const v = upstream.headers.get(h);
    if (v) resHeaders.set(h, v);
  }

  return new NextResponse(upstream.body, {
    status: upstream.status,
    headers: resHeaders,
  });
}
