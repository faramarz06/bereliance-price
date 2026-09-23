export function toPersianDigits(num: number | string): string {
  const persianDigits = ['۰', '۱', '۲', '۳', '۴', '۵', '۶', '۷', '۸', '۹'];
  return num
    .toString()
    .replace(/[0-9]/g, (char) => persianDigits[parseInt(char, 10)]);
}

export function parsePersianNumber(str: string): number {
  if (!str) return 0;
  const persianToEnglish: Record<string, string> = {
    '۰': '0', '۱': '1', '۲': '2', '۳': '3', '۴': '4',
    '۵': '5', '۶': '6', '۷': '7', '۸': '8', '۹': '9',
    '٠': '0', '١': '1', '٢': '2', '٣': '3', '٤': '4',
    '٥': '5', '٦': '6', '٧': '7', '٨': '8', '٩': '9',
  };

  const clean = str
    .replace(/[۰-۹٠-٩]/g, (char) => persianToEnglish[char] || char)
    .replace(/[^0-9]/g, '');

  return clean ? parseInt(clean, 10) : 0;
}

export function formatPriceToman(amount: number): string {
  if (!amount || amount === 0) return 'توافقی';
  
  // Format with commas in Persian
  const formatted = amount.toLocaleString('en-US');
  return `${toPersianDigits(formatted)} تومان`;
}

export function formatPriceWords(amount: number): string {
  if (!amount || amount === 0) return 'قیمت نامشخص / توافقی';
  
  // e.g. 2,150,000,000 -> 2 میلیارد و 150 میلیون تومان
  const billions = Math.floor(amount / 1_000_000_000);
  const remainder = amount % 1_000_000_000;
  const millions = Math.floor(remainder / 1_000_000);

  const parts: string[] = [];
  if (billions > 0) {
    parts.push(`${toPersianDigits(billions)} میلیارد`);
  }
  if (millions > 0) {
    parts.push(`${toPersianDigits(millions)} میلیون`);
  }

  if (parts.length === 0) {
    return `${toPersianDigits(amount.toLocaleString('en-US'))} تومان`;
  }

  return `${parts.join(' و ')} تومان`;
}
