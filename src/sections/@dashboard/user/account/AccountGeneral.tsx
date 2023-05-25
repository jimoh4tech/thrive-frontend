import { useCallback, useState } from 'react';
import * as Yup from 'yup';
// form
import { yupResolver } from '@hookform/resolvers/yup';
import { Controller, useForm } from 'react-hook-form';
// @mui
import { LoadingButton } from '@mui/lab';
import { Alert, Card, Grid, Stack, TextField, Typography } from '@mui/material';
// auth
import { DatePicker } from '@mui/x-date-pickers';
import { updater } from 'src/actions';
import { uploadSingle } from 'src/utils/cloudinary';
import { useAuthContext } from '../../../../auth/useAuthContext';
// utils
import { fData } from '../../../../utils/formatNumber';
// assets
// components
import FormProvider, {
  RHFSelect,
  RHFTextField,
  RHFUploadAvatar,
} from '../../../../components/hook-form';
import { useSnackbar } from '../../../../components/snackbar';
import { CustomFile } from '../../../../components/upload';

// ----------------------------------------------------------------------

type FormValuesProps = {
  phone: string;
  firstName: string;
  lastName: string;
  gender: string;
  dob: string;

  avatarUrl: CustomFile | string | null;
  isApproved: boolean;
  afterSubmit?: string;
};

export default function AccountGeneral() {
  const { enqueueSnackbar } = useSnackbar();

  const { user } = useAuthContext();

  const UpdateUserSchema = Yup.object().shape({
    firstName: Yup.string().required('Firstname is required'),
    lastName: Yup.string().required('Lastname is required'),
    avatarUrl: Yup.mixed().required('Avatar is required'),
    phone: Yup.string().required('Phone number is required'),
    bio: Yup.string(),
    gender: Yup.string(),
  });

  const defaultValues = {
    firstName: user?.firstName || '',
    lastName: user?.lastName || '',
    avatarUrl: user?.avatarUrl || null,
    phone: user?.phone || '',
    isApproved: user?.isApproved || false,
    gender: user?.gender || '',
    bio: user?.bio || '',
  };

  const methods = useForm<FormValuesProps>({
    resolver: yupResolver(UpdateUserSchema),
    defaultValues,
  });

  const {
    setValue,
    handleSubmit,
    control,
    setError,
    getValues,
    formState: { errors, isSubmitting },
  } = methods;

  const [loading, setLoading] = useState(false);

  const updateProfile = async ({ avatarUrl, ...data }: FormValuesProps) => {
    try {
      await updater('user', data);
      enqueueSnackbar('Profile update success!');
    } catch (error) {
      console.error(error);
      setError('afterSubmit', {
        ...error,
        message: error.message || error,
      });
    }
  };

  const handleDrop = useCallback(
    async (acceptedFiles: File[]) => {
      const newFile = acceptedFiles[0];

      if (newFile) {
        setLoading(true);
        setValue('avatarUrl', newFile, { shouldValidate: true });

        try {
          const res = await uploadSingle(newFile, `avatar`);
          await updater('user', { avatarUrl: res.data.public_id });
        } catch (err) {
          console.error(err);
          enqueueSnackbar(err?.message || err, { variant: 'error' });
        }
        setLoading(false);
      }
    },
    [enqueueSnackbar, setValue]
  );

  return (
    <FormProvider methods={methods} onSubmit={handleSubmit(updateProfile)}>
      <Grid container spacing={3}>
        <Grid item xs={12} md={4}>
          <Card sx={{ py: 10, px: 3, textAlign: 'center' }}>
            <RHFUploadAvatar
              name="avatarUrl"
              // files={[newDP || getValues('avatarUrl') || '']}
              maxSize={3145728}
              onDrop={handleDrop}
              helperText={
                <Typography
                  variant="caption"
                  sx={{
                    mt: 2,
                    mx: 'auto',
                    display: 'block',
                    textAlign: 'center',
                    color: 'text.secondary',
                  }}
                >
                  Allowed *.jpeg, *.jpg, *.png, *.gif
                  <br /> max size of {fData(3145728)}
                </Typography>
              }
            />
          </Card>
        </Grid>

        <Grid item xs={12} md={8}>
          <Card sx={{ p: 3 }}>
            <Stack spacing={2.5}>
              {!!errors.afterSubmit && <Alert severity="error">{errors.afterSubmit.message}</Alert>}

              <Stack direction={{ xs: 'column', sm: 'row' }} spacing={2}>
                <RHFTextField name="firstName" label="First name" />
                <RHFTextField name="lastName" label="Last name" />
              </Stack>

              <RHFTextField name="phone" label="Phone Number" />

              <Stack direction="row" spacing={2}>
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
                        <TextField
                          {...params}
                          fullWidth
                          error={!!error}
                          helperText={error?.message}
                        />
                      )}
                    />
                  )}
                />

                <RHFSelect native name="gender" label="Gender" disabled={!!user.gender || false}>
                  <option value="" />
                  {['Male', 'Female'].map((val) => (
                    <option key={val} value={val}>
                      {val}
                    </option>
                  ))}
                </RHFSelect>
              </Stack>

              <RHFTextField name="bio" multiline rows={4} label="Bio" />
            </Stack>

            <Stack spacing={3} alignItems="flex-end" sx={{ mt: 3 }}>
              <LoadingButton type="submit" variant="contained" loading={isSubmitting}>
                Save Changes
              </LoadingButton>
            </Stack>
          </Card>
        </Grid>
      </Grid>
    </FormProvider>
  );
}
