import * as Yup from 'yup';
// form
import { yupResolver } from '@hookform/resolvers/yup';
import { useForm } from 'react-hook-form';
// @mui
import { LoadingButton } from '@mui/lab';
import { Box, Card, Grid, InputAdornment, Stack, Typography } from '@mui/material';
// auth
import { useCallback, useEffect, useState } from 'react';
import { createBusiness } from 'src/actions/businessActions';
import Iconify from 'src/components/iconify/Iconify';
import { uploadSingle } from 'src/utils/cloudinary';
import { loader } from 'src/actions';
import { useAuthContext } from '../../../../auth/useAuthContext';
// utils
// assets
import { countries } from '../../../../assets/data';
// components
import FormProvider, { RHFSelect, RHFTextField, RHFUpload } from '../../../../components/hook-form';
import { useSnackbar } from '../../../../components/snackbar';
import { CustomFile } from '../../../../components/upload';
import PaymentPopup from '../PaymentPopup';

// ----------------------------------------------------------------------

const SOCIAL_LINKS = [
  {
    value: 'facebookLink',
    label: 'facebook',
    icon: <Iconify icon="eva:facebook-fill" width={24} />,
  },
  {
    value: 'instagramLink',
    label: 'instagram',
    icon: <Iconify icon="ant-design:instagram-filled" width={24} />,
  },
  {
    value: 'linkedinLink',
    label: 'linkedin',
    icon: <Iconify icon="eva:linkedin-fill" width={24} />,
  },
  {
    value: 'twitterLink',
    label: 'twitter',
    icon: <Iconify icon="eva:twitter-fill" width={24} />,
  },
] as const;

type FormValuesProps = {
  name: string;
  email: string;
  avatarUrl: CustomFile | string | null;
  phone: string | null;
  country: string | null;
  address: string | null;
  state: string | null;
  cac: (File & { preview: string }) | string;
  logo: (File & { preview: string }) | string;

  whatsappNumber: string;
  industry: string;
  bio: string;
};

export default function BusinessProfile() {
  const { revalidateUser } = useAuthContext();

  // revalidateUser!();

  const { enqueueSnackbar } = useSnackbar();

  const { user } = useAuthContext();

  const UpdateUserSchema = Yup.object().shape({
    name: Yup.string().required('Business Name is required'),
    email: Yup.string().required('Email is required').email('Email must be a valid email address'),
    phone: Yup.string().required('Business phone number is required'),
    whatsappNumber: Yup.string().optional(),
    country: Yup.string().required('Country is required'),
    address: Yup.string().required('Address is required'),
    state: Yup.string().required('State is required'),
    industry: Yup.string().required('Business Industry is required'),
    bio: Yup.string()
      .min(30, 'Business description must be above 30 characters')
      .max(300, 'Business description must be less than 300 characters'),
    cac: Yup.mixed().optional(),
    logo: Yup.mixed().optional(),
  });

  const defaultValues = {
    name: '',
    email: user?.email,
    phone: user?.phone,
    whatsappNumber: '',
    country: 'Nigeria',
    address: '',
    state: '',
    industry: '',
    bio: '',
    cac: '',
    logo: '',
  };

  const methods = useForm<FormValuesProps>({
    resolver: yupResolver(UpdateUserSchema),
    defaultValues,
  });

  const [openPaymentPopup, setOpenPaymentPopup] = useState(false);
  const [submitting, setIsSubmitting] = useState(false);

  const [business, setBusiness] = useState<FormValuesProps | any>(null);

  const {
    setValue,
    handleSubmit,
    reset,
    formState: { isSubmitting },
  } = methods;

  const onInitializePayment = async (data: FormValuesProps) => {
    try {
      setIsSubmitting(true);
      setBusiness(data);
      const txnRef = localStorage.getItem(`payment-successfull`) || '';
      if (txnRef) {
        await onSubmit(txnRef);
        return;
      }
      setOpenPaymentPopup(true);
    } catch (error) {
      enqueueSnackbar(error.message || error);
    }
  };

  const onSubmit = useCallback(
    async (ref: string) => {
      if (!submitting || !ref) return;

      try {
        setOpenPaymentPopup(false);
        const { logo, cac, ...rest } = business;

        if (cac) {
          const {
            data: { public_id },
          } = await uploadSingle(cac, 'cac');

          rest.cac = public_id;
        }

        if (logo) {
          const {
            data: { public_id },
          } = await uploadSingle(logo, 'logo');

          rest.logo = public_id;
        }

        rest.reference = ref;

        const res = await createBusiness(rest);
        localStorage.removeItem(`payment-successfull`);

        enqueueSnackbar(res.data.message);
        reset();
        revalidateUser!();
      } catch (err) {
        reset(business!, { keepValues: true });
        console.error(err);
        enqueueSnackbar(err?.message || err, { variant: 'error' });
      }
    },
    [business, enqueueSnackbar, reset, revalidateUser, submitting]
  );

  const handleDrop = useCallback(
    (acceptedFiles: File[], field: keyof typeof defaultValues) => {
      const file = acceptedFiles[0];

      const newFile = Object.assign(file, {
        preview: URL.createObjectURL(file),
      });

      if (newFile) {
        setValue(field, newFile, { shouldValidate: true });
      }
    },
    [setValue]
  );

  const [industries, setIndustries] = useState([]);

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
    <>
      <FormProvider methods={methods} onSubmit={handleSubmit(onInitializePayment)}>
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
                <RHFTextField name="name" label="Business Name" />

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

                <RHFSelect native name="industryId" label="Industry" placeholder="Industry">
                  <option value="" />
                  {industries.map((_: { name: string; id: number }) => (
                    <option key={_.id} value={_.id}>
                      {_.name}
                    </option>
                  ))}
                </RHFSelect>

                {SOCIAL_LINKS.map((link) => (
                  <RHFTextField
                    key={link.value}
                    name={link.value}
                    label={link.label}
                    InputProps={{
                      startAdornment: <InputAdornment position="start">{link.icon}</InputAdornment>,
                    }}
                  />
                ))}
              </Box>

              <Stack spacing={2} alignItems="flex-end" sx={{ mt: 3 }}>
                <RHFTextField name="bio" multiline rows={4} label="Business Description" />
                <Box>
                  <Typography variant="caption" sx={{ color: 'text.secondary' }}>
                    Upload Business registration Document
                  </Typography>
                  <RHFUpload
                    name="logo"
                    maxSize={10145728}
                    onDrop={(_) => handleDrop(_, 'logo')}
                    onDelete={() => setValue('logo', '', { shouldValidate: true })}
                  />
                </Box>
                <Box>
                  <Typography variant="caption" sx={{ color: 'text.secondary' }}>
                    Upload Business Logo (Optional)
                  </Typography>
                  <RHFUpload
                    name="cac"
                    maxSize={10145728}
                    onDrop={(_) => handleDrop(_, 'cac')}
                    onDelete={() => setValue('cac', '', { shouldValidate: true })}
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
      <PaymentPopup
        open={openPaymentPopup}
        onClose={() => setOpenPaymentPopup(false)}
        cb={onSubmit}
        items={[
          { name: 'Registration', amount: 500 },
          { name: 'Subscription', amount: 2000, label: 'Premium' },
        ]}
      />
    </>
  );
}
