import {initializeApp} from 'firebase/app';
import { getAuth, GoogleAuthProvider, signInWithPopup, signOut } from "firebase/auth";
import { getDatabase } from "firebase/database";
import { getFirestore, doc, setDoc, getDoc, writeBatch, collection, getDocs, onSnapshot, deleteDoc } from 'firebase/firestore';

const firebaseConfig ={
    apiKey: process.env.REACT_APP_FIREBASE_API_KEY,
    authDomain: "codeevaluator.firebaseapp.com",
    projectId: "codeevaluator",
    storageBucket: "codeevaluator.appspot.com",
    messagingSenderId: "252590889208",
    appId: "1:252590889208:web:415907f7d1a8f6a47cc30d"
  };
  

//let firebase = null
const firebase = initializeApp(firebaseConfig);

// Auth exports
const auth = getAuth();
const googleAuthProvider = new GoogleAuthProvider();

// // Firestore exports
//const firestore = getDatabase();
const firestore = getFirestore(firebase);

export { auth, googleAuthProvider, signInWithPopup, firestore, doc, setDoc, getDoc, writeBatch, collection, getDocs, onSnapshot, signOut, deleteDoc  };