'use client';

import React from 'react';
import {
  ShieldCheck,
  Wrench,
  AlertTriangle,
  ExternalLink,
  Car,
  FileCheck,
  CheckCircle2,
  Calendar,
  Gauge,
  Palette,
} from 'lucide-react';
import { toPersianDigits } from '@/lib/persian-utils';

interface CarDossierHeroProps {
  lastUpdated: string;
  secondsUntilRefresh: number;
}

export const CarDossierHero: React.FC<CarDossierHeroProps> = ({
  lastUpdated,
  secondsUntilRefresh,
}) => {
  return (
    <div className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-slate-900 via-slate-900 to-blue-950/90 border-2 border-blue-500/40 p-6 sm:p-8 shadow-2xl">
      {/* Decorative ambient background glows */}
      <div className="absolute top-0 right-0 -mr-28 -mt-28 w-96 h-96 rounded-full bg-blue-600/15 blur-3xl pointer-events-none"></div>
      <div className="absolute bottom-0 left-0 -ml-28 -mb-28 w-96 h-96 rounded-full bg-emerald-600/15 blur-3xl pointer-events-none"></div>

      <div className="relative z-10 space-y-6">
        {/* Top Header Badge & Live Auto-Update Pill */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-5 border-b border-slate-800">
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 rounded-2xl bg-gradient-to-tr from-blue-600 to-indigo-600 flex items-center justify-center shadow-lg shadow-blue-600/30 shrink-0">
              <Car className="w-6 h-6 text-white" />
            </div>
            <div>
              <div className="flex items-center gap-2 flex-wrap">
                <span className="px-2.5 py-0.5 rounded-full text-xs font-black bg-blue-500/20 text-blue-300 border border-blue-500/30">
                  شناسنامه اختصاصی خودرو
                </span>
                <span className="text-xs text-slate-400">
                  شماره شاسی: <span className="font-mono text-slate-300">NAPH320BBJ1015714</span>
                </span>
              </div>
              <h1 className="text-xl sm:text-2xl font-black text-white mt-1">
                برلیانس H320 اتوماتیک موتور بزرگ ۱.۶۵ — مدل ۱۳۹۷
              </h1>
            </div>
          </div>

          {/* Live Auto-Refresh Indicator */}
          <div className="flex items-center gap-2 self-start sm:self-auto bg-slate-950/80 px-3.5 py-1.5 rounded-xl border border-slate-800 text-xs">
            <span className="flex h-2.5 w-2.5 relative">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-emerald-500"></span>
            </span>
            <span className="text-emerald-400 font-semibold">بروزرسانی خودکار فعال:</span>
            <span className="text-slate-300 font-mono font-bold">
              {toPersianDigits(secondsUntilRefresh)} ثانیه
            </span>
          </div>
        </div>

        {/* 4 Identity Feature Pills (Locked strictly to this car) */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-3">
          {/* Year */}
          <div className="bg-slate-950/70 border border-slate-800 rounded-2xl p-4 flex items-center gap-3">
            <div className="p-2.5 rounded-xl bg-blue-500/10 text-blue-400 shrink-0">
              <Calendar className="w-5 h-5" />
            </div>
            <div>
              <span className="text-[11px] text-slate-400 block">مدل و سال ساخت:</span>
              <span className="text-sm font-black text-white">فقط مدل ۱۳۹۷</span>
              <span className="text-[10px] text-blue-400 block">موتور بزرگ ۱۶۵۰ سی‌سی</span>
            </div>
          </div>

          {/* Mileage */}
          <div className="bg-slate-950/70 border border-slate-800 rounded-2xl p-4 flex items-center gap-3">
            <div className="p-2.5 rounded-xl bg-indigo-500/10 text-indigo-400 shrink-0">
              <Gauge className="w-5 h-5" />
            </div>
            <div>
              <span className="text-[11px] text-slate-400 block">کارکرد دقیق خودرو:</span>
              <span className="text-sm font-black text-indigo-300 font-mono">
                ۱۴۵,۰۰۰ کیلومتر
              </span>
              <span className="text-[10px] text-slate-400 block">ثبت شده در کارشناسی</span>
            </div>
          </div>

          {/* Color */}
          <div className="bg-slate-950/70 border border-slate-800 rounded-2xl p-4 flex items-center gap-3">
            <div className="p-2.5 rounded-xl bg-slate-800 text-slate-300 shrink-0">
              <Palette className="w-5 h-5" />
            </div>
            <div>
              <span className="text-[11px] text-slate-400 block">رنگ بدنه:</span>
              <span className="text-sm font-black text-white flex items-center gap-1.5">
                <span className="w-3 h-3 rounded-full bg-white border border-slate-300 inline-block shadow-sm"></span>
                سفید روغنی
              </span>
              <span className="text-[10px] text-slate-400 block">بیشترین نقدشوندگی بازار</span>
            </div>
          </div>

          {/* Fresh Engine Feature */}
          <div className="bg-gradient-to-br from-emerald-950/50 to-slate-950/80 border border-emerald-500/40 rounded-2xl p-4 flex items-center gap-3">
            <div className="p-2.5 rounded-xl bg-emerald-500/20 text-emerald-400 shrink-0">
              <Wrench className="w-5 h-5" />
            </div>
            <div>
              <span className="text-[11px] text-emerald-400 font-bold block">وضعیت پیشرانه:</span>
              <span className="text-sm font-black text-emerald-300">موتور تازه تعمیر ⭐</span>
              <span className="text-[10px] text-emerald-400/80 block">تعمیر اساسی و بدون استهلاک</span>
            </div>
          </div>
        </div>

        {/* Official Inspection Details Grid (برگه کارشناسی کارشناس پایتخت) */}
        <div className="bg-slate-950/80 border border-slate-800 rounded-2xl p-5 space-y-4">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-3 border-b border-slate-800/80">
            <div className="flex items-center gap-2">
              <FileCheck className="w-5 h-5 text-blue-400" />
              <h2 className="text-sm font-bold text-white">
                گزارش رسمی برگه کارشناسی کارشناس پایتخت (شماره برگه: ۱۰۱۲۹۳۴۱۲۸)
              </h2>
            </div>
            <a
              href="https://es.karshenaspaytakht.com/F/1012934128"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1.5 px-3 py-1 rounded-xl bg-blue-600/20 hover:bg-blue-600/30 text-blue-300 border border-blue-500/30 text-xs font-bold transition-all w-fit"
            >
              <span>مشاهده مستقیم برگه در سامانه کارشناسی</span>
              <ExternalLink className="w-3.5 h-3.5" />
            </a>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-3 text-xs">
            {/* Box 1: Chassis & Integrity */}
            <div className="bg-slate-900/90 border border-emerald-500/30 rounded-xl p-3.5 space-y-2">
              <div className="flex items-center justify-between text-emerald-400 font-bold">
                <span className="flex items-center gap-1.5">
                  <ShieldCheck className="w-4 h-4" />
                  اصالت شاسی‌ها و اتاق
                </span>
                <span className="text-[10px] px-2 py-0.5 rounded bg-emerald-500/10 text-emerald-300">
                  تایید شده
                </span>
              </div>
              <ul className="space-y-1.5 text-slate-300 text-[11px]">
                <li className="flex items-center gap-1.5">
                  <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400 shrink-0" />
                  <span>اصل شاسی‌های جلو و عقب کاملاً سالم و پلمپ</span>
                </li>
                <li className="flex items-center gap-1.5">
                  <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400 shrink-0" />
                  <span>سقف و ستون‌ها کاملاً فابریک و بدون رنگ</span>
                </li>
                <li className="flex items-center gap-1.5 text-amber-300">
                  <AlertTriangle className="w-3.5 h-3.5 text-amber-400 shrink-0" />
                  <span>سینی عقب ضربه ترافیکی جزئی (بدون آسیب به شاسی)</span>
                </li>
              </ul>
            </div>

            {/* Box 2: Paint & Replaced Parts */}
            <div className="bg-slate-900/90 border border-amber-500/30 rounded-xl p-3.5 space-y-2">
              <div className="flex items-center justify-between text-amber-400 font-bold">
                <span className="flex items-center gap-1.5">
                  <AlertTriangle className="w-4 h-4" />
                  وضعیت رنگ و تعویض بدنه
                </span>
                <span className="text-[10px] px-2 py-0.5 rounded bg-amber-500/10 text-amber-300">
                  طبق گزارش
                </span>
              </div>
              <ul className="space-y-1.5 text-slate-300 text-[11px]">
                <li className="flex items-center justify-between">
                  <span>درب جلو سمت راننده (چپ):</span>
                  <span className="font-bold text-red-400">تعویض</span>
                </li>
                <li className="flex items-center justify-between">
                  <span>گلگیر عقب + درب جلو راست:</span>
                  <span className="text-amber-300 font-semibold">مقداری رنگ‌شدگی</span>
                </li>
                <li className="flex items-center justify-between">
                  <span>نوک گلگیر جلو راست:</span>
                  <span className="text-slate-300">لیسه‌گیری جزئی</span>
                </li>
              </ul>
            </div>

            {/* Box 3: Technical & Gearbox */}
            <div className="bg-slate-900/90 border border-blue-500/30 rounded-xl p-3.5 space-y-2">
              <div className="flex items-center justify-between text-blue-400 font-bold">
                <span className="flex items-center gap-1.5">
                  <Wrench className="w-4 h-4" />
                  وضعیت فنی و گیربکس
                </span>
                <span className="text-[10px] px-2 py-0.5 rounded bg-blue-500/10 text-blue-300">
                  سالم
                </span>
              </div>
              <ul className="space-y-1.5 text-slate-300 text-[11px]">
                <li className="flex items-center justify-between">
                  <span>موتور:</span>
                  <span className="font-bold text-emerald-400">تازه تعمیر اساسی ⭐</span>
                </li>
                <li className="flex items-center justify-between">
                  <span>گیربکس اتومات:</span>
                  <span className="font-bold text-white">سالم بدون تقه</span>
                </li>
                <li className="flex items-center justify-between">
                  <span>جلوبندی:</span>
                  <span className="text-slate-400">نیاز به سرویس و آچارکشی</span>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
