// renowned-child-initiative/sanity.config.js

import { defineConfig } from "sanity";
import { structureTool } from "sanity/structure";
import { visionTool } from "@sanity/vision";

// ── Import all schemas ────────────────────────────────────────────
import siteSettings  from "./schemas/siteSettings";
import heroContent   from "./schemas/heroContent";
import service       from "./schemas/service";
import teamMember    from "./schemas/teamMember";
import galleryImage  from "./schemas/galleryImage";
import socialLink    from "./schemas/socialLink";
import impactStat    from "./schemas/impactStat";

// ── Custom sidebar structure ──────────────────────────────────────
const customStructure = (S) =>
  S.list()
    .title("Renowned Child Initiative")
    .items([

      // Singletons — only one document each
      S.listItem()
        .title("⚙️  Site Settings")
        .id("siteSettings")
        .child(
          S.document()
            .schemaType("siteSettings")
            .documentId("siteSettings")
        ),

      S.listItem()
        .title("🏠  Hero Section")
        .id("heroContent")
        .child(
          S.document()
            .schemaType("heroContent")
            .documentId("heroContent")
        ),

      S.divider(),

      // Collections — client can add multiple of these
      S.documentTypeListItem("service").title("🌿  Services"),
      S.documentTypeListItem("teamMember").title("👥  Team Members"),
      S.documentTypeListItem("galleryImage").title("🖼️  Gallery"),
      S.documentTypeListItem("socialLink").title("🔗  Social Links"),
      S.documentTypeListItem("impactStat").title("📊  Impact Stats"),
    ]);

export default defineConfig({
  name:      "rci-studio",
  title:     "Renowned Child Initiative",
  projectId: "t7qelzlc",
  dataset:   "production",

  plugins: [
    structureTool({ structure: customStructure }),
    visionTool(),
  ],

  schema: {
    types: [
      siteSettings,
      heroContent,
      service,
      teamMember,
      galleryImage,
      socialLink,
      impactStat,
    ],
  },
});