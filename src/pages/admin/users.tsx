import { useCallback, useEffect, useState } from 'react';
// next
import Head from 'next/head';
// @mui
import {
  Card,
  Container,
  Divider,
  Tab,
  Table,
  TableBody,
  TableContainer,
  Tabs,
} from '@mui/material';
// routes
import { useSnackbar } from 'notistack';
import { IQuery, IResDataMany } from 'src/@types/query';
import { loader, updater } from 'src/actions';
import { approveUser, declineUser } from 'src/actions/admin/usersAction';
import Loading from 'src/components/loading';
import Pagination from 'src/components/pagination';
import { PATH_ADMIN } from '../../routes/paths';
// @types
import { IUserAccountGeneral } from '../../@types/user';
// _mock_
// layouts
import DashboardLayout from '../../layouts/admin';
// components
import CustomBreadcrumbs from '../../components/custom-breadcrumbs';
import Scrollbar from '../../components/scrollbar';
import { useSettingsContext } from '../../components/settings';
import {
  TableHeadCustom,
  TableNoData,
  TablePaginationCustom,
  useTable,
} from '../../components/table';
// sections
import { UserTableRow, UserTableToolbar } from '../../sections/@admin/user/list';

// ----------------------------------------------------------------------

const STATUS_OPTIONS = [
  { label: 'All', value: 'all' },
  { label: 'Pending Approval', value: 'pending' },
  { label: 'Approved', value: 'approved' },
  // { label: 'Declined', value: 'declined' },
  // { label: 'Banned', value: 'banned' },
];

const TABLE_HEAD = [
  { id: 'name', label: 'Name', align: 'left' },
  { id: 'email', label: 'Email', align: 'left' },
  { id: 'icssId', label: 'ICSS ID', align: 'left' },
  { id: 'role', label: 'Consortium', align: 'left' },
  { id: 'role', label: 'Reg Date', align: 'left' },
  // { id: 'isVerified', label: 'Verified', align: 'center' },
  { id: 'status', label: 'Status', align: 'left' },
  { id: '' },
];

// ----------------------------------------------------------------------

UserListPage.getLayout = (page: React.ReactElement) => <DashboardLayout>{page}</DashboardLayout>;

// ----------------------------------------------------------------------

