import { useRef } from "react";
import { Link } from "react-router-dom";
import { motion, useInView } from "framer-motion";
import { CTABanner, Footer } from "../components/CTAAndFooter";

// ── Shared animation presets ──────────────────────────────────────
const fadeUp = (delay = 0) => ({
  initial:    { opacity: 0, y: 28 },
  whileInView: { opacity: 1, y: 0 },
  viewport:   { once: true, margin: "-60px" },
  transition: { duration: 0.65, ease: [0.22, 1, 0.36, 1], delay },
});

const fadeLeft = (delay = 0) => ({
  initial:    { opacity: 0, x: -32 },
  whileInView: { opacity: 1, x: 0 },
  viewport:   { once: true, margin: "-60px" },
  transition: { duration: 0.7, ease: [0.22, 1, 0.36, 1], delay },
});

const fadeRight = (delay = 0) => ({
  initial:    { opacity: 0, x: 32 },
  whileInView: { opacity: 1, x: 0 },
  viewport:   { once: true, margin: "-60px" },
  transition: { duration: 0.7, ease: [0.22, 1, 0.36, 1], delay },
});

// ── Values data ───────────────────────────────────────────────────
const VALUES = [
  {
    number: "01",
    title:  "Child-Centred",
    desc:   "Every programme, every decision, every interaction begins with one question: what is best for this child? The child is never an afterthought.",
    accent: "#3a7d0a",
  },
  {
    number: "02",
    title:  "Evidence-Based",
    desc:   "We ground our work in proven therapeutic frameworks, current research, and best practice in neurodiversity and inclusive education.",
    accent: "#e07b1a",
  },
  {
    number: "03",
    title:  "Inclusive",
    desc:   "We celebrate the full spectrum of how human minds work. Neurodiversity is not a deficit to fix — it is a difference to honour and support.",
    accent: "#6ab523",
  },
  {
    number: "04",
    title:  "Family Partnership",
    desc:   "Parents and caregivers are not bystanders. They are essential partners in every child's journey, and we invest in them equally.",
    accent: "#f5a84e",
  },
  {
    number: "05",
    title:  "Compassionate",
    desc:   "Behind every diagnosis is a human story. We bring empathy, patience, and genuine care to every family we work with.",
    accent: "#3a7d0a",
  },
  {
    number: "06",
    title:  "Excellence",
    desc:   "We hold ourselves to the highest standards — in our training, our methods, and the outcomes we work hard to achieve for every child.",
    accent: "#e07b1a",
  },
];

// ── Milestones timeline ───────────────────────────────────────────
const MILESTONES = [
  { year: "2014", event: "Renowned Child Initiative founded in Lagos, Nigeria." },
  { year: "2016", event: "Launched our first structured early intervention programme." },
  { year: "2018", event: "Expanded services to include family empowerment workshops." },
  { year: "2020", event: "Reached 200+ children supported despite pandemic challenges." },
  { year: "2022", event: "Introduced specialist neurodiversity assessment services." },
  { year: "2024", event: "Surpassed 500 children supported across Lagos State." },
];

