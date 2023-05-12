// next
import NextLink from 'next/link';
// @mui
import {
  Button,
  Dialog,
  DialogContent,
  Grid,
  Link,
  Typography,
  useMediaQuery,
} from '@mui/material';
// layouts
// routes
import { Box, Container, Stack, useTheme } from '@mui/system';
import { useEffect, useState } from 'react';
import { useAuthContext } from 'src/auth/useAuthContext';
import useResponsive from 'src/hooks/useResponsive';
import { initiatePayment, verifyPayment } from 'src/actions/paymentAction';
import { useSnackbar } from 'notistack';
import useSWR from 'swr';
import { PATH_AUTH } from '../../../routes/paths';
// components
import Iconify from '../../../components/iconify';
// sections
// assets
import { PlanPremiumIcon } from '../../../assets/icons';
import PaymentAddress from './forms/PaymentAddress';
import PaymentSummary, { PaymentProps } from './forms/PaymentSummary';

const PaymentPopup = ({
  open,
  onClose,
  cb,
  items,
}: {
  open: boolean;
  onClose?: VoidFunction;
  items: PaymentProps['items'];
  cb?: (ref: string, txnId?: number) => Promise<void>;
}) => {
  const { user } = useAuthContext();

  const [data, setData] = useState({
    fullName: user?.fullName || '',
    email: user?.email || '',
    phoneNumber: user?.phone || '',
    address: user?.address || '',
  });

  const { enqueueSnackbar } = useSnackbar();

  const initPayment = async () => {
    try {
      const {
        data: { authorizationUrl: url, reference },
      } = await initiatePayment(
        (() => {
          let total = 0;
          for (let i = 0; i < items.length; i += 1) total += items[i].amount;
          return total;
        })()
      );

      await cb!(reference);

      window.open(url, '_blank', 'noreferrer');
    } catch (error) {
      enqueueSnackbar(error.message || error, { variant: 'error' });
    }
  };

  return (
    <Dialog fullWidth maxWidth="lg" open={open}>
      <DialogContent
        sx={{ py: 10, textAlign: 'center', justifyContent: 'center', alignItems: 'center' }}
      >
        <Container>
          <PlanPremiumIcon sx={{ mb: 5, height: 96 }} />
          <Stack sx={{ mt: 5 }} spacing={2}>
            <Box textAlign="center">
              <Typography variant="h4" gutterBottom>
                Complete Your Subscription
              </Typography>
              <Typography>
                To finish powering you up, please make a subscription payment.
              </Typography>
            </Box>

            <Box
              rowGap={3}
              columnGap={2}
              display="grid"
              gridTemplateColumns={{
                xs: 'repeat(1, 1fr)',
                sm: 'repeat(2, 1fr)',
              }}
            >
              <Box>
                <PaymentAddress onInput={(name, value) => setData({ ...data, name: value })} />
              </Box>

              <Box>
                <PaymentSummary data={data} onSubmit={initPayment} items={items} />
              </Box>
            </Box>
          </Stack>
          <Button
            color="inherit"
            variant="text"
            onClick={onClose}
            sx={{
              mt: 8,
              mx: 'auto',
              alignItems: 'center',
              display: 'inline-flex',
            }}
          >
            <Iconify icon="eva:chevron-left-fill" width={16} />
            Return
          </Button>
        </Container>
      </DialogContent>
    </Dialog>
  );
};

export default PaymentPopup;
