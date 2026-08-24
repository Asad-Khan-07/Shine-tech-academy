import { useState, useEffect, useRef } from "react";
import { createPortal } from "react-dom";
import {
  motion,
  AnimatePresence,
  useInView,
  useMotionValue,
  useSpring,
  useReducedMotion,
} from "framer-motion";
import { useNavigate } from "react-router-dom";
import {
  Clock,
  Monitor,
  BookOpen,
  ArrowRight,
  Sparkles,
  X,
  CheckCircle,
  Trophy,
  Flame,
  Zap,
  Video,
  Target,
  Gift,
  ShieldCheck,
  Check,
} from "lucide-react";

// ─── Brand Tokens ──────────────────────────────────────────────────────────
const BRAND_COLOR = "#0956fc";
const BRAND_GRADIENT = "from-[#0956fc] to-blue-600";
const EASE = [0.22, 1, 0.36, 1];

const LEVEL_STYLES = {
  Foundation: {
    bg: "bg-emerald-50/80 border-emerald-200/60",
    text: "text-emerald-700",
    dot: "bg-emerald-500",
    gradient: "from-emerald-500 to-emerald-600",
  },
  Beginner: {
    bg: "bg-blue-50/80 border-blue-200/60",
    text: "text-blue-700",
    dot: "bg-[#0956fc]",
    gradient: "from-blue-500 to-blue-600",
  },
  Intermediate: {
    bg: "bg-amber-50/80 border-amber-200/60",
    text: "text-amber-700",
    dot: "bg-amber-500",
    gradient: "from-amber-500 to-amber-600",
  },
  "Advanced Diploma": {
    bg: "bg-purple-50/80 border-purple-200/60",
    text: "text-purple-700",
    dot: "bg-purple-500",
    gradient: "from-purple-500 to-purple-600",
  },
  Professional: {
    bg: "bg-indigo-50/80 border-indigo-200/60",
    text: "text-indigo-700",
    dot: "bg-indigo-600",
    gradient: "from-indigo-500 to-indigo-600",
  },
};

