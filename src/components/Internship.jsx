import React from "react";
import { motion, useReducedMotion } from "framer-motion";
import { Briefcase, Star, ArrowRight, CheckCircle2 } from "lucide-react";

const EASE = [0.22, 1, 0.36, 1]; // same curve used site-wide

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.15 },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 25 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.5, ease: EASE },
  },
};

const listContainerVariants = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.08, delayChildren: 0.1 } },
};

const listItemVariants = {
  hidden: { opacity: 0, x: -12 },
  visible: { opacity: 1, x: 0, transition: { duration: 0.4, ease: EASE } },
};

export default function Internship() {
  const reduceMotion = useReducedMotion();

  const handleScrollToContact = (e) => {
    e.preventDefault();
    document.querySelector("#contact")?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <section
      id="internship"
      className="py-16 sm:py-24 px-4 sm:px-6 lg:px-8 bg-slate-50/70 relative overflow-hidden"
    >
      {/* Background Accent Glow — soft breathing, matches the rest of the site */}
      <motion.div
        aria-hidden
        className="absolute -bottom-20 -right-20 w-96 h-96 bg-[#0956fc]/10 rounded-full blur-3xl pointer-events-none"
        animate={reduceMotion ? {} : { opacity: [0.6, 1, 0.6] }}
        transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
      />

      <div className="max-w-7xl mx-auto relative z-10">
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-80px" }}
          className="grid grid-cols-1 lg:grid-cols-2 gap-10 sm:gap-14 items-center"
        >
          {/* Left: Image Container */}
          <motion.div
            variants={itemVariants}
            className="relative pb-6 sm:pb-8 lg:pb-0"
          >
            <div className="rounded-2xl overflow-hidden shadow-xl border border-slate-200/80 aspect-[4/3] group relative bg-slate-100">
              <img
                src="https://images.unsplash.com/photo-1522071820081-009f0129c71c?w=700&q=80&fit=crop"
                alt="Students working on real projects at Shine Tech Academy"
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500 ease-out"
                loading="lazy"
              />
              <div className="absolute inset-0 bg-slate-900/10 group-hover:bg-transparent transition-colors duration-300" />
            </div>

            {/* Floating Badge */}
            <motion.div
              initial={{ opacity: 0, scale: 0.9, y: 10 }}
              whileInView={{ opacity: 1, scale: 1, y: 0 }}
              viewport={{ once: true, margin: "-80px" }}
              transition={{ duration: 0.5, ease: EASE, delay: 0.3 }}
              className="absolute -bottom-2 right-2 sm:-bottom-5 sm:-right-5 bg-white/95 backdrop-blur-md rounded-2xl shadow-xl p-3.5 sm:p-4 flex items-center gap-3 border border-slate-100 z-20 hover:scale-105 transition-transform duration-300"
            >
              <div className="w-10 h-10 sm:w-12 sm:h-12 bg-[#0956fc] rounded-xl flex items-center justify-center text-white flex-shrink-0 shadow-md shadow-[#0956fc]/25">
                <Briefcase className="w-5 h-5" />
              </div>
              <div>
                <p className="text-slate-900 font-extrabold text-xs sm:text-sm">
                  Internship Ready
                </p>
                <p className="text-slate-500 text-[10px] sm:text-xs font-medium">
                  Upon course completion
                </p>
              </div>
            </motion.div>
          </motion.div>

          {/* Right: Content */}
          <motion.div
            variants={itemVariants}
            className="flex flex-col gap-5 sm:gap-6"
          >
            <div>
              <span className="inline-flex items-center gap-1.5 px-3.5 py-1 rounded-full text-xs font-extrabold bg-blue-50 border border-blue-200/80 text-[#0956fc] mb-3">
                <Star className="w-3.5 h-3.5 fill-[#0956fc]" />
                Internship &amp; Career Support
              </span>
              <h2 className="font-space font-black text-2xl sm:text-3xl lg:text-4xl text-slate-900 leading-tight">
                Learn. Build. <span className="text-[#0956fc]">Earn.</span>
                <br />
                Your Tech Career Starts Here.
              </h2>
            </div>

            <p className="text-slate-600 text-sm sm:text-base leading-relaxed">
              Master in-demand skills, build a job-ready portfolio, work on real
              client projects, and prepare for top internships and freelancing
              opportunities. We support you from day one to your first tech
              opportunity.
            </p>

            {/* Feature List */}
            <motion.ul
              variants={listContainerVariants}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: "-60px" }}
              className="flex flex-col gap-3 my-1"
            >
              {[
                "Real client project experience during course",
                "1-on-1 portfolio & CV optimization",
                "Direct internship placement assistance",
                "Freelancing mastery for Fiverr & Upwork",
              ].map((point) => (
                <motion.li
                  key={point}
                  variants={listItemVariants}
                  className="flex items-center gap-3"
                >
                  <CheckCircle2 className="w-5 h-5 text-[#0956fc] flex-shrink-0" />
                  <span className="text-slate-700 text-sm font-semibold">
                    {point}
                  </span>
                </motion.li>
              ))}
            </motion.ul>

            {/* Action CTA */}
            <div className="pt-2">
              <motion.a
                href="#contact"
                onClick={handleScrollToContact}
                whileHover={reduceMotion ? {} : { y: -2 }}
                whileTap={{ scale: 0.97 }}
                transition={{ duration: 0.2, ease: EASE }}
                className="group relative px-7 py-3.5 rounded-full text-sm font-extrabold text-white bg-[#0956fc] hover:bg-blue-700 inline-flex items-center gap-2 shadow-lg shadow-[#0956fc]/25 hover:shadow-xl hover:shadow-[#0956fc]/35 transition-[background-color,box-shadow] duration-300 overflow-hidden"
              >
                <span className="absolute inset-0 -translate-x-full group-hover:translate-x-full transition-transform duration-700 ease-out bg-gradient-to-r from-transparent via-white/25 to-transparent" />
                <span className="relative">Apply For Internship Track</span>
                <ArrowRight className="relative w-4 h-4" />
              </motion.a>
            </div>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}
