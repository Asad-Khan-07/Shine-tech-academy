import { useState, useEffect, useRef } from "react";
import { createPortal } from "react-dom";
import {
  motion,
  AnimatePresence,
  useInView,
  useMotionValue,
  useSpring,
} from "framer-motion";
import { useNavigate } from "react-router-dom";
import {
  Clock,
  Monitor,
  DollarSign,
  BookOpen,
  ArrowRight,
  Sparkles,
  X,
  CheckCircle,
  Trophy,
  Flame,
} from "lucide-react";

const LEVEL_STYLES = {
  Foundation: {
    bg: "bg-emerald-50 border border-emerald-200/60",
    text: "text-emerald-700",
    dot: "bg-emerald-500",
  },
  Beginner: {
    bg: "bg-blue-50 border border-blue-200/60",
    text: "text-blue-700",
    dot: "bg-[#0956fc]",
  },
  Intermediate: {
    bg: "bg-amber-50 border border-amber-200/60",
    text: "text-amber-700",
    dot: "bg-amber-500",
  },
  "Advanced Diploma": {
    bg: "bg-purple-50 border border-purple-200/60",
    text: "text-purple-700",
    dot: "bg-purple-500",
  },
};

// All LIVE_COURSES except 'ai-productivity'
const FOUNDING_COURSES = [
  // {
  //   id: "cit",
  //   title: "Computer & IT Fundamentals (CIT)",
  //   level: "Foundation",
  //   duration: "2 Months",
  //   mode: "Onsite",
  //   admissionFee: "Rs. 999",
  //   monthlyFee: "Rs. 0,000/mo",
  //   image:
  //     "https://ik.imagekit.io/swcurh0si/Certificate%20in%20Information%20Technology.png",
  //   imageAlt: "Computer fundamentals and IT skills",
  //   curriculum: [
  //     "What is a Computer? — Parts & Functions",
  //     "Input & Output Devices",
  //     "Operating Systems — Windows 10/11 Basics",
  //     "File Management & Folder Organization",
  //     "MS Word — Typing, Formatting & Printing",
  //     "MS Excel — Basic Formulas & Spreadsheets",
  //     "MS PowerPoint — Slide Creation & Design",
  //     "Internet Browsing & Safe Usage",
  //     "Email Writing & Gmail Basics",
  //     "Typing Speed & Accuracy Practice",
  //     "Basic Networking & Wi-Fi Setup",
  //     "Introduction to Programming Logic",
  //     "Cyber Safety & Password Management",
  //     "Basic Hardware Troubleshooting",
  //     "Final Project & Presentation",
  //   ],
  // },
  {
    id: "ai-everyone",
    title: "AI for Everyone",
    level: "Beginner",
    duration: "2 Months",
    mode: "Onsite",
    admissionFee: "Rs. 999",
    monthlyFee: "Rs. 0,000/mo",
    image: "https://ik.imagekit.io/swcurh0si/AI%20for%20Everyone.png",
    imageAlt: "Artificial Intelligence for everyone",
    curriculum: [
      "What is Artificial Intelligence?",
      "History of AI — From Turing to Today",
      "Types of AI — Narrow, General & Super",
      "How Machine Learning Works (Simply Explained)",
      "Introduction to Neural Networks",
      "AI in Everyday Life — Phones, Netflix & More",
      "Using ChatGPT, Gemini & Claude",
      "AI for Image Generation — MidJourney & DALL-E",
      "AI for Writing & Content Creation",
      "AI Ethics — Bias, Privacy & Responsibility",
      "Hands-on AI Tools Practice",
      "Career Paths in AI & Data Science",
      "Final Project: AI Solution Prototype",
    ],
  },

  // {
  //   id: "full-stack-web",
  //   title: "Full Stack Web Development",
  //   level: "Advanced Diploma",
  //   duration: "2 Months",
  //   mode: "Onsite",
  //   admissionFee: "Rs. 999",
  //   monthlyFee: "Rs. 0,000/mo",
  //   image:
  //     "https://ik.imagekit.io/swcurh0si/Full%20Stack%20Web%20Development.png",
  //   imageAlt: "Full stack web development",
  //   curriculum: [
  //     "HTML5 — Structure, Semantic Tags & Forms",
  //     "CSS3 — Box Model, Flexbox & Grid",
  //     "Responsive Web Design & Media Queries",
  //     "JavaScript Basics — Data Types & Control Flow",
  //     "JavaScript ES6+ — Classes, Modules & Promises",
  //     "React.js — Components, State & Props",
  //     "React Hooks & Custom Hooks",
  //     "Node.js Basics & NPM",
  //     "Express.js — Routes, Middleware & Controllers",
  //     "MongoDB & SQL Database Basics",
  //     "REST API Design & Testing (Postman)",
  //     "User Authentication — JWT & Sessions",
  //     "Git & GitHub — Branching & Collaboration",
  //     "Deployment — Vercel, Netlify & Railway",
  //     "Capstone: Full-Stack Web Application",
  //   ],
  // },
  {
    id: "robotics-ai",
    title: "Robotics & AI Automation",
    level: "Intermediate",
    duration: "2 Months",
    mode: "Onsite",
    admissionFee: "Rs. 999",
    monthlyFee: "Rs. 0,000/mo",
    image:
      "https://ik.imagekit.io/swcurh0si/Robotics,%20AI%20&%20Smart%20Systems.png",
    imageAlt: "Robotics and AI automation",
    curriculum: [
      "Introduction to Robotics — History & Types",
      "Basic Electronics — Voltage, Current & Resistance",
      "Breadboard & Circuit Building",
      "Arduino Uno — Setup & First Program",
      "Digital & Analog Input/Output",
      "LED, Buzzer & Motor Control",
      "Ultrasonic, IR & Temperature Sensors",
      "Python Programming Basics for Automation",
      "Robotic Process Automation (RPA) — UiPath Basics",
      "IoT — Connecting Devices to the Internet",
      "AI Integration in Physical Systems",
      "Line Follower & Obstacle Avoidance Robots",
      "Building Autonomous Systems",
      "Capstone: Robotics Automation Project",
    ],
  },
  {
    id: "digital-marketing",
    title: "AI-Powered Digital Marketing",
    level: "Intermediate",
    duration: "2 Months",
    mode: "Onsite",
    admissionFee: "Rs. 999",
    monthlyFee: "Rs. 0,000/mo",
    image:
      "https://ik.imagekit.io/swcurh0si/AI-Powered%20Digital%20Marketing.png",
    imageAlt: "Digital marketing and personal branding",
    curriculum: [
      "What is Digital Marketing?",
      "Marketing Fundamentals & Buyer Psychology",
      "SEO Basics — Keywords, On-Page & Off-Page",
      "Google Search Console & Analytics",
      "Facebook & Instagram Marketing",
      "TikTok & YouTube Marketing",
      "Content Writing & Copywriting",
      "Canva for Social Media Graphics",
      "Google Ads — Search & Display Campaigns",
      "Facebook Ads Manager — Setup & Targeting",
      "Email Marketing with Mailchimp",
      "WhatsApp Marketing Basics",
      "Building a Personal Brand on LinkedIn",
      "Fiverr & Upwork Profile for Marketers",
      "Final Project: Full Digital Campaign",
    ],
  },
  {
    id: "mern",
    title: "Modern MERN Stack Engineering",
    level: "Advanced Diploma",
    duration: "2 Months",
    mode: "Onsite",
    admissionFee: "Rs. 999",
    monthlyFee: "Rs. 0,000/mo",
    image: "https://ik.imagekit.io/swcurh0si/MERN%20Stack.png",
    imageAlt: "MERN stack web development",
    curriculum: [
      "HTML5 Basics — Tags, Elements & Structure",
      "CSS3 — Styling, Flexbox & Grid",
      "Responsive Design & Bootstrap",
      "JavaScript Basics — Variables, Loops & Functions",
      "JavaScript ES6+ — Arrow Functions, Async/Await",
      "DOM Manipulation & Events",
      "React.js — JSX, Components & Props",
      "React Hooks — useState, useEffect & useContext",
      "React Router & Navigation",
      "Node.js — Modules, File System & HTTP",
      "Express.js — REST API Development",
      "MongoDB — Collections, Queries & Aggregation",
      "Mongoose ODM & Schema Design",
      "JWT Authentication & Security",
      "Git, GitHub & Version Control",
      "Deployment on Vercel & Render",
      "Capstone: Full-Stack MERN Application",
    ],
  },
  {
    id: "ms-office",
    title: "Microsoft Office Professional",
    level: "Foundation",
    duration: "2 Months",
    mode: "Onsite",
    admissionFee: "Rs. 999",
    monthlyFee: "Rs. 0,000/mo",
    image:
      "https://ik.imagekit.io/swcurh0si/ChatGPT%20Image%20Aug%2012,%202026,%2007_13_18%20PM.png",
    imageAlt: "Microsoft Office professional training",
    curriculum: [
      "MS Word — Typing, Formatting & Page Layout",
      "MS Word — Tables, Headers & Mail Merge",
      "MS Excel — Worksheets, Rows & Columns",
      "MS Excel — Formulas (SUM, IF, VLOOKUP)",
      "MS Excel — Charts, Graphs & Conditional Formatting",
      "MS Excel — Pivot Tables & Data Analysis",
      "MS PowerPoint — Slide Design & Themes",
      "MS PowerPoint — Animations & Transitions",
      "MS Outlook — Email, Calendar & Contacts",
      "MS Teams — Meetings & Collaboration",
      "Office Keyboard Shortcuts & Productivity Tips",
      "Creating Professional Reports & Proposals",
      "Final Project & Certification Assessment",
    ],
  },
  {
    id: "graphic-design-live",
    title: "Graphic Designing & Visual Communication",
    level: "Intermediate",
    duration: "2 Months",
    mode: "Onsite",
    admissionFee: "Rs. 999",
    monthlyFee: "Rs. 0,000/mo",
    image: "https://ik.imagekit.io/swcurh0si/Graphic%20Designing.png",
    imageAlt: "Graphic designing and visual communication",
    curriculum: [
      "Design Principles — Balance, Contrast & Alignment",
      "Color Theory — Color Wheel, Palettes & Psychology",
      "Typography — Fonts, Hierarchy & Readability",
      "Adobe Photoshop — Interface & Basic Tools",
      "Photoshop — Photo Editing & Retouching",
      "Photoshop — Masking, Layers & Blending",
      "Adobe Illustrator — Vector Graphics Basics",
      "Illustrator — Shapes, Paths & Pen Tool",
      "Logo Design — Concepts & Process",
      "Brand Identity — Business Cards & Letterheads",
      "Social Media Post & Story Design",
      "Poster & Flyer Design",
      "Print Design — Brochures & Packaging Basics",
      "Canva for Quick Designs",
      "Portfolio Development & Presentation",
      "Final Design Project",
    ],
  },
  // {
  //   id: "pro-english",
  //   title: "Professional English for Career & Freelancing",
  //   level: "Beginner",
  //   duration: "2 Months",
  //   mode: "Onsite",
  //   admissionFee: "Rs. 999",
  //   monthlyFee: "Rs. 0,000/mo",
  //   image:
  //     "https://images.unsplash.com/photo-1521791136064-7986c2920216?w=600&q=80&fit=crop",
  //   imageAlt: "Professional English communication",
  //   curriculum: [
  //     "— Phase 1: Foundation (Month 1–4) —",
  //     "English Alphabet, Pronunciation & Sounds",
  //     "Basic Grammar — Tenses, Nouns & Verbs",
  //     "Everyday Vocabulary Building",
  //     "Simple Sentence Formation",
  //     "Listening Skills & Comprehension",
  //     "Basic Conversation Practice",
  //     "— Phase 2: Intermediate (Month 5–8) —",
  //     "Advanced Grammar — Conditionals & Passive Voice",
  //     "Professional Email Writing",
  //     "Business Communication & Formal Language",
  //     "Public Speaking Basics",
  //     "Interview Preparation & Mock Sessions",
  //     "Group Discussion & Presentation Skills",
  //     "— Phase 3: Professional (Month 9–12) —",
  //     "Client Communication for Freelancers",
  //     "Fiverr & Upwork Proposal Writing",
  //     "Negotiation & Persuasion in English",
  //     "Workplace English & Meeting Etiquette",
  //     "Confidence Building & Fluency Practice",
  //     "Final Presentation & Certification Assessment",
  //   ],
  // },
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
    transition: { duration: 0.55, ease: [0.22, 1, 0.36, 1] },
  },
};

