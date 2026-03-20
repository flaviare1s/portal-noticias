'use client'
import { AppBar, Box, Toolbar, Typography, useMediaQuery, useTheme } from '@mui/material';
import DesktopNavbar from './desktopNavbar';
import MobileMenu from './mobileMenu';

const Header = () => {
  const theme = useTheme();
  const isDesktop = useMediaQuery(theme.breakpoints.up('xl'));

  return (
    <AppBar
      position="static"
      elevation={0}
      sx={{
        backgroundColor: '#000',
        borderBottom: '1px solid #1F1F1F',
      }}
    >
      <Toolbar
        disableGutters
        sx={{
          minHeight: { xs: 84, md: 92 },
          px: { xs: 2, sm: 3, md: 4, lg: 6 },
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
        }}
      >
        <Box
          sx={{
            display: 'flex',
            alignItems: 'center',
            flexShrink: 0,
          }}
        >
          <Typography
            component="span"
            sx={{
              color: '#FFF',
              fontWeight: 800,
              fontSize: { xs: '1.7rem', md: '2rem' },
              lineHeight: 1,
              letterSpacing: '-0.02em',
              mr: 1.5,
            }}
          >
            PORTAL
          </Typography>

          <Typography
            component="span"
            sx={{
              color: '#E3194B',
              fontWeight: 800,
              fontSize: { xs: '1.7rem', md: '2rem' },
              lineHeight: 1,
              letterSpacing: '-0.02em',
            }}
          >
            NOTÍCIAS
          </Typography>
        </Box>

        {isDesktop ? <DesktopNavbar /> : <MobileMenu />}
      </Toolbar>
    </AppBar>
  );
};

export default Header;
