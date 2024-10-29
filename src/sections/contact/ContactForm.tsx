import { m } from 'framer-motion';
// @mui
import { Stack, Typography } from '@mui/material';
// components

// ----------------------------------------------------------------------

import * as Yup from 'yup';
// form
import { yupResolver } from '@hookform/resolvers/yup';
import { useForm } from 'react-hook-form';
// @mui
import { LoadingButton } from '@mui/lab';
// auth
import { creator } from 'src/actions';
// utils
// assets
// components
import { SendSharp } from '@mui/icons-material';
import { useAuthContext } from 'src/auth/useAuthContext';
import { MotionViewport, varFade } from '../../components/animate';
import FormProvider, { RHFTextField } from '../../components/hook-form';
import { useSnackbar } from '../../components/snackbar';

// ----------------------------------------------------------------------

export default function ContactForm() {
  const { user } = useAuthContext();

  const defaultValues = {
    name: user?.fullName,
    email: user?.email,
    subject: '',
    message: '',
  };

  const { enqueueSnackbar } = useSnackbar();

  const ContactSchema = Yup.object().shape({
    name: Yup.string().required('Name is required'),
    email: Yup.string().required('Email is required').email('Email must be a valid email address'),
    subject: Yup.string().required('Subject is required'),
    message: Yup.string().min(10, 'Message too short'),
  });

  const methods = useForm<FormValuesProps>({
    resolver: yupResolver(ContactSchema),
    // @ts-ignore
    defaultValues,
  });

  const {
    handleSubmit,
    formState: { isSubmitting },
    reset,
  } = methods;

  const onSubmit = async (data: FormValuesProps) => {
    try {
      const { message } = await creator('sendMessage', data);
      enqueueSnackbar(message);
      reset();
    } catch (err) {
      enqueueSnackbar(err.message || err, { variant: 'error' });
    }
  };

  return (
    <FormProvider methods={methods} onSubmit={handleSubmit(onSubmit)}>
      <Stack component={MotionViewport} spacing={5}>
        <m.div variants={varFade().inUp}>
          <Typography
            component="div"
            dangerouslySetInnerHTML={{
              __html: user
                ? `Hello ${user.firstName}, </br> How can I help you today`
                : '  Feel free to contact us. <br />  Leave us a message.  ',
            }}
            variant="h3"
          />
        </m.div>
        <Stack spacing={3}>
          {!user && (
            <>
              <m.div variants={varFade().inUp}>
                <RHFTextField name="name" label=" Name" />
              </m.div>

              <m.div variants={varFade().inUp}>
                <RHFTextField name="email" label="Email" />
              </m.div>
            </>
          )}

          <m.div variants={varFade().inUp}>
            <RHFTextField name="subject" label="Subject" />
          </m.div>

          <m.div variants={varFade().inUp}>
            <RHFTextField name="message" multiline rows={4} label="Message" />
          </m.div>

          <m.div variants={varFade().inUp}>
            <LoadingButton size="large" type="submit" variant="contained" loading={isSubmitting}>
              SEND MESSAGE <SendSharp sx={{ ml: 2 }} />
            </LoadingButton>
          </m.div>
        </Stack>
        <Stack gap={1}>
          <Typography color="primary.main" component="div" variant="overline">
            Contact Us
          </Typography>
          <Typography color="inherit" variant="body2">
            support@thrivebizng.com
          </Typography>
          <Typography color="inherit" variant="body2">
            +2349066189699, +2349067325337
          </Typography>
          <Typography color="inherit" variant="body2">
            THRIVE – Enterprise Hubs, 16a Trinity Avenue, Off Ligali Ayorinde, Victoria Island.
          </Typography>
        </Stack>
      </Stack>
    </FormProvider>
  );
}

type FormValuesProps = {
  name: string;
  email: string;
  subject: string;
  message: string;
};
