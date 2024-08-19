import { Dialog, DialogContent, Typography } from '@mui/material';
import { EmailInboxIcon } from 'src/assets/icons';
import { ViewDialogProps } from './types';

const ViewDialog = ({ open, user }: ViewDialogProps) => (
  <Dialog open={open}>
    <DialogContent sx={{ p: 4, textAlign: 'center' }}>
      <EmailInboxIcon sx={{ mb: 5, height: 96 }} />

      <Typography variant="h3" paragraph>
        User Info
      </Typography>

      <Typography sx={{ color: 'text.secondary', mb: 5 }}>
        We have emailed a 6-digit confirmation code to , please enter the code in below box to
        verify your email.
      </Typography>

      {/* <AuthVerifyCodeForm onSubmit={onSubmit} /> */}

      {/* <Typography variant="body2" sx={{ my: 3 }}>
          Don’t have a code? &nbsp;
          <LoadingButton loading={loading} onClick={handleResend} variant="text">
            Resend code
          </LoadingButton>
        </Typography> */}

      {/* <Link
          component={NextLink}
          href={PATH_AUTH.login}
          color="inherit"
          variant="subtitle2"
          onClick={onClose}
          sx={{
            mx: 'auto',
            alignItems: 'center',
            display: 'inline-flex',
          }}
        >
          <Iconify icon="eva:chevron-left-fill" width={16} />
          Return
        </Link> */}
    </DialogContent>
  </Dialog>
);

export default ViewDialog;
