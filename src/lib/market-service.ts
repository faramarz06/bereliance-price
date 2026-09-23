import { MarketDataResponse, MarketStats } from './types';
import { fetchHamrahMechanicPrices } from './scraper-hamrah';
import { fetchDivarAds } from './scraper-divar';
import { fetchBamaAds } from './scraper-bama';

export async function getMarketData(): Promise<MarketDataResponse> {
  const [hmResult, divarResult, bamaResult] = await Promise.all([
    fetchHamrahMechanicPrices(),
    fetchDivarAds(),
    fetchBamaAds(),
  ]);

  const hamrahPrices = hmResult.data;
  const divarAds = divarResult.data;
  const bamaAds = bamaResult.data;

  // Collect all valid price numbers
  const allPrices: number[] = [];
  const pricesByYear: Record<number, number[]> = {
    1400: [],
    1399: [],
    1398: [],
    1397: [],
  };

  // Add Hamrah Mechanic reference prices
  for (const hp of hamrahPrices) {
    if (hp.price > 0) {
      allPrices.push(hp.price);
      if (pricesByYear[hp.year]) {
        pricesByYear[hp.year].push(hp.price);
      }
    }
  }

  // Add Divar ads prices
  for (const ad of divarAds) {
    if (ad.priceNumber > 500_000_000) {
      allPrices.push(ad.priceNumber);
      const y = Number(ad.year);
      if (pricesByYear[y]) {
        pricesByYear[y].push(ad.priceNumber);
      }
    }
  }

  // Add Bama ads prices
  for (const ad of bamaAds) {
    if (ad.priceNumber > 500_000_000) {
      allPrices.push(ad.priceNumber);
      const y = Number(ad.year);
      if (pricesByYear[y]) {
        pricesByYear[y].push(ad.priceNumber);
      }
    }
  }

  // Compute stats
  const overallMin = allPrices.length > 0 ? Math.min(...allPrices) : 1800000000;
  const overallMax = allPrices.length > 0 ? Math.max(...allPrices) : 2400000000;
  const overallAvg =
    allPrices.length > 0
      ? Math.round(allPrices.reduce((a, b) => a + b, 0) / allPrices.length)
      : 2050000000;

  const yearStats: MarketStats['priceByYear'] = {};
  for (const year of [1400, 1399, 1398, 1397]) {
    const list = pricesByYear[year] || [];
    const hmItem = hamrahPrices.find((h) => h.year === year);
    if (list.length > 0) {
      const min = Math.min(...list);
      const max = Math.max(...list);
      const avg = Math.round(list.reduce((a, b) => a + b, 0) / list.length);
      yearStats[year] = {
        avg,
        min,
        max,
        count: list.length,
        hamrahPrice: hmItem?.price,
      };
    } else {
      const defaultAvg = 1900000000 + (year - 1397) * 70000000;
      yearStats[year] = {
        avg: hmItem?.price || defaultAvg,
        min: Math.round((hmItem?.price || defaultAvg) * 0.95),
        max: Math.round((hmItem?.price || defaultAvg) * 1.05),
        count: 1,
        hamrahPrice: hmItem?.price,
      };
    }
  }

  return {
    lastUpdated: new Date().toISOString(),
    stats: {
      overallAvg,
      overallMin,
      overallMax,
      totalAds: divarAds.length + bamaAds.length,
      priceByYear: yearStats,
    },
    hamrahMechanic: hamrahPrices,
    divarAds,
    bamaAds,
    sourcesStatus: {
      divar: divarResult.success,
      hamrahMechanic: hmResult.success,
      bama: bamaResult.success,
    },
  };
}
