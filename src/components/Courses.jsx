import { useState, useEffect } from 'react'
import { createPortal } from 'react-dom'
import { motion, AnimatePresence } from 'framer-motion'
import {
  Clock, Monitor, DollarSign, BookOpen, ArrowRight, ShieldCheck, Hourglass, Sparkles, X, CheckCircle
} from 'lucide-react'

const LEVEL_STYLES = {
  Foundation: { bg: 'bg-emerald-100', text: 'text-emerald-700' },
  Beginner: { bg: 'bg-blue-100', text: 'text-blue-700' },
  Intermediate: { bg: 'bg-amber-100', text: 'text-amber-700' },
  'Advanced Diploma': { bg: 'bg-purple-100', text: 'text-purple-700' },
}

const LIVE_COURSES = [
  {
    id: 'cit',
    title: 'Computer & IT Fundamentals (CIT)',
    level: 'Foundation',
    duration: '3 Months',
    mode: 'Online & Onsite',
    admissionFee: 'Rs. 1,000',
    monthlyFee: 'Rs. 1,999/mo',
    image: 'https://images.unsplash.com/photo-1533022139390-e31c488d69e2?w=600&q=80&fit=crop',
    imageAlt: 'Computer fundamentals and IT skills',
    curriculum: [
      'Introduction to Computers & Hardware',
      'Operating Systems (Windows & Linux)',
      'Microsoft Office Suite (Word, Excel, PPT)',
      'Internet Basics & Email Etiquette',
      'Typing & Productivity Tools',
      'Introduction to Programming Logic',
      'Cyber Safety & Digital Citizenship',
      'Basic Troubleshooting & Tech Support',
      'Final Project & Presentation',
    ],
  },
  {
    id: 'ai-everyone',
    title: 'AI for Everyone',
    level: 'Beginner',
    duration: '3 Months',
    mode: 'Online & Onsite',
    admissionFee: 'Rs. 1,000',
    monthlyFee: 'Rs. 2,499/mo',
    image: 'https://images.unsplash.com/photo-1677442135703-1787eea5ce01?w=600&q=80&fit=crop',
    imageAlt: 'Artificial Intelligence for everyone',
    curriculum: [
      'What is AI? — History & Basics',
      'Machine Learning Fundamentals',
      'Neural Networks & Deep Learning',
      'AI in Everyday Life',
      'Ethics & Bias in AI',
      'Hands-on with AI Tools',
      'Building a Simple AI Model',
      'Career Opportunities in AI',
      'Final Project: AI Solution Prototype',
    ],
  },
  {
    id: 'ai-productivity',
    title: 'AI Productivity & Prompt Engineering',
    level: 'Intermediate',
    duration: '3 Months',
    mode: 'Online & Onsite',
    admissionFee: 'Rs. 1,000',
    monthlyFee: 'Rs. 2,999/mo',
    image: 'https://images.unsplash.com/photo-1620712943543-bcc4688e7485?w=600&q=80&fit=crop',
    imageAlt: 'AI productivity tools and prompt engineering',
    curriculum: [
      'Introduction to Generative AI',
      'ChatGPT, Claude & Gemini Mastery',
      'Advanced Prompt Engineering Techniques',
      'AI for Content Creation',
      'AI for Data Analysis & Reports',
      'Automating Workflows with AI',
      'AI Tools for Developers & Designers',
      'Building Custom GPTs & AI Agents',
      'Capstone: AI Productivity System',
    ],
  },
  {
    id: 'digital-marketing',
    title: 'Digital Marketing & Personal Branding',
    level: 'Intermediate',
    duration: '3 Months',
    mode: 'Online & Onsite',
    admissionFee: 'Rs. 1,000',
    monthlyFee: 'Rs. 2,999/mo',
    image: 'https://images.unsplash.com/photo-1432888498266-38ffec3eaf0a?w=600&q=80&fit=crop',
    imageAlt: 'Digital marketing and personal branding',
    curriculum: [
      'Digital Marketing Fundamentals',
      'SEO & Search Engine Marketing',
      'Social Media Strategy & Management',
      'Content Marketing & Copywriting',
      'Google Ads & Facebook Ads',
      'Email Marketing & Automation',
      'Personal Branding on LinkedIn',
      'Analytics & Performance Tracking',
      'Final Project: Full Campaign Plan',
    ],
  },
  {
    id: 'mern',
    title: 'Professional Diploma in Modern MERN Stack Engineering',
    level: 'Advanced Diploma',
    duration: '4 Months',
    mode: 'Online & Onsite',
    admissionFee: 'Rs. 1,000',
    monthlyFee: 'Rs. 4,999/mo',
    image: 'https://images.unsplash.com/photo-1593720213428-28a5b9e94613?w=600&q=80&fit=crop',
    imageAlt: 'MERN stack web development',
    curriculum: [
      'HTML5, CSS3 & Responsive Design',
      'JavaScript (ES6+) Fundamentals',
      'React.js — Components, Hooks & State',
      'Node.js & Express.js Backend',
      'MongoDB — Database Design & CRUD',
      'Authentication & Authorization',
      'RESTful APIs & Deployment',
      'Version Control with Git & GitHub',
      'Capstone: Full-Stack MERN Application',
    ],
  },
]

