import { useState, useRef, useEffect, useCallback } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import * as faceapi from 'face-api.js'
import { Scan, Crop, CheckCircle, RotateCcw, User, ZoomIn } from 'lucide-react'

const MODELS_URL = '/models'
let modelsLoaded = false

async function loadModels() {
  if (modelsLoaded) return
  await faceapi.nets.tinyFaceDetector.loadFromUri(MODELS_URL)
  modelsLoaded = true
}

// Crop image using canvas
function cropImageToDataUrl(imgSrc, sx, sy, sw, sh, size = 400) {
  return new Promise((resolve) => {
    const img = new Image()
    img.crossOrigin = 'anonymous'
    img.onload = () => {
      const canvas = document.createElement('canvas')
      canvas.width = size
      canvas.height = size
      const ctx = canvas.getContext('2d')
      ctx.drawImage(img, sx, sy, sw, sh, 0, 0, size, size)
      resolve(canvas.toDataURL('image/jpeg', 0.92))
    }
    img.src = imgSrc
  })
}

export default function FaceDetectCrop({ imageSrc, onCropComplete, onCancel }) {
  const [phase, setPhase] = useState('scanning') // 'scanning' | 'auto-cropped' | 'manual-crop'
  const [scanLine, setScanLine] = useState(0) // 0-100 percentage
  const [scanStatus, setScanStatus] = useState('Loading AI model...')
  const [croppedSrc, setCroppedSrc] = useState(null)
  const [autoDetected, setAutoDetected] = useState(false)

  // Manual crop state
  const containerRef = useRef(null)
  const [isDragging, setIsDragging] = useState(false)
  const [cropRect, setCropRect] = useState(null) // display px coords
  const [startPos, setStartPos] = useState(null)
  const [imgNaturalSize, setImgNaturalSize] = useState(null)
  const manualImgRef = useRef(null)

  // ── Run face detection on mount ──────────────────────────────
  useEffect(() => {
    let cancelled = false

    const run = async () => {
      // Animate scan line
      const sweepDuration = 2200 // ms
      const sweepStart = Date.now()
      const sweepInterval = setInterval(() => {
        const elapsed = Date.now() - sweepStart
        const pct = Math.min((elapsed / sweepDuration) * 100, 90)
        setScanLine(pct)
      }, 30)

      try {
        setScanStatus('Loading AI model...')
        await loadModels()
        if (cancelled) return

        setScanStatus('Analyzing image...')

        // Build HTMLImageElement for face-api
        const img = new Image()
        img.src = imageSrc
        await new Promise(r => { img.onload = r })
        if (cancelled) return

        setScanStatus('Detecting face...')
        const detection = await faceapi.detectSingleFace(
          img,
          new faceapi.TinyFaceDetectorOptions({ inputSize: 320, scoreThreshold: 0.35 })
        )
        if (cancelled) return

        clearInterval(sweepInterval)
        setScanLine(100)
        await new Promise(r => setTimeout(r, 350))

        if (detection) {
          const { x, y, width, height } = detection.box
          const pad = Math.max(width, height) * 0.5
          const sx = Math.max(0, x - pad)
          const sy = Math.max(0, y - pad * 1.1) // extra padding on top for head
          const sw = Math.min(img.naturalWidth - sx, width + pad * 2)
          const sh = Math.min(img.naturalHeight - sy, height + pad * 2.2)

          setScanStatus('Face detected!')
          const cropped = await cropImageToDataUrl(imageSrc, sx, sy, sw, sh)
          setCroppedSrc(cropped)
          setAutoDetected(true)
          setPhase('auto-cropped')
        } else {
          setScanStatus('No face detected — please crop manually')
          setPhase('manual-crop')
        }
      } catch (err) {
        clearInterval(sweepInterval)
        setPhase('manual-crop')
      }
    }

    run()
    return () => { cancelled = true }
  }, [imageSrc])

  // ── Manual crop helpers ───────────────────────────────────────
  const getPos = useCallback((e) => {
    const rect = containerRef.current.getBoundingClientRect()
    const clientX = e.touches ? e.touches[0].clientX : e.clientX
    const clientY = e.touches ? e.touches[0].clientY : e.clientY
    return {
      x: Math.max(0, Math.min(clientX - rect.left, rect.width)),
      y: Math.max(0, Math.min(clientY - rect.top, rect.height))
    }
  }, [])

  const onMouseDown = useCallback((e) => {
    e.preventDefault()
    const pos = getPos(e)
    setStartPos(pos)
    setCropRect({ x: pos.x, y: pos.y, w: 0, h: 0 })
    setIsDragging(true)
  }, [getPos])

  const onMouseMove = useCallback((e) => {
    if (!isDragging || !startPos) return
    e.preventDefault()
    const pos = getPos(e)
    setCropRect({
      x: Math.min(startPos.x, pos.x),
      y: Math.min(startPos.y, pos.y),
      w: Math.abs(pos.x - startPos.x),
      h: Math.abs(pos.y - startPos.y)
    })
  }, [isDragging, startPos, getPos])

  const onMouseUp = useCallback(() => setIsDragging(false), [])

  const handleManualCrop = useCallback(async () => {
    if (!cropRect || cropRect.w < 20 || cropRect.h < 20) return
    const img = manualImgRef.current
    if (!img) return

    const imgRect = img.getBoundingClientRect()
    const contRect = containerRef.current.getBoundingClientRect()
    const scaleX = img.naturalWidth / imgRect.width
    const scaleY = img.naturalHeight / imgRect.height
    const offX = imgRect.left - contRect.left
    const offY = imgRect.top - contRect.top

    const sx = Math.max(0, (cropRect.x - offX) * scaleX)
    const sy = Math.max(0, (cropRect.y - offY) * scaleY)
    const sw = Math.min(cropRect.w * scaleX, img.naturalWidth - sx)
    const sh = Math.min(cropRect.h * scaleY, img.naturalHeight - sy)

    const cropped = await cropImageToDataUrl(imageSrc, sx, sy, sw, sh)
    setCroppedSrc(cropped)
    setAutoDetected(false)
    setPhase('auto-cropped')
  }, [cropRect, imageSrc])

  // ── Render ───────────────────────────────────────────────────
  return (
    <div className="fixed inset-0 z-[999] flex items-center justify-center p-4 bg-black/70 backdrop-blur-sm">
      <motion.div
        initial={{ opacity: 0, scale: 0.92 }}
        animate={{ opacity: 1, scale: 1 }}
        exit={{ opacity: 0, scale: 0.92 }}
        className="bg-white rounded-3xl shadow-2xl overflow-hidden w-full max-w-md"
      >
        {/* ── SCANNING PHASE ── */}
        <AnimatePresence mode="wait">
          {phase === 'scanning' && (
            <motion.div
              key="scanning"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="flex flex-col"
            >
              {/* Header */}
              <div className="bg-gradient-to-br from-blue-600 to-blue-700 px-6 pt-6 pb-5 text-white">
                <div className="flex items-center gap-3 mb-1">
                  <div className="w-9 h-9 bg-white/20 rounded-xl flex items-center justify-center">
                    <Scan className="w-5 h-5" />
                  </div>
                  <h3 className="font-bold text-lg">AI Face Detection</h3>
                </div>
                <p className="text-blue-100 text-sm">Scanning your photo for a face...</p>
              </div>

              {/* Image with scan line */}
              <div className="relative overflow-hidden bg-slate-900 mx-6 mt-6 rounded-2xl" style={{ aspectRatio: '1/1', maxHeight: 280 }}>
                <img
                  src={imageSrc}
                  alt="Uploading"
                  className="w-full h-full object-contain"
                />
                {/* Dark overlay */}
                <div className="absolute inset-0 bg-black/30" />

                {/* Scanning line */}
                <motion.div
                  className="absolute left-0 right-0 h-0.5 bg-blue-400 shadow-[0_0_12px_4px_rgba(96,165,250,0.8)]"
                  style={{ top: `${scanLine}%` }}
                />

                {/* Corner brackets */}
                {[
                  'top-3 left-3 border-t-2 border-l-2',
                  'top-3 right-3 border-t-2 border-r-2',
                  'bottom-3 left-3 border-b-2 border-l-2',
                  'bottom-3 right-3 border-b-2 border-r-2'
                ].map((cls, i) => (
                  <div key={i} className={`absolute w-5 h-5 border-blue-400 ${cls}`} />
                ))}

                {/* Center scanning grid */}
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="border border-blue-400/40 rounded-xl w-24 h-24 flex items-center justify-center">
                    <User className="w-8 h-8 text-blue-400/60" />
                  </div>
                </div>
              </div>

              {/* Progress */}
              <div className="px-6 py-5">
                <div className="flex justify-between items-center mb-2">
                  <span className="text-sm font-semibold text-slate-600">{scanStatus}</span>
                  <span className="text-sm font-bold text-blue-600">{Math.round(scanLine)}%</span>
                </div>
                <div className="h-2 bg-slate-100 rounded-full overflow-hidden">
                  <motion.div
                    className="h-full bg-gradient-to-r from-blue-500 to-blue-400 rounded-full"
                    style={{ width: `${scanLine}%` }}
                  />
                </div>
              </div>
            </motion.div>
          )}

          {/* ── AUTO-CROPPED PHASE ── */}
          {phase === 'auto-cropped' && croppedSrc && (
            <motion.div
              key="auto-cropped"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0 }}
              className="flex flex-col"
            >
              {/* Header */}
              <div className={`px-6 pt-6 pb-5 text-white bg-gradient-to-br from-blue-600 to-blue-700`}>
                <div className="flex items-center gap-3 mb-1">
                  <div className="w-9 h-9 bg-white/20 rounded-xl flex items-center justify-center">
                    <CheckCircle className="w-5 h-5" />
                  </div>
                  <h3 className="font-bold text-lg">
                    {autoDetected ? 'Face Auto-Detected ✓' : 'Manual Crop Applied ✓'}
                  </h3>
                </div>
                <p className="text-white/80 text-sm">
                  {autoDetected ? 'Your face has been automatically cropped.' : 'Your selected area has been cropped.'}
                </p>
              </div>

              {/* Preview side by side */}
              <div className="p-6 flex gap-4">
                <div className="flex-1 flex flex-col items-center gap-2">
                  <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">Original</span>
                  <div className="w-full aspect-square rounded-xl overflow-hidden border-2 border-slate-100 bg-slate-50">
                    <img src={imageSrc} alt="Original" className="w-full h-full object-contain" />
                  </div>
                </div>
                <div className="flex items-center text-slate-300">→</div>
                <div className="flex-1 flex flex-col items-center gap-2">
                  <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">Cropped</span>
                  <div className="w-full aspect-square rounded-xl overflow-hidden border-2 border-blue-100 bg-slate-50 shadow-md">
                    <img src={croppedSrc} alt="Cropped" className="w-full h-full object-cover" />
                  </div>
                </div>
              </div>

              {/* Actions */}
              <div className="px-6 pb-6 flex flex-col gap-3">
                <motion.button
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  onClick={() => onCropComplete(croppedSrc)}
                  className="w-full bg-gradient-to-r from-blue-600 to-blue-500 text-white font-bold py-3.5 rounded-xl flex items-center justify-center gap-2 shadow-lg shadow-blue-500/25"
                >
                  <CheckCircle className="w-4 h-4" />
                  Use This Photo
                </motion.button>

                <motion.button
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  onClick={() => { setCropRect(null); setPhase('manual-crop') }}
                  className="w-full bg-slate-100 hover:bg-slate-200 text-slate-700 font-bold py-3 rounded-xl flex items-center justify-center gap-2 transition-colors"
                >
                  <Crop className="w-4 h-4" />
                  Crop Manually Instead
                </motion.button>

                <button
                  onClick={onCancel}
                  className="text-center text-xs text-slate-400 hover:text-slate-600 transition-colors font-medium"
                >
                  Cancel & re-upload
                </button>
              </div>
            </motion.div>
          )}

          {/* ── MANUAL CROP PHASE ── */}
          {phase === 'manual-crop' && (
            <motion.div
              key="manual-crop"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0 }}
              className="flex flex-col"
            >
              {/* Header */}
              <div className="bg-gradient-to-br from-blue-600 to-blue-700 px-6 pt-6 pb-5 text-white">
                <div className="flex items-center gap-3 mb-1">
                  <div className="w-9 h-9 bg-white/20 rounded-xl flex items-center justify-center">
                    <Crop className="w-5 h-5" />
                  </div>
                  <h3 className="font-bold text-lg">Manual Crop</h3>
                </div>
                <p className="text-blue-100 text-sm">
                  Drag on the image to select your face area
                </p>
              </div>

              {/* Crop area */}
              <div className="p-4 flex justify-center">
                <div
                  ref={containerRef}
                  className="relative rounded-xl overflow-hidden bg-slate-900 select-none touch-none mx-auto"
                  style={{ cursor: 'crosshair', aspectRatio: '1/1', maxHeight: 300, width: '100%', maxWidth: 300 }}
                  onMouseDown={onMouseDown}
                  onMouseMove={onMouseMove}
                  onMouseUp={onMouseUp}
                  onMouseLeave={onMouseUp}
                  onTouchStart={onMouseDown}
                  onTouchMove={onMouseMove}
                  onTouchEnd={onMouseUp}
                >
                  <img
                    ref={manualImgRef}
                    src={imageSrc}
                    alt="Crop"
                    className="w-full h-full object-contain pointer-events-none"
                    draggable={false}
                  />

                  {/* Dark overlay with hole */}
                  {cropRect && cropRect.w > 5 && cropRect.h > 5 && (
                    <>
                      <div className="absolute inset-0 bg-black/50 pointer-events-none" />
                      {/* Crop selection */}
                      <div
                        className="absolute border-2 border-white shadow-lg pointer-events-none"
                        style={{
                          left: cropRect.x,
                          top: cropRect.y,
                          width: cropRect.w,
                          height: cropRect.h,
                          boxShadow: '0 0 0 9999px rgba(0,0,0,0.5)',
                          background: 'transparent'
                        }}
                      >
                        {/* Corner handles */}
                        {['top-0 left-0', 'top-0 right-0', 'bottom-0 left-0', 'bottom-0 right-0'].map((cls, i) => (
                          <div key={i} className={`absolute w-3 h-3 bg-white rounded-sm -translate-x-1/2 -translate-y-1/2 ${cls}`} />
                        ))}
                        {/* Rule of thirds lines */}
                        <div className="absolute inset-0 grid grid-cols-3 grid-rows-3 opacity-30">
                          {[...Array(4)].map((_, i) => (
                            <div key={i} className={`${i < 2 ? 'col-span-1 border-r border-white' : 'row-span-1 border-b border-white'} absolute`}
                              style={i === 0 ? { left: '33%', top: 0, bottom: 0, width: 0 } :
                                i === 1 ? { left: '66%', top: 0, bottom: 0, width: 0 } :
                                i === 2 ? { top: '33%', left: 0, right: 0, height: 0 } :
                                          { top: '66%', left: 0, right: 0, height: 0 }}
                            />
                          ))}
                        </div>
                      </div>
                    </>
                  )}

                  {/* Instruction overlay when no crop */}
                  {!cropRect && (
                    <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
                      <div className="text-center text-white/70">
                        <ZoomIn className="w-8 h-8 mx-auto mb-2 opacity-60" />
                        <p className="text-xs font-medium">Drag to select area</p>
                      </div>
                    </div>
                  )}
                </div>
              </div>

              {/* Actions */}
              <div className="px-4 pb-5 flex flex-col gap-2.5">
                <motion.button
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  onClick={handleManualCrop}
                  disabled={!cropRect || cropRect.w < 20}
                  className="w-full bg-gradient-to-r from-blue-600 to-blue-500 text-white font-bold py-3.5 rounded-xl flex items-center justify-center gap-2 shadow-lg shadow-blue-500/25 disabled:opacity-40 disabled:cursor-not-allowed"
                >
                  <Crop className="w-4 h-4" />
                  Crop Selected Area
                </motion.button>

                <button
                  onClick={onCancel}
                  className="text-center text-xs text-slate-400 hover:text-slate-600 transition-colors font-medium py-1"
                >
                  Cancel & re-upload
                </button>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.div>
    </div>
  )
}
