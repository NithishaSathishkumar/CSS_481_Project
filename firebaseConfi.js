// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyADZbToGJgT-a-qRf8V1-0Ujc_b70Jvqvg",
  authDomain: "mentormedatabase.firebaseapp.com",
  projectId: "mentormedatabase",
  storageBucket: "mentormedatabase.firebasestorage.app",
  messagingSenderId: "879082340409",
  appId: "1:879082340409:web:4be6a9e8dad0591ed08de8"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

export default app;