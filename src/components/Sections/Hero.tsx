import { ArrowRight, MessageCircle, ShieldCheck, MapPin } from "lucide-react";
import WhatsAppMockup from "../UI/WhatsappMockup";
import handleWhatsAppClick from "../../utils/openWhatsapp";

const Hero = () => {
  return (
    <section className="relative overflow-hidden border-b border-stone-200/70 bg-surface-warm pb-16 pt-6 md:pb-24 md:pt-10">
      <div
        className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_80%_50%_at_50%_-20%,rgba(65,179,68,0.1),transparent)]"
        aria-hidden
      />

      <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="grid items-center gap-12 lg:grid-cols-[1fr_minmax(0,420px)] lg:gap-16">
          <div className="animate-on-scroll">
            <div className="mb-5 inline-flex items-center gap-2 rounded-full border border-stone-200 bg-white/90 px-3 py-1.5 text-xs font-medium text-stone-600 shadow-sm backdrop-blur-sm">
              <MessageCircle className="h-3.5 w-3.5 text-primary" aria-hidden />
              WhatsApp-first · Built for Accra
            </div>

            <h1 className="font-display text-[2.125rem] font-semibold leading-[1.15] tracking-tight text-stone-900 sm:text-5xl lg:text-[3.25rem]">
              Find verified rooms, apartments, hostels & offices in Accra,{" "}
              <span className="text-primary">with no stress</span>.
            </h1>

            <p className="mt-5 max-w-xl text-base leading-relaxed text-stone-600 md:text-lg">
              Chat with Onukpa on WhatsApp. We match you to landlords, agents,
              and hostel managers — with clear monthly estimates and honest fee
              rules.
            </p>

            <div className="mt-6 flex flex-wrap gap-3 text-sm text-stone-600">
              <span className="inline-flex items-center gap-2 rounded-lg border border-stone-200/80 bg-white/90 px-3 py-2 shadow-sm">
                <ShieldCheck className="h-4 w-4 shrink-0 text-primary" />
                Verified listings
              </span>
              <span className="inline-flex items-center gap-2 rounded-lg border border-stone-200/80 bg-white/90 px-3 py-2 shadow-sm">
                <MapPin className="h-4 w-4 shrink-0 text-primary" />
                Accra neighbourhoods you actually search
              </span>
            </div>

            <div className="mt-8 flex flex-col gap-3 sm:flex-row sm:flex-wrap sm:items-center">
              <button
                type="button"
                onClick={() => handleWhatsAppClick()}
                className="inline-flex items-center justify-center gap-2 rounded-xl bg-primary px-7 py-3.5 text-base font-semibold text-white shadow-md transition hover:bg-[#3aa33d] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary"
              >
                <MessageCircle className="h-5 w-5" aria-hidden />
                Find a place on WhatsApp
                <ArrowRight className="h-4 w-4 opacity-90" aria-hidden />
              </button>
              <div className="flex flex-col gap-2 sm:flex-row sm:gap-2">
                <a
                  href="#landlords"
                  className="inline-flex items-center justify-center rounded-xl border border-stone-300 bg-white px-5 py-3 text-sm font-semibold text-stone-800 transition hover:border-stone-400 hover:bg-stone-50"
                >
                  Agent / Landlord portal
                </a>
                <a
                  href="#for-agents"
                  className="inline-flex items-center justify-center rounded-xl border border-transparent px-5 py-3 text-sm font-semibold text-stone-600 underline decoration-stone-300 underline-offset-4 hover:text-stone-900"
                >
                  Join as an agent
                </a>
              </div>
            </div>

            <p className="mt-6 text-xs text-stone-500">
              Service fee only when a rental is completed — never to “just
              view.”
            </p>
          </div>

          <div className="relative mx-auto w-full max-w-md lg:mx-0 lg:max-w-none">
            <div
              className="absolute right-0 top-0 z-20 hidden w-48 rounded-2xl border border-stone-200/80 bg-white p-3 shadow-lg lg:block xl:top-8"
              aria-hidden
            >
              <p className="text-[10px] font-semibold uppercase tracking-wide text-stone-400">
                Sample match
              </p>
              <p className="mt-1 font-display text-lg font-semibold text-stone-900">
                GHS 2,200
                <span className="text-sm font-sans font-normal text-stone-500">
                  /mo est.
                </span>
              </p>
              <p className="text-xs text-stone-600">2 bed · Adjiringanor</p>
              <p className="mt-2 text-[11px] font-medium text-primary">
                Landlord-direct · Verified
              </p>
            </div>
            <WhatsAppMockup />
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
