import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Rocket, Mail, CheckCircle, Sparkles, ArrowRight, Lock, BookOpen, Code2, Award } from 'lucide-react'

const FacebookIcon = () => (
  <svg viewBox="0 0 24 24" fill="currentColor" className="w-4 h-4">
    <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z" />
  </svg>
)
const InstagramIcon = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-4 h-4">
    <rect width="20" height="20" x="2" y="2" rx="5" ry="5" />
    <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
    <line x1="17.5" x2="17.51" y1="6.5" y2="6.5" />
  </svg>
)
const YoutubeIcon = () => (
  <svg viewBox="0 0 24 24" fill="currentColor" className="w-4 h-4">
    <path d="M22.54 6.42a2.78 2.78 0 0 0-1.95-1.96C18.88 4 12 4 12 4s-6.88 0-8.59.46A2.78 2.78 0 0 0 1.46 6.42 29 29 0 0 0 1 12a29 29 0 0 0 .46 5.58 2.78 2.78 0 0 0 1.95 1.95C5.12 20 12 20 12 20s6.88 0 8.59-.47a2.78 2.78 0 0 0 1.95-1.95A29 29 0 0 0 23 12a29 29 0 0 0-.46-5.58z" />
    <polygon fill="#040c1f" points="9.75 15.02 15.5 12 9.75 8.98 9.75 15.02" />
  </svg>
)


const BRAND = '#0956fc'
const LAUNCH_DATE = new Date('2026-09-01T00:00:00')

function useCountdown(targetDate) {
  const calc = () => {
    const diff = targetDate - Date.now()
    if (diff <= 0) return { days: 0, hours: 0, minutes: 0, seconds: 0 }
    return {
      days:    Math.floor(diff / (1000 * 60 * 60 * 24)),
      hours:   Math.floor((diff / (1000 * 60 * 60)) % 24),
      minutes: Math.floor((diff / (1000 * 60)) % 60),
      seconds: Math.floor((diff / 1000) % 60),
    }
  }
  const [time, setTime] = useState(calc)
  useEffect(() => {
    const id = setInterval(() => setTime(calc()), 1000)
    return () => clearInterval(id)
  }, [])
  return time
}

/* ── Floating Particle ── */
function Particle({ x, y, size, duration, delay }) {
  return (
    <motion.div
      className="absolute rounded-full"
      style={{ left: `${x}%`, top: `${y}%`, width: size, height: size, background: BRAND, opacity: 0.15 }}
      animate={{ y: [-20, 20, -20], opacity: [0.08, 0.25, 0.08] }}
      transition={{ duration, delay, repeat: Infinity, ease: 'easeInOut' }}
    />
  )
}

const PARTICLES = [
  { x: 8,  y: 15, size: 120, duration: 7,  delay: 0   },
  { x: 85, y: 10, size: 90,  duration: 9,  delay: 1   },
  { x: 50, y: 80, size: 160, duration: 11, delay: 2   },
  { x: 15, y: 70, size: 70,  duration: 8,  delay: 0.5 },
  { x: 90, y: 65, size: 100, duration: 10, delay: 1.5 },
  { x: 35, y: 5,  size: 50,  duration: 6,  delay: 3   },
  { x: 70, y: 45, size: 40,  duration: 7,  delay: 2.5 },
]

/* ── Countdown Block ── */
function TimeBlock({ value, label }) {
  return (
    <motion.div
      className="flex flex-col items-center gap-2"
      whileHover={{ scale: 1.05 }}
    >
      <div
        className="relative w-20 h-20 sm:w-24 sm:h-24 lg:w-28 lg:h-28 rounded-2xl flex items-center justify-center overflow-hidden"
        style={{ background: 'rgba(9,86,252,0.08)', border: '1px solid rgba(9,86,252,0.2)' }}
      >
        {/* Shimmer */}
        <motion.div
          className="absolute inset-0 opacity-10"
          style={{ background: `linear-gradient(135deg, transparent 30%, ${BRAND} 50%, transparent 70%)` }}
          animate={{ x: ['-100%', '200%'] }}
          transition={{ duration: 3, repeat: Infinity, ease: 'linear' }}
        />
        <AnimatePresence mode="wait">
          <motion.span
            key={value}
            initial={{ y: -30, opacity: 0 }}
            animate={{ y: 0,   opacity: 1 }}
            exit={{   y: 30,  opacity: 0 }}
            transition={{ duration: 0.3, ease: 'easeOut' }}
            className="relative z-10 text-3xl sm:text-4xl lg:text-5xl font-black tabular-nums"
            style={{ color: BRAND }}
          >
            {String(value).padStart(2, '0')}
          </motion.span>
        </AnimatePresence>
      </div>
      <span className="text-xs sm:text-sm font-bold uppercase tracking-widest text-slate-500">{label}</span>
    </motion.div>
  )
}

