import { useCallback } from 'react';
import * as Yup from 'yup';
// next
// form
import { yupResolver } from '@hookform/resolvers/yup';
import { useForm } from 'react-hook-form';
// @mui
import { LoadingButton } from '@mui/lab';
import { Card, Grid, Stack, Typography } from '@mui/material';
// routes
import { IMedia } from 'src/@types/media';
import { creator } from 'src/actions';
import { uploadSingle } from 'src/utils/cloudinary';
// @types
// components
import { useSnackbar } from 'notistack';
import FormProvider, {
  RHFEditor,
  RHFSelect,
  RHFSwitch,
  RHFTextField,
  RHFUpload,
} from '../../../components/hook-form';
//

// ----------------------------------------------------------------------

// ----------------------------------------------------------------------

export type FormValuesProps = IMedia & { mediaUrl: any };

export default function NewMediaForm({ categories }: { categories: any[] }) {
  const { enqueueSnackbar } = useSnackbar();

  const NewMediaSchema = Yup.object().shape({
    name: Yup.string().required('Title is required'),
    description: Yup.string(),
    categoryId: Yup.string().required('Category is required'),
    mediaUrl: Yup.mixed().required('MediaUrl is required'),
  });

  const defaultValues = {
    name: '',
    description: '',
    mediaUrl: null,
    categoryId: 1,
  };

  const methods = useForm<FormValuesProps>({
    resolver: yupResolver(NewMediaSchema),
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
        data: { public_id, format, height, width, folder, bytes, url },
      } = await uploadSingle(data.mediaUrl, 'media');
      await creator('media', {
        ...data,
        mediaUrl: public_id,
        format: format || url.split('.')[url.split('.').length - 1],
        metadata: { height, width, folder, bytes },
      });

      reset();
      enqueueSnackbar('Media successfully added!');
      // push(PATH_ADMIN.businessMedia.library);
    } catch (error) {
      enqueueSnackbar(error.message || error.error.message || 'Failed to publish media', {
        variant: 'error',
      });
    }
  };

  const handleDrop = useCallback(
    (acceptedFiles: File[]) => {
      const file = acceptedFiles[0];

      const newFile = Object.assign(file, {
        preview: URL.createObjectURL(file),
      });

      if (file) {
        setValue('mediaUrl', newFile, { shouldValidate: true });
      }
    },
    [setValue]
  );

  const handleRemoveFile = () => {
    setValue('mediaUrl', null);
  };

  return (
    <FormProvider methods={methods} onSubmit={handleSubmit(onSubmit)}>
      <Grid container spacing={3}>
        <Grid item xs={12} md={8}>
          <Card sx={{ p: 3 }}>
            <Stack spacing={3}>
              <RHFTextField name="name" label="Media Title" />

              <Stack spacing={1}>
                <Typography variant="subtitle2" sx={{ color: 'text.secondary' }}>
                  Description
                </Typography>

                <RHFEditor simple name="description" />
              </Stack>

              <Stack spacing={1}>
                <Typography variant="subtitle2" sx={{ color: 'text.secondary' }}>
                  Media
                </Typography>

                <RHFUpload
                  accept={{
                    'image/*': [],
                    'audio/*': [],
                    'video/*': [],
                    'text/*': ['.csv', '.txt', ''],
                    'application/*': [
                      '.doc',
                      '.xls',
                      '.xlsx',
                      '.docx',
                      '.gz',
                      '.pdf',
                      '.rar',
                      '.zip',
                    ],
                  }}
                  name="mediaUrl"
                  maxSize={3145728000}
                  onDrop={handleDrop}
                  onDelete={handleRemoveFile}
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
                  label="Platinum Media"
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
