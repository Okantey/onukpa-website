import { useState } from "react";
import {
  Users,
  Zap,
  Shield,
  User,
  Mail,
  Phone,
  MapPin,
  Building,
} from "lucide-react";

const AgentSection = () => {
  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    phone: "",
    whatsapp: "",
    address: "",
    yearsExperience: "",
    specialty: "",
    areas: "",
  });

  const benefits = [
    {
      icon: Users,
      title: "500+ Daily Qualified Leads",
      desc: "Get pre-screened rental requests from serious clients in Accra",
    },
    {
      icon: Zap,
      title: "Instant WhatsApp Notifications",
      desc: "Receive leads directly on WhatsApp with client details and requirements",
    },
    {
      icon: Shield,
      title: "Verified Client Profiles",
      desc: "All renters are verified with complete profiles and rental history",
    },
    {
      icon: Building,
      title: "Portfolio Showcase",
      desc: "Showcase your property portfolio to thousands of active renters",
    },
  ];

  const handleInputChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement
    >
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Handle form submission here
    // console.log({ ...formData, package: selectedPackage });
  };

  return (
    <section id="agents" className="py-20 bg-white">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16 animate-on-scroll">
          <div className="inline-flex items-center px-4 py-2 rounded-full bg-primary/10 border border-primary/20 text-primary text-sm font-medium mb-4">
            🏆 Exclusive for Real Estate Professionals
          </div>
          <h2 className="md:text-4xl text-2xl font-bold text-slate-900 mb-4">
            Join Ghana's Fastest Growing Agent Network
          </h2>
          <p className="md:text-xl text-base text-slate-600 max-w-3xl mx-auto">
            Get exclusive access to verified rental leads, advanced business
            tools, and grow your real estate business with Onukpa's professional
            agent platform.
          </p>
        </div>
        <div className="grid lg:grid-cols-2 gap-12">
          <div className="animate-on-scroll">
            <div className="bg-white rounded-2xl shadow-xl border border-slate-200 p-8">
              <h3 className="md:text-2xl text-lg font-bold text-slate-900 mb-6">
                Agent Registration
              </h3>
              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="grid md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-semibold text-slate-700 mb-2">
                      Full Name *
                    </label>
                    <div className="relative">
                      <User className="absolute left-3 top-1/2 transform -translate-y-1/2 text-slate-400 w-5 h-5" />
                      <input
                        type="text"
                        name="fullName"
                        value={formData.fullName}
                        onChange={handleInputChange}
                        required
                        placeholder="John Doe"
                        className="w-full pl-10 pr-4 py-2 text-sm border border-slate-200 rounded-lg focus:border-primary focus:ring-2 focus:ring-primary/20 transition-all duration-200"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-semibold text-slate-700 mb-2">
                      Email Address *
                    </label>
                    <div className="relative">
                      <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 text-slate-400 w-5 h-5" />
                      <input
                        type="email"
                        name="email"
                        value={formData.email}
                        onChange={handleInputChange}
                        required
                        placeholder="john@example.com"
                        className="w-full pl-10 pr-4 py-2 text-sm border border-slate-200 rounded-lg focus:border-primary focus:ring-2 focus:ring-primary/20 transition-all duration-200"
                      />
                    </div>
                  </div>
                </div>

                {/* Contact Information */}
                <div className="grid md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-semibold text-slate-700 mb-2">
                      Phone Number *
                    </label>
                    <div className="relative">
                      <Phone className="absolute left-3 top-1/2 transform -translate-y-1/2 text-slate-400 w-5 h-5" />
                      <input
                        type="tel"
                        name="phone"
                        value={formData.phone}
                        onChange={handleInputChange}
                        required
                        placeholder="+233 XX XXX XXXX"
                        className="w-full pl-10 pr-4 py-2 text-sm border border-slate-200 rounded-lg focus:border-primary focus:ring-2 focus:ring-primary/20 transition-all duration-200"
                      />
                    </div>
                  </div>
                  <div>
                    <label className="block text-sm font-semibold text-slate-700 mb-2">
                      WhatsApp Number *
                    </label>
                    <div className="relative">
                      <Phone className="absolute left-3 top-1/2 transform -translate-y-1/2 text-slate-400 w-5 h-5" />
                      <input
                        type="tel"
                        name="whatsapp"
                        value={formData.whatsapp}
                        onChange={handleInputChange}
                        required
                        placeholder="+233 XX XXX XXXX"
                        className="w-full pl-10 pr-4 py-2 text-sm border border-slate-200 rounded-lg focus:border-primary focus:ring-2 focus:ring-primary/20 transition-all duration-200"
                      />
                    </div>
                  </div>
                </div>

                <div className="grid md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-semibold text-slate-700 mb-2">
                      Years of Experience *
                    </label>
                    <select
                      name="yearsExperience"
                      value={formData.yearsExperience}
                      onChange={handleInputChange}
                      required
                      className="w-full px-4 py-2 border border-slate-200 text-sm rounded-lg focus:border-primary focus:ring-2 focus:ring-primary/20 transition-all duration-200"
                    >
                      <option value="">Select experience</option>
                      <option value="0-1">0-1 years</option>
                      <option value="1-3">1-3 years</option>
                      <option value="3-5">3-5 years</option>
                      <option value="5+">5+ years</option>
                    </select>
                  </div>
                  <div>
                    <label className="block text-sm font-semibold text-slate-700 mb-2">
                      Specialty *
                    </label>
                    <select
                      name="specialty"
                      value={formData.specialty}
                      required
                      onChange={handleInputChange}
                      className="w-full px-4 py-2 border border-slate-200 text-sm rounded-lg focus:border-primary focus:ring-2 focus:ring-primary/20 transition-all duration-200"
                    >
                      <option value="">Select specialty</option>
                      <option value="rooms">
                        Rooms (Single rooms, chambers & halls, self-contained,
                        etc.)
                      </option>
                      <option value="apartments">
                        Apartments (1–3 bedroom apartments,
                        furnished/unfurnished)
                      </option>
                      <option value="campus">
                        Campus Hostels (University & private hostels)
                      </option>

                      <option value="offices/stores">
                        Stores / Office Spaces
                      </option>
                    </select>
                  </div>
                </div>
                <div>
                  <label className="block text-sm font-semibold text-slate-700 mb-2">
                    Residential Address *
                  </label>
                  <div className="relative flex justify-center items-center">
                    <MapPin className="absolute left-3 text-slate-400 w-5 h-5" />
                    <input
                      type="text"
                      name="address"
                      value={formData.address}
                      onChange={handleInputChange}
                      required
                      placeholder="Your residential address in Accra"
                      className="w-full pl-10 pr-4 py-2 text-sm border border-slate-200 rounded-lg focus:border-primary focus:ring-2 focus:ring-primary/20 transition-all duration-200"
                    />
                  </div>
                </div>
                <div>
                  <label className="block text-sm font-semibold text-slate-700 mb-2">
                    Areas of Operation in Accra *
                  </label>
                  <input
                    type="text"
                    name="areas"
                    required
                    value={formData.areas}
                    onChange={handleInputChange}
                    placeholder="e.g., East Legon, Cantonments, Airport Residential"
                    className="w-full px-4 py-2 text-sm border border-slate-200 rounded-lg focus:border-primary focus:ring-2 focus:ring-primary/20 transition-all duration-200"
                  />
                </div>

                <button
                  type="submit"
                  className="w-full bg-primary text-white py-2 rounded-lg font-semibold text-base hover:bg-primary/90 transition-all duration-300 shadow-lg hover:shadow-xl"
                >
                  Complete Registration
                </button>

                <p className="text-sm text-slate-500 text-center">
                  By registering, you agree to our Terms of Service and Privacy
                  Policy. All agent applications are subject to verification.
                </p>
              </form>
            </div>
          </div>
          <div className="space-y-8 animate-on-scroll">
            <div className="bg-primary/5 rounded-2xl p-8 border border-primary/10">
              <h3 className="md:text-2xl text-lg font-bold text-slate-900 mb-6">
                Why Join Onukpa Agent Network?
              </h3>
              <div className="space-y-6">
                {benefits.map((benefit, index) => (
                  <div
                    key={index}
                    className="flex items-start space-x-4 px-4 py-5 rounded-lg bg-white hover:shadow-md transition-all duration-300"
                  >
                    <div className="w-12 h-12 bg-primary rounded-lg flex items-center justify-center flex-shrink-0">
                      <benefit.icon className="w-6 h-6 text-white" />
                    </div>
                    <div>
                      <h4 className="md:text-lg text-base font-semibold text-slate-900 mb-1">
                        {benefit.title}
                      </h4>
                      <p className="md:text-base text-sm text-slate-600">
                        {benefit.desc}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default AgentSection;
