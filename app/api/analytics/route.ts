import { NextResponse } from 'next/server';
import { supabase } from '@/lib/supabase';

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const days = parseInt(searchParams.get('days') || '7');
    
    const since = new Date();
    since.setDate(since.getDate() - days);
    const sinceStr = since.toISOString();

    // Tüm ziyaretçi verilerini al
    const { data: visitors, error } = await supabase
      .from('visitors')
      .select('*')
      .gte('created_at', sinceStr)
      .order('created_at', { ascending: false });

    if (error) {
      console.error('Analytics fetch error:', error);
      return NextResponse.json({ error: 'Veri alınamadı' }, { status: 500 });
    }

    const allVisitors = visitors || [];

    // Toplam ziyaret
    const totalVisits = allVisitors.length;

    // Benzersiz oturum sayısı
    const uniqueSessions = new Set(allVisitors.map(v => v.session_id)).size;

    // Bugünkü ziyaretler
    const today = new Date().toISOString().split('T')[0];
    const todayVisits = allVisitors.filter(v => 
      v.created_at.startsWith(today)
    ).length;

    // Ortalama oturum süresi (saniye)
    const visitorsWithDuration = allVisitors.filter(v => v.duration && v.duration > 0);
    const avgDuration = visitorsWithDuration.length > 0
      ? Math.round(visitorsWithDuration.reduce((sum, v) => sum + (v.duration || 0), 0) / visitorsWithDuration.length)
      : 0;

    // Oturum bazlı ortalama süre
    const sessionDurations: Record<string, number> = {};
    allVisitors.forEach(v => {
      if (v.session_id && v.duration) {
        sessionDurations[v.session_id] = (sessionDurations[v.session_id] || 0) + (v.duration || 0);
      }
    });
    const sessionDurArr = Object.values(sessionDurations);
    const avgSessionDuration = sessionDurArr.length > 0
      ? Math.round(sessionDurArr.reduce((a, b) => a + b, 0) / sessionDurArr.length)
      : 0;

    // Sayfa bazlı istatistikler (ziyaret + ortalama süre)
    const pageStats: Record<string, { count: number; totalDuration: number; durCount: number }> = {};
    allVisitors.forEach(v => {
      if (!pageStats[v.page]) pageStats[v.page] = { count: 0, totalDuration: 0, durCount: 0 };
      pageStats[v.page].count += 1;
      if (v.duration && v.duration > 0) {
        pageStats[v.page].totalDuration += v.duration;
        pageStats[v.page].durCount += 1;
      }
    });
    const topPages = Object.entries(pageStats)
      .sort((a, b) => b[1].count - a[1].count)
      .slice(0, 10)
      .map(([page, stats]) => ({
        page,
        count: stats.count,
        avgDuration: stats.durCount > 0 ? Math.round(stats.totalDuration / stats.durCount) : 0,
      }));

    // Cihaz istatistikleri
    const deviceStats: Record<string, number> = {};
    allVisitors.forEach(v => {
      deviceStats[v.device] = (deviceStats[v.device] || 0) + 1;
    });

    // Tarayıcı istatistikleri
    const browserStats: Record<string, number> = {};
    allVisitors.forEach(v => {
      browserStats[v.browser] = (browserStats[v.browser] || 0) + 1;
    });

    // Ülke istatistikleri
    const countryStats: Record<string, number> = {};
    allVisitors.forEach(v => {
      countryStats[v.country] = (countryStats[v.country] || 0) + 1;
    });
    const topCountries = Object.entries(countryStats)
      .sort((a, b) => b[1] - a[1])
      .slice(0, 10)
      .map(([country, count]) => ({ country, count }));

    // Günlük ziyaret trendi + ortalama süre
    const dailyStats: Record<string, { count: number; totalDuration: number; durCount: number }> = {};
    allVisitors.forEach(v => {
      const day = v.created_at.split('T')[0];
      if (!dailyStats[day]) dailyStats[day] = { count: 0, totalDuration: 0, durCount: 0 };
      dailyStats[day].count += 1;
      if (v.duration && v.duration > 0) {
        dailyStats[day].totalDuration += v.duration;
        dailyStats[day].durCount += 1;
      }
    });
    const dailyTrend = Object.entries(dailyStats)
      .sort((a, b) => a[0].localeCompare(b[0]))
      .map(([date, stats]) => ({
        date,
        count: stats.count,
        avgDuration: stats.durCount > 0 ? Math.round(stats.totalDuration / stats.durCount) : 0,
      }));

    // Saatlik dağılım
    const hourlyStats: Record<number, number> = {};
    allVisitors.forEach(v => {
      const hour = new Date(v.created_at).getHours();
      hourlyStats[hour] = (hourlyStats[hour] || 0) + 1;
    });

    // Son ziyaretçiler
    const recentVisitors = allVisitors.slice(0, 20).map(v => ({
      id: v.id,
      page: v.page,
      device: v.device,
      browser: v.browser,
      os: v.os,
      country: v.country,
      city: v.city,
      duration: v.duration || 0,
      created_at: v.created_at,
    }));

    return NextResponse.json({
      totalVisits,
      uniqueSessions,
      todayVisits,
      avgDuration,
      avgSessionDuration,
      topPages,
      deviceStats,
      browserStats,
      topCountries,
      dailyTrend,
      hourlyStats,
      recentVisitors,
    });
  } catch {
    return NextResponse.json({ error: 'Bir hata oluştu' }, { status: 500 });
  }
}
