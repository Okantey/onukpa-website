import { Briefcase, CheckCircle2, MessageCircle } from "lucide-react";
import { ONUKPA_WA_AGENT_ONBOARD } from "../../constants/whatsappContact";
import { openWhatsAppPrefilled } from "../../utils/openWhatsapp";
import { LANDING_IMAGES } from "../../constants/landingImages";

const ForAgents = () => {
  const points = [
    "Onboard and list through WhatsApp — no long web forms.",
    "Receive structured renter requests when your stock fits.",
    "Same secure portal link for photos and review status.",
    "Verification and fees follow our published rules.",
  ];

  return (
    <section
      className="border-t border-stone-200/50 bg-white py-20 md:py-24"
      id="for-agents"
    >
      <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
        <div className="grid items-center gap-12 lg:grid-cols-2 lg:gap-16">
          <div className="order-2 animate-on-scroll lg:order-1">
            <div className="overflow-hidden rounded-2xl border border-stone-200/90 bg-white shadow-md">
              <div className="relative aspect-[5/4] overflow-hidden bg-stone-200">
                <img
                  src={LANDING_IMAGES.nelson}
                  alt="Onukpa team member supporting agents and landlords"
                  className="h-full w-full object-cover object-top"
                  loading="lazy"
                  decoding="async"
                />
              </div>
              <div className="p-6 md:p-8">
                <div className="flex items-center gap-3">
                  <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-primary/10">
                    <Briefcase className="h-5 w-5 text-primary" />
                  </div>
                  <div>
                    <p className="text-xs font-semibold uppercase tracking-wide text-stone-500">
                      Agents
                    </p>
                    <p className="font-medium text-stone-900">
                      Leads that arrive with context
                    </p>
                  </div>
                </div>
                <p className="mt-4 text-sm leading-relaxed text-stone-600">
                  The site is for discovery. Accounts, listings, and audit trail
                  stay in the bot and your magic link — aligned with how renters
                  use Onukpa.
                </p>
              </div>
            </div>
          </div>

          <div className="order-1 animate-on-scroll lg:order-2">
            <p className="text-xs font-semibold uppercase tracking-[0.14em] text-primary mb-3">
              Agents
            </p>
            <h2 className="font-display text-3xl md:text-4xl font-semibold tracking-tight text-stone-900">
              Onboard where your clients already are
            </h2>
            <p className="mt-4 text-base leading-relaxed text-stone-600">
              We’ve moved agent sign-up to WhatsApp. Message the bot, choose the
              agent path, and complete your profile in chat.
            </p>

            <ul className="mt-8 space-y-3">
              {points.map((text) => (
                <li key={text} className="flex gap-3 text-sm text-stone-700">
                  <CheckCircle2 className="mt-0.5 h-5 w-5 shrink-0 text-primary" />
                  {text}
                </li>
              ))}
            </ul>

            <button
              type="button"
              onClick={() => openWhatsAppPrefilled(ONUKPA_WA_AGENT_ONBOARD)}
              className="mt-8 inline-flex w-full items-center justify-center gap-2 rounded-xl bg-[#25D366] px-6 py-3.5 text-sm font-semibold text-white shadow-sm transition hover:opacity-95 sm:w-auto"
            >
              <MessageCircle className="h-4 w-4" />
              Start agent onboarding
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ForAgents;
