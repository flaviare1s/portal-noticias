import { CATEGORIAS_NAV, noticias } from "@/infrastructure/data/news";
import type { News } from "@/types";
import { NEWS_MOCK_API_URL } from "./mockUrls";

const fetchNews = async (): Promise<News[]> => {
  // During SSR/build we read from the in-memory data source directly
  // to avoid internal HTTP calls while prerendering.
  if (typeof window === "undefined" || process.env.NODE_ENV === "test") {
    return noticias;
  }

  const response = await fetch(NEWS_MOCK_API_URL, {
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
