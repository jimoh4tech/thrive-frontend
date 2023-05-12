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
import { creator, loader } from 'src/actions';
import { uploadSingle } from 'src/utils/cloudinary';
// @types
// components
import { IEvent } from 'src/@types/events';
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

export type FormValuesProps = IEvent & { cover: any };

export default function NewFinanceForm() {
  const { enqueueSnackbar } = useSnackbar();

  const [categories, setCategories] = useState([]);
  const [institutions, setInstitutions] = useState([]);

  const NewEventSchema = Yup.object().shape({
    name: Yup.string().required('Finance name is required'),
    description: Yup.string().required('Finance description is required'),
    cover: Yup.mixed().required('Cover image is required'),
    categoryId: Yup.string().required('Category is required'),
    institutionId: Yup.string().required('Institution is required'),
    url: Yup.string().required('Finance web address is required'),
  });

  const defaultValues = {
    name: '',
    description: '',
    cover: '',
    caetogryId: null,
    institutionId: null,
    url: '',
  };

  const methods = useForm<FormValuesProps>({
    resolver: yupResolver(NewEventSchema),
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
      } = await uploadSingle(data.cover, 'finace');
      await creator('finance', { ...data, cover: public_id });

      reset();
      enqueueSnackbar('Finance service successfully published!');
      // push(PATH_ADMIN.businessMedia.library);
    } catch (error) {
      enqueueSnackbar(
        error.message || error.error.message || 'Failed to publish financeial service',
        {
          variant: 'error',
        }
      );
    }
  };

  const handleDrop = useCallback(
    (acceptedFiles: File[]) => {
      const file = acceptedFiles[0];

      const newFile = Object.assign(file, {
        preview: URL.createObjectURL(file),
      });

      if (file) {
        setValue('cover', newFile, { shouldValidate: true });
      }
    },
    [setValue]
  );

  const handleRemoveFile = () => {
    setValue('cover', null);
  };

  const getCategories = useCallback(async () => {
    try {
      const _ = await loader('financeCats');

      setCategories(_);
    } catch (error) {
      enqueueSnackbar(error.message || 'Could not fetch event categories', { variant: 'error' });
    }
  }, [enqueueSnackbar]);

  const getInstitutions = useCallback(async () => {
    try {
      const _ = await loader('financeInstitutions');

      setInstitutions(_);
    } catch (error) {
      enqueueSnackbar(error.message || 'Could not fetch event categories', { variant: 'error' });
    }
  }, [enqueueSnackbar]);

  useEffect(() => {
    getCategories();
    getInstitutions();

    return () => {};
  }, [getCategories, getInstitutions]);

  return (
    <FormProvider methods={methods} onSubmit={handleSubmit(onSubmit)}>
      <Grid container spacing={3}>
        <Grid item xs={12} md={8}>
          <Card sx={{ p: 3 }}>
            <Stack spacing={3}>
              <RHFTextField name="name" label="Service Title" />

              <RHFTextField name="url" label="Service Website" />

              <Stack spacing={1}>
                <Typography variant="subtitle2" sx={{ color: 'text.secondary' }}>
                  Description
                </Typography>

                <RHFEditor simple name="description" />
              </Stack>

              <Stack spacing={1}>
                <Typography variant="subtitle2" sx={{ color: 'text.secondary' }}>
                  Finance
                </Typography>

                <RHFUpload
                  accept={{ 'image/*': [] }}
                  name="cover"
                  maxSize={3145728}
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

                <RHFSelect native name="institutionId" label="Institution">
                  <option value="" />
                  {institutions.map(({ id, name }) => (
                    <option key={id} value={id}>
                      {name}
                    </option>
                  ))}
                </RHFSelect>

                <RHFSwitch
                  name="isPlatinum"
                  label="Platinum Finance"
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
