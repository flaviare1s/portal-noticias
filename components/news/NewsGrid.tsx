"use client";

import { Box } from "@mui/material";
import { noticias } from "@/infrastructure/data/news";
import { NewsCard } from "./NewsCard";
import { useSearch } from "@/components/search/SearchContext";

type NewsGridProps = {
  limit?: number;
};

export const NewsGrid = ({ limit }: NewsGridProps) => {
  const { results, query } = useSearch();

  const source = query.trim() ? results : noticias;
  const data = limit ? source.slice(0, limit) : source;

  return (
    <Box
      sx={{
        width: "100%",
        display: "grid",
        gap: { xs: 2, md: 3 },
        padding: { xs: 2, md: 3, lg: 6},
        gridTemplateColumns: {
          xs: "1fr",
          sm: "repeat(2, 1fr)",
          md: "repeat(3, 1fr)",
          lg: "repeat(4, 1fr)",
        },
      }}
    >
      {data.map((item) => (
        <NewsCard
          key={item.slug}
          slug={item.slug}
          title={item.title}
          excerpt={item.excerpt}
          category={item.category}
          imageUrl={item.imageUrl}
          imageAlt={item.imageAlt}
          date={item.date}
        />
      ))}
    </Box>
  );
};
