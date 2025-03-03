// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from 'firebase/auth'
import { getFirestore } from 'firebase/firestore/lite'

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyBdXZBRlaqxRzJQ_FQGgcKNuccthjQbkVM",
  authDomain: "recetapp-841cb.firebaseapp.com",
  projectId: "recetapp-841cb",
  storageBucket: "recetapp-841cb.firebasestorage.app",
  messagingSenderId: "671740775786",
  appId: "1:671740775786:web:8a79fb21cdc558ebbb2913"
};

// Initialize Firebase
export const FirebaseApp = initializeApp(firebaseConfig);

export const FirebaseAuth = getAuth(FirebaseApp);

export const FirebaseDB = getFirestore(FirebaseApp); 