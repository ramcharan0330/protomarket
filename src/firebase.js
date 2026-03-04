import { initializeApp } from "firebase/app";
import { getAuth, GoogleAuthProvider } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyAit5EAXTosPU7pRObK8mDb1GE1SGU6pFU",
  authDomain: "protomarket-8a0f9.firebaseapp.com",
  projectId: "protomarket-8a0f9",
  storageBucket: "protomarket-8a0f9.firebasestorage.app",
  messagingSenderId: "371727468197",
  appId: "1:371727468197:web:dd5901b2771556ce3aaf4c",
  measurementId: "G-NFR2SD9LR0"
};

const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const googleProvider = new GoogleAuthProvider();