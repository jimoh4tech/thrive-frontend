// next
import Head from 'next/head';
// @mui
import { Container } from '@mui/material';
// routes
import NewFinanceForm from 'src/sections/@admin/finace/NewFinanceForm';
import { PATH_ADMIN } from '../../../routes/paths';
// layouts
import DashboardLayout from '../../../layouts/admin';
// components
import CustomBreadcrumbs from '../../../components/custom-breadcrumbs';
import { useSettingsContext } from '../../../components/settings';
// sections

// ----------------------------------------------------------------------

NewFiniancialService.getLayout = (page: React.ReactElement) => (
  <DashboardLayout>{page}</DashboardLayout>
);

// ----------------------------------------------------------------------

export default function NewFiniancialService() {
  const { themeStretch } = useSettingsContext();

  return (
    <>
      <Head>
        <title> New Financial Service | ICSS Thrive</title>
      </Head>

      <Container maxWidth={themeStretch ? false : 'lg'}>
        <CustomBreadcrumbs
          heading="New Finacial Service"
          links={[
            {
              name: 'Admin',
              href: PATH_ADMIN.root,
            },
            {
              name: 'Access To Finance',
              href: PATH_ADMIN.businessMedia.library,
            },
            {
              name: 'New Finacial Service',
            },
          ]}
        />

        <NewFinanceForm />
      </Container>
    </>
  );
}
