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

function App() {
  const [showForm, setShowForm] = useState(false)

  useEffect(() => {
    const checkHash = () => setShowForm(window.location.hash === '#apply')
    checkHash()
    window.addEventListener('hashchange', checkHash)
    return () => window.removeEventListener('hashchange', checkHash)
  }, [])

  const openForm = () => {
    window.location.hash = '#apply'
    setShowForm(true)
  }

  const closeForm = () => {
    window.location.hash = ''
    setShowForm(false)
  }

  if (showForm) {
    return <AdmissionForm onBack={closeForm} />
  }

  return (
    <div className="min-h-screen">
      <Navbar onApply={openForm} />
      <TopBanner />

      <main>
        <Hero onApply={openForm} />
        <Stats />
        <Courses />
        <WhySTA />
        <Admission />
        <Instructors />
        <LearningJourney />
        <Internship />
        <Testimonials />
        <Gallery />
        <UpcomingEvent />
        <FAQ />
        <CTASection />
        <Contact />
      </main>

      <Footer />
    </div>
  )
}

export default App