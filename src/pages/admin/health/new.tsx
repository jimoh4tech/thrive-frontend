// next
import Head from 'next/head';
// @mui
import { Container } from '@mui/material';
// routes
import NewHealthForm from 'src/sections/@admin/health/NewHealthForm';
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

  const getCategories = useCallback(async () => {
    try {
      const _categories = await loader('healthCats');

      setCategories(_categories);
    } catch (error) {
      enqueueSnackbar(error.message || 'Could not fetch media categories', { variant: 'error' });
    }
  }, [enqueueSnackbar]);

  useEffect(() => {
    getCategories();

    return () => {};
  }, [getCategories]);

  return (
    <>
      <Head>
        <title> Health and Wellbeing | Thrive</title>
      </Head>

      <Container maxWidth={themeStretch ? false : 'lg'}>
        <CustomBreadcrumbs
          heading="Add New Health Provider"
          links={[
            {
              name: 'Admin',
              href: PATH_ADMIN.root,
            },
            {
              name: 'Health and Wellbeing',
              href: PATH_ADMIN.health.root,
            },
            {
              name: 'Add New Media',
            },
          ]}
          actions={[{ title: 'Category', endpoint: 'healthCats', cb: getCategories }]}
        />

        <NewHealthForm categories={categories} />
      </Container>
    </>
  );
}
