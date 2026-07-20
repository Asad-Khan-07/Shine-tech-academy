import { motion } from 'framer-motion'
import { CalendarDays, MapPin, ArrowRight, PartyPopper } from 'lucide-react'

export default function UpcomingEvent() {
  return (
    <section id="events" className="py-20 px-4 sm:px-6 lg:px-8 event-bg">
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 items-center">

          {/* Left: Text Content */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="flex flex-col gap-5"
          >
            <div className="flex items-center gap-2">
              <span className="inline-block w-2 h-2 bg-blue-400 rounded-full animate-pulse" />
              <span className="section-tag-white">Upcoming Event</span>
            </div>

            <h2 className="font-space font-extrabold text-3xl sm:text-4xl lg:text-5xl text-white leading-tight">
              <PartyPopper className="w-7 h-7 text-white" /> Official Opening
              <br />
              <span className="text-blue-400">Ceremony</span>
            </h2>

            <p className="text-slate-300 text-base leading-relaxed max-w-lg">
              Join us for the grand opening of Shine Tech Academy! Meet our faculty, explore courses, and be part of the founding batch. Food, activities, and prizes await!
            </p>

            <div className="flex flex-col sm:flex-row gap-4">
              <div className="flex items-center gap-3 bg-white/10 rounded-xl px-4 py-3">
                <CalendarDays className="w-5 h-5 text-blue-400 flex-shrink-0" />
                <div>
                  <p className="text-white font-bold text-sm">1 August 2026</p>
                  <p className="text-slate-400 text-xs">10:00 AM onwards</p>
                </div>
              </div>
              <div className="flex items-center gap-3 bg-white/10 rounded-xl px-4 py-3">
                <MapPin className="w-5 h-5 text-blue-400 flex-shrink-0" />
                <div>
                  <p className="text-white font-bold text-sm">Shine Tech Campus</p>
                  <p className="text-slate-400 text-xs">In-person event</p>
                </div>
              </div>
            </div>

            <div>
              <a
                href="#apply"
                className="inline-flex items-center gap-2 bg-white text-blue-700 font-bold text-sm px-7 py-3.5 rounded-full hover:bg-blue-50 transition-all hover:-translate-y-0.5 hover:shadow-lg shadow-md"
              >
                Register Free <ArrowRight className="w-4 h-4" />
              </a>
            </div>
          </motion.div>

          {/* Right: Event Image */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="relative"
          >
            <div className="rounded-2xl overflow-hidden shadow-2xl aspect-[16/10] border border-white/10">
              <img
                src="https://images.unsplash.com/photo-1540575467063-178a50c2df87?w=800&q=80&fit=crop"
                alt="Official Opening Ceremony of Shine Tech Academy"
                className="w-full h-full object-cover"
                loading="lazy"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-blue-900/60 to-transparent" />
            </div>
          </motion.div>

        </div>
      </div>
    </section>
  )
}
