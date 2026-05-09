// schemas/siteSettings.js
// Singleton — one document for global site info
// The client edits this to update org name, email, logo etc.

import { defineType, defineField } from "sanity";

export default defineType({
  name:  "siteSettings",
  title: "Site Settings",
  type:  "document",

  fields: [
    defineField({
      name:  "orgName",
      title: "Organization Name",
      type:  "string",
      validation: Rule => Rule.required(),
    }),

    defineField({
      name:  "tagline",
      title: "Tagline",
      type:  "string",
      description: "Short line that appears under the logo or in the hero",
    }),

    defineField({
      name:  "contactEmail",
      title: "Contact Email",
      type:  "string",
      validation: Rule => Rule.email(),
    }),

    defineField({
      name:  "logo",
      title: "Logo",
      type:  "image",
      options: { hotspot: true },
    }),
  ],
});