"use client";

import { createContext, useCallback, useContext, useEffect, useMemo, useState } from "react";
import { CATEGORIAS_NAV, noticias } from "@/infrastructure/data/news";
import type { News } from "@/types";
import { getAllNews } from "@/services/news";

type NewsContextType = {
  news: News[];
  categories: string[];
  isLoading: boolean;
  error: string | null;
  refreshNews: () => Promise<void>;
};

const NewsContext = createContext<NewsContextType | undefined>(undefined);

export const NewsProvider = ({ children }: { children: React.ReactNode }) => {
  const [news, setNews] = useState<News[]>(noticias);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const refreshNews = useCallback(async () => {
    try {
      setIsLoading(true);
      setError(null);
      const loadedNews = await getAllNews();
      setNews(loadedNews);
    } catch {
      setError("Nao foi possivel carregar as noticias.");
    } finally {
      setIsLoading(false);
    }
  }, []);

  useEffect(() => {
    void refreshNews();
  }, [refreshNews]);

  const categories = useMemo(() => {
    return Array.from(
      new Set([...CATEGORIAS_NAV, ...news.map((item) => item.category)]),
    );
  }, [news]);

  return (
    <NewsContext.Provider
      value={{
        news,
        categories,
        isLoading,
        error,
        refreshNews,
      }}
    >
      {children}
    </NewsContext.Provider>
  );
};

export const useNews = () => {
  const context = useContext(NewsContext);

  if (!context) {
    throw new Error("useNews must be used within NewsProvider");
  }

  return context;
};
