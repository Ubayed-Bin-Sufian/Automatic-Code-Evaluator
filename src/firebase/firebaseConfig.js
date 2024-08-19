import 'firebase/compat/auth';
import 'firebase/compat/firestore';
import firebase from 'firebase/compat/app';
import 'firebase/compat/database';
import 'firebase/compat/storage';

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: process.env.REACT_APP_FIREBASE_API_KEY,
  authDomain: "codeevaluator.firebaseapp.com",
  projectId: "codeevaluator",
  storageBucket: "codeevaluator.appspot.com",
  messagingSenderId: process.env.REACT_APP_MESSAGING_SENDER_ID,
  appId: process.env.REACT_APP_APP_ID
};

// Initialize Firebase
firebase.initializeApp(firebaseConfig);

// Initialize Firebase
export const auth = firebase.default.auth();
// Get a reference to the database service
export const database = firebase.database();
export const db = firebase.firestore(); // Export Firestore instance
// Get a reference to the storage service
export const storage = firebase.storage();