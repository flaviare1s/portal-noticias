"use client";

import { Box, Button, Container, Typography } from "@mui/material";
import { useEffect } from "react";
import ErrorIcon from "@mui/icons-material/Error";
import RefreshIcon from "@mui/icons-material/Refresh";

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    console.error("Error boundary:", error);
  }, [error]);

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
        <ErrorIcon sx={{ fontSize: 100, color: "error.main" }} />
        
        <Typography variant="h3" component="h1" fontWeight="bold">
          Algo deu errado!
        </Typography>
        
        <Typography variant="h6" color="text.secondary" gutterBottom>
          Ocorreu um erro inesperado
        </Typography>
        
        <Typography
          variant="body1"
          color="text.secondary"
          sx={{ mb: 2, maxWidth: "600px" }}
        >
          {error.message || "Não foi possível carregar esta página. Por favor, tente novamente."}
        </Typography>
        
        {error.digest && (
          <Typography variant="caption" color="text.disabled">
            ID do erro: {error.digest}
          </Typography>
        )}
        
        <Button
          variant="contained"
          size="large"
          onClick={reset}
          startIcon={<RefreshIcon />}
          sx={{ mt: 2 }}
        >
          Tentar Novamente
        </Button>
      </Box>
    </Container>
  );
}
