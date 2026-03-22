"use client";

import { Box } from "@mui/material";
import { noticias } from "@/infrastructure/data/news";
import { NewsCard } from "./NewsCard";
import { useSearch } from "@/components/search/SearchContext";

type NewsGridProps = {
  limit?: number;
  variant?: "home" | "news";
};

export const NewsGrid = ({ limit, variant = "news" }: NewsGridProps) => {
  const { results, query } = useSearch();

  const source = query.trim() ? results : noticias;
  const data = limit ? source.slice(0, limit) : source;

  return (
    <Box
      sx={{
        width: {xs: '100%', lg: '85%', xl: '70%'},
        margin: 'auto',
        display: "grid",
        gap: { xs: 2, md: 3 },
        padding: { xs: 2, md: 3, lg: 6 },
        gridTemplateColumns: {
          xs: "1fr",
          sm: "repeat(2, 1fr)",
          md:
            variant === "news"
              ? "repeat(3, 1fr)"
              : "repeat(6, 1fr)",
        },
      }}
    >
      {data.map((item, index) => {
        const gridColumnDesktop =
          variant === "home"
            ? index === 0
              ? "span 6"        // 1ª linha inteira
              : index === 1 || index === 2
              ? "span 3"        // 2ª linha com 2 notícias
              : "span 2"        // a partir da 3ª linha → 3 por linha
            : "span 1";

        return (
          <Box
            key={item.slug}
            sx={{
              gridColumn: {
                md: gridColumnDesktop,
              },
            }}
          >
            <NewsCard
              slug={item.slug}
              title={item.title}
              excerpt={item.excerpt}
              category={item.category}
              imageUrl={item.imageUrl}
              imageAlt={item.imageAlt}
              date={item.date}
            />
          </Box>
        );
      })}
    </Box>
  );
};
