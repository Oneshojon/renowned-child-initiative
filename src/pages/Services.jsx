import { useRef, useState } from "react";
import { motion, useInView, AnimatePresence } from "framer-motion";
import { Link } from "react-router-dom";

// ─── Data ────────────────────────────────────────────────────────────────────

const SERVICES = [
  {
    id: "neurodiversity",
    number: "01",
    icon: (
      <svg viewBox="0 0 48 48" fill="none" aria-hidden="true" className="w-10 h-10">
        <circle cx="24" cy="24" r="10" stroke="#6ab523" strokeWidth="2.5" />
        <circle cx="24" cy="8"  r="4"  stroke="#e07b1a" strokeWidth="2.2" />
        <circle cx="40" cy="32" r="4"  stroke="#e07b1a" strokeWidth="2.2" />
        <circle cx="8"  cy="32" r="4"  stroke="#e07b1a" strokeWidth="2.2" />
        <line x1="24" y1="12" x2="24" y2="14" stroke="#3a7d0a" strokeWidth="2" strokeLinecap="round" />
        <line x1="37" y1="30" x2="33.5" y2="27.7" stroke="#3a7d0a" strokeWidth="2" strokeLinecap="round" />
        <line x1="11" y1="30" x2="14.5" y2="27.7" stroke="#3a7d0a" strokeWidth="2" strokeLinecap="round" />
      </svg>
    ),
    title: "Neurodiversity & Learning Support",
    // Client's exact words (RCI org description)
    tagline: "Supporting individuals with diverse learning needs through advocacy, intervention support, parent guidance, and educational resources.",
    // Client's exact words (consulting firm description, adapted for this service)
    description:
      "We provide learning support services for children with diverse developmental and learning needs — equipping families, schools, and communities with the right tools and knowledge to help every child succeed academically and socially.",
    // Client's exact conditions list
    conditions: [
      "Autism",
      "ADHD",
      "Dyslexia",
      "Dysgraphia",
      "Dyspraxia",
      "Speech and Language Difficulties",
      "Learning Delays",
      "Social Communication Challenges",
      "Sensory and Behavioral Needs",
    ],
    color: "green",
  },
  {
    id: "psychoeducational",
    number: "02",
    icon: (
      <svg viewBox="0 0 48 48" fill="none" aria-hidden="true" className="w-10 h-10">
        <rect x="8" y="14" width="32" height="24" rx="4" stroke="#6ab523" strokeWidth="2.5" />
        <path d="M16 26 Q24 18 32 26" stroke="#e07b1a" strokeWidth="2.2" strokeLinecap="round" fill="none" />
        <circle cx="24" cy="10" r="3.5" stroke="#3a7d0a" strokeWidth="2" />
        <line x1="24" y1="13.5" x2="24" y2="14" stroke="#3a7d0a" strokeWidth="2" />
      </svg>
    ),
    title: "Psycho-Educational Support",
    tagline: "Understanding how a child thinks, learns, and feels — then building a plan around that.",
    // Client named this in her consulting firm description; we expand it naturally
    description:
      "Our psycho-educational support helps identify the root of a child's learning challenges through assessment, observation, and close collaboration with families and schools. We translate findings into clear, actionable strategies that educators and parents can apply every day.",
    conditions: [
      "Learning & Cognitive Assessments",
      "Individual Education Plans (IEPs)",
      "Academic Profiling",
      "Emotional & Behavioural Support",
      "School Transition Planning",
      "Progress Monitoring",
    ],
    color: "amber",
  },
  {
    id: "autism-aba",
    number: "03",
    icon: (
      <svg viewBox="0 0 48 48" fill="none" aria-hidden="true" className="w-10 h-10">
        <path d="M12 36 C12 28 20 20 24 14 C28 20 36 28 36 36" stroke="#6ab523" strokeWidth="2.5" strokeLinecap="round" fill="none" />
        <circle cx="24" cy="14" r="3" fill="#e07b1a" />
        <circle cx="17" cy="32" r="2.5" stroke="#3a7d0a" strokeWidth="2" />
        <circle cx="31" cy="32" r="2.5" stroke="#3a7d0a" strokeWidth="2" />
        <line x1="19.5" y1="32" x2="28.5" y2="32" stroke="#3a7d0a" strokeWidth="1.5" strokeDasharray="2 2" />
      </svg>
    ),
    title: "Autism & ABA Informed Services",
    tagline: "Evidence-based autism intervention, delivered with warmth and respect for each child's individuality.",
    // Client listed "autism intervention" and "ABA-informed practices" in her consulting firm description
    description:
      "Drawing on ABA-informed practices and specialist autism training, we design structured programmes that help children build communication, social, and adaptive skills — in ways that feel natural and meaningful to them and their families.",
    conditions: [
      "Early Autism Intervention",
      "ABA-Informed Skill Building",
      "Social Skills Development",
      "Behaviour Support Planning",
      "Parent-Mediated Strategies",
      "Home and School Generalisation",
    ],
    color: "green",
  },
  {
    id: "speech",
    number: "04",
    icon: (
      <svg viewBox="0 0 48 48" fill="none" aria-hidden="true" className="w-10 h-10">
        <path d="M10 30 Q10 16 24 16 Q38 16 38 30 L38 34 Q38 40 32 40 L20 40 L12 44 L14 40 Q10 40 10 34 Z"
          stroke="#6ab523" strokeWidth="2.5" strokeLinejoin="round" fill="none" />
        <line x1="18" y1="26" x2="30" y2="26" stroke="#e07b1a" strokeWidth="2" strokeLinecap="round" />
        <line x1="18" y1="31" x2="26" y2="31" stroke="#3a7d0a" strokeWidth="2" strokeLinecap="round" />
      </svg>
    ),
    title: "Speech & Communication Support",
    tagline: "Helping every child find their voice — however they choose to use it.",
    // Client listed "speech and communication support" in her consulting firm description
    description:
      "Communication difficulties affect how children connect with the world around them. Our speech and communication support works with children experiencing delays, language processing challenges, or social communication differences — using approaches that meet each child where they are.",
    conditions: [
      "Speech and Language Delays",
      "Expressive & Receptive Language",
      "Social Communication Difficulties",
      "Augmentative Communication (AAC)",
      "Pre-Literacy & Phonological Skills",
      "Selective Mutism",
    ],
    color: "amber",
  },
  {
    id: "school-inclusion",
    number: "05",
    icon: (
      <svg viewBox="0 0 48 48" fill="none" aria-hidden="true" className="w-10 h-10">
        <rect x="8" y="20" width="32" height="22" rx="3" stroke="#6ab523" strokeWidth="2.5" />
        <path d="M16 20 V14 Q16 8 24 8 Q32 8 32 14 V20" stroke="#3a7d0a" strokeWidth="2.2" strokeLinecap="round" fill="none" />
        <circle cx="24" cy="31" r="4" stroke="#e07b1a" strokeWidth="2" />
        <line x1="24" y1="35" x2="24" y2="38" stroke="#e07b1a" strokeWidth="2" strokeLinecap="round" />
      </svg>
    ),
    title: "School Inclusion Consulting",
    tagline: "Partnering with schools to build environments where every child belongs and every teacher feels equipped.",
    // Client listed "inclusive education strategies" in her consulting firm description
    description:
      "We work directly with schools to develop and implement inclusive education strategies — from reviewing classroom practices to supporting individual children with diverse learning needs. Our goal is to make inclusion a lived reality, not just a policy on paper.",
    conditions: [
      "Inclusive Education Strategy",
      "Classroom Differentiation Support",
      "Individual Accommodation Plans",
      "Staff Awareness & Training",
      "Learning Environment Review",
      "Ongoing School Consultation",
    ],
    color: "green",
  },
  {
    id: "training",
    number: "06",
    icon: (
      <svg viewBox="0 0 48 48" fill="none" aria-hidden="true" className="w-10 h-10">
        <circle cx="24" cy="16" r="7" stroke="#6ab523" strokeWidth="2.5" />
        <path d="M10 40 C10 32 14 28 24 28 C34 28 38 32 38 40" stroke="#e07b1a" strokeWidth="2.5" strokeLinecap="round" fill="none" />
        <path d="M32 18 L36 14 M36 14 L40 10 M36 14 L40 18 M36 14 L32 10"
          stroke="#3a7d0a" strokeWidth="2" strokeLinecap="round" />
      </svg>
    ),
    title: "Parent & Teacher Training",
    // Client's exact words: "empowering families, schools, and communities with the right tools and knowledge"
    tagline: "Empowering families, schools, and communities with the right tools and knowledge.",
    // Built from client's founding story: she saw teachers and parents who "lacked the right support and strategies"
    description:
      "Having seen first-hand the frustration experienced by both teachers and parents who lacked the right support and strategies, we run training sessions and workshops designed to turn that frustration into confidence — giving the adults around a child practical tools they can use immediately.",
    conditions: [
      "Neurodiversity Awareness for Schools",
      "Practical Behaviour Strategies",
      "Home Learning Support Techniques",
      "Understanding IEPs & Accommodations",
      "Parent Coaching & Guidance",
      "Teacher Professional Development",
    ],
    color: "amber",
  },
];

