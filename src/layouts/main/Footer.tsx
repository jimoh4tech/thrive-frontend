// next
import NextLink from 'next/link';
// @mui
import { Box, Container, Divider, Grid, IconButton, Link, Stack, Typography } from '@mui/material';
// routes
import { LogoFull } from 'src/components/logo/Logo';
import { fDate } from 'src/utils/formatTime';
import moment from 'moment';
import { m } from 'framer-motion';
import { varFade } from 'src/components/animate';
import {
  capstone,
  dofoll,
  ehub,
  giniushub,
  giz,
  gopa,
  hbf,
  kalros,
  kb,
  lapo,
  leverage,
  sabi,
  seyp,
  valucon,
  viisaus,
  weboh,
} from 'src/assets/images';
// import Image from 'src/components/image/Image';
import Image from 'next/image';
import { PATH_PAGE } from '../../routes/paths';
// components
import Iconify from '../../components/iconify';

// ----------------------------------------------------------------------

const LINKS = [
  {
    headline: 'Contact Us',
    children: [
      { name: 'frontoffice@thrivebiz.ng', href: 'mailto:frontoffice@thrivebiz.ng' },
      { name: '+2349066189699 +2349060009685 +2348095862293', href: '#' },
      {
        name: 'Enterprise Hubs Trinity Avenue by Landmark, Off Ligali Ayorinde, Victoria.',
        href: PATH_PAGE.faqs,
      },
    ],
  },
  {
    headline: 'Legal',
    children: [
      { name: 'Terms and Condition', href: '#' },
      { name: 'Privacy Policy', href: '#' },
    ],
  },
];

export const _socials = [
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

// ----------------------------------------------------------------------

export default function Footer() {
  // const simpleFooter = (
  //   <Box
  //     component="footer"
  //     sx={{
  //       py: 5,
  //       textAlign: 'center',
  //       position: 'relative',
  //       bgcolor: 'background.default',
  //     }}
  //   >
  //     <Container>
  //       <Logo sx={{ mb: 1, mx: 'auto' }} />

  //       <Typography variant="caption" component="div">
  //         © All rights reserved
  //         <br /> made by &nbsp;
  //         <Link href="https://minimals.cc/"> minimals.cc </Link>
  //       </Typography>
  //     </Container>
  //   </Box>
  // );

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
              Supported by
            </Typography>
          </m.div>
          <Typography textAlign="center">
            ICSS THRIVE is able to offer world-class digital support to thousands of growing
            businesses because it is supported by
          </Typography>
          <Stack direction="row" spacing={10} justifyContent="space-between">
            <Image
              alt="Logo"
              style={{ objectFit: 'contain', maxWidth: '100%' }}
              height={gopa.height}
              width={gopa.width}
              src={gopa.src}
            />
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

          <Grid container spacing={10} justifyContent="center" mt={2}>
            {[
              ehub,
              valucon,
              weboh,
              hbf,
              dofoll,
              kalros,
              lapo,
              sabi,
              viisaus,
              giniushub,
              seyp,
              capstone,
              kb,
              leverage,
            ].map((_, i) => (
              <Grid
                key={_.src}
                item
                xl={i === 0 ? 3 : 2}
                md={i === 0 ? 4 : 3}
                sm={i === 0 ? 6 : 4}
                xs={6}
              >
                {i === 0 && <Typography variant="h5">Brought to you by</Typography>}
                <Image
                  alt="Logo"
                  style={{ objectFit: 'contain', width: 'auto' }}
                  height={i === 0 ? 150 : 100}
                  width={400}
                  src={_.src}
                />
              </Grid>
            ))}
          </Grid>
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
        >
          <Grid item xs={12} md={3}>
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
              {_socials.map((social: any) => (
                <IconButton key={social.name}>
                  <Iconify color="primary.main" icon={social.icon} />
                </IconButton>
              ))}
            </Stack>
          </Grid>

          <Grid item xs={12} md={7}>
            <Grid container spacing={5} justifyContent="space-between">
              {LINKS.map((list, i) => (
                <Grid item xs={6} key={i} textAlign="left">
                  <Typography color="primary.main" component="div" variant="overline">
                    {list.headline}
                  </Typography>

                  {list.children.map((link, _i) => (
                    <Box key={_i}>
                      <Link component={NextLink} href={link.href} color="inherit" variant="body2">
                        {link.name}
                      </Link>
                    </Box>
                  ))}
                </Grid>
              ))}
            </Grid>
          </Grid>
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
