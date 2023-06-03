import { auth, db } from '@/firebase';
import { AttachFile, MoreVert } from '@mui/icons-material';
import { Avatar, IconButton } from '@mui/material';
import { useRouter } from 'next/router';
import React, { useEffect } from 'react'
import { useAuthState } from 'react-firebase-hooks/auth';
import { useCollection } from 'react-firebase-hooks/firestore';
import styled from 'styled-components';
import Message from './Message';

function ChatScreen({ chat, messages }) {
  const [user] = useAuthState(auth);
  const router = useRouter();

  useEffect(() => {
    console.log(user)
    console.log(chat)
    console.log(router.query.id)
  }, [user, chat, router]);

  const [messageSnapshot] = useCollection(
    db.collection('chats')
    .doc(router.query.id)
    .collection('messages')
    .orderBy('timestamp', 'asc')
  );

  const showMessages = () => {
    if (messageSnapshot) {
      return messageSnapshot.docs.map(message => (
        <Message key={message.id} user={message.data().user} message={{
          ...message.data(),
          timestamp: message.data().timestamp?.toDate().getTime()
        }} />
      ))
    } else {
      return JSON.parse(messages).map(message => (
        <Message key={message.id} user={message.user} message={message} />
      ))
    }
  }

  return (
    <Container>
      <Header>
        <Avatar />
        <HeaderInformation>
          <h3>Rec Email</h3>
          <p>Last seen ...</p>
        </HeaderInformation>
        <HeaderIcons>
          <IconButton>
            <AttachFile />
          </IconButton>
          <IconButton>
            <MoreVert />
          </IconButton>
        </HeaderIcons>
      </Header>

      <MessageContainer>
        {showMessages()}
        <EndOfMessage />
      </MessageContainer>
    </Container>
  )
}

const Container = styled.div`
`;

const Header = styled.div`
  position: sticky;
  background-color: white;
  z-index: 100;
  top: 0;
  display: flex;
  padding: 11px;
  height: 80px;
  align-items: center;
  border-bottom: 1px solid whitesmoke;
`;

const HeaderInformation = styled.div`
  margin-left: 15px;
  flex: 1;

  > h3 {
    margin-bottom: 3px;
  }

  > p {
    font-size: 14px;
    color: gray;
  }
`;

const MessageContainer = styled.div``;

const EndOfMessage = styled.div`
  margin-bottom: 50px;
`;

const HeaderIcons = styled.div``;

export default ChatScreen;