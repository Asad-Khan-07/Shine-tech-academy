import { motion } from 'framer-motion'
import { Zap, Hammer, Briefcase, Compass, FlaskConical, Users } from 'lucide-react'

const REASONS = [
  {
    icon: Zap,
    title: 'Practical Learning',
    desc: 'Real-world skills through hands-on exercises and live demos.',
  },
  {
    icon: Hammer,
    title: 'Live Projects',
    desc: 'Work on actual projects during your course to build a portfolio.',
  },
  {
    icon: Briefcase,
    title: 'Internship Opportunities',
    desc: 'Get internship placements and real-work experience.',
  },
  {
    icon: Compass,
    title: 'Career Guidance',
    desc: 'Personalized guidance to help you choose and grow your career path.',
  },
  {
    icon: FlaskConical,
    title: 'Modern Labs',
    desc: 'Access modern, fully equipped computer labs for practice.',
  },
  {
    icon: Users,
    title: 'Industry Mentors',
    desc: 'Learn from mentors with real industry experience and expertise.',
  },
]

const container = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.07 } },
}
const cardAnim = {
  hidden:  { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0,  transition: { duration: 0.4 } },
}

export default function WhySTA() {
  return (
    <section id="why-sta" className="dark-navy py-24 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">

        {/* Header */}
        <div className="text-center mb-16">
          <span className="section-tag-white mb-3 inline-block">Why Choose Us</span>
          <h2 className="font-space font-extrabold text-3xl sm:text-4xl text-white mt-3">
            Why Shine Tech Academy?
          </h2>
          <div className="w-14 h-1 bg-blue-500 mx-auto mt-4 rounded-full" />
        </div>

        {/* Grid */}
        <motion.div
          variants={container}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-80px' }}
          className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-8"
        >
          {REASONS.map((r) => {
            const Icon = r.icon
            return (
              <motion.div
                key={r.title}
                variants={cardAnim}
                className="flex flex-col items-center text-center gap-3 group cursor-default"
              >
                <div className="w-16 h-16 rounded-full border border-blue-500/30 bg-blue-500/10 flex items-center justify-center text-blue-400 group-hover:bg-blue-600 group-hover:text-white group-hover:border-blue-600 transition-all duration-300">
                  <Icon className="w-6 h-6" />
                </div>
                <h3 className="font-space font-bold text-white text-sm leading-tight">
                  {r.title}
                </h3>
                <p className="text-slate-400 text-xs leading-relaxed max-w-[130px]">
                  {r.desc}
                </p>
              </motion.div>
            )
          })}
        </motion.div>
      </div>
    </section>
  )
}
