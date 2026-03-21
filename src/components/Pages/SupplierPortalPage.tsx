import { useEffect, useState, type FormEvent } from "react";
import { Link, useParams } from "react-router-dom";
import {
  Building2,
  ExternalLink,
  IdCard,
  ListChecks,
  Loader2,
  Pencil,
  Plus,
} from "lucide-react";
import { resolveMediaUrl } from "../../utils/mediaUrl";
import Navigation from "../Layout/Navigation";
import Footer from "../Layout/Footer";
import WhatsAppFloatingButton from "../UI/WhatsappFloatingButton";
import {
  fetchSupplierProfile,
  fetchSupplierProperties,
  patchSupplierProfileGhanaCard,
  type SupplierPropertyListItem,
} from "../../api/suppliers";

const LISTING_STATUS_LABEL: Record<string, string> = {
  draft: "Draft",
  submitted: "Submitted",
  under_review: "Under review",
  approved_live: "Live",
  rejected: "Rejected",
  paused: "Paused",
  expired: "Expired",
  rented_closed: "Rented / closed",
  archived: "Archived",
};

function formatStatus(status: string): string {
  return LISTING_STATUS_LABEL[status] ?? status.replace(/_/g, " ");
}

const VERIFICATION_STATUS_LABEL: Record<string, string> = {
  started: "Not submitted",
  bio_completed: "Profile in progress",
  pending_review: "ID submitted — under review",
  verified: "Verified",
  rejected: "Needs attention",
  suspended: "Suspended",
};

function formatVerificationStatus(status: string): string {
  return VERIFICATION_STATUS_LABEL[status] ?? status.replace(/_/g, " ");
}

const SUPPLIER_EDITABLE_STATUSES = new Set([
  "draft",
  "submitted",
  "under_review",
  "rejected",
]);

