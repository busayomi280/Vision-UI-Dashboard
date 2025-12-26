// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from 'firebase/auth';

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyCT8-IYbBpnPHhLxnnpI2gF4QOzLiJcf6E",
  authDomain: "vision-ui-94356.firebaseapp.com",
  projectId: "vision-ui-94356",
  storageBucket: "vision-ui-94356.firebasestorage.app",
  messagingSenderId: "483749627788",
  appId: "1:483749627788:web:43cb412ca6c3aee970f8a9"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);

export default app;