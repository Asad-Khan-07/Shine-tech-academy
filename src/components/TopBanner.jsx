import { Sparkles, GraduationCap, Monitor } from "lucide-react";

export default function TopBanner({ onApply }) {
  return (
    <div className="relative z-40 bg-[#0956fc] py-2 px-3 text-center overflow-hidden border-b border-white/15">
      <div className="relative flex items-center justify-center gap-x-2.5 gap-y-1 text-white flex-wrap max-w-7xl mx-auto">
        {/* Item 1 */}
        <span className="inline-flex items-center gap-1.5">
          <GraduationCap className="w-3.5 h-3.5 text-amber-300 shrink-0" />
          <span className="text-[11px] sm:text-xs md:text-sm font-bold tracking-wide">
            Founding Batch 2026 Admissions Open
          </span>
        </span>

        {/* Item 3 */}
        {/* <span className="inline-flex items-center gap-1.5 hidden sm:inline-flex">
          <Monitor className="w-3.5 h-3.5 text-blue-200 shrink-0" />
          <span className="text-[11px] sm:text-xs md:text-sm font-semibold text-blue-50">
            FREE Demo Class
          </span>
        </span> */}

        {/* CTA Button */}
        <a
          href="#apply"
          onClick={onApply}
          className="inline-flex items-center gap-1 bg-white hover:bg-slate-100 text-[#0956fc] text-[10px] sm:text-xs font-extrabold px-3 py-1 rounded-full shadow-sm hover:shadow transition-all duration-200 ml-1.5 shrink-0 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white"
        >
          <Sparkles className="w-3 h-3 text-amber-500" />
          Apply Today
        </a>
      </div>
    </div>
  );
}
