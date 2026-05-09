// schemas/teamMember.js
// Team members shown on the About page

import { defineType, defineField } from "sanity";

export default defineType({
  name:  "teamMember",
  title: "Team Member",
  type:  "document",

  // Controls what shows in the studio list view
  preview: {
    select: {
      title:    "name",
      subtitle: "role",
      media:    "photo",
    },
  },

  fields: [
    defineField({
      name:  "name",
      title: "Full Name",
      type:  "string",
      validation: Rule => Rule.required(),
    }),

    defineField({
      name:  "role",
      title: "Role / Title",
      type:  "string",
      description: "e.g. 'Founder & CEO' or 'Child Psychologist'",
      validation: Rule => Rule.required(),
    }),

    defineField({
      name:  "bio",
      title: "Short Bio",
      type:  "text",
      rows:  4,
      description: "A brief paragraph about this person",
    }),

    defineField({
      name:  "photo",
      title: "Photo",
      type:  "image",
      options: { hotspot: true },
      description: "Clear headshot or professional photo",
    }),

    defineField({
      name:  "order",
      title: "Display Order",
      type:  "number",
      description: "Lower number appears first e.g. 1, 2, 3",
    }),
  ],
});