const FOUNDING_COURSES = [
  {
    id: "ai-everyone",
    title: "AI for Everyone",
    subtitle: "Python for AI, Data & Automation",
    targetAudience: "For Beginners",
    description:
      "Understand AI, explore modern tools, and learn how Artificial Intelligence is transforming everyday life and work.",
    level: "Beginner",
    duration: "2 Months",
    mode: "Onsite",
    admissionFee: "Rs. 1,999 (One-Time Only)",
    monthlyFee: "FREE (No Monthly Fee)",
    image: "https://ik.imagekit.io/swcurh0si/AI%20for%20Everyone.png",
    imageAlt: "Artificial Intelligence for Everyone",
    curriculum: [
      "What is Artificial Intelligence? (Core Concepts)",
      "History of AI — From Turing to Generative AI",
      "Types of AI — Narrow, General & Super Intelligence",
      "How Machine Learning Works (Simply Explained)",
      "Introduction to Python Logic for AI & Data",
      "AI in Everyday Life — Search, Streaming & Automation",
      "Hands-on with ChatGPT, Gemini & Claude",
      "AI Image Generation — MidJourney & DALL-E Basics",
      "Ethical AI — Bias, Data Privacy & Responsibility",
      "Career Paths in AI & Data Science",
      "Final Project: AI Solution Prototype",
    ],
  },
  {
    id: "robotics-ai",
    title: "Robotics & AI Automation",
    subtitle: "Hardware Meets Smart Intelligence",
    targetAudience: "For Tech Enthusiasts & Engineers",
    description:
      "Build smart physical systems, microcontrollers, and autonomous robots powered by AI logic.",
    level: "Intermediate",
    duration: "2 Months",
    mode: "Onsite",
    admissionFee: "Rs. 1,999 (One-Time Only)",
    monthlyFee: "FREE (No Monthly Fee)",
    image:
      "https://ik.imagekit.io/swcurh0si/Robotics,%20AI%20&%20Smart%20Systems.png",
    imageAlt: "Robotics and AI Automation Training",
    reelUrl: "https://youtube.com/shorts/ZE7Wi9R1ILs?si=PHOmk0QdiQ93qvke",
    featuredBadge: "Trending Hands-On",
    curriculum: [
      "Introduction to Robotics — History & Types",
      "Basic Electronics — Voltage, Current & Circuit Design",
      "Arduino Uno Hardware & C/C++ Programming",
      "Sensors Integration — Ultrasonic, IR, Temperature & Motion",
      "Motor Controls — Servo, Stepper & DC Motors",
      "Python Programming Basics for Hardware Automation",
      "Robotic Process Automation (RPA) Concepts",
      "IoT Protocols — Connecting Robots to the Web",
      "Integrating AI & Computer Vision Models",
      "Building Autonomous Line Follower & Obstacle Avoidance Bots",
      "Capstone Project: Fully Functional Smart Autonomous System",
    ],
  },
  {
    id: "digital-marketing",
    title: "AI-Powered Digital Marketing",
    subtitle: "Modern Brand Growth Strategies",
    targetAudience: "For Marketers & Business Owners",
    description:
      "Scale marketing campaigns using AI tools, SEO, paid ads, content generation, and social strategies.",
    level: "Intermediate",
    duration: "2 Months",
    mode: "Onsite",
    admissionFee: "Rs. 1,999 (One-Time Only)",
    monthlyFee: "FREE (No Monthly Fee)",
    image:
      "https://ik.imagekit.io/swcurh0si/AI-Powered%20Digital%20Marketing.png",
    imageAlt: "AI-Powered Digital Marketing",
    curriculum: [
      "Marketing Fundamentals & Buyer Psychology",
      "SEO Basics — Keywords, On-Page & Technical SEO",
      "AI Content Generation & Copywriting Strategies",
      "Facebook & Instagram Ads — Setup, Pixel & Retargeting",
      "Google Search & Video Ad Campaigns",
      "Canva & AI Graphics for Social Media",
      "Email & WhatsApp Marketing Automation",
      "LinkedIn Personal Branding & Client Outreach",
      "Freelancing Profiles (Fiverr & Upwork Setup)",
      "Final Project: Complete Digital Campaign",
    ],
  },
  {
    id: "mern",
    title: "Modern MERN Stack Engineering",
    subtitle: "Full-Stack Web Application Development",
    targetAudience: "For Aspiring Web Developers",
    description:
      "Master MongoDB, Express.js, React.js, and Node.js to build scalable, production-ready web apps.",
    level: "Advanced Diploma",
    duration: "2 Months",
    mode: "Onsite",
    admissionFee: "Rs. 1,999 (One-Time Only)",
    monthlyFee: "FREE (No Monthly Fee)",
    image: "https://ik.imagekit.io/swcurh0si/MERN%20Stack.png",
    imageAlt: "MERN Stack Engineering",
    curriculum: [
      "HTML5, Modern CSS3, Flexbox & CSS Grid",
      "JavaScript ES6+ Concepts & DOM Manipulation",
      "React.js — Components, JSX, Props & State",
      "React Hooks (useState, useEffect, useContext)",
      "Node.js Core Architecture & Express.js APIs",
      "MongoDB Database Design & Mongoose ODM",
      "JWT Authentication, Security & REST APIs",
      "Git, GitHub Version Control & Deployment",
      "Capstone: Full-Stack MERN Web Application",
    ],
  },
  {
    id: "ms-office",
    title: "Microsoft Office Professional",
    subtitle: "Essential Workplace Productivity",
    targetAudience: "For Students & Office Professionals",
    description:
      "Master Excel formulas, professional Word documentation, and powerful PowerPoint presentations.",
    level: "Foundation",
    duration: "2 Months",
    mode: "Onsite",
    admissionFee: "Rs. 1,999 (One-Time Only)",
    monthlyFee: "FREE (No Monthly Fee)",
    image:
      "https://ik.imagekit.io/swcurh0si/ChatGPT%20Image%20Aug%2012,%202026,%2007_13_18%20PM.png",
    imageAlt: "Microsoft Office Professional Training",
    curriculum: [
      "MS Word — Formatting, Page Layouts & Mail Merge",
      "MS Excel — Spreadsheets, Functions (SUM, IF, VLOOKUP)",
      "MS Excel — Pivot Tables, Charts & Data Analysis",
      "MS PowerPoint — Slide Design, Animations & Storytelling",
      "MS Outlook & Teams for Enterprise Collaboration",
      "Productivity Shortcuts & Document Automation",
      "Final Assessment & Practical Workstation Test",
    ],
  },
  {
    id: "graphic-design-live",
    title: "Graphic Design & Visual Communication",
    subtitle: "Creative Branding & Visual Media",
    targetAudience: "For Designers & Visual Artists",
    description:
      "Learn Adobe Photoshop, Illustrator, color theory, typography, and brand identity design.",
    level: "Intermediate",
    duration: "2 Months",
    mode: "Onsite",
    admissionFee: "Rs. 1,999 (One-Time Only)",
    monthlyFee: "FREE (No Monthly Fee)",
    image: "https://ik.imagekit.io/swcurh0si/Graphic%20Designing.png",
    imageAlt: "Graphic Design and Visual Communication",
    curriculum: [
      "Design Principles — Balance, Contrast, Alignment",
      "Color Theory & Professional Typography",
      "Adobe Photoshop — Editing, Masking & Layers",
      "Adobe Illustrator — Vector Graphics & Pen Tool",
      "Logo Design & Brand Identity Systems",
      "Social Media Graphics, Flyers & Banner Design",
      "Portfolio Building & Client Presentation",
    ],
  },
];

