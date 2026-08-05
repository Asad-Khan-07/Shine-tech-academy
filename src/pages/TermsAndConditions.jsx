import { useEffect, useState } from 'react'
import { motion } from 'framer-motion'
import {
  Shield, FileText, Users, CreditCard, Clock, Star,
  Award, Briefcase, Lock, Globe, AlertTriangle, RefreshCw,
  Scale, Mail, Phone, MapPin, Home, ArrowLeft, ArrowUp
} from 'lucide-react'

const BRAND = '#0956fc'

const SECTIONS = [
  { id: 'acceptance',   icon: Shield,        title: 'Acceptance of Terms',      num: '01' },
  { id: 'admissions',   icon: FileText,      title: 'Admissions',               num: '02' },
  { id: 'course-info',  icon: Star,          title: 'Course Information',       num: '03' },
  { id: 'fees',         icon: CreditCard,    title: 'Fees & Payments',          num: '04' },
  { id: 'attendance',   icon: Clock,         title: 'Attendance',               num: '05' },
  { id: 'conduct',      icon: Users,         title: 'Student Conduct',          num: '06' },
  { id: 'certificates', icon: Award,         title: 'Certificates',             num: '07' },
  { id: 'internship',   icon: Briefcase,     title: 'Internship & Career',      num: '08' },
  { id: 'ip',           icon: Lock,          title: 'Intellectual Property',    num: '09' },
  { id: 'website',      icon: Globe,         title: 'Website Usage',            num: '10' },
  { id: 'liability',    icon: AlertTriangle, title: 'Limitation of Liability',  num: '11' },
  { id: 'changes',      icon: RefreshCw,     title: 'Changes to Terms',         num: '12' },
  { id: 'law',          icon: Scale,         title: 'Governing Law',            num: '13' },
  { id: 'contact',      icon: Mail,          title: 'Contact Information',      num: '14' },
]

function scrollToSection(id) {
  const el = document.getElementById(id)
  if (el) el.scrollIntoView({ behavior: 'smooth', block: 'start' })
}

