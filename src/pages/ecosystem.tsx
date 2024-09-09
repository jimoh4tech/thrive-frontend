// @mui
import { Box, Card, CardContent, Divider, Grid, Typography } from '@mui/material';
// layouts
import { Container, Stack } from '@mui/system';
import msme from 'src/constants/msme';
import Image from 'src/components/image/Image';
import MainLayout from '../layouts/main';
// components

// ----------------------------------------------------------------------

HomePage.getLayout = (page: React.ReactElement) => (
  <MainLayout metaTitle="MSME Development Space">{page}</MainLayout>
);

// ----------------------------------------------------------------------

export default function HomePage() {
  const { title, intro, body1, body2 } = msme;
  return (
    <Box
      sx={{
        overflow: 'hidden',
        position: 'relative',
        bgcolor: 'background.default',
      }}
    >
      <Box bgcolor="#f7f7f7">
        <Container sx={{ py: 6 }}>
          <Stack spacing={4}>
            <Grid container mx="auto" md={8}>
              <Typography variant="h2" mx="auto" textAlign="center">
                {title}
              </Typography>

              <Typography mt={2} component="div" dangerouslySetInnerHTML={{ __html: intro }} />
            </Grid>

            <Box>
              <Grid container spacing={4} alignItems="center">
                <Grid item md={6} pl={0}>
                  <Image src={body1.image} />
                </Grid>
                <Grid item md={6}>
                  <Card>
                    <CardContent>
                      <Typography
                        mt={2}
                        component="div"
                        dangerouslySetInnerHTML={{ __html: body1.text }}
                        boxSizing="border-box"
                      />
                    </CardContent>
                  </Card>
                </Grid>
              </Grid>
            </Box>

            <Box>
              <Grid container spacing={4}>
                <Grid item md={5}>
                  <Card sx={{ height: '100%' }}>
                    <CardContent sx={{ marginY: 'auto' }}>
                      <Typography
                        mt={2}
                        component="div"
                        dangerouslySetInnerHTML={{ __html: body2.text }}
                        boxSizing="border-box"
                      />
                    </CardContent>
                  </Card>
                </Grid>
                <Grid item md={7}>
                  <Image src={body2.image} />
                </Grid>
              </Grid>
            </Box>
          </Stack>
        </Container>
      </Box>
      <Divider />
    </Box>
  );
}
