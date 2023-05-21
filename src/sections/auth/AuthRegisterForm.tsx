import { useState } from 'react';
import * as Yup from 'yup';
// form
import { yupResolver } from '@hookform/resolvers/yup';
import { useForm } from 'react-hook-form';
// @mui
import { LoadingButton } from '@mui/lab';
import { Alert, IconButton, InputAdornment, Stack } from '@mui/material';
// auth
import moment from 'moment';
import { requestVerifyEmail } from 'src/actions/authAction';
import { phoneRegExp } from 'src/utils/regexp';
import { useAuthContext } from '../../auth/useAuthContext';
// components
import FormProvider, { RHFSelect, RHFTextField } from '../../components/hook-form';
import Iconify from '../../components/iconify';
import VerifyEmail from './VerifyEmail';

const ngos = [
  { id: '1', name: 'Hope Builders ' },
  { id: '2', name: 'Valucon' },
  { id: '3', name: 'Web of Hearts' },
  { id: '4', name: 'Society for Empowerment of Young Persons' },
  { id: '5', name: 'LAPO' },
  { id: '6', name: 'Sabi Hub' },
  { id: '7', name: 'VIISAUS' },
  { id: '8', name: 'Dofoll' },
  { id: '9', name: 'Kairos' },
  { id: '10', name: 'Genius Hub' },
  { id: '11', name: 'Others' },
];

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
