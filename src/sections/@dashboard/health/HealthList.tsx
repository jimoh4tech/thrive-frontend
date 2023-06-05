// @mui
import { Box, BoxProps } from '@mui/material';
// @type
// components
import { useSnackbar } from 'notistack';
import { useState } from 'react';
import { IHealth } from 'src/@types/health';
import { SkeletonProductItem } from '../../../components/skeleton';
import HealthCard from './HealthCard';
import HealthDrawerDrawer from './HealthDrawerDrawer';
//

// ----------------------------------------------------------------------

interface Props extends BoxProps {
  institutions: IHealth[];
  loading: boolean;
}

export default function HealthList({ institutions, loading, ...other }: Props) {
  const [institution, setIntitution] = useState<IHealth | null>(null);
  const [open, setOpen] = useState(false);
  const { enqueueSnackbar } = useSnackbar();

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
      {(loading ? [...Array(12)] : institutions).map((_inst, index) =>
        _inst ? (
          <HealthCard
            key={_inst.id}
            event={_inst}
            onViewEvent={(__inst) =>
              setOpen(() => {
                setIntitution(__inst);
                return true;
              })
            }
          />
        ) : (
          <SkeletonProductItem key={index} />
        )
      )}
      {institution && (
        <HealthDrawerDrawer
          open={open}
          institution={institution}
          onClose={() => setOpen(false)}
          onApply={() => enqueueSnackbar('Platinum Access Only', { variant: 'warning' })}
        />
      )}
    </Box>
  );
}
