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
  // const [shouldRegister, setShouldRegister] = useState(false);
  // const theme = useTheme();
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

      {/* <Card>
        <CardHeader
          title="Are your THRIVE Certified?"
          subheader="Confirm your membership"
          sx={{
            '& .MuiCardHeader-action': { alignSelf: 'center' },
          }}
        />
        Hello
        <Stack
          spacing={2}
          direction="row"
          alignItems="flex-end"
          sx={{
            p: theme.spacing(0, 3, 3, 3),
          }}
        >
          <Button
            fullWidth
            color="success"
            variant="contained"
            startIcon={<Iconify icon="eva:checkmark-circle-2-fill" />}
            onClick={() => console.log('ACCEPT')}
          >
            Accept
          </Button>

          <Button
            fullWidth
            color="error"
            variant="contained"
            startIcon={<Iconify icon="eva:close-circle-fill" />}
            onClick={() => console.log('REJECT')}
          >
            Reject
          </Button>
        </Stack>
      </Card> */}

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
