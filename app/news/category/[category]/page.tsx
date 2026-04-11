import { CategoryNewsSection } from "@/components/news/CategoryNewsSection";
import { getCategoryBySlug, sanitizeCategorySlug } from "@/services/categorySlug";
import { getNewsByCategory, getNewsCategories } from "@/services/news";
import { Box, Container, Typography } from "@mui/material";
import { notFound } from "next/navigation";
import Link from "next/link";

type CategoryPageProps = {
  params: Promise<{
    category: string;
  }>;
};

export default async function CategoryPage({ params }: CategoryPageProps) {
  const { category } = await params;
  const categorySlug = decodeURIComponent(category);
  const categories = await getNewsCategories();
  const resolvedCategory = getCategoryBySlug(categories, categorySlug);

  if (!resolvedCategory) {
    notFound();
  }

  const filteredNews = await getNewsByCategory(resolvedCategory);

  return (
    <Box sx={{ margin: "0 auto", px: 2, py: 3 }}>
      <Container>
        <Typography
          component="h1"
          sx={{
            color: "#1F1F1F",
            fontWeight: 800,
            fontSize: { xs: "2.25rem", sm: "2.5rem", md: "2.1rem" },
            lineHeight: 1.1,
            mb: 1,
          }}
        >
          Notícias: {resolvedCategory}
        </Typography>
        <Typography
          sx={{
            color: "#555",
            fontSize: "1.2rem",
            mb: 3,
          }}
        >
          Mostrando notícias da categoria {resolvedCategory}.
        </Typography>

        <Box
          sx={{
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
          {categories.map((cat) => {
            const isActive = cat === resolvedCategory;

            return (
              <Link
                key={cat}
                href={`/news/category/${sanitizeCategorySlug(cat)}`}
                className="no-underline"
              >
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
                  {cat}
                </Box>
              </Link>
            );
          })}
        </Box>
      </Container>

      {filteredNews.length > 0 ? (
        <CategoryNewsSection items={filteredNews} />
      ) : (
        <Box
          sx={{
            mt: 6,
            textAlign: "center",
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            gap: 1,
          }}
        >
          <Typography
            variant="h6"
            sx={{
              fontWeight: 700,
              color: "#1F1F1F",
            }}
          >
            Nenhuma notícia encontrada
          </Typography>

          <Typography
            variant="body2"
            sx={{
              color: "#666",
              maxWidth: 400,
            }}
          >
            Não há notícias disponíveis para essa categoria no momento.
          </Typography>
        </Box>
      )}
    </Box>
  );
}
