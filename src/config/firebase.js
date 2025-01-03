import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getFirestore } from "firebase/firestore";
import { getAuth, GoogleAuthProvider } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyAInY5GXdv4acSXIw0OdMkXcA89SJMrr_M",
  authDomain: "item-app-551e7.firebaseapp.com",
  projectId: "item-app-551e7",
  storageBucket: "item-app-551e7.firebasestorage.app",
  messagingSenderId: "534684059274",
  appId: "1:534684059274:web:20d1f070171a1dcc63cf73",
  measurementId: "G-EZKKGZPCF3",
};

const app = initializeApp(firebaseConfig);

export const db = getFirestore(app);
export const auth = getAuth(app);
export const analytics = getAnalytics(app);
export const googleProvider = new GoogleAuthProvider();
export const db = getFirestore(app);