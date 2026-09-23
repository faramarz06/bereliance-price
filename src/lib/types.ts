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

export interface Khodro45Price {
  name: string;
  year: number;
  marketPrice: number; // in Tomans
  cashOfferMin: number;
  cashOfferMax: number;
  updatedAt: string;
  sourceUrl: string;
}

export interface InspectionDeductionDetails {
  basePristinePrice: number;
  chassisStatus: string;
  replacedDoorDeduction: number;
  paintedPartsDeduction: number;
  mileageDeduction: number;
  freshEngineBonus: number;
  netAdjustedPrice: number;
}

export interface SpecificCarValuation {
  carInfo: {
    model: string;
    trim: string;
    year: number;
    mileage: number;
    color: string;
    chassisNumber: string;
    inspectionCode: string;
    inspectionInspector: string;
    inspectionUrl: string;
    technicalHighlights: string;
  };
  sources: {
    hamrahMechanic: {
      sourceName: string;
      basePrice: number;
      adjustedPrice: number;
      minPrice: number;
      maxPrice: number;
      url: string;
      notes: string;
    };
    divar: {
      sourceName: string;
      averagePrice: number;
      adjustedPrice: number;
      minPrice: number;
      maxPrice: number;
      url: string;
      activeCount: number;
      notes: string;
    };
    bama: {
      sourceName: string;
      averagePrice: number;
      adjustedPrice: number;
      minPrice: number;
      maxPrice: number;
      url: string;
      activeCount: number;
      notes: string;
    };
    khodro45: {
      sourceName: string;
      marketPrice: number;
      adjustedPrice: number;
      minPrice: number;
      maxPrice: number;
      url: string;
      notes: string;
    };
  };
  finalValuation: {
    fairPrice: number;
    quickCashSale: number;
    topRetailConsumer: number;
    formulaSummary: string;
  };
  bodyDeductions: InspectionDeductionDetails;
}

export interface MarketDataResponse {
  lastUpdated: string;
  valuation: SpecificCarValuation;
  divarAds: DivarAd[];
  bamaAds: BamaAd[];
  sourcesStatus: {
    divar: boolean;
    hamrahMechanic: boolean;
    bama: boolean;
    khodro45: boolean;
  };
}
