import { motion } from 'framer-motion'
import { Handshake, BadgeCheck } from 'lucide-react'

/*
  Placeholder partner data — swap these for your real partners later.
  - name:  company name
  - mark:  initials shown in the logo tile (replace tile with <img> once you
           have real logos, see PartnerCard below)
  - tag:   short partnership type, e.g. "Hiring Partner", "Tech Partner"
  - desc:  one-line description of the collaboration
  - color: accent used for the logo tile gradient
*/
const PARTNERS = [
  { name: 'TechNova',          mark: 'TN', tag: 'Hiring Partner',     desc: 'Places top graduates into full-stack engineering roles.',        color: '#0956fc' },
  { name: 'CodeSphere',        mark: 'CS', tag: 'Training Partner',   desc: 'Co-designs our MERN stack curriculum with senior engineers.',     color: '#1a6aff' },
  { name: 'Pixel Works',       mark: 'PW', tag: 'Design Partner',     desc: 'Mentors students through real client design briefs.',             color: '#3b82f6' },
  { name: 'Bright Minds Ed.',  mark: 'BM', tag: 'Education Partner',  desc: 'Provides scholarships for underprivileged tech learners.',        color: '#60a5fa' },
  { name: 'Nexus Labs',        mark: 'NL', tag: 'Tech Partner',       desc: 'Opens its sandbox environments for student AI projects.',         color: '#0956fc' },
  { name: 'Quantum Edge',      mark: 'QE', tag: 'Hiring Partner',     desc: 'Runs quarterly hiring drives exclusively for STA alumni.',        color: '#1a6aff' },
  { name: 'Skyline Solutions', mark: 'SS', tag: 'Internship Partner', desc: 'Offers paid internships to our top-performing cohorts.',          color: '#3b82f6' },
  { name: 'Vertex Group',      mark: 'VG', tag: 'Tech Partner',       desc: 'Sponsors cloud credits for every student capstone project.',      color: '#60a5fa' },
]

// Duplicate the list so the marquee track can loop seamlessly (50% width shift)
const MARQUEE_ITEMS = [...PARTNERS, ...PARTNERS]

function PartnerCard({ partner }) {
  return (
    <div
      className="group relative bg-white rounded-2xl border border-slate-100 shadow-sm card-hover glow-border flex flex-col gap-4 px-6 py-6 w-[260px] sm:w-[300px] flex-shrink-0"
    >
      {/* Top row: logo mark + partnership tag */}
      <div className="flex items-center justify-between gap-3">
        <div
          className="w-12 h-12 rounded-xl flex items-center justify-center text-white font-space font-extrabold text-base shadow-md transition-transform duration-300 group-hover:scale-105 flex-shrink-0"
          style={{ background: `linear-gradient(135deg, ${partner.color}, #0045d6)` }}
        >
          {/* Swap this tile for a real logo once available:
              <img src={partner.logo} alt={partner.name} className="w-full h-full object-contain rounded-xl" /> */}
          {partner.mark}
        </div>
        <span className="inline-flex items-center gap-1 text-[10px] font-bold uppercase tracking-wide px-2.5 py-1 rounded-full bg-blue-50 text-blue-700 border border-blue-100 whitespace-nowrap">
          <BadgeCheck className="w-3 h-3" />
          {partner.tag}
        </span>
      </div>

      {/* Name + description */}
      <div>
        <h3 className="font-space font-bold text-slate-900 text-base mb-1.5">
          {partner.name}
        </h3>
        <p className="text-slate-500 text-sm leading-relaxed">
          {partner.desc}
        </p>
      </div>
    </div>
  )
}

export default function Partners() {
  return (
    <section id="partners" className="py-16 sm:py-24 px-4 sm:px-6 lg:px-8 bg-white relative overflow-hidden">

      {/* Marquee keyframes + edge fade mask, scoped to this component */}
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
          viewport={{ once: true, margin: '-80px' }}
          transition={{ duration: 0.6 }}
          className="flex flex-col items-center text-center gap-3 mb-14"
        >
          <span className="section-tag">
            <span className="inline-flex items-center gap-2">
              <Handshake className="w-4 h-4" />
              Our Partners
            </span>
          </span>
          <h2 className="font-space font-extrabold text-3xl sm:text-4xl md:text-5xl text-slate-900">
            Trusted by Industry Leaders
          </h2>
          <p className="text-slate-500 max-w-xl">
            We collaborate with forward-thinking companies to bring real projects,
            mentorship, and career opportunities straight to our students.
          </p>
        </motion.div>

        {/* Auto-looping marquee carousel — fades in on scroll, then scrolls forever */}
        <motion.div
          initial={{ opacity: 0, y: 28 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-80px' }}
          transition={{ duration: 0.6, delay: 0.15 }}
          className="partners-marquee-mask -mx-4 sm:-mx-6 lg:-mx-8"
        >
          <div className="partners-marquee-track flex gap-5 sm:gap-6 w-max px-4 sm:px-6 lg:px-8 pt-4 pb-1">
            {MARQUEE_ITEMS.map((partner, i) => (
              <PartnerCard key={`${partner.name}-${i}`} partner={partner} />
            ))}
          </div>
        </motion.div>

      </div>
    </section>
  )
}