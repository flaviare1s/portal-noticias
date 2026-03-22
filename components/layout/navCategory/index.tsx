"use client";

import Link from "next/link";
import { Box, Stack, Typography } from "@mui/material";
import { noticias } from "@/infrastructure/data/news";

const NavCategory = () => {
  const categories = Array.from(
    new Set(noticias.map((noticia) => noticia.category))
  );

  return (
    <Box
      sx={{
        width: "100%",
        backgroundColor: "#F5F5F5",
        borderBottom: "1px solid #E0E0E0",
      }}
    >
      <Stack
        direction="row"
        sx={{
          maxWidth: "1200px",
          margin: "0 auto",
          py: 1.5,
          px: 2,
          flexWrap: "wrap",
          columnGap: 3,
          rowGap: 1,
        }}
      >
        {categories.map((category) => (
          <Link
            key={category}
            href={`/news/category/${encodeURIComponent(category)}`}
            style={{
              textDecoration: "none",
              display: "inline-block",
            }}
          >
            <Typography
              component="span"
              sx={{
                fontSize: "0.8rem",
                fontWeight: 700,
                textTransform: "uppercase",
                color: "#6B6B6B",
                letterSpacing: 0.5,
                transition: "color 0.2s ease",
                whiteSpace: "nowrap",
                "&:hover": {
                  color: "#1F1F1F",
                },
              }}
            >
              {category}
            </Typography>
          </Link>
        ))}
      </Stack>
    </Box>
  );
};

export default NavCategory;
