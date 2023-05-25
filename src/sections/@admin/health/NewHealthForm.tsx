import { useCallback, useEffect, useState } from 'react';
import * as Yup from 'yup';
// next
// form
import { yupResolver } from '@hookform/resolvers/yup';
import { useForm } from 'react-hook-form';
// @mui
import { LoadingButton } from '@mui/lab';
import { Card, Grid, Stack, Typography } from '@mui/material';
// routes
import { IHealth } from 'src/@types/health';
import { creator, loader } from 'src/actions';
import { uploadSingle } from 'src/utils/cloudinary';
// @types
// components
import FormProvider, {
  RHFEditor,
  RHFSelect,
  RHFSwitch,
  RHFTextField,
  RHFUpload,
} from '../../../components/hook-form';
import { useSnackbar } from '../../../components/snackbar';
//

// ----------------------------------------------------------------------

// ----------------------------------------------------------------------

export type FormValuesProps = IHealth & { cover: any };

export default function NewHealthForm({ categories }: { categories: any[] }) {
  const { enqueueSnackbar } = useSnackbar();

  const NewTemplateSchema = Yup.object().shape({
    name: Yup.string().required('Title is required'),
    email: Yup.string().email('Invalid email address').required('Title is required'),
    phome: Yup.string().required('Title is required'),
    bio: Yup.string().required('Bio is required'),
    logo: Yup.mixed(),
    url: Yup.string().url('Invalid url'),
    cover: Yup.mixed().required('cover is required'),
    categoryId: Yup.number().required('Pls select a category'),
  });

  const defaultValues = {
    name: '',
    email: '',
    phone: '',
    bio: '',
    logo: '',
    url: '',
    cover: null,
    categoryId: null,
  };

  const methods = useForm<FormValuesProps>({
    resolver: yupResolver(NewTemplateSchema),
    defaultValues,
  });

  const {
    reset,
    setValue,
    handleSubmit,
    formState: { isSubmitting },
  } = methods;

  const onSubmit = async (data: FormValuesProps) => {
    try {
      const {
        data: { public_id },
      } = await uploadSingle(data.cover, 'health');
      await creator('healthInstitutions', {
        ...data,
        cover: public_id,
      });

      reset();
      enqueueSnackbar('Media successfully added!');
      // push(PATH_ADMIN.businessMedia.library);
    } catch (error) {
      enqueueSnackbar(error.message || error.error.message || 'Failed to publish template', {
        variant: 'error',
      });
    }
  };

  const handleDrop = useCallback(
    (acceptedFiles: File[], field: 'cover' | 'logo') => {
      const file = acceptedFiles[0];

      const newFile = Object.assign(file, {
        preview: URL.createObjectURL(file),
      });

      if (file) {
        setValue(field, newFile, { shouldValidate: true });
      }
    },
    [setValue]
  );

  const handleRemoveFile = (field: 'cover' | 'logo') => {
    setValue(field, null);
  };

  return (
    <FormProvider methods={methods} onSubmit={handleSubmit(onSubmit)}>
      <Grid container spacing={3}>
        <Grid item xs={12} md={8}>
          <Card sx={{ p: 3 }}>
            <Stack spacing={3}>
              <RHFTextField name="name" label="Provider Name" />

              <RHFTextField name="email" label="Provider Email" />

              <RHFTextField name="phone" label="Provider Phone Number" />

              <RHFTextField name="url" label="Provider Website" />

              <Stack spacing={1}>
                <Typography variant="subtitle2" sx={{ color: 'text.secondary' }}>
                  Description
                </Typography>

                <RHFEditor simple name="bio" />
              </Stack>

              <Stack spacing={1}>
                <Typography variant="subtitle2" sx={{ color: 'text.secondary' }}>
                  Provider Logo
                </Typography>

                <RHFUpload
                  accept={{
                    'image/*': [],
                  }}
                  name="logo"
                  maxSize={3145728}
                  onDrop={(_) => handleDrop(_, 'logo')}
                  onDelete={() => handleRemoveFile('logo')}
                />
              </Stack>

              <Stack spacing={1}>
                <Typography variant="subtitle2" sx={{ color: 'text.secondary' }}>
                  Media
                </Typography>

                <RHFUpload
                  accept={{
                    'image/*': [],
                  }}
                  name="cover"
                  maxSize={3145728}
                  onDrop={(_) => handleDrop(_, 'cover')}
                  onDelete={() => handleRemoveFile('cover')}
                />
              </Stack>
            </Stack>
          </Card>
        </Grid>

        <Grid item xs={12} md={4}>
          <Stack spacing={3}>
            <Card sx={{ p: 3 }}>
              <Stack spacing={3}>
                <RHFSelect native name="categoryId" label="Category">
                  <option value="" />
                  {categories.map(({ id, name }) => (
                    <option key={id} value={id}>
                      {name}
                    </option>
                  ))}
                </RHFSelect>
                <RHFSwitch
                  name="isPlatinum"
                  label="Platinum Template"
                  // labelPlacement="start"
                  // sx={{ mb: 1, mx: 0, width: 1, justifyContent: 'space-between' }}
                />
              </Stack>
            </Card>

            <LoadingButton
              fullWidth
              type="submit"
              variant="contained"
              size="large"
              loading={isSubmitting}
            >
              Upload
            </LoadingButton>
          </Stack>
        </Grid>
      </Grid>
    </FormProvider>
  );
}
