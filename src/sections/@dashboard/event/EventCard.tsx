// next
// @mui
import { Box, Card, Grid, Stack, Typography } from '@mui/material';
// routes
import { IEvent } from 'src/@types/events';
// utils
// redux
import { fCurrency } from 'src/utils/formatNumber';
import { fDate } from 'src/utils/formatTime';
// @types
// components
import Label from 'src/components/label/Label';
import Iconify from '../../../components/iconify';
import Image from '../../../components/image';

// ----------------------------------------------------------------------

type Props = {
  event: IEvent;
  onViewEvent: (event: IEvent) => void;
};

export default function EventCard({ event, onViewEvent }: Props) {
  const { name, amount, location, cover, startDate, endDate, category, isPlatinum } = event;

  // const linkTo = PATH_DASHBOARD.eCommerce.view(paramCase(name));

  return (
    <Card
      sx={{
        '&:hover .add-cart-btn': {
          opacity: 1,
        },
        cursor: 'pointer',
      }}
      onClick={() => onViewEvent(event)}
    >
      <Box sx={{ position: 'relative', p: 1.5 }}>
        {isPlatinum && (
          <Label
            variant="soft"
            color="primary"
            sx={{
              top: 16,
              right: 16,
              zIndex: 9,
              position: 'absolute',
              textTransform: 'uppercase',
            }}
          >
            PLATINUM
          </Label>
        )}

        <Image alt={name} src={cover} ratio="4/3" sx={{ borderRadius: 1 }} />
      </Box>

      <Stack spacing={1} sx={{ p: 1.5 }}>
        <Grid container spacing={2}>
          <Grid item xs={9}>
            <Typography sx={{ fontWeight: '600' }}>{name}</Typography>
          </Grid>
          <Grid item xs={3}>
            <Typography sx={{ fontWeight: '600', color: 'success.main' }}>
              {fCurrency(amount)}
            </Typography>
          </Grid>
        </Grid>
        <Typography variant="subtitle2">{category.name}</Typography>
        <Stack direction="row" alignItems="center" spacing={1}>
          <Iconify color="primary.main" icon="ic:outline-access-time" width="12" />
          <Typography variant="subtitle2">{`${fDate(startDate)}  -   ${fDate(
            endDate
          )}`}</Typography>
        </Stack>
        <Stack direction="row" alignItems="center" spacing={1}>
          <Iconify color="primary.main" icon="ic:baseline-location-on" width="12" />
          <Typography variant="subtitle2"> {location}</Typography>
        </Stack>

        {/* <Stack direction="row" alignItems="center" justifyContent="space-between">
          <ColorPreview colors={colors} />

          <Stack direction="row" spacing={0.5} sx={{ typography: 'subtitle1' }}>
            {priceSale && (
              <Box component="span" sx={{ color: 'text.disabled', textDecoration: 'line-through' }}>
                {fCurrency(priceSale)}
              </Box>
            )}

            <Box component="span">{fCurrency(price)}</Box>
          </Stack>
        </Stack> */}
      </Stack>
    </Card>
  );
}
