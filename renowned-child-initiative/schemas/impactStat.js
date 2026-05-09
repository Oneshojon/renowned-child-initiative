// schemas/impactStat.js
// Numbers that show RCI's impact e.g. "500+ Children Supported"
// Displayed as stat pills on the Home page

import { defineType, defineField } from "sanity";

export default defineType({
  name:  "impactStat",
  title: "Impact Stat",
  type:  "document",

  preview: {
    select: {
      title:    "number",
      subtitle: "label",
    },
  },

  fields: [
    defineField({
      name:  "number",
      title: "Number",
      type:  "string",
      description: "e.g. '500+' or '12' or '3,000+'",
      validation: Rule => Rule.required(),
    }),

    defineField({
      name:  "label",
      title: "Label",
      type:  "string",
      description: "e.g. 'Children Supported' or 'Partner Schools'",
      validation: Rule => Rule.required(),
    }),

    defineField({
      name:  "order",
      title: "Display Order",
      type:  "number",
      description: "Lower number appears first",
    }),
  ],
});