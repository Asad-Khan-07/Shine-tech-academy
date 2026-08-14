import { useState, useEffect } from "react";
import { createPortal } from "react-dom";
import { motion, AnimatePresence } from "framer-motion";
import {
  Clock,
  Monitor,
  DollarSign,
  BookOpen,
  ArrowRight,
  Hourglass,
  Sparkles,
  X,
  CheckCircle,
} from "lucide-react";

const LEVEL_STYLES = {
  Foundation: { bg: "bg-emerald-100", text: "text-emerald-700" },
  Beginner: { bg: "bg-blue-100", text: "text-blue-700" },
  Intermediate: { bg: "bg-amber-100", text: "text-amber-700" },
  "Advanced Diploma": { bg: "bg-purple-100", text: "text-purple-700" },
};

const LIVE_COURSES = [
  {
    id: "cit",
    title: "Computer & IT Fundamentals (CIT)",
    level: "Foundation",
    duration: "3 Months",
    mode: "Onsite",
    admissionFee: "Rs. 999",
    monthlyFee: "Rs. 1,500/mo",
    image:
      "https://images.unsplash.com/photo-1533022139390-e31c488d69e2?w=600&q=80&fit=crop",
    imageAlt: "Computer fundamentals and IT skills",
    curriculum: [
      "Introduction to Computers & Hardware",
      "Operating Systems (Windows & Linux)",
      "Microsoft Office Suite (Word, Excel, PPT)",
      "Internet Basics & Email Etiquette",
      "Typing & Productivity Tools",
      "Introduction to Programming Logic",
      "Cyber Safety & Digital Citizenship",
      "Basic Troubleshooting & Tech Support",
      "Final Project & Presentation",
    ],
  },
  {
    id: "ai-everyone",
    title: "AI for Everyone",
    level: "Beginner",
    duration: "3 Months",
    mode: "Onsite",
    admissionFee: "Rs. 999",
    monthlyFee: "Rs. 2,000/mo",
    image:
      "https://images.unsplash.com/photo-1677442135703-1787eea5ce01?w=600&q=80&fit=crop",
    imageAlt: "Artificial Intelligence for everyone",
    curriculum: [
      "What is AI? — History & Basics",
      "Machine Learning Fundamentals",
      "Neural Networks & Deep Learning",
      "AI in Everyday Life",
      "Ethics & Bias in AI",
      "Hands-on with AI Tools",
      "Building a Simple AI Model",
      "Career Opportunities in AI",
      "Final Project: AI Solution Prototype",
    ],
  },
  {
    id: "ai-productivity",
    title: "AI Productivity & Prompt Engineering",
    level: "Intermediate",
    duration: "4 Months",
    mode: "Onsite",
    admissionFee: "Rs. 999",
    monthlyFee: "Rs. 2,500/mo",
    image:
      "https://images.unsplash.com/photo-1620712943543-bcc4688e7485?w=600&q=80&fit=crop",
    imageAlt: "AI productivity tools and prompt engineering",
    curriculum: [
      "Introduction to Generative AI",
      "ChatGPT, Claude & Gemini Mastery",
      "Advanced Prompt Engineering Techniques",
      "AI for Content Creation",
      "AI for Data Analysis & Reports",
      "Automating Workflows with AI",
      "AI Tools for Developers & Designers",
      "Building Custom GPTs & AI Agents",
      "Capstone: AI Productivity System",
    ],
  },
  {
    id: "digital-marketing",
    title: "Digital Marketing & Personal Branding",
    level: "Intermediate",
    duration: "3 Months",
    mode: "Onsite",
    admissionFee: "Rs. 999",
    monthlyFee: "Rs. 2,000/mo",
    image:
      "https://images.unsplash.com/photo-1432888498266-38ffec3eaf0a?w=600&q=80&fit=crop",
    imageAlt: "Digital marketing and personal branding",
    curriculum: [
      "Digital Marketing Fundamentals",
      "SEO & Search Engine Marketing",
      "Social Media Strategy & Management",
      "Content Marketing & Copywriting",
      "Google Ads & Facebook Ads",
      "Email Marketing & Automation",
      "Personal Branding on LinkedIn",
      "Analytics & Performance Tracking",
      "Final Project: Full Campaign Plan",
    ],
  },
  {
    id: "mern",
    title: "MERN Stack Engineering",
    level: "Advanced Diploma",
    duration: "8 Months",
    mode: "Onsite",
    admissionFee: "Rs. 999",
    monthlyFee: "Rs. 3,500/mo",
    image:
      "https://images.unsplash.com/photo-1593720213428-28a5b9e94613?w=600&q=80&fit=crop",
    imageAlt: "MERN stack web development",
    curriculum: [
      "HTML5, CSS3 & Responsive Design",
      "JavaScript (ES6+) Fundamentals",
      "React.js — Components, Hooks & State",
      "Node.js & Express.js Backend",
      "MongoDB — Database Design & CRUD",
      "Authentication & Authorization",
      "RESTful APIs & Deployment",
      "Version Control with Git & GitHub",
      "Capstone: Full-Stack MERN Application",
    ],
  },
  {
    id: "full-stack-web",
    title: "Full Stack Web Development",
    level: "Advanced Diploma",
    duration: "6 Months",
    mode: "Onsite",
    admissionFee: "Rs. 999",
    monthlyFee: "Rs. 3,000/mo",
    image:
      "https://images.unsplash.com/photo-1517180102446-f3ece451e9d8?w=600&q=80&fit=crop",
    imageAlt: "Full stack web development",
    curriculum: [
      "HTML5, CSS3 & Responsive Design",
      "JavaScript (ES6+) Programming",
      "Frontend Frameworks (React.js)",
      "Backend Development with Node.js & Express",
      "Database Design (MongoDB & SQL)",
      "REST APIs & Authentication",
      "Version Control with Git & GitHub",
      "Deployment & Hosting",
      "Capstone: Full-Stack Web Application",
    ],
  },
  {
    id: "robotics-ai",
    title: "Robotics & AI Automation",
    level: "Intermediate",
    duration: "3 Months",
    mode: "Onsite",
    admissionFee: "Rs. 999",
    monthlyFee: "Rs. 2,000/mo",
    image:
      "https://images.unsplash.com/photo-1485827404703-89b55fcc595e?w=600&q=80&fit=crop",
    imageAlt: "Robotics and AI automation",
    curriculum: [
      "Introduction to Robotics & Electronics",
      "Arduino & Microcontroller Programming",
      "Sensors & Actuators",
      "Robotic Process Automation (RPA) Basics",
      "AI Integration in Robotics",
      "Python for Automation",
      "IoT Fundamentals",
      "Building Autonomous Systems",
      "Capstone: Robotics Automation Project",
    ],
  },
  {
    id: "ms-office",
    title: "Microsoft Office Professional",
    level: "Foundation",
    duration: "2 Months",
    mode: "Onsite",
    admissionFee: "Rs. 999",
    monthlyFee: "Rs. 1,500/mo",
    image:
      "https://images.unsplash.com/photo-1586281380349-632531db7ed4?w=600&q=80&fit=crop",
    imageAlt: "Microsoft Office professional training",
    curriculum: [
      "MS Word — Document Creation & Formatting",
      "MS Excel — Formulas, Functions & Data Analysis",
      "MS PowerPoint — Professional Presentations",
      "MS Outlook — Email & Calendar Management",
      "Excel Pivot Tables & Charts",
      "Mail Merge & Templates",
      "Office Productivity Shortcuts",
      "Final Project & Certification Assessment",
    ],
  },
  {
    id: "graphic-design-live",
    title: "Graphic Designing & Visual Communication",
    level: "Intermediate",
    duration: "4 Months",
    mode: "Onsite",
    admissionFee: "Rs. 999",
    monthlyFee: "Rs. 2,000/mo",
    image:
      "https://images.unsplash.com/photo-1626785774573-4b799315345d?w=600&q=80&fit=crop",
    imageAlt: "Graphic designing and visual communication",
    curriculum: [
      "Design Principles & Color Theory",
      "Adobe Photoshop Mastery",
      "Adobe Illustrator Basics",
      "Typography & Layout Design",
      "Logo & Brand Identity Design",
      "Social Media Graphics",
      "Print & Packaging Design Basics",
      "Portfolio Development",
      "Final Design Project",
    ],
  },
  {
    id: "pro-english",
    title: "Professional English for Career & Freelancing",
    level: "Beginner",
    duration: "12 Months",
    mode: "Onsite",
    admissionFee: "Rs. 999",
    monthlyFee: "Rs. 1,200/mo",
    image:
      "https://images.unsplash.com/photo-1521791136064-7986c2920216?w=600&q=80&fit=crop",
    imageAlt: "Professional English communication and public speaking",
    curriculum: [
      "Spoken English Fluency",
      "Grammar & Vocabulary",
      "Professional Communication",
      "Business English",
      "Email Writing",
      "Interview Preparation",
      "Public Speaking",
      "Presentation Skills",
      "Client Communication",
      "Freelancing Communication",
      "Workplace Etiquette",
      "Confidence Building",
      "Phase 1: Foundation (4 Months)",
      "Phase 2: Intermediate (4 Months)",
      "Phase 3: Professional (4 Months)",
    ],
  },
];

