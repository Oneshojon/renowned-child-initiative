import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import { useSanity }         from "../hooks/useSanity";
import { SOCIAL_LINKS_QUERY } from "../lib/queries";

// ─── Animation helpers ────────────────────────────────────────────
const fadeUp = {
  hidden: { opacity: 0, y: 28 },
  visible: (i = 0) => ({
    opacity: 1, y: 0,
    transition: { delay: i * 0.09, duration: 0.65, ease: [0.22, 1, 0.36, 1] },
  }),
};

const stagger = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.1, delayChildren: 0.05 } },
};

// ─── Social icon map ──────────────────────────────────────────────
const SOCIAL_META = {
  instagram: {
    label: "@everybraincountswithozy",
    color: "#e07b1a",
    icon: (
      <svg viewBox="0 0 24 24" fill="none" aria-hidden="true" className="w-5 h-5">
        <rect x="2" y="2" width="20" height="20" rx="5" stroke="currentColor" strokeWidth="1.8" />
        <circle cx="12" cy="12" r="4.5" stroke="currentColor" strokeWidth="1.8" />
        <circle cx="17.5" cy="6.5" r="1" fill="currentColor" />
      </svg>
    ),
  },
  tiktok: {
    label: "@every.brain.count",
    color: "#3a7d0a",
    icon: (
      <svg viewBox="0 0 24 24" fill="none" aria-hidden="true" className="w-5 h-5">
        <path d="M9 12a4 4 0 1 0 4 4V4a5 5 0 0 0 5 5"
          stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
      </svg>
    ),
  },
  facebook: {
    label: "Renowned Child Initiative",
    color: "#3a7d0a",
    icon: (
      <svg viewBox="0 0 24 24" fill="none" aria-hidden="true" className="w-5 h-5">
        <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z"
          stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
      </svg>
    ),
  },
  linkedin: {
    label: "Ozioma Ike",
    color: "#e07b1a",
    icon: (
      <svg viewBox="0 0 24 24" fill="none" aria-hidden="true" className="w-5 h-5">
        <rect x="2" y="2" width="20" height="20" rx="4" stroke="currentColor" strokeWidth="1.8" />
        <path d="M7 10v7M7 7v.5M12 17v-4a2 2 0 0 1 4 0v4M12 10v7"
          stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" />
      </svg>
    ),
  },
  youtube: {
    label: "@everybraincountswithozy",
    color: "#3a7d0a",
    icon: (
      <svg viewBox="0 0 24 24" fill="none" aria-hidden="true" className="w-5 h-5">
        <rect x="2" y="5" width="20" height="14" rx="4" stroke="currentColor" strokeWidth="1.8" />
        <path d="M10 9l5 3-5 3V9z" stroke="currentColor" strokeWidth="1.8" strokeLinejoin="round" />
      </svg>
    ),
  },
  twitter: {
    label: "@rci",
    color: "#1a2e0a",
    icon: (
      <svg viewBox="0 0 24 24" fill="none" aria-hidden="true" className="w-5 h-5">
        <path d="M4 4l16 16M4 20L20 4" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round"/>
      </svg>
    ),
  },
};

// Capitalise platform name for display
const platformName = (p) => p.charAt(0).toUpperCase() + p.slice(1);

// ─── Hero ─────────────────────────────────────────────────────────
function ContactHero() {
  const ref    = useRef(null);
  const inView = useInView(ref, { once: true });

  return (
    <section
      ref={ref}
      aria-labelledby="contact-hero-heading"
      className="relative overflow-hidden bg-[#1a2e0a] pt-28 pb-0 md:pt-36"
    >
      <div className="absolute inset-0 pointer-events-none opacity-[0.06]" aria-hidden="true">
        <svg width="100%" height="100%">
          <defs>
            <pattern id="cdots" x="0" y="0" width="28" height="28" patternUnits="userSpaceOnUse">
              <circle cx="1.5" cy="1.5" r="1.3" fill="#6ab523" />
            </pattern>
          </defs>
          <rect width="100%" height="100%" fill="url(#cdots)" />
        </svg>
      </div>
      <div className="absolute -right-24 top-10 w-72 h-72 rounded-full bg-[#e07b1a]/10 blur-3xl pointer-events-none" aria-hidden="true" />
      <div className="absolute -left-20 bottom-0 w-64 h-64 rounded-full bg-[#6ab523]/10 blur-3xl pointer-events-none" aria-hidden="true" />

      <div className="relative z-10 max-w-7xl mx-auto px-5 sm:px-8 lg:px-12">
        <motion.div
          variants={stagger} initial="hidden" animate={inView ? "visible" : "hidden"}
          className="max-w-2xl pb-16 md:pb-20"
        >
          <motion.span variants={fadeUp} className="inline-flex items-center gap-2 text-xs font-['Jost'] font-semibold uppercase tracking-widest text-[#f5a84e] mb-6">
            <span className="w-8 h-px bg-[#f5a84e]" aria-hidden="true" />
            Get in Touch
          </motion.span>
          <motion.h1
            variants={fadeUp}
            id="contact-hero-heading"
            className="font-['Cormorant_Garamond'] font-bold text-4xl sm:text-5xl md:text-6xl lg:text-7xl leading-[1.05] text-white mb-6"
          >
            Let's Start a{" "}
            <em className="not-italic text-[#f5a84e]">Conversation</em>
          </motion.h1>
          <motion.p variants={fadeUp} className="font-['Jost'] text-lg text-white/60 leading-relaxed">
            Whether you're a parent looking for support, a school seeking guidance, or a
            professional wanting to collaborate — we'd love to hear from you.
          </motion.p>
        </motion.div>

        <div
          className="absolute bottom-0 left-0 right-0 h-16 bg-[#f7f9f4]"
          style={{ clipPath: "polygon(0 100%, 100% 0, 100% 100%)" }}
          aria-hidden="true"
        />
      </div>
    </section>
  );
}

