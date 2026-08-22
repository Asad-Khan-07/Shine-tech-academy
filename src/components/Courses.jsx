import { useState, useEffect } from "react";
import { createPortal } from "react-dom";
import { motion, AnimatePresence, useReducedMotion } from "framer-motion";
import { useNavigate } from "react-router-dom";
import {
  Clock,
  Calendar,
  DollarSign,
  Globe,
  BookOpen,
  ArrowRight,
  CheckCircle,
  Sparkles,
  X,
  Zap,
  Award,
  Briefcase,
  Users,
  Star,
  GraduationCap,
  Rocket,
  Gift,
  Percent,
} from "lucide-react";

// ── Brand Tokens ──────────────────────────────────────────────────────────
const BRAND_COLOR = "#0956fc";
const EASE = [0.22, 1, 0.36, 1];

const TAG_STYLES = {
  Foundation: {
    bg: "bg-emerald-50/80",
    text: "text-emerald-700",
    border: "border-emerald-200/60",
    dot: "bg-emerald-500",
  },
  Beginner: {
    bg: "bg-sky-50/80",
    text: "text-sky-700",
    border: "border-sky-200/60",
    dot: "bg-sky-500",
  },
  Professional: {
    bg: "bg-indigo-50/80",
    text: "text-indigo-700",
    border: "border-indigo-200/60",
    dot: "bg-indigo-500",
  },
  Advanced: {
    bg: "bg-amber-50/80",
    text: "text-amber-700",
    border: "border-amber-200/60",
    dot: "bg-amber-500",
  },
};

// ── Programs Data (Fees Doubled + 50% OFF) ─────────────────────────────
const CAREER_PROGRAMS = [
  {
    id: "ai-everyone",
    number: "01",
    title: "Python for AI, Data & Automation", // ← Changed
    tag: "Beginner",
    description:
      "Understand Artificial Intelligence from the ground up and learn how modern AI tools are transforming education, business, productivity, and everyday work.",
    duration: "3 Months",
    schedule: "5 Days / Week",
    fee: "Rs. 4,000 / Month", // Doubled from 2,000
    discount: "50% OFF",
    mode: "On-Campus",
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
    number: "02",
    title: "AI Productivity & Prompt Engineering",
    tag: "Professional",
    description:
      "Master AI tools, prompt engineering, productivity workflows, research, content creation, and practical AI-powered workflows.",
    duration: "4 Months",
    schedule: "5 Days / Week",
    fee: "Rs. 5,000 / Month", // Doubled from 2,500
    discount: "50% OFF",
    mode: "On-Campus",
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
    number: "03",
    title: "AI-Powered Digital Marketing",
    tag: "Professional",
    description:
      "Learn modern digital marketing with AI-powered content creation, social media strategy, SEO, advertising, analytics, and automation.",
    duration: "3 Months",
    schedule: "5 Days / Week",
    fee: "Rs. 4,000 / Month", // Doubled from 2,000
    discount: "50% OFF",
    mode: "On-Campus ",
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
    number: "04",
    title: "Modern MERN Stack Engineering",
    tag: "Advanced",
    featured: true,
    description:
      "Become a modern software engineer by building production-ready web applications using MongoDB, Express.js, React, Node.js, APIs, authentication, and deployment.",
    duration: "8 Months",
    schedule: "5 Days / Week",
    fee: "Rs. 7,000 / Month", // Doubled from 3,500
    discount: "50% OFF",
    mode: "On-Campus ",
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
    number: "05",
    title: "Full Stack Web Development",
    tag: "Professional",
    description:
      "Learn to design, develop, and deploy modern websites and full-stack web applications through practical, project-based learning.",
    duration: "6 Months",
    schedule: "5 Days / Week",
    fee: "Rs. 6,000 / Month", // Doubled from 3,000
    discount: "50% OFF",
    mode: "On-Campus ",
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
    number: "06",
    title: "Robotics & AI Automation",
    tag: "Advanced",
    description:
      "Explore robotics, automation, sensors, intelligent systems, and AI-powered solutions through hands-on practical projects.",
    duration: "3 Months",
    schedule: "5 Days / Week",
    fee: "Rs. 4,000 / Month", // Doubled from 2,000
    discount: "50% OFF",
    mode: "On-Campus",
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
    id: "graphic-design-live",
    number: "07",
    title: "Graphic Designing & Visual Communication",
    tag: "Professional",
    description:
      "Build professional visual communication skills through graphic design, branding, social media design, Photoshop, Illustrator, Canva, and creative projects.",
    duration: "4 Months",
    schedule: "5 Days / Week",
    fee: "Rs. 4,000 / Month", // Doubled from 2,000
    discount: "50% OFF",
    mode: "On-Campus ",
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
    id: "ms-office",
    number: "08",
    title: "Microsoft Office Professional",
    tag: "Foundation",
    description:
      "Master essential workplace productivity skills using Microsoft Word, Excel, PowerPoint, and professional office tools.",
    duration: "2 Months",
    schedule: "5 Days / Week",
    fee: "Rs. 3,000 / Month", // Doubled from 1,500
    discount: "50% OFF",
    mode: "On-Campus ",
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
    id: "pro-english",
    number: "09",
    title: "Professional English for Career & Freelancing",
    tag: "Professional",
    description:
      "Develop confident spoken English and professional communication skills for interviews, workplaces, freelancing, presentations, and international clients.",
    duration: "12 Months",
    schedule: "5 Days / Week",
    fee: "Rs. 4,000 / Month", // Doubled from 2,000
    discount: "50% OFF",
    mode: "On-Campus ",
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
    ],
  },
];

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.06, delayChildren: 0.1 },
  },
};

