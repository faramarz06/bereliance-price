'use client';

import React, { useState, useEffect, useCallback, useRef } from 'react';
import { MarketDataResponse } from '@/lib/types';
import { CarDossierHero } from '@/components/CarDossierHero';
import { SpecificPriceSummary } from '@/components/SpecificPriceSummary';
import { Market97Comparison } from '@/components/Market97Comparison';
import { fallbackHamrahMechanicData } from '@/lib/scraper-hamrah';
import { fallbackDivarAds } from '@/lib/scraper-divar';
import { fallbackBamaAds } from '@/lib/scraper-bama';

const REFRESH_INTERVAL_SECONDS = 60; // Auto-update every 60 seconds

const initialFallbackData: MarketDataResponse = {
  lastUpdated: new Date().toISOString(),
  stats: {
    overallAvg: 1910000000,
    overallMin: 1820000000,
    overallMax: 2000000000,
    totalAds: fallbackDivarAds.length + fallbackBamaAds.length,
    priceByYear: {
      1397: { avg: 1910000000, min: 1820000000, max: 2000000000, count: 5, hamrahPrice: 1900000000 },
    },
  },
  hamrahMechanic: fallbackHamrahMechanicData,
  divarAds: fallbackDivarAds,
  bamaAds: fallbackBamaAds,
  sourcesStatus: {
    divar: true,
    hamrahMechanic: true,
    bama: true,
  },
};

export default function HomePage() {
  const [data, setData] = useState<MarketDataResponse>(initialFallbackData);
  const [secondsUntilRefresh, setSecondsUntilRefresh] = useState<number>(REFRESH_INTERVAL_SECONDS);

  const timerRef = useRef<NodeJS.Timeout | null>(null);

  const fetchData = useCallback(async () => {
    try {
      const res = await fetch('/api/prices');
      if (res.ok) {
        const json: MarketDataResponse = await res.json();
        setData(json);
      }
    } catch (e) {
      console.error('Fetch error:', e);
    } finally {
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
        {/* 1. Primary Car Dossier & Inspection Certificate */}
        <CarDossierHero
          lastUpdated={data.lastUpdated}
          secondsUntilRefresh={secondsUntilRefresh}
        />

        {/* 2. Specific Price Valuation & Market Source Benchmarks (Strictly for this car) */}
        <SpecificPriceSummary data={data} />

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
            بروزرسانی پیوسته از: همراه مکانیک • دیوار • باما • کارشناس پایتخت
          </div>
        </div>
      </footer>
    </div>
  );
}
