import { useState, useEffect, useRef } from 'react'
import TopBanner from './components/TopBanner'
import Navbar from './components/Navbar'
import Hero from './components/Hero'
import Stats from './components/Stats'
import Courses from './components/Courses'
import WhySTA from './components/WhySTA'
import Admission from './components/Admission'
import Instructors from './components/Instructors'
import LearningJourney from './components/LearningJourney'
import Internship from './components/Internship'
import Testimonials from './components/Testimonials'
import Gallery from './components/Gallery'
import UpcomingEvent from './components/UpcomingEvent'
import FAQ from './components/FAQ'
import CTASection from './components/CTASection'
import Contact from './components/Contact'
import Footer from './components/Footer'
import AdmissionForm from './components/AdmissionForm'

/* ─── Interactive Constellation Background ──────────────────
   Highly optimized vanilla JS Canvas Constellation.
   Beautiful royal blue nodes & connecting lines for Light Mode.
────────────────────────────────────────────────────────── */
function ConstellationBackground() {
  const canvasRef = useRef(null)

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return
    const ctx = canvas.getContext('2d')

    let particles = []
    let animId
    
    const mouse = {
      x: null,
      y: null,
      radius: 180
    }

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
      const particleCount = Math.min(60, Math.floor((window.innerWidth * window.innerHeight) / 20000))
      particles = []
      for (let i = 0; i < particleCount; i++) {
        particles.push({
          x: Math.random() * canvas.width,
          y: Math.random() * canvas.height,
          r: Math.random() * 2 + 1,
          vx: (Math.random() - 0.5) * 0.4,
          vy: (Math.random() - 0.5) * 0.4,
          alpha: Math.random() * 0.5 + 0.2,
        })
      }
    }
    setupParticles()

    const draw = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height)
      const lineColor = '9, 86, 252' // Classic Blue

      // 1. Draw connections
      for (let i = 0; i < particles.length; i++) {
        const p1 = particles[i]

        for (let j = i + 1; j < particles.length; j++) {
          const p2 = particles[j]
          const dx = p1.x - p2.x
          const dy = p1.y - p2.y
          const dist = Math.sqrt(dx * dx + dy * dy)

          if (dist < 130) {
            const opacity = (1 - dist / 130) * 0.12
            ctx.beginPath()
            ctx.strokeStyle = `rgba(${lineColor}, ${opacity})`
            ctx.lineWidth = 0.8
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
            const opacity = (1 - distMouse / mouse.radius) * 0.25
            ctx.beginPath()
            ctx.strokeStyle = `rgba(${lineColor}, ${opacity})`
            ctx.lineWidth = 1.0
            ctx.moveTo(p1.x, p1.y)
            ctx.lineTo(mouse.x, mouse.y)
            ctx.stroke()
          }
        }
      }

      // 2. Draw nodes
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

/* ─── Ambient Glow Background ───────────────────────────────── */
function AmbientBackground() {
  return (
    <div
      style={{
        position: 'fixed',
        inset: 0,
        zIndex: 0,
        pointerEvents: 'none',
        overflow: 'hidden',
      }}
    >
      <div className="bg-orb bg-orb-1" />
      <div className="bg-orb bg-orb-2 animate-pulse" />
      <div className="bg-orb bg-orb-3" />
    </div>
  )
}

function App() {
  const [showForm, setShowForm] = useState(false)

  useEffect(() => {
    const checkHash = () => setShowForm(window.location.hash === '#apply')
    checkHash()
    window.addEventListener('hashchange', checkHash)
    return () => window.removeEventListener('hashchange', checkHash)
  }, [])

  const openForm = () => {
    window.location.hash = '#apply'
    setShowForm(true)
  }

  const closeForm = () => {
    window.location.hash = ''
    setShowForm(false)
  }

  if (showForm) {
    return <AdmissionForm onBack={closeForm} />
  }

  return (
    <div className="min-h-screen bg-white text-slate-900 transition-colors duration-500 relative">
      {/* Remove html dark class on mount to ensure light mode only */}
      <ThemeLightModeEnforcer />

      {/* ── Constellation overlay ── */}
      <ConstellationBackground />

      {/* ── Ambient background orbs ── */}
      <AmbientBackground />

      {/* ── Page content ── */}
      <div style={{ position: 'relative', zIndex: 1 }}>
        <Navbar onApply={openForm} />
        <TopBanner />

        <main>
          <Hero onApply={openForm} />
          <Stats />
          <Courses />
          <WhySTA />
          <Admission />
          <Instructors />
          <LearningJourney />
          <Internship />
          <Testimonials />
          <Gallery />
          <UpcomingEvent />
          <FAQ />
          <CTASection />
          <Contact />
        </main>

        <Footer />
      </div>
    </div>
  )
}

// Small helper component to ensure html has no 'dark' class
function ThemeLightModeEnforcer() {
  useEffect(() => {
    document.documentElement.classList.remove('dark')
    localStorage.removeItem('theme')
  }, [])
  return null
}

export default App