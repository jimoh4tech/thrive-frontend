// next
// @mui
import { Box, Button, Card, Grid, Stack, Typography } from '@mui/material';
// routes
// utils
// redux
import { IFinance } from 'src/@types/finance';
import { fCurrency } from 'src/utils/formatNumber';
import { useDispatch } from '../../../redux/store';
// @types
// components
import Iconify from '../../../components/iconify';
import Image from '../../../components/image';
import Label from '../../../components/label';

// ----------------------------------------------------------------------

type Props = {
  event: IFinance;
  onViewEvent: (event: IFinance) => void;
};

export default function FianceCard({ event, onViewEvent }: Props) {
  const { id, name, isPlatinum, cover, description, institution, category, url } = event;

  const dispatch = useDispatch();

  // const linkTo = PATH_DASHBOARD.eCommerce.view(paramCase(name));

  const handleApply = async () => {
    try {
      // dispatch(addToCart(newProduct));
    } catch (error) {
      console.error(error);
    }
  };

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
      <Box sx={{ position: 'relative', p: 1 }}>
        {/* {isPlatinum && (
          <Label
            variant="filled"
            color="primary"
            sx={{
              top: 16,
              right: 16,
              zIndex: 9,
              position: 'absolute',
              textTransform: 'uppercase',
            }}
          >
            PREMIUM
          </Label>
        )} */}

        <Image alt={name} src={cover} ratio="4/3" sx={{ borderRadius: 1 }} />
      </Box>

      <Stack spacing={1} sx={{ p: 1 }}>
        <Typography sx={{ fontWeight: '600' }}>{name}</Typography>

        <Typography variant="caption">{institution.name}</Typography>

        <Box>
          <Button size="small" variant="outlined" href={url!}>
            Visit Business Website
          </Button>
        </Box>
        <Stack direction="row" spacing={2} alignItems="center">
          <Button href={`tel:${80}`} startIcon={<Iconify icon="ic:round-call" />}>
            Call
          </Button>
          <Typography>|</Typography>
          <Button href={`mailto:${80}`} startIcon={<Iconify icon="mdi:email" />}>
            Email
          </Button>
        </Stack>
        {/* <Stack direction="row" alignItems="center" spacing={1}>
          <Iconify color="primary.main" icon="ic:outline-access-time" width="12" />
          <Typography variant="subtitle2">{startDate}</Typography>
        </Stack>
        <Stack direction="row" alignItems="center" spacing={1}>
          <Iconify color="primary.main" icon="ic:baseline-location-on" width="12" />
          <Typography variant="subtitle2"> {location}</Typography>
        </Stack> */}

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
