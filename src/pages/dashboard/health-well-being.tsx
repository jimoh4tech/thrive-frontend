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
import { IFinance, IFinanceFilter } from 'src/@types/finance';
import EventSearch from 'src/sections/@dashboard/event/EventSearch';
import HealthList from 'src/sections/@dashboard/health/HealthList';
import { PATH_DASHBOARD } from '../../routes/paths';
// @types
// layouts
import DashboardLayout from '../../layouts/dashboard';
// components
import CustomBreadcrumbs from '../../components/custom-breadcrumbs';
import FormProvider from '../../components/hook-form';
// sections

// ----------------------------------------------------------------------

EcommerceShopPage.getLayout = (page: React.ReactElement) => (
  <DashboardLayout>{page}</DashboardLayout>
);

// ----------------------------------------------------------------------

export default function EcommerceShopPage() {
  const defaultValues = {
    gender: [],
    category: 'All',
    colors: [],
    priceRange: [0, 200],
    rating: '',
    sortBy: 'featured',
  };

  const methods = useForm<IFinanceFilter>({
    defaultValues,
  });

  const [searchVal, setSearchVal] = useState('');

  const {
    data: { records: events = [] } = { records: [], totalItems: 0 },

    isLoading,
  } = useSWR(`/health/institutions${searchVal ? `?q=${searchVal}` : ''}`, fetcher);
  const onSearch = (val: string) => {
    setSearchVal(val);
  };

  const { watch } = methods;

  const values = watch();

  const dataFiltered = applyFilter(events, values);

  return (
    <>
      <Head>
        <title> Health and Wellbeing | ICSS Thrive</title>
      </Head>

      <Container maxWidth="xl">
        <FormProvider methods={methods}>
          <CustomBreadcrumbs
            heading="Health and Wellbeing"
            links={[
              { name: 'Dashboard', href: PATH_DASHBOARD.root },
              { name: 'Health and Wellbeing' },
            ]}
          />

          <Stack
            spacing={2}
            direction={{ xs: 'column', sm: 'row' }}
            alignItems={{ sm: 'center' }}
            justifyContent="space-between"
            sx={{ mb: 2 }}
          >
            <EventSearch onInputChange={onSearch} onViewEvent={(event) => {}} searchResults={[]} />
          </Stack>

          <HealthList events={dataFiltered} loading={isLoading} />
        </FormProvider>
      </Container>
    </>
  );
}

// ----------------------------------------------------------------------

function applyFilter(events: IFinance[], filters: IFinanceFilter) {
  const { category, sortBy } = filters;

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
