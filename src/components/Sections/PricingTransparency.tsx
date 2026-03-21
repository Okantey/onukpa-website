import { HandCoins, Info, Wallet, ShieldCheck } from "lucide-react";
import SectionIntro from "../Layout/SectionIntro";

const PricingTransparency = () => {
  return (
    <section
      className="border-t border-stone-200/50 bg-white py-20 md:py-24"
      id="pricing"
    >
      <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
        <SectionIntro
          eyebrow="Pricing"
          title="Simple, success-based fees"
          subtitle="Monthly figures help you compare. We spell out advance and total move-in cost before you commit."
        />

        <div className="grid gap-5 md:grid-cols-3">
          <div className="animate-on-scroll rounded-2xl border border-stone-200/90 bg-surface-muted/50 p-6">
            <div className="mb-4 flex h-10 w-10 items-center justify-center rounded-xl bg-primary/10 text-primary">
              <ShieldCheck className="h-5 w-5" />
            </div>
            <h3 className="font-semibold text-stone-900">No viewing fees</h3>
            <p className="mt-2 text-sm leading-relaxed text-stone-600">
              You don’t pay Onukpa to book or attend viewings.
            </p>
          </div>

          <div className="animate-on-scroll rounded-2xl border border-stone-200/90 bg-surface-muted/50 p-6">
            <div className="mb-4 flex h-10 w-10 items-center justify-center rounded-xl bg-primary/10 text-primary">
              <HandCoins className="h-5 w-5" />
            </div>
            <h3 className="font-semibold text-stone-900">Landlord-direct</h3>
            <p className="mt-3 font-display text-3xl font-semibold text-primary">
              5%
            </p>
            <p className="mt-1 text-sm text-stone-600">
              Onukpa service fee on the completed rental value.
            </p>
          </div>

          <div className="animate-on-scroll rounded-2xl border border-stone-200/90 bg-surface-muted/50 p-6">
            <div className="mb-4 flex h-10 w-10 items-center justify-center rounded-xl bg-primary/10 text-primary">
              <Wallet className="h-5 w-5" />
            </div>
            <h3 className="font-semibold text-stone-900">Agent-assisted</h3>
            <p className="mt-3 font-display text-3xl font-semibold text-primary">
              10%
            </p>
            <p className="mt-1 text-sm text-stone-600">
              Total facilitation — 7% agent, 3% Onukpa.
            </p>
          </div>
        </div>

        <div className="mt-8 flex animate-on-scroll gap-4 rounded-2xl border border-stone-200/90 bg-surface-warm/60 p-5 md:p-6">
          <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-white shadow-sm ring-1 ring-stone-200/80">
            <Info className="h-5 w-5 text-primary" />
          </div>
          <p className="text-sm leading-relaxed text-stone-700">
            <span className="font-semibold text-stone-900">Why “per month”?</span>{" "}
            It’s the easiest way to compare options. Many landlords still ask for{" "}
            <span className="font-medium text-stone-900">1–2 years advance</span>
            — we unpack what that means in cash terms before you decide.
          </p>
        </div>
      </div>
    </section>
  );
};

export default PricingTransparency;
