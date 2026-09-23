import { MarketDataResponse, SpecificCarValuation } from './types';
import { fetchHamrahMechanicPrices } from './scraper-hamrah';
import { fetchDivarAds } from './scraper-divar';
import { fetchBamaAds } from './scraper-bama';
import { fetchKhodro45Prices } from './scraper-khodro45';

export async function getMarketData(): Promise<MarketDataResponse> {
  const [hmResult, divarResult, bamaResult, khodro45Result] = await Promise.all([
    fetchHamrahMechanicPrices(),
    fetchDivarAds(),
    fetchBamaAds(),
    fetchKhodro45Prices(),
  ]);

  // 1. Hamrah Mechanic Base for Year 1397
  const hm97 = hmResult.data.find((h) => h.year === 1397);
  const hmBasePristine = hm97?.price || 1900000000;

  // 2. Body Deductions According to Official Inspection Principles (برگه کارشناس پایتخت ۱۰۱۲۹۳۴۱۲۸)
  // Replaced front-left door: -4.2% (~80m Toman)
  const replacedDoorDeduction = Math.round(hmBasePristine * 0.042);

  // Painted rear fender + front right door + spot blend: -5.5% (~104m Toman)
  const paintedPartsDeduction = Math.round(hmBasePristine * 0.055);

  // 145,000 km mileage (25k above standard 120k for a 6-year old car): -2.0% (~38m Toman)
  const mileageDeduction = Math.round(hmBasePristine * 0.02);

  // Newly overhauled / Rebuilt Engine Bonus (موتور تازه تعمیر اساسی با قطعات نو):
  // Eliminates major risk/cost of 80-100 million Tomans for buyer: +5.2% (+99m Toman)
  const freshEngineBonus = Math.round(hmBasePristine * 0.052);

  // Net adjusted base
  const netAdjustedPrice =
    hmBasePristine -
    replacedDoorDeduction -
    paintedPartsDeduction -
    mileageDeduction +
    freshEngineBonus;

  // 3. Divar 1397 ads
  const divar97Ads = divarResult.data.filter(
    (ad) => Number(ad.year) === 1397 && ad.priceNumber > 500_000_000
  );
  const divarAvgRaw =
    divar97Ads.length > 0
      ? Math.round(
          divar97Ads.reduce((acc, curr) => acc + curr.priceNumber, 0) /
            divar97Ads.length
        )
      : 1910000000;
  // Apply body deduction (-9.7%) + engine bonus (+5.2%) = net -4.5% to Divar average
  const divarAdjusted = Math.round(divarAvgRaw * 0.955);

  // 4. Bama 1397 ads
  const bama97Ads = bamaResult.data.filter(
    (ad) => Number(ad.year) === 1397 && ad.priceNumber > 500_000_000
  );
  const bamaAvgRaw =
    bama97Ads.length > 0
      ? Math.round(
          bama97Ads.reduce((acc, curr) => acc + curr.priceNumber, 0) /
            bama97Ads.length
        )
      : 1950000000;
  const bamaAdjusted = Math.round(bamaAvgRaw * 0.95);

  // 5. Khodro45 1397 price
  const khodro45Market = khodro45Result.data.marketPrice;
  const khodro45Adjusted = Math.round(khodro45Market * 0.94);

  // 6. Hamrah Mechanic adjusted price
  const hmAdjusted = netAdjustedPrice;

  // 7. Consensus Fair Price for THIS CAR
  const fairPrice = Math.round(
    (hmAdjusted * 0.35) +
    (divarAdjusted * 0.30) +
    (bamaAdjusted * 0.20) +
    (khodro45Adjusted * 0.15)
  );

  const quickCashSale = Math.round(fairPrice * 0.965);
  const topRetailConsumer = Math.round(fairPrice * 1.04);

  const valuation: SpecificCarValuation = {
    carInfo: {
      model: 'برلیانس H320 اتوماتیک',
      trim: 'موتور بزرگ ۱.۶۵ لیتر (۱۶۵۴ سی‌سی)',
      year: 1397,
      mileage: 145000,
      color: 'سفید روغنی',
      chassisNumber: 'NAPH320BBJ1015714',
      inspectionCode: '1012934128',
      inspectionInspector: 'بابک یاقوتیان (کارشناس پایتخت)',
      inspectionUrl: 'https://es.karshenaspaytakht.com/F/1012934128',
      technicalHighlights: 'موتور تازه تعمیر اساسی (صفر کیلومتر) • شاسی‌ها کاملاً سالم و پلمپ',
    },
    sources: {
      hamrahMechanic: {
        sourceName: 'همراه مکانیک (Hamrah Mechanic)',
        basePrice: hmBasePristine,
        adjustedPrice: hmAdjusted,
        minPrice: Math.round(hmAdjusted * 0.96),
        maxPrice: Math.round(hmAdjusted * 1.04),
        url: 'https://www.hamrah-mechanic.com/carprice/brilliance/h320parskhodro/1397/1279/',
        notes: 'محاسبه شده با کسر درب تعویض و رنگ‌شدگی بدنه و افزودن ارزش موتور تازه تعمیر',
      },
      divar: {
        sourceName: 'دیوار (Divar)',
        averagePrice: divarAvgRaw,
        adjustedPrice: divarAdjusted,
        minPrice: Math.round(divarAdjusted * 0.95),
        maxPrice: Math.round(divarAdjusted * 1.05),
        url: 'https://divar.ir/s/tehran/car/brilliance/h320',
        activeCount: divar97Ads.length,
        notes: 'مظنه تعدیل‌شده آگهی‌های واقعی مدل ۱۳۹۷ تهران متناسب با وضعیت کارشناسی',
      },
      bama: {
        sourceName: 'باما (Bama)',
        averagePrice: bamaAvgRaw,
        adjustedPrice: bamaAdjusted,
        minPrice: Math.round(bamaAdjusted * 0.95),
        maxPrice: Math.round(bamaAdjusted * 1.05),
        url: 'https://bama.ir/car/brilliance/h320/automatic-1650cc',
        activeCount: bama97Ads.length,
        notes: 'استعلام تریم ۱.۶۵ اتوماتیک مدل ۱۳۹۷ با لحاظ افت بدنه و پوئن مثبت موتور',
      },
      khodro45: {
        sourceName: 'خودرو۴۵ (Khodro45)',
        marketPrice: khodro45Market,
        adjustedPrice: khodro45Adjusted,
        minPrice: Math.round(khodro45Adjusted * 0.96),
        maxPrice: Math.round(khodro45Adjusted * 1.03),
        url: 'https://khodro45.com/pricing/',
        notes: 'ارزیابی خرید نقدی کارشناسی با کسر رنگ‌شدگی و تایید اصالت شاسی‌ها',
      },
    },
    finalValuation: {
      fairPrice,
      quickCashSale,
      topRetailConsumer,
      formulaSummary:
        'میانگین وزنی ۴ منبع با اعمال کسر قطعات رنگی/تعویضی و افزایش ارزش موتور تازه تعمیر اساسی',
    },
    bodyDeductions: {
      basePristinePrice: hmBasePristine,
      chassisStatus: 'اصل شاسی‌های جلو و عقب کاملاً سالم و پلمپ (سقف و ستون بدون رنگ)',
      replacedDoorDeduction,
      paintedPartsDeduction,
      mileageDeduction,
      freshEngineBonus,
      netAdjustedPrice,
    },
  };

  return {
    lastUpdated: new Date().toISOString(),
    valuation,
    divarAds: divar97Ads,
    bamaAds: bama97Ads,
    sourcesStatus: {
      divar: divarResult.success,
      hamrahMechanic: hmResult.success,
      bama: bamaResult.success,
      khodro45: khodro45Result.success,
    },
  };
}
