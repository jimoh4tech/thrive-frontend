// @mui
import { Box, Card, CardContent, Grid, Typography, styled } from '@mui/material';
// layouts
import { BoltSharp } from '@mui/icons-material';
import { Container, Stack } from '@mui/system';
import { aboutBg, logoIconLg } from 'src/assets/images';
import Iconify from 'src/components/iconify/Iconify';
import { LogoFull } from 'src/components/logo/Logo';
import { intro, lone, missVis, objectives } from 'src/constants/about';
import MainLayout from '../layouts/main';
// components

// ----------------------------------------------------------------------

HomePage.getLayout = (page: React.ReactElement) => (
  <MainLayout metaTitle="About" title="About Us">
    {page}
  </MainLayout>
);

// ----------------------------------------------------------------------

const StyledOverlay = styled('div')(({ theme }) => ({
  // ...bgGradient({
  //   startColor: `${alpha(theme.palette.common.black, 0)} 0%`,
  //   endColor: `${theme.palette.common.black} 75%`,
  // }),
  backgroundImage: `url('${logoIconLg.src}')`,
  backgroundRepeat: 'no-repeat',
  backgroundSize: 'contain',
  filter: ' blur(8px)',
  position: 'absolute',
  width: '25%',
  top: -150,
  left: -150,
  bottom: 0,
}));

// ----------------------------------------------------------------------

export default function HomePage() {
  return (
    <Box
      sx={{
        overflow: 'hidden',
        position: 'relative',
        bgcolor: 'background.default',
      }}
    >
      <Container sx={{ py: 6 }}>
        {/* -------------- Intro -------------- */}
        <Box textAlign="center">
          <LogoFull sx={{ width: 300, display: 'inline' }} />
          <Typography component="div" dangerouslySetInnerHTML={{ __html: intro }} />
        </Box>

        {/* -------------- One-time Sign-up -------------- */}
        {/* <OneTimeSignUp /> */}
      </Container>

      <Box
        sx={{
          backgroundImage: `linear-gradient(to left, rgba(245, 246, 252, 0), rgba(0, 0, 0, 1)), url(${aboutBg.src})`,
          backgroundSize: 'cover',
          backgroundRepeat: 'no-repeat',
          py: 6,
          mt: 4,
        }}
      >
        <Container>
          <Grid container>
            <Grid item lg={6}>
              <Typography
                component="div"
                dangerouslySetInnerHTML={{ __html: lone }}
                color="white"
              />
            </Grid>
          </Grid>
        </Container>
      </Box>

      {/* -------------- Vision & Mission -------------- */}
      <Container sx={{ py: 10 }}>
        <Grid container spacing={10}>
          <Grid item sm={6}>
            <Stack spacing={2} alignItems="center">
              <Iconify icon={missVis.mission.icon} width={100} color="primary.main" />
              <Typography variant="h3">{missVis.mission.title}</Typography>
              <Typography textAlign="center">{missVis.mission.desc}</Typography>
            </Stack>
          </Grid>
          <Grid item sm={6}>
            <Stack spacing={2} alignItems="center">
              <Iconify icon={missVis.vision.icon} width={100} color="primary.main" />
              <Typography variant="h3">{missVis.vision.title}</Typography>
              <Typography textAlign="center">{missVis.vision.desc}</Typography>
            </Stack>
          </Grid>
        </Grid>
      </Container>

      {/* -------------- Objectives -------------- */}
      <Box bgcolor="primary.main" sx={{ position: 'relative', overflowY: 'hidden' }}>
        <StyledOverlay />
        <Container sx={{ py: 6 }}>
          <Typography variant="h2" color="white" textAlign="center">
            {objectives.title}
          </Typography>

          <Grid container spacing={6} mt={2}>
            {objectives.items.map((item, i) => (
              <Grid item md={i > 2 ? 6 : 4} sm={6} textAlign="center">
                <Card sx={{ py: 6, height: '100%' }}>
                  <CardContent>
                    <BoltSharp color="primary" fontSize="large" />

                    <Typography> {item} </Typography>
                  </CardContent>
                </Card>
              </Grid>
            ))}
          </Grid>
        </Container>
      </Box>
    </Box>
  );
}
