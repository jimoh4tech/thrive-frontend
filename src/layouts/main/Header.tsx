// @mui
import { AppBar, Box, BoxProps, Button, Container, Toolbar } from '@mui/material';
import { useTheme } from '@mui/material/styles';
// hooks
import { LogoFull } from 'src/components/logo/Logo';
import { useAuthContext } from 'src/auth/useAuthContext';
import { SupervisedUserCircle } from '@mui/icons-material';
import Link from 'next/link';
import useOffSetTop from '../../hooks/useOffSetTop';
import useResponsive from '../../hooks/useResponsive';
// utils
import { bgBlur } from '../../utils/cssStyles';
// config
import { HEADER } from '../../config-global';
// routes
// components
//
import navConfig from './nav/config-navigation';
import NavDesktop from './nav/desktop';
import NavMobile from './nav/mobile';

// ----------------------------------------------------------------------

export default function Header() {
  const theme = useTheme();
  const { user } = useAuthContext();

  const isDesktop = useResponsive('up', 'md');

  const isOffset = useOffSetTop(HEADER.H_MAIN_DESKTOP);

  return (
    <AppBar color="transparent" sx={{ boxShadow: 0 }}>
      <Toolbar
        disableGutters
        sx={{
          height: {
            xs: HEADER.H_MOBILE,
            md: HEADER.H_MAIN_DESKTOP,
          },
          transition: theme.transitions.create(['height', 'background-color'], {
            easing: theme.transitions.easing.easeInOut,
            duration: theme.transitions.duration.shorter,
          }),
          ...(isOffset && {
            ...bgBlur({ color: theme.palette.background.default }),
            height: {
              md: HEADER.H_MAIN_DESKTOP - 16,
            },
          }),
        }}
      >
        <Container sx={{ height: 1, display: 'flex', alignItems: 'center' }}>
          <LogoFull sx={{ maxWidth: 150 }} />

          <Box sx={{ flexGrow: 1 }} />

          {isDesktop && <NavDesktop isOffset={isOffset} data={navConfig} />}

          {user ? (
            <Button
              LinkComponent={Link}
              href="/dashboard"
              variant="soft"
              startIcon={<SupervisedUserCircle />}
            >
              My Account
            </Button>
          ) : (
            <Button LinkComponent={Link} variant="contained" href="/login">
              Register / Login
            </Button>
          )}

          {!isDesktop && <NavMobile isOffset={isOffset} data={navConfig} />}
        </Container>
      </Toolbar>

      {isOffset && <Shadow />}
    </AppBar>
  );
}

// ----------------------------------------------------------------------

function Shadow({ sx, ...other }: BoxProps) {
  return (
    <Box
      sx={{
        left: 0,
        right: 0,
        bottom: 0,
        height: 24,
        zIndex: -1,
        m: 'auto',
        borderRadius: '50%',
        position: 'absolute',
        width: `calc(100% - 48px)`,
        boxShadow: (theme) => theme.customShadows.z8,
        ...sx,
      }}
      {...other}
    />
  );
}
