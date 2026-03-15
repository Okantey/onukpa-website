import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import {
  ArrowLeft,
  BedDouble,
  Home,
  MapPin,
  Sparkles,
  Tag,
  Loader2,
  AlertCircle,
  MessageCircle,
} from "lucide-react";
import Navigation from "../Layout/Navigation";
import Footer from "../Layout/Footer";
import WhatsAppFloatingButton from "../UI/WhatsappFloatingButton";
import type { Property } from "../../types/domain";
import { fetchPropertyById, logPropertyInterest } from "../../api/properties";
import handleWhatsAppClick from "../../utils/openWhatsapp";

const formatCurrency = (value: number) =>
  new Intl.NumberFormat("en-GH", {
    style: "currency",
    currency: "GHS",
    maximumFractionDigits: 0,
  }).format(value);

const PropertyDetail = () => {
  const { id } = useParams<{ id: string }>();
  const [property, setProperty] = useState<Property | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [interestSubmitting, setInterestSubmitting] = useState(false);
  const [interestSuccess, setInterestSuccess] = useState(false);

  useEffect(() => {
    let isMounted = true;
    const load = async () => {
      if (!id) return;
      try {
        const data = await fetchPropertyById(id);
        if (isMounted) {
          setProperty(data);
        }
      } catch (e) {
        if (isMounted) {
          setError("We could not load this property. Please try again.");
        }
      } finally {
        if (isMounted) {
          setLoading(false);
        }
      }
    };
    load();
    return () => {
      isMounted = false;
    };
  }, [id]);

  const handleInterest = async () => {
    if (!id || !property || interestSubmitting) return;
    setInterestSubmitting(true);
    setError(null);
    try {
      await logPropertyInterest(id, "web");
      setInterestSuccess(true);

      const message = `Hi Onukpa, I'm interested in this property:\n\n${property.title}\n📍 ${property.area}${
        property.monthlyEstimate
          ? `\n💰 ${formatCurrency(property.monthlyEstimate)}/month (estimate)`
          : ""
      }\n\nPlease help me with next steps.`;

      const encodedMessage = encodeURIComponent(message);
      const whatsappUrl = `https://wa.me/+233245095569?text=${encodedMessage}`;
      window.open(whatsappUrl, "_blank");
    } catch (e) {
      setError("We could not submit your interest. Please try again.");
    } finally {
      setInterestSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen bg-white">
      <WhatsAppFloatingButton />
      <Navigation />
      <main className="pt-4 pb-16 px-4 sm:px-6 lg:px-8">
        <div className="max-w-6xl mx-auto">
          <button
            type="button"
            onClick={() => window.history.back()}
            className="inline-flex items-center text-sm md:text-base text-slate-600 hover:text-slate-900 mb-4"
          >
            <ArrowLeft className="w-4 h-4 mr-1" />
            Back
          </button>

          {loading && (
            <div className="flex items-center justify-center py-16">
              <Loader2 className="w-6 h-6 text-primary animate-spin" />
            </div>
          )}

          {!loading && error && (
            <div className="flex items-center space-x-3 bg-red-50 border border-red-200 rounded-xl px-4 py-3 text-sm text-red-700">
              <AlertCircle className="w-4 h-4" />
              <span>{error}</span>
            </div>
          )}

          {!loading && property && (
            <div className="grid lg:grid-cols-3 gap-8 mt-4">
              <div className="lg:col-span-2 space-y-6">
                <div className="rounded-2xl overflow-hidden border border-slate-200 bg-slate-50">
                  {property.images && property.images.length > 0 ? (
                    <div className="grid md:grid-cols-3 gap-1 h-72 md:h-80">
                      <div className="md:col-span-2 h-full">
                        <img
                          src={property.images[0]}
                          alt={property.title}
                          className="w-full h-full object-cover"
                        />
                      </div>
                      <div className="hidden md:grid grid-rows-2 gap-1 h-full">
                        {property.images.slice(1, 3).map((img) => (
                          <img
                            key={img}
                            src={img}
                            alt={property.title}
                            className="w-full h-full object-cover"
                          />
                        ))}
                      </div>
                    </div>
                  ) : (
                    <div className="h-72 md:h-80 bg-slate-100 flex items-center justify-center text-slate-400 text-sm">
                      No images available yet
                    </div>
                  )}
                </div>

                <div className="space-y-3">
                  <h1 className="text-2xl md:text-3xl font-bold text-slate-900">
                    {property.title}
                  </h1>
                  <div className="flex flex-wrap gap-3 text-sm md:text-base text-slate-600">
                    <span className="inline-flex items-center px-3 py-1 rounded-full bg-slate-50 border border-slate-200">
                      <MapPin className="w-4 h-4 mr-1 text-primary" />
                      {property.area}
                    </span>
                    {property.typeLabel && (
                      <span className="inline-flex items-center px-3 py-1 rounded-full bg-slate-50 border border-slate-200">
                        <Home className="w-4 h-4 mr-1 text-primary" />
                        {property.typeLabel}
                      </span>
                    )}
                    {property.furnished !== undefined && (
                      <span className="inline-flex items-center px-3 py-1 rounded-full bg-slate-50 border border-slate-200">
                        <BedDouble className="w-4 h-4 mr-1 text-primary" />
                        {property.furnished ? "Furnished" : "Unfurnished"}
                      </span>
                    )}
                    {property.suitableFor && (
                      <span className="inline-flex items-center px-3 py-1 rounded-full bg-slate-50 border border-slate-200">
                        <Sparkles className="w-4 h-4 mr-1 text-primary" />
                        {property.suitableFor}
                      </span>
                    )}
                  </div>
                </div>

                {property.description && (
                  <div className="bg-slate-50 border border-slate-200 rounded-2xl p-5 text-base text-slate-700 leading-relaxed">
                    {property.description}
                  </div>
                )}

                {property.features && property.features.length > 0 && (
                  <div>
                    <h2 className="text-base font-semibold text-slate-900 mb-3">
                      Key Features
                    </h2>
                    <div className="flex flex-wrap gap-2">
                      {property.features.map((feature) => (
                        <span
                          key={feature}
                          className="px-3 py-1 rounded-full bg-slate-50 border border-slate-200 text-xs text-slate-700"
                        >
                          {feature}
                        </span>
                      ))}
                    </div>
                  </div>
                )}
              </div>

              <aside className="space-y-4">
                <div className="bg-white border border-slate-200 rounded-2xl p-5 shadow-sm">
                  <div className="flex items-baseline justify-between mb-3">
                    {property.monthlyEstimate && (
                      <div>
                        <p className="text-xs uppercase tracking-wide text-slate-500 mb-1">
                          Monthly estimate
                        </p>
                        <p className="text-2xl font-bold text-slate-900">
                          {formatCurrency(property.monthlyEstimate)}
                          <span className="text-sm font-medium text-slate-500">
                            /month
                          </span>
                        </p>
                      </div>
                    )}
                    {property.advanceMonths && (
                      <div className="text-right">
                        <p className="text-xs uppercase tracking-wide text-slate-500 mb-1">
                          Advance accepted
                        </p>
                        <p className="text-sm font-semibold text-slate-800">
                          {property.advanceMonths} months
                        </p>
                      </div>
                    )}
                  </div>

                  {property.totalPayableNow && (
                    <div className="flex items-center justify-between bg-slate-50 border border-slate-200 rounded-xl px-3 py-2 mb-3">
                      <div className="flex items-center space-x-2 text-xs text-slate-600">
                        <Tag className="w-4 h-4 text-primary" />
                        <span>Total payable now (indicative)</span>
                      </div>
                      <p className="text-sm font-semibold text-slate-900">
                        {formatCurrency(property.totalPayableNow)}
                      </p>
                    </div>
                  )}

                  <button
                    type="button"
                    onClick={handleInterest}
                    disabled={interestSubmitting || interestSuccess}
                    className="w-full inline-flex items-center justify-center px-4 py-3 rounded-lg bg-primary text-white text-sm font-semibold shadow-lg hover:bg-primary/90 transition-all disabled:opacity-70 disabled:cursor-not-allowed"
                  >
                    {interestSubmitting ? (
                      <>
                        <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                        Submitting interest...
                      </>
                    ) : interestSuccess ? (
                      <>
                        <MessageCircle className="w-4 h-4 mr-2" />
                        Interest submitted – check WhatsApp
                      </>
                    ) : (
                      <>
                        <MessageCircle className="w-4 h-4 mr-2" />
                        I am Interested
                      </>
                    )}
                  </button>

                  <p className="mt-3 text-xs text-slate-500">
                    We will log your interest and continue the conversation on WhatsApp.
                    Supplier phone numbers are not shown publicly; Onukpa coordinates the
                    connection for safety.
                  </p>
                </div>

                <div className="bg-slate-50 border border-slate-200 rounded-2xl p-4 text-xs text-slate-600 space-y-2">
                  <p>
                    Prices are shown as monthly estimates to help you compare. Actual
                    advance and payment terms will be confirmed clearly before you decide.
                  </p>
                  <button
                    type="button"
                    onClick={() => handleWhatsAppClick()}
                    className="inline-flex items-center justify-center mt-1 px-3 py-2 rounded-lg border border-slate-300 text-slate-800 font-semibold hover:border-slate-400 hover:text-slate-900 transition-all"
                  >
                    <MessageCircle className="w-4 h-4 mr-2" />
                    Ask a question on WhatsApp
                  </button>
                </div>
              </aside>
            </div>
          )}
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default PropertyDetail;

