// @mui
import { Box, Button, Paper, Typography } from '@mui/material';
// layouts
import { ArrowRight } from '@mui/icons-material';
import { Container, Stack } from '@mui/system';
import Image from 'src/components/image/Image';
import { consortiums, enterpriseHub } from 'src/constants/consortiums';
import MainLayout from '../layouts/main';
// components

// ----------------------------------------------------------------------

ICSSAgencies.getLayout = (page: React.ReactElement) => (
  <MainLayout metaTitle="ICSS THRIVE Consortium">{page}</MainLayout>
);

// ----------------------------------------------------------------------

export default function ICSSAgencies() {
  return (
    <Box
      sx={{
        overflow: 'hidden',
        position: 'relative',
        bgcolor: '#f7f7f7',
      }}
    >
      <Container sx={{ py: 6 }}>
        <Stack spacing={3}>
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
            <Image src={enterpriseHub.logo.src} maxWidth={200} />
            <Typography mt={2} variant="h4">
              {enterpriseHub.title}
            </Typography>
            <Typography component="div" dangerouslySetInnerHTML={{ __html: enterpriseHub.text }} />
            <Button
              href={enterpriseHub.link}
              size="large"
              color="inherit"
              variant="outlined"
              endIcon={<ArrowRight />}
            >
              Visit Website
            </Button>
          </Paper>
          {consortiums
            .sort((a, b) => {
              const _a = a.title.toUpperCase();
              const _b = b.title.toUpperCase();
              // @ts-ignore
              return _a < _b ? -1 : _a > _b ? 1 : 0;
            })
            .map((_, i) => (
              <Paper
                key={i}
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
                <Image src={_.logo.src} maxWidth={_.logo.width > _.logo.height * 1.5 ? 200 : 100} />
                <Typography mt={2} variant="h4">
                  {_.title}
                </Typography>
                <Typography component="div" dangerouslySetInnerHTML={{ __html: _.text }} />
                <Button
                  href={_.link}
                  size="large"
                  color="inherit"
                  variant="outlined"
                  endIcon={<ArrowRight />}
                >
                  Visit Website
                </Button>
              </Paper>
            ))}
        </Stack>
      </Container>
    </Box>
  );
}
