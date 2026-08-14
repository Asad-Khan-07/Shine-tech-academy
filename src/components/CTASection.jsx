import { useEffect, useRef, useState } from "react";
import { motion, useInView } from "framer-motion";
import { ArrowRight, MessageCircle, Rocket, Sparkles } from "lucide-react";

function CountUp({ end, suffix = "", duration = 2 }) {
  const [count, setCount] = useState(0);
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true });

  useEffect(() => {
    if (!isInView) return;

    let startTime = null;
    let animationFrameId;

    const updateCounter = (timestamp) => {
      if (!startTime) startTime = timestamp;
      const progress = Math.min((timestamp - startTime) / (duration * 1000), 1);

      // Smooth easeOutQuad easing
      const currentCount = Math.floor(progress * (2 - progress) * end);
      setCount(currentCount);

      if (progress < 1) {
        animationFrameId = requestAnimationFrame(updateCounter);
      } else {
        setCount(end);
      }
    };

    animationFrameId = requestAnimationFrame(updateCounter);

    return () => cancelAnimationFrame(animationFrameId);
  }, [isInView, end, duration]);

  return (
    <span ref={ref}>
      {count}
      {suffix}
    </span>
  );
}

export default function CTASection() {
  const scrollToContact = () => {
    const contactSection = document.querySelector("#contact");
    if (contactSection) {
      contactSection.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <section
      id="cta"
      className="py-20 sm:py-28 px-4 sm:px-6 lg:px-8 bg-slate-50/80 backdrop-blur-sm relative overflow-hidden"
    >
      {/* Decorative Background Accents */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full max-w-5xl h-80 bg-gradient-to-r from-blue-500/10 via-indigo-500/10 to-blue-500/10 blur-3xl rounded-full pointer-events-none" />
      <div className="absolute -top-24 -right-24 w-96 h-96 bg-blue-400/10 rounded-full blur-2xl pointer-events-none" />

      <div className="max-w-4xl mx-auto text-center relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
          className="flex flex-col items-center gap-7 sm:gap-8"
        >
          {/* Badge */}
          <motion.span
            className="inline-flex items-center gap-2 text-blue-600 text-xs font-bold uppercase tracking-widest px-4 py-2 rounded-full border border-blue-500/20 bg-blue-500/10 shadow-xs"
            initial={{ scale: 0.9, opacity: 0 }}
            whileInView={{ scale: 1, opacity: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1, duration: 0.4 }}
          >
            <Sparkles className="w-3.5 h-3.5" />
            Start Your Journey Today
          </motion.span>

          {/* Heading */}
          <h2 className="font-space font-extrabold text-3xl sm:text-4xl lg:text-5xl xl:text-6xl text-slate-900 leading-tight tracking-tight px-2">
            Build Your Future with
            <br />
            <span className="relative inline-block mt-1">
              <span className="text-blue-600">Shine Tech Academy</span>
              <motion.span
                className="absolute -bottom-2 left-0 h-1.5 bg-gradient-to-r from-blue-600 to-indigo-600 rounded-full"
                initial={{ width: 0 }}
                whileInView={{ width: "100%" }}
                viewport={{ once: true }}
                transition={{ duration: 0.8, delay: 0.4 }}
              />
            </span>
          </h2>

          {/* Description */}
          <p className="text-slate-600 text-sm sm:text-base lg:text-lg leading-relaxed max-w-2xl mx-auto">
            Take the first step toward a successful career in technology. Learn
            in-demand skills, work on real-world projects, build a professional
            portfolio, and prepare for internships, freelancing, or your dream
            job all with expert guidance.
          </p>

          {/* Action Buttons */}
          <div className="flex flex-col sm:flex-row items-center justify-center gap-3.5 sm:gap-4 w-full sm:w-auto mt-2">
            <motion.a
              href="#apply"
              whileHover={{ scale: 1.03, y: -2 }}
              whileTap={{ scale: 0.97 }}
              className="bg-gradient-to-r from-blue-600 to-blue-700 text-white px-8 sm:px-9 py-4 rounded-full text-sm sm:text-base font-bold shadow-lg shadow-blue-500/25 flex items-center justify-center gap-2.5 w-full sm:w-auto transition-all hover:shadow-blue-500/40 hover:from-blue-700 hover:to-blue-800 focus:outline-hidden focus-visible:ring-2 focus-visible:ring-blue-500"
            >
              <Rocket className="w-5 h-5" />
              <span>Apply for Admission</span>
              <ArrowRight className="w-5 h-5" />
            </motion.a>

            <motion.button
              type="button"
              whileHover={{ scale: 1.03, y: -2 }}
              whileTap={{ scale: 0.97 }}
              onClick={scrollToContact}
              className="border-2 border-slate-200/90 bg-white/80 text-slate-700 px-8 sm:px-9 py-3.5 rounded-full text-sm sm:text-base font-bold flex items-center justify-center gap-2.5 w-full sm:w-auto transition-all hover:border-blue-500/40 hover:text-blue-600 hover:bg-white focus:outline-hidden focus-visible:ring-2 focus-visible:ring-blue-500 cursor-pointer"
            >
              <MessageCircle className="w-5 h-5 text-slate-500 group-hover:text-blue-600" />
              Contact Our Team
            </motion.button>
          </div>

          {/* Stats Strip */}
          <div className="grid grid-cols-3 gap-4 sm:gap-8 pt-8 mt-4 border-t border-slate-200/80 w-full">
            {[
              { end: 10, suffix: "+", label: "Professional Courses" },
              { end: 500, suffix: "+", label: "Students Trained" },
              { end: 100, suffix: "%", label: "Practical Learning" },
            ].map((s) => (
              <motion.div
                key={s.label}
                className="text-center group"
                whileHover={{ y: -2 }}
                transition={{ duration: 0.2 }}
              >
                <p className="text-slate-900 font-space font-extrabold text-2xl sm:text-3xl lg:text-4xl group-hover:text-blue-600 transition-colors">
                  <CountUp end={s.end} suffix={s.suffix} />
                </p>
                <p className="text-slate-500 text-[10px] sm:text-xs font-semibold uppercase tracking-wider mt-1 group-hover:text-slate-700 transition-colors">
                  {s.label}
                </p>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
}
