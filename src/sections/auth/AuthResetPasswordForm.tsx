import * as Yup from 'yup';
// next
import { useRouter } from 'next/router';
// form
import { yupResolver } from '@hookform/resolvers/yup';
import { useForm } from 'react-hook-form';
// @mui
import { LoadingButton } from '@mui/lab';
// routes
import { requestVerifyEmail } from 'src/actions/authAction';
import { useState } from 'react';
import { useSnackbar } from 'notistack';
import { PATH_AUTH } from '../../routes/paths';
// components
import FormProvider, { RHFTextField } from '../../components/hook-form';
import VerifyEmail from './VerifyEmail';

// ----------------------------------------------------------------------

type FormValuesProps = {
  email: string;
};

export default function AuthResetPasswordForm() {
  const { push } = useRouter();
  const { enqueueSnackbar } = useSnackbar();

  const [openVerify, setOpenVerify] = useState(false);
  const [verifyToken, setVerifyToken] = useState('');
  const [emailVerifiedToken, setEmailVerifiedToken] = useState<string | null>(null);
  const [userData, setUserData] = useState<FormValuesProps | null>(null);

  const ResetPasswordSchema = Yup.object().shape({
    email: Yup.string().required('Email is required').email('Email must be a valid email address'),
  });

  const methods = useForm<FormValuesProps>({
    resolver: yupResolver(ResetPasswordSchema),
    defaultValues: { email: '' },
  });

  const {
    handleSubmit,
    getValues,
    formState: { isSubmitting },
  } = methods;

  const onSubmit = async (data: FormValuesProps) => {
    setUserData(data);

    try {
      if (emailVerifiedToken) await onResetPassword(emailVerifiedToken);
      else {
        const res = await requestVerifyEmail(data.email);

        setVerifyToken(res.verifyToken);

        setOpenVerify(true);
      }
    } catch (error) {
      console.error(error);
      enqueueSnackbar(error.message || error, { variant: 'error' });
    }
  };

  const onResetPassword = async (_emailVerifiedToken: string) => {
    try {
      setOpenVerify(false);
      setEmailVerifiedToken(_emailVerifiedToken);
      sessionStorage.setItem(
        'email-recovery',
        JSON.stringify({ email: userData?.email, emailVerifiedToken: _emailVerifiedToken })
      );
      push(PATH_AUTH.newPassword);
    } catch (error) {
      enqueueSnackbar(error);
    }
  };

  // sessionStorage.setItem('email-recovery', JSON.stringify( {email,verifyToken }));
  return (
    <>
      <FormProvider methods={methods} onSubmit={handleSubmit(onSubmit)}>
        <RHFTextField name="email" label="Email address" />

        <LoadingButton
          fullWidth
          size="large"
          type="submit"
          variant="contained"
          loading={isSubmitting}
          sx={{ mt: 3 }}
        >
          Send Request
        </LoadingButton>
      </FormProvider>
      {verifyToken && (
        <VerifyEmail
          cb={onResetPassword}
          email={getValues('email')}
          verifyToken={verifyToken}
          open={openVerify}
        />
      )}
    </>
  );
}
