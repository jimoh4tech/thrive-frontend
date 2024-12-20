// @mui
import { Box, BoxProps } from '@mui/material';
// @type
// components
import { useState } from 'react';
import { IFinance } from 'src/@types/finance';
import { SkeletonProductItem } from '../../../components/skeleton';
import FinanceDrawerDrawer from './FinanceDrawerDrawer';
import FianceCard from './FianceCard';
//

// ----------------------------------------------------------------------

interface Props extends BoxProps {
  events: IFinance[];
  loading: boolean;
}

export default function FinanceList({ events, loading, ...other }: Props) {
  const [event, setEvent] = useState<IFinance | null>(null);
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
          <FianceCard
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
        <FinanceDrawerDrawer
          open={open}
          event={event}
          onClose={() => setOpen(false)}
          // onApply={() => enqueueSnackbar('Platinum Access Only', { variant: 'warning' })}
        />
      )}
    </Box>
  );
}
