// @mui
import { LoadingButton } from '@mui/lab';
import { Box, BoxProps, Divider, Stack, Typography } from '@mui/material';
import { useState } from 'react';
import { usePaystackPayment } from 'react-paystack';
import { PaystackProps } from 'react-paystack/dist/types';
import Iconify from 'src/components/iconify/Iconify';
import Label from 'src/components/label/Label';
import { fCurrency } from 'src/utils/formatNumber';
import { fDate } from 'src/utils/formatTime';
import { useAuthContext } from 'src/auth/useAuthContext';
import { PFormValuesProps } from './PaymentAddress';
// components

// ----------------------------------------------------------------------
export interface PaymentProps {
  items: { name: string; label?: string; amount: number }[];
  data: PFormValuesProps;
  onSuccess: (ref: string) => void;
  reference?: string;
}

export default function PaymentSummary({
  sx,
  items,
  data,
  reference,
  onSuccess,
  ...other
}: PaymentProps & BoxProps) {
  const total = (() => {
    let _total = 0;
    for (let i = 0; i < items.length; i += 1) _total += items[i].amount;
    return _total;
  })();

  return (
    <Box
      sx={{
        p: { sm: 5, xs: 3 },
        borderRadius: 2,
        bgcolor: 'background.neutral',
        ...sx,
      }}
      {...other}
    >
      <Typography variant="h6" sx={{ mb: 5 }}>
        Summary
      </Typography>

      <Stack spacing={1.5}>
        {items.map(({ name, label, amount }) => (
          <>
            <Stack direction="row" justifyContent="space-between" key={name}>
              <Stack direction={{ sm: 'row' }} spacing={2}>
                <Typography variant="body2" sx={{ color: 'text.secondary' }}>
                  {name}
                </Typography>

                {label && (
                  <Label fontSize={10} color="error">
                    {label}
                  </Label>
                )}
              </Stack>

              <Typography variant="h6">{fCurrency(amount)}</Typography>
            </Stack>

            <Divider sx={{ borderStyle: 'dashed' }} />
          </>
        ))}

        <Stack direction="row" alignItems="center" justifyContent="space-between">
          <Typography variant="h5">Total Billed</Typography>

          <Typography variant="h5">{fCurrency(total)}</Typography>
        </Stack>

        <Divider sx={{ borderStyle: 'dashed' }} />
      </Stack>

      <Typography component="div" variant="caption" sx={{ color: 'text.secondary', mt: 1 }}>
        * Subscription valid till 31 Dec. {fDate(null, 'year')}
      </Typography>

      <PaystackPay
        reference={reference}
        onClose={() => {}}
        onSuccess={onSuccess!}
        amount={total}
        email={data.email}
      />

      <Stack alignItems="center" spacing={1}>
        <Stack direction="row" alignItems="center" spacing={1}>
          <Iconify icon="eva:shield-fill" sx={{ color: 'primary.main' }} />
          <Typography variant="subtitle2">Secure card payment</Typography>
        </Stack>

        <Typography variant="caption" sx={{ color: 'text.secondary', textAlign: 'center' }}>
          This is a secure 128-bit SSL encrypted payment
        </Typography>
      </Stack>
    </Box>
  );
}
const PaystackPay = ({
  email,
  amount,
  onClose,
  onSuccess,
  reference,
}: {
  email: string;
  amount: number;
  onSuccess: (ref: string) => void;
  onClose: VoidFunction;
  reference?: string;
}) => {
  const config: PaystackProps = {
    reference: reference || new Date().getTime().toString(),
    publicKey: process.env.NEXT_PUBLIC_PAYSTACK_KEY!,
    email,
    amount: amount * 100,
  };

  if (process.env.NEXT_PUBLIC_PAYSTACK_SPLIT_CODE)
    config.split_code = process.env.NEXT_PUBLIC_PAYSTACK_SPLIT_CODE;

  const { user } = useAuthContext();
  const initializePayment = usePaystackPayment(config);
  const [isSubmitting, setIsSubmitting] = useState(false);
  function handleSuccess(): void {
    setIsSubmitting(false);
    localStorage.setItem(`${user.email}-successfull`, config.reference!);
    onSuccess(config.reference!);
  }
  function handleClose(): void {
    setIsSubmitting(false);
    onClose();
  }

  const onInit = () => {
    initializePayment(handleSuccess, handleClose);
  };

  return (
    <LoadingButton
      fullWidth
      size="large"
      type="submit"
      variant="contained"
      sx={{ mt: 5, mb: 3 }}
      loading={isSubmitting}
      onClick={onInit}
    >
      Proceed to Payment
    </LoadingButton>
  );
};
