import {
  Building2,
  CheckCircle2,
  MessageCircle,
  ShieldCheck,
} from "lucide-react";
import handleWhatsAppClick from "../../utils/openWhatsapp";

const ForLandlords = () => {
  const points = [
    "Register as a landlord and add your properties one by one.",
    "Reach serious renters who have already shared their budget and area.",
    "Get support from the Onukpa team when pricing or structuring your offer.",
    "Pay only when successful, based on our clear service fee rules.",
  ];

  return (
    <section className="py-20 bg-white" id="landlords">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid lg:grid-cols-2 gap-10 items-center">
          <div className="animate-on-scroll">
            <div className="inline-flex items-center px-4 py-2 rounded-full bg-primary/10 border border-primary/20 text-primary text-xs md:text-sm font-medium mb-4">
              For landlords in Accra
            </div>
            <h2 className="md:text-3xl text-2xl font-bold text-slate-900 mb-4">
              A calmer way to fill your rooms and apartments
            </h2>
            <p className="text-slate-600 text-sm md:text-base mb-5">
              Onukpa helps landlords find serious renters without chaos. We
              bring structured requests, verified profiles and WhatsApp-first
              support – so you can focus on running your property well.
            </p>

            <ul className="space-y-3 mb-6">
              {points.map((text) => (
                <li key={text} className="flex items-start space-x-3">
                  <CheckCircle2 className="w-5 h-5 text-primary mt-0.5 flex-shrink-0" />
                  <span className="text-sm md:text-base text-slate-700">
                    {text}
                  </span>
                </li>
              ))}
            </ul>

            <div className="flex flex-col sm:flex-row gap-3">
              <a
                href="/register/landlord"
                className="inline-flex items-center justify-center px-6 py-3 rounded-lg bg-primary text-white text-sm font-semibold shadow-lg hover:bg-primary/90 transition-all"
              >
                List Your Property
              </a>
              <button
                type="button"
                onClick={() => handleWhatsAppClick()}
                className="inline-flex items-center justify-center px-6 py-3 rounded-lg border border-slate-300 text-slate-800 text-sm font-semibold hover:border-slate-400 hover:text-slate-900 transition-all"
              >
                <MessageCircle className="w-4 h-4 mr-2" />
                Talk to the team
              </button>
            </div>
          </div>

          <div className="animate-on-scroll">
            <div className="bg-slate-50 border border-slate-200 rounded-2xl p-6 md:p-8 shadow-sm">
              <div className="flex items-center mb-4 space-x-3">
                <div className="w-10 h-10 rounded-xl bg-primary/10 flex items-center justify-center">
                  <Building2 className="w-5 h-5 text-primary" />
                </div>
                <div>
                  <p className="text-xs uppercase tracking-wide text-slate-500">
                    For Landlords
                  </p>
                  <p className="font-semibold text-slate-900 text-sm">
                    Rooms • Apartments • Hostels • Stores
                  </p>
                </div>
              </div>

              <div className="space-y-3 text-sm text-slate-700">
                <p>
                  Share your property details once via a secure link. Our team
                  reviews every listing before it goes live, to protect both you
                  and renters.
                </p>
                <p>
                  We prioritise direct landlords in matching, then trusted
                  agents as a fallback for harder searches. Your listing
                  benefits from both flows.
                </p>
              </div>

              <div className="mt-5 flex items-center space-x-3 text-xs text-slate-600">
                <ShieldCheck className="w-4 h-4 text-primary" />
                <p>
                  Supplier profiles and properties may be verified with Ghana
                  Card and manual checks before large deals.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ForLandlords;
