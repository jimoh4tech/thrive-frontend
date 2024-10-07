import React, { useState } from 'react';
// next
import Head from 'next/head';
// @mui
import {
  Button,
  Card,
  Container,
  Dialog,
  DialogContent,
  DialogContentText,
  DialogTitle,
  Grid,
  Typography,
} from '@mui/material';
// routes
import { Box, Stack } from '@mui/system';
// eslint-disable-next-line import/no-extraneous-dependencies
import { CopyToClipboard } from 'react-copy-to-clipboard';
import { SeoIllustration } from 'src/assets/illustrations';
import ExtendedForm from 'src/sections/@dashboard/virtual-office/ExtendedForm';
import VirtualOfficeForm from 'src/sections/@dashboard/virtual-office/VirtualOfficeForm';
import { useSnackbar } from 'notistack';
import { PATH_DASHBOARD } from '../../routes/paths';
// auth
import { useAuthContext } from '../../auth/useAuthContext';
// _mock_
// layouts
import DashboardLayout from '../../layouts/dashboard';
// components
import CustomBreadcrumbs from '../../components/custom-breadcrumbs';
import Iconify from '../../components/iconify';
import { useSettingsContext } from '../../components/settings';
// sections

// form
// @mui

// ----------------------------------------------------------------------

UserProfilePage.getLayout = (page: React.ReactElement) => <DashboardLayout>{page}</DashboardLayout>;

// ----------------------------------------------------------------------

export default function UserProfilePage() {
  const { themeStretch } = useSettingsContext();

  const [showHowItWorks, setShowHowItWorks] = useState(false);

  const { user } = useAuthContext();
  const { enqueueSnackbar } = useSnackbar();

  return (
    <>
      <Head>
        <title> Virtual Office | THRIVE</title>
      </Head>

      <Container maxWidth={themeStretch ? false : 'xl'}>
        <CustomBreadcrumbs
          heading="Virtual Office"
          links={[{ name: 'Dashboard', href: PATH_DASHBOARD.root }, { name: 'Virtual Office' }]}
          action={
            <Button variant="soft" startIcon={<Iconify icon="material-symbols:bolt-rounded" />}>
              Upgrade to Platinum
            </Button>
          }
        />

        {user?.virtualOffice ? (
          <Card sx={{ p: 4 }}>
            <Grid container spacing={3}>
              <Grid item md={8} sx={{ mb: 3 }}>
                <Stack spacing={2}>
                  <Typography variant="h4" gutterBottom>
                    Your Virtual office is Live!
                  </Typography>
                  <Typography>
                    Provide the below address to your clients to receive mails and packages.{' '}
                  </Typography>

                  <Grid>
                    <CopyToClipboard
                      text="Enterprise Hubs, 16a Trinity Avenue, Victoria Island Lagos"
                      onCopy={() => enqueueSnackbar('Office Address Copied')}
                    >
                      <Button
                        endIcon={<Iconify icon="material-symbols:content-copy-outline-rounded" />}
                        variant="outlined"
                      >
                        Enterprise Hubs, 16a Trinity Avenue, Victoria Island Lagos.
                      </Button>
                    </CopyToClipboard>
                  </Grid>
                  <Box>
                    <Button
                      startIcon={<Iconify icon="mdi:warning-circle-outline" />}
                      variant="text"
                      onClick={() => setShowHowItWorks(true)}
                    >
                      How it Works
                    </Button>
                  </Box>
                </Stack>

                <ExtendedForm />
              </Grid>
              <Grid item md={4}>
                <Box sx={{ top: 'auto' }}>
                  <SeoIllustration />
                </Box>
              </Grid>
            </Grid>
          </Card>
        ) : (
          <VirtualOfficeForm />
        )}
      </Container>
      <Dialog open={showHowItWorks} onClose={() => setShowHowItWorks(false)}>
        <DialogTitle>How It Works</DialogTitle>
        <DialogContent>
          <DialogContentText pb={3}>
            Chat with a representative using the chat icon on the buttom left of this screen for
            explanation on how this feature works
          </DialogContentText>
        </DialogContent>
      </Dialog>
    </>
  );
}
