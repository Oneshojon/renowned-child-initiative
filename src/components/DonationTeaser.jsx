import { useRef } from "react";
import { Link } from "react-router-dom";
import { motion, useInView } from "framer-motion";

const fadeUp = {
  hidden:  { opacity: 0, y: 28 },
  visible: (i = 0) => ({
    opacity: 1, y: 0,
    transition: { delay: i * 0.12, duration: 0.65, ease: [0.22, 1, 0.36, 1] },
  }),
};

const container = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.12, delayChildren: 0.05 } },
};

const IMPACT = [
  { icon: "🧠", label: "Learning Support" },
  { icon: "💬", label: "Therapy Sessions" },
  { icon: "📚", label: "Educational Resources" },
  { icon: "👨‍👩‍👧", label: "Family Guidance" },
];

export default function DonationTeaser() {
  const ref    = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });

  return (
    <section
      ref={ref}
      aria-labelledby="donation-teaser-heading"
      className="relative overflow-hidden py-20 md:py-28"
      style={{ background: "linear-gradient(135deg, #1a2e0a 0%, #2d4f10 60%, #1a2e0a 100%)" }}
    >
      {/* Dot texture */}
      <div className="absolute inset-0 pointer-events-none opacity-[0.06]" aria-hidden="true">
        <svg width="100%" height="100%">
          <defs>
            <pattern id="dt-dots" x="0" y="0" width="24" height="24" patternUnits="userSpaceOnUse">
              <circle cx="1.5" cy="1.5" r="1.2" fill="#f7f9f4"/>
            </pattern>
          </defs>
          <rect width="100%" height="100%" fill="url(#dt-dots)"/>
        </svg>
      </div>

      {/* Amber glow — left */}
      <div className="absolute -left-32 top-1/2 -translate-y-1/2 w-80 h-80
                      rounded-full bg-[#f5a84e]/10 blur-3xl pointer-events-none" aria-hidden="true"/>
      {/* Green glow — right */}
      <div className="absolute -right-24 bottom-0 w-72 h-72
                      rounded-full bg-[#6ab523]/10 blur-3xl pointer-events-none" aria-hidden="true"/>

      <div className="relative z-10 max-w-7xl mx-auto px-5 sm:px-8 lg:px-12">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 items-center">

          {/* LEFT — copy */}
          <motion.div
            initial="hidden"
            animate={inView ? "visible" : "hidden"}
            variants={container}
            className="flex flex-col gap-6"
          >
            <motion.span
              variants={fadeUp}
              className="inline-flex items-center gap-2 w-fit font-['Jost'] text-xs font-semibold
                         uppercase tracking-widest text-[#f5a84e]
                         bg-[#f5a84e]/10 border border-[#f5a84e]/20 px-4 py-2 rounded-full"
            >
              <span className="w-1.5 h-1.5 rounded-full bg-[#f5a84e] animate-pulse" aria-hidden="true"/>
              Support Our Work
            </motion.span>

            <motion.h2
              id="donation-teaser-heading"
              variants={fadeUp}
              className="font-['Cormorant_Garamond'] font-bold text-white
                         text-4xl sm:text-5xl md:text-6xl leading-tight"
            >
              Sponsor a Child.{" "}
              <span className="text-[#6ab523]">Support a Family.</span>{" "}
              Change a Life.
            </motion.h2>

            <motion.p variants={fadeUp} className="font-['Jost'] text-white/65 text-lg leading-relaxed max-w-lg">
              Many families who need our services cannot afford them. Your donation
              directly funds support for children with diverse learning and
              developmental needs — giving them the same chance every child deserves.
            </motion.p>

            <motion.p
              variants={fadeUp}
              className="font-['Cormorant_Garamond'] font-semibold text-[#f5a84e] text-2xl italic"
            >
              Together, we can make support accessible to everyone.
            </motion.p>

            <motion.div variants={fadeUp} className="flex flex-col sm:flex-row gap-3 pt-2">
              <Link
                to="/donate"
                className="inline-flex items-center justify-center gap-2
                           font-['Jost'] font-semibold text-sm
                           bg-[#f5a84e] text-[#1a2e0a] px-8 py-4 rounded-full
                           hover:bg-white transition-colors duration-200
                           focus-visible:outline focus-visible:outline-2
                           focus-visible:outline-offset-2 focus-visible:outline-[#f5a84e]"
              >
                Donate Now
                <svg viewBox="0 0 20 20" fill="none" className="w-4 h-4" aria-hidden="true">
                  <path d="M4 10h12M10 4l6 6-6 6" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round"/>
                </svg>
              </Link>
              <Link
                to="/donate"
                className="inline-flex items-center justify-center gap-2
                           font-['Jost'] font-semibold text-sm
                           bg-transparent text-white border border-white/25 px-8 py-4 rounded-full
                           hover:bg-white/10 transition-colors duration-200
                           focus-visible:outline focus-visible:outline-2
                           focus-visible:outline-offset-2 focus-visible:outline-white"
              >
                See Account Details
              </Link>
            </motion.div>
          </motion.div>

          {/* RIGHT — impact cards */}
          <motion.div
            initial="hidden"
            animate={inView ? "visible" : "hidden"}
            variants={container}
            className="grid grid-cols-2 gap-4"
            aria-label="What your donation supports"
          >
            {IMPACT.map((item, i) => (
              <motion.div
                key={item.label}
                custom={i}
                variants={fadeUp}
                className="flex flex-col gap-3 bg-white/5 border border-white/10
                           rounded-2xl p-6 hover:bg-white/8 hover:border-white/20
                           transition-all duration-300"
              >
                <span className="text-3xl" role="img" aria-hidden="true">{item.icon}</span>
                <span className="font-['Jost'] text-white/80 text-sm font-medium leading-snug">
                  {item.label}
                </span>
              </motion.div>
            ))}

            {/* Stat card */}
            <motion.div
              custom={4}
              variants={fadeUp}
              className="col-span-2 flex items-center justify-between gap-4
                         bg-[#f5a84e]/10 border border-[#f5a84e]/20
                         rounded-2xl p-6"
            >
              <div>
                <p className="font-['Cormorant_Garamond'] font-bold text-4xl text-[#f5a84e] leading-none">500+</p>
                <p className="font-['Jost'] text-white/60 text-sm mt-1">Children supported so far</p>
              </div>
              <div className="w-px h-12 bg-white/10" aria-hidden="true"/>
              <div>
                <p className="font-['Cormorant_Garamond'] font-bold text-4xl text-[#6ab523] leading-none">10+</p>
                <p className="font-['Jost'] text-white/60 text-sm mt-1">Years of dedicated service</p>
              </div>
            </motion.div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}