// ─── Email Section ────────────────────────────────────────────────
function EmailSection() {
  const ref    = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-60px" });

  const emails = [
    {
      label:       "General Enquiries",
      address:     "consulting@renownedchildinitiative.org",
      description: "For service enquiries, school partnerships, consultation requests, and all general questions.",
    },
    {
      label:       "Direct Contact",
      address:     "ozy@renownedchildinitiative.org",
      description: "Reach Ozioma directly for speaking engagements, media, collaborations, or personal correspondence.",
    },
  ];

  return (
    <section ref={ref} aria-labelledby="email-section-heading" className="bg-[#f7f9f4] pt-20 pb-16 md:pt-24 md:pb-20">
      <div className="max-w-7xl mx-auto px-5 sm:px-8 lg:px-12">
        <motion.div initial={{ opacity: 0, y: 20 }} animate={inView ? { opacity: 1, y: 0 } : {}} transition={{ duration: 0.55 }} className="mb-12">
          <span className="inline-flex items-center gap-2 text-xs font-['Jost'] font-semibold uppercase tracking-widest text-[#e07b1a] mb-3">
            <span className="w-8 h-px bg-[#e07b1a]" aria-hidden="true" />
            Email Us
          </span>
          <h2 id="email-section-heading" className="font-['Cormorant_Garamond'] font-bold text-4xl md:text-5xl text-[#1a2e0a] leading-tight">
            Write to Us
          </h2>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
          {emails.map((email, i) => (
            <motion.div
              key={email.address} custom={i} variants={fadeUp} initial="hidden" animate={inView ? "visible" : "hidden"}
              className="group relative overflow-hidden rounded-3xl bg-white border border-[#3a7d0a]/12 p-8 md:p-10 hover:border-[#3a7d0a]/30 hover:shadow-lg transition-all duration-300"
            >
              <div className="absolute top-0 right-0 w-28 h-28 pointer-events-none opacity-[0.04]" aria-hidden="true">
                <svg viewBox="0 0 112 112"><circle cx="112" cy="0" r="90" fill="#3a7d0a" /></svg>
              </div>

              <p className="font-['Jost'] text-xs font-semibold uppercase tracking-widest text-[#6ab523] mb-3">
                {email.label}
              </p>

              <a
                href={`mailto:${email.address}`}
                className="group/link inline-flex items-start gap-2 mb-4
                  font-['Jost'] font-semibold text-lg md:text-xl text-[#1a2e0a]
                  hover:text-[#3a7d0a] transition-colors duration-200
                  focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2
                  focus-visible:outline-[#3a7d0a] rounded-sm"
                aria-label={`Send email to ${email.address}`}
              >
                <svg viewBox="0 0 24 24" fill="none" aria-hidden="true" className="w-5 h-5 mt-1 shrink-0 text-[#e07b1a]">
                  <rect x="2" y="4" width="20" height="16" rx="3" stroke="currentColor" strokeWidth="1.8" />
                  <path d="M2 8l10 6 10-6" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" />
                </svg>
                <span className="break-all">{email.address}</span>
              </a>

              <p className="font-['Jost'] text-sm text-[#1a2e0a]/55 leading-relaxed">
                {email.description}
              </p>

              <div className="absolute bottom-0 left-0 h-[3px] w-0 bg-[#3a7d0a] group-hover:w-full transition-all duration-500 rounded-full" aria-hidden="true" />
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

// ─── Socials Section — live from Sanity ───────────────────────────
function SocialsSection() {
  const ref    = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-60px" });
  const { data: socialLinks, loading } = useSanity(SOCIAL_LINKS_QUERY);

  // Fallback hardcoded list while loading
  const FALLBACK = [
    { _id: "ig",  platform: "instagram", url: "https://www.instagram.com/everybraincountswithozy" },
    { _id: "tt",  platform: "tiktok",    url: "https://www.tiktok.com/@every.brain.count" },
    { _id: "fb",  platform: "facebook",  url: "https://www.facebook.com/RCIniNg" },
    { _id: "li",  platform: "linkedin",  url: "https://www.linkedin.com/in/ozioma-ike-45ab2b379" },
    { _id: "yt",  platform: "youtube",   url: "https://youtube.com/@everybraincountswithozy" },
  ];

  const displaySocials = (!loading && socialLinks?.length) ? socialLinks : FALLBACK;

  return (
    <section ref={ref} aria-labelledby="socials-heading" className="bg-white py-16 md:py-24">
      <div className="max-w-7xl mx-auto px-5 sm:px-8 lg:px-12">
        <motion.div initial={{ opacity: 0, y: 20 }} animate={inView ? { opacity: 1, y: 0 } : {}} transition={{ duration: 0.55 }} className="mb-12">
          <span className="inline-flex items-center gap-2 text-xs font-['Jost'] font-semibold uppercase tracking-widest text-[#e07b1a] mb-3">
            <span className="w-8 h-px bg-[#e07b1a]" aria-hidden="true" />
            Follow Along
          </span>
          <h2 id="socials-heading" className="font-['Cormorant_Garamond'] font-bold text-4xl md:text-5xl text-[#1a2e0a] leading-tight">
            Find Us on Social Media
          </h2>
          <p className="mt-4 font-['Jost'] text-base text-[#1a2e0a]/55 max-w-xl leading-relaxed">
            Stay connected with Ozioma for insights on neurodiversity, inclusive education,
            and resources for families and schools.
          </p>
        </motion.div>

        <motion.ul
          variants={stagger} initial="hidden" animate={inView ? "visible" : "hidden"}
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4"
          role="list"
          aria-label="Social media links"
        >
          {displaySocials.map((social, i) => {
            const meta = SOCIAL_META[social.platform] ?? { label: social.url, color: "#3a7d0a", icon: null };
            return (
              <motion.li key={social._id} custom={i} variants={fadeUp}>
                <a
                  href={social.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group flex items-center gap-5 p-6 rounded-2xl
                    bg-[#f7f9f4] border border-[#3a7d0a]/10
                    hover:bg-white hover:border-[#3a7d0a]/25 hover:shadow-md
                    transition-all duration-300
                    focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2
                    focus-visible:outline-[#3a7d0a]"
                  aria-label={`${platformName(social.platform)} — ${meta.label}`}
                >
                  {/* Icon circle */}
                  <div
                    className="w-12 h-12 rounded-xl flex items-center justify-center shrink-0 transition-transform duration-300 group-hover:scale-110"
                    style={{ backgroundColor: `${meta.color}15`, color: meta.color }}
                  >
                    {meta.icon}
                  </div>

                  {/* Text */}
                  <div className="min-w-0">
                    <p className="font-['Jost'] font-semibold text-sm text-[#1a2e0a] mb-0.5">
                      {platformName(social.platform)}
                    </p>
                    <p className="font-['Jost'] text-xs text-[#1a2e0a]/50 truncate">
                      {meta.label}
                    </p>
                  </div>

                  {/* Arrow */}
                  <svg viewBox="0 0 20 20" fill="none" aria-hidden="true"
                    className="w-4 h-4 ml-auto shrink-0 text-[#1a2e0a]/25 group-hover:text-[#3a7d0a] group-hover:translate-x-1 transition-all duration-300">
                    <path d="M4 10h12M10 4l6 6-6 6" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" />
                  </svg>
                </a>
              </motion.li>
            );
          })}
        </motion.ul>
      </div>
    </section>
  );
}

// ─── Domain Strip ─────────────────────────────────────────────────
function DomainStrip() {
  const ref    = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-40px" });

  return (
    <section ref={ref} aria-label="Website address" className="bg-[#f7f9f4] border-t border-[#3a7d0a]/10 py-10">
      <div className="max-w-7xl mx-auto px-5 sm:px-8 lg:px-12">
        <motion.div initial={{ opacity: 0, y: 16 }} animate={inView ? { opacity: 1, y: 0 } : {}} transition={{ duration: 0.5 }} className="flex flex-col sm:flex-row items-start sm:items-center gap-4">
          <div className="w-10 h-10 rounded-xl bg-[#3a7d0a]/10 flex items-center justify-center shrink-0" aria-hidden="true">
            <svg viewBox="0 0 24 24" fill="none" className="w-5 h-5 text-[#3a7d0a]">
              <circle cx="12" cy="12" r="9" stroke="currentColor" strokeWidth="1.8" />
              <path d="M12 3c-2.5 3-4 5.5-4 9s1.5 6 4 9M12 3c2.5 3 4 5.5 4 9s-1.5 6-4 9M3 12h18"
                stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" />
            </svg>
          </div>
          <div>
            <p className="font-['Jost'] text-xs text-[#1a2e0a]/45 uppercase tracking-widest font-semibold mb-0.5">Website</p>
            <a
              href="https://renownedchildinitiative.org"
              target="_blank"
              rel="noopener noreferrer"
              className="font-['Jost'] font-semibold text-[#3a7d0a] hover:text-[#1a2e0a] transition-colors duration-200 text-base focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#3a7d0a] rounded-sm"
            >
              renownedchildinitiative.org
            </a>
          </div>
        </motion.div>
      </div>
    </section>
  );
}

// ─── Closing CTA ──────────────────────────────────────────────────
function ContactCTA() {
  const ref    = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-60px" });

  return (
    <section ref={ref} aria-labelledby="contact-cta-heading" className="relative overflow-hidden bg-[#3a7d0a] py-20 md:py-28">
      <div className="absolute inset-0 opacity-[0.05] pointer-events-none" aria-hidden="true">
        <svg width="100%" height="100%">
          <defs>
            <pattern id="ccdots" x="0" y="0" width="24" height="24" patternUnits="userSpaceOnUse">
              <circle cx="1.5" cy="1.5" r="1.2" fill="#f5a84e" />
            </pattern>
          </defs>
          <rect width="100%" height="100%" fill="url(#ccdots)" />
        </svg>
      </div>
      <div className="absolute -top-20 -left-20 w-72 h-72 rounded-full bg-[#6ab523]/20 blur-3xl pointer-events-none" aria-hidden="true" />
      <div className="absolute -bottom-16 -right-16 w-64 h-64 rounded-full bg-[#1a2e0a]/25 blur-3xl pointer-events-none" aria-hidden="true" />

      <div className="relative z-10 max-w-7xl mx-auto px-5 sm:px-8 lg:px-12">
        <motion.div
          variants={stagger} initial="hidden" animate={inView ? "visible" : "hidden"}
          className="flex flex-col md:flex-row md:items-end md:justify-between gap-10"
        >
          <div className="max-w-xl">
            <motion.span variants={fadeUp} className="inline-flex items-center gap-2 text-xs font-['Jost'] font-semibold uppercase tracking-widest text-[#f5a84e] mb-5">
              <span className="w-8 h-px bg-[#f5a84e]" aria-hidden="true" />
              Every Brain Counts
            </motion.span>
            <motion.h2 variants={fadeUp} id="contact-cta-heading"
              className="font-['Cormorant_Garamond'] font-bold text-4xl sm:text-5xl text-white leading-tight">
              Ready to support your child's journey?
            </motion.h2>
            <motion.p variants={fadeUp} className="mt-4 font-['Jost'] text-white/65 text-base leading-relaxed">
              We provide support, advocacy, intervention, and inclusive learning opportunities
              for children with diverse needs. Reach out — the first conversation is always free.
            </motion.p>
          </div>

          <motion.div variants={fadeUp} className="flex flex-col gap-3 shrink-0">
            <a
              href="mailto:consulting@renownedchildinitiative.org"
              className="inline-flex items-center justify-center gap-2
                bg-[#f5a84e] text-[#1a2e0a] font-['Jost'] font-semibold text-sm
                px-8 py-4 rounded-full whitespace-nowrap
                hover:bg-white transition-colors duration-200
                focus-visible:outline focus-visible:outline-2 focus-visible:outline-white focus-visible:outline-offset-2"
              aria-label="Send an email to consulting@renownedchildinitiative.org"
            >
              <svg viewBox="0 0 20 20" fill="none" aria-hidden="true" className="w-4 h-4">
                <rect x="2" y="4" width="16" height="12" rx="2.5" stroke="currentColor" strokeWidth="1.6" />
                <path d="M2 7l8 5 8-5" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" />
              </svg>
              Email Us Today
            </a>
            <p className="font-['Jost'] text-xs text-white/40 text-center">
              consulting@renownedchildinitiative.org
            </p>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}

// ─── Page ─────────────────────────────────────────────────────────
export default function ContactPage() {
  return (
    <>
      <ContactHero />
      <EmailSection />
      <SocialsSection />
      <DomainStrip />
      <ContactCTA />
    </>
  );
}