// ─────────────────────────────────────────────────────────────────
// PAGE HERO
// ─────────────────────────────────────────────────────────────────
function AboutHero() {
  return (
    <section
      aria-labelledby="about-page-heading"
      className="relative bg-[#1a2e0a] overflow-hidden pt-24 pb-20 md:pt-28 md:pb-28"
    >
      {/* Texture */}
      <div className="absolute inset-0 opacity-[0.06] pointer-events-none" aria-hidden="true">
        <svg width="100%" height="100%">
          <defs>
            <pattern id="ahero-dots" x="0" y="0" width="24" height="24" patternUnits="userSpaceOnUse">
              <circle cx="1.5" cy="1.5" r="1.2" fill="#f7f9f4"/>
            </pattern>
          </defs>
          <rect width="100%" height="100%" fill="url(#ahero-dots)"/>
        </svg>
      </div>

      {/* Blob accents */}
      <div className="absolute -top-32 -right-32 w-[480px] h-[480px] rounded-full
                      bg-[#3a7d0a]/20 blur-3xl pointer-events-none" aria-hidden="true"/>
      <div className="absolute -bottom-20 -left-20 w-72 h-72 rounded-full
                      bg-[#e07b1a]/10 blur-3xl pointer-events-none" aria-hidden="true"/>

      <div className="relative z-10 max-w-7xl mx-auto px-5 sm:px-8 lg:px-12">

        {/* Breadcrumb */}
        <motion.nav
          aria-label="Breadcrumb"
          {...fadeUp(0)}
          className="mb-8"
        >
          <ol className="flex items-center gap-2 font-['Jost'] text-xs text-white/40">
            <li><Link to="/" className="hover:text-white/70 transition-colors focus-visible:outline-none focus-visible:underline">Home</Link></li>
            <li aria-hidden="true"><span>/</span></li>
            <li className="text-white/70" aria-current="page">About</li>
          </ol>
        </motion.nav>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-end">
          {/* Left — heading */}
          <div className="flex flex-col gap-6">
            <motion.div {...fadeUp(0.05)}>
              <span className="inline-flex items-center gap-2 font-['Jost'] text-xs font-semibold
                               uppercase tracking-widest text-[#6ab523]
                               bg-[#6ab523]/10 border border-[#6ab523]/20 px-4 py-2 rounded-full">
                <span className="w-1.5 h-1.5 rounded-full bg-[#6ab523]" aria-hidden="true"/>
                Our Story
              </span>
            </motion.div>

            <motion.h1
              id="about-page-heading"
              {...fadeUp(0.1)}
              className="font-['Cormorant_Garamond'] font-semibold text-white
                         text-5xl sm:text-6xl xl:text-7xl leading-[1.05] tracking-tight"
            >
              Built on belief.
              <br/>
              <span className="text-[#6ab523]">Driven by purpose.</span>
            </motion.h1>
          </div>

          {/* Right — intro paragraph */}
          <motion.div {...fadeUp(0.18)} className="flex flex-col gap-5">
            <p className="font-['Jost'] text-white/75 text-lg sm:text-xl leading-relaxed">
              Renowned Child Initiative is a neurodiversity and inclusive education
              organization dedicated to supporting individuals with diverse learning
              and developmental needs through advocacy, intervention, training, and
              educational support services.
            </p>

            {/* Horizontal rule accent */}
            <div className="flex items-center gap-3" aria-hidden="true">
              <div className="h-[1px] w-12 bg-[#6ab523]/50 rounded-full"/>
              <div className="h-[1px] flex-1 bg-white/8 rounded-full"/>
            </div>
          </motion.div>
        </div>

        {/* Stats strip */}
        <motion.div
          {...fadeUp(0.25)}
          className="grid grid-cols-2 sm:grid-cols-4 gap-4 mt-14 pt-10
                     border-t border-white/8"
        >
          {[
            { n: "2014", label: "Founded" },
            { n: "500+", label: "Children Supported" },
            { n: "10+",  label: "Years of Service" },
            { n: "95%",  label: "Family Satisfaction" },
          ].map(({ n, label }) => (
            <div key={label} className="flex flex-col gap-1">
              <span className="font-['Cormorant_Garamond'] font-bold text-white text-3xl md:text-4xl leading-none">
                {n}
              </span>
              <span className="font-['Jost'] text-white/40 text-xs uppercase tracking-wider">
                {label}
              </span>
            </div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}

// ─────────────────────────────────────────────────────────────────
// MISSION & VISION
// ─────────────────────────────────────────────────────────────────
function MissionVision() {
  return (
    <section
      aria-labelledby="mission-vision-heading"
      className="relative bg-[#f7f9f4] py-20 md:py-28 overflow-hidden"
    >
      {/* Top wave from dark hero */}
      <div className="absolute top-0 left-0 right-0" aria-hidden="true">
        <svg viewBox="0 0 1440 56" fill="none" xmlns="http://www.w3.org/2000/svg"
             className="w-full" preserveAspectRatio="none">
          <path d="M0 0L1440 0L1440 20C1200 56 240 56 0 20L0 0Z" fill="#1a2e0a"/>
        </svg>
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-5 sm:px-8 lg:px-12 pt-8">

        <motion.p {...fadeUp()} className="font-['Jost'] text-[#3a7d0a] text-xs uppercase tracking-widest mb-10 text-center">
          What Guides Us
        </motion.p>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 lg:gap-8">

          {/* Mission */}
          <motion.div
            {...fadeLeft()}
            className="group relative bg-white rounded-3xl p-8 lg:p-10
                       border border-[#3a7d0a]/10 hover:border-[#3a7d0a]/30
                       shadow-sm hover:shadow-lg hover:shadow-[#1a2e0a]/6
                       transition-all duration-300 overflow-hidden"
          >
            {/* Number watermark */}
            <div className="absolute -right-4 -top-4 font-['Cormorant_Garamond'] font-bold
                            text-[8rem] leading-none text-[#3a7d0a]/5 select-none pointer-events-none"
                 aria-hidden="true">M</div>

            <div className="relative z-10 flex flex-col gap-5">
              <div className="w-12 h-12 rounded-2xl bg-[#3a7d0a]/10
                              flex items-center justify-center
                              group-hover:bg-[#3a7d0a] transition-colors duration-300">
                <svg width="22" height="22" viewBox="0 0 22 22" fill="none" aria-hidden="true"
                     className="text-[#3a7d0a] group-hover:text-white transition-colors duration-300">
                  <path d="M11 3L13.5 8.5L19.5 9.3L15.2 13.5L16.3 19.5L11 16.5L5.7 19.5L6.8 13.5L2.5 9.3L8.5 8.5L11 3Z"
                        stroke="currentColor" strokeWidth="1.5" strokeLinejoin="round"/>
                </svg>
              </div>

              <div>
                <h2 className="font-['Cormorant_Garamond'] font-semibold text-[#1a2e0a] text-4xl mb-1">
                  Our Mission
                </h2>
                <div className="w-8 h-[2px] rounded-full bg-[#3a7d0a] mb-4" aria-hidden="true"/>
              </div>

              <p className="font-['Jost'] text-[#1a2e0a]/80 text-base leading-relaxed">
                To promote inclusion and support individuals with diverse learning
                and developmental needs through advocacy, intervention, training,
                and empowerment.
              </p>
            </div>
          </motion.div>

          {/* Vision */}
          <motion.div
            {...fadeRight()}
            className="group relative bg-[#1a2e0a] rounded-3xl p-8 lg:p-10
                       border border-white/5 hover:border-[#6ab523]/20
                       shadow-sm hover:shadow-lg hover:shadow-[#1a2e0a]/20
                       transition-all duration-300 overflow-hidden"
          >
            {/* Watermark */}
            <div className="absolute -right-4 -top-4 font-['Cormorant_Garamond'] font-bold
                            text-[8rem] leading-none text-white/5 select-none pointer-events-none"
                 aria-hidden="true">V</div>

            <div className="relative z-10 flex flex-col gap-5">
              <div className="w-12 h-12 rounded-2xl bg-[#6ab523]/15
                              flex items-center justify-center
                              group-hover:bg-[#6ab523] transition-colors duration-300">
                <svg width="22" height="22" viewBox="0 0 22 22" fill="none" aria-hidden="true"
                     className="text-[#6ab523] group-hover:text-white transition-colors duration-300">
                  <circle cx="11" cy="11" r="8" stroke="currentColor" strokeWidth="1.5"/>
                  <path d="M11 7V11L14 13" stroke="currentColor" strokeWidth="1.5"
                        strokeLinecap="round" strokeLinejoin="round"/>
                  <circle cx="11" cy="11" r="2" fill="currentColor"/>
                </svg>
              </div>

              <div>
                <h2 className="font-['Cormorant_Garamond'] font-semibold text-white text-4xl mb-1">
                  Our Vision
                </h2>
                <div className="w-8 h-[2px] rounded-full bg-[#6ab523] mb-4" aria-hidden="true"/>
              </div>

              <p className="font-['Jost'] text-white/75 text-base leading-relaxed">
                To create an inclusive society where individuals with diverse learning
                and developmental needs are supported, empowered, and given equal
                opportunities to thrive.
              </p>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}

// ─────────────────────────────────────────────────────────────────
// FOUNDER SPOTLIGHT
// ─────────────────────────────────────────────────────────────────
function FounderSpotlight() {
  return (
    <section
      aria-labelledby="founder-heading"
      className="relative bg-white py-20 md:py-28 overflow-hidden"
    >
      {/* Decorative large circle behind photo */}
      <div className="absolute left-0 top-1/2 -translate-y-1/2 -translate-x-1/2
                      w-[600px] h-[600px] rounded-full bg-[#3a7d0a]/4
                      pointer-events-none" aria-hidden="true"/>

      <div className="relative z-10 max-w-7xl mx-auto px-5 sm:px-8 lg:px-12">

        <motion.p {...fadeUp()} className="font-['Jost'] text-[#3a7d0a] text-xs uppercase tracking-widest mb-10">
          Leadership
        </motion.p>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 items-center">

          {/* Photo side */}
          <motion.div {...fadeLeft()} className="relative">

            {/* Main photo */}
            <div className="relative rounded-[2.5rem] overflow-hidden aspect-[3/4]
                            bg-[#e8f0e0] border border-[#3a7d0a]/10
                            shadow-2xl shadow-[#1a2e0a]/12 max-w-sm mx-auto lg:mx-0">
              <img
                src="/founder.jpg"
                alt="Founder of Renowned Child Initiative"
                className="w-full h-full object-cover object-top"
                loading="lazy"
                decoding="async"
                onError={(e) => {
                  e.currentTarget.style.display = "none";
                  e.currentTarget.parentElement.classList.add(
                    "flex","items-center","justify-center"
                  );
                  e.currentTarget.insertAdjacentHTML("afterend",
                    `<span style="font-size:5rem">👩‍💼</span>`
                  );
                }}
              />
              {/* Bottom gradient */}
              <div className="absolute inset-x-0 bottom-0 h-2/5
                             bg-gradient-to-t from-[#1a2e0a]/50 to-transparent"/>

              {/* Name tag overlaid on photo */}
              <div className="absolute bottom-6 left-6 right-6">
                <p className="font-['Cormorant_Garamond'] font-semibold text-white text-2xl leading-tight">
                  Ozioma Ike
                </p>
                <p className="font-['Jost'] text-white/70 text-sm mt-1">
                  Founder &amp; Executive Director
                </p>
              </div>
            </div>

            {/* Floating credential badge */}
            <motion.div
              initial={{ opacity: 0, scale: 0.85 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ delay: 0.4, duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
              className="absolute -right-2 lg:-right-8 top-8
                         bg-[#f5a84e] text-[#1a2e0a] rounded-2xl px-5 py-4
                         shadow-lg shadow-[#e07b1a]/25 max-w-[160px]"
            >
              <p className="font-['Cormorant_Garamond'] font-bold text-2xl leading-none">10+</p>
              <p className="font-['Jost'] text-[10px] uppercase tracking-wider mt-0.5 leading-snug">
                Years leading with purpose
              </p>
            </motion.div>
          </motion.div>

          {/* Text side */}
          <motion.div {...fadeRight()} className="flex flex-col gap-6">
            <h2
              id="founder-heading"
              className="font-['Cormorant_Garamond'] font-semibold text-[#1a2e0a]
                         text-5xl sm:text-6xl md:text-7xl leading-tight"
            >
              Meet the founder,
              <br/>
              <span className="italic text-[#3a7d0a]">Ozioma Ike</span>
            </h2>

            <div className="flex flex-col gap-4 font-['Jost'] text-[#1a2e0a]/80 text-base leading-relaxed">
              <p>
                While working in private schools, Ozioma encountered many children who
                struggled with reading, writing, comprehension, attention, and
                communication difficulties. She also witnessed the frustration of
                teachers and parents who lacked the right support and strategies
                to help these children succeed academically and socially.
              </p>
              <p>
                This experience inspired her to seek deeper knowledge in neurodiversity
                and special needs education. She received specialised training in
                supporting children with autism, learning disabilities, ADHD, Down
                syndrome, cerebral palsy, hearing impairment, and other developmental needs.
              </p>
              <p>
                Through this journey, the vision for Renowned Child Initiative was
                born — to provide support, advocacy, intervention, and inclusive
                learning opportunities for children with diverse needs, while
                empowering families, schools, and communities.
              </p>
            </div>

            {/* Credential tags */}
            <div className="flex flex-wrap gap-2 pt-2">
              {[
                "Certified Autism Specialist (IBCCES, USA)",
                "Dyslexia Specialist — University of London",
                "ABAT Specialist — QABA Board, USA",
                "Cambridge English (L1 & L2)",
                "Neurodiversity & Educational Consultant",
                "Author — Every Child Can Shine",
              ].map((tag) => (
                <span
                  key={tag}
                  className="font-['Jost'] text-xs font-medium text-[#3a7d0a]
                             bg-[#3a7d0a]/8 border border-[#3a7d0a]/15
                             px-3 py-1.5 rounded-full"
                >
                  {tag}
                </span>
              ))}
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}

// ─────────────────────────────────────────────────────────────────
// VALUES GRID
// ─────────────────────────────────────────────────────────────────
function ValuesGrid() {
  return (
    <section
      aria-labelledby="values-heading"
      className="relative bg-[#f7f9f4] py-20 md:py-28 overflow-hidden"
    >
      <div className="absolute inset-0 opacity-[0.05] pointer-events-none" aria-hidden="true">
        <svg width="100%" height="100%">
          <defs>
            <pattern id="vdots" x="0" y="0" width="24" height="24" patternUnits="userSpaceOnUse">
              <circle cx="1.5" cy="1.5" r="1.2" fill="#3a7d0a"/>
            </pattern>
          </defs>
          <rect width="100%" height="100%" fill="url(#vdots)"/>
        </svg>
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-5 sm:px-8 lg:px-12">

        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-end sm:justify-between gap-4 mb-14">
          <motion.div {...fadeUp()}>
            <p className="font-['Jost'] text-[#3a7d0a] text-xs uppercase tracking-widest mb-3">
              What We Stand For
            </p>
            <h2
              id="values-heading"
              className="font-['Cormorant_Garamond'] font-semibold text-[#1a2e0a]
                         text-5xl sm:text-6xl md:text-7xl leading-tight"
            >
              Our core values
            </h2>
          </motion.div>

          <motion.p
            {...fadeUp(0.1)}
            className="font-['Jost'] text-[#1a2e0a]/50 text-sm max-w-xs leading-relaxed"
          >
            Six principles that shape every decision we make and every interaction we have.
          </motion.p>
        </div>

        {/* Values grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {VALUES.map(({ number, title, desc, accent }, i) => (
            <motion.div
              key={title}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-40px" }}
              transition={{ delay: i * 0.08, duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
              className="group relative bg-white rounded-2xl p-7
                         border border-[#1a2e0a]/6 hover:border-[#3a7d0a]/25
                         hover:shadow-lg hover:shadow-[#1a2e0a]/6
                         transition-all duration-300 overflow-hidden"
            >
              {/* Large number watermark */}
              <div
                className="absolute -right-2 -bottom-4 font-['Cormorant_Garamond'] font-bold
                           text-[5rem] leading-none select-none pointer-events-none
                           transition-opacity duration-300"
                style={{ color: accent, opacity: 0.06 }}
                aria-hidden="true"
              >
                {number}
              </div>

              <div className="relative z-10 flex flex-col gap-4">
                {/* Number + accent line */}
                <div className="flex items-center gap-3">
                  <span
                    className="font-['Jost'] text-xs font-bold uppercase tracking-widest"
                    style={{ color: accent }}
                  >
                    {number}
                  </span>
                  <div
                    className="h-[1.5px] w-8 rounded-full transition-all duration-300 group-hover:w-14"
                    style={{ backgroundColor: accent }}
                    aria-hidden="true"
                  />
                </div>

                <h3 className="font-['Cormorant_Garamond'] font-semibold text-[#1a2e0a] text-3xl">
                  {title}
                </h3>

                <p className="font-['Jost'] text-[#1a2e0a]/75 text-base leading-relaxed">
                  {desc}
                </p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

// ─────────────────────────────────────────────────────────────────
// TIMELINE
// ─────────────────────────────────────────────────────────────────
function Timeline() {
  return (
    <section
      aria-labelledby="timeline-heading"
      className="relative bg-[#1a2e0a] py-20 md:py-28 overflow-hidden"
    >
      {/* Texture */}
      <div className="absolute inset-0 opacity-[0.05] pointer-events-none" aria-hidden="true">
        <svg width="100%" height="100%">
          <defs>
            <pattern id="tdots" x="0" y="0" width="20" height="20" patternUnits="userSpaceOnUse">
              <circle cx="1.5" cy="1.5" r="1" fill="#6ab523"/>
            </pattern>
          </defs>
          <rect width="100%" height="100%" fill="url(#tdots)"/>
        </svg>
      </div>

      <div className="relative z-10 max-w-4xl mx-auto px-5 sm:px-8 lg:px-12">

        <motion.div {...fadeUp()} className="text-center mb-14">
          <p className="font-['Jost'] text-[#6ab523] text-xs uppercase tracking-widest mb-3">
            A Decade of Impact
          </p>
          <h2
            id="timeline-heading"
            className="font-['Cormorant_Garamond'] font-semibold text-white
                       text-5xl sm:text-6xl md:text-7xl"
          >
            Our journey so far
          </h2>
        </motion.div>

        {/* Timeline items */}
        <ol className="relative flex flex-col gap-0">
          {/* Vertical line */}
          <div
            className="absolute left-[72px] sm:left-[88px] top-2 bottom-2
                       w-[1px] bg-gradient-to-b from-[#6ab523]/40 via-[#6ab523]/20 to-transparent"
            aria-hidden="true"
          />

          {MILESTONES.map(({ year, event }, i) => (
            <motion.li
              key={year}
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, margin: "-40px" }}
              transition={{ delay: i * 0.1, duration: 0.55, ease: [0.22, 1, 0.36, 1] }}
              className="relative flex items-start gap-6 sm:gap-8 pb-10 last:pb-0"
            >
              {/* Year */}
              <div className="flex-shrink-0 w-16 sm:w-20 text-right">
                <span className="font-['Cormorant_Garamond'] font-bold text-[#6ab523] text-lg leading-none">
                  {year}
                </span>
              </div>

              {/* Dot */}
              <div
                className="relative flex-shrink-0 w-3 h-3 rounded-full bg-[#6ab523]
                           mt-1 ring-4 ring-[#1a2e0a] z-10"
                aria-hidden="true"
              />

              {/* Event */}
              <p className="font-['Jost'] text-white/80 text-base sm:text-lg leading-relaxed pt-0.5">
                {event}
              </p>
            </motion.li>
          ))}
        </ol>
      </div>
    </section>
  );
}

// ─────────────────────────────────────────────────────────────────
// ABOUT PAGE — assembled
// ─────────────────────────────────────────────────────────────────
export default function About() {
  return (
    <>
      <AboutHero />
      <MissionVision />
      <FounderSpotlight />
      <ValuesGrid />
      <Timeline />
      <CTABanner />
      <Footer />
    </>
  );
}