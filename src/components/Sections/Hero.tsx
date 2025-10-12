import { ArrowRight, MessageCircle } from "lucide-react";
import WhatsAppMockup from "../UI/WhatsappMockup";
import handleWhatsAppClick from "../../utils/openWhatsapp";

const Hero = () => {
  return (
    <section className="pt-8 md:pt-16 pb-10 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          <div className="md:animate-on-scroll">
            <div className="inline-flex items-center px-4 py-2 rounded-full bg-primary/10 border border-primary/20 text-primary text-sm font-medium mb-6">
              <MessageCircle className="w-4 h-4 mr-2" />
              Powered by WhatsApp
            </div>
            <h1
              className="text-4xl lg:text-5xl font-bold text-slate-900 mb-6 "
              style={{ lineHeight: "1.2" }}
            >
              Find Verified Rooms, Apartments, Hostels & Office Spaces in Accra
              —<span className="text-primary"> Instantly with Onukpa</span> 🏠
            </h1>
            <p className="text-lg text-slate-600 mb-8 leading-relaxed">
              Over 500+ rental requests processed daily. Onukpa connects renters
              with trusted agents, landlords, and hostel managers — all inside
              WhatsApp.
            </p>
            <div className="flex flex-col sm:flex-row gap-4">
              <button
                onClick={() => handleWhatsAppClick()}
                className="group bg-primary text-white px-8 py-3 rounded-lg font-semibold text-lg hover:bg-primary/90 transition-all duration-300 flex items-center justify-center shadow-lg"
              >
                Find a Place
                <ArrowRight className="ml-2 w-5 h-5 group-hover:translate-x-1 transition-transform" />
              </button>
              <button className="border-2 border-slate-300 text-slate-700 px-8 py-3 rounded-lg font-semibold text-lg hover:border-slate-400 transition-all duration-300">
                <a href="#agents">I'm an Agent</a>
              </button>
            </div>
          </div>
          <WhatsAppMockup />
        </div>
      </div>
    </section>
  );
};

export default Hero;
