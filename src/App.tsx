// App.js
import { useEffect } from "react";
import { Route, Routes } from "react-router-dom";
import Home from "./components/UI/Home";
import TermsAndPrivacy from "./components/Sections/TermsAndPrivacy";
import PropertyDetail from "./components/Pages/PropertyDetail";
import RegisterAgentPage from "./components/Pages/RegisterAgentPage";
import RegisterLandlordPage from "./components/Pages/RegisterLandlordPage";
import AddPropertyPage from "./components/Pages/AddPropertyPage";

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
    <>
      <Routes>
        <Route path="" element={<Home />} />
        <Route path="/terms" element={<TermsAndPrivacy />} />
        <Route path="/properties/:id" element={<PropertyDetail />} />
        <Route path="/register/agent" element={<RegisterAgentPage />} />
        <Route path="/register/landlord" element={<RegisterLandlordPage />} />
        <Route path="/supplier/add-property/:token" element={<AddPropertyPage />} />
      </Routes>
    </>
  );
};

export default App;
