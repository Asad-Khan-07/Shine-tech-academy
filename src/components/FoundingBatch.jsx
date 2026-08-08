import { useState, useEffect } from 'react'
import { createPortal } from 'react-dom'
import { motion, AnimatePresence } from 'framer-motion'
import { Link, useNavigate } from 'react-router-dom'
import {
  Clock, Monitor, DollarSign, BookOpen, ArrowRight,
  ShieldCheck, Sparkles, X, CheckCircle, Hourglass, Flame, Trophy, Users
} from 'lucide-react'

const LEVEL_STYLES = {
  Foundation:        { bg: 'bg-emerald-100', text: 'text-emerald-700' },
  Beginner:          { bg: 'bg-blue-100',    text: 'text-blue-700' },
  Intermediate:      { bg: 'bg-amber-100',   text: 'text-amber-700' },
  'Advanced Diploma':{ bg: 'bg-purple-100',  text: 'text-purple-700' },
}

// All LIVE_COURSES except 'ai-productivity'
const FOUNDING_COURSES = [
  {
    id: 'cit',
    title: 'Computer & IT Fundamentals (CIT)',
    level: 'Foundation',
    duration: '2 Months',
    mode: 'Onsite',
    admissionFee: 'Rs. 999',
    monthlyFee: 'Rs. 0,000/mo',
    image: 'https://images.unsplash.com/photo-1533022139390-e31c488d69e2?w=600&q=80&fit=crop',
    imageAlt: 'Computer fundamentals and IT skills',
    curriculum: [
      'What is a Computer? — Parts & Functions',
      'Input & Output Devices',
      'Operating Systems — Windows 10/11 Basics',
      'File Management & Folder Organization',
      'MS Word — Typing, Formatting & Printing',
      'MS Excel — Basic Formulas & Spreadsheets',
      'MS PowerPoint — Slide Creation & Design',
      'Internet Browsing & Safe Usage',
      'Email Writing & Gmail Basics',
      'Typing Speed & Accuracy Practice',
      'Basic Networking & Wi-Fi Setup',
      'Introduction to Programming Logic',
      'Cyber Safety & Password Management',
      'Basic Hardware Troubleshooting',
      'Final Project & Presentation',
    ],
  },
  {
    id: 'ai-everyone',
    title: 'AI for Everyone',
    level: 'Beginner',
    duration: '2 Months',
    mode: 'Onsite',
    admissionFee: 'Rs. 999',
    monthlyFee: 'Rs. 0,000/mo',
    image: 'https://images.unsplash.com/photo-1677442135703-1787eea5ce01?w=600&q=80&fit=crop',
    imageAlt: 'Artificial Intelligence for everyone',
    curriculum: [
      'What is Artificial Intelligence?',
      'History of AI — From Turing to Today',
      'Types of AI — Narrow, General & Super',
      'How Machine Learning Works (Simply Explained)',
      'Introduction to Neural Networks',
      'AI in Everyday Life — Phones, Netflix & More',
      'Using ChatGPT, Gemini & Claude',
      'AI for Image Generation — MidJourney & DALL-E',
      'AI for Writing & Content Creation',
      'AI Ethics — Bias, Privacy & Responsibility',
      'Hands-on AI Tools Practice',
      'Career Paths in AI & Data Science',
      'Final Project: AI Solution Prototype',
    ],
  },
  {
    id: 'digital-marketing',
    title: 'Digital Marketing & Personal Branding',
    level: 'Intermediate',
    duration: '2 Months',
    mode: 'Onsite',
    admissionFee: 'Rs. 999',
    monthlyFee: 'Rs. 0,000/mo',
    image: 'https://images.unsplash.com/photo-1432888498266-38ffec3eaf0a?w=600&q=80&fit=crop',
    imageAlt: 'Digital marketing and personal branding',
    curriculum: [
      'What is Digital Marketing?',
      'Marketing Fundamentals & Buyer Psychology',
      'SEO Basics — Keywords, On-Page & Off-Page',
      'Google Search Console & Analytics',
      'Facebook & Instagram Marketing',
      'TikTok & YouTube Marketing',
      'Content Writing & Copywriting',
      'Canva for Social Media Graphics',
      'Google Ads — Search & Display Campaigns',
      'Facebook Ads Manager — Setup & Targeting',
      'Email Marketing with Mailchimp',
      'WhatsApp Marketing Basics',
      'Building a Personal Brand on LinkedIn',
      'Fiverr & Upwork Profile for Marketers',
      'Final Project: Full Digital Campaign',
    ],
  },
  {
    id: 'mern',
    title: 'Professional Diploma in Modern MERN Stack Engineering',
    level: 'Advanced Diploma',
    duration: '2 Months',
    mode: 'Onsite',
    admissionFee: 'Rs. 999',
    monthlyFee: 'Rs. 0,000/mo',
    image: 'https://images.unsplash.com/photo-1593720213428-28a5b9e94613?w=600&q=80&fit=crop',
    imageAlt: 'MERN stack web development',
    curriculum: [
      'HTML5 Basics — Tags, Elements & Structure',
      'CSS3 — Styling, Flexbox & Grid',
      'Responsive Design & Bootstrap',
      'JavaScript Basics — Variables, Loops & Functions',
      'JavaScript ES6+ — Arrow Functions, Async/Await',
      'DOM Manipulation & Events',
      'React.js — JSX, Components & Props',
      'React Hooks — useState, useEffect & useContext',
      'React Router & Navigation',
      'Node.js — Modules, File System & HTTP',
      'Express.js — REST API Development',
      'MongoDB — Collections, Queries & Aggregation',
      'Mongoose ODM & Schema Design',
      'JWT Authentication & Security',
      'Git, GitHub & Version Control',
      'Deployment on Vercel & Render',
      'Capstone: Full-Stack MERN Application',
    ],
  },
  {
    id: 'full-stack-web',
    title: 'Full Stack Web Development',
    level: 'Advanced Diploma',
    duration: '2 Months',
    mode: 'Onsite',
    admissionFee: 'Rs. 999',
    monthlyFee: 'Rs. 0,000/mo',
    image: 'https://images.unsplash.com/photo-1517180102446-f3ece451e9d8?w=600&q=80&fit=crop',
    imageAlt: 'Full stack web development',
    curriculum: [
      'HTML5 — Structure, Semantic Tags & Forms',
      'CSS3 — Box Model, Flexbox & Grid',
      'Responsive Web Design & Media Queries',
      'JavaScript Basics — Data Types & Control Flow',
      'JavaScript ES6+ — Classes, Modules & Promises',
      'React.js — Components, State & Props',
      'React Hooks & Custom Hooks',
      'Node.js Basics & NPM',
      'Express.js — Routes, Middleware & Controllers',
      'MongoDB & SQL Database Basics',
      'REST API Design & Testing (Postman)',
      'User Authentication — JWT & Sessions',
      'Git & GitHub — Branching & Collaboration',
      'Deployment — Vercel, Netlify & Railway',
      'Capstone: Full-Stack Web Application',
    ],
  },
  {
    id: 'robotics-ai',
    title: 'Robotics & AI Automation',
    level: 'Intermediate',
    duration: '2 Months',
    mode: 'Onsite',
    admissionFee: 'Rs. 999',
    monthlyFee: 'Rs. 0,000/mo',
    image: 'https://images.unsplash.com/photo-1485827404703-89b55fcc595e?w=600&q=80&fit=crop',
    imageAlt: 'Robotics and AI automation',
    curriculum: [
      'Introduction to Robotics — History & Types',
      'Basic Electronics — Voltage, Current & Resistance',
      'Breadboard & Circuit Building',
      'Arduino Uno — Setup & First Program',
      'Digital & Analog Input/Output',
      'LED, Buzzer & Motor Control',
      'Ultrasonic, IR & Temperature Sensors',
      'Python Programming Basics for Automation',
      'Robotic Process Automation (RPA) — UiPath Basics',
      'IoT — Connecting Devices to the Internet',
      'AI Integration in Physical Systems',
      'Line Follower & Obstacle Avoidance Robots',
      'Building Autonomous Systems',
      'Capstone: Robotics Automation Project',
    ],
  },
  {
    id: 'ms-office',
    title: 'Microsoft Office Professional',
    level: 'Foundation',
    duration: '2 Months',
    mode: 'Onsite',
    admissionFee: 'Rs. 999',
    monthlyFee: 'Rs. 0,000/mo',
    image: 'https://images.unsplash.com/photo-1586281380349-632531db7ed4?w=600&q=80&fit=crop',
    imageAlt: 'Microsoft Office professional training',
    curriculum: [
      'MS Word — Typing, Formatting & Page Layout',
      'MS Word — Tables, Headers & Mail Merge',
      'MS Excel — Worksheets, Rows & Columns',
      'MS Excel — Formulas (SUM, IF, VLOOKUP)',
      'MS Excel — Charts, Graphs & Conditional Formatting',
      'MS Excel — Pivot Tables & Data Analysis',
      'MS PowerPoint — Slide Design & Themes',
      'MS PowerPoint — Animations & Transitions',
      'MS Outlook — Email, Calendar & Contacts',
      'MS Teams — Meetings & Collaboration',
      'Office Keyboard Shortcuts & Productivity Tips',
      'Creating Professional Reports & Proposals',
      'Final Project & Certification Assessment',
    ],
  },
  {
    id: 'graphic-design-live',
    title: 'Graphic Designing & Visual Communication',
    level: 'Intermediate',
    duration: '2 Months',
    mode: 'Onsite',
    admissionFee: 'Rs. 999',
    monthlyFee: 'Rs. 0,000/mo',
    image: 'https://images.unsplash.com/photo-1626785774573-4b799315345d?w=600&q=80&fit=crop',
    imageAlt: 'Graphic designing and visual communication',
    curriculum: [
      'Design Principles — Balance, Contrast & Alignment',
      'Color Theory — Color Wheel, Palettes & Psychology',
      'Typography — Fonts, Hierarchy & Readability',
      'Adobe Photoshop — Interface & Basic Tools',
      'Photoshop — Photo Editing & Retouching',
      'Photoshop — Masking, Layers & Blending',
      'Adobe Illustrator — Vector Graphics Basics',
      'Illustrator — Shapes, Paths & Pen Tool',
      'Logo Design — Concepts & Process',
      'Brand Identity — Business Cards & Letterheads',
      'Social Media Post & Story Design',
      'Poster & Flyer Design',
      'Print Design — Brochures & Packaging Basics',
      'Canva for Quick Designs',
      'Portfolio Development & Presentation',
      'Final Design Project',
    ],
  },
  {
    id: 'pro-english',
    title: 'Professional English for Career & Freelancing',
    level: 'Beginner',
    duration: '2 Months',
    mode: 'Onsite',
    admissionFee: 'Rs. 999',
    monthlyFee: 'Rs. 0,000/mo',
    image: 'https://images.unsplash.com/photo-1521791136064-7986c2920216?w=600&q=80&fit=crop',
    imageAlt: 'Professional English communication',
    curriculum: [
      '— Phase 1: Foundation (Month 1–4) —',
      'English Alphabet, Pronunciation & Sounds',
      'Basic Grammar — Tenses, Nouns & Verbs',
      'Everyday Vocabulary Building',
      'Simple Sentence Formation',
      'Listening Skills & Comprehension',
      'Basic Conversation Practice',
      '— Phase 2: Intermediate (Month 5–8) —',
      'Advanced Grammar — Conditionals & Passive Voice',
      'Professional Email Writing',
      'Business Communication & Formal Language',
      'Public Speaking Basics',
      'Interview Preparation & Mock Sessions',
      'Group Discussion & Presentation Skills',
      '— Phase 3: Professional (Month 9–12) —',
      'Client Communication for Freelancers',
      'Fiverr & Upwork Proposal Writing',
      'Negotiation & Persuasion in English',
      'Workplace English & Meeting Etiquette',
      'Confidence Building & Fluency Practice',
      'Final Presentation & Certification Assessment',
    ],
  },
]

