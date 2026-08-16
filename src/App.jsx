import { useState, useEffect } from "react";
import {
  HashRouter as Router,
  Routes,
  Route,
  useNavigate,
  useLocation,
} from "react-router-dom";

import Home from "./pages/Home";
import AdmissionForm from "./pages/AdmissionForm";
import TermsAndConditions from "./pages/TermsAndConditions";
import PrivacyPolicy from "./pages/PrivacyPolicy";
import ComingSoon from "./pages/ComingSoon";

import GetAdmitCardModal from "./components/GetAdmitCardModal";
import SuccessModal from "./components/SuccessModal";
import Loader from "./components/Loader";

import { AnimatePresence } from "framer-motion";

/* ─── Ambient Glow Background ───────────────────────────────── */
function AmbientBackground() {
  return (
    <div
      aria-hidden
      style={{
        position: "fixed",
        inset: 0,
        zIndex: 0,
        pointerEvents: "none",
        background:
          "radial-gradient(ellipse 70% 50% at 50% -10%, rgba(9,86,252,0.05) 0%, transparent 60%)",
      }}
    />
  );
}

/* ─── Force Light Mode ──────────────────────────────────────── */
function ThemeLightModeEnforcer() {
  useEffect(() => {
    document.documentElement.classList.remove("dark");
    localStorage.removeItem("theme");
  }, []);

  return null;
}

/* ─── Main Application ──────────────────────────────────────── */
function MainApp() {
  const [showAdmitModal, setShowAdmitModal] = useState(false);
  const [successData, setSuccessData] = useState(null);

  // Initial website loader
  const [isLoading, setIsLoading] = useState(true);

  const navigate = useNavigate();
  const location = useLocation();

  /* ─── Initial Loader ─────────────────────────────────────── */
  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 1200);

    return () => clearTimeout(timer);
  }, []);

  /* ─── Clear scrollbar lock when routing changes ───────────── */
  useEffect(() => {
    document.body.style.overflow = "";
    window.scrollTo(0, 0);
  }, [location.pathname]);

  return (
    <div className="min-h-screen bg-white text-slate-900 transition-colors duration-500 relative">
      {/* ─── Initial Loader ─────────────────────────────────── */}
      <AnimatePresence>{isLoading && <Loader />}</AnimatePresence>

      <ThemeLightModeEnforcer />

      <AmbientBackground />

      <div style={{ position: "relative", zIndex: 10 }}>
        <Routes>
          {/* ─── Home ────────────────────────────────────────── */}
          <Route
            path="/"
            element={
              <Home
                onOpenApply={() => navigate("/apply")}
                onOpenAdmitCard={() => setShowAdmitModal(true)}
              />
            }
          />

          {/* ─── Admission Form ─────────────────────────────── */}
          <Route
            path="/apply"
            element={
              <AdmissionForm
                onBack={(appId, form) => {
                  navigate("/");

                  if (appId && form) {
                    setSuccessData({ appId, form });
                  }
                }}
              />
            }
          />

          {/* ─── Terms & Conditions ─────────────────────────── */}
          <Route
            path="/terms"
            element={<TermsAndConditions onBack={() => navigate("/")} />}
          />

          {/* ─── Privacy Policy ──────────────────────────────── */}
          <Route
            path="/privacy"
            element={<PrivacyPolicy onBack={() => navigate("/")} />}
          />

          {/* ─── Coming Soon ─────────────────────────────────── */}
          {/* 
          <Route
            path="/coming-soon"
            element={<ComingSoon />}
          />
          */}
        </Routes>
      </div>

      {/* ─── Get Admit Card Modal ────────────────────────────── */}
      <AnimatePresence>
        {showAdmitModal && (
          <GetAdmitCardModal onClose={() => setShowAdmitModal(false)} />
        )}
      </AnimatePresence>

      {/* ─── Admission Success Modal ─────────────────────────── */}
      <AnimatePresence>
        {successData && (
          <SuccessModal
            appId={successData.appId}
            form={successData.form}
            onClose={() => setSuccessData(null)}
            primaryCourseName={
              successData.form?.courses?.[0] ||
              successData.form?.customCourse ||
              "Tech Program"
            }
          />
        )}
      </AnimatePresence>
    </div>
  );
}

/* ─── App ────────────────────────────────────────────────────── */
export default function App() {
  return (
    <Router>
      <MainApp />
    </Router>
  );
}
