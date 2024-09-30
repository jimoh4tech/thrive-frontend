import React, { useCallback, useEffect, useState } from 'react';
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
import { useSettingsContext } from 'src/components/settings';
// sectionsimport { useCallback, useEffect, useState } from 'react';
// next
// @mui
// routes
import { useSnackbar } from 'notistack';
import { IEvent } from 'src/@types/events';
import { IQuery, IResDataMany } from 'src/@types/query';
import { loader } from 'src/actions';
import Pagination from 'src/components/pagination';
import SearchBar from 'src/components/search-bar';
import EventList from 'src/sections/@dashboard/event/EventList';
// utils
// layouts
// @types
// components
// sections

// ----------------------------------------------------------------------

BusinessBox.getLayout = (page: React.ReactElement) => <DashboardLayout>{page}</DashboardLayout>;

// ----------------------------------------------------------------------

export default function BusinessBox() {
  const { themeStretch } = useSettingsContext();

  const [events, setEvents] = useState<IResDataMany<IEvent>>({
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

  const getEvents = useCallback(async () => {
    try {
      setFetching(true);
      const data = await loader('events', { sortBy: 'createdAt', order: 'DESC', ...query });
      console.log(data);
      setEvents(data);

      setFetching(false);
    } catch (error) {
      enqueueSnackbar(error.message || error, { variant: 'error' });
    }
  }, [enqueueSnackbar, query]);

  const [organizers, setOrganizers] = useState([]);
  const [categories, setCategories] = useState([]);

  const getOrganizers = useCallback(async () => {
    try {
      const _organizers = await loader('eventsOrganizers', { sortBy: 'name', order: 'ASC' });

      setOrganizers(_organizers);
    } catch (error) {
      enqueueSnackbar(error.message || 'Could not fetch Organizers', { variant: 'error' });
    }
  }, [enqueueSnackbar]);

  const getCategories = useCallback(async () => {
    try {
      const _categories = await loader('eventsCats', { sortBy: 'name', order: 'ASC' });

      setCategories(_categories);
    } catch (error) {
      enqueueSnackbar(error.message || 'Could not fetch Categories', { variant: 'error' });
    }
  }, [enqueueSnackbar]);

  useEffect(() => {
    getOrganizers();
    getCategories();
    return () => {};
  }, [getOrganizers, getCategories]);

  useEffect(() => {
    getEvents();

    return () => {};
  }, [getEvents, query]);

  return (
    <>
      <Head>
        <title> Events | THRIVE</title>
      </Head>

      <Container maxWidth={themeStretch ? false : 'lg'}>
        <CustomBreadcrumbs
          heading="Events"
          links={[
            {
              name: 'Admin',
              href: PATH_ADMIN.root,
            },
            {
              name: 'Events',
              href: PATH_ADMIN.event.events,
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
          <SearchBar
            onChange={handleQuery}
            onClearFilter={handleClearAll}
            searching={fetching}
            filterOptions={[
              {
                name: 'organizerId',
                options: organizers.map((_: any) => ({ label: _.name, value: _.id })),
                label: "Organizers'",
              },
              {
                name: 'categoryId',
                options: categories.map((_: any) => ({ label: _.name, value: _.id })),
                label: "Categories'",
              },
            ]}
            onChangeOption={(name, value) => setQuery({ ...query, filterBy: name, filter: value })}
          />

          {/* <FileChangeViewButton value={view} onChange={handleChangeView} /> */}
        </Stack>

        <EventList events={events.records} loading={fetching} />

        <Pagination
          totalPages={events.totalPages}
          onChange={(num) => handleQuery({ page: num })}
          currentPage={events.currentPage}
        />
      </Container>
    </>
  );
}
