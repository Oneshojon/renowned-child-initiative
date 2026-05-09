import { useEffect, useRef } from "react";
import { Link } from "react-router-dom";
import { motion, useInView, useScroll, useTransform } from "framer-motion";

// ── Stagger container for child animations ────────────────────────
const container = {
  hidden: {},
  visible: {
    transition: { staggerChildren: 0.13, delayChildren: 0.1 },
  },
};

const fadeUp = {
  hidden:  { opacity: 0, y: 32 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.65, ease: [0.22, 1, 0.36, 1] } },
};

const fadeIn = {
  hidden:  { opacity: 0 },
  visible: { opacity: 1, transition: { duration: 0.8, ease: "easeOut" } },
};

// ── Animated stat pill ────────────────────────────────────────────
function StatPill({ number, label, delay = 0 }) {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.88 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ delay, duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
      className="flex flex-col items-center px-5 py-3 rounded-2xl
                 bg-white/70 backdrop-blur-sm border border-[#3a7d0a]/12
                 shadow-sm shadow-[#1a2e0a]/6"
    >
      <span className="font-['Cormorant_Garamond'] text-2xl font-bold text-[#3a7d0a] leading-none">
        {number}
      </span>
      <span className="font-['Jost'] text-[11px] text-[#1a2e0a]/75 uppercase tracking-wider mt-0.5">
        {label}
      </span>
    </motion.div>
  );
}

// ── Floating card (overlays on the visual side) ───────────────────
function FloatingCard({ className, children, delay = 0 }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 16 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay, duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
      className={`absolute bg-white/85 backdrop-blur-md rounded-2xl px-4 py-3
                  border border-[#3a7d0a]/12 shadow-lg shadow-[#1a2e0a]/8 ${className}`}
    >
      {children}
    </motion.div>
  );
}

