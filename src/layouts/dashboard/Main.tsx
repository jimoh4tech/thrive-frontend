// @mui
import { Box, BoxProps } from '@mui/material';
// hooks
import { logo2 } from 'src/assets/images';
import { useAuthContext } from 'src/auth/useAuthContext';
import useResponsive from '../../hooks/useResponsive';
// config
import { HEADER, NAV } from '../../config-global';
// components
import { useSettingsContext } from '../../components/settings';
import UserApproved from './membership/UserApproved';
import UserSubscribe from './membership/UserSubscribe';
import UserSuspended from './membership/UserSuspended';

// ----------------------------------------------------------------------

const SPACING = 8;

export default function Main({ children, sx, ...other }: BoxProps) {
  const { themeLayout } = useSettingsContext();
  const { user, isAuthenticated } = useAuthContext();

  console.log(isAuthenticated);

  const isNavHorizontal = themeLayout === 'horizontal';

  const isNavMini = themeLayout === 'mini';

  const isDesktop = useResponsive('up', 'lg');

  // TODO: to be removed after a year 10/21/2024. A temporary fix to give old users a year free trial
  const PILOT_USER_ID = 18;

  const render = () => {
    if (!user?.isApproved) return <UserSuspended />;
    if (!user?.business) return <UserApproved />;
    if (!user.hasSubscription && user?.premuimSub?.length === 0 && user?.ngo?.id !== PILOT_USER_ID)
      return <UserSubscribe />;
    return children;
  };

  if (isNavHorizontal) {
    return (
      <Box
        component="main"
        sx={{
          pt: `${HEADER.H_MOBILE + SPACING}px`,
          pb: `${HEADER.H_MOBILE + SPACING}px`,
          ...(isDesktop && {
            px: 2,
            pt: `${HEADER.H_DASHBOARD_DESKTOP + 80}px`,
            pb: `${HEADER.H_DASHBOARD_DESKTOP + SPACING}px`,
          }),
          ...sx,
          backgroundImage: logo2.src,
        }}
      >
        {render()}
      </Box>
    );
  }

  return (
    <Box
      component="main"
      sx={{
        flexGrow: 1,
        py: `${HEADER.H_MOBILE + SPACING}px`,
        ...(isDesktop && {
          px: 2,
          py: `${HEADER.H_DASHBOARD_DESKTOP + SPACING}px`,
          width: `calc(100% - ${NAV.W_DASHBOARD}px)`,
          ...(isNavMini && {
            width: `calc(100% - ${NAV.W_DASHBOARD_MINI}px)`,
          }),
        }),
        ...sx,
        backgroundImage: logo2.src,
      }}
      {...other}
    >
      {render()}
    </Box>
  );
}
