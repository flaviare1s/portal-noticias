'use client'
import { Box, Button, Container, Typography } from "@mui/material";
import ConstructionIcon from "@mui/icons-material/Construction";
import NextLink from "next/link";

export default function Profile() {
  return (
    <Container
      maxWidth="md"
      sx={{
        minHeight: "60vh",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      <Box
        sx={{
          width: "100%",
          textAlign: "center",
          backgroundColor: "#FFFFFF",
          border: "1px solid #E7E7E7",
          borderRadius: 3,
          p: { xs: 4, md: 6 },
          boxShadow: "0 10px 30px rgba(0,0,0,0.04)",
        }}
      >
        <ConstructionIcon
          sx={{
            fontSize: 60,
            color: "#D71943",
            mb: 2,
          }}
        />

        <Typography
          variant="h4"
          component="h1"
          sx={{
            fontWeight: 800,
            color: "#1F1F1F",
            mb: 2,
          }}
        >
          Página em construção
        </Typography>

        <Typography
          sx={{
            color: "#6B6B6B",
            fontSize: { xs: "1rem", md: "1.05rem" },
            mb: 4,
          }}
        >
          Estamos trabalhando para trazer uma experiência completa para o seu
          perfil. Em breve você poderá visualizar e editar suas informações
          aqui.
        </Typography>

        <Button
          component={NextLink}
          href="/"
          variant="contained"
          disableElevation
          sx={{
            px: 4,
            py: 1.2,
            borderRadius: 2,
            backgroundColor: "#D71943",
            fontWeight: 700,
            textTransform: "none",
            "&:hover": {
              backgroundColor: "#BE153B",
            },
          }}
        >
          Voltar para Home
        </Button>
      </Box>
    </Container>
  );
}
