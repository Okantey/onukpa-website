import { useState } from "react";
import { Home, Mail, Phone, MapPin, Building2, Loader2 } from "lucide-react";
import Navigation from "../Layout/Navigation";
import Footer from "../Layout/Footer";
import WhatsAppFloatingButton from "../UI/WhatsappFloatingButton";
import { accraAreas } from "../../constants/areas";

interface LandlordFormData {
  fullName: string;
  phone: string;
  whatsapp: string;
  email: string;
  area: string;
  hasGhanaCard: string;
}

const RegisterLandlordPage = () => {
  const [formData, setFormData] = useState<LandlordFormData>({
    fullName: "",
    phone: "",
    whatsapp: "",
    email: "",
    area: "",
    hasGhanaCard: "",
  });
  const [submitting, setSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setSubmitting(true);
    setError(null);
    try {
      // Backend integration TODO:
      // 1. Hit a landlord registration endpoint (e.g. POST /suppliers/landlords/register)
      // 2. Backend should create a SupplierProfile and send a magic link for property listing.
      await new Promise((resolve) => setTimeout(resolve, 800));
      setSubmitted(true);
    } catch (err) {
      setError("Something went wrong. Please try again.");
    } finally {
      setSubmitting(false);
    }
  };

  const topAreas = [
    "East Legon",
    "Madina",
    "Adenta",
    "Achimota",
    "Spintex Road",
    "Kasoa",
  ];

  return (
    <div className="min-h-screen bg-white">
      <WhatsAppFloatingButton />
      <Navigation />
      <main className="pb-16 px-4 sm:px-6 lg:px-8 pt-6">
        <div className="max-w-4xl mx-auto">
          <div className="mb-8 text-center">
            <div className="inline-flex items-center px-4 py-2 rounded-full bg-primary/10 border border-primary/20 text-primary text-xs md:text-sm font-medium mb-3">
              For Landlords
            </div>
            <h1 className="text-2xl md:text-3xl font-bold text-slate-900 mb-3">
              Register as a landlord on Onukpa
            </h1>
            <p className="text-base md:text-lg text-slate-600 max-w-2xl mx-auto">
              Share a few details and we’ll create a profile for you, then send a
              secure link so you can add properties one by one.
            </p>
          </div>

          <div className="bg-white border border-slate-200 rounded-2xl shadow-sm p-6 md:p-8">
            {submitted ? (
              <div className="space-y-4 text-center">
                <div className="inline-flex items-center justify-center w-12 h-12 rounded-full bg-primary/10">
                  <Building2 className="w-6 h-6 text-primary" />
                </div>
                <h2 className="text-xl font-semibold text-slate-900">
                  Registration received
                </h2>
                <p className="text-base text-slate-600 max-w-md mx-auto">
                  We’ve received your landlord details. You’ll receive a secure
                  Onukpa link on WhatsApp or email to add your first property for
                  review.
                </p>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-6">
                {error && (
                  <div className="text-sm text-red-700 bg-red-50 border border-red-200 rounded-xl px-4 py-3">
                    {error}
                  </div>
                )}

                <div className="grid md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-semibold text-slate-700 mb-2">
                      Full name *
                    </label>
                    <div className="relative">
                      <Home className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400" />
                      <input
                        type="text"
                        name="fullName"
                        value={formData.fullName}
                        onChange={handleChange}
                        required
                        className="w-full pl-10 pr-4 py-2 text-sm md:text-base border border-slate-200 rounded-lg focus:border-primary focus:ring-2 focus:ring-primary/20 outline-none transition-all"
                        placeholder="Your full name"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-semibold text-slate-700 mb-2">
                      Email (optional)
                    </label>
                    <div className="relative">
                      <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400" />
                      <input
                        type="email"
                        name="email"
                        value={formData.email}
                        onChange={handleChange}
                        className="w-full pl-10 pr-4 py-2 text-sm md:text-base border border-slate-200 rounded-lg focus:border-primary focus:ring-2 focus:ring-primary/20 outline-none transition-all"
                        placeholder="you@example.com"
                      />
                    </div>
                  </div>
                </div>

                <div className="grid md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-semibold text-slate-700 mb-2">
                      Phone number *
                    </label>
                    <div className="relative">
                      <Phone className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400" />
                      <input
                        type="tel"
                        name="phone"
                        value={formData.phone}
                        onChange={handleChange}
                        required
                        className="w-full pl-10 pr-4 py-2 text-sm md:text-base border border-slate-200 rounded-lg focus:border-primary focus:ring-2 focus:ring-primary/20 outline-none transition-all"
                        placeholder="eg. 0201234567"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-semibold text-slate-700 mb-2">
                      WhatsApp number *
                    </label>
                    <div className="relative">
                      <Phone className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400" />
                      <input
                        type="tel"
                        name="whatsapp"
                        value={formData.whatsapp}
                        onChange={handleChange}
                        required
                        className="w-full pl-10 pr-4 py-2 text-sm md:text-base border border-slate-200 rounded-lg focus:border-primary focus:ring-2 focus:ring-primary/20 outline-none transition-all"
                        placeholder="Number you use on WhatsApp"
                      />
                    </div>
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-semibold text-slate-700 mb-2">
                    Main area of your properties in Accra *
                  </label>
                  <div className="relative">
                    <MapPin className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400" />
                    <select
                      name="area"
                      value={formData.area}
                      onChange={handleChange}
                      required
                      className="w-full pl-10 pr-4 py-2 text-sm md:text-base border border-slate-200 rounded-lg focus:border-primary focus:ring-2 focus:ring-primary/20 outline-none transition-all bg-white"
                    >
                      <option value="">Select an area</option>
                      {topAreas.map((area) => (
                        <option key={area} value={area}>
                          {area}
                        </option>
                      ))}
                      <option disabled>────────────</option>
                      {accraAreas.map((area) => (
                        <option key={area} value={area}>
                          {area}
                        </option>
                      ))}
                    </select>
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-semibold text-slate-700 mb-2">
                    Do you have a Ghana Card? *
                  </label>
                  <select
                    name="hasGhanaCard"
                    value={formData.hasGhanaCard}
                    onChange={handleChange}
                    required
                    className="w-full px-4 py-2 text-sm md:text-base border border-slate-200 rounded-lg focus:border-primary focus:ring-2 focus:ring-primary/20 outline-none transition-all bg-white"
                  >
                    <option value="">Select an option</option>
                    <option value="yes">Yes, I have a Ghana Card</option>
                    <option value="no">Not yet / prefer to verify later</option>
                  </select>
                  <p className="mt-2 text-xs text-slate-500">
                    We may request your Ghana Card later for higher-value rentals or
                    additional verification. You can still start listing properties now.
                  </p>
                </div>

                <button
                  type="submit"
                  disabled={submitting}
                  className="w-full inline-flex items-center justify-center px-4 py-3 rounded-lg bg-primary text-white text-sm md:text-base font-semibold shadow-lg hover:bg-primary/90 transition-all disabled:opacity-70 disabled:cursor-not-allowed"
                >
                  {submitting ? (
                    <>
                      <Loader2 className="w-5 h-5 mr-2 animate-spin" />
                      Submitting...
                    </>
                  ) : (
                    "Complete landlord registration"
                  )}
                </button>
              </form>
            )}
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default RegisterLandlordPage;

