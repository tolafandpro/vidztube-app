// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import {getAuth, GoogleAuthProvider} from "firebase/auth"

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyB7fhjussCkjBgHOP8RnJtEnoSNftIfuZc",
  authDomain: "odvideo-37fa5.firebaseapp.com",
  projectId: "odvideo-37fa5",
  storageBucket: "odvideo-37fa5.appspot.com",
  messagingSenderId: "339914238706",
  appId: "1:339914238706:web:d9c89ffa9ebbd7eebe3e6b"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth = getAuth();
export const provider = new GoogleAuthProvider();

export default app;