const COMING_SOON = [
  { id: 'ai-advanced',  title: 'Artificial Intelligence (Advanced)',  level: 'Advanced Diploma', duration: '4 Months', mode: 'Online & Onsite', curriculum: ['Advanced Machine Learning', 'Deep Learning & Neural Networks', 'Computer Vision', 'Natural Language Processing', 'Reinforcement Learning', 'AI Model Deployment', 'AI Model Optimization', 'Research & Development', 'Final AI Project'] },
  { id: 'agentic-ai',  title: 'Agentic AI',                         level: 'Advanced Diploma', duration: '4 Months', mode: 'Online & Onsite', curriculum: ['Foundations of Agentic AI', 'Autonomous Agents & Planning', 'Multi-Agent Systems', 'Tool Use & Function Calling', 'Memory & Reasoning', 'Safety & Alignment', 'Building AI Assistants', 'Real-World Agentic AI Case Studies', 'Capstone: AI Agent Application'] },
  // { id: 'data-science', title: 'Data Science',                       level: 'Advanced Diploma', duration: '4 Months', mode: 'Online & Onsite', curriculum: ['Python for Data Science', 'Statistics & Probability', 'Data Wrangling & Cleaning', 'Data Visualization', 'Machine Learning Algorithms', 'SQL & Big Data', 'Data Storytelling', 'Final Data Science Project'] },
  // { id: 'cyber',        title: 'Cyber Security',                     level: 'Advanced Diploma', duration: '4 Months', mode: 'Online & Onsite', curriculum: ['Network Security Fundamentals', 'Ethical Hacking & Penetration Testing', 'Cryptography Basics', 'Security Operations (SOC)', 'Incident Response', 'Web Application Security', 'Digital Forensics', 'Final Security Assessment'] },
  // { id: 'flutter',      title: 'Flutter App Development',            level: 'Intermediate',     duration: '3 Months', mode: 'Online & Onsite', curriculum: ['Dart Programming Basics', 'Flutter Widgets & UI', 'State Management', 'Navigation & Routing', 'API Integration', 'Firebase & Backend', 'App Store Deployment', 'Final Mobile App Project'] },
  { id: 'graphic-d',    title: 'Professional Graphic Designing',     level: 'Intermediate',     duration: '3 Months', mode: 'Online & Onsite', curriculum: ['Design Principles & Color Theory', 'Adobe Photoshop Mastery', 'Adobe Illustrator Basics', 'Typography & Layout', 'Logo & Brand Identity', 'Social Media Graphics', 'Print & Packaging Design Basics', 'Portfolio Development', 'Final Design Project'] },
  { id: 'video-e',      title: 'Professional Video Editing',         level: 'Intermediate',     duration: '3 Months', mode: 'Online & Onsite', curriculum: ['Video Editing Fundamentals', 'Adobe Premiere Pro', 'Motion Graphics in After Effects', 'Color Grading & Audio', 'Sound Design & Audio Mixing', 'Storytelling through Video', 'YouTube & Short-form Content', 'CapCut Advanced Techniques', 'Final Video Portfolio'] },
  // { id: 'ecommerce',    title: 'E-Commerce & Shopify',               level: 'Intermediate',     duration: '3 Months', mode: 'Online & Onsite', curriculum: ['E-Commerce Business Models', 'Shopify Store Setup & Design', 'Product Listing & Optimization', 'Payment Gateways & Shipping', 'Marketing & SEO for Stores', 'Customer Service & Retention', 'Analytics & Growth', 'Final E-Commerce Launch'] },
]

