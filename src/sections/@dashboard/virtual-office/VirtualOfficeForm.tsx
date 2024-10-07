// next
import * as Yup from 'yup';
// @mui
import { Box, Card, Checkbox, Grid, Typography } from '@mui/material';
// routes
import { yupResolver } from '@hookform/resolvers/yup';
import { LoadingButton } from '@mui/lab';
import { Stack } from '@mui/system';
import { useSnackbar } from 'notistack';
import { useForm } from 'react-hook-form';
import { virtualOfficeApply } from 'src/actions/virtualOfficeAction';
import FormProvider, { RHFTextField, RHFUpload } from 'src/components/hook-form';
// auth
import { useCallback, useState } from 'react';
import VirtualModal from 'src/components/virtual-modal';
import { uploadSingle } from 'src/utils/cloudinary';
import { useAuthContext } from '../../../auth/useAuthContext';
// components
import Iconify from '../../../components/iconify';

type FormValuesProps = {
  name: string;
  designation?: string;
  address?: string;
  taxId?: string;
  // cac?: (File & { preview: string }) | null;
  validId?: (File & { preview: string }) | null;
};

export default function VirtualOfficeFirm() {
  const { revalidateUser, user } = useAuthContext();

  // revalidateUser!();

  const { enqueueSnackbar } = useSnackbar();
  const [isCheck, setCheck] = useState(false);
  const [submitting, setIsSubmitting] = useState(false);

  const UpdateUserSchema = Yup.object().shape({
    name: Yup.string().required('Contact Name is required'),
    designation: Yup.string().optional(),
    address: Yup.string().optional(),
    taxId: Yup.string().optional(),
    // cac: Yup.mixed().optional(),
    validId: Yup.mixed().optional(),
  });

  const defaultValues = {
    name: '',
    designation: 'des',
    address: 'address',
    taxId: 'tax',
    // cac: null,
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

  const onSubmit = useCallback(
    async (data: FormValuesProps) => {
      setIsSubmitting(true);

      if (user.hasSubscription) {
        enqueueSnackbar(
          'This offer is only available for regular subscribers! Kindly refer to terms of service',
          { variant: 'info' }
        );
        setIsSubmitting(false);
        return;
      }
      try {
        console.log('I was clicked');
        const { validId } = data;

        if (validId) {
          const {
            data: { public_id },
          } = await uploadSingle(validId, 'validId');

          data.validId = public_id;
        } else {
          enqueueSnackbar('Government Issued ID is required');
          setIsSubmitting(false);
          return;
        }
        console.log(data);
        const res = await virtualOfficeApply(data);

        enqueueSnackbar(res.data.message);
        reset();
        revalidateUser!();
      } catch (err) {
        setIsSubmitting(false);
        reset(data, { keepValues: true });
        console.error(err);
        enqueueSnackbar(err?.message || err, { variant: 'error' });
      }
    },
    [enqueueSnackbar, reset, revalidateUser, user.hasSubscription]
  );

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
          <Card sx={{ p: 1 }}>
            <Stack spacing={2} alignItems="flex-end" sx={{ mt: 3 }}>
              <Typography variant="body1" color="chocolate">
                This is the details of the individual responsible to interface with our company to
                drop/pick items
              </Typography>
              <RHFTextField name="name" label="Contact Name" />

              {/* <RHFTextField name="designation" label="Business Email" /> */}

              {/* <RHFTextField name="address" label="Business Contact Address" /> */}

              {/* <RHFTextField name="taxId" label="Tax ID (Optional)" /> */}

              {/* <Box>
                <Typography variant="caption" sx={{ color: 'text.secondary' }}>
                  Upload CAC Document
                </Typography>
                <RHFUpload
                  name="cac"
                  maxSize={3145728}
                  onDrop={(_) => handleDrop(_, 'cac')}
                  onDelete={() => setValue('cac', null, { shouldValidate: true })}
                />
              </Box> */}
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
              <Stack direction="row">
                <Checkbox checked={isCheck} onChange={() => setCheck(!isCheck)} />
                <VirtualModal setCheck={setCheck} />
              </Stack>
            </Stack>

            <Stack spacing={3} alignItems="flex-end" sx={{ mt: 3 }}>
              <LoadingButton
                fullWidth
                type="submit"
                variant="contained"
                loading={isSubmitting || submitting}
                disabled={!isCheck}
              >
                Next <Iconify icon="zondicons:cheveron-right" />
              </LoadingButton>
            </Stack>
          </Card>
        </Grid>
      </Grid>
    </FormProvider>
  );
}
