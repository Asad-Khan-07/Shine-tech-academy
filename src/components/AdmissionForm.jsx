import { useState, useRef, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { supabase } from '../lib/supabase'
import { jsPDF } from 'jspdf'
import html2canvas from 'html2canvas'
import {
  User, Calendar, Mail, Phone, MapPin, Home, GraduationCap, BookOpen,
  Award, Briefcase, Code, Smartphone, Palette, PenTool, Megaphone, DollarSign,
  Globe, CheckCircle, ArrowLeft, ArrowRight, Loader, Camera, FileText, CreditCard, Hash,
  Clock, Star, Target, ChevronDown, ChevronLeft, ChevronRight
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
  const unique = Date.now().toString().slice(-5) // Last 5 digits of timestamp (milliseconds) — short and unique
  return `${prefix}-${unique}`
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





function SuccessModal({ appId, form, onClose }) {
  const [downloading, setDownloading] = useState(false)
  const [uploading, setUploading] = useState(false)
  const [qrCodeDataUrl, setQrCodeDataUrl] = useState('')
  const [logoDataUrl, setLogoDataUrl] = useState('')
  const frontCardRef = useRef(null)
  const backCardRef = useRef(null)

  // ── Responsive card scaling ─────────────────────────────────────
  // Measures the natural (unscaled) size of the two-card cluster and
  // shrinks it with a CSS transform so it always fits the available
  // width on ANY screen size (no manual breakpoints needed). We use a
  // negative bottom margin (never overflow:hidden + fixed height) to
  // remove the leftover blank space a transform: scale() leaves behind
  // — this way the cards can NEVER get visually clipped, even if the
  // measurement is briefly off during image loading.
  const cardsOuterRef = useRef(null)
  const cardsInnerRef = useRef(null)
  const [cardScale, setCardScale] = useState(1)
  const [cardsMarginBottom, setCardsMarginBottom] = useState(0)

  useEffect(() => {
    const inner = cardsInnerRef.current
    const outer = cardsOuterRef.current
    if (!inner || !outer) return

    const recalcScale = () => {
      // scrollWidth/scrollHeight are unaffected by CSS transforms,
      // so we can measure directly without toggling the transform off.
      const naturalWidth = inner.scrollWidth
      const naturalHeight = inner.scrollHeight
      const availableWidth = outer.clientWidth
      const scale = naturalWidth > 0 ? Math.min(1, availableWidth / naturalWidth) : 1
      setCardScale(scale)
      setCardsMarginBottom(-(naturalHeight * (1 - scale)))
    }

    recalcScale()
    window.addEventListener('resize', recalcScale)
    // Keep recalculating if the cards' natural size changes for any
    // reason (images finishing loading, fonts loading, etc.)
    const resizeObserver = new ResizeObserver(recalcScale)
    resizeObserver.observe(inner)

    return () => {
      window.removeEventListener('resize', recalcScale)
      resizeObserver.disconnect()
    }
  }, [])

  // Standard safe base64-encoded SVG default avatar
  const defaultAvatar = "data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHZpZXdCb3g9IjAgMCAyNCAyNCIgZmlsbD0iIzExMTgyNyI+PHBhdGggZD0iTTEyIDJDNi40OCAyIDIgNi40OCAyIDEyczQuNDggMTAgMTAgMTAgMTAtNC40OCAxMC0xMFMxNy41MiAyIDEyIDJ6bTAgM2MxLjY2IDAgMyAxLjM0IDMgM3MtMS4zNCAzLTMgMy0zLTEuMzQtMy0zIDEuMzQtMyAzLTN6bTAgMTQuMmMtMi41IDAtNC43MS0xLjI4LTYtMy4yMi4wMy0xLjk5IDQtMy4wOCA2LTMuMDggMS45OSAwIDUuOTcgMS4wOSA2IDMuMDgtMS4yOSAxLjk0LTMuNSAzLjIyLTYgMy4yMnoiLz48L3N2Zz4="

  // Get primary course name
  const primaryCourseId = form.courses[0]
  const primaryCourseName = COURSES.find((c) => c.id === primaryCourseId)?.title || form.customCourse || 'Tech Program'

  // Fetch QR Code and convert to local data URI to bypass CORS in canvas
  useEffect(() => {
    const fetchQr = async () => {
      try {
        const res = await fetch(`https://api.qrserver.com/v1/create-qr-code/?size=150x150&data=${appId}`)
        const blob = await res.blob()
        const reader = new FileReader()
        reader.onloadend = () => {
          setQrCodeDataUrl(reader.result)
        }
        reader.readAsDataURL(blob)
      } catch (err) {
        console.error('Error loading QR code base64:', err)
      }
    }
    if (appId) {
      fetchQr()
    }
  }, [appId])

  // Fetch STA logo and convert to base64 to avoid CORS in html2canvas
  useEffect(() => {
    const fetchLogo = async () => {
      try {
        const res = await fetch('/STA-logo.png')
        const blob = await res.blob()
        const reader = new FileReader()
        reader.onloadend = () => {
          setLogoDataUrl(reader.result)
        }
        reader.readAsDataURL(blob)
      } catch (err) {
        console.error('Error loading logo base64:', err)
      }
    }
    fetchLogo()
  }, [])

  // ── Shared PDF builder ──────────────────────────────────────────
  const buildAdmitCardPDF = () => {
    const pdf = new jsPDF({ orientation: 'portrait', unit: 'mm', format: 'a4' })

    // ── Page Header ─────────────────────────────────────────────
    pdf.setFont('helvetica', 'bold')
    pdf.setFontSize(17)
    pdf.setTextColor(17, 24, 39)
    pdf.text('SHINE TECH ACADEMY', 105, 17, { align: 'center' })
    pdf.setFont('helvetica', 'normal')
    pdf.setFontSize(8.5)
    pdf.setTextColor(100, 116, 139)
    pdf.text('Official Digital Student Admit Card & ID', 105, 23, { align: 'center' })

    // card geometry
    const fc = { x: 14, y: 29, w: 84, h: 133 }  // front card
    const bc = { x: 112, y: 29, w: 84, h: 133 }  // back card

    // ── FRONT CARD ───────────────────────────────────────────────
    pdf.setFillColor(255, 255, 255)
    pdf.setDrawColor(203, 213, 225)
    pdf.setLineWidth(0.3)
    pdf.roundedRect(fc.x, fc.y, fc.w, fc.h, 5, 5, 'FD')

    // Logo
    if (logoDataUrl) {
      const logoW = 52, logoH = 16
      pdf.addImage(logoDataUrl, 'PNG', fc.x + (fc.w - logoW) / 2, fc.y + 5, logoW, logoH, '', 'FAST')
    }

    // Student Photo — blue ring + white fill + photo (clipped to a true circle)
    const cx = fc.x + fc.w / 2
    const photoTop = fc.y + 24
    const r = 14
    pdf.setFillColor(37, 99, 235)
    pdf.circle(cx, photoTop + r, r + 1.5, 'F')
    pdf.setFillColor(255, 255, 255)
    pdf.circle(cx, photoTop + r, r, 'F')
    if (form.photoPreview) {
      // Clip the image to the circle so it never overflows the ring
      pdf.saveGraphicsState()
      pdf.circle(cx, photoTop + r, r - 0.5, null) // build path only, no fill/stroke
      pdf.clip()
      pdf.discardPath()
      pdf.addImage(form.photoPreview, 'JPEG', cx - r + 0.5, photoTop + 0.5, (r - 0.5) * 2, (r - 0.5) * 2, '', 'FAST')
      pdf.restoreGraphicsState()
    }

    // Student Name
    const nameY = photoTop + r * 2 + 8
    pdf.setFont('helvetica', 'bold')
    pdf.setFontSize(13)
    pdf.setTextColor(15, 23, 42)
    pdf.text(form.fullName, cx, nameY, { align: 'center' })

    // Course
    pdf.setFont('helvetica', 'bold')
    pdf.setFontSize(7.5)
    pdf.setTextColor(37, 99, 235)
    pdf.text(primaryCourseName.toUpperCase(), cx, nameY + 6, { align: 'center' })

    // Details table
    const lx = fc.x + 7    // label x
    const kx = fc.x + 33   // colon x
    const vx = fc.x + 36   // value x
    let dy = nameY + 14
    const rowGap = 8.5

    const rows = [
      { label: 'ID NUMBER',  value: appId },
      { label: 'DEPARTMENT', value: 'Technology' },
      { label: 'EMAIL',      value: form.email.length > 25 ? form.email.slice(0, 23) + '..' : form.email },
      { label: 'PHONE',      value: form.phone },
    ]
    rows.forEach((r) => {
      pdf.setFont('helvetica', 'bold')
      pdf.setFontSize(7)
      pdf.setTextColor(148, 163, 184)
      pdf.text(r.label, lx, dy)
      pdf.text(':', kx, dy)
      pdf.setTextColor(30, 41, 59)
      pdf.text(r.value, vx, dy)
      dy += rowGap
    })

    // Blue bottom banner
    pdf.setFillColor(37, 99, 235)
    pdf.roundedRect(fc.x, fc.y + fc.h - 17, fc.w, 17, 0, 4, 'F')
    // cover top corners of banner so they look flat
    pdf.setFillColor(37, 99, 235)
    pdf.rect(fc.x, fc.y + fc.h - 17, fc.w, 5, 'F')
    pdf.setFont('helvetica', 'bold')
    pdf.setFontSize(6.5)
    pdf.setTextColor(255, 255, 255)
    pdf.text('EMPOWERING FUTURE TECH LEADERS', cx, fc.y + fc.h - 7, { align: 'center' })

    // ── BACK CARD ────────────────────────────────────────────────
    pdf.setFillColor(255, 255, 255)
    pdf.setDrawColor(203, 213, 225)
    pdf.setLineWidth(0.3)
    pdf.roundedRect(bc.x, bc.y, bc.w, bc.h, 5, 5, 'FD')

    const bcx = bc.x + bc.w / 2

    // White header bg (cover rounded top)
    pdf.setFillColor(255, 255, 255)
    pdf.rect(bc.x, bc.y, bc.w, 23, 'F')

    // Logo (white background — original colors)
    if (logoDataUrl) {
      const logoW = 52, logoH = 16
      pdf.addImage(logoDataUrl, 'PNG', bc.x + (bc.w - logoW) / 2, bc.y + 4, logoW, logoH, '', 'FAST')
    }

    // "EMPOWERING FUTURE TECH LEADERS" subtitle
    pdf.setFont('helvetica', 'bold')
    pdf.setFontSize(5.5)
    pdf.setTextColor(37, 99, 235)
    pdf.text('EMPOWERING FUTURE TECH LEADERS', bcx, bc.y + 21.5, { align: 'center' })

    // Blue divider
    pdf.setDrawColor(37, 99, 235)
    pdf.setLineWidth(0.7)
    pdf.line(bc.x, bc.y + 23.5, bc.x + bc.w, bc.y + 23.5)

    // Terms badge
    const badgeW = 46, badgeH = 6
    const badgeX = bcx - badgeW / 2
    pdf.setFillColor(37, 99, 235)
    pdf.roundedRect(badgeX, bc.y + 29, badgeW, badgeH, 1.5, 1.5, 'F')
    pdf.setFont('helvetica', 'bold')
    pdf.setFontSize(6)
    pdf.setTextColor(255, 255, 255)
    pdf.text('TERMS & CONDITIONS', bcx, bc.y + 33.5, { align: 'center' })

    // Terms list
    pdf.setFont('helvetica', 'normal')
    pdf.setFontSize(6.5)
    pdf.setTextColor(71, 85, 105)
    const terms = [
      '\u2022  This ID card is the property of Shine Tech Academy.',
      '\u2022  This card is non-transferable.',
      '\u2022  Report loss of this card immediately to management.',
      '\u2022  Return this card upon request or when no longer',
      '     associated with the academy.',
    ]
    let ty = bc.y + 42
    terms.forEach((t) => {
      pdf.text(t, bc.x + 6, ty)
      ty += 6.5
    })

    // QR Code
    if (qrCodeDataUrl) {
      pdf.addImage(qrCodeDataUrl, 'PNG', bc.x + 6, bc.y + 88, 22, 22, '', 'FAST')
    }

    // Signature
    pdf.setFont('helvetica', 'bold')
    pdf.setFontSize(12)
    pdf.setTextColor(30, 41, 59)
    pdf.text('Saad Ahsan', bc.x + bc.w - 6, bc.y + 98, { align: 'right' })
    pdf.setDrawColor(203, 213, 225)
    pdf.setLineWidth(0.3)
    pdf.line(bc.x + 36, bc.y + 101, bc.x + bc.w - 6, bc.y + 101)
    pdf.setFont('helvetica', 'bold')
    pdf.setFontSize(5.5)
    pdf.setTextColor(148, 163, 184)
    pdf.text('AUTHORIZED SIGNATURE', bc.x + bc.w - 6, bc.y + 105, { align: 'right' })

    // Dark footer
    pdf.setFillColor(17, 24, 39)
    pdf.roundedRect(bc.x, bc.y + bc.h - 17, bc.w, 17, 0, 4, 'F')
    pdf.setFillColor(17, 24, 39)
    pdf.rect(bc.x, bc.y + bc.h - 17, bc.w, 5, 'F')
    pdf.setFont('helvetica', 'normal')
    pdf.setFontSize(5.5)
    pdf.setTextColor(203, 213, 225)
    pdf.text('+92 300 1234567  \u2022  info@shinetechacademy.com', bcx, bc.y + bc.h - 10, { align: 'center' })
    pdf.setTextColor(148, 163, 184)
    pdf.text('Hyderabad, Sindh, Pakistan', bcx, bc.y + bc.h - 5, { align: 'center' })

    // ── Instructions ─────────────────────────────────────────────
    pdf.setDrawColor(226, 232, 240)
    pdf.setLineWidth(0.4)
    pdf.line(14, 172, 196, 172)

    pdf.setFont('helvetica', 'bold')
    pdf.setFontSize(10)
    pdf.setTextColor(37, 99, 235)
    pdf.text('IMPORTANT INSTRUCTIONS FOR STUDENTS', 14, 180)

    pdf.setFont('helvetica', 'normal')
    pdf.setFontSize(8.5)
    pdf.setTextColor(71, 85, 105)
    const instrLines = [
      '1.  This Admit Card is a mandatory document for entry into the Shine Tech Academy campus.',
      '2.  Please print this PDF on a high-quality standard A4 page or card stock.',
      '3.  Carry this card along with you to all classes, examinations, and events.',
      '4.  This Admit Card is digital, verified, and non-transferable.',
      '5.  The QR Code on the back can be scanned by management to verify your student status.',
      '6.  In case of loss, report immediately to the administration or contact info@shinetechacademy.com.',
    ]
    let iy = 189
    instrLines.forEach((l) => { pdf.text(l, 14, iy); iy += 7.5 })

    pdf.setFont('helvetica', 'bold')
    pdf.setFontSize(7)
    pdf.setTextColor(148, 163, 184)
    pdf.text('SHINE TECH ACADEMY  |  WWW.SHINETECHACADEMY.COM', 105, 282, { align: 'center' })

    return pdf
  }

  // Auto upload PDF admit card on mount
  useEffect(() => {
    const uploadAdmitCard = async () => {
      if (!appId || !qrCodeDataUrl || !logoDataUrl) return
      setUploading(true)
      try {
        await new Promise((resolve) => setTimeout(resolve, 600))
        const pdf = buildAdmitCardPDF()
        const pdfBlob = pdf.output('blob')
        const fileName = `AdmitCard_${appId}.pdf`

        const { error: uploadError } = await supabase.storage
          .from('admit-cards')
          .upload(fileName, pdfBlob, { contentType: 'application/pdf', upsert: true })

        if (uploadError) throw uploadError

        const { data: publicUrlData } = supabase.storage.from('admit-cards').getPublicUrl(fileName)
        const publicUrl = publicUrlData?.publicUrl || ''

        await supabase.from('admissions').update({ admit_card_url: publicUrl }).eq('app_id', appId)
        // console.log('Admit Card uploaded successfully:', publicUrl)
      } catch (err) {
        console.error('Error generating/uploading PDF:', err)
      } finally {
        setUploading(false)
      }
    }
    uploadAdmitCard()
  }, [appId, qrCodeDataUrl, logoDataUrl])

  const handleDownload = async () => {
    setDownloading(true)
    try {
      const pdf = buildAdmitCardPDF()
      pdf.save(`STA_AdmitCard_${appId}.pdf`)
    } catch (err) {
      console.error(err)
      alert('Failed to generate PDF: ' + err.message)
    } finally {
      setDownloading(false)
    }
  }


  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 z-50 bg-slate-900/80 backdrop-blur-md"
      style={{ overflowY: 'auto', overflowX: 'hidden', display: 'flex', alignItems: 'flex-start', justifyContent: 'center', padding: '12px' }}
    >
      <motion.div
        initial={{ scale: 0.95, y: 20 }}
        animate={{ scale: 1, y: 0 }}
        exit={{ scale: 0.95, y: 20 }}
        className="bg-white rounded-3xl shadow-2xl max-w-4xl w-full border border-slate-100 relative z-[1000] max-h-[92vh] overflow-hidden"
        style={{ margin: 'auto' }}
      >
        <div className="p-4 sm:p-6 lg:p-8 max-h-[92vh] overflow-y-auto">
        {/* Success Alert Header */}
        <div className="text-center mb-8">
          <div className="w-14 h-14 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4 text-green-600">
            <CheckCircle className="w-8 h-8" />
          </div>
          <h3 className="font-space font-extrabold text-slate-900 text-2xl mb-1">Admission Submitted!</h3>
          <p className="text-slate-500 text-sm max-w-md mx-auto">
            Your admission request has been sent successfully. Your digital student admit card is ready.
          </p>
        </div>

        {/* ID Cards Preview Container — dynamically scaled to always fit the screen */}
        <div ref={cardsOuterRef} className="w-full flex justify-center" style={{ marginBottom: '24px' }}>
        <div
          ref={cardsInnerRef}
          className="flex flex-col sm:flex-row items-center sm:items-start justify-center gap-6"
          style={{ transform: `scale(${cardScale})`, transformOrigin: 'top center', width: 'max-content', marginBottom: cardsMarginBottom }}
        >
          
          {/* FRONT CARD */}
          <div className="flex flex-col items-center gap-3">
            <span className="text-xs font-bold text-slate-400 uppercase tracking-wider">Card Front</span>
            <div
              ref={frontCardRef}
              style={{
                width: '280px',
                height: '443px',
                borderRadius: '24px',
                border: '1px solid #cbd5e1',
                boxShadow: '0 10px 15px -3px rgba(0, 0, 0, 0.1)',
                position: 'relative',
                overflow: 'hidden',
                backgroundColor: '#ffffff',
                display: 'flex',
                flexDirection: 'column',
                fontFamily: 'sans-serif',
                minWidth: '280px',
                minHeight: '443px',
                boxSizing: 'border-box'
              }}
            >
              {/* Tech background lines */}
              <div style={{ position: 'absolute', inset: 0, opacity: 0.04, pointerEvents: 'none', backgroundImage: 'radial-gradient(#0956fc 1px, transparent 1px)', backgroundSize: '16px 16px' }} />
              
              {/* Header Logo */}
              <div style={{ paddingTop: '18px', paddingLeft: '20px', paddingRight: '20px', display: 'flex', flexDirection: 'column', alignItems: 'center', position: 'relative', zIndex: 10 }}>
                {logoDataUrl ? (
                  <img src={logoDataUrl} alt="STA Logo" style={{ height: '52px', width: 'auto', objectFit: 'contain' }} />
                ) : (
                  <div style={{ height: '52px', width: '120px', backgroundColor: '#f1f5f9', borderRadius: '6px' }} />
                )}
              </div>

              {/* Student Photo */}
              <div style={{ marginTop: '24px', display: 'flex', justifyContent: 'center', position: 'relative', zIndex: 10 }}>
                <svg width="105" height="105" viewBox="0 0 105 105" style={{ display: 'block', filter: 'drop-shadow(0px 1px 3px rgba(0,0,0,0.1))' }}>
                  <defs>
                    <clipPath id="avatarClip">
                      <circle cx="52.5" cy="52.5" r="48" />
                    </clipPath>
                  </defs>
                  {/* White background circle */}
                  <circle cx="52.5" cy="52.5" r="49" fill="#ffffff" />
                  
                  {/* Clipped Student Image */}
                  <image
                    href={form.photoPreview || defaultAvatar}
                    x="4.5"
                    y="4.5"
                    width="96"
                    height="96"
                    clipPath="url(#avatarClip)"
                    preserveAspectRatio="xMidYMid slice"
                  />
                  
                  {/* Outer Blue Border (drawn on top of the image to perfectly cover any edge issues) */}
                  <circle cx="52.5" cy="52.5" r="49" fill="none" stroke="#2563eb" strokeWidth="3" />
                </svg>
              </div>

              {/* Name & Title */}
              <div style={{ marginTop: '16px', textAlign: 'center', paddingLeft: '16px', paddingRight: '16px', position: 'relative', zIndex: 10, flex: 1, display: 'flex', flexDirection: 'column' }}>
                <h4 style={{ fontFamily: 'Arial, Helvetica, sans-serif', fontWeight: 800, fontSize: '17px', color: '#0f172a', lineHeight: 1.2, margin: 0 }}>{form.fullName}</h4>
                <p style={{ color: '#2563eb', fontWeight: 'bold', fontSize: '11px', marginTop: '2px', textTransform: 'uppercase', letterSpacing: '0.05em', margin: '2px 0 0 0' }}>{primaryCourseName}</p>

                {/* Details list */}
                <div style={{ marginTop: '20px', textAlign: 'left', display: 'flex', flexDirection: 'column', gap: '7px', paddingLeft: '12px', paddingRight: '12px' }}>
                  <div style={{ display: 'flex', alignItems: 'center', fontSize: '10px' }}>
                    <span style={{ display: 'inline-block', minWidth: '78px', color: '#94a3b8', fontWeight: 'bold', textTransform: 'uppercase', flexShrink: 0 }}>ID Number</span>
                    <span style={{ color: '#94a3b8', fontWeight: 'bold', marginRight: '5px', flexShrink: 0 }}>:</span>
                    <span style={{ fontFamily: 'Arial, Helvetica, sans-serif', fontWeight: 'bold', color: '#1e293b' }}>{appId}</span>
                  </div>
                  <div style={{ display: 'flex', alignItems: 'center', fontSize: '10px' }}>
                    <span style={{ display: 'inline-block', minWidth: '78px', color: '#94a3b8', fontWeight: 'bold', textTransform: 'uppercase', flexShrink: 0 }}>Department</span>
                    <span style={{ color: '#94a3b8', fontWeight: 'bold', marginRight: '5px', flexShrink: 0 }}>:</span>
                    <span style={{ fontWeight: 'bold', color: '#1e293b' }}>Technology</span>
                  </div>
                  <div style={{ display: 'flex', alignItems: 'center', fontSize: '10px' }}>
                    <span style={{ display: 'inline-block', minWidth: '78px', color: '#94a3b8', fontWeight: 'bold', textTransform: 'uppercase', flexShrink: 0 }}>Email</span>
                    <span style={{ color: '#94a3b8', fontWeight: 'bold', marginRight: '5px', flexShrink: 0 }}>:</span>
                    <span style={{ fontWeight: 'bold', color: '#1e293b', fontSize: '9px', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis', flex: 1 }}>{form.email}</span>
                  </div>
                  <div style={{ display: 'flex', alignItems: 'center', fontSize: '10px' }}>
                    <span style={{ display: 'inline-block', minWidth: '78px', color: '#94a3b8', fontWeight: 'bold', textTransform: 'uppercase', flexShrink: 0 }}>Phone</span>
                    <span style={{ color: '#94a3b8', fontWeight: 'bold', marginRight: '5px', flexShrink: 0 }}>:</span>
                    <span style={{ fontWeight: 'bold', color: '#1e293b' }}>{form.phone}</span>
                  </div>
                </div>
              </div>

              {/* Bottom Curved Wave and Tag */}
              <div style={{ marginTop: 'auto', position: 'relative', zIndex: 10, height: '56px', background: 'linear-gradient(135deg, #2563eb, #1d4ed8)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                <span style={{ color: '#ffffff', fontFamily: 'Arial, Helvetica, sans-serif', fontWeight: 800, fontSize: '9px', textTransform: 'uppercase', letterSpacing: '0.15em' }}>
                  EMPOWERING FUTURE TECH LEADERS
                </span>
              </div>
            </div>
          </div>

          {/* BACK CARD */}
          <div className="flex flex-col items-center gap-3">
            <span className="text-xs font-bold text-slate-400 uppercase tracking-wider">Card Back</span>
            <div
              ref={backCardRef}
              style={{
                width: '280px',
                height: '443px',
                borderRadius: '24px',
                border: '1px solid #cbd5e1',
                boxShadow: '0 10px 15px -3px rgba(0, 0, 0, 0.1)',
                position: 'relative',
                overflow: 'hidden',
                backgroundColor: '#ffffff',
                display: 'flex',
                flexDirection: 'column',
                fontFamily: 'sans-serif',
                justifyContent: 'space-between',
                minWidth: '280px',
                minHeight: '443px',
                boxSizing: 'border-box'
              }}
            >
              {/* Top header - white background so logo is visible */}
              <div style={{ backgroundColor: '#ffffff', paddingTop: '16px', paddingBottom: '14px', paddingLeft: '20px', paddingRight: '20px', textAlign: 'center', position: 'relative', zIndex: 10, display: 'flex', flexDirection: 'column', alignItems: 'center', borderBottom: '2px solid #2563eb' }}>
                {logoDataUrl ? (
                  <img src={logoDataUrl} alt="STA Logo" style={{ height: '42px', width: 'auto', objectFit: 'contain' }} />
                ) : (
                  <div style={{ height: '42px', width: '100px', backgroundColor: '#f1f5f9', borderRadius: '6px' }} />
                )}
                <span style={{ fontSize: '7px', fontWeight: 'bold', color: '#2563eb', textTransform: 'uppercase', letterSpacing: '0.05em', marginTop: '6px' }}>
                  EMPOWERING FUTURE TECH LEADERS
                </span>
              </div>

              {/* Terms & Conditions */}
              <div style={{ paddingLeft: '24px', paddingRight: '24px', flex: 1, display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center' }}>
                <span style={{ fontSize: '9px', fontWeight: 800, color: '#ffffff', backgroundColor: '#2563eb', padding: '4px 12px', borderRadius: '6px', textTransform: 'uppercase', letterSpacing: '0.05em', display: 'inline-block', marginBottom: '12px' }}>
                  Terms &amp; Conditions
                </span>
                <ul style={{ fontSize: '8px', color: '#64748b', margin: 0, paddingLeft: '14px', fontWeight: 600, lineHeight: 1.7, listStyleType: 'disc', width: '100%' }}>
                  <li>This ID card is the property of Shine Tech Academy.</li>
                  <li>This card is non-transferable.</li>
                  <li>Report loss of this card immediately to management.</li>
                  <li>Return this card upon request or when no longer associated with the academy.</li>
                </ul>
              </div>

              {/* QR Code and Signature */}
              <div style={{ paddingLeft: '24px', paddingRight: '24px', paddingBottom: '16px', display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: '16px' }}>
                <div style={{ border: '1px solid #cbd5e1', padding: '4px', backgroundColor: '#ffffff', borderRadius: '8px', flexShrink: 0 }}>
                  {qrCodeDataUrl ? (
                    <img
                      src={qrCodeDataUrl}
                      alt="QR"
                      style={{ width: '64px', height: '64px', display: 'block' }}
                    />
                  ) : (
                    <div style={{ width: '64px', height: '64px', backgroundColor: '#f1f5f9', borderRadius: '4px' }} />
                  )}
                </div>
                <div style={{ textAlign: 'right', flex: 1, display: 'flex', flexDirection: 'column', justifyContent: 'flex-end', alignItems: 'flex-end' }}>
                  <div style={{ fontFamily: 'Arial, Helvetica, sans-serif', fontWeight: 'bold', color: '#1e293b', fontSize: '18px', opacity: 0.8, lineHeight: 1 }}>
                    Saad Ahsan
                  </div>
                  <div style={{ height: '1px', backgroundColor: '#e2e8f0', width: '96px', marginTop: '4px', marginBottom: '4px' }} />
                  <span style={{ fontSize: '8px', fontWeight: 'bold', color: '#94a3b8', textTransform: 'uppercase' }}>Authorized Signature</span>
                </div>
              </div>

              {/* Footer Block */}
              <div style={{ backgroundColor: '#111827', color: '#ffffff', paddingTop: '12px', paddingBottom: '12px', paddingLeft: '20px', paddingRight: '20px', textAlign: 'center', display: 'flex', flexDirection: 'column', gap: '4px', alignItems: 'center', justifyContent: 'center', fontSize: '8px', fontWeight: 600 }}>
                <span style={{ color: '#cbd5e1' }}>
                  +92 300 1234567 &bull; info@shinetechacademy.com
                </span>
                <span style={{ color: '#94a3b8', fontSize: '7.5px' }}>
                  Hyderabad, Sindh, Pakistan
                </span>
              </div>
            </div>
          </div>

        </div>
        </div>

        {/* Buttons / Actions */}
        <div className="flex flex-col sm:flex-row gap-3 pt-6 border-t border-slate-100">
          <button
            onClick={handleDownload}
            disabled={downloading}
            className="flex-1 flex items-center justify-center gap-2 bg-gradient-to-r from-blue-600 to-indigo-600 text-white font-bold text-sm py-3.5 rounded-xl hover:from-blue-700 hover:to-indigo-700 transition-all shadow-lg shadow-blue-500/20 disabled:opacity-50"
          >
            {downloading ? (
              <>
                <Loader className="w-4 h-4 animate-spin" /> Generating PDF...
              </>
            ) : (
              <>
                <FileText className="w-4 h-4" /> Download Admit Card PDF
              </>
            )}
          </button>
          
          <button
            onClick={onClose}
            className="sm:w-44 bg-slate-100 text-slate-700 font-bold text-sm py-3.5 rounded-xl hover:bg-slate-200 transition-colors"
          >
            Return to Home
          </button>
        </div>
        </div>
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

  useEffect(() => {
    window.scrollTo(0, 0)
  }, [])

  const [form, setForm] = useState({
    photo: null,
    photoPreview: '',
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
  const fileInputRef = useRef(null)

  const [errors, setErrors] = useState({})

  const validateStep = (s) => {
    let err = {}
    if (s === 0) {
      if (!form.fullName.trim()) err.fullName = 'Full Name is required'
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
      const newId = generateAppId()
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
      setSuccess(true)
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
        setForm((prev) => ({ ...prev, photo: file, photoPreview: reader.result }))
      }
      reader.readAsDataURL(file)
    }
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
                  className="w-24 h-24 rounded-2xl border-2 border-dashed border-slate-300 hover:border-blue-500 bg-white flex flex-col items-center justify-center cursor-pointer overflow-hidden group transition-all duration-200 shadow-sm"
                >
                  {form.photoPreview ? (
                    <img src={form.photoPreview} alt="Student Photo" className="w-full h-full object-cover" />
                  ) : (
                    <>
                      <div className="w-10 h-10 rounded-full bg-blue-50 flex items-center justify-center text-blue-600 group-hover:scale-110 transition-transform">
                        <Camera className="w-5 h-5" />
                      </div>
                      <span className="text-[10px] font-bold text-slate-400 mt-1">Upload</span>
                    </>
                  )}
                </div>

                {form.photoPreview && (
                  <button
                    type="button"
                    onClick={handleRemovePhoto}
                    className="absolute -top-2 -right-2 w-6 h-6 bg-red-500 text-white rounded-full flex items-center justify-center text-xs shadow-md hover:bg-red-600 transition-colors"
                  >
                    ×
                  </button>
                )}
              </div>

              <div className="flex-1 text-center sm:text-left">
                <h4 className="font-bold text-slate-800 text-sm flex items-center justify-center sm:justify-start gap-1.5">
                  Student Passport Size Photo
                  <span className="text-[10px] font-semibold bg-blue-100 text-blue-700 px-2 py-0.5 rounded-full">Recommended</span>
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
              </div>
            </div>

            <FloatingInput
              label="Full Name"
              icon={User}
              value={form.fullName}
              onChange={(e) => setForm({ ...form, fullName: e.target.value })}
              error={errors.fullName}
            />
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
                    <p className="text-xs font-bold text-slate-800">Attached ✓</p>
                  </div>
                </div>
              )}
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

      {success && <SuccessModal appId={appId} form={form} onClose={onBack} />}

      <style>{`
        input[type="date"]::-webkit-calendar-picker-indicator,
        input[type="number"]::-webkit-inner-spin-button {
          opacity: 0.5;
        }
      `}</style>
    </>
  )
}