// ── Count-up number (fires once, when scrolled into view) ──────────────────
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

// ── Curriculum Modal ─────────────────────────────────────────────────────
function CurriculumModal({ course, onClose, onApply }) {
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
          style={{
            position: "fixed",
            inset: 0,
            zIndex: 99999,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            padding: "1rem",
            background: "rgba(15, 23, 42, 0.65)",
            backdropFilter: "blur(8px)",
          }}
          onClick={onClose}
        >
          <motion.div
            key="modal-box"
            initial={{ opacity: 0, scale: 0.92, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.92, y: 20 }}
            transition={{ duration: 0.25, ease: [0.22, 1, 0.36, 1] }}
            onClick={(e) => e.stopPropagation()}
            className="relative bg-white rounded-2xl shadow-2xl border border-slate-200/80 max-w-lg w-full max-h-[85vh] overflow-hidden flex flex-col"
          >
            {/* Header */}
            <div className="relative flex-shrink-0 bg-[#0956fc] px-6 py-5 overflow-hidden">
              <div className="absolute -right-8 -top-10 w-40 h-40 rounded-full bg-white/10 blur-2xl pointer-events-none" />
              <div className="relative flex items-center justify-between gap-4">
                <div>
                  <h3 className="font-space font-extrabold text-white text-lg leading-snug">
                    {course.title}
                  </h3>
                  <p className="text-blue-100 text-xs font-semibold mt-1">
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

            {/* Curriculum List */}
            <div className="p-6 overflow-y-auto flex-1 min-h-0 bg-white">
              <p className="text-slate-400 text-xs font-bold uppercase tracking-wider mb-4">
                Course Curriculum
              </p>
              <ul className="list-none p-0 m-0 flex flex-col gap-3">
                {course.curriculum?.map((item, i) => (
                  <motion.li
                    key={i}
                    initial={{ opacity: 0, x: -8 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{
                      delay: Math.min(i * 0.03, 0.6),
                      duration: 0.3,
                    }}
                    className="flex items-start gap-3"
                  >
                    <CheckCircle className="w-4 h-4 text-[#0956fc] mt-0.5 flex-shrink-0" />
                    <span className="text-slate-700 text-sm font-medium leading-snug">
                      {item}
                    </span>
                  </motion.li>
                ))}
              </ul>
            </div>

            {/* Footer */}
            <div className="flex-shrink-0 border-t border-slate-200 px-6 py-4 flex gap-3 bg-slate-50">
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
                className="flex-1 bg-[#0956fc] hover:bg-blue-700 text-white font-bold text-sm py-2.5 px-4 rounded-xl border-none cursor-pointer flex items-center justify-center gap-2 shadow-md shadow-blue-500/20 transition-all"
              >
                Enroll Now <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>,
    document.body,
  );
}

