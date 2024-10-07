// next
import NextLink from 'next/link';
// @mui
import {
  Box,
  Button,
  Container,
  Divider,
  Grid,
  IconButton,
  Link,
  Stack,
  Typography,
} from '@mui/material';
// routes
import { m } from 'framer-motion';
import moment from 'moment';
import {
  africa,
  connect,
  curves,
  enterprise,
  impact,
  naccima,
  nassarawa,
  pedestal,
  smedan,
  taj,
} from 'src/assets/images';
import { varFade } from 'src/components/animate';
import { LogoFull } from 'src/components/logo/Logo';
// import Image from 'src/components/image/Image';
import Image from 'next/image';
import React, { useState } from 'react';
import TourVideo from 'src/components/TourVideo';
import { PATH_PAGE } from '../../routes/paths';
// components
import Iconify from '../../components/iconify';

// ----------------------------------------------------------------------

const LINKS = [
  {
    headline: 'Contact Us',
    children: [
      { name: 'support@thrivebizng.com', href: 'mailto:support@thrivebizng.com' },
      { name: '+2349066189699', href: 'tel:+2349066189699' },
      { name: '+2349067325337', href: 'tel:+2349067325337' },
      {
        name: 'THRIVE – Enterprise Hubs, 16a Trinity Avenue, Off Ligali Ayorinde, Victoria Island.',
        href: PATH_PAGE.faqs,
      },
    ],
  },
  {
    headline: 'Other Pages',
    children: [
      { name: 'Frequently Asked Questions', href: PATH_PAGE.faqs },
      { name: 'Announcements', href: PATH_PAGE.announcement },
      { name: 'Take a Tour', action: (cb: VoidFunction) => cb },
    ],
  },
  {
    headline: 'Legal',
    children: [
      { name: 'Terms and Condition', href: PATH_PAGE.termsCondition },
      { name: 'Privacy Policy', href: PATH_PAGE.privacy },
      { name: 'Refund Policy', href: PATH_PAGE.refund },
      { name: 'Data Protection Policy', href: PATH_PAGE.dataProtect },
      { name: 'Abuse Policy', href: PATH_PAGE.abuse },
    ],
  },
];

const sponsors = [
  { href: 'https://smedan.gov.ng/', img: smedan },
  { href: 'https://connectnigeria.com/', img: connect },
  { href: 'https://www.impactpointe.com/', img: impact },
  { href: 'https://nasmfbank.com/', img: nassarawa },
  { href: 'https://tajbank.com/', img: taj },
  { href: 'https://africafranchise.org/', img: africa },
  { href: 'https://naccima.com/', img: naccima },
  { href: 'https://curvesng.com/', img: curves },
];

export const _socials = [
  {
    value: 'facebook',
    name: 'FaceBook',
    icon: 'eva:facebook-fill',
    color: '#1877F2',
    path: 'https://www.facebook.com/thrivebizsoutions',
  },
  {
    value: 'instagram',
    name: 'Instagram',
    icon: 'ant-design:instagram-filled',
    color: '#E02D69',
    path: 'https://instagram.com/thrive',
  },
  {
    value: 'linkedin',
    name: 'Linkedin',
    icon: 'eva:linkedin-fill',
    color: '#007EBB',
    path: 'https://www.linkedin.com/company/thrivebizng',
  },
  {
    value: 'twitter',
    name: 'Twitter',
    icon: 'eva:twitter-fill',
    color: '#00AAEC',
    path: 'https://twitter.com/thrivebizng',
  },
];

// ----------------------------------------------------------------------

