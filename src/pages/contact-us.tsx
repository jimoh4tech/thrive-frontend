// @mui
import { Box } from '@mui/material';
// layouts
import { Container } from '@mui/system';
import ContactForm from 'src/sections/contact/ContactForm';
import ContactMap from 'src/sections/contact/ContactMap';
import MainLayout from '../layouts/main';
// components

// ----------------------------------------------------------------------

HomePage.getLayout = (page: React.ReactElement) => (
  <MainLayout metaTitle="Contact" title="Contact Us">
    {page}
  </MainLayout>
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
      <Container sx={{ py: 10 }}>
        <Box
          gap={10}
          display="grid"
          gridTemplateColumns={{
            xs: 'repeat(1, 1fr)',
            md: 'repeat(2, 1fr)',
          }}
        >
          <ContactForm />

          <ContactMap
            contacts={[
              {
                latlng: [6.4245331402598085, 3.4537281017776857],
                address:
                  ': THRIVE – Enterprise Hubs, 16a Trinity Avenue, Off Ligali Ayorinde, Victoria Island.',
                phoneNumber: '+2349066189699',
              },
            ]}
          />
        </Box>
      </Container>
    </Box>
  );
}
