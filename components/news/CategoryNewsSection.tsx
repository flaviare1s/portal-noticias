"use client";

import { Box, IconButton } from "@mui/material";
import { ArrowBackIos, ArrowForwardIos } from "@mui/icons-material";
import { useEffect, useRef, useState } from "react";
import { NewsCard } from "./NewsCard";
import { noticias } from "@/infrastructure/data/news";

type CategoryNewsSectionProps = {
  items: typeof noticias;
};

export const CategoryNewsSection = ({
  items,
}: CategoryNewsSectionProps) => {
  const firstNews = items[0];
  const otherNews = items.slice(1);

  const containerRef = useRef<HTMLDivElement | null>(null);
  const [visibleItems, setVisibleItems] = useState(3);

  useEffect(() => {
    const updateVisibleItems = () => {
      const width = window.innerWidth;

      if (width < 600) {
        setVisibleItems(1);
      } else if (width < 900) {
        setVisibleItems(2);
      } else {
        setVisibleItems(3);
      }
    };

    updateVisibleItems();
    window.addEventListener("resize", updateVisibleItems);

    return () => window.removeEventListener("resize", updateVisibleItems);
  }, []);

  const scrollByAmount = (direction: "next" | "prev") => {
    if (!containerRef.current || otherNews.length <= visibleItems) return;

    const container = containerRef.current;
    const cardWidth = container.clientWidth / visibleItems;

    container.scrollBy({
      left: direction === "next" ? cardWidth : -cardWidth,
      behavior: "smooth",
    });

    if (
      direction === "next" &&
      container.scrollLeft + container.clientWidth >= container.scrollWidth - 5
    ) {
      container.scrollTo({ left: 0, behavior: "smooth" });
    }

    if (direction === "prev" && container.scrollLeft <= 0) {
      container.scrollTo({
        left: container.scrollWidth - container.clientWidth,
        behavior: "smooth",
      });
    }
  };

  useEffect(() => {
    if (!containerRef.current || otherNews.length === 0) return;

    const interval = setInterval(() => {
      scrollByAmount("next");
    }, 3000);

    return () => clearInterval(interval);
  }, [otherNews.length, visibleItems]);

  if (!firstNews) return null;

  return (
    <Box
      sx={{
        width: { xs: "100%", lg: "85%", xl: "70%" },
        margin: "auto",
        px: { xs: 2, sm: 2.5, md: 3, lg: 6 },
        pb: { xs: 4, md: 6 },
        display: "flex",
        flexDirection: "column",
        gap: { xs: 3, md: 4 },
      }}
    >
      <Box sx={{ mt: { xs: 2, md: 3 } }}>
        <NewsCard
          slug={firstNews.slug}
          title={firstNews.title}
          excerpt={firstNews.excerpt}
          category={firstNews.category}
          imageUrl={firstNews.imageUrl}
          imageAlt={firstNews.imageAlt}
          date={firstNews.date}
        />
      </Box>

      {otherNews.length > 0 && (
        <Box sx={{ position: "relative", mt: { xs: 1, md: 2 } }}>
          {otherNews.length > visibleItems && (
            <>
              <IconButton
                onClick={() => scrollByAmount("prev")}
                sx={{
                  display: { xs: "none", sm: "flex" },
                  position: "absolute",
                  top: "50%",
                  left: { sm: 4, md: 8 },
                  transform: "translateY(-50%)",
                  zIndex: 3,
                  width: { sm: 36, md: 40 },
                  height: { sm: 36, md: 40 },
                  backgroundColor: "rgba(255,255,255,0.92)",
                  border: "1px solid #E0E0E0",
                  boxShadow: "0 4px 12px rgba(0,0,0,0.08)",
                  "&:hover": {
                    backgroundColor: "#FFFFFF",
                    transform: "translateY(-50%) scale(1.05)",
                  },
                }}
              >
                <ArrowBackIos sx={{ fontSize: { sm: 14, md: 16 } }} />
              </IconButton>

              <IconButton
                onClick={() => scrollByAmount("next")}
                sx={{
                  display: { xs: "none", sm: "flex" },
                  position: "absolute",
                  top: "50%",
                  right: { sm: 4, md: 8 },
                  transform: "translateY(-50%)",
                  zIndex: 3,
                  width: { sm: 36, md: 40 },
                  height: { sm: 36, md: 40 },
                  backgroundColor: "rgba(255,255,255,0.92)",
                  border: "1px solid #E0E0E0",
                  boxShadow: "0 4px 12px rgba(0,0,0,0.08)",
                  "&:hover": {
                    backgroundColor: "#FFFFFF",
                    transform: "translateY(-50%) scale(1.05)",
                  },
                }}
              >
                <ArrowForwardIos sx={{ fontSize: { sm: 14, md: 16 } }} />
              </IconButton>
            </>
          )}

          <Box
            ref={containerRef}
            sx={{
              display: "flex",
              gap: { xs: 1.5, sm: 2, md: 3 },
              overflowX: "auto",
              overflowY: "hidden",
              scrollBehavior: "smooth",
              justifyContent:
                otherNews.length <= visibleItems ? "center" : "flex-start",
              px: {
                xs: 0,
                sm: otherNews.length > visibleItems ? 5 : 0,
                md: otherNews.length > visibleItems ? 6 : 0,
              },
              WebkitOverflowScrolling: "touch",
              scrollbarWidth: "none",
              "&::-webkit-scrollbar": {
                display: "none",
              },
            }}
          >
            {otherNews.map((item) => (
              <Box
                key={item.slug}
                sx={{
                  minWidth: {
                    xs: "88%",
                    sm:
                      otherNews.length <= visibleItems
                        ? `calc(${100 / Math.min(otherNews.length, visibleItems)}% - 16px)`
                        : `calc(${100 / visibleItems}% - 16px)`,
                    md:
                      otherNews.length <= visibleItems
                        ? `calc(${100 / Math.min(otherNews.length, visibleItems)}% - 24px)`
                        : `calc(${100 / visibleItems}% - 24px)`,
                  },
                  maxWidth: {
                    xs: "88%",
                    sm:
                      otherNews.length <= visibleItems
                        ? `calc(${100 / Math.min(otherNews.length, visibleItems)}% - 16px)`
                        : "none",
                    md:
                      otherNews.length <= visibleItems
                        ? `calc(${100 / Math.min(otherNews.length, visibleItems)}% - 24px)`
                        : "none",
                  },
                  flex: "0 0 auto",
                  scrollSnapAlign: { xs: "start", sm: "unset" },
                }}
              >
                <NewsCard
                  slug={item.slug}
                  title={item.title}
                  excerpt={item.excerpt}
                  category={item.category}
                  imageUrl={item.imageUrl}
                  imageAlt={item.imageAlt}
                  date={item.date}
                />
              </Box>
            ))}
          </Box>
        </Box>
      )}
    </Box>
  );
};
