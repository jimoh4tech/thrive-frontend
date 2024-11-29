import { Button, Grid, Typography, useTheme } from '@mui/material';
import { Box, Stack } from '@mui/system';
import Carousel, { CarouselDots } from 'src/components/carousel';

// utils
// components
import { banner1, banner2, banner3, banner4 } from 'src/assets/images';
import Iconify from 'src/components/iconify/Iconify';
import Link from 'next/link';
import { PATH_AUTH } from 'src/routes/paths';
import { useState } from 'react';
// import { loader } from 'src/actions';
// import { useSnackbar } from 'notistack';
import { Tour } from '@mui/icons-material';
import TourVideo from 'src/components/TourVideo';
import Image from '../../components/image';

const LandingScreen = () => {
  const theme = useTheme();
  // const { enqueueSnackbar } = useSnackbar();
  const [watch, setWatch] = useState(false);

  const carouselSettings = {
    speed: 1500,
    dots: true,
    arrows: false,
    autoplay: true,
    slidesToShow: 1,
    slidesToScroll: 1,

    rtl: Boolean(theme.direction === 'rtl'),
    ...CarouselDots({
      sx: {
        right: 0,
        left: 0,
        bottom: 24,
        position: { sm: 'absolute' },
      },
    }),
  };

  // const [totalUsers, setTotalUsers] = useState(0);
  // const getUsersCount = useCallback(async () => {
  //   try {
  //     const { count } = await loader('countUsers');
  //     setTotalUsers(count);
  //   } catch (error) {
  //     enqueueSnackbar(error.message || error, { variant: 'error' });
  //   }
  // }, [enqueueSnackbar]);

  // useEffect(() => {
  //   getUsersCount();
  // }, [getUsersCount]);

  return (
    <Grid container justifyContent="center" alignItems="center" pt={{ md: 16 }} spacing={4}>
      <Grid item lg={5}>
        <Stack spacing={2}>
          <Box>
            <Typography fontWeight={300} variant="h2">
              A World of
            </Typography>
            <Typography variant="h2" color="primary.main">
              Business Solutions
            </Typography>
          </Box>
          <Typography>
            A one-stop digital support center for growing businesses in Nigeria. One-time sign-up.
            Easy sign-ins.
          </Typography>
          <Stack direction="row" spacing={2}>
            <Button
              LinkComponent={Link}
              size="large"
              startIcon={<Iconify icon="fa:send-o" />}
              variant="contained"
              href={PATH_AUTH.register}
            >
              Get Started
            </Button>
            <Button
              LinkComponent={Link}
              size="large"
              startIcon={<Tour />}
              variant="contained"
              onClick={() => setWatch(true)}
            >
              Take A Tour
            </Button>
          </Stack>
          {/* <Box>
            <Typography variant="h6">Registered User</Typography>
            <Stack direction="row" spacing={1} mt={1}>
              {`000${totalUsers}`
                .substr(-3)
                .split('')
                .map((_, i) => (
                  <Box
                    key={i}
                    sx={{
                      border: 1,
                      borderRadius: 1,
                      borderColor: 'primary.main',
                      px: 2,
                      py: 1,
                      bgcolor: '#ffffffa2',
                    }}
                  >
                    <Typography variant="h3">{_}</Typography>
                  </Box>
                ))}
            </Stack>
          </Box> */}
        </Stack>
      </Grid>
      <Grid item xs={12} lg={7}>
        <Carousel {...carouselSettings}>
          {[banner3, banner1, banner2, banner4].map((item, i) => (
            <Box key={i} sx={{ position: 'relative', borderRadius: 1, overflow: 'hidden' }}>
              <Image alt="THRIVE" src={item.src} />
            </Box>
          ))}
        </Carousel>
      </Grid>
      <TourVideo open={watch} onClose={() => setWatch(false)} />
    </Grid>
  );
};

export default LandingScreen;
