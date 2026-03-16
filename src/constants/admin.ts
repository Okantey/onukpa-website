export const PROPERTY_CATEGORIES = ["Rooms", "Apartments", "CampusHostels", "OfficesStores"] as const;
export type PropertyCategory = (typeof PROPERTY_CATEGORIES)[number];

export const SUPPLIER_TYPES = ["landlord", "agent"] as const;
export type SupplierType = (typeof SUPPLIER_TYPES)[number];

export const REQUEST_STATUSES = [
  "pending",
  "searching",
  "property_found",
  "interested",
  "connected",
  "deal_confirmed",
  "fee_pending",
  "completed",
  "cancelled",
  "expired",
] as const;
export type RequestStatus = (typeof REQUEST_STATUSES)[number];

export const PROPERTY_STATUSES = [
  "draft",
  "submitted",
  "under_review",
  "approved_live",
  "rejected",
  "paused",
  "expired",
  "rented_closed",
  "archived",
] as const;
export type PropertyStatus = (typeof PROPERTY_STATUSES)[number];

export const MATCH_STATUSES = [
  "generated",
  "shown",
  "interested",
  "supplier_notified",
  "connected",
  "viewing_scheduled",
  "negotiation",
  "confirmed",
  "lost",
] as const;
export type MatchStatus = (typeof MATCH_STATUSES)[number];

export const FEE_STATUSES = [
  "not_due",
  "pending",
  "partially_paid",
  "paid",
  "disputed",
  "waived",
] as const;
export type FeeStatus = (typeof FEE_STATUSES)[number];

