import { motion } from 'framer-motion'

const PHOTOS = [
  {
    src:  'https://images.unsplash.com/photo-1515378791036-0648a3ef77b2?w=600&q=80&fit=crop',
    alt:  'Classroom session at Shine Tech Academy',
    span: 'col-span-2 row-span-2',
  },
  {
    src:  'https://images.unsplash.com/photo-1524178232363-1fb2b075b655?w=600&q=80&fit=crop',
    alt:  'Students attending a workshop',
    span: '',
  },
  {
    src:  'https://images.unsplash.com/photo-1556761175-b413da4baf72?w=600&q=80&fit=crop',
    alt:  'Tech event at Shine Tech Academy',
    span: '',
  },
  {
    src:  'https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?w=600&q=80&fit=crop',
    alt:  'Student working on laptop in the lab',
    span: '',
  },
  {
    src:  'https://images.unsplash.com/photo-1531482615713-2afd69097998?w=600&q=80&fit=crop',
    alt:  'Trainer teaching a class',
    span: '',
  },
  {
    src:  'https://images.unsplash.com/photo-1522202176988-66273c2fd55f?w=600&q=80&fit=crop',
    alt:  'Students collaborating in the lab',
    span: 'col-span-2',
  },
]

const container = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.07 } },
}
const photo = {
  hidden:  { opacity: 0, scale: 0.95 },
  visible: { opacity: 1, scale: 1,    transition: { duration: 0.5 } },
}

export default function Gallery() {
  return (
    <section id="gallery" className="py-24 px-4 sm:px-6 lg:px-8 bg-slate-50">
      <div className="max-w-7xl mx-auto">

        {/* Header */}
        <div className="text-center mb-14">
          <span className="section-tag mb-3 inline-block">Gallery</span>
          <h2 className="font-space font-extrabold text-3xl sm:text-4xl text-slate-900 mt-3">
            Our Campus &amp; Events
          </h2>
          <div className="w-12 h-1 bg-blue-600 mx-auto mt-4 rounded-full" />
          <p className="text-slate-500 text-base mt-4 max-w-lg mx-auto">
            Classrooms, workshops, events, students, and trainers — a glimpse into Shine Tech Academy life.
          </p>
        </div>

        {/* Grid */}
        <motion.div
          variants={container}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-80px' }}
          className="grid grid-cols-2 md:grid-cols-4 auto-rows-[220px] gap-4"
        >
          {PHOTOS.map((p, i) => (
            <motion.div
              key={i}
              variants={photo}
              className={`gallery-item ${p.span} relative rounded-2xl overflow-hidden shadow-md`}
            >
              <img
                src={p.src}
                alt={p.alt}
                className="w-full h-full object-cover"
                loading="lazy"
              />
              <div className="absolute inset-0 bg-slate-900/0 hover:bg-slate-900/25 transition-all duration-300 rounded-2xl" />
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  )
}
