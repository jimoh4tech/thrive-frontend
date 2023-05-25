import * as Yup from 'yup';
// form
import { yupResolver } from '@hookform/resolvers/yup';
import { useForm } from 'react-hook-form';
// @mui
import { Stack, Card, InputAdornment, IconButton } from '@mui/material';
import { LoadingButton } from '@mui/lab';
// @types
import { useState } from 'react';
import { updater } from 'src/actions';
import { useAuthContext } from 'src/auth/useAuthContext';
import { IUserAccountChangePassword } from '../../../../@types/user';
// components
import Iconify from '../../../../components/iconify';
import { useSnackbar } from '../../../../components/snackbar';
import FormProvider, { RHFTextField } from '../../../../components/hook-form';

// ----------------------------------------------------------------------

type FormValuesProps = IUserAccountChangePassword;

export default function AccountChangePassword() {
  const { logout } = useAuthContext();
  const { enqueueSnackbar } = useSnackbar();

  const [showPassword, setShowPassword] = useState(false);

  const ChangePassWordSchema = Yup.object().shape({
    oldPassword: Yup.string().required('Old Password is required'),
    password: Yup.string()
      .required('New Password is required')
      .min(6, 'Password must be at least 6 characters')
      .test(
        'no-match',
        'New password must be different than old password',
        (value, { parent }) => value !== parent.oldPassword
      ),
    confirmPassword: Yup.string().oneOf([Yup.ref('password')], 'Passwords must match'),
  });

  const defaultValues = {
    oldPassword: '',
    password: '',
    confirmPassword: '',
  };

  const methods = useForm({
    resolver: yupResolver(ChangePassWordSchema),
    defaultValues,
  });

  const {
    reset,
    handleSubmit,
    formState: { isSubmitting },
  } = methods;

  const onSubmit = async (data: FormValuesProps) => {
    try {
      await updater('changepassword', data);
      reset();
      enqueueSnackbar('Password change success!');
      logout();
    } catch (error) {
      enqueueSnackbar(error.message || error, { variant: 'error' });
    }
  };

  return (
    <FormProvider methods={methods} onSubmit={handleSubmit(onSubmit)}>
      <Card>
        <Stack spacing={3} alignItems="flex-end" sx={{ p: 3 }}>
          <RHFTextField
            name="oldPassword"
            label="Old Password"
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
            label="Confirm Password"
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

          <LoadingButton type="submit" variant="contained" loading={isSubmitting}>
            Save Changes
          </LoadingButton>
        </Stack>
      </Card>
    </FormProvider>
  );
}
