import type { CategoryKey } from "./supplierPropertyForm";

export type SupplierFieldCopy = {
  /** Shown under the category buttons. */
  categorySectionHint: string;
  titlePlaceholder: string;
  titleHint: string;
  descriptionPlaceholder: string;
  descriptionHint: string;
  suitablePlaceholder: string;
  suitableHint: string;
  landmarkPlaceholder: string;
  landmarkHint: string;
  subtypeHint: string;
  monthlyHint: string;
  areaHint: string;
  availabilityHint: string;
  photoHint: string;
};

const BASE_MONTHLY_HINT =
  "Put the rent per month in cedis (GHS). Many landlords take 1 or 2 years up front — we still show monthly so people can compare.";

const BASE_AREA_HINT =
  "Choose the area name that matches where the place is. Same list renters pick on WhatsApp.";

const BASE_AVAIL_HINT =
  "Available now = ready for someone to move in. Soon = almost ready. Occupied = someone lives there now (not free).";

function roomCopy(): SupplierFieldCopy {
  return {
    categorySectionHint:
      "Room = single room, chamber & hall, or self-contained room — not a full apartment or shop.",
    titlePlaceholder: "e.g. Self-contained single room — East Legon",
    titleHint:
      "One short line: what kind of room + area. Don’t write “apartment” here if it is only a room.",
    descriptionPlaceholder:
      "e.g. Your own toilet & kitchen, polytank water, prepaid meter, quiet compound. No loud parties.",
    descriptionHint:
      "Say what the renter gets: water, light, gate, rules, shared or private washroom, etc.",
    suitablePlaceholder: "e.g. One serious worker or student",
    suitableHint: "Optional. Who do you want? (single person, students, couple, etc.)",
    landmarkPlaceholder: "e.g. Near Shell, 2 mins from main road",
    landmarkHint:
      "Optional. A place everyone knows nearby — bus stop, school, shop — so people find you easily.",
    subtypeHint:
      "Pick the type that fits this room (same words renters use on WhatsApp).",
    monthlyHint: BASE_MONTHLY_HINT,
    areaHint: BASE_AREA_HINT,
    availabilityHint: BASE_AVAIL_HINT,
    photoHint: "Good, clear photos of the room help you get serious enquiries.",
  };
}

function apartmentCopy(): SupplierFieldCopy {
  return {
    categorySectionHint:
      "Apartment = flat with bedrooms and shared spaces. Don’t pick this for a single room only.",
    titlePlaceholder: "e.g. 2-bedroom flat — Madina",
    titleHint: "Short label: bedrooms + area. This is not for single rooms or shops.",
    descriptionPlaceholder:
      "e.g. Both rooms ensuite, fitted kitchen, balcony, 24hr security, 2 years advance.",
    descriptionHint:
      "Describe layout, fittings, parking, compound, rules, and what advance you want.",
    suitablePlaceholder: "e.g. Small family, working couple",
    suitableHint: "Optional. Who is this flat best for?",
    landmarkPlaceholder: "e.g. Close to Madina Zongo junction",
    landmarkHint: "Optional. A well-known spot near the building.",
    subtypeHint: "Choose 1-bed, 2-bed or 3+ — must match what you are really renting out.",
    monthlyHint: BASE_MONTHLY_HINT,
    areaHint: BASE_AREA_HINT,
    availabilityHint: BASE_AVAIL_HINT,
    photoHint: "Show sitting room, bedrooms and kitchen if you can — renters like to see the space.",
  };
}

function hostelCopy(): SupplierFieldCopy {
  return {
    categorySectionHint:
      "Hostel = shared student-style housing near campus (beds, dorm-style).",
    titlePlaceholder: "e.g. Hostel bed near Legon campus",
    titleHint: "Say it is hostel / shared and which campus or area.",
    descriptionPlaceholder:
      "e.g. Bunk in shared room, common washroom, WiFi, quiet hours after 10pm.",
    descriptionHint: "Beds per room, washroom shared or not, rules, price per head if needed.",
    suitablePlaceholder: "e.g. Level 100–400 students",
    suitableHint: "Optional. Which students or workers is this for?",
    landmarkPlaceholder: "e.g. 5 min walk to UG main gate",
    landmarkHint: "Optional. Help students know how close to school you are.",
    subtypeHint: "Pick the room style (same as our campus hostel search on WhatsApp).",
    monthlyHint: BASE_MONTHLY_HINT,
    areaHint: BASE_AREA_HINT,
    availabilityHint: BASE_AVAIL_HINT,
    photoHint: "Photos of the sleeping area and washrooms build trust with students.",
  };
}

function officeCopy(): SupplierFieldCopy {
  return {
    categorySectionHint:
      "Office / store = shop, office unit, warehouse or mixed commercial space — not a home.",
    titlePlaceholder: "e.g. Ground floor shop — Spintex Road",
    titleHint: "Shop, office, warehouse or mixed — say which and the area.",
    descriptionPlaceholder:
      "e.g. Street-facing shop, 40 sqm, toilet at back, good for retail or salon.",
    descriptionHint: "Size, frontage, parking, power, toilet, best use (shop, office, storage).",
    suitablePlaceholder: "e.g. Retail, restaurant, clinic",
    suitableHint: "Optional. What kind of business fits best?",
    landmarkPlaceholder: "e.g. Near Baatsona Total",
    landmarkHint: "Optional. Landmark so people find the unit.",
    subtypeHint: "Office, shop, warehouse or mixed — pick what matches the space.",
    monthlyHint:
      "Monthly rent in GHS (even if you quote yearly — we show monthly for comparison).",
    areaHint: BASE_AREA_HINT,
    availabilityHint: BASE_AVAIL_HINT,
    photoHint: "Front of the unit and inside space help businesses decide faster.",
  };
}

export function supplierFieldCopyForCategory(
  category: CategoryKey | null
): SupplierFieldCopy {
  switch (category) {
    case "apartment":
      return apartmentCopy();
    case "hostel":
      return hostelCopy();
    case "office":
      return officeCopy();
    case "room":
    default:
      return roomCopy();
  }
}

/** New listings: only 12 and 24 months in the menu. */
export const ADVANCE_MONTH_OPTIONS_NEW: { value: string; label: string }[] = [
  { value: "", label: "Choose rent advance (required)" },
  { value: "12", label: "12 months (1 year advance)" },
  { value: "24", label: "24 months (2 years advance)" },
];

/** Edit: same options, plus current value if it is not 12 or 24 (old data). */
export function advanceMonthSelectOptions(savedMonths: string): { value: string; label: string }[] {
  const s = savedMonths.trim();
  const base = ADVANCE_MONTH_OPTIONS_NEW.filter((o) => o.value !== "");
  const opts: { value: string; label: string }[] = [
    { value: "", label: "Choose rent advance" },
  ];
  if (s && s !== "12" && s !== "24") {
    opts.push({
      value: s,
      label: `${s} months (saved on this listing — change to 12 or 24 if you want)`,
    });
  }
  opts.push(...base);
  return opts;
}
