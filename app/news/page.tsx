"use client";

import { usePathname } from "next/navigation";
import Link from "next/link";
import { noticias } from "@/infrastructure/data/news";
import { NewsGrid } from "@/components/news/NewsGrid";
import { Container, Typography, Box } from "@mui/material";

export default function News() {
  const pathname = usePathname();

  const categories = Array.from(new Set(noticias.map((n) => n.category)));

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

        <Box sx={{ mt: 3, display: "flex", gap: 1, flexWrap: "wrap" }}>
          <Link href="/news" style={{ textDecoration: "none" }}>
            <Box
              sx={{
                px: 2,
                py: 0.8,
                borderRadius: "999px",
                fontSize: "0.85rem",
                fontWeight: 600,
                backgroundColor: pathname === "/news" ? "#E3194B" : "transparent",
                color: pathname === "/news" ? "#FFFFFF" : "#E3194B",
                border: "1px solid #E3194B",
                transition: "all 0.2s ease",
                "&:hover": {
                  backgroundColor:
                    pathname === "/news" ? "#E3194B" : "#fbe3ea",
                },
              }}
            >
              Todas
            </Box>
          </Link>

          {categories.map((category) => {
            const href = `/news/category/${encodeURIComponent(category)}`;
            const isActive = pathname === href;

            return (
              <Link key={category} href={href} style={{ textDecoration: "none" }}>
                <Box
                  sx={{
                    px: 2,
                    py: 0.8,
                    borderRadius: "999px",
                    fontSize: "0.85rem",
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
      <NewsGrid variant="news" items={noticias} />
    </>
  );
}
