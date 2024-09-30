import { Call, Email, WhatsApp } from '@mui/icons-material';
import { Button, Grid } from '@mui/material';
import { Box, Container, Stack } from '@mui/system';
// import { GetServerSideProps, InferGetServerSidePropsType } from 'next';
import Head from 'next/head';
import { IUserBusiness } from 'src/@types/business';
import CompactLayout from 'src/layouts/compact/CompactLayout';
import BusinesseAbout from 'src/sections/@dashboard/web-address/BusinessAbout';
import BusinessCover from 'src/sections/@dashboard/web-address/BusinessCover';
import BusinessSocialInfo from 'src/sections/@dashboard/web-address/BusinessSocialInfo';
import axiosInstance from 'src/utils/axios';
import { useRouter } from 'next/router';
import React, { useEffect, useState } from 'react';
import LoadingScreen from 'src/components/loading-screen';
import Page404 from './404';

// export const getServerSideProps: GetServerSideProps<{
//   business: IUserBusiness | null;
//   errorCode: number | boolean;

//   // @ts-ignore
// }> = async ({ params: { slug } }) => {
//   const res = { errorCode: false, business: null };

//   try {
//     const { data } = await axiosInstance.get(`/web-address/${slug}`);
//     res.business = data;
//   } catch (error) {
//     console.log(error);

//     res.errorCode = error.statusCode;
//   }

//   return {
//     props: res,
//   };
// };

// // Page404.getLayout = (page: React.ReactElement) => <CompactLayout>{page}</CompactLayout>;
// export default function Page({
//   business,
//   errorCode,
// }: InferGetServerSidePropsType<typeof getServerSideProps>) {
//   console.log({ business });
//   if (errorCode || !business)
//     return (
//       <CompactLayout>
//         <Page404 />
//       </CompactLayout>
//     );

//   const {
//     facebookLink,
//     instagramLink,
//     linkedinLink,
//     twitterLink,
//     name,
//     phone,
//     email,
//     whatsappNumber,
//   } = business;
//   return (
//     <>
//       <Head>
//         <title> {name} | THRIVE</title>
//       </Head>

//       <Box
//         sx={{
//           mb: 3,
//           height: 280,
//           position: 'relative',
//         }}
//       >
//         <BusinessCover isPublic business={business} />
//       </Box>
//       <Container>
//         <Grid container spacing={3}>
//           <Grid item xs={12} md={4}>
//             <Stack spacing={3}>
//               {/* <BusinessCounter follower={10000} following={300} /> */}

//               <BusinessSocialInfo
//                 socialLinks={{
//                   facebookLink,
//                   instagramLink,
//                   linkedinLink,
//                   twitterLink,
//                 }}
//               />
//               <Button href={`tel:${phone}`} variant="contained" startIcon={<Call />}>
//                 Call Us Now
//               </Button>
//               <Button href={`mailto:${email}`} variant="outlined" startIcon={<Email />}>
//                 Send Us an Email
//               </Button>
//               <Button
//                 href={`https://wa.me/${whatsappNumber || phone}`}
//                 variant="soft"
//                 color="success"
//                 startIcon={<WhatsApp />}
//               >
//                 Send a Whatsapp Message
//               </Button>
//             </Stack>
//           </Grid>

//           <Grid item xs={12} md={8}>
//             <BusinesseAbout business={business} />
//           </Grid>
//         </Grid>
//       </Container>
//     </>
//   );
// }

const Page = () => {
  const router = useRouter();
  const [business, setBusiness] = useState<IUserBusiness | null>();
  const { slug } = router.query;
  const [errorCode, setErrorCode] = useState();

  const fetchBusinessData = async () => {
    if (slug) {
      try {
        const { data } = await axiosInstance.get(`/web-address/${slug}`);
        setBusiness(data);
      } catch (error) {
        console.log(error);
        setErrorCode(error?.statusCode);
      }
    }
  };
  useEffect(() => {
    fetchBusinessData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [slug]);

  if (errorCode)
    return (
      <CompactLayout>
        <Page404 />
      </CompactLayout>
    );
  if (!business) return <LoadingScreen />;

  return (
    <>
      <Head>
        <title> {business?.name} | THRIVE</title>
      </Head>

      <Box
        sx={{
          mb: 3,
          height: 280,
          position: 'relative',
        }}
      >
        <BusinessCover isPublic business={business} />
      </Box>
      <Container>
        <Grid container spacing={3}>
          <Grid item xs={12} md={4}>
            <Stack spacing={3}>
              {/* <BusinessCounter follower={10000} following={300} /> */}

              <BusinessSocialInfo
                socialLinks={{
                  facebookLink: business?.facebookLink,
                  instagramLink: business?.instagramLink,
                  linkedinLink: business?.linkedinLink,
                  twitterLink: business?.twitterLink,
                }}
              />
              <Button href={`tel:${business?.phone}`} variant="contained" startIcon={<Call />}>
                Call Us Now
              </Button>
              <Button href={`mailto:${business?.email}`} variant="outlined" startIcon={<Email />}>
                Send Us an Email
              </Button>
              <Button
                href={`https://wa.me/${business?.whatsappNumber || business?.phone}`}
                variant="soft"
                color="success"
                startIcon={<WhatsApp />}
              >
                Send a Whatsapp Message
              </Button>
            </Stack>
          </Grid>

          <Grid item xs={12} md={8}>
            <BusinesseAbout business={business} />
          </Grid>
        </Grid>
      </Container>
    </>
  );
};

export default Page;
