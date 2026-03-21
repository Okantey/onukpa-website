import { Users, Home, Clock } from "lucide-react";

const Stats = () => {
  const stats = [
    {
      icon: Users,
      value: "500+",
      label: "rental conversations a day",
    },
    {
      icon: Home,
      value: "Thousands",
      label: "listings reviewed & matched",
    },
    {
      icon: Users,
      value: "Hundreds",
      label: "active renters & agents weekly",
    },
    {
      icon: Clock,
      value: "Same day",
      label: "typical first options (varies by search)",
    },
  ];

  return (
    <section className="border-y border-stone-800 bg-stone-950 py-16 text-white md:py-20">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <p className="mb-10 text-center text-xs font-semibold uppercase tracking-[0.16em] text-stone-400 animate-on-scroll">
          Signal, not hype
        </p>
        <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-4 lg:gap-6">
          {stats.map((stat) => (
            <div
              key={stat.label}
              className="animate-on-scroll rounded-2xl border border-white/10 bg-white/[0.07] p-6 text-center shadow-sm sm:text-left"
            >
              <stat.icon
                className="mx-auto mb-4 h-8 w-8 text-primary sm:mx-0"
                strokeWidth={1.75}
              />
              <p className="font-display text-2xl font-semibold tracking-tight text-white md:text-3xl">
                {stat.value}
              </p>
              <p className="mt-2 text-sm leading-snug text-stone-300">
                {stat.label}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Stats;
