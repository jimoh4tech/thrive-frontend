// @mui
import { Container, Stack, Typography } from '@mui/material';
import { styled } from '@mui/material/styles';
// components
import { bgGeneral, bgImage } from 'src/assets/images';
import { useRouter } from 'next/router';
import { MotionContainer, TextAnimate, varFade } from '../../components/animate';

// ----------------------------------------------------------------------

const StyledRoot = styled('div')(({ theme }) => ({
  position: 'relative',
  backgroundSize: 'cover',
  backgroundPosition: 'center',
  backgroundImage: `url(${bgGeneral.src})`,
  padding: theme.spacing(10, 0),
  [theme.breakpoints.up('md')]: {
    paddingTop: 0,
    paddingBottom: theme.spacing(10, 0),
  },
}));

// ----------------------------------------------------------------------

export default function Hero({ title }: { title: React.ReactNode | string }) {
  const { pathname } = useRouter();

  const isHome = pathname === '/';

  return (
    <StyledRoot
      sx={
        isHome
          ? { minHeight: 600, height: 'auto', backgroundImage: `url(${bgImage.src})` }
          : {
              height: { md: 560 },
            }
      }
    >
      <Container component={MotionContainer} height="100%">
        <Stack justifyContent="center" alignItems="center" height="100%">
          {typeof title === 'string' ? (
            <Typography children={title} textAlign="center" variant="h1" />
          ) : (
            title
          )}
        </Stack>
      </Container>
    </StyledRoot>
  );
}
