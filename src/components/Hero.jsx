import { useEffect, useState, useRef } from "react";
import { motion, useInView } from "framer-motion";
import {
  Rocket,
  Sparkles,
  Star,
  GraduationCap,
  CheckCircle,
} from "lucide-react";
import Particles from "./animatedbg/Particales";

/* ── Animated floating card ── */
function FloatCard({ children, className = "", delay = 0, yRange = [-8, 8] }) {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.85 }}
      animate={{ opacity: 1, scale: 1, y: [yRange[0], yRange[1], yRange[0]] }}
      transition={{
        opacity: { duration: 0.5, delay },
        scale: { duration: 0.5, delay },
        y: {
          duration: 4 + delay,
          repeat: Infinity,
          ease: "easeInOut",
          delay: delay * 0.5,
        },
      }}
      className={className}
    >
      {children}
    </motion.div>
  );
}

/* ── Tech tag chip ── */
function TechTag({ label, delay }) {
  return (
    <motion.span
      initial={{ opacity: 0, scale: 0.8 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ delay, duration: 0.4 }}
      className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-semibold bg-white border border-blue-100 text-blue-700 shadow-sm"
    >
      <span className="w-1.5 h-1.5 rounded-full bg-blue-500 inline-block" />
      {label}
    </motion.span>
  );
}

const TECH_TAGS = [
  "Artificial Intelligence",
  "Software Development",
  "UI/UX Design",
  "Digital Marketing",
  "Academic Coaching",
  "English Language",
  "Programming Languages",
  "Robotics",
];

/* ── Blinking terminal cursor ── */
function BlinkCursor() {
  return (
    <motion.span
      animate={{ opacity: [1, 1, 0, 0] }}
      transition={{ duration: 1, repeat: Infinity, times: [0, 0.5, 0.5, 1] }}
      className="inline-block w-[7px] h-[14px] align-middle ml-0.5 bg-[#0956fc]"
    />
  );
}

/* ── Code lines for typewriter ── */
const CODE_LINES = [
  [
    { t: "const ", c: "#a855f7" },
    { t: "student", c: "#0956fc" },
    { t: " = " },
    { t: "'you'", c: "#16a34a" },
    { t: ";" },
  ],
  [
    { t: "function ", c: "#a855f7" },
    { t: "buildCareer", c: "#0956fc" },
    { t: "() {" },
  ],
  [{ t: "  learn(" }, { t: "'real projects'", c: "#16a34a" }, { t: ");" }],
  [{ t: "  practice(" }, { t: "'with mentors'", c: "#16a34a" }, { t: ");" }],
  [
    { t: "  return ", c: "#a855f7" },
    { t: "'dream job'", c: "#16a34a" },
  ],
  [{ t: "}" }],
];

/* ── Typewriter Code ── */
function TypewriterCode({
  lines = CODE_LINES,
  speed = 26,
  startDelay = 700,
  pauseAfterFinish = 1800,
  pauseBeforeRestart = 400,
}) {
  const [typed, setTyped] = useState(0);
  const fullLines = lines.map((segs) => segs.map((s) => s.t).join(""));
  const totalChars = fullLines.reduce((sum, l) => sum + l.length, 0);

  useEffect(() => {
    let chars = 0;
    let typingInterval;
    let timeoutA, timeoutB, timeoutC;

    const startTyping = () => {
      chars = 0;
      setTyped(0);

      timeoutA = setTimeout(() => {
        typingInterval = setInterval(() => {
          chars += 1;
          setTyped(chars);
          if (chars >= totalChars) {
            clearInterval(typingInterval);
            timeoutB = setTimeout(() => {
              setTyped(0);
              timeoutC = setTimeout(startTyping, pauseBeforeRestart);
            }, pauseAfterFinish);
          }
        }, speed);
      }, startDelay);
    };

    startTyping();

    return () => {
      clearTimeout(timeoutA);
      clearTimeout(timeoutB);
      clearTimeout(timeoutC);
      clearInterval(typingInterval);
    };
  }, [totalChars, speed, startDelay, pauseAfterFinish, pauseBeforeRestart]);

  let consumed = 0;

  return (
    <div className="p-4 xs:p-5 sm:p-6 h-[190px] xs:h-[210px] sm:h-[240px] overflow-hidden font-mono text-[11px] xs:text-xs sm:text-sm leading-relaxed sm:leading-loose select-none">
      {lines.map((segs, li) => {
        const lineFull = fullLines[li];
        const lineStart = consumed;
        consumed += lineFull.length;
        const lineTyped = Math.max(
          0,
          Math.min(lineFull.length, typed - lineStart),
        );
        const isCurrentLine =
          typed >= lineStart && typed < lineStart + lineFull.length;
        let segConsumed = 0;

        return (
          <p key={li}>
            {segs.map((seg, si) => {
              const segStart = segConsumed;
              segConsumed += seg.t.length;
              const visible = Math.max(
                0,
                Math.min(seg.t.length, lineTyped - segStart),
              );
              return (
                <span key={si} style={seg.c ? { color: seg.c } : undefined}>
                  {seg.t.slice(0, visible)}
                </span>
              );
            })}
            {isCurrentLine && <BlinkCursor />}
          </p>
        );
      })}
      {typed >= totalChars && (
        <p>
          <BlinkCursor />
        </p>
      )}
    </div>
  );
}

