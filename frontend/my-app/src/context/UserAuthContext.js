import { createContext, useContext, useEffect, useState } from "react";
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  onAuthStateChanged,
  signOut,
  GoogleAuthProvider,
  signInWithPopup,
} from "firebase/auth";
import { auth } from "../firebase";

// Import the API function to call
import { callAPI } from "./callApi"; // Replace "../api" with the correct path to your API file

export const userAuthContext = createContext();

export function UserAuthContextProvider({ children }) {
  const [user, setUser] = useState({});

  async function logIn(email, password) {
    // Call the API function on login
    await callAPI(email);

    return signInWithEmailAndPassword(auth, email, password);
  }

  async function signUp(name, email, password) {
    // Call the API function on signup
    await callAPI(email);

    return createUserWithEmailAndPassword(auth, email, password);
  }

  async function googleSignIn() {
    // Call the API function on Google sign in
    const googleAuthProvider = new GoogleAuthProvider();
    await signInWithPopup(auth, googleAuthProvider);
    const currentUser = auth.currentUser;
    if (currentUser && currentUser.email) {
      await callAPI(currentUser.email);
    }
  }

  function logOut() {
    return signOut(auth);
  }

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentuser) => {
      setUser(currentuser);
    });

    return () => {
      unsubscribe();
    };
  }, []);

  // Fetch the user's email
  useEffect(() => {
    if (user && user.email) {
      console.log("Logged in user email:", user.email);
    }
  }, [user]);

  return (
    <userAuthContext.Provider
      value={{ user, logIn, signUp, logOut, googleSignIn }}
    >
      {children}
    </userAuthContext.Provider>
  );
}

export function useUserAuth() {
  return useContext(userAuthContext);
}
