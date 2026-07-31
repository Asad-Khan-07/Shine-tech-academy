import { useEffect, useState } from 'react'
import { motion } from 'framer-motion'
import {
  Shield, User, Info, Cookie, Globe, Share2,
  GraduationCap, ExternalLink, RefreshCw, Mail,
  MapPin, Clock, FileText, ArrowLeft, Home
} from 'lucide-react'

const BRAND = '#0956fc'

const SECTIONS = [
  { id: 'info-collect',  icon: User,          title: 'Information We Collect',  num: '01' },
  { id: 'how-use',       icon: Info,           title: 'How We Use Your Info',    num: '02' },
  { id: 'data-protect',  icon: Shield,         title: 'Data Protection',         num: '03' },
  { id: 'cookies',       icon: Cookie,         title: 'Cookies',                 num: '04' },
  { id: 'third-party',   icon: Globe,          title: 'Third-Party Services',    num: '05' },
  { id: 'info-sharing',  icon: Share2,         title: 'Information Sharing',     num: '06' },
  { id: 'student-info',  icon: GraduationCap,  title: 'Student Information',     num: '07' },
  { id: 'ext-links',     icon: ExternalLink,   title: 'External Links',          num: '08' },
  { id: 'changes',       icon: RefreshCw,      title: 'Changes to this Policy',  num: '09' },
  { id: 'contact',       icon: Mail,           title: 'Contact Us',              num: '10' },
]

function scrollToSection(id) {
  const el = document.getElementById(id)
  if (el) el.scrollIntoView({ behavior: 'smooth', block: 'start' })
}

