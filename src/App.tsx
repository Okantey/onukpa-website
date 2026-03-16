// App.js
import { useEffect } from "react";
import { Route, Routes } from "react-router-dom";
import Home from "./components/UI/Home";
import TermsAndPrivacy from "./components/Sections/TermsAndPrivacy";
import PropertyDetail from "./components/Pages/PropertyDetail";
import RegisterAgentPage from "./components/Pages/RegisterAgentPage";
import RegisterLandlordPage from "./components/Pages/RegisterLandlordPage";
import AddPropertyPage from "./components/Pages/AddPropertyPage";
import AdminLayout from "./admin/components/AdminLayout";
import OverviewPage from "./admin/pages/OverviewPage";
import RequestsPage from "./admin/pages/RequestsPage";
import PropertiesPage from "./admin/pages/PropertiesPage";
import SuppliersPage from "./admin/pages/SuppliersPage";
import MatchesPage from "./admin/pages/MatchesPage";
import FeesPage from "./admin/pages/FeesPage";
import AnalyticsPage from "./admin/pages/AnalyticsPage";
import AuditPage from "./admin/pages/AuditPage";
import { AuthProvider } from "./admin/context/AuthContext";
import AdminRouteGuard from "./admin/components/AdminRouteGuard";
import LoginPage from "./admin/pages/LoginPage";
import { Outlet } from "react-router-dom";

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
        
        <Route path="/admin" element={
          <AuthProvider>
            <Outlet />
          </AuthProvider>
        }>
          <Route path="login" element={<LoginPage />} />
          <Route element={<AdminRouteGuard />}>
            <Route element={<AdminLayout />}>
              <Route index element={<OverviewPage />} />
              <Route path="requests" element={<RequestsPage />} />
              <Route path="properties" element={<PropertiesPage />} />
              <Route path="suppliers" element={<SuppliersPage />} />
              <Route path="matches" element={<MatchesPage />} />
              <Route path="fees" element={<FeesPage />} />
              <Route path="analytics" element={<AnalyticsPage />} />
              <Route path="audit" element={<AuditPage />} />
            </Route>
          </Route>
        </Route>
      </Routes>
    </>
  );
};

export default App;
