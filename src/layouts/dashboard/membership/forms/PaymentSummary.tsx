// @mui
import { LoadingButton } from '@mui/lab';
import { Box, BoxProps, Divider, Stack, Typography } from '@mui/material';
import { useForm } from 'react-hook-form';
import FormProvider from 'src/components/hook-form/FormProvider';
import Iconify from 'src/components/iconify/Iconify';
import Label from 'src/components/label/Label';
import { fCurrency } from 'src/utils/formatNumber';
import { fDate } from 'src/utils/formatTime';
import { PFormValuesProps } from './PaymentAddress';
// components

// ----------------------------------------------------------------------
export interface PaymentProps {
  items: { name: string; label?: string; amount: number }[];
  data: PFormValuesProps;
  onSubmit?: VoidFunction;
}

export default function PaymentSummary({
  sx,
  items,
  data,
  onSubmit,
  ...other
}: PaymentProps & BoxProps) {
  const method = useForm();

  const {
    formState: { isSubmitting },
    handleSubmit,
  } = method;

  return (
    <Box
      sx={{
        p: 5,
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
            <Stack direction="row" justifyContent="space-between">
              <Typography variant="body2" sx={{ color: 'text.secondary' }}>
                {name}
              </Typography>

              {label && (
                <Label fontSize={10} color="error">
                  {label}
                </Label>
              )}

              <Typography variant="h6">₦{fCurrency(amount)}</Typography>
            </Stack>

            <Divider sx={{ borderStyle: 'dashed' }} />
          </>
        ))}

        <Stack direction="row" alignItems="center" justifyContent="space-between">
          <Typography variant="h5">Total Billed</Typography>

          <Typography variant="h5">
            ₦
            {(() => {
              let total = 0;
              for (let i = 0; i < items.length; i += 1) total += items[i].amount;
              return total;
            })()}
          </Typography>
        </Stack>

        <Divider sx={{ borderStyle: 'dashed' }} />
      </Stack>

      <Typography component="div" variant="caption" sx={{ color: 'text.secondary', mt: 1 }}>
        * Subscription valid till 31 Dec. {fDate(null, 'year')}
      </Typography>

      <FormProvider methods={method} onSubmit={handleSubmit(onSubmit!)}>
        <LoadingButton
          fullWidth
          size="large"
          type="submit"
          variant="contained"
          sx={{ mt: 5, mb: 3 }}
          loading={isSubmitting}
        >
          Proceed to Payment
        </LoadingButton>
      </FormProvider>

      <Stack alignItems="center" spacing={1}>
        <Stack direction="row" alignItems="center" spacing={1}>
          <Iconify icon="eva:shield-fill" sx={{ color: 'primary.main' }} />
          <Typography variant="subtitle2">Secure credit card payment</Typography>
        </Stack>

        <Typography variant="caption" sx={{ color: 'text.secondary', textAlign: 'center' }}>
          This is a secure 128-bit SSL encrypted payment
        </Typography>
      </Stack>
    </Box>
  );
}
