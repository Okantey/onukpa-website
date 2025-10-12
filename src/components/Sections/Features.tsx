import { CheckCircle, Bell, Zap, BarChart3 } from "lucide-react";

const Features = () => {
  const features = [
    {
      icon: CheckCircle,
      title: "Verified Listings",
      desc: "All properties are thoroughly verified for your safety",
    },
    {
      icon: Bell,
      title: "Smart Alerts & Tracking",
      desc: "Get instant notifications for new matches",
    },
    {
      icon: Zap,
      title: "Urgency Prioritization",
      desc: "Urgent requests get faster responses",
    },
    {
      icon: BarChart3,
      title: "Insights Feed",
      desc: "Market trends and pricing insights",
    },
  ];

  return (
    <section id="features" className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16 animate-on-scroll">
          <h2 className="md:text-3xl text-2xl font-bold text-slate-900 mb-4">
            Key Features
          </h2>
          <p className="md:text-lg text-base text-slate-600">
            Everything you need for a seamless rental experience
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-6">
          {features.map((feature, index) => (
            <div
              key={index}
              className="animate-on-scroll group bg-white border border-slate-200 rounded-xl p-6 hover:border-primary transition-all duration-300 hover:shadow-lg"
            >
              <div className="flex items-start space-x-4">
                <div className="w-12 h-12 bg-primary rounded-xl flex items-center justify-center group-hover:scale-105 transition-transform duration-300 flex-shrink-0">
                  <feature.icon className="w-6 h-6 text-white" />
                </div>
                <div>
                  <h3 className="md:text-xl text-lg font-semibold text-slate-900 mb-2">
                    {feature.title}
                  </h3>
                  <p className="md:text-base text-sm text-slate-600">
                    {feature.desc}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Features;
