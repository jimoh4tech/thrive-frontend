import { useCallback, useEffect, useState } from 'react';
// next
import Head from 'next/head';
// @mui
import { Container, Stack } from '@mui/material';
// routes
import { useSnackbar } from 'notistack';
import { IHealth } from 'src/@types/health';
import { IQuery, IResDataMany } from 'src/@types/query';
import { loader } from 'src/actions';
import Pagination from 'src/components/pagination';
import SearchBar from 'src/components/search-bar';
import HealthList from 'src/sections/@dashboard/health/HealthList';
import { PATH_DASHBOARD } from '../../routes/paths';
// utils
// layouts
import DashboardLayout from '../../layouts/dashboard';
// @types
// components
import CustomBreadcrumbs from '../../components/custom-breadcrumbs';
import { useSettingsContext } from '../../components/settings';
// sections

// ----------------------------------------------------------------------

FileManagerPage.getLayout = (page: React.ReactElement) => <DashboardLayout>{page}</DashboardLayout>;

// ----------------------------------------------------------------------

export default function FileManagerPage() {
  const { themeStretch } = useSettingsContext();

  const [health, setEvents] = useState<IResDataMany<IHealth>>({
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

  const getEvents = useCallback(async () => {
    try {
      setFetching(true);
      const data = await loader('health', { sortBy: 'createdAt', order: 'DESC', ...query });

      setEvents(data);

      setFetching(false);
    } catch (error) {
      enqueueSnackbar(error.message || error, { variant: 'error' });
    }
  }, [enqueueSnackbar, query]);

  useEffect(() => {
    getEvents();

    return () => {};
  }, [getEvents, query]);

  return (
    <>
      <Head>
        <title> Health & Wellbeing | ICSS Thrive</title>
      </Head>

      <Container maxWidth={themeStretch ? false : 'xl'}>
        <CustomBreadcrumbs
          heading="Health & Wellbeing"
          links={[
            {
              name: 'Dashboard',
              href: PATH_DASHBOARD.root,
            },
            { name: 'Health & Wellbeing' },
          ]}
        />

        <Stack
          spacing={2.5}
          direction={{ xs: 'column', md: 'row' }}
          alignItems={{ xs: 'flex-end', md: 'center' }}
          justifyContent="space-between"
          sx={{ mb: 5 }}
        >
          <SearchBar
            withDateFilter={false}
            onChange={handleQuery}
            onClearFilter={handleClearAll}
            searching={fetching}
          />

          {/* <FileChangeViewButton value={view} onChange={handleChangeView} /> */}
        </Stack>

        <HealthList institutions={health.records} loading={fetching} />

        <Pagination
          totalPages={health.totalPages}
          onChange={(num) => handleQuery({ page: num })}
          currentPage={health.currentPage}
        />
      </Container>
    </>
  );
}

// ----------------------------------------------------------------------
