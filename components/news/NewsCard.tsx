"use client";

import Image from "next/image";
import {
  Box,
  Card,
  CardActionArea,
  CardContent,
  Typography,
} from "@mui/material";
import NextLink from "next/link";

export type NewsCardProps = {
  slug: string;
  title: string;
  excerpt?: string;
  category: string;
  imageUrl: string;
  imageAlt: string;
  date?: string;
};

export const NewsCard = ({
  slug,
  title,
  excerpt,
  category,
  imageUrl,
  imageAlt,
  date,
}: NewsCardProps) => {
  return (
    <Card
      elevation={0}
      sx={{
        width: "100%",
        borderRadius: 2,
        overflow: "hidden",
        backgroundColor: "#FFFFFF",
        border: "1px solid #E7E7E7",
        transition: "transform 0.2s ease",
        "&:hover": {
          transform: "translateY(-4px)",
        },
      }}
    >
      <CardActionArea
        component={NextLink}
        href={`/news/${slug}`}
        sx={{ display: "block" }}
      >
        <Box
          sx={{
            position: "relative",
            width: "100%",
            height: { xs: 180, sm: 200, md: 220 },
            overflow: "hidden",
          }}
        >
          <Image
            src={imageUrl}
            alt={imageAlt}
            fill
            unoptimized
            priority
            sizes="(max-width: 600px) 100vw, (max-width: 900px) 50vw, 33vw"
            style={{ objectFit: "cover" }}
          />
        </Box>

        <CardContent sx={{ p: 2 }}>
          <Typography
            component="span"
            sx={{
              display: "inline-block",
              mb: 1,
              color: "#D71943",
              fontSize: "0.7rem",
              fontWeight: 800,
              textTransform: "uppercase",
            }}
          >
            {category}
          </Typography>

          <Typography
            sx={{
              color: "#1F1F1F",
              fontSize: { xs: "1rem", md: "1.05rem" },
              fontWeight: 700,
              lineHeight: 1.3,
              mb: excerpt ? 1 : 0.5,
              display: "-webkit-box",
              WebkitLineClamp: 2,
              WebkitBoxOrient: "vertical",
              overflow: "hidden",
            }}
          >
            {title}
          </Typography>

          {excerpt && (
            <Typography
              sx={{
                color: "#6B6B6B",
                fontSize: "0.85rem",
                lineHeight: 1.4,
                mb: 1,
                display: "-webkit-box",
                WebkitLineClamp: 2,
                WebkitBoxOrient: "vertical",
                overflow: "hidden",
              }}
            >
              {excerpt}
            </Typography>
          )}

          {date && (
            <Typography
              sx={{
                color: "#9A9A9A",
                fontSize: "0.75rem",
              }}
            >
              {date}
            </Typography>
          )}
        </CardContent>
      </CardActionArea>
    </Card>
  );
};