export default function PrivacyPolicy({ onBack }) {
  const [activeSection, setActiveSection] = useState('')

  useEffect(() => {
    window.scrollTo(0, 0)
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) setActiveSection(entry.target.id)
        })
      },
      { rootMargin: '-20% 0px -70% 0px' }
    )
    SECTIONS.forEach(({ id }) => {
      const el = document.getElementById(id)
      if (el) observer.observe(el)
    })
    return () => observer.disconnect()
  }, [])

  return (
    <div className="min-h-screen bg-white text-slate-900 font-sans">

      {/* ── Hero Banner ─────────────────────────── */}
      <div
        className="relative overflow-hidden text-white"
        style={{ background: BRAND }}
      >
        <div className="absolute -top-24 -right-24 w-96 h-96 rounded-full blur-3xl pointer-events-none"
          style={{ background: 'rgba(255,255,255,0.08)' }} />
        <div className="absolute -bottom-16 -left-16 w-72 h-72 rounded-full blur-3xl pointer-events-none"
          style={{ background: 'rgba(255,255,255,0.06)' }} />

        <div className="relative max-w-7xl mx-auto px-6 py-16 sm:py-24">
          {/* Back button */}
          <motion.button
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            onClick={onBack}
            className="flex items-center gap-2 text-white/80 hover:text-white transition-colors text-sm font-semibold mb-10 group"
          >
            <ArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" />
            Back to Home
          </motion.button>

          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="flex flex-col items-start gap-5"
          >
            {/* Badge */}
            <span className="inline-flex items-center gap-2 border border-white/30 text-white text-xs font-bold px-4 py-1.5 rounded-full uppercase tracking-widest backdrop-blur-sm"
              style={{ background: 'rgba(255,255,255,0.15)' }}>
              <Shield className="w-3.5 h-3.5" /> Legal Document
            </span>

            <div>
              <h1 className="text-4xl sm:text-5xl lg:text-6xl font-black leading-tight tracking-tight">
                Privacy
                <span className="block text-white">Policy</span>
              </h1>
              <p className="mt-4 text-white text-base sm:text-lg max-w-2xl leading-relaxed opacity-90">
                Your privacy is important to us. This Policy explains how we collect, use, store, and protect your personal information.
              </p>
            </div>

            {/* Meta pills */}
            <div className="flex flex-wrap gap-3 mt-2 text-sm">
              <div className="flex items-center gap-1.5 rounded-lg px-3 py-1.5 text-white border border-white/30"
                style={{ background: 'rgba(255,255,255,0.15)' }}>
                <Clock className="w-3.5 h-3.5" />
                <span>Effective: <strong>July 31, 2026</strong></span>
              </div>
              <div className="flex items-center gap-1.5 rounded-lg px-3 py-1.5 text-white border border-white/30"
                style={{ background: 'rgba(255,255,255,0.15)' }}>
                <FileText className="w-3.5 h-3.5" />
                <span><strong>10</strong> Sections</span>
              </div>
            </div>
          </motion.div>
        </div>

        {/* Wave divider */}
        <div className="relative h-14 -mb-px">
          <svg viewBox="0 0 1440 56" preserveAspectRatio="none" className="absolute inset-0 w-full h-full">
            <path d="M0,56 C360,0 1080,0 1440,56 L1440,56 L0,56 Z" fill="white" />
          </svg>
        </div>
      </div>

      {/* ── Content ─────────────────────────────── */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="flex flex-col lg:flex-row gap-10">

          {/* ── Sticky TOC Sidebar ── */}
          <aside className="hidden lg:block w-72 shrink-0">
            <div className="sticky top-8">
              <div className="rounded-2xl p-5 border border-slate-100 bg-slate-50">
                <h3 className="text-xs font-black uppercase tracking-widest text-slate-400 mb-4">
                  Table of Contents
                </h3>
                <nav className="flex flex-col gap-1">
                  {SECTIONS.map(({ id, icon: Icon, title, num }) => {
                    const isActive = activeSection === id
                    return (
                      <button
                        key={id}
                        onClick={() => scrollToSection(id)}
                        className="flex items-center gap-3 w-full text-left px-3 py-2.5 rounded-xl text-sm transition-all duration-200"
                        style={
                          isActive
                            ? { background: BRAND, color: '#fff', boxShadow: `0 4px 14px ${BRAND}40` }
                            : {}
                        }
                      >
                        <span className="text-xs font-black tabular-nums w-5 shrink-0"
                          style={{ color: isActive ? 'rgba(255,255,255,0.6)' : '#94a3b8' }}>
                          {num}
                        </span>
                        <Icon className="w-3.5 h-3.5 shrink-0"
                          style={{ color: isActive ? '#fff' : '#94a3b8' }} />
                        <span className="font-semibold truncate"
                          style={{ color: isActive ? '#fff' : '#475569' }}>
                          {title}
                        </span>
                      </button>
                    )
                  })}
                </nav>
              </div>
              <button
                onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
                className="mt-4 w-full flex items-center justify-center gap-2 py-2.5 rounded-xl border border-slate-200 text-slate-500 text-sm font-semibold transition-all hover:border-[#0956fc] hover:text-[#0956fc]"
              >
                ↑ Back to Top
              </button>
            </div>
          </aside>

          {/* ── Sections ── */}
          <main className="flex-1 min-w-0 flex flex-col gap-6">

            {/* Section 1 */}
            <Section id="info-collect" num="01" icon={User} title="Information We Collect">
              <p className="mb-3">We may collect the following information:</p>
              <ul>
                <li>Full Name</li>
                <li>Phone Number</li>
                <li>Email Address</li>
                <li>Course Selection</li>
                <li>Messages submitted through our contact forms</li>
                <li>Website usage data (analytics, cookies, browser information)</li>
              </ul>
            </Section>

            {/* Section 2 */}
            <Section id="how-use" num="02" icon={Info} title="How We Use Your Information">
              <p className="mb-3">Your information is used to:</p>
              <ul>
                <li>Process course registrations</li>
                <li>Contact you regarding admissions</li>
                <li>Respond to your inquiries</li>
                <li>Provide student support</li>
                <li>Improve our website and services</li>
                <li>Share important academy updates (only when relevant)</li>
              </ul>
            </Section>

            {/* Section 3 */}
            <Section id="data-protect" num="03" icon={Shield} title="Data Protection">
              <p>We take appropriate technical and organizational measures to protect your personal information against unauthorized access, misuse, or disclosure.</p>
            </Section>

            {/* Section 4 */}
            <Section id="cookies" num="04" icon={Cookie} title="Cookies">
              <p>Our website may use cookies to improve user experience, analyze website traffic, and enhance website performance. You may disable cookies through your browser settings.</p>
            </Section>

            {/* Section 5 */}
            <Section id="third-party" num="05" icon={Globe} title="Third-Party Services">
              <p className="mb-3">We may use trusted third-party services such as:</p>
              <ul>
                <li>Google Analytics</li>
                <li>Google Maps</li>
                <li>WhatsApp</li>
                <li>Social Media Platforms</li>
              </ul>
              <p className="mt-3">These services have their own privacy policies.</p>
            </Section>

            {/* Section 6 */}
            <Section id="info-sharing" num="06" icon={Share2} title="Information Sharing">
              <p className="mb-3">We do not sell, rent, or trade your personal information to third parties.</p>
              <p className="mb-3">Information may only be shared when:</p>
              <ul>
                <li>Required by law</li>
                <li>Necessary to provide academy services</li>
                <li>With your consent</li>
              </ul>
            </Section>

            {/* Section 7 */}
            <Section id="student-info" num="07" icon={GraduationCap} title="Student Information">
              <p>Student records are kept confidential and used only for academic, administrative, and communication purposes.</p>
            </Section>

            {/* Section 8 */}
            <Section id="ext-links" num="08" icon={ExternalLink} title="External Links">
              <p>Our website may contain links to external websites. We are not responsible for their privacy practices or content.</p>
            </Section>

            {/* Section 9 */}
            <Section id="changes" num="09" icon={RefreshCw} title="Changes to this Policy">
              <p>We may update this Privacy Policy from time to time. Changes will be published on this page with the updated effective date.</p>
            </Section>

            {/* Section 10 — Contact */}
            <motion.div
              id="contact"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
              className="rounded-2xl overflow-hidden"
              style={{ border: `1px solid #dce8ff` }}
            >
              <div className="px-6 py-5 flex items-center gap-3" style={{ background: BRAND }}>
                <div className="w-9 h-9 bg-white/15 rounded-xl flex items-center justify-center">
                  <Mail className="w-4 h-4 text-white" />
                </div>
                <div>
                  <span className="text-xs font-bold uppercase tracking-widest" style={{ color: 'rgba(255,255,255,0.55)' }}>10</span>
                  <h2 className="text-white font-black text-lg leading-tight">Contact Us</h2>
                </div>
              </div>
              <div className="px-6 py-6" style={{ background: '#f0f5ff' }}>
                <p className="text-slate-500 mb-6 text-sm">
                  If you have any questions regarding this Privacy Policy, please contact us:
                </p>
                <div className="grid sm:grid-cols-2 gap-4">
                  <ContactCard icon={Globe}  label="Academy" value="Shine Tech Academy" />
                  <ContactCard icon={Mail}   label="Email"   value="info@shinetechacademy.com" href="mailto:info@shinetechacademy.com" />
                  <ContactCard icon={MapPin} label="Address" value="Bungalow No. 306, Unit No. 9, Latifabad No. 9, Hyderabad, Sindh, Pakistan" />
                </div>
              </div>
            </motion.div>

            {/* Footer row */}
            <div className="mt-4 p-5 rounded-2xl flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 border"
              style={{ background: '#f8faff', borderColor: '#dce8ff' }}>
              <div>
                <p className="text-slate-700 font-semibold text-sm">Last updated: July 31, 2026</p>
                <p className="text-slate-400 text-xs mt-0.5">Shine Tech Academy — Empowering Future Tech Leaders</p>
              </div>
              <button
                onClick={onBack}
                className="flex items-center gap-2 text-white font-bold text-sm px-5 py-2.5 rounded-xl transition-opacity hover:opacity-90 shrink-0"
                style={{ background: BRAND, boxShadow: `0 4px 14px ${BRAND}40` }}
              >
                <Home className="w-4 h-4" /> Return to Home
              </button>
            </div>

          </main>
        </div>
      </div>
    </div>
  )
}

