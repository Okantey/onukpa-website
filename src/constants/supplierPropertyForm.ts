import type { PropertyPayload, SupplierMediaItem } from "../api/suppliers";

export type CategoryKey = "room" | "apartment" | "hostel" | "office";

export const SUPPLIER_CATEGORY_LABELS: Record<CategoryKey, string> = {
  room: "Room",
  apartment: "Apartment",
  hostel: "Hostel",
  office: "Office / Store Space",
};

const API_CATEGORY_TO_FORM: Record<string, CategoryKey> = {
  Rooms: "room",
  Apartments: "apartment",
  CampusHostels: "hostel",
  StoresOffices: "office",
  room: "room",
  apartment: "apartment",
  hostel: "hostel",
  office: "office",
  store: "office",
};

const API_AVAIL_TO_FORM: Record<string, string> = {
  available_now: "available",
  available_soon: "soon",
  unavailable: "occupied",
};

function advancePeriodToMonths(
  period: string | undefined,
  advanceValue: number | undefined
): string {
  switch (period) {
    case "6_months":
      return "6";
    case "1_year":
      return "12";
    case "2_years":
      return "24";
    case "custom":
      return advanceValue != null && !Number.isNaN(advanceValue) ? String(advanceValue) : "";
    default:
      return "12";
  }
}

/** Map GET /api/supplier/properties/:id document to form state. */
export function mapPropertyDocToFormState(doc: Record<string, unknown>): {
  category: CategoryKey;
  subtype: string;
  title: string;
  description: string;
  area: string;
  landmark: string;
  monthlyEstimate: string;
  advanceMonths: string;
  availabilityStatus: string;
  suitableFor: string;
  media: SupplierMediaItem[];
} {
  const catRaw = doc.propertyCategory != null ? String(doc.propertyCategory) : "";
  const category = API_CATEGORY_TO_FORM[catRaw] ?? "room";
  const availRaw =
    doc.availabilityStatus != null ? String(doc.availabilityStatus) : "available_now";
  const availabilityStatus = API_AVAIL_TO_FORM[availRaw] ?? "available";
  const suitableArr = doc.suitableFor as string[] | undefined;
  const mediaRaw = doc.media as SupplierMediaItem[] | undefined;

  return {
    category,
    subtype: doc.subType != null ? String(doc.subType) : "",
    title: doc.title != null ? String(doc.title) : "",
    description: doc.description != null ? String(doc.description) : "",
    area: doc.area != null ? String(doc.area) : "",
    landmark: doc.landmark != null ? String(doc.landmark) : "",
    monthlyEstimate:
      doc.monthlyEquivalent != null ? String(doc.monthlyEquivalent) : "",
    advanceMonths: advancePeriodToMonths(
      doc.advancePeriod != null ? String(doc.advancePeriod) : undefined,
      typeof doc.advanceValue === "number" ? doc.advanceValue : undefined
    ),
    availabilityStatus,
    suitableFor: Array.isArray(suitableArr) ? suitableArr.join(", ") : "",
    media: Array.isArray(mediaRaw)
      ? mediaRaw.map((m) => ({
          url: String(m.url ?? ""),
          publicId: m.publicId != null ? String(m.publicId) : undefined,
          isPrimary: !!m.isPrimary,
        }))
      : [],
  };
}

export function buildPropertyPayload(
  state: {
    category: CategoryKey;
    subtype: string;
    title: string;
    description: string;
    area: string;
    landmark: string;
    monthlyEstimate: string;
    advanceMonths: string;
    availabilityStatus: string;
    suitableFor: string;
    media: SupplierMediaItem[];
  },
  attributes: Record<string, unknown>
): PropertyPayload {
  return {
    category: state.category,
    subtype: state.subtype,
    title: state.title,
    description: state.description,
    area: state.area,
    landmark: state.landmark || undefined,
    monthlyEstimate: Number(state.monthlyEstimate),
    advanceMonths: state.advanceMonths ? Number(state.advanceMonths) : undefined,
    availabilityStatus: state.availabilityStatus,
    suitableFor: state.suitableFor || undefined,
    attributes,
    media: state.media.length > 0 ? state.media : undefined,
  };
}
