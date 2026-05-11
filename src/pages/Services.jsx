import { useRef, useState } from "react";
import { motion, useInView, AnimatePresence } from "framer-motion";
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
  visible: { transition: { staggerChildren: 0.1, delayChildren: 0.05 } },
};

// ─── Data ─────────────────────────────────────────────────────────────────────

/**
 * Neurodiversity Consulting — client's exact content (WhatsApp, 10/05)
 * Three audiences: Schools · Families · Organizations
 */
const CONSULTING_AUDIENCES = [
  {
    id: "schools",
    label: "For Schools",
    color: "#3a7d0a",
    icon: (
      <svg viewBox="0 0 40 40" fill="none" aria-hidden="true" className="w-7 h-7">
        <rect x="6" y="16" width="28" height="18" rx="2" stroke="currentColor" strokeWidth="2" />
        <path d="M2 18L20 6l18 12" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
        <rect x="15" y="24" width="10" height="10" rx="1" stroke="currentColor" strokeWidth="1.8" />
      </svg>
    ),
    items: [
      "Inclusive classroom support",
      "Learning accommodations and intervention strategies",
      "Teacher guidance and training",
      "Behaviour and emotional regulation support",
      "IEP and learning support collaboration",
      "Neurodiversity awareness sessions",
    ],
  },
  {
    id: "families",
    label: "For Families",
    color: "#e07b1a",
    icon: (
      <svg viewBox="0 0 40 40" fill="none" aria-hidden="true" className="w-7 h-7">
        <circle cx="14" cy="13" r="5" stroke="currentColor" strokeWidth="2" />
        <circle cx="28" cy="15" r="4" stroke="currentColor" strokeWidth="2" />
        <path d="M4 34c0-6 4.5-10 10-10s10 4 10 10" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
        <path d="M28 34c0-5 3-8 7-8" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
      </svg>
    ),
    items: [
      "Parent coaching and guidance",
      "Home support strategies",
      "Understanding learning differences",
      "Academic and emotional support planning",
      "Communication and behaviour support",
    ],
  },
  {
    id: "organizations",
    label: "For Organizations",
    color: "#6ab523",
    icon: (
      <svg viewBox="0 0 40 40" fill="none" aria-hidden="true" className="w-7 h-7">
        <rect x="8" y="8" width="10" height="10" rx="1.5" stroke="currentColor" strokeWidth="2" />
        <rect x="22" y="8" width="10" height="10" rx="1.5" stroke="currentColor" strokeWidth="2" />
        <rect x="8" y="22" width="10" height="10" rx="1.5" stroke="currentColor" strokeWidth="2" />
        <rect x="22" y="22" width="10" height="10" rx="1.5" stroke="currentColor" strokeWidth="2" />
      </svg>
    ),
    items: [
      "Neurodiversity awareness workshops",
      "Inclusive education consulting",
      "Staff training and capacity building",
      "Child development support programs",
      "Educational program development",
    ],
  },
];

