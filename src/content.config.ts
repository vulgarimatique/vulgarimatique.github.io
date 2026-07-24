import { defineCollection } from "astro:content";
import { glob } from "astro/loaders";
import { z } from "astro/zod";

const notions = defineCollection({
  loader: glob({ pattern: "**/*.{md,mdx}", base: "./src/content/notions" }),
  schema: z.object({
    title: z.string(),
    summary: z.string(),
    category: z.string(),
    sourceId: z.string().optional(),
    featured: z.boolean().default(false),
    publishedAt: z.coerce.date(),
    audio: z.string().optional(),
    audioDuration: z.string().optional(),
    infographic: z.string().optional(),
    infographicOrientation: z.enum(["vertical", "horizontal"]).optional(),
    aliases: z.array(z.string()).default([])
  })
});

export const collections = { notions };
