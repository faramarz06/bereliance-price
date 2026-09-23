import { NextResponse } from 'next/server';
import { getMarketData } from '@/lib/market-service';

export const dynamic = 'force-dynamic';
export const revalidate = 900; // 15 minutes cache

export async function GET() {
  try {
    const data = await getMarketData();
    return NextResponse.json(data, {
      status: 200,
      headers: {
        'Cache-Control': 'public, s-maxage=900, stale-while-revalidate=1800',
      },
    });
  } catch (error) {
    console.error('API /api/prices error:', error);
    return NextResponse.json(
      { error: 'Failed to fetch market data' },
      { status: 500 }
    );
  }
}
