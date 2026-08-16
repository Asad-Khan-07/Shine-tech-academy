import React from "react";
import { motion, AnimatePresence, useReducedMotion } from "framer-motion";
import { Sparkles } from "lucide-react";

const EASE = [0.22, 1, 0.36, 1]; // premium "expo-out" feel, used throughout for consistency

const containerVariants = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.12, delayChildren: 0.15 } },
};

const itemVariants = {
  hidden: { opacity: 0, y: 14 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.55, ease: EASE } },
};

export default function Loader({
  isLoading = true,
  fadeDuration = 500, // ms — kept for drop-in API compatibility
  onComplete,
}) {
  const reduceMotion = useReducedMotion();
  const fadeSeconds = fadeDuration / 1000;

  return (
    <AnimatePresence onExitComplete={onComplete}>
      {isLoading && (
        <motion.div
          key="sta-loader"
          role="status"
          aria-label="Loading Shine Tech Academy"
          className="fixed inset-0 z-[99999] flex flex-col items-center justify-center bg-slate-950 select-none overflow-hidden pointer-events-auto"
          initial={{ opacity: 1 }}
          exit={{ opacity: 0, scale: 1.02 }}
          transition={{ duration: fadeSeconds, ease: EASE }}
        >
          {/* Ambient glow — soft, breathing, never jarring */}
          <motion.div
            aria-hidden
            className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[28rem] h-[28rem] bg-[#0956FC]/15 rounded-full blur-[130px] pointer-events-none"
            animate={reduceMotion ? {} : { opacity: [0.6, 1, 0.6] }}
            transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
          />
          <motion.div
            aria-hidden
            className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-72 h-72 bg-indigo-500/10 rounded-full blur-[100px] pointer-events-none"
            animate={reduceMotion ? {} : { opacity: [0.4, 0.9, 0.4] }}
            transition={{
              duration: 4.5,
              repeat: Infinity,
              ease: "easeInOut",
              delay: 0.5,
            }}
          />

          {/* Faint grid texture for depth */}
          <div
            aria-hidden
            className="absolute inset-0 opacity-[0.03] pointer-events-none"
            style={{
              backgroundImage:
                "linear-gradient(#fff 1px, transparent 1px), linear-gradient(90deg, #fff 1px, transparent 1px)",
              backgroundSize: "48px 48px",
            }}
          />

          <motion.div
            variants={containerVariants}
            initial="hidden"
            animate="visible"
            className="relative z-10 flex flex-col items-center max-w-xs text-center px-4"
          >
            {/* Dual Ring Animated Emblem */}
            <motion.div
              variants={itemVariants}
              className="relative flex items-center justify-center mb-8"
            >
              {/* Outer pulsing aura — smooth scale+fade, not the harsh default ping easing */}
              <motion.div
                aria-hidden
                className="absolute inset-0 rounded-2xl bg-[#0956FC]/25 blur-md"
                animate={
                  reduceMotion
                    ? {}
                    : { scale: [1, 1.35, 1], opacity: [0.5, 0, 0.5] }
                }
                transition={{
                  duration: 2.2,
                  repeat: Infinity,
                  ease: "easeInOut",
                }}
              />

              {/* Outer ring — conic gradient sweep, continuous linear rotation */}
              <motion.div
                aria-hidden
                className="w-24 h-24 rounded-2xl"
                style={{
                  background:
                    "conic-gradient(from 0deg, #0956FC 0deg, #4d82ff 40deg, transparent 110deg, transparent 360deg)",
                  WebkitMask:
                    "radial-gradient(farthest-side, transparent calc(100% - 3px), #000 calc(100% - 3px))",
                  mask: "radial-gradient(farthest-side, transparent calc(100% - 3px), #000 calc(100% - 3px))",
                  borderRadius: "1rem",
                }}
                animate={reduceMotion ? {} : { rotate: 360 }}
                transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
              />
              <div className="absolute w-24 h-24 rounded-2xl border-2 border-slate-800" />

              {/* Inner counter-rotating ring */}
              <motion.div
                aria-hidden
                className="absolute w-16 h-16 rounded-xl border-2 border-transparent border-b-[#0956FC]"
                animate={reduceMotion ? {} : { rotate: -360 }}
                transition={{ duration: 1.4, repeat: Infinity, ease: "linear" }}
              />

              {/* Center STA badge — gentle breathing scale keeps it feeling alive */}
              <motion.div
                className="absolute inset-4 bg-slate-900 border border-slate-800 rounded-xl flex flex-col items-center justify-center shadow-2xl"
                animate={reduceMotion ? {} : { scale: [1, 1.045, 1] }}
                transition={{
                  duration: 2.6,
                  repeat: Infinity,
                  ease: "easeInOut",
                }}
              >
                <span className="font-mono font-black text-xl text-white tracking-widest leading-none">
                  STA
                </span>
                <motion.span
                  className="w-1.5 h-1.5 bg-[#0956FC] rounded-full mt-1.5"
                  animate={reduceMotion ? {} : { opacity: [1, 0.3, 1] }}
                  transition={{
                    duration: 1.6,
                    repeat: Infinity,
                    ease: "easeInOut",
                  }}
                />
              </motion.div>
            </motion.div>

            {/* Brand Name & Tagline */}
            <motion.div
              variants={itemVariants}
              className="flex items-center gap-2 mb-1"
            >
              <Sparkles className="w-4 h-4 text-[#0956FC]" />
              <h1 className="font-bold text-xl text-white tracking-tight">
                Shine Tech Academy
              </h1>
            </motion.div>

            <motion.p
              variants={itemVariants}
              className="flex items-center justify-center gap-1 text-[11px] font-semibold text-slate-400 tracking-wider uppercase mb-6"
            >
              Getting things ready
              <span className="inline-flex gap-0.5 normal-case">
                {[0, 1, 2].map((i) => (
                  <motion.span
                    key={i}
                    animate={reduceMotion ? {} : { opacity: [0.2, 1, 0.2] }}
                    transition={{
                      duration: 1.2,
                      repeat: Infinity,
                      ease: "easeInOut",
                      delay: i * 0.2,
                    }}
                  >
                    .
                  </motion.span>
                ))}
              </span>
            </motion.p>

            {/* Progress Bar — smooth eased sweep, respects reduced-motion */}
            <motion.div
              variants={itemVariants}
              className="w-48 h-1 bg-slate-800 rounded-full overflow-hidden relative"
            >
              <motion.div
                className="absolute top-0 bottom-0 left-0 w-1/3 rounded-full bg-gradient-to-r from-transparent via-[#0956FC] to-transparent"
                animate={reduceMotion ? { x: "0%" } : { x: ["-120%", "340%"] }}
                transition={{
                  duration: 1.3,
                  repeat: reduceMotion ? 0 : Infinity,
                  ease: [0.4, 0, 0.2, 1],
                }}
              />
            </motion.div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
