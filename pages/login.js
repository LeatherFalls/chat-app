import styled from "styled-components";
import { Button } from '@mui/material';
import Head from 'next/head';
import { signInWithPopup } from "firebase/auth";
import { auth, provider } from "../firebase";
import Image from 'next/image';

const Container = styled.div`
  background-color: whitesmoke;
  display: grid;
  place-items: center;
  height: 100vh;
`;

const LoginContainer = styled.div`
  align-items: center;
  background-color: white;
  display: flex;
  flex-direction: column;
  padding: 100px;
`;

function Login() {
  const signIn = () => {
    signInWithPopup(auth, provider).catch(alert);
  };

  return (
    <Container>
      <Head>
        <title>Login</title>
      </Head>

      <LoginContainer>
        <Image
          src="/../public/images/chat.png"
          alt="Picture of the author"
          style={{ marginBottom: 50 }}
          width={200}
          height={200}
        />
        <Button onClick={signIn} variant="outlined">Sign in with Google</Button>
      </LoginContainer>
    </Container>
  );
}

export default Login