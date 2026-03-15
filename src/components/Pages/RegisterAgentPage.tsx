import Navigation from "../Layout/Navigation";
import Footer from "../Layout/Footer";
import WhatsAppFloatingButton from "../UI/WhatsappFloatingButton";
import AgentSection from "../Sections/AgentSection";

const RegisterAgentPage = () => {
  return (
    <div className="min-h-screen bg-white">
      <WhatsAppFloatingButton />
      <Navigation />
      <main className="pb-16 px-4 sm:px-6 lg:px-8 pt-4">
        <div className="max-w-6xl mx-auto">
          <AgentSection />
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default RegisterAgentPage;

