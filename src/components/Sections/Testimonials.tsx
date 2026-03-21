import { useState } from "react";
import { Star, Quote, ChevronLeft, ChevronRight, MapPin } from "lucide-react";
import { openWhatsAppPrefilled } from "../../utils/openWhatsapp";
import {
  ONUKPA_WA_AGENT_ONBOARD,
  ONUKPA_WA_LANDLORD_ONBOARD,
  ONUKPA_WA_RENTER_DEFAULT,
} from "../../constants/whatsappContact";
import SectionIntro from "../Layout/SectionIntro";

const Testimonials = () => {
  const [activeCategory, setActiveCategory] = useState<
    "students" | "renters" | "landlords" | "agents"
  >("students");
  const [activeTestimonial, setActiveTestimonial] = useState(0);

  const testimonials = {
    students: [
      {
        id: 1,
        name: "Daisy",
        role: "Student",
        location: "Accra",
        image: "DA",
        rating: 5,
        content:
          "Quick replies on WhatsApp, low data, and I had a room in two days.",
        stats: "Matched in 2 days",
      },
      {
        id: 2,
        name: "Emmanuella",
        role: "Student",
        location: "Accra",
        image: "EM",
        rating: 5,
        content:
          "I typed my budget and got verified options without digging through dead links.",
        stats: "Verified shortlist",
      },
      {
        id: 3,
        name: "Kwesi Atta",
        role: "Student – UPSA",
        location: "UPSA, Accra",
        image: "KA",
        rating: 5,
        content:
          "No extra app — just WhatsApp. Felt lighter than the usual property sites.",
        stats: "WhatsApp-only flow",
      },
    ],
    renters: [
      {
        id: 6,
        name: "Kojo",
        role: "Renter",
        location: "East Legon, Accra",
        image: "KO",
        rating: 5,
        content:
          "Replies felt human. I was near East Legon faster than I expected.",
        stats: "East Legon move",
      },
      {
        id: 7,
        name: "Joshua",
        role: "Renter",
        location: "Accra",
        image: "JO",
        rating: 5,
        content:
          "They connected me to a real agent the same day — no long forms.",
        stats: "Same-day intro",
      },
      {
        id: 8,
        name: "Desmond",
        role: "Renter",
        location: "Accra",
        image: "DE",
        rating: 5,
        content:
          "Works when the network is patchy. That matters more than people admit.",
        stats: "Low-bandwidth friendly",
      },
    ],
    landlords: [
      {
        id: 20,
        name: "Ama Serwaa",
        role: "Landlord",
        location: "Ashaley Botwe, Accra",
        image: "AS",
        rating: 5,
        content:
          "Renters message with budget and area already clear — I waste less time on people who were never serious.",
        stats: "Fewer wasted viewings",
      },
      {
        id: 21,
        name: "Kwame Osei",
        role: "Hostel manager",
        location: "Legon, Accra",
        image: "KS",
        rating: 5,
        content:
          "Listing through the portal is straightforward, and Onukpa flags enquiries before they flood my phone.",
        stats: "Cleaner enquiries",
      },
      {
        id: 22,
        name: "Efua Mensah",
        role: "Landlord",
        location: "Weija, Accra",
        image: "EM",
        rating: 5,
        content:
          "I like that fees are explained upfront and I’m not chasing people across five WhatsApp groups.",
        stats: "Transparent fees",
      },
    ],
    agents: [
      {
        id: 11,
        name: "Patrick",
        role: "Agent",
        location: "Madina, Accra",
        image: "PA",
        rating: 5,
        content:
          "Leads arrive with budget and area already captured — less back-and-forth.",
        stats: "Structured leads",
      },
      {
        id: 12,
        name: "Akua",
        role: "Agent",
        location: "East Legon, Accra",
        image: "AK",
        rating: 5,
        content:
          "Clients show up knowing what they want. Saves hours every week.",
        stats: "Less noise",
      },
      {
        id: 13,
        name: "Richmond",
        role: "Agent",
        location: "Tema",
        image: "RI",
        rating: 5,
        content:
          "The bot filters people who are serious before they reach me.",
        stats: "Better qualification",
      },
    ],
  };

  const currentList = testimonials[activeCategory];

  const nextTestimonial = () => {
    setActiveTestimonial((prev) =>
      prev === currentList.length - 1 ? 0 : prev + 1,
    );
  };

  const prevTestimonial = () => {
    setActiveTestimonial((prev) =>
      prev === 0 ? currentList.length - 1 : prev - 1,
    );
  };

  const handleCategoryChange = (category: typeof activeCategory) => {
    setActiveCategory(category);
    setActiveTestimonial(0);
  };

  const current = currentList[activeTestimonial];

  return (
    <section
      id="testimonials"
      className="border-t border-stone-200/50 bg-surface-warm py-20 md:py-24"
    >
      <div className="mx-auto max-w-5xl px-4 sm:px-6 lg:px-8">
        <SectionIntro
          eyebrow="Voices from Accra"
          title="People who already moved with Onukpa"
          subtitle="Real WhatsApp-first stories — edited lightly for length."
        />

        <div className="mb-8 flex justify-center animate-on-scroll">
          <div className="flex max-w-full flex-wrap justify-center gap-1 rounded-xl border border-stone-200 bg-white p-1 shadow-sm sm:inline-flex sm:flex-nowrap">
            {(
              [
                { id: "students" as const, label: "Students" },
                { id: "renters" as const, label: "Renters" },
                { id: "landlords" as const, label: "Landlords" },
                { id: "agents" as const, label: "Agents" },
              ] as const
            ).map((tab) => (
              <button
                key={tab.id}
                type="button"
                onClick={() => handleCategoryChange(tab.id)}
                className={`rounded-lg px-4 py-2 text-sm font-medium transition ${
                  activeCategory === tab.id
                    ? "bg-stone-900 text-white"
                    : "text-stone-600 hover:text-stone-900"
                }`}
              >
                {tab.label}
              </button>
            ))}
          </div>
        </div>

        <div className="relative animate-on-scroll">
          <article className="rounded-2xl border border-stone-200/90 bg-white px-6 py-10 shadow-sm md:px-12 md:py-12">
            <div className="absolute -left-1 -top-1 flex h-11 w-11 items-center justify-center rounded-xl bg-primary text-white shadow-md md:left-4 md:top-4">
              <Quote className="h-5 w-5" />
            </div>

            <div className="flex justify-center gap-0.5 pt-4">
              {Array.from({ length: current.rating }).map((_, i) => (
                <Star
                  key={i}
                  className="h-4 w-4 fill-amber-400 text-amber-400"
                />
              ))}
            </div>

            <blockquote className="mx-auto mt-6 max-w-2xl text-center font-display text-xl font-medium leading-snug text-stone-900 md:text-2xl">
              “{current.content}”
            </blockquote>

            <p className="mt-4 text-center text-sm font-medium text-primary">
              {current.stats}
            </p>

            <div className="mt-8 flex flex-col items-center gap-1 border-t border-stone-100 pt-8">
              <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-stone-900 text-base font-semibold text-white">
                {current.image}
              </div>
              <p className="mt-3 font-semibold text-stone-900">{current.name}</p>
              <p className="text-sm text-stone-500">{current.role}</p>
              <p className="mt-1 flex items-center gap-1 text-xs text-stone-500">
                <MapPin className="h-3 w-3" />
                {current.location}
              </p>
            </div>

            <button
              type="button"
              onClick={prevTestimonial}
              className="absolute left-0 top-1/2 hidden -translate-y-1/2 rounded-full border border-stone-200 bg-white p-2.5 text-stone-700 shadow-sm transition hover:bg-stone-50 md:flex"
              aria-label="Previous testimonial"
            >
              <ChevronLeft className="h-5 w-5" />
            </button>
            <button
              type="button"
              onClick={nextTestimonial}
              className="absolute right-0 top-1/2 hidden -translate-y-1/2 rounded-full border border-stone-200 bg-white p-2.5 text-stone-700 shadow-sm transition hover:bg-stone-50 md:flex"
              aria-label="Next testimonial"
            >
              <ChevronRight className="h-5 w-5" />
            </button>
          </article>

          <div className="mt-6 flex justify-center gap-2 md:hidden">
            <button
              type="button"
              onClick={prevTestimonial}
              className="rounded-full border border-stone-200 bg-white p-2 shadow-sm"
              aria-label="Previous"
            >
              <ChevronLeft className="h-5 w-5" />
            </button>
            <button
              type="button"
              onClick={nextTestimonial}
              className="rounded-full border border-stone-200 bg-white p-2 shadow-sm"
              aria-label="Next"
            >
              <ChevronRight className="h-5 w-5" />
            </button>
          </div>

          <div className="mt-6 flex justify-center gap-2">
            {currentList.map((_, index) => (
              <button
                key={index}
                type="button"
                onClick={() => setActiveTestimonial(index)}
                className={`h-2 rounded-full transition-all ${
                  index === activeTestimonial
                    ? "w-8 bg-primary"
                    : "w-2 bg-stone-300 hover:bg-stone-400"
                }`}
                aria-label={`Go to testimonial ${index + 1}`}
              />
            ))}
          </div>
        </div>

        <div className="mt-14 rounded-2xl border border-stone-200 bg-white px-6 py-8 text-center shadow-sm animate-on-scroll md:px-10">
          <h3 className="font-display text-xl font-semibold text-stone-900 md:text-2xl">
            Ready when you are
          </h3>
          <p className="mx-auto mt-2 max-w-md text-sm text-stone-600">
            Renters, landlords, and agents all start from WhatsApp — same bot,
            clear next steps.
          </p>
          <div className="mt-6 flex flex-col justify-center gap-3 sm:flex-row sm:flex-wrap">
            <button
              type="button"
              onClick={() => openWhatsAppPrefilled(ONUKPA_WA_RENTER_DEFAULT)}
              className="inline-flex items-center justify-center rounded-xl bg-primary px-6 py-3 text-sm font-semibold text-white shadow-sm transition hover:bg-[#3aa33d]"
            >
              Find a place
            </button>
            <button
              type="button"
              onClick={() => openWhatsAppPrefilled(ONUKPA_WA_LANDLORD_ONBOARD)}
              className="inline-flex items-center justify-center rounded-xl border border-stone-300 bg-white px-6 py-3 text-sm font-semibold text-stone-800 transition hover:border-stone-400"
            >
              I&apos;m a landlord
            </button>
            <button
              type="button"
              onClick={() => openWhatsAppPrefilled(ONUKPA_WA_AGENT_ONBOARD)}
              className="inline-flex items-center justify-center rounded-xl border border-stone-300 bg-white px-6 py-3 text-sm font-semibold text-stone-800 transition hover:border-stone-400"
            >
              I&apos;m an agent
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Testimonials;
