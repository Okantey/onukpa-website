import { MessageCircle, Shield, Bell, HeartHandshake, Send } from "lucide-react";
import handleWhatsAppClick from "../../utils/openWhatsapp";

const HowItWorks = () => {
  const steps = [
    {
      icon: MessageCircle,
      title: "Chat on WhatsApp",
      desc: "Say hello and tell Onukpa what you need in simple language.",
    },
    {
      icon: Shield,
      title: "Get Verified Options",
      desc: "We match you with verified rooms, apartments, hostels or offices.",
    },
    {
      icon: HeartHandshake,
      title: "Show Interest",
      desc: "Tap \"I'm interested\" on options you like. No viewing fees.",
    },
    {
      icon: Send,
      title: "Get Connected",
      desc: "We connect you to landlords or trusted agents directly.",
    },
    {
      icon: Bell,
      title: "Save & Get Alerts",
      desc: "Save your search and receive new matches on WhatsApp.",
    },
  ];

  return (
    <section className="py-20 bg-slate-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8" id="how-it-works">
        <div className="text-center mb-16 animate-on-scroll">
          <h2 className="md:text-3xl text-2xl font-bold text-slate-900 mb-4">
            How Onukpa Works
          </h2>
          <p className="md:text-lg text-base text-slate-600 max-w-2xl mx-auto">
            A calm, WhatsApp-first way to find a verified place in Accra.
          </p>
        </div>

        <div className="grid md:grid-cols-3 lg:grid-cols-5 gap-6">
          {steps.map((step, index) => (
            <div
              key={index}
              className="animate-on-scroll group text-center p-8 rounded-2xl bg-white hover:shadow-lg transition-all duration-300 border border-slate-200"
            >
              <div className="w-16 h-16 bg-primary rounded-2xl flex items-center justify-center mx-auto mb-6 group-hover:scale-105 transition-transform duration-300">
                <step.icon className="w-8 h-8 text-white" />
              </div>
              <div className="md:text-xl text-lg font-semibold text-slate-900 mb-2">
                {step.title}
              </div>
              <p className="text-base md:text-lg text-slate-600">{step.desc}</p>
            </div>
          ))}
        </div>

        <div className="text-center mt-12 animate-on-scroll">
          <button
            onClick={() => handleWhatsAppClick()}
            className="bg-primary text-white px-8 py-2 rounded-lg font-semibold text-base hover:bg-primary/90 transition-all duration-300 shadow-lg"
          >
            Start on WhatsApp
          </button>
        </div>
      </div>
    </section>
  );
};

export default HowItWorks;
