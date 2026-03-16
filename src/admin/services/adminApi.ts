import apiClient from "./apiClient";

export interface DashboardMetrics {
  totalRequests: number;
  activeRequests: number;
  pendingProperties: number;
  liveProperties: number;
  totalSuppliers: number;
  totalLandlords: number;
  totalAgents: number;
  matchesInProgress: number;
  dealsConfirmed: number;
  feesPending: number;
  feesCollected: number;
}

export const adminApi = {
  getOverviewMetrics: async (): Promise<DashboardMetrics> => {
    const { data } = await apiClient.get("/admin/analytics");
    const summary = data.stats?.summary || {};
    
    return {
      totalRequests: summary.totalRequests || 0,
      activeRequests: 0, // Not explicitly tracked in simple summary yet
      pendingProperties: Math.max(0, (summary.totalProperties || 0) - (summary.activeProperties || 0)),
      liveProperties: summary.activeProperties || 0,
      totalSuppliers: summary.totalSuppliers || 0,
      totalLandlords: Math.floor((summary.totalSuppliers || 0) / 2), // Mock split
      totalAgents: Math.ceil((summary.totalSuppliers || 0) / 2),
      matchesInProgress: 0,
      dealsConfirmed: summary.totalPaymentsCount || 0,
      feesPending: 0,
      feesCollected: summary.totalRevenueGHS || 0,
    };
  },

  getRequests: async () => {
    const { data } = await apiClient.get("/admin/requests");
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    return (data.docs || []).map((doc: any) => ({
      ...doc,
      id: doc._id,
      renterName: doc.userId?.name || "Unknown Renter",
      phone: doc.userId?.phone || "N/A",
      type: doc.requestType,
      budget: doc.searchCriteria?.budget ? `GH₵ ${doc.searchCriteria.budget}` : "N/A",
      date: new Date(doc.createdAt).toLocaleDateString(),
    }));
  },

  getProperties: async () => {
    const { data } = await apiClient.get("/admin/properties");
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    return (data.docs || []).map((doc: any) => ({
      ...doc,
      id: doc._id,
      title: doc.title || "Untitled Property",
      supplierName: "Supplier ID: " + String(doc.supplierProfileId).substring(0, 6),
      type: doc.subType || doc.propertyCategory,
      category: doc.propertyCategory,
      price: `GH₵ ${doc.monthlyEquivalent || 0}`,
      location: doc.area || "Unknown",
      status: doc.listingStatus,
      dateAdded: new Date(doc.createdAt).toLocaleDateString(),
    }));
  },

  getSuppliers: async () => {
    const { data } = await apiClient.get("/admin/suppliers");
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    return (data.docs || []).map((doc: any) => ({
      ...doc,
      id: doc._id,
      name: doc.companyName || doc.userId?.name || "Unknown",
      type: doc.supplierType,
      phone: doc.userId?.phone || "N/A",
      status: doc.verificationStatus,
      propertiesListed: 0,
      rating: doc.ratingInternal ? doc.ratingInternal.toString() : "No rating",
      joinedDate: new Date(doc.createdAt).toLocaleDateString(),
    }));
  },

  getMatches: async () => {
    // Matches endpoint currently not implemented in backend adminRoutes. Provide empty list for now.
    return [];
  },

  getFees: async () => {
    const { data } = await apiClient.get("/admin/fees");
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    return (data.docs || []).map((doc: any) => ({
      ...doc,
      id: doc._id,
      matchId: String(doc.connectionId).substring(0, 8) || "N/A",
      amount: `GH₵ ${doc.onukpaFeeAmount || 0}`,
      type: doc.feePath,
      status: doc.paymentStatus,
      dueDate: new Date(doc.createdAt).toLocaleDateString(),
      renterName: "Unknown",
    }));
  },
};
