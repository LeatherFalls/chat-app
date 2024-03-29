import getRecipientEmail from "../utils/getRecipientEmail";
import { Avatar } from "@mui/material";
import { useAuthState } from "react-firebase-hooks/auth";
import styled from "styled-components";
import { auth, db } from "../firebase";
import { useCollection } from "react-firebase-hooks/firestore";
import { useRouter } from "next/navigation";

function Chat({ id, users }) {
  const [user] = useAuthState(auth);
  const [recipientSnapshot] = useCollection(
    db.collection('users')
    .where('email', '==', getRecipientEmail(users, user)
  ));

  const recipient = recipientSnapshot?.docs?.[0]?.data();
  const recipientEmail = getRecipientEmail(users, user);
  const routerNavigation = useRouter();

  const enterChat = () => routerNavigation.push(`/chat/${id}`);

  return (
    <Container onClick={enterChat}>
      {recipient ? (
        <UserAvatar src={recipient?.photoURL} />
      ) : (
        <UserAvatar>{recipientEmail[0]}</UserAvatar>
      )}
      <p>{recipientEmail}</p>
    </Container>
  )
}

const Container = styled.div`
  align-items: center;
  cursor: pointer;
  display: flex;
  padding: 15px;
  word-break: break-word;
  
  :hover {
    background-color: #e9eaeb;
    transition: all 0.2s ease-in-out;
  }
`;

const UserAvatar = styled(Avatar)`
  margin: 5px;
  margin-right: 15px;
`;

export default Chat;