import { useCallback, useEffect, useState } from 'react';
import * as Yup from 'yup';
// next
// form
import { yupResolver } from '@hookform/resolvers/yup';
import { Controller, useForm } from 'react-hook-form';
// @mui
import { LoadingButton } from '@mui/lab';
import { Card, Grid, Stack, TextField, TextFieldProps, Typography } from '@mui/material';
// routes
import { creator, loader } from 'src/actions';
import { uploadSingle } from 'src/utils/cloudinary';
// @types
// components
import { DatePicker } from '@mui/x-date-pickers';
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

export default function NewEventForm() {
  const { enqueueSnackbar } = useSnackbar();

  const [categories, setCategories] = useState([]);
  const [organizers, setOrganizers] = useState([]);

  const NewEventSchema = Yup.object().shape({
    name: Yup.string().required('Event name is required'),
    endDate: Yup.date()
      .min(Yup.ref('startDate'), 'End date must be later than start date')
      .required('End date is required'),
    description: Yup.string().required('Event description is required'),
    cover: Yup.mixed().required('Cover image is required'),
    categoryId: Yup.string().required('Category is required'),
    organizerId: Yup.string().required('Category is required'),
    amount: Yup.string().optional(),
    discount: Yup.string().optional(),
    discountType: Yup.string().optional(),
    url: Yup.string().required('Event web address is required'),
    location: Yup.string().required('Event location is required'),
  });

  const defaultValues = {
    name: '',
    startDate: new Date(),
    endDate: null,
    description: '',
    cover: '',
    categoryId: null,
    organizerId: null,
    amount: 0,
    discount: 0,
    descountType: null,
    url: '',
    location: '',
  };

  const methods = useForm<FormValuesProps>({
    resolver: yupResolver(NewEventSchema),
    defaultValues,
  });

  const {
    reset,
    setValue,
    handleSubmit,
    control,
    formState: { isSubmitting },
  } = methods;

  const onSubmit = async (data: FormValuesProps) => {
    try {
      const {
        data: { public_id },
      } = await uploadSingle(data.cover, 'event');
      await creator('events', { ...data, cover: public_id });

      reset();
      enqueueSnackbar('Event successfully added!');
      // push(PATH_ADMIN.businessMedia.library);
    } catch (error) {
      enqueueSnackbar(error.message || error.error.message || 'Failed to publish event', {
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
      const _categories = await loader('eventsCats');

      setCategories(_categories);
    } catch (error) {
      enqueueSnackbar(error.message || 'Could not fetch event categories', { variant: 'error' });
    }
  }, [enqueueSnackbar]);

  const getOrganizers = useCallback(async () => {
    try {
      const _categories = await loader('eventsOrganizers');

      setOrganizers(_categories);
    } catch (error) {
      enqueueSnackbar(error.message || 'Could not fetch event categories', { variant: 'error' });
    }
  }, [enqueueSnackbar]);

  useEffect(() => {
    getCategories();
    getOrganizers();

    return () => {};
  }, [getCategories, getOrganizers]);

  return (
    <FormProvider methods={methods} onSubmit={handleSubmit(onSubmit)}>
      <Grid container spacing={3}>
        <Grid item xs={12} md={8}>
          <Card sx={{ p: 3 }}>
            <Stack spacing={3}>
              <RHFTextField name="name" label="Event Title" />

              <RHFTextField name="location" label="Event Location" />

              <RHFTextField name="url" label="Event Website" />

              <Stack spacing={1}>
                <Typography variant="subtitle2" sx={{ color: 'text.secondary' }}>
                  Description
                </Typography>

                <RHFEditor simple name="description" />
              </Stack>

              <Stack spacing={1}>
                <Typography variant="subtitle2" sx={{ color: 'text.secondary' }}>
                  Event
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
                <Controller
                  name="startDate"
                  control={control}
                  render={({ field, fieldState: { error } }) => (
                    <DatePicker
                      {...field}
                      label="Start date"
                      inputFormat="dd/MM/yyyy"
                      renderInput={(params: TextFieldProps) => (
                        <TextField
                          fullWidth
                          {...params}
                          error={!!error}
                          helperText={error?.message}
                        />
                      )}
                    />
                  )}
                />

                <Controller
                  name="endDate"
                  control={control}
                  render={({ field, fieldState: { error } }) => (
                    <DatePicker
                      {...field}
                      label="End date"
                      inputFormat="dd/MM/yyyy"
                      renderInput={(params: TextFieldProps) => (
                        <TextField
                          fullWidth
                          {...params}
                          error={!!error}
                          helperText={error?.message}
                        />
                      )}
                    />
                  )}
                />

                <RHFSelect native name="categoryId" label="Category">
                  <option value="" />
                  {categories.map(({ id, name }) => (
                    <option key={id} value={id}>
                      {name}
                    </option>
                  ))}
                </RHFSelect>

                <RHFSelect native name="organizerId" label="Organizer">
                  <option value="" />
                  {organizers.map(({ id, name }) => (
                    <option key={id} value={id}>
                      {name}
                    </option>
                  ))}
                </RHFSelect>

                <RHFTextField type="number" name="amount" label="Event Ticket Amount" />

                <RHFTextField type="number" name="discount" label="Discount" />

                <RHFSelect native name="descountType" label="Discount Type">
                  <option value="" />
                  {['fixed', 'percent'].map((val) => (
                    <option key={val} value={val}>
                      {val}
                    </option>
                  ))}
                </RHFSelect>

                <RHFSwitch
                  name="isPlatinum"
                  label="Platinum Event"
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
