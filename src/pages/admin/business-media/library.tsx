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
// sections
import { useCallback, useEffect, useState } from 'react';

// routes
import { useSnackbar } from 'notistack';
import { IMedia } from 'src/@types/media';
import { IQuery, IResDataMany } from 'src/@types/query';
import { loader } from 'src/actions';
import Pagination from 'src/components/pagination';
import SearchBar from 'src/components/search-bar';
import { FileGridView } from 'src/sections/@dashboard/file';
import { deleteBusinessMedia } from 'src/actions/admin/usersAction';
// utils
// layouts
// @types
// components
// sections

// ----------------------------------------------------------------------

BusinessBox.getLayout = (page: React.ReactElement) => <DashboardLayout>{page}</DashboardLayout>;

// ----------------------------------------------------------------------

export default function BusinessBox() {
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

  const handleDelete = async (id: number) => {
    try {
      setFetching(true);
      const res = await deleteBusinessMedia(id);
      await getMedia();
      enqueueSnackbar(res.data.message);
    } catch (err) {
      enqueueSnackbar(err.message || err, { color: 'error.main' });
    }
    setFetching(false);
  };

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
        <title> Business Media | Thrive</title>
      </Head>

      <Container>
        <CustomBreadcrumbs
          heading="Business Media"
          links={[
            {
              name: 'Admin',
              href: PATH_ADMIN.root,
            },
            {
              name: 'Business Media',
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
          <SearchBar onChange={handleQuery} onClearFilter={handleClearAll} searching={fetching} />

          {/* <FileChangeViewButton value={view} onChange={handleChangeView} /> */}
        </Stack>

        <FileGridView onDelete={handleDelete} dataFiltered={media.records} />

        <Pagination
          totalPages={media.totalPages}
          onChange={(num) => handleQuery({ page: num })}
          currentPage={media.currentPage}
        />
      </Container>
    </>
  );
}
