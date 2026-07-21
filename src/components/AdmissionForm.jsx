import { useState, useRef, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import {
  User, Calendar, Mail, Phone, MapPin, Home, GraduationCap, BookOpen,
  Award, Briefcase, Code, Smartphone, Palette, PenTool, Megaphone, DollarSign,
  Globe, CheckCircle, ArrowLeft, ArrowRight, Loader, Camera, FileText, CreditCard, Hash,
  Clock, Star, Target, ChevronDown
} from 'lucide-react'

const COURSES = [
  { id: 'web',      icon: Code,        title: 'Web Development',         desc: 'HTML, CSS, JS, React, Node.js & More' },
  { id: 'mobile',   icon: Smartphone,  title: 'Mobile App Development',  desc: 'Flutter, React Native, iOS & Android' },
  { id: 'uiux',     icon: Palette,     title: 'UI/UX Design',            desc: 'Figma, Adobe XD, User Research & Prototyping' },
  { id: 'graphic',  icon: PenTool,     title: 'Graphic Designing',       desc: 'Photoshop, Illustrator, CorelDRAW & Canva' },
  { id: 'marketing', icon: Megaphone,  title: 'Digital Marketing',        desc: 'SEO, Social Media, Google Ads & Analytics' },
  { id: 'freelance', icon: DollarSign, title: 'Freelancing & Entrepreneurship', desc: 'Fiverr, Upwork, Proposals & Client Mgmt' },
  { id: 'other',    icon: Star,        title: 'Other Course',            desc: 'Tell us what you want to learn' },
]

function generateAppId() {
  const prefix = 'STA'
  const date = new Date()
  const d = String(date.getDate()).padStart(2, '0')
  const m = String(date.getMonth() + 1).padStart(2, '0')
  const y = String(date.getFullYear()).slice(2)
  const rand = Math.floor(1000 + Math.random() * 9000)
  return `${prefix}-${d}${m}${y}-${rand}`
}

/* ─── Premium Custom Floating Input ────────────────────────── */
function FloatingInput({ label, icon: Icon, error, type = 'text', ...props }) {
  const [focused, setFocused] = useState(false)
  const hasValue = props.value && props.value.length > 0
  const float = focused || hasValue

  // Specific check to avoid overlapping on Date Input
  const isDate = type === 'date'

  return (
    <div className="relative">
      <div className="relative">
        {Icon && (
          <Icon
            className={`absolute left-3 w-4 h-4 text-slate-400 pointer-events-none transition-all duration-200 ${
              isDate || float ? 'top-3.5' : 'top-1/2 -translate-y-1/2'
            }`}
          />
        )}
        
        <input
          type={type}
          {...props}
          onFocus={(e) => { setFocused(true); props.onFocus?.(e) }}
          onBlur={(e) => { setFocused(false); props.onBlur?.(e) }}
          className={`w-full peer bg-white/70 border rounded-xl px-3 py-3.5 text-sm text-slate-900 outline-none transition-all duration-200 placeholder-transparent
            ${Icon ? 'pl-10' : 'pl-3'}
            ${isDate ? 'pt-5 pb-2' : ''}
            ${error ? 'border-red-400 focus:border-red-500 focus:ring-2 focus:ring-red-200' : 'border-slate-200 focus:border-blue-500 focus:ring-2 focus:ring-blue-100/50'}
          `}
          placeholder={label}
        />

        {/* Dynamic Label styling - For date inputs, it stays static at top */}
        <label
          className={`absolute pointer-events-none transition-all duration-200 text-xs select-none
            ${Icon ? 'left-10' : 'left-3'}
            ${isDate 
              ? 'top-1 text-[10px] text-blue-600 font-bold uppercase tracking-wider' 
              : float 
                ? '-top-2.5 text-[11px] bg-white px-1 text-blue-600 font-medium' 
                : 'top-3.5 text-slate-400'
            }
            ${error ? 'text-red-500' : ''}
          `}
        >
          {label}
        </label>
      </div>
      {error && <p className="text-red-500 text-[11px] mt-1 ml-1">{error}</p>}
    </div>
  )
}

/* ─── Premium Custom Dropdown Component ────────────────────── */
function CustomDropdown({ label, options, value, onChange, error }) {
  const [isOpen, setIsOpen] = useState(false)
  const dropdownRef = useRef(null)

  const selectedOption = options.find((opt) => opt.value === value)

  useEffect(() => {
    const handleOutsideClick = (e) => {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target)) {
        setIsOpen(false)
      }
    }
    document.addEventListener('mousedown', handleOutsideClick)
    return () => document.removeEventListener('mousedown', handleOutsideClick)
  }, [])

  return (
    <div className="relative flex flex-col gap-1.5" ref={dropdownRef}>
      <label className="text-xs text-slate-400 font-bold uppercase tracking-wider ml-1">{label}</label>
      
      <button
        type="button"
        onClick={() => setIsOpen(!isOpen)}
        className={`w-full flex items-center justify-between bg-white/70 border rounded-xl px-4 py-3.5 text-sm text-left transition-all duration-200 outline-none
          ${isOpen ? 'border-blue-500 ring-2 ring-blue-100/50' : 'border-slate-200 hover:border-slate-300'}
          ${error ? 'border-red-400' : ''}
        `}
      >
        <span className={selectedOption ? 'text-slate-900' : 'text-slate-400'}>
          {selectedOption ? selectedOption.label : 'Select an option'}
        </span>
        <ChevronDown className={`w-4 h-4 text-slate-400 transition-transform duration-300 ${isOpen ? 'rotate-180 text-blue-500' : ''}`} />
      </button>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 10 }}
            transition={{ duration: 0.15 }}
            className="absolute top-[105%] left-0 w-full bg-white border border-slate-100 rounded-xl shadow-xl z-[1001] overflow-hidden"
          >
            <div className="py-1">
              {options.map((opt) => (
                <button
                  key={opt.value}
                  type="button"
                  onClick={() => {
                    onChange(opt.value)
                    setIsOpen(false)
                  }}
                  className={`w-full text-left px-4 py-3 text-sm transition-colors
                    ${opt.value === value 
                      ? 'bg-blue-50 text-blue-700 font-semibold' 
                      : 'text-slate-700 hover:bg-slate-50'
                    }
                  `}
                >
                  {opt.label}
                </button>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
      {error && <p className="text-red-500 text-[11px] mt-0.5 ml-1">{error}</p>}
    </div>
  )
}

/* ─── Form Page Constellation Canvas ─────────────────────── */
function FormConstellation() {
  const canvasRef = useRef(null)

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return
    const ctx = canvas.getContext('2d')

    let particles = []
    let animId
    const mouse = { x: null, y: null, radius: 180 }

    const resize = () => {
      canvas.width = window.innerWidth
      canvas.height = window.innerHeight
    }
    resize()
    window.addEventListener('resize', resize)

    const handleMouseMove = (e) => {
      mouse.x = e.clientX
      mouse.y = e.clientY
    }
    const handleMouseLeave = () => {
      mouse.x = null
      mouse.y = null
    }

    window.addEventListener('mousemove', handleMouseMove)
    document.addEventListener('mouseleave', handleMouseLeave)

    const setupParticles = () => {
      particles = []
      const particleCount = 50
      for (let i = 0; i < particleCount; i++) {
        particles.push({
          x: Math.random() * canvas.width,
          y: Math.random() * canvas.height,
          r: Math.random() * 2 + 1.2,
          vx: (Math.random() - 0.5) * 0.35,
          vy: (Math.random() - 0.5) * 0.35,
          alpha: Math.random() * 0.6 + 0.25,
        })
      }
    }
    setupParticles()

    const draw = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height)
      const lineColor = '9, 86, 252'

      for (let i = 0; i < particles.length; i++) {
        const p1 = particles[i]
        for (let j = i + 1; j < particles.length; j++) {
          const p2 = particles[j]
          const dx = p1.x - p2.x
          const dy = p1.y - p2.y
          const dist = Math.sqrt(dx * dx + dy * dy)

          if (dist < 135) {
            const opacity = (1 - dist / 135) * 0.16
            ctx.beginPath()
            ctx.strokeStyle = `rgba(${lineColor}, ${opacity})`
            ctx.lineWidth = 0.9
            ctx.moveTo(p1.x, p1.y)
            ctx.lineTo(p2.x, p2.y)
            ctx.stroke()
          }
        }

        if (mouse.x !== null && mouse.y !== null) {
          const dxMouse = p1.x - mouse.x
          const dyMouse = p1.y - mouse.y
          const distMouse = Math.sqrt(dxMouse * dxMouse + dyMouse * dyMouse)

          if (distMouse < mouse.radius) {
            const opacity = (1 - distMouse / mouse.radius) * 0.3
            ctx.beginPath()
            ctx.strokeStyle = `rgba(${lineColor}, ${opacity})`
            ctx.lineWidth = 1.2
            ctx.moveTo(p1.x, p1.y)
            ctx.lineTo(mouse.x, mouse.y)
            ctx.stroke()
          }
        }
      }

      particles.forEach((p) => {
        ctx.beginPath()
        ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2)
        ctx.fillStyle = `rgba(${lineColor}, ${p.alpha})`
        ctx.fill()

        p.x += p.vx
        p.y += p.vy

        if (p.x < -10) p.x = canvas.width + 10
        if (p.x > canvas.width + 10) p.x = -10
        if (p.y < -10) p.y = canvas.height + 10
        if (p.y > canvas.height + 10) p.y = -10
      })

      animId = requestAnimationFrame(draw)
    }
    draw()

    return () => {
      cancelAnimationFrame(animId)
      window.removeEventListener('resize', resize)
      window.removeEventListener('mousemove', handleMouseMove)
      document.removeEventListener('mouseleave', handleMouseLeave)
    }
  }, [])

  return (
    <canvas
      ref={canvasRef}
      style={{
        position: 'fixed',
        inset: 0,
        width: '100vw',
        height: '100vh',
        zIndex: 999,
        pointerEvents: 'none',
      }}
    />
  )
}