// ── Course Card ──────────────────────────────────────────────────────────
function CourseCard({ course, onViewCurriculum, onApply }) {
  const levelStyle = LEVEL_STYLES[course.level] || {
    bg: "bg-slate-100 border border-slate-200",
    text: "text-slate-700",
    dot: "bg-slate-500",
  };

  return (
    <motion.div
      variants={cardAnim}
      whileHover={{ y: -8 }}
      transition={{ type: "spring", stiffness: 300, damping: 22 }}
      className="group relative bg-white rounded-2xl border border-slate-200/80 hover:border-[#0956fc] overflow-hidden flex flex-col shadow-sm hover:shadow-xl hover:shadow-blue-500/10 transition-all duration-300"
    >
      {/* Admissions Open badge */}
      <div className="absolute top-3 right-3 z-10 flex items-center gap-1.5 bg-emerald-600 text-white text-[10px] font-bold px-2.5 py-1 rounded-full shadow-md">
        <span className="relative flex h-1.5 w-1.5">
          <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-white opacity-75" />
          <span className="relative inline-flex rounded-full h-1.5 w-1.5 bg-white" />
        </span>
        Admissions Open
      </div>

      {/* Image */}
      <div className="relative w-full aspect-[16/9] overflow-hidden bg-slate-100 border-b border-slate-100">
        <img
          src={course.image}
          alt={course.imageAlt || course.title}
          className="w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-110"
          loading="lazy"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-slate-950/60 via-slate-950/0 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
      </div>

      {/* Content */}
      <div className="p-5 flex flex-col flex-1 gap-3.5">
        {/* Level + Title */}
        <div>
          <span
            className={`${levelStyle.bg} ${levelStyle.text} text-[10px] font-bold px-2.5 py-1 rounded-full whitespace-nowrap inline-flex items-center gap-1.5 mb-2`}
          >
            <span className={`w-1.5 h-1.5 rounded-full ${levelStyle.dot}`} />
            {course.level}
          </span>
          <h3 className="text-slate-900 font-space font-extrabold text-lg leading-snug group-hover:text-[#0956fc] transition-colors">
            {course.title}
          </h3>
        </div>

        {/* Info Grid */}
        <div className="grid grid-cols-2 gap-2">
          <div className="flex items-center gap-2 bg-slate-50 border border-slate-100 rounded-xl px-2.5 py-2">
            <Clock className="w-3.5 h-3.5 text-[#0956fc] flex-shrink-0" />
            <div>
              <p className="text-[9px] text-slate-400 font-bold uppercase tracking-wider">
                Duration
              </p>
              <p className="text-xs font-extrabold text-slate-800">
                {course.duration}
              </p>
            </div>
          </div>

          <div className="flex items-center gap-2 bg-slate-50 border border-slate-100 rounded-xl px-2.5 py-2">
            <Monitor className="w-3.5 h-3.5 text-[#0956fc] flex-shrink-0" />
            <div>
              <p className="text-[9px] text-slate-400 font-bold uppercase tracking-wider">
                Mode
              </p>
              <p className="text-xs font-extrabold text-slate-800">
                {course.mode}
              </p>
            </div>
          </div>

          <div className="flex items-center gap-1.5 bg-emerald-50 border border-emerald-200/60 rounded-xl px-2.5 py-2">
            <Sparkles className="w-3.5 h-3.5 text-emerald-600 flex-shrink-0" />
            <span className="text-[11px] font-extrabold text-emerald-700">
              FREE
            </span>
          </div>

          <div className="flex items-center gap-2 bg-slate-50 border border-slate-100 rounded-xl px-2.5 py-2">
            <DollarSign className="w-3.5 h-3.5 text-[#0956fc] flex-shrink-0" />
            <div>
              <p className="text-[9px] text-slate-400 font-bold uppercase tracking-wider">
                Monthly Fee
              </p>
              <p className="text-xs font-extrabold text-slate-800">
                {course.monthlyFee}
              </p>
            </div>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="flex items-center gap-2.5 pt-2 mt-auto relative z-20">
          <button
            type="button"
            onClick={(e) => {
              e.stopPropagation();
              onViewCurriculum(course);
            }}
            className="flex-1 flex items-center justify-center gap-1.5 border border-slate-200 hover:border-[#0956fc] bg-white text-slate-700 hover:text-[#0956fc] font-bold text-xs py-2.5 rounded-xl hover:bg-blue-50/50 transition-all cursor-pointer"
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
            className="flex-1 flex items-center justify-center gap-1.5 bg-[#0956fc] hover:bg-blue-700 text-white font-bold text-xs py-2.5 rounded-xl shadow-sm shadow-blue-500/20 hover:shadow-md transition-all cursor-pointer"
          >
            Enroll Now <ArrowRight className="w-3.5 h-3.5" />
          </button>
        </div>
      </div>
    </motion.div>
  );
}

