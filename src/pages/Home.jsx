import TopBanner from "../components/TopBanner";
import Navbar from "../components/Navbar";
import Hero from "../components/Hero";
import Stats from "../components/Stats";
import Courses from "../components/Courses";
import FoundingBatch from "../components/FoundingBatch";
import Admission from "../components/Admission";
import LearningJourney from "../components/LearningJourney";
import Internship from "../components/Internship";
import Testimonials from "../components/Testimonials";
import FAQ from "../components/FAQ";
import CTASection from "../components/CTASection";
import Contact from "../components/Contact";
import Footer from "../components/Footer";
import Partners from "../components/Partner";
import Seo from "../components/Seo";

export default function Home({ onOpenApply, onOpenAdmitCard }) {
  return (
    <>
      {/* ─── SEO ─────────────────────────────────────────────── */}
      <Seo
        title="AI, Web Development & Tech Courses in Hyderabad"
        description="Shine Tech Academy Hyderabad offers practical AI, Web Development, Computer, Digital Marketing, Robotics and professional technology courses with physical and online learning."
        keywords="Shine Tech Academy, Shine Tech Academy Hyderabad, computer courses Hyderabad, AI courses Hyderabad, web development courses Hyderabad, digital marketing courses Hyderabad, robotics courses Hyderabad, graphic designing courses Hyderabad, Python courses Hyderabad, Microsoft Office course Hyderabad"
        url="https://shinetechacademy.com/"
        image="https://shinetechacademy.com/STA-logo.png"
        type="website"
      />
      {/* ─── JSON-LD Structured Data ────────────────────────── */}
      <script type="application/ld+json">
        {JSON.stringify({
          "@context": "https://schema.org",
          "@type": "EducationalOrganization",
          name: "Shine Tech Academy",
          alternateName: "STA",
          url: "https://shinetechacademy.com",
          logo: "https://shinetechacademy.com/sta-logo.svg",
          description:
            "Pakistan's next-generation tech institute offering practical courses in Web Development, AI, Robotics, Digital Marketing, and more.",
          foundingDate: "2026",
          address: {
            "@type": "PostalAddress",
            addressCountry: "PK",
          },
          sameAs: [
            "https://www.facebook.com/shinetechacademy",
            "https://www.instagram.com/shinetechacademy",
            "https://www.linkedin.com/company/shinetechacademy",
          ],
        })}
      </script>

      {/* ─── Page Content ────────────────────────────────────── */}
      <Navbar onApply={onOpenApply} onGetCard={onOpenAdmitCard} />
      <TopBanner />
      <main>
        <Hero onApply={onOpenApply} />
        <Stats />
        <Partners />
        <FoundingBatch />
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
  );
}
