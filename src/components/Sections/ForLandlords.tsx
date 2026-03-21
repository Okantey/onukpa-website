import {
  Building2,
  CheckCircle2,
  MessageCircle,
  ShieldCheck,
} from "lucide-react";
import handleWhatsAppClick from "../../utils/openWhatsapp";
import { LANDING_IMAGES } from "../../constants/landingImages";

const ForLandlords = () => {
  const points = [
    "Register and add properties one secure link at a time.",
    "Serious renters arrive with budget and area already captured.",
    "We help you think through pricing and how you collect rent.",
    "You pay on success — same published fee rules as everyone else.",
  ];

  return (
    <section
      className="border-t border-stone-200/50 bg-surface-sage py-20 md:py-24"
      id="landlords"
    >
      <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
        <div className="grid items-start gap-12 lg:grid-cols-2 lg:gap-16">
          <div className="animate-on-scroll">
            <p className="text-xs font-semibold uppercase tracking-[0.14em] text-primary mb-3">
              Landlords
            </p>
            <h2 className="font-display text-3xl md:text-4xl font-semibold tracking-tight text-stone-900">
              Fill rooms without the chaos
            </h2>
            <p className="mt-4 max-w-lg text-base leading-relaxed text-stone-600">
              Onukpa brings structured WhatsApp enquiries from people who are
              ready to move — not endless tyre-kickers.
            </p>

            <ul className="mt-8 space-y-3">
              {points.map((text) => (
                <li key={text} className="flex gap-3 text-sm text-stone-700">
                  <CheckCircle2 className="mt-0.5 h-5 w-5 shrink-0 text-primary" />
                  {text}
                </li>
              ))}
            </ul>

            <div className="mt-8 flex flex-col gap-3 sm:flex-row">
              <a
                href="/register/landlord"
                className="inline-flex items-center justify-center rounded-xl bg-primary px-6 py-3 text-sm font-semibold text-white shadow-sm transition hover:bg-[#3aa33d]"
              >
                List your property
              </a>
              <button
                type="button"
                onClick={() => handleWhatsAppClick()}
                className="inline-flex items-center justify-center rounded-xl border border-stone-300 bg-white px-6 py-3 text-sm font-semibold text-stone-800 transition hover:border-stone-400"
              >
                <MessageCircle className="mr-2 h-4 w-4" />
                Speak to the team
              </button>
            </div>
          </div>

          <div className="animate-on-scroll">
            <div className="overflow-hidden rounded-2xl border border-stone-200/90 bg-white shadow-md">
              <div className="relative aspect-[4/3] overflow-hidden bg-stone-200">
                <img
                  src={LANDING_IMAGES.keysHome}
                  alt="Keys to a new home in Accra"
                  className="h-full w-full object-cover"
                  loading="lazy"
                  decoding="async"
                />
              </div>
              <div className="space-y-4 p-6 md:p-8">
                <div className="flex items-center gap-3">
                  <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-primary/10">
                    <Building2 className="h-5 w-5 text-primary" />
                  </div>
                  <div>
                    <p className="text-xs font-semibold uppercase tracking-wide text-stone-500">
                      What we list
                    </p>
                    <p className="font-medium text-stone-900">
                      Rooms · Apartments · Hostels · Commercial
                    </p>
                  </div>
                </div>
                <p className="text-sm leading-relaxed text-stone-600">
                  Every submission is reviewed before it goes live. Suppliers complete
                  ID verification on the secure portal (HTTPS), not in WhatsApp chat.
                </p>
                <div className="flex gap-2 rounded-xl bg-stone-50 p-3 text-xs text-stone-600">
                  <ShieldCheck className="mt-0.5 h-4 w-4 shrink-0 text-primary" />
                  Your listing can surface in both landlord-first matching and
                  trusted-agent fallback.
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ForLandlords;