const container = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.08 } },
};
const cardAnim = {
  hidden: { opacity: 0, y: 25 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.5, ease: "easeOut" } },
};

function CurriculumModal({ course, onClose, onApply }) {
  useEffect(() => {
    document.body.style.overflow = course ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [course]);

  if (!course) return null;

  return createPortal(
    <AnimatePresence>
      <motion.div
        key="modal-backdrop"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="fixed inset-0 z-[99999] flex items-center justify-center p-4 bg-slate-900/65 backdrop-blur-md"
        onClick={onClose}
      >
        <motion.div
          key="modal-box"
          initial={{ opacity: 0, scale: 0.9, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.9, y: 20 }}
          transition={{ duration: 0.25 }}
          onClick={(e) => e.stopPropagation()}
          className="bg-white rounded-2xl shadow-2xl max-w-lg w-full max-h-[85vh] overflow-hidden flex flex-col"
        >
          {/* Header */}
          <div className="shrink-0 bg-white border-b border-slate-200 px-5 py-4 flex items-center justify-between">
            <div>
              <h3 className="font-space font-extrabold text-slate-900 text-base leading-snug">
                {course.title}
              </h3>
              <p className="text-blue-600 text-xs font-bold mt-1">
                {course.level} &bull; {course.duration}
              </p>
            </div>
            <button
              type="button"
              onClick={onClose}
              className="w-9 h-9 rounded-full bg-slate-100 hover:bg-slate-200 transition-colors flex items-center justify-center text-slate-500 shrink-0"
              aria-label="Close modal"
            >
              <X className="w-4 h-4" />
            </button>
          </div>

          {/* Curriculum List */}
          <div className="p-6 overflow-y-auto flex-1 min-h-0">
            <p className="text-slate-500 text-[11px] font-bold uppercase tracking-wider mb-4">
              Course Curriculum
            </p>
            <ul className="space-y-3">
              {course.curriculum?.map((item, i) => (
                <li key={i} className="flex items-start gap-3">
                  <CheckCircle className="w-4 h-4 text-blue-600 mt-0.5 shrink-0" />
                  <span className="text-slate-800 text-sm font-medium leading-relaxed">
                    {item}
                  </span>
                </li>
              ))}
            </ul>
          </div>

          {/* Footer */}
          <div className="shrink-0 border-t border-slate-200 p-5 flex gap-3 bg-slate-50">
            <button
              type="button"
              onClick={onClose}
              className="flex-1 bg-white text-slate-700 font-bold text-sm py-3 px-4 rounded-xl border border-slate-300 hover:bg-slate-100 transition-colors cursor-pointer"
            >
              Close
            </button>
            <button
              type="button"
              onClick={() => {
                onClose();
                if (onApply) onApply();
              }}
              className="flex-1 bg-blue-600 hover:bg-blue-700 text-white font-bold text-sm py-3 px-4 rounded-xl transition-all flex items-center justify-center gap-2 shadow-lg shadow-blue-500/25 cursor-pointer"
            >
              Enroll Now <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        </motion.div>
      </motion.div>
    </AnimatePresence>,
    document.body,
  );
}

function CourseCard({ course, live, onViewCurriculum, onApply }) {
  const levelStyle = LEVEL_STYLES[course.level] || LEVEL_STYLES.Foundation;

  return (
    <motion.div
      variants={cardAnim}
      className="bg-white rounded-2xl border border-slate-100 overflow-hidden flex flex-col shadow-sm relative group hover:shadow-md transition-shadow"
    >
      {!live ? (
        <div className="absolute top-3 right-3 z-10 flex items-center gap-1 bg-amber-400 text-amber-900 text-[10px] font-bold px-2.5 py-1 rounded-full shadow-md">
          <Hourglass className="w-3 h-3" />
          Coming Soon
        </div>
      ) : (
        <div className="absolute top-3 right-3 z-10 flex items-center gap-1 bg-emerald-500 text-white text-[10px] font-bold px-2.5 py-1 rounded-full shadow-md">
          <Sparkles className="w-3 h-3" />
          Admissions Open
        </div>
      )}

      {/* Image Block */}
      <div className="relative w-full aspect-[16/9] overflow-hidden bg-slate-50 border-b border-slate-100">
        <img
          src={
            course.image ||
            "https://images.unsplash.com/photo-1516321318423-f06f85e504b3?w=600&q=80&fit=crop"
          }
          alt={course.imageAlt || course.title}
          className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
          loading="lazy"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-slate-900/60 via-slate-900/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
      </div>

      {/* Content */}
      <div className="p-4 flex flex-col flex-1 gap-3">
        <div>
          <span
            className={`${levelStyle.bg} ${levelStyle.text} text-[10px] font-bold px-2.5 py-1 rounded-full whitespace-nowrap inline-block mb-1.5`}
          >
            {course.level}
          </span>
          <h3 className="text-slate-900 font-space font-extrabold text-lg leading-snug">
            {course.title}
          </h3>
        </div>

        {/* Info Grid */}
        <div className="grid grid-cols-2 gap-1.5">
          <div className="flex items-center gap-2 bg-slate-50 rounded-lg px-2.5 py-1.5">
            <Clock className="w-3.5 h-3.5 text-blue-500 shrink-0" />
            <div>
              <p className="text-[10px] text-slate-400 font-medium uppercase tracking-wide">
                Duration
              </p>
              <p className="text-xs font-bold text-slate-800">
                {course.duration}
              </p>
            </div>
          </div>
          <div className="flex items-center gap-2 bg-slate-50 rounded-lg px-2.5 py-1.5">
            <Monitor className="w-3.5 h-3.5 text-blue-500 shrink-0" />
            <div>
              <p className="text-[10px] text-slate-400 font-medium uppercase tracking-wide">
                Mode
              </p>
              <p className="text-xs font-bold text-slate-800">{course.mode}</p>
            </div>
          </div>

          {live && course.monthlyFee && (
            <div className="flex items-center gap-2 bg-slate-50 rounded-lg px-2.5 py-1.5">
              <DollarSign className="w-3.5 h-3.5 text-blue-500 shrink-0" />
              <div>
                <p className="text-[10px] text-slate-400 font-medium uppercase tracking-wide">
                  Monthly Fee
                </p>
                <p className="text-xs font-bold text-slate-800">
                  {course.monthlyFee}
                </p>
              </div>
            </div>
          )}
          {live && (
            <div className="flex items-center gap-1.5 bg-emerald-50 border border-emerald-200 rounded-lg px-2.5 py-1.5">
              <Sparkles className="w-3.5 h-3.5 text-emerald-600 shrink-0" />
              <span className="text-[11px] font-bold text-emerald-700">
                100% FREE Demo Class
              </span>
            </div>
          )}
        </div>

        {/* Actions */}
        <div className="flex items-center gap-2 pt-2 mt-auto">
          <button
            type="button"
            onClick={() => onViewCurriculum(course)}
            className="flex-1 flex items-center justify-center gap-1.5 border border-blue-200 text-blue-600 font-bold text-xs py-2.5 rounded-xl hover:bg-blue-50 transition-colors cursor-pointer"
          >
            <BookOpen className="w-3.5 h-3.5" />
            View Curriculum
          </button>
          {live ? (
            <button
              type="button"
              onClick={() => onApply && onApply()}
              className="flex-1 flex items-center justify-center gap-1.5 bg-gradient-to-r from-blue-600 to-indigo-600 text-white font-bold text-xs py-2.5 rounded-xl hover:from-blue-700 hover:to-indigo-700 transition-all shadow-sm shadow-blue-200 cursor-pointer"
            >
              Enroll Now <ArrowRight className="w-3.5 h-3.5" />
            </button>
          ) : (
            <button
              type="button"
              disabled
              className="flex-1 flex items-center justify-center gap-1.5 bg-slate-200 text-slate-500 font-bold text-xs py-2.5 rounded-xl cursor-not-allowed"
            >
              Notify Me
            </button>
          )}
        </div>
      </div>
    </motion.div>
  );
}

export default function Courses({ onApply }) {
  const [selectedCourse, setSelectedCourse] = useState(null);

  return (
    <section
      id="courses"
      className="py-16 sm:py-24 px-4 sm:px-6 lg:px-8 bg-slate-50/60 backdrop-blur-sm"
    >
      <div className="max-w-7xl mx-auto">
        {/* Live Courses Header */}
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 mb-12">
          <div>
            <span className="section-tag mb-3 inline-block">
              Live Admissions Open
            </span>
            <h2 className="font-space font-extrabold text-3xl sm:text-4xl md:text-5xl text-slate-900">
              Admissions Open
            </h2>
            <p className="text-slate-500 mt-2 max-w-xl">
              Start your journey toward a successful tech career with industry
              focused Certificate and Diploma programs. Learn through live
              classes, practical projects, expert mentorship, and hands-on
              training. Available both Online &amp; Onsite.
            </p>
          </div>
        </div>

        {/* Live Courses Grid */}
        <motion.div
          variants={container}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-80px" }}
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-7 mb-20"
        >
          {LIVE_COURSES.map((course) => (
            <CourseCard
              key={course.id}
              course={course}
              live
              onViewCurriculum={setSelectedCourse}
              onApply={onApply}
            />
          ))}
        </motion.div>
      </div>

      {/* Curriculum Modal */}
      <CurriculumModal
        course={selectedCourse}
        onClose={() => setSelectedCourse(null)}
        onApply={onApply}
      />
    </section>
  );
}
