import handleWhatsAppClick, { openWhatsAppPrefilled } from "../../utils/openWhatsapp";
import { ONUKPA_WA_AGENT_ONBOARD } from "../../constants/whatsappContact";

const CTA = () => {
  return (
    <section className="py-20 bg-primary text-white">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <h2 className="md:text-3xl text-2xl font-bold mb-6">
          Ready to rent faster or get more clients?
        </h2>
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <button
            type="button"
            onClick={() => handleWhatsAppClick()}
            className="bg-white text-primary px-8 py-4 rounded-lg font-semibold text-base hover:bg-slate-100 transition-all duration-300 shadow-lg"
          >
            Find a Place Now
          </button>
          <button
            type="button"
            onClick={() => openWhatsAppPrefilled(ONUKPA_WA_AGENT_ONBOARD)}
            className="bg-transparent border-2 border-white text-white px-8 py-4 rounded-lg font-semibold text-base hover:bg-white/10 transition-all duration-300"
          >
            I&apos;m an agent — WhatsApp
          </button>
        </div>
      </div>
    </section>
  );
};

export default CTA;
