import { Box, Card, Skeleton } from "@mui/material";

const placeholders = Array.from({ length: 6 });

export default function Loading() {
  return (
    <Box
      sx={{
        width: { xs: "100%", lg: "85%", xl: "70%" },
        margin: "auto",
        display: "grid",
        gap: { xs: 2, md: 3 },
        padding: { xs: 2, md: 3, lg: 6 },
        gridTemplateColumns: {
          xs: "1fr",
          sm: "repeat(2, 1fr)",
          md: "repeat(6, 1fr)",
        },
      }}
    >
      {placeholders.map((_, index) => {
        const gridColumn =
          index === 0 ? "span 6" : index === 1 || index === 2 ? "span 3" : "span 2";

        return (
          <Box
            key={index}
            sx={{
              gridColumn: { md: gridColumn },
            }}
          >
            <Card
              elevation={0}
              sx={{
                height: "100%",
                borderRadius: 2,
                overflow: "hidden",
                backgroundColor: "#FFFFFF",
                border: "1px solid #E7E7E7",
              }}
            >
              <Skeleton
                variant="rectangular"
                animation="pulse"
                sx={{
                  width: "100%",
                  height: { xs: 180, sm: 200, md: 220 },
                  transform: "none",
                }}
              />

              <Box
                sx={{
                  p: 2,
                  display: "flex",
                  flexDirection: "column",
                  gap: 1,
                }}
              >
                <Skeleton
                  variant="text"
                  animation="pulse"
                  sx={{ width: "28%", fontSize: "0.8rem", transform: "none" }}
                />
                <Skeleton
                  variant="text"
                  animation="pulse"
                  sx={{ width: "92%", fontSize: "1.3rem", transform: "none" }}
                />
                <Skeleton
                  variant="text"
                  animation="pulse"
                  sx={{ width: "78%", fontSize: "1.3rem", transform: "none" }}
                />
                <Skeleton
                  variant="text"
                  animation="pulse"
                  sx={{ width: "100%", fontSize: "0.95rem", transform: "none" }}
                />
                <Skeleton
                  variant="text"
                  animation="pulse"
                  sx={{ width: "86%", fontSize: "0.95rem", transform: "none" }}
                />
                <Skeleton
                  variant="text"
                  animation="pulse"
                  sx={{ width: "34%", fontSize: "0.85rem", mt: 0.5, transform: "none" }}
                />
              </Box>
            </Card>
          </Box>
        );
      })}
    </Box>
  );
}
