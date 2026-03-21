import { MapPin, MessageCircle } from "lucide-react";
import SectionIntro from "../Layout/SectionIntro";
import handleWhatsAppClick from "../../utils/openWhatsapp";
import { LANDING_IMAGES } from "../../constants/landingImages";

const POPULAR_AREAS = [
  "East Legon",
  "Madina",
  "Adenta",
  "Achimota",
  "Lapaz",
  "Kwabenya",
  "Spintex",
  "Weija",
  "Kasoa",
  "North Legon",
  "Haatso",
  "Adjiringanor",
  "Ashaley Botwe",
  "Dome",
  "Taifa",
];

const FEATURED = [
  {
    name: "East Legon",
    detail: "Apartments & family compounds",
  },
  {
    name: "Spintex",
    detail: "Main road access & new builds",
  },
  {
    name: "Madina",
    detail: "Strong room & hostel supply",
  },
  {
    name: "Lapaz",
    detail: "Central, high movement",
  },
  {
    name: "Weija",
    detail: "Value pockets toward Kasoa",
  },
  {
    name: "Ashaley Botwe",
    detail: "Growing residential corridor",
  },
];

const PopularAreas = () => {
  const rest = POPULAR_AREAS.filter(
    (a) => !FEATURED.some((f) => f.name === a),
  );

  return (
    <section
      className="border-y border-stone-200/50 bg-surface-muted py-20 md:py-24"
      id="areas"
    >
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <SectionIntro
          eyebrow="Accra"
          title="Popular areas we cover"
          subtitle="Name your neighbourhood in chat — we’ll tune matches to real supply in these corridors."
        />

        <div className="animate-on-scroll relative mb-12 overflow-hidden rounded-3xl shadow-md ring-1 ring-stone-200/80">
          <img
            src={LANDING_IMAGES.accra}
            alt="Accra cityscape — neighbourhoods where Onukpa lists rentals"
            className="aspect-[21/9] min-h-[10rem] w-full object-cover object-center sm:min-h-[12rem]"
            loading="lazy"
            decoding="async"
          />
          <div
            className="absolute inset-0 bg-gradient-to-r from-stone-900/65 via-stone-900/25 to-transparent"
            aria-hidden
          />
          <div className="absolute inset-y-0 left-0 flex max-w-lg flex-col justify-center px-6 py-6 sm:px-10">
            <p className="font-display text-xl font-semibold text-white sm:text-2xl">
              Rooted in the city you’re searching
            </p>
            <p className="mt-2 text-sm text-white/85">
              From East Legon to Weija — supply changes block by block. We match
              accordingly.
            </p>
          </div>
        </div>

        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {FEATURED.map((area) => (
            <div
              key={area.name}
              className="animate-on-scroll flex flex-col justify-between rounded-2xl border border-stone-200/90 bg-white p-5 shadow-sm transition hover:border-stone-300 hover:shadow-md"
            >
              <div>
                <div className="mb-3 inline-flex h-9 w-9 items-center justify-center rounded-lg bg-primary/10 text-primary">
                  <MapPin className="h-4 w-4" strokeWidth={2} />
                </div>
                <h3 className="font-display text-lg font-semibold text-stone-900">
                  {area.name}
                </h3>
                <p className="mt-1 text-sm text-stone-600">{area.detail}</p>
              </div>
            </div>
          ))}
        </div>

        <div className="mt-10 animate-on-scroll rounded-2xl border border-stone-200/90 bg-white/80 p-6 md:p-8">
          <p className="mb-4 text-sm font-medium text-stone-700">
            More neighbourhoods renters ask for often
          </p>
          <div className="flex flex-wrap gap-2">
            {rest.map((area) => (
              <span
                key={area}
                className="rounded-full border border-stone-200 bg-stone-50 px-3.5 py-1.5 text-xs font-medium text-stone-700"
              >
                {area}
              </span>
            ))}
          </div>
        </div>

        <div className="mt-10 flex flex-col items-center justify-between gap-4 rounded-2xl border border-primary/20 bg-primary/5 px-6 py-5 sm:flex-row md:px-8 animate-on-scroll">
          <p className="text-center text-sm text-stone-700 sm:text-left">
            <span className="font-semibold text-stone-900">Not sure which area?</span>{" "}
            Tell us commute, school, or workplace — we’ll suggest realistic pockets.
          </p>
          <button
            type="button"
            onClick={() => handleWhatsAppClick()}
            className="inline-flex shrink-0 items-center gap-2 rounded-xl bg-primary px-5 py-2.5 text-sm font-semibold text-white shadow-sm transition hover:bg-[#3aa33d]"
          >
            <MessageCircle className="h-4 w-4" />
            Ask on WhatsApp
          </button>
        </div>
      </div>
    </section>
  );
};

export default PopularAreas;