// Other services (existing content from earlier build)
const OTHER_SERVICES = [
  {
    id: "assessment",
    number: "02",
    color: "#e07b1a",
    icon: (
      <svg viewBox="0 0 48 48" fill="none" aria-hidden="true" className="w-10 h-10">
        <rect x="10" y="6" width="28" height="36" rx="3" stroke="#e07b1a" strokeWidth="2.2" />
        <line x1="17" y1="16" x2="31" y2="16" stroke="#f5a84e" strokeWidth="2" strokeLinecap="round" />
        <line x1="17" y1="22" x2="31" y2="22" stroke="#f5a84e" strokeWidth="2" strokeLinecap="round" />
        <line x1="17" y1="28" x2="25" y2="28" stroke="#f5a84e" strokeWidth="2" strokeLinecap="round" />
        <circle cx="34" cy="36" r="7" fill="#1a2e0a" stroke="#e07b1a" strokeWidth="2" />
        <path d="M31 36l2 2 4-4" stroke="#f5a84e" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
      </svg>
    ),
    title: "Psycho-Educational Assessment",
    tagline: "Understanding how a child learns is the foundation of every great intervention.",
    description:
      "Our assessments identify learning profiles, cognitive strengths, and areas of difficulty across reading, writing, attention, memory, and processing. Each report comes with clear, actionable recommendations for parents, teachers, and support teams.",
    conditions: [
      "Learning disability screening",
      "Cognitive profile mapping",
      "Reading & literacy assessment",
      "Attention & executive function",
      "Memory & processing speed",
      "Written expression evaluation",
    ],
  },
  {
    id: "therapy",
    number: "03",
    color: "#3a7d0a",
    icon: (
      <svg viewBox="0 0 48 48" fill="none" aria-hidden="true" className="w-10 h-10">
        <circle cx="24" cy="20" r="10" stroke="#6ab523" strokeWidth="2.2" />
        <path d="M24 10v10l6 4" stroke="#3a7d0a" strokeWidth="2" strokeLinecap="round" />
        <path d="M10 38c2-6 7-10 14-10s12 4 14 10" stroke="#6ab523" strokeWidth="2.2" strokeLinecap="round" />
      </svg>
    ),
    title: "Therapeutic Interventions",
    tagline: "Evidence-based therapy that meets each child's unique profile.",
    description:
      "We deliver targeted therapeutic support including ABA therapy, speech and language therapy, and social skills development. Sessions are structured, play-informed, and adjusted regularly based on measurable progress.",
    conditions: [
      "ABA therapy",
      "Speech & language therapy",
      "Social skills development",
      "Sensory integration support",
      "Emotional regulation coaching",
      "Play-based intervention",
    ],
  },
  {
    id: "inclusion",
    number: "04",
    color: "#e07b1a",
    icon: (
      <svg viewBox="0 0 48 48" fill="none" aria-hidden="true" className="w-10 h-10">
        <circle cx="24" cy="24" r="14" stroke="#f5a84e" strokeWidth="2" />
        <circle cx="24" cy="24" r="6"  fill="#e07b1a" opacity="0.3" />
        <line x1="24" y1="10" x2="24" y2="14" stroke="#e07b1a" strokeWidth="2" strokeLinecap="round" />
        <line x1="24" y1="34" x2="24" y2="38" stroke="#e07b1a" strokeWidth="2" strokeLinecap="round" />
        <line x1="10" y1="24" x2="14" y2="24" stroke="#e07b1a" strokeWidth="2" strokeLinecap="round" />
        <line x1="34" y1="24" x2="38" y2="24" stroke="#e07b1a" strokeWidth="2" strokeLinecap="round" />
      </svg>
    ),
    title: "School Inclusion Support",
    tagline: "Helping schools become places where every child can truly belong.",
    description:
      "We partner with schools to create genuinely inclusive learning environments. This includes teacher training, Individual Education Plan (IEP) development, classroom adaptation guidance, and ongoing consultation to ensure neurodiverse students are not just present — but actively supported.",
    conditions: [
      "IEP development & review",
      "Classroom adaptation guidance",
      "Teacher & staff training",
      "Inclusion policy development",
      "Student progress monitoring",
      "Parent–school partnership support",
    ],
  },
  {
    id: "training",
    number: "05",
    color: "#3a7d0a",
    icon: (
      <svg viewBox="0 0 48 48" fill="none" aria-hidden="true" className="w-10 h-10">
        <rect x="8" y="12" width="32" height="22" rx="3" stroke="#6ab523" strokeWidth="2.2" />
        <line x1="24" y1="34" x2="24" y2="40" stroke="#6ab523" strokeWidth="2" strokeLinecap="round" />
        <line x1="16" y1="40" x2="32" y2="40" stroke="#6ab523" strokeWidth="2" strokeLinecap="round" />
        <path d="M16 22h8M16 27h5" stroke="#3a7d0a" strokeWidth="2" strokeLinecap="round" />
        <circle cx="33" cy="24" r="4" stroke="#f5a84e" strokeWidth="2" />
      </svg>
    ),
    title: "Parent & Professional Training",
    tagline: "Empowering the adults in a child's life is just as important as supporting the child.",
    description:
      "We run structured workshops and coaching sessions for parents, teachers, and support workers. Topics cover understanding learning differences, building effective home and classroom routines, positive behaviour strategies, and how to communicate effectively with a neurodiverse child.",
    conditions: [
      "Parent coaching workshops",
      "Teacher professional development",
      "Behaviour management strategies",
      "Home routine & structure building",
      "Communication techniques",
      "Understanding neurodiversity",
    ],
  },
  {
    id: "advocacy",
    number: "06",
    color: "#e07b1a",
    icon: (
      <svg viewBox="0 0 48 48" fill="none" aria-hidden="true" className="w-10 h-10">
        <path d="M10 34V20a14 14 0 1 1 28 0v14" stroke="#f5a84e" strokeWidth="2.2" strokeLinecap="round" />
        <rect x="6" y="30" width="8" height="10" rx="2" stroke="#e07b1a" strokeWidth="2" />
        <rect x="34" y="30" width="8" height="10" rx="2" stroke="#e07b1a" strokeWidth="2" />
      </svg>
    ),
    title: "Advocacy & Awareness",
    tagline: "Change starts with understanding — and understanding starts with awareness.",
    description:
      "We advocate for the rights of neurodiverse children in schools, communities, and policy spaces. Our awareness campaigns, community talks, and media presence work to shift public perception and reduce the stigma that still surrounds learning differences in Nigeria.",
    conditions: [
      "Community awareness campaigns",
      "Policy advocacy",
      "Media & social awareness",
      "School neurodiversity drives",
      "Family empowerment programs",
      "Stigma reduction initiatives",
    ],
  },
];

