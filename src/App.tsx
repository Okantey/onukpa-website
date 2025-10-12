// App.js
import { useEffect } from "react";
import { Route, Routes } from "react-router-dom";
import Home from "./components/UI/Home";
import TermsAndPrivacy from "./components/Sections/TermsAndPrivacy";

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
      </Routes>
    </>
  );
};

export default App;
