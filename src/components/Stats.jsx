import { motion } from "framer-motion";
import { GraduationCap, Users, Briefcase, Award, Globe } from "lucide-react";

const STATS = [
  {
    icon: GraduationCap,
    value: "10+",
    label: "Professional Courses",
    desc: "Technology & career-focused programs",
  },
  {
    icon: Users,
    value: "Expert",
    label: "Industry Mentors",
    desc: "Learn from experienced professionals",
  },
  {
    icon: Briefcase,
    value: "Live",
    label: "Projects",
    desc: "Hands-on practical experience",
  },
  {
    icon: Award,
    value: "Free",
    label: "Certificate",
    desc: "Certificate of completion",
  },
  {
    icon: Globe,
    value: "Onsite",
    label: "Learning",
    desc: "Flexible learning experience",
  },
];

const container = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.1 } },
};

const item = {
  hidden: { opacity: 0, y: 30, scale: 0.95 },
  visible: {
    opacity: 1,
    y: 0,
    scale: 1,
    transition: { duration: 0.5, ease: [0.4, 0, 0.2, 1] },
  },
};

export default function Stats() {
  return (
    <section
      id="stats"
      className="py-12 sm:py-16 px-4 sm:px-6 lg:px-8 bg-slate-50 border-y border-slate-200/60"
    >
      <div className="max-w-7xl mx-auto relative z-10">
        <motion.div
          variants={container}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-3 sm:gap-5 lg:gap-6"
        >
          {STATS.map((s, idx) => {
            const Icon = s.icon;
            // Last item on 2-col grid (index 4) spans full width on xs so it's centered
            const isLast = idx === STATS.length - 1;
            return (
              <motion.div
                key={s.label}
                variants={item}
                className={`group cursor-default bg-white border border-slate-200/80 hover:border-[#0956fc] rounded-2xl p-4 sm:p-5 flex flex-col items-center text-center gap-2 shadow-sm hover:shadow-xl hover:shadow-blue-500/10 transition-all duration-300 relative overflow-hidden ${
                  isLast ? "col-span-2 sm:col-span-1" : ""
                }`}
              >
                {/* Icon Box */}
                <div className="relative mb-1">
                  <div className="w-12 h-12 sm:w-14 sm:h-14 rounded-2xl bg-blue-50 border border-blue-100 flex items-center justify-center group-hover:bg-[#0956fc] group-hover:border-[#0956fc] transition-all duration-300">
                    <Icon className="w-5 h-5 sm:w-6 sm:h-6 text-[#0956fc] group-hover:text-white transition-colors duration-300" />
                  </div>
                </div>

                {/* Value / Number */}
                <p className="text-slate-900 font-space font-black text-xl sm:text-2xl lg:text-3xl leading-none tracking-tight group-hover:text-[#0956fc] transition-colors duration-200">
                  {s.value}
                </p>

                {/* Main Label */}
                <p className="text-[#0956fc] text-[10px] sm:text-[11px] font-extrabold uppercase tracking-wider leading-tight">
                  {s.label}
                </p>

                {/* Subtext Description */}
                <p className="text-slate-500 text-[11px] leading-relaxed hidden sm:block font-normal">
                  {s.desc}
                </p>

                {/* Hover Indicator Accent Line */}
                <div className="w-0 group-hover:w-full h-0.5 bg-[#0956fc] rounded-full transition-all duration-300 mt-1" />
              </motion.div>
            );
          })}
        </motion.div>
      </div>
    </section>
  );
}
