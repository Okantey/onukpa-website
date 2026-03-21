import { useState, useEffect } from "react";
import { Link, useParams } from "react-router-dom";
import {
  Home,
  Building2,
  GraduationCap,
  Store,
  MapPin,
  Tag,
  Loader2,
} from "lucide-react";
import Navigation from "../Layout/Navigation";
import Footer from "../Layout/Footer";
import WhatsAppFloatingButton from "../UI/WhatsappFloatingButton";
import PropertyPhotosSection from "./supplier/PropertyPhotosSection";
import { accraAreas } from "../../constants/areas";
import {
  submitPropertyWithToken,
  type PropertyPayload,
  type SupplierMediaItem,
} from "../../api/suppliers";
import {
  type CategoryKey,
  SUPPLIER_CATEGORY_LABELS,
  buildPropertyPayload,
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

const AddPropertyPage = () => {
  const { token } = useParams<{ token: string }>();
  const [category, setCategory] = useState<CategoryKey | null>("room");
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
  const [submitting, setSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const subtypeChoices = category ? subtypeOptionsForCategory(category) : [];

  useEffect(() => {
    if (!category) return;
    setSubtype((prev) => {
      const opts = subtypeOptionsForCategory(category);
      return opts.includes(prev) ? prev : "";
    });
  }, [category]);

  if (!token) {
    return (
      <div className="min-h-screen bg-white">
        <WhatsAppFloatingButton />
        <Navigation />
        <main className="pt-6 pb-16 px-4 sm:px-6 lg:px-8">
          <div className="max-w-xl mx-auto text-center text-sm md:text-base text-slate-700">
            Invalid or missing property link. Please open the latest Onukpa link sent
            to you on WhatsApp to add a property.
          </div>
        </main>
        <Footer />
      </div>
    );
  }

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!category) return;

    setSubmitting(true);
    setError(null);
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
      const payload: PropertyPayload = buildPropertyPayload(state, attributes);

      await submitPropertyWithToken(token, payload);
      setSubmitted(true);
    } catch {
      setError("We could not submit this property. Please try again.");
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen bg-white">
      <WhatsAppFloatingButton />
      <Navigation />
      <main className="pt-6 pb-16 px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto">
          <div className="mb-8 text-center">
            <div className="inline-flex items-center px-4 py-2 rounded-full bg-primary/10 border border-primary/20 text-primary text-xs md:text-sm font-medium mb-3">
              Secure property link
            </div>
            <h1 className="text-2xl md:text-3xl font-bold text-slate-900 mb-3">
              Add a property to Onukpa
            </h1>
            <p className="text-base md:text-lg text-slate-600 max-w-2xl mx-auto">
              Use this secure link to add one property at a time. Our team will
              review each listing before it goes live for renters.
            </p>
          </div>

          {submitted ? (
            <div className="bg-white border border-slate-200 rounded-2xl shadow-sm p-6 md:p-8 text-center space-y-4">
              <div className="inline-flex items-center justify-center w-12 h-12 rounded-full bg-primary/10">
                <Tag className="w-6 h-6 text-primary" />
              </div>
              <h2 className="text-xl font-semibold text-slate-900">
                Property submitted for review
              </h2>
              <p className="text-base text-slate-600 max-w-md mx-auto">
                Thank you. The Onukpa team will review this property and, once
                approved, start matching it to verified renter requests.
              </p>
              <p className="text-sm text-slate-500">
                You can add more listings anytime with the same secure link.
              </p>
              {token ? (
                <Link
                  to={`/supplier/portal/${encodeURIComponent(token)}`}
                  className="inline-flex items-center justify-center text-primary font-semibold hover:underline text-sm"
                >
                  View all my listings
                </Link>
              ) : null}
            </div>
          ) : (
            <form
              onSubmit={handleSubmit}
              className="bg-white border border-slate-200 rounded-2xl shadow-sm p-6 md:p-8 space-y-6"
            >
              {error && (
                <div className="text-sm text-red-700 bg-red-50 border border-red-200 rounded-xl px-4 py-3">
                  {error}
                </div>
              )}

              <div>
                <p className="text-sm font-semibold text-slate-800 mb-3">
                  Property category *
                </p>
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
                    placeholder="e.g. 2-bed apartment at East Legon"
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
                  placeholder="Describe the property, key amenities, who it is ideal for and any rules."
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
                    placeholder="Near which bus stop, school, etc."
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
                  <p className="mt-1 text-xs text-slate-500">
                    We show this as a monthly amount even if you take 1–2 years advance.
                  </p>
                </div>
                <div>
                  <label className="block text-sm font-semibold text-slate-700 mb-2">
                    Advance accepted (months)
                  </label>
                  <input
                    type="number"
                    min={0}
                    value={advanceMonths}
                    onChange={(e) => setAdvanceMonths(e.target.value)}
                    className="w-full px-3 py-2 text-sm md:text-base border border-slate-200 rounded-lg focus:border-primary focus:ring-2 focus:ring-primary/20 outline-none transition-all"
                    placeholder="e.g. 12 or 24"
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
                    placeholder="If you already know the full amount"
                  />
                </div>
              </div>

              <div className="grid md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-semibold text-slate-700 mb-2">
                    Availability status *
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
                    placeholder="Students, workers, small family, shop, office..."
                  />
                </div>
              </div>

              <button
                type="submit"
                disabled={submitting}
                className="w-full inline-flex items-center justify-center px-4 py-3 rounded-lg bg-primary text-white text-sm md:text-base font-semibold shadow-lg hover:bg-primary/90 transition-all disabled:opacity-70 disabled:cursor-not-allowed"
              >
                {submitting ? (
                  <>
                    <Loader2 className="w-5 h-5 mr-2 animate-spin" />
                    Submitting property...
                  </>
                ) : (
                  "Submit property for review"
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

export default AddPropertyPage;
