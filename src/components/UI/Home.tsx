import Navigation from "../Layout/Navigation";
import Footer from "../Layout/Footer";
import AgentSection from "../Sections/AgentSection";
import Features from "../Sections/Features";
import Hero from "../Sections/Hero";
import HowItWorks from "../Sections/HowItWorks";
import Properties from "../Sections/Properties";
import Stats from "../Sections/Stats";
import Testimonials from "../Sections/Testimonials";
import WhatsAppFloatingButton from "./WhatsappFloatingButton";

const Home = () => {
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

export default Home;
