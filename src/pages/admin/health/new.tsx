// next
import Head from 'next/head';
// @mui
import { Container } from '@mui/material';
// routes
import NewTemplateForm from 'src/sections/@admin/template/NewTemplateForm';
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
        <title> Business Box | ICSS Thrive</title>
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
              name: 'Business Box',
              href: PATH_ADMIN.businessMedia.library,
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
