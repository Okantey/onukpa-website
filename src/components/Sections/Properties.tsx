import {
  Home,
  Building,
  GraduationCap,
  Store,
  MessageCircle,
} from "lucide-react";
import SectionIntro from "../Layout/SectionIntro";
import handleWhatsAppClick from "../../utils/openWhatsapp";
import { LANDING_IMAGES } from "../../constants/landingImages";

const Properties = () => {
  const properties = [
    {
      icon: Home,
      label: "Rooms",
      tagline: "Students & young professionals",
      desc: "Single rooms, chambers, self-contained — close to campus or work.",
      image: LANDING_IMAGES.room,
      imageAlt: "Furnished room interior in Accra",
    },
    {
      icon: Building,
      label: "Apartments",
      tagline: "1–3 bedrooms",
      desc: "Compounds, flats, and shared apartments across the city.",
      image: LANDING_IMAGES.apartment,
      imageAlt: "Apartment living space",
    },
    {
      icon: GraduationCap,
      label: "Hostels",
      tagline: "Near UG, UPSA & more",
      desc: "Beds and blocks with clear pricing and what’s included.",
      image: LANDING_IMAGES.hostel,
      imageAlt: "Student hostel accommodation",
    },
    {
      icon: Store,
      label: "Shops & offices",
      tagline: "Work-ready spaces",
      desc: "Retail fronts, containers, and small office units in busy corridors.",
      image: LANDING_IMAGES.retail,
      imageAlt: "Retail and commercial frontage",
    },
  ];

  return (
    <section
      id="properties"
      className="border-t border-stone-200/50 bg-surface-sage py-20 md:py-24"
    >
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <SectionIntro
          eyebrow="Inventory"
          title="What you can find"
          subtitle="Tell us what you need in chat — we’ll narrow to these categories so you don’t scroll forever."
        />

        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
          {properties.map((property) => (
            <article
              key={property.label}
              className="animate-on-scroll flex flex-col overflow-hidden rounded-2xl border border-stone-200/90 bg-white shadow-sm transition hover:shadow-md"
            >
              <div className="relative aspect-[5/3] overflow-hidden bg-stone-200">
                <img
                  src={property.image}
                  alt={property.imageAlt}
                  className="absolute inset-0 h-full w-full object-cover"
                  loading="lazy"
                  decoding="async"
                />
                <div
                  className="absolute inset-0 bg-gradient-to-t from-stone-900/55 via-stone-900/10 to-transparent"
                  aria-hidden
                />
                <div className="absolute bottom-4 left-4 flex h-12 w-12 items-center justify-center rounded-xl bg-white/95 shadow-md ring-1 ring-stone-200/80 backdrop-blur-sm">
                  <property.icon className="h-6 w-6 text-primary" strokeWidth={2} />
                </div>
              </div>
              <div className="flex flex-1 flex-col p-5">
                <h3 className="font-display text-xl font-semibold text-stone-900">
                  {property.label}
                </h3>
                <p className="mt-1 text-xs font-medium uppercase tracking-wide text-primary/90">
                  {property.tagline}
                </p>
                <p className="mt-3 text-sm leading-relaxed text-stone-600">
                  {property.desc}
                </p>
              </div>
            </article>
          ))}
        </div>

        <div className="mt-10 flex justify-center animate-on-scroll">
          <button
            type="button"
            onClick={() => handleWhatsAppClick()}
            className="inline-flex items-center gap-2 rounded-xl border border-stone-300 bg-white px-6 py-3 text-sm font-semibold text-stone-800 shadow-sm transition hover:border-primary hover:text-primary"
          >
            <MessageCircle className="h-4 w-4" />
            Ask for a match on WhatsApp
          </button>
        </div>
      </div>
    </section>
  );
};

export default Properties;
