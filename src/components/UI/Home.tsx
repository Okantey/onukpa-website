import Navigation from "../Layout/Navigation";
import Footer from "../Layout/Footer";
import AgentSection from "../Sections/AgentSection";
import Features from "../Sections/Features";
import Hero from "../Sections/Hero";
import HowItWorks from "../Sections/HowItWorks";
import Properties from "../Sections/Properties";
import WhyOnukpa from "../Sections/WhyOnukpa";
import PopularAreas from "../Sections/PopularAreas";
import PricingTransparency from "../Sections/PricingTransparency";
import SaveOurNumber from "../Sections/SaveOurNumber";
import ForLandlords from "../Sections/ForLandlords";
import AddOnServices from "../Sections/AddOnServices";
import FAQ from "../Sections/FAQ";
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
      <WhyOnukpa />
      <Properties />
      <PopularAreas />
      <Features />
      <PricingTransparency />
      <Stats />
      <SaveOurNumber />
      <ForLandlords />
      <AgentSection />
      <AddOnServices />
      <Testimonials />
      <FAQ />
      <Footer />
    </div>
  );
};

export default Home;
