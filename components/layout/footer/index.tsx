'use client'
import { Box, Stack, Typography, Link as MuiLink } from '@mui/material';
import NextLink from "next/link";

const footerLinks = [
  { label: 'Home', href: '/' },
  { label: 'News', href: '/news' },
  { label: 'FAQ', href: '/faq' },
  { label: 'Contato', href: '/contact' },
];

const Footer = () => {
  return (
    <Box
      component="footer"
      sx={{
        width: '100%',
        background: 'black',
        borderTop: '1px solid',
        borderColor: 'divider',
      }}
    >
      <Box
        sx={{
          maxWidth: 1440,
          mx: 'auto',
          px: { xs: 2, sm: 3, md: 4, lg: 6 },
          py: { xs: 5, sm: 4, md: 2.5 },
          display: 'flex',
          flexDirection: { xs: 'column', md: 'row' },
          alignItems: 'center',
          justifyContent: 'space-between',
          gap: { xs: 6, md: 2 },
          textAlign: { xs: 'center', md: 'left' },
        }}
      >
        <Typography
          sx={{
            color: 'white',
            fontSize: { xs: '1rem', sm: '1.05rem', md: '0.9rem' },
            lineHeight: 1.4,
          }}
        >
          © 2026 Portal de Notícias. Todos os direitos reservados.
        </Typography>

        <Stack
          direction="row"
          spacing={{ xs: 3, sm: 4, md: 3 }}
          useFlexGap
          flexWrap="wrap"
          justifyContent="center"
          sx={{
            rowGap: 1.5,
          }}
        >
          {footerLinks.map((item) => (
            <MuiLink
              key={item.label}
              component={NextLink}
              href={item.href}
              sx={{
                textDecoration: 'none',
                color: 'white',
                fontWeight: 500,
                fontFamily: 'var(--font-roboto)',
                fontSize: { xs: '1.2rem', sm: '1.1rem', md: '0.95rem' },
                lineHeight: 1.2,
                transition: 'opacity 0.2s ease',
                '&:hover': {
                  opacity: 0.7,
                },
              }}
            >
              {item.label}
            </MuiLink>
          ))}
        </Stack>
      </Box>
    </Box>
  );
};

export default Footer;
