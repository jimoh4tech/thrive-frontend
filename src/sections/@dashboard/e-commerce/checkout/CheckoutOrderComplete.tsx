// @mui
import { Button, DialogProps, Divider, Stack, Typography } from '@mui/material';
// components
import { DialogAnimate } from '../../../../components/animate';
// assets
import { OrderCompleteIllustration } from '../../../../assets/illustrations';

// ----------------------------------------------------------------------

interface Props extends DialogProps {
  onReset: VoidFunction;
  onDownloadPDF: VoidFunction;
}

export default function CheckoutOrderComplete({ open, onReset, onDownloadPDF }: Props) {
  return (
    <DialogAnimate
      fullScreen
      open={open}
      PaperProps={{
        sx: {
          maxWidth: { md: 'calc(100% - 48px)' },
          maxHeight: { md: 'calc(100% - 48px)' },
        },
      }}
    >
      <Stack
        spacing={5}
        sx={{
          m: 'auto',
          maxWidth: 480,
          textAlign: 'center',
          px: { xs: 2, sm: 0 },
        }}
      >
        <Typography variant="h4">Thank you for your purchase!</Typography>

        <OrderCompleteIllustration sx={{ height: 260 }} />

        <Typography>
          Your subscription to Thrive platform was successful. You can now return to your dashboard
          .
        </Typography>

        <Divider sx={{ borderStyle: 'dashed' }} />

        <Stack
          spacing={2}
          justifyContent="space-between"
          direction={{ xs: 'column-reverse', sm: 'row' }}
        >
          <Button fullWidth size="large" variant="contained" onClick={onDownloadPDF}>
            Go To DashBoard
          </Button>
        </Stack>
      </Stack>
    </DialogAnimate>
  );
}
