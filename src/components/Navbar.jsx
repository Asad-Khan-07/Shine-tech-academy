import { useState, useEffect } from 'react'
import { Menu, X, Rocket, ChevronDown } from 'lucide-react'
import { motion, AnimatePresence } from 'framer-motion'

const NAV_LINKS = [
  { label: 'Home',       href: '#hero' },
  { label: 'About',      href: '#why-sta' },
  { label: 'Courses',    href: '#courses' },
  { label: 'Admissions', href: '#admission' },
  { label: 'Instructors', href: '#instructors' },
  { label: 'Contact',    href: '#contact' },
]

export default function Navbar({ onApply }) {
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
      className={`sticky top-0 z-50 w-full transition-all duration-500 ${
        scrolled
          ? 'bg-white/85 backdrop-blur-xl shadow-lg shadow-blue-500/5 border-b border-blue-100/50'
          : 'bg-white/70 backdrop-blur-md border-b border-white/60'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-[72px]">

          {/* Logo */}
          <motion.button
            onClick={() => handleNav('#hero')}
            className="flex items-center gap-3 group flex-shrink-0 text-left self-center"
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
          >
            <img src="/SHINE-website-logo-.gif" alt="Shine Tech Academy" className="h-10 w-auto drop-shadow-sm" />
          </motion.button>

          {/* Desktop Nav */}
          <div className="hidden md:flex items-center gap-1 self-center">
            {NAV_LINKS.map((link) => (
              <button
                key={link.label}
                onClick={() => handleNav(link.href)}
                className="nav-link-premium animated-underline text-slate-600 hover:text-blue-600 text-sm font-semibold transition-all duration-200 px-4 py-2 rounded-xl hover:bg-blue-50/70"
              >
                {link.label}
              </button>
            ))}
          </div>

          {/* Apply Now */}
          <div className="hidden md:block self-center">
            <motion.a
              href="#apply"
              onClick={onApply}
              whileHover={{ scale: 1.04, y: -2 }}
              whileTap={{ scale: 0.96 }}
              className="btn-primary px-6 py-2.5 rounded-full text-sm shadow-lg shadow-blue-500/25 flex items-center gap-2 relative overflow-hidden"
            >
              <Rocket className="w-4 h-4 relative z-10" />
              <span className="relative z-10">Apply Now</span>
            </motion.a>
          </div>

          {/* Mobile Hamburger */}
          <motion.button
            onClick={() => setMenuOpen(!menuOpen)}
            className="md:hidden p-2.5 rounded-xl text-slate-700 hover:bg-blue-50 transition-all border border-transparent hover:border-blue-100"
            whileTap={{ scale: 0.9 }}
          >
            <AnimatePresence mode="wait">
              {menuOpen ? (
                <motion.div key="close" initial={{ rotate: -90, opacity: 0 }} animate={{ rotate: 0, opacity: 1 }} exit={{ rotate: 90, opacity: 0 }} transition={{ duration: 0.15 }}>
                  <X className="w-6 h-6" />
                </motion.div>
              ) : (
                <motion.div key="menu" initial={{ rotate: 90, opacity: 0 }} animate={{ rotate: 0, opacity: 1 }} exit={{ rotate: -90, opacity: 0 }} transition={{ duration: 0.15 }}>
                  <Menu className="w-6 h-6" />
                </motion.div>
              )}
            </AnimatePresence>
          </motion.button>
        </div>
      </div>

      {/* Mobile Menu */}
      <AnimatePresence>
        {menuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.25, ease: 'easeOut' }}
            className="md:hidden overflow-hidden bg-white/95 backdrop-blur-xl border-t border-blue-50 shadow-xl shadow-blue-500/10"
          >
            <div className="px-4 py-4 flex flex-col gap-1">
              {NAV_LINKS.map((link, i) => (
                <motion.button
                  key={link.label}
                  initial={{ opacity: 0, x: -12 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: i * 0.04 }}
                  onClick={() => handleNav(link.href)}
                  className="text-slate-700 hover:text-blue-600 hover:bg-blue-50 text-base font-semibold py-3 px-4 rounded-xl text-left transition-all flex items-center justify-between group"
                >
                  {link.label}
                  <ChevronDown className="w-4 h-4 text-slate-400 group-hover:text-blue-500 -rotate-90 transition-transform" />
                </motion.button>
              ))}
              <motion.a
                href="#apply"
                initial={{ opacity: 0, y: 8 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: NAV_LINKS.length * 0.04 }}
                className="btn-primary text-center text-sm font-bold py-3.5 rounded-full mt-2 flex items-center justify-center gap-2 shadow-lg shadow-blue-500/20"
              >
                <Rocket className="w-4 h-4 relative z-10" />
                <span className="relative z-10">Apply Now</span>
              </motion.a>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  )
}
