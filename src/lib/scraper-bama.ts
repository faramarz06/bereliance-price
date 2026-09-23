import { BamaAd } from './types';
import { parsePersianNumber, toPersianDigits } from './persian-utils';

export const fallbackBamaAds: BamaAd[] = [
  {
    id: 'bama-1400-auto',
    title: 'برلیانس H320 اتوماتیک ۱.۶۵',
    trim: '1.65 اتوماتیک',
    price: '۲,۲۰۰,۰۰۰,۰۰۰ تومان',
    priceNumber: 2200000000,
    year: 1400,
    mileage: '۴۵,۰۰۰ کیلومتر',
    location: 'تهران / پاسداران',
    url: 'https://bama.ir/car/brilliance/h320/automatic-1650cc',
    imageUrl: 'https://cdn-sth1.bama.ir/uploads/BamaImages/VehicleCarImages/6ba8b168-0047-4fc1-bdf4-122e57e4ffb6/CarImage_b93f1213725c4594a4e2e749624dbbfe_thumb_900_600.jpg',
  },
  {
    id: 'bama-1399-auto',
    title: 'برلیانس H320 اتوماتیک ۱.۶۵',
    trim: '1.65 اتوماتیک',
    price: '۲,۱۰۰,۰۰۰,۰۰۰ تومان',
    priceNumber: 2100000000,
    year: 1399,
    mileage: '۶۵,۰۰۰ کیلومتر',
    location: 'تهران / سعادت‌آباد',
    url: 'https://bama.ir/car/brilliance/h320/automatic-1650cc',
    imageUrl: null,
  },
  {
    id: 'bama-1397-auto',
    title: 'برلیانس H320 اتومات موتور بزرگ',
    trim: '1.65 اتوماتیک',
    price: '۱,۹۵۰,۰۰۰,۰۰۰ تومان',
    priceNumber: 1950000000,
    year: 1397,
    mileage: '۸۹,۰۰۰ کیلومتر',
    location: 'تهران / نیاوران',
    url: 'https://bama.ir/car/brilliance/h320/automatic-1650cc',
    imageUrl: null,
  },
];

export async function fetchBamaAds(): Promise<{
  success: boolean;
  data: BamaAd[];
}> {
  try {
    const res = await fetch('https://bama.ir/cad/api/search?brand=brilliance&model=h320', {
      headers: {
        'User-Agent':
          'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/122.0.0.0 Safari/537.36',
        Referer: 'https://bama.ir/car/brilliance/h320/automatic-1650cc',
      },
      next: { revalidate: 1800 },
    });

    if (res.ok) {
      const json = await res.json();
      const ads = json.data?.ads || [];

      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      const bamaItems: BamaAd[] = ads.map((ad: any, index: number) => {
        const title = ad.detail?.title || 'برلیانس H320';
        const trim = ad.detail?.trim || '1.65 اتوماتیک';
        const rawPrice = ad.price?.price || 'توافقی';
        const priceNumber = parsePersianNumber(rawPrice);
        const year = ad.detail?.year || '1398';
        const mileage = ad.detail?.mileage || 'کارکرد نامشخص';
        const location = ad.detail?.location || 'تهران';
        const url = ad.detail?.url ? `https://bama.ir${ad.detail.url}` : 'https://bama.ir/car/brilliance/h320';
        const imageUrl = ad.detail?.image || null;

        return {
          id: `bama-${index}-${year}`,
          title: `${title} (${trim})`,
          trim,
          price: priceNumber > 0 ? `${toPersianDigits(rawPrice)} تومان` : 'توافقی',
          priceNumber,
          year,
          mileage,
          location,
          url,
          imageUrl,
        };
      });

      const filtered = bamaItems.filter(
        (ad) =>
          ad.priceNumber === 0 ||
          (ad.priceNumber >= 800_000_000 && ad.priceNumber <= 3_500_000_000)
      );

      if (filtered.length > 0) {
        return { success: true, data: filtered };
      }
    }
  } catch (error) {
    console.error('Bama fetch error:', error);
  }

  return { success: false, data: fallbackBamaAds };
}
