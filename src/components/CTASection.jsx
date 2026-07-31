import { useEffect, useRef, useState } from 'react'
import { Link } from 'react-router-dom'
import { motion, useInView } from 'framer-motion'
import { ArrowRight, MessageCircle, Rocket, Sparkles } from 'lucide-react'

function CountUp({ end, suffix = '', duration = 2 }) {
  const [count, setCount] = useState(0)
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true })

  useEffect(() => {
    if (!isInView) return
    let start = 0
    const increment = end / (duration * 60)
    const timer = setInterval(() => {
      start += increment
      if (start >= end) {
        setCount(end)
        clearInterval(timer)
      } else {
        setCount(Math.floor(start))
      }
    }, 1000 / 60)
    return () => clearInterval(timer)
  }, [isInView, end, duration])

  return (
    <span ref={ref}>
      {count}{suffix}
    </span>
  )
}

export default function CTASection() {
  return (
    <section id="cta" className="py-20 sm:py-28 px-4 sm:px-6 lg:px-8 dark-section relative overflow-hidden">

      {/* Decorative floating orbs */}
      <div className="absolute top-10 left-10 w-72 h-72 bg-blue-600/10 rounded-full blur-3xl animate-float pointer-events-none" />
      <div className="absolute bottom-10 right-10 w-64 h-64 bg-blue-400/8 rounded-full blur-3xl animate-float pointer-events-none" style={{ animationDelay: '2s' }} />

      {/* Grid pattern overlay */}
      <div className="absolute inset-0 opacity-20 pointer-events-none"
        style={{
          backgroundImage: 'linear-gradient(rgba(61,124,255,0.08) 1px, transparent 1px), linear-gradient(90deg, rgba(61,124,255,0.08) 1px, transparent 1px)',
          backgroundSize: '50px 50px',
        }}
      />

      <div className="max-w-4xl mx-auto text-center relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7, ease: [0.4, 0, 0.2, 1] }}
          className="flex flex-col items-center gap-8"
        >
          {/* Badge */}
          <motion.span
            className="section-tag-white flex justify-center items-center gap-2"
            initial={{ scale: 0.8, opacity: 0 }}
            whileInView={{ scale: 1, opacity: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1, duration: 0.4 }}
          >
            <Sparkles className="w-3.5 h-3.5 text-blue-400" />
            Start Your Journey Today
          </motion.span>

          <h2 className="font-space font-extrabold text-3xl sm:text-4xl lg:text-5xl xl:text-6xl text-white leading-tight px-2">
            Build Your Future with
            <br />
            <span className="relative inline-block">
              <span className="text-blue-400">Shine Tech Academy</span>
              <motion.span
                className="absolute -bottom-2 left-0 h-1 bg-gradient-to-r from-blue-500 to-blue-300 rounded-full"
                initial={{ width: 0 }}
                whileInView={{ width: '100%' }}
                viewport={{ once: true }}
                transition={{ duration: 0.8, delay: 0.5 }}
              />
            </span>
          </h2>

          <p className="text-slate-400 text-base sm:text-lg leading-relaxed max-w-xl">
            Take the first step toward a successful career in technology. Learn in-demand skills, work on real-world projects, build a professional portfolio, and prepare for internships, freelancing, or your dream job—all with expert guidance.
          </p>

          <div className="flex flex-col sm:flex-row flex-wrap gap-3 sm:gap-4 justify-center w-full sm:w-auto">
            <motion.div
              whileHover={{ scale: 1.05, y: -4 }}
              whileTap={{ scale: 0.97 }}
            >
              <Link
                to="/apply"
                className="btn-primary px-8 sm:px-10 py-3.5 sm:py-4 rounded-full text-sm sm:text-base shadow-2xl shadow-blue-500/30 font-bold flex items-center justify-center gap-2 w-full sm:w-auto"
              >
                <Rocket className="w-5 h-5 relative z-10" />
                <span className="relative z-10">Apply for Admission</span>
                <ArrowRight className="w-5 h-5 relative z-10" />
              </Link>
            </motion.div>
            <motion.button
              whileHover={{ scale: 1.05, y: -4 }}
              whileTap={{ scale: 0.97 }}
              onClick={() => document.querySelector('#contact')?.scrollIntoView({ behavior: 'smooth' })}
              className="btn-outline-white px-8 sm:px-10 py-3.5 sm:py-4 rounded-full text-sm sm:text-base font-bold flex items-center justify-center gap-2 w-full sm:w-auto"
            >
              <MessageCircle className="w-5 h-5" />
Contact Our Team
            </motion.button>
          </div>

          {/* Stats strip */}
          <div className="grid grid-cols-3 gap-4 sm:gap-8 pt-6 border-t border-white/10 w-full mt-2">
            {[
              { end: 10, suffix: '+', label: 'Professional Courses' },
              { end: 500, suffix: '+', label: 'Students Trained' },
              { end: 100, suffix: '%', label: 'Practical Learning' },
            ].map((s) => (
              <motion.div
                key={s.label}
                className="text-center group"
                whileHover={{ y: -4, scale: 1.05 }}
                transition={{ duration: 0.2 }}
              >
                <p className="text-white font-space font-extrabold text-2xl sm:text-3xl lg:text-4xl group-hover:text-blue-300 transition-colors">
                  <CountUp end={s.end} suffix={s.suffix} />
                </p>
                <p className="text-slate-500 text-xs uppercase tracking-widest mt-1 group-hover:text-slate-400 transition-colors">{s.label}</p>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  )
}
