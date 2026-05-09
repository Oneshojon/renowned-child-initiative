// src/lib/sanity.js

import { createClient } from "@sanity/client";
import { createImageUrlBuilder } from "@sanity/image-url";

export const client = createClient({
  projectId:  "t7qelzlc",
  dataset:    "production",
  apiVersion: "2024-01-01",
  useCdn:     true,
});

const builder = createImageUrlBuilder(client);

export function urlFor(source) {
  return builder.image(source);
}