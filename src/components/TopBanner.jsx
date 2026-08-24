import { Sparkles, GraduationCap, ArrowRight } from "lucide-react";

export default function TopBanner({ onApply }) {
  return (
    <div className="relative z-40 bg-[#0956fc] bg-gradient-to-r from-[#0747d6] via-[#0956fc] to-[#0747d6] py-2 px-3 text-center overflow-hidden border-b border-white/20 shadow-md">
      {/* Background Ambient Glows */}
      <div className="absolute -top-10 left-1/3 w-40 h-40 bg-white/10 rounded-full blur-2xl pointer-events-none" />
      <div className="absolute -bottom-10 right-1/3 w-40 h-40 bg-amber-400/20 rounded-full blur-2xl pointer-events-none" />

      {/* Content Container */}
      <div className="relative flex items-center justify-center gap-x-3 gap-y-1.5 text-white flex-wrap max-w-7xl mx-auto">
        {/* ShineTech Styled Badge */}
        <div className="inline-flex items-center gap-2 bg-white/10 backdrop-blur-md px-3 py-0.5 rounded-full border border-white/20 shadow-inner">
          <span className="flex h-2 w-2 relative">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-amber-300 opacity-75"></span>
            <span className="relative inline-flex rounded-full h-2 w-2 bg-amber-400"></span>
          </span>

          <GraduationCap className="w-3.5 h-3.5 text-amber-300 shrink-0" />

          <span className="text-[11px] sm:text-xs md:text-sm font-bold tracking-wide text-white">
            Founding Batch 2026 Admissions Open
          </span>
        </div>

        {/* Premium White CTA Button */}
        <a
          href="#apply"
          onClick={onApply}
          className="group relative inline-flex items-center gap-1.5 bg-white hover:bg-slate-50 text-[#0956fc] text-[11px] sm:text-xs font-black px-3.5 py-1 rounded-full shadow-[0_0_12px_rgba(255,255,255,0.3)] hover:shadow-[0_0_18px_rgba(255,255,255,0.5)] hover:scale-[1.03] active:scale-95 transition-all duration-300 shrink-0 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white"
        >
          <Sparkles className="w-3.5 h-3.5 text-amber-500 fill-amber-500 group-hover:rotate-12 transition-transform" />
          <span>Apply Today</span>
          <ArrowRight className="w-3 h-3 text-[#0956fc] group-hover:translate-x-0.5 transition-transform" />
        </a>
      </div>
    </div>
  );
}
