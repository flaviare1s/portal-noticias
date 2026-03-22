import { noticias } from "@/infrastructure/data/news";
import { NewsGrid } from "@/components/news/NewsGrid";
import { Box, Container, Typography } from "@mui/material";

type CategoryPageProps = {
  params: Promise<{
    category: string;
  }>;
};

export default async function CategoryPage({ params }: CategoryPageProps) {
  const { category } = await params;
  const decodedCategory = decodeURIComponent(category);

  const filteredNews = noticias.filter(
    (news) => news.category === decodedCategory,
  );

  return (
    <Box sx={{ maxWidth: "1200px", margin: "0 auto", px: 2, py: 3 }}>
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
            mb: 1,
          }}
        >
          Notícias: {decodedCategory}
        </Typography>
        <Typography
          sx={{
            color: "#555",
            fontSize: "1.2rem"
          }}
        >
          Mostrando notícias da categoria {decodedCategory}.
        </Typography>
      </Container>

      <NewsGrid items={filteredNews} variant="news" />
    </Box>
  );
}
