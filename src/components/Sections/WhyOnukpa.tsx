import {
  ShieldCheck,
  MessageCircle,
  Users,
  Clock3,
  MapPin,
  HandCoins,
  Bell,
  BarChart3,
} from "lucide-react";
import SectionIntro from "../Layout/SectionIntro";
import handleWhatsAppClick from "../../utils/openWhatsapp";

const WhyOnukpa = () => {
  const reasons = [
    {
      icon: ShieldCheck,
      title: "No viewing fees",
      desc: "We don’t charge you to “just go and see.”",
    },
    {
      icon: HandCoins,
      title: "Fees only on success",
      desc: "5% landlord-direct · 10% when an agent closes the deal — explained upfront.",
    },
    {
      icon: Users,
      title: "Landlord-first, then agents",
      desc: "We prioritise owners; verified agents step in when it speeds things up.",
    },
    {
      icon: MessageCircle,
      title: "Stays on WhatsApp",
      desc: "Requirements, shortlists, and updates — where you already live on your phone.",
    },
    {
      icon: MapPin,
      title: "Deep Accra focus",
      desc: "Areas, pricing norms, and advance structures we see every day.",
    },
    {
      icon: Clock3,
      title: "Less back-and-forth",
      desc: "Structured questions so you’re not repeating yourself to ten people.",
    },
  ];

  const platformNotes = [
    { icon: ShieldCheck, label: "Verified listings" },
    { icon: Bell, label: "Match alerts" },
    { icon: BarChart3, label: "Clear monthly estimates" },
    { icon: MessageCircle, label: "Urgent requests prioritised" },
  ];

  return (
    <section
      className="border-t border-stone-200/50 bg-white py-20 md:py-24"
      id="why-onukpa"
    >
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <SectionIntro
          eyebrow="Why Onukpa"
          title="Built for how Accra actually rents"
          subtitle="Straight talk, verified inventory, and a fee model that only wins when you do."
        />

        <div className="mb-10 flex flex-wrap justify-center gap-2 md:gap-3 animate-on-scroll">
          {platformNotes.map((item) => (
            <span
              key={item.label}
              className="inline-flex items-center gap-2 rounded-full border border-stone-200 bg-surface-muted/80 px-3 py-1.5 text-xs font-medium text-stone-700"
            >
              <item.icon className="h-3.5 w-3.5 text-primary" />
              {item.label}
            </span>
          ))}
        </div>

        <div className="grid gap-5 md:grid-cols-2 lg:grid-cols-3">
          {reasons.map((item) => (
            <div
              key={item.title}
              className="animate-on-scroll rounded-2xl border border-stone-200/90 bg-surface-warm/40 p-6 transition hover:border-stone-300 hover:bg-white hover:shadow-sm"
            >
              <div className="flex gap-4">
                <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-primary text-white shadow-sm">
                  <item.icon className="h-5 w-5" strokeWidth={2} />
                </div>
                <div>
                  <h3 className="font-semibold text-stone-900">{item.title}</h3>
                  <p className="mt-2 text-sm leading-relaxed text-stone-600">
                    {item.desc}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>

        <div className="mt-12 text-center animate-on-scroll">
          <button
            type="button"
            onClick={() => handleWhatsAppClick()}
            className="inline-flex items-center gap-2 rounded-xl bg-primary px-6 py-3 text-sm font-semibold text-white shadow-sm transition hover:bg-[#3aa33d]"
          >
            <MessageCircle className="h-4 w-4" />
            Chat with Onukpa
          </button>
        </div>
      </div>
    </section>
  );
};

export default WhyOnukpa;