export default function UserListPage() {
  const { order, orderBy, setPage, onSort } = useTable();

  const { themeStretch } = useSettingsContext();

  const [filterStatus, setFilterStatus] = useState('all');
  const [{ records, totalItems, totalPages, currentPage }, setUsers] = useState<
    IResDataMany<IUserAccountGeneral>
  >({
    totalItems: 0,
    totalPages: 0,
    records: [],
    currentPage: 0,
  });

  // const denseHeight = dense ? 52 : 72;

  const handleFilterStatus = (_: any, newValue: string) => {
    setPage(0);
    if (newValue !== 'all') setQuery({ ...query, filterBy: 'status', filter: newValue });
    else setQuery({});
    setFilterStatus(newValue);
  };

  const handleResetFilter = () => {
    setFilterStatus('all');
    setQuery({});
  };

  const { enqueueSnackbar } = useSnackbar();

  /* ----- States ------ */
  const [ngos, setNgos] = useState([]);
  const [fetching, setFetching] = useState(false);
  const [query, setQuery] = useState<IQuery>({});
  const onApproveUser = async (id: number, icssId: string) => {
    try {
      setFetching(true);
      const res = await approveUser({ icssId, id });
      await getUsers();
      enqueueSnackbar(res.data.message);
    } catch (err) {
      enqueueSnackbar(err.message || err, { color: 'error.main' });
    }
    setFetching(false);
  };
  const onDeclineUser = async (id: number) => {
    try {
      setFetching(true);
      const res = await declineUser(id);
      await getUsers();
      enqueueSnackbar(res.data.message);
    } catch (err) {
      enqueueSnackbar(err.message || err, { color: 'error.main' });
    }
    setFetching(false);
  };

  const getUsers = useCallback(async () => {
    try {
      setFetching(true);
      const data = await loader('users', { size: 20, ...query });

      setUsers(data);
    } catch (error) {
      enqueueSnackbar(error.message || error, { variant: 'error' });
    }
    setFetching(false);
  }, [enqueueSnackbar, query]);

  const handleQuery = (_query: IQuery) => setQuery({ ...query, ..._query });

  const getNgos = useCallback(async () => {
    try {
      const _ngos = await loader('ngos', { sortBy: 'name', order: 'ASC' });

      setNgos(_ngos);
    } catch (error) {
      enqueueSnackbar(error.message || 'Could not fetch media Ngos', { variant: 'error' });
    }
  }, [enqueueSnackbar]);

  useEffect(() => {
    getNgos();
    return () => {};
  }, [getNgos]);

  useEffect(() => {
    getUsers();

    return () => {};
  }, [getUsers, query]);

  return (
    <>
      <Head>
        <title> User: List | ICSS Thrive</title>
      </Head>

      <Container maxWidth={themeStretch ? false : 'xl'}>
        <CustomBreadcrumbs
          heading="User List"
          links={[
            { name: 'Admin', href: PATH_ADMIN.root },
            { name: 'Users', href: PATH_ADMIN.users },
            { name: 'List' },
          ]}
          actions={[
            { title: 'Ngo', endpoint: 'ngos', cb: getNgos },
            { title: 'Industry', endpoint: 'industries', cb: () => {} },
          ]}
        />

        <Card>
          <Tabs
            value={filterStatus}
            onChange={handleFilterStatus}
            sx={{
              px: 2,
              bgcolor: 'background.neutral',
            }}
          >
            {STATUS_OPTIONS.map((_) => (
              <Tab label={_.label} value={_.value} />
            ))}
          </Tabs>

          <Divider />

          <UserTableToolbar
            withDateFilter={false}
            // @ts-ignore
            onChange={handleQuery}
            onClearFilter={handleResetFilter}
            searching={fetching}
            filterOptions={[
              {
                name: 'ngoId',
                options: ngos.map((_: any) => ({ label: _.name, value: _.id })),
                label: "Partner Org'",
              },
            ]}
            onChangeOption={(name, value) => setQuery({ filterBy: name, filter: value })}
          />

          <TableContainer sx={{ position: 'relative', overflow: 'unset' }}>
            {/* <TableSelectedAction
              // dense={dense}
              numSelected={selected.length}
              rowCount={tableData.length}
              onSelectAllRows={(checked) =>
                onSelectAllRows(
                  checked,
                  tableData.map((row) => row.id)
                )
              }
              action={
                <Tooltip title="Delete">
                  <IconButton color="primary" onClick={handleOpenConfirm}>
                    <Iconify icon="eva:trash-2-outline" />
                  </IconButton>
                </Tooltip>
              }
            /> */}

            <Scrollbar>
              <Loading open={fetching} />
              <Table size="small" sx={{ minWidth: 800 }}>
                <TableHeadCustom
                  order={order}
                  orderBy={orderBy}
                  headLabel={TABLE_HEAD}
                  rowCount={totalItems}
                  onSort={(_) => console.log(_)}
                  // onSelectAllRows={(checked) =>
                  //   onSelectAllRows(
                  //     checked,
                  //     tableData.map((row) => row.id)
                  //   )
                  // }
                />

                <TableBody>
                  {records.map((row: any) => (
                    <UserTableRow
                      key={row.id}
                      row={row}
                      // onSelectRow={() => onSelectRow(row.id)}
                      onApprove={(icssId) => onApproveUser(row.id, icssId)}
                      onDecline={onDeclineUser}
                      // onEditRow={() => handleEditRow(row.name)}
                    />
                  ))}

                  {/* <TableEmptyRows
                    height={denseHeight}
                    emptyRows={emptyRows(page, rowsPerPage, tableData.length)}
                  /> */}

                  <TableNoData isNotFound={totalItems === 0} />
                </TableBody>
              </Table>
            </Scrollbar>
          </TableContainer>

          <Pagination
            withDivider
            sx={{ justifyContent: 'end' }}
            totalPages={totalPages}
            onChange={(num) => handleQuery({ page: num })}
            currentPage={currentPage}
          />
        </Card>
      </Container>
    </>
  );
}
