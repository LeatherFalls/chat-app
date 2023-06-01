'use client';

import SideBar from "@/components/SideBar";
import Head from "next/head";
import { useAuthState } from "react-firebase-hooks/auth";
import { auth, db } from "../firebase";
import { Login } from "@mui/icons-material";
import { useEffect } from "react";
import firebase from "firebase/compat/app";
import "firebase/firestore"

export default function Home() {
  const [user] = useAuthState(auth);

  useEffect(() => {
    if (user) {
      db.collection('users').doc(user.uid).set({
        email: user.email,
        lastSeen: firebase.firestore.FieldValue.serverTimestamp(),
        photoURL: user.photoURL,
        displayName: user.displayName,
      }, { merge: true });
    }
    console.log(user);
  }, [user]);

  if (!user) return <Login />;

  return (
    <main>
      <Head>
        <title>Chat App</title>
      </Head>
      <SideBar />
    </main>
  )
}