const container = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.08 } },
};

const cardAnim = {
  hidden: { opacity: 0, y: 30, scale: 0.96 },
  visible: {
    opacity: 1,
    y: 0,
    scale: 1,
    transition: { duration: 0.55, ease: EASE },
  },
};

// ─── CountUp ──────────────────────────────────────────────────────────────
function CountUp({ value, suffix = "", duration = 1.4 }) {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-40px" });
  const motionVal = useMotionValue(0);
  const spring = useSpring(motionVal, { duration, bounce: 0 });
  const [display, setDisplay] = useState(0);

  useEffect(() => {
    if (inView) motionVal.set(value);
  }, [inView, value, motionVal]);

  useEffect(() => {
    const unsub = spring.on("change", (v) => setDisplay(Math.round(v)));
    return unsub;
  }, [spring]);

  return (
    <span ref={ref}>
      {display}
      {suffix}
    </span>
  );
}

// ─── PulseDot ─────────────────────────────────────────────────────────────
function PulseDot({ className = "" }) {
  const reduceMotion = useReducedMotion();
  return (
    <span className={`relative flex h-1.5 w-1.5 ${className}`}>
      <motion.span
        className="absolute inline-flex h-full w-full rounded-full bg-white"
        animate={
          reduceMotion ? {} : { scale: [1, 2.2, 1], opacity: [0.75, 0, 0.75] }
        }
        transition={{ duration: 1.8, repeat: Infinity, ease: "easeInOut" }}
      />
      <span className="relative inline-flex rounded-full h-1.5 w-1.5 bg-white" />
    </span>
  );
}

