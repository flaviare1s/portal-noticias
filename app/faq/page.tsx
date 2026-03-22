"use client";

import {
  Accordion,
  AccordionSummary,
  AccordionDetails,
  Typography,
  Box,
  Container,
} from "@mui/material";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";

const faqItems = [
  {
    question: "O que é o Portal de Notícias?",
    answer:
      "O Portal de Notícias é uma plataforma dedicada a compartilhar conteúdos atualizados sobre diversos temas relevantes, mantendo você sempre bem informado.",
  },
  {
    question: "Como posso entrar em contato com a equipe?",
    answer:
      "Você pode entrar em contato através da página de Contato disponível no menu principal. Basta preencher o formulário e enviar sua mensagem.",
  },
  {
    question: "Preciso criar uma conta para acessar as notícias?",
    answer:
      "Não. O acesso às notícias é público e gratuito. No entanto, algumas funcionalidades podem exigir autenticação no futuro.",
  },
  {
    question: "Com que frequência as notícias são atualizadas?",
    answer:
      "As notícias são atualizadas regularmente para garantir que você tenha acesso às informações mais recentes.",
  },
];

export default function FaqPage() {
  return (
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
          mb: { xs: 3, md: 2 },
        }}
      >
        Perguntas Frequentes
      </Typography>

      <Box>
        {faqItems.map((item, index) => (
          <Accordion
            key={index}
            disableGutters
            sx={{
              backgroundColor: "transparent",
              color: "inherit",
              borderBottom: "1px solid",
              borderColor: "divider",
              boxShadow: "none",
              "&:before": { display: "none" },
            }}
          >
            <AccordionSummary
              expandIcon={<ExpandMoreIcon />}
              sx={{
                px: 0,
                "& .MuiAccordionSummary-content": {
                  margin: "12px 0",
                },
              }}
            >
              <Typography className="text-lg font-semibold">
                {item.question}
              </Typography>
            </AccordionSummary>
            <AccordionDetails sx={{ px: 0, pb: 3 }}>
              <Typography className="text-base text-gray-600 dark:text-gray-300">
                {item.answer}
              </Typography>
            </AccordionDetails>
          </Accordion>
        ))}
      </Box>
    </Container>
  );
}
