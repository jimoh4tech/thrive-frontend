// next
import Head from 'next/head';
import NextLink from 'next/link';
// @mui
import { Button, Typography } from '@mui/material';
// layouts
import { Box } from '@mui/system';
import { SentIcon } from 'src/assets/icons';
import { PATH_DASHBOARD } from 'src/routes/paths';
// routes
// components
// sections
// assets

// ----------------------------------------------------------------------

// ----------------------------------------------------------------------

export default function PaymentSuccessful() {
  return (
    <Box textAlign="center" sx={{ marginTop: 12, mx: 'auto', maxWidth: 400 }}>
      <Head>
        <title> Payment Successfull | THRIVE</title>
      </Head>

      <SentIcon sx={{ mb: 5, height: 96 }} />

      <Typography variant="h3" paragraph>
        Payment Successful
      </Typography>

      <Typography sx={{ color: 'text.secondary', mb: 5 }}>
        Your subscription to THRIVE platform was successful. You can now return to your dashboard .
      </Typography>

      <Button
        fullWidth
        size="large"
        component={NextLink}
        href={PATH_DASHBOARD.digitalAddress}
        variant="contained"
        sx={{
          mx: 'auto',
          alignItems: 'center',
          display: 'inline-flex',
        }}
      >
        Go To Dashboard
      </Button>
    </Box>
  );
}
