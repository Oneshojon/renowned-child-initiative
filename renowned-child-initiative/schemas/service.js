// schemas/service.js
// Each service RCI offers — client can add/edit/remove services

import { defineType, defineField } from "sanity";

export default defineType({
  name:  "service",
  title: "Service",
  type:  "document",

  // This controls what shows in the studio list view
  preview: {
    select: {
      title:    "title",
      subtitle: "tagline",
    },
  },

  fields: [
    defineField({
      name:  "title",
      title: "Service Title",
      type:  "string",
      validation: Rule => Rule.required(),
    }),

    defineField({
      name:  "tagline",
      title: "Tagline",
      type:  "string",
      description: "One short line summarising the service",
    }),

    defineField({
      name:  "description",
      title: "Full Description",
      type:  "text",
      rows:  5,
    }),

   defineField({
  name:  "icon",
  title: "Icon",
  type:  "string",
  options: {
    list: [
      { title: "🧠 Neurodiversity",  value: "neurodiversity" },
      { title: "⏱️ Intervention",    value: "intervention" },
      { title: "🏫 School",          value: "school" },
      { title: "👨‍👩‍👧 Family",           value: "family" },
      { title: "💬 Speech",          value: "speech" },
      { title: "📚 Training",        value: "training" },
      { title: "🔵 Autism & ABA",    value: "autism" },
      { title: "🧬 Brain / Psychoed", value: "brain" },
    ],
    layout: "radio",
  },
  description: "Select the icon that best represents this service",
}),

    defineField({
      name:  "image",
      title: "Service Image",
      type:  "image",
      options: { hotspot: true },
    }),

    defineField({
      name:  "slug",
      title: "Slug",
      type:  "slug",
      options: { source: "title" },
      description: "Auto-generated from title — click Generate",
    }),

    defineField({
      name:  "order",
      title: "Display Order",
      type:  "number",
      description: "Lower number appears first e.g. 1, 2, 3",
    }),
  ],
});