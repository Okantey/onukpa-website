import { Home, Building, GraduationCap, Store } from "lucide-react";

const Properties = () => {
  const properties = [
    {
      icon: Home,
      label: "Rooms",
      emoji: "🏠",
    },
    {
      icon: Building,
      label: "Apartments",
      emoji: "🏢",
    },
    {
      icon: GraduationCap,
      label: "Campus Hostels",
      emoji: "🎓",
    },
    {
      icon: Store,
      label: "Stores & Offices",
      emoji: "🛍️",
    },
  ];

  return (
    <section id="properties" className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16 md:animate-on-scroll">
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
              className="md:animate-on-scroll group bg-white rounded-xl p-6 text-center border border-slate-200 hover:border-primary transition-all duration-300 hover:shadow-lg"
            >
              <div className="w-14 h-14 bg-primary rounded-xl flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform duration-300">
                <property.icon className="w-6 h-6 text-white" />
              </div>
              <div className="text-2xl mb-2">{property.emoji}</div>
              <div className="text-lg font-semibold text-slate-900">
                {property.label}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Properties;
