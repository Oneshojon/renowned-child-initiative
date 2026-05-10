import { useRef } from "react";
import { Link } from "react-router-dom";
import { motion, useInView } from "framer-motion";
import { useSanity }      from "../hooks/useSanity";
import { SERVICES_QUERY } from "../lib/queries";

// ── Icon map — keyed to the "icon" field value in Sanity ──────────
// Client types a keyword in Sanity (e.g. "brain") and gets this icon
const ICON_MAP = {
  brain: (
    <svg width="28" height="28" viewBox="0 0 28 28" fill="none" aria-hidden="true">
      <path d="M14 4C9 4 5 8 5 13C5 18 9 22 14 22C19 22 23 18 23 13C23 8 19 4 14 4Z"
            stroke="#3a7d0a" strokeWidth="1.6" strokeLinecap="round"/>
      <path d="M14 9V14L17 16" stroke="#e07b1a" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round"/>
      <circle cx="14" cy="13" r="1.5" fill="#3a7d0a"/>
    </svg>
  ),
  school: (
    <svg width="28" height="28" viewBox="0 0 28 28" fill="none" aria-hidden="true">
      <rect x="4" y="7" width="20" height="15" rx="3" stroke="#3a7d0a" strokeWidth="1.6"/>
      <path d="M9 12H19M9 16H15" stroke="#e07b1a" strokeWidth="1.6" strokeLinecap="round"/>
      <path d="M10 4L14 7L18 4" stroke="#3a7d0a" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round"/>
    </svg>
  ),
  neurodiversity: (
    <svg width="28" height="28" viewBox="0 0 28 28" fill="none" aria-hidden="true">
      <circle cx="14" cy="10" r="4" stroke="#3a7d0a" strokeWidth="1.6"/>
      <path d="M7 22C7 18.7 10.1 16 14 16C17.9 16 21 18.7 21 22" stroke="#3a7d0a" strokeWidth="1.6" strokeLinecap="round"/>
      <path d="M20 8L22 10L25 6" stroke="#e07b1a" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"/>
    </svg>
  ),
  family: (
    <svg width="28" height="28" viewBox="0 0 28 28" fill="none" aria-hidden="true">
      <path d="M14 5L16.5 10.5L22.5 11.3L18.2 15.4L19.3 21.4L14 18.5L8.7 21.4L9.8 15.4L5.5 11.3L11.5 10.5L14 5Z"
            stroke="#3a7d0a" strokeWidth="1.6" strokeLinejoin="round"/>
      <circle cx="14" cy="14" r="2.5" fill="#f5a84e"/>
    </svg>
  ),
  intervention: (
    <svg width="28" height="28" viewBox="0 0 28 28" fill="none" aria-hidden="true">
      <circle cx="14" cy="14" r="9" stroke="#3a7d0a" strokeWidth="1.6"/>
      <path d="M14 9V14L17 17" stroke="#e07b1a" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round"/>
    </svg>
  ),
  support: (
    <svg width="28" height="28" viewBox="0 0 28 28" fill="none" aria-hidden="true">
      <path d="M14 6C9.6 6 6 9.6 6 14C6 18.4 9.6 22 14 22C18.4 22 22 18.4 22 14"
            stroke="#3a7d0a" strokeWidth="1.6" strokeLinecap="round"/>
      <path d="M19 6L22 9M22 6L19 9" stroke="#e07b1a" strokeWidth="1.6" strokeLinecap="round"/>
    </svg>
  ),
  speech: (
    <svg width="28" height="28" viewBox="0 0 28 28" fill="none" aria-hidden="true">
      <path d="M6 18 Q6 10 14 10 Q22 10 22 18 L22 20 Q22 24 18 24 L12 24 L8 26 L9 24 Q6 24 6 20 Z"
            stroke="#3a7d0a" strokeWidth="1.6" strokeLinejoin="round" fill="none"/>
      <line x1="11" y1="16" x2="17" y2="16" stroke="#e07b1a" strokeWidth="1.6" strokeLinecap="round"/>
      <line x1="11" y1="19" x2="15" y2="19" stroke="#3a7d0a" strokeWidth="1.6" strokeLinecap="round"/>
    </svg>
  ),
  training: (
    <svg width="28" height="28" viewBox="0 0 28 28" fill="none" aria-hidden="true">
      <circle cx="14" cy="10" r="4" stroke="#3a7d0a" strokeWidth="1.6"/>
      <path d="M6 24C6 20 9.6 17 14 17C18.4 17 22 20 22 24" stroke="#3a7d0a" strokeWidth="1.6" strokeLinecap="round"/>
      <path d="M20 11L22 9M22 9L24 7M22 9L24 11M22 9L20 7" stroke="#e07b1a" strokeWidth="1.6" strokeLinecap="round"/>
    </svg>
  ),
};

