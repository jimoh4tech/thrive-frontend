import { useCallback, useEffect, useState } from 'react';
import * as Yup from 'yup';
// form
import { yupResolver } from '@hookform/resolvers/yup';
import { useForm } from 'react-hook-form';
// @mui
import { LoadingButton } from '@mui/lab';
import { Alert, IconButton, InputAdornment, Stack, Typography } from '@mui/material';
import { requestVerifyEmail } from 'src/actions/authAction';
import { phoneRegExp } from 'src/utils/regexp';
import { useSnackbar } from 'notistack';
import { loader } from 'src/actions';
import { useAuthContext } from '../../auth/useAuthContext';
// components
import FormProvider, { RHFSelect, RHFTextField } from '../../components/hook-form';
import Iconify from '../../components/iconify';
import VerifyEmail from './VerifyEmail';

// ----------------------------------------------------------------------

type FormValuesProps = {
  email: string;
  password: string;
  phone: string;
  confirmPassword: string;
  firstName: string;
  lastName: string;
  afterSubmit?: string;
};

export default function AuthRegisterForm() {
  const { register } = useAuthContext();

  const [showPassword, setShowPassword] = useState(false);
  const [openVerify, setOpenVerify] = useState(false);
  const [verifyToken, setVerifyToken] = useState('');
  const [emailVerifiedToken, setEmailVerifiedToken] = useState<string | null>(null);
  const [userData, setUserData] = useState<FormValuesProps | null>(null);

  const RegisterSchema = Yup.object().shape({
    firstName: Yup.string().required('First name required'),
    lastName: Yup.string().required('Last name required'),
    email: Yup.string().required('Email is required').email('Email must be a valid email address'),
    phone: Yup.string().matches(phoneRegExp, 'Phone number is not valid'),
    password: Yup.string()
      .required('Password is required')
      .min(6, 'Pass must not be less than 6 characters'),
    confirmPassword: Yup.string()
      .oneOf([Yup.ref('password'), 'Password mismatch'])
      .required('Confirm password is required')
      .equals([''], ''),
  });

  const defaultValues = {
    firstName: '',
    lastName: '',
    email: '',
    password: '',
    phomne: '',
    confirmPassword: '',
  };

  const methods = useForm<FormValuesProps>({
    resolver: yupResolver(RegisterSchema),
    defaultValues,
  });

  const {
    reset,
    setError,
    handleSubmit,
    getValues,
    formState: { errors, isSubmitting, isSubmitSuccessful },
  } = methods;

  const onSubmit = async (data: FormValuesProps) => {
    setUserData(data);

    try {
      if (emailVerifiedToken) await registerUser(emailVerifiedToken);
      else {
        const res = await requestVerifyEmail(data.email, 'register');

        setVerifyToken(res.verifyToken);

        setOpenVerify(true);
      }
    } catch (error) {
      console.error(error);
      setError('afterSubmit', {
        ...error,
        message: error.message || error,
      });
    }
    if (emailVerifiedToken) reset(userData!, { keepValues: true });
  };

  const registerUser = async (verifiedTooken: string) => {
    setOpenVerify(false);
    setEmailVerifiedToken(verifiedTooken);
    try {
      if (userData) {
        await register({
          ...userData,
          emailVerifiedToken: verifiedTooken,
        });
      }
      reset();
    } catch (error) {
      console.error(error);
      setError('afterSubmit', {
        ...error,
        message: error.message || error,
      });
    }
    reset(userData!, { keepValues: true });
  };

  const { enqueueSnackbar } = useSnackbar();

  const [ngos, setNgos] = useState([]);

  const getNgos = useCallback(async () => {
    try {
      const _ngos = await loader('ngos');

      setNgos(_ngos);
    } catch (error) {
      enqueueSnackbar(error.message || 'Could not fetch ngos', { variant: 'error' });
    }
  }, [enqueueSnackbar]);

  useEffect(() => {
    getNgos();

    return () => {};
  }, [getNgos]);

  return (
    <>
      <FormProvider methods={methods} onSubmit={handleSubmit(onSubmit)}>
        <Stack spacing={2.5}>
          {!!errors.afterSubmit && <Alert severity="error">{errors.afterSubmit.message}</Alert>}

          <Stack direction={{ xs: 'column', sm: 'row' }} spacing={2}>
            <RHFTextField name="firstName" label="First name" />
            <RHFTextField name="lastName" label="Last name" />
          </Stack>

          <RHFTextField name="email" label="Email address" />

          <RHFTextField name="phone" label="Phone Number" />

          <RHFSelect native name="ngoId" label="Partner Organization">
            <option value="" />
            {ngos.map(({ id, name }) => (
              <option key={id} value={id}>
                {name}
              </option>
            ))}
          </RHFSelect>

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

          <Typography
            component="div"
            sx={{ color: 'text.secondary', mt: 3, typography: 'caption', textAlign: 'center' }}
          >
            Please DO NOT include any sensitive information that you do not want to share with
            others on this web application.
          </Typography>

          <LoadingButton
            fullWidth
            color="inherit"
            size="large"
            type="submit"
            variant="contained"
            loading={isSubmitting || isSubmitSuccessful}
            sx={{
              bgcolor: 'primary.main',
              color: (theme) => (theme.palette.mode === 'light' ? 'common.white' : 'grey.800'),
              '&:hover': {
                bgcolor: 'primary.main',
                color: (theme) => (theme.palette.mode === 'light' ? 'common.white' : 'grey.800'),
              },
            }}
          >
            Create account
          </LoadingButton>
        </Stack>
      </FormProvider>

      {verifyToken && (
        <VerifyEmail
          cb={registerUser}
          email={getValues('email')}
          verifyToken={verifyToken}
          open={openVerify}
          loading={isSubmitting}
          onResend={handleSubmit(onSubmit)}
        />
      )}
    </>
  );
}
