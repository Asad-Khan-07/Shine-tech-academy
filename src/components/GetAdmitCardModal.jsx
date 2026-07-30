import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { X, Download, Search, CreditCard, AlertCircle, CheckCircle, Loader } from 'lucide-react'
import { supabase } from '../lib/supabase'

export default function GetAdmitCardModal({ onClose }) {
  const [idInput, setIdInput] = useState('')
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')
  const [found, setFound] = useState(null)

  const handleSearch = async (e) => {
    e.preventDefault()
    const trimmed = idInput.trim()
    if (!trimmed) { setError('Please enter your Student ID or Email.'); return }

    setLoading(true)
    setError('')
    setFound(null)

    try {
      const isEmail = /\S+@\S+\.\S+/.test(trimmed)
      let query = supabase
        .from('admissions')
        .select('full_name, admit_card_url, app_id')

      if (isEmail) {
        query = query.ilike('email', trimmed)
      } else {
        query = query.eq('app_id', trimmed.toUpperCase())
      }

      const { data, error: dbError } = await query

      if (dbError || !data || data.length === 0) {
        setError('No record found. Please check and try again.')
        return
      }
      setFound(data[0])
    } catch {
      setError('Something went wrong. Please try again.')
    } finally {
      setLoading(false)
    }
  }

  const handleDownload = () => {
    if (!found?.admit_card_url) {
      setError('Admit card file is not yet available. Please contact support.')
      return
    }
    const link = document.createElement('a')
    link.href = found.admit_card_url
    link.download = `STA_AdmitCard_${found.app_id}.pdf`
    link.target = '_blank'
    link.rel = 'noopener noreferrer'
    document.body.appendChild(link)
    link.click()
    document.body.removeChild(link)
  }

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 z-[9999] bg-slate-900/60 backdrop-blur-sm flex items-center justify-center px-4"
      onClick={(e) => { if (e.target === e.currentTarget) onClose() }}
    >
      <motion.div
        initial={{ opacity: 0, scale: 0.92, y: 20 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        exit={{ opacity: 0, scale: 0.92, y: 20 }}
        transition={{ duration: 0.2, ease: 'easeOut' }}
        className="bg-white rounded-3xl shadow-2xl w-full max-w-md border border-slate-100 overflow-hidden"
      >
        {/* Header */}
        <div className="bg-gradient-to-br from-blue-600 to-blue-700 px-7 pt-7 pb-8 relative">
          <button
            onClick={onClose}
            className="absolute top-4 right-4 text-white/70 hover:text-white transition-colors p-1.5 hover:bg-white/10 rounded-full"
          >
            <X className="w-5 h-5" />
          </button>
          <div className="w-12 h-12 bg-white/15 rounded-2xl flex items-center justify-center mb-4">
            <CreditCard className="w-6 h-6 text-white" />
          </div>
          <h2 className="text-white font-bold text-xl font-space">Get Your Admit Card</h2>
          <p className="text-blue-100 text-sm mt-1">
            Enter your Student ID or Email to retrieve and download your admit card.
          </p>
        </div>

        {/* Body */}
        <div className="px-7 py-6 flex flex-col gap-5">

          {!found && (
            <form onSubmit={handleSearch} className="flex flex-col gap-4">
              <div>
                <label className="block text-xs font-bold text-slate-500 uppercase tracking-wider mb-2">
                  Student ID or Email Address
                </label>
                <div className="relative">
                  <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400 pointer-events-none" />
                  <input
                    type="text"
                    value={idInput}
                    onChange={(e) => { setIdInput(e.target.value); setError('') }}
                    placeholder="e.g. STA-32130 or hh@gmail.com"
                    className="w-full pl-10 pr-4 py-3.5 border border-slate-200 rounded-xl text-sm text-slate-900 outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-100 transition-all bg-slate-50 font-mono tracking-wider"
                  />
                </div>
                {error && (
                  <motion.div
                    initial={{ opacity: 0, y: -5 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="flex items-center gap-2 mt-2.5 text-red-500 text-xs"
                  >
                    <AlertCircle className="w-3.5 h-3.5 flex-shrink-0" />
                    <span>{error}</span>
                  </motion.div>
                )}
              </div>

              <motion.button
                type="submit"
                disabled={loading}
                whileHover={!loading ? { scale: 1.02, y: -1 } : {}}
                whileTap={!loading ? { scale: 0.97 } : {}}
                className="btn-primary w-full py-3.5 rounded-xl text-sm font-bold flex items-center justify-center gap-2 disabled:opacity-60 disabled:cursor-not-allowed shadow-lg shadow-blue-500/25"
              >
                {loading ? (
                  <><Loader className="w-4 h-4 animate-spin" /> Searching...</>
                ) : (
                  <><Search className="w-4 h-4" /> Find My Card</>
                )}
              </motion.button>
            </form>
          )}

          {found && (
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              className="flex flex-col gap-4"
            >
              <div className="flex items-start gap-3 bg-emerald-50 border border-emerald-200 rounded-2xl px-4 py-3.5">
                <CheckCircle className="w-5 h-5 text-emerald-500 flex-shrink-0 mt-0.5" />
                <div>
                  <p className="text-emerald-800 font-bold text-sm">Record Found!</p>
                  <p className="text-emerald-600 text-xs mt-0.5">
                    Student: <span className="font-semibold">{found.full_name}</span>
                  </p>
                  <p className="text-emerald-600 text-xs">
                    ID: <span className="font-mono font-semibold">{found.app_id}</span>
                  </p>
                </div>
              </div>

              <motion.button
                onClick={handleDownload}
                whileHover={{ scale: 1.02, y: -1 }}
                whileTap={{ scale: 0.97 }}
                className="btn-primary w-full py-3.5 rounded-xl text-sm font-bold flex items-center justify-center gap-2 shadow-lg shadow-blue-500/25"
              >
                <Download className="w-4 h-4" />
                Download Admit Card PDF
              </motion.button>

              {error && (
                <div className="flex items-center gap-2 text-red-500 text-xs">
                  <AlertCircle className="w-3.5 h-3.5 flex-shrink-0" />
                  <span>{error}</span>
                </div>
              )}

              <button
                onClick={() => { setFound(null); setIdInput(''); setError('') }}
                className="text-center text-xs text-slate-400 hover:text-blue-500 transition-colors font-medium"
              >
                Search a different ID
              </button>
            </motion.div>
          )}
        </div>
      </motion.div>
    </motion.div>
  )
}
