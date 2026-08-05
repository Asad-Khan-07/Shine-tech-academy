/** Lightweight scroll-reveal presets — opacity + small y only, no scale/spring. */
export const scrollViewport = { once: true, amount: 0.12 }

export const revealContainer = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.03 } },
}

export const revealItem = {
  hidden: { opacity: 0, y: 10 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.28, ease: [0.25, 0.1, 0.25, 1] },
  },
}

export const revealFade = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { duration: 0.3, ease: 'easeOut' },
  },
}
