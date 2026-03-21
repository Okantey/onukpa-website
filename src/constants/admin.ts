export const PROPERTY_CATEGORIES = ["Rooms", "Apartments", "CampusHostels", "OfficesStores"] as const;
export type PropertyCategory = (typeof PROPERTY_CATEGORIES)[number];

export const SUPPLIER_TYPES = ["landlord", "agent"] as const;
export type SupplierType = (typeof SUPPLIER_TYPES)[number];

export const REQUEST_STATUSES = [
  "pending",
  "searching",
  "property_found",
  "no_match",
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

/** Align with `MatchCandidate` model in onukpa-bot (plus legacy UI labels where needed). */
export const MATCH_STATUSES = [
  "generated",
  "shown_to_renter",
  "shown",
  "dismissed",
  "clicked_interested",
  "interested",
  "supplier_notified",
  "supplier_declined",
  "connected",
  "expired",
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

