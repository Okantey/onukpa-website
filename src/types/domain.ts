export type PropertyCategory =
  | "Rooms"
  | "Apartments"
  | "CampusHostels"
  | "OfficesStores"
  | "StoresOffices"
  | string;

export type PropertyStatus =
  | "submitted"
  | "under_review"
  | "approved_live"
  | "rejected"
  | "stale"
  | "rented";

export interface Property {
  id: string;
  title: string;
  category: PropertyCategory;
  typeLabel?: string;
  area: string;
  landmark?: string;
  monthlyEstimate: number;
  advanceMonths?: number;
  totalPayableNow?: number;
  furnished?: boolean;
  suitableFor?: string;
  status: PropertyStatus;
  images: string[];
  description?: string;
  features?: string[];
}

