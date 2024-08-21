import { Avatar, Container } from '@mui/material';
import Head from 'next/head';
import { useState } from 'react';
import { useAuthContext } from 'src/auth/useAuthContext';
import TourVideo from 'src/components/TourVideo';
import Iconify from 'src/components/iconify';
import { useSettingsContext } from 'src/components/settings';
import { AppWelcome } from 'src/sections/@dashboard/general/app';

export default function UserSuspended() {
  const { user } = useAuthContext();

  const [watch, setWatch] = useState(false);

  const { themeStretch } = useSettingsContext();

  const hanldeClose = () => {
    setWatch(false);
  };
  return (
    <>
      <Head>
        <title> Account Suspended | Thrive</title>
      </Head>

      <Container maxWidth={themeStretch ? false : 'xl'}>
        <AppWelcome
          sx={{ bgcolor: 'warning.lighter', color: 'grey.800', pt: 2 }}
          title={`Hi, ${user?.fullName}`}
          description="Your Account has been suspended. Kindly reach out to our support team via frontdesk@thrivebizng.com for more info."
          img={
            <Avatar sx={{ bgcolor: '#fff', width: 100, height: 100, margin: 4 }}>
              <Iconify
                icon="mdi:cancel"
                sx={{ width: '80%', height: '80%', color: 'warning.main' }}
              />
            </Avatar>
          }
        />
      </Container>

      <TourVideo open={watch} onClose={hanldeClose} />
    </>
  );
}
