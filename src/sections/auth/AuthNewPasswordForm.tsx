import { useState } from 'react';
import * as Yup from 'yup';
// next
import { useRouter } from 'next/router';
// form
import { yupResolver } from '@hookform/resolvers/yup';
import { useForm } from 'react-hook-form';
// @mui
import { LoadingButton } from '@mui/lab';
import { IconButton, InputAdornment, Stack } from '@mui/material';
// routes
import { updater } from 'src/actions';
import { PATH_AUTH } from '../../routes/paths';
// components
import FormProvider, { RHFTextField } from '../../components/hook-form';
import Iconify from '../../components/iconify';
import { useSnackbar } from '../../components/snackbar';

// ----------------------------------------------------------------------

type FormValuesProps = {
  email: string;
  password: string;
  confirmPassword: string;
};

export default function AuthNewPasswordForm() {
  const { push } = useRouter();

  const { enqueueSnackbar } = useSnackbar();

  const [showPassword, setShowPassword] = useState(false);

  const emailRecoveryData =
    typeof window !== 'undefined'
      ? JSON.parse(sessionStorage.getItem('email-recovery') || '{}')
      : {};

  // if (!emailRecoveryData || emailRecoveryData.email) push('/reset-password');

  const VerifyCodeSchema = Yup.object().shape({
    email: Yup.string().required('Email is required').email('Email must be a valid email address'),
    password: Yup.string()
      .min(6, 'Password must be at least 6 characters')
      .required('Password is required'),
    confirmPassword: Yup.string()
      .required('Confirm password is required')
      .oneOf([Yup.ref('password')], 'Passwords must match'),
  });

  const defaultValues = {
    email: emailRecoveryData!.email || '',
    password: '',
    confirmPassword: '',
  };

  const methods = useForm({
    mode: 'onChange',
    resolver: yupResolver(VerifyCodeSchema),
    defaultValues,
  });

  const {
    handleSubmit,
    formState: { isSubmitting },
  } = methods;

  const updatePassword = async (data: FormValuesProps) => {
    try {
      if (emailRecoveryData.emailVerifiedToken) {
        await updater('resetpassword', { ...data, ...emailRecoveryData });
      }
      sessionStorage.removeItem('email-recovery');

      enqueueSnackbar('Change password success!');

      push(PATH_AUTH.login);
    } catch (error) {
      console.error(error);
      enqueueSnackbar(error.message || error, { variant: 'error' });
    }
  };

  return (
    <FormProvider methods={methods} onSubmit={handleSubmit(updatePassword)}>
      <Stack spacing={3}>
        <RHFTextField
          name="email"
          label="Email"
          disabled={!!emailRecoveryData.email}
          InputLabelProps={{ shrink: true }}
        />

        <RHFTextField
          name="password"
          label="Password"
          type={showPassword ? 'text' : 'password'}
          InputProps={{
            endAdornment: (
              <InputAdornment position="end">
                <IconButton onClick={() => setShowPassword(!showPassword)} edge="end">
                  <Iconify icon={showPassword ? 'eva:eye-fill' : 'eva:eye-off-fill'} />
                </IconButton>
              </InputAdornment>
            ),
          }}
        />

        <RHFTextField
          name="confirmPassword"
          label="Confirm New Password"
          type={showPassword ? 'text' : 'password'}
          InputProps={{
            endAdornment: (
              <InputAdornment position="end">
                <IconButton onClick={() => setShowPassword(!showPassword)} edge="end">
                  <Iconify icon={showPassword ? 'eva:eye-fill' : 'eva:eye-off-fill'} />
                </IconButton>
              </InputAdornment>
            ),
          }}
        />

        <LoadingButton
          fullWidth
          size="large"
          type="submit"
          variant="contained"
          loading={isSubmitting}
          sx={{ mt: 3 }}
        >
          Update Password
        </LoadingButton>
      </Stack>
    </FormProvider>
  );
}
