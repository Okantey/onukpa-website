import { MessageCircle, PhoneCall, Copy, Check } from "lucide-react";
import { useState } from "react";
import handleWhatsAppClick from "../../utils/openWhatsapp";

const PHONE_DISPLAY = "+233 24 509 5569";
const PHONE_TEL = "+233245095569";

const SaveOurNumber = () => {
  const [copied, setCopied] = useState(false);

  const copyNumber = async () => {
    try {
      await navigator.clipboard.writeText(PHONE_TEL);
      setCopied(true);
      window.setTimeout(() => setCopied(false), 2000);
    } catch {
      /* clipboard may be unavailable */
    }
  };

  return (
    <section
      className="relative overflow-hidden border-t border-stone-800 bg-stone-950 py-20 text-stone-100 md:py-28"
      id="save-number"
    >
      <div
        className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_70%_50%_at_70%_100%,rgba(65,179,68,0.15),transparent)]"
        aria-hidden
      />

      <div className="relative mx-auto max-w-3xl px-4 text-center sm:px-6 lg:px-8">
        <div className="animate-on-scroll inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-3 py-1.5 text-xs font-medium text-emerald-200/90">
          <MessageCircle className="h-3.5 w-3.5" aria-hidden />
          Save us like a contact you actually use
        </div>

        <h2 className="font-display mt-6 text-3xl font-semibold tracking-tight text-white md:text-4xl">
          WhatsApp is your front door to new listings
        </h2>
        <p className="mx-auto mt-4 max-w-xl text-base leading-relaxed text-stone-400">
          Save Onukpa for daily Status updates, sharp pricing context, and early
          nudges when something fits your budget — before it gets noisy in the
          groups.
        </p>

        <div className="mx-auto mt-10 max-w-md rounded-2xl border border-white/10 bg-white/5 p-1 shadow-2xl backdrop-blur-sm">
          <div className="rounded-xl bg-stone-900/80 px-5 py-6">
            <p className="text-[11px] font-semibold uppercase tracking-[0.16em] text-stone-500">
              Onukpa on WhatsApp
            </p>
            <p className="mt-2 font-display text-2xl font-semibold tracking-tight text-white">
              {PHONE_DISPLAY}
            </p>
            <div className="mt-6 flex flex-col gap-2 sm:flex-row sm:justify-center">
              <button
                type="button"
                onClick={() => handleWhatsAppClick()}
                className="inline-flex flex-1 items-center justify-center gap-2 rounded-xl bg-primary px-5 py-3 text-sm font-semibold text-white transition hover:bg-[#3aa33d] sm:flex-none"
              >
                <MessageCircle className="h-4 w-4" />
                Open chat
              </button>
              <a
                href={`tel:${PHONE_TEL}`}
                className="inline-flex flex-1 items-center justify-center gap-2 rounded-xl border border-white/15 px-5 py-3 text-sm font-semibold text-white transition hover:bg-white/5 sm:flex-none"
              >
                <PhoneCall className="h-4 w-4" />
                Call
              </a>
              <button
                type="button"
                onClick={copyNumber}
                className="inline-flex flex-1 items-center justify-center gap-2 rounded-xl border border-white/15 px-5 py-3 text-sm font-semibold text-white transition hover:bg-white/5 sm:flex-none"
              >
                {copied ? (
                  <Check className="h-4 w-4 text-emerald-400" />
                ) : (
                  <Copy className="h-4 w-4" />
                )}
                {copied ? "Copied" : "Copy"}
              </button>
            </div>
          </div>
        </div>

        <ul className="mx-auto mt-10 max-w-lg space-y-3 text-left text-sm text-stone-400">
          <li className="flex gap-3">
            <span className="mt-2 h-1 w-1 shrink-0 rounded-full bg-primary" />
            New rooms and apartments surface on Status first.
          </li>
          <li className="flex gap-3">
            <span className="mt-2 h-1 w-1 shrink-0 rounded-full bg-primary" />
            We’ll flag matches that actually fit what you told us.
          </li>
          <li className="flex gap-3">
            <span className="mt-2 h-1 w-1 shrink-0 rounded-full bg-primary" />
            Honest context on what “GHS X / month” means in Accra.
          </li>
        </ul>
      </div>
    </section>
  );
};

export default SaveOurNumber;
