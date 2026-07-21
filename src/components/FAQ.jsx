import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Plus, Minus } from 'lucide-react'

const FAQS = [
  {
    q: 'How do I apply?',
    a: 'You can apply by clicking the "Apply Now" button on our website and filling out the online admission form. Alternatively, visit our campus directly.',
  },
  {
    q: 'Are classes onsite or online?',
    a: 'Our classes are primarily onsite (in-person) at our modern campus. We also provide recorded sessions for students who miss a class.',
  },
  {
    q: 'Do you provide certificates?',
    a: 'Yes! Upon successfully completing your course and projects, you will receive an industry-recognized certificate from Shine Tech Academy.',
  },
  {
    q: 'What is the course duration?',
    a: 'Course durations vary: AI Productivity (1.5 months), Digital Marketing (2 months), Video Editing (2 months), Graphic Design (3 months), Web Development (6 months), and Freelancing (1 month).',
  },
  {
    q: 'Do you offer internships?',
    a: 'Yes! After course completion, we provide internship opportunities to help you gain real-world experience and build your professional portfolio.',
  },
]

function FAQItem({ item, index }) {
  const [open, setOpen] = useState(false)
  return (
    <motion.div
      initial={{ opacity: 0, y: 15 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.35, delay: index * 0.05 }}
      className="border border-slate-200 rounded-xl overflow-hidden"
    >
      <button
        onClick={() => setOpen(!open)}
        className={`w-full flex items-center justify-between px-5 py-4 text-left transition-colors ${
          open ? 'bg-blue-600 text-white' : 'bg-white text-slate-900 hover:bg-slate-50'
        }`}
      >
        <span className="font-space font-bold text-sm sm:text-base pr-4">{item.q}</span>
        {open
          ? <Minus className="w-4 h-4 flex-shrink-0 text-white" />
          : <Plus className="w-4 h-4 flex-shrink-0 text-blue-600" />
        }
      </button>
      <AnimatePresence initial={false}>
        {open && (
          <motion.div
            key="content"
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.3, ease: 'easeInOut' }}
          >
            <div className="px-5 py-4 bg-white text-slate-600 text-sm leading-relaxed border-t border-slate-100">
              {item.a}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  )
}

export default function FAQ() {
  return (
    <section id="faq" className="py-24 px-4 sm:px-6 lg:px-8 bg-white/70 backdrop-blur-sm">
      <div className="max-w-3xl mx-auto">

        {/* Header */}
        <div className="text-center mb-14">
          <span className="section-tag mb-3 inline-block">FAQ</span>
          <h2 className="font-space font-extrabold text-3xl sm:text-4xl text-slate-900 mt-3">
            Frequently Asked Questions
          </h2>
          <div className="w-12 h-1 bg-blue-600 mx-auto mt-4 rounded-full" />
        </div>

        {/* Accordion */}
        <div className="flex flex-col gap-3">
          {FAQS.map((item, i) => (
            <FAQItem key={i} item={item} index={i} />
          ))}
        </div>
      </div>
    </section>
  )
}
