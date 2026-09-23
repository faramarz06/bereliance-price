import { HamrahMechanicYearPrice } from './types';

export const fallbackHamrahMechanicData: HamrahMechanicYearPrice[] = [
  {
    year: 1400,
    price: 2100000000,
    priceDown: 2016000000,
    priceUp: 2184000000,
    updatedAt: new Date().toISOString(),
    sourceUrl: 'https://www.hamrah-mechanic.com/carprice/brilliance/h320parskhodro/1400/1279/',
    imageUrl: 'https://cdn.hamrah-mechanic.com/4e37735d522e43dc8405f401e5238427.png',
  },
  {
    year: 1399,
    price: 2000000000,
    priceDown: 1920000000,
    priceUp: 2080000000,
    updatedAt: new Date().toISOString(),
    sourceUrl: 'https://www.hamrah-mechanic.com/carprice/brilliance/h320parskhodro/1399/1279/',
    imageUrl: 'https://cdn.hamrah-mechanic.com/4e37735d522e43dc8405f401e5238427.png',
  },
  {
    year: 1398,
    price: 1950000000,
    priceDown: 1870000000,
    priceUp: 2030000000,
    updatedAt: new Date().toISOString(),
    sourceUrl: 'https://www.hamrah-mechanic.com/carprice/brilliance/h320parskhodro/',
    imageUrl: 'https://cdn.hamrah-mechanic.com/4e37735d522e43dc8405f401e5238427.png',
  },
  {
    year: 1397,
    price: 1900000000,
    priceDown: 1824000000,
    priceUp: 1976000000,
    updatedAt: new Date().toISOString(),
    sourceUrl: 'https://www.hamrah-mechanic.com/carprice/brilliance/h320parskhodro/1397/1279/',
    imageUrl: 'https://cdn.hamrah-mechanic.com/4e37735d522e43dc8405f401e5238427.png',
  },
];

export async function fetchHamrahMechanicPrices(): Promise<{
  success: boolean;
  data: HamrahMechanicYearPrice[];
}> {
  const years = [1400, 1399, 1397];
  const results: HamrahMechanicYearPrice[] = [];

  try {
    const promises = years.map(async (year) => {
      const url = `https://www.hamrah-mechanic.com/carprice/brilliance/h320parskhodro/${year}/1279/`;
      const res = await fetch(url, {
        headers: {
          'User-Agent':
            'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/122.0.0.0 Safari/537.36',
        },
        next: { revalidate: 3600 },
      });

      if (!res.ok) return null;

      const html = await res.text();
      const match = html.match(/<script id="__NEXT_DATA__"[^>]*>(.*?)<\/script>/s);
      if (!match) return null;

      const json = JSON.parse(match[1]);
      const detail = json.props?.pageProps?.modelDetail;
      if (!detail || !detail.price) return null;

      return {
        year,
        price: detail.price,
        priceDown: detail.priceDown || Math.round(detail.price * 0.96),
        priceUp: detail.priceUp || Math.round(detail.price * 1.04),
        updatedAt: new Date().toISOString(),
        sourceUrl: url,
        imageUrl: detail.imageUrl || 'https://cdn.hamrah-mechanic.com/4e37735d522e43dc8405f401e5238427.png',
      } as HamrahMechanicYearPrice;
    });

    const settled = await Promise.allSettled(promises);
    for (const item of settled) {
      if (item.status === 'fulfilled' && item.value) {
        results.push(item.value);
      }
    }

    // Add 1398 interpolation if 1397 and 1399 exist
    if (results.some((r) => r.year === 1397) && results.some((r) => r.year === 1399)) {
      const p97 = results.find((r) => r.year === 1397)!.price;
      const p99 = results.find((r) => r.year === 1399)!.price;
      const p98 = Math.round((p97 + p99) / 2);
      results.push({
        year: 1398,
        price: p98,
        priceDown: Math.round(p98 * 0.96),
        priceUp: Math.round(p98 * 1.04),
        updatedAt: new Date().toISOString(),
        sourceUrl: 'https://www.hamrah-mechanic.com/carprice/brilliance/h320parskhodro/',
        imageUrl: 'https://cdn.hamrah-mechanic.com/4e37735d522e43dc8405f401e5238427.png',
      });
    }

    results.sort((a, b) => b.year - a.year);

    if (results.length > 0) {
      return { success: true, data: results };
    }
  } catch (error) {
    console.error('Hamrah Mechanic fetch error:', error);
  }

  return { success: false, data: fallbackHamrahMechanicData };
}
