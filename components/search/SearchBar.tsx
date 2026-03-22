"use client";

import { Box, TextField } from "@mui/material";
import { useSearch } from "./SearchContext";
import { usePathname } from "next/navigation";

export const SearchBar = () => {
  const { query, setQuery, isOpen } = useSearch();
  const pathname = usePathname();

  const showSearchBar =
    (pathname === "/" ||
      pathname === "/news" ||
      pathname.startsWith("/news/")) &&
    isOpen;

  if (!showSearchBar) return null;

  return (
    <Box
          sx={{
            width: "100%",
            backgroundColor: "#000",
            px: { xs: 2, md: 4 },
            py: 2,
            borderBottom: "1px solid #1F1F1F",
          }}
        >
      <TextField
        fullWidth
        placeholder="Buscar por título, descrição, categoria, data..."
        variant="outlined"
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        sx={{
          backgroundColor: "#FFF",
          borderRadius: 1,
        }}
      />
    </Box>
  );
};
