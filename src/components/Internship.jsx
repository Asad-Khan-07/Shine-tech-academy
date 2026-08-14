import { motion } from "framer-motion";
import { Briefcase, Star, ArrowRight } from "lucide-react";

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.2 },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 30 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, ease: "easeOut" },
  },
};

export default function Internship() {
  const handleScrollToContact = (e) => {
    e.preventDefault();
    document.querySelector("#contact")?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <section
      id="internship"
      className="py-16 sm:py-24 px-4 sm:px-6 lg:px-8 bg-slate-50/60 backdrop-blur-sm relative overflow-hidden"
    >
      {/* Background Accent Decorative Glow */}
      <div className="absolute bottom-0 right-0 w-96 h-96 bg-blue-500/5 rounded-full blur-3xl pointer-events-none" />

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
            <div className="rounded-2xl overflow-hidden shadow-xl border border-slate-100 aspect-[4/3] group relative">
              <img
                src="https://images.unsplash.com/photo-1522071820081-009f0129c71c?w=700&q=80&fit=crop"
                alt="Students working on real projects and internships"
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                loading="lazy"
              />
              <div className="absolute inset-0 bg-slate-900/10 group-hover:bg-transparent transition-colors duration-300" />
            </div>

            {/* Floating Badge */}
            <div className="absolute -bottom-2 right-2 sm:-bottom-5 sm:-right-5 bg-white/95 backdrop-blur-md rounded-2xl shadow-xl p-3.5 sm:p-4 flex items-center gap-3 border border-slate-100/80 z-20 hover:scale-105 transition-transform duration-300">
              <div className="w-10 h-10 sm:w-12 sm:h-12 bg-gradient-to-br from-blue-600 to-blue-700 rounded-xl flex items-center justify-center text-white flex-shrink-0 shadow-md shadow-blue-500/20">
                <Briefcase className="w-5 h-5" />
              </div>
              <div>
                <p className="text-slate-900 font-bold text-xs sm:text-sm">
                  Internship Ready
                </p>
                <p className="text-slate-500 text-[10px] sm:text-xs font-medium">
                  After course completion
                </p>
              </div>
            </div>
          </motion.div>

          {/* Right: Content */}
          <motion.div
            variants={itemVariants}
            className="flex flex-col gap-5 sm:gap-6"
          >
            <div>
              <span className="section-tag inline-block px-3.5 py-1 rounded-full border border-blue-500/20 bg-blue-500/10 text-blue-600 text-xs font-semibold tracking-wider uppercase mb-3">
                Internship &amp; Career Support
              </span>
              <h2 className="font-space font-extrabold text-2xl sm:text-3xl lg:text-4xl text-slate-900 leading-tight">
                Learn. Build. <span className="text-blue-600">Earn.</span>
                <br />
                Your Career Starts Here.
              </h2>
            </div>

            <p className="text-slate-600 text-sm sm:text-base leading-relaxed">
              Learn in-demand skills, build a strong portfolio, work on real
              client projects, and prepare for internships and freelance
              opportunities. We support you every step of the way — from your
              first class to your first paycheck.
            </p>

            {/* Feature List */}
            <ul className="flex flex-col gap-3.5 my-1">
              {[
                "Real project experience during the course",
                "Portfolio review and guidance",
                "Internship placement assistance",
                "Freelancing skills for platforms like Fiverr & Upwork",
              ].map((point) => (
                <li key={point} className="flex items-start gap-3">
                  <div className="w-5 h-5 rounded-full bg-blue-100/80 border border-blue-200 flex items-center justify-center flex-shrink-0 mt-0.5 shadow-xs">
                    <Star className="w-3 h-3 text-blue-600 fill-blue-600" />
                  </div>
                  <span className="text-slate-700 text-sm font-medium leading-relaxed">
                    {point}
                  </span>
                </li>
              ))}
            </ul>

            {/* Action CTA */}
            <div className="pt-2">
              <a
                href="#contact"
                onClick={handleScrollToContact}
                className="btn-primary px-7 py-3.5 rounded-full text-sm font-bold inline-flex items-center gap-2 shadow-lg shadow-blue-500/20 hover:shadow-xl hover:shadow-blue-500/30 transition-all duration-300"
              >
                Get Started <ArrowRight className="w-4 h-4" />
              </a>
            </div>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}
