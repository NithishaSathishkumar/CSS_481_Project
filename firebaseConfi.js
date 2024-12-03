// Import the necessary Firebase services
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getAuth } from "firebase/auth"; // Import Firebase Auth
import { getDatabase } from "firebase/database"; // Import Firebase Database

// Your Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyCN-vj_-0uVudCRRw64ZIVuo7nZDxwczXQ",
  authDomain: "mentormeuwb.firebaseapp.com",
  databaseURL: "https://mentormeuwb-default-rtdb.firebaseio.com",
  projectId: "mentormeuwb",
  storageBucket: "mentormeuwb.firebasestorage.app",
  messagingSenderId: "690834968778",
  appId: "1:690834968778:web:0d816ca8b036adf1f3e433",
  measurementId: "G-801CH9LK6P",
};

// Initialize Firebase App
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);

// Initialize Firebase services
export const auth = getAuth(app); // Export Auth instance
export const database = getDatabase(app); // Export Database instance
export default app;