const container = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.08 } },
}
const cardAnim = {
  hidden:  { opacity: 0, y: 25 },
  visible: { opacity: 1, y: 0,  transition: { duration: 0.5, ease: 'easeOut' } },
}

function CurriculumModal({ course, onClose, onApply }) {
  // Prevent body scroll when modal open
  useEffect(() => {
    if (course) {
      document.body.style.overflow = 'hidden'
    } else {
      document.body.style.overflow = ''
    }
    return () => { document.body.style.overflow = '' }
  }, [course])

  return createPortal(
    <AnimatePresence>
      {course && (
        <motion.div
          key="modal-backdrop"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          style={{ position: 'fixed', inset: 0, zIndex: 99999, display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '1rem', background: 'rgba(15, 23, 42, 0.65)', backdropFilter: 'blur(6px)' }}
          onClick={onClose}
        >
          <motion.div
            key="modal-box"
            initial={{ opacity: 0, scale: 0.9, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.9, y: 20 }}
            transition={{ duration: 0.25 }}
            onClick={(e) => e.stopPropagation()}
            style={{ background: '#ffffff', borderRadius: '1.25rem', boxShadow: '0 25px 50px -12px rgba(0, 0, 0, 0.25)', maxWidth: '520px', width: '95vw', maxHeight: '85vh', overflowY: 'auto' }}
          >
            {/* Header */}
            <div style={{ position: 'sticky', top: 0, background: '#ffffff', borderBottom: '1px solid #e2e8f0', padding: '1rem 1.25rem', display: 'flex', alignItems: 'center', justifyContent: 'space-between', borderRadius: '1.25rem 1.25rem 0 0', zIndex: 10 }}>
              <div>
                <h3 style={{ fontFamily: 'Space Grotesk, sans-serif', fontWeight: 800, color: '#0f172a', fontSize: '1.05rem', margin: 0, lineHeight: 1.3 }}>{course.title}</h3>
                <p style={{ color: '#2563eb', fontSize: '0.8rem', fontWeight: 700, marginTop: '0.25rem' }}>{course.level} &bull; {course.duration}</p>
              </div>
              <button
                onClick={onClose}
                style={{ width: '2.25rem', height: '2.25rem', borderRadius: '50%', background: '#f1f5f9', border: 'none', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#64748b', flexShrink: 0 }}
              >
                <X style={{ width: '1.1rem', height: '1.1rem' }} />
              </button>
            </div>

            {/* Curriculum List */}
            <div style={{ padding: '1.5rem' }}>
              <p style={{ color: '#64748b', fontSize: '0.75rem', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.08em', marginBottom: '1rem' }}>Course Curriculum</p>
              <ul style={{ listStyle: 'none', padding: 0, margin: 0, display: 'flex', flexDirection: 'column', gap: '0.85rem' }}>
                {course.curriculum?.map((item, i) => (
                  <li key={i} style={{ display: 'flex', alignItems: 'flex-start', gap: '0.75rem' }}>
                    <CheckCircle style={{ width: '1.1rem', height: '1.1rem', color: '#2563eb', marginTop: '0.1rem', flexShrink: 0 }} />
                    <span style={{ color: '#1e293b', fontSize: '0.9rem', fontWeight: 500, lineHeight: 1.4 }}>{item}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* Footer */}
            <div style={{ borderTop: '1px solid #e2e8f0', padding: '1.25rem 1.5rem', display: 'flex', gap: '0.75rem', background: '#f8fafc', borderRadius: '0 0 1.25rem 1.25rem' }}>
              <button
                onClick={onClose}
                style={{ flex: 1, background: '#ffffff', color: '#475569', fontWeight: 700, fontSize: '0.875rem', padding: '0.75rem 1rem', borderRadius: '0.75rem', border: '1px solid #cbd5e1', cursor: 'pointer' }}
              >
                Close
              </button>
              <button
                onClick={() => {
                  onClose()
                  if (onApply) onApply()
                }}
                style={{ flex: 1, background: 'linear-gradient(135deg, #2563eb, #1d4ed8)', color: '#ffffff', fontWeight: 700, fontSize: '0.875rem', padding: '0.75rem 1rem', borderRadius: '0.75rem', border: 'none', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '0.5rem', boxShadow: '0 4px 14px rgba(37,99,235,0.35)' }}
              >
                Enroll Now <ArrowRight style={{ width: '1rem', height: '1rem' }} />
              </button>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>,
    document.body
  )
}

function CourseCard({ course, live, onViewCurriculum, onApply }) {
  const levelStyle = LEVEL_STYLES[course.level]
  return (
    <motion.div
      variants={cardAnim}
      className="bg-white rounded-2xl border border-slate-100 overflow-hidden flex flex-col card-hover shadow-sm relative group shimmer-on-hover glow-border"
    >
      {!live && (
        <div className="absolute top-3 right-3 z-10 flex items-center gap-1 bg-amber-400 text-amber-900 text-[10px] font-bold px-2.5 py-1 rounded-full shadow-md">
          <Hourglass className="w-3 h-3" />
          Coming Soon
        </div>
      )}
      {live && (
        <div className="absolute top-3 right-3 z-10 flex items-center gap-1 bg-green-500 text-white text-[10px] font-bold px-2.5 py-1 rounded-full shadow-md">
          <Sparkles className="w-3 h-3" />
          Admissions Open
        </div>
      )}

      {/* Image Block: w-full, landscape aspect-ratio so it isn't overly tall on mobile */}
      <div className="relative w-full aspect-[16/10] overflow-hidden bg-slate-50 border-b border-slate-100">
        <img
          src={course.image || 'https://images.unsplash.com/photo-1516321318423-f06f85e504b3?w=600&q=80&fit=crop'}
          alt={course.imageAlt || course.title}
          className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
          loading="lazy"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-slate-900/60 via-slate-900/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
      </div>

      {/* Content */}
      <div className="p-5 flex flex-col flex-1 gap-4">
        {/* Title and Level */}
        <div>
          <span className={`${levelStyle.bg} ${levelStyle.text} text-[10px] font-bold px-2.5 py-1 rounded-full whitespace-nowrap inline-block mb-2`}>
            {course.level}
          </span>
          <h3 className="text-slate-900 font-space font-extrabold text-lg leading-snug">
            {course.title}
          </h3>
        </div>

        {/* Info Grid */}
        <div className="grid grid-cols-2 gap-2">
          <div className="flex items-center gap-2 bg-slate-50 rounded-lg px-3 py-2">
            <Clock className="w-3.5 h-3.5 text-blue-500 flex-shrink-0" />
            <div>
              <p className="text-[10px] text-slate-400 font-medium uppercase tracking-wide">Duration</p>
              <p className="text-xs font-bold text-slate-800">{course.duration}</p>
            </div>
          </div>
          <div className="flex items-center gap-2 bg-slate-50 rounded-lg px-3 py-2">
            <Monitor className="w-3.5 h-3.5 text-blue-500 flex-shrink-0" />
            <div>
              <p className="text-[10px] text-slate-400 font-medium uppercase tracking-wide">Mode</p>
              <p className="text-xs font-bold text-slate-800">{course.mode}</p>
            </div>
          </div>
          {live && course.admissionFee && (
            <div className="flex items-center gap-2 bg-slate-50 rounded-lg px-3 py-2">
              <ShieldCheck className="w-3.5 h-3.5 text-blue-500 flex-shrink-0" />
              <div>
                <p className="text-[10px] text-slate-400 font-medium uppercase tracking-wide">Admission Fee</p>
                <p className="text-xs font-bold text-slate-800">{course.admissionFee}</p>
              </div>
            </div>
          )}
          {live && course.monthlyFee && (
            <div className="flex items-center gap-2 bg-slate-50 rounded-lg px-3 py-2">
              <DollarSign className="w-3.5 h-3.5 text-blue-500 flex-shrink-0" />
              <div>
                <p className="text-[10px] text-slate-400 font-medium uppercase tracking-wide">Monthly Fee</p>
                <p className="text-xs font-bold text-slate-800">{course.monthlyFee}</p>
              </div>
            </div>
          )}
        </div>

        {/* FREE Demo Badge */}
        {live && (
          <div className="flex items-center gap-1.5 bg-green-50 border border-green-200 rounded-lg px-3 py-1.5">
            <Sparkles className="w-3.5 h-3.5 text-green-600 flex-shrink-0" />
            <span className="text-[11px] font-bold text-green-700">100% FREE Demo Class</span>
          </div>
        )}

        {/* Actions */}
        <div className="flex items-center gap-2 pt-1 mt-auto relative z-20">
          <button
            type="button"
            onClick={(e) => {
              e.stopPropagation()
              onViewCurriculum(course)
            }}
            className="flex-1 flex items-center justify-center gap-1.5 border border-blue-200 text-blue-600 font-bold text-xs py-2.5 rounded-xl hover:bg-blue-50 transition-all cursor-pointer relative z-20"
          >
            <BookOpen className="w-3.5 h-3.5" />
            View Curriculum
          </button>
          {live ? (
            <button
              type="button"
              onClick={(e) => {
                e.stopPropagation()
                if (onApply) onApply()
              }}
              className="flex-1 flex items-center justify-center gap-1.5 bg-gradient-to-r from-blue-600 to-indigo-600 text-white font-bold text-xs py-2.5 rounded-xl hover:from-blue-700 hover:to-indigo-700 transition-all shadow-sm shadow-blue-200 cursor-pointer relative z-20"
            >
              Enroll Now <ArrowRight className="w-3.5 h-3.5" />
            </button>
          ) : (
            <button type="button" className="flex-1 flex items-center justify-center gap-1.5 bg-slate-200 text-slate-500 font-bold text-xs py-2.5 rounded-xl cursor-not-allowed">
              Notify Me
            </button>
          )}
        </div>
      </div>
    </motion.div>
  )
}

export default function Courses({ onApply }) {
  const [selectedCourse, setSelectedCourse] = useState(null)

  return (
    <section id="courses" className="py-16 sm:py-24 px-4 sm:px-6 lg:px-8 bg-slate-50/60 backdrop-blur-sm">
      <div className="max-w-7xl mx-auto">

        {/* Live Courses Header */}
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 mb-12">
          <div>
            <span className="section-tag mb-3 inline-block">Live Admissions Open</span>
            <h2 className="font-space font-extrabold text-3xl sm:text-4xl md:text-5xl text-slate-900">
              Admissions Open
            </h2>
            <p className="text-slate-500 mt-2 max-w-xl">
              Start your journey toward a successful tech career with industry focused Certificate and Diploma programs. Learn through live classes, practical projects, expert mentorship, and hands-on training Available both Online & Onsite.
            </p>
          </div>
        </div>

        {/* Live Courses Grid */}
        <motion.div
          variants={container}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-80px' }}
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-7 mb-20"
        >
          {LIVE_COURSES.map((course) => (
            <CourseCard key={course.id} course={course} live onViewCurriculum={setSelectedCourse} onApply={onApply} />
          ))}
        </motion.div>

        {/* Coming Soon Header */}
        {/* <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 mb-12">
          <div>
            <span className="section-tag mb-3 inline-block">Coming Soon</span>
            <h2 className="font-space font-extrabold text-3xl sm:text-4xl md:text-5xl text-slate-900">
              Next Programs
            </h2>
            <p className="text-slate-500 mt-2 max-w-xl">
              Stay tuned — these advanced programs are launching soon.
            </p>
          </div>
        </div> */}

        {/* Coming Soon Grid */}
        {/* <motion.div
          variants={container}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-80px' }}
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6"
        >
          {COMING_SOON.map((course) => (
            <CourseCard key={course.id} course={course} live={false} onViewCurriculum={setSelectedCourse} onApply={onApply} />
          ))}
        </motion.div> */}
      </div>

      {/* Curriculum Modal */}
      <CurriculumModal course={selectedCourse} onClose={() => setSelectedCourse(null)} onApply={onApply} />
    </section>
  )
}