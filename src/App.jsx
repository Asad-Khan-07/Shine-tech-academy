import { useState, useEffect } from 'react'
import { HashRouter as Router, Routes, Route, useNavigate, useLocation } from 'react-router-dom'
import ComingSoon from './pages/ComingSoon'
import { AnimatePresence } from 'framer-motion'

/* ─── Ambient Glow Background ───────────────────────────────── */
function AmbientBackground() {
  return (
    <div
      aria-hidden
      style={{
        position: 'fixed',
        inset: 0,
        zIndex: 0,
        pointerEvents: 'none',
        background:
          'radial-gradient(ellipse 70% 50% at 50% -10%, rgba(9,86,252,0.05) 0%, transparent 60%)',
      }}
    />
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

function MainApp() {
  return (
    <div className="min-h-screen bg-white text-slate-900 transition-colors duration-500 relative">
      <ThemeLightModeEnforcer />
      <AmbientBackground />
      <div style={{ position: 'relative', zIndex: 10 }}>
        <Routes>
          <Route path="*" element={<ComingSoon />} />
        </Routes>
      </div>
    </div>
  )
}

export default function App() {
  return (
    <Router>
      <MainApp />
    </Router>
  )
}