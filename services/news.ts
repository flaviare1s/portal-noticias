import { CATEGORIAS_NAV, noticias } from "@/infrastructure/data/news";
import type { News } from "@/types";
import { NEWS_MOCK_API_URL } from "./mockUrls";

const getNewsApiUrl = () => {
  if (typeof window !== "undefined") {
    return NEWS_MOCK_API_URL;
  }

  if (process.env.NODE_ENV === "test") {
    return `http://localhost${NEWS_MOCK_API_URL}`;
  }

  const deploymentUrl =
    process.env.NEXT_PUBLIC_SITE_URL ??
    process.env.SITE_URL ??
    (process.env.VERCEL_URL ? `https://${process.env.VERCEL_URL}` : undefined);

  return deploymentUrl ? new URL(NEWS_MOCK_API_URL, deploymentUrl).toString() : null;
};

const fetchNews = async (): Promise<News[]> => {
  const apiUrl = getNewsApiUrl();

  if (!apiUrl) {
    return noticias;
  }

  if (process.env.NODE_ENV === "test" && typeof fetch !== "function") {
    return noticias;
  }

  const response = await fetch(apiUrl, {
    next: {
      revalidate: 3600,
    },
  });

  if (!response.ok) {
    throw new Error("Failed to fetch news");
  }

  return (await response.json()) as News[];
};

export const getAllNews = async (): Promise<News[]> => {
  return fetchNews();
};

export const getNewsBySlug = async (slug: string): Promise<News | undefined> => {
  const allNews = await getAllNews();
  return allNews.find((item) => item.slug === slug);
};

export const getNewsByCategory = async (category: string): Promise<News[]> => {
  const allNews = await getAllNews();
  return allNews.filter((item) => item.category === category);
};

export const getNewsCategories = async (): Promise<string[]> => {
  const allNews = await getAllNews();
  return Array.from(
    new Set([...CATEGORIAS_NAV, ...allNews.map((item) => item.category)]),
  );
};
