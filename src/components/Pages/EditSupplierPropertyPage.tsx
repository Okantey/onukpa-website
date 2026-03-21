import { useEffect, useState, useMemo, useRef } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import {
  Home,
  Building2,
  GraduationCap,
  Store,
  MapPin,
  Loader2,
} from "lucide-react";
import Navigation from "../Layout/Navigation";
import Footer from "../Layout/Footer";
import WhatsAppFloatingButton from "../UI/WhatsappFloatingButton";
import PropertyPhotosSection from "./supplier/PropertyPhotosSection";
import { accraAreas } from "../../constants/areas";
import {
  fetchSupplierProperty,
  patchSupplierProperty,
  type SupplierMediaItem,
} from "../../api/suppliers";
import {
  type CategoryKey,
  SUPPLIER_CATEGORY_LABELS,
  buildPropertyPayload,
  mapPropertyDocToFormState,
} from "../../constants/supplierPropertyForm";
import { subtypeOptionsForCategory } from "../../constants/propertyTaxonomy";

const CATEGORY_ICONS: Record<
  CategoryKey,
  React.ComponentType<{ className?: string }>
> = {
  room: Home,
  apartment: Building2,
  hostel: GraduationCap,
  office: Store,
};

const SUPPLIER_EDITABLE_STATUSES = new Set([
  "draft",
  "submitted",
  "under_review",
  "rejected",
]);

