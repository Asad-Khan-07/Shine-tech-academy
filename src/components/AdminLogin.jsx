import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import { motion, AnimatePresence, useReducedMotion } from "framer-motion";
import {
  Eye,
  EyeOff,
  Lock,
  Mail,
  ShieldCheck,
  Loader2,
  ArrowRight,
  AlertCircle,
  Sparkles,
} from "lucide-react";

const EASE = [0.22, 1, 0.36, 1]; // same curve used site-wide

export function AdminLogin() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const reduceMotion = useReducedMotion();

  const { signIn } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    try {
      await signIn(email, password);
      navigate("/admin/dashboard");
    } catch (err) {
      setError(err?.message || "Invalid email or password. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen relative flex items-center justify-center bg-slate-50 overflow-hidden p-4 selection:bg-[#0956fc] selection:text-white font-sans antialiased">
      {/* ── Ambient Background Grid ── */}
      <div
        className="absolute inset-0 opacity-[0.04] pointer-events-none"
        style={{
          backgroundImage:
            "linear-gradient(#0f172a 1px, transparent 1px), linear-gradient(90deg, #0f172a 1px, transparent 1px)",
          backgroundSize: "32px 32px",
        }}
      />

      {/* Soft glowing orbs — breathing, respects reduced-motion */}
      <motion.div
        aria-hidden
        className="absolute top-1/4 -left-20 w-80 h-80 bg-[#0956fc]/10 rounded-full blur-[120px] pointer-events-none"
        animate={reduceMotion ? {} : { opacity: [0.6, 1, 0.6] }}
        transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
      />
      <motion.div
        aria-hidden
        className="absolute bottom-1/4 -right-20 w-80 h-80 bg-blue-400/10 rounded-full blur-[120px] pointer-events-none"
        animate={reduceMotion ? {} : { opacity: [0.4, 0.9, 0.4] }}
        transition={{
          duration: 4.5,
          repeat: Infinity,
          ease: "easeInOut",
          delay: 1,
        }}
      />

      <motion.div
        initial={{ opacity: 0, y: 20, scale: 0.98 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        transition={{ duration: 0.4, ease: EASE }}
        className="w-full max-w-md relative z-10"
      >
        {/* ── Header / Logo Section ── */}
        <div className="text-center mb-8">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-blue-50 border border-blue-200/80 mb-4">
            <ShieldCheck className="w-4 h-4 text-[#0956fc]" />
            <span className="text-[11px] font-extrabold uppercase tracking-widest text-[#0956fc]">
              STA Secure Gateway
            </span>
          </div>

          <div className="relative inline-block group">
            <img
              src="/STA-logo.png"
              alt="Shine Tech Academy"
              className="h-16 sm:h-20 mx-auto mb-3 drop-shadow-[0_10px_25px_rgba(9,86,252,0.15)] transition-transform duration-300 group-hover:scale-105"
            />
          </div>

          <h1 className="text-2xl sm:text-3xl font-black text-slate-900 tracking-tight">
            Admin Portal
          </h1>
          <p className="text-slate-500 text-xs sm:text-sm font-medium mt-1">
            Enter your credentials to access the management dashboard
          </p>
        </div>

        {/* ── Login Card ── */}
        <div className="bg-white/90 backdrop-blur-2xl rounded-3xl p-6 sm:p-8 border border-white/60 shadow-2xl relative overflow-hidden">
          {/* Subtle Top Glowing Line */}
          <div className="absolute top-0 left-0 right-0 h-[2px] bg-gradient-to-r from-transparent via-[#0956fc] to-transparent" />

          <form onSubmit={handleSubmit} className="space-y-5">
            {/* Animated Error Banner */}
            <AnimatePresence mode="wait">
              {error && (
                <motion.div
                  initial={{ opacity: 0, y: -10, height: 0 }}
                  animate={{ opacity: 1, y: 0, height: "auto" }}
                  exit={{ opacity: 0, y: -10, height: 0 }}
                  transition={{
                    duration: reduceMotion ? 0.05 : 0.25,
                    ease: EASE,
                  }}
                  className="bg-rose-50 border border-rose-200 text-rose-600 text-xs font-bold rounded-2xl px-4 py-3 flex items-start gap-2.5"
                >
                  <AlertCircle className="w-4 h-4 text-rose-500 flex-shrink-0 mt-0.5" />
                  <span className="leading-relaxed">{error}</span>
                </motion.div>
              )}
            </AnimatePresence>

            {/* Email Input */}
            <div>
              <label
                htmlFor="admin-email"
                className="block text-[11px] font-extrabold text-slate-500 uppercase tracking-wider mb-2"
              >
                Email Address
              </label>
              <div className="relative group">
                <Mail className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400 group-focus-within:text-[#0956fc] transition-colors" />
                <input
                  id="admin-email"
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                  autoComplete="email"
                  className="w-full pl-10 pr-4 py-3 bg-slate-50 border border-slate-200 rounded-2xl text-sm text-slate-900 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-100 focus:border-[#0956fc] transition-all font-semibold"
                  placeholder="admin@shinetechacademy.com"
                />
              </div>
            </div>

            {/* Password Input */}
            <div>
              <div className="flex items-center justify-between mb-2">
                <label
                  htmlFor="admin-password"
                  className="block text-[11px] font-extrabold text-slate-500 uppercase tracking-wider"
                >
                  Password
                </label>
              </div>
              <div className="relative group">
                <Lock className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400 group-focus-within:text-[#0956fc] transition-colors" />
                <input
                  id="admin-password"
                  type={showPassword ? "text" : "password"}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                  autoComplete="current-password"
                  className="w-full pl-10 pr-11 py-3 bg-slate-50 border border-slate-200 rounded-2xl text-sm text-slate-900 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-100 focus:border-[#0956fc] transition-all font-semibold"
                  placeholder="••••••••"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  aria-label={showPassword ? "Hide password" : "Show password"}
                  className="absolute right-3.5 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-700 transition-colors cursor-pointer p-1"
                >
                  {showPassword ? (
                    <EyeOff className="w-4 h-4" />
                  ) : (
                    <Eye className="w-4 h-4" />
                  )}
                </button>
              </div>
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              disabled={loading}
              className="w-full mt-2 bg-[#0956fc] hover:bg-blue-700 text-white font-extrabold py-3.5 px-4 rounded-2xl transition-all shadow-lg shadow-blue-500/25 hover:shadow-xl hover:shadow-blue-500/35 active:scale-[0.98] disabled:opacity-60 disabled:cursor-not-allowed flex items-center justify-center gap-2 cursor-pointer text-sm"
            >
              {loading ? (
                <>
                  <Loader2 className="w-4 h-4 animate-spin text-white" />
                  <span>Authenticating...</span>
                </>
              ) : (
                <>
                  <span>Sign In to Dashboard</span>
                  <ArrowRight className="w-4 h-4" />
                </>
              )}
            </button>
          </form>

          {/* Footer Security Note */}
          <div className="mt-6 pt-5 border-t border-slate-100 text-center flex items-center justify-center gap-2 text-[11px] text-slate-400 font-semibold">
            <Sparkles className="w-3.5 h-3.5 text-[#0956fc]" />
            <span>256-Bit Encrypted Portal • Shine Tech Academy</span>
          </div>
        </div>
      </motion.div>
    </div>
  );
}
