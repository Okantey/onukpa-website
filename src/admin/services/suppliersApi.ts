import apiClient from "./apiClient";
import type { AdminOkDocs } from "./adminTypes";

export async function listSuppliers(): Promise<Record<string, unknown>[]> {
  const { data } = await apiClient.get<AdminOkDocs<Record<string, unknown>>>("/admin/suppliers");
  if (!data.ok) throw new Error(data.error || "Failed to load suppliers");
  return data.docs ?? [];
}

export async function patchAdminSupplier(
  id: string,
  body: { verificationStatus: string }
): Promise<void> {
  const { data } = await apiClient.patch<{ ok: boolean; error?: string }>(
    `/admin/suppliers/${encodeURIComponent(id)}`,
    body
  );
  if (!data.ok) throw new Error(data.error || "Failed to update supplier");
}
