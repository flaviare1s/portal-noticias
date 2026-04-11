"use client";

import { usePathname } from "next/navigation";
import Link from "next/link";
import { NewsGrid } from "@/components/news/NewsGrid";
import { Container, Typography, Box } from "@mui/material";
import { useNews } from "@/contexts/NewsContext";
import { sanitizeCategorySlug } from "@/services/categorySlug";

export default function News() {
  const pathname = usePathname();
  const { categories } = useNews();

  return (
    <>
      <Container>
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

        <Box
          sx={{
            mt: 3,
            display: "flex",
            gap: 1,
            flexWrap: { xs: "nowrap", md: "wrap" },
            overflowX: { xs: "auto", md: "visible" },
            overscrollBehaviorX: "contain",
            pb: 1,
            mx: { xs: -2, md: 0 },
            px: { xs: 2, md: 0 },
            scrollbarWidth: "none",
            "&::-webkit-scrollbar": {
              display: "none",
            },
          }}
        >
          <Link href="/news" className="no-underline">
            <Box
              sx={{
                px: { xs: 1.75, md: 2 },
                py: 0.8,
                minHeight: 38,
                borderRadius: "999px",
                display: "inline-flex",
                alignItems: "center",
                justifyContent: "center",
                flexShrink: 0,
                whiteSpace: "nowrap",
                fontSize: { xs: "0.78rem", md: "0.85rem" },
                fontWeight: 600,
                backgroundColor:
                  pathname === "/news" ? "#E3194B" : "transparent",
                color: pathname === "/news" ? "#FFFFFF" : "#E3194B",
                border: "1px solid #E3194B",
                transition: "all 0.2s ease",
                "&:hover": {
                  backgroundColor: pathname === "/news" ? "#E3194B" : "#fbe3ea",
                },
              }}
            >
              Todas
            </Box>
          </Link>

          {categories.map((category) => {
            const href = `/news/category/${sanitizeCategorySlug(category)}`;
            const isActive = pathname === href;

            return (
              <Link key={category} href={href} className="no-underline">
                <Box
                  sx={{
                    px: { xs: 1.75, md: 2 },
                    py: 0.8,
                    minHeight: 38,
                    borderRadius: "999px",
                    display: "inline-flex",
                    alignItems: "center",
                    justifyContent: "center",
                    flexShrink: 0,
                    whiteSpace: "nowrap",
                    fontSize: { xs: "0.78rem", md: "0.85rem" },
                    fontWeight: 600,
                    backgroundColor: isActive ? "#E3194B" : "transparent",
                    color: isActive ? "#FFFFFF" : "#E3194B",
                    border: "1px solid #E3194B",
                    transition: "all 0.2s ease",
                    "&:hover": {
                      backgroundColor: isActive ? "#E3194B" : "#fbe3ea",
                    },
                  }}
                >
                  {category}
                </Box>
              </Link>
            );
          })}
        </Box>
      </Container>
      <NewsGrid variant="news" />
    </>
  );
}
