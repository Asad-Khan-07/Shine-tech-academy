import { Sparkles, GraduationCap, Percent, Monitor } from 'lucide-react'

export default function TopBanner() {
  return (
    <div
      className="relative z-40 py-2.5 px-4 text-center overflow-hidden"
      style={{ background: 'linear-gradient(90deg, #002f94 0%, #0956fc 50%, #002f94 100%)' }}
    >
      <p className="relative flex items-center justify-center gap-x-3 gap-y-1 text-sm font-semibold text-white flex-wrap">
        <span className="inline-flex items-start gap-1 lg:gap-1.5">
          <GraduationCap className="w-4 h-4 text-yellow-300 flex-shrink-0 mt-0.5" />
          <span>Founding Batch 2026 Admissions Open</span>
        </span>
        <span className="hidden sm:inline text-white/40">|</span>
        <span className="inline-flex items-center gap-1.5">
          <Percent className="w-4 h-4 text-green-300 flex-shrink-0" />
          <span>Up to 50% Scholarship</span>
        </span>
        <span className="hidden sm:inline text-white/40">|</span>
        <span className="inline-flex items-center gap-1.5">
          <Monitor className="w-4 h-4 text-blue-200 flex-shrink-0" />
          <span>100% FREE Demo Class</span>
        </span>
        <a
          href="#apply"
          className="inline-flex items-center gap-1 bg-white text-blue-700 text-xs font-bold px-3 py-1 rounded-full hover:bg-blue-50 transition-colors ml-1"
        >
          <Sparkles className="w-3 h-3" />
          Register Now
        </a>
      </p>
    </div>
  )
}
