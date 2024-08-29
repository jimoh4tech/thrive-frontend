import { useEffect } from 'react';
// next
import { useRouter } from 'next/router';
// @mui
import { Card, Container, Stack } from '@mui/material';
// redux
import { doc, onSnapshot } from 'firebase/firestore';
import { useAuthContext } from 'src/auth/useAuthContext';
import { GetServerSideProps, InferGetServerSidePropsType } from 'next';
import { IUserBusiness } from 'src/@types/business';
import axiosInstance from 'src/utils/axios';
import CompactLayout from 'src/layouts/compact/CompactLayout';
import Page404 from 'src/pages/404';
import Head from 'next/head';
import {
  addRecipients,
  getContacts,
  getConversation,
  getConversations,
  getParticipants,
  markConversationAsRead,
  resetActiveConversation,
  sendMessage,
  slice,
} from '../../../redux/slices/chat';
import { useDispatch, useSelector } from '../../../redux/store';
// routes
import { PATH_DASHBOARD } from '../../../routes/paths';
// components
import CustomBreadcrumbs from '../../../components/custom-breadcrumbs';
import { useSettingsContext } from '../../../components/settings';
// @types
import { IChatParticipant, IChatSendMessage } from '../../../@types/chat';
// sections
import ChatHeaderCompose from './header/ChatHeaderCompose';
import ChatHeaderDetail from './header/ChatHeaderDetail';
import ChatMessageInput from './message/ChatMessageInput';
import ChatMessageList from './message/ChatMessageList';
import ChatNav from './nav/ChatNav';
import ChatRoom from './room/ChatRoom';

import { firestore } from '../../../../firebase-config';

// ----------------------------------------------------------------------

const CURRENT_USER_ID = '8864c717-587d-472a-929a-8e5f298024da-0';

export const getServerSideProps: GetServerSideProps<{
  business: IUserBusiness | null;
  errorCode: number | boolean;

  // @ts-ignore
}> = async ({ params: { slug } }) => {
  const res = { errorCode: false, business: null };

  try {
    const { data } = await axiosInstance.get(`/web-address/${slug}`);

    res.business = data;
  } catch (error) {
    console.log(error);

    res.errorCode = error.statusCode;
  }
  return {
    props: res,
  };
};

export default function Chat({
  business,
  errorCode,
}: InferGetServerSidePropsType<typeof getServerSideProps>) {
  const { user } = useAuthContext();

  const { themeStretch } = useSettingsContext();

  const dispatch = useDispatch();

  const {
    push,
    pathname,
    query: { conversationKey },
  } = useRouter();

  const { contacts, recipients, participants, activeConversationId, conversations } = useSelector(
    (state) => state.chat
  );

  useEffect(() => {
    const getChats = () => {
      const unsub = onSnapshot(
        doc(firestore, 'conversations', user.business.id.toString()),
        (_doc: any) => {
          dispatch(slice.actions.getConversationsSuccess(_doc.data()));
        }
      );

      return () => {
        unsub();
      };
    };

    getChats();
  }, [dispatch, user.business]);

  const selectedConversation = useSelector(() => {
    if (activeConversationId) {
      return conversations.byId[activeConversationId];
    }

    return {
      id: '',
      messages: [],
      participants: [],
      unreadCount: 0,
      type: '',
    };
  });

  useEffect(() => {
    dispatch(getConversations());
    dispatch(getContacts());
  }, [dispatch]);

  useEffect(() => {
    const getDetails = async () => {
      dispatch(getParticipants(`${conversationKey}`));
      try {
        await dispatch(getConversation(`${conversationKey}`));
      } catch (error) {
        console.error(error);
        push(PATH_DASHBOARD.networkingMarketplace.newChat);
      }
    };

    if (conversationKey) {
      getDetails();
    } else if (activeConversationId) {
      dispatch(resetActiveConversation());
    }

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [conversationKey]);

  useEffect(() => {
    if (activeConversationId) {
      dispatch(markConversationAsRead(activeConversationId));
    }
  }, [dispatch, activeConversationId]);

  if (errorCode || !business)
    return (
      <CompactLayout>
        <Page404 />
      </CompactLayout>
    );

  const detailView = !!conversationKey;

  const displayParticipants = participants.filter((item) => item.id !== CURRENT_USER_ID);

  const handleAddRecipients = (selectedRecipients: IChatParticipant[]) => {
    dispatch(addRecipients(selectedRecipients));
  };

  const handleSendMessage = async (value: IChatSendMessage) => {
    try {
      dispatch(sendMessage(value));
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <>
      <Head>
        <title> Chat | Thrive</title>
      </Head>
      <Container maxWidth={themeStretch ? false : 'xl'}>
        <CustomBreadcrumbs
          heading="Chat"
          links={[
            {
              name: 'Dashboard',
              href: PATH_DASHBOARD.root,
            },
            { name: 'Chat' },
          ]}
        />

        <Card sx={{ height: '72vh', display: 'flex' }}>
          <ChatNav conversations={conversations} activeConversationId={activeConversationId} />

          <Stack flexGrow={1} sx={{ overflow: 'hidden' }}>
            {detailView ? (
              <ChatHeaderDetail participants={displayParticipants} />
            ) : (
              <ChatHeaderCompose
                recipients={recipients}
                contacts={Object.values(contacts.byId)}
                onAddRecipients={handleAddRecipients}
              />
            )}

            <Stack
              direction="row"
              flexGrow={1}
              sx={{
                overflow: 'hidden',
                borderTop: (theme) => `solid 1px ${theme.palette.divider}`,
              }}
            >
              <Stack flexGrow={1} sx={{ minWidth: 0 }}>
                <ChatMessageList conversation={selectedConversation} />

                <ChatMessageInput
                  conversationId={activeConversationId}
                  onSend={handleSendMessage}
                  disabled={
                    pathname === PATH_DASHBOARD.networkingMarketplace.chat ||
                    pathname === PATH_DASHBOARD.networkingMarketplace.newChat
                  }
                />
              </Stack>

              {detailView && (
                <ChatRoom conversation={selectedConversation} participants={displayParticipants} />
              )}
            </Stack>
          </Stack>
        </Card>
      </Container>
    </>
  );
}