// Conditions RCI supports
const CONDITIONS = [
  "Dyslexia", "Dyscalculia", "Dysgraphia", "ADHD / ADD",
  "Autism Spectrum", "Developmental Delay", "Processing Disorders",
  "Intellectual Disability", "Language Delays", "Social Communication",
  "Sensory Processing", "Executive Dysfunction",
];

// ─── ServicesHero ─────────────────────────────────────────────────────────────
function ServicesHero() {
  return (
    <section
      aria-labelledby="services-hero-heading"
      className="relative overflow-hidden bg-[#f7f9f4] pt-28 pb-20 md:pt-36 md:pb-28"
    >
      {/* Background dot grid */}
      <div className="absolute inset-0 pointer-events-none opacity-[0.06]" aria-hidden="true">
        <svg width="100%" height="100%">
          <defs>
            <pattern id="sh-dots" x="0" y="0" width="24" height="24" patternUnits="userSpaceOnUse">
              <circle cx="2" cy="2" r="1.5" fill="#3a7d0a" />
            </pattern>
          </defs>
          <rect width="100%" height="100%" fill="url(#sh-dots)" />
        </svg>
      </div>
      {/* Amber blob */}
      <div className="absolute top-0 right-0 w-80 h-80 rounded-full bg-[#f5a84e]/15 blur-3xl pointer-events-none" aria-hidden="true" />

      <div className="relative z-10 max-w-7xl mx-auto px-5 sm:px-8 lg:px-12">
        <motion.div
          initial="hidden"
          animate="visible"
          variants={container}
          className="max-w-3xl"
        >
          <motion.p variants={fadeUp} className="font-['Jost'] text-[#6ab523] font-semibold text-sm tracking-widest uppercase mb-4">
            What We Offer
          </motion.p>
          <motion.h1
            id="services-hero-heading"
            variants={fadeUp}
            className="font-['Cormorant_Garamond'] font-bold text-5xl sm:text-6xl md:text-7xl text-[#1a2e0a] leading-tight mb-6"
          >
            Specialist{" "}
            <span className="relative inline-block">
              Support
              <span className="absolute -bottom-1 left-0 w-full h-1 bg-[#6ab523] rounded-full" aria-hidden="true" />
            </span>{" "}
            Services
          </motion.h1>
          <motion.p
            variants={fadeUp}
            className="font-['Jost'] text-[#1a2e0a]/70 text-lg sm:text-xl leading-relaxed max-w-2xl"
          >
            We support schools, families, and organizations through neurodiversity consulting,
            inclusive learning strategies, parent guidance, and educational support tailored
            to individual needs.
          </motion.p>
        </motion.div>
      </div>
    </section>
  );
}

