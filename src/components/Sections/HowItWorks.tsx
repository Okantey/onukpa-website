import {
  MessageCircle,
  Shield,
  HeartHandshake,
  Send,
  Bell,
} from "lucide-react";
import handleWhatsAppClick from "../../utils/openWhatsapp";
import SectionIntro from "../Layout/SectionIntro";
import { LANDING_IMAGES } from "../../constants/landingImages";

const HowItWorks = () => {
  const steps = [
    {
      icon: MessageCircle,
      title: "Message us",
      desc: "Say what you need — area, budget, move-in date.",
    },
    {
      icon: Shield,
      title: "Verified options",
      desc: "We shortlist real listings that fit, not random links.",
    },
    {
      icon: HeartHandshake,
      title: "Show interest",
      desc: 'Tap “interested” on what you like. No viewing fees.',
    },
    {
      icon: Send,
      title: "Get connected",
      desc: "We introduce you to the landlord or a trusted agent.",
    },
    {
      icon: Bell,
      title: "Stay in the loop",
      desc: "Save your search; we ping you when new matches land.",
    },
  ];

  return (
    <section
      className="border-t border-stone-200/60 bg-white py-20 md:py-24"
      id="how-it-works"
    >
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <SectionIntro
          eyebrow="The flow"
          title="How Onukpa works"
          subtitle="One conversation on WhatsApp — structured, calm, and built around how Accra actually rents."
        />

        <div className="animate-on-scroll mb-10 overflow-hidden rounded-3xl shadow-sm ring-1 ring-stone-200/80 md:mb-12">
          <img
            src={LANDING_IMAGES.campus}
            alt="Students and young renters near Accra campuses"
            className="h-44 w-full object-cover object-center md:h-52"
            loading="lazy"
            decoding="async"
          />
        </div>

        <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-5">
          {steps.map((step, index) => (
            <div
              key={step.title}
              className="group relative animate-on-scroll flex flex-col rounded-2xl border border-stone-200/90 bg-surface-muted/50 p-6 transition hover:border-stone-300 hover:bg-white hover:shadow-md"
            >
              <span className="mb-4 font-display text-2xl font-medium text-stone-200 transition group-hover:text-primary/40">
                {String(index + 1).padStart(2, "0")}
              </span>
              <div className="mb-4 flex h-11 w-11 items-center justify-center rounded-xl bg-primary text-white shadow-sm">
                <step.icon className="h-5 w-5" strokeWidth={2} />
              </div>
              <h3 className="font-semibold text-stone-900">{step.title}</h3>
              <p className="mt-2 text-sm leading-relaxed text-stone-600">
                {step.desc}
              </p>
            </div>
          ))}
        </div>

        <div className="mt-12 flex flex-col items-center gap-4 sm:flex-row sm:justify-center animate-on-scroll">
          <button
            type="button"
            onClick={() => handleWhatsAppClick()}
            className="inline-flex w-full items-center justify-center gap-2 rounded-xl bg-primary px-8 py-3 text-sm font-semibold text-white shadow-sm transition hover:bg-[#3aa33d] sm:w-auto"
          >
            <MessageCircle className="h-4 w-4" />
            Start on WhatsApp
          </button>
          <a
            href="#properties"
            className="text-sm font-medium text-stone-600 underline decoration-stone-300 underline-offset-4 hover:text-stone-900"
          >
            See what you can find
          </a>
        </div>
      </div>
    </section>
  );
};

export default HowItWorks;
