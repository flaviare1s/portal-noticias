import { useState } from 'react';
import SearchIcon from '@mui/icons-material/Search';
import PersonOutlineIcon from '@mui/icons-material/PersonOutline';
import MenuIcon from '@mui/icons-material/Menu';
import LiveTvOutlinedIcon from '@mui/icons-material/LiveTvOutlined';
import { usePathname } from "next/navigation";
import { useSearch } from "@/components/search/SearchContext";
import CloseIcon from '@mui/icons-material/Close';
import {
  Box,
  Divider,
  Drawer,
  IconButton,
  List,
  ListItemButton,
  ListItemText,
  Stack,
  Link as MuiLink
} from '@mui/material';
import NextLink from "next/link";

const menuItems = [
  { label: 'Home', href: '/' },
  { label: 'Notícias', href: '/news' },
  { label: 'FAQ', href: '/faq' },
  { label: 'Contato', href: '/contact' },
  { label: 'Ao vivo', href: '#' },
  { label: 'Política', href: '#' },
  { label: 'Money', href: '#' },
  { label: 'Mundo', href: '#' },
  { label: 'Agro', href: '#' },
  { label: 'Esportes', href: '#' },
  { label: 'Viagem & Gastronomia', href: '#' },
];

const MobileMenu = () => {
  const [open, setOpen] = useState(false);
  const pathname = usePathname();
  const { setIsOpen, isOpen } = useSearch();

  const showSearchIcon =
    pathname === "/" ||
    pathname === "/news" ||
    pathname.startsWith("/news/");

  const toggleDrawer = (value: boolean) => () => {
    setOpen(value);
  };

  return (
    <>
      <Stack direction="row" spacing={1} alignItems="center">
        {showSearchIcon && (
        <IconButton
          aria-label="search"
          sx={{
            color: '#FFF',
          }}
        >
          <SearchIcon
            sx={{ fontSize: 24 }}
            onClick={() => setIsOpen(!isOpen)}
          />
        </IconButton>
        )}

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
          <PersonOutlineIcon sx={{ fontSize: 24 }} />
        </IconButton>
        </MuiLink>

        <IconButton
          aria-label="open menu"
          onClick={toggleDrawer(true)}
          sx={{
            color: '#FFF',
          }}
        >
          <MenuIcon sx={{ fontSize: 30 }} />
        </IconButton>
      </Stack>

      <Drawer
        anchor="right"
        open={open}
        onClose={toggleDrawer(false)}
        slotProps={{
          paper: {
            sx: {
              width: 320,
              backgroundColor: '#000',
              color: '#FFF',
            },
          },
        }}
      >
        <Box
          sx={{
            display: 'flex',
            justifyContent: 'flex-end',
            p: 2.4,
          }}
        >
          <IconButton
            aria-label="close menu"
            onClick={toggleDrawer(false)}
            sx={{ color: '#FFF' }}
          >
            <CloseIcon sx={{  fontSize: 30 }} />
          </IconButton>
        </Box>

        <Divider sx={{ borderColor: '#1F1F1F' }} />

        <List sx={{ px: 1, py: 2 }}>
          {menuItems.map((item) => (
            <ListItemButton
              key={item.label}
              component={NextLink}
              href={item.href}
              onClick={toggleDrawer(false)}
              sx={{
                borderRadius: 2,
                mb: 0.5,
              }}
            >
              {item.label === 'Ao vivo' && (
                <LiveTvOutlinedIcon sx={{ mr: 1.5, fontSize: 20 }} />
              )}

              <ListItemText
                primary={item.label}
                slotProps={{
                  primary: {
                    fontSize: '1rem',
                    fontWeight: item.label === 'Contato' ? 700 : 500,
                    fontFamily: ['Home', 'News', 'FAQ', 'Contato'].includes(item.label) ? 'var(--font-roboto)' : undefined,
                  },
                }}
              />
            </ListItemButton>
          ))}
        </List>
      </Drawer>
    </>
  );
};

export default MobileMenu;
