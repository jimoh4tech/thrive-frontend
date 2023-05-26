// next
import Head from 'next/head';
// layouts
import { Chat } from 'src/sections/@dashboard/chat';
import DashboardLayout from '../../../layouts/dashboard';

// ----------------------------------------------------------------------

ChatPage.getLayout = (page: React.ReactElement) => <DashboardLayout>{page}</DashboardLayout>;

// ----------------------------------------------------------------------

export default function ChatPage() {
  return (
    <>
      <Head>
        <title> Chat | ICSS Thrive</title>
      </Head>

      <Chat />
    </>
  );
}
