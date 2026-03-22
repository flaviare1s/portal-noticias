"use client";

import { useState } from "react";
import { noticias } from "@/infrastructure/data/news";
import { NewsGrid } from "@/components/news/NewsGrid";
import { Button, Container, Typography, Box } from "@mui/material";

export default function News() {
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);

  const categories = Array.from(new Set(noticias.map((n) => n.category)));

  const filteredNews = selectedCategory
    ? noticias.filter((n) => n.category === selectedCategory)
    : noticias;

  return (
    <>
      <Container
        maxWidth="md"
        sx={{
          px: { xs: 3, sm: 4, md: 6 },
        }}
      >
        <Typography
          component="h1"
          sx={{
            color: "#1F1F1F",
            fontWeight: 800,
            fontSize: { xs: "2.25rem", sm: "2.5rem", md: "2.1rem" },
            lineHeight: 1.1,
            mb: { xs: 3, md: 2 },
          }}
        >
          Notícias
        </Typography>
        <Typography
          sx={{
            color: "#444",
          }}
        >
          Navegue por todas as nossas publicações ou filtre por categoria.
        </Typography>
        <Box sx={{ mt: 3, display: "flex", gap: 1, flexWrap: "wrap" }}>
          {categories.map((category) => (
            <Button
              key={category}
              variant="outlined"
              onClick={() =>
                setSelectedCategory((prev) =>
                  prev === category ? null : category
                )
              }
              sx={{
                borderRadius: "999px",
                backgroundColor: "transparent",
                color: "#E3194B",
                borderColor: "#E3194B",
                "&:hover": {
                  backgroundColor: "transparent",
                  borderColor: "#E3194B",
                },
              }}
            >
              {category}
            </Button>
          ))}
        </Box>
      </Container>
      <NewsGrid variant="news" items={filteredNews} />
    </>
  );
}
