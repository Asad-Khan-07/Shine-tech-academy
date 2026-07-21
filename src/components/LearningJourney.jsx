import { motion } from 'framer-motion'
import { FileText, BookOpen, MonitorPlay, Hammer, Award, Rocket } from 'lucide-react'

const STEPS = [
  { num: 1, icon: FileText,    title: 'Register',     desc: 'Fill the admission form online or visit our campus.' },
  { num: 2, icon: BookOpen,    title: 'Choose Course', desc: 'Pick the course that matches your passion and goals.' },
  { num: 3, icon: MonitorPlay, title: 'Attend Classes',desc: 'Learn through expert instructors and hands-on sessions.' },
  { num: 4, icon: Hammer,      title: 'Build Projects',desc: 'Work on real projects and practical assignments.' },
  { num: 5, icon: Award,       title: 'Get Certified', desc: 'Earn industry-recognized certificates.' },
  { num: 6, icon: Rocket,      title: 'Start Career',  desc: 'Launch your career with internships and job opportunities.' },
]

const container = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.1 } },
}
const item = {
  hidden:  { opacity: 0, scale: 0.85 },
  visible: { opacity: 1, scale: 1,    transition: { type: 'spring', stiffness: 120, damping: 15 } },
}

export default function LearningJourney() {
  return (
    <section id="admission" className="py-24 px-4 sm:px-6 lg:px-8 bg-white/70 backdrop-blur-sm">
      <div className="max-w-6xl mx-auto">

        {/* Header */}
        <div className="text-center mb-20">
          <span className="section-tag mb-3 inline-block">Our Process</span>
          <h2 className="font-space font-extrabold text-3xl sm:text-4xl text-slate-900 mt-3">
            Your Learning Journey
          </h2>
          <div className="w-12 h-1 bg-blue-600 mx-auto mt-4 rounded-full" />
        </div>

        {/* Steps */}
        <motion.div
          variants={container}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-80px' }}
          className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-10"
        >
          {STEPS.map((step, i) => {
            const Icon = step.icon
            const isLast = i === STEPS.length - 1
            return (
              <motion.div
                key={step.num}
                variants={item}
                className="flex flex-col items-center text-center gap-3 relative"
              >
                {/* Icon circle */}
                <div className="relative">
                  <div className="w-16 h-16 rounded-full bg-blue-600 flex items-center justify-center shadow-lg shadow-blue-500/25 text-white z-10 relative hover:bg-blue-700 transition-colors">
                    <Icon className="w-6 h-6" />
                  </div>
                  {/* Step number badge */}
                  <div className="absolute -top-1.5 -right-1.5 w-6 h-6 bg-slate-900 border-2 border-white rounded-full flex items-center justify-center text-white text-[10px] font-black z-20">
                    {step.num}
                  </div>
                </div>

                {/* Arrow (desktop, between steps) */}
                {!isLast && (
                  <div className="absolute top-8 left-[calc(50%+36px)] w-[calc(100%-72px)] h-px bg-gradient-to-r from-blue-500 to-blue-200 hidden lg:block pointer-events-none" />
                )}

                <div>
                  <h3 className="font-space font-extrabold text-slate-900 text-sm uppercase tracking-wide mb-1">
                    {step.title}
                  </h3>
                  <p className="text-slate-500 text-xs leading-relaxed max-w-[130px] mx-auto">
                    {step.desc}
                  </p>
                </div>
              </motion.div>
            )
          })}
        </motion.div>
      </div>
    </section>
  )
}
