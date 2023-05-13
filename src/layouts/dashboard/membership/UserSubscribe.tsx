import { Container, Grid, Typography } from '@mui/material';
import { Box, Stack } from '@mui/system';
import Head from 'next/head';
import { useSettingsContext } from 'src/components/settings';
import useResponsive from 'src/hooks/useResponsive';
import PaymentAddress from './forms/PaymentAddress';
import PaymentSummary from './forms/PaymentSummary';

export default function UserSubscribe() {
  const isDesktop = useResponsive('up', 'md');

  const { themeStretch } = useSettingsContext();
  return (
    <>
      <Head>
        <title> Complete Subscription | ICSS Thrive</title>
      </Head>

      <Container maxWidth={themeStretch ? false : 'xl'}>
        <Stack sx={{ mt: 5 }} spacing={2}>
          <Box textAlign="center">
            <Typography variant="h4" gutterBottom>
              Complete Your Subscription
            </Typography>
            <Typography>To finish powering you up, please make a subscription payment.</Typography>
          </Box>

          <Grid container justifyContent="center" spacing={isDesktop ? 3 : 5}>
            <Grid item xs={12} md={4}>
              <PaymentAddress onInput={() => {}} />
            </Grid>

            <Grid item xs={12} md={4}>
              {/* <PaymentSummary data={{}} items={[]} onInput={()=>{}} /> */}
            </Grid>
          </Grid>
        </Stack>
      </Container>
    </>
  );
}