// ─── ConditionsBanner ─────────────────────────────────────────────────────────
function ConditionsBanner() {
  const ref    = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-60px" });

  return (
    <section ref={ref} aria-label="Conditions we support" className="bg-[#1a2e0a] py-10 overflow-hidden">
      <div className="max-w-7xl mx-auto px-5 sm:px-8 lg:px-12">
        <p className="font-['Jost'] text-[#6ab523] text-xs font-semibold tracking-widest uppercase mb-5">
          Conditions We Support
        </p>
        <ul className="flex flex-wrap gap-2" aria-label="List of conditions">
          {CONDITIONS.map((c, i) => (
            <motion.li
              key={c}
              custom={i}
              initial="hidden"
              animate={inView ? "visible" : "hidden"}
              variants={fadeUp}
            >
              <span
                className="inline-block font-['Jost'] text-sm font-medium text-white/80
                           px-4 py-2 rounded-full border border-white/15
                           hover:bg-[#f5a84e]/20 hover:text-[#f5a84e] hover:border-[#f5a84e]/30
                           transition-colors duration-200 cursor-default"
              >
                {c}
              </span>
            </motion.li>
          ))}
        </ul>
      </div>
    </section>
  );
}

// ─── NeurodiversityConsulting ─────────────────────────────────────────────────
// Client's exact content — Neurodiversity Consulting section
function NeurodiversityConsulting() {
  const ref    = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });
  const [active, setActive] = useState("schools");

  const current = CONSULTING_AUDIENCES.find((a) => a.id === active);

  return (
    <section
      ref={ref}
      aria-labelledby="consulting-heading"
      className="relative py-20 md:py-28 bg-[#f7f9f4] overflow-hidden"
    >
      {/* Decorative side stripe */}
      <div className="absolute left-0 top-0 w-1.5 h-full bg-gradient-to-b from-[#3a7d0a] via-[#6ab523] to-[#f5a84e]" aria-hidden="true" />

      <div className="max-w-7xl mx-auto px-5 sm:px-8 lg:px-12">

        {/* Service number + heading */}
        <motion.div
          initial="hidden"
          animate={inView ? "visible" : "hidden"}
          variants={container}
          className="mb-12"
        >
          <motion.span variants={fadeUp} className="font-['Cormorant_Garamond'] text-8xl font-bold text-[#3a7d0a]/10 select-none leading-none" aria-hidden="true">
            01
          </motion.span>
          <motion.h2
            id="consulting-heading"
            variants={fadeUp}
            className="font-['Cormorant_Garamond'] font-bold text-4xl sm:text-5xl text-[#1a2e0a] -mt-6 mb-3"
          >
            Neurodiversity Consulting
          </motion.h2>
          <motion.p variants={fadeUp} className="font-['Jost'] text-[#1a2e0a]/65 text-lg max-w-2xl leading-relaxed">
            We provide tailored consulting services for schools, families, and organizations
            seeking practical strategies to support neurodiverse learners effectively.
          </motion.p>
        </motion.div>

        {/* Audience tabs */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ delay: 0.3, duration: 0.5 }}
        >
          {/* Tab buttons */}
          <div
            role="tablist"
            aria-label="Select audience"
            className="flex flex-wrap gap-3 mb-8"
          >
            {CONSULTING_AUDIENCES.map((audience) => (
              <button
                key={audience.id}
                role="tab"
                aria-selected={active === audience.id}
                aria-controls={`panel-${audience.id}`}
                id={`tab-${audience.id}`}
                onClick={() => setActive(audience.id)}
                className={`inline-flex items-center gap-2 font-['Jost'] font-semibold text-sm px-5 py-2.5 rounded-full border-2
                  transition-all duration-200
                  focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#3a7d0a]
                  ${active === audience.id
                    ? "bg-[#1a2e0a] text-white border-[#1a2e0a]"
                    : "bg-white text-[#1a2e0a]/70 border-[#1a2e0a]/20 hover:border-[#3a7d0a] hover:text-[#3a7d0a]"
                  }`}
              >
                <span
                  className="w-5 h-5"
                  style={{ color: active === audience.id ? "#f5a84e" : audience.color }}
                >
                  {audience.icon}
                </span>
                {audience.label}
              </button>
            ))}
          </div>

          {/* Tab panel */}
          <AnimatePresence mode="wait">
            <motion.div
              key={active}
              role="tabpanel"
              id={`panel-${active}`}
              aria-labelledby={`tab-${active}`}
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -8 }}
              transition={{ duration: 0.3, ease: "easeOut" }}
              className="bg-white rounded-3xl border border-[#3a7d0a]/10 p-8 md:p-10
                         shadow-[0_4px_32px_rgba(58,125,10,0.07)]"
            >
              <ul className="grid grid-cols-1 sm:grid-cols-2 gap-3" aria-label={`${current.label} services`}>
                {current.items.map((item, i) => (
                  <li key={i} className="flex items-start gap-3">
                    <span
                      className="mt-1 flex-shrink-0 w-5 h-5 rounded-full flex items-center justify-center"
                      style={{ backgroundColor: current.color + "22" }}
                      aria-hidden="true"
                    >
                      <svg viewBox="0 0 12 12" fill="none" className="w-3 h-3" style={{ color: current.color }}>
                        <path d="M2 6l3 3 5-5" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
                      </svg>
                    </span>
                    <span className="font-['Jost'] text-[#1a2e0a]/80 text-base">{item}</span>
                  </li>
                ))}
              </ul>
            </motion.div>
          </AnimatePresence>
        </motion.div>
      </div>
    </section>
  );
}

