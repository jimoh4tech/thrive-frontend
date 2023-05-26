// next
import NextLink from 'next/link';
// @mui
import { Link, Stack, Typography } from '@mui/material';
// layouts
import LoginLayout from '../../layouts/login';
// routes
import { PATH_AUTH, PATH_PAGE } from '../../routes/paths';
//
import AuthRegisterForm from './AuthRegisterForm';

// ----------------------------------------------------------------------

export default function Register() {
  return (
    <LoginLayout title="Access all the tools you need to boost your business">
      <Stack spacing={2} sx={{ mb: 5, position: 'relative' }}>
        <Typography variant="h4">Get started</Typography>

        <Stack direction="row" spacing={0.5}>
          <Typography variant="body2"> Already have an account? </Typography>

          <Link component={NextLink} href={PATH_AUTH.login} variant="subtitle2">
            Sign in
          </Link>
        </Stack>
      </Stack>

      <AuthRegisterForm />

      <Typography
        component="div"
        sx={{ color: 'text.secondary', mt: 3, typography: 'caption', textAlign: 'center' }}
      >
        {'By signing up, I agree to '}
        <Link href={PATH_PAGE.termsCondition} underline="always" color="primary.main">
          Terms and Conditions
        </Link>
        {' and '}
        <Link href={PATH_PAGE.privacy} underline="always" color="primary.main">
          Privacy Policy
        </Link>
        .
      </Typography>
    </LoginLayout>
  );
}
