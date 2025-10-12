import { MessageCircle, Shield, Bell } from "lucide-react";
import handleWhatsAppClick from "../../utils/openWhatsapp";

const HowItWorks = () => {
  const steps = [
    {
      icon: MessageCircle,
      title: "Chat on WhatsApp",
      desc: "Tell Onukpa what you need",
    },
    {
      icon: Shield,
      title: "Get Verified Options",
      desc: "Compare trusted listings",
    },
    {
      icon: Bell,
      title: "Save & Get Alerts",
      desc: "Be notified instantly when matches appear",
    },
  ];

  return (
    <section className="py-20 bg-slate-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16 md:animate-on-scroll">
          <h2 className="md:text-3xl text-2xl font-bold text-slate-900 mb-4">
            How Onukpa Works
          </h2>
          <p className="md:text-lg text-base text-slate-600 max-w-2xl mx-auto">
            Find your perfect place in just 3 simple steps
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-8">
          {steps.map((step, index) => (
            <div
              key={index}
              className="md:animate-on-scroll group text-center p-8 rounded-2xl bg-white hover:shadow-lg transition-all duration-300 border border-slate-200"
            >
              <div className="w-16 h-16 bg-primary rounded-2xl flex items-center justify-center mx-auto mb-6 group-hover:scale-105 transition-transform duration-300">
                <step.icon className="w-8 h-8 text-white" />
              </div>
              <div className="md:text-xl text-lg font-semibold text-slate-900 mb-2">
                {step.title}
              </div>
              <p className="md:text-base text-sm text-slate-600">{step.desc}</p>
            </div>
          ))}
        </div>

        <div className="text-center mt-12 md:animate-on-scroll">
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
