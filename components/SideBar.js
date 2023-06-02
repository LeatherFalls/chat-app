import { Avatar, Button, IconButton } from '@mui/material';
import ChatIcon from '@mui/icons-material/Chat';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import SearchIcon from '@mui/icons-material/Search';
import * as EmailValidator from 'email-validator';
import styled from 'styled-components';
import { auth, db } from '../firebase';
import { useAuthState } from 'react-firebase-hooks/auth';
import { useCollection } from 'react-firebase-hooks/firestore';
import Chat from './Chat';

function SideBar() {
  const [user] = useAuthState(auth);
  const userChatRef = db.collection('chats').where('users', 'array-contains', user.email);
  const [chatsSnapshot] = useCollection(userChatRef);

  const chatAlreadyExists = (recipientEmail) =>
    !!chatsSnapshot?.docs.find(
      (chat) =>
        chat.data().users.find((user) => user === recipientEmail)?.length > 0
    );

  const createChat = () => {
    const input = prompt('Please enter name for chat');
    
    if (!input) return null;

    if (
      EmailValidator.validate(input) &&
      !chatAlreadyExists(input) &&
      input !== user.email
    ) {
      db.collection('chats').add({
        users: [user.email, input]
      });
    }
  }

  return (
    <Container>
      <Header>
        <UserAvatar
          src={user?.photoURL}
          onClick={() => auth.signOut()}
        />
        <IconsContainer>
          <IconButton>
            <ChatIcon />
          </IconButton>
          <IconButton>
            <MoreVertIcon />
          </IconButton>
        </IconsContainer>
      </Header>

      <Search>
        <SearchIcon />
        <SearchInput placeholder='Search'/>
      </Search>

      <SideBarButton onClick={createChat}>Start a new chat</SideBarButton>

      {
        chatsSnapshot?.docs.map(chat => (
          <Chat
            key={chat.id}
            id={chat.id}
            users={chat.data().users}
          />
        ))
      }
    </Container>
  )
}

const Container = styled.div`
`;

const Header = styled.div`
  align-items: center;
  background-color: white;
  border-bottom: 1px solid whitesmoke;
  display: flex;
  justify-content: space-between;
  position: sticky;
  top: 0;
  z-index: 1;
`;

const UserAvatar = styled(Avatar)`
  cursor: pointer;
  margin: 10px;

  :hover {
    opacity: 0.8;
  }
`;

const IconsContainer = styled.div`
  align-items: center;
  display: flex;
  justify-content: space-between;
`;

const Search = styled.div`
  align-items: center;
  background-color: whitesmoke;
  border-radius: 2px;
  display: flex;
  height: 39px;
  padding: 10px;
`;

const SearchInput = styled.input`
  background-color: transparent;
  border: none;
  flex: 1;
  margin-left: 10px;
  outline-width: 0;
`;

const SideBarButton = styled(Button)`
  width: 100%;
`;

export default SideBar