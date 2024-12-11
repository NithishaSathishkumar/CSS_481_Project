// Import necessary libraries and modules
import React, { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { getAuth, onAuthStateChanged } from 'firebase/auth';
// Import styles and assets
import '/src/Components/ComponentStyling/navbar.css';
import defaultprofilePic from '../assets/6.png';
import logOut from '../assets/9.png';

const Navbar = () => {
  // State to manage the user's username and profile picture
  const [username, setUsername] = useState('User'); // Default to 'User'
  const [profilePic, setProfilePic] = useState(defaultprofilePic);
  // React Router's navigate function for programmatic navigation
  const navigate = useNavigate();
  // Effect to monitor authentication state and update user info
  useEffect(() => {
    const auth = getAuth();// Get Firebase Auth instance
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        // If user is signed in, update the username and profile picture
        setUsername(user.displayName || 'User');
        setProfilePic(user.photoURL || defaultprofilePic);
      } else {
        // If no user is signed in, reset to default values
        setUsername('User');
        setProfilePic(defaultprofilePic);
      }
    });

    return () => unsubscribe();
  }, []);// Cleanup subscription 
  // Function to toggle the visibility of the dropdown menu
  const toggleMenu = () => {
    const subMenu = document.getElementById("subMenu");
    if (subMenu) {
      subMenu.classList.toggle("open-menu");
    }
  };
  // Function to close the dropdown menu
  const closeMenu = () => {
    const subMenu = document.getElementById("subMenu");
    if (subMenu && subMenu.classList.contains("open-menu")) {
      subMenu.classList.remove("open-menu");
    }
  };

  useEffect(() => {
    // Close the menu when clicking outside
    const handleOutsideClick = (event) => {
      if (!event.target.closest(".profile") && !event.target.closest("#subMenu")) {
        closeMenu();
      }
    };

    document.addEventListener("click", handleOutsideClick);

    return () => {
      document.removeEventListener("click", handleOutsideClick);
    };
  }, []);
  // Function to handle user logout
  const handleLogout = () => {
    const auth = getAuth();

    if (auth.currentUser) {
      auth.signOut().then(() => {
        console.log('User signed out');
        navigate("/login");
      }).catch((error) => {
        console.error(error);
      });
    } else {
      console.log("No user is signed in");
    }
  };

  return (
    <>
      {/* Main Navbar structure */}
      <header className="navbarContent">
        <nav className="leftSideNavbarContent">
          <Link to="/" onClick={closeMenu}>
            <h1>MentorMe</h1>
          </Link>
          {/* Navigation links for the left navbar */}
          <ul className="nav_links">
            <li><Link to="/about" onClick={closeMenu}>About us</Link></li>
            <li><Link to="/tutorFind" onClick={closeMenu}>Tutor</Link></li>
            <li><Link to="/faq" onClick={closeMenu}>FAQ</Link></li>
            <li><Link to="/Chat" onClick={closeMenu}>Chat</Link></li>
          </ul>
        </nav>
        {/* Right side navbar, 'contact us' and profile section */}
        <div className="contact_profile_container">
          <Link className="contact_button" to="/contact" onClick={closeMenu}>
            <button>Contact Us</button>
          </Link>
          <div className="profile" onClick={toggleMenu}>
            <img src={profilePic} alt="profile" width="63" height="65" />
          </div>
          {/* Dropdown menu  of the profile  */}
          <div className="sub-menu-wrap" id="subMenu">
            <div className="sub-menu">
              <div className="user-info">
                <h3>Welcome, {username}</h3> {/* Display the username here */}
              </div>

              <Link to="/edit-profile" className="sub-menu-link" onClick={closeMenu}>
                <img src={profilePic} alt="profile" width="63" height="65" />
                <p>Edit profile</p>
              </Link>

              <button className="sub-menu-link" onClick={handleLogout}>
                <p>Logout</p>
              </button>
            </div>
          </div>
        </div>
      </header>
    </>
  );
};
// Export the Navbar component for use in other parts of the app
export default Navbar;
