import type { MetadataRoute } from "next";
import { site } from "@/content/site";
import { products } from "@/content/products";

export default function sitemap(): MetadataRoute.Sitemap {
  const now = new Date();
  const pages = ["", "/collezione", "/about", "/contatti", "/preorder"].map((p) => ({
    url: `${site.url}${p}`,
    lastModified: now,
    changeFrequency: "weekly" as const,
    priority: p === "" ? 1 : 0.8,
  }));
  const items = products.map((p) => ({
    url: `${site.url}/collezione/${p.slug}`,
    lastModified: now,
    changeFrequency: "weekly" as const,
    priority: 0.7,
  }));
  return [...pages, ...items];
}
