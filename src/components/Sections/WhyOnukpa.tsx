import { ShieldCheck, MessageCircle, Users, Clock3, MapPin, HandCoins } from "lucide-react";

const WhyOnukpa = () => {
  const reasons = [
    {
      icon: ShieldCheck,
      title: "No viewing fees",
      desc: "You never pay to just view a property. Onukpa protects renters from unnecessary viewing charges.",
    },
    {
      icon: HandCoins,
      title: "Transparent fees",
      desc: "Clear 5% service fee on landlord-direct deals and 10% on agent-assisted rentals. Only when a deal is confirmed.",
    },
    {
      icon: Users,
      title: "Landlord-first search",
      desc: "We start with direct landlords, then trusted agents as a fallback when it helps you find a place faster.",
    },
    {
      icon: MessageCircle,
      title: "WhatsApp convenience",
      desc: "Everything happens inside WhatsApp – from your first message to the final confirmation.",
    },
    {
      icon: MapPin,
      title: "Verified Accra areas",
      desc: "We focus deeply on Accra, with verified properties in the areas renters actually want.",
    },
    {
      icon: Clock3,
      title: "Faster, safer house hunting",
      desc: "Structured questions, verified suppliers and smart matching mean less stress and wasted time.",
    },
  ];

  return (
    <section className="py-20 bg-white" id="why-onukpa">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16 animate-on-scroll">
          <h2 className="md:text-3xl text-2xl font-bold text-slate-900 mb-4">
            Why Choose Onukpa
          </h2>
          <p className="md:text-lg text-base text-slate-600 max-w-2xl mx-auto">
            A calm, transparent way to find a place in Accra – built around how people already use WhatsApp.
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {reasons.map((item, index) => (
            <div
              key={index}
              className="animate-on-scroll group bg-white border border-slate-200 rounded-2xl p-6 hover:border-primary transition-all duration-300 hover:shadow-lg"
            >
              <div className="flex items-start space-x-4">
                <div className="w-12 h-12 bg-primary rounded-xl flex items-center justify-center flex-shrink-0 group-hover:scale-105 transition-transform duration-300">
                  <item.icon className="w-6 h-6 text-white" />
                </div>
                <div>
                  <h3 className="md:text-lg text-base font-semibold text-slate-900 mb-2">
                    {item.title}
                  </h3>
                  <p className="md:text-sm text-xs text-slate-600">
                    {item.desc}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default WhyOnukpa;

