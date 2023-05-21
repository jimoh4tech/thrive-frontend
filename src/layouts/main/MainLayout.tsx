// next
import dynamic from 'next/dynamic';
// @mui
import { Box } from '@mui/material';
import Head from 'next/head';
import ScrollProgress from 'src/components/scroll-progress/ScrollProgress';
import Hero from './Hero';
//
const Header = dynamic(() => import('./Header'), { ssr: false });
const Footer = dynamic(() => import('./Footer'), { ssr: false });

// ----------------------------------------------------------------------

type Props = {
  children?: React.ReactNode;
  title?: React.ReactNode;
  metaTitle?: React.ReactNode;
};

export default function MainLayout({ children, title = '', metaTitle = '' }: Props) {
  return (
    <Box sx={{ display: 'flex', flexDirection: 'column', height: 1 }}>
      <Head>
        <title> {metaTitle} | ICSS Thrive</title>
      </Head>
      <Header />

      <Box component="main" sx={{ flexGrow: 1 }}>
        <ScrollProgress />

        <Hero title={title || metaTitle} />

        {children}
      </Box>

      <Footer />
    </Box>
  );
}
