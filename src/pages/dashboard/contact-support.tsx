import { Box, Container, Stack } from '@mui/system';
import ContactForm from 'src/sections/contact/ContactForm';
import { PATH_DASHBOARD } from 'src/routes/paths';
import CustomBreadcrumbs from 'src/components/custom-breadcrumbs/CustomBreadcrumbs';
import Head from 'next/head';
import DashboardLayout from '../../layouts/dashboard';
// @types
// components
// sections

// ----------------------------------------------------------------------

Support.getLayout = (page: React.ReactElement) => <DashboardLayout>{page}</DashboardLayout>;

// ----------------------------------------------------------------------

export default function Support() {
  return (
    <>
      <Head>
        <title> Contact Support | ICSS Thrive</title>
      </Head>

      <Container maxWidth="xl">
        <CustomBreadcrumbs
          heading="Contact Support"
          links={[
            {
              name: 'Dashboard',
              href: PATH_DASHBOARD.root,
            },
            { name: 'Contact Support' },
          ]}
        />
        <Box
          gap={10}
          display="grid"
          gridTemplateColumns={{
            xs: 'repeat(1, 1fr)',
            md: 'repeat(2, 1fr)',
            lg: 'repeat(3, 1fr)',
          }}
          justifyContent="center"
          alignItems="center"
        >
          <ContactForm />
        </Box>
      </Container>
    </>
  );
}
// ----------------------------------------------------------------------
