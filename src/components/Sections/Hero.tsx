import { ArrowRight, MessageCircle } from "lucide-react";
import WhatsAppMockup from "../UI/WhatsappMockup";
import handleWhatsAppClick from "../../utils/openWhatsapp";

const Hero = () => {
  return (
    <section className="pt-8 md:pt-16 pb-10 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          <div className="animate-on-scroll">
            <div className="inline-flex items-center px-4 py-2 rounded-full bg-primary/10 border border-primary/20 text-primary text-sm font-medium mb-6">
              <MessageCircle className="w-4 h-4 mr-2" />
              WhatsApp-first rentals for Accra
            </div>
            <h1
              className="text-4xl lg:text-5xl font-bold text-slate-900 mb-6 "
              style={{ lineHeight: "1.2" }}
            >
              Find verified rooms, apartments, hostels & offices in Accra
              <span className="text-primary"> without viewing fees</span>
            </h1>
            <p className="text-lg text-slate-600 mb-8 leading-relaxed">
              Onukpa connects you to landlords, agents and hostel managers
              directly on WhatsApp. No viewing fees, clear monthly estimates,
              and you only pay an Onukpa service fee when a rental is
              successfully completed.
            </p>
            <div className="flex flex-col sm:flex-row gap-4">
              <button
                onClick={() => handleWhatsAppClick()}
                className="group bg-primary text-white px-8 py-3 rounded-lg font-semibold text-lg hover:bg-primary/90 transition-all duration-300 flex items-center justify-center shadow-lg"
              >
                Find a Place
                <ArrowRight className="ml-2 w-5 h-5 group-hover:translate-x-1 transition-transform" />
              </button>
              <div className="flex flex-col sm:flex-row gap-3">
                <a
                  href="#landlords"
                  className="border-2 border-slate-300 text-slate-700 px-6 py-3 rounded-lg font-semibold text-sm md:text-base hover:border-slate-400 hover:text-slate-900 transition-all duration-300 text-center"
                >
                  List Property
                </a>
                <a
                  href="#for-agents"
                  className="border-2 border-slate-300 text-slate-700 px-6 py-3 rounded-lg font-semibold text-sm md:text-base hover:border-slate-400 hover:text-slate-900 transition-all duration-300 text-center"
                >
                  Join as Agent
                </a>
              </div>
            </div>
          </div>
          <WhatsAppMockup />
        </div>
      </div>
    </section>
  );
};

export default Hero;
