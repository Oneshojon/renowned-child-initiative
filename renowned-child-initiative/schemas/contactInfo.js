// schemas/contactInfo.js
// Singleton document — one set of contact details for the whole site
// Add to schemaTypes in sanity.config.js

import { defineType, defineField } from "sanity";

export default defineType({
  name:  "contactInfo",
  title: "Contact Information",
  type:  "document",

  // Prevent creating multiple documents of this type
  __experimental_actions: ["update", "publish", "unpublish"],

  preview: {
    prepare: () => ({ title: "Contact Information" }),
  },

  fields: [
    // ── Phone Numbers ──────────────────────────────────────────
    defineField({
      name:  "phoneNumbers",
      title: "Phone Numbers",
      type:  "array",
      description: "All phone numbers shown on the contact page",
      of: [
        {
          type: "object",
          name: "phoneEntry",
          fields: [
            defineField({
              name:  "label",
              title: "Label",
              type:  "string",
              description: 'e.g. "Main Line" or "Office"',
              initialValue: "Main Line",
            }),
            defineField({
              name:  "number",
              title: "Phone Number",
              type:  "string",
              description: "Include country code e.g. +2348057891170",
              validation: Rule => Rule.required(),
            }),
          ],
          preview: {
            select: { title: "number", subtitle: "label" },
          },
        },
      ],
    }),

    // ── WhatsApp ───────────────────────────────────────────────
    defineField({
      name:  "whatsapp",
      title: "WhatsApp Number",
      type:  "string",
      description: "Number only, no spaces e.g. 08057891170 or +2348057891170",
    }),

    // ── Email Addresses ────────────────────────────────────────
    defineField({
      name:  "emails",
      title: "Email Addresses",
      type:  "array",
      of: [
        {
          type: "object",
          name: "emailEntry",
          fields: [
            defineField({
              name:  "label",
              title: "Label",
              type:  "string",
              description: 'e.g. "General Enquiries" or "Consulting"',
            }),
            defineField({
              name:  "address",
              title: "Email Address",
              type:  "string",
              validation: Rule => Rule.required().email(),
            }),
          ],
          preview: {
            select: { title: "address", subtitle: "label" },
          },
        },
      ],
    }),

    // ── Physical Address (optional) ────────────────────────────
    defineField({
      name:  "address",
      title: "Physical Address (optional)",
      type:  "text",
      rows:  3,
      description: "Leave blank if not applicable",
    }),
  ],
});