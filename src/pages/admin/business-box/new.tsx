// next
import Head from 'next/head';
// @mui
import { Container } from '@mui/material';
// routes
import NewTemplateForm from 'src/sections/@admin/template/NewTemplateForm';
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
      const _categories = await loader('templateCats');

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
        <title> Business Box | Thrive</title>
      </Head>

      <Container maxWidth={themeStretch ? false : 'lg'}>
        <CustomBreadcrumbs
          heading="Add New Template"
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
              name: 'Add New Template',
            },
          ]}
          actions={[{ title: 'Category', endpoint: 'templateCats', cb: getCategories }]}
        />

        <NewTemplateForm categories={categories} />
      </Container>
    </>
  );
}
