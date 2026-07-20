import { useState, useEffect } from 'react'
import { Menu, X, Rocket } from 'lucide-react'

const NAV_LINKS = [
  { label: 'Home',       href: '#hero' },
  { label: 'About',      href: '#why-sta' },
  { label: 'Courses',    href: '#courses' },
  { label: 'Admissions', href: '#admission' },
  { label: 'Instructors', href: '#instructors' },
  { label: 'Contact',    href: '#contact' },
]

export default function Navbar() {
  const [scrolled,  setScrolled]  = useState(false)
  const [menuOpen,  setMenuOpen]  = useState(false)

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40)
    window.addEventListener('scroll', onScroll)
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  const handleNav = (href) => {
    setMenuOpen(false)
    document.querySelector(href)?.scrollIntoView({ behavior: 'smooth' })
  }

  return (
    <nav
      className={`sticky top-0 z-50 w-full transition-all duration-300 ${
        scrolled ? 'bg-white shadow-md' : 'bg-white'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-[70px]">

          {/* Logo */}
          <button onClick={() => handleNav('#hero')} className="flex items-center gap-3 group flex-shrink-0 text-left self-center">
            <img src="/SHINE-website-logo-.gif" alt="Shine Tech Academy" className="h-10 w-auto" />
          </button>

          {/* Desktop Nav */}
          <div className="hidden md:flex items-center gap-7 self-center">
            {NAV_LINKS.map((link) => (
              <button
                key={link.label}
                onClick={() => handleNav(link.href)}
                className="text-slate-600 hover:text-blue-600 text-sm font-semibold transition-colors duration-200"
              >
                {link.label}
              </button>
            ))}
          </div>

          {/* Apply Now */}
          <div className="hidden md:block self-center">
          <a
            href="#apply"
            className="bg-blue-600 hover:bg-blue-700 text-white text-sm font-bold px-6 py-2.5 rounded-full transition-all hover:shadow-lg hover:shadow-blue-500/25 hover:-translate-y-0.5 flex items-center gap-2"
          >
              <Rocket className="w-4 h-4" /> Apply Now
            </a>
          </div>

          {/* Mobile Hamburger */}
          <button
            onClick={() => setMenuOpen(!menuOpen)}
            className="md:hidden p-2 rounded-lg text-slate-700 hover:bg-slate-100 transition-colors"
          >
            {menuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      {menuOpen && (
        <div className="md:hidden bg-white border-t border-gray-100 px-4 py-4 flex flex-col gap-1 shadow-xl">
          {NAV_LINKS.map((link) => (
            <button
              key={link.label}
              onClick={() => handleNav(link.href)}
              className="text-slate-700 hover:text-blue-600 hover:bg-blue-50 text-base font-semibold py-3 px-3 rounded-lg text-left transition-colors"
            >
              {link.label}
            </button>
          ))}
          <a
            href="#apply"
            className="bg-blue-600 text-white text-center text-sm font-bold py-3.5 rounded-full mt-2 hover:bg-blue-700 transition-colors flex items-center justify-center gap-2"
          >
            <Rocket className="w-4 h-4" /> Apply Now
          </a>
        </div>
      )}
    </nav>
  )
}
