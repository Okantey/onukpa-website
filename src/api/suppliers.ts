import { apiGet, apiPatch, apiPost } from "./http";

export interface SupplierMediaItem {
  url: string;
  publicId?: string;
  isPrimary?: boolean;
}

export interface PropertyPayload {
  category: string;
  subtype?: string;
  title: string;
  description: string;
  area: string;
  landmark?: string;
  monthlyEstimate: number;
  advanceMonths?: number;
  totalPayableNow?: number;
  availabilityStatus: string;
  suitableFor?: string;
  attributes: Record<string, unknown>;
  media?: SupplierMediaItem[];
}

export interface SupplierPropertyListItem {
  _id: string;
  title: string;
  area: string;
  listingStatus: string;
  propertyCategory?: string;
  subType?: string;
  monthlyEquivalent?: number;
  submittedAt?: string;
  createdAt?: string;
  media?: { url?: string; isPrimary?: boolean }[];
}

/** No auth — used by `/supplier/complete` to validate `?token=`. */
export async function fetchMagicLinkStatus(token: string) {
  return apiGet<{ ok: boolean; valid: boolean; tokenType: string | null }>(
    `/api/supplier/magic-link/status?token=${encodeURIComponent(token)}`
  );
}

/** Magic-link token — lists this supplier's properties (all statuses). */
export async function fetchSupplierProperties(token: string) {
  return apiGet<{ ok: boolean; properties: SupplierPropertyListItem[] }>(
    `/api/supplier/properties?token=${encodeURIComponent(token)}`
  );
}

export async function fetchSupplierProperty(token: string, propertyId: string) {
  return apiGet<{ ok: boolean; property: Record<string, unknown> }>(
    `/api/supplier/properties/${encodeURIComponent(propertyId)}?token=${encodeURIComponent(token)}`
  );
}

export async function submitPropertyWithToken(token: string, payload: PropertyPayload) {
  return apiPost<{ ok: boolean; id?: string; listingStatus?: string }>(
    `/api/supplier/properties?token=${encodeURIComponent(token)}`,
    payload
  );
}

export type SupplierPropertyPatchPayload = Partial<
  Omit<PropertyPayload, "attributes">
> & { attributes?: Record<string, unknown> };

export async function patchSupplierProperty(
  token: string,
  propertyId: string,
  payload: SupplierPropertyPatchPayload
) {
  const body: Record<string, unknown> = { ...payload };
  if (payload.attributes === undefined) {
    delete body.attributes;
  }
  return apiPatch<{ ok: boolean; id?: string; listingStatus?: string }>(
    `/api/supplier/properties/${encodeURIComponent(propertyId)}?token=${encodeURIComponent(token)}`,
    body
  );
}

/**
 * Upload images for a listing (same magic link). Returns media entries to pass in create/patch body.
 */
export async function uploadSupplierPropertyImages(
  token: string,
  files: File[]
): Promise<SupplierMediaItem[]> {
  const base = (import.meta.env.VITE_ONUKPA_API_BASE_URL || "").replace(/\/$/, "");
  if (!base) {
    throw new Error("VITE_ONUKPA_API_BASE_URL is not configured");
  }
  const form = new FormData();
  for (const f of files) {
    form.append("images", f);
  }
  const res = await fetch(
    `${base}/api/supplier/upload?token=${encodeURIComponent(token)}`,
    { method: "POST", body: form, credentials: "include" }
  );
  const data = (await res.json()) as {
    ok: boolean;
    media?: SupplierMediaItem[];
    message?: string;
  };
  if (!res.ok || !data.ok) {
    throw new Error(data.message || `Upload failed (${res.status})`);
  }
  return data.media ?? [];
}
