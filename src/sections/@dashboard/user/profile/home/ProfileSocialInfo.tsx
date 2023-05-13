// @mui
import { Link, Card, CardHeader, Stack } from '@mui/material';
// @types
import { IUserSocialLink } from '../../../../../@types/user';
// components
import Iconify from '../../../../../components/iconify';

// ----------------------------------------------------------------------

type Props = {
  socialLinks: IUserSocialLink;
};

export default function ProfileSocialInfo({ socialLinks }: Props) {
  const { facebookLink, instagramLink, linkedinLink, twitterLink } = socialLinks;

  return (
    <Card>
      <CardHeader title="Social" />

      <Stack spacing={2} sx={{ p: 3 }}>
        {[].map((link: any) => (
          <Stack key={link.name} direction="row" sx={{ wordBreak: 'break-all' }}>
            <Iconify
              icon={link.icon}
              sx={{
                mr: 2,
                flexShrink: 0,
                color: link.color,
              }}
            />
            <Link component="span" variant="body2" color="text.primary">
              {(link.value === 'facebook' && facebookLink) ||
                (link.value === 'instagram' && instagramLink) ||
                (link.value === 'linkedin' && linkedinLink) ||
                twitterLink}
            </Link>
          </Stack>
        ))}
      </Stack>
    </Card>
  );
}