const EditSupplierPropertyPage = () => {
  const { token, propertyId } = useParams<{ token: string; propertyId: string }>();
  const navigate = useNavigate();
  const [category, setCategory] = useState<CategoryKey | null>(null);
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [area, setArea] = useState("");
  const [landmark, setLandmark] = useState("");
  const [monthlyEstimate, setMonthlyEstimate] = useState("");
  const [advanceMonths, setAdvanceMonths] = useState("");
  const [totalPayableNow, setTotalPayableNow] = useState("");
  const [availabilityStatus, setAvailabilityStatus] = useState("available");
  const [suitableFor, setSuitableFor] = useState("");
  const [subtype, setSubtype] = useState("");
  const [attributes] = useState<Record<string, unknown>>({});
  const [media, setMedia] = useState<SupplierMediaItem[]>([]);
  const [listingStatus, setListingStatus] = useState<string | null>(null);
  const [loadError, setLoadError] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);
  const [submitting, setSubmitting] = useState(false);
  const [saveError, setSaveError] = useState<string | null>(null);

  useEffect(() => {
    if (!token || !propertyId) {
      setLoading(false);
      setLoadError("Missing link or property.");
      return;
    }

    let cancelled = false;
    (async () => {
      try {
        const res = await fetchSupplierProperty(token, propertyId);
        if (cancelled) return;
        if (!res.ok || !res.property) {
          setLoadError("We could not load this property.");
          return;
        }
        const doc = res.property;
        const status = doc.listingStatus != null ? String(doc.listingStatus) : "";
        setListingStatus(status);
        if (!SUPPLIER_EDITABLE_STATUSES.has(status)) {
          setLoadError("This listing can no longer be edited from this link.");
          return;
        }
        const s = mapPropertyDocToFormState(doc);
        setCategory(s.category);
        setSubtype(s.subtype);
        setTitle(s.title);
        setDescription(s.description);
        setArea(s.area);
        setLandmark(s.landmark);
        setMonthlyEstimate(s.monthlyEstimate);
        setAdvanceMonths(s.advanceMonths);
        setTotalPayableNow(s.totalPayableNow);
        setAvailabilityStatus(s.availabilityStatus);
        setSuitableFor(s.suitableFor);
        setMedia(s.media);
        setLoadError(null);
      } catch {
        if (!cancelled) {
          setLoadError("This link is invalid or has expired.");
        }
      } finally {
        if (!cancelled) setLoading(false);
      }
    })();

    return () => {
      cancelled = true;
    };
  }, [token, propertyId]);

  const subtypeChoices = useMemo(
    () => (category ? subtypeOptionsForCategory(category) : []),
    [category]
  );
  const subtypeIsLegacy = Boolean(subtype && !subtypeChoices.includes(subtype));

  const prevCategoryRef = useRef<CategoryKey | null>(null);
  useEffect(() => {
    if (!category) return;
    const prev = prevCategoryRef.current;
    if (prev !== null && prev !== category) {
      setSubtype((s) => {
        const opts = subtypeOptionsForCategory(category);
        return opts.includes(s) ? s : "";
      });
    }
    prevCategoryRef.current = category;
  }, [category]);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!token || !propertyId || !category) return;

    setSubmitting(true);
    setSaveError(null);
    try {
      const state = {
        category,
        subtype,
        title,
        description,
        area,
        landmark,
        monthlyEstimate,
        advanceMonths,
        totalPayableNow,
        availabilityStatus,
        suitableFor,
        media,
      };
      const payload = buildPropertyPayload(state, attributes);
      await patchSupplierProperty(token, propertyId, payload);
      navigate(`/supplier/portal/${encodeURIComponent(token)}`);
    } catch {
      setSaveError("We could not save changes. Please try again.");
    } finally {
      setSubmitting(false);
    }
  };

  if (!token || !propertyId) {
    return (
      <div className="min-h-screen bg-white">
        <WhatsAppFloatingButton />
        <Navigation />
        <main className="pt-6 pb-16 px-4 text-center text-slate-700">Invalid link.</main>
        <Footer />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-white">
      <WhatsAppFloatingButton />
      <Navigation />
      <main className="pt-6 pb-16 px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto">
          <div className="mb-6 flex flex-wrap items-center justify-between gap-3">
            <div>
              <h1 className="text-2xl md:text-3xl font-bold text-slate-900">Edit property</h1>
              <p className="text-slate-600 text-sm mt-1">
                {listingStatus === "rejected"
                  ? "Saving will send this listing back for review."
                  : "Update details before the listing goes live."}
              </p>
            </div>
            <Link
              to={`/supplier/portal/${encodeURIComponent(token)}`}
              className="text-sm font-medium text-primary hover:underline"
            >
              ← Back to portal
            </Link>
          </div>

          {loading ? (
            <div className="flex justify-center py-20 text-slate-500">
              <Loader2 className="w-10 h-10 animate-spin" />
            </div>
          ) : loadError ? (
            <div className="bg-red-50 border border-red-200 text-red-800 rounded-2xl px-6 py-4 text-sm">
              {loadError}
            </div>
          ) : (
            <form
              onSubmit={handleSubmit}
              className="bg-white border border-slate-200 rounded-2xl shadow-sm p-6 md:p-8 space-y-6"
            >
              {saveError ? (
                <div className="text-sm text-red-700 bg-red-50 border border-red-200 rounded-xl px-4 py-3">
                  {saveError}
                </div>
              ) : null}

              <div>
                <p className="text-sm font-semibold text-slate-800 mb-3">Property category *</p>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
                  {(Object.keys(SUPPLIER_CATEGORY_LABELS) as CategoryKey[]).map((key) => {
                    const label = SUPPLIER_CATEGORY_LABELS[key];
                    const Icon = CATEGORY_ICONS[key];
                    const active = category === key;
                    return (
                      <button
                        key={key}
                        type="button"
                        onClick={() => setCategory(key)}
                        className={`flex flex-col items-center justify-center px-3 py-3 rounded-xl border text-xs md:text-sm font-medium transition-all ${
                          active
                            ? "border-primary bg-primary/10 text-primary"
                            : "border-slate-200 bg-slate-50 text-slate-700 hover:border-primary/60 hover:text-primary"
                        }`}
                      >
                        <Icon className="w-5 h-5 mb-1" />
                        {label}
                      </button>
                    );
                  })}
                </div>
              </div>

              <PropertyPhotosSection token={token} media={media} onChange={setMedia} />

              <div className="grid md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-semibold text-slate-700 mb-2">
                    Title / short label *
                  </label>
                  <input
                    type="text"
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                    required
                    className="w-full px-3 py-2 text-sm md:text-base border border-slate-200 rounded-lg focus:border-primary focus:ring-2 focus:ring-primary/20 outline-none transition-all"
                  />
                </div>
                <div>
                  <label className="block text-sm font-semibold text-slate-700 mb-2">
                    Subtype / configuration *
                  </label>
                  <select
                    value={subtype}
                    onChange={(e) => setSubtype(e.target.value)}
                    required
                    className="w-full px-3 py-2 text-sm md:text-base border border-slate-200 rounded-lg focus:border-primary focus:ring-2 focus:ring-primary/20 outline-none transition-all bg-white"
                  >
                    <option value="">Select the type that best matches</option>
                    {subtypeIsLegacy ? (
                      <option value={subtype}>
                        {subtype} (saved — choose a standard type to improve matching)
                      </option>
                    ) : null}
                    {subtypeChoices.map((opt) => (
                      <option key={opt} value={opt}>
                        {opt}
                      </option>
                    ))}
                  </select>
                  <p className="mt-1 text-xs text-slate-500">
                    Same options as the WhatsApp bot so searches match your listing.
                  </p>
                </div>
              </div>

              <div>
                <label className="block text-sm font-semibold text-slate-700 mb-2">
                  Description *
                </label>
                <textarea
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  required
                  rows={4}
                  className="w-full px-3 py-2 text-sm md:text-base border border-slate-200 rounded-lg focus:border-primary focus:ring-2 focus:ring-primary/20 outline-none transition-all resize-y"
                />
              </div>

              <div className="grid md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-semibold text-slate-700 mb-2">
                    Area / location in Accra *
                  </label>
                  <div className="relative">
                    <MapPin className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400" />
                    <select
                      value={area}
                      onChange={(e) => setArea(e.target.value)}
                      required
                      className="w-full pl-10 pr-4 py-2 text-sm md:text-base border border-slate-200 rounded-lg focus:border-primary focus:ring-2 focus:ring-primary/20 outline-none transition-all bg-white"
                    >
                      <option value="">Select an area</option>
                      {accraAreas.map((a) => (
                        <option key={a} value={a}>
                          {a}
                        </option>
                      ))}
                    </select>
                  </div>
                </div>
                <div>
                  <label className="block text-sm font-semibold text-slate-700 mb-2">
                    Landmark (optional)
                  </label>
                  <input
                    type="text"
                    value={landmark}
                    onChange={(e) => setLandmark(e.target.value)}
                    className="w-full px-3 py-2 text-sm md:text-base border border-slate-200 rounded-lg focus:border-primary focus:ring-2 focus:ring-primary/20 outline-none transition-all"
                  />
                </div>
              </div>

              <div className="grid md:grid-cols-3 gap-4">
                <div>
                  <label className="block text-sm font-semibold text-slate-700 mb-2">
                    Monthly estimate (GHS) *
                  </label>
                  <input
                    type="number"
                    min={0}
                    value={monthlyEstimate}
                    onChange={(e) => setMonthlyEstimate(e.target.value)}
                    required
                    className="w-full px-3 py-2 text-sm md:text-base border border-slate-200 rounded-lg focus:border-primary focus:ring-2 focus:ring-primary/20 outline-none transition-all"
                  />
                </div>
                <div>
                  <label className="block text-sm font-semibold text-slate-700 mb-2">
                    Advance (months)
                  </label>
                  <input
                    type="number"
                    min={0}
                    value={advanceMonths}
                    onChange={(e) => setAdvanceMonths(e.target.value)}
                    className="w-full px-3 py-2 text-sm md:text-base border border-slate-200 rounded-lg focus:border-primary focus:ring-2 focus:ring-primary/20 outline-none transition-all"
                  />
                </div>
                <div>
                  <label className="block text-sm font-semibold text-slate-700 mb-2">
                    Total payable now (optional)
                  </label>
                  <input
                    type="number"
                    min={0}
                    value={totalPayableNow}
                    onChange={(e) => setTotalPayableNow(e.target.value)}
                    className="w-full px-3 py-2 text-sm md:text-base border border-slate-200 rounded-lg focus:border-primary focus:ring-2 focus:ring-primary/20 outline-none transition-all"
                  />
                </div>
              </div>

              <div className="grid md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-semibold text-slate-700 mb-2">
                    Availability *
                  </label>
                  <select
                    value={availabilityStatus}
                    onChange={(e) => setAvailabilityStatus(e.target.value)}
                    className="w-full px-3 py-2 text-sm md:text-base border border-slate-200 rounded-lg focus:border-primary focus:ring-2 focus:ring-primary/20 outline-none transition-all bg-white"
                  >
                    <option value="available">Available now</option>
                    <option value="soon">Available soon</option>
                    <option value="occupied">Currently occupied</option>
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-semibold text-slate-700 mb-2">
                    Suitable for (optional)
                  </label>
                  <input
                    type="text"
                    value={suitableFor}
                    onChange={(e) => setSuitableFor(e.target.value)}
                    className="w-full px-3 py-2 text-sm md:text-base border border-slate-200 rounded-lg focus:border-primary focus:ring-2 focus:ring-primary/20 outline-none transition-all"
                  />
                </div>
              </div>

              <button
                type="submit"
                disabled={submitting || !category}
                className="w-full inline-flex items-center justify-center px-4 py-3 rounded-lg bg-primary text-white text-sm md:text-base font-semibold shadow-lg hover:bg-primary/90 transition-all disabled:opacity-70 disabled:cursor-not-allowed"
              >
                {submitting ? (
                  <>
                    <Loader2 className="w-5 h-5 mr-2 animate-spin" />
                    Saving…
                  </>
                ) : (
                  "Save changes"
                )}
              </button>
            </form>
          )}
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default EditSupplierPropertyPage;