// Default icon if keyword not found in map
const DEFAULT_ICON = (
  <svg width="28" height="28" viewBox="0 0 28 28" fill="none" aria-hidden="true">
    <circle cx="14" cy="14" r="9" stroke="#3a7d0a" strokeWidth="1.6"/>
    <path d="M14 10V15M14 18V18.5" stroke="#e07b1a" strokeWidth="1.8" strokeLinecap="round"/>
  </svg>
);

// Color palette — cycles through for each card
const CARD_STYLES = [
  { color: "bg-[#3a7d0a]/8 border-[#3a7d0a]/15 hover:border-[#3a7d0a]/40", accent: "text-[#3a7d0a]", tag: "Core Service" },
  { color: "bg-[#e07b1a]/6 border-[#e07b1a]/15 hover:border-[#e07b1a]/40", accent: "text-[#e07b1a]", tag: "Education" },
  { color: "bg-[#6ab523]/8 border-[#6ab523]/15 hover:border-[#6ab523]/40", accent: "text-[#6ab523]", tag: "Specialist Care" },
  { color: "bg-[#f5a84e]/8 border-[#f5a84e]/20 hover:border-[#f5a84e]/50", accent: "text-[#e07b1a]", tag: "Support" },
];

// ── Hardcoded fallback — shown while Sanity loads ─────────────────
const FALLBACK_SERVICES = [
  { title: "Early Intervention",    summary: "Timely, evidence-based support for children showing signs of developmental delays.",          icon: "intervention" },
  { title: "Inclusive Education",   summary: "Tailored learning programmes ensuring children with diverse needs thrive alongside peers.",    icon: "school" },
  { title: "Neurodiversity Support", summary: "Specialist assessments for autism, ADHD, dyslexia and other neurodivergent profiles.",       icon: "neurodiversity" },
  { title: "Family Empowerment",    summary: "Workshops and resources that equip parents with tools to support their child at home.",       icon: "family" },
];

const cardVariants = {
  hidden:  { opacity: 0, y: 32 },
  visible: (i) => ({
    opacity: 1, y: 0,
    transition: { delay: i * 0.1, duration: 0.6, ease: [0.22, 1, 0.36, 1] },
  }),
};

// ── Service card ──────────────────────────────────────────────────
function ServiceCard({ service, index, inView }) {
  const style = CARD_STYLES[index % CARD_STYLES.length];
  const icon  = ICON_MAP[service.icon] ?? DEFAULT_ICON;

  return (
    <motion.article
      key={service._id ?? service.title}
      custom={index}
      variants={cardVariants}
      initial="hidden"
      animate={inView ? "visible" : "hidden"}
      className={`group relative flex flex-col gap-4 p-6 rounded-2xl border
                  transition-all duration-300 hover:-translate-y-1
                  hover:shadow-lg hover:shadow-[#1a2e0a]/8 ${style.color}`}
    >
      {/* Tag */}
      <span className={`self-start font-['Jost'] text-[10px] font-semibold
                       uppercase tracking-wider ${style.accent} opacity-70`}>
        {style.tag}
      </span>

      {/* Icon */}
      <div className="w-12 h-12 rounded-xl bg-white/70 flex items-center justify-center
                      shadow-sm group-hover:scale-110 transition-transform duration-300">
        {icon}
      </div>

      {/* Text */}
      <div className="flex flex-col gap-2 flex-1">
        <h3 className="font-['Cormorant_Garamond'] font-semibold text-[#1a2e0a] text-xl leading-tight">
          {service.title}
        </h3>
        <p className="font-['Jost'] text-[#1a2e0a]/60 text-sm leading-relaxed">
          {service.tagline ?? service.summary}
        </p>
      </div>

      {/* Learn more */}
      <Link
        to="/services"
        className={`inline-flex items-center gap-1.5 font-['Jost'] text-xs font-semibold
                    ${style.accent} opacity-0 group-hover:opacity-100 -translate-x-1
                    group-hover:translate-x-0 transition-all duration-200
                    focus-visible:opacity-100 focus-visible:outline-none focus-visible:underline`}
      >
        Learn more
        <svg width="12" height="12" viewBox="0 0 12 12" fill="none" aria-hidden="true">
          <path d="M2 6H10M7 3L10 6L7 9" stroke="currentColor" strokeWidth="1.5"
                strokeLinecap="round" strokeLinejoin="round"/>
        </svg>
      </Link>
    </motion.article>
  );
}

export default function ServicesPreview() {
  const ref    = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-60px" });
  const { data: services, loading } = useSanity(SERVICES_QUERY);

  // Use Sanity data if available, otherwise show fallback
  const displayServices = (!loading && services?.length) ? services : FALLBACK_SERVICES;

  return (
    <section
      ref={ref}
      aria-labelledby="services-heading"
      className="relative bg-[#f7f9f4] py-20 md:py-28 overflow-hidden"
    >
      {/* Decorative top curve */}
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
          {displayServices.map((service, i) => (
            <ServiceCard
              key={service._id ?? service.title}
              service={service}
              index={i}
              inView={inView}
            />
          ))}
        </div>
      </div>
    </section>
  );
}