import { noticias } from "@/infrastructure/data/news";
import { notFound } from "next/navigation";
import { Box, Typography } from "@mui/material";
import Image from "next/image";

type Props = {
  params: Promise<{
    slug: string;
  }>;
};

export default async function NewsDetail({ params }: Props) {
  const { slug } = await params;

  const noticia = noticias.find((item) => item.slug === slug);

  if (!noticia) return notFound();

  return (
    <Box
      sx={{
        maxWidth: 900,
        mx: "auto",
        px: { xs: 2, md: 4 },
        pb: { xs: 4, md: 6 },
      }}
    >
      <Typography
        variant="h5"
        sx={{
          fontWeight: 800,
          mb: 2,
        }}
      >
        {noticia.title}
      </Typography>

      <Typography
        sx={{
          color: "#6B6B6B",
          fontSize: "0.9rem",
          mb: 3,
        }}
      >
        {noticia.category} - {noticia.date}
      </Typography>

      <Box
        sx={{
          position: "relative",
          width: "100%",
          height: { xs: 240, sm: 320, md: 420 },
          borderRadius: 2,
          overflow: "hidden",
          mb: 4,
        }}
      >
        <Image
          src={noticia.imageUrl}
          alt={noticia.imageAlt}
          fill
          unoptimized
          priority
          sizes="(max-width: 600px) 100vw, (max-width: 900px) 100vw, 900px"
          style={{ objectFit: "cover" }}
        />
      </Box>

      <Typography
        sx={{
          fontSize: "1rem",
          lineHeight: 1.7,
          color: "#1F1F1F",
        }}
      >
        {noticia.content}
      </Typography>
    </Box>
  );
}
