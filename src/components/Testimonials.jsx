import { useState, useRef, useCallback, useEffect } from "react";
import { motion, useInView, AnimatePresence } from "framer-motion";

const TESTIMONIALS = [
  {
    quote:  "Before RCI, we felt completely alone navigating our son's diagnosis. The team didn't just support him — they empowered our whole family to understand and celebrate how he learns.",
    name:   "Mrs. Adaeze Okonkwo",
    role:   "Parent of a child with autism",
    avatar: "AO",
    color:  "bg-[#3a7d0a]",
  },
  {
    quote:  "The early intervention programme changed the trajectory of my daughter's life. Within six months we saw leaps in her communication and confidence that we never thought possible.",
    name:   "Mr. Chukwuemeka Nwosu",
    role:   "Father, Lagos",
    avatar: "CN",
    color:  "bg-[#e07b1a]",
  },
  {
    quote:  "What sets RCI apart is how they see the child first, not the diagnosis. My son walks into every session with a smile, and that tells me everything I need to know.",
    name:   "Mrs. Folake Bello",
    role:   "Parent of a child with ADHD",
    avatar: "FB",
    color:  "bg-[#1a2e0a]",
  },
];

const INTERVAL = 4000; // ms per slide

const slideVariants = {
  enter:  (dir) => ({ opacity: 0, x: dir > 0 ? 60 : -60 }),
  center: { opacity: 1, x: 0, transition: { duration: 0.45, ease: [0.22, 1, 0.36, 1] } },
  exit:   (dir) => ({ opacity: 0, x: dir > 0 ? -60 : 60,
                      transition: { duration: 0.3, ease: "easeIn" } }),
};

