'use client';

import React from 'react';
import { MarketStats, HamrahMechanicYearPrice } from '@/lib/types';
import { formatPriceWords, formatPriceToman, toPersianDigits } from '@/lib/persian-utils';
import { Calendar, BarChart2, ExternalLink } from 'lucide-react';

interface YearComparisonTableProps {
  stats: MarketStats;
  hamrahPrices: HamrahMechanicYearPrice[];
}

export const YearComparisonTable: React.FC<YearComparisonTableProps> = ({
  stats,
  hamrahPrices,
}) => {
  const years = [1400, 1399, 1398, 1397];

  return (
    <div className="bg-slate-900 border border-slate-800 rounded-2xl p-5 shadow-xl">
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-2 pb-4 border-b border-slate-800">
        <div className="flex items-center gap-2.5">
          <span className="p-2 rounded-xl bg-blue-500/10 text-blue-400">
            <Calendar className="w-5 h-5" />
          </span>
          <div>
            <h2 className="text-base font-bold text-white">
              جدول مقایسه قیمت برلیانس H320 اتومات ۱.۶۵ به تفکیک سال ساخت
            </h2>
            <p className="text-xs text-slate-400">
              مقایسه میانگین آگهی‌های دیوار و باما با کارشناسی رسمی همراه مکانیک
            </p>
          </div>
        </div>
      </div>

      <div className="overflow-x-auto mt-4">
        <table className="w-full text-right text-xs">
          <thead>
            <tr className="border-b border-slate-800 text-slate-400 font-semibold">
              <th className="py-3 px-3">سال ساخت</th>
              <th className="py-3 px-3">قیمت کارشناسی (همراه مکانیک)</th>
              <th className="py-3 px-3">میانگین آگهی‌های بازار</th>
              <th className="py-3 px-3">بازه قیمت بازار (کف تا سقف)</th>
              <th className="py-3 px-3 text-center">مشاهده منبع</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-800/60">
            {years.map((year) => {
              const yearStat = stats.priceByYear[year];
              const hmItem = hamrahPrices.find((h) => h.year === year);
              const avg = yearStat?.avg || hmItem?.price || 0;
              const min = yearStat?.min || Math.round(avg * 0.95);
              const max = yearStat?.max || Math.round(avg * 1.05);

              return (
                <tr key={year} className="hover:bg-slate-800/40 transition-colors">
                  {/* Year badge */}
                  <td className="py-4 px-3 font-bold text-sm text-white">
                    <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-lg bg-slate-800 border border-slate-700 text-blue-400">
                      مدل {toPersianDigits(year)}
                    </span>
                  </td>

                  {/* Hamrah Mechanic Price */}
                  <td className="py-4 px-3">
                    {hmItem ? (
                      <div>
                        <div className="font-bold text-emerald-400 text-sm">
                          {formatPriceWords(hmItem.price)}
                        </div>
                        <div className="text-[11px] text-slate-400">
                          بازه کارشناسی: {toPersianDigits(Math.round(hmItem.priceDown / 1_000_000))} تا{' '}
                          {toPersianDigits(Math.round(hmItem.priceUp / 1_000_000))} م.ت
                        </div>
                      </div>
                    ) : (
                      <span className="text-slate-500">تخمین کارشناسی: {formatPriceWords(avg)}</span>
                    )}
                  </td>

                  {/* Market Avg */}
                  <td className="py-4 px-3">
                    <div className="font-bold text-white text-sm">
                      {formatPriceWords(avg)}
                    </div>
                    <div className="text-[11px] text-slate-400 font-mono">
                      {formatPriceToman(avg)}
                    </div>
                  </td>

                  {/* Min / Max Range */}
                  <td className="py-4 px-3">
                    <div className="flex flex-col gap-1.5 max-w-xs">
                      <div className="flex items-center justify-between text-[11px] text-slate-300">
                        <span className="text-blue-300">کف: {formatPriceWords(min)}</span>
                        <span className="text-amber-300">سقف: {formatPriceWords(max)}</span>
                      </div>
                      <div className="w-full bg-slate-800 h-2 rounded-full overflow-hidden flex">
                        <div className="bg-gradient-to-r from-blue-500 via-indigo-500 to-amber-500 h-full w-full rounded-full"></div>
                      </div>
                    </div>
                  </td>

                  {/* Links */}
                  <td className="py-4 px-3 text-center">
                    <div className="flex items-center justify-center gap-2">
                      <a
                        href={hmItem?.sourceUrl || 'https://www.hamrah-mechanic.com/carprice/brilliance/h320parskhodro/'}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-1 px-2.5 py-1 rounded-lg bg-emerald-500/10 hover:bg-emerald-500/20 text-emerald-400 border border-emerald-500/20 text-[11px] transition-colors"
                      >
                        <span>همراه مکانیک</span>
                        <ExternalLink className="w-3 h-3" />
                      </a>
                      <a
                        href={`https://divar.ir/s/tehran/car/brilliance/h320?q=${encodeURIComponent(`h320 ${year}`)}`}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-1 px-2.5 py-1 rounded-lg bg-red-500/10 hover:bg-red-500/20 text-red-400 border border-red-500/20 text-[11px] transition-colors"
                      >
                        <span>دیوار</span>
                        <ExternalLink className="w-3 h-3" />
                      </a>
                    </div>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
};
