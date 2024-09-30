// next
import Head from 'next/head';
// @mui
import { Container } from '@mui/material';
// routes
import NewFinanceForm from 'src/sections/@admin/finace/NewFinanceForm';
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

NewFiniancialService.getLayout = (page: React.ReactElement) => (
  <DashboardLayout>{page}</DashboardLayout>
);

// ----------------------------------------------------------------------

export default function NewFiniancialService() {
  const { themeStretch } = useSettingsContext();
  const { enqueueSnackbar } = useSnackbar();

  const [categories, setCategories] = useState([]);
  const [institutions, setInstitutions] = useState([]);

  const getCategories = useCallback(async () => {
    try {
      const _categories = await loader('financeCats');

      setCategories(_categories);
    } catch (error) {
      enqueueSnackbar(error.message || 'Could not fetch media categories', { variant: 'error' });
    }
  }, [enqueueSnackbar]);

  const getIntitutions = useCallback(async () => {
    try {
      const _ = await loader('financeInstitutions');

      setInstitutions(_);
    } catch (error) {
      enqueueSnackbar(error.message || 'Could not fetch institutions', { variant: 'error' });
    }
  }, [enqueueSnackbar]);

  useEffect(() => {
    getCategories();
    getIntitutions();

    return () => {};
  }, [getCategories, getIntitutions]);

  return (
    <>
      <Head>
        <title> New Financial Service | THRIVE</title>
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
          actions={[
            { title: 'Category', endpoint: 'financeCats', cb: getCategories },
            { title: 'Institution', endpoint: 'financeInstitutions', cb: getIntitutions },
          ]}
        />

        <NewFinanceForm categories={categories} institutions={institutions} />
      </Container>
    </>
  );
}
