// next
import NextLink from 'next/link';
// @mui
import { Dialog, DialogContent, Link, Typography } from '@mui/material';
// layouts
import { useSnackbar } from 'notistack';
// routes
import { verifyEmail } from 'src/actions/authAction';
import { PATH_AUTH } from '../../routes/paths';
// components
import Iconify from '../../components/iconify';
// sections
import AuthVerifyCodeForm from './AuthVerifyCodeForm';
// assets
import { EmailInboxIcon } from '../../assets/icons';

const VerifyEmail = ({
  open,
  email,
  verifyToken,
  onClose,
  cb,
}: {
  open: boolean;
  email: string;
  verifyToken: string;
  onClose?: VoidFunction;
  cb?: (emailVerifiedToken: string) => void;
}) => {
  const { enqueueSnackbar } = useSnackbar();

  const onSubmit = async (code: string) => {
    try {
      const res = await verifyEmail({ email, code, verifyToken });

      cb!(res.emailVerifiedToken);
    } catch (error) {
      enqueueSnackbar(error.message || error);
    }
  };
  return (
    <Dialog open={open}>
      <DialogContent sx={{ p: 4, textAlign: 'center' }}>
        <EmailInboxIcon sx={{ mb: 5, height: 96 }} />

        <Typography variant="h3" paragraph>
          Please check your email!
        </Typography>

        <Typography sx={{ color: 'text.secondary', mb: 5 }}>
          We have emailed a 6-digit confirmation code to {email}, please enter the code in below box
          to verify your email.
        </Typography>

        <AuthVerifyCodeForm onSubmit={onSubmit} />

        <Typography variant="body2" sx={{ my: 3 }}>
          Don’t have a code? &nbsp;
          <Link variant="subtitle2">Resend code</Link>
        </Typography>

        <Link
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
        </Link>
      </DialogContent>
    </Dialog>
  );
};

export default VerifyEmail;
