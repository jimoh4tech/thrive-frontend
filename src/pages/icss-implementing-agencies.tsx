// @mui
import { Box, Button, Paper, Typography } from '@mui/material';
// layouts
import { Container, Stack } from '@mui/system';
import Image from 'src/components/image/Image';
import { section1, section2 } from 'src/constants/tfc';
import { consortiums } from 'src/constants/consortiums';
import Iconify from 'src/components/iconify/Iconify';
import { ArrowRight } from '@mui/icons-material';
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
          {consortiums.map((_, i) => (
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
              <Image src={_.logo.src} maxWidth={100} />
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
