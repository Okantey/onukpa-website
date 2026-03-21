/**
 * Canonical labels for supplier forms and bot matching.
 * Keep in sync with Backend/onukpa-bot/constants/taxonomy.ts and additionalAccraAreas.ts.
 * Full area dropdown: `areas.ts` → `accraAreas`; renter “see more” uses `accraAreasBeyondPrimary`.
 */

import type { CategoryKey } from "./supplierPropertyForm";

export const PRIMARY_LOCATIONS = [
  "East Legon",
  "Madina",
  "Adenta",
  "Achimota",
  "Lapaz",
  "Kwabenya",
  "Spintex Road",
  "Weija",
  "Kasoa",
] as const;

export const SECONDARY_LOCATIONS = [
  "North Legon",
  "Haatso",
  "Dome",
  "Taifa",
  "Ashaley Botwe",
  "Adjiringanor",
] as const;

export const RENTER_BOT_AREA_CHOICES_ORDERED: readonly string[] = [
  ...PRIMARY_LOCATIONS,
  ...SECONDARY_LOCATIONS,
];

export const ROOM_TYPES: Record<number, string> = {
  1: "Single Room (shared washroom)",
  2: "Single Room Self-Contained",
  3: "Chamber & Hall (shared washroom)",
  4: "Chamber & Hall Self-Contained",
};

export const APARTMENT_TYPES: Record<number, string> = {
  1: "1-Bedroom",
  2: "2-Bedroom",
  3: "3-Bedroom or more",
};

export const STORE_OFFICE_TYPES: Record<number, string> = {
  1: "Office space",
  2: "Retail shop",
  3: "Warehouse / storage",
  4: "Mixed use",
};

export const ROOM_TYPE_OPTIONS = Object.keys(ROOM_TYPES)
  .map(Number)
  .sort((a, b) => a - b)
  .map((k) => ROOM_TYPES[k]!);

export const APARTMENT_TYPE_OPTIONS = Object.keys(APARTMENT_TYPES)
  .map(Number)
  .sort((a, b) => a - b)
  .map((k) => APARTMENT_TYPES[k]!);

export const STORE_OFFICE_TYPE_OPTIONS = Object.keys(STORE_OFFICE_TYPES)
  .map(Number)
  .sort((a, b) => a - b)
  .map((k) => STORE_OFFICE_TYPES[k]!);

export const HOSTEL_ROOM_STYLE_OPTIONS = ROOM_TYPE_OPTIONS;

export function subtypeOptionsForCategory(category: CategoryKey | null): string[] {
  if (!category) return [];
  switch (category) {
    case "room":
      return [...ROOM_TYPE_OPTIONS];
    case "apartment":
      return [...APARTMENT_TYPE_OPTIONS];
    case "office":
      return [...STORE_OFFICE_TYPE_OPTIONS];
    case "hostel":
      return [...HOSTEL_ROOM_STYLE_OPTIONS];
    default:
      return [];
  }
}
