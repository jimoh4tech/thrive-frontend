// @mui
import { Box, Typography } from '@mui/material';
// layouts
import { Container } from '@mui/system';
import { dataProtect } from 'src/constants/policies';
import MainLayout from '../layouts/main';
// components

// ----------------------------------------------------------------------

DataProtection.getLayout = (page: React.ReactElement) => (
  <MainLayout metaTitle="Data Protection">{page}</MainLayout>
);

// ----------------------------------------------------------------------

export default function DataProtection() {
  return (
    <Box
      sx={{
        overflow: 'hidden',
        position: 'relative',
        bgcolor: 'background.default',
      }}
    >
      <Container sx={{ py: 6 }}>
        <Typography component="div" dangerouslySetInnerHTML={{ __html: dataProtect }} />
      </Container>
    </Box>
  );
}
