import { useState } from "react";
import { Star, Quote, ChevronLeft, ChevronRight, MapPin } from "lucide-react";

const Testimonials = () => {
  const [activeCategory, setActiveCategory] = useState("students");
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
          "I used to waste data browsing websites that never load properly. With Onukpa, it's just WhatsApp — quick replies, low data, and I found a room in two days!",
        stats: "Found room in 2 days",
      },
      {
        id: 2,
        name: "Emmanuella",
        role: "Student",
        location: "Accra",
        image: "EM",
        rating: 5,
        content:
          "Most housing apps are confusing, but Onukpa keeps it simple. I just typed my budget, and boom — I got verified options instantly.",
        stats: "Instant verified options",
      },
      {
        id: 3,
        name: "Kwesi Atta",
        role: "Student – UPSA",
        location: "UPSA, Accra",
        image: "KA",
        rating: 5,
        content:
          "Compared to other rental apps, Onukpa is faster and lighter. No need to download anything — just chat on WhatsApp and you're good.",
        stats: "No app download needed",
      },
      {
        id: 4,
        name: "Isaax",
        role: "Student",
        location: "Accra",
        image: "IS",
        rating: 5,
        content:
          "Onukpa made finding a student room simple. It works on low data and gives you only real, available listings.",
        stats: "Works on low data",
      },
      {
        id: 5,
        name: "Joel",
        role: "Student",
        location: "Accra",
        image: "JO",
        rating: 5,
        content:
          "No app download, no stress. Just WhatsApp, my budget, and my location — I got a call from an agent within hours!",
        stats: "Agent contact in hours",
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
          "Honestly, I was shocked how smooth it was. Other websites lag, but this chatbot feels human and efficient. I got my place near East Legon in no time.",
        stats: "Smooth & efficient",
      },
      {
        id: 7,
        name: "Joshua",
        role: "Renter",
        location: "Accra",
        image: "JO",
        rating: 5,
        content:
          "I didn't even expect much, but Onukpa replied immediately and connected me to a real agent. The process was way faster than those big property apps.",
        stats: "Immediate replies",
      },
      {
        id: 8,
        name: "Desmond",
        role: "Renter",
        location: "Accra",
        image: "DE",
        rating: 5,
        content:
          "I've tried a few apps before, but Onukpa stands out. No long forms or slow pages — just WhatsApp, and it works perfectly.",
        stats: "No long forms",
      },
      {
        id: 9,
        name: "Angel",
        role: "Renter",
        location: "Accra",
        image: "AN",
        rating: 5,
        content:
          "I was surprised how personal it felt. It's not like a stiff website form — the chatbot actually understands what you're looking for.",
        stats: "Personalized service",
      },
      {
        id: 10,
        name: "Meri",
        role: "Renter",
        location: "Accra",
        image: "ME",
        rating: 5,
        content:
          "The best part? It works even with poor internet. I found my room faster than any of my friends using regular housing apps.",
        stats: "Works with poor internet",
      },
    ],
    agents: [
      {
        id: 11,
        name: "Patrick",
        role: "Real Estate Agent",
        location: "Madina, Accra",
        image: "PA",
        rating: 5,
        content:
          "Before Onukpa, it was hard to reach serious clients. Now I get verified leads daily right on WhatsApp — no need for extra ads.",
        stats: "Daily verified leads",
      },
      {
        id: 12,
        name: "Akua",
        role: "Real Estate Agent",
        location: "East Legon, Accra",
        image: "AK",
        rating: 5,
        content:
          "It's one of the easiest platforms I've used. Clients message directly with details already collected — saves me so much time!",
        stats: "Time-saving platform",
      },
      {
        id: 13,
        name: "Richmond",
        role: "Real Estate Agent",
        location: "Tema",
        image: "RI",
        rating: 5,
        content:
          "I've closed more deals with Onukpa in a month than on other property apps in three. The system filters real buyers from the noise.",
        stats: "More deals closed",
      },
      {
        id: 14,
        name: "Nana Adjei",
        role: "Real Estate Agent",
        location: "Spintex, Accra",
        image: "NA",
        rating: 5,
        content:
          "What I love most is how fast it connects me to clients. It's all WhatsApp — no app installs, no lag, just straight business.",
        stats: "Fast client connections",
      },
      {
        id: 15,
        name: "Lunartech Solutions",
        role: "Company",
        location: "Accra",
        image: "LS",
        rating: 5,
        content:
          "We secured our new office through Onukpa. The platform is reliable, quick, and way easier than browsing endless websites.",
        stats: "Office secured easily",
      },
    ],
  };

  const currentTestimonials =
    testimonials[activeCategory as keyof typeof testimonials];

  const nextTestimonial = () => {
    setActiveTestimonial((prev) =>
      prev === currentTestimonials.length - 1 ? 0 : prev + 1
    );
  };

  const prevTestimonial = () => {
    setActiveTestimonial((prev) =>
      prev === 0 ? currentTestimonials.length - 1 : prev - 1
    );
  };

  const goToTestimonial = (index: number) => {
    setActiveTestimonial(index);
  };

  const handleCategoryChange = (category: string) => {
    setActiveCategory(category);
    setActiveTestimonial(0);
  };

  return (
    <section
      id="testimonials"
      className="py-12 md:py-20 bg-gradient-to-br from-slate-50 to-blue-50/30"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-8 md:mb-12 animate-on-scroll">
          <div className="inline-flex items-center px-3 py-1.5 md:px-4 md:py-2 rounded-full bg-primary/10 border border-primary/20 text-primary text-xs md:text-sm font-medium mb-3 md:mb-4">
            <Star className="w-3 h-3 md:w-4 md:h-4 mr-1.5 md:mr-2 fill-current" />
            Loved by Students, Renters & Agents
          </div>
          <h2 className="text-2xl md:text-4xl font-bold text-slate-900 mb-3 md:mb-4 px-4">
            What People Are Saying
          </h2>
          <p className="text-sm md:text-lg text-slate-600 max-w-2xl mx-auto px-4">
            Discover why thousands trust Onukpa for their rental needs in Ghana
          </p>
        </div>

        {/* Category Tabs - Mobile Optimized */}
        <div className="flex justify-center mb-8 md:mb-12 animate-on-scroll px-2">
          <div className="inline-flex bg-white rounded-xl md:rounded-2xl p-1 md:p-2 border border-slate-200 shadow-sm w-full max-w-md">
            {[
              {
                id: "students",
                label: "Students",
                icon: "🎓",
                count: testimonials.students.length,
              },
              {
                id: "renters",
                label: "Renters",
                icon: "🏠",
                count: testimonials.renters.length,
              },
              {
                id: "agents",
                label: "Agents",
                icon: "💼",
                count: testimonials.agents.length,
              },
            ].map((category) => (
              <button
                key={category.id}
                onClick={() => handleCategoryChange(category.id)}
                className={`flex flex-col items-center space-y-1 px-2 py-2 md:px-4 md:py-3 rounded-lg md:rounded-xl font-medium transition-all duration-300 flex-1 min-w-0 ${
                  activeCategory === category.id
                    ? "bg-primary text-white shadow-md"
                    : "text-slate-600 hover:text-slate-900 hover:bg-slate-100"
                }`}
              >
                <span className="text-base md:text-lg">{category.icon}</span>
                <span className="text-xs md:text-sm font-medium whitespace-nowrap">
                  {category.label}
                </span>
                <span
                  className={`text-xs px-1.5 py-0.5 rounded-full ${
                    activeCategory === category.id
                      ? "bg-white/20 text-white"
                      : "bg-slate-200 text-slate-600"
                  }`}
                >
                  {category.count}
                </span>
              </button>
            ))}
          </div>
        </div>

        {/* Main Testimonial Carousel - Mobile Optimized */}
        <div className="max-w-4xl mx-auto mb-8 md:mb-12 px-2">
          <div className="relative bg-white rounded-2xl md:rounded-3xl shadow-lg md:shadow-xl border border-slate-200 p-4 md:p-8 lg:p-12 animate-on-scroll">
            {/* Quote Icon - Mobile Adjusted */}
            <div className="absolute -top-3 -left-3 md:-top-4 md:-left-4 w-8 h-8 md:w-12 md:h-12 bg-primary rounded-xl md:rounded-2xl flex items-center justify-center shadow-md md:shadow-lg">
              <Quote className="w-4 h-4 md:w-6 md:h-6 text-white" />
            </div>

            {/* Content */}
            <div className="text-center mb-6 md:mb-8 pt-2">
              <div className="flex justify-center mb-4 md:mb-6">
                {[...Array(currentTestimonials[activeTestimonial].rating)].map(
                  (_, i) => (
                    <Star
                      key={i}
                      className="w-4 h-4 md:w-6 md:h-6 text-yellow-400 fill-current"
                    />
                  )
                )}
              </div>

              <blockquote className="text-sm md:text-lg lg:text-xl font-medium text-slate-900 leading-relaxed mb-4 md:mb-6 px-2">
                "{currentTestimonials[activeTestimonial].content}"
              </blockquote>

              <div className="inline-flex items-center px-3 py-1.5 md:px-4 md:py-2 bg-primary/10 rounded-full">
                <div className="text-xs md:text-sm font-semibold text-primary">
                  {currentTestimonials[activeTestimonial].stats}
                </div>
              </div>
            </div>

            {/* Author */}
            <div className="text-center">
              <div className="w-16 h-16 md:w-20 md:h-20 bg-gradient-to-br from-primary to-primary/80 rounded-xl md:rounded-2xl flex items-center justify-center text-white font-bold text-lg md:text-xl mx-auto mb-3 md:mb-4 shadow-md md:shadow-lg">
                {currentTestimonials[activeTestimonial].image}
              </div>
              <div className="mb-2">
                <h4 className="text-lg md:text-xl font-bold text-slate-900">
                  {currentTestimonials[activeTestimonial].name}
                </h4>
                <p className="text-primary font-semibold text-sm md:text-base">
                  {currentTestimonials[activeTestimonial].role}
                </p>
              </div>
              <div className="flex items-center justify-center text-slate-600 text-xs md:text-sm">
                <MapPin className="w-3 h-3 md:w-4 md:h-4 mr-1" />
                {currentTestimonials[activeTestimonial].location}
              </div>
            </div>

            {/* Navigation Arrows - Mobile Optimized */}
            <button
              onClick={prevTestimonial}
              className="absolute left-2 md:left-4 top-1/2 transform -translate-y-1/2 w-8 h-8 md:w-12 md:h-12 bg-white border border-slate-200 rounded-full flex items-center justify-center hover:bg-slate-50 transition-all duration-200 shadow-md md:shadow-lg hover:shadow-xl"
            >
              <ChevronLeft className="w-4 h-4 md:w-5 md:h-5 text-slate-700" />
            </button>
            <button
              onClick={nextTestimonial}
              className="absolute right-2 md:right-4 top-1/2 transform -translate-y-1/2 w-8 h-8 md:w-12 md:h-12 bg-white border border-slate-200 rounded-full flex items-center justify-center hover:bg-slate-50 transition-all duration-200 shadow-md md:shadow-lg hover:shadow-xl"
            >
              <ChevronRight className="w-4 h-4 md:w-5 md:h-5 text-slate-700" />
            </button>
          </div>

          {/* Dots Indicator */}
          <div className="flex justify-center space-x-2 md:space-x-3 mt-6 md:mt-8">
            {currentTestimonials.map((_, index) => (
              <button
                key={index}
                onClick={() => goToTestimonial(index)}
                className={`w-2 h-2 md:w-3 md:h-3 rounded-full transition-all duration-300 ${
                  index === activeTestimonial
                    ? "bg-primary w-6 md:w-8"
                    : "bg-slate-300 hover:bg-slate-400"
                }`}
              />
            ))}
          </div>
        </div>

        {/* Stats Bar - Mobile Optimized */}
        <div className="grid grid-cols-2 gap-3 md:gap-6 max-w-3xl mx-auto mb-12 md:mb-16 animate-on-scroll px-2">
          {[
            { number: "2k+", label: "Happy Users" },
            { number: "2k+", label: "WhatsApp Contacts" },
            { number: "95%", label: "Success Rate" },
            { number: "4.8/5", label: "Satisfaction" },
          ].map((stat, index) => (
            <div
              key={index}
              className="text-center p-4 md:p-6 bg-white rounded-xl md:rounded-2xl border border-slate-200 hover:shadow-md md:hover:shadow-lg transition-all duration-300"
            >
              <div className="text-xl md:text-3xl font-bold text-primary mb-1 md:mb-2">
                {stat.number}
              </div>
              <div className="text-xs md:text-sm text-slate-600 font-medium">
                {stat.label}
              </div>
            </div>
          ))}
        </div>

        {/* Category Highlights - Mobile Optimized */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 md:gap-8 mb-12 md:mb-16 px-2">
          {[
            {
              category: "students",
              title: "For Students",
              description: "Find affordable rooms and hostels near your campus",
              icon: "🎓",
              features: [
                "Low data usage",
                "Quick responses",
                "Campus locations",
              ],
            },
            {
              category: "renters",
              title: "For Renters",
              description: "Discover your perfect home without the hassle",
              icon: "🏠",
              features: [
                "Verified listings",
                "Budget matching",
                "Fast process",
              ],
            },
            {
              category: "agents",
              title: "For Agents",
              description: "Grow your business with qualified leads",
              icon: "💼",
              features: ["Daily leads", "WhatsApp integration", "No extra ads"],
            },
          ].map((section, index) => (
            <div
              key={section.category}
              className="bg-white rounded-xl md:rounded-2xl p-4 md:p-6 border border-slate-200 hover:shadow-md md:hover:shadow-lg transition-all duration-300 animate-on-scroll"
              style={{ animationDelay: `${index * 0.1}s` }}
            >
              <div className="text-3xl md:text-4xl mb-3 md:mb-4">
                {section.icon}
              </div>
              <h3 className="text-lg md:text-xl font-bold text-slate-900 mb-2">
                {section.title}
              </h3>
              <p className="text-slate-600 text-sm md:text-base mb-3 md:mb-4">
                {section.description}
              </p>
              <ul className="space-y-1.5 md:space-y-2">
                {section.features.map((feature, featureIndex) => (
                  <li
                    key={featureIndex}
                    className="flex items-center text-xs md:text-sm text-slate-700"
                  >
                    <div className="w-1.5 h-1.5 md:w-2 md:h-2 bg-primary rounded-full mr-2 md:mr-3"></div>
                    {feature}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* CTA - Mobile Optimized */}
        <div className="text-center animate-on-scroll px-2">
          <div className="bg-primary rounded-xl md:rounded-2xl p-6 md:p-8 lg:p-12 text-white">
            <h3 className="text-xl md:text-2xl lg:text-3xl font-bold mb-3 md:mb-4">
              Ready to Experience the Difference?
            </h3>
            <p className="text-primary-100 mb-4 md:mb-6 max-w-2xl mx-auto text-sm md:text-lg">
              Join thousands of satisfied users who found their perfect space
              through Onukpa
            </p>
            <div className="flex flex-col sm:flex-row gap-3 md:gap-4 justify-center">
              <button
                onClick={() => window.open("https://wa.me/+233245095569")}
                className="bg-white text-primary px-6 md:px-8 py-2.5 md:py-3 rounded-lg md:rounded-xl font-semibold hover:bg-slate-100 transition-all duration-300 shadow-lg hover:scale-105 text-sm md:text-base"
              >
                Find a Place Now
              </button>
              <button
                onClick={() => {
                  const element = document.getElementById("agents");
                  if (element) {
                    element.scrollIntoView({ behavior: "smooth" });
                  }
                }}
                className="bg-transparent border border-white md:border-2 text-white px-6 md:px-8 py-2.5 md:py-3 rounded-lg md:rounded-xl font-semibold hover:bg-white/10 transition-all duration-300 hover:scale-105 text-sm md:text-base"
              >
                Join as Agent
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Testimonials;
