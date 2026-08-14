import { useState, useEffect } from "react";
import { Menu, X, Rocket, ChevronDown, CreditCard } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

const NAV_LINKS = [
  { label: "Home", href: "#hero" },
  // { label: "About", href: "#why-sta" },
  { label: "Courses", href: "#courses" },
  { label: "Admissions", href: "#admission" },
  { label: "Instructors", href: "#instructors" },
  { label: "Contact", href: "#contact" },
];

export default function Navbar({ onApply, onGetCard }) {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    let ticking = false;
    const onScroll = () => {
      if (ticking) return;
      ticking = true;
      requestAnimationFrame(() => {
        setScrolled(window.scrollY > 40);
        ticking = false;
      });
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    onScroll();
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const handleNav = (href) => {
    setMenuOpen(false);
    document.querySelector(href)?.scrollIntoView({ behavior: "smooth" });
  };

  const handleApplyClick = (e) => {
    setMenuOpen(false);
    if (onApply) {
      onApply(e);
    } else {
      handleNav("#apply");
    }
  };

  return (
    <nav
      className={`sticky top-0 z-50 w-full transition-all duration-500 ${
        scrolled
          ? "bg-white/85 backdrop-blur-xl shadow-lg shadow-blue-500/5 border-b border-blue-100/50"
          : "bg-white/70 backdrop-blur-md border-b border-white/60"
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-[72px]">
          {/* Logo */}
          <motion.button
            type="button"
            onClick={() => handleNav("#hero")}
            className="flex items-center gap-3 group flex-shrink-0 text-left self-center"
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
          >
            <img
              src="/STA-logo.png"
              alt="Shine Tech Academy"
              className="h-10 w-auto object-contain drop-shadow-sm cursor-pointer"
            />
          </motion.button>

          {/* Desktop Nav */}
          <div className="hidden lg:flex items-center gap-1 self-center">
            {NAV_LINKS.map((link) => (
              <button
                key={link.label}
                type="button"
                onClick={() => handleNav(link.href)}
                className="nav-link-premium cursor-pointer animated-underline text-slate-600 hover:text-blue-600 text-xs lg:text-sm font-semibold transition-all duration-200 px-2.5 lg:px-4 py-2 rounded-xl hover:bg-blue-50/70"
              >
                {link.label}
              </button>
            ))}
          </div>

          {/* Desktop CTA buttons */}
          <div className="hidden lg:flex items-center gap-2 self-center">
            <motion.button
              type="button"
              onClick={onGetCard}
              whileHover={{ scale: 1.04, y: -2 }}
              whileTap={{ scale: 0.96 }}
              className="flex items-center gap-1.5 px-4 py-2.5 rounded-full text-sm font-semibold border border-blue-500/40 text-blue-600 hover:bg-blue-50 hover:border-blue-500 transition-all duration-200 cursor-pointer"
            >
              <CreditCard className="w-3.5 h-3.5" />
              <span>Get Admit Card</span>
            </motion.button>
            <a
              href="#apply"
              onClick={handleApplyClick}
              className="btn-primary px-6 py-2.5 rounded-full text-sm shadow-lg shadow-blue-500/25 flex items-center gap-2 relative overflow-hidden"
            >
              <Rocket className="w-4 h-4 relative z-10" />
              <span className="relative z-10">Apply Now</span>
            </a>
          </div>

          {/* Mobile Hamburger */}
          <motion.button
            type="button"
            onClick={() => setMenuOpen(!menuOpen)}
            aria-label={
              menuOpen ? "Close Navigation Menu" : "Open Navigation Menu"
            }
            aria-expanded={menuOpen}
            className="lg:hidden p-2.5 rounded-xl text-slate-700 hover:bg-blue-50 transition-all border border-transparent hover:border-blue-100 cursor-pointer"
            whileTap={{ scale: 0.9 }}
          >
            <AnimatePresence mode="wait">
              {menuOpen ? (
                <motion.div
                  key="close"
                  initial={{ rotate: -90, opacity: 0 }}
                  animate={{ rotate: 0, opacity: 1 }}
                  exit={{ rotate: 90, opacity: 0 }}
                  transition={{ duration: 0.1 }}
                >
                  <X className="w-6 h-6" />
                </motion.div>
              ) : (
                <motion.div
                  key="menu"
                  initial={{ rotate: 90, opacity: 0 }}
                  animate={{ rotate: 0, opacity: 1 }}
                  exit={{ rotate: -90, opacity: 0 }}
                  transition={{ duration: 0.1 }}
                >
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
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.14, ease: [0.4, 0, 0.2, 1] }}
            className="lg:hidden overflow-hidden bg-white/95 backdrop-blur-xl border-t border-blue-50 shadow-xl shadow-blue-500/10"
          >
            <div className="px-4 py-4 flex flex-col gap-1">
              {NAV_LINKS.map((link, i) => (
                <motion.button
                  key={link.label}
                  type="button"
                  initial={{ opacity: 0, x: -8 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: i * 0.015, duration: 0.12 }}
                  onClick={() => handleNav(link.href)}
                  className="text-slate-700 hover:text-blue-600 hover:bg-blue-50 text-base font-semibold py-3 px-4 rounded-xl text-left transition-all flex items-center justify-between group cursor-pointer"
                >
                  {link.label}
                  <ChevronDown className="w-4 h-4 text-slate-400 group-hover:text-blue-500 -rotate-90 transition-transform" />
                </motion.button>
              ))}
              <motion.div
                initial={{ opacity: 0, y: 6 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: NAV_LINKS.length * 0.015, duration: 0.12 }}
                className="flex items-center gap-2 mt-1"
              >
                <button
                  type="button"
                  onClick={() => {
                    setMenuOpen(false);
                    onGetCard?.();
                  }}
                  className="flex-1 flex items-center justify-center gap-1.5 border border-blue-500/40 text-blue-600 text-xs xs:text-sm font-semibold py-3 rounded-full hover:bg-blue-50 transition-all whitespace-nowrap cursor-pointer"
                >
                  <CreditCard className="w-4 h-4 flex-shrink-0" />
                  Get Admit Card
                </button>
                <a
                  href="#apply"
                  onClick={handleApplyClick}
                  className="btn-primary flex-1 text-center text-xs xs:text-sm font-bold py-3 rounded-full flex items-center justify-center gap-1.5 shadow-lg shadow-blue-500/20 whitespace-nowrap"
                >
                  <Rocket className="w-4 h-4 relative z-10 flex-shrink-0" />
                  <span className="relative z-10">Apply Now</span>
                </a>
              </motion.div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
}
