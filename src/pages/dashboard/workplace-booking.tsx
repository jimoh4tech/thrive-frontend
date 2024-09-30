import React from 'react';
// next
import Head from 'next/head';
// @mui
import { Container, Stack, Typography } from '@mui/material';
// routes
// import { useSnackbar } from 'notistack';
// import { customLoader } from 'src/actions';
// import SearchBar from 'src/components/search-bar';
// routes
// import { Box } from '@mui/system';
// import { IWorkspace, IWorkspaceQuery, IWorkspaceResData } from 'src/@types/workspace';
// import { SkeletonProductItem } from 'src/components/skeleton';
import DashboardLayout from 'src/layouts/dashboard/DashboardLayout';
// import WorkspaceCard from 'src/sections/@dashboard/workspace/WorkspaceCard';
// import Pagination from 'src/components/pagination';
import CustomBreadcrumbs from '../../components/custom-breadcrumbs';
import { useSettingsContext } from '../../components/settings';
import { PATH_DASHBOARD } from '../../routes/paths';
// @types

// ----------------------------------------------------------------------

// ----------------------------------------------------------------------

FileManagerPage.getLayout = (page: React.ReactElement) => <DashboardLayout>{page}</DashboardLayout>;

// ----------------------------------------------------------------------

export default function FileManagerPage() {
  const { themeStretch } = useSettingsContext();

  // const [workspaces, setWorkspaces] = useState<IWorkspaceResData<IWorkspace>>({
  //   count: 0,
  //   results: [],
  // });

  // const [categories, setCategories] = useState([]);
  // const [fetching, setFetching] = useState(false);
  // const [query, setQuery] = useState<IWorkspaceQuery>({});

  // const handleQuery = (_query: IWorkspaceQuery) => setQuery({ ...query, ..._query });

  // const handleClearAll = () => {
  //   setQuery({});
  // };

  // const { enqueueSnackbar } = useSnackbar();

  // const getBusinesses = useCallback(async () => {
  //   try {
  //     setFetching(true);
  //     const data = await customLoader('workspace', {
  //       sortBy: 'createdAt',
  //       order: 'DESC',
  //       ...query,
  //     });

  //     setWorkspaces(data);

  //     setFetching(false);
  //   } catch (error) {
  //     enqueueSnackbar(error.message || error, { variant: 'error' });
  //   }
  // }, [enqueueSnackbar, query]);

  // const getCategories = useCallback(async () => {
  //   try {
  //     const _ = await customLoader('workSpaceCat');

  //     setCategories(_);
  //   } catch (error) {
  //     enqueueSnackbar(error.message || 'Could not fetch event categories', { variant: 'error' });
  //   }
  // }, [enqueueSnackbar]);

  // useEffect(() => {
  //   getCategories();

  //   return () => {};
  // }, [getCategories]);

  // useEffect(() => {
  //   getBusinesses();

  //   return () => {};
  // }, [getBusinesses, query]);

  return (
    <>
      <Head>
        <title> Workplace Booking | THRIVE</title>
      </Head>

      <Container maxWidth={themeStretch ? false : 'xl'}>
        <CustomBreadcrumbs
          heading="Workplace Booking"
          links={[{ name: 'Dashboard', href: PATH_DASHBOARD.root }, { name: 'Workplace Booking' }]}
        />

        <Stack
          sx={{
            height: 400,
            justifyContent: 'center',
            alignItems: 'center',
            my: 6,
          }}
        >
          <Typography variant="h2"> Coming soon!</Typography>
        </Stack>

        {/* <Stack
          spacing={2.5}
          direction={{ xs: 'column', md: 'row' }}
          alignItems={{ xs: 'flex-end', md: 'center' }}
          justifyContent="space-between"
        >
          <SearchBar
            withDateFilter={false}
            // @ts-ignore
            onChange={({ q: city }) => handleQuery({ city })}
            onClearFilter={handleClearAll}
            searching={fetching}
            filterOptions={[
              {
                name: 'category',
                options: categories.map((_: any) => ({ label: _.title, value: _.id })),
              },
            ]}
            onChangeOption={(name, value) => setQuery({ [name]: value })}
          />
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
          {workspaces.results.map((bus, index) =>
            bus ? (
              <WorkspaceCard key={bus.id} workspace={bus} />
            ) : (
              <SkeletonProductItem key={index} />
            )
          )}
        </Box>
        <Pagination
          totalPages={workspaces.count / 10}
          onChange={(num) => handleQuery({ page: num })}
          currentPage={query.page || 1}
          loading={fetching}
        /> */}
      </Container>
    </>
  );
}

// ----------------------------------------------------------------------
