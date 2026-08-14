import { motion } from "framer-motion";
import { Star, Quote } from "lucide-react";

const REVIEWS = [
  {
    name: "Ahmed Raza",
    role: "Web Development Student",
    rating: 5,
    text: "Shine Tech Academy ne meri zindagi badal di. Practical learning aur expert mentors ki wajah se ab main confidently freelancing kar raha hoon.",
    avatar: "AR",
    color: "bg-blue-600",
  },
  {
    name: "Hira Zafar",
    role: "Graphic Design Student",
    rating: 5,
    text: "Best decision of my life! The graphic design course is incredibly well-structured. I already completed 2 client projects during the course.",
    avatar: "HZ",
    color: "bg-violet-600",
  },
  {
    name: "Usman Ali",
    role: "Digital Marketing Student",
    rating: 5,
    text: "Instructors are very professional and supportive. The real project assignments helped me build a solid portfolio within months.",
    avatar: "UA",
    color: "bg-emerald-600",
  },
  {
    name: "Sara Khan",
    role: "AI Productivity Student",
    rating: 5,
    text: "The AI course is amazing! I learned so many tools in just 6 weeks that I use daily in my work. Highly recommended!",
    avatar: "SK",
    color: "bg-rose-600",
  },
  {
    name: "Bilal Hassan",
    role: "Freelancing Student",
    rating: 5,
    text: "After completing the Freelancing course, I landed my first Fiverr order within 2 weeks. The guidance on proposals is gold.",
    avatar: "BH",
    color: "bg-amber-600",
  },
  {
    name: "Nadia Malik",
    role: "Video Editing Student",
    rating: 5,
    text: "The video editing course is extremely thorough. From Premiere Pro to CapCut, I learned everything I needed to start earning.",
    avatar: "NM",
    color: "bg-pink-600",
  },
];

const containerVariants = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.08 } },
};

const cardVariants = {
  hidden: { opacity: 0, y: 30 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.5, ease: "easeOut" },
  },
};

export default function Testimonials() {
  return (
    <section
      id="reviews"
      className="py-16 sm:py-24 px-4 sm:px-6 lg:px-8 bg-slate-50/70 backdrop-blur-sm relative overflow-hidden"
    >
      {/* Background Accent Decorative Glow */}
      <div className="absolute top-1/3 left-1/2 -translate-x-1/2 w-full max-w-7xl h-72 bg-blue-500/5 blur-3xl rounded-full pointer-events-none" />

      <div className="max-w-7xl mx-auto relative z-10">
        {/* Header */}
        <div className="text-center mb-12 sm:mb-16">
          <span className="section-tag mb-3 inline-block px-3.5 py-1 rounded-full border border-blue-500/20 bg-blue-500/10 text-blue-600 text-xs font-semibold tracking-wider uppercase">
            Student Reviews
          </span>
          <h2 className="font-space font-extrabold text-3xl sm:text-4xl text-slate-900 mt-2">
            What Our <span className="text-blue-600">Students</span> Say
          </h2>
          <div className="w-16 h-1 bg-gradient-to-r from-blue-600 via-blue-400 to-blue-600 mx-auto mt-4 rounded-full" />
          <p className="text-slate-600 text-xs sm:text-sm mt-4 max-w-md mx-auto leading-relaxed">
            Real stories from real students who transformed their skills and
            careers with Shine Tech Academy.
          </p>
        </div>

        {/* Reviews Grid */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-80px" }}
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6"
        >
          {REVIEWS.map((r) => (
            <motion.div
              key={r.name}
              variants={cardVariants}
              className="bg-white border border-slate-100/80 rounded-2xl p-6 sm:p-7 flex flex-col justify-between shadow-sm hover:shadow-md hover:-translate-y-1 transition-all duration-300 group"
            >
              <div className="flex flex-col gap-4">
                {/* Quote Icon & Rating Header */}
                <div className="flex items-center justify-between">
                  <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-blue-600 to-blue-700 flex items-center justify-center shadow-md shadow-blue-500/20 group-hover:scale-105 transition-transform duration-300">
                    <Quote className="w-5 h-5 text-white fill-white" />
                  </div>
                  <div className="flex gap-1">
                    {Array.from({ length: r.rating }).map((_, i) => (
                      <Star
                        key={i}
                        className="w-4 h-4 text-amber-400 fill-amber-400"
                      />
                    ))}
                  </div>
                </div>

                {/* Review Text */}
                <p className="text-slate-600 text-xs sm:text-sm leading-relaxed italic">
                  &ldquo;{r.text}&rdquo;
                </p>
              </div>

              {/* Author Profile */}
              <div className="flex items-center gap-3 pt-5 mt-4 border-t border-slate-100">
                <div
                  className={`w-10 h-10 rounded-full ${r.color} flex items-center justify-center text-white text-xs font-black flex-shrink-0 shadow-sm`}
                >
                  {r.avatar}
                </div>
                <div>
                  <p className="text-slate-900 font-bold text-sm leading-tight">
                    {r.name}
                  </p>
                  <p className="text-slate-500 text-xs mt-0.5">{r.role}</p>
                </div>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
