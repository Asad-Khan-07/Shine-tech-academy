import { motion } from "framer-motion";
import {
  FileText,
  BookOpen,
  MonitorPlay,
  Hammer,
  Award,
  Rocket,
} from "lucide-react";

const STEPS = [
  {
    num: 1,
    icon: FileText,
    title: "Register",
    desc: "Fill the admission form online or visit our campus.",
  },
  {
    num: 2,
    icon: BookOpen,
    title: "Choose Course",
    desc: "Pick the course that matches your passion and goals.",
  },
  {
    num: 3,
    icon: MonitorPlay,
    title: "Attend Classes",
    desc: "Learn through expert instructors and hands-on sessions.",
  },
  {
    num: 4,
    icon: Hammer,
    title: "Build Projects",
    desc: "Work on real projects and practical assignments.",
  },
  {
    num: 5,
    icon: Award,
    title: "Get Certified",
    desc: "Earn industry-recognized certificates.",
  },
  {
    num: 6,
    icon: Rocket,
    title: "Start Career",
    desc: "Launch your career with internships and job opportunities.",
  },
];

const containerVariants = {
  hidden: {},
  visible: {
    transition: { staggerChildren: 0.12 },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 20, scale: 0.9 },
  visible: {
    opacity: 1,
    y: 0,
    scale: 1,
    transition: { type: "spring", stiffness: 120, damping: 14 },
  },
};

export default function LearningJourney() {
  return (
    <section
      id="learning-journey"
      className="py-16 sm:py-24 px-4 sm:px-6 lg:px-8 bg-slate-50/80 backdrop-blur-sm relative overflow-hidden"
    >
      {/* Background Accent Decorative Glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full max-w-7xl h-64 bg-blue-500/5 blur-3xl rounded-full pointer-events-none" />

      <div className="max-w-6xl mx-auto relative z-10">
        {/* Header */}
        <div className="text-center mb-12 sm:mb-20">
          <span className="section-tag mb-3 inline-block px-3.5 py-1 rounded-full border border-blue-500/20 bg-blue-500/10 text-blue-600 text-xs font-semibold tracking-wider uppercase">
            Our Process
          </span>
          <h2 className="font-space font-extrabold text-3xl sm:text-4xl text-slate-900 mt-2">
            Your Learning <span className="text-blue-600">Journey</span>
          </h2>
          <div className="w-12 h-1 bg-blue-600 mx-auto mt-4 rounded-full" />
        </div>

        {/* Steps Grid */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-80px" }}
          className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-6 sm:gap-8"
        >
          {STEPS.map((step, i) => {
            const Icon = step.icon;
            const isLast = i === STEPS.length - 1;

            return (
              <motion.div
                key={step.num}
                variants={itemVariants}
                className="group flex flex-col items-center text-center gap-3.5 relative"
              >
                {/* Desktop Horizontal Connector Line */}
                {!isLast && (
                  <div className="hidden lg:block absolute top-7 sm:top-8 left-1/2 w-full h-[2px] bg-gradient-to-r from-blue-500/40 via-blue-300/30 to-blue-100/20 pointer-events-none z-0" />
                )}

                {/* Icon Container with Badge */}
                <div className="relative z-10">
                  <div className="w-14 h-14 sm:w-16 sm:h-16 rounded-2xl bg-gradient-to-br from-blue-600 to-blue-700 flex items-center justify-center shadow-md shadow-blue-500/20 text-white group-hover:scale-105 group-hover:shadow-lg group-hover:shadow-blue-500/30 transition-all duration-300">
                    <Icon className="w-6 h-6 sm:w-7 sm:h-7 group-hover:rotate-6 transition-transform duration-300" />
                  </div>

                  {/* Step Number Badge */}
                  <div className="absolute -top-1.5 -right-1.5 w-6 h-6 bg-slate-900 border-2 border-white rounded-full flex items-center justify-center text-white text-[10px] font-black shadow-sm">
                    {step.num}
                  </div>
                </div>

                {/* Content */}
                <div className="flex flex-col items-center">
                  <h3 className="font-space font-bold text-slate-900 text-xs sm:text-sm uppercase tracking-wide mb-1.5 group-hover:text-blue-600 transition-colors">
                    {step.title}
                  </h3>
                  <p className="text-slate-500 text-[11px] sm:text-xs leading-relaxed max-w-[120px] sm:max-w-[140px] mx-auto">
                    {step.desc}
                  </p>
                </div>
              </motion.div>
            );
          })}
        </motion.div>
      </div>
    </section>
  );
}
