import { MessageCircle, PhoneCall } from "lucide-react";
import handleWhatsAppClick from "../../utils/openWhatsapp";

const SaveOurNumber = () => {
  return (
    <section className="py-20 bg-slate-900 text-white" id="save-number">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="animate-on-scroll bg-gradient-to-br from-slate-900 to-slate-800 border border-slate-700/60 rounded-3xl p-8 md:p-10 shadow-xl relative overflow-hidden">
          <div className="absolute -right-24 -bottom-24 w-72 h-72 bg-primary/20 rounded-full blur-3xl opacity-60" />
          <div className="relative z-10">
            <div className="inline-flex items-center px-4 py-2 rounded-full bg-primary/15 border border-primary/30 text-primary text-xs md:text-sm font-medium mb-4">
              Stay close to the market
            </div>
            <h2 className="md:text-3xl text-2xl font-bold mb-4">
              Save our WhatsApp number for daily updates
            </h2>
            <p className="text-slate-200 text-base md:text-lg mb-6 max-w-2xl">
              Save Onukpa on your phone to see{" "}
              <span className="font-semibold">daily property updates on Status</span>, rental
              insights, and new verified listings – before they disappear.
            </p>

            <div className="bg-slate-800/70 border border-slate-700 rounded-2xl p-4 mb-6 flex flex-col md:flex-row md:items-center md:justify-between gap-3">
              <div>
                <p className="text-xs uppercase tracking-wide text-slate-400 mb-1">
                  Onukpa WhatsApp
                </p>
                <p className="font-semibold text-lg">+233 24 509 5569</p>
              </div>
              <div className="flex flex-col sm:flex-row gap-3">
                <button
                  onClick={() => handleWhatsAppClick()}
                  className="inline-flex items-center justify-center px-5 py-2.5 rounded-lg bg-primary text-white text-sm font-semibold shadow-lg hover:bg-primary/90 transition-all"
                >
                  <MessageCircle className="w-4 h-4 mr-2" />
                  Chat on WhatsApp
                </button>
                <a
                  href="tel:+233245095569"
                  className="inline-flex items-center justify-center px-5 py-2.5 rounded-lg border border-slate-600 text-slate-100 text-sm font-semibold hover:bg-slate-800 transition-all"
                >
                  <PhoneCall className="w-4 h-4 mr-2" />
                  Save Our Number
                </a>
              </div>
            </div>

            <ul className="grid md:grid-cols-3 gap-4 text-sm md:text-base text-slate-200">
              <li className="flex items-start space-x-2">
                <span className="mt-1 w-1.5 h-1.5 rounded-full bg-primary" />
                <span>See new rooms and apartments on Status every day.</span>
              </li>
              <li className="flex items-start space-x-2">
                <span className="mt-1 w-1.5 h-1.5 rounded-full bg-primary" />
                <span>Get early alerts when something matches your budget.</span>
              </li>
              <li className="flex items-start space-x-2">
                <span className="mt-1 w-1.5 h-1.5 rounded-full bg-primary" />
                <span>Stay informed about real rental prices in Accra.</span>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </section>
  );
};

export default SaveOurNumber;

