// next
import Head from 'next/head';
// @mui
import { Container, Stack } from '@mui/material';
// routes
import { PATH_ADMIN } from 'src/routes/paths';
// layouts
import DashboardLayout from 'src/layouts/admin';
// components
import CustomBreadcrumbs from 'src/components/custom-breadcrumbs';
import { useSettingsContext } from 'src/components/settings';
// sections
import { useCallback, useEffect, useState } from 'react';
// next
// routes
import { useSnackbar } from 'notistack';
import { IHealth } from 'src/@types/health';
import { IQuery, IResDataMany } from 'src/@types/query';
import { loader } from 'src/actions';
import Pagination from 'src/components/pagination';
import SearchBar from 'src/components/search-bar';
import HealthList from 'src/sections/@dashboard/health/HealthList';
// utils
// layouts
// @types
// components

// ----------------------------------------------------------------------

BusinessBox.getLayout = (page: React.ReactElement) => <DashboardLayout>{page}</DashboardLayout>;

// ----------------------------------------------------------------------

export default function BusinessBox() {
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
        <title> Business Box | ICSS Thrive</title>
      </Head>

      <Container maxWidth={themeStretch ? false : 'lg'}>
        <CustomBreadcrumbs
          heading="Business Box"
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
              name: 'List',
            },
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