const cardVariants = {
  hidden: { opacity: 0, y: 25 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.5, ease: EASE },
  },
};

// ─── Curriculum Modal (unchanged) ─────────────────────────────────────
function CurriculumModal({ course, onClose, onApply }) {
  const reduceMotion = useReducedMotion();

  useEffect(() => {
    document.body.style.overflow = course ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [course]);

  return createPortal(
    <AnimatePresence>
      {course && (
        <motion.div
          key="career-modal-backdrop"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.2, ease: EASE }}
          className="fixed inset-0 z-[99999] flex items-center justify-center p-4 bg-slate-950/70 backdrop-blur-md"
          onClick={onClose}
        >
          <motion.div
            key="career-modal-box"
            initial={{ opacity: 0, scale: 0.92, y: 15 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.92, y: 15 }}
            transition={{ duration: reduceMotion ? 0.1 : 0.3, ease: EASE }}
            onClick={(e) => e.stopPropagation()}
            className="relative bg-white rounded-3xl shadow-2xl shadow-blue-950/30 max-w-lg w-full max-h-[85vh] overflow-hidden flex flex-col border border-slate-100"
          >
            <div className="shrink-0 bg-gradient-to-r from-[#0956fc] to-blue-600 px-6 py-5 overflow-hidden">
              <div className="absolute -right-8 -top-10 w-40 h-40 rounded-full bg-white/10 blur-2xl pointer-events-none" />
              <div className="relative flex items-start justify-between gap-4">
                <div>
                  <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-[10px] font-bold uppercase tracking-wider bg-white/20 text-white border border-white/20">
                    <Sparkles className="w-3 h-3" />
                    {course.tag} Program
                  </span>
                  <h3 className="font-space font-extrabold text-white text-xl leading-snug mt-2">
                    {course.title}
                  </h3>
                  <p className="text-blue-100 text-xs font-medium mt-1 flex items-center gap-2">
                    <span>{course.duration}</span>
                    <span className="text-blue-300">&bull;</span>
                    <span>{course.schedule}</span>
                  </p>
                </div>
                <button
                  type="button"
                  onClick={onClose}
                  className="w-9 h-9 rounded-full bg-white/15 hover:bg-white/25 transition-all flex items-center justify-center text-white shrink-0"
                >
                  <X className="w-4 h-4" />
                </button>
              </div>
            </div>

            <div className="p-6 overflow-y-auto flex-1 min-h-0 space-y-4 bg-white">
              <div className="flex items-center justify-between">
                <p className="text-slate-500 text-[11px] font-bold uppercase tracking-wider">
                  Course Syllabus
                </p>
                <span className="text-slate-400 text-xs font-semibold">
                  {course.curriculum?.length || 0} Modules
                </span>
              </div>
              <ul className="space-y-2">
                {course.curriculum?.map((item, i) => (
                  <li
                    key={i}
                    className="flex items-start gap-3 p-3 rounded-xl bg-slate-50/80 border border-slate-100 hover:border-blue-200 transition-colors shadow-sm"
                  >
                    <CheckCircle className="w-4 h-4 mt-0.5 shrink-0 text-[#0956fc]" />
                    <span className="text-slate-700 text-sm font-medium leading-relaxed">
                      {item}
                    </span>
                  </li>
                ))}
              </ul>
            </div>

            <div className="shrink-0 border-t border-slate-100 p-5 flex gap-3 bg-slate-50/80">
              <button
                type="button"
                onClick={onClose}
                className="flex-1 bg-white hover:bg-slate-100 text-slate-700 font-bold text-sm py-3 px-4 rounded-xl border border-slate-200 transition-colors"
              >
                Close
              </button>
              <button
                type="button"
                onClick={() => {
                  onClose();
                  if (onApply) onApply(course);
                }}
                className="flex-1 bg-[#0956fc] hover:bg-blue-700 text-white font-bold text-sm py-3 px-4 rounded-xl transition-all shadow-lg shadow-blue-500/25 hover:shadow-blue-500/40 flex items-center justify-center gap-2 group"
              >
                Apply Now
                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </button>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>,
    document.body,
  );
}

// ─── Program Card (with Discount Badge) ──────────────────────────────
function ProgramCard({ program, onViewCurriculum, onApply }) {
  const tagStyle = TAG_STYLES[program.tag] || TAG_STYLES.Professional;

  return (
    <motion.div
      variants={cardVariants}
      whileHover={{ y: -6 }}
      transition={{ type: "spring", stiffness: 300, damping: 25 }}
      className="group relative bg-white/80 backdrop-blur-xl rounded-2xl overflow-hidden flex flex-col h-full shadow-lg shadow-slate-200/30 hover:shadow-2xl hover:shadow-blue-500/20 border border-white/30 hover:border-[#0956fc]/40 transition-all duration-300"
    >
      {/* Animated Gradient Border Glow */}
      <div
        className="absolute inset-0 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-700 pointer-events-none"
        style={{
          background:
            "radial-gradient(circle at 50% 0%, rgba(9,86,252,0.15), transparent 70%)",
        }}
      />

      {/* Shimmer Sweep */}
      <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/30 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-1000 ease-in-out pointer-events-none rounded-2xl" />

      {/* Badges Container (Top Right) */}
      <div className="absolute top-4 right-4 z-10 flex flex-col items-end gap-1.5">
        {program.discount && (
          <div className="flex items-center gap-1.5 bg-gradient-to-r from-red-500 to-rose-500 text-white text-[10px] font-extrabold px-3 py-1.5 rounded-full shadow-lg shadow-red-500/25">
            <Percent className="w-3 h-3" />
            {program.discount}
          </div>
        )}
        {program.featured && (
          <div className="flex items-center gap-1.5 bg-gradient-to-r from-amber-400 to-amber-500 text-white text-[10px] font-extrabold px-3 py-1.5 rounded-full shadow-lg shadow-amber-500/25">
            <Award className="w-3 h-3" />
            Flagship
          </div>
        )}
      </div>

      {/* Image */}
      <div className="relative w-full aspect-[16/10] overflow-hidden bg-slate-100">
        <img
          src={program.image}
          alt={program.imageAlt || program.title}
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700 ease-out"
          loading="lazy"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-slate-950/60 via-slate-950/10 to-transparent" />

        {/* Tag */}
        <div className="absolute bottom-4 left-4">
          <span
            className={`inline-flex items-center gap-1.5 text-[10px] font-bold px-3 py-1.5 rounded-full border backdrop-blur-md shadow-sm ${tagStyle.bg} ${tagStyle.text} ${tagStyle.border}`}
          >
            <span className={`w-1.5 h-1.5 rounded-full ${tagStyle.dot}`} />
            {program.tag}
          </span>
        </div>
      </div>

      {/* Content */}
      <div className="p-6 flex flex-col flex-1 gap-4 relative z-10">
        <div>
          <div className="flex items-center gap-2 mb-1.5">
            <span className="text-xs font-mono font-bold text-[#0956fc] bg-blue-50 px-2 py-0.5 rounded-full">
              #{program.number}
            </span>
          </div>
          <h3 className="font-space font-extrabold text-slate-900 text-xl leading-snug group-hover:text-[#0956fc] transition-colors">
            {program.title}
          </h3>
          <p className="text-slate-500 text-sm leading-relaxed mt-2 line-clamp-2">
            {program.description}
          </p>
        </div>

        {/* Specs Grid */}
        <div className="grid grid-cols-2 gap-2 mt-1">
          <div className="flex items-center gap-2 bg-slate-50/80 backdrop-blur-sm rounded-xl px-3 py-2.5 border border-slate-100 group-hover:border-blue-100 transition-colors">
            <Clock className="w-4 h-4 text-[#0956fc] shrink-0" />
            <div>
              <p className="text-[9px] text-slate-400 font-bold uppercase tracking-wider">
                Duration
              </p>
              <p className="text-xs font-bold text-slate-800">
                {program.duration}
              </p>
            </div>
          </div>
          <div className="flex items-center gap-2 bg-slate-50/80 backdrop-blur-sm rounded-xl px-3 py-2.5 border border-slate-100 group-hover:border-blue-100 transition-colors">
            <Calendar className="w-4 h-4 text-[#0956fc] shrink-0" />
            <div>
              <p className="text-[9px] text-slate-400 font-bold uppercase tracking-wider">
                Schedule
              </p>
              <p className="text-xs font-bold text-slate-800">
                {program.schedule}
              </p>
            </div>
          </div>
          <div className="flex items-center gap-2 bg-slate-50/80 backdrop-blur-sm rounded-xl px-3 py-2.5 border border-slate-100 group-hover:border-blue-100 transition-colors">
            <DollarSign className="w-4 h-4 text-[#0956fc] shrink-0" />
            <div>
              <p className="text-[9px] text-slate-400 font-bold uppercase tracking-wider">
                Fee
              </p>
              <p className="text-xs font-bold text-slate-800 line-through decoration-red-500 decoration-2">
                {program.fee}
              </p>
              <p className="text-xs font-extrabold text-emerald-600">
                {program.fee.replace(/\d[\d,]+/, (num) => {
                  const val = parseFloat(num.replace(/,/g, ""));
                  return (val / 2).toLocaleString();
                })}
              </p>
            </div>
          </div>
          <div className="flex items-center gap-2 bg-slate-50/80 backdrop-blur-sm rounded-xl px-3 py-2.5 border border-slate-100 group-hover:border-blue-100 transition-colors">
            <Globe className="w-4 h-4 text-[#0956fc] shrink-0" />
            <div>
              <p className="text-[9px] text-slate-400 font-bold uppercase tracking-wider">
                Mode
              </p>
              <p className="text-xs font-bold text-slate-800">{program.mode}</p>
            </div>
          </div>
        </div>

        {/* Actions */}
        <div className="flex items-center gap-3 pt-2 border-t border-slate-100">
          <button
            type="button"
            onClick={() => onViewCurriculum(program)}
            className="flex-1 bg-slate-50/80 backdrop-blur-sm hover:bg-slate-100 text-slate-700 hover:text-blue-700 font-bold text-xs py-3 rounded-xl border border-slate-200 hover:border-blue-200 transition-all flex items-center justify-center gap-1.5"
          >
            <BookOpen className="w-3.5 h-3.5 text-blue-600" /> Syllabus
          </button>
          <button
            type="button"
            onClick={() => onApply(program)}
            className="relative flex-1 bg-gradient-to-r from-[#0956fc] to-blue-600 hover:from-blue-700 hover:to-blue-700 text-white font-bold text-xs py-3 rounded-xl transition-all shadow-lg shadow-blue-500/25 hover:shadow-blue-500/40 flex items-center justify-center gap-1.5 group/btn overflow-hidden"
          >
            <span className="absolute inset-0 -translate-x-full group-hover:translate-x-full transition-transform duration-700 ease-out bg-gradient-to-r from-transparent via-white/25 to-transparent" />
            <span className="relative flex items-center gap-1.5">
              Apply Now
              <ArrowRight className="w-3.5 h-3.5 group-hover/btn:translate-x-1 transition-transform" />
            </span>
          </button>
        </div>
      </div>
    </motion.div>
  );
}

// ─── Main Section ─────────────────────────────────────────────────────────
export default function ShineTechProgramsSection() {
  const [selectedCourse, setSelectedCourse] = useState(null);
  const navigate = useNavigate();

  const handleApply = (course) => {
    navigate("/apply", { state: { courseId: course.id } });
  };

  return (
    <section
      className="relative py-24 px-4 sm:px-6 lg:px-8 overflow-hidden"
      style={{
        background:
          "linear-gradient(135deg, #f8faff 0%, #eef2ff 40%, #f5f3ff 100%)",
      }}
    >
      {/* Decorative Orbs */}
      <div className="absolute top-0 left-1/4 w-96 h-96 bg-blue-400/10 rounded-full blur-3xl pointer-events-none animate-pulse" />
      <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-indigo-400/10 rounded-full blur-3xl pointer-events-none animate-pulse delay-1000" />
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[400px] h-[400px] bg-blue-300/5 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto relative z-10">
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-blue-50/80 backdrop-blur-sm border border-blue-100 text-[#0956fc] text-xs font-bold uppercase tracking-wider mb-4 shadow-sm">
            <Sparkles className="w-3.5 h-3.5" />
            Shine Tech Academy
          </div>
          <h2 className="font-space font-extrabold text-4xl sm:text-5xl text-slate-900 tracking-tight">
            Launch Your Tech Career With
            <span className="block bg-gradient-to-r from-[#0956fc] to-blue-600 bg-clip-text text-transparent">
              Industry-Leading Programs
            </span>
          </h2>
          <p className="text-slate-500 text-base sm:text-lg leading-relaxed mt-4 max-w-2xl mx-auto">
            Hands-on, project-based learning designed to get you job-ready. All
            programs include practical projects, mentorship, and career support.
          </p>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 max-w-3xl mx-auto mb-16">
          <div className="bg-white/80 backdrop-blur-md rounded-2xl p-4 text-center border border-white/30 shadow-sm hover:shadow-md transition-shadow">
            <p className="text-2xl font-black text-[#0956fc]">09</p>
            <p className="text-xs font-bold text-slate-500 uppercase tracking-wider">
              Programs
            </p>
          </div>
          <div className="bg-white/80 backdrop-blur-md rounded-2xl p-4 text-center border border-white/30 shadow-sm hover:shadow-md transition-shadow">
            <p className="text-2xl font-black text-[#0956fc]">100%</p>
            <p className="text-xs font-bold text-slate-500 uppercase tracking-wider">
              Practical
            </p>
          </div>
          <div className="bg-white/80 backdrop-blur-md rounded-2xl p-4 text-center border border-white/30 shadow-sm hover:shadow-md transition-shadow">
            <p className="text-2xl font-black text-[#0956fc]">5+</p>
            <p className="text-xs font-bold text-slate-500 uppercase tracking-wider">
              Months Avg
            </p>
          </div>
          <div className="bg-white/80 backdrop-blur-md rounded-2xl p-4 text-center border border-white/30 shadow-sm hover:shadow-md transition-shadow">
            <p className="text-2xl font-black text-[#0956fc]">Free</p>
            <p className="text-xs font-bold text-slate-500 uppercase tracking-wider">
              Demo Class
            </p>
          </div>
        </div>

        {/* Grid */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-50px" }}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
        >
          {CAREER_PROGRAMS.map((program) => (
            <ProgramCard
              key={program.id}
              program={program}
              onViewCurriculum={(course) => setSelectedCourse(course)}
              onApply={handleApply}
            />
          ))}
        </motion.div>
      </div>

      {/* Modal */}
      <CurriculumModal
        course={selectedCourse}
        onClose={() => setSelectedCourse(null)}
        onApply={handleApply}
      />
    </section>
  );
}
