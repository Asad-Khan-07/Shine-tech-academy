import { motion } from 'framer-motion'
import { Rocket, BookOpen, Award } from 'lucide-react'

export default function Hero() {
  return (
    <section
      id="hero"
      className="relative min-h-screen flex items-center bg-white pt-24 overflow-hidden"
    >
      {/* Subtle right blue panel */}
      <div className="absolute right-0 top-0 bottom-0 w-[45%] bg-blue-600 transform skew-x-[-8deg] translate-x-16 origin-top pointer-events-none hidden lg:block" />
      {/* Soft gradient overlay on left */}
      <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-r from-white via-white/95 to-transparent pointer-events-none hidden lg:block" />

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 w-full">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">

          {/* Left: Content */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
            className="flex flex-col gap-6"
          >
            <span className="section-tag">Welcome to Shine Tech Academy</span>

            <h1 className="font-space font-extrabold text-slate-900 text-4xl sm:text-5xl md:text-[56px] leading-[1.1]">
              Learn Future Skills.
              <br />
              Build Your{' '}
              <span className="text-blue-600">Career.</span>
            </h1>

            <p className="text-slate-600 text-base sm:text-lg leading-relaxed max-w-lg">
              Join Shine Tech Academy and gain practical skills in AI, Web Development, Graphic Design, Digital Marketing, and more.
            </p>

            <div className="flex flex-wrap gap-4 mt-2">
              <motion.a
                whileHover={{ scale: 1.03 }}
                whileTap={{ scale: 0.97 }}
                href="https://forms.google.com"
                target="_blank"
                rel="noopener noreferrer"
                className="btn-primary px-8 py-3.5 rounded-full text-sm sm:text-base shadow-lg shadow-blue-500/25"
              >
                <Rocket className="w-4 h-4" /> Apply Now
              </motion.a>
              <motion.button
                whileHover={{ scale: 1.03 }}
                whileTap={{ scale: 0.97 }}
                onClick={() => document.querySelector('#courses')?.scrollIntoView({ behavior: 'smooth' })}
                className="bg-slate-100 hover:bg-slate-200 text-slate-800 font-bold px-8 py-3.5 rounded-full text-sm sm:text-base transition-all flex items-center gap-2"
              >
                <BookOpen className="w-4 h-4" /> Explore Courses
              </motion.button>
            </div>

            {/* Social proof */}
            <div className="flex items-center gap-3 pt-4 border-t border-slate-100">
              <div className="flex -space-x-2">
                {[
                  { initials: 'AR', bg: 'bg-blue-600' },
                  { initials: 'HZ', bg: 'bg-violet-600' },
                  { initials: 'UA', bg: 'bg-emerald-600' },
                  { initials: 'SK', bg: 'bg-rose-600' },
                ].map((s, i) => (
                  <div
                    key={i}
                    className={`w-8 h-8 rounded-full ${s.bg} border-2 border-white flex items-center justify-center text-white text-[10px] font-black`}
                  >
                    {s.initials}
                  </div>
                ))}
              </div>
              <p className="text-xs text-slate-500 font-medium">
                <span className="text-slate-900 font-bold">500+</span> Students Already Enrolled
              </p>
            </div>
          </motion.div>

          {/* Right: Classroom Image */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.15 }}
            className="relative hidden lg:flex items-center justify-center"
          >
            <div className="relative rounded-2xl overflow-hidden shadow-2xl border-4 border-white w-full max-w-lg aspect-[4/3]">
              <img
                src="/public/classroom.png"
                alt="Shine Tech Academy students in classroom"
                className="w-full h-full object-cover"
                loading="eager"
              />
              {/* Overlay badge */}
              <div className="absolute bottom-4 left-4 right-4 bg-white/95 backdrop-blur-sm rounded-xl p-3 flex items-center gap-3 shadow-lg">
                <div className="w-10 h-10 bg-blue-600 rounded-lg flex items-center justify-center text-white flex-shrink-0">
                  <Award className="w-5 h-5" />
                </div>
                <div>
                  <p className="text-slate-900 font-bold text-sm">Industry Certified Courses</p>
                  <p className="text-slate-500 text-xs">Learn • Build • Earn</p>
                </div>
              </div>
            </div>
            {/* Decorative shadow block */}
            <div className="absolute top-4 left-4 -right-4 -bottom-4 bg-blue-600/10 rounded-2xl -z-10" />
          </motion.div>

        </div>
      </div>
    </section>
  )
}
