import { useState } from 'react';
import * as Yup from 'yup';
// form
import { yupResolver } from '@hookform/resolvers/yup';
import { Controller, useForm } from 'react-hook-form';
// @mui
import { LoadingButton } from '@mui/lab';
import { Alert, IconButton, InputAdornment, Stack, TextField } from '@mui/material';
// auth
import { DatePicker } from '@mui/x-date-pickers';
import moment from 'moment';
import { requestVerifyEmail } from 'src/actions/authAction';
import { phoneRegExp } from 'src/utils/regexp';
import { useAuthContext } from '../../auth/useAuthContext';
// components
import FormProvider, { RHFTextField } from '../../components/hook-form';
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
  dob: string;
  afterSubmit?: string;
};

export default function AuthRegisterForm() {
  const { register } = useAuthContext();

  const [showPassword, setShowPassword] = useState(false);
  const [openVerify, setOenVerify] = useState(false);
  const [verifyToken, setVerifyToken] = useState('');
  const [userData, setUserData] = useState<FormValuesProps | null>(null);

  const RegisterSchema = Yup.object().shape({
    firstName: Yup.string().required('First name required'),
    lastName: Yup.string().required('Last name required'),
    email: Yup.string().required('Email is required').email('Email must be a valid email address'),
    phone: Yup.string().matches(phoneRegExp, 'Phone number is not valid'),
    dob: Yup.date().required('Date of Birth is required'),
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
    dob: '',
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
    control,
    formState: { errors, isSubmitting, isSubmitSuccessful },
  } = methods;

  const onSubmit = async (data: FormValuesProps) => {
    try {
      setUserData(data);
      const res = await requestVerifyEmail(data.email);

      setVerifyToken(res.verifyToken);

      setOenVerify(true);
    } catch (error) {
      console.error(error);
      setError('afterSubmit', {
        ...error,
        message: error.message || error,
      });
    }
  };

  const registerUser = async (emailVerifiedToken: string) => {
    setOenVerify(false);
    try {
      if (userData) {
        await register({
          ...userData,
          emailVerifiedToken,
          dob: moment(userData.dob).format('yyyy-MM-DD'),
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

          <Controller
            name="dob"
            control={control}
            render={({ field, fieldState: { error } }) => (
              <DatePicker
                label="Date of Birth"
                value={field.value}
                onChange={(newValue) => {
                  field.onChange(newValue);
                }}
                renderInput={(params) => (
                  <TextField {...params} fullWidth error={!!error} helperText={error?.message} />
                )}
              />
            )}
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
        />
      )}
    </>
  );
}
