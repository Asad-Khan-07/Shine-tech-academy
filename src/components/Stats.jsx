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
  visible: { transition: { staggerChildren: 0.08 } },
}
const item = {
  hidden:  { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0,  transition: { duration: 0.5 } },
}

export default function Stats() {
  return (
    <section id="stats" className="dark-navy py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <motion.div
          variants={container}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-6 lg:gap-8"
        >
          {STATS.map((s) => {
            const Icon = s.icon
            return (
              <motion.div
                key={s.label}
                variants={item}
                className="flex flex-col items-center text-center gap-2 group"
              >
                <div className="w-14 h-14 rounded-2xl bg-white/5 border border-white/10 flex items-center justify-center group-hover:bg-blue-600 group-hover:border-blue-600 transition-all duration-300 mb-1">
                  <Icon className="w-6 h-6 text-blue-400 group-hover:text-white transition-colors duration-300" />
                </div>
                <p className="text-white font-space font-extrabold text-2xl sm:text-3xl leading-none">
                  {s.value}
                </p>
                <p className="text-blue-300 text-xs font-bold uppercase tracking-widest leading-tight">
                  {s.label}
                </p>
                <p className="text-slate-500 text-[11px] leading-tight hidden sm:block">
                  {s.desc}
                </p>
              </motion.div>
            )
          })}
        </motion.div>
      </div>
    </section>
  )
}
