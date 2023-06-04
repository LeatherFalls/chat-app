import styled from "styled-components";
import { Button } from '@mui/material';
import Head from 'next/head';
import { auth, provider } from "../firebase";
import Image from 'next/image';
import { useEffect } from "react";
import { useRouter } from "next/navigation";

const Container = styled.div`
  background-color: whitesmoke;
  display: grid;
  place-items: center;
  height: 100vh;
`;

const LoginContainer = styled.div`
  align-items: center;
  display: flex;
  flex-direction: column;
  padding: 100px;
`;

function Login() {
  const router = useRouter();

  useEffect(() => {
    auth.onAuthStateChanged((user) => {
      if (user) {
        router.push("/");
      }
    });
  }, []);

  const signIn = () => {
    auth.signInWithPopup(provider).catch(alert);
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
        <Button
          onClick={signIn}
          variant="outlined"
          style={{ color: "orange", borderColor: "orange"}}
        >
          Sign in with Google
        </Button>
      </LoginContainer>
    </Container>
  );
}

export default Login