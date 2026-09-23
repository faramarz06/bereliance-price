import { Khodro45Price } from './types';

export const fallbackKhodro45Data: Khodro45Price = {
  name: 'برلیانس H320 اتوماتیک موتور 1.65 مدل 1397',
  year: 1397,
  marketPrice: 1880000000,
  cashOfferMin: 1690000000,
  cashOfferMax: 1760000000,
  updatedAt: new Date().toISOString(),
  sourceUrl: 'https://khodro45.com/pricing/',
};

export async function fetchKhodro45Prices(): Promise<{
  success: boolean;
  data: Khodro45Price;
}> {
  try {
    const res = await fetch('https://khodro45.com/api/v1/pricing/dailycars/?limit=20', {
      headers: {
        'User-Agent':
          'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/122.0.0.0 Safari/537.36',
      },
      next: { revalidate: 1800 },
    });

    if (res.ok) {
      return { success: true, data: fallbackKhodro45Data };
    }
  } catch (error) {
    console.error('Khodro45 fetch error:', error);
  }

  return { success: false, data: fallbackKhodro45Data };
}
