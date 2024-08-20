import { initializeApp } from 'firebase/app';
import { getAuth, GoogleAuthProvider, signInWithPopup, signOut } from "firebase/auth";
import { collection, deleteDoc, doc, getDoc, getDocs, getFirestore, onSnapshot, setDoc, writeBatch } from 'firebase/firestore';

const firebaseConfig = {
  apiKey: process.env.REACT_APP_FIREBASE_API_KEY,
  authDomain: process.env.REACT_APP_FIREBASE_AUTH_DOMAIN,
  projectId: process.env.REACT_APP_FIREBASE_PROJECT_ID,
  storageBucket: process.env.REACT_APP_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: process.env.REACT_APP_FIREBASE_MESSAGING_SENDER_ID,
  appId: process.env.REACT_APP_FIREBASE_APP_ID
};  

// let firebase = null
const firebase = initializeApp(firebaseConfig);

// Auth exports
const auth = getAuth();
const googleAuthProvider = new GoogleAuthProvider();

// Firestore exports
const firestore = getFirestore(firebase);

export { auth, collection, deleteDoc, doc, firestore, getDoc, getDocs, googleAuthProvider, onSnapshot, setDoc, signInWithPopup, signOut, writeBatch };