// ─── OtherServiceCard ─────────────────────────────────────────────────────────
function OtherServiceCard({ service, index }) {
  const [open, setOpen]   = useState(false);
  const ref               = useRef(null);
  const inView            = useInView(ref, { once: true, margin: "-60px" });
  const isEven            = index % 2 === 0;

  return (
    <motion.article
      ref={ref}
      custom={index}
      initial="hidden"
      animate={inView ? "visible" : "hidden"}
      variants={fadeUp}
      aria-labelledby={`service-title-${service.id}`}
      className={`relative flex flex-col md:flex-row gap-0 rounded-3xl overflow-hidden
                  border border-[#3a7d0a]/10 shadow-[0_4px_32px_rgba(58,125,10,0.07)]
                  ${isEven ? "" : "md:flex-row-reverse"}`}
    >
      {/* Colour sidebar */}
      <div
        className="md:w-16 flex-shrink-0 flex items-center justify-center py-6 md:py-0"
        style={{ backgroundColor: service.color }}
        aria-hidden="true"
      >
        <span
          className="font-['Cormorant_Garamond'] font-bold text-white/40 text-5xl
                     md:[writing-mode:vertical-rl] md:rotate-180 select-none"
        >
          {service.number}
        </span>
      </div>

      {/* Content */}
      <div className="flex-1 bg-white p-7 md:p-10">
        <div className="flex items-start gap-4 mb-4">
          <span style={{ color: service.color }}>{service.icon}</span>
          <div>
            <h3
              id={`service-title-${service.id}`}
              className="font-['Cormorant_Garamond'] font-bold text-3xl text-[#1a2e0a]"
            >
              {service.title}
            </h3>
            <p className="font-['Jost'] text-[#1a2e0a]/60 text-sm mt-0.5">{service.tagline}</p>
          </div>
        </div>

        <p className="font-['Jost'] text-[#1a2e0a]/75 text-base leading-relaxed mb-5">
          {service.description}
        </p>

        {/* Expandable list */}
        <button
          onClick={() => setOpen(!open)}
          aria-expanded={open}
          aria-controls={`conditions-${service.id}`}
          className="inline-flex items-center gap-2 font-['Jost'] font-semibold text-sm
                     focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#3a7d0a]"
          style={{ color: service.color }}
        >
          {open ? "Hide areas" : "View specific areas"}
          <svg
            viewBox="0 0 16 16" fill="none" className={`w-4 h-4 transition-transform duration-200 ${open ? "rotate-180" : ""}`}
            aria-hidden="true"
          >
            <path d="M4 6l4 4 4-4" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" />
          </svg>
        </button>

        <AnimatePresence>
          {open && (
            <motion.ul
              id={`conditions-${service.id}`}
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: "auto", opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              transition={{ duration: 0.3 }}
              className="overflow-hidden mt-4 grid grid-cols-1 sm:grid-cols-2 gap-2"
              aria-label={`${service.title} specific areas`}
            >
              {service.conditions.map((c, i) => (
                <li key={i} className="flex items-center gap-2 font-['Jost'] text-sm text-[#1a2e0a]/75">
                  <span className="w-1.5 h-1.5 rounded-full flex-shrink-0" style={{ backgroundColor: service.color }} aria-hidden="true" />
                  {c}
                </li>
              ))}
            </motion.ul>
          )}
        </AnimatePresence>
      </div>
    </motion.article>
  );
}

