// @mui
import { Box, Typography } from '@mui/material';
// layouts
import { Container, Stack } from '@mui/system';
import Image from 'src/components/image/Image';
import { section1, section2 } from 'src/constants/tfc';
import MainLayout from '../layouts/main';
// components

// ----------------------------------------------------------------------

HomePage.getLayout = (page: React.ReactElement) => (
  <MainLayout metaTitle="Thrive Trainers, Facilitator, Coaches (TFC)">{page}</MainLayout>
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
        <Stack spacing={3}>
          {/* <Image src={section1.image.src} /> */}

          <Typography component="div" dangerouslySetInnerHTML={{ __html: section1.text }} />
        </Stack>
      </Container>

      <Box bgcolor="#f7f7f7" py={6}>
        <Stack spacing={3}>
          <Container>
            <Typography textAlign="center" variant="h3">
              {section2.title}
            </Typography>
          </Container>

          <Stack direction="row" spacing={1} justifyContent="center">
            {section2.image.map((_, i) => (
              <Image key={i} src={_.src} />
            ))}
          </Stack>
        </Stack>
      </Box>
    </Box>
  );
}