export default function ComingSoon() {
  const { days, hours, minutes, seconds } = useCountdown(LAUNCH_DATE)
  const [email, setEmail] = useState('')
  const [submitted, setSubmitted] = useState(false)

  const handleSubmit = (e) => {
    e.preventDefault()
    if (!email) return
    setSubmitted(true)
  }

  return (
    <div className="min-h-screen bg-slate-50 text-slate-900 flex flex-col items-center justify-center px-4 relative overflow-hidden">

      {/* ── Ambient particles ── */}
      {PARTICLES.map((p, i) => <Particle key={i} {...p} />)}

      {/* ── Grid overlay ── */}
      <div
        className="absolute inset-0 pointer-events-none opacity-[0.04]"
        style={{
          backgroundImage: `linear-gradient(${BRAND} 1px, transparent 1px), linear-gradient(90deg, ${BRAND} 1px, transparent 1px)`,
          backgroundSize: '60px 60px',
        }}
      />

      {/* ── Top glow ── */}
      <div
        className="absolute top-0 left-1/2 -translate-x-1/2 w-[600px] h-[300px] pointer-events-none"
        style={{ background: `radial-gradient(ellipse at center top, ${BRAND}30 0%, transparent 70%)` }}
      />

      {/* ── Content ── */}
      <div className="relative z-10 w-full max-w-3xl mx-auto flex flex-col items-center gap-10 py-16">

        {/* Logo */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <img src="/STA-logo.png" alt="Shine Tech Academy" className="h-14 w-auto drop-shadow-lg" />
        </motion.div>

        {/* Badge */}
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.15, duration: 0.5 }}
          className="flex items-center gap-2 px-4 py-2 rounded-full text-xs font-bold uppercase tracking-widest"
          style={{ background: 'rgba(9,86,252,0.08)', border: `1px solid ${BRAND}40`, color: BRAND }}
        >
          <motion.span
            animate={{ opacity: [1, 0.3, 1] }}
            transition={{ duration: 1.5, repeat: Infinity }}
            className="w-2 h-2 rounded-full inline-block"
            style={{ background: BRAND }}
          />
          <Sparkles className="w-3.5 h-3.5" />
          Something exciting is coming
        </motion.div>

        {/* Headline */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.25, duration: 0.7 }}
          className="text-center flex flex-col gap-4"
        >
          <h1 className="text-5xl sm:text-6xl lg:text-7xl font-black leading-tight tracking-tight">
            We're{' '}
            <span
              className="relative inline-block"
              style={{ WebkitTextFillColor: 'transparent', WebkitBackgroundClip: 'text', backgroundClip: 'text',
                backgroundImage: `linear-gradient(135deg, ${BRAND} 0%, ${BRAND} 50%, ${BRAND} 100%)`,
                backgroundSize: '200% 200%' }}
            >
              <motion.span
                animate={{ backgroundPosition: ['0% 50%', '100% 50%', '0% 50%'] }}
                transition={{ duration: 4, repeat: Infinity, ease: 'linear' }}
                style={{ display: 'block',
                  WebkitTextFillColor: 'transparent', WebkitBackgroundClip: 'text', backgroundClip: 'text',
                  backgroundImage: `linear-gradient(135deg, ${BRAND} 0%, ${BRAND} 50%, ${BRAND} 100%)`,
                  backgroundSize: '200% 200%' }}
              >
                Launching Soon
              </motion.span>
            </span>
          </h1>
          <p className="text-slate-500 text-base sm:text-lg max-w-xl mx-auto leading-relaxed">
          Building the next generation of developers, creators, and technology leaders. Coming Soon.
          </p>
        </motion.div>

        {/* Progress bar */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5 }}
          className="w-full max-w-md"
        >
          <div className="flex justify-between text-xs text-slate-500 mb-2 font-semibold">
            <span>Progress</span><span>75%</span>
          </div>
          <div className="h-2 rounded-full overflow-hidden" style={{ background: 'rgba(9,86,252,0.1)' }}>
            <motion.div
              className="h-full rounded-full"
              style={{ background: BRAND }}
              initial={{ width: 0 }}
              animate={{ width: '75%' }}
              transition={{ delay: 0.7, duration: 1.2, ease: 'easeOut' }}
            />
          </div>
          <p className="text-slate-600 text-xs mt-1.5 text-right">We're almost ready!</p>
        </motion.div>

        {/* Email form */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6, duration: 0.6 }}
          className="w-full max-w-md"
        >
          <AnimatePresence mode="wait">
            {submitted ? (
              <motion.div
                key="success"
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                className="flex items-center justify-center gap-3 py-4 px-6 rounded-2xl"
                style={{ background: 'rgba(16,185,129,0.08)', border: '1px solid rgba(16,185,129,0.25)' }}
              >
                <CheckCircle className="w-5 h-5 text-emerald-400" />
                <span className="text-emerald-600 font-semibold text-sm">You're on the list! We'll notify you.</span>
              </motion.div>
            ) : (
              <motion.form
                key="form"
                onSubmit={handleSubmit}
                className="flex flex-col sm:flex-row gap-3"
              >
                <div className="relative flex-1">
                  <Mail className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-500" />
                  <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                    placeholder="Enter your email to get notified"
                    className="w-full pl-10 pr-4 py-3.5 rounded-xl text-sm text-slate-800 outline-none placeholder:text-slate-400 transition-all"
                    style={{ background: '#fff', border: '1px solid #e2e8f0', boxShadow: '0 1px 3px rgba(0,0,0,0.06)' }}
                    onFocus={(e) => { e.target.style.borderColor = BRAND; e.target.style.boxShadow = `0 0 0 3px ${BRAND}15` }}
                    onBlur={(e)  => { e.target.style.borderColor = '#e2e8f0'; e.target.style.boxShadow = '0 1px 3px rgba(0,0,0,0.06)' }}
                  />
                </div>
                <motion.button
                  type="submit"
                  whileHover={{ scale: 1.04 }}
                  whileTap={{ scale: 0.97 }}
                  className="flex items-center justify-center gap-2 px-6 py-3.5 rounded-xl text-white font-bold text-sm shrink-0"
                  style={{ background: BRAND, boxShadow: `0 0 30px ${BRAND}60` }}
                >
                  Notify Me <ArrowRight className="w-4 h-4" />
                </motion.button>
              </motion.form>
            )}
          </AnimatePresence>
          <p className="flex items-center justify-center gap-1.5 text-slate-600 text-xs text-center mt-3">
            <Lock className="w-3 h-3" /> No spam. Unsubscribe anytime.
          </p>
        </motion.div>

        {/* Features preview */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.75, duration: 0.6 }}
          className="grid grid-cols-3 gap-3 w-full max-w-md"
        >
          {[
            { icon: <BookOpen className="w-6 h-6" />, label: 'New Courses' },
            { icon: <Code2 className="w-6 h-6" />, label: 'Live Projects' },
            { icon: <Award className="w-6 h-6" />, label: 'Certificates' },
          ].map((item) => (
            <div
              key={item.label}
              className="flex flex-col items-center gap-2 py-4 px-3 rounded-xl text-center"
              style={{ background: '#fff', border: '1px solid #e8edf5', boxShadow: '0 2px 8px rgba(9,86,252,0.06)' }}
            >
              <span style={{ color: BRAND }}>{item.icon}</span>
              <span className="text-slate-500 text-xs font-semibold">{item.label}</span>
            </div>
          ))}
        </motion.div>

        {/* Social links */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.9 }}
          className="flex items-center gap-4"
        >
          {[
            { href: 'https://www.facebook.com/share/18jMvUdi46/', icon: <FacebookIcon />, label: 'Facebook' },
            { href: 'https://www.instagram.com/shinetechacademy', icon: <InstagramIcon />, label: 'Instagram' },
            { href: 'https://youtube.com/@shinetechacademy', icon: <YoutubeIcon />, label: 'YouTube' },
          ].map(({ href, icon, label }) => (
            <motion.a
              key={label}
              href={href}
              target="_blank"
              rel="noopener noreferrer"
              aria-label={label}
              whileHover={{ scale: 1.15, y: -3 }}
              whileTap={{ scale: 0.95 }}
              className="w-10 h-10 rounded-xl flex items-center justify-center transition-all text-slate-600"
              style={{ background: '#fff', border: '1px solid #e2e8f0', boxShadow: '0 1px 4px rgba(0,0,0,0.06)' }}
              onMouseEnter={(e) => { e.currentTarget.style.background = `${BRAND}12`; e.currentTarget.style.borderColor = `${BRAND}50`; e.currentTarget.style.color = BRAND }}
              onMouseLeave={(e) => { e.currentTarget.style.background = '#fff'; e.currentTarget.style.borderColor = '#e2e8f0'; e.currentTarget.style.color = '#475569' }}
            >
              {icon}
            </motion.a>
          ))}
        </motion.div>

        {/* Footer note */}
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1 }}
          className="text-slate-400 text-xs text-center"
        >
          © {new Date().getFullYear()} Shine Tech Academy — Empowering Future Tech Leaders
        </motion.p>
      </div>
    </div>
  )
}
