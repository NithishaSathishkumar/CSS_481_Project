import React, { useEffect } from 'react';
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
                        <li><a href="#" onClick={closeMenu}>Student</a></li>
                        <li><Link to="/faq" onClick={closeMenu}>FAQ</Link></li>
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
                                <img src={profilePic} alt="profile" width="63" height="65" />
                                <h3>Nithisha Sathishkumar</h3>
                            </div>

                            <a href="#" className="sub-menu-link" onClick={closeMenu}>
                                <img src={profilePic} alt="profile" width="63" height="65" />
                                <p>Edit profile</p>
                                <span></span>
                            </a>

                            <a href="#" className="sub-menu-link" onClick={closeMenu}>
                                <img src={profilePic} alt="profile" width="63" height="65" />
                                <p>Edit profile</p>
                                <span></span>
                            </a>

                            <a href="#" className="sub-menu-link" onClick={closeMenu}>
                                <img src={logOut} alt="profile" width="63" height="65" />
                                <p>Logout</p>
                                <span></span>
                            </a>
                        </div>
                    </div>
                </div>
            </header>
        </>
    );
};

export default Navbar;