export default function Testimonials() {
  const ref              = useRef(null);
  const carouselRef      = useRef(null);
  const inView           = useInView(ref, { once: true, margin: "-60px" });
  const [active, setActive] = useState(0);
  const [dir,    setDir]    = useState(1);
  const [paused, setPaused] = useState(false);

  // ── Navigate to a specific index ─────────────────────────────
  const go = useCallback((next) => {
    setDir(next > active ? 1 : -1);
    setActive(next);
  }, [active]);

  const prev = useCallback(() =>
    go(active === 0 ? TESTIMONIALS.length - 1 : active - 1), [active, go]);

  const next = useCallback(() =>
    go(active === TESTIMONIALS.length - 1 ? 0 : active + 1), [active, go]);

  // ── Auto-slide — pauses on hover or focus ─────────────────────
  useEffect(() => {
    if (paused) return;
    const id = setInterval(() => {
      setDir(1);
      setActive((a) => (a === TESTIMONIALS.length - 1 ? 0 : a + 1));
    }, INTERVAL);
    return () => clearInterval(id);
  }, [paused, active]);

  // ── Keyboard: ArrowLeft / ArrowRight ─────────────────────────
  useEffect(() => {
    const el = carouselRef.current;
    if (!el) return;
    const onKey = (e) => {
      if (e.key === "ArrowLeft")  { e.preventDefault(); prev(); }
      if (e.key === "ArrowRight") { e.preventDefault(); next(); }
    };
    el.addEventListener("keydown", onKey);
    return () => el.removeEventListener("keydown", onKey);
  }, [prev, next]);

  return (
    <section
      ref={ref}
      aria-labelledby="testimonials-heading"
      className="relative bg-[#f7f9f4] py-20 md:py-28 overflow-hidden"
    >
      {/* Decorative blobs */}
      <div className="absolute top-0 left-0 w-80 h-80 rounded-full
                      bg-[#6ab523]/6 blur-3xl pointer-events-none -translate-x-1/2 -translate-y-1/2"
           aria-hidden="true"/>
      <div className="absolute bottom-0 right-0 w-80 h-80 rounded-full
                      bg-[#e07b1a]/6 blur-3xl pointer-events-none translate-x-1/2 translate-y-1/2"
           aria-hidden="true"/>

      <div className="relative z-10 max-w-4xl mx-auto px-5 sm:px-8 lg:px-12">

        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center mb-14"
        >
          <p className="font-['Jost'] text-[#3a7d0a] text-xs uppercase tracking-widest mb-3">
            Families Speak
          </p>
          <h2
            id="testimonials-heading"
            className="font-['Cormorant_Garamond'] font-semibold text-[#1a2e0a]
                       text-3xl sm:text-4xl md:text-5xl"
          >
            Words from the{" "}
            <span className="italic text-[#3a7d0a]">families we serve</span>
          </h2>
        </motion.div>

        {/* Carousel wrapper — focusable for keyboard nav */}
        <motion.div
          ref={carouselRef}
          initial={{ opacity: 0, y: 32 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ delay: 0.2, duration: 0.6 }}
          tabIndex={0}
          role="region"
          aria-label="Testimonials — use left and right arrow keys to navigate"
          aria-roledescription="carousel"
          onMouseEnter={() => setPaused(true)}
          onMouseLeave={() => setPaused(false)}
          onFocus={()    => setPaused(true)}
          onBlur={()     => setPaused(false)}
          className="relative outline-none focus-visible:ring-2 focus-visible:ring-[#3a7d0a]
                     focus-visible:ring-offset-4 rounded-3xl"
        >
          {/* Giant decorative quote mark */}
          <div
            className="absolute -top-6 -left-2 sm:-left-6 font-['Cormorant_Garamond']
                       text-[8rem] leading-none text-[#3a7d0a]/10 select-none pointer-events-none"
            aria-hidden="true"
          >
            "
          </div>

          {/* Card */}
          <div className="relative bg-white rounded-3xl border border-[#3a7d0a]/10
                          shadow-xl shadow-[#1a2e0a]/6 p-8 sm:p-12 min-h-[260px]
                          flex flex-col justify-between overflow-hidden">

            {/* Auto-slide progress bar — resets on each slide */}
            {!paused && (
              <motion.div
                key={`progress-${active}`}
                initial={{ scaleX: 0 }}
                animate={{ scaleX: 1 }}
                transition={{ duration: INTERVAL / 1000, ease: "linear" }}
                style={{ originX: 0 }}
                className="absolute top-0 left-0 right-0 h-[3px] bg-[#3a7d0a]/40"
                aria-hidden="true"
              />
            )}

            {/* Slide content */}
            <AnimatePresence custom={dir} mode="wait">
              <motion.blockquote
                key={active}
                custom={dir}
                variants={slideVariants}
                initial="enter"
                animate="center"
                exit="exit"
                aria-live="polite"
                aria-atomic="true"
                className="flex flex-col gap-8"
              >
                <p className="font-['Cormorant_Garamond'] text-[#1a2e0a] text-xl sm:text-2xl
                              leading-relaxed italic font-medium">
                  "{TESTIMONIALS[active].quote}"
                </p>

                <footer className="flex items-center gap-4 not-italic">
                  <div
                    className={`w-12 h-12 rounded-full flex items-center justify-center
                                flex-shrink-0 text-white font-['Jost'] font-semibold text-sm
                                ${TESTIMONIALS[active].color}`}
                    aria-hidden="true"
                  >
                    {TESTIMONIALS[active].avatar}
                  </div>
                  <div>
                    <cite className="font-['Jost'] font-semibold text-[#1a2e0a] text-sm not-italic">
                      {TESTIMONIALS[active].name}
                    </cite>
                    <p className="font-['Jost'] text-[#1a2e0a]/50 text-xs mt-0.5">
                      {TESTIMONIALS[active].role}
                    </p>
                  </div>
                </footer>
              </motion.blockquote>
            </AnimatePresence>
          </div>

          {/* Controls row */}
          <div className="flex items-center justify-between mt-6">

            {/* Dot indicators */}
            <div className="flex gap-2" role="tablist" aria-label="Testimonial navigation">
              {TESTIMONIALS.map((_, i) => (
                <button
                  key={i}
                  role="tab"
                  aria-selected={i === active}
                  aria-label={`Go to testimonial ${i + 1}`}
                  onClick={() => go(i)}
                  className={`h-2 rounded-full transition-all duration-300
                              focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#3a7d0a]
                              ${i === active
                                ? "w-8 bg-[#3a7d0a]"
                                : "w-2 bg-[#3a7d0a]/20 hover:bg-[#3a7d0a]/40"}`}
                />
              ))}
            </div>

            {/* Prev / Next buttons */}
            <div className="flex gap-2">
              <button
                onClick={prev}
                aria-label="Previous testimonial"
                className="w-10 h-10 rounded-full border border-[#1a2e0a]/15
                           flex items-center justify-center
                           hover:border-[#3a7d0a] hover:bg-[#3a7d0a]/6
                           transition-all duration-200
                           focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#3a7d0a]"
              >
                <svg width="16" height="16" viewBox="0 0 16 16" fill="none" aria-hidden="true">
                  <path d="M10 4L6 8L10 12" stroke="#1a2e0a" strokeWidth="1.5"
                        strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
              </button>
              <button
                onClick={next}
                aria-label="Next testimonial"
                className="w-10 h-10 rounded-full border border-[#1a2e0a]/15
                           flex items-center justify-center
                           hover:border-[#3a7d0a] hover:bg-[#3a7d0a]/6
                           transition-all duration-200
                           focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#3a7d0a]"
              >
                <svg width="16" height="16" viewBox="0 0 16 16" fill="none" aria-hidden="true">
                  <path d="M6 4L10 8L6 12" stroke="#1a2e0a" strokeWidth="1.5"
                        strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
              </button>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}