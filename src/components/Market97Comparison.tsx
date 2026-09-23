'use client';

import React from 'react';
import { DivarAd, BamaAd } from '@/lib/types';
import { toPersianDigits } from '@/lib/persian-utils';
import { ExternalLink, Gauge, MapPin } from 'lucide-react';

interface Market97ComparisonProps {
  divarAds: DivarAd[];
  bamaAds: BamaAd[];
}

export const Market97Comparison: React.FC<Market97ComparisonProps> = ({
  divarAds,
  bamaAds,
}) => {
  // STRICT FILTER: Only Model 1397
  const filteredDivar = divarAds.filter(
    (ad) => Number(ad.year) === 1397 || ad.title.includes('97') || ad.title.includes('۹۷')
  );

  const filteredBama = bamaAds.filter(
    (ad) => Number(ad.year) === 1397 || ad.title.includes('97') || ad.title.includes('۹۷')
  );

  return (
    <div className="bg-slate-900 border border-slate-800 rounded-3xl p-6 shadow-xl space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-4 border-b border-slate-800">
        <div>
          <h2 className="text-base font-bold text-white flex items-center gap-2">
            <span>آگهی‌های مستند و واقعی برلیانس H320 مدل ۱۳۹۷ در بازار</span>
          </h2>
          <p className="text-xs text-slate-400 mt-0.5">
            نمونه آگهی‌های فعال در دیوار و باما جهت راستی‌آزمایی و مقایسه قیمت با خودروی کارشناسی شده
          </p>
        </div>
        <span className="text-xs text-blue-400 bg-blue-500/10 px-3 py-1 rounded-full border border-blue-500/20 font-bold self-start sm:self-auto">
          فقط مدل ۱۳۹۷ (اتوماتیک ۱.۶۵)
        </span>
      </div>

      {/* Grid of 1397 Ads */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {/* Divar 1397 Ads */}
        {filteredDivar.map((ad) => (
          <div
            key={ad.id}
            className="bg-slate-950/70 border border-slate-800 hover:border-slate-700 rounded-2xl p-4 flex flex-col justify-between transition-all group shadow-sm"
          >
            <div>
              <div className="flex items-start justify-between gap-2">
                <h3 className="text-xs font-bold text-slate-200 line-clamp-2 group-hover:text-blue-400 transition-colors">
                  {ad.title}
                </h3>
                <span className="shrink-0 text-[10px] px-2 py-0.5 rounded bg-red-500/10 text-red-400 border border-red-500/20 font-bold">
                  دیوار
                </span>
              </div>

              <div className="mt-3 text-lg font-black text-white">
                {ad.price}
              </div>

              <div className="mt-2 space-y-1 text-[11px] text-slate-400">
                <div className="flex items-center gap-1.5">
                  <Gauge className="w-3.5 h-3.5 text-slate-500" />
                  <span>{ad.mileage}</span>
                </div>
                <div className="flex items-center gap-1.5">
                  <MapPin className="w-3.5 h-3.5 text-slate-500" />
                  <span>{ad.location}</span>
                </div>
              </div>
            </div>

            <div className="mt-4 pt-3 border-t border-slate-800 flex items-center justify-between">
              <span className="text-[10px] text-slate-500 font-bold">
                مدل ۱۳۹۷ اتومات
              </span>
              <a
                href={ad.url}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1 text-xs text-blue-400 hover:text-blue-300 font-semibold transition-colors"
              >
                <span>مشاهده در دیوار</span>
                <ExternalLink className="w-3 h-3" />
              </a>
            </div>
          </div>
        ))}

        {/* Bama 1397 Ads */}
        {filteredBama.map((ad) => (
          <div
            key={ad.id}
            className="bg-slate-950/70 border border-slate-800 hover:border-slate-700 rounded-2xl p-4 flex flex-col justify-between transition-all group shadow-sm"
          >
            <div>
              <div className="flex items-start justify-between gap-2">
                <h3 className="text-xs font-bold text-slate-200 line-clamp-2 group-hover:text-amber-400 transition-colors">
                  {ad.title}
                </h3>
                <span className="shrink-0 text-[10px] px-2 py-0.5 rounded bg-amber-500/10 text-amber-400 border border-amber-500/20 font-bold">
                  باما
                </span>
              </div>

              <div className="mt-3 text-lg font-black text-white">
                {ad.price}
              </div>

              <div className="mt-2 space-y-1 text-[11px] text-slate-400">
                <div className="flex items-center gap-1.5">
                  <Gauge className="w-3.5 h-3.5 text-slate-500" />
                  <span>{ad.mileage}</span>
                </div>
                <div className="flex items-center gap-1.5">
                  <MapPin className="w-3.5 h-3.5 text-slate-500" />
                  <span>{ad.location}</span>
                </div>
              </div>
            </div>

            <div className="mt-4 pt-3 border-t border-slate-800 flex items-center justify-between">
              <span className="text-[10px] text-slate-500 font-bold">
                مدل ۱۳۹۷ اتومات
              </span>
              <a
                href={ad.url}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1 text-xs text-amber-400 hover:text-amber-300 font-semibold transition-colors"
              >
                <span>مشاهده در باما</span>
                <ExternalLink className="w-3 h-3" />
              </a>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
