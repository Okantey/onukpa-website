import { Users, Home, Clock } from "lucide-react";

const Stats = () => {
  const stats = [
    { icon: Users, number: "500+", label: "rental requests daily" },
    { icon: Home, number: "Thousands", label: "verified listings processed" },
    {
      icon: Users,
      number: "Hundreds",
      label: "active renters & agents weekly",
    },
    { icon: Clock, number: "Hours", label: "from request to viewing" },
  ];

  return (
    <section className="py-20 bg-slate-900 text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8 text-center">
          {stats.map((stat, index) => (
            <div key={index} className="md:animate-on-scroll">
              <stat.icon className="w-12 h-12 text-primary mx-auto mb-4" />
              <div className="md:text-3xl text-2xl font-bold mb-2">
                {stat.number}
              </div>
              <div className="md:text-base text-sm text-slate-300">
                {stat.label}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Stats;
