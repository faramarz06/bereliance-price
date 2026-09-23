'use client';

import React, { useState, useEffect, useCallback, useRef } from 'react';
import { MarketDataResponse } from '@/lib/types';
import { Header } from '@/components/Header';
import { UserCarHero } from '@/components/UserCarHero';
import { PriceOverviewCards } from '@/components/PriceOverviewCards';
import { YearComparisonTable } from '@/components/YearComparisonTable';
import { ValuationCalculator } from '@/components/ValuationCalculator';
import { SourceTabs } from '@/components/SourceTabs';
import { fallbackHamrahMechanicData } from '@/lib/scraper-hamrah';
import { fallbackDivarAds } from '@/lib/scraper-divar';
import { fallbackBamaAds } from '@/lib/scraper-bama';
import { Sparkles } from 'lucide-react';

const REFRESH_INTERVAL_SECONDS = 60; // Auto-update every 60 seconds

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
  const [autoRefreshEnabled, setAutoRefreshEnabled] = useState<boolean>(true);
  const [secondsUntilRefresh, setSecondsUntilRefresh] = useState<number>(REFRESH_INTERVAL_SECONDS);

  const timerRef = useRef<NodeJS.Timeout | null>(null);

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
      setSecondsUntilRefresh(REFRESH_INTERVAL_SECONDS);
    }
  }, []);

  // Initial load
  useEffect(() => {
    fetchData();
  }, [fetchData]);

  // Auto-refresh countdown timer
  useEffect(() => {
    if (!autoRefreshEnabled) return;

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
  }, [autoRefreshEnabled, fetchData]);

  const toggleAutoRefresh = () => {
    setAutoRefreshEnabled((prev) => !prev);
    if (!autoRefreshEnabled) {
      setSecondsUntilRefresh(REFRESH_INTERVAL_SECONDS);
    }
  };

  return (
    <div className="min-h-screen flex flex-col bg-slate-950 text-slate-100">
      {/* Header */}
      <Header
        lastUpdated={data.lastUpdated}
        onRefresh={fetchData}
        isLoading={isLoading}
        sourcesStatus={data.sourcesStatus}
      />

      {/* Main Container */}
      <main className="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-6 space-y-6">
        {/* 1. HERO: User's Car Inspection & Valuation Summary */}
        <UserCarHero
          data={data}
          secondsUntilRefresh={secondsUntilRefresh}
          autoRefreshEnabled={autoRefreshEnabled}
          onToggleAutoRefresh={toggleAutoRefresh}
          onManualRefresh={fetchData}
          isRefreshing={isLoading}
        />

        {/* General Market Model Feature Banner */}
        <div className="relative overflow-hidden rounded-2xl bg-gradient-to-r from-blue-950/40 via-slate-900 to-indigo-950/30 border border-slate-800 p-5 shadow-lg">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div className="space-y-1">
              <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold bg-blue-500/10 text-blue-400 border border-blue-500/20 mb-1">
                <Sparkles className="w-3.5 h-3.5" />
                <span>پایش زنده بازار خودروهای برلیانس در ایران</span>
              </div>
              <h2 className="text-lg sm:text-xl font-bold text-white">
                مظنه عمومی بازار برلیانس H320 اتوماتیک ۱۶۵۰ سی‌سی
              </h2>
              <p className="text-xs text-slate-400 max-w-2xl leading-relaxed">
                قیمت‌های زیر حاصل پایش پیوسته آگهی‌های فعال در دیوار، باما و نرخ‌های کارشناسی همراه مکانیک برای تمامی مدل‌های تولیدی (۱۳۹۷ الی ۱۴۰۰) می‌باشد.
              </p>
            </div>

            <div className="shrink-0 flex sm:flex-col gap-2 text-xs">
              <div className="bg-slate-800/80 px-3 py-2 rounded-xl border border-slate-700/60">
                <span className="text-slate-400 block text-[10px]">پیشرانه:</span>
                <span className="font-bold text-slate-200">۱۶۵۴ سی‌سی (موتور بزرگ)</span>
              </div>
              <div className="bg-slate-800/80 px-3 py-2 rounded-xl border border-slate-700/60">
                <span className="text-slate-400 block text-[10px]">گیربکس:</span>
                <span className="font-bold text-slate-200">۴ سرعته اتوماتیک</span>
              </div>
            </div>
          </div>
        </div>

        {/* 2. Overview Cards across the market */}
        <PriceOverviewCards
          stats={data.stats}
          hamrahPrices={data.hamrahMechanic}
        />

        {/* 3. Interactive Valuation Calculator */}
        <ValuationCalculator
          stats={data.stats}
          hamrahPrices={data.hamrahMechanic}
        />

        {/* 4. Year by Year Breakdown Table */}
        <YearComparisonTable
          stats={data.stats}
          hamrahPrices={data.hamrahMechanic}
        />

        {/* 5. Live Ads & Sources Tab */}
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
            سامانه رصد و تحلیل قیمت برلیانس H320 اتوماتیک موتور 1.65 — متصل به گیت‌هاب و ورسل
          </div>
          <div className="flex items-center gap-4 text-slate-400">
            <span>منبع اطلاعات: دیوار • همراه مکانیک • باما • کارشناس پایتخت</span>
          </div>
        </div>
      </footer>
    </div>
  );
}
