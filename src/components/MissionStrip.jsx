import { useRef } from "react";
import { motion, useInView } from "framer-motion";

const STATS = [
  { number: "500+", label: "Children Supported", icon: "🌱" },
  { number: "10+",  label: "Years of Impact",    icon: "📅" },
  { number: "95%",  label: "Family Satisfaction", icon: "💚" },
  { number: "20+",  label: "Expert Specialists",  icon: "🎓" },
];

const fadeUp = {
  hidden:  { opacity: 0, y: 28 },
  visible: (i) => ({
    opacity: 1, y: 0,
    transition: { delay: i * 0.1, duration: 0.6, ease: [0.22, 1, 0.36, 1] },
  }),
};

export default function MissionStrip() {
  const ref     = useRef(null);
  const inView  = useInView(ref, { once: true, margin: "-60px" });

  return (
    <section
      ref={ref}
      aria-labelledby="mission-heading"
      className="relative overflow-hidden bg-[#1a2e0a] py-16 md:py-20"
    >
      {/* Subtle dot texture */}
      <div className="absolute inset-0 pointer-events-none opacity-[0.07]" aria-hidden="true">
        <svg width="100%" height="100%" xmlns="http://www.w3.org/2000/svg">
          <defs>
            <pattern id="mdots" x="0" y="0" width="20" height="20" patternUnits="userSpaceOnUse">
              <circle cx="1.5" cy="1.5" r="1.2" fill="#6ab523"/>
            </pattern>
          </defs>
          <rect width="100%" height="100%" fill="url(#mdots)"/>
        </svg>
      </div>

      {/* Amber blob accent */}
      <div
        className="absolute -right-20 -top-20 w-64 h-64 rounded-full
                   bg-[#e07b1a]/10 blur-3xl pointer-events-none"
        aria-hidden="true"
      />

      <div className="relative z-10 max-w-7xl mx-auto px-5 sm:px-8 lg:px-12">

        {/* Mission statement */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
          className="text-center mb-14"
        >
          <p className="font-['Jost'] text-[#6ab523] text-xs uppercase tracking-widest mb-4">
            Our Impact
          </p>
          <h2
            id="mission-heading"
            className="font-['Cormorant_Garamond'] font-semibold text-white
                       text-3xl sm:text-4xl md:text-5xl leading-tight max-w-3xl mx-auto"
          >
            Building a world where{" "}
            <span className="text-[#f5a84e]">every child's</span>{" "}
            potential is recognised and nurtured
          </h2>
        </motion.div>

        {/* Stats grid */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6">
          {STATS.map(({ number, label, icon }, i) => (
            <motion.div
              key={label}
              custom={i}
              variants={fadeUp}
              initial="hidden"
              animate={inView ? "visible" : "hidden"}
              className="group relative flex flex-col items-center text-center
                         bg-white/5 hover:bg-white/10
                         border border-white/10 hover:border-[#6ab523]/40
                         rounded-2xl p-6 md:p-8
                         transition-all duration-300 cursor-default"
            >
              <span className="text-3xl mb-3" role="img" aria-label={label}>{icon}</span>
              <span
                className="font-['Cormorant_Garamond'] font-bold text-white
                           text-4xl md:text-5xl leading-none mb-2
                           group-hover:text-[#6ab523] transition-colors duration-300"
              >
                {number}
              </span>
              <span className="font-['Jost'] text-white/50 text-sm leading-snug">
                {label}
              </span>

              {/* Corner accent */}
              <div
                className="absolute top-3 right-3 w-1.5 h-1.5 rounded-full
                           bg-[#6ab523]/40 group-hover:bg-[#6ab523]
                           transition-colors duration-300"
                aria-hidden="true"
              />
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}