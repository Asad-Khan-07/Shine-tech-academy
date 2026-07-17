import { useEffect, useRef, useState } from 'react'
import { motion, useInView } from 'framer-motion'
import { ArrowRight, MessageCircle, Rocket } from 'lucide-react'

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
    <section id="cta" className="py-24 px-4 sm:px-6 lg:px-8 dark-section">
      <div className="max-w-4xl mx-auto text-center">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="flex flex-col items-center gap-8"
        >
          {/* Decorative top badge */}
          <span className="section-tag-white">Start Today</span>

          <h2 className="font-space font-extrabold text-4xl sm:text-5xl lg:text-6xl text-white leading-tight">
            Ready to Start Your
            <br />
            <span className="text-blue-400">Tech Journey?</span>
          </h2>

          <p className="text-slate-400 text-base sm:text-lg leading-relaxed max-w-xl">
            Join Shine Tech Academy and gain the skills that open doors to internships, freelancing, and full-time careers in tech.
          </p>

          <div className="flex flex-wrap gap-4 justify-center">
            <motion.a
              whileHover={{ scale: 1.04 }}
              whileTap={{ scale: 0.97 }}
              href="https://forms.google.com"
              target="_blank"
              rel="noopener noreferrer"
              className="btn-primary px-9 py-4 rounded-full text-base shadow-xl shadow-blue-500/20 font-bold flex items-center gap-2"
            >
              <Rocket className="w-4 h-4" /> Apply Now <ArrowRight className="w-4 h-4" />
            </motion.a>
            <motion.button
              whileHover={{ scale: 1.04 }}
              whileTap={{ scale: 0.97 }}
              onClick={() => document.querySelector('#contact')?.scrollIntoView({ behavior: 'smooth' })}
              className="btn-outline-white px-9 py-4 rounded-full text-base font-bold flex items-center gap-2"
            >
              <MessageCircle className="w-4 h-4" /> Contact Us
            </motion.button>
          </div>

          {/* Stats strip */}
          <div className="flex flex-wrap justify-center gap-8 pt-4 border-t border-white/10 w-full mt-2">
            {[
              { end: 10, suffix: '+', label: 'Courses Available' },
              { end: 500, suffix: '+', label: 'Students Enrolled' },
              { end: 100, suffix: '%', label: 'Practical Learning' },
            ].map((s) => (
              <div key={s.label} className="text-center">
                <p className="text-white font-space font-extrabold text-3xl">
                  <CountUp end={s.end} suffix={s.suffix} />
                </p>
                <p className="text-slate-500 text-xs uppercase tracking-widest mt-1">{s.label}</p>
              </div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  )
}
