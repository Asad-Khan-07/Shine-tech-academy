import { motion } from "framer-motion";
import { Handshake, BadgeCheck } from "lucide-react";

const PARTNERS = [
  {
    name: "TechNova",
    mark: "TN",
    tag: "Hiring Partner",
    desc: "Places top graduates into full-stack engineering roles.",
    color: "#0956fc",
  },
  {
    name: "CodeSphere",
    mark: "CS",
    tag: "Training Partner",
    desc: "Co-designs our MERN stack curriculum with senior engineers.",
    color: "#0956fc",
  },
  {
    name: "Pixel Works",
    mark: "PW",
    tag: "Design Partner",
    desc: "Mentors students through real client design briefs.",
    color: "#0956fc",
  },
  {
    name: "Bright Minds Ed.",
    mark: "BM",
    tag: "Education Partner",
    desc: "Provides scholarships for underprivileged tech learners.",
    color: "#0956fc",
  },
  {
    name: "Nexus Labs",
    mark: "NL",
    tag: "Tech Partner",
    desc: "Opens its sandbox environments for student AI projects.",
    color: "#0956fc",
  },
  {
    name: "Quantum Edge",
    mark: "QE",
    tag: "Hiring Partner",
    desc: "Runs quarterly hiring drives exclusively for STA alumni.",
    color: "#0956fc",
  },
  {
    name: "Skyline Solutions",
    mark: "SS",
    tag: "Internship Partner",
    desc: "Offers paid internships to our top-performing cohorts.",
    color: "#0956fc",
  },
  {
    name: "Vertex Group",
    mark: "VG",
    tag: "Tech Partner",
    desc: "Sponsors cloud credits for every student capstone project.",
    color: "#0956fc",
  },
];

const MARQUEE_ITEMS = [...PARTNERS, ...PARTNERS];

function PartnerCard({ partner }) {
  return (
    <div className="group relative bg-white rounded-2xl border border-slate-200/80 shadow-sm hover:shadow-md hover:border-blue-300 transition-all duration-300 flex flex-col gap-4 px-6 py-6 w-[260px] sm:w-[300px] flex-shrink-0">
      {/* Top row: logo mark + partnership tag */}
      <div className="flex items-center justify-between gap-3">
        <div className="w-12 h-12 rounded-xl flex items-center justify-center text-white font-space font-extrabold text-base shadow-sm transition-transform duration-300 group-hover:scale-105 flex-shrink-0 bg-[#0956fc]">
          {partner.mark}
        </div>
        <span className="inline-flex items-center gap-1 text-[10px] font-bold uppercase tracking-wide px-2.5 py-1 rounded-full bg-blue-50 text-[#0956fc] border border-blue-100 whitespace-nowrap">
          <BadgeCheck className="w-3 h-3 text-[#0956fc]" />
          {partner.tag}
        </span>
      </div>

      {/* Name + description */}
      <div>
        <h3 className="font-space font-bold text-slate-900 text-base mb-1.5 group-hover:text-[#0956fc] transition-colors duration-200">
          {partner.name}
        </h3>
        <p className="text-slate-500 text-sm leading-relaxed">{partner.desc}</p>
      </div>
    </div>
  );
}

export default function Partners() {
  return (
    <section
      id="our-partners"
      className="py-16 sm:py-24 px-4 sm:px-6 lg:px-8 bg-slate-50 relative overflow-hidden"
    >
      {/* Marquee keyframes + edge fade mask */}
      <style>{`
        @keyframes partners-marquee-scroll {
          from { transform: translateX(0); }
          to   { transform: translateX(-50%); }
        }
        .partners-marquee-track {
          animation: partners-marquee-scroll 34s linear infinite;
        }
        .partners-marquee-track:hover {
          animation-play-state: paused;
        }
        .partners-marquee-mask {
          -webkit-mask-image: linear-gradient(90deg, transparent 0%, #000 6%, #000 94%, transparent 100%);
          mask-image: linear-gradient(90deg, transparent 0%, #000 6%, #000 94%, transparent 100%);
        }
        @media (prefers-reduced-motion: reduce) {
          .partners-marquee-track { animation: none; }
        }
      `}</style>

      <div className="max-w-7xl mx-auto relative z-10">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.6 }}
          className="flex flex-col items-center text-center gap-3 mb-14"
        >
          <span className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full text-xs font-extrabold uppercase tracking-widest bg-blue-50 border border-blue-200 text-[#0956fc] shadow-sm">
            <Handshake className="w-4 h-4 text-[#0956fc]" />
            Our Partners
          </span>
          <h2 className="font-space font-extrabold text-3xl sm:text-4xl md:text-5xl text-slate-900">
            Trusted by <span className="text-[#0956fc]">Industry Leaders</span>
          </h2>
          <p className="text-slate-500 max-w-xl text-base sm:text-lg">
            We collaborate with forward-thinking companies to bring real
            projects, mentorship, and career opportunities straight to our
            students.
          </p>
        </motion.div>

        {/* Auto-looping marquee carousel */}
        <motion.div
          initial={{ opacity: 0, y: 28 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.6, delay: 0.15 }}
          className="partners-marquee-mask -mx-4 sm:-mx-6 lg:-mx-8"
        >
          <div className="partners-marquee-track flex gap-5 sm:gap-6 w-max px-4 sm:px-6 lg:px-8 pt-4 pb-4">
            {MARQUEE_ITEMS.map((partner, i) => (
              <PartnerCard key={`${partner.name}-${i}`} partner={partner} />
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
}
