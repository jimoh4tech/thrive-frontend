import {
  Box,
  Button,
  Card,
  Dialog,
  DialogActions,
  DialogContent,
  Grid,
  InputAdornment,
  Stack,
  Typography,
} from '@mui/material';
import { useForm } from 'react-hook-form';
import { useCallback, useEffect, useState } from 'react';
import { IUserAccountGeneral } from 'src/@types/user';
import { useSnackbar } from 'notistack';
import { viewUser } from 'src/actions/admin/usersAction';
import { ViewDialogProps } from './types';
import FormProvider, { RHFTextField } from '../hook-form';
import Iconify from '../iconify';
import Image from '../image';
import Loading from '../loading';

const ViewDialog = ({ open, id, title, onClose }: ViewDialogProps) => {
  const [userInfo, setUserInfo] = useState<IUserAccountGeneral | null>(null);
  const { enqueueSnackbar } = useSnackbar();

  const SOCIAL_LINKS = [
    {
      href: userInfo?.business?.facebookLink,
      value: 'facebookLink',
      label: 'facebook url',
      icon: <Iconify icon="eva:facebook-fill" width={24} />,
    },
    {
      href: userInfo?.business?.instagramLink,
      value: 'instagramLink',
      label: 'instagram url',
      icon: <Iconify icon="ant-design:instagram-filled" width={24} />,
    },
    {
      href: userInfo?.business?.linkedinLink,
      value: 'linkedinLink',
      label: 'linkedin url',
      icon: <Iconify icon="eva:linkedin-fill" width={24} />,
    },
    {
      href: userInfo?.business?.twitterLink,
      value: 'twitterLink',
      label: 'twitter url',
      icon: <Iconify icon="eva:twitter-fill" width={24} />,
    },
  ] as const;

  type FormValuesProps = {
    name: string;
    email: string;
    avatarUrl: string | null;
    phone: string | null;
    country: string | null;
    address: string | null;
    state: string | null;
    cac: (File & { preview: string }) | string;
    govId: (File & { preview: string }) | string;
    logo: (File & { preview: string }) | string;

    whatsappNumber: string;
    industryId?: number;
    bio: string;
    facebookLink?: string;
    twitterLink?: string;
    instagramLink?: string;
    linkedinLink?: string;
  };

  const defaultValues = {
    name: '',
    email: userInfo?.email,
    phone: userInfo?.phone,
    whatsappNumber: '',
    country: 'Nigeria',
    address: '',
    state: '',
    industryId: undefined,
    bio: '',
    cac: '',
    govId: '',
    logo: userInfo?.business?.logo || '',
    facebookLink: '',
    twitterLink: '',
    instagramLink: '',
    linkedinLink: '',
  };

  const methods = useForm<FormValuesProps>({
    defaultValues,
  });

  const getUserInfo = useCallback(async () => {
    try {
      const _userInfo = await viewUser(id);
      console.log({ _userInfo });

      setUserInfo(_userInfo.data);
    } catch (error) {
      enqueueSnackbar(error.message || 'Could not fetch User info', { variant: 'error' });
    }
  }, [enqueueSnackbar, id]);

  useEffect(() => {
    getUserInfo();

    return () => {};
  }, [getUserInfo, id]);

  return (
    <Dialog open={open}>
      <DialogContent sx={{ p: 1, textAlign: 'center' }}>
        <Typography variant="h3" paragraph>
          {title}
        </Typography>
        {!userInfo ? (
          <Stack
            sx={{
              height: 300,
              width: 400,
              justifyContent: 'center',
              alignItems: 'center',
              my: 6,
            }}
          >
            <Loading open={!userInfo} />
          </Stack>
        ) : (
          <FormProvider methods={methods}>
            <Grid item xs={12} md={8}>
              <Card sx={{ p: 2 }}>
                <Box
                  rowGap={3}
                  columnGap={2}
                  display="grid"
                  gridTemplateColumns={{
                    xs: 'repeat(1, 1fr)',
                    sm: 'repeat(2, 1fr)',
                  }}
                >
                  <RHFTextField name="fullName" label="Full Name" value={userInfo?.fullName} />

                  <RHFTextField
                    name="updatedAt"
                    label="Last Update"
                    value={new Date(userInfo?.updatedAt || '').toDateString()}
                  />

                  <RHFTextField name="dob" label="Date Of Birth" value={userInfo?.dob} />

                  <RHFTextField name="status" label="Status" value={userInfo?.status} />

                  <RHFTextField
                    name="hasSubscription"
                    label="On Subscription"
                    value={userInfo?.hasSubscription ? 'Yes' : 'No'}
                  />

                  <RHFTextField
                    name="email"
                    label="Business Email"
                    value={userInfo?.business?.email}
                  />

                  <RHFTextField
                    name="phone"
                    label="Phone Number"
                    value={userInfo?.business?.phone}
                  />

                  <RHFTextField
                    name="whatsappNumber"
                    label="WhatsApp Number"
                    value={userInfo?.business?.whatsappNumber}
                  />

                  <RHFTextField
                    name="address"
                    label="Business Contact Address"
                    value={userInfo?.business?.address}
                  />

                  <RHFTextField
                    name="state"
                    label="State/Region"
                    value={userInfo?.business?.state}
                  />

                  <RHFTextField
                    name="website"
                    label="Website Url"
                    value={userInfo?.business?.slug}
                  />
                  <RHFTextField
                    name="reg"
                    label="Business Registration Date"
                    value={new Date(userInfo?.business?.createdAt || '').toDateString()}
                  />

                  {SOCIAL_LINKS.map((link) => (
                    <RHFTextField
                      key={link.value}
                      name={link.value}
                      label={link.label}
                      value={link.href}
                      InputProps={{
                        startAdornment: (
                          <InputAdornment position="start">{link.icon}</InputAdornment>
                        ),
                      }}
                    />
                  ))}
                </Box>

                <Stack spacing={2} alignItems="center" sx={{ mt: 3 }}>
                  <RHFTextField name="bio" multiline rows={4} label="Bio" value={userInfo?.bio} />
                  <RHFTextField
                    name="bbio"
                    multiline
                    rows={4}
                    label="Business Description"
                    value={userInfo?.business?.bio}
                  />
                  <Box>
                    <Typography variant="caption" sx={{ color: 'text.secondary' }}>
                      Upload Business registration Document
                    </Typography>
                    <Image src={userInfo?.business?.cac} alt="business cac" width={6} height={6} />
                  </Box>
                  <Box>
                    <Typography variant="caption" sx={{ color: 'text.secondary' }}>
                      Upload Government Issued ID
                    </Typography>
                    <Image
                      src={userInfo?.business?.govId}
                      alt="business cover"
                      width={6}
                      height={6}
                    />
                  </Box>
                  <Box>
                    <Typography variant="caption" sx={{ color: 'text.secondary' }}>
                      Upload Business Logo (Optional)
                    </Typography>
                    <Image
                      src={userInfo?.business?.logo}
                      alt="business logo"
                      width={6}
                      height={6}
                    />
                  </Box>
                </Stack>
              </Card>
            </Grid>
          </FormProvider>
        )}

        <DialogActions>
          {/* {action} */}

          <Button variant="outlined" color="primary" onClick={onClose}>
            Close
          </Button>
        </DialogActions>
      </DialogContent>
    </Dialog>
  );
};

export default ViewDialog;
