import { motion } from 'framer-motion'
import { Rocket, Sparkles, Award, Star, TrendingUp, Zap } from 'lucide-react'
import classroomImage from '/public/classroom.png'

/* Floating badge component */
function FloatingBadge({ children, className = '', delay = 0 }) {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.8 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.5, delay }}
      className={`animate-float-slow ${className}`}
      style={{ animationDelay: `${delay}s` }}
    >
      {children}
    </motion.div>
  )
}

/* ─── Aurora Fluid Glow Component ───── */
function AuroraFluidGlow() {
  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none z-[2]">
      <motion.div
        className="absolute w-[400px] h-[400px] sm:w-[600px] sm:h-[600px] rounded-full bg-gradient-to-tr from-blue-500/25 to-indigo-600/25 blur-[120px]"
        animate={{ x: [0, 80, -40, 0], y: [0, -60, 50, 0], scale: [1, 1.15, 0.9, 1] }}
        transition={{ duration: 18, repeat: Infinity, ease: 'easeInOut' }}
        style={{ top: '-15%', left: '-5%' }}
      />
      <motion.div
        className="absolute w-[300px] h-[300px] sm:w-[500px] sm:h-[500px] rounded-full bg-gradient-to-br from-cyan-400/20 to-blue-500/20 blur-[100px]"
        animate={{ x: [0, -70, 50, 0], y: [0, 50, -60, 0], scale: [1, 0.85, 1.1, 1] }}
        transition={{ duration: 22, repeat: Infinity, ease: 'easeInOut' }}
        style={{ bottom: '10%', right: '15%' }}
      />
      <motion.div
        className="absolute w-[250px] h-[250px] sm:w-[450px] sm:h-[450px] rounded-full bg-gradient-to-r from-violet-500/18 to-purple-600/15 blur-[90px]"
        animate={{ x: [0, 50, -30, 0], y: [0, -40, 40, 0] }}
        transition={{ duration: 15, repeat: Infinity, ease: 'easeInOut' }}
        style={{ top: '30%', left: '20%' }}
      />
    </div>
  )
}

