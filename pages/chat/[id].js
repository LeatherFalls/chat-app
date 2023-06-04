import ChatScreen from "../../components/ChatScreen";
import SideBar from "../../components/SideBar";
import { auth, db } from "../../firebase";
import getRecipientEmail from "../../utils/getRecipientEmail";
import Head from "next/head";
import { useAuthState } from "react-firebase-hooks/auth";
import styled from "styled-components";


function Chat({ chat, messages }) {
  const [user] = useAuthState(auth);

  return (
    <Container>
      <Head>
        <title>Chat with {getRecipientEmail(chat.users, user)}</title>
      </Head>
      <SideBar />
      <ChatContainer>
        <ChatScreen chat={chat} messages={messages}/>
      </ChatContainer>
    </Container>
  )
}

const Container = styled.div`
  display: flex;
`;

const ChatContainer = styled.div`
  flex: 1;
  overflow: scroll;
  height: 100vh;

  ::-webkit-scrollbar {
    display: none;
  }

  -ms-overflow-style: none;
  scrollbar-width: none;
`;

export async function getServerSideProps(context) {
  const ref = db.collection("chats").doc(context.query.id);

  const messagesRes = await ref
    .collection("messages")
    .orderBy("timestamp", "asc")
    .get();

  const messages = messagesRes.docs
    .map((doc) => ({
      id: doc.id,
      ...doc.data(),
    }))
    .map((messages) => ({
      ...messages,
      timestamp: messages.timestamp.toDate().getTime(),
    }));

  const chatRes = await ref.get();
  const chat = {
    id: chatRes.id,
    ...chatRes.data(),
  };

  console.log(chat, messages);

  return {
    props: {
      messages: JSON.stringify(messages),
      chat: chat,
    },
  };
}

export default Chat;