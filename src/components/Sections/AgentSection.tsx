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
  Search,
  X,
} from "lucide-react";
import { accraAreas } from "../../constants/areas";
import { Alert, Snackbar, CircularProgress } from "@mui/material";

interface FormData {
  fullName: string;
  email: string;
  phone: string;
  whatsapp: string;
  address: string;
  yearsExperience: string;
  specialty: string;
  areas: string[];
}

//https://script.google.com/macros/s/AKfycbwAYIBaUyRUKpz3X11Q2SdeoEOjgl4A3ZVKPYnC4lQbRK9mIomZg7cGG8CIqnuIv83BVA/exec

const AgentSection = () => {
  const [snackbarOpen, setSnackbarOpen] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState("");
  const [snackbarSeverity, setSnackbarSeverity] = useState<"success" | "error">(
    "success"
  );
  const [formData, setFormData] = useState<FormData>({
    fullName: "",
    email: "",
    phone: "",
    whatsapp: "",
    address: "",
    yearsExperience: "",
    specialty: "",
    areas: [],
  });
  const [searchTerm, setSearchTerm] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(false);
  const [showLocationDropdown, setShowLocationDropdown] =
    useState<boolean>(false);

  const showNotification = (message: string, severity: "success" | "error") => {
    setSnackbarMessage(message);
    setSnackbarSeverity(severity);
    setSnackbarOpen(true);
  };

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

  const handleAreaSelect = (area: string) => {
    if (!formData.areas.includes(area)) {
      setFormData((prev) => ({
        ...prev,
        areas: [...prev.areas, area],
      }));
    }
    setSearchTerm("");
    setShowLocationDropdown(false);
  };

  const removeArea = (areaToRemove: string) => {
    setFormData((prev) => ({
      ...prev,
      areas: prev.areas.filter((area) => area !== areaToRemove),
    }));
  };

  const filteredAreas = accraAreas.filter((area) =>
    area.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const formatPhone = (input: string) => {
    if (!input) return "";

    // Remove all non-digit characters (+, spaces, dashes)
    let number = input.replace(/\D/g, "");

    // Remove leading 0 or Ghana country code (233)
    if (number.startsWith("0")) {
      number = number.slice(1);
    } else if (number.startsWith("233")) {
      number = number.slice(3);
    } else if (number.startsWith("00233")) {
      number = number.slice(5);
    }

    // Return in correct format
    return `233${number}`;
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);

    console.log("Formdata", formData);

    // Validation
    if (formData.areas.length === 0) {
      showNotification("Please select at least one area of operation", "error");
      setLoading(false);
      return;
    }

    try {
      // Primary: Send to your API
      const response = await fetch("https://api.onukpa.com/agent/add", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          fullName: formData.fullName,
          email: formData.email,
          phone: formatPhone(formData.phone),
          whatsapp: formatPhone(formData.whatsapp),
          address: formData.address,
          yearsExperience: formData.yearsExperience,
          specialty: formData.specialty,
          areas: formData.areas,
        }),
      });

      const result = await response.json();

      if (response.ok) {
        console.log("API success:", result);
        showNotification(
          "Registration Successful! We'll contact you soon.",
          "success"
        );

        // Reset form
        setFormData({
          fullName: "",
          email: "",
          phone: "",
          whatsapp: "",
          address: "",
          yearsExperience: "",
          specialty: "",
          areas: [],
        });
      } else {
        showNotification(`${result.message}`, "error");
      }
    } catch (err: any) {
      console.error("API error:", err);

      // Fallback 1: Try FormSubmit.co
      try {
        console.log("Trying FormSubmit.co fallback...");
        const formDataToSubmit = new FormData();
        formDataToSubmit.append("fullName", formData.fullName);
        formDataToSubmit.append("email", formData.email);
        formDataToSubmit.append("phone", formatPhone(formData.phone));
        formDataToSubmit.append("whatsapp", formatPhone(formData.whatsapp));
        formDataToSubmit.append("address", formData.address);
        formDataToSubmit.append("yearsExperience", formData.yearsExperience);
        formDataToSubmit.append("specialty", formData.specialty);
        formDataToSubmit.append("areas", formData.areas.join(", "));
        formDataToSubmit.append("_subject", "New Agent Registration - Onukpa");
        formDataToSubmit.append("_captcha", "false");

        const fallbackResponse = await fetch(
          "https://formsubmit.co/ajax/0001fdfdd622301b955b6614fe9c2ed9",
          {
            method: "POST",
            body: formDataToSubmit,
            headers: {
              Accept: "application/json",
            },
          }
        );

        const fallbackResult = await fallbackResponse.json();

        if (fallbackResponse.ok && fallbackResult.success) {
          console.log("FormSubmit.co fallback success");
          showNotification(
            "Registration submitted! We've received your details.",
            "success"
          );

          // Reset form
          setFormData({
            fullName: "",
            email: "",
            phone: "",
            whatsapp: "",
            address: "",
            yearsExperience: "",
            specialty: "",
            areas: [],
          });
        } else {
          throw new Error("FormSubmit also failed");
        }
      } catch (fallbackError) {
        console.error("FormSubmit.co fallback error:", fallbackError);

        // Fallback 2: Store in localStorage
        try {
          const submissions = JSON.parse(
            localStorage.getItem("agentSubmissions") || "[]"
          );
          submissions.push({
            id: Date.now().toString(),
            ...formData,
            phone: formatPhone(formData.phone),
            whatsapp: formatPhone(formData.whatsapp),
            timestamp: new Date().toISOString(),
            status: "pending_sync",
          });
          localStorage.setItem("agentSubmissions", JSON.stringify(submissions));

          showNotification(
            "Registration saved offline! We'll sync when you're back online.",
            "success"
          );

          // Reset form
          setFormData({
            fullName: "",
            email: "",
            phone: "",
            whatsapp: "",
            address: "",
            yearsExperience: "",
            specialty: "",
            areas: [],
          });
        } catch (localStorageError) {
          console.error("LocalStorage error:", localStorageError);
          showNotification("Registration failed. Please try again.", "error");
        }
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
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
              tools, and grow your real estate business with Onukpa's
              professional agent platform.
            </p>
          </div>
          <div className="grid lg:grid-cols-2 gap-12">
            <div className="animate-on-scroll">
              <div className="bg-white rounded-2xl shadow-xl border border-slate-200 md:p-8 px-2 py-5">
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
                          maxLength={10}
                          minLength={10}
                          required
                          placeholder="eg. 0201234567"
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
                          maxLength={10}
                          minLength={10}
                          placeholder="eg. 0201234567"
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
                  {/* areas of operation */}
                  <div>
                    <label className="block text-sm font-semibold text-slate-700 mb-2">
                      Areas of Operation in Accra *
                    </label>

                    {formData.areas.length > 0 && (
                      <div className="mb-3">
                        <div className="flex flex-wrap gap-2">
                          {formData.areas.map((area) => (
                            <div
                              key={area}
                              className="flex items-center space-x-1 bg-primary/10 text-primary px-3 py-1.5 rounded-full text-sm font-medium"
                            >
                              <span>{area}</span>
                              <button
                                type="button"
                                onClick={() => removeArea(area)}
                                className="hover:bg-primary/20 rounded-full p-0.5 transition-colors"
                              >
                                <X className="w-3 h-3" />
                              </button>
                            </div>
                          ))}
                        </div>
                        <p className="text-xs text-slate-500 mt-2">
                          {formData.areas.length} area(s) selected
                        </p>
                      </div>
                    )}

                    {/* Search Input */}
                    <div className="relative">
                      <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-slate-400 w-4 h-4" />
                      <input
                        type="text"
                        value={searchTerm}
                        onChange={(e) => {
                          setSearchTerm(e.target.value);
                          setShowLocationDropdown(true);
                        }}
                        onFocus={() => setShowLocationDropdown(true)}
                        placeholder="Search for areas in Accra..."
                        className="w-full pl-10 pr-4 py-2 text-sm border border-slate-200 rounded-lg focus:border-primary focus:ring-2 focus:ring-primary/20 transition-all duration-200"
                      />

                      {showLocationDropdown && (
                        <div className="absolute z-10 w-full mt-1 bg-white border border-slate-200 rounded-lg shadow-lg max-h-60 overflow-y-auto">
                          {filteredAreas.length > 0 ? (
                            filteredAreas.map((area) => (
                              <button
                                key={area}
                                type="button"
                                onClick={() => handleAreaSelect(area)}
                                disabled={formData.areas.includes(area)}
                                className={`w-full text-left px-4 py-2 text-sm hover:bg-slate-50 transition-colors ${
                                  formData.areas.includes(area)
                                    ? "text-slate-400 cursor-not-allowed bg-slate-100"
                                    : "text-slate-700"
                                }`}
                              >
                                <div className="flex items-center justify-between">
                                  <span>{area}</span>
                                  {formData.areas.includes(area) && (
                                    <div className="w-2 h-2 bg-primary rounded-full"></div>
                                  )}
                                </div>
                              </button>
                            ))
                          ) : (
                            <div className="px-4 py-3 text-sm text-slate-500 text-center">
                              No areas found matching "{searchTerm}"
                            </div>
                          )}
                        </div>
                      )}
                    </div>

                    {/* Quick Selection */}
                    <div className="mt-3">
                      <p className="text-xs text-slate-600 mb-2 font-medium">
                        Popular areas:
                      </p>
                      <div className="flex flex-wrap gap-2">
                        {[
                          "East Legon",
                          "Airport Residential",
                          "Labone",
                          "Spintex Road",
                          "Madina",
                          "Adenta",
                        ].map((popularArea) => (
                          <button
                            key={popularArea}
                            type="button"
                            onClick={() => handleAreaSelect(popularArea)}
                            disabled={formData.areas.includes(popularArea)}
                            className={`text-xs px-3 py-1.5 rounded-full border transition-all duration-200 ${
                              formData.areas.includes(popularArea)
                                ? "bg-primary text-white border-primary"
                                : "bg-white text-slate-700 border-slate-300 hover:border-primary hover:text-primary"
                            }`}
                          >
                            {popularArea}
                          </button>
                        ))}
                      </div>
                    </div>
                  </div>

                  <button
                    type="submit"
                    disabled={loading}
                    className="w-full bg-primary text-white py-2 rounded-lg font-semibold text-sm hover:bg-primary/90 transition-all duration-300 shadow-lg hover:shadow-xl"
                  >
                    {loading ? (
                      <CircularProgress
                        size={16}
                        thickness={10}
                        style={{ color: "white" }}
                      />
                    ) : (
                      "Complete Registration"
                    )}
                  </button>

                  <p className="text-sm text-slate-500 text-center leading-relaxed">
                    By registering, you agree to our{" "}
                    <a
                      href="/terms"
                      className="text-slate-600 font-medium underline hover:text-primary transition-colors duration-200"
                    >
                      Terms and Conditions
                    </a>{" "}
                    and acknowledge our{" "}
                    <a
                      href="/terms"
                      className="text-slate-600 font-medium underline hover:text-primary transition-colors duration-200"
                    >
                      Privacy Policy
                    </a>
                    . All agent applications are subject to verification.
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
                <div className="bg-blue-50 rounded-2xl p-6 border border-blue-200 mt-5 hidden md:block">
                  <h4 className="font-semibold text-slate-900 mb-3 flex items-center">
                    <MapPin className="w-5 h-5 mr-2" />
                    About Areas Selection
                  </h4>
                  <ul className="text-sm text-slate-700 space-y-2">
                    <li>
                      • Select all areas where you have properties or operate
                    </li>
                    <li>
                      • You'll receive leads specifically for your selected
                      areas
                    </li>
                    <li>
                      • You can update your areas anytime after registration
                    </li>
                    <li>• More areas = More potential leads</li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
      <Snackbar
        open={snackbarOpen}
        autoHideDuration={4000}
        onClose={() => setSnackbarOpen(false)}
        anchorOrigin={{ vertical: "top", horizontal: "right" }}
      >
        <Alert
          onClose={() => setSnackbarOpen(false)}
          severity={snackbarSeverity}
          variant="filled"
          sx={{ width: "100%" }}
        >
          {snackbarMessage}
        </Alert>
      </Snackbar>
    </>
  );
};

export default AgentSection;
