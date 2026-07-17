import { Star, Target, Lightbulb } from 'lucide-react'

const VALUES = [
  {
    icon: Star,
    title: 'Our Vision',
    desc: "To become Pakistan's most trusted tech learning hub — empowering youth from every corner with world-class digital skills, real projects, and career-ready training that opens global doors.",
  },
  {
    icon: Target,
    title: 'Our Mission',
    desc: 'To deliver high-quality, affordable tech education through live classes, hands-on projects, and expert mentorship — turning students into confident professionals and successful freelancers.',
  },
  {
    icon: Lightbulb,
    title: 'Our Values',
    desc: 'Excellence, accessibility, and community. We believe every student deserves a chance to learn, build, and earn — regardless of background or prior experience.',
  },
]

export default function About() {
  return (
    <section id="about" className="py-24 px-4 sm:px-6 lg:px-8 relative overflow-hidden">
      <div className="absolute top-0 right-0 w-72 h-72 bg-green-500/5 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto">
        {/* Section header */}
        <div className="text-center mb-16">
          <span className="inline-block text-green-400 text-sm font-semibold tracking-widest uppercase mb-4 px-4 py-1.5 rounded-full border border-green-500/30 bg-green-500/5">
            Who We Are
          </span>
          <h2 className="font-space font-bold text-4xl sm:text-5xl text-white mb-6">
            About <span className="text-gradient">STA</span>
          </h2>
          <p className="text-gray-400 text-lg max-w-3xl mx-auto leading-relaxed">
            Shine Tech Academy (STA) is a forward-thinking technology institute built to bridge the gap between education and industry. We don't just teach — we transform.
          </p>
        </div>

        {/* Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {VALUES.map((item) => {
            const Icon = item.icon
            return (
              <div key={item.title} className="glass-card glass-card-hover rounded-2xl p-8 flex flex-col gap-4">
                <div className="w-14 h-14 rounded-2xl bg-green-500/10 border border-green-500/20 flex items-center justify-center">
                  <Icon className="w-7 h-7 text-green-400" />
                </div>
                <h3 className="font-space font-bold text-xl text-white">{item.title}</h3>
                <p className="text-gray-400 leading-relaxed text-sm">{item.desc}</p>
              </div>
            )
          })}
        </div>

        <div className="section-divider mt-16" />
      </div>
    </section>
  )
}
