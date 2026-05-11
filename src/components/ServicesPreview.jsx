import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import { Link } from "react-router-dom";

// ─── Animation variants ───────────────────────────────────────────────────────
const fadeUp = {
  hidden:  { opacity: 0, y: 28 },
  visible: (i = 0) => ({
    opacity: 1, y: 0,
    transition: { delay: i * 0.1, duration: 0.6, ease: [0.22, 1, 0.36, 1] },
  }),
};

const container = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.11, delayChildren: 0.05 } },
};

// ─── Service preview cards ─────────────────────────────────────────────────────
const PREVIEW_SERVICES = [
  {
    id: "consulting",
    color: "#3a7d0a",
    bg: "#3a7d0a",
    number: "01",
    icon: (
      <svg viewBox="0 0 40 40" fill="none" aria-hidden="true" className="w-8 h-8">
        <circle cx="14" cy="13" r="5" stroke="currentColor" strokeWidth="2" />
        <circle cx="28" cy="15" r="4" stroke="currentColor" strokeWidth="2" />
        <path d="M4 34c0-6 4.5-10 10-10s10 4 10 10" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
        <path d="M28 34c0-5 3-8 7-8" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
      </svg>
    ),
    title: "Neurodiversity Consulting",
    blurb: "For schools, families, and organizations — practical strategies to support neurodiverse learners effectively.",
  },
  {
    id: "assessment",
    color: "#e07b1a",
    bg: "#e07b1a",
    number: "02",
    icon: (
      <svg viewBox="0 0 40 40" fill="none" aria-hidden="true" className="w-8 h-8">
        <rect x="8" y="4" width="22" height="28" rx="2.5" stroke="currentColor" strokeWidth="2" />
        <line x1="13" y1="13" x2="24" y2="13" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" />
        <line x1="13" y1="18" x2="24" y2="18" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" />
        <line x1="13" y1="23" x2="20" y2="23" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" />
        <circle cx="29" cy="30" r="6" fill="#1a2e0a" stroke="currentColor" strokeWidth="2" />
        <path d="M26.5 30l2 2 3.5-3.5" stroke="#f5a84e" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
      </svg>
    ),
    title: "Psycho-Educational Assessment",
    blurb: "Comprehensive evaluations that identify learning profiles and deliver clear, actionable support plans.",
  },
  {
    id: "therapy",
    color: "#6ab523",
    bg: "#6ab523",
    number: "03",
    icon: (
      <svg viewBox="0 0 40 40" fill="none" aria-hidden="true" className="w-8 h-8">
        <circle cx="20" cy="16" r="8" stroke="currentColor" strokeWidth="2" />
        <path d="M20 8v8l5 3" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" />
        <path d="M8 32c2-5 6-8 12-8s10 3 12 8" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
      </svg>
    ),
    title: "Therapeutic Interventions",
    blurb: "ABA therapy, speech and language therapy, and social skills development — evidence-based and child-centred.",
  },
  {
    id: "inclusion",
    color: "#3a7d0a",
    bg: "#3a7d0a",
    number: "04",
    icon: (
      <svg viewBox="0 0 40 40" fill="none" aria-hidden="true" className="w-8 h-8">
        <rect x="4" y="10" width="32" height="22" rx="2.5" stroke="currentColor" strokeWidth="2" />
        <line x1="12" y1="19" x2="24" y2="19" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" />
        <line x1="12" y1="25" x2="20" y2="25" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" />
        <circle cx="30" cy="14" r="5" fill="#1a2e0a" stroke="currentColor" strokeWidth="2" />
        <path d="M28 14l1.5 1.5 3-3" stroke="#6ab523" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
      </svg>
    ),
    title: "School Inclusion Support",
    blurb: "IEP development, teacher training, and inclusive classroom strategies that ensure every child truly belongs.",
  },
  {
    id: "training",
    color: "#e07b1a",
    bg: "#e07b1a",
    number: "05",
    icon: (
      <svg viewBox="0 0 40 40" fill="none" aria-hidden="true" className="w-8 h-8">
        <rect x="5" y="9" width="26" height="18" rx="2" stroke="currentColor" strokeWidth="2" />
        <line x1="18" y1="27" x2="18" y2="32" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" />
        <line x1="12" y1="32" x2="24" y2="32" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" />
        <path d="M10 17h10M10 21h7" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" />
        <circle cx="31" cy="19" r="5" stroke="currentColor" strokeWidth="2" />
      </svg>
    ),
    title: "Parent & Professional Training",
    blurb: "Workshops and coaching that equip parents and educators with the right strategies and understanding.",
  },
  {
    id: "advocacy",
    color: "#6ab523",
    bg: "#1a2e0a",
    number: "06",
    icon: (
      <svg viewBox="0 0 40 40" fill="none" aria-hidden="true" className="w-8 h-8">
        <path d="M8 28V18a12 12 0 1 1 24 0v10" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
        <rect x="4" y="24" width="7" height="8" rx="1.5" stroke="currentColor" strokeWidth="1.8" />
        <rect x="29" y="24" width="7" height="8" rx="1.5" stroke="currentColor" strokeWidth="1.8" />
      </svg>
    ),
    title: "Advocacy & Awareness",
    blurb: "Community campaigns and policy advocacy that shift how Nigeria sees, values, and supports neurodiverse children.",
  },
];

