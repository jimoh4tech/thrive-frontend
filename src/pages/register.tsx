// next
import Head from 'next/head';
// auth
import React from 'react';
import GuestGuard from '../auth/GuestGuard';
// sections
import Register from '../sections/auth/Register';

// ----------------------------------------------------------------------

export default function RegisterPage() {
  return (
    <>
      <Head>
        <title> Register | THRIVE</title>
      </Head>

      <GuestGuard>
        <Register />
      </GuestGuard>
    </>
  );
}
