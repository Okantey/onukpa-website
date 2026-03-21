import { MessageCircle } from "lucide-react";
import Navigation from "../Layout/Navigation";
import Footer from "../Layout/Footer";
import WhatsAppFloatingButton from "../UI/WhatsappFloatingButton";
import {
  ONUKPA_WHATSAPP_WA_ME_ID,
  ONUKPA_WA_LANDLORD_ONBOARD,
} from "../../constants/whatsappContact";

const RegisterLandlordPage = () => {
  const whatsappHref = `https://wa.me/${ONUKPA_WHATSAPP_WA_ME_ID}?text=${encodeURIComponent(
    ONUKPA_WA_LANDLORD_ONBOARD
  )}`;

  return (
    <div className="min-h-screen bg-white">
      <WhatsAppFloatingButton />
      <Navigation />
      <main className="pb-16 px-4 sm:px-6 lg:px-8 pt-6">
        <div className="max-w-4xl mx-auto">
          <div className="mb-8 text-center">
            <div className="inline-flex items-center px-4 py-2 rounded-full bg-primary/10 border border-primary/20 text-primary text-xs md:text-sm font-medium mb-3">
              For landlords
            </div>
            <h1 className="text-2xl md:text-3xl font-bold text-slate-900 mb-3">
              List properties on Onukpa
            </h1>
            <p className="text-base md:text-lg text-slate-600 max-w-2xl mx-auto">
              Landlord onboarding runs on WhatsApp. When your profile is ready, we send a secure
              link to your <strong>supplier portal</strong> — view submissions and add listings
              in the browser.
            </p>
          </div>

          <div className="bg-white border border-slate-200 rounded-2xl shadow-sm p-6 md:p-8 space-y-6">
            <ol className="list-decimal list-inside space-y-3 text-slate-700 text-sm md:text-base">
              <li>Open WhatsApp and message the Onukpa bot.</li>
              <li>
                Say you are a landlord (e.g. reply <span className="font-medium">landlord</span>{" "}
                when prompted, or follow the menu).
              </li>
              <li>
                Complete name and role in chat — we send you a link; add Ghana Card on the
                portal when you are ready.
              </li>
              <li>
                Open the <span className="font-medium">supplier portal</span> link we send you to
                add properties and track review status.
              </li>
            </ol>

            <a
              href={whatsappHref}
              target="_blank"
              rel="noopener noreferrer"
              className="w-full inline-flex items-center justify-center gap-2 px-4 py-3 rounded-lg bg-[#25D366] text-white text-sm md:text-base font-semibold shadow-lg hover:opacity-95 transition-opacity"
            >
              <MessageCircle className="w-5 h-5" />
              Start on WhatsApp
            </a>

            <p className="text-xs text-slate-500 text-center">
              Web registration without WhatsApp is not available yet — the bot ties your phone to
              your supplier profile securely.
            </p>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default RegisterLandlordPage;