// ─── HowWeWork ────────────────────────────────────────────────────────────────
function HowWeWork() {
  const ref    = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });

  const steps = [
    { n: "1", title: "Consult", desc: "We start with a free conversation to understand the child's needs and family situation." },
    { n: "2", title: "Assess",  desc: "A comprehensive evaluation maps the child's full learning profile." },
    { n: "3", title: "Intervene", desc: "We deliver targeted therapy, training, and support — at home, school, or our centre." },
    { n: "4", title: "Review", desc: "Progress is tracked, goals are updated, and plans are adjusted every step of the way." },
  ];

  return (
    <section
      ref={ref}
      aria-labelledby="how-heading"
      className="bg-[#1a2e0a] py-20 md:py-28 overflow-hidden"
    >
      <div className="max-w-7xl mx-auto px-5 sm:px-8 lg:px-12">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center mb-14"
        >
          <p className="font-['Jost'] text-[#6ab523] text-xs font-semibold tracking-widest uppercase mb-3">Our Process</p>
          <h2 id="how-heading" className="font-['Cormorant_Garamond'] font-bold text-4xl sm:text-5xl text-white">
            How We Work
          </h2>
        </motion.div>

        <ol className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6" aria-label="Our 4-step process">
          {steps.map((s, i) => (
            <motion.li
              key={s.n}
              custom={i}
              initial="hidden"
              animate={inView ? "visible" : "hidden"}
              variants={fadeUp}
              className="relative bg-white/5 border border-white/10 rounded-2xl p-7 flex flex-col gap-3"
            >
              <span className="font-['Cormorant_Garamond'] font-bold text-5xl text-[#f5a84e]/30 leading-none select-none" aria-hidden="true">
                {s.n}
              </span>
              <h3 className="font-['Cormorant_Garamond'] font-bold text-2xl text-white">{s.title}</h3>
              <p className="font-['Jost'] text-white/60 text-sm leading-relaxed">{s.desc}</p>
            </motion.li>
          ))}
        </ol>
      </div>
    </section>
  );
}

