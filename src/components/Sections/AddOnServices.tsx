import { Truck, Sparkles, PaintRoller, Clock3 } from "lucide-react";

const AddOnServices = () => {
  const services = [
    {
      icon: Truck,
      title: "Relocation Vans",
      status: "Available on request",
      desc: "Move your things with vetted moving partners after you find a place.",
      tag: "Rolling out gradually",
    },
    {
      icon: Sparkles,
      title: "Cleaning Services",
      status: "Coming soon",
      desc: "Book a trusted cleaning team to prepare your new room or apartment.",
      tag: "Add-On Service",
    },
    {
      icon: PaintRoller,
      title: "Electrician & Painter",
      status: "Coming soon",
      desc: "Get light fixes and simple painting handled without chasing artisans.",
      tag: "We listened to renters",
    },
  ];

  return (
    <section className="py-20 bg-slate-50" id="add-on-services">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-14 animate-on-scroll">
          <div className="inline-flex items-center px-4 py-2 rounded-full bg-primary/10 border border-primary/20 text-primary text-xs md:text-sm font-medium mb-3">
            Add-On Services
          </div>
          <h2 className="md:text-3xl text-2xl font-bold text-slate-900 mb-3">
            We also thought about moving in
          </h2>
          <p className="md:text-lg text-base text-slate-600 max-w-2xl mx-auto">
            After you find a place, Onukpa is building calm, optional services
            to make moving in less stressful.
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-6">
          {services.map((service) => (
            <div
              key={service.title}
              className="animate-on-scroll bg-white border border-slate-200 rounded-2xl p-6 hover:border-primary transition-all duration-300 hover:shadow-lg flex flex-col justify-between"
            >
              <div>
                <div className="flex items-center justify-between mb-4">
                  <div className="w-10 h-10 rounded-xl bg-primary/10 flex items-center justify-center">
                    <service.icon className="w-5 h-5 text-primary" />
                  </div>
                  <span className="inline-flex items-center px-2.5 py-1 rounded-full text-[11px] font-medium bg-slate-50 text-slate-700 border border-slate-200">
                    {service.tag}
                  </span>
                </div>
                <h3 className="font-semibold text-slate-900 mb-1">
                  {service.title}
                </h3>
                <p className="text-xs uppercase tracking-wide text-slate-500 mb-2 flex items-center space-x-1">
                  <Clock3 className="w-3 h-3" />
                  <span>{service.status}</span>
                </p>
                <p className="text-sm text-slate-600">{service.desc}</p>
              </div>
              <p className="mt-4 text-xs text-slate-500">
                These services are optional, designed to support renters after a
                successful match. Pricing and partners will be shared clearly
                before you decide.
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default AddOnServices;
