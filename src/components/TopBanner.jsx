import { Sparkles, GraduationCap, Percent, Monitor } from 'lucide-react'

export default function TopBanner() {
  return (
    <div
      className="relative z-40 py-2 px-3 text-center overflow-hidden"
      style={{ background: '#0956fc' }}
    >
      <p className="relative flex items-center justify-center gap-x-2 gap-y-1 text-white flex-wrap">
        {/* Item 1 */}
        <span className="inline-flex items-center gap-1">
          <GraduationCap className="w-3.5 h-3.5 text-yellow-300 flex-shrink-0" />
          <span className="text-[11px] sm:text-sm font-semibold">Founding Batch 2026 Admissions Open</span>
        </span>

        <span className="text-white/30 hidden sm:inline">|</span>

        {/* Item 2 */}
        <span className="inline-flex items-center gap-1 hidden xs:inline-flex sm:inline-flex">
          {/* <Percent className="w-3.5 h-3.5 text-green-300 flex-shrink-0" /> */}
          <span className="text-[11px] sm:text-sm font-semibold">50% Scholarship Available</span>
        </span>

        <span className="text-white/30 hidden sm:inline">|</span>

        {/* Item 3 */}
        <span className="inline-flex items-center gap-1 hidden sm:inline-flex">
          <Monitor className="w-3.5 h-3.5 text-blue-200 flex-shrink-0" />
          <span className="text-[11px] sm:text-sm font-semibold">FREE Demo Class</span>
        </span>

        {/* CTA */}
        <a
          href="#apply"
          className="inline-flex items-center gap-1 bg-white text-blue-700 text-[10px] sm:text-xs font-bold px-2.5 py-1 rounded-full hover:bg-blue-50 transition-colors ml-1 flex-shrink-0"
        >
          <Sparkles className="w-3 h-3" />
          Apply Today 
        </a>
      </p>
    </div>
  )
}
