import { useState, useEffect } from "react";
import { Eye, Image as ImageIcon, CheckCircle, XCircle } from "lucide-react";
import DataTable from "../components/DataTable";
import type { Column } from "../components/DataTable";
import FilterBar from "../components/FilterBar";
import StatusBadge from "../components/StatusBadge";
import DetailDrawer from "../components/DetailDrawer";
import { adminApi } from "../services/adminApi";

// eslint-disable-next-line @typescript-eslint/no-explicit-any
type PropertyData = any;

const PropertiesPage = () => {
  const [data, setData] = useState<PropertyData[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [search, setSearch] = useState("");
  const [selectedProperty, setSelectedProperty] = useState<PropertyData | null>(null);

  const [statusFilter, setStatusFilter] = useState("");
  const [categoryFilter, setCategoryFilter] = useState("");

  useEffect(() => {
    adminApi
      .getProperties()
      .then(setData)
      .catch((err) => console.error("Failed to load properties:", err))
      .finally(() => setIsLoading(false));
  }, []);

  const filteredData = data.filter((prop) => {
    if (statusFilter && prop.status !== statusFilter) return false;
    if (categoryFilter && prop.category !== categoryFilter) return false;
    if (
      search &&
      !(prop.id || "").toLowerCase().includes(search.toLowerCase()) &&
      !(prop.title || "").toLowerCase().includes(search.toLowerCase())
    ) {
      return false;
    }
    return true;
  });

  const columns: Column<PropertyData>[] = [
    {
      header: "ID",
      cell: (row) => <span className="font-medium text-slate-900 font-mono text-xs">{String(row.id).substring(0, 8)}…</span>,
    },
    {
      header: "Title",
      cell: (row) => (
        <div className="flex flex-col">
          <span className="text-slate-900 font-medium whitespace-nowrap overflow-hidden text-ellipsis max-w-[200px]">
            {row.title}
          </span>
          <span className="text-xs text-slate-500">{row.category}</span>
        </div>
      ),
    },
    {
      header: "Supplier",
      cell: (row) => (
        <div className="flex flex-col">
          <span className="text-slate-900 font-medium text-xs">{row.supplierName}</span>
          <span className="text-xs text-slate-500 capitalize">{row.supplierType || "—"}</span>
        </div>
      ),
    },
    { header: "Area", accessorKey: "location" },
    { header: "Rent/Mo", accessorKey: "price" },
    {
      header: "Status",
      cell: (row) => <StatusBadge kind="property" status={row.status} />,
    },
    { header: "Added", accessorKey: "dateAdded" },
    {
      header: "Actions",
      cell: (row) => (
        <button
          onClick={(e) => {
            e.stopPropagation();
            setSelectedProperty(row);
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
        <h2 className="text-xl md:text-2xl font-semibold text-slate-900 mb-1">Properties</h2>
        <p className="text-sm md:text-base text-slate-600">
          Manage listing pipeline and supplier compliance.
        </p>
      </div>

      <FilterBar
        searchValue={search}
        onSearchChange={setSearch}
        searchPlaceholder="Search property ID or title..."
        filters={[
          {
            label: "All Statuses",
            value: statusFilter,
            onChange: setStatusFilter,
            options: [
              { value: "submitted", label: "Submitted" },
              { value: "under_review", label: "Under Review" },
              { value: "approved_live", label: "Live" },
              { value: "rejected", label: "Rejected" },
              { value: "stale", label: "Stale" },
            ],
          },
          {
            label: "All Categories",
            value: categoryFilter,
            onChange: setCategoryFilter,
            options: [
              { value: "Rooms", label: "Rooms" },
              { value: "Apartments", label: "Apartments" },
              { value: "CampusHostels", label: "Hostels" },
            ],
          },
        ]}
      />

      <DataTable
        data={filteredData}
        columns={columns}
        isLoading={isLoading}
        onRowClick={(row) => setSelectedProperty(row)}
        emptyMessage="No properties found. Properties listed via WhatsApp will appear here."
      />

      <DetailDrawer
        isOpen={!!selectedProperty}
        onClose={() => setSelectedProperty(null)}
        title={selectedProperty?.title || "Property Details"}
        subtitle={`${String(selectedProperty?.id || "").substring(0, 8)} • By ${selectedProperty?.supplierName}`}
        width="lg"
        actions={
          <>
            <button className="px-4 py-2 text-sm font-medium text-rose-700 bg-rose-50 border border-rose-200 rounded-lg hover:bg-rose-100 flex items-center gap-2">
              <XCircle className="w-4 h-4" />
              Reject
            </button>
            <button className="px-4 py-2 text-sm font-medium text-emerald-700 bg-emerald-50 border border-emerald-200 rounded-lg hover:bg-emerald-100 flex items-center gap-2">
              <CheckCircle className="w-4 h-4" />
              Approve & Go Live
            </button>
          </>
        }
      >
        {selectedProperty && (
          <div className="space-y-8">
            {/* Top row status */}
            <div className="flex items-center justify-between p-4 bg-slate-50 border border-slate-200 rounded-xl">
              <div>
                <p className="text-xs text-slate-500 font-medium">Listing Status</p>
                <div className="mt-1">
                  <StatusBadge kind="property" status={selectedProperty.status} />
                </div>
              </div>
              <div className="text-right">
                <p className="text-xs text-slate-500 font-medium">Category</p>
                <div className="mt-1 uppercase text-xs font-bold tracking-wider text-slate-900">
                  {selectedProperty.category}
                </div>
              </div>
            </div>

            {/* Media placeholder */}
            <div className="w-full h-48 bg-slate-100 border border-slate-200 rounded-xl flex items-center justify-center text-slate-400">
              <div className="text-center">
                <ImageIcon className="w-8 h-8 mx-auto mb-2 opacity-50" />
                <span className="text-sm font-medium">Image Gallery</span>
              </div>
            </div>

            <section>
              <h3 className="text-sm font-semibold text-slate-900 mb-4">Core Info</h3>
              <div className="grid grid-cols-2 lg:grid-cols-4 gap-y-4 gap-x-6 text-sm">
                <div>
                  <span className="block text-xs text-slate-500">Category</span>
                  <span className="font-medium text-slate-900">{selectedProperty.category}</span>
                </div>
                <div>
                  <span className="block text-xs text-slate-500">Area</span>
                  <span className="font-medium text-slate-900">{selectedProperty.location}</span>
                </div>
                <div>
                  <span className="block text-xs text-slate-500">Monthly Rent</span>
                  <span className="font-medium text-slate-900">{selectedProperty.price}</span>
                </div>
                <div>
                  <span className="block text-xs text-slate-500">Type</span>
                  <span className="font-medium text-slate-900">{selectedProperty.type || "—"}</span>
                </div>
              </div>
            </section>

            <hr className="border-slate-200" />

            <section>
              <h3 className="text-sm font-semibold text-slate-900 mb-2">Description</h3>
              <p className="text-sm text-slate-600 leading-relaxed bg-slate-50 p-4 rounded-xl border border-slate-200">
                {selectedProperty.description || "No description provided."}
              </p>
            </section>
          </div>
        )}
      </DetailDrawer>
    </div>
  );
};

export default PropertiesPage;
