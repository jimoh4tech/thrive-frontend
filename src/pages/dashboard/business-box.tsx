import { useCallback, useEffect, useState } from 'react';
// next
import Head from 'next/head';
// @mui
import { Button, Container, Pagination, Stack } from '@mui/material';
// routes
import { useSnackbar } from 'notistack';
import ReactLoading from 'react-loading';
import { IQuery, IResDataMany } from 'src/@types/query';
import { loader } from 'src/actions';
import { FileFilterButton, FileFilterName, FileGridView } from 'src/sections/@dashboard/file';
import { IMedia } from 'src/@types/media';
import { PATH_DASHBOARD } from '../../routes/paths';
// utils
// layouts
import DashboardLayout from '../../layouts/dashboard';
// @types
// components
import CustomBreadcrumbs from '../../components/custom-breadcrumbs';
import DateRangePicker, { useDateRangePicker } from '../../components/date-range-picker';
import Iconify from '../../components/iconify';
import { useSettingsContext } from '../../components/settings';
import { useTable } from '../../components/table';
// sections

// ----------------------------------------------------------------------

FileManagerPage.getLayout = (page: React.ReactElement) => <DashboardLayout>{page}</DashboardLayout>;

// ----------------------------------------------------------------------

export default function FileManagerPage() {
  const table = useTable({ defaultRowsPerPage: 10 });

  const {
    startDate,
    endDate,
    onChangeStartDate,
    onChangeEndDate,
    open: openPicker,
    onOpen: onOpenPicker,
    onClose: onClosePicker,
    onReset: onResetPicker,
    isSelected: isSelectedValuePicker,
    isError,
    shortLabel,
  } = useDateRangePicker(null, null);

  const { themeStretch } = useSettingsContext();

  const [filterName, setFilterName] = useState('');

  const [media, setMedia] = useState<IResDataMany<IMedia>>({
    totalItems: 0,
    totalPages: 0,
    records: [],
    currentPage: 0,
  });

  const [fetching, setFetching] = useState(false);
  const [query, setQuery] = useState<IQuery>({});

  const [filterType, setFilterType] = useState<string[]>([]);

  const isFiltered = !!filterName || !!filterType.length || (!!startDate && !!endDate);

  const handleQuery = (_query: IQuery) => setQuery({ ...query, ..._query });

  const handleFilterName = (event: React.ChangeEvent<HTMLInputElement>) => {
    table.setPage(0);
    setFilterName(event.target.value);

    handleQuery({ q: event.target.value });
  };

  const handleChangeStartDate = (newValue: Date | null) => {
    table.setPage(0);
    onChangeStartDate(newValue);
    handleQuery({ startDate: newValue || undefined });
  };

  const handleChangeEndDate = (newValue: Date | null) => {
    table.setPage(0);
    onChangeEndDate(newValue);
    handleQuery({ endDate: newValue || undefined });
  };

  const handleClearAll = () => {
    if (onResetPicker) {
      onResetPicker();
    }
    setFilterName('');
    setFilterType([]);
    setQuery({});
  };

  const { enqueueSnackbar } = useSnackbar();

  const getMedia = useCallback(async () => {
    try {
      setFetching(true);
      const data: IResDataMany<IMedia> = await loader('templateLibrary', {
        sortBy: 'createdAt',
        order: 'DESC',
        ...query,
      });

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
        <title> Business Box | Thrive</title>
      </Head>

      <Container maxWidth={themeStretch ? false : 'xl'}>
        <CustomBreadcrumbs
          heading="Business Box"
          links={[
            {
              name: 'Dashboard',
              href: PATH_DASHBOARD.root,
            },
            { name: 'Business Box' },
          ]}
        />

        <Stack
          spacing={2.5}
          direction={{ xs: 'column', md: 'row' }}
          alignItems={{ xs: 'flex-end', md: 'center' }}
          justifyContent="space-between"
          sx={{ mb: 5 }}
        >
          <Stack
            spacing={1}
            direction={{ xs: 'column', md: 'row' }}
            alignItems={{ md: 'center' }}
            sx={{ width: 1 }}
          >
            <FileFilterName filterName={filterName} onFilterName={handleFilterName} />

            <Stack direction={{ xs: 'column', sm: 'row' }} spacing={1}>
              <>
                <FileFilterButton
                  isSelected={!!isSelectedValuePicker}
                  startIcon={<Iconify icon="eva:calendar-fill" />}
                  onClick={onOpenPicker}
                >
                  {isSelectedValuePicker ? shortLabel : 'Select Date'}
                </FileFilterButton>

                <DateRangePicker
                  variant="calendar"
                  startDate={startDate}
                  endDate={endDate}
                  onChangeStartDate={handleChangeStartDate}
                  onChangeEndDate={handleChangeEndDate}
                  open={openPicker}
                  onClose={onClosePicker}
                  isSelected={isSelectedValuePicker}
                  isError={isError}
                />
              </>

              {isFiltered && (
                <Button
                  variant="soft"
                  color="error"
                  onClick={handleClearAll}
                  startIcon={<Iconify icon="eva:trash-2-outline" />}
                >
                  Clear
                </Button>
              )}
              {fetching && <ReactLoading type="spokes" color="grey" width={25} height={25} />}
            </Stack>
          </Stack>

          {/* <FileChangeViewButton value={view} onChange={handleChangeView} /> */}
        </Stack>

        <FileGridView data={media.records} dataFiltered={media.records} />

        <Stack direction="row" justifyContent="center" mt={4}>
          <Pagination
            count={media.totalPages}
            onChange={(e, num) => handleQuery({ page: num })}
            page={media.currentPage}
          />{' '}
          {fetching && <ReactLoading type="spokes" color="grey" width={25} height={25} />}
        </Stack>
      </Container>
    </>
  );
}

// ----------------------------------------------------------------------
