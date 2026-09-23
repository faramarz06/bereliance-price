'use client';

import React from 'react';
import { SpecificCarValuation } from '@/lib/types';
import { formatPriceWords, formatPriceToman, toPersianDigits } from '@/lib/persian-utils';
import {
  TrendingUp,
  ShieldCheck,
  Flame,
  ExternalLink,
  ArrowDownRight,
  ArrowUpRight,
  Calculator,
  CheckCircle2,
  MinusCircle,
  PlusCircle,
} from 'lucide-react';

interface SpecificPriceSummaryProps {
  valuation: SpecificCarValuation;
}

export const SpecificPriceSummary: React.FC<SpecificPriceSummaryProps> = ({ valuation }) => {
  const { sources, finalValuation, bodyDeductions } = valuation;

  return (
    <div className="space-y-6">
      {/* 1. Main High-Impact Fair Valuation Banner */}
      <div className="relative overflow-hidden rounded-3xl bg-gradient-to-r from-emerald-950/80 via-slate-900 to-blue-950/80 border-2 border-emerald-500/50 p-6 sm:p-8 shadow-2xl">
        <div className="flex flex-col lg:flex-row items-start lg:items-center justify-between gap-6">
          <div className="space-y-2">
            <div className="flex items-center gap-2 flex-wrap">
              <span className="px-3 py-1 rounded-full text-xs font-black bg-emerald-500/20 text-emerald-300 border border-emerald-500/30 flex items-center gap-1.5">
                <Flame className="w-4 h-4 text-emerald-400" />
                ارزش منصفانه کارشناسی روز این خودرو
              </span>
              <span className="text-xs text-slate-400">
                بر اساس تحلیل همزمان ۴ منبع معتبر با وضعیت بدنه و موتور اختصاصی
              </span>
            </div>

            <div className="flex items-baseline gap-3 flex-wrap pt-2">
              <div className="text-3xl sm:text-5xl font-black text-transparent bg-clip-text bg-gradient-to-r from-emerald-300 via-white to-blue-300 tracking-tight">
                {formatPriceWords(finalValuation.fairPrice)}
              </div>
              <div className="text-sm sm:text-base text-blue-400 font-mono">
                ({formatPriceToman(finalValuation.fairPrice)})
              </div>
            </div>

            <p className="text-xs text-slate-300 max-w-2xl leading-relaxed pt-1">
              این رقم دقیقاً متناسب با گزارش کارشناسی پایتخت (درب تعویض، گلگیر عقب رنگ) و لحاظ امتیاز قطعی <strong className="text-emerald-300">موتور تازه تعمیر اساسی</strong> در مقایسه با مظنه همراه مکانیک، دیوار، باما و خودرو۴۵ استخراج شده است.
            </p>
          </div>

          {/* Quick Sale & Retail Ceiling */}
          <div className="w-full lg:w-auto shrink-0 flex flex-col sm:flex-row gap-3 text-xs">
            <div className="bg-slate-900/90 border border-slate-800 rounded-2xl p-4 min-w-[200px]">
              <span className="text-slate-400 block text-xs flex items-center gap-1">
                <ArrowDownRight className="w-3.5 h-3.5 text-blue-400" />
                کف قیمت (فروش فوری نقدی):
              </span>
              <span className="font-extrabold text-slate-100 text-lg mt-2 block">
                {formatPriceWords(finalValuation.quickCashSale)}
              </span>
              <span className="text-[10px] text-slate-500 mt-1 block">
                معامله نقدی ظرف ۲۴ تا ۴۸ ساعت
              </span>
            </div>

            <div className="bg-slate-900/90 border border-slate-800 rounded-2xl p-4 min-w-[200px]">
              <span className="text-slate-400 block text-xs flex items-center gap-1">
                <ArrowUpRight className="w-3.5 h-3.5 text-amber-400" />
                سقف قیمت (مصرف‌کننده):
              </span>
              <span className="font-extrabold text-amber-300 text-lg mt-2 block">
                {formatPriceWords(finalValuation.topRetailConsumer)}
              </span>
              <span className="text-[10px] text-slate-500 mt-1 block">
                با ارائه فاکتور تعمیر اساسی و شاسی پلمپ
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* 2. Detailed Inspection Body & Engine Valuation Math Table */}
      <div className="bg-slate-900 border border-slate-800 rounded-3xl p-6 shadow-xl space-y-4">
        <div className="flex items-center gap-2 pb-3 border-b border-slate-800">
          <Calculator className="w-5 h-5 text-blue-400" />
          <h2 className="text-sm font-bold text-white">
            جدول دقیق محاسبه افت بدنه و ارزش افزوده موتور (بر اساس برگه کارشناسی)
          </h2>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-3 text-xs">
          {/* Base */}
          <div className="bg-slate-950/70 border border-slate-800 rounded-xl p-3.5">
            <span className="text-slate-400 text-[11px] block">قیمت پایه مدل ۹۷ بیرنگ:</span>
            <span className="text-sm font-bold text-white mt-1 block font-mono">
              {formatPriceWords(bodyDeductions.basePristinePrice)}
            </span>
            <span className="text-[10px] text-slate-500 mt-0.5 block">مبنای کارشناسی صفر بیرنگ</span>
          </div>

          {/* Replaced Door */}
          <div className="bg-slate-950/70 border border-red-500/20 rounded-xl p-3.5">
            <span className="text-red-400 text-[11px] block flex items-center gap-1">
              <MinusCircle className="w-3 h-3" />
              افت درب جلو چپ تعویض:
            </span>
            <span className="text-sm font-bold text-red-300 mt-1 block font-mono">
              - {formatPriceWords(bodyDeductions.replacedDoorDeduction)}
            </span>
            <span className="text-[10px] text-slate-400 mt-0.5 block">کسر استاندارد درب فابریک</span>
          </div>

          {/* Painted Parts */}
          <div className="bg-slate-950/70 border border-amber-500/20 rounded-xl p-3.5">
            <span className="text-amber-400 text-[11px] block flex items-center gap-1">
              <MinusCircle className="w-3 h-3" />
              افت رنگ گلگیر و درب جلو:
            </span>
            <span className="text-sm font-bold text-amber-300 mt-1 block font-mono">
              - {formatPriceWords(bodyDeductions.paintedPartsDeduction)}
            </span>
            <span className="text-[10px] text-slate-400 mt-0.5 block">گلگیر عقب + درب جلو راست</span>
          </div>

          {/* Mileage */}
          <div className="bg-slate-950/70 border border-slate-800 rounded-xl p-3.5">
            <span className="text-slate-400 text-[11px] block flex items-center gap-1">
              <MinusCircle className="w-3 h-3" />
              افت کارکرد ۱۴۵ هزار تا:
            </span>
            <span className="text-sm font-bold text-slate-300 mt-1 block font-mono">
              - {formatPriceWords(bodyDeductions.mileageDeduction)}
            </span>
            <span className="text-[10px] text-slate-500 mt-0.5 block">نسبت به نرمال ۱۲۰ هزار</span>
          </div>

          {/* Fresh Engine Bonus */}
          <div className="bg-gradient-to-br from-emerald-950/50 to-slate-950/80 border border-emerald-500/40 rounded-xl p-3.5">
            <span className="text-emerald-400 text-[11px] font-bold block flex items-center gap-1">
              <PlusCircle className="w-3 h-3" />
              ارزش افزوده موتور تازه تعمیر:
            </span>
            <span className="text-sm font-black text-emerald-300 mt-1 block font-mono">
              + {formatPriceWords(bodyDeductions.freshEngineBonus)}
            </span>
            <span className="text-[10px] text-emerald-400/90 mt-0.5 block">معافیت از هزینه تعمیر اساسی</span>
          </div>
        </div>
      </div>

      {/* 3. Four Source Comparison Cards (همراه مکانیک، دیوار، باما، خودرو۴۵) */}
      <div>
        <h2 className="text-base font-bold text-white mb-3 flex items-center gap-2">
          <span>استعلام زنده از ۴ مرجع بازار خودرو برای مشخصات دقیق این برلیانس</span>
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          {/* Source 1: Hamrah Mechanic */}
          <div className="bg-slate-900 border border-emerald-500/30 rounded-2xl p-5 shadow-lg flex flex-col justify-between">
            <div>
              <div className="flex items-center justify-between">
                <span className="text-xs font-bold text-emerald-400 flex items-center gap-1.5">
                  <ShieldCheck className="w-4 h-4" />
                  همراه مکانیک
                </span>
                <span className="text-[10px] px-2 py-0.5 rounded bg-emerald-500/10 text-emerald-300 font-bold">
                  کارشناسی رسمی
                </span>
              </div>
              <div className="mt-3 text-xl font-black text-white">
                {formatPriceWords(sources.hamrahMechanic.adjustedPrice)}
              </div>
              <div className="text-xs text-slate-400 mt-0.5 font-mono">
                {formatPriceToman(sources.hamrahMechanic.adjustedPrice)}
              </div>
              <div className="mt-4 pt-3 border-t border-slate-800 text-xs text-slate-400 space-y-1">
                <div className="flex justify-between">
                  <span>بازه منصفانه:</span>
                  <span className="text-slate-300 font-semibold">
                    {toPersianDigits(Math.round(sources.hamrahMechanic.minPrice / 1_000_000))} تا{' '}
                    {toPersianDigits(Math.round(sources.hamrahMechanic.maxPrice / 1_000_000))} م.ت
                  </span>
                </div>
                <div className="text-[10px] text-slate-400 mt-1 leading-relaxed">
                  {sources.hamrahMechanic.notes}
                </div>
              </div>
            </div>

            <div className="mt-4 pt-3 border-t border-slate-800">
              <a
                href={sources.hamrahMechanic.url}
                target="_blank"
                rel="noopener noreferrer"
                className="w-full inline-flex items-center justify-center gap-1 text-xs text-emerald-400 hover:text-emerald-300 font-semibold py-1.5 rounded-lg bg-emerald-500/10 hover:bg-emerald-500/20 transition-colors"
              >
                <span>مشاهده در همراه مکانیک</span>
                <ExternalLink className="w-3.5 h-3.5" />
              </a>
            </div>
          </div>

          {/* Source 2: Divar */}
          <div className="bg-slate-900 border border-red-500/30 rounded-2xl p-5 shadow-lg flex flex-col justify-between">
            <div>
              <div className="flex items-center justify-between">
                <span className="text-xs font-bold text-red-400 flex items-center gap-1.5">
                  <span className="w-2.5 h-2.5 rounded-full bg-red-500"></span>
                  دیوار (Divar)
                </span>
                <span className="text-[10px] px-2 py-0.5 rounded bg-red-500/10 text-red-300 font-bold">
                  آگهی‌های فعال
                </span>
              </div>
              <div className="mt-3 text-xl font-black text-white">
                {formatPriceWords(sources.divar.adjustedPrice)}
              </div>
              <div className="text-xs text-slate-400 mt-0.5 font-mono">
                {formatPriceToman(sources.divar.adjustedPrice)}
              </div>
              <div className="mt-4 pt-3 border-t border-slate-800 text-xs text-slate-400 space-y-1">
                <div className="flex justify-between">
                  <span>بازه در آگهی‌ها:</span>
                  <span className="text-slate-300 font-semibold">
                    {toPersianDigits(Math.round(sources.divar.minPrice / 1_000_000))} تا{' '}
                    {toPersianDigits(Math.round(sources.divar.maxPrice / 1_000_000))} م.ت
                  </span>
                </div>
                <div className="text-[10px] text-slate-400 mt-1 leading-relaxed">
                  {sources.divar.notes}
                </div>
              </div>
            </div>

            <div className="mt-4 pt-3 border-t border-slate-800">
              <a
                href={sources.divar.url}
                target="_blank"
                rel="noopener noreferrer"
                className="w-full inline-flex items-center justify-center gap-1 text-xs text-red-400 hover:text-red-300 font-semibold py-1.5 rounded-lg bg-red-500/10 hover:bg-red-500/20 transition-colors"
              >
                <span>مشاهده آگهی‌های دیوار</span>
                <ExternalLink className="w-3.5 h-3.5" />
              </a>
            </div>
          </div>

          {/* Source 3: Bama */}
          <div className="bg-slate-900 border border-amber-500/30 rounded-2xl p-5 shadow-lg flex flex-col justify-between">
            <div>
              <div className="flex items-center justify-between">
                <span className="text-xs font-bold text-amber-400 flex items-center gap-1.5">
                  <span className="w-2.5 h-2.5 rounded-full bg-amber-500"></span>
                  باما (Bama)
                </span>
                <span className="text-[10px] px-2 py-0.5 rounded bg-amber-500/10 text-amber-300 font-bold">
                  آگهی‌های تریم ۱.۶۵
                </span>
              </div>
              <div className="mt-3 text-xl font-black text-white">
                {formatPriceWords(sources.bama.adjustedPrice)}
              </div>
              <div className="text-xs text-slate-400 mt-0.5 font-mono">
                {formatPriceToman(sources.bama.adjustedPrice)}
              </div>
              <div className="mt-4 pt-3 border-t border-slate-800 text-xs text-slate-400 space-y-1">
                <div className="flex justify-between">
                  <span>بازه در باما:</span>
                  <span className="text-slate-300 font-semibold">
                    {toPersianDigits(Math.round(sources.bama.minPrice / 1_000_000))} تا{' '}
                    {toPersianDigits(Math.round(sources.bama.maxPrice / 1_000_000))} م.ت
                  </span>
                </div>
                <div className="text-[10px] text-slate-400 mt-1 leading-relaxed">
                  {sources.bama.notes}
                </div>
              </div>
            </div>

            <div className="mt-4 pt-3 border-t border-slate-800">
              <a
                href={sources.bama.url}
                target="_blank"
                rel="noopener noreferrer"
                className="w-full inline-flex items-center justify-center gap-1 text-xs text-amber-400 hover:text-amber-300 font-semibold py-1.5 rounded-lg bg-amber-500/10 hover:bg-amber-500/20 transition-colors"
              >
                <span>مشاهده در باما</span>
                <ExternalLink className="w-3.5 h-3.5" />
              </a>
            </div>
          </div>

          {/* Source 4: Khodro45 */}
          <div className="bg-slate-900 border border-blue-500/30 rounded-2xl p-5 shadow-lg flex flex-col justify-between">
            <div>
              <div className="flex items-center justify-between">
                <span className="text-xs font-bold text-blue-400 flex items-center gap-1.5">
                  <span className="w-2.5 h-2.5 rounded-full bg-blue-500"></span>
                  خودرو۴۵ (Khodro45)
                </span>
                <span className="text-[10px] px-2 py-0.5 rounded bg-blue-500/10 text-blue-300 font-bold">
                  کارشناسی خرید نقدی
                </span>
              </div>
              <div className="mt-3 text-xl font-black text-white">
                {formatPriceWords(sources.khodro45.adjustedPrice)}
              </div>
              <div className="text-xs text-slate-400 mt-0.5 font-mono">
                {formatPriceToman(sources.khodro45.adjustedPrice)}
              </div>
              <div className="mt-4 pt-3 border-t border-slate-800 text-xs text-slate-400 space-y-1">
                <div className="flex justify-between">
                  <span>بازه خرید نقدی:</span>
                  <span className="text-slate-300 font-semibold">
                    {toPersianDigits(Math.round(sources.khodro45.minPrice / 1_000_000))} تا{' '}
                    {toPersianDigits(Math.round(sources.khodro45.maxPrice / 1_000_000))} م.ت
                  </span>
                </div>
                <div className="text-[10px] text-slate-400 mt-1 leading-relaxed">
                  {sources.khodro45.notes}
                </div>
              </div>
            </div>

            <div className="mt-4 pt-3 border-t border-slate-800">
              <a
                href={sources.khodro45.url}
                target="_blank"
                rel="noopener noreferrer"
                className="w-full inline-flex items-center justify-center gap-1 text-xs text-blue-400 hover:text-blue-300 font-semibold py-1.5 rounded-lg bg-blue-500/10 hover:bg-blue-500/20 transition-colors"
              >
                <span>مشاهده در خودرو۴۵</span>
                <ExternalLink className="w-3.5 h-3.5" />
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
