// next
// @mui
import { Box, Button, Card, Stack, Typography } from '@mui/material';
// routes
// utils
// redux
// @types
// components
import { IHeath } from 'src/@types/health';
import Iconify from '../../../components/iconify';
import Image from '../../../components/image';

// ----------------------------------------------------------------------

type Props = {
  event: IHeath;
  onViewEvent: (event: IHeath) => void;
};

export default function HealthCard({ event, onViewEvent }: Props) {
  const { name, cover, services, url } = event;

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
      <Box sx={{ position: 'relative', p: 1 }}>
        <Image alt={name} src={cover} ratio="4/3" sx={{ borderRadius: 1 }} />
      </Box>

      <Stack spacing={1} sx={{ p: 1 }}>
        <Typography sx={{ fontWeight: '600' }}>{name}</Typography>

        <Typography variant="caption">{services.map((_: any) => _.name).join(', ')}</Typography>

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
      </Stack>
    </Card>
  );
}
