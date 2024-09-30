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
  Typography,
} from '@mui/material';
// routes
import { useSnackbar } from 'notistack';
import { IQuery, IResDataMany } from 'src/@types/query';
import { loader } from 'src/actions';
import { approveUser, declineUser, suspendUser } from 'src/actions/admin/usersAction';
import Loading from 'src/components/loading';
import Pagination from 'src/components/pagination';
import Label from 'src/components/label/Label';
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
import { TableHeadCustom, TableNoData, useTable } from '../../components/table';
// sections
import { UserTableRow, UserTableToolbar } from '../../sections/@admin/user/list';

// ----------------------------------------------------------------------

const STATUS_OPTIONS = [
  { label: 'All', value: 'all' },
  { label: 'Approved', value: 'approved' },
  { label: 'Declined', value: 'declined' },
  { label: 'Suspended', value: 'pending' },
  { label: 'Premium Users', value: 'hasPremiumSub' },
  // { label: 'Banned', value: 'banned' },
];

const TABLE_HEAD = [
  { id: 'name', label: 'Name', align: 'left' },
  { id: 'email', label: 'Email', align: 'left' },
  { id: 'phone', label: 'Phone', align: 'left' },
  { id: 'ngo', label: 'Consortium', align: 'left' },
  { id: 'createdAt', label: 'Reg Date', align: 'left' },
  // { id: 'isVerified', label: 'Verified', align: 'center' },
  { id: 'status', label: 'Status', align: 'left' },
  { id: '' },
];

// ----------------------------------------------------------------------

UserListPage.getLayout = (page: React.ReactElement) => <DashboardLayout>{page}</DashboardLayout>;

// ----------------------------------------------------------------------

export default function UserListPage() {
  const { order, orderBy } = useTable();

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
  const onApproveUser = async (id: number) => {
    try {
      setFetching(true);
      const res = await approveUser({ id });
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
  const onSuspendUser = async (id: number) => {
    try {
      setFetching(true);
      const res = await suspendUser(id);
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
      console.log({ data, ...query });
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
      enqueueSnackbar(error.message || 'Could not fetch Ngos', { variant: 'error' });
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
        <title> User: List | THRIVE</title>
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
              <Tab
                key={_.value}
                label={
                  <Typography>
                    {_.label}{' '}
                    {filterStatus === _.value && !fetching && (
                      <Label color="primary">{totalItems}</Label>
                    )}
                  </Typography>
                }
                value={_.value}
              />
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
                label: 'Filter by Partner Org',
              },
            ]}
            onChangeOption={(name, value) => {
              setFilterStatus('all');
              setQuery({ ...query, filterBy: name, filter: value });
            }}
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
                  {/* {Array.from(new Map(records.map(rec => [rec.id, rec])).values());} */}
                  {Array.from(new Map(records?.map((rec) => [rec.id, rec])).values())?.map(
                    (row: any) => (
                      <UserTableRow
                        key={row.id}
                        row={row}
                        // onSelectRow={() => onSelectRow(row.id)}
                        onApprove={onApproveUser}
                        onDecline={onDeclineUser}
                        onSuspend={onSuspendUser}
                        // onEditRow={() => handleEditRow(row.name)}
                      />
                    )
                  )}

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
