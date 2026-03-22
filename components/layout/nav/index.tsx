"use client";

import { Breadcrumbs, Typography, Link as MuiLink, Box } from "@mui/material";
import ChevronRightIcon from "@mui/icons-material/ChevronRight";
import NextLink from "next/link";
import { usePathname } from "next/navigation";

const routeNameMap: Record<string, string> = {
  "": "Home",
  news: "Notícias",
  faq: "FAQ",
  contact: "Contato",
};

const Nav = () => {
  const pathname = usePathname();

  const segments = pathname.split("/").filter(Boolean);

  const breadcrumbs = segments.map((segment, index) => {
    const href = "/" + segments.slice(0, index + 1).join("/");
    const label = routeNameMap[segment] ?? segment;

    return {
      href,
      label,
    };
  });

  return (
    <Box
      component="section"
      sx={{
        width: "100%",
        px: { xs: 3, lg: 6 },
        pt: 3,
      }}
    >
      <Breadcrumbs
        separator={
          <ChevronRightIcon sx={{ fontSize: 22, color: "#6B6B6B" }} />
        }
        aria-label="breadcrumb"
        sx={{ mb: { xs: 3, md: 4 } }}
      >
        <MuiLink
          component={NextLink}
          underline="none"
          href="/"
          sx={{
            color: pathname === "/" ? "#1F1F1F" : "#6B6B6B",
            fontSize: { xs: "1.1rem", md: "1rem" },
            fontWeight: pathname === "/" ? 700 : 400,
            "&:hover": {
              textDecoration: "underline",
            },
          }}
        >
          Home
        </MuiLink>

        {breadcrumbs.map((crumb, index) => {
          const isLast = index === breadcrumbs.length - 1;

          return isLast ? (
            <Typography
              key={crumb.href}
              sx={{
                color: "#1F1F1F",
                fontSize: { xs: "1.1rem", md: "1rem" },
                fontWeight: 700,
              }}
            >
              {crumb.label}
            </Typography>
          ) : (
            <MuiLink
              key={crumb.href}
              component={NextLink}
              underline="none"
              href={crumb.href}
              sx={{
                color: "#6B6B6B",
                fontSize: { xs: "1.1rem", md: "1rem" },
                fontWeight: 400,
                "&:hover": {
                  textDecoration: "underline",
                },
              }}
            >
              {crumb.label}
            </MuiLink>
          );
        })}
      </Breadcrumbs>
    </Box>
  );
};

export default Nav;
