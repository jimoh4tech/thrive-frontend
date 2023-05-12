// next
import * as Yup from 'yup';
// @mui
import { Box, Card, Grid, Typography } from '@mui/material';
// routes
import { yupResolver } from '@hookform/resolvers/yup';
import { LoadingButton } from '@mui/lab';
import { Stack } from '@mui/system';
import { useSnackbar } from 'notistack';
import { useForm } from 'react-hook-form';
import { virtualOfficeApply } from 'src/actions/virtualOfficeAction';
import FormProvider, { RHFTextField, RHFUpload } from 'src/components/hook-form';
// auth
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

export default function VirtualOfficeFirm() {
  const { revalidateUser } = useAuthContext();

  // revalidateUser!();

  const { enqueueSnackbar } = useSnackbar();

  const { user } = useAuthContext();

  const UpdateUserSchema = Yup.object().shape({
    name: Yup.string().required('Business Name is required'),
    designation: Yup.string().required('Your Designation is required'),
    address: Yup.string().required('Address is required'),
    taxId: Yup.string().required('Business Tax ID is required'),
    cac: Yup.mixed().required('CAC document is required'),
    validId: Yup.mixed().optional(),
  });

  const defaultValues = {
    name: user?.business.name,
    designation: '',
    address: user?.business.address,
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
      // const _data = new FormData();

      // const keys = Object.keys(business!);

      // for (let i = 0; i < keys.length; i += 1) {
      //   _data.append(keys[i], business[keys[i]]);
      // }

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
    <FormProvider methods={methods} onSubmit={handleSubmit(onSubmit)}>
      <Grid container justifyContent="center" alignItems="center">
        <Grid item xs={12} md={8}>
          <Card sx={{ p: 4 }}>
            <Stack spacing={2} alignItems="flex-end" sx={{ mt: 3 }}>
              <RHFTextField name="name" label="Business Name" />

              <RHFTextField name="designation" label="Business Email" />

              <RHFTextField name="address" label="Business Contact Address" />

              <RHFTextField name="taxId" label="Tax ID (Optional)" />

              <Box>
                <Typography variant="caption" sx={{ color: 'text.secondary' }}>
                  Upload CAC Document
                </Typography>
                <RHFUpload
                  name="cac"
                  maxSize={3145728}
                  onDrop={(_) => handleDrop(_, 'cac')}
                  onDelete={() => setValue('cac', null, { shouldValidate: true })}
                />
              </Box>
              <Box>
                <Typography variant="caption" sx={{ color: 'text.secondary' }}>
                  Upload Government Issued ID
                </Typography>
                <RHFUpload
                  name="validId"
                  maxSize={3145728}
                  onDrop={(_) => handleDrop(_, 'validId')}
                  onDelete={() => setValue('validId', null, { shouldValidate: true })}
                  helperText="NIMC, Driver’s License, Permanent Voter’s Card"
                />
              </Box>
            </Stack>

            <Stack spacing={3} alignItems="flex-end" sx={{ mt: 3 }}>
              <LoadingButton fullWidth type="submit" variant="contained" loading={isSubmitting}>
                Next <Iconify icon="zondicons:cheveron-right" />
              </LoadingButton>
            </Stack>
          </Card>
        </Grid>
      </Grid>
    </FormProvider>
  );
}
