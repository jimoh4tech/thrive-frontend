// @mui
import { Box, Button, Grid, Paper, Typography } from '@mui/material';
// layouts
import { Container, Stack } from '@mui/system';
import Iconify from 'src/components/iconify/Iconify';
import services from 'src/constants/services';
import { ArrowRight } from '@mui/icons-material';
import MainLayout from '../layouts/main';
// components

// ----------------------------------------------------------------------

HomePage.getLayout = (page: React.ReactElement) => (
  <MainLayout metaTitle="Platinum Services">{page}</MainLayout>
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
          <Grid container mt={1} spacing={6}>
            {services.map((_, i) => (
              <Grid item md={6} key={i}>
                <Paper
                  sx={{
                    p: 4,
                    py: 8,
                    border: '0.5px solid #ccc',
                    borderRadius: 1,
                    position: 'relative',
                    '&:hover': {
                      boxShadow: (theme) => theme.customShadows.z20,
                    },
                    height: '100%',
                  }}
                >
                  <Stack
                    justifyContent="center"
                    alignItems="center"
                    spacing={2}
                    sx={{
                      border: '1px solid #eee',
                      height: 60,
                      width: 60,
                      borderRadius: 1,
                    }}
                  >
                    <Iconify icon={_.icon} color="primary.main" width={40} />
                  </Stack>
                  <Typography mt={2} variant="h4">
                    {_.title}
                  </Typography>
                  <Typography component="div" dangerouslySetInnerHTML={{ __html: _.text }} />
                  <Button
                    href="/register"
                    size="large"
                    color="inherit"
                    variant="outlined"
                    endIcon={<ArrowRight />}
                  >
                    Get Started
                  </Button>
                </Paper>
              </Grid>
            ))}
          </Grid>
        </Box>
      </Container>
    </Box>
  );
}
