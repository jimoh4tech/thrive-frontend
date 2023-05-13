import { useEffect } from 'react';
// next
import { useRouter } from 'next/router';
// config
// routes

// next
import Head from 'next/head';
// @mui
import { Container, Grid } from '@mui/material';
// auth
import Iconify from 'src/components/iconify/Iconify';
import { AppNewInvoice, AppWidgetSummary } from 'src/sections/@admin/app';
import { AnalyticsOrderTimeline } from 'src/sections/@dashboard/general/analytics';
import { BankingWidgetSummary } from 'src/sections/@dashboard/general/banking';
import { PATH_AFTER_LOGIN } from '../../config-global';
import { PATH_DASHBOARD } from '../../routes/paths';
// layouts
import DashboardLayout from '../../layouts/admin';
// components
import { useSettingsContext } from '../../components/settings';
// sections
// assets

// ----------------------------------------------------------------------

IndexPage.getLayout = (page: React.ReactElement) => <DashboardLayout>{page}</DashboardLayout>;

// ----------------------------------------------------------------------

export default function IndexPage() {
  const { pathname, replace, prefetch } = useRouter();

  useEffect(() => {
    if (pathname === PATH_DASHBOARD.root) {
      replace(PATH_AFTER_LOGIN);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [pathname]);

  useEffect(() => {
    prefetch(PATH_AFTER_LOGIN);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const { themeStretch } = useSettingsContext();

  return (
    <>
      <Head>
        <title> General: App | Minimal UI</title>
      </Head>
      <Container maxWidth={themeStretch ? false : 'xl'}>
        <Grid container spacing={3}>
          {/* <Grid item xs={12} md={8}>
            <AppWelcome
              title={`Welcome back! \n ${user?.fullName}`}
              description="If you are going to use a passage of Lorem Ipsum, you need to be sure there isn't anything."
              img={
                <SeoIllustration
                  sx={{
                    p: 3,
                    width: 360,
                    margin: { xs: 'auto', md: 'inherit' },
                  }}
                />
              }
              action={<Button variant="contained">Go Now</Button>}
            />
          </Grid>

          <Grid item xs={12} md={4}>
            <AppFeatured list={_appFeatured} />
          </Grid> */}

          <Grid item xs={12} md={4}>
            <AppWidgetSummary
              title="Total Users"
              percent={2.6}
              total={18765}
              icon={
                <Iconify
                  width={70}
                  color="info.main"
                  icon="mdi:account-group"
                  sx={{ opacity: 0.5 }}
                />
              }
            />
          </Grid>

          <Grid item xs={12} md={4}>
            <AppWidgetSummary
              title="Total Active Users"
              percent={2.6}
              total={18765}
              icon={
                <Iconify
                  width={70}
                  color="success.main"
                  icon="mdi:account-group"
                  sx={{ opacity: 0.5 }}
                />
              }
            />
          </Grid>

          <Grid item xs={12} md={4}>
            <AppWidgetSummary
              title="Total Active Extended Licence"
              percent={0.2}
              total={4876}
              icon={
                <Iconify
                  width={70}
                  color="gold"
                  icon="material-symbols:extension"
                  sx={{ opacity: 0.5 }}
                />
              }
            />
          </Grid>

          <Grid item xs={12} md={4}>
            <BankingWidgetSummary
              title="Total Revenue"
              icon="eva:diagonal-arrow-left-down-fill"
              percent={2.6}
              total={18765}
              chart={{
                series: [111, 136, 76, 108, 74, 54, 57, 84],
              }}
            />
          </Grid>
          <Grid item xs={12} md={4}>
            <BankingWidgetSummary
              title="Total Signup Revenue"
              icon="eva:diagonal-arrow-left-down-fill"
              percent={2.6}
              total={18765}
              chart={{
                series: [111, 136, 76, 108, 74, 54, 57, 84],
              }}
            />
          </Grid>
          <Grid item xs={12} md={4}>
            <BankingWidgetSummary
              title="Total Licence Revenue"
              icon="eva:diagonal-arrow-left-down-fill"
              percent={2.6}
              total={18765}
              chart={{
                series: [111, 136, 76, 108, 74, 54, 57, 84],
              }}
            />
          </Grid>

          <Grid item xs={12} lg={8}>
            <AppNewInvoice
              title="New users"
              tableData={[]}
              tableLabels={[
                { id: 'id', label: 'Name' },
                { id: 'category', label: 'Email' },
                { id: 'price', label: 'ICSS No' },
                { id: 'status', label: 'Status' },
                { id: '' },
              ]}
            />
          </Grid>

          <Grid item xs={12} md={6} lg={4}>
            <AnalyticsOrderTimeline title="Activities Timeline" list={[]} />
          </Grid>

          {/*  <Grid item xs={12} md={6} lg={4}>
            <AppTopInstalledCountries title="Top Installed Countries" list={_appInstalled} />
          </Grid>

          <Grid item xs={12} md={6} lg={4}>
            <AppTopAuthors title="Top Authors" list={_appAuthors} />
          </Grid>

          <Grid item xs={12} md={6} lg={4}>
            <Stack spacing={3}>
              <AppWidget
                title="Conversion"
                total={38566}
                icon="eva:person-fill"
                chart={{
                  series: 48,
                }}
              />

              <AppWidget
                title="Applications"
                total={55566}
                icon="eva:email-fill"
                color="info"
                chart={{
                  series: 75,
                }}
              />
            </Stack>
          </Grid> */}
        </Grid>
      </Container>
    </>
  );
}
