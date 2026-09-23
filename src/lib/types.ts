export interface HamrahMechanicYearPrice {
  year: number;
  price: number; // in Tomans
  priceDown: number;
  priceUp: number;
  updatedAt: string;
  sourceUrl: string;
  imageUrl?: string;
}

export interface DivarAd {
  id: string;
  title: string;
  price: string;
  priceNumber: number; // in Tomans
  mileage: string;
  location: string;
  imageUrl: string | null;
  url: string;
  year?: number | string;
}

export interface BamaAd {
  id: string;
  title: string;
  trim: string;
  price: string;
  priceNumber: number; // in Tomans
  year: number | string;
  mileage: string;
  location: string;
  url: string;
  imageUrl: string | null;
}

export interface MarketStats {
  overallAvg: number;
  overallMin: number;
  overallMax: number;
  totalAds: number;
  priceByYear: Record<
    number,
    {
      avg: number;
      min: number;
      max: number;
      count: number;
      hamrahPrice?: number;
    }
  >;
}

export interface MarketDataResponse {
  lastUpdated: string;
  stats: MarketStats;
  hamrahMechanic: HamrahMechanicYearPrice[];
  divarAds: DivarAd[];
  bamaAds: BamaAd[];
  sourcesStatus: {
    divar: boolean;
    hamrahMechanic: boolean;
    bama: boolean;
  };
}
