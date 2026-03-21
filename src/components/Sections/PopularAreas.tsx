import { MapPin } from "lucide-react";

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

const PopularAreas = () => {
  return (
    <section className="py-20 bg-slate-50" id="areas">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12 animate-on-scroll">
          <h2 className="md:text-3xl text-2xl font-bold text-slate-900 mb-4">
            Popular Areas in Accra
          </h2>
          <p className="md:text-lg text-base text-slate-600 max-w-2xl mx-auto">
            Browse trusted rentals in the neighbourhoods Ghanaians actually move
            to.
          </p>
        </div>

        <div className="bg-white rounded-2xl border border-slate-200 shadow-sm p-6 md:p-8 animate-on-scroll">
          <div className="flex items-center mb-4 space-x-2">
            <div className="w-9 h-9 rounded-xl bg-primary/10 flex items-center justify-center">
              <MapPin className="w-5 h-5 text-primary" />
            </div>
            <p className="text-sm md:text-base text-slate-600">
              Tap an area when chatting with Onukpa on WhatsApp to narrow your
              search.
            </p>
          </div>
          <div className="flex flex-wrap gap-2">
            {POPULAR_AREAS.map((area) => (
              <span
                key={area}
                className="px-4 py-2 rounded-full bg-slate-50 text-slate-700 border border-slate-200 text-sm font-medium hover:border-primary hover:text-primary transition-colors"
              >
                {area}
              </span>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default PopularAreas;
