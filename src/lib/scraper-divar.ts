import { DivarAd } from './types';
import { parsePersianNumber } from './persian-utils';

export const fallbackDivarAds: DivarAd[] = [
  {
    id: 'divar-gaz-PQC3',
    title: 'برلیانس H320 اتومات ۱۶۵۰cc مدل۹۷',
    price: '۲,۱۵۰,۰۰۰,۰۰۰ تومان',
    priceNumber: 2150000000,
    mileage: '۹۲,۰۰۰ کیلومتر',
    location: 'تهران، سعادت‌آباد',
    imageUrl: 'https://s100.divarcdn.com/static/photo/neda/webp_thumbnail/rUk5uFXXRjU3G2SNz_FswA/76d72f3c-0a3c-4305-b617-6979b3689161.webp',
    url: 'https://divar.ir/s/tehran/car/brilliance/h320',
    year: 1397,
  },
  {
    id: 'divar-gazWHBZ0',
    title: 'برلیانس 97 اتومات موتور بزرگ بیرنگ مشابه‌صفر',
    price: '۲,۱۰۰,۰۰۰,۰۰۰ تومان',
    priceNumber: 2100000000,
    mileage: '۷۳,۰۰۰ کیلومتر',
    location: 'تهران، دهکده المپیک',
    imageUrl: null,
    url: 'https://divar.ir/s/tehran/car/brilliance/h320',
    year: 1397,
  },
  {
    id: 'divar-gazK-iRm',
    title: 'برلیانس H320 اتومات 1.65 بی رنگ مدل 98',
    price: '۲,۲۰۰,۰۰۰,۰۰۰ تومان',
    priceNumber: 2200000000,
    mileage: '۱۱۹,۰۰۰ کیلومتر',
    location: 'تهران، پیروزی',
    imageUrl: null,
    url: 'https://divar.ir/s/tehran/car/brilliance/h320',
    year: 1398,
  },
  {
    id: 'divar-gav24tCC',
    title: 'برلیانس H320 اتوماتیک موتور 1650 مدل 99',
    price: '۲,۳۵۰,۰۰۰,۰۰۰ تومان',
    priceNumber: 2350000000,
    mileage: '۵۸,۰۰۰ کیلومتر',
    location: 'تهران، پونک',
    imageUrl: null,
    url: 'https://divar.ir/s/tehran/car/brilliance/h320',
    year: 1399,
  },
  {
    id: 'divar-gaz1400a',
    title: 'برلیانس H320 اتوماتیک 1650cc مدل 1400 در حد خشک',
    price: '۲,۴۵۰,۰۰۰,۰۰۰ تومان',
    priceNumber: 2450000000,
    mileage: '۳۲,۰۰۰ کیلومتر',
    location: 'تهران، شهرک غرب',
    imageUrl: null,
    url: 'https://divar.ir/s/tehran/car/brilliance/h320',
    year: 1400,
  },
];

export async function fetchDivarAds(): Promise<{
  success: boolean;
  data: DivarAd[];
}> {
  try {
    const res = await fetch('https://api.divar.ir/v8/postlist/w/search', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'User-Agent':
          'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/122.0.0.0 Safari/537.36',
      },
      body: JSON.stringify({
        city_ids: ['1'],
        search_data: {
          query: 'برلیانس h320 اتومات 1650',
          form_data: {
            data: {
              category: { str: { value: 'cars' } },
            },
          },
        },
      }),
      next: { revalidate: 1800 },
    });

    if (res.ok) {
      const json = await res.json();
      const widgets = (json.list_widgets || []).filter(
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        (w: any) => w.widget_type === 'POST_ROW' && w.data?.title
      );

      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      const ads: DivarAd[] = widgets.map((w: any) => {
        const title = w.data.title || '';
        const priceStr = w.data.middle_description_text || 'توافقی';
        const priceNum = parsePersianNumber(priceStr);
        const token = w.data.token || Math.random().toString();
        
        // Extract year if available
        let year: number = 1398;
        const matchYear = title.match(/(139[6-9]|140[0-2]|۹[۶-۹]|۱۴۰۰)/);
        if (matchYear) {
          const y = parsePersianNumber(matchYear[1]);
          year = y < 100 ? 1300 + y : y;
        }

        return {
          id: `divar-${token}`,
          title,
          price: priceStr,
          priceNumber: priceNum,
          mileage: w.data.top_description_text || 'کارکرد نامشخص',
          location: w.data.bottom_description_text || 'تهران',
          imageUrl: w.data.image_url || null,
          url: `https://divar.ir/v/${encodeURIComponent(title)}/${token}`,
          year,
        };
      });

      // Filter only ads that look like Brilliance H320 and have meaningful prices (> 500 million Toman)
      const validAds = ads.filter(
        (ad) =>
          ad.title.includes('برلیانس') &&
          (ad.priceNumber === 0 || (ad.priceNumber >= 500_000_000 && ad.priceNumber <= 4_000_000_000))
      );

      if (validAds.length > 0) {
        return { success: true, data: validAds };
      }
    }
  } catch (error) {
    console.error('Divar fetch error:', error);
  }

  return { success: false, data: fallbackDivarAds };
}