function SuccessModal({ appId, onClose }) {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-sm"
    >
      <motion.div
        initial={{ scale: 0.9, y: 20 }}
        animate={{ scale: 1, y: 0 }}
        exit={{ scale: 0.9, y: 20 }}
        className="bg-white rounded-3xl shadow-2xl max-w-md w-full p-8 text-center border border-slate-100 relative z-[1000]"
      >
        <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6 text-green-600">
          <CheckCircle className="w-10 h-10" />
        </div>
        <h3 className="font-space font-extrabold text-slate-900 text-2xl mb-2">Application Submitted!</h3>
        <p className="text-slate-500 text-sm mb-6">
          Your admission request has been sent successfully. Please save your application ID for future references.
        </p>

        <div className="bg-slate-50 border border-slate-100 rounded-xl p-4 mb-6">
          <p className="text-[10px] text-slate-400 font-bold uppercase tracking-wider mb-1">Application Reference ID</p>
          <p className="font-space font-extrabold text-blue-600 text-lg tracking-wider">{appId}</p>
        </div>

        <button
          onClick={onClose}
          className="w-full btn-primary py-3 rounded-xl font-bold text-sm shadow-lg shadow-blue-500/25"
        >
          Return to Home
        </button>
      </motion.div>
    </motion.div>
  )
}