// ─── Curriculum Modal ─────────────────────────────────────────────────────
function CurriculumModal({ course, onClose, onApply }) {
  const reduceMotion = useReducedMotion();

  useEffect(() => {
    if (course) document.body.style.overflow = "hidden";
    else document.body.style.overflow = "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [course]);

  return createPortal(
    <AnimatePresence>
      {course && (
        <motion.div
          key="modal-backdrop"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.25, ease: EASE }}
          className="fixed inset-0 z-[99999] flex items-center justify-center p-4 bg-slate-950/70 backdrop-blur-md"
          onClick={onClose}
        >
          <motion.div
            key="modal-box"
            initial={{ opacity: 0, scale: 0.94, y: 16 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.96, y: 10 }}
            transition={{ duration: reduceMotion ? 0.15 : 0.35, ease: EASE }}
            onClick={(e) => e.stopPropagation()}
            className="relative bg-white rounded-2xl shadow-2xl shadow-blue-950/30 border border-slate-200/80 max-w-lg w-full max-h-[85vh] overflow-hidden flex flex-col"
          >
            {/* Header with Brand Gradient */}
            <div className="relative flex-shrink-0 bg-gradient-to-r from-[#0956fc] to-blue-600 px-6 py-5 overflow-hidden">
              <motion.div
                aria-hidden
                className="absolute -right-8 -top-10 w-40 h-40 rounded-full bg-white/10 blur-2xl pointer-events-none"
                animate={reduceMotion ? {} : { opacity: [0.6, 1, 0.6] }}
                transition={{
                  duration: 4,
                  repeat: Infinity,
                  ease: "easeInOut",
                }}
              />
              <div className="relative flex items-center justify-between gap-4">
                <div>
                  <span className="inline-block text-[10px] uppercase font-extrabold tracking-wider bg-emerald-400 text-slate-950 px-2.5 py-0.5 rounded-full mb-1.5 shadow-sm">
                    100% Free Course
                  </span>
                  <h3 className="font-space font-extrabold text-white text-lg leading-snug">
                    {course.title}
                  </h3>
                  <p className="text-blue-100 text-xs font-semibold mt-0.5">
                    {course.level} &bull; {course.duration}
                  </p>
                </div>
                <button
                  onClick={onClose}
                  className="w-9 h-9 rounded-full bg-white/15 hover:bg-white/25 border-none cursor-pointer flex items-center justify-center text-white flex-shrink-0 transition-colors"
                >
                  <X className="w-4 h-4" />
                </button>
              </div>
            </div>

            {/* Body */}
            <div className="p-6 overflow-y-auto flex-1 min-h-0 bg-white space-y-4">
              <div className="bg-emerald-50 border border-emerald-200 rounded-xl p-3 text-xs text-emerald-950 font-medium leading-relaxed flex items-center justify-between">
                <div>
                  <span className="font-extrabold text-emerald-700 block">
                    Zero Monthly Fee Guarantee
                  </span>
                  Pay PKR 1,999 One-Time Reg Fee & Get 2 Months Complete Course
                  FREE!
                </div>
              </div>

              <div className="bg-blue-50/80 border border-blue-100 rounded-xl p-3 text-xs text-slate-700 leading-relaxed">
                <span className="font-bold text-[#0956fc] block mb-0.5">
                  Course Overview
                </span>
                {course.description}
              </div>

              {course.reelUrl && (
                <a
                  href={course.reelUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-2 bg-red-50 hover:bg-red-100 border border-red-200/80 rounded-xl p-3 text-xs font-bold text-red-600 transition-colors group"
                >
                  <Video className="w-4 h-4 text-red-600 flex-shrink-0" />
                  <span>Watch Course Teaser Reel on YouTube</span>
                  <ArrowRight className="w-3.5 h-3.5 ml-auto text-red-600 group-hover:translate-x-1 transition-transform" />
                </a>
              )}

              <div>
                <p className="text-slate-400 text-xs font-bold uppercase tracking-wider mb-3">
                  Course Curriculum
                </p>
                <ul className="list-none p-0 m-0 flex flex-col gap-2.5">
                  {course.curriculum?.map((item, i) => (
                    <motion.li
                      key={i}
                      initial={{ opacity: 0, x: -8 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{
                        delay: reduceMotion ? 0 : Math.min(i * 0.025, 0.5),
                        duration: 0.3,
                        ease: EASE,
                      }}
                      className="flex items-start gap-2.5"
                    >
                      <CheckCircle className="w-4 h-4 text-[#0956fc] mt-0.5 flex-shrink-0" />
                      <span className="text-slate-700 text-sm font-medium leading-snug">
                        {item}
                      </span>
                    </motion.li>
                  ))}
                </ul>
              </div>
            </div>

            {/* Footer */}
            <div className="flex-shrink-0 border-t border-slate-200 px-6 py-4 flex gap-3 bg-slate-50/80">
              <button
                onClick={onClose}
                className="flex-1 bg-white hover:bg-slate-100 text-slate-700 font-bold text-sm py-2.5 px-4 rounded-xl border border-slate-300 transition-colors cursor-pointer"
              >
                Close
              </button>
              <button
                onClick={() => {
                  onClose();
                  if (onApply) onApply();
                }}
                className="flex-1 bg-[#0956fc] hover:bg-blue-700 text-white font-bold text-sm py-2.5 px-4 rounded-xl border-none cursor-pointer flex items-center justify-center gap-2 shadow-md shadow-blue-500/25 hover:shadow-blue-500/40 transition-all"
              >
                Get Free Admission <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>,
    document.body,
  );
}

// ─── Course Card ──────────────────────────────────────────────────────────
function CourseCard({ course, onViewCurriculum, onApply }) {
  const levelStyle = LEVEL_STYLES[course.level] || {
    bg: "bg-slate-100 border border-slate-200",
    text: "text-slate-700",
    dot: "bg-slate-500",
    gradient: "from-slate-500 to-slate-600",
  };

  return (
    <motion.div
      variants={cardAnim}
      whileHover={{ y: -8 }}
      transition={{ type: "spring", stiffness: 300, damping: 24 }}
      className="group relative bg-white/80 backdrop-blur-xl rounded-2xl border border-white/30 hover:border-[#0956fc]/40 overflow-hidden flex flex-col shadow-lg shadow-slate-200/30 hover:shadow-2xl hover:shadow-blue-500/20 transition-all duration-300"
    >
      {/* Animated Gradient Border Glow */}
      <div
        className="absolute inset-0 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-700 pointer-events-none"
        style={{
          background: `radial-gradient(circle at 50% 0%, rgba(9,86,252,0.15), transparent 70%)`,
        }}
      />

      {/* Shimmer Sweep */}
      <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/30 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-1000 ease-in-out pointer-events-none rounded-2xl" />

      {/* Badges */}
      <div className="absolute top-3 right-3 z-10 flex flex-col items-end gap-1.5">
        <div className="flex items-center gap-1.5 bg-gradient-to-r from-emerald-500 to-emerald-600 text-white text-[10px] font-bold px-2.5 py-1 rounded-full shadow-lg shadow-emerald-500/30">
          <PulseDot />
          Admissions Open
        </div>
        {course.featuredBadge && (
          <div className="bg-gradient-to-r from-amber-400 to-amber-500 text-white text-[9px] font-extrabold uppercase px-2.5 py-0.5 rounded-full shadow-lg shadow-amber-500/20">
            {course.featuredBadge}
          </div>
        )}
      </div>

      {/* Free Tag Banner on Image */}
      <div className="absolute top-3 left-3 z-10">
        <span className="bg-emerald-500 text-white font-extrabold text-[10px] uppercase px-2.5 py-1 rounded-md shadow-md tracking-wider flex items-center gap-1">
          <Gift className="w-3 h-3" /> 100% Free Course
        </span>
      </div>

      {/* Image */}
      <div className="relative w-full aspect-[16/9] overflow-hidden bg-slate-100 border-b border-slate-100">
        <img
          src={course.image}
          alt={course.imageAlt || course.title}
          className="w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-110"
          loading="lazy"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-slate-950/70 via-slate-950/20 to-transparent opacity-80 group-hover:opacity-90 transition-opacity duration-300" />

        {/* Bottom Overlay */}
        <div className="absolute bottom-2.5 left-3 right-3 flex items-center justify-between text-white">
          <span className="text-[10px] font-bold bg-black/50 backdrop-blur-md px-2.5 py-0.5 rounded-full flex items-center gap-1.5 border border-white/10">
            <Target className="w-3 h-3 text-blue-400" />
            {course.targetAudience}
          </span>

          {course.reelUrl && (
            <a
              href={course.reelUrl}
              target="_blank"
              rel="noopener noreferrer"
              onClick={(e) => e.stopPropagation()}
              className="text-[10px] font-bold bg-gradient-to-r from-red-600 to-red-700 hover:from-red-700 hover:to-red-800 text-white px-2.5 py-0.5 rounded-full flex items-center gap-1 transition-colors shadow-sm border border-white/10"
            >
              <Video className="w-3 h-3" />
              Watch Reel
            </a>
          )}
        </div>
      </div>

      {/* Content */}
      <div className="p-5 flex flex-col flex-1 gap-3 relative z-10">
        <div>
          <div className="flex items-center justify-between gap-2 mb-2">
            <span
              className={`${levelStyle.bg} ${levelStyle.text} text-[10px] font-bold px-2.5 py-1 rounded-full whitespace-nowrap inline-flex items-center gap-1.5 border`}
            >
              <span className={`w-1.5 h-1.5 rounded-full ${levelStyle.dot}`} />
              {course.level}
            </span>
            <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider bg-slate-100 px-2 py-0.5 rounded-full">
              {course.duration}
            </span>
          </div>

          <h3 className="text-slate-900 font-space font-extrabold text-lg leading-snug group-hover:text-[#0956fc] transition-colors">
            {course.title}
          </h3>
          <p className="text-slate-500 text-xs font-semibold mt-0.5">
            {course.subtitle}
          </p>
        </div>

        <p className="text-slate-600 text-xs leading-relaxed line-clamp-2">
          {course.description}
        </p>

        {/* Info Grid - Clear Pricing Layout */}
        <div className="grid grid-cols-2 gap-2 pt-1">
          <div className="flex items-center gap-2 bg-slate-50/80 backdrop-blur-sm border border-slate-100 rounded-xl px-2.5 py-2 group-hover:border-blue-100 transition-colors">
            <Clock className="w-3.5 h-3.5 text-[#0956fc] flex-shrink-0" />
            <div>
              <p className="text-[9px] text-slate-400 font-bold uppercase tracking-wider">
                Mode
              </p>
              <p className="text-xs font-extrabold text-slate-800">
                {course.mode}
              </p>
            </div>
          </div>

          <div className="flex items-center gap-2 bg-slate-50/80 backdrop-blur-sm border border-slate-100 rounded-xl px-2.5 py-2 group-hover:border-blue-100 transition-colors">
            <Monitor className="w-3.5 h-3.5 text-[#0956fc] flex-shrink-0" />
            <div>
              <p className="text-[9px] text-slate-400 font-bold uppercase tracking-wider">
                Classes
              </p>
              <p className="text-xs font-extrabold text-slate-800">3x / Week</p>
            </div>
          </div>

          {/* Pricing Box 1: One-Time Registration Fee */}
          <div className="flex items-center gap-2 bg-slate-50/80 backdrop-blur-sm border border-slate-200/80 rounded-xl px-2.5 py-2 transition-colors">
            <ShieldCheck className="w-3.5 h-3.5 text-slate-600 flex-shrink-0" />
            <div>
              <p className="text-[9px] text-slate-500 font-bold uppercase tracking-wider">
                One-Time Reg. Fee
              </p>
              <p className="text-xs font-extrabold text-slate-800">PKR 1,999</p>
            </div>
          </div>

          {/* Pricing Box 2: Complete Tuition Free */}
          <div className="flex items-center gap-2 bg-emerald-50 backdrop-blur-sm border border-emerald-200 rounded-xl px-2.5 py-2 transition-colors">
            <Check className="w-3.5 h-3.5 text-emerald-600 flex-shrink-0" />
            <div>
              <p className="text-[9px] text-emerald-700 font-extrabold uppercase tracking-wider">
                Course Fee
              </p>
              <p className="text-xs font-black text-emerald-600">100% FREE</p>
            </div>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="flex items-center gap-2.5 pt-2 mt-auto">
          <button
            type="button"
            onClick={(e) => {
              e.stopPropagation();
              onViewCurriculum(course);
            }}
            className="flex-1 flex items-center justify-center gap-1.5 border border-slate-200 hover:border-[#0956fc] bg-white/50 backdrop-blur-sm text-slate-700 hover:text-[#0956fc] font-bold text-xs py-2.5 rounded-xl hover:bg-blue-50/50 transition-all cursor-pointer"
          >
            <BookOpen className="w-3.5 h-3.5 text-[#0956fc]" />
            Curriculum
          </button>
          <button
            type="button"
            onClick={(e) => {
              e.stopPropagation();
              if (onApply) onApply();
            }}
            className="relative flex-1 flex items-center justify-center gap-1.5 bg-gradient-to-r from-[#0956fc] to-blue-600 hover:from-blue-700 hover:to-blue-700 text-white font-bold text-xs py-2.5 rounded-xl shadow-lg shadow-blue-500/25 hover:shadow-blue-500/40 transition-all cursor-pointer overflow-hidden"
          >
            <span className="absolute inset-0 -translate-x-full group-hover:translate-x-full transition-transform duration-700 ease-out bg-gradient-to-r from-transparent via-white/25 to-transparent" />
            <span className="relative flex items-center gap-1.5">
              Enroll Free <ArrowRight className="w-3.5 h-3.5" />
            </span>
          </button>
        </div>
      </div>
    </motion.div>
  );
}

// ─── Main Component ──────────────────────────────────────────────────────
export default function FoundingBatch() {
  const [selectedCourse, setSelectedCourse] = useState(null);
  const navigate = useNavigate();
  const reduceMotion = useReducedMotion();

  const handleApply = () => navigate("/apply");

  return (
    <section
      className="relative py-20 sm:py-28 px-4 sm:px-6 lg:px-8 overflow-hidden"
      style={{
        background:
          "linear-gradient(135deg, #f8faff 0%, #eef2ff 40%, #f5f3ff 100%)",
      }}
      id="founding-batch"
    >
      {/* Decorative Orbs */}
      <motion.div
        aria-hidden
        className="absolute top-0 left-1/4 w-96 h-96 bg-blue-400/10 rounded-full blur-3xl pointer-events-none"
        animate={reduceMotion ? {} : { opacity: [0.7, 1, 0.7] }}
        transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
      />
      <motion.div
        aria-hidden
        className="absolute bottom-0 right-1/4 w-96 h-96 bg-blue-600/5 rounded-full blur-3xl pointer-events-none"
        animate={reduceMotion ? {} : { opacity: [0.5, 0.9, 0.5] }}
        transition={{
          duration: 7,
          repeat: Infinity,
          ease: "easeInOut",
          delay: 0.8,
        }}
      />
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[400px] h-[400px] bg-indigo-400/5 rounded-full blur-3xl pointer-events-none animate-pulse" />

      <div className="max-w-7xl mx-auto relative z-10">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-60px" }}
          transition={{ duration: 0.6, ease: EASE }}
          className="flex flex-col lg:flex-row lg:items-end justify-between gap-6 mb-14"
        >
          <div>
            <span className="inline-flex items-center gap-1.5 px-4 py-1.5 rounded-full text-xs font-extrabold bg-emerald-100 border border-emerald-300 text-emerald-800 mb-3 shadow-sm">
              <Sparkles className="w-3.5 h-3.5 text-emerald-600 animate-pulse" />
              SPECIAL OFFER — FOUNDING BATCH 2026
            </span>

            <h2 className="font-space font-black text-3xl sm:text-4xl md:text-5xl text-slate-900 tracking-tight leading-[1.15]">
              Complete Courses —{" "}
              <span className="bg-gradient-to-r from-[#0956fc] to-blue-600 bg-clip-text text-transparent">
                100% Free Tuition
              </span>
            </h2>

            <p className="text-slate-700 mt-3 max-w-2xl text-sm sm:text-base leading-relaxed font-medium">
              Join our 2-month hands-on programs with{" "}
              <span className="font-extrabold text-emerald-600 bg-emerald-50 px-2 py-0.5 rounded border border-emerald-200">
                0 Monthly Fee (100% Free Tuition)
              </span>
              . Pay only a one-time seat registration fee of Rs. 1,999.
            </p>
          </div>

          <div className="flex flex-wrap lg:flex-col lg:items-end gap-2.5">
            <div className="flex items-center gap-2 bg-white/80 backdrop-blur-md border border-slate-200/80 text-[#0956fc] text-xs font-extrabold px-4 py-1.5 rounded-full shadow-sm hover:shadow-md transition-shadow">
              <Trophy className="w-3.5 h-3.5 text-amber-500" />
              <CountUp
                value={FOUNDING_COURSES.length}
                suffix=" Specialized Programs"
              />
            </div>
            <div className="flex items-center gap-2 bg-emerald-50/80 backdrop-blur-sm border border-emerald-200/60 text-emerald-800 text-xs font-extrabold px-4 py-1.5 rounded-full shadow-sm">
              <Flame className="w-3.5 h-3.5 text-orange-500" />1 Workshop + 3
              Classes Weekly
            </div>
          </div>
        </motion.div>

        {/* Grid */}
        <motion.div
          variants={container}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-80px" }}
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-7"
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

        {/* CTA Banner */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="mt-12 p-6 sm:p-8 bg-gradient-to-r from-slate-900 via-blue-950 to-slate-900 rounded-3xl text-white flex flex-col sm:flex-row items-center justify-between gap-6 shadow-2xl shadow-blue-950/30 border border-blue-900/40"
        >
          <div className="space-y-1 text-center sm:text-left">
            <h4 className="font-space font-bold text-lg sm:text-xl flex items-center justify-center sm:justify-start gap-2">
              <Zap className="w-5 h-5 text-amber-400 fill-amber-400" />
              Claim Your Free Seat Before Batch Fills Up!
            </h4>
            <p className="text-slate-300 text-xs sm:text-sm">
              Limited seats available for Onsite Practical Training. No hidden
              charges.
            </p>
          </div>
          <button
            onClick={handleApply}
            className="w-full sm:w-auto px-6 py-3.5 bg-gradient-to-r from-emerald-500 to-emerald-600 hover:from-emerald-600 hover:to-emerald-700 text-white font-extrabold text-sm rounded-xl shadow-lg shadow-emerald-500/25 hover:shadow-emerald-500/40 transition-all flex items-center justify-center gap-2 cursor-pointer flex-shrink-0 group"
          >
            <span>Apply Now (100% Free Tuition)</span>
            <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
          </button>
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
