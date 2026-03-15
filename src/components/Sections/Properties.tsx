import { Home, Building, GraduationCap, Store } from "lucide-react";

const Properties = () => {
  const properties = [
    {
      icon: Home,
      label: "Rooms",
      emoji: "🏠",
      desc: "Single rooms, chambers & halls and self-contained spaces for students and workers.",
    },
    {
      icon: Building,
      label: "Apartments",
      emoji: "🏢",
      desc: "1–3 bedroom apartments, gated compounds and shared apartments across Accra.",
    },
    {
      icon: GraduationCap,
      label: "Campus Hostels",
      emoji: "🎓",
      desc: "UG, UPSA and other campus hostels with clear bed counts and amenities.",
    },
    {
      icon: Store,
      label: "Stores & Offices",
      emoji: "🛍️",
      desc: "Shops, container spaces and office units in busy commercial areas.",
    },
  ];

  return (
    <section id="properties" className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16 animate-on-scroll">
          <h2 className="text-3xl font-bold text-slate-900 mb-4">
            What You Can Find
          </h2>
          <p className="text-lg text-slate-600">
            Discover the perfect space for your needs
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
          {properties.map((property, index) => (
            <div
              key={index}
              className="animate-on-scroll group bg-white rounded-xl p-6 text-center border border-slate-200 hover:border-primary transition-all duration-300 hover:shadow-lg"
            >
              <div className="w-14 h-14 bg-primary rounded-xl flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform duration-300">
                <property.icon className="w-6 h-6 text-white" />
              </div>
              <div className="text-2xl mb-2">{property.emoji}</div>
              <div className="text-lg font-semibold text-slate-900">
                {property.label}
              </div>
              <p className="mt-2 text-base md:text-lg text-slate-600">
                {property.desc}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Properties;
