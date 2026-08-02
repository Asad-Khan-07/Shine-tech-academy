import { useState, useRef, useEffect } from 'react'
import FaceDetectCrop from '../components/FaceDetectCrop'
import { motion, AnimatePresence } from 'framer-motion'
import { supabase } from '../lib/supabase'
import {
  User, Users, Calendar, Mail, Phone, MapPin, Home, GraduationCap, BookOpen,
  Award, Briefcase, Code, Smartphone, Palette, PenTool, Megaphone, DollarSign,
  Globe, CheckCircle, ArrowLeft, ArrowRight, Loader, Camera, FileText, CreditCard, Hash,
  Clock, Star, Target, ChevronDown, ChevronLeft, ChevronRight,
  UserCircle, Mars, Venus, AlertCircle, X,
  Monitor, Sparkles, Bot, Server, Cpu, FileSpreadsheet, Languages
} from 'lucide-react'

const COURSES = [
  { id: 'cit',               icon: Monitor,        title: 'Computer & IT Fundamentals (CIT)',                       desc: 'Computer Basics, MS Office, Internet & Digital Literacy' },
  { id: 'ai-everyone',       icon: Sparkles,        title: 'AI for Everyone',                                        desc: 'AI Basics, Machine Learning & Everyday AI Tools' },
  { id: 'ai-productivity',   icon: Bot,             title: 'AI Productivity & Prompt Engineering',                    desc: 'ChatGPT, Claude, Gemini & Advanced Prompt Engineering' },
  { id: 'digital-marketing', icon: Megaphone,       title: 'Digital Marketing & Personal Branding',                   desc: 'SEO, Social Media, Google Ads & Personal Branding' },
  { id: 'mern',              icon: Server,          title: 'Professional Diploma in Modern MERN Stack Engineering',  desc: 'MongoDB, Express.js, React.js & Node.js' },
  { id: 'full-stack',        icon: Code,            title: 'Full Stack Web Development',                             desc: 'Frontend, Backend, Databases & Deployment' },
  { id: 'robotics',          icon: Cpu,             title: 'Robotics & AI Automation',                                desc: 'Arduino, Sensors, RPA & Autonomous Systems' },
  { id: 'ms-office',         icon: FileSpreadsheet, title: 'Microsoft Office Professional',                           desc: 'Word, Excel, PowerPoint & Outlook Mastery' },
  { id: 'graphic-design',    icon: PenTool,         title: 'Graphic Designing & Visual Communication',                desc: 'Photoshop, Illustrator, Branding & Typography' },
  { id: 'pro-english',       icon: Languages,       title: 'Professional English for Career & Freelancing',          desc: 'Spoken English, Business Communication & Interview Prep' },
  // { id: 'other',             icon: Star,            title: 'Other Course',                                            desc: 'Tell us what you want to learn' },
]

function generateAppId(courseId) {
  const prefix = 'STA'
  // Combine last 4 digits of timestamp + 2 random digits = 6-digit unique code
  const tsSlice = Date.now().toString().slice(-4)
  const randSlice = Math.floor(10 + Math.random() * 90).toString() // 2-digit random (10-99)
  const unique = tsSlice + randSlice
  const suffixes = {
    cit: 'CT',
    'ai-everyone': 'AE',
    'ai-productivity': 'AP',
    'digital-marketing': 'DM',
    mern: 'MN',
    'full-stack': 'FS',
    robotics: 'RA',
    'ms-office': 'MO',
    'graphic-design': 'GD',
    'pro-english': 'PE',
    other: 'OC'
  }
  const suffix = courseId ? `-${suffixes[courseId] || 'OC'}` : ''
  return `${prefix}-${unique}${suffix}`
}