/* ── Reusable Section Card ── */
function Section({ id, num, icon: Icon, title, children }) {
  return (
    <motion.div
      id={id}
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5 }}
      className="rounded-2xl overflow-hidden"
      style={{ border: '1px solid #dce8ff' }}
    >
      <div className="px-6 py-4 flex items-center gap-3" style={{ background: BRAND }}>
        <div className="w-8 h-8 rounded-xl flex items-center justify-center shrink-0"
          style={{ background: 'rgba(255,255,255,0.15)' }}>
          <Icon className="w-4 h-4 text-white" />
        </div>
        <div>
          <span className="text-xs font-bold uppercase tracking-widest"
            style={{ color: 'rgba(255,255,255,0.55)' }}>{num}</span>
          <h2 className="text-white font-black text-base leading-tight">{title}</h2>
        </div>
      </div>
      <div className="px-6 py-5 prose-custom" style={{ background: '#f0f5ff' }}>
        {children}
      </div>
    </motion.div>
  )
}

/* ── Contact Card ── */
function ContactCard({ icon: Icon, label, value, href }) {
  const inner = (
    <div className="flex items-start gap-3 bg-white rounded-xl p-4 border shadow-sm hover:shadow-md transition-shadow"
      style={{ borderColor: '#dce8ff' }}>
      <div className="w-8 h-8 rounded-lg flex items-center justify-center shrink-0 mt-0.5"
        style={{ background: '#e8efff' }}>
        <Icon className="w-4 h-4" style={{ color: BRAND }} />
      </div>
      <div>
        <p className="text-xs font-bold uppercase tracking-wider" style={{ color: BRAND }}>{label}</p>
        <p className="text-slate-700 font-semibold text-sm leading-snug mt-0.5">{value}</p>
      </div>
    </div>
  )
  return href ? <a href={href} className="block hover:no-underline">{inner}</a> : <div>{inner}</div>
}
