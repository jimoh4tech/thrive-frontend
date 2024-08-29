import { Avatar, Button, Container, Grid, Typography } from '@mui/material';
import { Box, Stack } from '@mui/system';
import Head from 'next/head';
import { useSettingsContext } from 'src/components/settings';
import useResponsive from 'src/hooks/useResponsive';
import { AppWelcome } from 'src/sections/@dashboard/general/app';
import { useAuthContext } from 'src/auth/useAuthContext';
import { useState } from 'react';
import { creator } from 'src/actions';
import { useSnackbar } from 'notistack';
import { fCurrency } from 'src/utils/formatNumber';
import Iconify from 'src/components/iconify';
import PaymentPopup from './PaymentPopup';

export default function UserSubscribe() {
  const [paymentRef, setPaymentRef] = useState('');
  const [openPaymentPopup, setOpenPaymentPopup] = useState(false);
  const [submitting, setIsSubmitting] = useState(false);
  const [plan, setPlan] = useState<'month' | 'year'>('month');

  const { user } = useAuthContext();

  const { enqueueSnackbar } = useSnackbar();

  const isDesktop = useResponsive('up', 'md');

  const { themeStretch } = useSettingsContext();

  const monthAmount = parseInt(process.env.NEXT_PUBLIC_PREMIUM_FEE || '0', 10);
  const yearAmount = parseInt(process.env.NEXT_PUBLIC_PREMIUM_YEAR_FEE || '0', 10);
  const planCode =
    plan === 'month'
      ? process.env.NEXT_PUBLIC_PAYSTACK_MONTHLY_PLAN_CODE
      : process.env.NEXT_PUBLIC_PAYSTACK_YEARLY_PLAN_CODE;

  const items = [
    {
      name: 'Subscription',
      amount: plan === 'month' ? monthAmount : yearAmount,
      label: plan === 'month' ? 'Premium' : '20% off',
    },
  ];

  const onInitializePayment = async () => {
    try {
      setIsSubmitting(true);

      const { reference } = await creator('userPremuimTxn', {
        amount: (() => {
          let _total = 0;
          for (let i = 0; i < items.length; i += 1) _total += items[i].amount;
          return _total;
        })(),
        plan: planCode,
      });

      setPaymentRef(reference);

      setOpenPaymentPopup(true);
    } catch (error) {
      enqueueSnackbar(error.message || error, { variant: 'error' });
    }
  };
  return (
    <>
      <Head>
        <title> Complete Subscription | Thrive</title>
      </Head>

      <Container maxWidth={themeStretch ? false : 'xl'}>
        <AppWelcome
          sx={{ bgcolor: 'info.lighter', color: 'grey.800', py: 3 }}
          title={`Hi,  ${user?.fullName}`}
          description="Your Account subscription has expired. Kindly renew your subscription from the available plans."
          img={
            <Avatar sx={{ bgcolor: '#fff', width: 100, height: 100, margin: 4 }}>
              <Iconify icon="mdi:info" sx={{ width: '80%', height: '80%', color: 'info.main' }} />
            </Avatar>
          }
        />
        <Stack sx={{ mt: 5 }} spacing={2}>
          <Box textAlign="center">
            <Typography variant="h4" gutterBottom>
              Complete Your Subscription
            </Typography>
            <Typography>To finish powering you up, please make a subscription payment.</Typography>
          </Box>

          <Grid container justifyContent="center" spacing={isDesktop ? 3 : 5}>
            {/* <Grid item xs={12} md={4}>
              <PaymentAddress onInput={() => {}} />
            </Grid> */}
            <Stack direction="row" spacing={3} justifyContent="center">
              <Button
                // LinkComponent={Link}
                size="large"
                // startIcon={<Iconify icon="fa:send-o" />}
                variant="outlined"
                // href={PATH_AUTH.register}
                onClick={() => {
                  setPlan('month');
                  onInitializePayment();
                }}
              >
                {`${fCurrency(monthAmount)}/Month`}
              </Button>
              <Button
                // LinkComponent={Link}
                size="large"
                // startIcon={<Tour />}
                variant="contained"
                onClick={() => {
                  setPlan('year');
                  onInitializePayment();
                }}
              >
                {`${fCurrency(yearAmount)}/Year`}
              </Button>
            </Stack>
          </Grid>
        </Stack>
      </Container>
      {paymentRef && (
        <PaymentPopup
          open={openPaymentPopup}
          onClose={() => setOpenPaymentPopup(false)}
          // cb={(ref) => onSubmit(ref)}
          items={items}
          reference={paymentRef}
          plan={planCode}
          closeModal={setOpenPaymentPopup}
        />
      )}
    </>
  );
}
