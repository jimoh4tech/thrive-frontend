// @mui
import { Box, Typography } from '@mui/material';
// layouts
import { Container } from '@mui/system';
import { privacyPolicy } from 'src/constants/policies';
import MainLayout from '../layouts/main';
// components

// ----------------------------------------------------------------------

PrivacyPolicy.getLayout = (page: React.ReactElement) => (
  <MainLayout metaTitle="Privacy Policy">{page}</MainLayout>
);

// ----------------------------------------------------------------------

export default function PrivacyPolicy() {
  return (
    <Box
      sx={{
        overflow: 'hidden',
        position: 'relative',
        bgcolor: 'background.default',
      }}
    >
      <Container sx={{ py: 6 }}>
        <Typography component="div" dangerouslySetInnerHTML={{ __html: privacyPolicy }} />
      </Container>
    </Box>
  );
}
