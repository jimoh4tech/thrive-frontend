// @mui
import { Box, Typography } from '@mui/material';
// layouts
import { Container } from '@mui/system';
import { abusePolicy } from 'src/constants/policies';
import MainLayout from '../layouts/main';
// components

// ----------------------------------------------------------------------

AbusePolicy.getLayout = (page: React.ReactElement) => (
  <MainLayout metaTitle="Abuse Policy">{page}</MainLayout>
);

// ----------------------------------------------------------------------

export default function AbusePolicy() {
  return (
    <Box
      sx={{
        overflow: 'hidden',
        position: 'relative',
        bgcolor: 'background.default',
      }}
    >
      <Container sx={{ py: 6 }}>
        <Typography component="div" dangerouslySetInnerHTML={{ __html: abusePolicy }} />
      </Container>
    </Box>
  );
}
