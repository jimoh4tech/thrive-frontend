// next
import Head from 'next/head';
// @mui
import { Container } from '@mui/material';
// routes
import NewMediaForm from 'src/sections/@admin/media/NewMediaForm';
import { PATH_ADMIN } from '../../../routes/paths';
// layouts
import DashboardLayout from '../../../layouts/admin';
// components
import CustomBreadcrumbs from '../../../components/custom-breadcrumbs';
import { useSettingsContext } from '../../../components/settings';
// sections

// ----------------------------------------------------------------------

BlogNewPostPage.getLayout = (page: React.ReactElement) => <DashboardLayout>{page}</DashboardLayout>;

// ----------------------------------------------------------------------

export default function BlogNewPostPage() {
  const { themeStretch } = useSettingsContext();

  return (
    <>
      <Head>
        <title> Business Media Library | ICSS Thrive</title>
      </Head>

      <Container maxWidth={themeStretch ? false : 'lg'}>
        <CustomBreadcrumbs
          heading="Add New Media"
          links={[
            {
              name: 'Admin',
              href: PATH_ADMIN.root,
            },
            {
              name: 'Business Media Library',
              href: PATH_ADMIN.businessMedia.library,
            },
            {
              name: 'Add New Media',
            },
          ]}
        />

        <NewMediaForm />
      </Container>
    </>
  );
}
