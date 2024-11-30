// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
  authDomain: "mern-auth-75dc6.firebaseapp.com",
  projectId: "mern-auth-75dc6",
  storageBucket: "mern-auth-75dc6.firebasestorage.app",
  messagingSenderId: "183171940286",
  appId: "1:183171940286:web:09fbd3924f2e2f098243ef"
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);