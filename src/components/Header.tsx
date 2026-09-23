'use client';

import React from 'react';
import { Car, RefreshCw, CheckCircle2, ShieldCheck } from 'lucide-react';
import { toPersianDigits } from '@/lib/persian-utils';

interface HeaderProps {
  lastUpdated: string;
  onRefresh: () => void;
  isLoading: boolean;
  sourcesStatus: {
    divar: boolean;
    hamrahMechanic: boolean;
    bama: boolean;
  };
}

export const Header: React.FC<HeaderProps> = ({
  lastUpdated,
  onRefresh,
  isLoading,
  sourcesStatus,
}) => {
  const formattedTime = lastUpdated
    ? new Date(lastUpdated).toLocaleTimeString('fa-IR', {
        hour: '2-digit',
        minute: '2-digit',
      })
    : '';

  return (
    <header className="border-b border-slate-800 bg-slate-900/60 backdrop-blur-md sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
          {/* Logo & Model title */}
          <div className="flex items-center gap-3 w-full sm:w-auto">
            <div className="w-12 h-12 rounded-2xl bg-gradient-to-tr from-blue-600 to-indigo-500 flex items-center justify-center shadow-lg shadow-blue-500/20">
              <Car className="w-6 h-6 text-white" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h1 className="text-xl sm:text-2xl font-black text-white tracking-tight">
                  برلیانس H320 اتوماتیک
                </h1>
                <span className="px-2 py-0.5 rounded-full text-xs font-bold bg-blue-500/20 text-blue-400 border border-blue-500/30">
                  موتور ۱.۶۵ لیتر
                </span>
              </div>
              <p className="text-xs text-slate-400 mt-0.5 flex items-center gap-2">
                <span>استعلام همزمان از دیوار، همراه مکانیک و باما</span>
                <span className="inline-block w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse"></span>
              </p>
            </div>
          </div>

          {/* Source Status & Refresh Button */}
          <div className="flex items-center gap-3 w-full sm:w-auto justify-between sm:justify-end">
            <div className="flex items-center gap-1.5 bg-slate-800/80 px-3 py-1.5 rounded-xl border border-slate-700/60 text-xs text-slate-300">
              <span className="text-slate-400">منابع:</span>
              <span
                className={`flex items-center gap-1 px-1.5 py-0.5 rounded ${
                  sourcesStatus.divar ? 'text-emerald-400 bg-emerald-950/40' : 'text-amber-400 bg-amber-950/40'
                }`}
              >
                دیوار
              </span>
              <span
                className={`flex items-center gap-1 px-1.5 py-0.5 rounded ${
                  sourcesStatus.hamrahMechanic ? 'text-emerald-400 bg-emerald-950/40' : 'text-amber-400 bg-amber-950/40'
                }`}
              >
                همراه مکانیک
              </span>
              <span
                className={`flex items-center gap-1 px-1.5 py-0.5 rounded ${
                  sourcesStatus.bama ? 'text-emerald-400 bg-emerald-950/40' : 'text-amber-400 bg-amber-950/40'
                }`}
              >
                باما
              </span>
            </div>

            <button
              onClick={onRefresh}
              disabled={isLoading}
              className="flex items-center gap-2 px-3.5 py-2 bg-blue-600 hover:bg-blue-500 active:scale-95 disabled:opacity-50 text-white rounded-xl text-xs font-semibold shadow-md shadow-blue-600/20 transition-all duration-200 cursor-pointer"
            >
              <RefreshCw className={`w-3.5 h-3.5 ${isLoading ? 'animate-spin' : ''}`} />
              <span>{isLoading ? 'در حال بروزرسانی...' : 'بروزرسانی'}</span>
              {formattedTime && !isLoading && (
                <span className="text-blue-200 text-[10px] hidden sm:inline">
                  ({toPersianDigits(formattedTime)})
                </span>
              )}
            </button>
          </div>
        </div>
      </div>
    </header>
  );
};