/* ── Code Editor Mockup Illustration ── */
function CodeEditorIllustration() {
  return (
    <motion.div
      initial={{ opacity: 0, y: 24 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, delay: 0.55 }}
      className="relative w-full max-w-md mx-auto lg:mx-0 px-6 sm:px-8"
    >
      {/* Central editor mockup */}
      <motion.div
        whileHover={{ y: -4 }}
        className="relative bg-white rounded-3xl border border-blue-100 shadow-2xl shadow-blue-500/10 overflow-hidden text-left"
      >
        {/* Window chrome */}
        <div className="flex items-center gap-1.5 px-4 py-3 border-b border-slate-100 bg-slate-50/70">
          <span className="w-2.5 h-2.5 rounded-full bg-red-400" />
          <span className="w-2.5 h-2.5 rounded-full bg-amber-400" />
          <span className="w-2.5 h-2.5 rounded-full bg-green-400" />
          <span className="ml-3 text-[10px] xs:text-xs text-slate-400 font-mono truncate">
            student-project.jsx
          </span>
        </div>

        {/* Code typewriter */}
        <TypewriterCode />
      </motion.div>

      {/* Floating chip — Certified */}
      <FloatCard
        delay={0.3}
        yRange={[-6, 6]}
        className="absolute -top-5 -left-2 xs:-left-6 sm:-left-10"
      >
        <div className="flex items-center gap-2 bg-white rounded-2xl border border-blue-100 shadow-lg shadow-blue-500/10 pl-2 pr-3.5 py-2">
          <div className="w-7 h-7 rounded-lg flex items-center justify-center shrink-0 bg-[#0956fc]">
            <GraduationCap className="w-3.5 h-3.5 text-white" />
          </div>
          <span className="text-[11px] xs:text-xs font-bold text-slate-800 whitespace-nowrap">
            Certified Training
          </span>
        </div>
      </FloatCard>

      {/* Floating chip — Job Ready */}
      <FloatCard
        delay={0.6}
        yRange={[-8, 4]}
        className="absolute -bottom-5 -right-2 xs:-right-6 sm:-right-10"
      >
        <div className="flex items-center gap-2 bg-white rounded-2xl border border-blue-100 shadow-lg shadow-blue-500/10 pl-2 pr-3.5 py-2">
          <div className="w-7 h-7 rounded-lg flex items-center justify-center shrink-0 bg-[#0956fc]">
            <Rocket className="w-3.5 h-3.5 text-white" />
          </div>
          <span className="text-[11px] xs:text-xs font-bold text-slate-800 whitespace-nowrap">
            Job-Ready Skills
          </span>
        </div>
      </FloatCard>

      {/* Floating chip — Rating */}
      <FloatCard
        delay={0.9}
        yRange={[-5, 9]}
        className="hidden sm:block absolute top-1/2 -translate-y-1/2 -right-14"
      >
        <div className="flex items-center gap-1 bg-white rounded-full border border-blue-100 shadow-lg shadow-blue-500/10 px-3 py-1.5">
          {[...Array(5)].map((_, i) => (
            <Star
              key={i}
              className="w-3 h-3 fill-[#0956fc] text-[#0956fc]"
              aria-hidden="true"
            />
          ))}
        </div>
      </FloatCard>
    </motion.div>
  );
}