export default function Hero() {
  const sectionRef  = useRef(null);
  const isInView    = useInView(sectionRef, { once: true, margin: "-80px" });

  // Subtle parallax on scroll
  const { scrollYProgress } = useScroll({ target: sectionRef, offset: ["start start", "end start"] });
  const bgY    = useTransform(scrollYProgress, [0, 1], ["0%",  "18%"]);
  const textY  = useTransform(scrollYProgress, [0, 1], ["0%",  "8%"]);
  const imageY = useTransform(scrollYProgress, [0, 1], ["0%", "-6%"]);

  return (
    <section
      ref={sectionRef}
      aria-labelledby="hero-heading"
      className="relative min-h-screen flex items-center overflow-hidden bg-[#f7f9f4]"
    >

      {/* ── Background organic shapes ──────────────────────────── */}
      <motion.div style={{ y: bgY }} className="absolute inset-0 pointer-events-none" aria-hidden="true">
        {/* Large green blob — top right */}
        <svg
          className="absolute -top-24 -right-24 w-[520px] h-[520px] opacity-[0.12]"
          viewBox="0 0 520 520" fill="none"
        >
          <path
            d="M260 20C360 20 480 80 500 200C520 320 440 460 320 490C200 520 60 460 20 340C-20 220 60 80 160 40C200 27 230 20 260 20Z"
            fill="#3a7d0a"
          />
        </svg>

        {/* Small amber blob — bottom left */}
        <svg
          className="absolute -bottom-16 -left-16 w-[340px] h-[340px] opacity-[0.14]"
          viewBox="0 0 340 340" fill="none"
        >
          <path
            d="M170 10C240 10 320 60 335 150C350 240 300 320 210 338C120 356 20 300 5 210C-10 120 50 30 130 12C143 10 156 10 170 10Z"
            fill="#e07b1a"
          />
        </svg>

        {/* Dot grid texture */}
        <svg className="absolute inset-0 w-full h-full opacity-[0.06]" xmlns="http://www.w3.org/2000/svg">
          <defs>
            <pattern id="dots" x="0" y="0" width="24" height="24" patternUnits="userSpaceOnUse">
              <circle cx="2" cy="2" r="1.2" fill="#3a7d0a" />
            </pattern>
          </defs>
          <rect width="100%" height="100%" fill="url(#dots)" />
        </svg>
      </motion.div>

      {/* ── Main grid ─────────────────────────────────────────────── */}
      <div className="relative z-10 max-w-7xl mx-auto px-5 sm:px-8 lg:px-12 w-full
                      pt-28 pb-16 md:pt-32 md:pb-20
                      grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-8 items-center">

        {/* ── LEFT — Text content ──────────────────────────────── */}
        <motion.div
          style={{ y: textY }}
          variants={container}
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
          className="flex flex-col gap-6 lg:pr-8"
        >
          {/* Eyebrow tag */}
          <motion.div variants={fadeUp}>
            <span className="inline-flex items-center gap-2 font-['Jost'] text-xs font-semibold
                             uppercase tracking-widest text-[#3a7d0a]
                             bg-[#3a7d0a]/8 border border-[#3a7d0a]/20
                             px-4 py-2 rounded-full">
              <span className="w-1.5 h-1.5 rounded-full bg-[#6ab523] animate-pulse" aria-hidden="true" />
              Empowering Every Child
            </span>
          </motion.div>

          {/* Main heading */}
          <motion.h1
            id="hero-heading"
            variants={fadeUp}
            className="font-['Cormorant_Garamond'] font-semibold text-[#1a2e0a]
                       text-5xl sm:text-6xl xl:text-7xl leading-[1.05] tracking-tight"
          >
            Every Child
            <br />
            Deserves to{" "}
            <span className="relative inline-block">
              <span className="relative z-10 text-[#3a7d0a]">Thrive</span>
              {/* Animated underline */}
              <motion.span
                initial={{ scaleX: 0 }}
                animate={isInView ? { scaleX: 1 } : { scaleX: 0 }}
                transition={{ delay: 0.7, duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
                style={{ originX: 0 }}
                className="absolute bottom-1 left-0 right-0 h-[3px] rounded-full
                           bg-gradient-to-r from-[#6ab523] to-[#e07b1a]"
                aria-hidden="true"
              />
            </span>
          </motion.h1>

          {/* Body copy */}
          <motion.p
            variants={fadeUp}
            className="font-['Jost'] text-base sm:text-lg text-[#1a2e0a]/80 leading-relaxed max-w-lg"
          >
            We provide specialised neurodiversity support, inclusive education,
            and early intervention services — helping children with diverse
            learning needs reach their fullest potential.
          </motion.p>

          {/* CTA buttons */}
          <motion.div variants={fadeUp} className="flex flex-wrap gap-3 pt-1">
            <Link
              to="/contact"
              className="inline-flex items-center gap-2.5 font-['Jost'] font-semibold text-sm
                         bg-[#3a7d0a] hover:bg-[#6ab523] text-white
                         px-6 py-3.5 rounded-full transition-all duration-200
                         hover:shadow-lg hover:shadow-[#3a7d0a]/30 hover:-translate-y-0.5
                         focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#3a7d0a] focus-visible:ring-offset-2"
            >
              Get Support
              <svg width="15" height="15" viewBox="0 0 15 15" fill="none" aria-hidden="true">
                <path d="M2 7.5H13M9 3L13 7.5L9 12" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
            </Link>

            <Link
              to="/about"
              className="inline-flex items-center gap-2 font-['Jost'] font-medium text-sm
                         text-[#1a2e0a] bg-white border border-[#1a2e0a]/15
                         hover:border-[#3a7d0a] hover:text-[#3a7d0a]
                         px-6 py-3.5 rounded-full transition-all duration-200
                         hover:-translate-y-0.5 hover:shadow-md
                         focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#3a7d0a] focus-visible:ring-offset-2"
            >
              Our Story
            </Link>
          </motion.div>

          {/* Stats row */}
          <motion.div variants={fadeUp} className="flex flex-wrap gap-3 pt-2">
            <StatPill number="500+" label="Children Supported" delay={0.8} />
            <StatPill number="10+"  label="Years of Impact"    delay={0.9} />
            <StatPill number="95%"  label="Family Satisfaction" delay={1.0} />
          </motion.div>
        </motion.div>

        {/* ── RIGHT — Visual ───────────────────────────────────── */}
        <motion.div
          style={{ y: imageY }}
          variants={fadeIn}
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
          className="relative flex items-center justify-center lg:justify-end"
        >
          {/* Main image container */}
          <div className="relative w-full max-w-sm sm:max-w-md lg:max-w-full">

            {/* Decorative ring behind image */}
            <div
              className="absolute inset-4 rounded-[2.5rem] border-2 border-dashed border-[#6ab523]/30"
              aria-hidden="true"
            />

            {/* Green fill block — offset for depth */}
            <div
              className="absolute inset-0 translate-x-4 translate-y-4 rounded-[2.5rem] bg-[#3a7d0a]/8"
              aria-hidden="true"
            />

            {/* Image itself */}
            <div className="relative rounded-[2.5rem] overflow-hidden aspect-[4/5] bg-[#e8f0e0]
                            border border-[#3a7d0a]/10 shadow-xl shadow-[#1a2e0a]/10">
              <img
                src="/hero-image.jpg"
                alt="A joyful child engaged in a learning activity at Renowned Child Initiative"
                className="w-full h-full object-cover"
                loading="eager"
                decoding="async"
                onError={(e) => {
                  // Fallback placeholder if image not found
                  e.currentTarget.style.display = "none";
                  e.currentTarget.parentElement.classList.add("flex", "items-center", "justify-center");
                }}
              />

              {/* Overlay gradient at bottom for text legibility */}
              <div
                className="absolute inset-x-0 bottom-0 h-1/3
                           bg-gradient-to-t from-[#1a2e0a]/40 to-transparent"
                aria-hidden="true"
              />
            </div>

            {/* ── Floating cards ────────────────────────────────── */}
            {/* Top left — mission chip */}
            <FloatingCard
              className="-left-4 sm:-left-8 top-8"
              delay={1.0}
            >
              <div className="flex items-center gap-2">
                <span className="text-xl" role="img" aria-label="heart">💚</span>
                <div>
                  <p className="font-['Jost'] text-xs font-semibold text-[#1a2e0a]">Inclusive Care</p>
                  <p className="font-['Jost'] text-[10px] text-[#1a2e0a]/55">For every child</p>
                </div>
              </div>
            </FloatingCard>

            {/* Bottom right — trust badge */}
            <FloatingCard
              className="-right-4 sm:-right-8 bottom-12"
              delay={1.15}
            >
              <div className="flex items-center gap-2.5">
                <div className="w-8 h-8 rounded-full bg-[#3a7d0a]/10 flex items-center justify-center flex-shrink-0">
                  <svg width="16" height="16" viewBox="0 0 16 16" fill="none" aria-hidden="true">
                    <path d="M8 1L10 6H15L11 9.5L12.5 14.5L8 11.5L3.5 14.5L5 9.5L1 6H6L8 1Z"
                          fill="#3a7d0a"/>
                  </svg>
                </div>
                <div>
                  <p className="font-['Jost'] text-xs font-semibold text-[#1a2e0a]">Trusted by Families</p>
                  <p className="font-['Jost'] text-[10px] text-[#1a2e0a]/55">Across Nigeria</p>
                </div>
              </div>
            </FloatingCard>
          </div>
        </motion.div>
      </div>

      {/* ── Scroll indicator ──────────────────────────────────────── */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.6, duration: 0.6 }}
        className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-1.5"
        aria-hidden="true"
      >
        <span className="font-['Jost'] text-[10px] uppercase tracking-widest text-[#1a2e0a]/35">
          Scroll
        </span>
        <motion.div
          animate={{ y: [0, 6, 0] }}
          transition={{ repeat: Infinity, duration: 1.6, ease: "easeInOut" }}
          className="w-[1px] h-8 bg-gradient-to-b from-[#3a7d0a]/40 to-transparent rounded-full"
        />
      </motion.div>
    </section>
  );
}