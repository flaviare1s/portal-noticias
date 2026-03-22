"use client";

import { createContext, useContext, useMemo, useState } from "react";
import { noticias } from "@/infrastructure/data/news";
import type { News } from "@/types";

type SearchContextType = {
  query: string;
  setQuery: (value: string) => void;
  isOpen: boolean;
  setIsOpen: (value: boolean) => void;
  results: News[];
};

const SearchContext = createContext<SearchContextType | undefined>(undefined);

export const SearchProvider = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  const [query, setQuery] = useState("");
  const [isOpen, setIsOpen] = useState(false);

  const results = useMemo(() => {
    if (!query.trim()) return noticias;

    const normalized = query.toLowerCase();

    return noticias.filter((item) => {
      return Object.values(item)
        .join(" ")
        .toLowerCase()
        .includes(normalized);
    });
  }, [query]);

  return (
    <SearchContext.Provider
      value={{
        query,
        setQuery,
        isOpen,
        setIsOpen,
        results,
      }}
    >
      {children}
    </SearchContext.Provider>
  );
};

export const useSearch = () => {
  const context = useContext(SearchContext);
  if (!context) {
    throw new Error("useSearch must be used within SearchProvider");
  }
  return context;
};
