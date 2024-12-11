// FilterTutor.jsx

// Import necessary libraries and modules
import React, { useState, useEffect } from 'react';
import styles from '../Styling/FilterTutor.module.css';
import { getDatabase, ref, get } from 'firebase/database';

// Main component for Filter Tutor
const FilterTutor = () => {
    const [openIndex, setOpenIndex] = useState(null);
    const [filters, setFilters] = useState({
        day: '',
        time: '',
        subject: '',
        price: '',
        rating: '',
    });
    const [selectedCategory, setSelectedCategory] = useState(null);
    const [tutors, setTutors] = useState([]);

    // Predefined filter options for dropdown menus
    const filterOptions = {
        Day: ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'],
        Time: ['Morning', 'Afternoon', 'Evening', 'All Days'],
        Subject: ['Math', 'Computer Science', 'English', 'Physics', 'Chemistry', 'SAT Prep', 'Other'],
        Price: ['Free', '<$20/hour or less', '$20-$50/hour', 'More than $50/hour'],
        Rating: ['1 Stars', '2 Stars', '3 Stars', '4 Stars', '5 Stars'],
    };

    // Function to fetch tutors from the Firebase database
    const fetchTutors = async () => {
        const db = getDatabase();
        let tutorQuery = ref(db, 'tutors'); // Reference to the tutors collection

        try {
            const snapshot = await get(tutorQuery);
            if (snapshot.exists()) {
                const data = snapshot.val();

                // Convert the fetched data into an array of tutor objects
                let tutorsArray = Object.keys(data).map(key => ({ ...data[key], id: key }));

                // Apply filters to the tutor list in memory (client-side)
                if (filters.rating) {
                    tutorsArray = tutorsArray.filter(tutor => tutor.rating === parseInt(filters.rating[0]));
                }
                if (filters.subject) {
                    tutorsArray = tutorsArray.filter(tutor => tutor.primarySubject === filters.subject);
                }
                if (filters.price) {
                    tutorsArray = tutorsArray.filter(tutor => tutor.price === filters.price);
                }
                if (filters.day) {
                    tutorsArray = tutorsArray.filter(tutor => tutor.daysAvailable.includes(filters.day));
                }
                if (filters.time) {
                    tutorsArray = tutorsArray.filter(tutor => tutor.availableTime === filters.time);
                }

                setTutors(tutorsArray);  // Update the tutors state with the filtered list
            } else {
                setTutors([]);  // If no tutors match the filters, show an empty list
            }
        } catch (error) {
            // If no tutors match the filters, set an empty list
            console.error("Error fetching tutors:", error);
        }
    };

    // useEffect to fetch tutors whenever filters change
    useEffect(() => {
        fetchTutors(); 
    }, [filters]);

    // Function to toggle dropdown menus
    const toggleMenu = (index) => {
        setOpenIndex((prevIndex) => (prevIndex === index ? null : index));
    };

    // Function to close all dropdown menus
    const closeDropdown = () => {
        setOpenIndex(null);
    };

    // Function to handle filter selection
    const selectFilter = (category, value) => {
        setFilters((prev) => ({ ...prev, [category.toLowerCase()]: value }));
        setSelectedCategory(category); // Update the selected category
        closeDropdown(); // Close the dropdown menu after selection
    };

    // Function to reset all filters
    const resetFilters = () => {
        setFilters({ day: '', time: '', subject: '', price: '', rating: '' });
        setSelectedCategory(null); // Reset selected category
        fetchTutors();  // Fetch all tutors when reset
    };

    // Return JSX for the Filter Tutor
    return (
        <div className={styles.tutorBody}>
            <div className={styles['filter-tutor-content']}>
                {/* Search button to close dropdowns */}
                <div className={styles.tutorSearch}>
                    <button
                        type="button"
                        className={styles.tutorButton}
                        onClick={closeDropdown}
                    >
                        <h4>🔍</h4>
                    </button>
                </div>
                <div className={styles.tutoRight}>
                    {/* Render filter options or selected category */}
                    {selectedCategory === null ? (
                        Object.keys(filterOptions).map((label, index) => (
                            <div className={styles.filterBar} key={index}>
                                <button
                                    type="button"
                                    className={styles.filterOption}
                                    onClick={() => toggleMenu(index)}
                                >
                                    {label}
                                </button>
                                <ul
                                    id={`dropdownMenu-${index}`}
                                    className={`${styles.filterMenu} ${
                                        openIndex === index ? styles.openMenu : ''
                                    }`}
                                >
                                    {filterOptions[label].map((option, optionIndex) => (
                                        <li
                                            key={optionIndex}
                                            onClick={() => selectFilter(label, option)}
                                        >
                                            <a href="#">{option}</a>
                                        </li>
                                    ))}
                                </ul>
                            </div>
                        ))
                    ) : (
                        <div className={styles.filterBar}>
                            <button className={styles.filterOption}>
                                {selectedCategory}: {filters[selectedCategory.toLowerCase()]}
                            </button>
                        </div>
                    )}
                    {/* Reset button to clear filters */}
                    <div className={styles.filterReset}>
                        <button
                            type="button"
                            className={styles.tutorButton}
                            onClick={resetFilters}
                        >
                            Reset
                        </button>
                    </div>
                </div>
            </div>

            {/* Render the list of tutors */}
            <div className={styles.tutorList}>
                {tutors.length > 0 ? (
                    tutors.map((card, index) => (
                        <div className={styles.tutorCard} key={index}>
                            <img 
                                src={card.photo}
                                className={styles.cardImgTop} 
                                alt={card.firstName}
                            />
                            <div className={styles['tutorCard-body']}>
                                <h4 className={styles.tutorCardTitle}>{card.firstName} {card.lastName}</h4>
                                <div className={styles.star}>
                                    {[...Array(5)].map((_, starIndex) => (
                                        <span
                                            key={starIndex}
                                            className={`fa fa-star ${starIndex < card.rating ? 'checked' : ''}`}
                                            style={{
                                                fontSize: '0.8em',
                                                color: starIndex < card.rating ? '#ffcc00' : '#e4e5e9',
                                                margin: '0 2px',
                                            }}
                                        ></span>
                                    ))}
                                </div>
                                <p className={styles['tutor-card-text']}>{card.description}</p>
                                <div className={styles['tutor-category']}>
                                    <a href={`tutor/${card.id}`} className={styles.tutorButton}>About</a>
                                    <a href={`booking/${card.id}`} className={styles.tutorButton}>Booking</a>
                                </div>
                            </div>
                        </div>
                    ))
                ) : (
                    <p>No tutors found with the selected filters.</p>
                )}
            </div>
        </div>
    );
};

export default FilterTutor; // Export component
