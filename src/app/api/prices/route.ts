import { NextRequest, NextResponse } from 'next/server';
import { getMarketData } from '@/lib/market-service';

export const dynamic = 'force-dynamic';

export async function GET(request: NextRequest) {
  try {
    const data = await getMarketData();
    return NextResponse.json(data, {
      status: 200,
      headers: {
        'Cache-Control': 'no-store, no-cache, must-revalidate, proxy-revalidate',
        'Pragma': 'no-cache',
        'Expires': '0',
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
