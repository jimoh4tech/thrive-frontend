// @mui
import { Card, Stack, Typography, Divider } from '@mui/material';
import { IUserProfileFollowers } from 'src/@types/user';
import { fNumber } from 'src/utils/formatNumber';
// utils
// @types

// ----------------------------------------------------------------------

export default function BusinessCounter({ follower, following }: IUserProfileFollowers) {
  return (
    <Card sx={{ py: 3 }}>
      <Stack direction="row" divider={<Divider orientation="vertical" flexItem />}>
        <Stack width={1} textAlign="center">
          <Typography variant="h4">{fNumber(follower)}</Typography>

          <Typography variant="body2" sx={{ color: 'text.secondary' }}>
            Total Visits
          </Typography>
        </Stack>

        <Stack width={1} textAlign="center">
          <Typography variant="h4">{fNumber(following)}</Typography>

          <Typography variant="body2" sx={{ color: 'text.secondary' }}>
            Contact Clicks
          </Typography>
        </Stack>
      </Stack>
    </Card>
  );
}
