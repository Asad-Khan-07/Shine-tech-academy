import { useEffect, useRef, useState } from 'react'
import { Link } from 'react-router-dom'
import { motion, useInView, useMotionValue, animate } from 'framer-motion'
import { Rocket, Sparkles, Star, BookOpen, Award, Users, CheckCircle } from 'lucide-react'

/* ── Animated floating card ── */
function FloatCard({ children, className = '', delay = 0, yRange = [-8, 8] }) {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.85 }}
      animate={{ opacity: 1, scale: 1, y: [yRange[0], yRange[1], yRange[0]] }}
      transition={{
        opacity: { duration: 0.5, delay },
        scale:   { duration: 0.5, delay },
        y:       { duration: 4 + delay, repeat: Infinity, ease: 'easeInOut', delay: delay * 0.5 },
      }}
      className={className}
    >
      {children}
    </motion.div>
  )
}

/* ── Count-up hook ── */
function useCountUp(target, { decimals = 0, duration = 1.8, delay = 0 } = {}) {
  const ref = useRef(null)
  const inView = useInView(ref, { once: true, margin: '-60px' })
  const motionVal = useMotionValue(0)
  const [display, setDisplay] = useState('0')

  useEffect(() => {
    if (!inView) return
    const controls = animate(motionVal, target, {
      duration,
      delay,
      ease: 'easeOut',
      onUpdate: (v) => setDisplay(decimals > 0 ? v.toFixed(decimals) : Math.round(v).toString()),
    })
    return controls.stop
  }, [inView])

  return { ref, display }
}

/* ── Animated stat pill with count-up ── */
function StatPill({ icon: Icon, target, suffix = '', decimals = 0, label, delay = 0, isRating = false }) {
  const { ref, display } = useCountUp(target, { decimals, duration: 1.6, delay })
  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 24 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay, duration: 0.5 }}
      whileHover={{ y: -5, scale: 1.04 }}
      className="flex flex-col xs:flex-row items-center xs:items-start sm:items-center gap-2 xs:gap-3 bg-white/90 backdrop-blur-sm border border-blue-100 shadow-lg shadow-blue-500/8 rounded-2xl p-3 xs:p-4 sm:px-5 sm:py-4 min-w-0 flex-1"
    >
      <div className="w-9 h-9 xs:w-11 xs:h-11 rounded-xl flex items-center justify-center flex-shrink-0" style={{ background: '#0956fc' }}>
        <Icon className="w-4.5 h-4.5 xs:w-5 xs:h-5 text-white" />
      </div>
      <div className="min-w-0 text-center xs:text-left">
        <p className="text-slate-900 font-black text-xl xs:text-2xl sm:text-3xl leading-none tracking-tight flex items-center justify-center xs:justify-start gap-1">
          <span>{display}{suffix}</span>
          {isRating && <Star className="w-5 h-5 xs:w-6 xs:h-6 text-[#0956fc] fill-[#0956fc] inline-block align-middle" />}
        </p>
        <p className="text-slate-500 text-[10px] xs:text-xs sm:text-sm font-semibold mt-1 leading-tight break-words">{label}</p>
      </div>
    </motion.div>
  )
}

/* ── Tech tag chip ── */
function TechTag({ label, delay }) {
  return (
    <motion.span
      initial={{ opacity: 0, scale: 0.8 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ delay, duration: 0.4 }}
      className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-semibold bg-white border border-blue-100 text-blue-700 shadow-sm"
    >
      <span className="w-1.5 h-1.5 rounded-full bg-blue-500 inline-block" />
      {label}
    </motion.span>
  )
}

const TECH_TAGS = [
  'Web Development', 'Graphic Design', 'SEO Marketing',
  'Data Science', 'Python', 'React.js', 'UI/UX Design', 'Ms Office',
]

const STATS = [
  { icon: Users,    target: 500, suffix: '+', decimals: 0, label: 'Students Enrolled',  delay: 0.7  },
  { icon: Award,    target: 100, suffix: '%', decimals: 0, label: 'Internship Rate',    delay: 0.85 },
  { icon: BookOpen, target: 10,  suffix: '+', decimals: 0, label: 'Courses Available',  delay: 1.0  },
  { icon: Star,     target: 5.0, suffix: '',  decimals: 1, label: 'Student Rating',     delay: 1.15, isRating: true },
]

