import { useRef } from "react";
import { Link } from "react-router-dom";
import { motion, useInView } from "framer-motion";
import { useSanity }          from "../hooks/useSanity";
import { SOCIAL_LINKS_QUERY } from "../lib/queries";

// ─────────────────────────────────────────────────────────────────
// CTA BANNER
// ─────────────────────────────────────────────────────────────────
export function CTABanner() {
  const ref    = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-60px" });

  return (
    <section
      ref={ref}
      aria-labelledby="cta-heading"
      className="relative bg-[#1a2e0a] overflow-hidden py-20 md:py-28"
    >
      {/* Organic blob */}
      <div className="absolute -left-24 top-1/2 -translate-y-1/2 pointer-events-none opacity-20"
           aria-hidden="true">
        <svg width="400" height="400" viewBox="0 0 400 400" fill="none">
          <path d="M200 20C300 20 380 100 380 200C380 300 300 380 200 380C100 380 20 300 20 200C20 100 100 20 200 20Z"
                fill="#6ab523"/>
        </svg>
      </div>
      <div className="absolute -right-16 -bottom-16 pointer-events-none opacity-15"
           aria-hidden="true">
        <svg width="320" height="320" viewBox="0 0 320 320" fill="none">
          <path d="M160 10C240 10 310 80 310 160C310 240 240 310 160 310C80 310 10 240 10 160C10 80 80 10 160 10Z"
                fill="#e07b1a"/>
        </svg>
      </div>

      {/* Dot texture */}
      <div className="absolute inset-0 opacity-[0.05] pointer-events-none" aria-hidden="true">
        <svg width="100%" height="100%">
          <defs>
            <pattern id="cdots" x="0" y="0" width="20" height="20" patternUnits="userSpaceOnUse">
              <circle cx="1.5" cy="1.5" r="1" fill="#f7f9f4"/>
            </pattern>
          </defs>
          <rect width="100%" height="100%" fill="url(#cdots)"/>
        </svg>
      </div>

      <div className="relative z-10 max-w-4xl mx-auto px-5 sm:px-8 text-center">
        <motion.div
          initial={{ opacity: 0, y: 28 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
          className="flex flex-col items-center gap-7"
        >
          <span className="inline-flex items-center gap-2 font-['Jost'] text-xs font-semibold
                           uppercase tracking-widest text-[#6ab523]
                           bg-[#6ab523]/10 border border-[#6ab523]/20
                           px-4 py-2 rounded-full">
            <span className="w-1.5 h-1.5 rounded-full bg-[#6ab523] animate-pulse" aria-hidden="true"/>
            Take the First Step
          </span>

          <h2
            id="cta-heading"
            className="font-['Cormorant_Garamond'] font-semibold text-white
                       text-3xl sm:text-4xl md:text-5xl lg:text-6xl leading-tight"
          >
            Your child's journey
            <br/>
            <span className="text-[#f5a84e]">starts with one call</span>
          </h2>

          <p className="font-['Jost'] text-white/60 text-base sm:text-lg max-w-xl leading-relaxed">
            Reach out today and let's talk about how we can support your child.
            No judgment — just compassion, expertise, and a genuine desire to help.
          </p>

          <div className="flex flex-wrap items-center justify-center gap-3 pt-2">
            <Link
              to="/contact"
              className="inline-flex items-center gap-2.5
                         font-['Jost'] font-semibold text-sm text-[#1a2e0a]
                         bg-[#f5a84e] hover:bg-[#e07b1a] hover:text-white
                         px-7 py-4 rounded-full transition-all duration-200
                         hover:shadow-lg hover:shadow-[#e07b1a]/30 hover:-translate-y-0.5
                         focus-visible:outline-none focus-visible:ring-2
                         focus-visible:ring-[#f5a84e] focus-visible:ring-offset-2
                         focus-visible:ring-offset-[#1a2e0a]"
            >
              Get in Touch
              <svg width="15" height="15" viewBox="0 0 15 15" fill="none" aria-hidden="true">
                <path d="M2 7.5H13M9 3L13 7.5L9 12" stroke="currentColor" strokeWidth="1.6"
                      strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
            </Link>

            <Link
              to="/services"
              className="inline-flex items-center gap-2
                         font-['Jost'] font-medium text-sm text-white/80 hover:text-white
                         border border-white/20 hover:border-white/50
                         px-7 py-4 rounded-full transition-all duration-200
                         focus-visible:outline-none focus-visible:ring-2
                         focus-visible:ring-white focus-visible:ring-offset-2
                         focus-visible:ring-offset-[#1a2e0a]"
            >
              Explore Services
            </Link>
          </div>
        </motion.div>
      </div>
    </section>
  );
}

// ─────────────────────────────────────────────────────────────────
// FOOTER
// ─────────────────────────────────────────────────────────────────
const FOOTER_LINKS = [
  {
    heading: "Pages",
    links: [
      { label: "Home",     to: "/" },
      { label: "About",    to: "/about" },
      { label: "Services", to: "/services" },
      { label: "Contact",  to: "/contact" },
    ],
  },
  {
    heading: "Services",
    links: [
      { label: "Early Intervention",     to: "/services" },
      { label: "Inclusive Education",    to: "/services" },
      { label: "Neurodiversity Support", to: "/services" },
      { label: "Family Empowerment",     to: "/services" },
    ],
  },
];

export function Footer() {
  const year = new Date().getFullYear();
  const { data: socialLinks } = useSanity(SOCIAL_LINKS_QUERY);

  const SOCIAL_ICONS = {
    instagram: (
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" aria-hidden="true">
        <rect x="2" y="2" width="20" height="20" rx="5" stroke="currentColor" strokeWidth="1.8"/>
        <circle cx="12" cy="12" r="5" stroke="currentColor" strokeWidth="1.8"/>
        <circle cx="17.5" cy="6.5" r="1" fill="currentColor"/>
      </svg>
    ),
    tiktok: (
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" aria-hidden="true">
        <path d="M9 12a4 4 0 1 0 4 4V4a5 5 0 0 0 5 5" stroke="currentColor" strokeWidth="1.8"
              strokeLinecap="round" strokeLinejoin="round"/>
      </svg>
    ),
    youtube: (
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" aria-hidden="true">
        <rect x="2" y="5" width="20" height="14" rx="4" stroke="currentColor" strokeWidth="1.8"/>
        <path d="M10 9.5L15 12L10 14.5V9.5Z" fill="currentColor"/>
      </svg>
    ),
    linkedin: (
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" aria-hidden="true">
        <rect x="2" y="2" width="20" height="20" rx="4" stroke="currentColor" strokeWidth="1.8"/>
        <path d="M7 10v7M7 7v.5" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round"/>
        <path d="M11 17v-4a2 2 0 0 1 4 0v4M11 10v7" stroke="currentColor" strokeWidth="1.8"
              strokeLinecap="round"/>
      </svg>
    ),
    facebook: (
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" aria-hidden="true">
        <rect x="2" y="2" width="20" height="20" rx="5" stroke="currentColor" strokeWidth="1.8"/>
        <path d="M13 21v-8h2.5l.5-3H13V8.5C13 7.7 13.3 7 14.5 7H16V4.5S15 4 13.5 4C11 4 10 5.5 10 7.5V10H7.5v3H10v8"
              stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"/>
      </svg>
    ),
    twitter: (
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" aria-hidden="true">
        <path d="M4 4l16 16M4 20L20 4" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round"/>
      </svg>
    ),
  };

  return (
    <footer role="contentinfo" className="bg-[#111d06] text-white">

      {/* Main footer body */}
      <div className="max-w-7xl mx-auto px-5 sm:px-8 lg:px-12 py-14 md:py-20">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-10 lg:gap-8">

          {/* Brand column */}
          <div className="sm:col-span-2 lg:col-span-2 flex flex-col gap-5">
            <Link
              to="/"
              aria-label="Renowned Child Initiative — Home"
              className="flex items-center gap-3 w-fit
                         focus-visible:outline-none focus-visible:ring-2
                         focus-visible:ring-[#6ab523] rounded-lg"
            >
              <div className="w-10 h-10 rounded-full overflow-hidden ring-2 ring-[#6ab523]/30 flex-shrink-0">
                <img
                  src="/logo.png"
                  alt=""
                  aria-hidden="true"
                  className="w-full h-full object-cover object-top scale-[2.8] translate-y-[43%]"
                />
              </div>
              <div className="flex flex-col leading-none">
                <span className="font-['Cormorant_Garamond'] font-bold text-white text-lg tracking-tight">
                  Renowned <span className="text-[#6ab523]">Child</span>
                </span>
                <span className="font-['Jost'] text-[10px] uppercase tracking-[0.18em] text-white/40 mt-0.5">
                  Initiative
                </span>
              </div>
            </Link>

            <p className="font-['Jost'] text-white/50 text-sm leading-relaxed max-w-sm">
              Empowering children with diverse learning needs through
              specialised support, inclusive education, and compassionate care.
            </p>

            {/* Contact email */}
            <a
              href="mailto:consulting@renownedchildinitiative.org"
              className="inline-flex items-center gap-2 font-['Jost'] text-sm text-white/60
                         hover:text-[#6ab523] transition-colors duration-200 w-fit
                         focus-visible:outline-none focus-visible:underline"
            >
              <svg width="14" height="14" viewBox="0 0 14 14" fill="none" aria-hidden="true">
                <rect x="1" y="3" width="12" height="8" rx="1.5" stroke="currentColor" strokeWidth="1.2"/>
                <path d="M1 5L7 8.5L13 5" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round"/>
              </svg>
              consulting@renownedchildinitiative.org
            </a>

            {/* Social links — live from Sanity */}
            {socialLinks?.length > 0 && (
              <nav aria-label="Social media links" className="flex items-center gap-3 mt-1">
                {socialLinks.map((link) => (
                  <a
                    key={link._id}
                    href={link.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label={`Visit our ${link.platform} page`}
                    className="w-11 h-11 rounded-full border border-white/10
                               flex items-center justify-center
                               text-white/70 hover:text-[#6ab523]
                               hover:border-[#6ab523]/40
                               transition-all duration-200
                               focus-visible:outline-none focus-visible:ring-2
                               focus-visible:ring-[#6ab523]"
                  >
                    {SOCIAL_ICONS[link.platform] ?? link.platform}
                  </a>
                ))}
              </nav>
            )}
          </div>

          {/* Link columns */}
          {FOOTER_LINKS.map(({ heading, links }) => (
            <nav key={heading} aria-label={`${heading} links`}>
              <h3 className="font-['Jost'] text-xs font-semibold uppercase tracking-widest
                             text-white/30 mb-5">
                {heading}
              </h3>
              <ul role="list" className="flex flex-col gap-3">
                {links.map(({ label, to }) => (
                  <li key={label}>
                    <Link
                      to={to}
                      className="font-['Jost'] text-sm text-white/55 hover:text-[#6ab523]
                                 transition-colors duration-200
                                 focus-visible:outline-none focus-visible:underline"
                    >
                      {label}
                    </Link>
                  </li>
                ))}
              </ul>
            </nav>
          ))}
        </div>
      </div>

      {/* Bottom bar */}
      <div className="border-t border-white/8">
        <div className="max-w-7xl mx-auto px-5 sm:px-8 lg:px-12 py-5
                        flex flex-col sm:flex-row items-center justify-between gap-3">
          <p className="font-['Jost'] text-white/30 text-xs text-center sm:text-left">
            © {year} Renowned Child Initiative. All rights reserved.
          </p>
          <p className="font-['Jost'] text-white/20 text-xs">
            Built with care for every child 🌱
          </p>
        </div>
      </div>
    </footer>
  );
}