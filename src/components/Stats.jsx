import { motion } from 'framer-motion'
import { GraduationCap, Users, Briefcase, Award, Globe } from 'lucide-react'

const STATS = [
  { icon: GraduationCap, value: '10+',    label: 'Professional Courses',                 desc: 'Technology & career-focused programs' },
  { icon: Users,         value: 'Expert', label: 'Industry Mentors',                 desc: 'Learn from experienced professionals' },
  { icon: Briefcase,     value: 'Live',   label: 'Projects',              desc: 'Hands-on practical experience' },
  { icon: Award,         value: 'Free',   label: 'Certificate',            desc: 'Certificate of completion' },
  { icon: Globe,         value: 'Online & Onsite', label: 'Learning',               desc: 'Flexible learning experience' },
]

const container = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.1 } },
}
const item = {
  hidden:  { opacity: 0, y: 30, scale: 0.95 },
  visible: { opacity: 1, y: 0,  scale: 1, transition: { duration: 0.5, ease: [0.4, 0, 0.2, 1] } },
}

export default function Stats() {
  return (
    <section id="stats" className="dark-navy py-12 sm:py-14 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto relative z-10">
        <motion.div
          variants={container}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-3 sm:gap-5 lg:gap-6"
        >
          {STATS.map((s, idx) => {
            const Icon = s.icon
            // Last item on 2-col grid (index 4) spans full width on xs so it's centered
            const isLast = idx === STATS.length - 1
            return (
              <motion.div
                key={s.label}
                variants={item}
                className={`stat-card-glow glow-border flex flex-col items-center text-center gap-2 group cursor-default bg-white/10 border border-white/20 rounded-2xl p-4 sm:p-5
                  ${isLast ? 'col-span-2 sm:col-span-1' : ''}`}
              >
                {/* Icon with glow ring */}
                <div className="relative mb-1">
                  <div className="w-12 h-12 sm:w-14 sm:h-14 rounded-2xl bg-white/15 border border-white/25 flex items-center justify-center group-hover:bg-white group-hover:border-white transition-all duration-400">
                    <Icon className="w-5 h-5 sm:w-6 sm:h-6 text-white group-hover:text-blue-600 transition-colors duration-300" />
                  </div>
                  <div className="absolute inset-0 rounded-2xl bg-white/0 group-hover:bg-white/25 blur-xl transition-all duration-400" />
                </div>

                <p className="text-white font-space font-extrabold text-xl sm:text-2xl lg:text-3xl leading-none tracking-tight">
                  {s.value}
                </p>
                <p className="text-blue-50 text-[10px] font-bold uppercase tracking-widest leading-tight">
                  {s.label}
                </p>
                <p className="text-blue-100 text-[10px] sm:text-[11px] leading-tight hidden sm:block">
                  {s.desc}
                </p>

                {/* Bottom shimmer line */}
                <div className="w-0 group-hover:w-full h-0.5 bg-white/80 rounded-full transition-all duration-500 mt-1" />
              </motion.div>
            )
          })}
        </motion.div>
      </div>
    </section>
  )
}