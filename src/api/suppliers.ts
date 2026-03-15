import { apiPost } from "./http";

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
}

export async function submitPropertyWithToken(token: string, payload: PropertyPayload) {
  // Backend endpoint assumption: POST /supplier/properties?token=...
  return apiPost<{ ok: boolean }>(`/supplier/properties?token=${encodeURIComponent(token)}`, payload);
}

