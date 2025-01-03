// ForgotPassword.jsx

// Import necessary libraries and modules
import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom"; // Use for navigation
import { getAuth, sendPasswordResetEmail } from "firebase/auth"; // Firebase imports for Auth
import "../Styling/forgotPassword.css";
import { app } from "../../firebaseConfi"; // Import your Firebase configuration

// Main component for Forgot Password
function ForgotPassword() {
  const [email, setEmail] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const [successMessage, setSuccessMessage] = useState(""); // To display success message
  const navigate = useNavigate();

  // Handle form submission for forgot password data
  const handleSubmit = async (e) => {
    e.preventDefault();

    // Basic validation to ensure email is provided
    if (!email) {
      setErrorMessage("Please enter a valid email address.");
      return;
    }

    try {
      const auth = getAuth(app);

      // Use Firebase's sendPasswordResetEmail method
      await sendPasswordResetEmail(auth, email);

      // If successful, show success message
      setSuccessMessage("A password reset email has been sent if this email exists in our records.");
      setTimeout(() => navigate("/login"), 60000);
      
      setErrorMessage("");
    } catch (error) {
      console.error("Error sending password reset email:", error);

      // Handle Firebase error codes with user-friendly messages
      if (error.code === "auth/user-not-found") {
        setErrorMessage("If this email exists in our records, you will receive an email to reset your password.");
      } else if (error.code === "auth/invalid-email") {
        setErrorMessage("Please enter a valid email address.");
      } else {
        setErrorMessage("An error occurred. Please try again later.");
      }
      setSuccessMessage("");
    }
  };

  // Return JSX for the forgot password
  return (
    <>
      <div className="forgot-password-container">
        <div className="forgot-password-card">
          <h1>Forgot Password</h1>
          <p>Please enter your email address to reset your password.</p>
          <form className="forgot-password-form" onSubmit={handleSubmit}>
            {/* Input field for email */}
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
          {/* Conditional rendering for error and success messages */}
          {errorMessage && <p className="error-message">{errorMessage}</p>} {/* Display error */}
          {successMessage && <p className="success-message">{successMessage}</p>} {/* Display success */}
          <div className="links">
            <Link to="/login">Back to Login</Link>
            <Link to="/CreateAccount">Create New Account</Link>
          </div>
        </div>
      </div>
    </>
  );
}

export default ForgotPassword; // Export component