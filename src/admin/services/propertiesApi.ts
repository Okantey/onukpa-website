import apiClient from "./apiClient";
import type { AdminOkDocs } from "./adminTypes";

export async function listProperties(): Promise<Record<string, unknown>[]> {
  const { data } = await apiClient.get<AdminOkDocs<Record<string, unknown>>>("/admin/properties");
  if (!data.ok) throw new Error(data.error || "Failed to load properties");
  return data.docs ?? [];
}

export async function patchAdminProperty(
  id: string,
  body: { listingStatus?: string; adminReviewNotes?: string }
): Promise<void> {
  const { data } = await apiClient.patch<{ ok: boolean; error?: string }>(
    `/admin/properties/${encodeURIComponent(id)}`,
    body
  );
  if (!data.ok) throw new Error(data.error || "Failed to update property");
}
