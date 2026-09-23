'use client';

import React, { useState, useMemo } from 'react';
import { Calculator, Gauge, Shield, Wrench, CheckCircle2 } from 'lucide-react';
import { formatPriceWords, formatPriceToman, toPersianDigits, parsePersianNumber } from '@/lib/persian-utils';
import { HamrahMechanicYearPrice, MarketStats } from '@/lib/types';

interface ValuationCalculatorProps {
  stats: MarketStats;
  hamrahPrices: HamrahMechanicYearPrice[];
}

export const ValuationCalculator: React.FC<ValuationCalculatorProps> = ({
  stats,
  hamrahPrices,
}) => {
  const [selectedYear, setSelectedYear] = useState<number>(1399);
  const [mileage, setMileage] = useState<number>(70000);
  const [bodyCondition, setBodyCondition] = useState<string>('perfect'); // perfect, one_part, two_parts, full_paint
  const [gearboxCondition, setGearboxCondition] = useState<string>('perfect'); // perfect, service_needed

  const valuation = useMemo(() => {
    // Base price by year
    const hmItem = hamrahPrices.find((h) => h.year === selectedYear);
    const basePrice = hmItem?.price || stats.priceByYear[selectedYear]?.avg || 2000000000;

    // Standard mileage calculation (20,000 km/year)
    const currentYear = 1403; // or approximate age
    const age = Math.max(1, currentYear - selectedYear);
    const standardMileage = age * 20000;
    const mileageDiff = mileage - standardMileage;

    // Mileage adjustment: each 10,000 km above standard reduces ~1%, below increases ~0.8%
    let mileageFactor = 1.0;
    if (mileageDiff > 0) {
      const extra10k = mileageDiff / 10000;
      mileageFactor -= Math.min(0.12, extra10k * 0.012);
    } else {
      const under10k = Math.abs(mileageDiff) / 10000;
      mileageFactor += Math.min(0.08, under10k * 0.01);
    }

    // Body condition factor
    let bodyFactor = 1.0;
    if (bodyCondition === 'one_part') bodyFactor = 0.96; // 4% drop
    if (bodyCondition === 'two_parts') bodyFactor = 0.92; // 8% drop
    if (bodyCondition === 'full_paint') bodyFactor = 0.84; // 16% drop

    // Gearbox & technical factor
    let techFactor = 1.0;
    if (gearboxCondition === 'service_needed') techFactor = 0.95; // 5% drop

    const estimated = Math.round(basePrice * mileageFactor * bodyFactor * techFactor);
    const minRange = Math.round(estimated * 0.96);
    const maxRange = Math.round(estimated * 1.04);

    return {
      estimated,
      minRange,
      maxRange,
      standardMileage,
      diffPercent: Math.round(((estimated - basePrice) / basePrice) * 100),
    };
  }, [selectedYear, mileage, bodyCondition, gearboxCondition, hamrahPrices, stats]);

  return (
    <div className="bg-gradient-to-br from-slate-900 via-slate-900 to-blue-950/30 border border-slate-800 rounded-2xl p-5 sm:p-6 shadow-xl">
      <div className="flex items-center gap-3 pb-4 border-b border-slate-800">
        <span className="p-2.5 rounded-xl bg-blue-600/20 text-blue-400">
          <Calculator className="w-6 h-6" />
        </span>
        <div>
          <h2 className="text-lg font-bold text-white">
            ماشین‌حساب هوشمند تخمین قیمت برلیانس H320 اتومات ۱.۶۵
          </h2>
          <p className="text-xs text-slate-400 mt-0.5">
            برآورد ارزش منصفانه خودرو بر اساس سال ساخت، کارکرد دقیق و وضعیت رنگ و بدنه
          </p>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 mt-6">
        {/* Controls (7 cols) */}
        <div className="lg:col-span-7 space-y-5">
          {/* Year selector */}
          <div>
            <label className="block text-xs font-semibold text-slate-300 mb-2">
              ۱. انتخاب سال ساخت (مدل خودرو):
            </label>
            <div className="grid grid-cols-4 gap-2">
              {[1400, 1399, 1398, 1397].map((year) => (
                <button
                  key={year}
                  type="button"
                  onClick={() => setSelectedYear(year)}
                  className={`py-2.5 px-3 rounded-xl text-xs font-bold transition-all cursor-pointer ${
                    selectedYear === year
                      ? 'bg-blue-600 text-white shadow-lg shadow-blue-600/30 ring-2 ring-blue-400'
                      : 'bg-slate-800/80 text-slate-300 hover:bg-slate-700/80 border border-slate-700/50'
                  }`}
                >
                  مدل {toPersianDigits(year)}
                </button>
              ))}
            </div>
          </div>

          {/* Mileage slider */}
          <div>
            <div className="flex items-center justify-between mb-2">
              <label className="text-xs font-semibold text-slate-300 flex items-center gap-1.5">
                <Gauge className="w-4 h-4 text-blue-400" />
                <span>۲. کارکرد خودرو:</span>
              </label>
              <span className="text-xs font-bold text-blue-400 font-mono bg-blue-500/10 px-2.5 py-0.5 rounded-lg border border-blue-500/20">
                {toPersianDigits(mileage.toLocaleString('en-US'))} کیلومتر
              </span>
            </div>
            <input
              type="range"
              min="10000"
              max="200000"
              step="5000"
              value={mileage}
              onChange={(e) => setMileage(Number(e.target.value))}
              className="w-full h-2 bg-slate-800 rounded-lg appearance-none cursor-pointer accent-blue-500"
            />
            <div className="flex justify-between text-[10px] text-slate-500 mt-1">
              <span>۱۰,۰۰۰ کم‌کار</span>
              <span>کارکرد نرمال مدل {toPersianDigits(selectedYear)}: {toPersianDigits(valuation.standardMileage.toLocaleString('en-US'))} کیلومتر</span>
              <span>۲۰۰,۰۰۰ پرکار</span>
            </div>
          </div>

          {/* Body condition */}
          <div>
            <label className="block text-xs font-semibold text-slate-300 mb-2 flex items-center gap-1.5">
              <Shield className="w-4 h-4 text-blue-400" />
              <span>۳. وضعیت رنگ و بدنه:</span>
            </label>
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
              {[
                { id: 'perfect', label: 'بی‌رنگ و شاسی پلمپ' },
                { id: 'one_part', label: 'یک لکه رنگ جزئی' },
                { id: 'two_parts', label: 'دو یا چند لکه رنگ' },
                { id: 'full_paint', label: 'دور رنگ / تعویضی' },
              ].map((item) => (
                <button
                  key={item.id}
                  type="button"
                  onClick={() => setBodyCondition(item.id)}
                  className={`py-2 px-2.5 rounded-xl text-xs font-medium transition-all text-center cursor-pointer ${
                    bodyCondition === item.id
                      ? 'bg-blue-600/30 text-blue-300 border border-blue-500'
                      : 'bg-slate-800/60 text-slate-400 hover:bg-slate-800 border border-slate-700/50'
                  }`}
                >
                  {item.label}
                </button>
              ))}
            </div>
          </div>

          {/* Technical & Gearbox condition */}
          <div>
            <label className="block text-xs font-semibold text-slate-300 mb-2 flex items-center gap-1.5">
              <Wrench className="w-4 h-4 text-blue-400" />
              <span>۴. وضعیت گیربکس اتومات و فنی:</span>
            </label>
            <div className="grid grid-cols-2 gap-2">
              {[
                { id: 'perfect', label: 'گیربکس و موتور کاملاً سالم بدون تقه' },
                { id: 'service_needed', label: 'نیازمند سرویس گیربکس یا تعویض روغن' },
              ].map((item) => (
                <button
                  key={item.id}
                  type="button"
                  onClick={() => setGearboxCondition(item.id)}
                  className={`py-2 px-3 rounded-xl text-xs font-medium transition-all text-center cursor-pointer ${
                    gearboxCondition === item.id
                      ? 'bg-blue-600/30 text-blue-300 border border-blue-500'
                      : 'bg-slate-800/60 text-slate-400 hover:bg-slate-800 border border-slate-700/50'
                  }`}
                >
                  {item.label}
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Valuation Result Box (5 cols) */}
        <div className="lg:col-span-5 bg-slate-950/80 border border-blue-500/30 rounded-2xl p-5 flex flex-col justify-between shadow-inner">
          <div>
            <div className="flex items-center justify-between text-xs text-slate-400">
              <span>تخمین ارزش منصفانه کارشناسی:</span>
              <span className="flex items-center gap-1 text-emerald-400 bg-emerald-950/50 px-2 py-0.5 rounded-full border border-emerald-500/20">
                <CheckCircle2 className="w-3.5 h-3.5" />
                تحلیل هوشمند
              </span>
            </div>

            <div className="mt-4">
              <div className="text-3xl font-black text-transparent bg-clip-text bg-gradient-to-r from-blue-300 via-white to-blue-200">
                {formatPriceWords(valuation.estimated)}
              </div>
              <div className="text-xs text-slate-400 mt-1 font-mono">
                {formatPriceToman(valuation.estimated)}
              </div>
            </div>

            {/* Price Range */}
            <div className="mt-5 space-y-2 text-xs">
              <div className="flex justify-between p-2 rounded-xl bg-slate-900 border border-slate-800">
                <span className="text-slate-400">بازه فروش فوری:</span>
                <span className="font-bold text-slate-200 font-mono">
                  {formatPriceWords(valuation.minRange)}
                </span>
              </div>
              <div className="flex justify-between p-2 rounded-xl bg-slate-900 border border-slate-800">
                <span className="text-slate-400">سقف مصرف‌کننده:</span>
                <span className="font-bold text-slate-200 font-mono">
                  {formatPriceWords(valuation.maxRange)}
                </span>
              </div>
            </div>
          </div>

          <div className="mt-5 pt-4 border-t border-slate-800/80 text-[11px] text-slate-400 leading-relaxed">
            💡 این برآورد بر اساس میانگین وزنی آگهی‌های واقعی دیوار، باما و نرخ کارشناسی همراه مکانیک برای برلیانس H320 با موتور ۱۶۵۰ سی‌سی محاسبه شده است.
          </div>
        </div>
      </div>
    </div>
  );
};
