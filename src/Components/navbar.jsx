import React from 'react';
import '/src/Components/ComponentStyling/navbar.css'; // Optional: for component-specific styling

// IMPORTING PICTURES
import profilePic from '../assets/6.png';
import logOut from '../assets/9.png';

const Navbar = () => {
  return (
    <>
        <header class="navbarContent">
            <nav class="leftSideNavbarContent">
                <h1>MentorMe</h1>

                <ul class="nav_links">
                    <li><a href="#">Students</a></li>
                    <li><a href="#">Tutor</a></li>
                    <li><a href="#">StudyBuddy</a></li>
                    <li><a href="#">Forums</a></li>
                </ul>
            </nav>

            <div class="contact_profile_container">
                <a class="contact_button" href="#"><button>Contact Us</button></a>
                <img class="profile" src={profilePic} alt="profile" width="63" height="65" onclick="toggleMenu()"/>

                <div class="sub-menu-wrap" id="subMenu">
                    <div class="sub-menu">
                        <div class="user-info">
                            <img src={profilePic} alt="profile" width="63" height="65"/>
                            <h3>Nithisha Sathishkumar</h3>
                        </div>
                    
                        <a href="#" class="sub-menu-link">
                            <img src={profilePic} alt="profile" width="63" height="65"/>
                            <p>Edit profile</p>
                            <span></span>
                        </a>

                        <a href="#" class="sub-menu-link">
                            <img src={profilePic} alt="profile" width="63" height="65"/>
                            <p>Edit profile</p>
                            <span></span>
                        </a>

                        <a href="#" class="sub-menu-link">
                            <img src={logOut} alt="profile" width="63" height="65"/>
                            <p>Logout</p>
                            <span></span>
                        </a>
                    </div>
                </div>
            </div>
        </header>
    </>
  )
}

export default Navbar;