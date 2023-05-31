// next
// @mui
import { Button, Dialog, DialogContent, Typography } from '@mui/material';
// layouts
// routes
import { Box, Container, Stack } from '@mui/system';
import { useAuthContext } from 'src/auth/useAuthContext';
// components
import Iconify from '../../../components/iconify';
// sections
// assets
import { PlanPremiumIcon } from '../../../assets/icons';
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
  cb?: (ref: string, txnId?: number) => void;
}) => {
  const { user } = useAuthContext();

  const data = {
    fullName: user?.fullName || '',
    email: user?.email || '',
    phoneNumber: user?.phone || '',
    address: user?.address || '',
  };

  return (
    <Dialog fullWidth maxWidth="sm" open={open}>
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

            {/* <Box>
                <PaymentAddress onInput={(name, value) => setData({ ...data, fullName: value })} />
              </Box> */}

            <PaymentSummary data={data} onSuccess={cb!} items={items} />
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
