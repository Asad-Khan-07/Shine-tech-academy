import { motion } from 'framer-motion'
import { Briefcase, Star, ArrowRight } from 'lucide-react'

const fadeIn = {
  hidden:  { opacity: 0, y: 30 },
  visible: { opacity: 1, y: 0,  transition: { duration: 0.6 } },
}

export default function Internship() {
  return (
    <section id="internship" className="py-24 px-4 sm:px-6 lg:px-8 bg-slate-50/60 backdrop-blur-sm">
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">

          {/* Left: Image */}
          <motion.div
            variants={fadeIn}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            className="relative"
          >
            <div className="rounded-2xl overflow-hidden shadow-xl aspect-[4/3]">
              <img
                src="https://images.unsplash.com/photo-1522071820081-009f0129c71c?w=700&q=80&fit=crop"
                alt="Students working on real projects and internships"
                className="w-full h-full object-cover"
                loading="lazy"
              />
            </div>
            {/* Floating badge */}
            <div className="absolute -bottom-5 -right-5 bg-white rounded-2xl shadow-xl p-4 flex items-center gap-3 border border-slate-100">
              <div className="w-12 h-12 bg-blue-600 rounded-xl flex items-center justify-center text-white flex-shrink-0">
                <Briefcase className="w-5 h-5" />
              </div>
              <div>
                <p className="text-slate-900 font-bold text-sm">Internship Ready</p>
                <p className="text-slate-500 text-xs">After course completion</p>
              </div>
            </div>
          </motion.div>

          {/* Right: Content */}
          <motion.div
            variants={fadeIn}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            transition={{ delay: 0.15 }}
            className="flex flex-col gap-6"
          >
            <span className="section-tag">Internship & Career Support</span>
            <h2 className="font-space font-extrabold text-3xl sm:text-4xl text-slate-900 leading-tight">
              Learn. Build. <span className="text-blue-600">Earn.</span>
              <br />Start Your Career Starts Here.
            </h2>
            <p className="text-slate-600 text-base leading-relaxed">
              Learn skills, build a portfolio, work on real projects, and prepare for internships and freelance opportunities. We support you every step of the way — from your first class to your first paycheck.
            </p>

            {/* Feature list */}
            <ul className="flex flex-col gap-3">
              {[
                'Real project experience during the course',
                'Portfolio review and guidance',
                'Internship placement assistance',
                'Freelancing skills for platforms like Fiverr & Upwork',
              ].map((point) => (
                <li key={point} className="flex items-start gap-3">
                  <div className="w-5 h-5 rounded-full bg-blue-100 flex items-center justify-center flex-shrink-0 mt-0.5">
                    <Star className="w-3 h-3 text-blue-600 fill-blue-600" />
                  </div>
                  <span className="text-slate-700 text-sm leading-relaxed">{point}</span>
                </li>
              ))}
            </ul>

            <div>
              <a
                href="#contact"
                onClick={e => { e.preventDefault(); document.querySelector('#contact')?.scrollIntoView({ behavior: 'smooth' }) }}
                className="btn-primary px-7 py-3.5 rounded-full text-sm inline-flex items-center gap-2 shadow-lg shadow-blue-500/20"
              >
                Get Started <ArrowRight className="w-4 h-4" />
              </a>
            </div>
          </motion.div>

        </div>
      </div>
    </section>
  )
}
