import { Avatar, Container, Typography } from '@mui/material';
import { Box, Stack } from '@mui/system';
import Head from 'next/head';
import { useAuthContext } from 'src/auth/useAuthContext';
import Iconify from 'src/components/iconify/Iconify';
import { useSettingsContext } from 'src/components/settings';
import { AppWelcome } from 'src/sections/@dashboard/general/app';
import React from 'react';
import CreateBusinessProfile from './forms/BusinessForm';

export default function UserApproved() {
  const { user } = useAuthContext();

  const { themeStretch } = useSettingsContext();
  return (
    <>
      <Head>
        <title> Account Verified | THRIVE</title>
      </Head>

      <Container maxWidth={themeStretch ? false : 'xl'}>
        <AppWelcome
          sx={{ bgcolor: 'success.lighter', color: 'grey.800', pt: 2 }}
          title={`Welcome ${user?.fullName}! \n You have been verified.`}
          description="Please proceed to update your business profile to access the power of the THRIVE App."
          img={
            <Avatar sx={{ bgcolor: '#fff', width: 100, height: 100, margin: 4 }}>
              <Iconify
                icon="mdi:account-tick"
                sx={{ width: '80%', height: '80%', color: 'success.main' }}
              />
            </Avatar>
          }
        />

        <Stack sx={{ mt: 5 }} spacing={2}>
          <Box textAlign="center">
            <Typography variant="h4" gutterBottom>
              Update Business Profile
            </Typography>
            <Typography>
              Please provide all necessary information required to <br />
              update your business profile in the form below
            </Typography>
          </Box>

          <CreateBusinessProfile />
        </Stack>
      </Container>
    </>
  );
}
