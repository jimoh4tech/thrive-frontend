import { Button, Grid, Typography } from '@mui/material';
import { Box, Stack } from '@mui/system';
import React from 'react';
import Iconify from 'src/components/iconify/Iconify';
import Image from 'src/components/image/Image';
import { otsu } from 'src/constants/about';

const OneTimeSignUp = () => (
  <Grid
    container
    direction={{ md: 'row' }}
    mt={1}
    spacing={8}
    alignItems="center"
    justifyContent="center"
  >
    <Grid item md={6}>
      <Image src={otsu.image} />
    </Grid>
    <Grid item md={6}>
      <Stack spacing={{ md: 3, xs: 1 }}>
        <Stack direction={{ md: 'row' }} spacing={2}>
          <Typography variant="h3" color="primary.main">
            {otsu.title1}
          </Typography>
          <Typography variant="h3" color="primary.mian">
            {otsu.title2}
          </Typography>
        </Stack>

        <Typography component="div" dangerouslySetInnerHTML={{ __html: otsu.desc }} />

        <Box>
          <Button variant="contained" startIcon={<Iconify icon="mdi:tick-circle-outline" />}>
            Learn More
          </Button>
        </Box>
      </Stack>
    </Grid>
  </Grid>
);

export default OneTimeSignUp;
