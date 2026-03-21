import { useEffect, useState } from "react";
import { useSearchParams, Link } from "react-router-dom";
import { Loader2, MessageCircle } from "lucide-react";
import Navigation from "../Layout/Navigation";
import Footer from "../Layout/Footer";
import WhatsAppFloatingButton from "../UI/WhatsappFloatingButton";
import { fetchMagicLinkStatus } from "../../api/suppliers";
import {
  ONUKPA_WHATSAPP_WA_ME_ID,
  ONUKPA_WA_SUPPLIER_COMPLETE,
} from "../../constants/whatsappContact";

const SupplierCompletePage = () => {
  const [searchParams] = useSearchParams();
  const token = searchParams.get("token") ?? "";
  const [loading, setLoading] = useState(true);
  const [valid, setValid] = useState(false);
  const [tokenType, setTokenType] = useState<string | null>(null);

  useEffect(() => {
    if (!token) {
      setLoading(false);
      return;
    }
    let cancelled = false;
    (async () => {
      try {
        const res = await fetchMagicLinkStatus(token);
        if (cancelled) return;
        setValid(!!res.valid);
        setTokenType(res.tokenType ?? null);
      } catch {
        if (!cancelled) {
          setValid(false);
          setTokenType(null);
        }
      } finally {
        if (!cancelled) setLoading(false);
      }
    })();
    return () => {
      cancelled = true;
    };
  }, [token]);

  const whatsappHref = `https://wa.me/${ONUKPA_WHATSAPP_WA_ME_ID}?text=${encodeURIComponent(
    ONUKPA_WA_SUPPLIER_COMPLETE
  )}`;

  const isPropertyListing = tokenType === "property_listing";

  return (
    <div className="min-h-screen bg-white">
      <WhatsAppFloatingButton />
      <Navigation />
      <main className="pt-6 pb-16 px-4 sm:px-6 lg:px-8">
        <div className="max-w-xl mx-auto text-center space-y-6">
          <div className="inline-flex items-center px-4 py-2 rounded-full bg-primary/10 border border-primary/20 text-primary text-xs font-medium">
            Onukpa link
          </div>

          {loading ? (
            <div className="flex justify-center py-12 text-slate-500">
              <Loader2 className="w-10 h-10 animate-spin" />
            </div>
          ) : !token ? (
            <p className="text-slate-700">
              This page needs a <code className="text-sm bg-slate-100 px-1 rounded">token</code> in
              the URL. Open the link from WhatsApp again.
            </p>
          ) : !valid ? (
            <div className="space-y-4">
              <p className="text-slate-800 font-medium">This link is invalid or has expired.</p>
              <p className="text-sm text-slate-600">
                Message the Onukpa bot on WhatsApp to get a fresh link.
              </p>
              <a
                href={whatsappHref}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center gap-2 px-5 py-3 rounded-lg bg-[#25D366] text-white text-sm font-semibold"
              >
                <MessageCircle className="w-5 h-5" />
                Open WhatsApp
              </a>
            </div>
          ) : isPropertyListing ? (
            <div className="space-y-4">
              <p className="text-slate-800 font-medium">This is a property-listing link.</p>
              <p className="text-sm text-slate-600">
                Use your supplier portal to view or add listings.
              </p>
              <Link
                to={`/supplier/portal/${encodeURIComponent(token)}`}
                className="inline-block px-5 py-3 rounded-lg bg-primary text-white text-sm font-semibold"
              >
                Open supplier portal
              </Link>
            </div>
          ) : (
            <div className="space-y-4">
              <p className="text-slate-800 font-medium">Profile link confirmed</p>
              <p className="text-sm text-slate-600">
                Continue on WhatsApp to finish any remaining steps with the bot.
              </p>
              <a
                href={whatsappHref}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center gap-2 px-5 py-3 rounded-lg bg-[#25D366] text-white text-sm font-semibold"
              >
                <MessageCircle className="w-5 h-5" />
                Continue on WhatsApp
              </a>
            </div>
          )}
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default SupplierCompletePage;
