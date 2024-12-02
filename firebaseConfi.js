// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyCN-vj_-0uVudCRRw64ZIVuo7nZDxwczXQ",
  authDomain: "mentormeuwb.firebaseapp.com",
  databaseURL: "https://mentormeuwb-default-rtdb.firebaseio.com",
  projectId: "mentormeuwb",
  storageBucket: "mentormeuwb.firebasestorage.app",
  messagingSenderId: "690834968778",
  appId: "1:690834968778:web:0d816ca8b036adf1f3e433",
  measurementId: "G-801CH9LK6P"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);

export default app;