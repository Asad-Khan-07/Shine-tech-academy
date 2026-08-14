import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Plus, ChevronDown } from "lucide-react";

const FAQS = [
  {
    q: "How do I apply for admission?",
    a: 'Applying is simple! Click the "Apply Now" button on our website, complete the online admission form, or visit our campus for on-the-spot registration and free career counseling.',
  },
  {
    q: "Do you offer Online & Onsite classes?",
    a: "Yes. We offer both Online and Onsite learning options. Students can choose the mode that best suits their schedule and learning preferences.",
  },
  {
    q: "Will I receive a certificate after completing the course?",
    a: "Absolutely! Students who successfully complete their course, practical assignments, and final project will receive an official Shine Tech Academy Certificate of Completion.",
  },
  {
    q: "Can beginners join these courses?",
    a: "Yes! Most of our programs are designed for beginners. Our instructors guide you step by step, so no prior experience is required for most courses.",
  },
  {
    q: "Why choose Shine Tech Academy?",
    a: "We focus on practical learning, live projects, expert mentorship, career guidance, and industry-relevant skills to help students become job-ready and future-ready.",
  },
];

function FAQItem({ item, index, isOpen, onToggle }) {
  const contentId = `faq-content-${index}`;
  const buttonId = `faq-button-${index}`;

  return (
    <motion.div
      initial={{ opacity: 0, y: 15 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.35, delay: index * 0.05 }}
      className={`border rounded-2xl overflow-hidden transition-all duration-300 ${
        isOpen
          ? "border-blue-500/40 bg-white shadow-md shadow-blue-500/5"
          : "border-slate-200/80 bg-white/90 hover:border-slate-300"
      }`}
    >
      <button
        id={buttonId}
        aria-expanded={isOpen}
        aria-controls={contentId}
        onClick={onToggle}
        className="w-full flex items-center justify-between px-5 sm:px-6 py-4.5 text-left transition-colors cursor-pointer group focus:outline-hidden focus-visible:ring-2 focus-visible:ring-blue-500"
      >
        <span
          className={`font-space font-bold text-sm sm:text-base pr-4 transition-colors ${
            isOpen
              ? "text-blue-600"
              : "text-slate-900 group-hover:text-blue-600"
          }`}
        >
          {item.q}
        </span>
        <div
          className={`w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0 transition-all duration-300 ${
            isOpen
              ? "bg-blue-600 text-white rotate-180"
              : "bg-slate-100 text-slate-600 group-hover:bg-blue-50 group-hover:text-blue-600"
          }`}
        >
          <ChevronDown className="w-4 h-4 transition-transform duration-300" />
        </div>
      </button>

      <AnimatePresence initial={false}>
        {isOpen && (
          <motion.div
            id={contentId}
            role="region"
            aria-labelledby={buttonId}
            key="content"
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.3, ease: [0.04, 0.62, 0.23, 0.98] }}
            className="overflow-hidden"
          >
            <div className="px-5 sm:px-6 pb-5 pt-1 text-slate-600 text-xs sm:text-sm leading-relaxed border-t border-slate-100/80">
              {item.a}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
}

export default function FAQ() {
  const [activeIndex, setActiveIndex] = useState(null);

  const handleToggle = (index) => {
    setActiveIndex(activeIndex === index ? null : index);
  };

  return (
    <section
      id="faq"
      className="py-16 sm:py-24 px-4 sm:px-6 lg:px-8 bg-slate-50/70 backdrop-blur-sm relative overflow-hidden"
    >
      {/* Background Accent Glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full max-w-4xl h-64 bg-blue-500/5 blur-3xl rounded-full pointer-events-none" />

      <div className="max-w-3xl mx-auto relative z-10">
        {/* Header */}
        <div className="text-center mb-12 sm:mb-16">
          <span className="section-tag mb-3 inline-block px-3.5 py-1 rounded-full border border-blue-500/20 bg-blue-500/10 text-blue-600 text-xs font-semibold tracking-wider uppercase">
            FAQ
          </span>
          <h2 className="font-space font-extrabold text-3xl sm:text-4xl text-slate-900 mt-2">
            Frequently Asked <span className="text-blue-600">Questions</span>
          </h2>
          <div className="w-12 h-1 bg-blue-600 mx-auto mt-4 rounded-full" />
          <p className="text-slate-600 text-xs sm:text-sm mt-3">
            Have questions about Shine Tech Academy? We've got answers.
          </p>
        </div>

        {/* Accordion List */}
        <div className="flex flex-col gap-3.5">
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
  );
}
