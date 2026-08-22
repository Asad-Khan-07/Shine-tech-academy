// In ShineTechProgramsSection.jsx
import { useNavigate } from "react-router-dom";

export default function ShineTechProgramsSection() {
  const navigate = useNavigate();

  const handleApply = (program) => {
    navigate(`/apply-program?course=${program.id}`);
  };

  // In the button:
  <button
    type="button"
    onClick={() => handleApply(program)}
    className="flex-1 text-white font-bold text-xs py-3 px-3 rounded-xl transition-all shadow-md shadow-blue-950/40 hover:shadow-blue-900/60 flex items-center justify-center gap-1.5 group/btn"
    style={{
      background: `linear-gradient(135deg, #0956fc, #1a3a8a)`,
    }}
  >
    Apply Now
    <ArrowRight className="w-3.5 h-3.5 group-hover/btn:translate-x-1 transition-transform" />
  </button>;
}