// ── Main Section ─────────────────────────────────────────────────────────
export default function FoundingBatch() {
  const [selectedCourse, setSelectedCourse] = useState(null);
  const navigate = useNavigate();

  const handleApply = () => navigate("/apply");

  return (
    <section
      className="relative py-16 sm:py-24 px-4 sm:px-6 lg:px-8 bg-slate-50 border-b border-slate-200/60 overflow-hidden"
      id="founding-batch"
    >
      {/* Background ambient light blobs */}
      <div className="absolute top-0 left-1/4 w-96 h-96 bg-blue-400/10 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-blue-600/5 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto relative z-10">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-60px" }}
          transition={{ duration: 0.6, ease: "easeOut" }}
          className="flex flex-col sm:flex-row sm:items-end justify-between gap-6 mb-12"
        >
          <div>
            <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-extrabold bg-blue-50 border border-blue-200/80 text-[#0956fc] mb-3">
              <Sparkles className="w-3.5 h-3.5" />
              Founding Batch · 2026
            </span>
            <h2 className="font-space font-black text-3xl sm:text-4xl md:text-5xl text-slate-900 tracking-tight">
              Founding Batch 2026 —{" "}
              <span className="text-[#0956fc]">Admissions Open</span>
            </h2>
            <p className="text-slate-600 mt-2.5 max-w-xl text-sm sm:text-base leading-relaxed">
              Be part of our founding batch and kick-start your tech career.
              Enroll in any of our industry-focused programs Available &amp;
              Onsite with FREE classes.
            </p>
          </div>

          {/* Stats chips */}
          <div className="flex flex-wrap gap-3 sm:flex-col sm:items-end">
            <div className="flex items-center gap-2 bg-white border border-slate-200/80 text-[#0956fc] text-xs font-extrabold px-3.5 py-1.5 rounded-full shadow-sm">
              <Trophy className="w-3.5 h-3.5 text-amber-500" />
              <CountUp
                value={FOUNDING_COURSES.length}
                suffix=" Programs Available"
              />
            </div>
            <div className="flex items-center gap-2 bg-emerald-50 border border-emerald-200/60 text-emerald-800 text-xs font-extrabold px-3.5 py-1.5 rounded-full shadow-sm">
              <Flame className="w-3.5 h-3.5 text-orange-500" />
              Limited Seats — Apply Now
            </div>
          </div>
        </motion.div>

        {/* Course Grid */}
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
      </div>

      {/* Curriculum Modal */}
      <CurriculumModal
        course={selectedCourse}
        onClose={() => setSelectedCourse(null)}
        onApply={handleApply}
      />
    </section>
  );
}