// ─── ServicesCTA ──────────────────────────────────────────────────────────────
function ServicesCTA() {
  const ref    = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });

  return (
    <section
      ref={ref}
      aria-labelledby="services-cta-heading"
      className="relative bg-[#3a7d0a] overflow-hidden py-20 md:py-28"
    >
      {/* Dot texture */}
      <div className="absolute inset-0 pointer-events-none opacity-[0.08]" aria-hidden="true">
        <svg width="100%" height="100%">
          <defs>
            <pattern id="cta-dots" x="0" y="0" width="20" height="20" patternUnits="userSpaceOnUse">
              <circle cx="1.5" cy="1.5" r="1.2" fill="#f7f9f4" />
            </pattern>
          </defs>
          <rect width="100%" height="100%" fill="url(#cta-dots)" />
        </svg>
      </div>
      <div className="absolute -left-20 -bottom-20 w-80 h-80 rounded-full bg-[#f5a84e]/10 blur-3xl pointer-events-none" aria-hidden="true" />

      <div className="relative z-10 max-w-4xl mx-auto px-5 sm:px-8 lg:px-12 text-center">
        <motion.div
          initial="hidden"
          animate={inView ? "visible" : "hidden"}
          variants={container}
        >
          <motion.p variants={fadeUp} className="font-['Jost'] text-[#f5a84e] text-xs font-semibold tracking-widest uppercase mb-4">
            Ready to Get Started?
          </motion.p>
          <motion.h2
            id="services-cta-heading"
            variants={fadeUp}
            className="font-['Cormorant_Garamond'] font-bold text-4xl sm:text-5xl md:text-6xl text-white leading-tight mb-6"
          >
            Partner with us to build inclusive and effective support systems for neurodiverse learners.
          </motion.h2>
          <motion.p variants={fadeUp} className="font-['Jost'] text-white/70 text-lg mb-10 max-w-xl mx-auto">
            Book a consultation session with us today.
          </motion.p>
          <motion.div variants={fadeUp} className="flex flex-col sm:flex-row justify-center gap-4">
            <a
              href="mailto:consulting@renownedchildinitiative.org"
              className="inline-flex items-center justify-center gap-2
                bg-[#f5a84e] text-[#1a2e0a] font-['Jost'] font-semibold text-sm
                px-8 py-4 rounded-full hover:bg-white transition-colors duration-200
                focus-visible:outline focus-visible:outline-2 focus-visible:outline-white focus-visible:outline-offset-2"
            >
              Book a Consultation
              <svg viewBox="0 0 20 20" fill="none" className="w-4 h-4" aria-hidden="true">
                <path d="M4 10h12M10 4l6 6-6 6" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" />
              </svg>
            </a>
            <Link
              to="/about"
              className="inline-flex items-center justify-center gap-2
                bg-transparent text-white font-['Jost'] font-semibold text-sm
                px-8 py-4 rounded-full border border-white/30
                hover:bg-white/10 transition-colors duration-200
                focus-visible:outline focus-visible:outline-2 focus-visible:outline-white focus-visible:outline-offset-2"
            >
              Learn About Us
            </Link>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}

// ─── Page ─────────────────────────────────────────────────────────────────────
export default function ServicesPage() {
  return (
    <main id="main-content">
      <a
        href="#main-content"
        className="sr-only focus:not-sr-only focus:fixed focus:top-4 focus:left-4 focus:z-50
          bg-[#3a7d0a] text-white font-['Jost'] font-semibold px-4 py-2 rounded-lg text-sm"
      >
        Skip to main content
      </a>
      <ServicesHero />
      <ConditionsBanner />
      <NeurodiversityConsulting />

      {/* Remaining 5 services */}
      <section aria-label="Additional services" className="bg-[#f7f9f4] py-20 md:py-28">
        <div className="max-w-7xl mx-auto px-5 sm:px-8 lg:px-12 flex flex-col gap-8">
          {OTHER_SERVICES.map((s, i) => (
            <OtherServiceCard key={s.id} service={s} index={i} />
          ))}
        </div>
      </section>

      <HowWeWork />
      <ServicesCTA />
    </main>
  );
}