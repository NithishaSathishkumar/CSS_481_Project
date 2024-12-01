// import React, { useState } from "react";
// import { useLocation, useNavigate } from "react-router-dom";
// import { getDatabase, ref, update } from "firebase/database"; // Firebase imports
// import {app} from "../../firebaseConfi"; // Firebase configuration
// import "../Styling/resetPassword.css";

// function ResetPassword() {
//   const location = useLocation();
//   const navigate = useNavigate();
//   const email = location.state?.email; // Retrieve the email passed as state
//   const [newPassword, setNewPassword] = useState("");
//   const [confirmPassword, setConfirmPassword] = useState("");
//   const [errorMessage, setErrorMessage] = useState("");

//   const handleSubmit = async (e) => {
//     e.preventDefault();

//     // Validate passwords
//     if (!newPassword || !confirmPassword) {
//       setErrorMessage("Both password fields are required.");
//       return;
//     }
//     if (newPassword !== confirmPassword) {
//       setErrorMessage("Passwords do not match.");
//       return;
//     }

//     try {
//       const db = getDatabase(app);
//       const usersRef = ref(db, "account/user");

//       // Update the password in the database
//       const snapshot = await get(usersRef);
//       if (snapshot.exists()) {
//         const users = snapshot.val();
//         const userKey = Object.keys(users).find(
//           (key) => users[key].email_ === email
//         );

//         if (userKey) {
//           const userRef = ref(db, `account/user/${userKey}`);
//           await update(userRef, { password_: newPassword });
//           alert("Password has been reset successfully!");
//           navigate("/login"); // Redirect to login page
//         } else {
//           setErrorMessage("User not found.");
//         }
//       } else {
//         setErrorMessage("No users found in the database.");
//       }
//     } catch (error) {
//       console.error("Error updating password:", error);
//       setErrorMessage("An error occurred while resetting your password. Please try again.");
//     }
//   };

//   return (
//     <div className="reset-password-container">
//       <div className="reset-password-card">
//         <h1>Reset Password</h1>
//         <p>Please enter your new password and confirm it to reset.</p>

//         <form className="reset-password-form" onSubmit={handleSubmit}>
//           <input
//             type="password"
//             id="new-password"
//             name="new-password"
//             placeholder="Enter new password"
//             value={newPassword}
//             onChange={(e) => setNewPassword(e.target.value)}
//             required
//           />
//           <input
//             type="password"
//             id="confirm-password"
//             name="confirm-password"
//             placeholder="Confirm new password"
//             value={confirmPassword}
//             onChange={(e) => setConfirmPassword(e.target.value)}
//             required
//           />
//           <button type="submit">Reset Password</button>
//         </form>

//         {errorMessage && <p className="error-message">{errorMessage}</p>}

//         <div className="links">
//           <Link to="/login">Back to Login</Link>
//         </div>
//       </div>
//     </div>
//   );
// }

// export default ResetPassword;

import React, { useState } from "react";
import { useLocation, useNavigate, Link } from "react-router-dom"; // Added Link import
import { getDatabase, ref, update, get } from "firebase/database"; // Added 'get' import
import {app} from "../../firebaseConfi";
import "../Styling/resetPassword.css";

function ResetPassword() {
  const location = useLocation();
  const navigate = useNavigate();
  const email = location.state?.email;
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [errorMessage, setErrorMessage] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Validate passwords
    if (!newPassword || !confirmPassword) {
      setErrorMessage("Both password fields are required.");
      return;
    }
    if (newPassword !== confirmPassword) {
      setErrorMessage("Passwords do not match.");
      return;
    }

    try {
      const db = getDatabase(app);
      const usersRef = ref(db, "account/user");

      // Fetch users and update the password
      const snapshot = await get(usersRef);
      if (snapshot.exists()) {
        const users = snapshot.val();
        const userKey = Object.keys(users).find(
          (key) => users[key].email_ === email
        );

        if (userKey) {
          const userRef = ref(db, `account/user/${userKey}`);
          await update(userRef, { password_: newPassword });
          alert("Password has been reset successfully!");
          navigate("/login");
        } else {
          setErrorMessage("User not found.");
        }
      } else {
        setErrorMessage("No users found in the database.");
      }
    } catch (error) {
      console.error("Error updating password:", error);
      setErrorMessage("An error occurred while resetting your password. Please try again.");
    }
  };

  return (
    <div className="reset-password-page">
      <div className="reset-password-container">
        <div className="reset-password-card">
          <h1>Reset Password</h1>
          <p>Please enter your new password and confirm it to reset.</p>

          <form className="reset-password-form" onSubmit={handleSubmit}>
            <input
              type="password"
              id="new-password"
              name="new-password"
              placeholder="Enter new password"
              value={newPassword}
              onChange={(e) => setNewPassword(e.target.value)}
              required
            />
            <input
              type="password"
              id="confirm-password"
              name="confirm-password"
              placeholder="Confirm new password"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              required
            />
            <button type="submit">Reset Password</button>
          </form>

          {errorMessage && <p className="error-message">{errorMessage}</p>}

          <div className="links">
            <Link to="/login">Back to Login</Link>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ResetPassword;

