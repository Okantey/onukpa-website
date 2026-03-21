import { apiGet, apiPost } from "./http";
import type { Property, PropertyCategory, PropertyStatus } from "../types/domain";

function mapPublicPropertyDoc(doc: Record<string, unknown>): Property {
  const media = (doc.media as { url?: string }[] | undefined) ?? [];
  const images = media.map((m) => m.url).filter(Boolean) as string[];
  return {
    id: String(doc._id ?? ""),
    title: String(doc.title ?? ""),
    category: (doc.propertyCategory as PropertyCategory) ?? "Rooms",
    typeLabel: doc.subType != null ? String(doc.subType) : undefined,
    area: String(doc.area ?? ""),
    monthlyEstimate: Number(doc.monthlyEquivalent ?? 0),
    furnished:
      typeof doc.isFurnished === "boolean" ? doc.isFurnished : undefined,
    status: (doc.listingStatus as PropertyStatus) ?? "approved_live",
    images,
    description: doc.description != null ? String(doc.description) : undefined,
  };
}

/** Public listing (live only) — `GET /api/properties/public/:id` returns `{ ok, doc }`. */
export async function fetchPropertyById(id: string): Promise<Property> {
  const res = await apiGet<{ ok: boolean; doc: Record<string, unknown> }>(
    `/api/properties/public/${id}`
  );
  if (!res.ok || !res.doc) {
    throw new Error("Property not found");
  }
  return mapPublicPropertyDoc(res.doc);
}

export async function logPropertyInterest(
  propertyId: string,
  opts?: { source?: string; matchCandidateId?: string }
) {
  return apiPost<{ ok: boolean; notified?: boolean; message?: string }>(
    `/api/properties/${propertyId}/interest`,
    {
      source: opts?.source ?? "web",
      matchCandidateId: opts?.matchCandidateId,
    }
  );
}
