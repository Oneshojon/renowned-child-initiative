// schemas/galleryImage.js
// Images the client uploads for the gallery section
// Shown on the Home or About page as a photo grid

import { defineType, defineField } from "sanity";

export default defineType({
  name:  "galleryImage",
  title: "Gallery Image",
  type:  "document",

  // Shows the image thumbnail + caption in studio list
  preview: {
    select: {
      title: "caption",
      media: "image",
    },
  },

  fields: [
    defineField({
      name:  "image",
      title: "Image",
      type:  "image",
      options: { hotspot: true },
      validation: Rule => Rule.required(),
    }),

    defineField({
      name:  "caption",
      title: "Caption",
      type:  "string",
      description: "Short description of the image e.g. 'Workshop session 2024'",
    }),

    defineField({
      name:  "alt",
      title: "Alt Text",
      type:  "string",
      description: "Describes the image for screen readers — important for accessibility",
      validation: Rule => Rule.required(),
    }),
  ],
});