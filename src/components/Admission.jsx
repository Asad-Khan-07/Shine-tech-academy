import { motion } from "framer-motion";
import {
  FolderGit2,
  Briefcase,
  Compass,
  Monitor,
  Users,
  GraduationCap,
  ChevronRight,
} from "lucide-react";
import {
  revealContainer,
  revealItem,
  revealFade,
  scrollViewport,
} from "../utils/scrollReveal";

const STEPS = [
  {
    num: "01",
    icon: FolderGit2,
    title: "Live Projects",
    desc: "Build real-world projects throughout your course to strengthen your portfolio and gain practical experience.",
    color: "from-blue-600 to-blue-500",
  },
  {
    num: "02",
    icon: Briefcase,
    title: "Career Support",
    desc: "Receive internship guidance, portfolio reviews, CV building, interview preparation, and career development support.",
    color: "from-blue-600 to-blue-500",
  },
  {
    num: "03",
    icon: Compass,
    title: "Career Guidance",
    desc: "Get personalized guidance to choose the right learning path and confidently plan your academic and professional journey.",
    color: "from-blue-600 to-blue-500",
  },
  {
    num: "04",
    icon: Monitor,
    title: "Modern Computer Labs",
    desc: "Practice in modern, well-equipped computer labs designed to provide an engaging and productive learning experience.",
    color: "from-blue-600 to-blue-500",
  },
  {
    num: "05",
    icon: Users,
    title: "Expert Mentors",
    desc: "Learn from experienced instructors and industry professionals who bring practical knowledge into every classroom.",
    color: "from-blue-600 to-blue-500",
  },
];

export default function Admission() {
  return (
    <section
      id="admission"
      className="py-16 sm:py-24 px-4 sm:px-6 lg:px-8 bg-slate-50 relative overflow-hidden"
    >
      {/* Background Glow */}
      <div className="absolute bottom-0 right-1/2 translate-x-1/2 w-80 h-80 bg-blue-500/5 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto relative z-10">
        {/* Section Header */}
        <motion.div
          variants={revealFade}
          initial="hidden"
          whileInView="visible"
          viewport={scrollViewport}
          className="text-center mb-12 sm:mb-16"
        >
          <span className="inline-block text-blue-600 text-xs sm:text-sm font-semibold tracking-widest uppercase mb-4 px-4 py-1.5 rounded-full border border-blue-500/30 bg-blue-500/5">
            Getting Started
          </span>
          <h2 className="font-space font-bold text-3xl sm:text-4xl md:text-5xl text-slate-900 mb-4 sm:mb-6">
            Practical <span className="text-blue-600">Learning</span>
          </h2>
          <p className="text-slate-600 text-sm sm:text-lg max-w-2xl mx-auto">
            Learn by doing through interactive sessions, hands-on exercises,
            practical assignments, and real-world problem solving.
          </p>
        </motion.div>

        {/* Steps — Desktop Layout */}
        <motion.div
          variants={revealContainer}
          initial="hidden"
          whileInView="visible"
          viewport={scrollViewport}
          className="hidden lg:grid grid-cols-5 gap-3 relative"
        >
          {STEPS.map((step, i) => {
            const Icon = step.icon;
            return (
              <motion.div
                key={step.num}
                variants={revealItem}
                className="relative flex flex-col"
              >
                <div className="bg-white rounded-2xl p-5 flex flex-col gap-3 group border border-slate-100 shadow-sm hover:shadow-md transition-all duration-300 h-full">
                  <div
                    className={`w-11 h-11 rounded-xl bg-gradient-to-br ${step.color} flex items-center justify-center text-white font-space font-black text-sm shadow-md group-hover:scale-105 transition-transform duration-300`}
                  >
                    {step.num}
                  </div>
                  <div className="w-9 h-9 rounded-xl bg-blue-50 border border-blue-100 flex items-center justify-center">
                    <Icon className="w-4 h-4 text-blue-600" />
                  </div>
                  <h3 className="font-space font-bold text-slate-900 text-base">
                    {step.title}
                  </h3>
                  <p className="text-slate-500 text-xs leading-relaxed flex-1">
                    {step.desc}
                  </p>
                </div>

                {/* Arrow Connector between steps */}
                {i < STEPS.length - 1 && (
                  <div className="absolute -right-2.5 top-1/2 -translate-y-1/2 z-10 text-slate-300 pointer-events-none">
                    <ChevronRight className="w-5 h-5" />
                  </div>
                )}
              </motion.div>
            );
          })}
        </motion.div>

        {/* Steps — Mobile/Tablet Layout */}
        <div className="lg:hidden relative">
          {/* Vertical Timeline Line */}
          <div
            className="absolute left-6 w-0.5 bg-blue-200"
            style={{
              top: "24px",
              bottom: "24px",
              transform: "translateX(-50%)",
            }}
          />

          <motion.div
            variants={revealContainer}
            initial="hidden"
            whileInView="visible"
            viewport={scrollViewport}
            className="flex flex-col gap-6"
          >
            {STEPS.map((step) => {
              const Icon = step.icon;
              return (
                <motion.div
                  key={step.num}
                  variants={revealItem}
                  className="flex gap-4 relative z-10"
                >
                  {/* Step Number Badge */}
                  <div className="flex flex-col items-center flex-shrink-0">
                    <div
                      className={`w-12 h-12 rounded-xl bg-gradient-to-br ${step.color} flex items-center justify-center text-white font-space font-black text-sm shadow-md flex-shrink-0`}
                    >
                      {step.num}
                    </div>
                  </div>

                  {/* Card Content */}
                  <div className="bg-white border border-slate-100 shadow-sm rounded-2xl p-4 sm:p-5 flex flex-col gap-2 flex-1">
                    <div className="w-9 h-9 rounded-lg bg-blue-50 border border-blue-100 flex items-center justify-center">
                      <Icon className="w-4 h-4 text-blue-600" />
                    </div>
                    <h3 className="font-space font-bold text-slate-900 text-sm sm:text-base">
                      {step.title}
                    </h3>
                    <p className="text-slate-500 text-xs sm:text-sm leading-relaxed">
                      {step.desc}
                    </p>
                  </div>
                </motion.div>
              );
            })}
          </motion.div>
        </div>

        {/* Call To Action */}
        <motion.div
          variants={revealFade}
          initial="hidden"
          whileInView="visible"
          viewport={scrollViewport}
          className="text-center mt-12 sm:mt-16"
        >
          <a
            href="#apply"
            id="admission-apply-btn"
            className="btn-primary px-8 sm:px-10 py-3.5 sm:py-4 rounded-2xl text-sm sm:text-base font-bold inline-flex items-center gap-2 shadow-lg shadow-blue-500/20 hover:shadow-xl transition-all"
          >
            <GraduationCap className="w-5 h-5" />
            Start Your Application
          </a>
        </motion.div>

        <div className="section-divider mt-16" />
      </div>
    </section>
  );
}
