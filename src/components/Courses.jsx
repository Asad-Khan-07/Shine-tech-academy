import { useState } from 'react'
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
      'Capstone: Full-Stack MERN Application',
    ],
  },
]

const COMING_SOON = [
  { id: 'ai-advanced',  title: 'Artificial Intelligence (Advanced)',  level: 'Advanced Diploma', duration: '4 Months', mode: 'Online & Onsite', curriculum: ['Advanced Machine Learning', 'Deep Learning & Neural Networks', 'Computer Vision', 'Natural Language Processing', 'Reinforcement Learning', 'AI Model Deployment', 'Research & Development', 'Final AI Project'] },
  { id: 'agentic-ai',  title: 'Agentic AI',                         level: 'Advanced Diploma', duration: '4 Months', mode: 'Online & Onsite', curriculum: ['Foundations of Agentic AI', 'Autonomous Agents & Planning', 'Multi-Agent Systems', 'Tool Use & Function Calling', 'Memory & Reasoning', 'Safety & Alignment', 'Building AI Assistants', 'Capstone: AI Agent Application'] },
  { id: 'data-science', title: 'Data Science',                       level: 'Advanced Diploma', duration: '4 Months', mode: 'Online & Onsite', curriculum: ['Python for Data Science', 'Statistics & Probability', 'Data Wrangling & Cleaning', 'Data Visualization', 'Machine Learning Algorithms', 'SQL & Big Data', 'Data Storytelling', 'Final Data Science Project'] },
  { id: 'cyber',        title: 'Cyber Security',                     level: 'Advanced Diploma', duration: '4 Months', mode: 'Online & Onsite', curriculum: ['Network Security Fundamentals', 'Ethical Hacking & Penetration Testing', 'Cryptography Basics', 'Security Operations (SOC)', 'Incident Response', 'Web Application Security', 'Digital Forensics', 'Final Security Assessment'] },
  { id: 'flutter',      title: 'Flutter App Development',            level: 'Intermediate',     duration: '3 Months', mode: 'Online & Onsite', curriculum: ['Dart Programming Basics', 'Flutter Widgets & UI', 'State Management', 'Navigation & Routing', 'API Integration', 'Firebase & Backend', 'App Store Deployment', 'Final Mobile App Project'] },
  { id: 'graphic-d',    title: 'Professional Graphic Designing',     level: 'Intermediate',     duration: '3 Months', mode: 'Online & Onsite', curriculum: ['Design Principles & Color Theory', 'Adobe Photoshop Mastery', 'Adobe Illustrator Basics', 'Typography & Layout', 'Logo & Brand Identity', 'Social Media Graphics', 'Portfolio Development', 'Final Design Project'] },
  { id: 'video-e',      title: 'Professional Video Editing',         level: 'Intermediate',     duration: '3 Months', mode: 'Online & Onsite', curriculum: ['Video Editing Fundamentals', 'Adobe Premiere Pro', 'Motion Graphics in After Effects', 'Color Grading & Audio', 'Storytelling through Video', 'YouTube & Short-form Content', 'CapCut Advanced Techniques', 'Final Video Portfolio'] },
  { id: 'ecommerce',    title: 'E-Commerce & Shopify',               level: 'Intermediate',     duration: '3 Months', mode: 'Online & Onsite', curriculum: ['E-Commerce Business Models', 'Shopify Store Setup & Design', 'Product Listing & Optimization', 'Payment Gateways & Shipping', 'Marketing & SEO for Stores', 'Customer Service & Retention', 'Analytics & Growth', 'Final E-Commerce Launch'] },
]

const container = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.08 } },
}
const cardAnim = {
  hidden:  { opacity: 0, y: 25 },
  visible: { opacity: 1, y: 0,  transition: { duration: 0.5, ease: 'easeOut' } },
}

function CurriculumModal({ course, onClose }) {
  if (!course) return null
  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm"
        onClick={onClose}
      >
        <motion.div
          initial={{ opacity: 0, scale: 0.9, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.9, y: 20 }}
          transition={{ duration: 0.3 }}
          onClick={(e) => e.stopPropagation()}
          className="bg-white rounded-2xl shadow-2xl max-w-lg w-full max-h-[85vh] overflow-y-auto"
        >
          {/* Header */}
          <div className="sticky top-0 bg-white border-b border-slate-100 px-6 py-4 flex items-center justify-between rounded-t-2xl z-10">
            <div>
              <h3 className="font-space font-extrabold text-slate-900 text-lg">{course.title}</h3>
              <p className="text-blue-600 text-xs font-semibold mt-0.5">{course.level} • {course.duration}</p>
            </div>
            <button
              onClick={onClose}
              className="w-8 h-8 rounded-full bg-slate-100 flex items-center justify-center text-slate-500 hover:bg-slate-200 transition-colors flex-shrink-0"
            >
              <X className="w-4 h-4" />
            </button>
          </div>

          {/* Curriculum List */}
          <div className="p-6">
            <p className="text-slate-500 text-xs font-semibold uppercase tracking-widest mb-4">Course Curriculum</p>
            <ul className="flex flex-col gap-3">
              {course.curriculum?.map((item, i) => (
                <li key={i} className="flex items-start gap-3">
                  <CheckCircle className="w-4 h-4 text-blue-500 mt-0.5 flex-shrink-0" />
                  <span className="text-slate-700 text-sm">{item}</span>
                </li>
              ))}
            </ul>
          </div>

          {/* Footer */}
          <div className="border-t border-slate-100 px-6 py-4 flex justify-end">
            <button
              onClick={onClose}
              className="bg-slate-100 text-slate-700 font-bold text-sm px-5 py-2 rounded-xl hover:bg-slate-200 transition-colors"
            >
              Close
            </button>
          </div>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  )
}

