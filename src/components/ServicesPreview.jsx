import { useRef } from "react";
import { Link } from "react-router-dom";
import { motion, useInView } from "framer-motion";

const SERVICES = [
  {
    icon: (
      <svg width="28" height="28" viewBox="0 0 28 28" fill="none" aria-hidden="true">
        <path d="M14 4C9 4 5 8 5 13C5 18 9 22 14 22C19 22 23 18 23 13C23 8 19 4 14 4Z"
              stroke="#3a7d0a" strokeWidth="1.6" strokeLinecap="round"/>
        <path d="M14 9V14L17 16" stroke="#e07b1a" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round"/>
        <circle cx="14" cy="13" r="1.5" fill="#3a7d0a"/>
      </svg>
    ),
    title:   "Early Intervention",
    summary: "Timely, evidence-based support for children showing signs of developmental delays — the earlier we act, the greater the outcome.",
    color:   "bg-[#3a7d0a]/8 border-[#3a7d0a]/15 hover:border-[#3a7d0a]/40",
    accent:  "text-[#3a7d0a]",
    tag:     "Core Service",
  },
  {
    icon: (
      <svg width="28" height="28" viewBox="0 0 28 28" fill="none" aria-hidden="true">
        <rect x="4" y="7" width="20" height="15" rx="3" stroke="#3a7d0a" strokeWidth="1.6"/>
        <path d="M9 12H19M9 16H15" stroke="#e07b1a" strokeWidth="1.6" strokeLinecap="round"/>
        <path d="M10 4L14 7L18 4" stroke="#3a7d0a" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round"/>
      </svg>
    ),
    title:   "Inclusive Education",
    summary: "Tailored learning programmes and classroom support ensuring children with diverse needs thrive alongside their peers.",
    color:   "bg-[#e07b1a]/6 border-[#e07b1a]/15 hover:border-[#e07b1a]/40",
    accent:  "text-[#e07b1a]",
    tag:     "Education",
  },
  {
    icon: (
      <svg width="28" height="28" viewBox="0 0 28 28" fill="none" aria-hidden="true">
        <circle cx="14" cy="10" r="4" stroke="#3a7d0a" strokeWidth="1.6"/>
        <path d="M7 22C7 18.7 10.1 16 14 16C17.9 16 21 18.7 21 22" stroke="#3a7d0a" strokeWidth="1.6" strokeLinecap="round"/>
        <path d="M20 8L22 10L25 6" stroke="#e07b1a" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"/>
      </svg>
    ),
    title:   "Neurodiversity Support",
    summary: "Specialist assessments and therapy for autism, ADHD, dyslexia, and other neurodivergent profiles — celebrating every mind.",
    color:   "bg-[#6ab523]/8 border-[#6ab523]/15 hover:border-[#6ab523]/40",
    accent:  "text-[#6ab523]",
    tag:     "Specialist Care",
  },
  {
    icon: (
      <svg width="28" height="28" viewBox="0 0 28 28" fill="none" aria-hidden="true">
        <path d="M14 5L16.5 10.5L22.5 11.3L18.2 15.4L19.3 21.4L14 18.5L8.7 21.4L9.8 15.4L5.5 11.3L11.5 10.5L14 5Z"
              stroke="#3a7d0a" strokeWidth="1.6" strokeLinejoin="round"/>
        <circle cx="14" cy="14" r="2.5" fill="#f5a84e"/>
      </svg>
    ),
    title:   "Family Empowerment",
    summary: "Workshops, counselling, and resources that equip parents and caregivers with the tools to support their child's journey at home.",
    color:   "bg-[#f5a84e]/8 border-[#f5a84e]/20 hover:border-[#f5a84e]/50",
    accent:  "text-[#e07b1a]",
    tag:     "Support",
  },
];

const cardVariants = {
  hidden:  { opacity: 0, y: 32 },
  visible: (i) => ({
    opacity: 1, y: 0,
    transition: { delay: i * 0.1, duration: 0.6, ease: [0.22, 1, 0.36, 1] },
  }),
};

