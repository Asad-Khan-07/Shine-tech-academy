import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Plus, Minus } from 'lucide-react'

const FAQS = [
  {
    q: 'How do I apply for admission?',
    a: 'Applying is simple! Click the "Apply Now" button on our website, complete the online admission form, or visit our campus for on-the-spot registration and free career counseling.',
  },
  {
    q: 'Do you offer Online & Onsite classes?',
    a: 'Yes. We offer both Online and Onsite learning options. Students can choose the mode that best suits their schedule and learning preferences.',
  },
  {
    q: 'Will I receive a certificate after completing the course?',
    a: 'Absolutely! Students who successfully complete their course, practical assignments, and final project will receive an official Shine Tech Academy Certificate of Completion.',
  },
  {
    q: 'Can beginners join these courses?',
    a: 'Yes! Most of our programs are designed for beginners. Our instructors guide you step by step, so no prior experience is required for most courses.',
  },
  {
    q: 'Why choose Shine Tech Academy?',
    a: 'We focus on practical learning, live projects, expert mentorship, career guidance, and industry-relevant skills to help students become job-ready and future-ready.',
  },
]

function FAQItem({ item, index, isOpen, onToggle }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 15 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.35, delay: index * 0.05 }}
      className="border border-slate-200 rounded-xl overflow-hidden"
    >
      <button
        onClick={onToggle}
        className={`w-full flex items-center justify-between px-5 py-4 text-left transition-colors ${
          isOpen ? 'bg-blue-600 text-white' : 'bg-white text-slate-900 hover:bg-slate-50'
        }`}
      >
        <span className="font-space font-bold text-sm sm:text-base pr-4 ">{item.q}</span>
        {isOpen
          ? <Minus className="w-4 h-4 flex-shrink-0 text-white cursor-pointer" />
          : <Plus className="w-4 h-4 flex-shrink-0 text-blue-600 cursor-pointer" />
        }
      </button>
      <AnimatePresence initial={false}>
        {isOpen && (
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
  const [activeIndex, setActiveIndex] = useState(null)

  const handleToggle = (index) => {
    setActiveIndex(activeIndex === index ? null : index)
  }

  return (
    <section id="faq" className="py-16 sm:py-24 px-4 sm:px-6 lg:px-8 bg-white/70 backdrop-blur-sm">
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
            <FAQItem
              key={i}
              item={item}
              index={i}
              isOpen={activeIndex === i}
              onToggle={() => handleToggle(i)}
            />
          ))}
        </div>
      </div>
    </section>
  )
}
