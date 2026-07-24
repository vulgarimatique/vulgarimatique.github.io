import rss from "@astrojs/rss";
import { getCollection } from "astro:content";
import site from "../data/site.json";

export async function GET(context: { site?: URL }) {
  const notions = await getCollection("notions");
  return rss({
    title: site.title,
    description: site.description,
    site: context.site || "https://example.github.io",
    items: notions.map((item) => ({
      title: item.data.title,
      description: item.data.summary,
      pubDate: item.data.publishedAt,
      link: `glossaire/${item.id}/`
    }))
  });
}