const container = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.08 } },
}
const cardAnim = {
  hidden:  { opacity: 0, y: 25 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.5, ease: 'easeOut' } },
}

// ── Curriculum Modal (identical to Courses.jsx) ─────────────────────────────
function CurriculumModal({ course, onClose, onApply }) {
  useEffect(() => {
    if (course) document.body.style.overflow = 'hidden'
    else document.body.style.overflow = ''
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
          style={{ position: 'fixed', inset: 0, zIndex: 99999, display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '1rem', background: 'rgba(15,23,42,0.65)', backdropFilter: 'blur(6px)' }}
          onClick={onClose}
        >
          <motion.div
            key="modal-box"
            initial={{ opacity: 0, scale: 0.9, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.9, y: 20 }}
            transition={{ duration: 0.25 }}
            onClick={(e) => e.stopPropagation()}
            style={{ background: '#ffffff', borderRadius: '1.25rem', boxShadow: '0 25px 50px -12px rgba(0,0,0,0.25)', maxWidth: '520px', width: '95vw', maxHeight: '85vh', overflow: 'hidden', display: 'flex', flexDirection: 'column' }}
          >
            {/* Header */}
            <div style={{ flexShrink: 0, background: '#ffffff', borderBottom: '1px solid #e2e8f0', padding: '1rem 1.25rem', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
              <div>
                <h3 style={{ fontFamily: 'Space Grotesk, sans-serif', fontWeight: 800, color: '#0f172a', fontSize: '1.05rem', margin: 0, lineHeight: 1.3 }}>{course.title}</h3>
                <p style={{ color: '#0956fc', fontSize: '0.8rem', fontWeight: 700, marginTop: '0.25rem' }}>{course.level} &bull; {course.duration}</p>
              </div>
              <button
                onClick={onClose}
                style={{ width: '2.25rem', height: '2.25rem', borderRadius: '50%', background: '#f1f5f9', border: 'none', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#64748b', flexShrink: 0 }}
              >
                <X style={{ width: '1.1rem', height: '1.1rem' }} />
              </button>
            </div>

            {/* Curriculum List */}
            <div style={{ padding: '1.5rem', overflowY: 'auto', flex: '1 1 auto', minHeight: 0 }}>
              <p style={{ color: '#64748b', fontSize: '0.75rem', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.08em', marginBottom: '1rem' }}>Course Curriculum</p>
              <ul style={{ listStyle: 'none', padding: 0, margin: 0, display: 'flex', flexDirection: 'column', gap: '0.85rem' }}>
                {course.curriculum?.map((item, i) => (
                  <li key={i} style={{ display: 'flex', alignItems: 'flex-start', gap: '0.75rem' }}>
                    <CheckCircle style={{ width: '1.1rem', height: '1.1rem', color: '#0956fc', marginTop: '0.1rem', flexShrink: 0 }} />
                    <span style={{ color: '#1e293b', fontSize: '0.9rem', fontWeight: 500, lineHeight: 1.4 }}>{item}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* Footer */}
            <div style={{ flexShrink: 0, borderTop: '1px solid #e2e8f0', padding: '1.25rem 1.5rem', display: 'flex', gap: '0.75rem', background: '#f8fafc' }}>
              <button onClick={onClose} style={{ flex: 1, background: '#ffffff', color: '#475569', fontWeight: 700, fontSize: '0.875rem', padding: '0.75rem 1rem', borderRadius: '0.75rem', border: '1px solid #cbd5e1', cursor: 'pointer' }}>
                Close
              </button>
              <button
                onClick={() => { onClose(); if (onApply) onApply() }}
                style={{ flex: 1, background: '#0956fc', color: '#ffffff', fontWeight: 700, fontSize: '0.875rem', padding: '0.75rem 1rem', borderRadius: '0.75rem', border: 'none', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '0.5rem', boxShadow: '0 4px 14px rgba(9,86,252,0.35)' }}
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

// ── Course Card (identical to Courses.jsx) ──────────────────────────────────
function CourseCard({ course, onViewCurriculum, onApply }) {
  const levelStyle = LEVEL_STYLES[course.level] || { bg: 'bg-slate-100', text: 'text-slate-700' }
  return (
    <motion.div
      variants={cardAnim}
      className="bg-white rounded-2xl border border-slate-100 overflow-hidden flex flex-col card-hover shadow-sm relative group shimmer-on-hover glow-border"
    >
      {/* Admissions Open badge */}
      <div className="absolute top-3 right-3 z-10 flex items-center gap-1 bg-green-500 text-white text-[10px] font-bold px-2.5 py-1 rounded-full shadow-md">
        <Sparkles className="w-3 h-3" />
        Admissions Open
      </div>

      {/* Image */}
      <div className="relative w-full aspect-[16/9] overflow-hidden bg-slate-50 border-b border-slate-100">
        <img
          src={course.image}
          alt={course.imageAlt || course.title}
          className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
          loading="lazy"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-slate-900/60 via-slate-900/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
      </div>

      {/* Content */}
      <div className="p-4 flex flex-col flex-1 gap-3">
        {/* Level + Title */}
        <div>
          <span className={`${levelStyle.bg} ${levelStyle.text} text-[10px] font-bold px-2.5 py-1 rounded-full whitespace-nowrap inline-block mb-1.5`}>
            {course.level}
          </span>
          <h3 className="text-slate-900 font-space font-extrabold text-lg leading-snug">
            {course.title}
          </h3>
        </div>

        {/* Info Grid */}
        <div className="grid grid-cols-2 gap-1.5">
          <div className="flex items-center gap-2 bg-slate-50 rounded-lg px-2.5 py-1.5">
            <Clock className="w-3.5 h-3.5 text-blue-500 flex-shrink-0" />
            <div>
              <p className="text-[10px] text-slate-400 font-medium uppercase tracking-wide">Duration</p>
              <p className="text-xs font-bold text-slate-800">{course.duration}</p>
            </div>
          </div>
          <div className="flex items-center gap-2 bg-slate-50 rounded-lg px-2.5 py-1.5">
            <Monitor className="w-3.5 h-3.5 text-blue-500 flex-shrink-0" />
            <div>
              <p className="text-[10px] text-slate-400 font-medium uppercase tracking-wide">Mode</p>
              <p className="text-xs font-bold text-slate-800">{course.mode}</p>
            </div>
          </div>
          {/* <div className="flex items-center gap-2 bg-slate-50 rounded-lg px-2.5 py-1.5">
            <ShieldCheck className="w-3.5 h-3.5 text-blue-500 flex-shrink-0" />
            <div>
              <p className="text-[10px] text-slate-400 font-medium uppercase tracking-wide">Admission Fee</p>
              <p className="text-xs font-bold text-slate-800">{course.admissionFee}</p>
            </div>
          </div> */}
            <div className="flex items-center gap-1.5 bg-green-50 border border-green-200 rounded-lg px-3 py-1">
          <Sparkles className="w-3.5 h-3.5 text-green-600 flex-shrink-0" />
          <span className="text-[11px] font-bold text-green-700">100% FREE Demo Class</span>
        </div>

          <div className="flex items-center gap-2 bg-slate-50 rounded-lg px-2.5 py-1.5">
            <DollarSign className="w-3.5 h-3.5 text-blue-500 flex-shrink-0" />
            <div>
              <p className="text-[10px] text-slate-400 font-medium uppercase tracking-wide">Monthly Fee</p>
              <p className="text-xs font-bold text-slate-800">{course.monthlyFee}</p>
            </div>
          </div>
        </div>

        {/* FREE Demo Badge */}
      
        {/* Action Buttons */}
        <div className="flex items-center gap-2 pt-1 mt-auto relative z-20">
          <button
            type="button"
            onClick={(e) => { e.stopPropagation(); onViewCurriculum(course) }}
            className="flex-1 flex items-center justify-center gap-1.5 border border-blue-200 text-blue-600 font-bold text-xs py-2 rounded-xl hover:bg-blue-50 transition-all cursor-pointer relative z-20"
          >
            <BookOpen className="w-3.5 h-3.5" />
            View Curriculum
          </button>
          <button
            type="button"
            onClick={(e) => { e.stopPropagation(); if (onApply) onApply() }}
            className="flex-1 flex items-center justify-center gap-1.5 bg-gradient-to-r from-blue-600 to-indigo-600 text-white font-bold text-xs py-2 rounded-xl hover:from-blue-700 hover:to-indigo-700 transition-all shadow-sm shadow-blue-200 cursor-pointer relative z-20"
          >
            Enroll Now <ArrowRight className="w-3.5 h-3.5" />
          </button>
        </div>
      </div>
    </motion.div>
  )
}

// ── Main Section ─────────────────────────────────────────────────────────────
export default function FoundingBatch() {
  const [selectedCourse, setSelectedCourse] = useState(null)
  const navigate = useNavigate()

  const handleApply = () => navigate('/apply')

  return (
    <section className="py-16 sm:py-24 px-4 sm:px-6 lg:px-8 bg-white" id="founding-batch">
      <div className="max-w-7xl mx-auto">

        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 mb-12">
          <div>
            <span className="section-tag mb-3 inline-block">Founding Batch · 2026</span>
            <h2 className="font-space font-extrabold text-3xl sm:text-4xl md:text-5xl text-slate-900">
              Founding Batch 2026 —{' '}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-indigo-500">
                Admissions Open
              </span>
            </h2>
            <p className="text-slate-500 mt-2 max-w-xl">
              Be part of our founding batch and kick-start your tech career. Enroll in any of our industry-focused programs — available Online &amp; Onsite with FREE demo classes.
            </p>
          </div>

          {/* Stats chips */}
          <div className="flex flex-wrap gap-3 sm:flex-col sm:items-end">
            <div className="flex items-center gap-2 bg-blue-50 border border-blue-200 text-blue-700 text-xs font-bold px-3 py-1.5 rounded-full">
              <Trophy className="w-3.5 h-3.5 text-amber-500" />
              {FOUNDING_COURSES.length} Programs Available
            </div>
            <div className="flex items-center gap-2 bg-green-50 border border-green-200 text-green-700 text-xs font-bold px-3 py-1.5 rounded-full">
              <Flame className="w-3.5 h-3.5 text-orange-500" />
              Limited Seats — Apply Now
            </div>
          </div>
        </div>

        {/* Course Grid */}
        <motion.div
          variants={container}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-80px' }}
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-7"
        >
          {FOUNDING_COURSES.map((course) => (
            <CourseCard
              key={course.id}
              course={course}
              onViewCurriculum={setSelectedCourse}
              onApply={handleApply}
            />
          ))}
        </motion.div>

      </div>

      {/* Curriculum Modal */}
      <CurriculumModal
        course={selectedCourse}
        onClose={() => setSelectedCourse(null)}
        onApply={handleApply}
      />
    </section>
  )
}
