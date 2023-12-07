import { useCallback, useEffect, useState } from 'react';
// next
import Head from 'next/head';
// @mui
import { Card, Container, Stack, Table, TableBody, TableContainer } from '@mui/material';
// routes
import { useSnackbar } from 'notistack';
import { IQuery, IResDataMany } from 'src/@types/query';
import { loader } from 'src/actions';
import Pagination from 'src/components/pagination';
import SearchBar from 'src/components/search-bar';
// routes
import { IUserBusiness } from 'src/@types/business';
import Loading from 'src/components/loading';
import DashboardLayout from 'src/layouts/dashboard/DashboardLayout';
import DirectoryTableRow from 'src/sections/@dashboard/directory/DirectoryTableRow';
import CustomBreadcrumbs from '../../components/custom-breadcrumbs';
import { useSettingsContext } from '../../components/settings';
import { PATH_DASHBOARD } from '../../routes/paths';
// @types
// _mock_
// layouts
// components
import Scrollbar from '../../components/scrollbar';
import { TableHeadCustom, TableNoData } from '../../components/table';
// sections

// ----------------------------------------------------------------------

const ROLE = ['all', 'member', 'partner', 'admin'];

const TABLE_HEAD = [
  { id: 'name', label: 'Business Name', align: 'left' },
  { id: 'address', label: 'Address', align: 'left' },
  { id: 'slug', label: 'Location', align: 'left' },
  { id: 'industry', label: 'Industry', align: 'left' },
  { id: '' },
];

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

  const getBusinesses = useCallback(async () => {
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
    getBusinesses();

    return () => {};
  }, [getBusinesses, query]);

  return (
    <>
      <Head>
        <title> Directory Listing | Thrive</title>
      </Head>

      <Container maxWidth={themeStretch ? false : 'xl'}>
        <CustomBreadcrumbs
          heading="Directory Listing"
          links={[{ name: 'Dashboard', href: PATH_DASHBOARD.root }, { name: 'Directory Listing' }]}
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

        <Card>
          <TableContainer sx={{ position: 'relative', overflow: 'unset' }}>
            <Scrollbar>
              <Loading open={fetching} />
              <Table size="small" sx={{ minWidth: 800 }}>
                <TableHeadCustom headLabel={TABLE_HEAD} rowCount={businesses.totalItems} />

                <TableBody>
                  {businesses.records.map((row, i) => (
                    <DirectoryTableRow key={i} row={row} />
                  ))}

                  {/* <TableEmptyRows
                    height={denseHeight}
                    emptyRows={emptyRows(page, rowsPerPage, tableData.length)}
                  /> */}

                  <TableNoData isNotFound={businesses.totalItems < 1} />
                </TableBody>
              </Table>
            </Scrollbar>
          </TableContainer>
          <Pagination
            withDivider
            sx={{ justifyContent: 'end' }}
            totalPages={businesses.totalPages}
            onChange={(num) => handleQuery({ page: num })}
            currentPage={businesses.currentPage}
          />
        </Card>
      </Container>
    </>
  );
}

// ----------------------------------------------------------------------
