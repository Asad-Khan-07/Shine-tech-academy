import { motion } from 'framer-motion'
import { GraduationCap, Users, Briefcase, Award, Globe } from 'lucide-react'

const STATS = [
  { icon: GraduationCap, value: '10+',    label: 'Courses',                 desc: 'Practical skill courses' },
  { icon: Users,         value: 'Expert', label: 'Mentors',                 desc: 'Industry professionals' },
  { icon: Briefcase,     value: '100%',   label: 'Internship Opportunities', desc: 'Real world exposure' },
  { icon: Award,         value: 'Free',   label: 'Certificates',             desc: 'On course completion' },
  { icon: Globe,         value: 'Active', label: 'Community Support',        desc: 'WhatsApp & Discord' },
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
    <section id="stats" className="dark-navy py-14 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto relative z-10">
        <motion.div
          variants={container}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-5 lg:gap-6"
        >
          {STATS.map((s) => {
            const Icon = s.icon
            return (
              <motion.div
                key={s.label}
                variants={item}
                className="stat-card-glow glow-border flex flex-col items-center text-center gap-2 group cursor-default bg-white/5 border border-white/10 rounded-2xl p-5"
              >
                {/* Icon with glow ring */}
                <div className="relative mb-1">
                  <div className="w-14 h-14 rounded-2xl bg-white/8 border border-white/10 flex items-center justify-center group-hover:bg-blue-600 group-hover:border-blue-500 transition-all duration-400">
                    <Icon className="w-6 h-6 text-blue-400 group-hover:text-white transition-colors duration-300" />
                  </div>
                  {/* Glow on hover */}
                  <div className="absolute inset-0 rounded-2xl bg-blue-500/0 group-hover:bg-blue-500/20 blur-xl transition-all duration-400" />
                </div>

                <p className="text-white font-space font-extrabold text-2xl sm:text-3xl leading-none tracking-tight">
                  {s.value}
                </p>
                <p className="text-blue-300 text-[10px] font-bold uppercase tracking-widest leading-tight">
                  {s.label}
                </p>
                <p className="text-slate-500 text-[11px] leading-tight hidden sm:block">
                  {s.desc}
                </p>

                {/* Bottom shimmer line */}
                <div className="w-0 group-hover:w-full h-0.5 bg-gradient-to-r from-blue-500 to-blue-300 rounded-full transition-all duration-500 mt-1" />
              </motion.div>
            )
          })}
        </motion.div>
      </div>
    </section>
  )
}
