// next
import Head from 'next/head';
// @mui
import { Container } from '@mui/material';
// routes
import NewEventForm from 'src/sections/@admin/event/NewEventForm';
import { useSnackbar } from 'notistack';
import { useCallback, useEffect, useState } from 'react';
import { loader } from 'src/actions';
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
  const { enqueueSnackbar } = useSnackbar();

  const [categories, setCategories] = useState([]);
  const [organizers, setOrganizers] = useState([]);

  const getCategories = useCallback(async () => {
    try {
      const _categories = await loader('eventsCats');

      setCategories(_categories);
    } catch (error) {
      enqueueSnackbar(error.message || 'Could not fetch media categories', { variant: 'error' });
    }
  }, [enqueueSnackbar]);

  const getOrganizers = useCallback(async () => {
    try {
      const _categories = await loader('eventsOrganizers');

      setOrganizers(_categories);
    } catch (error) {
      enqueueSnackbar(error.message || 'Could not fetch event categories', { variant: 'error' });
    }
  }, [enqueueSnackbar]);

  useEffect(() => {
    getCategories();
    getOrganizers();

    return () => {};
  }, [getCategories, getOrganizers]);

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
          actions={[
            { title: 'Category', endpoint: 'eventsCats', cb: getCategories },
            { title: 'Organizer', endpoint: 'eventsOrganizers', cb: getOrganizers },
          ]}
        />

        <NewEventForm categories={categories} organizers={organizers} />
      </Container>
    </>
  );
}
