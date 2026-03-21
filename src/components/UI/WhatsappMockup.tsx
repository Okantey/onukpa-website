import { Send } from "lucide-react";
import favicon from "../../assets/favicon.png";

/**
 * Conversation mirrors renter flow copy from `onukpa-bot`:
 * `messageHandlers.greetingMessage` (menu 1–5) + `handlers/flows.ts`
 * (apartment type prompt, listing template ~line 290).
 */
const WhatsAppMockup = () => {
  return (
    <div className="relative mx-auto w-full max-w-md animate-on-scroll lg:mx-0 lg:max-w-none">
      <div
        className="absolute -inset-4 -z-10 rounded-[2rem] bg-stone-200/50 blur-2xl"
        aria-hidden
      />

      <div className="overflow-hidden rounded-[1.25rem] border border-stone-200/80 bg-white shadow-[0_24px_60px_-12px_rgba(15,23,42,0.12)]">
        <div className="flex items-center gap-3 bg-[#075E54] px-4 py-3">
          <img
            src={favicon}
            alt=""
            className="h-10 w-10 rounded-full border border-white/30 bg-white object-cover"
          />
          <div className="min-w-0 flex-1">
            <p className="truncate text-sm font-medium text-white">Onukpa</p>
            <p className="text-xs text-emerald-100/90">online</p>
          </div>
          <span className="tabular-nums text-xs text-white/70">09:41</span>
        </div>

        <div
          className="min-h-[300px] space-y-3 bg-[#ECE5DD] px-3 py-5 md:min-h-[340px]"
          style={{
            backgroundImage:
              "url(\"data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23c8c4bc' fill-opacity='0.25'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E\")",
          }}
        >
          <p className="text-center text-[11px] font-medium text-stone-500">
            Today
          </p>

          {/* You: menu choice “Find an Apartment” = 2 */}
          <div className="flex justify-end">
            <div className="max-w-[88%] rounded-2xl rounded-tr-md border border-emerald-900/5 bg-[#DCF8C6] px-3.5 py-2.5 shadow-sm">
              <p className="text-[13px] leading-snug text-stone-800">2</p>
              <p className="mt-1 text-right text-[10px] tabular-nums text-emerald-800/50">
                09:41 ✓✓
              </p>
            </div>
          </div>

          {/* Bot: apartment type (flows.ts select_type Apartments) */}
          <div className="flex justify-start">
            <div className="max-w-[88%] rounded-2xl rounded-tl-md bg-white px-3.5 py-2.5 shadow-sm">
              <p className="whitespace-pre-line text-[13px] leading-snug text-stone-800">
                {`What type of apartment?
1️⃣ 1-Bedroom
2️⃣ 2-Bedroom
3️⃣ 3-Bedroom or more`}
              </p>
              <p className="mt-1 text-right text-[10px] tabular-nums text-stone-400">
                09:41
              </p>
            </div>
          </div>

          {/* You: 2-bedroom */}
          <div className="flex justify-end">
            <div className="max-w-[88%] rounded-2xl rounded-tr-md border border-emerald-900/5 bg-[#DCF8C6] px-3.5 py-2.5 shadow-sm">
              <p className="text-[13px] leading-snug text-stone-800">2</p>
              <p className="mt-1 text-right text-[10px] tabular-nums text-emerald-800/50">
                09:42 ✓✓
              </p>
            </div>
          </div>

          {/* Bot: match intro + listing line (executeRenterSearch send + property template) */}
          <div className="flex justify-start">
            <div className="max-w-[92%] rounded-2xl rounded-tl-md bg-white px-3.5 py-2.5 shadow-sm">
              <p className="whitespace-pre-line text-[13px] leading-snug text-stone-800">
                {`Good news 🎉

We found 2 option(s) from our *direct landlord* listings.

Open each link. If you tap *I am interested* on the page, we notify the listing provider for that property.

🏠 *2BR apartment — East Legon*
📍 East Legon
💰 ~GHS 2,200/mo (estimate)
📝 Gated compound…

🔗 onukpa.com/properties/…`}
              </p>
              <p className="mt-1 text-right text-[10px] tabular-nums text-stone-400">
                09:42
              </p>
            </div>
          </div>
        </div>

        <div className="flex items-center gap-2 border-t border-stone-200 bg-stone-50 px-3 py-2">
          <div className="flex-1 rounded-full border border-stone-200 bg-white px-4 py-2 text-xs text-stone-400">
            Message
          </div>
          <div
            className="flex h-9 w-9 items-center justify-center rounded-full bg-primary text-white"
            aria-hidden
          >
            <Send className="h-4 w-4" strokeWidth={2.25} />
          </div>
        </div>
      </div>

      <p className="mt-4 text-center text-xs text-stone-500">
        Same menu and templates as the live Onukpa bot on WhatsApp.
      </p>
    </div>
  );
};

export default WhatsAppMockup;