export default function Hero({ onApply }) {
  return (
    <section
      id="hero"
      className="relative min-h-[100dvh] flex items-center justify-center overflow-hidden pt-20 pb-10"
    >
      {/* ── Background — pure CSS, zero JS overhead ── */}
      <div className="absolute inset-0 z-0 overflow-hidden">
        {/* Base gradient */}
        <div
          className="absolute inset-0"
          style={{
            background:
              'radial-gradient(ellipse 75% 55% at 50% -5%, rgba(9,86,252,0.10) 0%, transparent 65%), #f8faff',
          }}
        />

        {/* Subtle grid */}
        <div
          className="absolute inset-0 opacity-[0.035]"
          style={{
            backgroundImage:
              'linear-gradient(#0956fc 1px, transparent 1px), linear-gradient(90deg, #0956fc 1px, transparent 1px)',
            backgroundSize: '64px 64px',
          }}
        />

        {/* Blob 1 — top-left, large, very soft */}
        <div
          className="hero-blob-1 absolute rounded-full blur-[110px] pointer-events-none"
          style={{
            width: 520, height: 520,
            top: '-12%', left: '-8%',
            background: 'rgba(9,86,252,0.09)',
          }}
        />

        {/* Blob 2 — bottom-right */}
        <div
          className="hero-blob-2 absolute rounded-full blur-[90px] pointer-events-none"
          style={{
            width: 400, height: 400,
            bottom: '-5%', right: '-5%',
            background: 'rgba(99,102,241,0.07)',
          }}
        />

        {/* Blob 3 — center-right, smallest */}
        <div
          className="hero-blob-3 absolute rounded-full blur-[70px] pointer-events-none"
          style={{
            width: 260, height: 260,
            top: '35%', right: '12%',
            background: 'rgba(59,130,246,0.07)',
          }}
        />

        {/* Slow-rotating dashed ring */}
        <div
          className="hero-ring absolute pointer-events-none opacity-[0.06]"
          style={{
            width: 500, height: 500,
            top: '50%', left: '50%',
            marginTop: -250, marginLeft: -250,
            borderRadius: '50%',
            border: '1.5px dashed #0956fc',
          }}
        />

        {/* Floating particles — 6 dots, pure CSS */}
        {[
          { size: 5,  left: '18%', top: '70%', dur: '9s',  del: '0s'   },
          { size: 4,  left: '75%', top: '80%', dur: '12s', del: '2s'   },
          { size: 6,  left: '40%', top: '85%', dur: '10s', del: '1s'   },
          { size: 3,  left: '60%', top: '75%', dur: '8s',  del: '3.5s' },
          { size: 5,  left: '85%', top: '60%', dur: '11s', del: '0.5s' },
          { size: 4,  left: '28%', top: '90%', dur: '13s', del: '4s'   },
        ].map((p, i) => (
          <div
            key={i}
            className="hero-particle absolute rounded-full pointer-events-none"
            style={{
              width: p.size, height: p.size,
              left: p.left, top: p.top,
              background: '#0956fc',
              opacity: 0,
              animationDuration: p.dur,
              animationDelay: p.del,
            }}
          />
        ))}
      </div>


      {/* ── Main content ── */}
      <div className="relative z-10 max-w-5xl mx-auto px-4 sm:px-6 flex flex-col items-center text-center gap-8">

        {/* Live badge */}
        <motion.div
          initial={{ opacity: 0, y: -16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="flex items-center gap-1.5 xs:gap-2 bg-white border border-blue-100 rounded-full px-3 xs:px-4 py-1.5 xs:py-2 shadow-md shadow-blue-500/10 max-w-full"
        >
          <span className="relative flex flex-shrink-0">
            <span className="w-1.5 xs:w-2 h-1.5 xs:h-2 rounded-full bg-blue-600 block" />
            <span className="absolute inset-0 w-1.5 xs:w-2 h-1.5 xs:h-2 rounded-full bg-blue-400 animate-ping opacity-70" />
          </span>
          <span className="text-blue-700 text-[10px] xs:text-xs font-bold uppercase tracking-widest truncate-mobile">
            Admissions Open — August 2026 Intake
          </span>
          <Sparkles className="w-3 xs:w-3.5 h-3 xs:h-3.5 text-blue-500 flex-shrink-0" />
        </motion.div>

        {/* Headline */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.1 }}
          className="flex flex-col gap-2"
        >
          <h1 className="font-space font-extrabold text-slate-900 text-3xl xs:text-4xl sm:text-5xl md:text-6xl lg:text-7xl leading-[1.08] tracking-tight">
            Launch Your{' '}
            <span className="text-[#0956fc] "
              // style={{
              //   WebkitTextFillColor: 'transparent',
              //   WebkitBackgroundClip: 'text',
              //   backgroundClip: 'text',
              //   backgroundImage: 'linear-gradient(135deg, #0956fc 0%, #3b82f6 50%, #6366f1 100%)',
              // }}
            >
              Tech Career
            </span>
            <br />
            <span className="relative inline-block">
              <span className="text-slate-900">with</span>{' '}
              <span className='text-[#0956fc]'
                // style={{
                //   WebkitTextFillColor: 'transparent',
                //   WebkitBackgroundClip: 'text',
                //   backgroundClip: 'text',
                //   backgroundImage: '#0956fc',
                // }}
              >
                STA
              </span>
              {/* Underline curve */}
              <svg
                className="absolute -bottom-2 left-0 w-full"
                height="10" viewBox="0 0 200 10" preserveAspectRatio="none" fill="none"
              >
                <motion.path
                  d="M 2,6 Q 100,12 198,6"
                  stroke="url(#hero-grad)"
                  strokeWidth="3"
                  strokeLinecap="round"
                  initial={{ pathLength: 0 }}
                  animate={{ pathLength: 1 }}
                  transition={{ duration: 1, delay: 0.8, ease: 'easeOut' }}
                />
                <defs>
                  <linearGradient id="hero-grad" x1="0%" y1="0%" x2="100%" y2="0%">
                    <stop offset="0%" stopColor="#0956fc" />
                    <stop offset="100%" stopColor="#6366f1" />
                  </linearGradient>
                </defs>
              </svg>
            </span>
          </h1>
        </motion.div>

        {/* Subtext */}
        <motion.p
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.25 }}
          className="text-slate-500 text-base sm:text-lg md:text-xl leading-relaxed max-w-2xl"
        >
          Industry-focused courses, real-world projects, and dedicated career support
          — all in one place to help you land your{' '}
          <span className="text-slate-800 font-semibold">first tech job</span>.
        </motion.p>

        {/* Tech tags */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.35 }}
          className="flex flex-wrap justify-center gap-2 max-w-2xl"
        >
          {TECH_TAGS.map((tag, i) => (
            <TechTag key={tag} label={tag} delay={0.4 + i * 0.06} />
          ))}
        </motion.div>

        {/* CTA Buttons */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.5 }}
          className="flex flex-col sm:flex-row gap-3 items-stretch sm:items-center w-full sm:w-auto px-4 sm:px-0"
        >
          <motion.div whileHover={{ scale: 1.05, y: -3 }} whileTap={{ scale: 0.97 }} className="w-full sm:w-auto">
            <Link
              to="/apply"
              className="btn-primary px-8 py-4 rounded-full text-base font-bold shadow-xl shadow-blue-500/30 flex items-center justify-center gap-2 w-full"
            >
              <Rocket className="w-5 h-5" />
              Enroll Now — It's Free
            </Link>
          </motion.div>
          <motion.button
            whileHover={{ scale: 1.04, y: -3 }}
            whileTap={{ scale: 0.97 }}
            onClick={() => document.querySelector('#contact')?.scrollIntoView({ behavior: 'smooth' })}
            className="bg-white text-slate-800 font-bold px-8 py-4 rounded-full text-base transition-all flex items-center justify-center gap-2 border border-slate-200 hover:border-blue-300 shadow-md hover:shadow-lg hover:shadow-blue-500/10 w-full sm:w-auto"
          >
            <Sparkles className="w-5 h-5 text-blue-500" />
            Book FREE Demo
          </motion.button>
        </motion.div>

        {/* Stats grid */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="grid grid-cols-1 xs:grid-cols-2 lg:grid-cols-4 gap-3 w-full max-w-3xl px-2 xs:px-0"
        >
          {STATS.map((stat) => (
            <StatPill key={stat.label} {...stat} />
          ))}
        </motion.div>

        {/* Social proof avatars */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.85 }}
          className="flex flex-wrap items-center justify-center gap-3"
        >
          <div className="flex -space-x-2.5">
            {[
              { initials: 'AR', bg: '#0956fc' },
              { initials: 'HZ', bg: '#1a6aff' },
              { initials: 'UA', bg: '#3b82f6' },
              { initials: 'SK', bg: '#60a5fa' },
            ].map((s, i) => (
              <motion.div
                key={i}
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ delay: 0.9 + i * 0.08 }}
                className="w-9 h-9 rounded-full border-2 border-white flex items-center justify-center text-white text-[10px] font-black shadow"
                style={{ background: s.bg }}
              >
                {s.initials}
              </motion.div>
            ))}
          </div>
          <div className="text-left">
            <p className="text-xs text-slate-500 font-medium">
              <span className="text-slate-900 font-bold">500+ students</span> already learning
            </p>
            <div className="flex items-center gap-0.5 mt-0.5">
              {[...Array(5)].map((_, i) => (
                <Star key={i} className="w-3 h-3 fill-current" style={{ color: '#0956fc' }} />
              ))}
              <span className="text-[10px] text-slate-400 ml-1">5.0 Rating</span>
            </div>
          </div>
          <div className="flex items-center gap-1.5 text-xs font-bold px-3 py-1.5 rounded-full" style={{ background: 'rgba(9,86,252,0.08)', color: '#0956fc', border: '1px solid rgba(9,86,252,0.2)' }}>
            <CheckCircle className="w-3.5 h-3.5" />
            Verified Academy
          </div>
        </motion.div>

      </div>
    </section>
  )
}
