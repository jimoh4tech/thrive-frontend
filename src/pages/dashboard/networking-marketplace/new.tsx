// next
import Head from 'next/head';
// layouts
import DashboardLayout from '../../../layouts/dashboard';

// ----------------------------------------------------------------------

ChatPage.getLayout = (page: React.ReactElement) => <DashboardLayout>{page}</DashboardLayout>;

// ----------------------------------------------------------------------

export default function ChatPage() {
  return (
    <Head>
      <title> Chat | Minimal UI</title>
    </Head>
  );
}
