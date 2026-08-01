import { useState, useEffect } from 'react'
import { HashRouter as Router, Routes, Route, useNavigate, useLocation } from 'react-router-dom'
import Home from './pages/Home'
import AdmissionForm from './pages/AdmissionForm'
import TermsAndConditions from './pages/TermsAndConditions'
import PrivacyPolicy from './pages/PrivacyPolicy'
import ComingSoon from './pages/ComingSoon'
import GetAdmitCardModal from './components/GetAdmitCardModal'
import SuccessModal from './components/SuccessModal'
import { AnimatePresence } from 'framer-motion'

/* ─── Ambient Glow Background ───────────────────────────────── */
function AmbientBackground() {
  return (
    <div
      style={{
        position: 'fixed',
        inset: 0,
        zIndex: 0,
        pointerEvents: 'none',
        overflow: 'hidden',
      }}
    >
      <div className="bg-orb bg-orb-1" />
      <div className="bg-orb bg-orb-2 animate-pulse" />
      <div className="bg-orb bg-orb-3" />
    </div>
  )
}

// Small helper component to ensure html has no 'dark' class
function ThemeLightModeEnforcer() {
  useEffect(() => {
    document.documentElement.classList.remove('dark')
    localStorage.removeItem('theme')
  }, [])
  return null
}

function MainApp() {
  const [showAdmitModal, setShowAdmitModal] = useState(false)
  const [successData, setSuccessData] = useState(null)
  const navigate = useNavigate()
  const location = useLocation()

  // Clear scrollbar lock when routing changes
  useEffect(() => {
    document.body.style.overflow = ''
    window.scrollTo(0, 0)
  }, [location.pathname])

  return (
    <div className="min-h-screen bg-white text-slate-900 transition-colors duration-500 relative">
      <ThemeLightModeEnforcer />
      <AmbientBackground />

      <div style={{ position: 'relative', zIndex: 10 }}>
        <Routes>
          <Route
            path="/"
            element={
              <Home
                onOpenApply={() => navigate('/apply')}
                onOpenAdmitCard={() => setShowAdmitModal(true)}
              />
            }
          />
          <Route
            path="/apply"
            element={
              <AdmissionForm
                onBack={(appId, form) => {
                  navigate('/')
                  if (appId && form) {
                    setSuccessData({ appId, form })
                  }
                }}
              />
            }
          />
          <Route
            path="/terms"
            element={<TermsAndConditions onBack={() => navigate('/')} />}
          />
          <Route
            path="/privacy"
            element={<PrivacyPolicy onBack={() => navigate('/')} />}
          />
          <Route
            path="/coming-soon"
            element={<ComingSoon />}
          />
        </Routes>
      </div>

      {/* Get Admit Card Modal */}
      <AnimatePresence>
        {showAdmitModal && (
          <GetAdmitCardModal onClose={() => setShowAdmitModal(false)} />
        )}
      </AnimatePresence>

      {/* Admission Success Modal */}
      <AnimatePresence>
        {successData && (
          <SuccessModal
            appId={successData.appId}
            form={successData.form}
            onClose={() => setSuccessData(null)}
            primaryCourseName={
              successData.form?.courses?.[0] ||
              successData.form?.customCourse ||
              'Tech Program'
            }
          />
        )}
      </AnimatePresence>
    </div>
  )
}

export default function App() {
  return (
    <Router>
      <MainApp />
    </Router>
  )
}