export default function Hero({ onApply }) {
  const sectionRef = useRef(null);

  const handleEnrollClick = (e) => {
    if (onApply) {
      onApply(e);
    } else {
      document.querySelector("#apply")?.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <section
      ref={sectionRef}
      id="hero"
      className="relative min-h-[100dvh] flex items-center justify-center overflow-hidden pt-20 pb-10"
    >
      {/* Background layer */}
      <div className="absolute inset-0 z-0 overflow-hidden pointer-events-none">
        <div
          className="absolute inset-0"
          style={{
            background:
              "radial-gradient(ellipse 75% 55% at 50% -5%, rgba(9,86,252,0.10) 0%, transparent 65%), #f8faff",
          }}
        />

        <div className="absolute inset-0 opacity-70">
          <Particles
            particleColors={["#0956fc", "#4f8dfd", "#0956fc"]}
            particleCount={500}
            particleSpread={10}
            speed={0.1}
            particleBaseSize={80}
            moveParticlesOnHover
            alphaParticles={false}
            disableRotation={false}
            pixelRatio={1}
          />
        </div>

        <div
          className="absolute inset-x-0 bottom-0 h-40 pointer-events-none"
          style={{
            background: "linear-gradient(to bottom, transparent, #f8faff)",
          }}
        />
      </div>

      {/* Main content */}
      <div className="relative z-10 max-w-6xl mx-auto px-4 sm:px-6 w-full">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-10 items-center">
          {/* Left column */}
          <div className="flex flex-col items-center lg:items-start text-center lg:text-left gap-8">
            {/* Live badge */}
            <motion.div
              initial={{ opacity: 0, y: -16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="flex items-center gap-1.5 xs:gap-2 bg-white border border-blue-100 rounded-full px-3 xs:px-4 py-1.5 xs:py-2 shadow-md shadow-blue-500/10 max-w-full"
            >
              <span className="relative flex shrink-0">
                <span className="w-1.5 xs:w-2 h-1.5 xs:h-2 rounded-full bg-blue-600 block" />
                <span className="absolute inset-0 w-1.5 xs:w-2 h-1.5 xs:h-2 rounded-full bg-blue-400 animate-ping opacity-70" />
              </span>
              <span className="text-blue-700 text-[10px] xs:text-xs font-bold uppercase tracking-widest truncate">
                Admissions Open August 2026 Intake
              </span>
              <Sparkles className="w-3 xs:w-3.5 h-3 xs:h-3.5 text-blue-500 shrink-0" />
            </motion.div>

            {/* Headline */}
            <motion.div
              initial={{ opacity: 0, y: 24 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.1 }}
              className="flex flex-col gap-2"
            >
              <h1 className="font-space font-extrabold text-slate-900 text-3xl xs:text-4xl sm:text-5xl md:text-6xl lg:text-7xl leading-[1.08] tracking-tight">
                Launch Your <span className="text-[#0956fc]">Tech Career</span>
                <br />
                <span className="relative inline-block">
                  <span className="text-slate-900">with</span>{" "}
                  <span className="text-[#0956fc]">STA</span>
                  {/* Underline curve */}
                  <svg
                    className="absolute -bottom-2 left-0 w-full"
                    height="10"
                    viewBox="0 0 200 10"
                    preserveAspectRatio="none"
                    fill="none"
                    aria-hidden="true"
                  >
                    <motion.path
                      d="M 2,6 Q 100,12 198,6"
                      stroke="#0956fc"
                      strokeWidth="3"
                      strokeLinecap="round"
                      initial={{ pathLength: 0 }}
                      animate={{ pathLength: 1 }}
                      transition={{ duration: 1, delay: 0.8, ease: "easeOut" }}
                    />
                  </svg>
                </span>
              </h1>
            </motion.div>

            {/* Subtext */}
            <motion.p
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.25 }}
              className="text-slate-500 text-base sm:text-lg md:text-xl leading-relaxed max-w-2xl"
            >
              Industry Focused Courses, Real World Projects, and Dedicated
              Career Support All in One Place to Help You Land Your{" "}
              <span className="text-slate-800 font-semibold">
                First Tech Job
              </span>
              .
            </motion.p>

            {/* Tech tags */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.35 }}
              className="flex flex-wrap justify-center lg:justify-start gap-2 max-w-2xl"
            >
              {TECH_TAGS.map((tag, i) => (
                <TechTag key={tag} label={tag} delay={0.4 + i * 0.06} />
              ))}
            </motion.div>

            {/* CTA Buttons */}
            <motion.div
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.5 }}
              className="flex flex-col sm:flex-row gap-3 items-stretch sm:items-center w-full sm:w-auto px-4 sm:px-0"
            >
              <motion.div
                whileHover={{ scale: 1.05, y: -3 }}
                whileTap={{ scale: 0.97 }}
                className="w-full sm:w-auto"
              >
                <a
                  href="#apply"
                  onClick={handleEnrollClick}
                  className="btn-primary px-8 py-4 rounded-full text-base font-bold shadow-xl shadow-blue-500/30 flex items-center justify-center gap-2 w-full text-white bg-[#0956fc] hover:bg-blue-700 transition-colors"
                >
                  <Rocket className="w-5 h-5" />
                  Enroll Now It's Free
                </a>
              </motion.div>

              <motion.button
                type="button"
                whileHover={{ scale: 1.04, y: -3 }}
                whileTap={{ scale: 0.97 }}
                onClick={() =>
                  document
                    .querySelector("#contact")
                    ?.scrollIntoView({ behavior: "smooth" })
                }
                className="bg-white text-slate-800 font-bold px-8 py-4 rounded-full text-base transition-all flex items-center justify-center gap-2 border border-slate-200 hover:border-blue-300 shadow-md hover:shadow-lg hover:shadow-blue-500/10 w-full sm:w-auto cursor-pointer"
              >
                <Sparkles className="w-5 h-5 text-blue-500" />
                Book FREE Demo
              </motion.button>
            </motion.div>

            {/* Social proof */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.85 }}
              className="flex flex-wrap items-center justify-center lg:justify-start gap-3"
            >
              <div className="flex -space-x-2.5">
                {[
                  { initials: "AR" },
                  { initials: "HZ" },
                  { initials: "UA" },
                  { initials: "SK" },
                ].map((s, i) => (
                  <motion.div
                    key={i}
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    transition={{ delay: 0.9 + i * 0.08 }}
                    className="w-9 h-9 rounded-full border-2 border-white flex items-center justify-center text-white text-[10px] font-black shadow bg-[#0956fc]"
                  >
                    {s.initials}
                  </motion.div>
                ))}
              </div>
              <div className="text-left">
                <p className="text-xs text-slate-500 font-medium">
                  <span className="text-slate-900 font-bold">
                    500+ students
                  </span>{" "}
                  already learning
                </p>
                <div className="flex items-center gap-0.5 mt-0.5">
                  {[...Array(5)].map((_, i) => (
                    <Star
                      key={i}
                      className="w-3 h-3 fill-[#0956fc] text-[#0956fc]"
                      aria-hidden="true"
                    />
                  ))}
                  <span className="text-[10px] text-slate-400 ml-1 font-semibold">
                    4.5+ Rating
                  </span>
                </div>
              </div>
              <div className="flex items-center gap-1.5 text-xs font-bold px-3 py-1.5 rounded-full bg-blue-50 text-[#0956fc] border border-blue-200">
                <CheckCircle className="w-3.5 h-3.5" />
                Verified Academy
              </div>
            </motion.div>
          </div>

          {/* Right column */}
          <div className="flex justify-center lg:justify-end">
            <CodeEditorIllustration />
          </div>
        </div>
      </div>
    </section>
  );
}
