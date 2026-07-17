import { motion } from 'framer-motion'
import { ArrowRight, Clock } from 'lucide-react'

const COURSES = [
  {
    id: 'ai',
    title: 'AI Productivity',
    subtitle: 'AI Tools, Prompt Engineering, ChatGPT, Automation & More',
    duration: '1.5 Months',
    image: 'https://images.unsplash.com/photo-1677442135703-1787eea5ce01?w=600&q=80&fit=crop',
    imageAlt: 'Artificial Intelligence tools and automation',
  },
  {
    id: 'web',
    title: 'Web Development',
    subtitle: 'HTML, CSS, JavaScript, React, Node.js & More',
    duration: '6 Months',
    image: 'https://images.unsplash.com/photo-1593720213428-28a5b9e94613?w=600&q=80&fit=crop',
    imageAlt: 'Web development coding on laptop',
  },
  {
    id: 'design',
    title: 'Graphic Design',
    subtitle: 'Photoshop, Illustrator, CorelDRAW, Canva & More',
    duration: '3 Months',
    image: 'https://images.unsplash.com/photo-1561070791-2526d30994b5?w=600&q=80&fit=crop',
    imageAlt: 'Graphic design tools and creative work',
  },
  {
    id: 'marketing',
    title: 'Digital Marketing',
    subtitle: 'SEO, Social Media, Google Ads, Content Marketing',
    duration: '2 Months',
    image: 'https://images.unsplash.com/photo-1432888498266-38ffec3eaf0a?w=600&q=80&fit=crop',
    imageAlt: 'Digital marketing analytics dashboard',
  },
  {
    id: 'video',
    title: 'Video Editing',
    subtitle: 'Premiere Pro, After Effects, CapCut & More',
    duration: '2 Months',
    image: 'https://images.unsplash.com/photo-1574717024653-61fd2cf4d44d?w=600&q=80&fit=crop',
    imageAlt: 'Video editing on computer timeline',
  },
  {
    id: 'freelancing',
    title: 'Freelancing',
    subtitle: 'Fiverr, Upwork, Proposals, Client Management & More',
    duration: '1 Month',
    image: 'https://images.unsplash.com/photo-1553877522-43269d4ea984?w=600&q=80&fit=crop',
    imageAlt: 'Freelancer working independently on laptop',
  },
]

const container = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.08 } },
}
const card = {
  hidden:  { opacity: 0, y: 25 },
  visible: { opacity: 1, y: 0,  transition: { duration: 0.5, ease: 'easeOut' } },
}

export default function Courses() {
  return (
    <section id="courses" className="py-24 px-4 sm:px-6 lg:px-8 bg-slate-50">
      <div className="max-w-7xl mx-auto">

        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 mb-14">
          <div>
            <span className="section-tag mb-3 inline-block">Popular Courses</span>
            <h2 className="font-space font-extrabold text-3xl sm:text-4xl md:text-5xl text-slate-900">
              Explore Our Top Courses
            </h2>
          </div>
          <a
            href="#contact"
            onClick={e => { e.preventDefault(); document.querySelector('#contact')?.scrollIntoView({ behavior: 'smooth' }) }}
            className="flex items-center gap-1.5 text-blue-600 font-bold text-sm hover:gap-3 transition-all whitespace-nowrap flex-shrink-0"
          >
            View All Courses <ArrowRight className="w-4 h-4" />
          </a>
        </div>

        {/* Cards Grid */}
        <motion.div
          variants={container}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-80px' }}
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-7"
        >
          {COURSES.map((course) => (
            <motion.div
              key={course.id}
              id={`course-${course.id}`}
              variants={card}
              className="bg-white rounded-2xl border border-slate-100 overflow-hidden flex flex-col card-hover shadow-sm"
            >
              {/* Image */}
              <div className="relative h-44 overflow-hidden">
                <img
                  src={course.image}
                  alt={course.imageAlt}
                  className="w-full h-full object-cover transition-transform duration-500 hover:scale-105"
                  loading="lazy"
                />
              </div>

              {/* Content */}
              <div className="p-5 flex flex-col flex-1 gap-2.5">
                <h3 className="font-space font-extrabold text-lg text-slate-900 leading-tight">
                  {course.title}
                </h3>
                <p className="text-slate-500 text-sm leading-relaxed flex-1">
                  {course.subtitle}
                </p>
                <div className="flex items-center justify-between pt-4 border-t border-slate-100">
                  <span className="flex items-center gap-1.5 text-slate-400 text-xs font-semibold">
                    <Clock className="w-3.5 h-3.5 text-blue-500" />
                    {course.duration}
                  </span>
                  <button className="flex items-center gap-1 text-blue-600 font-bold text-xs uppercase tracking-wide hover:gap-2 transition-all">
                    Enroll Now <ArrowRight className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>
            </motion.div>
          ))}
        </motion.div>

        {/* Mobile CTA */}
        <div className="text-center mt-10 sm:hidden">
          <a
            href="#contact"
            onClick={e => { e.preventDefault(); document.querySelector('#contact')?.scrollIntoView({ behavior: 'smooth' }) }}
            className="inline-flex items-center gap-2 bg-blue-600 text-white font-bold px-6 py-3 rounded-full text-sm hover:bg-blue-700 transition-colors"
          >
            View All Courses <ArrowRight className="w-4 h-4" />
          </a>
        </div>
      </div>
    </section>
  )
}
