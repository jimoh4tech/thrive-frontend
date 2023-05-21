// next
// @mui
import { Box, Button, Card, Rating, Stack, Typography } from '@mui/material';
// routes
// utils
// redux
// @types
// components
import { IWorkspace } from 'src/@types/workspace';
import Iconify from '../../../components/iconify';
import Image from '../../../components/image';

// ----------------------------------------------------------------------

type Props = {
  workspace: IWorkspace;
};

export default function WorkspaceCard({ workspace }: Props) {
  const {
    images: { header: cover },
    title: name,
    id,
    avg_rating,
    booking_duration,
    rating,
  } = workspace;

  // const linkTo = PATH_DASHBOARD.eCommerce.view(paramCase(name));

  return (
    <Card
      sx={{
        '&:hover .add-cart-btn': {
          opacity: 1,
        },
        cursor: 'pointer',
      }}
    >
      <Box sx={{ position: 'relative', p: 1 }}>
        <Image alt={name} src={cover} ratio="4/3" sx={{ borderRadius: 1 }} />
      </Box>

      <Stack direction="row" justifyContent="space-between" sx={{ p: 1 }}>
        <Stack spacing={1}>
          <Typography sx={{ fontWeight: '600' }}>{name}</Typography>
          <Rating
            readOnly
            size="small"
            // precision={parseInt(avg_rating, 10)}
            name="reviews"
            value={rating.rating_value}
          />

          <Box>
            <Button
              size="small"
              variant="outlined"
              href={`https://workhopper.co/office/${id}/detail`}
            >
              Visit Location
            </Button>
          </Box>
        </Stack>

        <Stack spacing={1} textAlign="right">
          {booking_duration.map((_) => (
            <Typography variant="caption" sx={{ fontWeight: '600' }}>
              <span style={{ color: 'green' }}> ${`${_.amount}`} </span>
              {`/${_.minimum_duration}`}
            </Typography>
          ))}
        </Stack>
      </Stack>
    </Card>
  );
}
