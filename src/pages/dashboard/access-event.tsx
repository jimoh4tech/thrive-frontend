import orderBy from 'lodash/orderBy';
import { useState } from 'react';
// form
import { useForm } from 'react-hook-form';
// next
import Head from 'next/head';
import useSWR from 'swr';
// @mui
import { Container, Stack } from '@mui/material';
// redux
import { fetcher } from 'src/actions';
// routes
import { IEvent, IEventFilter } from 'src/@types/events';
import EventList from 'src/sections/@dashboard/event/EventList';
import EventSearch from 'src/sections/@dashboard/event/EventSearch';
import { PATH_DASHBOARD } from '../../routes/paths';
// @types
// layouts
import DashboardLayout from '../../layouts/dashboard';
// components
import CustomBreadcrumbs from '../../components/custom-breadcrumbs';
import FormProvider from '../../components/hook-form';
import { useSettingsContext } from '../../components/settings';
// sections

// ----------------------------------------------------------------------

EcommerceShopPage.getLayout = (page: React.ReactElement) => (
  <DashboardLayout>{page}</DashboardLayout>
);

// ----------------------------------------------------------------------

export default function EcommerceShopPage() {
  const { themeStretch } = useSettingsContext();

  const [openFilter, setOpenFilter] = useState(false);
  const [openDialog, setOpenDialog] = useState(false);

  const defaultValues = {
    gender: [],
    category: 'All',
    colors: [],
    priceRange: [0, 200],
    rating: '',
    sortBy: 'featured',
  };

  const methods = useForm<IEventFilter>({
    defaultValues,
  });

  const [searchVal, setSearchVal] = useState('');

  const {
    data: { records: events = [], totalItems } = { records: [], totalItems: 0 },
    error,
    isLoading,
    mutate,
  } = useSWR(`/events${searchVal ? `?q=${searchVal}` : ''}`, fetcher);
  const onSearch = (val: string) => {
    setSearchVal(val);
  };

  const { reset, watch } = methods;

  const values = watch();

  const dataFiltered = applyFilter(events, values);

  const handleResetFilter = () => {
    reset();
  };

  const handleOpenFilter = () => {
    setOpenFilter(true);
  };

  const handleCloseFilter = () => {
    setOpenFilter(false);
  };

  const handleApply = () => {};

  return (
    <>
      <Head>
        <title> Access To Events | ICSS Thrive</title>
      </Head>

      <Container maxWidth="xl">
        <FormProvider methods={methods}>
          <CustomBreadcrumbs
            heading="Access To Events"
            links={[{ name: 'Dashboard', href: PATH_DASHBOARD.root }, { name: 'Access To Events' }]}
          />

          <Stack
            spacing={2}
            direction={{ xs: 'column', sm: 'row' }}
            alignItems={{ sm: 'center' }}
            justifyContent="space-between"
            sx={{ mb: 2 }}
          >
            <EventSearch onInputChange={onSearch} onViewEvent={(event) => {}} searchResults={[]} />

            {/* <Stack direction="row" spacing={1} flexShrink={0} sx={{ my: 1 }}>
              <ShopFilterDrawer
                open={openFilter}
                onOpen={handleOpenFilter}
                onClose={handleCloseFilter}
                onResetFilter={handleResetFilter}
              />

              <Shopeventsort />
            </Stack>
            */}
          </Stack>

          {/* <Stack sx={{ mb: 3 }}>
            {!isDefault && (
              <Typography variant="body2" gutterBottom>
                <strong>{dataFiltered.length}</strong>
                &nbsp;events found
              </Typography>
            )}
          </Stack>  */}

          <EventList events={dataFiltered} loading={isLoading} />

          {/* <ConfirmDialog
            open={openDialog}
            onClose={()=>setOpenDialog(false)}
            title="Delete"
            content={
              <>
                Are you sure want to delete <strong> {table.selected.length} </strong> items?
              </>
            }
            action={
              <Button
                variant="contained"
                color="error"
                onClick={() => 
                  handleApply()
                }
              >
                APPLY
              </Button>
            }
          /> */}
        </FormProvider>
      </Container>
    </>
  );
}

// ----------------------------------------------------------------------

function applyFilter(events: IEvent[], filters: IEventFilter) {
  const { type, priceRange, organizers, category, sortBy } = filters;

  const min = priceRange[0];

  const max = priceRange[1];

  // SORT BY
  if (sortBy === 'featured') {
    events = orderBy(events, ['sold'], ['desc']);
  }

  if (sortBy === 'newest') {
    events = orderBy(events, ['createdAt'], ['desc']);
  }

  if (sortBy === 'priceDesc') {
    events = orderBy(events, ['price'], ['desc']);
  }

  if (sortBy === 'priceAsc') {
    events = orderBy(events, ['price'], ['asc']);
  }

  if (category !== 'All') {
    events = events.filter((product) => product.category === category);
  }

  if (min !== 0 || max !== 200) {
    events = events.filter((event) => event.amount >= min && event.amount <= max);
  }

  // if (rating) {
  //   events = events.filter((product) => {
  //     const convertRating = (value: string) => {
  //       if (value === 'up4Star') return 4;
  //       if (value === 'up3Star') return 3;
  //       if (value === 'up2Star') return 2;
  //       return 1;
  //     };
  //     return product.totalRating > convertRating(rating);
  //   });
  // }

  return events;
}
