import { noticias } from "@/infrastructure/data/news";
import type { News } from "@/types";
import { NEWS_MOCK_API_URL } from "./mockUrls";

const MOCK_REQUEST_DELAY_MS = 150;

const fakeNewsRequest = async (url: string): Promise<News[]> => {
  await new Promise((resolve) => setTimeout(resolve, MOCK_REQUEST_DELAY_MS));

  if (url !== NEWS_MOCK_API_URL) {
    throw new Error("Mock endpoint not found");
  }

  return noticias;
};

export const getAllNews = async (): Promise<News[]> => {
  return fakeNewsRequest(NEWS_MOCK_API_URL);
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
  return Array.from(new Set(allNews.map((item) => item.category)));
};
