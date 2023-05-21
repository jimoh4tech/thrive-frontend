// @mui
import { Box, Grid, Typography } from '@mui/material';
// layouts
import { Container, bgcolor } from '@mui/system';
import modules, { intro } from 'src/constants/modules';
import Image from 'src/components/image/Image';
import Label from 'src/components/label/Label';
import MainLayout from '../layouts/main';
// components

// ----------------------------------------------------------------------

HomePage.getLayout = (page: React.ReactElement) => (
  <MainLayout metaTitle="ICSS Modules">{page}</MainLayout>
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
      <Container sx={{ py: 10, textAlign: 'center' }}>
        <Grid container sm={8} mx="auto">
          <Typography gridColumn={8} component="div" dangerouslySetInnerHTML={{ __html: intro }} />
        </Grid>
      </Container>

      {/* @ts-ignore */}
      {Object.keys(modules).map((key: keyof typeof modules, i) => {
        const module = modules[key];

        const isOdd = (i + 1) % 2;

        let bgColor;

        if (i === 0 || i === 3) bgColor = '#f7f7f7';
        if (i === 2) bgColor = '#333';

        return (
          // @ts-ignore
          <Box bgcolor={bgColor} key={i} py={6}>
            <Container>
              <Grid
                direction={!isOdd ? 'row-reverse' : 'row'}
                container
                spacing={6}
                alignItems="center"
              >
                <Grid item md={6}>
                  <Image src={module.image} />
                </Grid>
                <Grid item md={6} color={i === 2 ? 'white' : undefined}>
                  <Typography variant="caption">MODULE {i + 1}</Typography>
                  <Typography variant="h2" sx={{ textTransform: 'uppercase' }}>
                    {key}
                  </Typography>
                  <Typography
                    component="div"
                    dangerouslySetInnerHTML={{
                      __html: module.desc,
                    }}
                  />
                </Grid>
              </Grid>
            </Container>
          </Box>
        );
      })}
    </Box>
  );
}
