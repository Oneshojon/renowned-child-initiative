import { useRef } from "react";
import { Link } from "react-router-dom";
import { motion, useInView } from "framer-motion";

const VALUES = [
  { label: "Child-Centred",  desc: "Every decision starts with the child's best interest." },
  { label: "Evidence-Based", desc: "Grounded in proven therapeutic and educational methods." },
  { label: "Inclusive",      desc: "We celebrate neurodiversity, not just accommodate it." },
];

export default function AboutTeaser() {
  const ref    = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });

  return (
    <section
      ref={ref}
      aria-labelledby="about-heading"
      className="relative bg-white py-20 md:py-28 overflow-hidden"
    >
      {/* Background leaf accent */}
      <div className="absolute right-0 top-1/2 -translate-y-1/2 pointer-events-none opacity-[0.04]" aria-hidden="true">
        <svg width="480" height="480" viewBox="0 0 480 480" fill="none">
          <path d="M240 20C360 20 460 120 460 240C460 360 360 460 240 460C120 460 20 360 20 240C20 120 120 20 240 20Z"
                fill="#3a7d0a"/>
        </svg>
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-5 sm:px-8 lg:px-12">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 items-center">

          {/* ── LEFT — Image collage ──────────────────────────── */}
          <motion.div
            initial={{ opacity: 0, x: -32 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
            className="relative order-2 lg:order-1"
          >
            {/* Main image */}
            <div className="relative rounded-[2rem] overflow-hidden aspect-[4/5]
                            bg-[#e8f0e0] shadow-xl shadow-[#1a2e0a]/10
                            border border-[#3a7d0a]/10 ml-0 lg:ml-4">
              <img
                src="/about-image.jpg"
                alt="A specialist working attentively with a young child in a warm, supportive learning environment"
                className="w-full h-full object-cover"
                loading="lazy"
                decoding="async"
                onError={(e) => { e.currentTarget.style.display = "none"; }}
              />
              {/* Gradient overlay */}
              <div className="absolute inset-0 bg-gradient-to-t from-[#1a2e0a]/30 via-transparent to-transparent"/>
            </div>

            {/* Floating year badge */}
            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              animate={inView ? { opacity: 1, scale: 1 } : {}}
              transition={{ delay: 0.4, duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
              className="absolute -top-4 -right-2 lg:-right-6
                         bg-[#3a7d0a] text-white rounded-2xl px-5 py-4
                         shadow-lg shadow-[#3a7d0a]/30"
            >
              <p className="font-['Cormorant_Garamond'] font-bold text-3xl leading-none">10+</p>
              <p className="font-['Jost'] text-[10px] uppercase tracking-wider text-white/75 mt-0.5">
                Years serving<br/>families
              </p>
            </motion.div>

            {/* Small accent image — bottom left */}
            <motion.div
              initial={{ opacity: 0, y: 16 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ delay: 0.5, duration: 0.5 }}
              className="absolute -bottom-6 left-0 lg:-left-6
                         w-36 h-36 sm:w-44 sm:h-44
                         rounded-2xl overflow-hidden
                         bg-[#f5a84e]/20 border-4 border-white
                         shadow-lg shadow-[#1a2e0a]/10"
            >
              <img
                src="/about-image-2.jpg"
                alt=""
                aria-hidden="true"
                className="w-full h-full object-cover"
                loading="lazy"
                onError={(e) => {
                  e.currentTarget.style.display = "none";
                  e.currentTarget.parentElement.innerHTML =
                    `<div class="w-full h-full flex items-center justify-center">
                       <span style="font-size:2.5rem">🌱</span>
                     </div>`;
                }}
              />
            </motion.div>
          </motion.div>

          {/* ── RIGHT — Text ──────────────────────────────────── */}
          <motion.div
            initial={{ opacity: 0, x: 32 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
            className="flex flex-col gap-6 order-1 lg:order-2 pb-8 lg:pb-0"
          >
            <p className="font-['Jost'] text-[#3a7d0a] text-xs uppercase tracking-widest">
              Who We Are
            </p>

            <h2
              id="about-heading"
              className="font-['Cormorant_Garamond'] font-semibold text-[#1a2e0a]
                         text-4xl sm:text-5xl md:text-6xl leading-tight"
            >
              Rooted in love,
              <br/>
              driven by{" "}
              <span className="italic text-[#3a7d0a]">purpose</span>
            </h2>

            <p className="font-['Jost'] text-[#1a2e0a]/80 text-base leading-relaxed max-w-lg">
              Renowned Child Initiative was founded on a simple but powerful belief —
              that every child, regardless of how their mind works, deserves a fair
              chance to grow, learn, and belong. We bring together specialists,
              educators, and families to make that belief a lived reality.
            </p>

            {/* Values list */}
            <ul className="flex flex-col gap-4 mt-2" role="list">
              {VALUES.map(({ label, desc }, i) => (
                <motion.li
                  key={label}
                  initial={{ opacity: 0, x: 16 }}
                  animate={inView ? { opacity: 1, x: 0 } : {}}
                  transition={{ delay: 0.2 + i * 0.1, duration: 0.5 }}
                  className="flex items-start gap-3"
                >
                  <span
                    className="mt-1 flex-shrink-0 w-5 h-5 rounded-full bg-[#3a7d0a]/10
                               flex items-center justify-center"
                    aria-hidden="true"
                  >
                    <svg width="10" height="10" viewBox="0 0 10 10" fill="none">
                      <path d="M2 5L4 7L8 3" stroke="#3a7d0a" strokeWidth="1.5"
                            strokeLinecap="round" strokeLinejoin="round"/>
                    </svg>
                  </span>
                  <div>
                    <span className="font-['Jost'] font-semibold text-[#1a2e0a] text-sm">{label} — </span>
                    <span className="font-['Jost'] text-[#1a2e0a]/75 text-sm">{desc}</span>
                  </div>
                </motion.li>
              ))}
            </ul>

            <Link
              to="/about"
              className="self-start inline-flex items-center gap-2 mt-2
                         font-['Jost'] font-semibold text-sm text-white
                         bg-[#1a2e0a] hover:bg-[#3a7d0a]
                         px-6 py-3.5 rounded-full transition-all duration-200
                         hover:shadow-lg hover:shadow-[#1a2e0a]/25 hover:-translate-y-0.5
                         focus-visible:outline-none focus-visible:ring-2
                         focus-visible:ring-[#1a2e0a] focus-visible:ring-offset-2"
            >
              Our Full Story
              <svg width="14" height="14" viewBox="0 0 14 14" fill="none" aria-hidden="true">
                <path d="M2 7H12M8 3L12 7L8 11" stroke="currentColor" strokeWidth="1.6"
                      strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
            </Link>
          </motion.div>
        </div>
      </div>
    </section>
  );
}