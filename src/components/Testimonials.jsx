import { motion } from 'framer-motion'
import { Star, Quote } from 'lucide-react'

const REVIEWS = [
  {
    name: 'Ahmed Raza',
    role: 'Web Development Student',
    rating: 5,
    text: 'Shine Tech Academy ne meri zindagi badal di. Practical learning aur expert mentors ki wajah se ab main confidently freelancing kar raha hoon.',
    avatar: 'AR',
    color: 'bg-blue-600',
  },
  {
    name: 'Hira Zafar',
    role: 'Graphic Design Student',
    rating: 5,
    text: 'Best decision of my life! The graphic design course is incredibly well-structured. I already completed 2 client projects during the course.',
    avatar: 'HZ',
    color: 'bg-violet-600',
  },
  {
    name: 'Usman Ali',
    role: 'Digital Marketing Student',
    rating: 5,
    text: 'Instructors are very professional and supportive. The real project assignments helped me build a solid portfolio within months.',
    avatar: 'UA',
    color: 'bg-emerald-600',
  },
  {
    name: 'Sara Khan',
    role: 'AI Productivity Student',
    rating: 5,
    text: 'The AI course is amazing! I learned so many tools in just 6 weeks that I use daily in my work. Highly recommended!',
    avatar: 'SK',
    color: 'bg-rose-600',
  },
  // {
  //   name: 'Bilal Hassan',
  //   role: 'Freelancing Student',
  //   rating: 5,
  //   text: 'After completing the Freelancing course, I landed my first Fiverr order within 2 weeks. The guidance on proposals is gold.',
  //   avatar: 'BH',
  //   color: 'bg-amber-600',
  // },
  // {
  //   name: 'Nadia Malik',
  //   role: 'Video Editing Student',
  //   rating: 5,
  //   text: 'The video editing course is extremely thorough. From Premiere Pro to CapCut, I learned everything I needed to start earning.',
  //   avatar: 'NM',
  //   color: 'bg-pink-600',
  // },
]

const container = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.07 } },
}
const card = {
  hidden:  { opacity: 0, y: 30 },
  visible: { opacity: 1, y: 0,  transition: { duration: 0.5 } },
}

export default function Testimonials() {
  return (
    <section id="reviews" className="py-16 sm:py-24 px-4 sm:px-6 lg:px-8 bg-white/80 backdrop-blur-sm">
      <div className="max-w-7xl mx-auto">

        {/* Header */}
        <div className="text-center mb-14">
          <span className="section-tag mb-3 inline-block">Student Reviews</span>
          <h2 className="font-space font-extrabold text-3xl sm:text-4xl text-slate-900 mt-3">
            What Our Students Say
          </h2>
          <div className="w-20 h-1 bg-gradient-to-r from-blue-600 via-blue-400 to-blue-600 mx-auto mt-4 rounded-full" />
          <p className="text-slate-500 text-sm mt-4 max-w-md mx-auto">Real stories from real students who transformed their careers with Shine Tech Academy.</p>
        </div>

        {/* Grid */}
        <motion.div
          variants={container}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-80px' }}
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6"
        >
          {REVIEWS.map((r) => (
            <motion.div
              key={r.name}
              variants={card}
              className="testimonial-card p-6 flex flex-col gap-4 shimmer-on-hover"
            >
              {/* Gradient quote icon */}
              <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-blue-500 to-blue-700 flex items-center justify-center shadow-lg shadow-blue-500/20">
                <Quote className="w-5 h-5 text-white fill-white" />
              </div>

              {/* Stars */}
              <div className="flex gap-1">
                {Array.from({ length: r.rating }).map((_, i) => (
                  <Star key={i} className="w-4 h-4 text-amber-400 fill-amber-400" />
                ))}
              </div>

              {/* Review text */}
              <p className="text-slate-600 text-sm leading-relaxed flex-1">
                &ldquo;{r.text}&rdquo;
              </p>

              {/* Author */}
              <div className="flex items-center gap-3 pt-4 border-t border-slate-100">
                <div className={`w-11 h-11 rounded-full ${r.color} flex items-center justify-center text-white text-xs font-black flex-shrink-0 shadow-lg`}>
                  {r.avatar}
                </div>
                <div>
                  <p className="text-slate-900 font-bold text-sm">{r.name}</p>
                  <p className="text-slate-500 text-xs">{r.role}</p>
                </div>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  )
}
