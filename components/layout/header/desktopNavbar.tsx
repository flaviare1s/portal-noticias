import SearchIcon from '@mui/icons-material/Search';
import PersonOutlineIcon from '@mui/icons-material/PersonOutline';
import LiveTvOutlinedIcon from '@mui/icons-material/LiveTvOutlined';
import {
  Box,
  IconButton,
  Link as MuiLink,
  Stack,
} from '@mui/material';
import NextLink from "next/link";

const primaryLinks = [
  { label: 'Home', href: '/' },
  { label: 'News', href: '/news' },
  { label: 'FAQ', href: '/faq' },
  { label: 'Contato', href: '/contact' },
];

const secondaryLinks = [
  'Ao Vivo',
  'Política',
  'Money',
  'Mundo',
  'Agro',
  'Esportes',
  'Viagem & Gastronomia',
];

const DesktopNavbar = () => {
  return (
    <Box
      sx={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'flex-end',
        flex: 1,
        ml: 6,
        minWidth: 0,
      }}
    >
      <Stack
        direction="row"
        spacing={3}
        alignItems="center"
        sx={{ mr: 4 }}
      >
        {primaryLinks.map((item) => (
          <MuiLink
            key={item.label}
            component={NextLink}
            href={item.href}
            underline="none"
            color="inherit"
            sx={{
              fontSize: '0.95rem',
              fontWeight: item.label === 'Contato' ? 700 : 500,
              fontFamily: 'var(--font-roboto)',
              color: '#FFF',
              transition: 'opacity 0.2s ease',
              '&:hover': {
                opacity: 0.75,
              },
            }}
          >
            {item.label}
          </MuiLink>
        ))}
      </Stack>

      <Box
        sx={{
          width: 92,
          height: 16,
          borderRadius: 999,
          backgroundColor: '#6A6A6A',
          mx: 4,
          flexShrink: 0,
        }}
      />

      <Stack
        direction="row"
        spacing={3}
        alignItems="center"
        sx={{
          mr: 3,
          minWidth: 0,
          overflow: 'hidden',
        }}
      >
        {secondaryLinks.map((item) => (
          <Box
            key={item}
            sx={{
              display: {
                xs: "none",
                xl: "flex",
              },
              alignItems: 'center',
              gap: 0.75,
              whiteSpace: 'nowrap',
            }}
          >
            {item === 'Ao Vivo' && (
              <LiveTvOutlinedIcon sx={{ fontSize: 18, color: '#FFF' }} />
            )}

            <MuiLink
              component={NextLink}
              href="#"
              underline="none"
              sx={{
                color: '#FFF',
                fontSize: '0.95rem',
                fontWeight: 500,
                fontFamily: 'roboto',
                transition: 'opacity 0.2s ease',
                '&:hover': {
                  opacity: 0.75,
                },
              }}
            >
              {item}
            </MuiLink>
          </Box>
        ))}
      </Stack>

      <Stack direction="row" spacing={1} alignItems="center">
        <IconButton
          aria-label="search"
          sx={{
            color: '#FFF',
          }}
        >
          <SearchIcon />
        </IconButton>

        <MuiLink 
          component={NextLink}
          href='/profile'
          >
          <IconButton
            aria-label="account"
            sx={{
              color: '#FFF',
            }}
          >
            <PersonOutlineIcon />
          </IconButton>
        </MuiLink>
      </Stack>
    </Box>
  );
};

export default DesktopNavbar;
