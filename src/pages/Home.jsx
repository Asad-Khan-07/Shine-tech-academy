import TopBanner from '../components/TopBanner'
import Navbar from '../components/Navbar'
import Hero from '../components/Hero'
import Stats from '../components/Stats'
import Courses from '../components/Courses'
import Admission from '../components/Admission'
import LearningJourney from '../components/LearningJourney'
import Internship from '../components/Internship'
import Testimonials from '../components/Testimonials'
import FAQ from '../components/FAQ'
import CTASection from '../components/CTASection'
import Contact from '../components/Contact'
import Footer from '../components/Footer'
import GetAdmitCardModal from '../components/GetAdmitCardModal'
import { useState } from 'react'
import { AnimatePresence } from 'framer-motion'

export default function Home({ onOpenApply, onOpenAdmitCard }) {
  return (
    <>
      <Navbar onApply={onOpenApply} onGetCard={onOpenAdmitCard} />
      <TopBanner />
      <main>
        <Hero onApply={onOpenApply} />
        <Stats />
        <Courses onApply={onOpenApply} />
        <Admission />
        <LearningJourney />
        <Internship />
        <Testimonials />
        <FAQ />
        <CTASection />
        <Contact />
      </main>
      <Footer />
    </>
  )
}
