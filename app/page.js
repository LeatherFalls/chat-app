'use client'

import SideBar from "../components/SideBar";
import Head from "next/head";
import { useAuthState } from "react-firebase-hooks/auth";
import { auth, db } from "../firebase";
import { Login } from "@mui/icons-material";
import { useEffect } from "react";
import firebase from "firebase/compat/app";
import "firebase/firestore"
import Loading from "../components/Loading";
import 'react-toastify/dist/ReactToastify.css'
import { ToastContainer } from "react-toastify";

export default function Home() {
  const [user, loading] = useAuthState(auth);

  useEffect(() => {
    if (user) {
      db.collection('users').doc(user.uid).set({
        email: user.email,
        lastSeen: firebase.firestore.FieldValue.serverTimestamp(),
        photoURL: user.photoURL,
        displayName: user.displayName,
      }, { merge: true });
    }
  }, [user]);

  if (loading) return <Loading />;
  if (!user) return <Login />;

  return (
    <main>
      <Head>
        <title>Chat App</title>
      </Head>
      <ToastContainer />
      <SideBar />
    </main>
  )
}
