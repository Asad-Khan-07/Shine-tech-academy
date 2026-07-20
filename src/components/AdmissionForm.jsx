import { useState, useRef, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import {
  User, Calendar, Mail, Phone, MapPin, Home, GraduationCap, BookOpen,
  Award, Briefcase, Code, Smartphone, Palette, PenTool, Megaphone, DollarSign,
  Globe, CheckCircle, ArrowLeft, ArrowRight, Loader, Camera, FileText, CreditCard, Hash,
  Clock, Star, Target
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

function FloatingInput({ label, icon: Icon, error, ...props }) {
  const [focused, setFocused] = useState(false)
  const hasValue = props.value && props.value.length > 0
  const float = focused || hasValue
  return (
    <div className="relative">
      <div className="relative">
        {Icon && <Icon className={`absolute left-3 w-4 h-4 text-slate-400 pointer-events-none transition-all duration-200 ${float ? 'top-3' : 'top-1/2 -translate-y-1/2'}`} />}
        <input
          {...props}
          onFocus={(e) => { setFocused(true); props.onFocus?.(e) }}
          onBlur={(e) => { setFocused(false); props.onBlur?.(e) }}
          className={`w-full peer bg-slate-50 border rounded-xl px-3 py-3.5 text-sm text-slate-900 outline-none transition-all duration-200 placeholder-transparent
            ${Icon ? 'pl-10' : 'pl-3'}
            ${error ? 'border-red-400 focus:border-red-500 focus:ring-2 focus:ring-red-200' : 'border-slate-200 focus:border-blue-500 focus:ring-2 focus:ring-blue-100'}
          `}
          placeholder={label}
        />
        <label className={`absolute pointer-events-none transition-all duration-200 text-xs
          ${Icon ? 'left-10' : 'left-3'}
          ${float ? '-top-2.5 text-[11px] bg-white px-1 text-blue-600' : 'top-3.5 text-slate-400'}
          ${error ? 'text-red-500' : ''}
        `}>
          {label}
        </label>
      </div>
      {error && <p className="text-red-500 text-[11px] mt-1 ml-1">{error}</p>}
    </div>
  )
}

function PlainInput({ label, icon: Icon, error, ...props }) {
  return (
    <div>
      <label className="text-xs font-semibold text-slate-500 mb-1.5 block">{label}</label>
      <div className="relative">
        {Icon && <Icon className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400 pointer-events-none" />}
        <input
          {...props}
          className={`w-full bg-slate-50 border rounded-xl px-3 py-3.5 text-sm text-slate-900 outline-none transition-all duration-200
            ${Icon ? 'pl-10' : 'pl-3'}
            ${error ? 'border-red-400 focus:border-red-500 focus:ring-2 focus:ring-red-200' : 'border-slate-200 focus:border-blue-500 focus:ring-2 focus:ring-blue-100'}
          `}
        />
      </div>
      {error && <p className="text-red-500 text-[11px] mt-1 ml-1">{error}</p>}
    </div>
  )
}

function PlainSelect({ label, icon: Icon, error, children, ...props }) {
  return (
    <div>
      <label className="text-xs font-semibold text-slate-500 mb-1.5 block">{label}</label>
      <div className="relative">
        {Icon && <Icon className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400 pointer-events-none z-10" />}
        <select
          {...props}
          className={`w-full bg-slate-50 border rounded-xl px-3 py-3.5 text-sm text-slate-900 outline-none transition-all duration-200 appearance-none
            ${Icon ? 'pl-10' : 'pl-3'}
            ${error ? 'border-red-400 focus:border-red-500' : 'border-slate-200 focus:border-blue-500 focus:ring-2 focus:ring-blue-100'}
          `}
        >
          <option value="" disabled>{label}</option>
          {children}
        </select>
      </div>
      {error && <p className="text-red-500 text-[11px] mt-1 ml-1">{error}</p>}
    </div>
  )
}

function IconInput({ icon: Icon, error, ...props }) {
  return (
    <div className="relative">
      {Icon && <Icon className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400 pointer-events-none" />}
      <input
        {...props}
        className={`w-full bg-slate-50 border rounded-xl px-3 py-3.5 text-sm text-slate-900 outline-none transition-all duration-200
          ${Icon ? 'pl-10' : 'pl-3'}
          ${error ? 'border-red-400 focus:border-red-500 focus:ring-2 focus:ring-red-200' : 'border-slate-200 focus:border-blue-500 focus:ring-2 focus:ring-blue-100'}
        `}
      />
      {error && <p className="text-red-500 text-[11px] mt-1 ml-1">{error}</p>}
    </div>
  )
}

function IconSelect({ icon: Icon, error, children, ...props }) {
  return (
    <div className="relative">
      {Icon && <Icon className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400 pointer-events-none z-10" />}
      <select
        {...props}
        className={`w-full bg-slate-50 border rounded-xl px-3 py-3.5 text-sm text-slate-900 outline-none transition-all duration-200 appearance-none
          ${Icon ? 'pl-10' : 'pl-3'}
          ${error ? 'border-red-400 focus:border-red-500' : 'border-slate-200 focus:border-blue-500 focus:ring-2 focus:ring-blue-100'}
        `}
      >
        {children}
      </select>
      {error && <p className="text-red-500 text-[11px] mt-1 ml-1">{error}</p>}
    </div>
  )
}

function StepIndicator({ current, total }) {
  return (
    <div className="flex items-center gap-2 mb-8">
      {Array.from({ length: total }).map((_, i) => (
        <div key={i} className="flex items-center gap-2 flex-1">
          <div className={`flex items-center justify-center w-8 h-8 rounded-full text-xs font-bold transition-all duration-300
            ${i < current ? 'bg-blue-600 text-white shadow-md shadow-blue-200' : i === current ? 'bg-blue-600 text-white ring-4 ring-blue-100' : 'bg-slate-100 text-slate-400'}
          `}>
            {i < current ? <CheckCircle className="w-4 h-4" /> : i + 1}
          </div>
          {i < total - 1 && (
            <div className={`flex-1 h-0.5 rounded transition-all duration-300 ${i < current ? 'bg-blue-600' : 'bg-slate-200'}`} />
          )}
        </div>
      ))}
    </div>
  )
}

function SuccessModal({ appId, onClose }) {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="fixed inset-0 z-[200] flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm"
      onClick={onClose}
    >
      <motion.div
        initial={{ scale: 0.8, opacity: 0, y: 30 }}
        animate={{ scale: 1, opacity: 1, y: 0 }}
        transition={{ type: 'spring', damping: 25, stiffness: 300 }}
        onClick={(e) => e.stopPropagation()}
        className="bg-white rounded-3xl shadow-2xl max-w-md w-full p-8 text-center"
      >
        <div className="w-20 h-20 rounded-full bg-green-100 flex items-center justify-center mx-auto mb-5">
          <CheckCircle className="w-10 h-10 text-green-600" />
        </div>
        <h2 className="font-space font-extrabold text-2xl text-slate-900 mb-2">Application Submitted!</h2>
        <p className="text-slate-500 text-sm mb-6">Your application has been received successfully.</p>
        <div className="bg-slate-50 rounded-xl p-4 mb-6">
          <p className="text-xs text-slate-400 uppercase tracking-widest mb-1">Application ID</p>
          <p className="font-space font-bold text-xl text-blue-600">{appId}</p>
        </div>
        <p className="text-slate-400 text-xs mb-6">We will contact you within 24-48 hours for the next steps.</p>
        <button
          onClick={onClose}
          className="w-full bg-blue-600 text-white font-bold text-sm py-3.5 rounded-xl hover:bg-blue-700 transition-all"
        >
          Back to Home
        </button>
      </motion.div>
    </motion.div>
  )
}

export default function AdmissionForm({ onBack }) {
  const [step, setStep] = useState(0)
  const [loading, setLoading] = useState(false)
  const [success, setSuccess] = useState(false)
  const [appId, setAppId] = useState('')
  const [photoPreview, setPhotoPreview] = useState(null)
  const [signData, setSignData] = useState(null)
  const canvasRef = useRef(null)
  const [isDrawing, setIsDrawing] = useState(false)

  const [form, setForm] = useState({
    fullName: '', fatherName: '', dob: '', gender: '', cnic: '',
    email: '', phone: '', city: '', address: '',
    qualification: '', institute: '', field: '', passingYear: '',
    cgpa: '', experience: '', experienceDetails: '',
    courses: [],
    source: '', goal: '', batch: '', paymentMethod: '',
    transactionId: '', amount: '', paymentDate: '',
    agreeTerms: false,
  })

  const [errors, setErrors] = useState({})

  const update = (field, value) => {
    setForm(prev => ({ ...prev, [field]: value }))
    setErrors(prev => ({ ...prev, [field]: '' }))
  }

  const toggleCourse = (id) => {
    setForm(prev => ({
      ...prev,
      courses: prev.courses.includes(id) ? prev.courses.filter(c => c !== id) : [...prev.courses, id],
    }))
  }

  const handlePhoto = (e) => {
    const file = e.target.files[0]
    if (file) {
      const reader = new FileReader()
      reader.onload = (ev) => setPhotoPreview(ev.target.result)
      reader.readAsDataURL(file)
    }
  }

  const startDrawing = (e) => {
    const canvas = canvasRef.current
    const rect = canvas.getBoundingClientRect()
    const ctx = canvas.getContext('2d')
    setIsDrawing(true)
    const x = (e.clientX || e.touches[0].clientX) - rect.left
    const y = (e.clientY || e.touches[0].clientY) - rect.top
    ctx.beginPath()
    ctx.moveTo(x, y)
  }

  const draw = (e) => {
    if (!isDrawing) return
    const canvas = canvasRef.current
    const rect = canvas.getBoundingClientRect()
    const ctx = canvas.getContext('2d')
    const x = (e.clientX || e.touches[0].clientX) - rect.left
    const y = (e.clientY || e.touches[0].clientY) - rect.top
    ctx.lineWidth = 2
    ctx.lineCap = 'round'
    ctx.strokeStyle = '#1e293b'
    ctx.lineTo(x, y)
    ctx.stroke()
  }

  const stopDrawing = () => {
    setIsDrawing(false)
    const canvas = canvasRef.current
    setSignData(canvas.toDataURL())
  }

  const clearSignature = () => {
    const canvas = canvasRef.current
    const ctx = canvas.getContext('2d')
    ctx.clearRect(0, 0, canvas.width, canvas.height)
    setSignData(null)
  }

  const validateStep = (s) => {
    const errs = {}
    if (s === 0) {
      if (!form.fullName) errs.fullName = 'Required'
      if (!form.fatherName) errs.fatherName = 'Required'
      if (!form.dob) errs.dob = 'Required'
      if (!form.gender) errs.gender = 'Required'
      if (!form.cnic) errs.cnic = 'Required'
      if (!form.email) errs.email = 'Required'
      if (!form.phone) errs.phone = 'Required'
      if (!form.city) errs.city = 'Required'
      if (!form.address) errs.address = 'Required'
    } else if (s === 1) {
      if (!form.qualification) errs.qualification = 'Required'
      if (!form.institute) errs.institute = 'Required'
      if (!form.field) errs.field = 'Required'
      if (!form.passingYear) errs.passingYear = 'Required'
    } else if (s === 2) {
      if (form.courses.length === 0) errs.courses = 'Select at least one course'
    } else if (s === 3) {
      if (!form.source) errs.source = 'Required'
      if (!form.goal) errs.goal = 'Required'
      if (!form.batch) errs.batch = 'Required'
      if (!form.paymentMethod) errs.paymentMethod = 'Required'
      if (!form.transactionId) errs.transactionId = 'Required'
      if (!form.amount) errs.amount = 'Required'
      if (!form.paymentDate) errs.paymentDate = 'Required'
    }
    return errs
  }

  const nextStep = () => {
    const errs = validateStep(step)
    if (Object.keys(errs).length > 0) {
      setErrors(errs)
      return
    }
    setErrors({})
    setStep(prev => Math.min(prev + 1, 4))
  }

  const prevStep = () => setStep(prev => Math.max(prev - 1, 0))

  const handleSubmit = async () => {
    setLoading(true)
    await new Promise(r => setTimeout(r, 2000))
    setLoading(false)
    setAppId(generateAppId())
    setSuccess(true)
  }

  useEffect(() => {
    if (canvasRef.current) {
      const canvas = canvasRef.current
      canvas.width = canvas.offsetWidth
      canvas.height = canvas.offsetHeight
    }
  }, [step])

  const renderStep = () => {
    switch (step) {
      case 0:
        return (
          <motion.div key="step0" initial={{ opacity: 0, x: 40 }} animate={{ opacity: 1, x: 0 }} className="space-y-5">
            <div className="text-center mb-6">
              <h3 className="font-space font-extrabold text-xl text-slate-900">Personal Information</h3>
              <p className="text-slate-400 text-sm">Tell us about yourself</p>
            </div>

            {/* Photo Upload */}
            <div className="flex flex-col items-center gap-3 mb-4">
              <div className="relative w-24 h-24 rounded-full overflow-hidden bg-slate-100 border-2 border-dashed border-slate-300 flex items-center justify-center group cursor-pointer hover:border-blue-400 transition-all">
                {photoPreview ? (
                  <img src={photoPreview} alt="Preview" className="w-full h-full object-cover" />
                ) : (
                  <Camera className="w-6 h-6 text-slate-400 group-hover:text-blue-500 transition-colors" />
                )}
                <input type="file" accept="image/*" onChange={handlePhoto} className="absolute inset-0 opacity-0 cursor-pointer" />
              </div>
              <p className="text-[11px] text-slate-400">Upload Profile Photo</p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <FloatingInput icon={User} label="Full Name" value={form.fullName} onChange={e => update('fullName', e.target.value)} error={errors.fullName} />
              <FloatingInput icon={User} label="Father/Guardian Name" value={form.fatherName} onChange={e => update('fatherName', e.target.value)} error={errors.fatherName} />
              <PlainInput icon={Calendar} label="Date of Birth" type="date" value={form.dob} onChange={e => update('dob', e.target.value)} error={errors.dob} />
              <PlainSelect icon={User} label="Gender" value={form.gender} onChange={e => update('gender', e.target.value)} error={errors.gender}>
                <option value="male">Male</option>
                <option value="female">Female</option>
                <option value="other">Other</option>
              </PlainSelect>
              <FloatingInput icon={FileText} label="CNIC (without dashes)" value={form.cnic} onChange={e => update('cnic', e.target.value)} error={errors.cnic} />
              <FloatingInput icon={Mail} label="Email Address" type="email" value={form.email} onChange={e => update('email', e.target.value)} error={errors.email} />
              <FloatingInput icon={Phone} label="Phone Number" type="tel" value={form.phone} onChange={e => update('phone', e.target.value)} error={errors.phone} />
              <FloatingInput icon={MapPin} label="Current City" value={form.city} onChange={e => update('city', e.target.value)} error={errors.city} />
            </div>
            <FloatingInput icon={Home} label="Complete Address" value={form.address} onChange={e => update('address', e.target.value)} error={errors.address} />
          </motion.div>
        )
      case 1:
        return (
          <motion.div key="step1" initial={{ opacity: 0, x: 40 }} animate={{ opacity: 1, x: 0 }} className="space-y-5">
            <div className="text-center mb-6">
              <h3 className="font-space font-extrabold text-xl text-slate-900">Academic Information</h3>
              <p className="text-slate-400 text-sm">Your educational background</p>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <IconSelect icon={GraduationCap} value={form.qualification} onChange={e => update('qualification', e.target.value)} error={errors.qualification}>
                <option value="" disabled>Highest Qualification</option>
                <option value="matric">Matric / O-Levels</option>
                <option value="intermediate">Intermediate / A-Levels</option>
                <option value="bachelor">Bachelor's Degree</option>
                <option value="master">Master's Degree</option>
                <option value="other">Other</option>
              </IconSelect>
              <IconInput icon={BookOpen} placeholder="Institute/University" value={form.institute} onChange={e => update('institute', e.target.value)} error={errors.institute} />
              <FloatingInput icon={Award} label="Field of Study" value={form.field} onChange={e => update('field', e.target.value)} error={errors.field} />
              <FloatingInput icon={Calendar} label="Passing Year" type="number" value={form.passingYear} onChange={e => update('passingYear', e.target.value)} error={errors.passingYear} />
              <FloatingInput icon={Star} label="CGPA / Percentage (optional)" value={form.cgpa} onChange={e => update('cgpa', e.target.value)} />
            </div>
            <div className="space-y-3">
              <PlainSelect icon={Briefcase} label="Previous Experience" value={form.experience} onChange={e => update('experience', e.target.value)}>
                <option value="no">No</option>
                <option value="yes">Yes</option>
              </PlainSelect>
              {form.experience === 'yes' && (
                <motion.div initial={{ opacity: 0, height: 0 }} animate={{ opacity: 1, height: 'auto' }}>
                  <FloatingInput icon={Briefcase} label="Experience Details" value={form.experienceDetails} onChange={e => update('experienceDetails', e.target.value)} />
                </motion.div>
              )}
            </div>
          </motion.div>
        )
      case 2:
        return (
          <motion.div key="step2" initial={{ opacity: 0, x: 40 }} animate={{ opacity: 1, x: 0 }} className="space-y-5">
            <div className="text-center mb-6">
              <h3 className="font-space font-extrabold text-xl text-slate-900">Course Selection</h3>
              <p className="text-slate-400 text-sm">Choose your program</p>
            </div>
            {errors.courses && <p className="text-red-500 text-xs text-center">{errors.courses}</p>}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              {COURSES.map((c) => {
                const Icon = c.icon
                const selected = form.courses.includes(c.id)
                return (
                  <button
                    key={c.id}
                    type="button"
                    onClick={() => toggleCourse(c.id)}
                    className={`flex items-start gap-3 p-4 rounded-xl border-2 text-left transition-all duration-200
                      ${selected ? 'border-blue-500 bg-blue-50 shadow-sm' : 'border-slate-200 bg-white hover:border-slate-300'}
                    `}
                  >
                    <div className={`w-10 h-10 rounded-lg flex items-center justify-center flex-shrink-0 transition-all
                      ${selected ? 'bg-blue-600 text-white' : 'bg-slate-100 text-slate-500'}
                    `}>
                      <Icon className="w-5 h-5" />
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className={`font-bold text-sm ${selected ? 'text-blue-700' : 'text-slate-800'}`}>{c.title}</p>
                      <p className="text-xs text-slate-400 mt-0.5">{c.desc}</p>
                    </div>
                    {selected && <CheckCircle className="w-5 h-5 text-blue-600 flex-shrink-0 mt-1" />}
                  </button>
                )
              })}
            </div>
          </motion.div>
        )
      case 3:
        return (
          <motion.div key="step3" initial={{ opacity: 0, x: 40 }} animate={{ opacity: 1, x: 0 }} className="space-y-5">
            <div className="text-center mb-6">
              <h3 className="font-space font-extrabold text-xl text-slate-900">Additional Information</h3>
              <p className="text-slate-400 text-sm">Almost there! Fill in the final details.</p>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <IconSelect icon={Globe} value={form.source} onChange={e => update('source', e.target.value)} error={errors.source}>
                <option value="" disabled>How did you hear about us?</option>
                <option value="social">Social Media</option>
                <option value="website">Website</option>
                <option value="referral">Referral</option>
                <option value="ad">Advertisement</option>
                <option value="other">Other</option>
              </IconSelect>
              <IconInput icon={Target} placeholder="Your Goal" value={form.goal} onChange={e => update('goal', e.target.value)} error={errors.goal} />
              <IconSelect icon={Clock} value={form.batch} onChange={e => update('batch', e.target.value)} error={errors.batch}>
                <option value="" disabled>Preferred Batch</option>
                <option value="morning">Morning</option>
                <option value="afternoon">Afternoon</option>
                <option value="evening">Evening</option>
                <option value="weekend">Weekend</option>
              </IconSelect>
              <IconSelect icon={CreditCard} value={form.paymentMethod} onChange={e => update('paymentMethod', e.target.value)} error={errors.paymentMethod}>
                <option value="" disabled>Payment Method</option>
                <option value="jazzcash">JazzCash</option>
                <option value="easypaisa">EasyPaisa</option>
                <option value="bank">Bank Transfer</option>
                <option value="cash">Cash</option>
              </IconSelect>
              <FloatingInput icon={Hash} label="Transaction ID" value={form.transactionId} onChange={e => update('transactionId', e.target.value)} error={errors.transactionId} />
              <FloatingInput icon={DollarSign} label="Amount Paid" type="number" value={form.amount} onChange={e => update('amount', e.target.value)} error={errors.amount} />
              <IconInput icon={Calendar} type="date" value={form.paymentDate} onChange={e => update('paymentDate', e.target.value)} error={errors.paymentDate} />
            </div>
          </motion.div>
        )
      case 4:
        return (
          <motion.div key="step4" initial={{ opacity: 0, x: 40 }} animate={{ opacity: 1, x: 0 }} className="space-y-5">
            <div className="text-center mb-6">
              <h3 className="font-space font-extrabold text-xl text-slate-900">Review & Submit</h3>
              <p className="text-slate-400 text-sm">Please review your information before submitting.</p>
            </div>

            <div className="bg-slate-50 rounded-xl p-5 space-y-4">
              <div>
                <p className="text-xs text-slate-400 uppercase tracking-widest mb-2">Application ID Preview</p>
                <p className="font-space font-bold text-lg text-blue-600">{appId || generateAppId().replace(/\d{4}$/, '****')}</p>
              </div>
              <div className="grid grid-cols-2 gap-4 text-sm">
                {[
                  ['Full Name', form.fullName], ['Father Name', form.fatherName], ['Email', form.email],
                  ['Phone', form.phone], ['City', form.city], ['Qualification', form.qualification],
                  ['Institute', form.institute], ['Batch', form.batch], ['Payment', form.paymentMethod],
                ].map(([label, value]) => (
                  <div key={label}>
                    <p className="text-[11px] text-slate-400">{label}</p>
                    <p className="text-slate-800 font-medium">{value || '-'}</p>
                  </div>
                ))}
                <div className="col-span-2">
                  <p className="text-[11px] text-slate-400">Selected Courses</p>
                  <p className="text-slate-800 font-medium">{form.courses.map(id => COURSES.find(c => c.id === id)?.title).filter(Boolean).join(', ') || '-'}</p>
                </div>
              </div>
            </div>

            {/* Signature */}
            <div>
              <p className="text-sm font-semibold text-slate-700 mb-2">Digital Signature</p>
              <div className="relative bg-white border-2 border-slate-200 rounded-xl overflow-hidden" style={{ height: 120 }}>
                <canvas
                  ref={canvasRef}
                  className="w-full h-full cursor-crosshair"
                  onMouseDown={startDrawing}
                  onMouseMove={draw}
                  onMouseUp={stopDrawing}
                  onMouseLeave={stopDrawing}
                  onTouchStart={startDrawing}
                  onTouchMove={draw}
                  onTouchEnd={stopDrawing}
                />
                {!signData && <p className="absolute inset-0 flex items-center justify-center text-slate-300 text-xs pointer-events-none">Sign here</p>}
              </div>
              {signData && (
                <button type="button" onClick={clearSignature} className="text-red-500 text-xs mt-1 hover:underline">Clear</button>
              )}
            </div>

            {/* Terms */}
            <label className="flex items-start gap-3 cursor-pointer">
              <input
                type="checkbox"
                checked={form.agreeTerms}
                onChange={e => update('agreeTerms', e.target.checked)}
                className="mt-0.5 w-4 h-4 rounded border-slate-300 text-blue-600 focus:ring-blue-500"
              />
              <span className="text-xs text-slate-500">
                I confirm that all the information provided above is correct and I agree to the{' '}
                <span className="text-blue-600 font-semibold">Terms & Conditions</span> of Shine Tech Academy.
              </span>
            </label>
          </motion.div>
        )
    }
  }

  const STEPS_LABELS = ['Personal Info', 'Academic', 'Courses', 'Additional', 'Review']

  return (
    <>
      <div className="min-h-screen bg-slate-50">
        {/* Top bar */}
        <div className="sticky top-0 z-50 bg-white border-b border-slate-100">
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

        <div className="max-w-3xl mx-auto px-4 py-10">
          {/* Progress */}
          <StepIndicator current={step} total={5} />
          <div className="flex justify-between mb-8">
            {STEPS_LABELS.map((l, i) => (
              <span key={l} className={`text-[11px] font-semibold uppercase tracking-wider transition-colors hidden sm:block ${i <= step ? 'text-blue-600' : 'text-slate-300'}`}>
                {l}
              </span>
            ))}
          </div>

          {/* Form */}
          <div className="bg-white rounded-2xl shadow-2xl border border-slate-100 p-5 sm:p-8">
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
                  className="flex items-center gap-1.5 bg-blue-600 text-white text-sm font-bold px-6 py-3 rounded-xl hover:bg-blue-700 transition-all shadow-lg shadow-blue-500/25"
                >
                  Next <ArrowRight className="w-4 h-4" />
                </button>
              ) : (
                <button
                  onClick={handleSubmit}
                  disabled={!form.agreeTerms || loading}
                  className="flex items-center gap-2 bg-blue-600 text-white text-sm font-bold px-8 py-3 rounded-xl hover:bg-blue-700 transition-all shadow-lg shadow-blue-500/25 disabled:opacity-50 disabled:cursor-not-allowed"
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
        select {
          background-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='12' height='12' viewBox='0 0 24 24' fill='none' stroke='%2394a3b8' stroke-width='2' stroke-linecap='round' stroke-linejoin='round'%3E%3Cpolyline points='6 9 12 15 18 9'%3E%3C/polyline%3E%3C/svg%3E");
          background-repeat: no-repeat;
          background-position: right 12px center;
          padding-right: 36px;
        }
      `}</style>
    </>
  )
}

