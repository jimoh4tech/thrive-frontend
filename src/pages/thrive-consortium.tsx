// @mui
import { Box } from '@mui/material';
// layouts
import MainLayout from '../layouts/main';
// components

// ----------------------------------------------------------------------

HomePage.getLayout = (page: React.ReactElement) => (
  <MainLayout metaTitle="THRIVE Consortium">{page}</MainLayout>
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
      THRIVE Consortium
    </Box>
  );
}
