import { Truck, Sparkles, PaintRoller, Clock3 } from "lucide-react";
import SectionIntro from "../Layout/SectionIntro";
import { LANDING_IMAGES } from "../../constants/landingImages";

const AddOnServices = () => {
  const services = [
    {
      icon: Truck,
      title: "Moving vans",
      status: "On request",
      desc: "Vetted partners when you’re ready to move.",
      image: LANDING_IMAGES.addonMovingVan,
      imageAlt: "Moving van for relocation",
    },
    {
      icon: Sparkles,
      title: "Deep cleaning",
      status: "Rolling out",
      desc: "Hand over keys to a place that feels fresh.",
      image: LANDING_IMAGES.addonCleaning,
      imageAlt: "Professional home cleaning",
    },
    {
      icon: PaintRoller,
      title: "Electricians, Plumbers & Painters",
      status: "Rolling out",
      desc: "Small fixes so you settle in faster.",
      image: LANDING_IMAGES.addonElectricianPainter,
      imageAlt: "Electricians, Plumbers & Painters working on home repairs",
    },
  ];

  return (
    <section
      className="border-t border-stone-200/50 bg-surface-parchment py-20 md:py-24"
      id="add-on-services"
    >
      <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
        <SectionIntro
          eyebrow="After you move"
          title="Add-on services"
          subtitle="Optional help we’re wiring up for renters who already found a place through Onukpa — pricing shared clearly before you book."
        />

        <div className="grid gap-6 md:grid-cols-3">
          {services.map((service) => (
            <div
              key={service.title}
              className="animate-on-scroll flex flex-col overflow-hidden rounded-2xl border border-stone-200/90 bg-surface-muted/30 shadow-sm transition hover:shadow-md"
            >
              <div className="relative aspect-[16/9] overflow-hidden bg-stone-200">
                <img
                  src={service.image}
                  alt={service.imageAlt}
                  className="h-full w-full object-cover"
                  loading="lazy"
                  decoding="async"
                />
                <div
                  className="absolute inset-0 bg-gradient-to-t from-stone-900/35 to-transparent"
                  aria-hidden
                />
              </div>
              <div className="flex flex-1 flex-col p-6">
                <div className="mb-4 flex items-start justify-between gap-3">
                  <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-primary text-white shadow-sm">
                    <service.icon className="h-5 w-5" />
                  </div>
                  <span className="rounded-full border border-stone-200 bg-white px-2.5 py-1 text-[11px] font-medium text-stone-600">
                    {service.status}
                  </span>
                </div>
                <h3 className="font-display text-lg font-semibold text-stone-900">
                  {service.title}
                </h3>
                <p className="mt-2 flex items-center gap-1 text-xs font-medium uppercase tracking-wide text-stone-500">
                  <Clock3 className="h-3 w-3" />
                  Availability varies
                </p>
                <p className="mt-3 text-sm leading-relaxed text-stone-600">
                  {service.desc}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default AddOnServices;