const SupplierPortalPage = () => {
  const { token } = useParams<{ token: string }>();
  const [items, setItems] = useState<SupplierPropertyListItem[] | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);
  const [profile, setProfile] = useState<{
    verificationStatus: string;
    hasGhanaCardOnFile: boolean;
  } | null>(null);
  const [ghanaCardInput, setGhanaCardInput] = useState("");
  const [verifySubmitting, setVerifySubmitting] = useState(false);
  const [verifyError, setVerifyError] = useState<string | null>(null);

  useEffect(() => {
    if (!token) {
      setLoading(false);
      setError("Missing link token.");
      return;
    }

    let cancelled = false;
    (async () => {
      try {
        const [propsOutcome, profOutcome] = await Promise.allSettled([
          fetchSupplierProperties(token),
          fetchSupplierProfile(token),
        ]);
        if (cancelled) return;

        if (propsOutcome.status === "rejected" || !propsOutcome.value.ok) {
          setError(
            propsOutcome.status === "rejected"
              ? "This link is invalid or has expired. Open the latest link from WhatsApp."
              : "We could not load your listings."
          );
          setItems([]);
        } else {
          setItems(propsOutcome.value.properties ?? []);
          setError(null);
        }

        if (
          profOutcome.status === "fulfilled" &&
          profOutcome.value.ok &&
          profOutcome.value.verificationStatus
        ) {
          setProfile({
            verificationStatus: profOutcome.value.verificationStatus,
            hasGhanaCardOnFile: profOutcome.value.hasGhanaCardOnFile,
          });
        } else {
          setProfile(null);
        }
      } catch {
        if (!cancelled) {
          setError("This link is invalid or has expired. Open the latest link from WhatsApp.");
          setItems([]);
          setProfile(null);
        }
      } finally {
        if (!cancelled) setLoading(false);
      }
    })();

    return () => {
      cancelled = true;
    };
  }, [token]);

  if (!token) {
    return (
      <div className="min-h-screen bg-white">
        <WhatsAppFloatingButton />
        <Navigation />
        <main className="pt-6 pb-16 px-4 sm:px-6 lg:px-8">
          <div className="max-w-xl mx-auto text-center text-sm md:text-base text-slate-700">
            Invalid supplier link. Open the latest Onukpa link from WhatsApp.
          </div>
        </main>
        <Footer />
      </div>
    );
  }

  const addPath = `/supplier/add-property/${encodeURIComponent(token)}`;

  const canSubmitId =
    profile &&
    profile.verificationStatus !== "verified" &&
    profile.verificationStatus !== "suspended";

  async function handleVerificationSubmit(e: FormEvent) {
    e.preventDefault();
    if (!token || !canSubmitId) return;
    const trimmed = ghanaCardInput.trim();
    if (trimmed.length < 8) {
      setVerifyError("Enter your Ghana Card number (e.g. GHA-123456789-0).");
      return;
    }
    setVerifySubmitting(true);
    setVerifyError(null);
    const result = await patchSupplierProfileGhanaCard(token, trimmed);
    setVerifySubmitting(false);
    if (!result.ok) {
      setVerifyError(result.message);
      return;
    }
    setProfile({
      verificationStatus: result.verificationStatus,
      hasGhanaCardOnFile: result.hasGhanaCardOnFile,
    });
    setGhanaCardInput("");
  }

  return (
    <div className="min-h-screen bg-white">
      <WhatsAppFloatingButton />
      <Navigation />
      <main className="pt-6 pb-16 px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto">
          <div className="mb-8 text-center">
            <div className="inline-flex items-center px-4 py-2 rounded-full bg-primary/10 border border-primary/20 text-primary text-xs md:text-sm font-medium mb-3">
              Supplier portal
            </div>
            <h1 className="text-2xl md:text-3xl font-bold text-slate-900 mb-3">
              Your listings
            </h1>
            <p className="text-base md:text-lg text-slate-600 max-w-2xl mx-auto mb-6">
              See everything you have submitted and add more properties with the same secure
              link.
            </p>
            <Link
              to={addPath}
              className="inline-flex items-center justify-center gap-2 px-5 py-3 rounded-lg bg-primary text-white text-sm md:text-base font-semibold shadow-lg hover:bg-primary/90 transition-all"
            >
              <Plus className="w-5 h-5" />
              Add a property
            </Link>
          </div>

          {!loading && !error && profile ? (
            <section className="mb-10 rounded-2xl border border-slate-200 bg-slate-50/80 p-6 md:p-8">
              <div className="flex items-start gap-3 mb-4">
                <IdCard className="w-6 h-6 text-primary shrink-0 mt-0.5" />
                <div>
                  <h2 className="text-lg font-semibold text-slate-900">Identity verification</h2>
                  <p className="text-sm text-slate-600 mt-1">
                    Submit your Ghana Card here over HTTPS. We do not collect this in WhatsApp
                    chat.
                  </p>
                </div>
              </div>
              <p className="text-sm text-slate-700 mb-4">
                <span className="font-medium text-slate-800">Status:</span>{" "}
                {formatVerificationStatus(profile.verificationStatus)}
                {profile.hasGhanaCardOnFile ? (
                  <span className="text-slate-500"> · ID on file</span>
                ) : null}
              </p>
              {profile.verificationStatus === "verified" ? (
                <p className="text-sm text-emerald-800 bg-emerald-50 border border-emerald-200 rounded-xl px-4 py-3">
                  Your supplier identity is verified. Thank you.
                </p>
              ) : profile.verificationStatus === "rejected" ? (
                <p className="text-sm text-amber-900 bg-amber-50 border border-amber-200 rounded-xl px-4 py-3">
                  Verification could not be completed from the number on file. Please message us
                  on WhatsApp so we can help.
                </p>
              ) : profile.verificationStatus === "suspended" ? (
                <p className="text-sm text-slate-700 bg-slate-100 border border-slate-200 rounded-xl px-4 py-3">
                  This supplier profile is suspended. Contact support if you think this is a mistake.
                </p>
              ) : canSubmitId ? (
                <form onSubmit={handleVerificationSubmit} className="space-y-4 max-w-md">
                  <div>
                    <label
                      htmlFor="supplier-ghana-card"
                      className="block text-sm font-medium text-slate-800 mb-1.5"
                    >
                      Ghana Card number
                    </label>
                    <input
                      id="supplier-ghana-card"
                      type="text"
                      autoComplete="off"
                      value={ghanaCardInput}
                      onChange={(e) => setGhanaCardInput(e.target.value)}
                      placeholder="e.g. GHA-123456789-0"
                      className="w-full rounded-lg border border-slate-300 px-3 py-2.5 text-slate-900 text-sm focus:outline-none focus:ring-2 focus:ring-primary/30 focus:border-primary"
                    />
                    {profile.hasGhanaCardOnFile ? (
                      <p className="text-xs text-slate-500 mt-1.5">
                        You can submit again to replace the number we have on file (until you are
                        verified).
                      </p>
                    ) : null}
                  </div>
                  {verifyError ? (
                    <p className="text-sm text-red-700 bg-red-50 border border-red-200 rounded-lg px-3 py-2">
                      {verifyError}
                    </p>
                  ) : null}
                  <button
                    type="submit"
                    disabled={verifySubmitting}
                    className="inline-flex items-center justify-center px-4 py-2.5 rounded-lg bg-slate-900 text-white text-sm font-semibold hover:bg-slate-800 disabled:opacity-60"
                  >
                    {verifySubmitting ? (
                      <>
                        <Loader2 className="w-4 h-4 animate-spin mr-2" />
                        Submitting…
                      </>
                    ) : (
                      "Submit for review"
                    )}
                  </button>
                </form>
              ) : null}
            </section>
          ) : null}

          {loading ? (
            <div className="flex justify-center py-16 text-slate-500">
              <Loader2 className="w-10 h-10 animate-spin" />
            </div>
          ) : error ? (
            <div className="bg-red-50 border border-red-200 text-red-800 rounded-2xl px-6 py-4 text-sm md:text-base text-center">
              {error}
            </div>
          ) : items && items.length === 0 ? (
            <div className="bg-slate-50 border border-slate-200 rounded-2xl p-8 md:p-10 text-center">
              <ListChecks className="w-12 h-12 text-slate-400 mx-auto mb-4" />
              <h2 className="text-lg font-semibold text-slate-900 mb-2">No properties yet</h2>
              <p className="text-slate-600 mb-6 max-w-md mx-auto">
                Submit your first listing — it will show here while we review it.
              </p>
              <Link
                to={addPath}
                className="inline-flex items-center gap-2 text-primary font-semibold hover:underline"
              >
                <Building2 className="w-5 h-5" />
                Add a property
              </Link>
            </div>
          ) : (
            <ul className="space-y-4">
              {items?.map((row) => {
                const id = String(row._id ?? "");
                const live = row.listingStatus === "approved_live";
                const editable = SUPPLIER_EDITABLE_STATUSES.has(row.listingStatus);
                const thumb = row.media?.find((m) => m.isPrimary)?.url ?? row.media?.[0]?.url;
                const editPath = `/supplier/edit-property/${encodeURIComponent(token)}/${encodeURIComponent(id)}`;
                return (
                  <li
                    key={id}
                    className="bg-white border border-slate-200 rounded-2xl shadow-sm p-5 md:p-6 flex flex-col md:flex-row md:items-center md:justify-between gap-4"
                  >
                    <div className="flex gap-4 min-w-0">
                      {thumb ? (
                        <div className="w-20 h-20 rounded-lg overflow-hidden border border-slate-200 bg-slate-100 shrink-0">
                          <img
                            src={resolveMediaUrl(String(thumb))}
                            alt=""
                            className="w-full h-full object-cover"
                          />
                        </div>
                      ) : null}
                      <div className="min-w-0">
                      <h3 className="font-semibold text-slate-900 text-lg">{row.title}</h3>
                      <p className="text-sm text-slate-600 mt-1">
                        {row.area}
                        {row.subType ? ` · ${row.subType}` : ""}
                      </p>
                      <p className="text-xs text-slate-500 mt-2">
                        Status:{" "}
                        <span className="font-medium text-slate-700">
                          {formatStatus(row.listingStatus)}
                        </span>
                        {row.monthlyEquivalent != null ? (
                          <> · GHS {Number(row.monthlyEquivalent).toLocaleString()} / mo</>
                        ) : null}
                      </p>
                      </div>
                    </div>
                    <div className="flex flex-wrap gap-2 shrink-0">
                      {editable ? (
                        <Link
                          to={editPath}
                          className="inline-flex items-center gap-2 px-4 py-2 rounded-lg border border-slate-300 text-slate-800 text-sm font-medium hover:bg-slate-50"
                        >
                          <Pencil className="w-4 h-4" />
                          Edit
                        </Link>
                      ) : null}
                      {live ? (
                        <a
                          href={`/properties/${id}`}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="inline-flex items-center gap-2 px-4 py-2 rounded-lg border border-primary text-primary text-sm font-medium hover:bg-primary/5"
                        >
                          View live page
                          <ExternalLink className="w-4 h-4" />
                        </a>
                      ) : (
                        <span className="inline-flex items-center px-4 py-2 rounded-lg bg-slate-100 text-slate-600 text-sm">
                          Public link after approval
                        </span>
                      )}
                    </div>
                  </li>
                );
              })}
            </ul>
          )}
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default SupplierPortalPage;
