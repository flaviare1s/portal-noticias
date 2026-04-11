"use client";

import Link from "next/link";
import { Box, Stack, Typography } from "@mui/material";
import { useNews } from "@/contexts/NewsContext";
import { sanitizeCategorySlug } from "@/services/categorySlug";

const NavCategory = () => {
  const { categories } = useNews();

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
          px: { xs: 2, md: 2 },
          flexWrap: { xs: "nowrap", md: "wrap" },
          gap: { xs: 2, md: 3 },
          overflowX: { xs: "auto", md: "visible" },
          overscrollBehaviorX: "contain",
          scrollbarWidth: "none",
          "&::-webkit-scrollbar": {
            display: "none",
          },
        }}
      >
        {categories.map((category) => (
          <Link
            key={category}
            href={`/news/category/${sanitizeCategorySlug(category)}`}
            className="no-underline inline-block"
          >
            <Typography
              component="span"
              sx={{
                fontSize: { xs: "0.78rem", md: "0.8rem" },
                fontWeight: 700,
                textTransform: "uppercase",
                color: "#6B6B6B",
                letterSpacing: 0.5,
                transition: "color 0.2s ease",
                whiteSpace: "nowrap",
                flexShrink: 0,
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