export default function Footer() {
  // );

  const [watch, setWatch] = useState(false);

  const mainFooter = (
    <Box
      component="footer"
      sx={{
        position: 'relative',
        bgcolor: 'background.default',
      }}
    >
      {/* ------------------ Sponsors Sections ------------------ */}
      <Container sx={{ py: 10 }}>
        <Stack spacing={3}>
          <m.div variants={varFade().inDown}>
            <Typography variant="h2" textAlign="center">
              Supported By
            </Typography>
          </m.div>
          <Typography textAlign="center">
            THRIVE is able to offer world-class digital support to thousands of growing businesses
            because it is supported by
          </Typography>
          <Stack direction="row" spacing={10} justifyContent="center">
            <Link href="https://pedestalafrica.com/" target="_blank">
              <Image
                alt="Logo"
                style={{ objectFit: 'contain', width: 'auto' }}
                height={100}
                width={300}
                src={pedestal}
              />
            </Link>
          </Stack>
        </Stack>
      </Container>

      {/* ------------------ Partners Sections ------------------ */}
      <Box bgcolor="#f3f3f3" py={10}>
        <Container>
          <m.div variants={varFade().inDown}>
            <Typography variant="h2" textAlign="center">
              Our Project Partners
            </Typography>
          </m.div>
          <Grid container spacing={4} justifyContent="center">
            {sponsors.map((_, i) => (
              <Grid
                key={_.href}
                item
                xl={i === 0 ? 3 : 2}
                md={i === 0 ? 4 : 3}
                sm={i === 0 ? 6 : 4}
                xs={6}
              >
                <Link href={_.href} target="_blank">
                  <Image
                    alt="Logo"
                    style={{ objectFit: 'contain', width: 'auto' }}
                    height={250}
                    width={500}
                    src={_.img.src}
                  />
                </Link>
              </Grid>
            ))}
          </Grid>
          <Typography variant="h4" textAlign="center" my={4}>
            Brought to you by
          </Typography>

          <Stack direction="row" spacing={10} justifyContent="center">
            <Link href="https://www.enterprisehubs.com/homepage/" target="_blank">
              <Image
                alt="Logo"
                style={{ objectFit: 'contain', width: 'auto' }}
                height={200}
                width={400}
                src={enterprise}
              />
            </Link>
          </Stack>
        </Container>
      </Box>

      <Divider />

      {/* -------------------- Base Footer -------------------- */}

      <Container sx={{ pt: 10 }}>
        <Grid
          container
          justifyContent={{
            xs: 'center',
            md: 'space-between',
          }}
          sx={{
            textAlign: {
              xs: 'center',
              md: 'left',
            },
          }}
          spacing={2}
        >
          <Grid item xs={6} md={3}>
            <Box>
              <LogoFull sx={{ maxWidth: 150, mx: { xs: 'auto', md: 'inherit' } }} />
              <Typography variant="body2" sx={{ pr: { md: 5 } }}>
                A one-stop digital support center for growing businesses in Nigeria. One-time
                sign-up. Easy sign-ins.
              </Typography>
            </Box>

            <Stack
              spacing={1}
              direction="row"
              justifyContent={{ xs: 'center', md: 'flex-start' }}
              sx={{
                mt: 5,
                mb: { xs: 5, md: 0 },
              }}
            >
              {_socials.map((social) => (
                <Link href={social.path}>
                  <IconButton key={social.name}>
                    <Iconify color="primary.main" icon={social.icon} />
                  </IconButton>
                </Link>
              ))}
            </Stack>
          </Grid>

          {LINKS.map((list, i) => (
            <Grid item xs={6} md={3} key={i} textAlign="left">
              <Typography color="primary.main" component="div" variant="overline">
                {list.headline}
              </Typography>

              {list.children.map((link, _i) => (
                <Box key={_i}>
                  {link.action ? (
                    <>
                      <TourVideo open={watch} onClose={() => setWatch(false)} />
                      <Button
                        sx={{ mt: 3 }}
                        variant="contained"
                        onClick={link.action(() => setWatch(true))}
                      >
                        {link.name}
                      </Button>
                    </>
                  ) : (
                    <Link component={NextLink} href={link.href} color="inherit" variant="body2">
                      {link.name}
                    </Link>
                  )}
                </Box>
              ))}
            </Grid>
          ))}
        </Grid>

        <Typography
          variant="caption"
          component="div"
          sx={{
            mt: 10,
            pb: 5,
            textAlign: { xs: 'center', md: 'left' },
          }}
        >
          © {moment().format('yyyy')}. All rights reserved
        </Typography>
      </Container>
    </Box>
  );

  return mainFooter;
}
