import { motion } from 'framer-motion'
import { Star, Quote } from 'lucide-react'

const INSTRUCTORS = [
  {
    name: 'Ahmad Raza',
    role: 'AI & Web Development',
    bio: 'Senior software engineer with 8+ years of experience in AI, MERN stack, and cloud technologies.',
    initials: 'AR',
    color: 'bg-blue-600',
  },
  {
    name: 'Hira Zainab',
    role: 'Digital Marketing',
    bio: 'Digital marketing strategist specializing in SEO, social media, and personal branding for tech professionals.',
    initials: 'HZ',
    color: 'bg-violet-600',
  },
  {
    name: 'Usman Ali',
    role: 'Graphic Design & Video Editing',
    bio: 'Creative professional with expertise in Adobe Suite, motion graphics, and visual storytelling.',
    initials: 'UA',
    color: 'bg-emerald-600',
  },
  {
    name: 'Sadia Khan',
    role: 'Data Science & AI',
    bio: 'Data scientist with experience in machine learning, deep learning, and data analytics.',
    initials: 'SK',
    color: 'bg-rose-600',
  },
]

export default function Instructors() {
  return (
    <section id="instructors" className="py-24 px-4 sm:px-6 lg:px-8 bg-white overflow-hidden">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="text-center mb-16">
          <span className="section-tag mb-3 inline-block">Expert Mentors</span>
          <h2 className="font-space font-extrabold text-3xl sm:text-4xl md:text-5xl text-slate-900">
            Meet Your <span className="text-blue-600">Instructors</span>
          </h2>
          <p className="text-slate-500 mt-3 max-w-xl mx-auto">
            Learn from industry professionals with years of real-world experience.
          </p>
        </div>

        {/* Grid */}
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-80px' }}
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6"
        >
          {INSTRUCTORS.map((inst, i) => (
            <motion.div
              key={inst.name}
              initial={{ opacity: 0, y: 25 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: i * 0.1 }}
              className="bg-slate-50 rounded-2xl p-6 border border-slate-100 text-center card-hover flex flex-col items-center gap-4"
            >
              <div className={`w-20 h-20 rounded-full ${inst.color} flex items-center justify-center text-white font-space font-black text-2xl shadow-lg`}>
                {inst.initials}
              </div>
              <div>
                <h3 className="font-space font-extrabold text-slate-900 text-base">{inst.name}</h3>
                <p className="text-blue-600 text-xs font-semibold mt-0.5">{inst.role}</p>
              </div>
              <div className="relative">
                <Quote className="w-3.5 h-3.5 text-slate-300 absolute -top-1 -left-1" />
                <p className="text-slate-500 text-xs leading-relaxed pl-4">{inst.bio}</p>
              </div>
              <div className="flex items-center gap-1">
                {[...Array(5)].map((_, j) => (
                  <Star key={j} className="w-3 h-3 text-amber-400 fill-amber-400" />
                ))}
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  )
}
