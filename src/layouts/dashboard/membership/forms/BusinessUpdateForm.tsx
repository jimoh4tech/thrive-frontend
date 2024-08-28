import * as Yup from 'yup';
// form
import { yupResolver } from '@hookform/resolvers/yup';
import { useForm } from 'react-hook-form';
// @mui
import { LoadingButton } from '@mui/lab';
import { Box, Card, Grid, InputAdornment, Stack } from '@mui/material';
// auth
import { useCallback, useEffect, useState } from 'react';
import { IIndustry } from 'src/@types/business';
import { loader, updater } from 'src/actions';
import Iconify from 'src/components/iconify/Iconify';
import { useAuthContext } from '../../../../auth/useAuthContext';
// utils
// assets
import { countries } from '../../../../assets/data';
// components
import FormProvider, { RHFSelect, RHFTextField } from '../../../../components/hook-form';
import { useSnackbar } from '../../../../components/snackbar';
import { CustomFile } from '../../../../components/upload';

// ----------------------------------------------------------------------

const SOCIAL_LINKS = [
  {
    hint: 'https://www.facebook.com/thrivebizsoutions',
    value: 'facebookLink',
    label: 'facebook url',
    icon: <Iconify icon="eva:facebook-fill" width={24} />,
  },
  {
    hint: 'https://instagram.com/thrive',
    value: 'instagramLink',
    label: 'instagram url',
    icon: <Iconify icon="ant-design:instagram-filled" width={24} />,
  },
  {
    hint: 'https://www.linkedin.com/company/thrivebizng',
    value: 'linkedinLink',
    label: 'linkedin url',
    icon: <Iconify icon="eva:linkedin-fill" width={24} />,
  },
  {
    hint: 'https://twitter.com/thrivebizng',
    value: 'twitterLink',
    label: 'twitter url',
    icon: <Iconify icon="eva:twitter-fill" width={24} />,
  },
] as const;

type FormValuesProps = {
  name: string;
  email: string;
  avatarUrl: CustomFile | string | null;
  phone: string;
  country: string;
  address: string;
  state: string;

  whatsappNumber: string;
  industryId: number;
  bio: string;
  facebookLink?: string;
  twitterLink?: string;
  instagramLink?: string;
  linkedinLink?: string;
};

export default function BusinessUpdateForm({ cb }: { cb?: VoidFunction }) {
  const {
    user: { business: busi },
    revalidateUser,
  } = useAuthContext();

  // revalidateUser!();

  const { enqueueSnackbar } = useSnackbar();

  const UpdateBusinessSchema = Yup.object().shape({
    name: Yup.string().required('Business Name is required'),
    email: Yup.string().required('Email is required').email('Email must be a valid email address'),
    phone: Yup.string().required('Business phone number is required'),
    whatsappNumber: Yup.string().optional(),
    country: Yup.string().required('Country is required'),
    address: Yup.string().required('Address is required'),
    state: Yup.string().required('State is required'),
    industryId: Yup.string().required('Business Industry is required'),
    slug: Yup.string()
      .trim()
      .matches(/^[A-Za-z0-9]+(?:-[A-Za-z0-9]+)*$/, 'Invalid slug')
      .required('Business Industry is required'),
    bio: Yup.string().min(30, 'Business description must be above 30 characters'),
    facebookLink: Yup.string().optional(),
    twitterLink: Yup.string().optional(),
    instagramLink: Yup.string().optional(),
    linkedinLink: Yup.string().optional(),
  });

  const urlArr = busi?.slug?.split('/');

  const defaultValues = {
    name: busi?.name || '',
    email: busi?.email || '',
    phone: busi?.phone || '',
    whatsappNumber: busi?.whatsappNumber || '',
    country: busi?.country || '',
    address: busi?.address || '',
    state: busi?.state || '',
    industryId: busi?.industryId || '',
    bio: busi?.bio || '',
    slug: urlArr ? urlArr[urlArr.length - 1] : '',
    designation: busi?.designation || '',
    facebookLink: busi?.facebookLink || '',
    twitterLink: busi?.twitterLink || '',
    instagramLink: busi?.instagramLink || '',
    linkedinLink: busi?.linkedinLink || '',
  };

  const methods = useForm<FormValuesProps>({
    resolver: yupResolver(UpdateBusinessSchema),
    // @ts-ignore
    defaultValues,
  });

  const {
    handleSubmit,
    formState: { isSubmitting },
  } = methods;

  const onSubmit = async (data: FormValuesProps) => {
    try {
      const { message } = await updater('userBusiness', {
        ...data,
        bio: data?.bio?.replace(/(\r\n|\n|\r)/g, '\\n').replace(/"/g, '\\"'),
      });
      enqueueSnackbar(message);
      revalidateUser!();
      cb!();
    } catch (err) {
      enqueueSnackbar(err.message || err, { variant: 'error' });
    }
  };

  const [industries, setIndustries] = useState<IIndustry[]>([]);

  const getIndustries = useCallback(async () => {
    try {
      const _industries = await loader('industries');

      setIndustries(_industries);
    } catch (error) {
      enqueueSnackbar(error.message || 'Could not fetch Industries', { variant: 'error' });
    }
  }, [enqueueSnackbar]);

  useEffect(() => {
    getIndustries();

    return () => {};
  }, [getIndustries]);
  return (
    <FormProvider methods={methods} onSubmit={handleSubmit(onSubmit)}>
      <Grid container justifyContent="center" alignItems="center">
        <Grid item xs={12} md={8}>
          <Card sx={{ p: 4 }}>
            <Box
              rowGap={3}
              columnGap={2}
              display="grid"
              gridTemplateColumns={{
                xs: 'repeat(1, 1fr)',
                sm: 'repeat(2, 1fr)',
              }}
            >
              <RHFTextField name="name" label="Business Name" disabled />

              <RHFTextField name="email" label="Business Email" />

              <RHFTextField name="phone" label="Phone Number" />

              <RHFTextField name="whatsappNumber" label="WhatsApp Number" />

              <RHFTextField name="address" label="Business Contact Address" />

              <RHFSelect native name="country" label="Country" placeholder="Country">
                <option value="" />
                {countries.map((country) => (
                  <option key={country.code} value={country.label}>
                    {country.label}
                  </option>
                ))}
              </RHFSelect>

              <RHFTextField name="state" label="State/Region" />

              <RHFSelect
                native
                name="industryId"
                label="Industry"
                placeholder="Industry"
                value={defaultValues.industryId}
              >
                <option value="" />
                {industries.map((_, i) => (
                  <option key={i} value={_.id}>
                    {_.name}
                  </option>
                ))}
              </RHFSelect>

              <RHFTextField name="designation" label="Your Designation" />

              <RHFTextField name="slug" label="Web URL" />

              {SOCIAL_LINKS.map((link) => (
                <RHFTextField
                  key={link.value}
                  name={link.value}
                  label={link.label}
                  InputProps={{
                    startAdornment: <InputAdornment position="start">{link.icon}</InputAdornment>,
                  }}
                  helperText={`hint: ${link.hint}`}
                />
              ))}
            </Box>

            <Stack spacing={2} alignItems="flex-end" sx={{ mt: 3 }}>
              <RHFTextField name="bio" multiline rows={4} label="Business Description" />
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