function StepIndicator({ current, total }) {
  const percent = (current / (total - 1)) * 100
  return (
    <div className="relative mb-10">
      <div className="h-1 bg-slate-200 rounded-full w-full">
        <div
          className="h-1 bg-gradient-to-r from-blue-600 to-blue-400 rounded-full transition-all duration-500"
          style={{ width: `${percent}%` }}
        />
      </div>
      <div className="absolute top-1/2 -translate-y-1/2 left-0 right-0 flex justify-between pointer-events-none">
        {Array.from({ length: total }).map((_, i) => (
          <div
            key={i}
            className={`w-6 h-6 rounded-full flex items-center justify-center text-[10px] font-bold transition-all duration-500 border-2
              ${i < current ? 'bg-blue-600 border-blue-600 text-white shadow-lg shadow-blue-500/20' : ''}
              ${i === current ? 'bg-white border-blue-600 text-blue-600 shadow-md ring-4 ring-blue-50' : ''}
              ${i > current ? 'bg-white border-slate-200 text-slate-400' : ''}
            `}
          >
            {i + 1}
          </div>
        ))}
      </div>
    </div>
  )
}

export default function AdmissionForm({ onBack }) {
  const [step, setStep] = useState(0)
  const [loading, setLoading] = useState(false)
  const [success, setSuccess] = useState(false)
  const [appId, setAppId] = useState('')

  const [form, setForm] = useState({
    fullName: '',
    dob: '',
    email: '',
    phone: '',
    address: '',
    city: '',
    qualification: '',
    institute: '',
    courses: [],
    customCourse: '',
    source: '',
    whatsappGroup: false,
    agreeTerms: false
  })

  const [errors, setErrors] = useState({})

  const validateStep = (s) => {
    let err = {}
    if (s === 0) {
      if (!form.fullName.trim()) err.fullName = 'Full Name is required'
      if (!form.dob) err.dob = 'Date of Birth is required'
      if (!form.email.trim()) err.email = 'Email address is required'
      else if (!/\S+@\S+\.\S+/.test(form.email)) err.email = 'Please enter a valid email'
      if (!form.phone.trim()) err.phone = 'Phone number is required'
      else if (form.phone.trim().length < 10) err.phone = 'Please enter a valid phone number'
    } else if (s === 1) {
      if (!form.qualification.trim()) err.qualification = 'Last qualification is required'
      if (!form.institute.trim()) err.institute = 'School/College/University name is required'
    } else if (s === 2) {
      if (form.courses.length === 0) err.courses = 'Please select at least one course'
      if (form.courses.includes('other') && !form.customCourse.trim()) {
        err.customCourse = 'Please specify the course name'
      }
    } else if (s === 3) {
      if (!form.source) err.source = 'Please select an option'
    }
    setErrors(err)
    return Object.keys(err).length === 0
  }

  const nextStep = () => {
    if (validateStep(step)) {
      setStep((prev) => prev + 1)
    }
  }

  const prevStep = () => {
    setStep((prev) => prev - 1)
  }

  const handleSelectCourse = (id) => {
    setForm((prev) => {
      const selected = prev.courses.includes(id)
      let newList = []
      if (selected) {
        newList = prev.courses.filter((c) => c !== id)
      } else {
        newList = [...prev.courses, id]
      }
      return { ...prev, courses: newList }
    })
  }

  const handleSubmit = () => {
    if (!form.agreeTerms) return
    setLoading(true)
    setTimeout(() => {
      const newId = generateAppId()
      setAppId(newId)
      setLoading(false)
      setSuccess(true)
    }, 1500)
  }

  const renderStep = () => {
    switch (step) {
      case 0:
        return (
          <motion.div
            key="step1"
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -20 }}
            className="flex flex-col gap-5"
          >
            <h3 className="font-space font-extrabold text-slate-800 text-lg">Personal Information</h3>
            <FloatingInput
              label="Full Name"
              icon={User}
              value={form.fullName}
              onChange={(e) => setForm({ ...form, fullName: e.target.value })}
              error={errors.fullName}
            />
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
              <FloatingInput
                label="Date of Birth"
                type="date"
                icon={Calendar}
                value={form.dob}
                onChange={(e) => setForm({ ...form, dob: e.target.value })}
                error={errors.dob}
              />
              <FloatingInput
                label="Active Email Address"
                type="email"
                icon={Mail}
                value={form.email}
                onChange={(e) => setForm({ ...form, email: e.target.value })}
                error={errors.email}
              />
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
              <FloatingInput
                label="Active Phone / WhatsApp"
                type="tel"
                icon={Phone}
                value={form.phone}
                onChange={(e) => setForm({ ...form, phone: e.target.value })}
                error={errors.phone}
              />
              <FloatingInput
                label="City / Town"
                icon={MapPin}
                value={form.city}
                onChange={(e) => setForm({ ...form, city: e.target.value })}
              />
            </div>
            <FloatingInput
              label="Complete Residential Address"
              icon={Home}
              value={form.address}
              onChange={(e) => setForm({ ...form, address: e.target.value })}
            />
          </motion.div>
        )
      case 1:
        return (
          <motion.div
            key="step2"
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -20 }}
            className="flex flex-col gap-5"
          >
            <h3 className="font-space font-extrabold text-slate-800 text-lg">Academic / Background Info</h3>
            <FloatingInput
              label="Last Qualification (e.g. Matric, Inter, BS, etc.)"
              icon={GraduationCap}
              value={form.qualification}
              onChange={(e) => setForm({ ...form, qualification: e.target.value })}
              error={errors.qualification}
            />
            <FloatingInput
              label="School / College / University Name"
              icon={BookOpen}
              value={form.institute}
              onChange={(e) => setForm({ ...form, institute: e.target.value })}
              error={errors.institute}
            />
          </motion.div>
        )
      case 2:
        return (
          <motion.div
            key="step3"
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -20 }}
            className="flex flex-col gap-5"
          >
            <div>
              <h3 className="font-space font-extrabold text-slate-800 text-lg">Select Program(s)</h3>
              <p className="text-xs text-slate-400 mt-1">You can select more than one course to register concurrently.</p>
            </div>

            <div className="flex flex-col gap-3">
              {COURSES.map((c) => {
                const Icon = c.icon
                const selected = form.courses.includes(c.id)
                return (
                  <button
                    key={c.id}
                    onClick={() => handleSelectCourse(c.id)}
                    className={`flex items-start gap-4 p-4 rounded-xl border text-left transition-all duration-200 group
                      ${selected ? 'border-blue-500 bg-blue-50/50 shadow-sm' : 'border-slate-100 bg-white hover:border-slate-200'}
                    `}
                  >
                    <div className={`w-10 h-10 rounded-xl flex items-center justify-center transition-colors flex-shrink-0
                      ${selected ? 'bg-blue-600 text-white' : 'bg-slate-100 text-slate-500 group-hover:bg-slate-200'}
                    `}>
                      <Icon className="w-5 h-5" />
                    </div>
                    <div>
                      <p className={`font-space font-bold text-sm ${selected ? 'text-blue-700' : 'text-slate-800'}`}>{c.title}</p>
                      <p className="text-slate-500 text-xs mt-0.5 leading-relaxed">{c.desc}</p>
                    </div>
                  </button>
                )
              })}
            </div>

            {form.courses.includes('other') && (
              <motion.div initial={{ opacity: 0, height: 0 }} animate={{ opacity: 1, height: 'auto' }} className="pt-2">
                <FloatingInput
                  label="Please specify the course name"
                  icon={Star}
                  value={form.customCourse}
                  onChange={(e) => setForm({ ...form, customCourse: e.target.value })}
                  error={errors.customCourse}
                />
              </motion.div>
            )}

            {errors.courses && <p className="text-red-500 text-[11px] ml-1">{errors.courses}</p>}
          </motion.div>
        )
      case 3:
        return (
          <motion.div
            key="step4"
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -20 }}
            className="flex flex-col gap-5"
          >
            <h3 className="font-space font-extrabold text-slate-800 text-lg">Additional Details</h3>

            <CustomDropdown
              label="How did you hear about us?"
              options={[
                { value: 'facebook', label: 'Facebook' },
                { value: 'instagram', label: 'Instagram' },
                { value: 'whatsapp', label: 'WhatsApp / Friend recommendation' },
                { value: 'banner', label: 'Banner / Poster' },
                { value: 'other', label: 'Other' }
              ]}
              value={form.source}
              onChange={(val) => setForm({ ...form, source: val })}
              error={errors.source}
            />

            <div className="flex items-center gap-3 bg-blue-50/50 border border-blue-100 rounded-xl p-4 mt-2">
              <input
                type="checkbox"
                id="whatsapp"
                checked={form.whatsappGroup}
                onChange={(e) => setForm({ ...form, whatsappGroup: e.target.checked })}
                className="w-4 h-4 text-blue-600 border-slate-300 rounded focus:ring-blue-500 accent-blue-600"
              />
              <label htmlFor="whatsapp" className="text-xs text-slate-600 leading-normal cursor-pointer select-none">
                Add me to Shine Tech Academy's official info WhatsApp group.
              </label>
            </div>
          </motion.div>
        )
      case 4:
        const selectedNames = form.courses.map((id) => COURSES.find((c) => c.id === id)?.title).join(', ')
        return (
          <motion.div
            key="step5"
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -20 }}
            className="flex flex-col gap-6"
          >
            <div>
              <h3 className="font-space font-extrabold text-slate-800 text-lg">Review Information</h3>
              <p className="text-xs text-slate-400 mt-1">Please double check your credentials before submitting.</p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {[
                { label: 'Full Name', value: form.fullName, icon: User },
                { label: 'Email Address', value: form.email, icon: Mail },
                { label: 'Phone / WhatsApp', value: form.phone, icon: Phone },
                { label: 'City', value: form.city || 'N/A', icon: MapPin },
                { label: 'Last Qualification', value: form.qualification, icon: GraduationCap },
                { label: 'School/College/Uni', value: form.institute, icon: BookOpen },
                { label: 'Selected Program(s)', value: selectedNames || form.customCourse, icon: Code },
              ].map((item) => {
                const Icon = item.icon
                return (
                  <div key={item.label} className="bg-slate-50/70 border border-slate-100 rounded-xl p-4 flex gap-3">
                    <Icon className="w-4 h-4 text-blue-500 mt-0.5 flex-shrink-0" />
                    <div>
                      <p className="text-[10px] text-slate-400 font-bold uppercase tracking-wider">{item.label}</p>
                      <p className="text-slate-800 font-semibold text-xs mt-0.5 leading-relaxed">{item.value}</p>
                    </div>
                  </div>
                )
              })}
            </div>

            <div className="flex items-start gap-3 mt-2">
              <input
                type="checkbox"
                id="terms"
                checked={form.agreeTerms}
                onChange={(e) => setForm({ ...form, agreeTerms: e.target.checked })}
                className="w-4.5 h-4.5 text-blue-600 border-slate-300 rounded focus:ring-blue-500 accent-blue-600 mt-0.5"
              />
              <label htmlFor="terms" className="text-xs text-slate-500 leading-relaxed cursor-pointer select-none">
                I hereby declare that all the information provided above is authentic. I agree to abide by Shine Tech Academy's terms & conditions.
              </label>
            </div>
          </motion.div>
        )
      default:
        return null
    }
  }

  const STEPS_LABELS = ['Personal Info', 'Academic', 'Courses', 'Additional', 'Review']

  return (
    <>
      {/* Dynamic Background on the Form Page */}
      <FormConstellation />

      <div className="min-h-screen bg-transparent relative z-10 flex flex-col">
        {/* Top bar (Glassmorphism layout) */}
        <div className="sticky top-0 z-50 bg-white/40 backdrop-blur-md border-b border-slate-100/50">
          <div className="max-w-3xl mx-auto px-4 py-3 flex items-center justify-between">
            <button onClick={onBack} className="flex items-center gap-1.5 text-slate-500 hover:text-slate-800 transition-colors text-sm font-medium self-center">
              <ArrowLeft className="w-4 h-4" /> Back
            </button>
            <div className="flex flex-col items-center gap-0 self-center">
              <img src="/SHINE-website-logo-.gif" alt="STA" className="h-8 w-auto" />
              <span className="font-space font-bold text-[10px] text-slate-800">Admission Form</span>
            </div>
            <div className="text-xs text-slate-400 font-medium self-center">{step + 1} / 5</div>
          </div>
        </div>

        <div className="max-w-3xl mx-auto px-4 py-10 w-full flex-1 flex flex-col justify-center relative z-20">
          {/* Progress */}
          <StepIndicator current={step} total={5} />
          <div className="flex justify-between mb-8">
            {STEPS_LABELS.map((l, i) => (
              <span key={l} className={`text-[11px] font-semibold uppercase tracking-wider transition-colors hidden sm:block ${i <= step ? 'text-blue-600' : 'text-slate-300'}`}>
                {l}
              </span>
            ))}
          </div>

          {/* Premium Glass Card Form */}
          <div className="bg-white/90 backdrop-blur-md rounded-3xl shadow-2xl border border-white/60 p-6 sm:p-10 hover:shadow-blue-500/5 transition-shadow duration-300">
            <AnimatePresence mode="wait">
              {renderStep()}
            </AnimatePresence>

            {/* Navigation */}
            <div className="flex items-center justify-between mt-8 pt-6 border-t border-slate-100">
              <button
                onClick={prevStep}
                disabled={step === 0}
                className="flex items-center gap-1.5 text-sm font-semibold text-slate-500 hover:text-slate-800 disabled:opacity-30 disabled:cursor-not-allowed transition-colors px-4 py-2"
              >
                <ArrowLeft className="w-4 h-4" /> Previous
              </button>
              {step < 4 ? (
                <button
                  onClick={nextStep}
                  className="flex items-center gap-1.5 bg-blue-600 text-white text-sm font-bold px-6 py-3 rounded-xl hover:bg-blue-700 transition-all shadow-lg shadow-blue-500/25 hover:-translate-y-0.5"
                >
                  Next <ArrowRight className="w-4 h-4" />
                </button>
              ) : (
                <button
                  onClick={handleSubmit}
                  disabled={!form.agreeTerms || loading}
                  className="flex items-center gap-2 bg-blue-600 text-white text-sm font-bold px-8 py-3 rounded-xl hover:bg-blue-700 transition-all shadow-lg shadow-blue-500/25 disabled:opacity-50 disabled:cursor-not-allowed hover:-translate-y-0.5"
                >
                  {loading ? <Loader className="w-4 h-4 animate-spin" /> : <CheckCircle className="w-4 h-4" />}
                  {loading ? 'Submitting...' : 'Submit Application'}
                </button>
              )}
            </div>
          </div>
        </div>
      </div>

      {success && <SuccessModal appId={appId} onClose={onBack} />}

      <style>{`
        input[type="date"]::-webkit-calendar-picker-indicator,
        input[type="number"]::-webkit-inner-spin-button {
          opacity: 0.5;
        }
      `}</style>
    </>
  )
}
