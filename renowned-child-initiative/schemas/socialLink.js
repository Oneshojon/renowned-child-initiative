// schemas/socialLink.js
// Social media links shown in the footer and contact page

import { defineType, defineField } from "sanity";

export default defineType({
  name:  "socialLink",
  title: "Social Link",
  type:  "document",

  preview: {
    select: {
      title:    "platform",
      subtitle: "url",
    },
  },

  fields: [
    defineField({
      name:  "platform",
      title: "Platform",
      type:  "string",
      options: {
        list: [
          { title: "Instagram",  value: "instagram" },
          { title: "TikTok",     value: "tiktok" },
          { title: "YouTube",    value: "youtube" },
          { title: "LinkedIn",   value: "linkedin" },
          { title: "Facebook",   value: "facebook" },
          { title: "X (Twitter)", value: "twitter" },
        ],
        layout: "radio",
      },
      validation: Rule => Rule.required(),
    }),

    defineField({
      name:  "url",
      title: "Full URL",
      type:  "url",
      description: "Full link e.g. https://instagram.com/everybraincountswithozy",
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