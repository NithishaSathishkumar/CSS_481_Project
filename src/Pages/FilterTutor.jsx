import React, { useState, useEffect } from 'react';
import styles from '../Styling/FilterTutor.module.css'; // Scoped styles for this component
import photo1 from '../assets/26.png';
import photo2 from '../assets/21.png';
import photo3 from '../assets/22.png';
import photo4 from '../assets/23.png';
import photo5 from '../assets/24.png';
import photo6 from '../assets/25.png';

const FilterTutor = () => {
    const [openIndex, setOpenIndex] = useState(null);

    const toggleMenu = (index) => {
        setOpenIndex((prevIndex) => (prevIndex === index ? null : index));
    };

    const closeDropdown = () => {
        setOpenIndex(null);
    };

    // Close dropdown when clicking anywhere outside
    useEffect(() => {
        const handleOutsideClick = (event) => {
            // Check if the click is outside the component
            if (!event.target.closest(`.${styles.filterBar}`)) {
                closeDropdown();
            }
        };

        document.addEventListener('click', handleOutsideClick);

        return () => {
            document.removeEventListener('click', handleOutsideClick);
        };
    }, []);

    return (
        <div className={styles.tutorBody}>
            <div className={styles['filter-tutor-content']}>
                <div className={styles.tutorSearch}>
                    <button
                        type="button"
                        className={styles.tutorButton}
                        onClick={closeDropdown} // Close dropdown when this button is clicked
                    >
                        <h4>🔍</h4>
                    </button>
                </div>
                <div className={styles.tutoRight}>
                    {['Day', 'Time', 'Subject', 'Price', 'Rating'].map((label, index) => (
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
                                <li><a href="#">Action</a></li>
                                <li><a href="#">Another action</a></li>
                                <li><a href="#">Something else here</a></li>
                                <li><a href="#">Separated link</a></li>
                            </ul>
                        </div>
                    ))}
                    <div className={styles.filterReset}>
                        <button
                            type="button"
                            className={styles.tutorButton}
                            onClick={closeDropdown} // Close dropdown when Reset is clicked
                        >
                            Reset
                        </button>
                    </div>
                </div>
            </div>

            <div className={styles.tutorList}>
                {[
                    { img: photo1, title: 'Indu', description: 'I am passionate mathematics tutor with 5+ years of experience helping students excel in algebra and calculus', rating: 3 },
                    { img: photo2, title: 'Seth', description: 'I am an experienced computer science tutor specializing in coding, algorithms, and software development', rating: 3 },
                    { img: photo3, title: 'Ava', description: 'I am skilled English tutor with expertise in grammar, creative writing, and public speaking', rating: 2 },
                    { img: photo4, title: 'Kesh', description: 'I am physics enthusiast dedicated to simplifying complex concepts in mechanics and electromagnetism', rating: 4 },
                    { img: photo5, title: 'Anna', description: 'I am chemistry tutor with a focus on organic chemistry and lab techniques for academic success', rating: 1 },
                    { img: photo6, title: 'Mia', description: 'I am professional SAT coach with a proven track record of boosting students test scores', rating: 5 },
                ].map((card, index) => (
                    <div className={styles.tutorCard} key={index}>
                        <img src={card.img} className={styles.cardImgTop} alt={card.title} />
                        <div className={styles['tutorCard-body']}>
                            <h5 className={styles.tutorCardTitle}>{card.title}</h5>
                            <div className={styles.ratingStar}>
                                {[...Array(5)].map((_, starIndex) => (
                                    <span
                                        key={starIndex}
                                        className={`${styles.star} ${
                                            starIndex < card.rating ? styles.checked : ''
                                        }`}
                                    />
                                ))}
                            </div>
                            <p className={styles['tutor-card-text']}>{card.description}</p>
                            <div className={styles['tutor-category']}>
                                <a
                                    href="#"
                                    className={styles.tutorButton}
                                    onClick={closeDropdown} // Close dropdown when About is clicked
                                >
                                    About
                                </a>
                                <a
                                    href="#"
                                    className={styles.tutorButton}
                                    onClick={closeDropdown} // Close dropdown when Booking is clicked
                                >
                                    Booking
                                </a>
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default FilterTutor;
