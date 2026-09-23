import type { Metadata } from 'next';
import './globals.css';

export const metadata: Metadata = {
  title: 'استعلام لحظه‌ای قیمت برلیانس H320 اتوماتیک موتور 1.65 | دیوار، همراه مکانیک، باما',
  description:
    'سامانه هوشمند استعلام و مقایسه قیمت خودرو برلیانس H320 اتوماتیک ۱۶۵۰ سی‌سی از دیوار، همراه مکانیک و باما به همراه ماشین‌حساب تخمین ارزش روز',
  keywords: [
    'قیمت برلیانس H320',
    'برلیانس اتومات ۱۶۵۰',
    'دیوار برلیانس',
    'همراه مکانیک برلیانس H320',
    'قیمت روز برلیانس',
  ],
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="fa" dir="rtl">
      <body className="min-h-screen bg-slate-950 text-slate-100 antialiased selection:bg-blue-600 selection:text-white">
        {children}
      </body>
    </html>
  );
}
