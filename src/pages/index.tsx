// next
// @mui
import { Box, Button, Grid, Paper, Typography } from '@mui/material';
// layouts
import { Container, Stack } from '@mui/system';
import Iconify from 'src/components/iconify/Iconify';
import { puyb, sa } from 'src/constants/home';
import OneTimeSignUp from 'src/sections/about/OneTimeSignUp';
import Announcement from 'src/sections/home/Announcement';
import LandingScreen from 'src/sections/home/LandingScreen';
import Link from 'next/link';
import Image from 'next/image';
import { ads } from 'src/assets/images';
import MainLayout from '../layouts/main';

// ----------------------------------------------------------------------

HomePage.getLayout = (page: React.ReactElement) => (
  <MainLayout metaTitle="Home" title={<LandingScreen />}>
    {page}
  </MainLayout>
);

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
        {/* -------------- Power-Up Your Business -------------- */}
        <Box>
          <Typography variant="h2" textAlign="center">
            one-stop digital support for entrepreneurs
          </Typography>
          <Grid
            container
            direction={{ md: 'row' }}
            mt={1}
            spacing={{ md: 4, xs: 2 }}
            justifyContent="center"
          >
            {puyb.map((_, i) => (
              <Grid item md={4} key={i}>
                <Paper
                  sx={{
                    p: { md: 8, xs: 4 },
                    width: 1,
                    borderRadius: 1,
                    overflow: 'hidden',
                    position: 'relative',
                    '&:hover': {
                      boxShadow: (theme) => theme.customShadows.z20,
                    },
                  }}
                >
                  <Box sx={{ cursor: 'pointer' }} textAlign="center">
                    <Iconify icon={_.icon} color="primary.main" width={50} />
                    <Typography>{_.desc}</Typography>
                  </Box>
                </Paper>
              </Grid>
            ))}
          </Grid>
        </Box>

        {/* -------------- One-time Sign-up -------------- */}
        <OneTimeSignUp withCTA />

        {/* -------------- Advert -------------- */}
        <Stack
          sx={{
            // height: 400,
            // border: 5,
            // borderColor: 'primary.main',
            justifyContent: 'center',
            alignItems: 'center',
            my: 4,
          }}
        >
          {/* <Typography variant="h2">YOUR ADVERT APPEARS HERE</Typography> */}
          <Image alt="Advertisment" src={ads} width={800} height={250} />
        </Stack>
        {/* <Grid item md={6}>
          <Image alt="Advertisment" src={ads} />
        </Grid> */}
      </Container>

      {/* -------------- Announcements -------------- */}
      <Box sx={{ bgcolor: '#f2f2f2' }}>
        <Container sx={{ py: 6 }}>
          <Stack spacing={6}>
            <Typography variant="h2" textAlign="center">
              Special Announcement
            </Typography>

            <Announcement posts={sa.posts} />

            <Box textAlign="center">
              <Button
                LinkComponent={Link}
                href="/announcements"
                variant="contained"
                startIcon={<Iconify icon="mdi:tick-circle-outline" />}
              >
                Read More
              </Button>
            </Box>
          </Stack>
        </Container>
      </Box>
    </Box>
  );
}
