// @mui
import { Button, Card, CardHeader, Link, Stack, Typography } from '@mui/material';
import { styled } from '@mui/material/styles';
import { IUserBusiness } from 'src/@types/business';
import Iconify from 'src/components/iconify/Iconify';
// @ts-ignore
import { RWebShare } from 'react-web-share';
// @types
// components

// ----------------------------------------------------------------------

const StyledIcon = styled(Iconify)(({ theme }) => ({
  width: 20,
  height: 20,
  marginTop: 1,
  flexShrink: 0,
  marginRight: theme.spacing(2),
  color: theme.palette.primary.main,
}));

// ----------------------------------------------------------------------

export default function BusinesseAbout({
  business: { bio, address, email, phone, name, slug, industry },
}: {
  business: IUserBusiness;
}) {
  return (
    <Card>
      <CardHeader
        title={`About ${name}`}
        action={
          <RWebShare
            data={{
              text: 'Web Share',
              url: slug,
              title: 'Website Url',
            }}
          >
            <Button startIcon={<Iconify icon="material-symbols:share-outline" />}>Share</Button>
          </RWebShare>
        }
      />

      <Stack spacing={2} sx={{ p: 3 }}>
        <Typography variant="body2">{bio}</Typography>

        <Stack direction="row">
          <StyledIcon icon="eva:pin-fill" />

          <Typography variant="body2">
            <Link component="span" variant="subtitle2" color="text.primary">
              {address}
            </Link>
          </Typography>
        </Stack>

        <Stack direction="row">
          <StyledIcon icon="eva:email-fill" />
          <Typography variant="body2">{email}</Typography>
        </Stack>

        <Stack direction="row">
          <StyledIcon icon="eva:phone-fill" />
          <Typography variant="body2">{phone}</Typography>
        </Stack>

        <Stack direction="row">
          <StyledIcon icon="tabler:external-link" />

          <Typography variant="body2">
            <Link component="span" variant="subtitle2" color="text.primary">
              {slug}
            </Link>
          </Typography>
        </Stack>

        <Stack direction="row">
          <StyledIcon icon="ic:round-star" />

          <Typography variant="body2">
            <Link component="span" variant="subtitle2" color="text.primary">
              {industry}
            </Link>
          </Typography>
        </Stack>
      </Stack>
    </Card>
  );
}
