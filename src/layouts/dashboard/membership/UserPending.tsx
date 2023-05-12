import { Button, Container } from '@mui/material';
import { Stack } from '@mui/system';
import Head from 'next/head';
import { useState } from 'react';
import { SeoIllustration } from 'src/assets/illustrations';
import { useAuthContext } from 'src/auth/useAuthContext';
import Lightbox from 'src/components/lightbox/Lightbox';
import { useSettingsContext } from 'src/components/settings';
import { AppWelcome } from 'src/sections/@dashboard/general/app';

export default function UserPending() {
  const { user } = useAuthContext();

  const [watch, setWatch] = useState(false);

  const { themeStretch } = useSettingsContext();
  return (
    <>
      <Head>
        <title> Pending Approval | ICSS Thrive</title>
      </Head>

      <Container maxWidth={themeStretch ? false : 'xl'}>
        <AppWelcome
          sx={{ py: 3 }}
          title={`Welcome, \n ${user?.fullName}`}
          description="Your Account is pending approval. You will be notified shortly. While you’re waiting, would you like to take a video tour, review our Q&A, or chat with an agent?"
          img={
            <SeoIllustration
              sx={{
                p: 3,
                width: 360,
                margin: { xs: 'auto', md: 'inherit' },
              }}
            />
          }
          action={
            <Stack direction="row" spacing={1.5}>
              <Button variant="contained" onClick={() => setWatch(true)}>
                Take A Video Tour
              </Button>
              <Button variant="outlined">Review Our Q&A</Button>
              <Button variant="soft">Chat With an Agent</Button>
            </Stack>
          }
        />
      </Container>

      <Lightbox
        index={0}
        slides={[
          {
            type: 'video',
            width: 1280,
            height: 720,
            sources: [
              {
                src: 'https://static.videezy.com/system/resources/previews/000/012/314/original/Venice_2.mp4',
                type: 'video/mp4',
              },
            ],
          },
          // ...
        ]}
        open={watch}
        close={() => setWatch(false)}
        disabledFullscreen
        disabledSlideshow
        disabledTotal
        disabledThumbnails
      />
    </>
  );
}