function CourseCard({ course, live, onViewCurriculum }) {
  const levelStyle = LEVEL_STYLES[course.level]
  return (
    <motion.div
      variants={cardAnim}
      className="bg-white rounded-2xl border border-slate-100 overflow-hidden flex flex-col card-hover shadow-sm relative"
    >
      {!live && (
        <div className="absolute top-3 right-3 z-10 flex items-center gap-1 bg-amber-400 text-amber-900 text-[10px] font-bold px-2.5 py-1 rounded-full shadow-md">
          <Hourglass className="w-3 h-3" />
          Coming Soon
        </div>
      )}
      {live && (
        <div className="absolute top-3 left-3 z-10 flex items-center gap-1 bg-green-500 text-white text-[10px] font-bold px-2.5 py-1 rounded-full shadow-md">
          <Sparkles className="w-3 h-3" />
          Admissions Open
        </div>
      )}

      {/* Image */}
      <div className="relative h-36 overflow-hidden">
        <img
          src={course.image || 'https://images.unsplash.com/photo-1516321318423-f06f85e504b3?w=600&q=80&fit=crop'}
          alt={course.imageAlt || course.title}
          className="w-full h-full object-cover transition-transform duration-500 hover:scale-105"
          loading="lazy"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent" />
        <div className="absolute bottom-3 left-3 right-3 flex items-center justify-between gap-2">
          <h3 className="text-white font-space font-extrabold text-sm drop-shadow-sm leading-tight flex-1">
            {course.title}
          </h3>
          <span className={`${levelStyle.bg} ${levelStyle.text} text-[10px] font-bold px-2.5 py-1 rounded-full whitespace-nowrap flex-shrink-0`}>
            {course.level}
          </span>
        </div>
      </div>

      {/* Content */}
      <div className="p-4 flex flex-col flex-1 gap-3">
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
        <div className="flex items-center gap-2 pt-1 mt-auto">
          <button
            onClick={() => onViewCurriculum(course)}
            className="flex-1 flex items-center justify-center gap-1.5 border border-blue-200 text-blue-600 font-bold text-xs py-2.5 rounded-xl hover:bg-blue-50 transition-all"
          >
            <BookOpen className="w-3.5 h-3.5" />
            View Curriculum
          </button>
          {live ? (
            <a
              href="#apply"
              className="flex-1 flex items-center justify-center gap-1.5 bg-blue-600 text-white font-bold text-xs py-2.5 rounded-xl hover:bg-blue-700 transition-all"
            >
              Enroll Now <ArrowRight className="w-3.5 h-3.5" />
            </a>
          ) : (
            <button className="flex-1 flex items-center justify-center gap-1.5 bg-slate-200 text-slate-500 font-bold text-xs py-2.5 rounded-xl cursor-not-allowed">
              Notify Me
            </button>
          )}
        </div>
      </div>
    </motion.div>
  )
}

export default function Courses() {
  const [selectedCourse, setSelectedCourse] = useState(null)

  return (
    <section id="courses" className="py-24 px-4 sm:px-6 lg:px-8 bg-slate-50">
      <div className="max-w-7xl mx-auto">

        {/* Live Courses Header */}
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 mb-12">
          <div>
            <span className="section-tag mb-3 inline-block">Live Courses</span>
            <h2 className="font-space font-extrabold text-3xl sm:text-4xl md:text-5xl text-slate-900">
              Admissions Open
            </h2>
            <p className="text-slate-500 mt-2 max-w-xl">
              Start your tech journey today. Enroll in our hands-on programs with live classes and expert mentorship.
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
            <CourseCard key={course.id} course={course} live onViewCurriculum={setSelectedCourse} />
          ))}
        </motion.div>

        {/* Coming Soon Header */}
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 mb-12">
          <div>
            <span className="section-tag mb-3 inline-block">Coming Soon</span>
            <h2 className="font-space font-extrabold text-3xl sm:text-4xl md:text-5xl text-slate-900">
              Next Programs
            </h2>
            <p className="text-slate-500 mt-2 max-w-xl">
              Stay tuned — these advanced programs are launching soon.
            </p>
          </div>
        </div>

        {/* Coming Soon Grid */}
        <motion.div
          variants={container}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-80px' }}
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6"
        >
          {COMING_SOON.map((course) => (
            <CourseCard key={course.id} course={course} live={false} onViewCurriculum={setSelectedCourse} />
          ))}
        </motion.div>
      </div>

      {/* Curriculum Modal */}
      <CurriculumModal course={selectedCourse} onClose={() => setSelectedCourse(null)} />
    </section>
  )
}
