import { useCallback, useEffect, useState } from 'react';
// next
import Head from 'next/head';
// @mui
import { Container, Stack } from '@mui/material';
// routes
import { useSnackbar } from 'notistack';
import { IQuery, IResDataMany } from 'src/@types/query';
import { loader } from 'src/actions';
import Pagination from 'src/components/pagination';
import SearchBar from 'src/components/search-bar';
// routes
import { IUserBusiness } from 'src/@types/business';
import DashboardLayout from 'src/layouts/dashboard/DashboardLayout';
import { Box } from '@mui/system';
import BusinesCard from 'src/sections/@dashboard/networking/BusinessCard';
import { PATH_DASHBOARD } from 'src/routes/paths';
import { useSettingsContext } from 'src/components/settings';
import CustomBreadcrumbs from 'src/components/custom-breadcrumbs/CustomBreadcrumbs';

// ----------------------------------------------------------------------

FileManagerPage.getLayout = (page: React.ReactElement) => <DashboardLayout>{page}</DashboardLayout>;

// ----------------------------------------------------------------------

export default function FileManagerPage() {
  const { themeStretch } = useSettingsContext();

  const [businesses, setBusineses] = useState<IResDataMany<IUserBusiness>>({
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
      const data = await loader('businesses', { sortBy: 'createdAt', order: 'DESC', ...query });

      setBusineses(data);

      setFetching(false);
    } catch (error) {
      enqueueSnackbar(error.message || error, { variant: 'error' });
    }
  }, [enqueueSnackbar, query]);

  const [industries, setIndustries] = useState([]);

  const getIndustries = useCallback(async () => {
    try {
      const _industries = await loader('industries', { sortBy: 'name', order: 'ASC' });

      setIndustries(_industries);
    } catch (error) {
      enqueueSnackbar(error.message || 'Could not fetch media Industries', { variant: 'error' });
    }
  }, [enqueueSnackbar]);

  useEffect(() => {
    getIndustries();
    return () => {};
  }, [getIndustries]);

  useEffect(() => {
    getEvents();

    return () => {};
  }, [getEvents, query]);

  return (
    <>
      <Head>
        <title>Marketplace - Businesses | Thrive</title>
      </Head>

      <Container maxWidth={themeStretch ? false : 'xl'}>
        <CustomBreadcrumbs
          heading="Businesses"
          links={[
            { name: 'Dashboard', href: PATH_DASHBOARD.root },
            { name: 'Marketplace' },
            { name: 'Businesses' },
          ]}
        />

        <Stack
          spacing={2.5}
          direction={{ xs: 'column', md: 'row' }}
          alignItems={{ xs: 'flex-end', md: 'center' }}
          justifyContent="space-between"
        >
          <SearchBar
            withDateFilter={false}
            onChange={handleQuery}
            onClearFilter={handleClearAll}
            searching={fetching}
            filterOptions={[
              {
                name: 'industryId',
                options: industries.map((_: any) => ({ label: _.name, value: _.id })),
                label: "Industries'",
              },
            ]}
            onChangeOption={(name, value) => setQuery({ filterBy: name, filter: value })}
          />

          {/* <FileChangeViewButton value={view} onChange={handleChangeView} /> */}
        </Stack>

        <Box
          gap={3}
          display="grid"
          gridTemplateColumns={{
            xs: 'repeat(1, 1fr)',
            sm: 'repeat(2, 1fr)',
            md: 'repeat(3, 1fr)',
            xl: 'repeat(4, 1fr)',
          }}
        >
          {businesses.records.map((business) => (
            <BusinesCard key={business.id} business={business} />
          ))}
        </Box>
        <Pagination
          totalPages={businesses.totalPages}
          onChange={(num) => handleQuery({ page: num })}
          currentPage={businesses.currentPage}
        />
      </Container>
    </>
  );
}

// ----------------------------------------------------------------------
