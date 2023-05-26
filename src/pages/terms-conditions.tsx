// @mui
import { Box, Typography } from '@mui/material';
// layouts
import { Container } from '@mui/system';
import { termsCondi } from 'src/constants/policies';
import MainLayout from '../layouts/main';
// components

// ----------------------------------------------------------------------

TermsCondition.getLayout = (page: React.ReactElement) => (
  <MainLayout metaTitle="Terms and Conditions">{page}</MainLayout>
);

// ----------------------------------------------------------------------

export default function TermsCondition() {
  return (
    <Box
      sx={{
        overflow: 'hidden',
        position: 'relative',
        bgcolor: 'background.default',
      }}
    >
      <Container sx={{ py: 6 }}>
        <Typography component="div" dangerouslySetInnerHTML={{ __html: termsCondi }} />
      </Container>
    </Box>
  );
}