export default function ServicesPreview() {
  const ref    = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-60px" });

  return (
    <section
      ref={ref}
      aria-labelledby="services-heading"
      className="relative bg-[#f7f9f4] py-20 md:py-28 overflow-hidden"
    >
      {/* Decorative top curve from dark section */}
      <div className="absolute top-0 left-0 right-0 h-12 bg-[#1a2e0a]" aria-hidden="true">
        <svg viewBox="0 0 1440 48" fill="none" xmlns="http://www.w3.org/2000/svg"
             className="absolute bottom-0 w-full" preserveAspectRatio="none">
          <path d="M0 0L1440 0L1440 10C1200 48 240 48 0 10L0 0Z" fill="#f7f9f4"/>
        </svg>
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-5 sm:px-8 lg:px-12">

        {/* Section header */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
          className="flex flex-col sm:flex-row sm:items-end sm:justify-between gap-6 mb-14"
        >
          <div>
            <p className="font-['Jost'] text-[#3a7d0a] text-xs uppercase tracking-widest mb-3">
              What We Do
            </p>
            <h2
              id="services-heading"
              className="font-['Cormorant_Garamond'] font-semibold text-[#1a2e0a]
                         text-3xl sm:text-4xl md:text-5xl leading-tight"
            >
              Services built around
              <br className="hidden sm:block"/>
              <span className="text-[#3a7d0a]"> your child</span>
            </h2>
          </div>

          <Link
            to="/services"
            className="self-start sm:self-auto inline-flex items-center gap-2
                       font-['Jost'] text-sm font-semibold text-[#3a7d0a]
                       border border-[#3a7d0a]/30 hover:border-[#3a7d0a]
                       hover:bg-[#3a7d0a] hover:text-white
                       px-5 py-2.5 rounded-full transition-all duration-200
                       focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#3a7d0a]"
          >
            View All Services
            <svg width="14" height="14" viewBox="0 0 14 14" fill="none" aria-hidden="true">
              <path d="M2 7H12M8 3L12 7L8 11" stroke="currentColor" strokeWidth="1.6"
                    strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
          </Link>
        </motion.div>

        {/* Cards grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
          {SERVICES.map(({ icon, title, summary, color, accent, tag }, i) => (
            <motion.article
              key={title}
              custom={i}
              variants={cardVariants}
              initial="hidden"
              animate={inView ? "visible" : "hidden"}
              className={`group relative flex flex-col gap-4 p-6 rounded-2xl border
                          transition-all duration-300 hover:-translate-y-1
                          hover:shadow-lg hover:shadow-[#1a2e0a]/8 ${color}`}
            >
              {/* Tag */}
              <span className={`self-start font-['Jost'] text-[10px] font-semibold
                               uppercase tracking-wider ${accent} opacity-70`}>
                {tag}
              </span>

              {/* Icon */}
              <div className="w-12 h-12 rounded-xl bg-white/70 flex items-center justify-center
                              shadow-sm group-hover:scale-110 transition-transform duration-300">
                {icon}
              </div>

              {/* Text */}
              <div className="flex flex-col gap-2 flex-1">
                <h3 className="font-['Cormorant_Garamond'] font-semibold text-[#1a2e0a] text-xl leading-tight">
                  {title}
                </h3>
                <p className="font-['Jost'] text-[#1a2e0a]/60 text-sm leading-relaxed">
                  {summary}
                </p>
              </div>

              {/* Learn more link */}
              <Link
                to="/services"
                className={`inline-flex items-center gap-1.5 font-['Jost'] text-xs font-semibold
                            ${accent} opacity-0 group-hover:opacity-100 -translate-x-1
                            group-hover:translate-x-0 transition-all duration-200
                            focus-visible:opacity-100 focus-visible:outline-none
                            focus-visible:underline`}
                tabIndex={0}
              >
                Learn more
                <svg width="12" height="12" viewBox="0 0 12 12" fill="none" aria-hidden="true">
                  <path d="M2 6H10M7 3L10 6L7 9" stroke="currentColor" strokeWidth="1.5"
                        strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
              </Link>
            </motion.article>
          ))}
        </div>
      </div>
    </section>
  );
}