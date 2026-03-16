import { useState, useEffect } from "react";
import { Eye, ShieldCheck, Ban, Phone } from "lucide-react";
import DataTable from "../components/DataTable";
import type { Column } from "../components/DataTable";
import FilterBar from "../components/FilterBar";
import StatusBadge from "../components/StatusBadge";
import DetailDrawer from "../components/DetailDrawer";
import type { SupplierType } from "../../constants/admin";

interface SupplierData {
  id: string;
  name: string;
  type: SupplierType;
  phone: string;
  areas: string;
  verificationStatus: "started" | "bio_completed" | "pending_review" | "verified" | "rejected" | "suspended";
  listingsCount: number;
  joinedAt: string;
}

const mockSuppliers: SupplierData[] = [
  {
    id: "SUP-201",
    name: "Kwame Addo",
    type: "landlord",
    phone: "0245556666",
    areas: "Osu, Labone",
    verificationStatus: "verified",
    listingsCount: 3,
    joinedAt: "2026-01-10",
  },
  {
    id: "SUP-202",
    name: "Premium Agents HQ",
    type: "agent",
    phone: "0502221111",
    areas: "East Legon, Trassaco",
    verificationStatus: "pending_review",
    listingsCount: 12,
    joinedAt: "2026-03-01",
  },
  {
    id: "SUP-203",
    name: "Abla Mensah",
    type: "landlord",
    phone: "0278889999",
    areas: "Madina",
    verificationStatus: "suspended",
    listingsCount: 0,
    joinedAt: "2025-11-20",
  },
];

const SuppliersPage = () => {
  const [data, setData] = useState<SupplierData[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [search, setSearch] = useState("");
  const [selectedSupplier, setSelectedSupplier] = useState<SupplierData | null>(null);

  const [typeFilter, setTypeFilter] = useState("");
  const [statusFilter, setStatusFilter] = useState("");

  useEffect(() => {
    setTimeout(() => {
      setData(mockSuppliers);
      setIsLoading(false);
    }, 600);
  }, []);

  const filteredData = data.filter((sup) => {
    if (typeFilter && sup.type !== typeFilter) return false;
    if (statusFilter && sup.verificationStatus !== statusFilter) return false;
    if (
      search &&
      !sup.id.toLowerCase().includes(search.toLowerCase()) &&
      !sup.name.toLowerCase().includes(search.toLowerCase()) &&
      !sup.phone.includes(search)
    ) {
      return false;
    }
    return true;
  });

  const columns: Column<SupplierData>[] = [
    {
      header: "Supplier ID",
      accessorKey: "id",
      cell: (row) => <span className="font-medium text-slate-900">{row.id}</span>,
    },
    {
      header: "Name",
      cell: (row) => (
        <div className="flex flex-col">
          <span className="text-slate-900 font-medium">{row.name}</span>
          <span className="text-xs text-slate-500">{row.phone}</span>
        </div>
      ),
    },
    {
      header: "Type",
      cell: (row) => <StatusBadge kind="supplier" status={row.type} />,
    },
    { header: "Key Areas", accessorKey: "areas" },
    {
      header: "Verification",
      cell: (row) => <StatusBadge kind="supplier" status={row.verificationStatus} />,
    },
    {
      header: "Listings",
      accessorKey: "listingsCount",
      cell: (row) => (
        <span className="text-slate-600 font-medium">{row.listingsCount}</span>
      ),
    },
    { header: "Joined", accessorKey: "joinedAt" },
    {
      header: "Actions",
      cell: (row) => (
        <button
          onClick={(e) => {
            e.stopPropagation();
            setSelectedSupplier(row);
          }}
          className="p-1.5 text-slate-400 hover:text-primary bg-slate-50 hover:bg-primary/10 rounded-lg transition-colors"
        >
          <Eye className="w-4 h-4" />
        </button>
      ),
    },
  ];

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-xl md:text-2xl font-semibold text-slate-900 mb-1">Suppliers</h2>
        <p className="text-sm md:text-base text-slate-600">
          Manage landlords, agents, and verification states.
        </p>
      </div>

      <FilterBar
        searchValue={search}
        onSearchChange={setSearch}
        searchPlaceholder="Search ID, name, or phone..."
        filters={[
          {
            label: "All Types",
            value: typeFilter,
            onChange: setTypeFilter,
            options: [
              { value: "landlord", label: "Landlords" },
              { value: "agent", label: "Agents" },
            ],
          },
          {
            label: "All Verification",
            value: statusFilter,
            onChange: setStatusFilter,
            options: [
              { value: "pending_review", label: "Pending Review" },
              { value: "verified", label: "Verified" },
              { value: "rejected", label: "Rejected" },
              { value: "suspended", label: "Suspended" },
            ],
          },
        ]}
      />

      <DataTable
        data={filteredData}
        columns={columns}
        isLoading={isLoading}
        onRowClick={(row) => setSelectedSupplier(row)}
      />

      <DetailDrawer
        isOpen={!!selectedSupplier}
        onClose={() => setSelectedSupplier(null)}
        title={selectedSupplier?.name || "Supplier"}
        subtitle={`ID: ${selectedSupplier?.id} • Joined ${selectedSupplier?.joinedAt}`}
        actions={
          <>
            <button className="px-4 py-2 text-sm font-medium text-rose-700 bg-rose-50 border border-rose-200 rounded-lg hover:bg-rose-100 flex items-center gap-2">
              <Ban className="w-4 h-4" />
              Suspend
            </button>
            <button className="px-4 py-2 text-sm font-medium text-emerald-700 bg-emerald-50 border border-emerald-200 rounded-lg hover:bg-emerald-100 flex items-center gap-2">
              <ShieldCheck className="w-4 h-4" />
              Verify Profile
            </button>
          </>
        }
      >
        {selectedSupplier && (
          <div className="space-y-8">
            <div className="flex items-center justify-between p-4 bg-slate-50 border border-slate-200 rounded-xl">
              <div>
                <p className="text-xs text-slate-500 font-medium">Verification State</p>
                <div className="mt-1">
                  <StatusBadge kind="supplier" status={selectedSupplier.verificationStatus} />
                </div>
              </div>
              <div className="text-right">
                <p className="text-xs text-slate-500 font-medium">Active Properties</p>
                <p className="text-xl font-semibold text-slate-900 mt-1">
                  {selectedSupplier.listingsCount}
                </p>
              </div>
            </div>

            <section>
              <h3 className="text-sm font-semibold text-slate-900 mb-4">Contact Info</h3>
              <div className="bg-slate-50 p-4 rounded-xl border border-slate-200">
                <p className="font-medium text-slate-900 mb-2">WhatsApp / Phone</p>
                <div className="flex items-center gap-2 text-slate-600">
                  <Phone className="w-4 h-4 text-emerald-600" />
                  <span>{selectedSupplier.phone}</span>
                </div>
                <button className="mt-3 text-xs font-medium text-emerald-600 hover:text-emerald-700 hover:underline">
                  Trigger Follow-up Message
                </button>
              </div>
            </section>

            <section>
              <h3 className="text-sm font-semibold text-slate-900 mb-4">Identity / Documents</h3>
              <div className="w-full h-32 bg-slate-100 border-2 border-dashed border-slate-300 rounded-xl flex items-center justify-center text-slate-400">
                <div className="text-center">
                  <ShieldCheck className="w-6 h-6 mx-auto mb-2 opacity-50" />
                  <span className="text-xs font-medium">Ghana Card / Documents Placeholder</span>
                </div>
              </div>
            </section>
          </div>
        )}
      </DetailDrawer>
    </div>
  );
};

export default SuppliersPage;
