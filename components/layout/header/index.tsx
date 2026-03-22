'use client'
import { AppBar, Box, Toolbar, Typography, useMediaQuery, useTheme, Link as MuiLink } from '@mui/material';
import DesktopNavbar from './desktopNavbar';
import MobileMenu from './mobileMenu';
import NextLink from "next/link";

const Header = () => {
  const theme = useTheme();
  const isDesktop = useMediaQuery(theme.breakpoints.up('md'));

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
        <MuiLink
          component={NextLink}
          href='/'
          underline='none'
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
                fontSize: { xs: '1.3rem', sm: '2rem' },
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
                fontSize: { xs: '1.3rem', sm: '2rem' },
                lineHeight: 1,
                letterSpacing: '-0.02em',
              }}
            >
              NOTÍCIAS
            </Typography>
          </Box>
        </MuiLink>

        {isDesktop ? <DesktopNavbar /> : <MobileMenu />}
      </Toolbar>
    </AppBar>
  );
};

export default Header;
