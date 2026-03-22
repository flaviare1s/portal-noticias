"use client";

import { Box, Button, Container, Typography } from "@mui/material";
import Link from "next/link";
import ErrorOutlineIcon from "@mui/icons-material/ErrorOutline";

export default function NotFound() {
  return (
    <Container maxWidth="md">
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          minHeight: "60vh",
          textAlign: "center",
          gap: 3,
        }}
      >
        <ErrorOutlineIcon sx={{ fontSize: 100, color: "#E3194B" }} />
        
        <Typography variant="h1" component="h1" fontWeight="bold">
          404
        </Typography>
        
        <Typography variant="h5" color="text.secondary" gutterBottom>
          Página não encontrada
        </Typography>
        
        <Typography variant="body1" color="text.secondary" sx={{ mb: 2 }}>
          A página que você está procurando não existe ou foi movida.
        </Typography>
        
        <Button
          component={Link}
          href="/"
          variant="contained"
          size="large"
          sx={{ my: 3, backgroundColor: '#E3194B' }}
        >
          Voltar para Home
        </Button>
      </Box>
    </Container>
  );
}
