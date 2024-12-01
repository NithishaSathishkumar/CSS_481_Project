import React from 'react';
import { Link } from 'react-router-dom';
import '/src/Components/ComponentStyling/navbar.css'; // Optional: for component-specific styling

// IMPORTING PICTURES
import profilePic from '../assets/6.png';
import logOut from '../assets/9.png';

const Navbar = () => {
    const toggleMenu = () => {
        const subMenu = document.getElementById("subMenu");
        if (subMenu) {
          subMenu.classList.toggle("open-menu");
        }
    };
    
    return (
        <>
            <header class="navbarContent">
                <nav class="leftSideNavbarContent">
                <Link to="/">
                    <h1>MentorMe</h1>
                </Link>

                    <ul class="nav_links">
                        <li><Link to="/about">About us</Link></li>
                        <li><Link to="/tutorFind">Tutor</Link></li>
                        <li><a href="#">Student</a></li>
                        <li><Link to="/faq">FAQ</Link></li>
                    </ul>
                </nav>

                <div class="contact_profile_container">
                <Link className="contact_button" to="/contact">
                    <button>Contact Us</button>
                </Link>
                <div className="profile" onClick={toggleMenu}> <img src={profilePic} alt="profile" width="63" height="65"></img></div>

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