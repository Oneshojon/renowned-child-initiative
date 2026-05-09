import { useState, useEffect } from "react";
import { NavLink, Link, useLocation } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";

const NAV_LINKS = [
  { label: "Home",     to: "/" },
  { label: "About",    to: "/about" },
  { label: "Services", to: "/services" },
  { label: "Contact",  to: "/contact" },
];

const DARK_HERO_ROUTES = ["/about", "/services", "/contact"];

const menuVariants = {
  hidden:  { opacity: 0, y: -16, pointerEvents: "none" },
  visible: { opacity: 1, y: 0,   pointerEvents: "auto",
             transition: { duration: 0.32, ease: [0.22, 1, 0.36, 1] } },
  exit:    { opacity: 0, y: -12,
             transition: { duration: 0.2, ease: "easeIn" } },
};

const linkVariants = {
  hidden:  { opacity: 0, y: 10 },
  visible: (i) => ({
    opacity: 1, y: 0,
    transition: { delay: i * 0.06, duration: 0.3, ease: "easeOut" },
  }),
};

export default function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const { pathname } = useLocation();

  const isDarkHero = DARK_HERO_ROUTES.includes(pathname);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    setScrolled(window.scrollY > 24);
    setMenuOpen(false);
  }, [pathname]);

  useEffect(() => {
    const onKey = (e) => { if (e.key === "Escape") setMenuOpen(false); };
    document.addEventListener("keydown", onKey);
    return () => document.removeEventListener("keydown", onKey);
  }, []);

  useEffect(() => {
    document.body.style.overflow = menuOpen ? "hidden" : "";
    return () => { document.body.style.overflow = ""; };
  }, [menuOpen]);

  const close = () => setMenuOpen(false);

  // On dark hero pages before scroll: white text, subtle dark overlay behind nav
  // On light hero (home) before scroll: dark text, transparent
  // After scroll on any page: light frosted glass bg, dark text
  const isLight = true; // navbar bg is always light when visible

  // Background logic:
  // - scrolled: frosted mint glass
  // - dark hero, not scrolled: semi-transparent dark overlay so text is readable
  // - light hero, not scrolled: fully transparent
  const headerBg = scrolled || isDarkHero
    ? "bg-[#f7f9f4]/95 backdrop-blur-md shadow-sm border-b border-[#3a7d0a]/10"
    : "bg-transparent";

  return (
    <header
      role="banner"
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${headerBg}`}
    >
      <nav
        aria-label="Main navigation"
        className="max-w-7xl mx-auto px-5 sm:px-8 lg:px-12
                   flex items-center justify-between h-16 md:h-20"
      >

        {/* ── Logo + Wordmark ─────────────────────────────────── */}
        <Link
          to="/"
          onClick={close}
          aria-label="Renowned Child Initiative — Home"
          className="flex items-center gap-3 group
                     focus-visible:outline-none focus-visible:ring-2
                     focus-visible:ring-[#6ab523] rounded-lg"
        >
          <div className="relative flex-shrink-0 w-10 h-10 md:w-12 md:h-12
                          rounded-full overflow-hidden ring-2 ring-white/20
                          group-hover:ring-[#6ab523]/60
                          transition-all duration-300 shadow-sm">
            <img
              src="/logo.png"
              alt=""
              aria-hidden="true"
              className="w-full h-full object-cover object-top scale-[2.8] translate-y-[43%]"
              draggable={false}
            />
          </div>

          <div className="flex flex-col leading-none">
            <span className={`font-['Cormorant_Garamond'] font-bold text-lg md:text-xl
                              tracking-tight transition-colors duration-300 group-hover:text-[#6ab523]
                              ${isLight ? "text-[#1a2e0a]" : "text-white"}`}>
              Renowned<span className="text-[#6ab523]"> Child</span>
            </span>
            <span className={`font-['Jost'] font-medium text-[10px] md:text-[11px]
                              uppercase tracking-[0.18em] mt-0.5 transition-colors duration-300
                              ${isLight ? "text-[#1a2e0a]/50" : "text-white/60"}`}>
              Initiative
            </span>
          </div>
        </Link>

        {/* ── Desktop Nav Links ─────────────────────────────────── */}
        <ul role="list" className="hidden md:flex items-center gap-1">
          {NAV_LINKS.map(({ label, to }) => (
            <li key={to}>
              <NavLink
                to={to}
                end={to === "/"}
                className={({ isActive }) =>
                  `relative font-['Jost'] text-sm font-medium px-4 py-2 rounded-full
                   transition-colors duration-200
                   focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#6ab523]
                   ${isActive
                     ? "text-[#6ab523]"
                     : isLight
                       ? "text-[#1a2e0a]/70 hover:text-[#3a7d0a]"
                       : "text-white/80 hover:text-white"
                   }`
                }
              >
                {({ isActive }) => (
                  <>
                    {label}
                    {isActive && (
                      <motion.span
                        layoutId="nav-pill"
                        className={`absolute inset-0 rounded-full -z-10
                                    ${isLight ? "bg-[#3a7d0a]/10" : "bg-white/15"}`}
                        transition={{ type: "spring", stiffness: 380, damping: 32 }}
                      />
                    )}
                  </>
                )}
              </NavLink>
            </li>
          ))}
        </ul>

        {/* ── CTA Button ───────────────────────────────────────── */}
        <Link
          to="/contact"
          className="hidden md:inline-flex items-center gap-2
                     font-['Jost'] text-sm font-semibold text-white
                     bg-[#3a7d0a] hover:bg-[#6ab523]
                     px-5 py-2.5 rounded-full transition-all duration-200
                     hover:shadow-md hover:shadow-[#3a7d0a]/30
                     focus-visible:outline-none focus-visible:ring-2
                     focus-visible:ring-[#6ab523] focus-visible:ring-offset-2"
        >
          Get Support
          <svg width="14" height="14" viewBox="0 0 14 14" fill="none" aria-hidden="true">
            <path d="M2 7H12M8 3L12 7L8 11" stroke="currentColor"
                  strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round"/>
          </svg>
        </Link>

        {/* ── Hamburger (mobile) ────────────────────────────────── */}
        <button
          type="button"
          aria-label={menuOpen ? "Close navigation menu" : "Open navigation menu"}
          aria-expanded={menuOpen}
          aria-controls="mobile-menu"
          onClick={() => setMenuOpen((v) => !v)}
          className="md:hidden relative w-10 h-10 flex flex-col items-center
                     justify-center gap-[5px] rounded-full
                     hover:bg-white/10 transition-colors duration-200
                     focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#6ab523]"
        >
          {["top", "mid", "bot"].map((id, i) => (
            <motion.span
              key={id}
              animate={
                menuOpen
                  ? i === 0 ? { rotate: 45,  y: 7,  opacity: 1 }
                  : i === 1 ? { opacity: 0, scaleX: 0 }
                  :           { rotate: -45, y: -7, opacity: 1 }
                  : { rotate: 0, y: 0, opacity: 1, scaleX: 1 }
              }
              transition={{ duration: 0.22 }}
              className={`block w-5 h-[1.5px] rounded-full origin-center
                          ${isLight ? "bg-[#1a2e0a]" : "bg-white"}`}
            />
          ))}
        </button>
      </nav>

      {/* ── Mobile Menu ───────────────────────────────────────────── */}
      <AnimatePresence>
        {menuOpen && (
          <>
            <motion.div
              key="backdrop"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.2 }}
              onClick={close}
              aria-hidden="true"
              className="fixed inset-0 top-16 bg-[#1a2e0a]/40 backdrop-blur-sm md:hidden"
            />
            <motion.div
              key="mobile-menu"
              id="mobile-menu"
              role="dialog"
              aria-modal="true"
              aria-label="Navigation menu"
              variants={menuVariants}
              initial="hidden"
              animate="visible"
              exit="exit"
              className="absolute top-full left-4 right-4 md:hidden
                         bg-[#f7f9f4] rounded-2xl shadow-xl shadow-[#1a2e0a]/12
                         border border-[#3a7d0a]/12 overflow-hidden"
            >
              <ul role="list" className="p-3 space-y-1">
                {NAV_LINKS.map(({ label, to }, i) => (
                  <motion.li key={to} custom={i} variants={linkVariants}
                             initial="hidden" animate="visible">
                    <NavLink
                      to={to}
                      end={to === "/"}
                      onClick={close}
                      className={({ isActive }) =>
                        `flex items-center justify-between font-['Jost'] text-base font-medium
                         px-4 py-3.5 rounded-xl transition-colors duration-150
                         focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#3a7d0a]
                         ${isActive
                           ? "bg-[#3a7d0a] text-white"
                           : "text-[#1a2e0a] hover:bg-[#3a7d0a]/8 hover:text-[#3a7d0a]"
                         }`
                      }
                    >
                      {label}
                      <svg width="14" height="14" viewBox="0 0 14 14" fill="none" aria-hidden="true">
                        <path d="M4 7H10M7 4L10 7L7 10" stroke="currentColor"
                              strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                      </svg>
                    </NavLink>
                  </motion.li>
                ))}
              </ul>
              <div className="p-3 pt-0">
                <Link
                  to="/contact"
                  onClick={close}
                  className="flex items-center justify-center gap-2 w-full
                             font-['Jost'] font-semibold text-sm text-white
                             bg-[#e07b1a] hover:bg-[#f5a84e]
                             px-4 py-3.5 rounded-xl transition-colors duration-150
                             focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#e07b1a]"
                >
                  Get Support Today
                </Link>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </header>
  );
}