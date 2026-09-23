'use client';

import React from 'react';
import { MarketStats, HamrahMechanicYearPrice } from '@/lib/types';
import { formatPriceWords, formatPriceToman, toPersianDigits } from '@/lib/persian-utils';
import { TrendingUp, ArrowDownRight, ArrowUpRight, BarChart3, ShieldCheck } from 'lucide-react';

interface PriceOverviewCardsProps {
  stats: MarketStats;
  hamrahPrices: HamrahMechanicYearPrice[];
}

export const PriceOverviewCards: React.FC<PriceOverviewCardsProps> = ({
  stats,
  hamrahPrices,
}) => {
  // Latest model year (1400) Hamrah price as benchmark
  const latestHamrah = hamrahPrices.find((h) => h.year === 1400) || hamrahPrices[0];

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
      {/* Card 1: Overall Average */}
      <div className="relative overflow-hidden rounded-2xl bg-gradient-to-br from-blue-900/40 via-slate-900 to-slate-900 border border-blue-500/30 p-5 shadow-xl">
        <div className="flex items-center justify-between">
          <span className="text-xs font-medium text-blue-300">میانگین کل بازار</span>
          <span className="p-2 rounded-xl bg-blue-500/10 text-blue-400">
            <TrendingUp className="w-5 h-5" />
          </span>
        </div>
        <div className="mt-3">
          <div className="text-2xl font-black text-white tracking-tight">
            {formatPriceWords(stats.overallAvg)}
          </div>
          <div className="text-xs text-slate-400 mt-1 font-mono">
            {formatPriceToman(stats.overallAvg)}
          </div>
        </div>
        <div className="mt-4 pt-3 border-t border-slate-800/80 flex items-center justify-between text-xs text-slate-400">
          <span>تعداد آگهی‌های پایش‌شده:</span>
          <span className="font-bold text-slate-200">
            {toPersianDigits(stats.totalAds)} عدد
          </span>
        </div>
      </div>

      {/* Card 2: Hamrah Mechanic Benchmark (کارشناسی رسمی) */}
      <div className="relative overflow-hidden rounded-2xl bg-gradient-to-br from-emerald-950/40 via-slate-900 to-slate-900 border border-emerald-500/30 p-5 shadow-xl">
        <div className="flex items-center justify-between">
          <span className="text-xs font-medium text-emerald-300">قیمت رسمی همراه مکانیک</span>
          <span className="p-2 rounded-xl bg-emerald-500/10 text-emerald-400">
            <ShieldCheck className="w-5 h-5" />
          </span>
        </div>
        <div className="mt-3">
          <div className="text-2xl font-black text-emerald-300 tracking-tight">
            {latestHamrah ? formatPriceWords(latestHamrah.price) : 'در حال دریافت'}
          </div>
          <div className="text-xs text-slate-400 mt-1">
            مدل {toPersianDigits(latestHamrah?.year || 1400)} (بازه:{' '}
            {latestHamrah ? toPersianDigits(Math.round(latestHamrah.priceDown / 1_000_000)) : ''} تا{' '}
            {latestHamrah ? toPersianDigits(Math.round(latestHamrah.priceUp / 1_000_000)) : ''} م.ت)
          </div>
        </div>
        <div className="mt-4 pt-3 border-t border-slate-800/80 flex items-center justify-between text-xs text-slate-400">
          <span>شاخص قیمت‌گذاری:</span>
          <span className="text-emerald-400 font-medium">کارشناسی کارکرد استاندارد</span>
        </div>
      </div>

      {/* Card 3: Minimum Price in Market */}
      <div className="relative overflow-hidden rounded-2xl bg-slate-900 border border-slate-800 p-5 shadow-xl">
        <div className="flex items-center justify-between">
          <span className="text-xs font-medium text-slate-400">کف قیمت در آگهی‌ها</span>
          <span className="p-2 rounded-xl bg-indigo-500/10 text-indigo-400">
            <ArrowDownRight className="w-5 h-5" />
          </span>
        </div>
        <div className="mt-3">
          <div className="text-2xl font-black text-slate-100 tracking-tight">
            {formatPriceWords(stats.overallMin)}
          </div>
          <div className="text-xs text-slate-400 mt-1 font-mono">
            {formatPriceToman(stats.overallMin)}
          </div>
        </div>
        <div className="mt-4 pt-3 border-t border-slate-800/80 flex items-center justify-between text-xs text-slate-400">
          <span>معمولاً مدل‌های:</span>
          <span className="text-slate-300 font-bold">۱۳۹۶ یا ۱۳۹۷ کارکرد بالا</span>
        </div>
      </div>

      {/* Card 4: Maximum Price in Market */}
      <div className="relative overflow-hidden rounded-2xl bg-slate-900 border border-slate-800 p-5 shadow-xl">
        <div className="flex items-center justify-between">
          <span className="text-xs font-medium text-slate-400">سقف قیمت بازار</span>
          <span className="p-2 rounded-xl bg-amber-500/10 text-amber-400">
            <ArrowUpRight className="w-5 h-5" />
          </span>
        </div>
        <div className="mt-3">
          <div className="text-2xl font-black text-amber-300 tracking-tight">
            {formatPriceWords(stats.overallMax)}
          </div>
          <div className="text-xs text-slate-400 mt-1 font-mono">
            {formatPriceToman(stats.overallMax)}
          </div>
        </div>
        <div className="mt-4 pt-3 border-t border-slate-800/80 flex items-center justify-between text-xs text-slate-400">
          <span>مشخصات:</span>
          <span className="text-slate-300 font-bold">مدل ۱۴۰۰ در حد خشک</span>
        </div>
      </div>
    </div>
  );
};
