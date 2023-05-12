// next
import Head from 'next/head';
// @mui
import { Container } from '@mui/material';
// routes
import NewEventForm from 'src/sections/@admin/event/NewEventForm';
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
        <title> New Event | ICSS Thrive</title>
      </Head>
      <Container maxWidth={themeStretch ? false : 'lg'}>
        <CustomBreadcrumbs
          heading="Add New Event"
          links={[
            {
              name: 'Admin',
              href: PATH_ADMIN.root,
            },
            {
              name: 'Access To Event',
              href: PATH_ADMIN.businessMedia.library,
            },
            {
              name: 'Add New Event',
            },
          ]}
        />

        <NewEventForm />
      </Container>
    </>
  );
}
