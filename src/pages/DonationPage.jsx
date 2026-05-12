import { useRef, useState } from "react";
import { motion, useInView } from "framer-motion";
import { Link } from "react-router-dom";
import { useSanity }        from "../hooks/useSanity";
import { DONATION_QUERY }   from "../lib/queries";
import { CTABanner, Footer } from "../components/CTAAndFooter";

// ─── Animation helpers ────────────────────────────────────────────
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

// ─── Currency flag/symbol map ─────────────────────────────────────
const CURRENCY_META = {
  NGN: { symbol: "₦", label: "Nigerian Naira",  flag: "🇳🇬" },
  USD: { symbol: "$", label: "US Dollar",        flag: "🇺🇸" },
  GBP: { symbol: "£", label: "British Pound",    flag: "🇬🇧" },
  EUR: { symbol: "€", label: "Euro",             flag: "🇪🇺" },
};

// ─── What donations support ───────────────────────────────────────
const IMPACT_ITEMS = [
  {
    icon: (
      <svg viewBox="0 0 40 40" fill="none" aria-hidden="true" className="w-7 h-7">
        <circle cx="20" cy="14" r="6" stroke="currentColor" strokeWidth="2"/>
        <path d="M8 34c0-8 5-13 12-13s12 5 12 13" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
      </svg>
    ),
    text: "Learning and developmental support services",
  },
  {
    icon: (
      <svg viewBox="0 0 40 40" fill="none" aria-hidden="true" className="w-7 h-7">
        <rect x="8" y="10" width="24" height="18" rx="3" stroke="currentColor" strokeWidth="2"/>
        <path d="M14 19h12M14 24h8" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round"/>
        <path d="M20 10V7" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
      </svg>
    ),
    text: "Therapy and intervention sessions",
  },
  {
    icon: (
      <svg viewBox="0 0 40 40" fill="none" aria-hidden="true" className="w-7 h-7">
        <rect x="6" y="5" width="20" height="28" rx="2.5" stroke="currentColor" strokeWidth="2"/>
        <line x1="11" y1="13" x2="21" y2="13" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round"/>
        <line x1="11" y1="18" x2="21" y2="18" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round"/>
        <line x1="11" y1="23" x2="17" y2="23" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round"/>
        <circle cx="29" cy="30" r="6" fill="#1a2e0a" stroke="currentColor" strokeWidth="2"/>
        <path d="M26.5 30l2 2 3.5-3.5" stroke="#f5a84e" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"/>
      </svg>
    ),
    text: "Educational resources and assessments",
  },
  {
    icon: (
      <svg viewBox="0 0 40 40" fill="none" aria-hidden="true" className="w-7 h-7">
        <circle cx="14" cy="13" r="5" stroke="currentColor" strokeWidth="2"/>
        <circle cx="28" cy="15" r="4" stroke="currentColor" strokeWidth="2"/>
        <path d="M4 34c0-6 4.5-10 10-10s10 4 10 10" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
        <path d="M28 34c0-5 3-8 7-8" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
      </svg>
    ),
    text: "Family guidance and advocacy support",
  },
];

// ─── Fallback accounts shown while Sanity loads ───────────────────
const FALLBACK = {
  title: "Our Bank Accounts",
  note:  "After donating, please send proof of payment to consulting@renownedchildinitiative.org",
  accounts: [],
};

