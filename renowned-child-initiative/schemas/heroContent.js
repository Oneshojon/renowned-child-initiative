// schemas/heroContent.js
// Singleton — controls the homepage hero banner

import { defineType, defineField } from "sanity";

export default defineType({
  name:  "heroContent",
  title: "Hero Section",
  type:  "document",

  fields: [
    defineField({
      name:  "heading",
      title: "Main Heading",
      type:  "string",
      description: "The big headline in the hero e.g. 'Every Brain Counts'",
      validation: Rule => Rule.required(),
    }),

    defineField({
      name:  "subheading",
      title: "Subheading",
      type:  "text",
      rows:  3,
      description: "Supporting text below the main heading",
    }),

    defineField({
      name:  "ctaLabel",
      title: "Button Text",
      type:  "string",
      description: "e.g. 'Get Support' or 'Learn More'",
    }),

    defineField({
      name:  "ctaLink",
      title: "Button Link",
      type:  "string",
      description: "e.g. /contact or /services",
    }),

    defineField({
      name:  "backgroundImage",
      title: "Background Image",
      type:  "image",
      options: { hotspot: true },
      description: "Hero background or featured image",
    }),
  ],
});