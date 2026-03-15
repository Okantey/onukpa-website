import { HandCoins, Info, Wallet, ShieldCheck } from "lucide-react";

const PricingTransparency = () => {
  return (
    <section className="py-20 bg-white" id="pricing">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-10 animate-on-scroll">
          <h2 className="md:text-3xl text-2xl font-bold text-slate-900 mb-4">
            Pricing Transparency
          </h2>
          <p className="md:text-lg text-base text-slate-600 max-w-2xl mx-auto">
            No viewing fees. Clear service fees only when a rental is successfully completed.
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-6 mb-8">
          <div className="animate-on-scroll bg-slate-50 rounded-2xl border border-slate-200 p-6">
            <div className="w-10 h-10 rounded-xl bg-primary/10 flex items-center justify-center mb-4">
              <ShieldCheck className="w-5 h-5 text-primary" />
            </div>
            <h3 className="font-semibold text-slate-900 mb-2">No Viewing Fees</h3>
            <p className="text-base text-slate-600">
              You do not pay Onukpa to book or attend property viewings. We protect renters from unnecessary viewing charges.
            </p>
          </div>

          <div className="animate-on-scroll bg-slate-50 rounded-2xl border border-slate-200 p-6">
            <div className="w-10 h-10 rounded-xl bg-primary/10 flex items-center justify-center mb-4">
              <HandCoins className="w-5 h-5 text-primary" />
            </div>
            <h3 className="font-semibold text-slate-900 mb-2">
              Landlord-direct rentals
            </h3>
            <p className="text-sm md:text-base text-slate-600 mb-1">
              When you rent directly from a landlord through Onukpa:
            </p>
            <p className="text-sm md:text-base text-slate-800 font-semibold">
              • 5% Onukpa service fee on the successful rental value.
            </p>
          </div>

          <div className="animate-on-scroll bg-slate-50 rounded-2xl border border-slate-200 p-6">
            <div className="w-10 h-10 rounded-xl bg-primary/10 flex items-center justify-center mb-4">
              <Wallet className="w-5 h-5 text-primary" />
            </div>
            <h3 className="font-semibold text-slate-900 mb-2">
              Agent-assisted rentals
            </h3>
            <p className="text-sm md:text-base text-slate-600 mb-1">
              When a verified agent helps complete your rental:
            </p>
            <p className="text-sm md:text-base text-slate-800 font-semibold">
              • 10% total facilitation fee
            </p>
            <p className="text-xs text-slate-600 mt-1">
              (7% to the agent, 3% to Onukpa)
            </p>
          </div>
        </div>

        <div className="animate-on-scroll flex flex-col md:flex-row items-start md:items-center gap-4 bg-slate-50 border border-slate-200 rounded-2xl px-4 md:px-6 py-4">
          <div className="w-9 h-9 rounded-xl bg-primary/10 flex items-center justify-center flex-shrink-0">
            <Info className="w-5 h-5 text-primary" />
          </div>
          <div className="text-sm md:text-base text-slate-700">
            <p className="mb-1">
              Prices on Onukpa are shown as{" "}
              <span className="font-semibold">monthly estimates</span> so you can easily
              compare options – even though many landlords in Accra still request{" "}
              <span className="font-semibold">1–2 years advance</span>.
            </p>
            <p>
              We always explain the real payment structure clearly before you decide.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default PricingTransparency;