export default function TermsAndConditions({ onBack }) {
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
    <div className="min-h-screen bg-white text-slate-900 font-space">

      {/* ── Hero Banner ─────────────────────────── */}
      <div
        className="relative overflow-hidden text-white"
        style={{ background: '#0956fc' }}
      >
        {/* Decorative blobs */}
        <div className="absolute -top-24 -right-24 w-96 h-96 rounded-full blur-3xl pointer-events-none"
          style={{ background: 'rgba(9,86,252,0.25)' }} />
        <div className="absolute -bottom-16 -left-16 w-72 h-72 rounded-full blur-3xl pointer-events-none"
          style={{ background: 'rgba(255,255,255,0.07)' }} />

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
            <span className="inline-flex items-center gap-2 border border-white/20 text-white/80 text-xs font-bold px-4 py-1.5 rounded-full uppercase tracking-widest backdrop-blur-sm"
              style={{ background: 'rgba(255,255,255,0.1)' }}>
              <Shield className="w-3.5 h-3.5" /> Legal Document
            </span>

            <div>
              <h1 className="text-4xl sm:text-5xl lg:text-6xl font-black leading-tight tracking-tight">
                Terms &amp;
                <span className="block text-white">
                  Conditions
                </span>
              </h1>
              <p className="mt-4 text-white text-base sm:text-lg max-w-2xl leading-relaxed opacity-90">
                By accessing our website or enrolling in our courses, you agree to the following Terms &amp; Conditions.
              </p>
            </div>

            {/* Meta pills */}
            <div className="flex flex-wrap gap-3 mt-2 text-sm">
              <div className="flex items-center gap-1.5 rounded-lg px-3 py-1.5 text-white border border-white/30"
                style={{ background: 'rgba(255,255,255,0.15)' }}>
                <Clock className="w-3.5 h-3.5" />
                <span>Effective: <strong className="text-white">July 31, 2026</strong></span>
              </div>
              <div className="flex items-center gap-1.5 rounded-lg px-3 py-1.5 text-white border border-white/30"
                style={{ background: 'rgba(255,255,255,0.15)' }}>
                <FileText className="w-3.5 h-3.5" />
                <span><strong className="text-white">14</strong> Sections</span>
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
                        className="flex items-center gap-3 w-full text-left px-3 py-2.5 rounded-xl text-sm transition-all duration-200 group"
                        style={
                          isActive
                            ? { background: BRAND, color: '#fff', boxShadow: `0 4px 14px ${BRAND}40` }
                            : {}
                        }
                      >
                        <span
                          className="text-xs font-black tabular-nums w-5 shrink-0"
                          style={{ color: isActive ? 'rgba(255,255,255,0.6)' : '#94a3b8' }}
                        >{num}</span>
                        <Icon
                          className="w-3.5 h-3.5 shrink-0"
                          style={{ color: isActive ? '#fff' : '#94a3b8' }}
                        />
                        <span
                          className="font-semibold truncate"
                          style={{ color: isActive ? '#fff' : '#475569' }}
                        >{title}</span>
                      </button>
                    )
                  })}
                </nav>
              </div>

              <button
                onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
                className="mt-4 w-full flex items-center justify-center gap-2 py-2.5 rounded-xl border border-slate-200 text-slate-500 text-sm font-semibold transition-all hover:border-[#0956fc] hover:text-[#0956fc]"
              >
                <ArrowUp className="w-3.5 h-3.5" /> Back to Top
              </button>
            </div>
          </aside>

          {/* ── Sections ── */}
          <main className="flex-1 min-w-0 flex flex-col gap-6">

            <Section id="acceptance" num="01" icon={Shield} title="Acceptance of Terms">
              <p>By using our website or services, you agree to comply with these Terms &amp; Conditions.</p>
            </Section>

            <Section id="admissions" num="02" icon={FileText} title="Admissions">
              <ul>
                <li>Admission is subject to eligibility, seat availability, and successful completion of the registration process.</li>
                <li>Shine Tech Academy reserves the right to accept or reject any application where necessary.</li>
              </ul>
            </Section>

            <Section id="course-info" num="03" icon={Star} title="Course Information">
              <p>Course content, schedules, instructors, and durations may be updated or revised to maintain educational quality.</p>
            </Section>

            <Section id="fees" num="04" icon={CreditCard} title="Fees & Payments">
              <ul>
                <li>Fees must be paid according to the selected payment plan.</li>
                <li>Registration fees (if applicable) are non-refundable unless otherwise stated.</li>
                <li>Late payments may affect access to classes or academy services.</li>
              </ul>
            </Section>

            <Section id="attendance" num="05" icon={Clock} title="Attendance">
              <ul>
                <li>Students are expected to attend classes regularly.</li>
                <li>Missed classes are the student's responsibility unless alternative arrangements are announced by the academy.</li>
              </ul>
            </Section>

            <Section id="conduct" num="06" icon={Users} title="Student Conduct">
              <ul>
                <li>Students are expected to maintain respectful behavior toward instructors, staff, and fellow students.</li>
                <li>Harassment, discrimination, abusive language, or disruptive behavior may result in disciplinary action.</li>
              </ul>
            </Section>

            <Section id="certificates" num="07" icon={Award} title="Certificates">
              <p>Certificates are awarded only to students who successfully complete the required coursework, assessments, and attendance requirements.</p>
            </Section>

            <Section id="internship" num="08" icon={Briefcase} title="Internship & Career Support">
              <ul>
                <li>Shine Tech Academy provides career guidance, portfolio development, interview preparation, and internship assistance.</li>
                <li>Internships, freelance work, or employment opportunities are not guaranteed and depend on student performance, market demand, and partner availability.</li>
              </ul>
            </Section>

            <Section id="ip" num="09" icon={Lock} title="Intellectual Property">
              <p>All course materials, videos, presentations, website content, branding, and academy resources are the intellectual property of Shine Tech Academy and may not be copied, distributed, or reproduced without written permission.</p>
            </Section>

            <Section id="website" num="10" icon={Globe} title="Website Usage">
              <p>Users agree not to misuse the website, submit false information, attempt unauthorized access, or interfere with website functionality.</p>
            </Section>

            {/* Liability — same brand color */}
            <motion.div
              id="liability"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
              className="rounded-2xl overflow-hidden"
              style={{ border: '1px solid #dce8ff' }}
            >
              <div
                className="px-6 py-4 flex items-center gap-3"
                style={{ background: BRAND }}
              >
                <div className="w-8 h-8 rounded-xl flex items-center justify-center shrink-0"
                  style={{ background: 'rgba(255,255,255,0.15)' }}>
                  <AlertTriangle className="w-4 h-4 text-white" />
                </div>
                <div>
                  <span className="text-xs font-bold uppercase tracking-widest" style={{ color: 'rgba(255,255,255,0.55)' }}>11</span>
                  <h2 className="text-white font-black text-base leading-tight">Limitation of Liability</h2>
                </div>
              </div>
              <div className="px-6 py-5 prose-custom" style={{ background: '#f0f5ff' }}>
                <p>Shine Tech Academy shall not be liable for any indirect, incidental, or consequential damages arising from the use of our website or educational services.</p>
              </div>
            </motion.div>

            <Section id="changes" num="12" icon={RefreshCw} title="Changes to Terms">
              <p>Shine Tech Academy reserves the right to modify these Terms &amp; Conditions at any time. Updated versions will be published on this page.</p>
            </Section>

            <Section id="law" num="13" icon={Scale} title="Governing Law">
              <p>These Terms &amp; Conditions shall be governed by the laws of the Islamic Republic of Pakistan.</p>
            </Section>

            {/* Contact section */}
            <motion.div
              id="contact"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
              className="rounded-2xl overflow-hidden border"
              style={{ borderColor: '#c7d9ff' }}
            >
              <div
                className="px-6 py-5 flex items-center gap-3"
                style={{ background: BRAND }}
              >
                <div className="w-9 h-9 bg-white/15 rounded-xl flex items-center justify-center">
                  <Mail className="w-4 h-4 text-white" />
                </div>
                <div>
                  <span className="text-white/50 text-xs font-bold uppercase tracking-widest">14</span>
                  <h2 className="text-white font-black text-lg leading-tight">Contact Information</h2>
                </div>
              </div>
              <div className="px-6 py-6" style={{ background: '#f0f5ff' }}>
                <p className="text-slate-500 mb-6 text-sm">
                  For any questions regarding these Terms &amp; Conditions, please contact us:
                </p>
                <div className="grid sm:grid-cols-2 gap-4">
                  <ContactCard icon={Globe}  label="Academy" value="Shine Tech Academy" />
                  <ContactCard icon={Mail}   label="Email"   value="info@shinetechacademy.com" href="mailto:info@shinetechacademy.com" />
                  <ContactCard icon={Phone}  label="Phone"   value="+92 335 1866930" href="https://wa.me/923351866930" />
                  <ContactCard icon={MapPin} label="Address" value="Bungalow No. 306, Unit No. 9, Latifabad, Hyderabad" />
                </div>
              </div>
            </motion.div>

            {/* Footer row */}
            <div
              className="mt-4 p-5 rounded-2xl flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 border"
              style={{ background: '#f8faff', borderColor: '#dce8ff' }}
            >
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
      {/* Header */}
      <div
        className="px-6 py-4 flex items-center gap-3"
        style={{ background: BRAND }}
      >
        <div className="w-8 h-8 rounded-xl flex items-center justify-center shrink-0"
          style={{ background: 'rgba(255,255,255,0.15)' }}>
          <Icon className="w-4 h-4 text-white" />
        </div>
        <div>
          <span className="text-xs font-bold uppercase tracking-widest" style={{ color: 'rgba(255,255,255,0.55)' }}>{num}</span>
          <h2 className="text-white font-black text-base leading-tight">{title}</h2>
        </div>
      </div>

      {/* Body */}
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
        <p className="text-xs font-bold uppercase tracking-wider" style={{ color: BRAND }}>
          {label}
        </p>
        <p className="text-slate-700 font-semibold text-sm leading-snug mt-0.5">{value}</p>
      </div>
    </div>
  )
  return href ? <a href={href} className="block hover:no-underline">{inner}</a> : <div>{inner}</div>
}