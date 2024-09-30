// next
import Head from 'next/head';
// @mui
import { Button, Card, Container, Grid } from '@mui/material';
// routes
import { Stack } from '@mui/system';
import BusinesseAbout from 'src/sections/@dashboard/web-address/BusinessAbout';
import BusinessCover from 'src/sections/@dashboard/web-address/BusinessCover';
import BusinessSocialInfo from 'src/sections/@dashboard/web-address/BusinessSocialInfo';
import { PATH_DASHBOARD } from '../../routes/paths';
// auth
import { useAuthContext } from '../../auth/useAuthContext';
// _mock_
// layouts
import DashboardLayout from '../../layouts/dashboard';
// components
import CustomBreadcrumbs from '../../components/custom-breadcrumbs';
import Iconify from '../../components/iconify';
import { useSettingsContext } from '../../components/settings';
// sections

// ----------------------------------------------------------------------

UserProfilePage.getLayout = (page: React.ReactElement) => <DashboardLayout>{page}</DashboardLayout>;

// ----------------------------------------------------------------------

export default function UserProfilePage() {
  const { themeStretch } = useSettingsContext();

  const {
    user: { business },
  } = useAuthContext();

  const { facebookLink, instagramLink, linkedinLink, twitterLink } = business;

  return (
    <>
      <Head>
        <title> Digital Address | THRIVE</title>
      </Head>

      <Container maxWidth={themeStretch ? false : 'xl'}>
        <CustomBreadcrumbs
          heading="Digital Address"
          links={[{ name: 'Dashboard', href: PATH_DASHBOARD.root }, { name: 'Digital Address' }]}
          action={
            <Button variant="soft" startIcon={<Iconify icon="material-symbols:add" />}>
              Add New Page
            </Button>
          }
        />
        <Card
          sx={{
            mb: 3,
            height: 280,
            position: 'relative',
          }}
        >
          <BusinessCover business={business} />
        </Card>

        <Grid container spacing={3}>
          <Grid item xs={12} md={4}>
            <Stack spacing={3}>
              {/* <BusinessCounter follower={10000} following={300} /> */}

              <BusinessSocialInfo
                socialLinks={{
                  facebookLink,
                  instagramLink,
                  linkedinLink,
                  twitterLink,
                }}
              />
            </Stack>
          </Grid>

          <Grid item xs={12} md={8}>
            <BusinesseAbout business={business} />
          </Grid>
        </Grid>
      </Container>
    </>
  );
}