// ─── Component ────────────────────────────────────────────────────────────────
export default function ServicesPreview() {
  const ref    = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });

  return (
    <section
      ref={ref}
      aria-labelledby="services-preview-heading"
      className="relative bg-[#f7f9f4] py-20 md:py-28 overflow-hidden"
    >
      {/* Background texture */}
      <div className="absolute inset-0 pointer-events-none opacity-[0.04]" aria-hidden="true">
        <svg width="100%" height="100%">
          <defs>
            <pattern id="sp-dots" x="0" y="0" width="24" height="24" patternUnits="userSpaceOnUse">
              <circle cx="2" cy="2" r="1.5" fill="#3a7d0a" />
            </pattern>
          </defs>
          <rect width="100%" height="100%" fill="url(#sp-dots)" />
        </svg>
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-5 sm:px-8 lg:px-12">

        {/* Header row */}
        <motion.div
          initial="hidden"
          animate={inView ? "visible" : "hidden"}
          variants={container}
          className="flex flex-col lg:flex-row lg:items-end lg:justify-between gap-8 mb-14"
        >
          <div className="max-w-2xl">
            <motion.p
              variants={fadeUp}
              className="font-['Jost'] text-[#6ab523] font-semibold text-xs tracking-widest uppercase mb-3"
            >
              Our Services
            </motion.p>
            <motion.h2
              id="services-preview-heading"
              variants={fadeUp}
              className="font-['Cormorant_Garamond'] font-bold text-4xl sm:text-5xl md:text-6xl text-[#1a2e0a] leading-tight mb-4"
            >
              Support Tailored to{" "}
              <span className="italic text-[#3a7d0a]">Every Need</span>
            </motion.h2>
            {/* ── Client's exact short homepage copy ─────────────────── */}
            <motion.p
              variants={fadeUp}
              className="font-['Jost'] text-[#1a2e0a]/65 text-lg leading-relaxed"
            >
              We support schools, families, and organizations through neurodiversity
              consulting, inclusive learning strategies, parent guidance, and educational
              support tailored to individual needs.
            </motion.p>
          </div>

          {/* Desktop CTA */}
          <motion.div variants={fadeUp} className="hidden lg:block flex-shrink-0">
            <Link
              to="/services"
              className="inline-flex items-center gap-2 font-['Jost'] font-semibold text-sm
                bg-[#1a2e0a] text-white px-7 py-4 rounded-full
                hover:bg-[#3a7d0a] transition-colors duration-200
                focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#3a7d0a]"
            >
              All Services
              <svg viewBox="0 0 20 20" fill="none" className="w-4 h-4" aria-hidden="true">
                <path d="M4 10h12M10 4l6 6-6 6" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" />
              </svg>
            </Link>
          </motion.div>
        </motion.div>

        {/* Services grid */}
        <motion.ul
          initial="hidden"
          animate={inView ? "visible" : "hidden"}
          variants={container}
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5"
          aria-label="Services overview"
        >
          {PREVIEW_SERVICES.map((s, i) => (
            <motion.li key={s.id} custom={i} variants={fadeUp}>
              <Link
                to="/services"
                className="group relative flex flex-col h-full rounded-2xl overflow-hidden
                           border border-[#3a7d0a]/10 bg-white
                           shadow-[0_2px_16px_rgba(58,125,10,0.06)]
                           hover:shadow-[0_8px_32px_rgba(58,125,10,0.14)]
                           hover:-translate-y-1 transition-all duration-300
                           focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#3a7d0a]"
                aria-label={`Learn more about ${s.title}`}
              >
                {/* Top accent bar */}
                <div className="h-1 w-full" style={{ backgroundColor: s.color }} aria-hidden="true" />

                <div className="flex flex-col flex-1 p-6">
                  {/* Number + Icon row */}
                  <div className="flex items-start justify-between mb-5">
                    <span
                      className="font-['Cormorant_Garamond'] font-bold text-4xl leading-none select-none"
                      style={{ color: s.color + "30" }}
                      aria-hidden="true"
                    >
                      {s.number}
                    </span>
                    <span
                      className="p-2.5 rounded-xl"
                      style={{ backgroundColor: s.color + "15", color: s.color }}
                    >
                      {s.icon}
                    </span>
                  </div>

                  {/* Title */}
                  <h3
                    className="font-['Cormorant_Garamond'] font-bold text-2xl text-[#1a2e0a] mb-2
                               group-hover:text-[#3a7d0a] transition-colors duration-200"
                  >
                    {s.title}
                  </h3>

                  {/* Blurb */}
                  <p className="font-['Jost'] text-[#1a2e0a]/60 text-sm leading-relaxed flex-1">
                    {s.blurb}
                  </p>

                  {/* Arrow */}
                  <div
                    className="mt-5 flex items-center gap-1.5 font-['Jost'] font-semibold text-xs"
                    style={{ color: s.color }}
                    aria-hidden="true"
                  >
                    Learn more
                    <svg viewBox="0 0 16 16" fill="none" className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform duration-200">
                      <path d="M3 8h10M8 3l5 5-5 5" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" />
                    </svg>
                  </div>
                </div>
              </Link>
            </motion.li>
          ))}
        </motion.ul>

        {/* ── Client's exact CTA copy ─────────────────────────────────── */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ delay: 0.7, duration: 0.6 }}
          className="mt-14 rounded-3xl bg-[#1a2e0a] p-8 md:p-10
                     flex flex-col md:flex-row md:items-center md:justify-between gap-6"
        >
          <div>
            <p className="font-['Cormorant_Garamond'] font-bold text-2xl sm:text-3xl text-white leading-snug max-w-xl">
              Partner with us to build inclusive and effective support systems for neurodiverse learners.
            </p>
          </div>
          <div className="flex flex-col sm:flex-row gap-3 flex-shrink-0">
            <a
              href="mailto:consulting@renownedchildinitiative.org"
              className="inline-flex items-center justify-center gap-2
                font-['Jost'] font-semibold text-sm
                bg-[#f5a84e] text-[#1a2e0a] px-7 py-4 rounded-full
                hover:bg-[#e07b1a] hover:text-white transition-colors duration-200
                focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#f5a84e]"
            >
              Book a Consultation
              <svg viewBox="0 0 20 20" fill="none" className="w-4 h-4" aria-hidden="true">
                <path d="M4 10h12M10 4l6 6-6 6" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" />
              </svg>
            </a>
            <Link
              to="/services"
              className="inline-flex items-center justify-center gap-2
                font-['Jost'] font-semibold text-sm
                bg-transparent text-white border border-white/25 px-7 py-4 rounded-full
                hover:bg-white/10 transition-colors duration-200
                focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white"
            >
              View All Services
            </Link>
          </div>
        </motion.div>

      </div>
    </section>
  );
}