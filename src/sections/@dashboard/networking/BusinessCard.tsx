// @mui
import { Call, Visibility } from '@mui/icons-material';
import { Avatar, Box, Button, Card, Stack, Typography } from '@mui/material';
import { alpha, styled } from '@mui/material/styles';
import Link from 'next/link';
import { IUserBusiness } from 'src/@types/business';
import Image from 'src/components/image/Image';
import SvgColor from 'src/components/svg-color/SvgColor';
// utils
// @types
// _mock
// components

// ----------------------------------------------------------------------

const StyledOverlay = styled('div')(({ theme }) => ({
  top: 0,
  left: 0,
  zIndex: 8,
  width: '100%',
  height: '100%',
  position: 'absolute',
  backgroundColor: alpha(theme.palette.grey[900], 0.64),
}));

// ----------------------------------------------------------------------

type Props = {
  business: IUserBusiness;
};

export default function BusinesCard({ business }: Props) {
  const { name, cover, industry, logo, slug, phone } = business;

  return (
    <Card sx={{ textAlign: 'center' }}>
      <Box sx={{ position: 'relative' }}>
        <SvgColor
          src="/assets/shape_avatar.svg"
          sx={{
            width: 144,
            height: 62,
            zIndex: 10,
            left: 0,
            right: 0,
            bottom: -26,
            mx: 'auto',
            position: 'absolute',
            color: 'background.paper',
          }}
        />

        <Avatar
          alt={name}
          src={logo}
          sx={{
            width: 64,
            height: 64,
            zIndex: 11,
            left: 0,
            right: 0,
            bottom: -32,
            mx: 'auto',
            position: 'absolute',
          }}
        />

        <StyledOverlay />

        <Image src={cover} alt={cover} ratio="16/9" />
      </Box>

      <Typography variant="subtitle1" sx={{ mt: 6, mb: 0.5 }}>
        {name}
      </Typography>

      <Typography variant="body2" sx={{ color: 'text.secondary' }}>
        {industry?.name}
      </Typography>

      <Stack
        direction="row"
        spacing={1}
        alignItems="center"
        justifyContent="center"
        sx={{ mt: 1, mb: 3 }}
      >
        {/* {user && user.isApproved ? (
          <Button
            LinkComponent={Link}
            href="/dashbaord/networking-marketplace/chat"
            startIcon={<ChatBubble />}
            variant="outlined"
          >
            Chat
          </Button>
        ) : (
          <Button LinkComponent={Link} href={slug} startIcon={<Visibility />} variant="outlined">
            View Profile
          </Button>
        )} */}
        <Button
          LinkComponent={Link}
          target="_blank"
          href={slug}
          startIcon={<Visibility />}
          variant="outlined"
        >
          View Profile
        </Button>
        <Button
          LinkComponent={Link}
          href={`tel:${phone}`}
          sx={{ px: 0, minWidth: 40 }}
          variant="contained"
          color="success"
        >
          <Call />
        </Button>
      </Stack>
    </Card>
  );
}