// Client's exact conditions from her founding story: "autism, learning disabilities,
// speech and communication challenges, ADHD, Down syndrome, cerebral palsy,
// hearing impairment, and other developmental needs"
const CONDITIONS_SUPPORTED = [
  "Autism",
  "ADHD",
  "Dyslexia",
  "Dysgraphia",
  "Dyspraxia",
  "Speech & Language Difficulties",
  "Learning Delays",
  "Social Communication Challenges",
  "Sensory & Behavioral Needs",
  "Down Syndrome",
  "Cerebral Palsy",
  "Hearing Impairment",
];

// ─── Animation variants ───────────────────────────────────────────────────────

const fadeUp = {
  hidden: { opacity: 0, y: 30 },
  visible: (i = 0) => ({
    opacity: 1,
    y: 0,
    transition: { delay: i * 0.08, duration: 0.65, ease: [0.22, 1, 0.36, 1] },
  }),
};

const stagger = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.1, delayChildren: 0.05 } },
};

// ─── Sub-components ───────────────────────────────────────────────────────────

function ServiceCard({ service, index }) {
  const [open, setOpen] = useState(false);
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-60px" });

  const isEven = index % 2 === 0;

  return (
    <motion.article
      ref={ref}
      custom={index * 0.5}
      variants={fadeUp}
      initial="hidden"
      animate={inView ? "visible" : "hidden"}
      className={`group relative flex flex-col md:flex-row gap-0 rounded-3xl overflow-hidden
        border border-[#3a7d0a]/15 bg-white shadow-sm
        transition-shadow duration-300 hover:shadow-lg
        ${isEven ? "" : "md:flex-row-reverse"}`}
      aria-labelledby={`service-title-${service.id}`}
    >
      {/* Number sidebar */}
      <div
        className={`hidden md:flex flex-col items-center justify-between
          w-16 shrink-0 py-8 px-3
          ${service.color === "green"
            ? "bg-[#3a7d0a]"
            : "bg-[#e07b1a]"}`}
        aria-hidden="true"
      >
        <span
          className="text-white/30 font-['Cormorant_Garamond'] font-bold text-5xl
            leading-none tracking-tight writing-mode-vertical"
          style={{ writingMode: "vertical-rl", transform: "rotate(180deg)" }}
        >
          {service.number}
        </span>
        <div className="w-px flex-1 mx-auto bg-white/20 my-4" />
        <div className="text-white">{service.icon}</div>
      </div>

      {/* Content */}
      <div className="flex-1 p-7 md:p-9 flex flex-col gap-4">
        {/* Mobile top row */}
        <div className="flex items-start gap-4 md:hidden">
          <div
            className={`flex-shrink-0 w-12 h-12 rounded-2xl flex items-center justify-center
              ${service.color === "green" ? "bg-[#3a7d0a]/10" : "bg-[#e07b1a]/10"}`}
          >
            {service.icon}
          </div>
          <span
            className={`font-['Cormorant_Garamond'] font-bold text-4xl leading-none
              ${service.color === "green" ? "text-[#3a7d0a]/20" : "text-[#e07b1a]/20"}`}
            aria-hidden="true"
          >
            {service.number}
          </span>
        </div>

        {/* Tagline */}
        <p
          className={`text-xs font-['Jost'] font-semibold uppercase tracking-widest
            ${service.color === "green" ? "text-[#6ab523]" : "text-[#e07b1a]"}`}
        >
          {service.tagline}
        </p>

        {/* Title */}
        <h3
          id={`service-title-${service.id}`}
          className="font-['Cormorant_Garamond'] font-bold text-2xl md:text-3xl
            leading-tight text-[#1a2e0a]"
        >
          {service.title}
        </h3>

        {/* Description */}
        <p className="font-['Jost'] text-[#3a7d0a]/80 text-base leading-relaxed">
          {service.description}
        </p>

        {/* Expandable conditions */}
        <div>
          <button
            onClick={() => setOpen((o) => !o)}
            aria-expanded={open}
            aria-controls={`conditions-${service.id}`}
            className={`inline-flex items-center gap-2 text-sm font-['Jost'] font-semibold
              rounded-full px-4 py-2 border transition-all duration-200
              focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2
              ${service.color === "green"
                ? "border-[#3a7d0a]/25 text-[#3a7d0a] hover:bg-[#3a7d0a] hover:text-white focus-visible:outline-[#3a7d0a]"
                : "border-[#e07b1a]/25 text-[#e07b1a] hover:bg-[#e07b1a] hover:text-white focus-visible:outline-[#e07b1a]"
              }`}
          >
            {open ? "Hide" : "View"} specific areas
            <svg
              viewBox="0 0 16 16"
              fill="none"
              className={`w-4 h-4 transition-transform duration-300 ${open ? "rotate-180" : ""}`}
              aria-hidden="true"
            >
              <path d="M3 6l5 5 5-5" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" />
            </svg>
          </button>

          <AnimatePresence initial={false}>
            {open && (
              <motion.div
                id={`conditions-${service.id}`}
                key="conditions"
                initial={{ height: 0, opacity: 0 }}
                animate={{ height: "auto", opacity: 1 }}
                exit={{ height: 0, opacity: 0 }}
                transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
                className="overflow-hidden"
              >
                <ul
                  className="mt-4 flex flex-wrap gap-2"
                  aria-label={`Conditions addressed under ${service.title}`}
                >
                  {service.conditions.map((c) => (
                    <li
                      key={c}
                      className={`text-xs font-['Jost'] font-medium px-3 py-1.5 rounded-full
                        ${service.color === "green"
                          ? "bg-[#3a7d0a]/8 text-[#3a7d0a] border border-[#3a7d0a]/15"
                          : "bg-[#e07b1a]/8 text-[#e07b1a] border border-[#e07b1a]/15"
                        }`}
                    >
                      {c}
                    </li>
                  ))}
                </ul>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>

      {/* Accent corner shape */}
      <div
        className={`absolute top-0 ${isEven ? "right-0" : "left-0"} w-24 h-24 pointer-events-none opacity-5`}
        aria-hidden="true"
      >
        <svg viewBox="0 0 96 96" fill="none">
          <circle cx={isEven ? 96 : 0} cy="0" r="72"
            fill={service.color === "green" ? "#3a7d0a" : "#e07b1a"} />
        </svg>
      </div>
    </motion.article>
  );
}

// ─── Hero ─────────────────────────────────────────────────────────────────────

function ServicesHero() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true });

  return (
    <section
      ref={ref}
      aria-labelledby="services-hero-heading"
      className="relative overflow-hidden bg-[#f7f9f4] pt-28 pb-20 md:pt-36 md:pb-28"
    >
      {/* Background grid texture */}
      <div className="absolute inset-0 pointer-events-none opacity-[0.035]" aria-hidden="true">
        <svg width="100%" height="100%">
          <defs>
            <pattern id="sgrid" x="0" y="0" width="40" height="40" patternUnits="userSpaceOnUse">
              <path d="M40 0H0V40" fill="none" stroke="#3a7d0a" strokeWidth="0.8" />
            </pattern>
          </defs>
          <rect width="100%" height="100%" fill="url(#sgrid)" />
        </svg>
      </div>

      {/* Organic blob left */}
      <div
        className="absolute -left-32 top-10 w-80 h-80 rounded-full bg-[#6ab523]/12 blur-3xl pointer-events-none"
        aria-hidden="true"
      />
      {/* Organic blob right */}
      <div
        className="absolute -right-24 bottom-0 w-64 h-64 rounded-full bg-[#e07b1a]/10 blur-3xl pointer-events-none"
        aria-hidden="true"
      />

      <div className="relative z-10 max-w-7xl mx-auto px-5 sm:px-8 lg:px-12">
        <motion.div
          variants={stagger}
          initial="hidden"
          animate={inView ? "visible" : "hidden"}
          className="max-w-3xl"
        >
          {/* Eyebrow */}
          <motion.span
            variants={fadeUp}
            className="inline-flex items-center gap-2 text-xs font-['Jost'] font-semibold
              uppercase tracking-widest text-[#e07b1a] mb-6"
          >
            <span className="w-8 h-px bg-[#e07b1a]" aria-hidden="true" />
            What We Offer
          </motion.span>

          {/* Heading */}
          <motion.h1
            variants={fadeUp}
            id="services-hero-heading"
            className="font-['Cormorant_Garamond'] font-bold
              text-4xl sm:text-5xl md:text-6xl lg:text-7xl
              leading-[1.05] text-[#1a2e0a] mb-6"
          >
            Specialist{" "}
            <span className="relative inline-block">
              Support
              <span
                className="absolute -bottom-1 left-0 w-full h-1 rounded-full bg-[#6ab523]/60"
                aria-hidden="true"
              />
            </span>{" "}
            for Every{" "}
            <em className="not-italic text-[#3a7d0a]">Child</em>
          </motion.h1>

          {/* Sub */}
          <motion.p
            variants={fadeUp}
            className="font-['Jost'] text-lg md:text-xl text-[#1a2e0a]/65 leading-relaxed max-w-xl"
          >
            Neurodiversity. Education. Inclusion. Family Support. — our services are built around
            these four pillars, meeting children and families exactly where they are.
          </motion.p>
        </motion.div>

        {/* Floating stat strip */}
        <motion.div
          variants={stagger}
          initial="hidden"
          animate={inView ? "visible" : "hidden"}
          className="mt-14 flex flex-wrap gap-4 md:gap-8"
        >
          {[
            { n: "6", label: "Core Service Areas" },
            { n: "12+", label: "Conditions Supported" },
            { n: "500+", label: "Children Helped" },
            { n: "10+", label: "Years of Practice" },
          ].map((stat, i) => (
            <motion.div
              key={stat.label}
              custom={i}
              variants={fadeUp}
              className="flex items-baseline gap-3 bg-white/80 backdrop-blur-sm
                border border-[#3a7d0a]/12 rounded-2xl px-5 py-3 shadow-sm"
            >
              <span
                className="font-['Cormorant_Garamond'] font-bold text-3xl text-[#3a7d0a] leading-none"
                aria-label={stat.n}
              >
                {stat.n}
              </span>
              <span className="font-['Jost'] text-xs text-[#1a2e0a]/55 font-medium leading-tight max-w-[80px]">
                {stat.label}
              </span>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}

// ─── Conditions Banner ────────────────────────────────────────────────────────

function ConditionsBanner() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-50px" });

  return (
    <section
      ref={ref}
      aria-labelledby="conditions-heading"
      className="bg-[#1a2e0a] py-14 overflow-hidden"
    >
      <div className="max-w-7xl mx-auto px-5 sm:px-8 lg:px-12">
        <motion.p
          id="conditions-heading"
          initial={{ opacity: 0, y: 16 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5 }}
          className="font-['Jost'] text-xs uppercase tracking-widest text-[#6ab523] mb-6 font-semibold"
        >
          Conditions we support
        </motion.p>
        <motion.ul
          variants={stagger}
          initial="hidden"
          animate={inView ? "visible" : "hidden"}
          className="flex flex-wrap gap-3"
          aria-label="List of conditions supported"
        >
          {CONDITIONS_SUPPORTED.map((c, i) => (
            <motion.li
              key={c}
              custom={i}
              variants={fadeUp}
              className="font-['Jost'] text-sm font-medium px-4 py-2 rounded-full
                bg-white/8 text-white/80 border border-white/10
                hover:bg-[#6ab523]/20 hover:text-[#f5a84e] hover:border-[#6ab523]/30
                transition-all duration-200 cursor-default"
            >
              {c}
            </motion.li>
          ))}
        </motion.ul>
      </div>
    </section>
  );
}

// ─── Services Grid ────────────────────────────────────────────────────────────

function ServicesList() {
  return (
    <section
      aria-labelledby="services-list-heading"
      className="bg-[#f7f9f4] py-20 md:py-28"
    >
      <div className="max-w-7xl mx-auto px-5 sm:px-8 lg:px-12">
        <h2 id="services-list-heading" className="sr-only">
          Our services in detail
        </h2>
        <div className="flex flex-col gap-6 md:gap-8">
          {SERVICES.map((service, i) => (
            <ServiceCard key={service.id} service={service} index={i} />
          ))}
        </div>
      </div>
    </section>
  );
}

// ─── Process Section ──────────────────────────────────────────────────────────

function HowWeWork() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-60px" });

  const steps = [
    {
      n: "1",
      title: "Initial Consultation",
      body: "We begin with a conversation to understand your child's needs, your goals, and what the right support looks like for your family.",
    },
    {
      n: "2",
      title: "Assessment & Planning",
      body: "We carry out a thorough assessment and work with you to develop a personalised intervention plan tailored to your child's unique profile.",
    },
    {
      n: "3",
      title: "Intervention & Support",
      body: "Our specialists deliver structured, evidence-based sessions — adapting the approach as your child grows, progresses, and changes.",
    },
    {
      n: "4",
      title: "Empowering Families & Schools",
      // Drawn from client's founding mission: "empowering families, schools, and communities with the right tools and knowledge"
      body: "We equip families, schools, and communities with the right tools and knowledge so that progress continues long after our sessions end.",
    },
  ];

  return (
    <section
      ref={ref}
      aria-labelledby="process-heading"
      className="relative overflow-hidden bg-white py-20 md:py-28"
    >
      {/* Decorative vertical line */}
      <div
        className="absolute left-1/2 top-0 bottom-0 w-px bg-[#3a7d0a]/8 hidden lg:block pointer-events-none"
        aria-hidden="true"
      />

      <div className="max-w-7xl mx-auto px-5 sm:px-8 lg:px-12">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="mb-14 md:mb-18"
        >
          <span className="inline-flex items-center gap-2 text-xs font-['Jost'] font-semibold uppercase tracking-widest text-[#e07b1a] mb-4">
            <span className="w-8 h-px bg-[#e07b1a]" aria-hidden="true" />
            Our Process
          </span>
          <h2
            id="process-heading"
            className="font-['Cormorant_Garamond'] font-bold text-4xl md:text-5xl text-[#1a2e0a] leading-tight"
          >
            How We Work With You
          </h2>
        </motion.div>

        <ol className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6" role="list">
          {steps.map((step, i) => (
            <motion.li
              key={step.n}
              custom={i}
              variants={fadeUp}
              initial="hidden"
              animate={inView ? "visible" : "hidden"}
              className="relative flex flex-col gap-4 p-7 rounded-3xl
                bg-[#f7f9f4] border border-[#3a7d0a]/10
                hover:border-[#3a7d0a]/25 hover:shadow-md transition-all duration-300"
            >
              {/* Step number */}
              <div
                className="w-12 h-12 rounded-2xl bg-[#3a7d0a] flex items-center justify-center flex-shrink-0"
                aria-hidden="true"
              >
                <span className="font-['Cormorant_Garamond'] font-bold text-xl text-white leading-none">
                  {step.n}
                </span>
              </div>
              {/* Connector arrow (desktop) */}
              {i < steps.length - 1 && (
                <div
                  className="hidden lg:block absolute -right-3 top-1/2 -translate-y-1/2 z-10"
                  aria-hidden="true"
                >
                  <svg viewBox="0 0 24 24" fill="none" className="w-6 h-6 text-[#6ab523]">
                    <path d="M5 12h14M13 6l6 6-6 6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
                  </svg>
                </div>
              )}
              <h3 className="font-['Cormorant_Garamond'] font-bold text-xl text-[#1a2e0a] leading-snug">
                {step.title}
              </h3>
              <p className="font-['Jost'] text-sm text-[#1a2e0a]/60 leading-relaxed">
                {step.body}
              </p>
            </motion.li>
          ))}
        </ol>
      </div>
    </section>
  );
}

// ─── CTA Section ──────────────────────────────────────────────────────────────

function ServicesCTA() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-60px" });

  return (
    <section
      ref={ref}
      aria-labelledby="services-cta-heading"
      className="relative overflow-hidden bg-[#3a7d0a] py-20 md:py-28"
    >
      {/* Blob decorations */}
      <div className="absolute -top-20 -right-20 w-80 h-80 rounded-full bg-[#6ab523]/20 blur-3xl pointer-events-none" aria-hidden="true" />
      <div className="absolute -bottom-16 -left-16 w-64 h-64 rounded-full bg-[#1a2e0a]/30 blur-3xl pointer-events-none" aria-hidden="true" />
      {/* Subtle dot pattern */}
      <div className="absolute inset-0 opacity-[0.06] pointer-events-none" aria-hidden="true">
        <svg width="100%" height="100%">
          <defs>
            <pattern id="ctadots" x="0" y="0" width="24" height="24" patternUnits="userSpaceOnUse">
              <circle cx="1.5" cy="1.5" r="1.2" fill="#f5a84e" />
            </pattern>
          </defs>
          <rect width="100%" height="100%" fill="url(#ctadots)" />
        </svg>
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-5 sm:px-8 lg:px-12 text-center">
        <motion.div
          variants={stagger}
          initial="hidden"
          animate={inView ? "visible" : "hidden"}
          className="flex flex-col items-center gap-6"
        >
          <motion.span
            variants={fadeUp}
            className="inline-flex items-center gap-2 text-xs font-['Jost'] font-semibold
              uppercase tracking-widest text-[#f5a84e]"
          >
            <span className="w-8 h-px bg-[#f5a84e]" aria-hidden="true" />
            Ready to start?
            <span className="w-8 h-px bg-[#f5a84e]" aria-hidden="true" />
          </motion.span>

          <motion.h2
            variants={fadeUp}
            id="services-cta-heading"
            className="font-['Cormorant_Garamond'] font-bold
              text-4xl sm:text-5xl md:text-6xl text-white leading-tight max-w-2xl"
          >
            Support, Advocacy &amp; Intervention for Every Child
          </motion.h2>

          <motion.p
            variants={fadeUp}
            className="font-['Jost'] text-white/70 text-lg max-w-xl leading-relaxed"
          >
            Renowned Child Initiative exists to provide support, advocacy, intervention, and
            inclusive learning opportunities for children with diverse needs — while empowering
            families, schools, and communities with the right tools and knowledge.
          </motion.p>

          <motion.div
            variants={fadeUp}
            className="flex flex-col sm:flex-row gap-4 mt-4"
          >
            <Link
              to="/contact"
              className="inline-flex items-center justify-center gap-2
                bg-[#f5a84e] text-[#1a2e0a] font-['Jost'] font-semibold text-sm
                px-8 py-4 rounded-full
                hover:bg-white transition-colors duration-200
                focus-visible:outline focus-visible:outline-2 focus-visible:outline-white focus-visible:outline-offset-2"
            >
              Get in Touch
              <svg viewBox="0 0 20 20" fill="none" className="w-4 h-4" aria-hidden="true">
                <path d="M4 10h12M10 4l6 6-6 6" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" />
              </svg>
            </Link>
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
    <>
    <ServicesHero />
    <ConditionsBanner />
    <ServicesList />
    <HowWeWork />
    <ServicesCTA />
    </>
  );
}