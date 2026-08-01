import { useState, useRef, useEffect } from 'react'
import { motion } from 'framer-motion'
import { supabase } from '../lib/supabase'
import { jsPDF } from 'jspdf'
import { CheckCircle, Loader, FileText } from 'lucide-react'

const COURSE_TITLES = {
  web: 'Web Development',
  mobile: 'Mobile App Development',
  uiux: 'UI/UX Design',
  graphic: 'Graphic Designing',
  marketing: 'Digital Marketing',
  freelance: 'Freelancing & Entrepreneurship',
  other: 'Other Course',
}

export default function SuccessModal({ appId, form, onClose, primaryCourseName }) {
  // Resolve course ID to title if needed
  const courseTitle = COURSE_TITLES[primaryCourseName] || primaryCourseName || 'Tech Program'
  const [downloading, setDownloading] = useState(false)
  const [uploading, setUploading] = useState(false)
  const [qrCodeDataUrl, setQrCodeDataUrl] = useState('')
  const [logoDataUrl, setLogoDataUrl] = useState('')
  const frontCardRef = useRef(null)
  const backCardRef = useRef(null)

  // ── Responsive card scaling ─────────────────────────────────────
  const cardsOuterRef = useRef(null)
  const cardsInnerRef = useRef(null)
  const [cardScale, setCardScale] = useState(1)
  const [cardsMarginBottom, setCardsMarginBottom] = useState(0)

  useEffect(() => {
    const inner = cardsInnerRef.current
    const outer = cardsOuterRef.current
    if (!inner || !outer) return

    const recalcScale = () => {
      const naturalWidth = inner.scrollWidth
      const naturalHeight = inner.scrollHeight
      const availableWidth = outer.clientWidth
      const scale = naturalWidth > 0 ? Math.min(1, availableWidth / naturalWidth) : 1
      setCardScale(scale)
      setCardsMarginBottom(-(naturalHeight * (1 - scale)))
    }

    recalcScale()
    window.addEventListener('resize', recalcScale)
    const resizeObserver = new ResizeObserver(recalcScale)
    resizeObserver.observe(inner)

    return () => {
      window.removeEventListener('resize', recalcScale)
      resizeObserver.disconnect()
    }
  }, [])

  // Standard safe base64-encoded SVG default avatar
  const defaultAvatar = "data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHZpZXdCb3g9IjAgMCAyNCAyNCIgZmlsbD0iIzExMTgyNyI+PHBhdGggZD0iTTEyIDJDNi40OCAyIDIgNi40OCAyIDEyczQuNDggMTAgMTAgMTAgMTAtNC40OCAxMC0xMFMxNy41MiAyIDEyIDJ6bTAgM2MxLjY2IDAgMyAxLjM0IDMgM3MtMS4zNCAzLTMgMy0zLTEuMzQtMy0zIDEuMzQtMyAzLTN6bTAgMTQuMmMtMi41IDAtNC43MS0xLjI4LTYtMy4yMi4wMy0xLjk5IDQtMy4wOCA2LTMuMDggMS45OSAwIDUuOTcgMS4wOSA2IDMuMDgtMS4yOSAxLjk0LTMuNSAgMy4yMi02IDMuMjJ6Ii8+PC9zdmc+"

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

    // Student Photo
    const cx = fc.x + fc.w / 2
    const photoTop = fc.y + 24
    const r = 14
    pdf.setFillColor(37, 99, 235)
    pdf.circle(cx, photoTop + r, r + 1.5, 'F')
    pdf.setFillColor(255, 255, 255)
    pdf.circle(cx, photoTop + r, r, 'F')
    if (form.photoPreview) {
      pdf.saveGraphicsState()
      pdf.circle(cx, photoTop + r, r - 0.5, null)
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
    pdf.text(courseTitle.toUpperCase(), cx, nameY + 6, { align: 'center' })

    // Details table
    const detailRows = [
      { label: 'ID NUMBER',   value: appId },
      { label: 'FATHER NAME', value: form.fatherName || '—' },
      { label: 'DEPARTMENT',  value: 'Technology' },
      { label: 'EMAIL',       value: form.email.length > 25 ? form.email.slice(0, 23) + '..' : form.email },
      { label: 'PHONE',       value: form.phone },
    ]

    pdf.setFont('helvetica', 'bold')
    pdf.setFontSize(7)
    const labelColW = 26
    const colonGap = 4
    let maxValueW = 0
    detailRows.forEach((r) => {
      const w = pdf.getTextWidth(r.value)
      if (w > maxValueW) maxValueW = w
    })
    const detailBlockWidth = labelColW + colonGap + maxValueW
    const lx = cx - detailBlockWidth / 2
    const kx = lx + labelColW
    const vx = kx + colonGap

    let dy = nameY + 14
    const rowGap = 8.5
    detailRows.forEach((r) => {
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

    // White header bg
    pdf.setFillColor(255, 255, 255)
    pdf.rect(bc.x, bc.y, bc.w, 23, 'F')

    // Logo
    if (logoDataUrl) {
      const logoW = 52, logoH = 16
      pdf.addImage(logoDataUrl, 'PNG', bc.x + (bc.w - logoW) / 2, bc.y + 4, logoW, logoH, '', 'FAST')
    }

    // Subtitle
    pdf.setFont('helvetica', 'bold')
    pdf.setFontSize(5.5)
    pdf.setTextColor(37, 99, 235)
    pdf.text('EMPOWERING FUTURE TECH LEADERS', bcx, bc.y + 21.5, { align: 'center' })

    // Blue divider
    pdf.setDrawColor(37, 99, 235)
    pdf.setLineWidth(0.7)
    pdf.line(bc.x, bc.y + 23.5, bc.x + bc.w, bc.y + 23.5)

    // Terms
    const termsSectionTop = bc.y + 23.5
    const termsSectionBottom = bc.y + 88
    const availableH = termsSectionBottom - termsSectionTop

    const badgeW = 46, badgeH = 6
    const gapBadgeToList = 8
    const lineGap = 6.5
    const textLineH = 3
    const terms = [
      '\u2022  This ID card is the property of Shine Tech Academy.',
      '\u2022  This card is non-transferable.',
      '\u2022  Report loss of this card immediately to management.',
      '\u2022  Return this card upon request or when no longer',
      '     associated with the academy.',
    ]
    const listH = (terms.length - 1) * lineGap + textLineH
    const contentH = badgeH + gapBadgeToList + listH
    const blockStartY = termsSectionTop + (availableH - contentH) / 2

    // Terms badge
    const badgeX = bcx - badgeW / 2
    const badgeY = blockStartY
    pdf.setFillColor(37, 99, 235)
    pdf.roundedRect(badgeX, badgeY, badgeW, badgeH, 1.5, 1.5, 'F')
    pdf.setFont('helvetica', 'bold')
    pdf.setFontSize(6)
    pdf.setTextColor(255, 255, 255)
    pdf.text('TERMS & CONDITIONS', bcx, badgeY + badgeH / 2 + 0.75, { align: 'center' })

    // Terms list
    pdf.setFont('helvetica', 'normal')
    pdf.setFontSize(6.5)
    pdf.setTextColor(71, 85, 105)
    let ty = badgeY + badgeH + gapBadgeToList
    terms.forEach((t) => {
      pdf.text(t, bc.x + 6, ty)
      ty += lineGap
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
      className="fixed inset-0 z-50 bg-slate-900/80 backdrop-blur-md overflow-hidden flex items-start justify-center p-3 sm:p-6"
    >
      <motion.div
        initial={{ scale: 0.95, y: 20 }}
        animate={{ scale: 1, y: 0 }}
        exit={{ scale: 0.95, y: 20 }}
        className="bg-white rounded-3xl shadow-2xl max-w-4xl w-full border border-slate-100 relative z-[1000] flex flex-col overflow-hidden"
        style={{ maxHeight: '95vh', margin: 'auto' }}
      >
        <div className="p-4 sm:p-6 lg:p-8 overflow-y-auto flex-1">
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

          {/* ID Cards Preview Container */}
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
                  <div style={{ position: 'absolute', inset: 0, opacity: 0.04, pointerEvents: 'none', backgroundImage: 'radial-gradient(#0956fc 1px, transparent 1px)', backgroundSize: '16px 16px' }} />
                  
                  <div style={{ paddingTop: '18px', paddingLeft: '20px', paddingRight: '20px', display: 'flex', flexDirection: 'column', alignItems: 'center', position: 'relative', zIndex: 10 }}>
                    {logoDataUrl ? (
                      <img src={logoDataUrl} alt="STA Logo" style={{ height: '52px', width: 'auto', objectFit: 'contain' }} />
                    ) : (
                      <div style={{ height: '52px', width: '120px', backgroundColor: '#f1f5f9', borderRadius: '6px' }} />
                    )}
                  </div>

                  <div style={{ marginTop: '24px', display: 'flex', justifyContent: 'center', position: 'relative', zIndex: 10 }}>
                    <svg width="105" height="105" viewBox="0 0 105 105" style={{ display: 'block', filter: 'drop-shadow(0px 1px 3px rgba(0,0,0,0.1))' }}>
                      <defs>
                        <clipPath id="avatarClip">
                          <circle cx="52.5" cy="52.5" r="48" />
                        </clipPath>
                      </defs>
                      <circle cx="52.5" cy="52.5" r="49" fill="#ffffff" />
                      <image
                        href={form.photoPreview || defaultAvatar}
                        x="4.5"
                        y="4.5"
                        width="96"
                        height="96"
                        clipPath="url(#avatarClip)"
                        preserveAspectRatio="xMidYMid slice"
                      />
                      <circle cx="52.5" cy="52.5" r="49" fill="none" stroke="#2563eb" strokeWidth="3" />
                    </svg>
                  </div>

                  <div style={{ marginTop: '16px', textAlign: 'center', paddingLeft: '16px', paddingRight: '16px', position: 'relative', zIndex: 10, flex: 1, display: 'flex', flexDirection: 'column' }}>
                    <h4 style={{ fontFamily: 'Arial, Helvetica, sans-serif', fontWeight: 800, fontSize: '17px', color: '#0f172a', lineHeight: 1.2, margin: 0 }}>{form.fullName}</h4>
                    <p style={{ color: '#2563eb', fontWeight: 'bold', fontSize: '11px', marginTop: '2px', textTransform: 'uppercase', letterSpacing: '0.05em', margin: '2px 0 0 0' }}>{courseTitle}</p>

                    <div style={{ marginTop: '20px', textAlign: 'left', display: 'flex', flexDirection: 'column', gap: '7px', width: 'fit-content', maxWidth: '100%', alignSelf: 'center' }}>
                      <div style={{ display: 'flex', alignItems: 'center', fontSize: '10px' }}>
                        <span style={{ display: 'inline-block', minWidth: '78px', color: '#94a3b8', fontWeight: 'bold', textTransform: 'uppercase', flexShrink: 0 }}>ID Number</span>
                        <span style={{ color: '#94a3b8', fontWeight: 'bold', marginRight: '5px', flexShrink: 0 }}>:</span>
                        <span style={{ fontFamily: 'Arial, Helvetica, sans-serif', fontWeight: 'bold', color: '#1e293b' }}>{appId}</span>
                      </div>
                      <div style={{ display: 'flex', alignItems: 'center', fontSize: '10px' }}>
                        <span style={{ display: 'inline-block', minWidth: '78px', color: '#94a3b8', fontWeight: 'bold', textTransform: 'uppercase', flexShrink: 0 }}>Father Name</span>
                        <span style={{ color: '#94a3b8', fontWeight: 'bold', marginRight: '5px', flexShrink: 0 }}>:</span>
                        <span style={{ fontWeight: 'bold', color: '#1e293b' }}>{form.fatherName || '—'}</span>
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

                  <div style={{ paddingLeft: '24px', paddingRight: '24px', flex: 1, display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center' }}>
                    <span style={{ fontSize: '9px', fontWeight: 800, color: '#ffffff', backgroundColor: '#2563eb', padding: '4px 12px', borderRadius: '6px', textTransform: 'uppercase', letterSpacing: '0.05em', display: 'inline-flex', alignItems: 'center', justifyContent: 'center', lineHeight: 1, marginBottom: '12px' }}>
                      <span style={{ position: 'relative', top: '-1px' }}>Terms &amp; Conditions</span>
                    </span>
                    <ul style={{ fontSize: '8px', color: '#64748b', margin: 0, paddingLeft: '14px', fontWeight: 600, lineHeight: 1.7, listStyleType: 'disc', width: '100%' }}>
                      <li>This ID card is the property of Shine Tech Academy.</li>
                      <li>This card is non-transferable.</li>
                      <li>Report loss of this card immediately to management.</li>
                      <li>Return this card upon request or when no longer associated with the academy.</li>
                    </ul>
                  </div>

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
        </div>

        {/* Buttons / Actions */}
        <div className="flex flex-col sm:flex-row gap-3 pt-6 border-t border-slate-100 p-8 bg-slate-50">
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
            className="sm:w-44 bg-white border border-slate-200 text-slate-700 font-bold text-sm py-3.5 rounded-xl hover:bg-slate-50 transition-colors"
          >
            Return to Home
          </button>
        </div>
      </motion.div>
    </motion.div>
  )
}
