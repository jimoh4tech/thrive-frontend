// @mui
import { Box, BoxProps } from '@mui/material';
// @type
import { IEvent } from 'src/@types/events';
// components
import { useState } from 'react';
import { SkeletonProductItem } from '../../../components/skeleton';
import EventCard from './EventCard';
import EventDetailsDrawer from './EventDetailsDrawer';
//

// ----------------------------------------------------------------------

interface Props extends BoxProps {
  events: IEvent[];
  loading: boolean;
}

export default function EventList({ events, loading, ...other }: Props) {
  const [event, setEvent] = useState<IEvent | null>(null);
  const [open, setOpen] = useState(false);

  return (
    <Box
      gap={3}
      display="grid"
      gridTemplateColumns={{
        xs: 'repeat(1, 1fr)',
        sm: 'repeat(2, 1fr)',
        md: 'repeat(3, 1fr)',
        xl: 'repeat(4, 1fr)',
      }}
      {...other}
    >
      {(loading ? [...Array(12)] : events).map((_event, index) =>
        _event ? (
          <EventCard
            key={_event.id}
            event={_event}
            onViewEvent={(__event) =>
              setOpen(() => {
                setEvent(__event);
                return true;
              })
            }
          />
        ) : (
          <SkeletonProductItem key={index} />
        )
      )}
      {event && (
        <EventDetailsDrawer
          open={open}
          event={event}
          onClose={() => setOpen(false)}
          // onApply={() => enqueueSnackbar('Platinum Access Only', { variant: 'warning' })}
        />
      )}
    </Box>
  );
}
