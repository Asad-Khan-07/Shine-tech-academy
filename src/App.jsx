import TopBanner from './components/TopBanner'
import Navbar from './components/Navbar'
import Hero from './components/Hero'
import Stats from './components/Stats'
import Courses from './components/Courses'
import WhySTA from './components/WhySTA'
import LearningJourney from './components/LearningJourney'
import Internship from './components/Internship'
import Testimonials from './components/Testimonials'
import Gallery from './components/Gallery'
import UpcomingEvent from './components/UpcomingEvent'
import FAQ from './components/FAQ'
import CTASection from './components/CTASection'
import Contact from './components/Contact'
import Footer from './components/Footer'

function App() {
  return (
    <div className="min-h-screen">
      {/* Top banner is static/sticky at very top */}
      <div className="relative z-50">
        <TopBanner />
      </div>

      {/* Navbar offset below banner */}
      <Navbar />

      <main>
        <Hero />
        <Stats />
        <Courses />
        <WhySTA />
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
