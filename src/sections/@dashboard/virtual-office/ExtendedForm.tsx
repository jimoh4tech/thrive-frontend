// next
import * as Yup from 'yup';
// @mui
import { Box, Button, Card, Grid, InputAdornment, Typography } from '@mui/material';
// routes
import { yupResolver } from '@hookform/resolvers/yup';
import { useSnackbar } from 'notistack';
import { useForm } from 'react-hook-form';
import { virtualOfficeApply } from 'src/actions/virtualOfficeAction';
import FormProvider, { RHFTextField } from 'src/components/hook-form';
// auth
import { SeoIllustration } from 'src/assets/illustrations';
import { Stack } from '@mui/system';
import { useAuthContext } from '../../../auth/useAuthContext';
// components
import Iconify from '../../../components/iconify';

type FormValuesProps = {
  name: string;
  designation: string;
  address: string;
  taxId: string;
  cac: (File & { preview: string }) | null;
  validId: (File & { preview: string }) | null;
};

export default function ExtendedForm() {
  const { revalidateUser } = useAuthContext();

  // revalidateUser!();

  const { enqueueSnackbar } = useSnackbar();

  const { user } = useAuthContext();

  const UpdateUserSchema = Yup.object().shape({
    name: Yup.string().required('Business Name is required'),
    phone: Yup.string().required('Your Designation is required'),
    address: Yup.string().required('Address is required'),
    taxId: Yup.string().required('Business Tax ID is required'),
    cac: Yup.mixed().required('CAC document is required'),
    validId: Yup.mixed().optional(),
  });

  const defaultValues = {
    name: user?.business.name,
    designation: '',
    address: '',
    taxId: '',
    cac: null,
    validId: null,
  };

  const methods = useForm<FormValuesProps>({
    resolver: yupResolver(UpdateUserSchema),
    defaultValues,
  });

  const {
    setValue,
    handleSubmit,
    reset,
    formState: { isSubmitting },
  } = methods;

  const onSubmit = async (data: FormValuesProps) => {
    try {
      const res = await virtualOfficeApply(data);

      enqueueSnackbar(res.data.message);
      reset();
      revalidateUser!();
    } catch (err) {
      reset(data, { keepValues: true });
      console.error(err);
      enqueueSnackbar(err?.message || err, { variant: 'error' });
    }
  };

  const handleDrop = (acceptedFiles: File[], field: keyof typeof defaultValues) => {
    const file = acceptedFiles[0];

    const newFile = Object.assign(file, {
      preview: URL.createObjectURL(file),
    });

    if (newFile) {
      setValue(field, newFile, { shouldValidate: true });
    }
  };
  return (
    <Grid item sx={{ mb: 3, mt: 8 }}>
      <FormProvider methods={methods} onSubmit={handleSubmit(onSubmit)}>
        <Stack spacing={3} justifyContent="left" alignItems="left">
          <Typography variant="h4" textAlign="left">
            Additional Services
          </Typography>
          <RHFTextField
            name="callForwarding"
            placeholder="Call Forwarding"
            // onChange={(event) =>
            //   setValue('price', Number(event.target.value), { shouldValidate: true })
            // }
            InputLabelProps={{ shrink: true }}
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <Box component="span" sx={{ color: 'text.disabled' }}>
                    <Iconify icon="material-symbols:call-sharp" />
                  </Box>
                </InputAdornment>
              ),
              type: 'number',
            }}
          />
          <RHFTextField
            name="bulkDispatch"
            placeholder="Bulk Mail Dispatchg"
            // onChange={(event) =>
            //   setValue('price', Number(event.target.value), { shouldValidate: true })
            // }
            InputLabelProps={{ shrink: true }}
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <Box component="span" sx={{ color: 'text.disabled' }}>
                    <Iconify icon="ic:round-mark-email-read" />
                  </Box>
                </InputAdornment>
              ),
              type: 'number',
            }}
          />
          <RHFTextField
            name="vistorHosting"
            placeholder="Visitor Hosting"
            // onChange={(event) =>
            //   setValue('price', Number(event.target.value), { shouldValidate: true })
            // }
            InputLabelProps={{ shrink: true }}
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <Box component="span" sx={{ color: 'text.disabled' }}>
                    <Iconify icon="ion:people" />
                  </Box>
                </InputAdornment>
              ),
              type: 'number',
            }}
          />
          <RHFTextField
            name="adminSupport"
            placeholder="Admin Support"
            // onChange={(event) =>
            //   setValue('price', Number(event.target.value), { shouldValidate: true })
            // }
            InputLabelProps={{ shrink: true }}
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <Box component="span" sx={{ color: 'text.disabled' }}>
                    <Iconify icon="solar:chat-round-call-bold-duotone" />
                  </Box>
                </InputAdornment>
              ),
              type: 'number',
            }}
          />
        </Stack>
      </FormProvider>
    </Grid>
  );
}
