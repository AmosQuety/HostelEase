import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";

// Your Firebase config
const firebaseConfig = {
  apiKey: "AIzaSyDXyns4U2VnYZAP9QtJKQeEONQBX8lakvk",
  authDomain: "amos-b3f77.firebaseapp.com",
  projectId: "amos-b3f77",
  storageBucket: "amos-b3f77.appspot.com",
  messagingSenderId: "267977807588",
  appId: "1:267977807588:web:fa2be9e20bfbb905c0bef1",
  measurementId: "G-2TBQCYTYBV",
};

// ActionUrl: "// https://amos-b3f77.firebaseapp.com/__/auth/action";

// Initialize Firebase
const firebaseApp = initializeApp(firebaseConfig);
export const auth = getAuth(firebaseApp);
