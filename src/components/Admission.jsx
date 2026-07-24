import { useRef } from 'react'
import { motion, useScroll, useTransform } from 'framer-motion'
import { FileText, Mic, CreditCard, PartyPopper, Rocket, GraduationCap, ChevronRight } from 'lucide-react'

const STEPS = [
  {
    num: '01',
    icon: FileText,
    title: 'Register',
    desc: 'Fill out the online application form. It only takes 2 minutes!',
    color: 'from-blue-600 to-blue-500',
  },
  {
    num: '02',
    icon: Mic,
    title: 'Counseling',
    desc: 'Our team will contact you for a free counseling session to pick the right course.',
    color: 'from-blue-600 to-blue-500',
  },
  {
    num: '03',
    icon: CreditCard,
    title: 'Fee Deposit',
    desc: 'Submit the course fee via easy installment-friendly payment plans.',
    color: 'from-blue-600 to-blue-500',
  },
  {
    num: '04',
    icon: PartyPopper,
    title: 'Orientation',
    desc: 'Attend the kickoff orientation — meet your batch, mentors, and understand the roadmap.',
    color: 'from-blue-700 to-blue-600',
  },
  {
    num: '05',
    icon: Rocket,
    title: 'Classes Begin',
    desc: 'Your transformation journey starts! Attend live classes, build projects, grow every day.',
    color: 'from-blue-600 to-blue-500',
  },
]

const container = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.12 } },
}
const card = {
  hidden: { opacity: 0, y: 30 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.5, ease: 'easeOut' } },
}

export default function Admission() {
  const timelineRef = useRef(null)
  const { scrollYProgress } = useScroll({
    target: timelineRef,
    offset: ["start 70%", "end 60%"]
  })
  
  const heightProgress = useTransform(scrollYProgress, [0, 1], ["0%", "100%"])

  return (
    <section id="admission" className="py-16 sm:py-24 px-4 sm:px-6 lg:px-8 bg-slate-50/60 backdrop-blur-sm relative overflow-hidden">
      <div className="absolute bottom-0 right-1/2 w-80 h-80 bg-blue-500/5 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-12 sm:mb-16"
        >
          <span className="inline-block text-blue-600 text-xs sm:text-sm font-semibold tracking-widest uppercase mb-4 px-4 py-1.5 rounded-full border border-blue-500/30 bg-blue-500/5">
            Getting Started
          </span>
          <h2 className="font-space font-bold text-3xl sm:text-4xl md:text-5xl text-slate-900 mb-4 sm:mb-6">
            Admission <span className="text-blue-600">Process</span>
          </h2>
          <p className="text-slate-600 text-sm sm:text-lg max-w-2xl mx-auto">
            Simple, transparent, and student-friendly. From application to first class in just 5 steps.
          </p>
        </motion.div>

        {/* Steps — Desktop horizontal */}
        <motion.div
          variants={container}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-60px' }}
          className="hidden lg:flex items-start gap-0"
        >
          {STEPS.map((step, i) => {
            const Icon = step.icon
            return (
              <motion.div key={step.num} variants={card} className="flex items-start flex-1">
                <div className="bg-white rounded-2xl p-6 flex flex-col gap-3 group flex-1 border border-slate-100 shadow-sm hover:shadow-md transition-all duration-300">
                  <div className={`w-12 h-12 rounded-xl bg-gradient-to-br ${step.color} flex items-center justify-center text-white font-space font-black text-sm shadow-lg group-hover:scale-110 transition-transform duration-300`}>
                    {step.num}
                  </div>
                  <div className="w-10 h-10 rounded-xl bg-blue-50 border border-blue-100 flex items-center justify-center">
                    <Icon className="w-5 h-5 text-blue-600" />
                  </div>
                  <h3 className="font-space font-bold text-slate-900 text-base">{step.title}</h3>
                  <p className="text-slate-500 text-xs leading-relaxed">{step.desc}</p>
                </div>

                {i < STEPS.length - 1 && (
                  <div className="flex items-center self-center px-1 mt-[-20px]">
                    <ChevronRight className="w-5 h-5 text-slate-300" />
                  </div>
                )}
              </motion.div>
            )
          })}
        </motion.div>

        {/* Steps — Mobile/Tablet vertical with scroll progress line */}
        <div className="lg:hidden relative" ref={timelineRef}>
          {/* Static Background track */}
          <div 
            className="absolute left-6 w-0.5 bg-slate-200" 
            style={{ top: '24px', bottom: '24px', transform: 'translateX(-50%)' }}
          />
          {/* Dynamic Progress indicator */}
          <motion.div 
            className="absolute left-6 w-0.5 bg-gradient-to-b from-blue-500 to-indigo-500 z-10" 
            style={{ 
              top: '24px', 
              height: heightProgress,
              transform: 'translateX(-50%)',
              boxShadow: '0 0 10px rgba(59, 130, 246, 0.5)'
            }}
          />

          <motion.div
            variants={container}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: '-40px' }}
            className="flex flex-col gap-0"
          >
            {STEPS.map((step, i) => {
              const Icon = step.icon
              return (
                <motion.div key={step.num} variants={card} className="flex gap-4 relative z-20">
                  <div className="flex flex-col items-center flex-shrink-0">
                    <div className={`w-12 h-12 rounded-xl bg-gradient-to-br ${step.color} flex items-center justify-center text-white font-space font-black text-sm shadow-lg flex-shrink-0`}>
                      {step.num}
                    </div>
                    <div className="w-12 flex-1 min-h-[40px]" />
                  </div>
                  <div className="bg-white border border-slate-100 shadow-sm rounded-2xl p-4 sm:p-5 flex flex-col gap-2 mb-5 flex-1">
                    <div className="w-9 h-9 rounded-lg bg-blue-50 border border-blue-100 flex items-center justify-center">
                      <Icon className="w-4 h-4 text-blue-600" />
                    </div>
                    <h3 className="font-space font-bold text-slate-900 text-sm sm:text-base">{step.title}</h3>
                    <p className="text-slate-500 text-xs sm:text-sm leading-relaxed">{step.desc}</p>
                  </div>
                </motion.div>
              )
            })}
          </motion.div>
        </div>

        {/* CTA */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.3 }}
          className="text-center mt-10 sm:mt-12"
        >
          <a
            href="#apply"
            id="admission-apply-btn"
            className="btn-primary px-8 sm:px-10 py-3.5 sm:py-4 rounded-2xl text-sm sm:text-base font-bold inline-flex items-center gap-2"
          >
            <GraduationCap className="w-5 h-5" />
            Start Your Application
          </a>
        </motion.div>

        <div className="section-divider mt-16" />
      </div>
    </section>
  )
}
