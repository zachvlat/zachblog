// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getAuth } from "firebase/auth";

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyCh-7TSUhYkV64GqwPxP7oDyqOHy4s7DSs",
  authDomain: "zatsblog-490c4.firebaseapp.com",
  projectId: "zatsblog-490c4",
  storageBucket: "zatsblog-490c4.appspot.com",
  messagingSenderId: "660442845810",
  appId: "1:660442845810:web:0981a5669664ce3b17a8eb",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const db = getFirestore(app);
