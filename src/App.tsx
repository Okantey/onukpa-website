// App.js
import { useEffect } from "react";
import Navigation from "./components/Layout/Navigation";
import Footer from "./components/Layout/Footer";
import Hero from "./components/Sections/Hero";
import HowItWorks from "./components/Sections/HowItWorks";
import Properties from "./components/Sections/Properties";
import Features from "./components/Sections/Features";
import Stats from "./components/Sections/Stats";
import AgentSection from "./components/Sections/AgentSection";
import Testimonials from "./components/Sections/Testimonials";
import WhatsAppFloatingButton from "./components/UI/WhatsappFloatingButton";

const App = () => {
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("animate-fade-in");
          }
        });
      },
      { threshold: 0.1 }
    );

    document.querySelectorAll(".animate-on-scroll").forEach((el) => {
      observer.observe(el);
    });

    return () => observer.disconnect();
  }, []);

  return (
    <div className="min-h-screen bg-white">
      <WhatsAppFloatingButton />
      <Navigation />
      <Hero />
      <HowItWorks />
      <Properties />
      <Features />
      <Stats />
      <Testimonials />
      <AgentSection />
      <Footer />
    </div>
  );
};

export default App;
