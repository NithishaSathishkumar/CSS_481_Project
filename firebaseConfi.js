// // firebaseConfi.js
// import { initializeApp } from "firebase/app";
// import { getAnalytics } from "firebase/analytics";
// import { getAuth } from "firebase/auth";
// import { getDatabase } from "firebase/database";

// const firebaseConfig = {
//   apiKey: "AIzaSyCN-vj_-0uVudCRRw64ZIVuo7nZDxwczXQ",
//   authDomain: "mentormeuwb.firebaseapp.com",
//   databaseURL: "https://mentormeuwb-default-rtdb.firebaseio.com",
//   projectId: "mentormeuwb",
//   storageBucket: "mentormeuwb.appspot.com",
//   messagingSenderId: "690834968778",
//   appId: "1:690834968778:web:0d816ca8b036adf1f3e433",
//   measurementId: "G-801CH9LK6P",
// };

// // Initialize Firebase App
// const app = initializeApp(firebaseConfig);
// const analytics = getAnalytics(app);

// // Initialize Firebase services
// export const auth = getAuth(app);
// export const database = getDatabase(app);
// export default app;

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