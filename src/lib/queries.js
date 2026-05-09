// All GROQ queries in one place — import whichever you need in a component

// ── Site Settings (singleton) ─────────────────────────────────────
// Fetches global info: org name, tagline, logo, contact email
export const SITE_SETTINGS_QUERY = `
  *[_type == "siteSettings"][0] {
    orgName,
    tagline,
    contactEmail,
    logo { asset-> { url } }
  }
`;

// ── Hero Section (singleton) ──────────────────────────────────────
export const HERO_QUERY = `
  *[_type == "heroContent"][0] {
    heading,
    subheading,
    ctaLabel,
    ctaLink,
    backgroundImage { asset-> { url } }
  }
`;

// ── Services ──────────────────────────────────────────────────────
// order() sorts by the "order" field we'll add in the schema
export const SERVICES_QUERY = `
  *[_type == "service"] | order(order asc) {
    _id,
    title,
    tagline,
    description,
    icon,
    slug { current }
  }
`;

// ── Team Members ──────────────────────────────────────────────────
export const TEAM_QUERY = `
  *[_type == "teamMember"] | order(order asc) {
    _id,
    name,
    role,
    bio,
    photo { asset-> { url } }
  }
`;

// ── Gallery Images ────────────────────────────────────────────────
export const GALLERY_QUERY = `
  *[_type == "galleryImage"] | order(_createdAt desc) {
    _id,
    caption,
    alt,
    image { asset-> { url } }
  }
`;

// ── Social Links ──────────────────────────────────────────────────
export const SOCIAL_LINKS_QUERY = `
  *[_type == "socialLink"] | order(order asc) {
    _id,
    platform,
    url
  }
`;

// ── Impact Stats ──────────────────────────────────────────────────
export const STATS_QUERY = `
  *[_type == "impactStat"] | order(order asc) {
    _id,
    number,
    label
  }
`;