async function generateUniqueAppId(courseId) {
  // Keep generating until a confirmed-unique ID is found in the database
  let candidate
  let attempts = 0
  do {
    candidate = generateAppId(courseId)
    const { data } = await supabase
      .from('admissions')
      .select('app_id')
      .eq('app_id', candidate)
      .maybeSingle()
    if (!data) break // ID does not exist in DB — it's unique!
    attempts++
  } while (attempts < 10) // Safety cap: after 10 tries, use last generated
  return candidate
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

/* ─── Premium Custom Date Picker Component ──────────────────── */
function CustomDatePicker({ label, icon: Icon, value, onChange, error }) {
  const [isOpen, setIsOpen] = useState(false)
  const [focused, setFocused] = useState(false)
  const pickerRef = useRef(null)

  // Parse initial date
  const getInitialDate = () => {
    if (value) {
      const d = new Date(value)
      if (!isNaN(d.getTime())) return d
    }
    return new Date() // default to today
  }

  const initialDate = getInitialDate()
  const [viewYear, setViewYear] = useState(initialDate.getFullYear())
  const [viewMonth, setViewMonth] = useState(initialDate.getMonth())

  // Keep view in sync when value changes externally
  useEffect(() => {
    if (value) {
      const d = new Date(value)
      if (!isNaN(d.getTime())) {
        setViewYear(d.getFullYear())
        setViewMonth(d.getMonth())
      }
    }
  }, [value])

  useEffect(() => {
    const handleOutsideClick = (e) => {
      if (pickerRef.current && !pickerRef.current.contains(e.target)) {
        setIsOpen(false)
        setFocused(false)
      }
    }
    document.addEventListener('mousedown', handleOutsideClick)
    return () => document.removeEventListener('mousedown', handleOutsideClick)
  }, [])

  const months = [
    'January', 'February', 'March', 'April', 'May', 'June',
    'July', 'August', 'September', 'October', 'November', 'December'
  ]

  // Generate Year options (100 years back to current year)
  const currentYear = new Date().getFullYear()
  const years = []
  for (let y = currentYear; y >= currentYear - 100; y--) {
    years.push(y)
  }

  const handlePrevMonth = () => {
    if (viewMonth === 0) {
      setViewMonth(11)
      setViewYear(prev => prev - 1)
    } else {
      setViewMonth(prev => prev - 1)
    }
  }

  const handleNextMonth = () => {
    if (viewMonth === 11) {
      setViewMonth(0)
      setViewYear(prev => prev + 1)
    } else {
      setViewMonth(prev => prev + 1)
    }
  }

  const handleSelectDay = (day) => {
    const formattedMonth = String(viewMonth + 1).padStart(2, '0')
    const formattedDay = String(day).padStart(2, '0')
    const dateStr = `${viewYear}-${formattedMonth}-${formattedDay}`
    onChange({ target: { value: dateStr } })
    setIsOpen(false)
    setFocused(false)
  }

  const handleClear = () => {
    onChange({ target: { value: '' } })
    setIsOpen(false)
    setFocused(false)
  }

  const handleToday = () => {
    const today = new Date()
    const formattedMonth = String(today.getMonth() + 1).padStart(2, '0')
    const formattedDay = String(today.getDate()).padStart(2, '0')
    const dateStr = `${today.getFullYear()}-${formattedMonth}-${formattedDay}`
    onChange({ target: { value: dateStr } })
    setIsOpen(false)
    setFocused(false)
  }

  // Calculate calendar days
  const firstDayIndex = new Date(viewYear, viewMonth, 1).getDay()
  const totalDays = new Date(viewYear, viewMonth + 1, 0).getDate()

  const daysArray = []
  // spacer days for start of month
  for (let i = 0; i < firstDayIndex; i++) {
    daysArray.push(null)
  }
  // real days
  for (let i = 1; i <= totalDays; i++) {
    daysArray.push(i)
  }

  // Format value for display in the input box (e.g. DD/MM/YYYY)
  const getDisplayValue = () => {
    if (!value) return ''
    const parts = value.split('-') // YYYY-MM-DD
    if (parts.length === 3) {
      return `${parts[2]}/${parts[1]}/${parts[0]}`
    }
    return value
  }

  const displayValue = getDisplayValue()
  const hasValue = displayValue.length > 0
  const float = focused || hasValue || isOpen

  // Selected date components for highlighting in calendar
  let selectedYear = null
  let selectedMonth = null
  let selectedDay = null
  if (value) {
    const selDate = new Date(value)
    if (!isNaN(selDate.getTime())) {
      selectedYear = selDate.getFullYear()
      selectedMonth = selDate.getMonth()
      selectedDay = selDate.getDate()
    }
  }

  return (
    <div className="relative flex flex-col" ref={pickerRef}>
      <div className="relative">
        {Icon && (
          <Icon
            className={`absolute left-3 w-4 h-4 text-slate-400 pointer-events-none transition-all duration-200 z-10 ${
              float ? 'top-3.5' : 'top-1/2 -translate-y-1/2'
            }`}
          />
        )}

        <button
          type="button"
          onClick={() => {
            setIsOpen(!isOpen)
            setFocused(true)
          }}
          className={`w-full peer bg-white/70 border rounded-xl px-3 py-3.5 text-sm text-slate-900 text-left outline-none transition-all duration-200 min-h-[50px]
            ${Icon ? 'pl-10' : 'pl-3'}
            ${float ? 'pt-5 pb-2' : ''}
            ${error ? 'border-red-400 ring-2 ring-red-500/20' : 'border-slate-200 hover:border-slate-300 focus:border-blue-500 focus:ring-2 focus:ring-blue-100/50'}
          `}
        >
          {displayValue || <span className="text-slate-400 opacity-0">placeholder</span>}
        </button>

        <label
          className={`absolute pointer-events-none transition-all duration-200 text-xs select-none
            ${Icon ? 'left-10' : 'left-3'}
            ${float
              ? '-top-2.5 text-[11px] bg-white px-1 text-blue-600 font-medium z-10'
              : 'top-3.5 text-slate-400'
            }
            ${error ? 'text-red-500' : ''}
          `}
        >
          {label}
        </label>
      </div>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 10, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 10, scale: 0.95 }}
            transition={{ duration: 0.15 }}
            className="absolute top-[105%] left-0 w-[290px] bg-white border border-slate-100 rounded-2xl shadow-xl z-[1050] p-4 flex flex-col gap-3 font-sans"
          >
            {/* Header controls: month, year selectors and prev/next page */}
            <div className="flex items-center justify-between gap-1.5 border-b border-slate-100 pb-2">
              <button
                type="button"
                onClick={handlePrevMonth}
                className="p-1 hover:bg-slate-100 rounded-lg text-slate-500 transition-colors"
              >
                <ChevronLeft className="w-4 h-4" />
              </button>

              <div className="flex gap-1 items-center flex-1 justify-center">
                {/* Month Dropdown */}
                <select
                  value={viewMonth}
                  onChange={(e) => setViewMonth(parseInt(e.target.value))}
                  className="bg-transparent text-xs font-bold text-slate-800 outline-none border-none cursor-pointer py-1 px-1 rounded hover:bg-slate-50"
                >
                  {months.map((m, idx) => (
                    <option key={m} value={idx}>{m}</option>
                  ))}
                </select>

                {/* Year Dropdown */}
                <select
                  value={viewYear}
                  onChange={(e) => setViewYear(parseInt(e.target.value))}
                  className="bg-transparent text-xs font-bold text-slate-800 outline-none border-none cursor-pointer py-1 px-1 rounded hover:bg-slate-50"
                >
                  {years.map((y) => (
                    <option key={y} value={y}>{y}</option>
                  ))}
                </select>
              </div>

              <button
                type="button"
                onClick={handleNextMonth}
                className="p-1 hover:bg-slate-100 rounded-lg text-slate-500 transition-colors"
              >
                <ChevronRight className="w-4 h-4" />
              </button>
            </div>

            {/* Week days header */}
            <div className="grid grid-cols-7 text-center gap-y-1">
              {['Su', 'Mo', 'Tu', 'We', 'Th', 'Fr', 'Sa'].map((d) => (
                <span key={d} className="text-[10px] font-bold text-slate-400 uppercase">{d}</span>
              ))}
            </div>

            {/* Days grid */}
            <div className="grid grid-cols-7 text-center gap-y-1 gap-x-0.5">
              {daysArray.map((day, idx) => {
                if (day === null) {
                  return <div key={`empty-${idx}`} />
                }
                const isSelected = selectedDay === day && selectedMonth === viewMonth && selectedYear === viewYear
                return (
                  <button
                    key={`day-${day}`}
                    type="button"
                    onClick={() => handleSelectDay(day)}
                    className={`w-7 h-7 mx-auto rounded-full flex items-center justify-center text-xs font-medium transition-all
                      ${isSelected
                        ? 'bg-blue-600 text-white font-bold shadow-md shadow-blue-500/20'
                        : 'text-slate-700 hover:bg-slate-100'
                      }
                    `}
                  >
                    {day}
                  </button>
                )
              })}
            </div>

            {/* Footer Clear / Today buttons */}
            <div className="flex items-center justify-between border-t border-slate-100 pt-2 text-xs font-bold mt-1">
              <button
                type="button"
                onClick={handleClear}
                className="text-red-500 hover:text-red-600 transition-colors px-2 py-1 hover:bg-red-50 rounded-lg"
              >
                Clear
              </button>
              <button
                type="button"
                onClick={handleToday}
                className="text-blue-600 hover:text-blue-700 transition-colors px-2 py-1 hover:bg-blue-50 rounded-lg"
              >
                Today
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
      {error && <p className="text-red-500 text-[11px] mt-1 ml-1">{error}</p>}
    </div>
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
  const [showFaceCrop, setShowFaceCrop] = useState(false)
  const [rawImageSrc, setRawImageSrc] = useState(null)
  const [genderOpen, setGenderOpen] = useState(false)

  useEffect(() => {
    window.scrollTo(0, 0)
  }, [])

  const [form, setForm] = useState({
    photo: null,
    photoPreview: '',
    fullName: '',
    fatherName: '',
    gender: '',
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
  const fileInputRef = useRef(null)

  const [errors, setErrors] = useState({})

  const validateStep = (s) => {
    let err = {}
    if (s === 0) {
      if (!form.photoPreview) err.photo = 'Student photo is required'
      if (!form.fullName.trim()) err.fullName = 'Full Name is required'
      if (!form.fatherName.trim()) err.fatherName = 'Father Name is required'
      if (!form.gender) err.gender = 'Please select your gender'
      if (!form.dob) err.dob = 'Date of Birth is required'
      if (!form.email.trim()) err.email = 'Email address is required'
      else if (!/\S+@\S+\.\S+/.test(form.email)) err.email = 'Please enter a valid email'
      if (!form.phone.trim()) err.phone = 'Phone number is required'
      else if (form.phone.trim().length !== 11) err.phone = 'Please enter a valid 11-digit phone number'
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

  const nextStep = async () => {
    if (validateStep(step)) {
      if (step === 0) {
        setLoading(true)
        try {
          const { data, error } = await supabase
            .from('admissions')
            .select('email')
            .ilike('email', form.email.trim())
            .maybeSingle()

          if (error) {
            console.error('Error checking email uniqueness:', error)
          }

          if (data) {
            setErrors({ email: 'Email address is already in use' })
            return
          }
        } catch (err) {
          console.error(err)
        } finally {
          setLoading(false)
        }
      }
      setStep((prev) => prev + 1)
    }
  }

  const prevStep = () => {
    setStep((prev) => prev - 1)
  }

  const handleSelectCourse = (id) => {
    setForm((prev) => {
      // Single selection logic: toggle it off if already selected, otherwise select only this one.
      const isSelected = prev.courses.includes(id)
      return {
        ...prev,
        courses: isSelected ? [] : [id]
      }
    })
  }

  const handleSubmit = async () => {
    if (!form.agreeTerms) return
    setLoading(true)
    
    try {
      // Guaranteed unique: checks DB before accepting the ID
      const newId = await generateUniqueAppId(form.courses[0])
      let photoUrl = ''

      // 1. Upload Photo to Supabase Storage if present
      if (form.photo) {
        const fileExt = form.photo.name.split('.').pop()
        const fileName = `${newId}.${fileExt}`
        const { data: uploadData, error: uploadError } = await supabase.storage
          .from('student-photos')
          .upload(fileName, form.photo, {
            cacheControl: '3600',
            upsert: true
          })

        if (uploadError) {
          throw new Error('Photo upload failed: ' + uploadError.message)
        }

        // Get Public URL
        const { data: publicUrlData } = supabase.storage
          .from('student-photos')
          .getPublicUrl(fileName)
        
        photoUrl = publicUrlData?.publicUrl || ''
      }

      // 2. Insert into Database Table 'admissions'
      const { error: dbError } = await supabase
        .from('admissions')
        .insert([{
          app_id: newId,
          full_name: form.fullName,
          father_name: form.fatherName,
          gender: form.gender,
          dob: form.dob,
          email: form.email,
          phone: form.phone,
          address: form.address,
          city: form.city,
          qualification: form.qualification,
          institute: form.institute,
          courses: form.courses,
          custom_course: form.customCourse,
          source: form.source,
          whatsapp_group: form.whatsappGroup,
          photo_url: photoUrl
        }])

      if (dbError) {
        throw new Error('Database insertion failed: ' + dbError.message)
      }

      setAppId(newId)
      // Close the form and pass success data up to App.jsx
      onBack(newId, form)
    } catch (err) {
      console.error(err)
      alert(err.message || 'Something went wrong. Please try again.')
    } finally {
      setLoading(false)
    }
  }

  const handlePhotoChange = (e) => {
    const file = e.target.files?.[0]
    if (file) {
      if (file.size > 5 * 1024 * 1024) {
        alert('File size must be under 5MB')
        return
      }
      const reader = new FileReader()
      reader.onloadend = () => {
        setRawImageSrc(reader.result)
        setShowFaceCrop(true) // Open face detect/crop modal
      }
      reader.readAsDataURL(file)
    }
  }

  const handleCropComplete = (croppedDataUrl) => {
    // Convert data URL to File blob for upload
    fetch(croppedDataUrl)
      .then(r => r.blob())
      .then(blob => {
        const croppedFile = new File([blob], 'student_photo.jpg', { type: 'image/jpeg' })
        setForm(prev => ({ ...prev, photo: croppedFile, photoPreview: croppedDataUrl }))
        setErrors(prev => ({ ...prev, photo: undefined }))
      })
    setShowFaceCrop(false)
    setRawImageSrc(null)
    if (fileInputRef.current) fileInputRef.current.value = ''
  }

  const handleCancelCrop = () => {
    setShowFaceCrop(false)
    setRawImageSrc(null)
    if (fileInputRef.current) fileInputRef.current.value = ''
  }

  const handleRemovePhoto = () => {
    setForm((prev) => ({ ...prev, photo: null, photoPreview: '' }))
    if (fileInputRef.current) fileInputRef.current.value = ''
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

            {/* Passport Size Student Photo Upload */}
            <div className="bg-slate-50/80 border border-slate-100 rounded-2xl p-4 flex flex-col sm:flex-row items-center gap-5">
              <input
                ref={fileInputRef}
                type="file"
                accept="image/*"
                onChange={handlePhotoChange}
                className="hidden"
                id="student-photo-input"
              />

              <div className="relative flex-shrink-0">
                <div
                  onClick={() => fileInputRef.current?.click()}
                  className={`w-24 h-24 rounded-2xl border-2 border-dashed ${errors.photo ? 'border-red-400 bg-red-50' : 'border-slate-300 hover:border-blue-500 bg-white'} flex flex-col items-center justify-center cursor-pointer overflow-hidden group transition-all duration-200 shadow-sm`}
                >
                  {form.photoPreview ? (
                    <img src={form.photoPreview} alt="Student Photo" className="w-full h-full object-cover" />
                  ) : (
                    <>
                      <div className={`w-10 h-10 rounded-full ${errors.photo ? 'bg-red-100 text-red-500' : 'bg-blue-50 text-blue-600'} flex items-center justify-center group-hover:scale-110 transition-transform`}>
                        <Camera className="w-5 h-5" />
                      </div>
                      <span className={`text-[10px] font-bold mt-1 ${errors.photo ? 'text-red-400' : 'text-slate-400'}`}>Upload</span>
                    </>
                  )}
                </div>

                {form.photoPreview && (
                  <button
                    type="button"
                    onClick={handleRemovePhoto}
                    className="absolute -top-2 -right-2 w-6 h-6 bg-red-500 text-white rounded-full flex items-center justify-center shadow-md hover:bg-red-600 transition-colors"
                  >
                    <X className="w-3.5 h-3.5" />
                  </button>
                )}
              </div>

              <div className="flex-1 text-center sm:text-left">
                <h4 className="font-bold text-slate-800 text-sm flex items-center justify-center sm:justify-start gap-1.5">
                  Student Passport Size Photo
                  <span className="text-[10px] font-semibold bg-red-100 text-red-600 px-2 py-0.5 rounded-full">Required</span>
                </h4>
                <p className="text-slate-400 text-xs mt-1 leading-relaxed">
                  Upload a clear passport size photograph (PNG, JPG up to 5MB) for student ID card generation.
                </p>
                <button
                  type="button"
                  onClick={() => fileInputRef.current?.click()}
                  className="mt-2.5 inline-flex items-center gap-1.5 text-xs font-bold text-blue-600 hover:text-blue-700 transition-colors"
                >
                  <Camera className="w-3.5 h-3.5" />
                  {form.photoPreview ? 'Change Photo' : 'Select Photo from Device'}
                </button>
                {errors.photo && (
                  <p className="text-red-500 text-xs mt-1.5 font-medium flex items-center gap-1">
                    <AlertCircle className="w-3.5 h-3.5" /> {errors.photo}
                  </p>
                )}
              </div>
            </div>

            <FloatingInput
              label="Full Name"
              icon={User}
              value={form.fullName}
              onChange={(e) => setForm({ ...form, fullName: e.target.value })}
              error={errors.fullName}
            />
            <FloatingInput
              label="Father Name"
              icon={User}
              value={form.fatherName}
              onChange={(e) => setForm({ ...form, fatherName: e.target.value })}
              error={errors.fatherName}
            />
            {/* Gender Selector - Custom Dropdown */}
            <div className="relative">
              <div
                onClick={() => setGenderOpen((prev) => !prev)}
                className={`flex items-center gap-3 border rounded-2xl px-4 py-3.5 bg-white cursor-pointer transition-all duration-200 select-none ${
                  errors.gender
                    ? 'border-red-400 ring-1 ring-red-300'
                    : genderOpen
                    ? 'border-blue-500 ring-1 ring-blue-300'
                    : 'border-slate-200 hover:border-blue-400'
                }`}
              >
                <span className={`w-7 h-7 rounded-full flex items-center justify-center flex-shrink-0 ${
                  form.gender === 'Male' ? 'bg-blue-50 text-blue-600' : form.gender === 'Female' ? 'bg-pink-50 text-pink-500' : ''
                }`}>
                  {form.gender === 'Male' ? <Mars className="w-4 h-4" /> : form.gender === 'Female' ? <Venus className="w-4 h-4" /> : <Users className="w-4 h-4 text-slate-400" />}
                </span>
                <span className={`flex-1 text-sm font-semibold ${form.gender ? 'text-slate-800' : 'text-slate-400'}`}>
                  {form.gender || 'Select Gender'}
                </span>
                {form.gender && (
                  <span className="w-5 h-5 bg-blue-500 rounded-full flex items-center justify-center flex-shrink-0">
                    <CheckCircle className="w-3 h-3 text-white" />
                  </span>
                )}
                <ChevronDown className={`w-4 h-4 flex-shrink-0 transition-transform duration-200 ${genderOpen ? 'rotate-180 text-blue-500' : 'text-slate-400'}`} />
              </div>

              {/* Dropdown Panel */}
              {genderOpen && (
                <div className="absolute left-0 right-0 top-full mt-1.5 bg-white border border-slate-200 rounded-2xl shadow-xl overflow-hidden z-50">
                  {[
                    { value: 'Male',   icon: Mars,  desc: 'Male' },
                    { value: 'Female', icon: Venus, desc: 'Female' },
                  ].map(({ value, icon: GenderIcon, desc }) => {
                    const isSelected = form.gender === value
                    return (
                      <div
                        key={value}
                        onClick={() => { setForm({ ...form, gender: value }); setGenderOpen(false) }}
                        className={`flex items-center gap-3 px-4 py-3 cursor-pointer transition-all duration-150 ${
                          isSelected
                            ? 'bg-blue-50 text-blue-700'
                            : 'hover:bg-slate-50 text-slate-700'
                        }`}
                      >
                        <GenderIcon className={`w-4 h-4 ${value === 'Male' ? 'text-blue-500' : 'text-pink-500'}`} />
                        <span className="flex-1 text-sm font-semibold">{desc}</span>
                        {isSelected && <CheckCircle className="w-4 h-4 text-blue-500" />}
                      </div>
                    )
                  })}
                </div>
              )}

              {errors.gender && (
                <p className="text-red-500 text-xs mt-1.5 font-medium flex items-center gap-1">
                  <AlertCircle className="w-3.5 h-3.5" /> {errors.gender}
                </p>
              )}
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
              <CustomDatePicker
                label="Date of Birth"
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
                onChange={(e) => {
                  const cleaned = e.target.value.replace(/\D/g, '')
                  if (cleaned.length <= 11) {
                    setForm({ ...form, phone: cleaned })
                  }
                }}
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
              <h3 className="font-space font-extrabold text-slate-800 text-lg">Select Program</h3>
              <p className="text-xs text-slate-400 mt-1">Select the program you wish to enroll in.</p>
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
        const detailRows = [
          { label: 'ID NUMBER',    value: appId },
          { label: 'FATHER NAME',  value: form.fatherName || '—' },
          { label: 'DEPARTMENT',   value: 'Technology' },
          { label: 'EMAIL',        value: form.email.length > 25 ? form.email.slice(0, 23) + '..' : form.email },
          { label: 'PHONE',        value: form.phone },
        ]
        return (
          <motion.div
            key="step5"
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -20 }}
            className="flex flex-col gap-6"
          >
            <div className="flex items-center justify-between">
              <div>
                <h3 className="font-space font-extrabold text-slate-800 text-lg">Review Information</h3>
                <p className="text-xs text-slate-400 mt-1">Please double check your credentials before submitting.</p>
              </div>

              {form.photoPreview && (
                <div className="flex items-center gap-3 bg-slate-50 border border-slate-200/80 rounded-2xl p-2 pr-4 shadow-sm">
                  <img src={form.photoPreview} alt="Student" className="w-12 h-12 rounded-xl object-cover border border-slate-200" />
                  <div>
                    <span className="text-[10px] font-bold uppercase tracking-wider text-blue-600">Passport Photo</span>
                    <p className="text-xs font-bold text-slate-800 flex items-center gap-1">Attached <CheckCircle className="w-3.5 h-3.5 text-green-500" /></p>
                  </div>
                </div>
              )}
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {[
                { label: 'Full Name', value: form.fullName, icon: User },
                { label: 'Father Name', value: form.fatherName, icon: User },
                { label: 'Gender', value: form.gender, icon: Users },
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
      {/* Face Detect / Crop Modal */}
      <AnimatePresence>
        {showFaceCrop && rawImageSrc && (
          <FaceDetectCrop
            imageSrc={rawImageSrc}
            onCropComplete={handleCropComplete}
            onCancel={handleCancelCrop}
          />
        )}
      </AnimatePresence>

      <div className="min-h-screen bg-transparent relative z-10 flex flex-col">
        {/* Top bar (Glassmorphism layout) */}
        <div className="sticky top-0 z-50 bg-white/40 backdrop-blur-md border-b border-slate-100/50">
          <div className="max-w-3xl mx-auto px-4 py-3 flex items-center justify-between">
            <button onClick={onBack} className="flex items-center gap-1.5 text-slate-500 hover:text-slate-800 transition-colors text-sm font-medium self-center">
              <ArrowLeft className="w-4 h-4" /> Back
            </button>
            <div className="flex flex-col items-center gap-0 self-center">
              <img src="/STA-logo.png" alt="STA" className="h-8 w-auto" style={{ height: '32px', width: 'auto', objectFit: 'contain' }} />
              <span className="font-space font-bold text-[10px] text-slate-800">Admission Form</span>
            </div>
            <div className="text-xs text-slate-400 font-medium self-center">{step + 1} / 5</div>
          </div>
        </div>

        <div className="max-w-3xl mx-auto px-3 sm:px-4 py-6 sm:py-10 w-full flex-1 flex flex-col justify-center relative z-20">
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
          <div className="bg-white/90 backdrop-blur-md rounded-2xl sm:rounded-3xl shadow-2xl border border-white/60 p-4 sm:p-6 lg:p-10 hover:shadow-blue-500/5 transition-shadow duration-300">
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
                  disabled={loading}
                  className="flex items-center gap-1.5 bg-blue-600 text-white text-sm font-bold px-6 py-3 rounded-xl hover:bg-blue-700 transition-all shadow-lg shadow-blue-500/25 hover:-translate-y-0.5 disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {loading && step === 0 ? (
                    <>Checking... <Loader className="w-4.5 h-4.5 animate-spin" /></>
                  ) : (
                    <>Next <ArrowRight className="w-4 h-4" /></>
                  )}
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



      <style>{`
        input[type="date"]::-webkit-calendar-picker-indicator,
        input[type="number"]::-webkit-inner-spin-button {
          opacity: 0.5;
        }
      `}</style>
    </>
  )
}