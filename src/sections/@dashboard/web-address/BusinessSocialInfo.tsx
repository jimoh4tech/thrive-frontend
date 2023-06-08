// @mui
import { Button, Card, CardHeader, Stack } from '@mui/material';
// @types
import { IUserSocialLink } from 'src/@types/user';
// components
import Iconify from 'src/components/iconify/Iconify';

// ----------------------------------------------------------------------

type Props = {
  socialLinks: IUserSocialLink;
};

const _socials = [
  {
    value: 'facebook',
    name: 'FaceBook',
    icon: 'eva:facebook-fill',
    color: '#1877F2',
    path: 'https://www.facebook.com/caitlyn.kerluke',
  },
  {
    value: 'instagram',
    name: 'Instagram',
    icon: 'ant-design:instagram-filled',
    color: '#E02D69',
    path: 'https://www.instagram.com/caitlyn.kerluke',
  },
  {
    value: 'linkedin',
    name: 'Linkedin',
    icon: 'eva:linkedin-fill',
    color: '#007EBB',
    path: 'https://www.linkedin.com/caitlyn.kerluke',
  },
  {
    value: 'twitter',
    name: 'Twitter',
    icon: 'eva:twitter-fill',
    color: '#00AAEC',
    path: 'https://www.twitter.com/caitlyn.kerluke',
  },
];

export default function BusinessSocialInfo({ socialLinks }: Props) {
  console.log(socialLinks);

  return (
    <Card>
      <CardHeader title="Social" />

      <Stack spacing={2} sx={{ p: 3 }}>
        {_socials.map((link: any) => (
          <Stack
            key={link.name}
            direction="row"
            // justifyContent="center"
            alignItems="center"
            sx={{ wordBreak: 'break-all' }}
          >
            <Iconify
              icon={link.icon}
              sx={{
                mr: 2,
                flexShrink: 0,
                color: link.color,
              }}
            />
            {/* @ts-ignore */}
            <Button href={socialLinks[`${link.value}Link`] || ''} target="_blank">
              {(link.value === 'facebook' && ('Visit Page' || 'Not Available')) ||
                (link.value === 'instagram' && ('Visit Page' || 'Not Available')) ||
                (link.value === 'linkedin' && ('Visit Page' || 'Not Available')) ||
                (link.value === 'twitter' && ('VIEW PAGE' || 'Not Available')) ||
                'Not Available'}
            </Button>
          </Stack>
        ))}
      </Stack>
    </Card>
  );
}
