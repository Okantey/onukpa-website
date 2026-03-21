import { Briefcase, CheckCircle2, MessageCircle } from "lucide-react";
import { ONUKPA_WA_AGENT_ONBOARD } from "../../constants/whatsappContact";
import { openWhatsAppPrefilled } from "../../utils/openWhatsapp";

const ForAgents = () => {
  const points = [
    "Register and list properties entirely on WhatsApp — no web forms.",
    "Receive structured renter requests and interest signals when listings go live.",
    "Same secure portal link to add photos and track review status.",
    "Verification and fees follow Onukpa’s published rules.",
  ];

  return (
    <section
      className="py-20 bg-slate-50 border-y border-slate-200"
      id="for-agents"
    >
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid lg:grid-cols-2 gap-10 items-center">
          <div className="animate-on-scroll">
            <div className="inline-flex items-center px-4 py-2 rounded-full bg-primary/10 border border-primary/20 text-primary text-xs md:text-sm font-medium mb-4">
              For real estate agents
            </div>
            <h2 className="md:text-3xl text-2xl font-bold text-slate-900 mb-4">
              Onboard on WhatsApp — same as landlords
            </h2>
            <p className="text-slate-600 text-sm md:text-base mb-5">
              We no longer take agent sign-ups through the website. Message the
              Onukpa bot, choose the agent path, and complete your profile in
              chat. You’ll get a secure link to submit listings when you’re
              ready.
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

            <button
              type="button"
              onClick={() => openWhatsAppPrefilled(ONUKPA_WA_AGENT_ONBOARD)}
              className="inline-flex items-center justify-center px-6 py-3 rounded-lg bg-[#25D366] text-white text-sm font-semibold shadow-lg hover:opacity-95 transition-opacity"
            >
              <MessageCircle className="w-4 h-4 mr-2" />
              Start agent onboarding on WhatsApp
            </button>
          </div>

          <div className="animate-on-scroll">
            <div className="bg-white border border-slate-200 rounded-2xl p-6 md:p-8 shadow-sm">
              <div className="flex items-center mb-4 space-x-3">
                <div className="w-10 h-10 rounded-xl bg-primary/10 flex items-center justify-center">
                  <Briefcase className="w-5 h-5 text-primary" />
                </div>
                <div>
                  <p className="text-xs uppercase tracking-wide text-slate-500">
                    Agents
                  </p>
                  <p className="font-semibold text-slate-900 text-sm">
                    Leads • Listings • WhatsApp-first
                  </p>
                </div>
              </div>
              <p className="text-sm text-slate-700">
                The marketing site is for discovery only. All supplier accounts
                and property submissions run through the bot and your magic link
                — consistent, auditable, and aligned with how renters use
                Onukpa.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ForAgents;
