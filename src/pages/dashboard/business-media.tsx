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
import { FileGridView } from 'src/sections/@dashboard/file';
import { IMedia } from 'src/@types/media';
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

  const [media, setMedia] = useState<IResDataMany<IMedia>>({
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

  const getMedia = useCallback(async () => {
    try {
      setFetching(true);
      const data = await loader('mediaLibrary', { sortBy: 'createdAt', order: 'DESC', ...query });

      setMedia(data);

      setFetching(false);
    } catch (error) {
      enqueueSnackbar(error.message || error, { variant: 'error' });
    }
  }, [enqueueSnackbar, query]);

  useEffect(() => {
    getMedia();

    return () => {};
  }, [getMedia, query]);

  return (
    <>
      <Head>
        <title> Business Media Library | Thrive</title>
      </Head>

      <Container maxWidth={themeStretch ? false : 'xl'}>
        <CustomBreadcrumbs
          heading="Business Media Library"
          links={[
            {
              name: 'Dashboard',
              href: PATH_DASHBOARD.root,
            },
            { name: 'Business Media Library' },
          ]}
        />

        <Stack
          spacing={2.5}
          direction={{ xs: 'column', md: 'row' }}
          alignItems={{ xs: 'flex-end', md: 'center' }}
          justifyContent="space-between"
          sx={{ mb: 5 }}
        >
          <SearchBar onChange={handleQuery} onClearFilter={handleClearAll} searching={fetching} />

          {/* <FileChangeViewButton value={view} onChange={handleChangeView} /> */}
        </Stack>

        <FileGridView data={media.records} dataFiltered={media.records} />

        <Pagination
          totalPages={media.totalPages}
          onChange={(num) => handleQuery({ page: num })}
          currentPage={media.currentPage}
        />
      </Container>
    </>
  );
}

// ----------------------------------------------------------------------
