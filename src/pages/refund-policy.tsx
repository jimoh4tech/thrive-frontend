// @mui
import { Box, Typography } from '@mui/material';
// layouts
import { Container } from '@mui/system';
import { refundPolicy } from 'src/constants/policies';
import MainLayout from '../layouts/main';
// components

// ----------------------------------------------------------------------

RefundPolicy.getLayout = (page: React.ReactElement) => (
  <MainLayout metaTitle="Refund Policy">{page}</MainLayout>
);

// ----------------------------------------------------------------------

export default function RefundPolicy() {
  return (
    <Box
      sx={{
        overflow: 'hidden',
        position: 'relative',
        bgcolor: 'background.default',
      }}
    >
      <Container sx={{ py: 6 }}>
        <Typography component="div" dangerouslySetInnerHTML={{ __html: refundPolicy }} />
      </Container>
    </Box>
  );
}
