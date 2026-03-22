import { noticias } from "@/infrastructure/data/news";
import { NewsGrid } from "@/components/news/NewsGrid";
import { Box, Container, Typography } from "@mui/material";
import Link from "next/link";

type CategoryPageProps = {
  params: Promise<{
    category: string;
  }>;
};

export default async function CategoryPage({ params }: CategoryPageProps) {
  const { category } = await params;
  const decodedCategory = decodeURIComponent(category);

  const categories = Array.from(new Set(noticias.map((item) => item.category)));

  const filteredNews = noticias.filter(
    (news) => news.category === decodedCategory,
  );

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
          Notícias: {decodedCategory}
        </Typography>
        <Typography
          sx={{
            color: "#555",
            fontSize: "1.2rem",
            mb: 3,
          }}
        >
          Mostrando notícias da categoria {decodedCategory}.
        </Typography>

        <Box
          sx={{
            display: "flex",
            gap: 1,
            flexWrap: "wrap",
          }}
        >
          {categories.map((cat) => {
            const isActive = cat === decodedCategory;

            return (
              <Link
                key={cat}
                href={`/news/category/${encodeURIComponent(cat)}`}
                style={{ textDecoration: "none" }}
              >
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
                  {cat}
                </Box>
              </Link>
            );
          })}
        </Box>
      </Container>

      {filteredNews.length > 0 ? (
        <NewsGrid items={filteredNews} variant="news" />
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
