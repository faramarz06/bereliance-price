'use client';

import React, { useState, useEffect, useCallback } from 'react';
import { MarketDataResponse } from '@/lib/types';
import { Header } from '@/components/Header';
import { PriceOverviewCards } from '@/components/PriceOverviewCards';
import { YearComparisonTable } from '@/components/YearComparisonTable';
import { ValuationCalculator } from '@/components/ValuationCalculator';
import { SourceTabs } from '@/components/SourceTabs';
import { fallbackHamrahMechanicData } from '@/lib/scraper-hamrah';
import { fallbackDivarAds } from '@/lib/scraper-divar';
import { fallbackBamaAds } from '@/lib/scraper-bama';
import { Car, Info, Sparkles } from 'lucide-react';

const initialFallbackData: MarketDataResponse = {
  lastUpdated: new Date().toISOString(),
  stats: {
    overallAvg: 2050000000,
    overallMin: 1900000000,
    overallMax: 2450000000,
    totalAds: fallbackDivarAds.length + fallbackBamaAds.length,
    priceByYear: {
      1400: { avg: 2200000000, min: 2100000000, max: 2450000000, count: 2, hamrahPrice: 2100000000 },
      1399: { avg: 2100000000, min: 2000000000, max: 2350000000, count: 2, hamrahPrice: 2000000000 },
      1398: { avg: 2000000000, min: 1950000000, max: 2200000000, count: 2, hamrahPrice: 1950000000 },
      1397: { avg: 1950000000, min: 1900000000, max: 2150000000, count: 3, hamrahPrice: 1900000000 },
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
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const fetchData = useCallback(async () => {
    setIsLoading(true);
    try {
      const res = await fetch('/api/prices');
      if (res.ok) {
        const json: MarketDataResponse = await res.json();
        setData(json);
      }
    } catch (e) {
      console.error('Fetch error:', e);
    } finally {
      setIsLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchData();
  }, [fetchData]);

  return (
    <div className="min-h-screen flex flex-col bg-slate-950 text-slate-100">
      {/* Header */}
      <Header
        lastUpdated={data.lastUpdated}
        onRefresh={fetchData}
        isLoading={isLoading}
        sourcesStatus={data.sourcesStatus}
      />

      {/* Main Content */}
      <main className="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-6 space-y-6">
        {/* Model Feature Banner */}
        <div className="relative overflow-hidden rounded-2xl bg-gradient-to-r from-blue-950/60 via-slate-900 to-indigo-950/40 border border-blue-500/20 p-5 sm:p-6 shadow-xl">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div className="space-y-1">
              <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold bg-blue-500/10 text-blue-400 border border-blue-500/20 mb-2">
                <Sparkles className="w-3.5 h-3.5" />
                <span>پایش هوشمند بازار خودرو ایران</span>
              </div>
              <h2 className="text-xl sm:text-2xl font-black text-white">
                برلیانس H320 اتوماتیک ۱۶۵۰ سی‌سی (پارس خودرو)
              </h2>
              <p className="text-xs sm:text-sm text-slate-400 max-w-2xl leading-relaxed">
                این خودرو به عنوان نسخه بهبودیافته با موتور ارتقایافته ۱.۶۵ لیتری و گیربکس بهینه‌شده ۴ سرعته اتوماتیک، یکی از پرطرفدارترین هاچ‌بک‌های مونتاژی پارس‌خودرو است. کلیه قیمت‌های زیر بر اساس آخرین آگهی‌های دیوار، باما و نرخ کارشناسی همراه مکانیک بروزرسانی شده است.
              </p>
            </div>

            <div className="shrink-0 flex sm:flex-col gap-2 text-xs">
              <div className="bg-slate-800/80 px-3 py-2 rounded-xl border border-slate-700/60">
                <span className="text-slate-400 block text-[10px]">حجم پیشرانه:</span>
                <span className="font-bold text-slate-200">۱۶۵۴ سی‌سی (۱۱۴ اسب)</span>
              </div>
              <div className="bg-slate-800/80 px-3 py-2 rounded-xl border border-slate-700/60">
                <span className="text-slate-400 block text-[10px]">نوع گیربکس:</span>
                <span className="font-bold text-slate-200">۴ دنده اتوماتیک تیپ‌ترونیک</span>
              </div>
            </div>
          </div>
        </div>

        {/* 1. Overview Cards */}
        <PriceOverviewCards
          stats={data.stats}
          hamrahPrices={data.hamrahMechanic}
        />

        {/* 2. Interactive Valuation Calculator */}
        <ValuationCalculator
          stats={data.stats}
          hamrahPrices={data.hamrahMechanic}
        />

        {/* 3. Year by Year Breakdown Table */}
        <YearComparisonTable
          stats={data.stats}
          hamrahPrices={data.hamrahMechanic}
        />

        {/* 4. Live Ads & Sources Tab */}
        <SourceTabs
          divarAds={data.divarAds}
          bamaAds={data.bamaAds}
          hamrahPrices={data.hamrahMechanic}
        />
      </main>

      {/* Footer */}
      <footer className="border-t border-slate-800 bg-slate-900/40 mt-12 py-6 text-xs text-slate-500">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-center sm:text-right">
          <div>
            سامانه رصد و تحلیل قیمت برلیانس H320 اتوماتیک موتور 1.65 — آماده استقرار در Vercel
          </div>
          <div className="flex items-center gap-4 text-slate-400">
            <span>منبع اطلاعات: دیوار • همراه مکانیک • باما</span>
          </div>
        </div>
      </footer>
    </div>
  );
}
