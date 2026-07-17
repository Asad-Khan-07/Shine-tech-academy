import { GraduationCap, Sparkles } from 'lucide-react'

export default function TopBanner() {
  return (
    <div
      className="relative z-50 py-2 px-4 text-center"
      style={{ background: 'linear-gradient(90deg, #1e3a8a 0%, #2563eb 50%, #1e3a8a 100%)' }}
    >
      <p className="flex items-center justify-center gap-2 text-sm font-semibold text-white flex-wrap">
        <GraduationCap className="w-4 h-4 text-blue-200 flex-shrink-0" />
        <span className="text-blue-100 font-bold">Admissions Open</span>
        <span className="text-white/80">– Founding Batch 2026</span>
        <a
          href="https://forms.google.com"
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-1 bg-white text-blue-700 text-xs font-bold px-3 py-0.5 rounded-full hover:bg-blue-50 transition-colors ml-1"
        >
          <Sparkles className="w-3 h-3" />
          Register Free
        </a>
      </p>
    </div>
  )
}
