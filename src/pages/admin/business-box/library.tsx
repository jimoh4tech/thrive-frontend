// next
import Head from 'next/head';
// @mui
import { Button, Container, Pagination, Stack } from '@mui/material';
// routes
import { PATH_ADMIN } from 'src/routes/paths';
// layouts
import DashboardLayout from 'src/layouts/admin';
// components
import ReactLoading from 'react-loading';
import CustomBreadcrumbs from 'src/components/custom-breadcrumbs';
import { useSettingsContext } from 'src/components/settings';
import { useTable } from 'src/components/table';
// sections
import { useCallback, useEffect, useState } from 'react';
// routes
import { useSnackbar } from 'notistack';
import { IMedia } from 'src/@types/media';
// @types
import { IQuery, IResDataMany } from 'src/@types/query';
// actions
import { loader } from 'src/actions';
// components
import { DateRangePicker } from '@mui/lab';
import { useDateRangePicker } from 'src/components/date-range-picker';
import Iconify from 'src/components/iconify/Iconify';
import { FileFilterButton, FileFilterName, FileGridView } from 'src/sections/@dashboard/file';

// ----------------------------------------------------------------------

BusinessBox.getLayout = (page: React.ReactElement) => <DashboardLayout>{page}</DashboardLayout>;

// ----------------------------------------------------------------------

export default function BusinessBox() {
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
        <title> Business Box | ICSS Thrive</title>
      </Head>

      <Container>
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