export default function Hero({ onApply }) {
  return (
    <section
      id="hero"
      className="relative min-h-[100dvh] flex items-center pt-6 sm:pt-0 overflow-hidden"
    >
      {/* Subtle right blue panel — desktop only */}
      <div className="absolute right-0 top-0 bottom-0 w-[45%] bg-blue-600 transform skew-x-[-8deg] translate-x-16 origin-top pointer-events-none hidden lg:block z-0" />

      {/* Gradient overlays */}
      <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-r from-white via-white/95 to-transparent pointer-events-none hidden lg:block z-[1]" />

      {/* Mobile background gradient */}
      <div className="absolute inset-0 bg-gradient-to-b from-blue-50/40 via-white to-white pointer-events-none lg:hidden z-[1]" />

      {/* Aurora Glow */}
      <AuroraFluidGlow />

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 sm:py-16 w-full">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12 items-center">

          {/* Left: Content */}
          <motion.div
            initial={{ opacity: 0, x: -40 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.7, ease: [0.4, 0, 0.2, 1] }}
            className="flex flex-col gap-5 text-center lg:text-left"
          >
            {/* Live badge */}
            <motion.div
              className="flex items-center gap-3 justify-center lg:justify-start"
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.1 }}
            >
              <div className="flex items-center gap-2 bg-blue-50 border border-blue-100 rounded-full px-4 py-2 shadow-sm">
                <div className="relative">
                  <span className="w-2.5 h-2.5 bg-blue-600 rounded-full block hero-live-dot" />
                  <span className="absolute inset-0 w-2.5 h-2.5 bg-blue-400 rounded-full animate-ping opacity-60" />
                </div>
                <span className="text-blue-700 text-xs font-bold uppercase tracking-widest">Admissions Open</span>
                <Sparkles className="w-3.5 h-3.5 text-blue-500" />
              </div>
            </motion.div>

            {/* Headline */}
            <motion.h1
              className="font-space font-extrabold text-slate-900 text-3xl sm:text-4xl md:text-5xl lg:text-[54px] leading-[1.1]"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
            >
              Build Your Future with{' '}
              <span className="relative inline-block">
                <span className="text-blue-600">AI &amp; Technology</span>
                <motion.span
                  className="absolute -bottom-2 left-0 h-1 bg-gradient-to-r from-blue-600 to-blue-400 rounded-full"
                  initial={{ width: 0 }}
                  animate={{ width: '100%' }}
                  transition={{ duration: 0.8, delay: 0.8, ease: [0.4, 0, 0.2, 1] }}
                />
              </span>
            </motion.h1>

            {/* Subtext */}
            <motion.p
              className="text-slate-600 text-sm sm:text-base lg:text-lg leading-relaxed max-w-lg mx-auto lg:mx-0"
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.35 }}
            >
              Professional Certificate &amp; Diploma Programs with Practical Learning.
              Start your tech career with expert mentors and real-world projects.
            </motion.p>

            {/* Feature pills */}
            <motion.div
              className="flex flex-wrap gap-2 justify-center lg:justify-start"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.45 }}
            >
              {[
                { icon: Zap, label: 'Practical Projects' },
                { icon: TrendingUp, label: '100% Internship' },
                { icon: Star, label: 'Free Certificate' },
              ].map(({ icon: Icon, label }) => (
                <span
                  key={label}
                  className="flex items-center gap-1.5 bg-blue-50 text-blue-700 text-xs font-semibold px-3 py-1.5 rounded-full border border-blue-100"
                >
                  <Icon className="w-3.5 h-3.5 flex-shrink-0" />
                  {label}
                </span>
              ))}
            </motion.div>

            {/* CTA Buttons */}
            <motion.div
              className="flex flex-col sm:flex-row gap-3 mt-2"
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.55 }}
            >
              <motion.a
                whileHover={{ scale: 1.04, y: -3 }}
                whileTap={{ scale: 0.97 }}
                href="#apply"
                className="btn-primary px-6 sm:px-8 py-3.5 rounded-full text-sm sm:text-base shadow-xl shadow-blue-500/30 flex items-center justify-center gap-2 w-full sm:w-auto"
              >
                <Rocket className="w-4 h-4 relative z-10 flex-shrink-0" />
                <span className="relative z-10">Enroll Now</span>
              </motion.a>
              <motion.button
                whileHover={{ scale: 1.04, y: -3 }}
                whileTap={{ scale: 0.97 }}
                onClick={() => document.querySelector('#contact')?.scrollIntoView({ behavior: 'smooth' })}
                className="relative bg-white hover:bg-slate-50 text-slate-800 font-bold px-6 sm:px-8 py-3.5 rounded-full text-sm sm:text-base transition-all flex items-center justify-center gap-2 border border-slate-200 hover:border-blue-200 shadow-md hover:shadow-lg hover:shadow-blue-500/10 w-full sm:w-auto"
              >
                <Sparkles className="w-4 h-4 text-blue-500 flex-shrink-0" /> Book FREE Demo
              </motion.button>
            </motion.div>

            {/* Social proof */}
            <motion.div
              className="flex items-center gap-3 pt-4 border-t border-slate-100 justify-center lg:justify-start"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.5, delay: 0.7 }}
            >
              <div className="flex -space-x-2">
                {[
                  { initials: 'AR', bg: 'bg-blue-600' },
                  { initials: 'HZ', bg: 'bg-violet-600' },
                  { initials: 'UA', bg: 'bg-emerald-600' },
                  { initials: 'SK', bg: 'bg-rose-600' },
                ].map((s, i) => (
                  <motion.div
                    key={i}
                    initial={{ scale: 0, x: -10 }}
                    animate={{ scale: 1, x: 0 }}
                    transition={{ delay: 0.7 + i * 0.08 }}
                    className={`w-9 h-9 rounded-full ${s.bg} border-2 border-white flex items-center justify-center text-white text-[10px] font-black shadow-md`}
                  >
                    {s.initials}
                  </motion.div>
                ))}
              </div>
              <div>
                <p className="text-xs text-slate-500 font-medium">
                  <span className="text-slate-900 font-bold">500+</span> Students Already Enrolled
                </p>
                <div className="flex items-center gap-0.5 mt-0.5">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className="w-3 h-3 text-amber-400 fill-amber-400" />
                  ))}
                  <span className="text-[10px] text-slate-500 ml-1 font-medium">5.0 Rating</span>
                </div>
              </div>
            </motion.div>
          </motion.div>

          {/* Right: Classroom Image */}
          <motion.div
            initial={{ opacity: 0, x: 40 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.7, delay: 0.15, ease: [0.4, 0, 0.2, 1] }}
            className="relative flex items-center justify-center mt-4 lg:mt-0"
          >
            {/* Main image card */}
            <div className="relative rounded-2xl overflow-hidden shadow-2xl border-4 border-white w-full max-w-sm sm:max-w-md lg:max-w-lg aspect-[4/3] animate-glow-blue">
              <img
                src={classroomImage}
                alt="Shine Tech Academy students in classroom"
                className="w-full h-full object-cover"
                loading="eager"
              />
              {/* Overlay badge */}
              <div className="absolute bottom-3 left-3 right-3 sm:bottom-4 sm:left-4 sm:right-4 bg-white/95 backdrop-blur-sm rounded-xl p-2.5 sm:p-3 flex items-center gap-2 sm:gap-3 shadow-lg border border-white/80">
                <div className="w-8 h-8 sm:w-10 sm:h-10 bg-gradient-to-br from-blue-500 to-blue-700 rounded-lg flex items-center justify-center text-white flex-shrink-0 shadow-lg">
                  <Award className="w-4 h-4 sm:w-5 sm:h-5" />
                </div>
                <div>
                  <p className="text-slate-900 font-bold text-xs sm:text-sm">Industry Certified Courses</p>
                  <p className="text-slate-500 text-[10px] sm:text-xs">Learn • Build • Earn</p>
                </div>
              </div>
            </div>

            {/* Decorative shadow block */}
            <div className="absolute top-4 left-4 -right-4 -bottom-4 bg-blue-600/10 rounded-2xl -z-10" />

            {/* Floating stat badge — top right */}
            <FloatingBadge
              delay={0.9}
              className="absolute -top-4 -right-4 bg-white rounded-2xl px-3 sm:px-4 py-2.5 sm:py-3 shadow-xl border border-blue-50 flex items-center gap-2 hidden lg:flex"
            >
              <div className="w-8 h-8 bg-gradient-to-br from-emerald-400 to-emerald-600 rounded-xl flex items-center justify-center text-white">
                <TrendingUp className="w-4 h-4" />
              </div>
              <div>
                <p className="text-[10px] text-slate-500 font-medium">Placement Rate</p>
                <p className="text-slate-900 font-extrabold text-sm">100% Internship</p>
              </div>
            </FloatingBadge>

            {/* Floating stat badge — bottom left */}
            <FloatingBadge
              delay={1.1}
              className="absolute -bottom-4 -left-4 bg-white rounded-2xl px-3 sm:px-4 py-2.5 sm:py-3 shadow-xl border border-blue-50 flex items-center gap-2 hidden lg:flex"
            >
              <div className="w-8 h-8 bg-gradient-to-br from-blue-500 to-blue-700 rounded-xl flex items-center justify-center text-white">
                <Star className="w-4 h-4 fill-white" />
              </div>
              <div>
                <p className="text-[10px] text-slate-500 font-medium">Student Rating</p>
                <p className="text-slate-900 font-extrabold text-sm flex items-center gap-1">
                  <Star className="w-3.5 h-3.5 fill-amber-400 text-amber-400" />
                  <span>5.0 / 5.0</span>
                </p>
              </div>
            </FloatingBadge>
          </motion.div>

        </div>
      </div>
    </section>
  )
}
