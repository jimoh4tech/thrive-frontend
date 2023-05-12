// @mui
import { Card, CardHeader, Link, Stack } from '@mui/material';
// _mock
import { _socials } from 'src/_mock/arrays';
// @types
import { IUserSocialLink } from 'src/@types/user';
// components
import Iconify from 'src/components/iconify/Iconify';

// ----------------------------------------------------------------------

type Props = {
  socialLinks: IUserSocialLink;
};

export default function BusinessSocialInfo({ socialLinks }: Props) {
  const { facebookLink, instagramLink, linkedinLink, twitterLink } = socialLinks;

  console.log(socialLinks);

  return (
    <Card>
      <CardHeader title="Social" />

      <Stack spacing={2} sx={{ p: 3 }}>
        {_socials.map((link) => (
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
              {(link.value === 'facebook' && (facebookLink || 'Not Available')) ||
                (link.value === 'instagram' && (instagramLink || 'Not Available')) ||
                (link.value === 'linkedin' && (linkedinLink || 'Not Available')) ||
                twitterLink ||
                'Not Available'}
            </Link>
          </Stack>
        ))}
      </Stack>
    </Card>
  );
}
