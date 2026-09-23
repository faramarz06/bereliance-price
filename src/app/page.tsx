'use client';

import React, { useState, useEffect, useCallback, useRef } from 'react';
import { MarketDataResponse, SpecificCarValuation } from '@/lib/types';
import { CarDossierHero } from '@/components/CarDossierHero';
import { SpecificPriceSummary } from '@/components/SpecificPriceSummary';
import { Market97Comparison } from '@/components/Market97Comparison';
import { fallbackDivarAds } from '@/lib/scraper-divar';
import { fallbackBamaAds } from '@/lib/scraper-bama';

const REFRESH_INTERVAL_SECONDS = 60; // Auto-update every 60 seconds

const initialValuation: SpecificCarValuation = {
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
      sourceName: 'همراه مکانیک',
      basePrice: 1900000000,
      adjustedPrice: 1755000000,
      minPrice: 1715000000,
      maxPrice: 1795000000,
      url: 'https://www.hamrah-mechanic.com/carprice/brilliance/h320parskhodro/1397/1279/',
      notes: 'محاسبه شده با کسر درب تعویض و رنگ‌شدگی بدنه و افزودن ارزش موتور تازه تعمیر',
    },
    divar: {
      sourceName: 'دیوار',
      averagePrice: 1910000000,
      adjustedPrice: 1770000000,
      minPrice: 1720000000,
      maxPrice: 1830000000,
      url: 'https://divar.ir/s/tehran/car/brilliance/h320',
      activeCount: 18,
      notes: 'مظنه تعدیل‌شده آگهی‌های واقعی مدل ۱۳۹۷ تهران متناسب با وضعیت کارشناسی',
    },
    bama: {
      sourceName: 'باما',
      averagePrice: 1950000000,
      adjustedPrice: 1765000000,
      minPrice: 1720000000,
      maxPrice: 1810000000,
      url: 'https://bama.ir/car/brilliance/h320/automatic-1650cc',
      activeCount: 12,
      notes: 'استعلام تریم ۱.۶۵ اتوماتیک مدل ۱۳۹۷ با لحاظ افت بدنه و پوئن مثبت موتور',
    },
    khodro45: {
      sourceName: 'خودرو۴۵',
      marketPrice: 1880000000,
      adjustedPrice: 1735000000,
      minPrice: 1690000000,
      maxPrice: 1760000000,
      url: 'https://khodro45.com/pricing/',
      notes: 'ارزیابی خرید نقدی کارشناسی با کسر رنگ‌شدگی و تایید اصالت شاسی‌ها',
    },
  },
  finalValuation: {
    fairPrice: 1760000000,
    quickCashSale: 1700000000,
    topRetailConsumer: 1820000000,
    formulaSummary:
      'میانگین وزنی ۴ منبع با اعمال کسر قطعات رنگی/تعویضی و افزایش ارزش موتور تازه تعمیر اساسی',
  },
  bodyDeductions: {
    basePristinePrice: 1900000000,
    chassisStatus: 'اصل شاسی‌های جلو و عقب کاملاً سالم و پلمپ (سقف و ستون بدون رنگ)',
    replacedDoorDeduction: 80000000,
    paintedPartsDeduction: 104000000,
    mileageDeduction: 38000000,
    freshEngineBonus: 99000000,
    netAdjustedPrice: 1777000000,
  },
};

const initialFallbackData: MarketDataResponse = {
  lastUpdated: new Date().toISOString(),
  valuation: initialValuation,
  divarAds: fallbackDivarAds,
  bamaAds: fallbackBamaAds,
  sourcesStatus: {
    divar: true,
    hamrahMechanic: true,
    bama: true,
    khodro45: true,
  },
};

export default function HomePage() {
  const [data, setData] = useState<MarketDataResponse>(initialFallbackData);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [secondsUntilRefresh, setSecondsUntilRefresh] = useState<number>(REFRESH_INTERVAL_SECONDS);

  const timerRef = useRef<NodeJS.Timeout | null>(null);

  const fetchData = useCallback(async () => {
    setIsLoading(true);
    try {
      const res = await fetch(`/api/prices?force=true&t=${Date.now()}`, {
        cache: 'no-store',
      });
      if (res.ok) {
        const json: MarketDataResponse = await res.json();
        setData(json);
      }
    } catch (e) {
      console.error('Fetch error:', e);
    } finally {
      setIsLoading(false);
      setSecondsUntilRefresh(REFRESH_INTERVAL_SECONDS);
    }
  }, []);

  // Initial load
  useEffect(() => {
    fetchData();
  }, [fetchData]);

  // Automated background refresh loop (every 60 seconds)
  useEffect(() => {
    timerRef.current = setInterval(() => {
      setSecondsUntilRefresh((prev) => {
        if (prev <= 1) {
          fetchData();
          return REFRESH_INTERVAL_SECONDS;
        }
        return prev - 1;
      });
    }, 1000);

    return () => {
      if (timerRef.current) clearInterval(timerRef.current);
    };
  }, [fetchData]);

  return (
    <div className="min-h-screen flex flex-col bg-slate-950 text-slate-100 selection:bg-blue-600 selection:text-white">
      {/* Main Single-Car Dossier Container */}
      <main className="flex-1 max-w-6xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
        {/* 1. Primary Car Dossier & Inspection Certificate with Live Refresh Button */}
        <CarDossierHero
          valuation={data.valuation}
          lastUpdated={data.lastUpdated}
          secondsUntilRefresh={secondsUntilRefresh}
          onRefresh={fetchData}
          isRefreshing={isLoading}
        />

        {/* 2. Specific Price Valuation & 4 Market Source Benchmarks (Strictly for this car) */}
        <SpecificPriceSummary valuation={data.valuation} />

        {/* 3. Verified Market Evidence (Only Model 1397 Ads) */}
        <Market97Comparison
          divarAds={data.divarAds}
          bamaAds={data.bamaAds}
        />
      </main>

      {/* Footer */}
      <footer className="border-t border-slate-800 bg-slate-900/50 py-6 text-xs text-slate-500">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-center sm:text-right">
          <div>
            پرونده کارشناسی و استعلام قیمت برلیانس H320 اتوماتیک ۱.۶۵ مدل ۱۳۹۷ سفید (۱۴۵,۰۰۰ کیلومتر)
          </div>
          <div className="text-slate-400">
            بروزرسانی پیوسته از: همراه مکانیک • دیوار • باما • خودرو۴۵ • کارشناس پایتخت
          </div>
        </div>
      </footer>
    </div>
  );
}
