import { useCallback, useEffect, useState } from 'react';
// form
// next
import Head from 'next/head';
// @mui
import { Container, Stack } from '@mui/material';
// redux
import { loader } from 'src/actions';
// routes
import { useSnackbar } from 'notistack';
import { IQuery, IResDataMany } from 'src/@types/query';
import SearchBar from 'src/components/search-bar';
import FinanceList from 'src/sections/@dashboard/finance/FinanceList';
import { PATH_DASHBOARD } from '../../routes/paths';
// @types
// layouts
import DashboardLayout from '../../layouts/dashboard';
// components
import CustomBreadcrumbs from '../../components/custom-breadcrumbs';
// sections

// ----------------------------------------------------------------------

AccessFinance.getLayout = (page: React.ReactElement) => <DashboardLayout>{page}</DashboardLayout>;

// ----------------------------------------------------------------------

export default function AccessFinance() {
  const [services, setServices] = useState<IResDataMany<any>>({
    totalItems: 0,
    totalPages: 0,
    records: [],
    currentPage: 0,
  });

  const [fetching, setFetching] = useState(false);
  const [query, setQuery] = useState<IQuery>({});

  const handleQuery = (_query: IQuery) => setQuery({ ...query, ..._query });

  const handleClearAll = () => {
    setQuery({});
  };

  const { enqueueSnackbar } = useSnackbar();

  const getServices = useCallback(async () => {
    try {
      setFetching(true);
      const data = await loader('finance', { sortBy: 'createdAt', order: 'DESC', ...query });

      setServices(data);

      setFetching(false);
    } catch (error) {
      enqueueSnackbar(error.message || error, { variant: 'error' });
    }
  }, [enqueueSnackbar, query]);

  const [institutions, setInstitutions] = useState([]);
  const [categories, setCategories] = useState([]);

  const getInstitutions = useCallback(async () => {
    try {
      const _institutions = await loader('financeInstitutions', { sortBy: 'name', order: 'ASC' });

      setInstitutions(_institutions);
    } catch (error) {
      enqueueSnackbar(error.message || 'Could not fetch Institutions', { variant: 'error' });
    }
  }, [enqueueSnackbar]);

  const getCategories = useCallback(async () => {
    try {
      const _categories = await loader('financeCats', { sortBy: 'name', order: 'ASC' });

      setCategories(_categories);
    } catch (error) {
      enqueueSnackbar(error.message || 'Could not fetch Categories', { variant: 'error' });
    }
  }, [enqueueSnackbar]);

  useEffect(() => {
    getInstitutions();
    getCategories();
    return () => {};
  }, [getInstitutions, getCategories]);

  useEffect(() => {
    getServices();

    return () => {};
  }, [getServices, query]);

  return (
    <>
      <Head>
        <title> Access To Finance | ICSS Thrive</title>
      </Head>

      <Container maxWidth="xl">
        <CustomBreadcrumbs
          heading="Access To Finance"
          links={[{ name: 'Dashboard', href: PATH_DASHBOARD.root }, { name: 'Access To Finance' }]}
        />

        <Stack
          spacing={2}
          direction={{ xs: 'column', sm: 'row' }}
          alignItems={{ sm: 'center' }}
          justifyContent="space-between"
          sx={{ mb: 2 }}
        >
          <SearchBar
            withDateFilter={false}
            onChange={handleQuery}
            onClearFilter={handleClearAll}
            searching={fetching}
            filterOptions={[
              {
                name: 'institutionId',
                options: institutions.map((_: any) => ({ label: _.name, value: _.id })),
                label: "Institutions'",
              },
              {
                name: 'categoryId',
                options: categories.map((_: any) => ({ label: _.name, value: _.id })),
                label: "Categories'",
              },
            ]}
            onChangeOption={(name, value) => setQuery({ ...query, filterBy: name, filter: value })}
          />
        </Stack>

        {/* <Stack sx={{ mb: 3 }}>
            {!isDefault && (
              <Typography variant="body2" gutterBottom>
                <strong>{dataFiltered.length}</strong>
                &nbsp;events found
              </Typography>
            )}
          </Stack>  */}

        <FinanceList events={services.records} loading={fetching} />
      </Container>
    </>
  );
}
