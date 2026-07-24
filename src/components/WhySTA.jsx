import { useEffect, useRef } from 'react'
import { motion } from 'framer-motion'
import { Zap, Hammer, Briefcase, Compass, FlaskConical, Users } from 'lucide-react'

const REASONS = [
  {
    icon: Zap,
    title: 'Practical Learning',
    desc: 'Real-world skills through hands-on exercises and live demos.',
    color: 'from-blue-500 to-blue-700',
    glow: 'rgba(9, 86, 252, 0.3)',
  },
  {
    icon: Hammer,
    title: 'Live Projects',
    desc: 'Work on actual projects during your course to build a portfolio.',
    color: 'from-violet-500 to-violet-700',
    glow: 'rgba(139, 92, 246, 0.3)',
  },
  {
    icon: Briefcase,
    title: 'Internship Opportunities',
    desc: 'Get internship placements and real-work experience.',
    color: 'from-emerald-500 to-emerald-700',
    glow: 'rgba(16, 185, 129, 0.3)',
  },
  {
    icon: Compass,
    title: 'Career Guidance',
    desc: 'Personalized guidance to help you choose and grow your career path.',
    color: 'from-amber-500 to-orange-600',
    glow: 'rgba(245, 158, 11, 0.3)',
  },
  {
    icon: FlaskConical,
    title: 'Modern Labs',
    desc: 'Access modern, fully equipped computer labs for practice.',
    color: 'from-cyan-500 to-blue-600',
    glow: 'rgba(6, 182, 212, 0.3)',
  },
  {
    icon: Users,
    title: 'Industry Mentors',
    desc: 'Learn from mentors with real industry experience and expertise.',
    color: 'from-rose-500 to-pink-600',
    glow: 'rgba(244, 63, 94, 0.3)',
  },
]

const container = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.09 } },
}
const cardAnim = {
  hidden:  { opacity: 0, y: 30, scale: 0.9 },
  visible: { opacity: 1, y: 0,  scale: 1, transition: { duration: 0.5, ease: [0.4, 0, 0.2, 1] } },
}

/* ─── Subtle Code Rain Background ────────────────────────── */
function CodeRainBackground() {
  const canvasRef = useRef(null)

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return
    const ctx = canvas.getContext('2d')

    let animId
    const characters = '01ABCDEFGHIJKLMNOPQRSTUVWXYZ<>/[]{}+=-*#@'
    const charArray = characters.split('')
    const fontSize = 11

    let columns = 0
    let drops = []

    const init = () => {
      canvas.width = canvas.parentElement.offsetWidth
      canvas.height = canvas.parentElement.offsetHeight
      columns = Math.floor(canvas.width / fontSize)
      drops = []
      for (let x = 0; x < columns; x++) {
        drops[x] = Math.random() * -100 // Stagger initial drop positions
      }
    }
    init()

    // Resize observer to handle dynamic section sizing perfectly
    const resizeObserver = new ResizeObserver(() => {
      init()
    })
    if (canvas.parentElement) {
      resizeObserver.observe(canvas.parentElement)
    }

    const draw = () => {
      // Very high transparency black fade to create the trailing rain trail
      ctx.fillStyle = 'rgba(11, 19, 41, 0.09)'
      ctx.fillRect(0, 0, canvas.width, canvas.height)

      // Cyberpunk Matrix Blue color for characters
      ctx.fillStyle = 'rgba(9, 86, 252, 0.16)' // Subtle code rain brightness
      ctx.font = `bold ${fontSize}px monospace`

      for (let i = 0; i < drops.length; i++) {
        const text = charArray[Math.floor(Math.random() * charArray.length)]
        
        // Draw the character
        ctx.fillText(text, i * fontSize, drops[i] * fontSize)

        // Reset drop back to top once it hits bottom with a random delay
        if (drops[i] * fontSize > canvas.height && Math.random() > 0.975) {
          drops[i] = 0
        }

        // Speed of the rain fall
        drops[i] += 0.55
      }

      animId = requestAnimationFrame(draw)
    }

    draw()

    return () => {
      cancelAnimationFrame(animId)
      resizeObserver.disconnect()
    }
  }, [])

  return (
    <canvas
      ref={canvasRef}
      style={{
        position: 'absolute',
        inset: 0,
        width: '100%',
        height: '100%',
        pointerEvents: 'none',
        zIndex: 1,
      }}
    />
  )
}

export default function WhySTA() {
  return (
    <section id="why-sta" className="dark-navy py-16 sm:py-24 px-4 sm:px-6 lg:px-8 relative overflow-hidden">
      
      {/* ── Subtle Cyberpunk Code Rain ── */}
      <CodeRainBackground />

      <div className="max-w-7xl mx-auto relative z-10">

        {/* Header */}
        <motion.div
          className="text-center mb-16"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <span className="section-tag-white mb-4 inline-block">Why Choose Us</span>
          <h2 className="font-space font-extrabold text-3xl sm:text-4xl text-white mt-3">
            Why Shine Tech Academy?
          </h2>
          <div className="w-20 h-1 bg-gradient-to-r from-blue-600 via-blue-400 to-blue-600 mx-auto mt-4 rounded-full relative overflow-hidden">
            <div className="step-line absolute inset-0" />
          </div>
          <p className="text-slate-400 mt-4 max-w-lg mx-auto text-sm leading-relaxed">
            We offer everything you need to launch a successful tech career — from skills to real-world experience.
          </p>
        </motion.div>

        {/* Grid */}
        <motion.div
          variants={container}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-80px' }}
          className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-4 sm:gap-6"
        >
          {REASONS.map((r) => {
            const Icon = r.icon
            return (
              <motion.div
                key={r.title}
                variants={cardAnim}
                className="flex flex-col items-center text-center gap-3 sm:gap-4 group cursor-default glass-card-dark rounded-2xl p-4 sm:p-5 hover:bg-white/8 transition-all duration-400"
                whileHover={{ y: -8, scale: 1.03 }}
              >
                {/* Icon circle */}
                <div className="relative">
                  <div
                    className={`w-12 h-12 sm:w-16 sm:h-16 rounded-2xl bg-gradient-to-br ${r.color} flex items-center justify-center text-white shadow-lg transition-all duration-400 group-hover:scale-110`}
                    style={{ boxShadow: `0 8px 25px ${r.glow}` }}
                  >
                    <Icon className="w-5 h-5 sm:w-7 sm:h-7" />
                  </div>
                  {/* Glow halo */}
                  <div
                    className="absolute inset-0 rounded-2xl opacity-0 group-hover:opacity-100 blur-xl transition-opacity duration-400"
                    style={{ background: `radial-gradient(circle, ${r.glow} 0%, transparent 70%)` }}
                  />
                </div>

                <div className="flex flex-col gap-1.5">
                  <h3 className="font-space font-bold text-white text-xs sm:text-sm leading-tight">
                    {r.title}
                  </h3>
                  <p className="text-slate-400 text-[10px] sm:text-[11px] leading-relaxed max-w-[120px] sm:max-w-[130px]">
                    {r.desc}
                  </p>
                </div>

                {/* Bottom indicator */}
                <div
                  className={`h-0.5 w-0 group-hover:w-3/4 bg-gradient-to-r ${r.color} rounded-full transition-all duration-500`}
                />
              </motion.div>
            )
          })}
        </motion.div>
      </div>
    </section>
  )
}
