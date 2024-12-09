// src/components/Navbar.js
import React, { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { getAuth, onAuthStateChanged } from 'firebase/auth';

import '/src/Components/ComponentStyling/navbar.css'; // Ensure the path is correct

// IMPORTING PICTURES
import defaultprofilePic from '../assets/6.png';
import logOut from '../assets/9.png';

const Navbar = () => {
  const [username, setUsername] = useState('User'); // Default to 'User'
  const [profilePic, setProfilePic] = useState(defaultprofilePic);

  const navigate = useNavigate();

  useEffect(() => {
    const auth = getAuth();
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        // User is signed in
        setUsername(user.displayName || 'User');
        setProfilePic(user.photoURL || defaultprofilePic);
      } else {
        // No user is signed in
        setUsername('User');
        setProfilePic(defaultprofilePic);
      }
    });

    return () => unsubscribe();
  }, []);

  const toggleMenu = () => {
    const subMenu = document.getElementById("subMenu");
    if (subMenu) {
      subMenu.classList.toggle("open-menu");
    }
  };

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
      <header className="navbarContent">
        <nav className="leftSideNavbarContent">
          <Link to="/" onClick={closeMenu}>
            <h1>MentorMe</h1>
          </Link>

          <ul className="nav_links">
            <li><Link to="/about" onClick={closeMenu}>About us</Link></li>
            <li><Link to="/tutorFind" onClick={closeMenu}>Tutor</Link></li>
            <li><Link to="/faq" onClick={closeMenu}>FAQ</Link></li>
            <li><Link to="/Chat" onClick={closeMenu}>Chat</Link></li>
          </ul>
        </nav>

        <div className="contact_profile_container">
          <Link className="contact_button" to="/contact" onClick={closeMenu}>
            <button>Contact Us</button>
          </Link>
          <div className="profile" onClick={toggleMenu}>
            <img src={profilePic} alt="profile" width="63" height="65" />
          </div>

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

export default Navbar;
