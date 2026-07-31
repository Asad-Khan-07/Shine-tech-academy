import { useState, useEffect, useRef } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Phone, Mail, MapPin, Send, CheckCircle, ChevronDown } from 'lucide-react'

const COURSES_LIST = [
  'AI Productivity',
  'Web Development',
  'Graphic Design',
  'Digital Marketing',
  'Video Editing',
  'Freelancing',
]

export default function Contact() {
  const [form, setForm] = useState({ name: '', phone: '', email: '', course: '', message: '' })
  const [sent, setSent] = useState(false)
  const [loading, setLoading] = useState(false)

  const handleChange = (e) => setForm({ ...form, [e.target.name]: e.target.value })

  const handleSubmit = (e) => {
    e.preventDefault()
    setLoading(true)
    setTimeout(() => {
      setLoading(false)
      setSent(true)
    }, 1200)
  }

  return (
    <section id="contact" className="py-16 sm:py-24 px-4 sm:px-6 lg:px-8 bg-slate-50/60 backdrop-blur-sm">
      <div className="max-w-7xl mx-auto">

        {/* Header */}
        <div className="text-center mb-14">
          <span className="section-tag mb-3 inline-block">Get In Touch</span>
          <h2 className="font-space font-extrabold text-3xl sm:text-4xl text-slate-900 mt-3">
            Contact Us
          </h2>
          <div className="w-12 h-1 bg-blue-600 mx-auto mt-4 rounded-full" />
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-5 gap-10 items-stretch">

          {/* Left: Info */}
          <motion.div
            initial={{ opacity: 0, x: -25 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="lg:col-span-2 flex flex-col gap-6"
          >
            <h3 className="font-space font-bold text-xl text-slate-900">Let's Connect</h3>
            <p className="text-slate-600 text-sm leading-relaxed">
             Have questions about admissions, courses, or career guidance? Our team is here to help. Contact us via WhatsApp, phone, email, or visit our campus—we'd love to assist you.
            </p>

            <div className="flex flex-col gap-4">
              {[
                {
                  icon: Phone,
                  label: 'WhatsApp',
                  value: '+92 300 1234567',
                  href: 'https://wa.me/923001234567',
                  color: 'bg-green-100 text-green-600',
                },
                {
                  icon: Mail,
                  label: 'Email',
                  value: 'info@shinetechacademy.com',
                  href: 'mailto:info@shinetechacademy.com',
                  color: 'bg-blue-100 text-blue-600',
                },
                {
                  icon: MapPin,
                  label: 'Campus Address',
                  value: 'Bungalow No. 306, Unit No. 9, Latifabad No. 9, Hyderabad, Sindh, Visit our campus for counseling & Admissions.',
                  href: '#',
                  color: 'bg-red-100 text-red-600',
                },
              ].map((item) => {
                const Icon = item.icon
                return (
                  <a
                    key={item.label}
                    href={item.href}
                    target={item.href.startsWith('http') ? '_blank' : '_self'}
                    rel="noopener noreferrer"
                    className="flex items-start gap-4 p-4 bg-white rounded-xl border border-slate-100 hover:border-blue-200 hover:shadow-sm transition-all group"
                  >
                    <div className={`w-10 h-10 rounded-lg ${item.color} flex items-center justify-center flex-shrink-0`}>
                      <Icon className="w-4 h-4" />
                    </div>
                    <div>
                      <p className="text-slate-500 text-xs font-semibold uppercase tracking-wide">{item.label}</p>
                      <p className="text-slate-900 font-semibold text-sm mt-0.5 group-hover:text-blue-600 transition-colors">{item.value}</p>
                    </div>
                  </a>
                )
              })}
            </div>

            {/* Google Map */}
            <div className="rounded-xl overflow-hidden border border-slate-200 shadow-sm aspect-video flex-1 min-h-[250px]">
              <iframe
                title="Shine Tech Academy Location"
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d108885.72539259773!2d73.02003884179686!3d33.72148!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x38dfbfd07891722f%3A0x6789f8d37f874c7!2sIslamabad%2C+Pakistan!5e0!3m2!1sen!2s!4v1234567890"
                width="100%"
                height="100%"
                style={{ border: 0 }}
                allowFullScreen=""
                loading="lazy"
              />
            </div>
          </motion.div>

          {/* Right: Form */}
          <motion.div
            initial={{ opacity: 0, x: 25 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="lg:col-span-3 h-full"
          >
            <div className="bg-white rounded-2xl border border-slate-100 shadow-sm p-5 sm:p-7 lg:p-8 h-full flex flex-col justify-between">
              {sent ? (
                <div className="flex flex-col items-center justify-center gap-4 py-16 text-center my-auto">
                  <CheckCircle className="w-16 h-16 text-green-500" />
                  <h3 className="font-space font-extrabold text-xl text-slate-900">Message Sent!</h3>
                  <p className="text-slate-500 text-sm">We'll get back to you on WhatsApp or Email within 24 hours.</p>
                  <button
                    onClick={() => { setSent(false); setForm({ name: '', phone: '', email: '', course: '', message: '' }) }}
                    className="text-blue-600 font-semibold text-sm mt-2 hover:underline"
                  >
                    Send another message
                  </button>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="flex flex-col gap-4 h-full justify-between">
                  <div>
                    <h3 className="font-space font-extrabold text-xl text-slate-900 mb-4">Send a Message</h3>

                    <div className="flex flex-col gap-4">
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                        <div className="flex flex-col gap-1.5">
                          <label className="text-slate-700 text-xs font-bold uppercase tracking-wide">Full Name *</label>
                          <input
                            type="text"
                            name="name"
                            value={form.name}
                            onChange={handleChange}
                            required
                            placeholder="Your full name"
                            className="w-full bg-slate-50 border border-slate-200 focus:border-blue-500 focus:ring-2 focus:ring-blue-100 outline-none transition-all rounded-xl px-4 py-3 text-sm text-slate-900 placeholder:text-slate-400"
                          />
                        </div>
                        <div className="flex flex-col gap-1.5">
                          <label className="text-slate-700 text-xs font-bold uppercase tracking-wide">Phone / WhatsApp *</label>
                          <input
                            type="tel"
                            name="phone"
                            value={form.phone}
                            onChange={handleChange}
                            required
                            placeholder="+92 300 0000000"
                            className="w-full bg-slate-50 border border-slate-200 focus:border-blue-500 focus:ring-2 focus:ring-blue-100 outline-none transition-all rounded-xl px-4 py-3 text-sm text-slate-900 placeholder:text-slate-400"
                          />
                        </div>
                      </div>

                      <div className="flex flex-col gap-1.5">
                        <label className="text-slate-700 text-xs font-bold uppercase tracking-wide">Email Address *</label>
                        <input
                          type="email"
                          name="email"
                          value={form.email}
                          onChange={handleChange}
                          required
                          placeholder="Your email address"
                          className="w-full bg-slate-50 border border-slate-200 focus:border-blue-500 focus:ring-2 focus:ring-blue-100 outline-none transition-all rounded-xl px-4 py-3 text-sm text-slate-900 placeholder:text-slate-400"
                        />
                      </div>

                      <div className="flex flex-col gap-1.5">
                        <label className="text-slate-700 text-xs font-bold uppercase tracking-wide">Interested Course</label>
                        <CustomDropdown
                          value={form.course}
                          onChange={(val) => setForm({ ...form, course: val })}
                          options={COURSES_LIST}
                          placeholder="Select a course..."
                        />
                      </div>

                      <div className="flex flex-col gap-1.5">
                        <label className="text-slate-700 text-xs font-bold uppercase tracking-wide">Message</label>
                        <textarea
                          name="message"
                          value={form.message}
                          onChange={handleChange}
                          rows={4}
                          placeholder="Any question or note..."
                          className="w-full bg-slate-50 border border-slate-200 focus:border-blue-500 focus:ring-2 focus:ring-blue-100 outline-none transition-all rounded-xl px-4 py-3 text-sm text-slate-900 placeholder:text-slate-400 resize-none"
                        />
                      </div>
                    </div>
                  </div>

                  <button
                    type="submit"
                    disabled={loading}
                    className="btn-primary py-3.5 rounded-xl text-sm font-bold flex items-center justify-center gap-2 mt-4 disabled:opacity-70 disabled:cursor-not-allowed w-full"
                  >
                    {loading ? (
                      <>
                        <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                        Sending...
                      </>
                    ) : (
                      <>
                        <Send className="w-4 h-4" /> Send Message
                      </>
                    )}
                  </button>
                </form>
              )}
            </div>
          </motion.div>

        </div>
      </div>
    </section>
  )
}

function CustomDropdown({ value, onChange, options, placeholder }) {
  const [isOpen, setIsOpen] = useState(false)
  const dropdownRef = useRef(null)

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsOpen(false)
      }
    }
    document.addEventListener('mousedown', handleClickOutside)
    return () => document.removeEventListener('mousedown', handleClickOutside)
  }, [])

  return (
    <div className="relative w-full" ref={dropdownRef}>
      <button
        type="button"
        onClick={() => setIsOpen(!isOpen)}
        className="w-full bg-slate-50 border border-slate-200 focus:border-blue-500 focus:ring-2 focus:ring-blue-100 outline-none transition-all rounded-xl px-4 py-3 text-sm text-slate-900 flex items-center justify-between cursor-pointer text-left"
      >
        <span className={value ? 'text-slate-900' : 'text-slate-400'}>
          {value || placeholder}
        </span>
        <ChevronDown className={`w-4 h-4 text-slate-500 transition-transform duration-200 ${isOpen ? 'rotate-180' : ''}`} />
      </button>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: -8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -8 }}
            transition={{ duration: 0.15 }}
            className="absolute z-[100] left-0 right-0 mt-2 bg-white border border-slate-150 rounded-2xl shadow-xl overflow-hidden"
          >
            <div className="max-h-60 overflow-y-auto overflow-x-hidden p-1.5 pr-2 flex flex-col gap-0.5 custom-scroll">
              {options.map((option) => {
                const isSelected = value === option
                return (
                  <button
                    key={option}
                    type="button"
                    onClick={() => {
                      onChange(option)
                      setIsOpen(false)
                    }}
                    className={`w-full text-left px-3.5 py-2.5 rounded-xl text-sm font-medium transition-all cursor-pointer ${
                      isSelected
                        ? 'bg-blue-600 text-white'
                        : 'text-slate-700 hover:bg-slate-50 hover:text-blue-600'
                    }`}
                  >
                    {option}
                  </button>
                )
              })}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}

