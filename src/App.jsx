import { useState, useEffect } from 'react'
import TopBanner from './components/TopBanner'
import Navbar from './components/Navbar'
import Hero from './components/Hero'
import Stats from './components/Stats'
import Courses from './components/Courses'
import WhySTA from './components/WhySTA'
import Admission from './components/Admission'
import Instructors from './components/Instructors'
import LearningJourney from './components/LearningJourney'
import Internship from './components/Internship'
import Testimonials from './components/Testimonials'
import Gallery from './components/Gallery'
import UpcomingEvent from './components/UpcomingEvent'
import FAQ from './components/FAQ'
import CTASection from './components/CTASection'
import Contact from './components/Contact'
import Footer from './components/Footer'
import AdmissionForm from './components/AdmissionForm'
import GetAdmitCardModal from './components/GetAdmitCardModal'
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

function App() {
  const [showForm, setShowForm] = useState(false)
  const [showAdmitModal, setShowAdmitModal] = useState(false)

  useEffect(() => {
    const checkHash = () => {
      const isForm = window.location.hash === '#apply'
      setShowForm(isForm)
      if (isForm) {
        document.body.style.overflow = ''
        window.scrollTo(0, 0)
      }
    }
    checkHash()
    window.addEventListener('hashchange', checkHash)
    return () => window.removeEventListener('hashchange', checkHash)
  }, [])

  const openForm = () => {
    document.body.style.overflow = ''
    window.location.hash = '#apply'
    setShowForm(true)
    window.scrollTo(0, 0)
  }

  const closeForm = () => {
    document.body.style.overflow = ''
    window.location.hash = ''
    setShowForm(false)
    window.scrollTo(0, 0)
  }

  if (showForm) {
    return <AdmissionForm onBack={closeForm} />
  }

  return (
    <div className="min-h-screen bg-white text-slate-900 transition-colors duration-500 relative">
      {/* Remove html dark class on mount to ensure light mode only */}
      <ThemeLightModeEnforcer />

      {/* ── Ambient background orbs ── */}
      <AmbientBackground />

      {/* ── Page content ── */}
      <div style={{ position: 'relative', zIndex: 1 }}>
        <Navbar onApply={openForm} onGetCard={() => setShowAdmitModal(true)} />
        <TopBanner />

        <main>
          <Hero onApply={openForm} />
          <Stats />
          <Courses onApply={openForm} />
          <WhySTA />
          <Admission />
          <Instructors />
          <LearningJourney />
          <Internship />
          <Testimonials />
          {/* <Gallery /> */}
          <UpcomingEvent />
          <FAQ />
          <CTASection />
          <Contact />
        </main>

        <Footer />
      </div>

      {/* Get Admit Card Modal */}
      <AnimatePresence>
        {showAdmitModal && (
          <GetAdmitCardModal onClose={() => setShowAdmitModal(false)} />
        )}
      </AnimatePresence>
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

export default App