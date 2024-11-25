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
            <header className="navbarContent">
                <nav className="leftSideNavbarContent">
                    <h1>MentorMe</h1>

                    <ul className="nav_links">
                        <li><Link to="/About">About Us</Link></li>
                        <li><a href="">Student</a></li>
                        <li><a href="#">Teacher</a></li>
                    </ul>
                </nav>

                <div className="contact_profile_container">
                    {/* <a className="contact_button" href={Contact}><button>Contact Us</button></a> */}
                    {/* <img className="profile" src={profilePic} alt="profile" width="63" height="65" onClick={toggleMenu}/> */}
                    <Link to="/contact">
                        <button className="contact_button">Contact Us</button>
                    </Link>

                    <div className="profile" onClick={toggleMenu}> <img src={profilePic} alt="profile"></img></div>

                    <div className="sub-menu-wrap" id="subMenu">
                        <div className="sub-menu">
                            <div className="user-info">
                                <img src={profilePic} alt="profile" width="63" height="65"/>
                                <h3>Nithisha Sathishkumar</h3>
                            </div>
                        
                            <a href="#" className="sub-menu-link">
                                <img src={profilePic} alt="profile" width="63" height="65"/>
                                <p>Edit profile</p>
                                <span></span>
                            </a>

                            <a href="#" className="sub-menu-link">
                                <img src={profilePic} alt="profile" width="63" height="65"/>
                                <p>Edit profile</p>
                                <span></span>
                            </a>

                            <a href="#" className="sub-menu-link">
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