// ─── Copy Account button ──────────────────────────────────────────
function CopyButton({ text }) {
  const [copied, setCopied] = useState(false);

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(text);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch {
      // fallback for older browsers
      const el = document.createElement("textarea");
      el.value = text;
      document.body.appendChild(el);
      el.select();
      document.execCommand("copy");
      document.body.removeChild(el);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  };

  return (
    <button
      onClick={handleCopy}
      aria-label={copied ? "Copied!" : `Copy account number ${text}`}
      className="inline-flex items-center gap-1.5 font-['Jost'] text-xs font-semibold
                 text-[#3a7d0a] hover:text-[#1a2e0a] transition-colors duration-150
                 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2
                 focus-visible:outline-[#3a7d0a]"
    >
      {copied ? (
        <>
          <svg viewBox="0 0 16 16" fill="none" className="w-3.5 h-3.5" aria-hidden="true">
            <path d="M3 8l3 3 7-7" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"/>
          </svg>
          Copied!
        </>
      ) : (
        <>
          <svg viewBox="0 0 16 16" fill="none" className="w-3.5 h-3.5" aria-hidden="true">
            <rect x="5" y="5" width="9" height="9" rx="1.5" stroke="currentColor" strokeWidth="1.5"/>
            <path d="M11 5V3.5A1.5 1.5 0 0 0 9.5 2h-6A1.5 1.5 0 0 0 2 3.5v6A1.5 1.5 0 0 0 3.5 11H5"
                  stroke="currentColor" strokeWidth="1.5"/>
          </svg>
          Copy
        </>
      )}
    </button>
  );
}

// ─── Account Card ─────────────────────────────────────────────────
function AccountCard({ account, index }) {
  const meta = CURRENCY_META[account.currency] ?? { symbol: "", label: account.currency, flag: "🌍" };

  return (
    <motion.div
      custom={index}
      variants={fadeUp}
      className="bg-white rounded-2xl border border-[#3a7d0a]/12
                 shadow-sm hover:shadow-md hover:-translate-y-0.5
                 transition-all duration-300 overflow-hidden"
      aria-label={`${account.bankName} account details`}
    >
      {/* Top accent */}
      <div
        className="h-1 w-full"
        style={{ background: index % 2 === 0 ? "#3a7d0a" : "#e07b1a" }}
        aria-hidden="true"
      />

      <div className="p-6 flex flex-col gap-4">
        {/* Bank + currency */}
        <div className="flex items-start justify-between gap-3">
          <h3 className="font-['Cormorant_Garamond'] font-bold text-2xl text-[#1a2e0a] leading-tight">
            {account.bankName}
          </h3>
          <span
            className="flex-shrink-0 inline-flex items-center gap-1.5
                       font-['Jost'] text-xs font-semibold px-3 py-1.5 rounded-full
                       bg-[#f7f9f4] border border-[#3a7d0a]/15 text-[#3a7d0a]"
            aria-label={`Currency: ${meta.label}`}
          >
            <span aria-hidden="true">{meta.flag}</span>
            {account.currency}
          </span>
        </div>

        {/* Details */}
        <dl className="flex flex-col gap-3">
          <div>
            <dt className="font-['Jost'] text-[10px] font-semibold uppercase tracking-widest text-[#1a2e0a]/40 mb-0.5">
              Account Name
            </dt>
            <dd className="font-['Jost'] font-semibold text-[#1a2e0a] text-base">
              {account.accountName}
            </dd>
          </div>

          <div>
            <dt className="font-['Jost'] text-[10px] font-semibold uppercase tracking-widest text-[#1a2e0a]/40 mb-0.5">
              Account Number
            </dt>
            <dd className="flex items-center justify-between gap-3">
              <span className="font-['Jost'] font-bold text-[#1a2e0a] text-xl tracking-wider">
                {account.accountNumber}
              </span>
              <CopyButton text={account.accountNumber} />
            </dd>
          </div>

          {account.sortCode && (
            <div>
              <dt className="font-['Jost'] text-[10px] font-semibold uppercase tracking-widest text-[#1a2e0a]/40 mb-0.5">
                Sort Code
              </dt>
              <dd className="font-['Jost'] text-[#1a2e0a] font-medium">{account.sortCode}</dd>
            </div>
          )}

          {account.swiftCode && (
            <div>
              <dt className="font-['Jost'] text-[10px] font-semibold uppercase tracking-widest text-[#1a2e0a]/40 mb-0.5">
                SWIFT / BIC
              </dt>
              <dd className="font-['Jost'] text-[#1a2e0a] font-medium">{account.swiftCode}</dd>
            </div>
          )}
        </dl>
      </div>
    </motion.div>
  );
}

// ─── Hero ─────────────────────────────────────────────────────────
function DonationHero() {
  const ref    = useRef(null);
  const inView = useInView(ref, { once: true });

  return (
    <section
      ref={ref}
      aria-labelledby="donation-hero-heading"
      className="relative bg-[#1a2e0a] overflow-hidden pt-24 pb-20 md:pt-32 md:pb-28"
    >
      {/* Dot texture */}
      <div className="absolute inset-0 opacity-[0.06] pointer-events-none" aria-hidden="true">
        <svg width="100%" height="100%">
          <defs>
            <pattern id="dh-dots" x="0" y="0" width="24" height="24" patternUnits="userSpaceOnUse">
              <circle cx="1.5" cy="1.5" r="1.2" fill="#f7f9f4"/>
            </pattern>
          </defs>
          <rect width="100%" height="100%" fill="url(#dh-dots)"/>
        </svg>
      </div>
      <div className="absolute -top-32 -right-32 w-[480px] h-[480px] rounded-full bg-[#3a7d0a]/20 blur-3xl pointer-events-none" aria-hidden="true"/>
      <div className="absolute -bottom-20 -left-20 w-72 h-72 rounded-full bg-[#e07b1a]/10 blur-3xl pointer-events-none" aria-hidden="true"/>

      <div className="relative z-10 max-w-7xl mx-auto px-5 sm:px-8 lg:px-12">

        {/* Breadcrumb */}
        <motion.nav
          aria-label="Breadcrumb"
          initial={{ opacity: 0, y: 12 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5 }}
          className="mb-8"
        >
          <ol className="flex items-center gap-2 font-['Jost'] text-xs text-white/40">
            <li><Link to="/" className="hover:text-white/70 transition-colors focus-visible:outline-none focus-visible:underline">Home</Link></li>
            <li aria-hidden="true"><span>/</span></li>
            <li className="text-white/70" aria-current="page">Donate</li>
          </ol>
        </motion.nav>

        <motion.div
          initial="hidden"
          animate={inView ? "visible" : "hidden"}
          variants={container}
          className="max-w-3xl"
        >
          <motion.span variants={fadeUp} className="inline-flex items-center gap-2 font-['Jost'] text-xs font-semibold uppercase tracking-widest text-[#6ab523] bg-[#6ab523]/10 border border-[#6ab523]/20 px-4 py-2 rounded-full mb-6">
            <span className="w-1.5 h-1.5 rounded-full bg-[#6ab523]" aria-hidden="true"/>
            Make a Difference
          </motion.span>

          <motion.h1
            id="donation-hero-heading"
            variants={fadeUp}
            className="font-['Cormorant_Garamond'] font-bold text-5xl sm:text-6xl xl:text-7xl text-white leading-[1.05] tracking-tight mb-6"
          >
            Sponsor a Child.{" "}
            <span className="text-[#6ab523]">Support a Family.</span>{" "}
            Change a Life.
          </motion.h1>

          <motion.p variants={fadeUp} className="font-['Jost'] text-white/70 text-lg sm:text-xl leading-relaxed">
            At our organization, we believe that every individual deserves access to the
            support, guidance, and intervention they need to thrive — regardless of
            financial limitations.
          </motion.p>
        </motion.div>
      </div>
    </section>
  );
}

// ─── Why Donate ───────────────────────────────────────────────────
function WhyDonate() {
  const ref    = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });

  return (
    <section
      ref={ref}
      aria-labelledby="why-donate-heading"
      className="relative bg-[#f7f9f4] py-20 md:py-28 overflow-hidden"
    >
      {/* Top wave */}
      <div className="absolute top-0 left-0 right-0" aria-hidden="true">
        <svg viewBox="0 0 1440 56" fill="none" className="w-full" preserveAspectRatio="none">
          <path d="M0 0L1440 0L1440 20C1200 56 240 56 0 20L0 0Z" fill="#1a2e0a"/>
        </svg>
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-5 sm:px-8 lg:px-12 pt-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 items-center">

          {/* Left — copy */}
          <motion.div
            initial={{ opacity: 0, x: -28 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
            className="flex flex-col gap-6"
          >
            <p className="font-['Jost'] text-[#3a7d0a] text-xs uppercase tracking-widest">
              Why Your Support Matters
            </p>
            <h2
              id="why-donate-heading"
              className="font-['Cormorant_Garamond'] font-bold text-4xl sm:text-5xl text-[#1a2e0a] leading-tight"
            >
              Many families who need us{" "}
              <span className="italic text-[#3a7d0a]">cannot afford us</span>
            </h2>
            <p className="font-['Jost'] text-[#1a2e0a]/75 text-base leading-relaxed">
              Many families and individuals who require our neurodiversity, learning support,
              and intervention services are unable to afford the full cost of care. Through
              your donations and sponsorships, we are able to extend help to those who need it most.
            </p>
            <p className="font-['Jost'] text-[#1a2e0a]/75 text-base leading-relaxed">
              Every contribution, no matter the size, makes a meaningful impact and gives
              hope to individuals and families on their journey toward growth and success.
            </p>
            <p className="font-['Cormorant_Garamond'] font-bold text-2xl text-[#3a7d0a] italic">
              Together, we can make support accessible to everyone.
            </p>
          </motion.div>

          {/* Right — impact list */}
          <motion.div
            initial={{ opacity: 0, x: 28 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
          >
            <div className="bg-white rounded-3xl border border-[#3a7d0a]/10 p-8
                            shadow-sm shadow-[#1a2e0a]/5">
              <p className="font-['Jost'] font-semibold text-[#1a2e0a] text-sm mb-6">
                Your support can help provide:
              </p>
              <ul className="flex flex-col gap-5" aria-label="What your donation supports">
                {IMPACT_ITEMS.map((item, i) => (
                  <motion.li
                    key={i}
                    initial={{ opacity: 0, x: 16 }}
                    animate={inView ? { opacity: 1, x: 0 } : {}}
                    transition={{ delay: 0.2 + i * 0.1, duration: 0.5 }}
                    className="flex items-start gap-4"
                  >
                    <span className="flex-shrink-0 w-12 h-12 rounded-xl bg-[#3a7d0a]/8
                                     flex items-center justify-center text-[#3a7d0a]">
                      {item.icon}
                    </span>
                    <span className="font-['Jost'] text-[#1a2e0a]/80 text-base leading-relaxed pt-2.5">
                      {item.text}
                    </span>
                  </motion.li>
                ))}
              </ul>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}

// ─── Account Numbers ──────────────────────────────────────────────
function AccountNumbers() {
  const ref    = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });
  const { data, loading } = useSanity(DONATION_QUERY);
  const donation = data ?? FALLBACK;

  return (
    <section
      ref={ref}
      aria-labelledby="accounts-heading"
      className="relative bg-white py-20 md:py-28"
    >
      <div className="max-w-7xl mx-auto px-5 sm:px-8 lg:px-12">

        {/* Header */}
        <motion.div
          initial="hidden"
          animate={inView ? "visible" : "hidden"}
          variants={container}
          className="text-center mb-14"
        >
          <motion.p variants={fadeUp} className="font-['Jost'] text-[#3a7d0a] text-xs uppercase tracking-widest mb-3">
            How to Donate
          </motion.p>
          <motion.h2
            id="accounts-heading"
            variants={fadeUp}
            className="font-['Cormorant_Garamond'] font-bold text-4xl sm:text-5xl text-[#1a2e0a] mb-4"
          >
            {loading ? "Our Bank Accounts" : donation.title}
          </motion.h2>
          <motion.p variants={fadeUp} className="font-['Jost'] text-[#1a2e0a]/60 text-base max-w-xl mx-auto">
            Transfer any amount directly to any of the accounts below. Every naira counts.
          </motion.p>
        </motion.div>

        {/* Loading state */}
        {loading && (
          <div className="flex justify-center py-12" aria-live="polite" aria-label="Loading account details">
            <div className="w-8 h-8 rounded-full border-2 border-[#3a7d0a]/20 border-t-[#3a7d0a] animate-spin"/>
          </div>
        )}

        {/* No accounts yet */}
        {!loading && (!donation.accounts || donation.accounts.length === 0) && (
          <div className="text-center py-12">
            <p className="font-['Jost'] text-[#1a2e0a]/50 text-base">
              Account details coming soon. Please email us at{" "}
              <a href="mailto:consulting@renownedchildinitiative.org"
                 className="text-[#3a7d0a] underline underline-offset-2 hover:text-[#1a2e0a] transition-colors">
                consulting@renownedchildinitiative.org
              </a>
            </p>
          </div>
        )}

        {/* Account cards */}
        {!loading && donation.accounts?.length > 0 && (
          <motion.div
            initial="hidden"
            animate={inView ? "visible" : "hidden"}
            variants={container}
            className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5"
          >
            {donation.accounts.map((account, i) => (
              <AccountCard key={i} account={account} index={i} />
            ))}
          </motion.div>
        )}

        {/* Donor note */}
        {!loading && donation.note && (
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ delay: 0.5, duration: 0.5 }}
            className="mt-10 flex items-start gap-3 bg-[#f7f9f4] border border-[#3a7d0a]/12
                       rounded-2xl p-5 max-w-2xl mx-auto"
            role="note"
          >
            <svg viewBox="0 0 20 20" fill="none" className="w-5 h-5 flex-shrink-0 text-[#3a7d0a] mt-0.5" aria-hidden="true">
              <circle cx="10" cy="10" r="8" stroke="currentColor" strokeWidth="1.5"/>
              <path d="M10 9v5M10 7v.5" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round"/>
            </svg>
            <p className="font-['Jost'] text-[#1a2e0a]/70 text-sm leading-relaxed">
              {donation.note}
            </p>
          </motion.div>
        )}
      </div>
    </section>
  );
}

// ─── Page ─────────────────────────────────────────────────────────
export default function DonationPage() {
  return (
    <main id="main-content">
      <a
        href="#main-content"
        className="sr-only focus:not-sr-only focus:fixed focus:top-4 focus:left-4 focus:z-50
          bg-[#3a7d0a] text-white font-['Jost'] font-semibold px-4 py-2 rounded-lg text-sm"
      >
        Skip to main content
      </a>
      <DonationHero />
      <WhyDonate />
      <AccountNumbers />
      <CTABanner />
      <Footer />
    </main>
  );
}