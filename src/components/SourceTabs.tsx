'use client';

import React, { useState, useMemo } from 'react';
import { DivarAd, BamaAd, HamrahMechanicYearPrice } from '@/lib/types';
import { formatPriceWords, formatPriceToman, toPersianDigits } from '@/lib/persian-utils';
import { ExternalLink, Search, Filter, MapPin, Gauge, ShieldCheck, Car } from 'lucide-react';

interface SourceTabsProps {
  divarAds: DivarAd[];
  bamaAds: BamaAd[];
  hamrahPrices: HamrahMechanicYearPrice[];
}

export const SourceTabs: React.FC<SourceTabsProps> = ({
  divarAds,
  bamaAds,
  hamrahPrices,
}) => {
  const [activeTab, setActiveTab] = useState<'all' | 'divar' | 'hamrah' | 'bama'>('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedYearFilter, setSelectedYearFilter] = useState<string>('all');

  // Filtered Divar Ads
  const filteredDivar = useMemo(() => {
    return divarAds.filter((ad) => {
      const matchSearch =
        ad.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        ad.location.toLowerCase().includes(searchQuery.toLowerCase());
      const matchYear =
        selectedYearFilter === 'all' || ad.year?.toString() === selectedYearFilter;
      return matchSearch && matchYear;
    });
  }, [divarAds, searchQuery, selectedYearFilter]);

  // Filtered Bama Ads
  const filteredBama = useMemo(() => {
    return bamaAds.filter((ad) => {
      const matchSearch =
        ad.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        ad.location.toLowerCase().includes(searchQuery.toLowerCase()) ||
        ad.trim.toLowerCase().includes(searchQuery.toLowerCase());
      const matchYear =
        selectedYearFilter === 'all' || ad.year?.toString() === selectedYearFilter;
      return matchSearch && matchYear;
    });
  }, [bamaAds, searchQuery, selectedYearFilter]);

  return (
    <div className="bg-slate-900 border border-slate-800 rounded-2xl p-5 shadow-xl">
      {/* Top Bar: Tabs & Search */}
      <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4 pb-5 border-b border-slate-800">
        {/* Source Tabs */}
        <div className="flex flex-wrap items-center gap-2">
          <button
            type="button"
            onClick={() => setActiveTab('all')}
            className={`px-3.5 py-2 rounded-xl text-xs font-bold transition-all cursor-pointer ${
              activeTab === 'all'
                ? 'bg-blue-600 text-white shadow-md shadow-blue-600/30'
                : 'bg-slate-800/80 text-slate-300 hover:bg-slate-700/80'
            }`}
          >
            همه منابع ({toPersianDigits(divarAds.length + bamaAds.length + hamrahPrices.length)})
          </button>
          <button
            type="button"
            onClick={() => setActiveTab('divar')}
            className={`flex items-center gap-1.5 px-3.5 py-2 rounded-xl text-xs font-bold transition-all cursor-pointer ${
              activeTab === 'divar'
                ? 'bg-red-600 text-white shadow-md shadow-red-600/30'
                : 'bg-slate-800/80 text-slate-300 hover:bg-slate-700/80'
            }`}
          >
            <span className="w-2 h-2 rounded-full bg-red-400"></span>
            دیوار ({toPersianDigits(divarAds.length)})
          </button>
          <button
            type="button"
            onClick={() => setActiveTab('hamrah')}
            className={`flex items-center gap-1.5 px-3.5 py-2 rounded-xl text-xs font-bold transition-all cursor-pointer ${
              activeTab === 'hamrah'
                ? 'bg-emerald-600 text-white shadow-md shadow-emerald-600/30'
                : 'bg-slate-800/80 text-slate-300 hover:bg-slate-700/80'
            }`}
          >
            <span className="w-2 h-2 rounded-full bg-emerald-400"></span>
            همراه مکانیک ({toPersianDigits(hamrahPrices.length)})
          </button>
          <button
            type="button"
            onClick={() => setActiveTab('bama')}
            className={`flex items-center gap-1.5 px-3.5 py-2 rounded-xl text-xs font-bold transition-all cursor-pointer ${
              activeTab === 'bama'
                ? 'bg-amber-600 text-white shadow-md shadow-amber-600/30'
                : 'bg-slate-800/80 text-slate-300 hover:bg-slate-700/80'
            }`}
          >
            <span className="w-2 h-2 rounded-full bg-amber-400"></span>
            باما ({toPersianDigits(bamaAds.length)})
          </button>
        </div>

        {/* Filters */}
        <div className="flex items-center gap-3">
          {/* Year filter */}
          <select
            value={selectedYearFilter}
            onChange={(e) => setSelectedYearFilter(e.target.value)}
            className="bg-slate-800 border border-slate-700 text-slate-200 text-xs rounded-xl px-3 py-2 outline-none focus:border-blue-500 cursor-pointer"
          >
            <option value="all">تمام مدل‌ها</option>
            <option value="1400">مدل ۱۴۰۰</option>
            <option value="1399">مدل ۱۳۹۹</option>
            <option value="1398">مدل ۱۳۹۸</option>
            <option value="1397">مدل ۱۳۹۷</option>
          </select>

          {/* Search box */}
          <div className="relative">
            <input
              type="text"
              placeholder="جستجو در آگهی‌ها یا شهر..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="bg-slate-800/90 border border-slate-700/80 text-slate-200 text-xs rounded-xl pl-3 pr-8 py-2 w-48 sm:w-60 outline-none focus:border-blue-500 placeholder:text-slate-500"
            />
            <Search className="w-3.5 h-3.5 text-slate-400 absolute right-2.5 top-1/2 -translate-y-1/2" />
          </div>
        </div>
      </div>

      {/* Content Area */}
      <div className="mt-6 space-y-6">
        {/* Hamrah Mechanic Section (shown if all or hamrah) */}
        {(activeTab === 'all' || activeTab === 'hamrah') && (
          <div>
            <div className="flex items-center justify-between mb-3">
              <h3 className="text-sm font-bold text-emerald-400 flex items-center gap-2">
                <ShieldCheck className="w-4 h-4" />
                نرخ‌های کارشناسی همراه مکانیک (برلیانس H320 اتومات ۱.۶۵)
              </h3>
              <a
                href="https://www.hamrah-mechanic.com/carprice/brilliance/h320parskhodro/"
                target="_blank"
                rel="noopener noreferrer"
                className="text-xs text-slate-400 hover:text-emerald-400 flex items-center gap-1 transition-colors"
              >
                <span>مشاهده در سایت همراه مکانیک</span>
                <ExternalLink className="w-3 h-3" />
              </a>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
              {hamrahPrices.map((hm) => (
                <div
                  key={hm.year}
                  className="bg-slate-950/60 border border-emerald-500/20 hover:border-emerald-500/40 rounded-xl p-4 transition-all"
                >
                  <div className="flex items-center justify-between text-xs text-slate-400">
                    <span className="font-bold text-white">مدل {toPersianDigits(hm.year)}</span>
                    <span className="text-[10px] px-2 py-0.5 rounded bg-emerald-500/10 text-emerald-400 border border-emerald-500/20">
                      کارشناسی رسمی
                    </span>
                  </div>
                  <div className="mt-2 text-lg font-bold text-emerald-300">
                    {formatPriceWords(hm.price)}
                  </div>
                  <div className="text-[11px] text-slate-400 mt-0.5 font-mono">
                    {formatPriceToman(hm.price)}
                  </div>
                  <div className="mt-3 pt-2 border-t border-slate-800 text-[10px] text-slate-400 flex justify-between">
                    <span>بازه منصفانه:</span>
                    <span>
                      {toPersianDigits(Math.round(hm.priceDown / 1_000_000))} تا{' '}
                      {toPersianDigits(Math.round(hm.priceUp / 1_000_000))} م.ت
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Divar Ads (shown if all or divar) */}
        {(activeTab === 'all' || activeTab === 'divar') && (
          <div>
            <div className="flex items-center justify-between mb-3">
              <h3 className="text-sm font-bold text-red-400 flex items-center gap-2">
                <span className="w-2.5 h-2.5 rounded-full bg-red-500"></span>
                آگهی‌های فعال در دیوار ({toPersianDigits(filteredDivar.length)} آگهی)
              </h3>
              <a
                href="https://divar.ir/s/tehran/car/brilliance/h320"
                target="_blank"
                rel="noopener noreferrer"
                className="text-xs text-slate-400 hover:text-red-400 flex items-center gap-1 transition-colors"
              >
                <span>مشاهده همه در دیوار</span>
                <ExternalLink className="w-3 h-3" />
              </a>
            </div>

            {filteredDivar.length === 0 ? (
              <div className="text-center py-8 text-xs text-slate-500 bg-slate-950/40 rounded-xl">
                هیچ آگهی دیواری با این فیلتر یافت نشد.
              </div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3">
                {filteredDivar.map((ad) => (
                  <div
                    key={ad.id}
                    className="bg-slate-950/70 border border-slate-800 hover:border-slate-700 rounded-xl p-4 flex flex-col justify-between transition-all group"
                  >
                    <div>
                      <div className="flex items-start justify-between gap-2">
                        <h4 className="text-xs font-bold text-slate-200 line-clamp-2 group-hover:text-blue-400 transition-colors">
                          {ad.title}
                        </h4>
                        <span className="shrink-0 text-[10px] px-1.5 py-0.5 rounded bg-red-500/10 text-red-400 border border-red-500/20 font-semibold">
                          دیوار
                        </span>
                      </div>

                      <div className="mt-3 text-base font-extrabold text-white">
                        {ad.price}
                      </div>

                      <div className="mt-2 space-y-1 text-[11px] text-slate-400">
                        <div className="flex items-center gap-1.5">
                          <Gauge className="w-3 h-3 text-slate-500" />
                          <span>{ad.mileage}</span>
                        </div>
                        <div className="flex items-center gap-1.5">
                          <MapPin className="w-3 h-3 text-slate-500" />
                          <span>{ad.location}</span>
                        </div>
                      </div>
                    </div>

                    <div className="mt-4 pt-3 border-t border-slate-800/80 flex items-center justify-between">
                      <span className="text-[10px] text-slate-500">
                        {ad.year ? `مدل ${toPersianDigits(ad.year)}` : 'برلیانس H320'}
                      </span>
                      <a
                        href={ad.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-1 text-xs text-blue-400 hover:text-blue-300 font-medium transition-colors"
                      >
                        <span>مشاهده آگهی</span>
                        <ExternalLink className="w-3 h-3" />
                      </a>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        )}

        {/* Bama Ads (shown if all or bama) */}
        {(activeTab === 'all' || activeTab === 'bama') && (
          <div>
            <div className="flex items-center justify-between mb-3">
              <h3 className="text-sm font-bold text-amber-400 flex items-center gap-2">
                <span className="w-2.5 h-2.5 rounded-full bg-amber-500"></span>
                آگهی‌های ثبت‌شده در باما ({toPersianDigits(filteredBama.length)} آگهی)
              </h3>
              <a
                href="https://bama.ir/car/brilliance/h320/automatic-1650cc"
                target="_blank"
                rel="noopener noreferrer"
                className="text-xs text-slate-400 hover:text-amber-400 flex items-center gap-1 transition-colors"
              >
                <span>مشاهده همه در باما</span>
                <ExternalLink className="w-3 h-3" />
              </a>
            </div>

            {filteredBama.length === 0 ? (
              <div className="text-center py-8 text-xs text-slate-500 bg-slate-950/40 rounded-xl">
                هیچ آگهی بامایی با این فیلتر یافت نشد.
              </div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3">
                {filteredBama.map((ad) => (
                  <div
                    key={ad.id}
                    className="bg-slate-950/70 border border-slate-800 hover:border-slate-700 rounded-xl p-4 flex flex-col justify-between transition-all group"
                  >
                    <div>
                      <div className="flex items-start justify-between gap-2">
                        <h4 className="text-xs font-bold text-slate-200 line-clamp-2 group-hover:text-amber-400 transition-colors">
                          {ad.title}
                        </h4>
                        <span className="shrink-0 text-[10px] px-1.5 py-0.5 rounded bg-amber-500/10 text-amber-400 border border-amber-500/20 font-semibold">
                          باما
                        </span>
                      </div>

                      <div className="mt-3 text-base font-extrabold text-white">
                        {ad.price}
                      </div>

                      <div className="mt-2 space-y-1 text-[11px] text-slate-400">
                        <div className="flex items-center gap-1.5">
                          <Gauge className="w-3 h-3 text-slate-500" />
                          <span>{ad.mileage}</span>
                        </div>
                        <div className="flex items-center gap-1.5">
                          <MapPin className="w-3 h-3 text-slate-500" />
                          <span>{ad.location}</span>
                        </div>
                      </div>
                    </div>

                    <div className="mt-4 pt-3 border-t border-slate-800/80 flex items-center justify-between">
                      <span className="text-[10px] text-slate-500">
                        مدل {toPersianDigits(ad.year)}
                      </span>
                      <a
                        href={ad.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-1 text-xs text-amber-400 hover:text-amber-300 font-medium transition-colors"
                      >
                        <span>مشاهده در باما</span>
                        <ExternalLink className="w-3 h-3" />
                      </a>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
};
