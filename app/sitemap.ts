import type { MetadataRoute } from "next";
import { noticias } from "@/infrastructure/data/news";

const BASE_URL = "https://portal-noticias-i6g7.vercel.app";

export default function sitemap(): MetadataRoute.Sitemap {
  const staticRoutes: MetadataRoute.Sitemap = [
    {
      url: `${BASE_URL}/`,
      lastModified: new Date(),
      changeFrequency: "daily",
      priority: 1,
    },
    {
      url: `${BASE_URL}/news`,
      lastModified: new Date(),
      changeFrequency: "daily",
      priority: 0.9,
    },
    {
      url: `${BASE_URL}/live`,
      lastModified: new Date(),
      changeFrequency: "daily",
      priority: 0.8,
    },
    {
      url: `${BASE_URL}/faq`,
      lastModified: new Date(),
      changeFrequency: "monthly",
      priority: 0.7,
    },
    {
      url: `${BASE_URL}/contact`,
      lastModified: new Date(),
      changeFrequency: "yearly",
      priority: 0.6,
    },
    {
      url: `${BASE_URL}/profile`,
      lastModified: new Date(),
      changeFrequency: "monthly",
      priority: 0.5,
    },
  ];

  const newsRoutes: MetadataRoute.Sitemap = noticias.map((noticia) => ({
    url: `${BASE_URL}/news/${noticia.slug}`,
    lastModified: new Date(),
    changeFrequency: "weekly",
    priority: 0.8,
  }));

  const categorySet = new Set(noticias.map((noticia) => noticia.category));

  const categoryRoutes: MetadataRoute.Sitemap = Array.from(categorySet).map(
    (category) => ({
      url: `${BASE_URL}/news/category/${category}`,
      lastModified: new Date(),
      changeFrequency: "weekly",
      priority: 0.7,
    })
  );

  return [...staticRoutes, ...categoryRoutes, ...newsRoutes];
}
