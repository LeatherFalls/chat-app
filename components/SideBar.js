'use client';
import { Avatar, Button, IconButton } from '@mui/material';
import ChatIcon from '@mui/icons-material/Chat';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import SearchIcon from '@mui/icons-material/Search';
import styled from 'styled-components';

function SideBar() {
  return (
    <Container>
      <Header>
        <UserAvatar />
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

      <SideBarButton>Start a new chat</SideBarButton>
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