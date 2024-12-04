// import React, { useState } from "react";
// import { Link, useNavigate } from "react-router-dom"; // Use for navigation
// import { getDatabase, ref, get, child } from "firebase/database"; // Firebase imports
// import app from "../../firebaseConfi"; // Import your Firebase configuration
// import '../Styling/forgotPassword.css';

// function ForgotPassword() {
//   const [email, setEmail] = useState("");
//   const [errorMessage, setErrorMessage] = useState("");
//   const navigate = useNavigate();

//   const handleSubmit = async (e) => {
//     e.preventDefault();

//     if (!email) {
//       setErrorMessage("Please enter a valid email address.");
//       return;
//     }

//     try {

//       const db = getDatabase(app);
//       const dbRef = ref(db);

//       // Check if the email exists in the database
//       const snapshot = await get(child(dbRef, "account/user"));
      

//       if (snapshot.exists()) {
//         const users = snapshot.val();
//         const userExists = Object.values(users).some((user) => user.email === email);

//         if (userExists) {
//           // Navigate to ResetPassword page if the email exists
//           navigate("/reset", { state: { email } }); // Pass the email as state
//         } else {
//           // Notify the user if the email doesn't exist
//           setErrorMessage("This email address does not exist in our records.");
//         }
//       } else {
//         setErrorMessage("No users found in the database.");
//       }
//     } catch (error) {
//       console.error("Error checking email:", error);
//       setErrorMessage("An error occurred while checking the email. Please try again later.");
//     }
//   };

//   return (
//     <>
//       <div className="forgot-password-container">
//         <div className="forgot-password-card">
//           <h1>Forgot Password</h1>
//           <p>Please enter your email address to reset your password.</p>
//           <form className="forgot-password-form" onSubmit={handleSubmit}>
//             <input
//               type="email"
//               id="email"
//               name="email"
//               placeholder="Enter your email"
//               value={email}
//               onChange={(e) => setEmail(e.target.value)}
//               required
//             />
//             <button type="submit">Reset Password</button>
//           </form>
//           {errorMessage && <p className="error-message">{errorMessage}</p>} {/* Display error */}
//           <div className="links">
//             <Link to="/login">Back to Login</Link>
//             <Link to="/CreateAccount">Create New Account</Link>
//           </div>
//         </div>
//       </div>
//     </>
//   );
// }

// export default ForgotPassword;

import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom"; // Use for navigation
import { getDatabase, ref, get, child } from "firebase/database"; // Firebase imports
import {app} from "../../firebaseConfi"; // Import your Firebase configuration
import '../Styling/forgotPassword.css';

function ForgotPassword() {
  const [email, setEmail] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!email) {
      setErrorMessage("Please enter a valid email address.");
      return;
    }

    try {
      const db = getDatabase(app);
      const dbRef = ref(db);

      // Check email in both "account/user" and "tutors"
      const [userSnapshot, tutorSnapshot] = await Promise.all([
        get(child(dbRef, "account/user")),
        get(ref(db, "tutors"))
      ]);

      let userExists = false;

      // Check in "account/user"
      if (userSnapshot.exists()) {
        const users = userSnapshot.val();
        userExists = Object.values(users).some((user) => user.email === email);
      }

      // Check in "tutors" if not found in "account/user"
      if (!userExists && tutorSnapshot.exists()) {
        const tutors = tutorSnapshot.val();
        userExists = Object.values(tutors).some((tutor) => tutor.email === email);
      }

      if (userExists) {
        // Navigate to ResetPassword page if the email exists
        navigate("/reset", { state: { email } }); // Pass the email as state
      } else {
        // Notify the user if the email doesn't exist
        setErrorMessage("If this email exists in our records, you will receive an email to reset your password.");
      }
    } catch (error) {
      console.error("Error checking email:", error);
      setErrorMessage("An error occurred while checking the email. Please try again later.");
    }
  };

  return (
    <>
      <div className="forgot-password-container">
        <div className="forgot-password-card">
          <h1>Forgot Password</h1>
          <p>Please enter your email address to reset your password.</p>
          <form className="forgot-password-form" onSubmit={handleSubmit}>
            <input
              type="email"
              id="email"
              name="email"
              placeholder="Enter your email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
            <button type="submit">Reset Password</button>
          </form>
          {errorMessage && <p className="error-message">{errorMessage}</p>} {/* Display error */}
          <div className="links">
            <Link to="/login">Back to Login</Link>
            <Link to="/CreateAccount">Create New Account</Link>
          </div>
        </div>
      </div>
    </>
  );
}

export default ForgotPassword;
