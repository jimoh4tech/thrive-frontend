import * as Yup from 'yup';
// form
import { yupResolver } from '@hookform/resolvers/yup';
import { useForm } from 'react-hook-form';
// @mui
import { Box, Stack, Typography } from '@mui/material';
// auth
import { useEffect } from 'react';
import { useAuthContext } from '../../../../auth/useAuthContext';
// utils
// assets
// components
import FormProvider, { RHFTextField } from '../../../../components/hook-form';

// ----------------------------------------------------------------------

export type PFormValuesProps = {
  fullName: string;
  email: string;
  phoneNumber: string | null;
  address: string | null;
};

export default function PaymentAddress({
  onInput,
}: {
  onInput: (name: keyof FormValuesProps, vaue: string) => void;
}) {
  const { user } = useAuthContext();

  const UpdateUserSchema = Yup.object().shape({
    fullName: Yup.string().required('Name is required'),
    email: Yup.string().required('Email is required').email('Email must be a valid email address'),
    phoneNumber: Yup.string().required('Phone number is required'),
    address: Yup.string().required('Address is required'),
  });

  const defaultValues = {
    fullName: user?.fullName || '',
    email: user?.email || '',
    phoneNumber: user?.phoneNumber || '',
    address: user?.address || '',
  };

  const methods = useForm<FormValuesProps>({
    resolver: yupResolver(UpdateUserSchema),
    defaultValues,
  });

  const { handleSubmit, watch } = methods;

  const watchAll = watch();

  useEffect(() => {
    const subscription = watch((value, { name }) => onInput(name!, value!));
    return () => subscription.unsubscribe();
  }, [onInput, watch]);

  return (
    <FormProvider methods={methods}>
      <Box
        gap={5}
        sx={{
          p: { md: 5 },
          borderRadius: 2,
          border: (theme) => ({
            md: `dashed 1px ${theme.palette.divider}`,
          }),
        }}
      >
        <div>
          <Typography variant="h6">Billing Address</Typography>

          <Stack spacing={3} mt={5}>
            <RHFTextField name="fullName" fullWidth label="Fullname" />
            <RHFTextField name="phoneNumber" fullWidth label="Phone number" />
            <RHFTextField name="email" fullWidth label="Email" />
            <RHFTextField name="address" fullWidth label="Address" />
          </Stack>
        </div>
      </Box>
    </FormProvider>
  );
}
