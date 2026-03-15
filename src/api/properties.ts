import { apiGet, apiPost } from "./http";
import type { Property } from "../types/domain";

export async function fetchPropertyById(id: string): Promise<Property> {
  // Backend endpoint assumption: GET /properties/:id
  return apiGet<Property>(`/properties/${id}`);
}

export async function logPropertyInterest(propertyId: string, source: "web" | "landing" = "web") {
  // Backend endpoint assumption: POST /properties/:id/interest
  return apiPost<{ ok: boolean }>(`/properties/${propertyId}/interest`, {
    source,
  });
}

