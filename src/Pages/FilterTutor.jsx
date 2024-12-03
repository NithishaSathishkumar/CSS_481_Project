// import React, { useState, useEffect } from 'react';
// import styles from '../Styling/FilterTutor.module.css';
// import photo1 from '../assets/26.png';
// import photo2 from '../assets/21.png';
// import photo3 from '../assets/22.png';
// import photo4 from '../assets/23.png';
// import photo5 from '../assets/24.png';
// import photo6 from '../assets/25.png';

// const FilterTutor = () => {
//     const [openIndex, setOpenIndex] = useState(null);
//     const [filters, setFilters] = useState({
//         day: '',
//         time: '',
//         subject: '',
//         price: '',
//         rating: '',
//     });

//     const filterOptions = {
//         Day: ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'],
//         Time: ['Morning', 'Afternoon', 'Evening'],
//         Subject: ['Math', 'Computer Science', 'English', 'Physics', 'Chemistry', 'SAT Prep'],
//         Price: ['Free', '<$20/hour', '$20-$50/hour', '>$50/hour'],
//         Rating: ['1 Star', '2 Stars', '3 Stars', '4 Stars', '5 Stars'],
//     };

//     const toggleMenu = (index) => {
//         setOpenIndex((prevIndex) => (prevIndex === index ? null : index));
//     };

//     const closeDropdown = () => {
//         setOpenIndex(null);
//     };

//     const selectFilter = (category, value) => {
//         setFilters((prev) => ({ ...prev, [category.toLowerCase()]: value }));
//         closeDropdown();
//     };

//     useEffect(() => {
//         const handleOutsideClick = (event) => {
//             if (!event.target.closest(`.${styles.filterBar}`)) {
//                 closeDropdown();
//             }
//         };

//         document.addEventListener('click', handleOutsideClick);

//         return () => {
//             document.removeEventListener('click', handleOutsideClick);
//         };
//     }, []);

//     return (
//         <div className={styles.tutorBody}>
//             <div className={styles['filter-tutor-content']}>
//             <div className={styles.tutorSearch}>
//                 <button
//                     type="button"
//                     className={styles.tutorButton}
//                     onClick={closeDropdown} // Close dropdown when this button is clicked
//                 >
//                     <h4>🔍</h4>
//                 </button>
//                 </div>
//                 <div className={styles.tutoRight}>
//                     {Object.keys(filterOptions).map((label, index) => (
//                         <div className={styles.filterBar} key={index}>
//                             <button
//                                 type="button"
//                                 className={styles.filterOption}
//                                 onClick={() => toggleMenu(index)}
//                             >
//                                 {label}
//                             </button>
//                             <ul
//                                 id={`dropdownMenu-${index}`}
//                                 className={`${styles.filterMenu} ${
//                                     openIndex === index ? styles.openMenu : ''
//                                 }`}
//                             >
//                                 {filterOptions[label].map((option, optionIndex) => (
//                                     <li
//                                         key={optionIndex}
//                                         onClick={() => selectFilter(label, option)}
//                                     >
//                                         <a href="#">{option}</a>
//                                     </li>
//                                 ))}
//                             </ul>
//                         </div>
//                     ))}
//                     <div className={styles.filterReset}>
//                         <button
//                             type="button"
//                             className={styles.tutorButton}
//                             onClick={() => setFilters({ day: '', time: '', subject: '', price: '', rating: '' })}
//                         >
//                             Reset
//                         </button>
//                     </div>
//                 </div>
//             </div>

//             <div className={styles.tutorList}>
//                 {[
//                     { img: photo1, title: 'Indu', description: 'I am passionate mathematics tutor with 5+ years of experience helping students excel in algebra and calculus', rating: 3 },
//                     { img: photo2, title: 'Seth', description: 'I am an experienced computer science tutor specializing in coding, algorithms, and software development', rating: 3 },
//                     { img: photo3, title: 'Ava', description: 'I am skilled English tutor with expertise in grammar, creative writing, and public speaking', rating: 2 },
//                     { img: photo4, title: 'Kesh', description: 'I am physics enthusiast dedicated to simplifying complex concepts in mechanics and electromagnetism', rating: 4 },
//                     { img: photo5, title: 'Anna', description: 'I am chemistry tutor with a focus on organic chemistry and lab techniques for academic success', rating: 1 },
//                     { img: photo6, title: 'Mia', description: 'I am professional SAT coach with a proven track record of boosting students test scores', rating: 5 },
//                 ]
//                     .filter((tutor) => {
//                         if (filters.rating && parseInt(filters.rating[0]) > tutor.rating) return false;
//                         return true;
//                     })
//                     .map((card, index) => (
//                         <div className={styles.tutorCard} key={index}>
//                             <img src={card.img} className={styles.cardImgTop} alt={card.title} />
//                             <div className={styles['tutorCard-body']}>
//                                 <h4 className={styles.tutorCardTitle}>{card.title}</h4>
//                                 <div className={styles.star}>
//                                     {[...Array(5)].map((_, starIndex) => (
//                                         <span
//                                             key={starIndex}
//                                             className={`fa fa-star ${
//                                                 starIndex < card.rating ? 'checked' : ''
//                                             }`}
//                                             style={{
//                                                 fontSize: '0.8em', // Smaller star size
//                                                 color: starIndex < card.rating ? '#ffcc00' : '#e4e5e9',
//                                                 margin: '0 2px',
//                                             }}
//                                         ></span>
//                                     ))}
//                                 </div>
//                                 <p className={styles['tutor-card-text']}>{card.description}</p>
//                                 <div className={styles['tutor-category']}>
//                                     <a href="#" className={styles.tutorButton}>
//                                         About
//                                     </a>
//                                     <a href="#" className={styles.tutorButton}>
//                                         Booking
//                                     </a>
//                                 </div>
//                             </div>
//                         </div>
//                     ))}
//             </div>
//         </div>
//     );
// };

// export default FilterTutor;

// import React, { useState, useEffect } from 'react';
// import styles from '../Styling/FilterTutor.module.css';
// import { getDatabase, ref, get } from 'firebase/database';

// const FilterTutor = () => {
//     const [openIndex, setOpenIndex] = useState(null);
//     const [filters, setFilters] = useState({
//         day: '',
//         time: '',
//         subject: '',
//         price: '',
//         rating: '',
//     });
//     const [selectedCategory, setSelectedCategory] = useState(null); // New state to track selected category
//     const [tutors, setTutors] = useState([]);

//     const filterOptions = {
//         Day: ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'],
//         Time: ['Morning', 'Afternoon', 'Evening'],
//         Subject: ['Math', 'Computer Science', 'English', 'Physics', 'Chemistry', 'SAT Prep'],
//         Price: ['Free', '<$20/hour', '$20-$50/hour', '>$50/hour'],
//         Rating: ['1 Star', '2 Stars', '3 Stars', '4 Stars', '5 Stars'],
//     };

//     const fetchTutors = async () => {
//         const db = getDatabase();
//         let tutorQuery = ref(db, 'tutors'); // Reference to the tutors collection

//         try {
//             const snapshot = await get(tutorQuery);
//             if (snapshot.exists()) {
//                 const data = snapshot.val();
//                 let tutorsArray = Object.keys(data).map(key => ({ ...data[key], id: key }));

//                 // Apply filters in memory (client-side)
//                 if (filters.rating) {
//                     tutorsArray = tutorsArray.filter(tutor => tutor.rating === parseInt(filters.rating[0]));
//                 }
//                 if (filters.subject) {
//                     tutorsArray = tutorsArray.filter(tutor => tutor.subject === filters.subject);
//                 }
//                 if (filters.price) {
//                     tutorsArray = tutorsArray.filter(tutor => tutor.price === filters.price);
//                 }
//                 if (filters.day) {
//                     tutorsArray = tutorsArray.filter(tutor => tutor.day === filters.day);
//                 }
//                 if (filters.time) {
//                     tutorsArray = tutorsArray.filter(tutor => tutor.time === filters.time);
//                 }

//                 setTutors(tutorsArray);  // Set the tutors state to the filtered data
//             } else {
//                 setTutors([]);  // If no tutors match the filters, show an empty list
//             }
//         } catch (error) {
//             console.error("Error fetching tutors:", error);
//         }
//     };

//     useEffect(() => {
//         fetchTutors(); // Trigger fetch every time filters change
//     }, [filters]);  // Dependency array ensures the fetch is called on filter change

//     const toggleMenu = (index) => {
//         setOpenIndex((prevIndex) => (prevIndex === index ? null : index));
//     };

//     const closeDropdown = () => {
//         setOpenIndex(null);
//     };

//     const selectFilter = (category, value) => {
//         setFilters((prev) => ({ ...prev, [category.toLowerCase()]: value }));
//         setSelectedCategory(category); // Set the selected category
//         closeDropdown(); // Close the dropdown after selection
//     };

//     const resetFilters = () => {
//         setFilters({ day: '', time: '', subject: '', price: '', rating: '' });
//         setSelectedCategory(null); // Reset selected category
//         fetchTutors();  // Fetch all tutors when reset
//     };

//     return (
//         <div className={styles.tutorBody}>
//             <div className={styles['filter-tutor-content']}>
//                 <div className={styles.tutorSearch}>
//                     <button
//                         type="button"
//                         className={styles.tutorButton}
//                         onClick={closeDropdown}
//                     >
//                         <h4>🔍</h4>
//                     </button>
//                 </div>
//                 <div className={styles.tutoRight}>
//                     {selectedCategory === null ? ( // Show all filters when no category is selected
//                         Object.keys(filterOptions).map((label, index) => (
//                             <div className={styles.filterBar} key={index}>
//                                 <button
//                                     type="button"
//                                     className={styles.filterOption}
//                                     onClick={() => toggleMenu(index)}
//                                 >
//                                     {label}
//                                 </button>
//                                 <ul
//                                     id={`dropdownMenu-${index}`}
//                                     className={`${styles.filterMenu} ${
//                                         openIndex === index ? styles.openMenu : ''
//                                     }`}
//                                 >
//                                     {filterOptions[label].map((option, optionIndex) => (
//                                         <li
//                                             key={optionIndex}
//                                             onClick={() => selectFilter(label, option)}
//                                         >
//                                             <a href="#">{option}</a>
//                                         </li>
//                                     ))}
//                                 </ul>
//                             </div>
//                         ))
//                     ) : (
//                         // Show only the selected filter and reset button
//                         <div className={styles.filterBar}>
//                             <button className={styles.filterOption}>
//                                 {selectedCategory}: {filters[selectedCategory.toLowerCase()]}
//                             </button>
//                         </div>
//                     )}
//                     <div className={styles.filterReset}>
//                         <button
//                             type="button"
//                             className={styles.tutorButton}
//                             onClick={resetFilters}  // Use resetFilters to reset the filters and fetch all tutors
//                         >
//                             Reset
//                         </button>
//                     </div>
//                 </div>
//             </div>

//             <div className={styles.tutorList}>
//                 {tutors.length > 0 ? (
//                     tutors.map((card, index) => (
//                         <div className={styles.tutorCard} key={index}>
//                             <img 
//                                 src={card.img}
//                                 className={styles.cardImgTop} 
//                                 alt={card.name}
//                             />
//                             <div className={styles['tutorCard-body']}>
//                                 <h4 className={styles.tutorCardTitle}>{card.name}</h4>
//                                 <div className={styles.star}>
//                                     {[...Array(5)].map((_, starIndex) => (
//                                         <span
//                                             key={starIndex}
//                                             className={`fa fa-star ${starIndex < card.rating ? 'checked' : ''}`}
//                                             style={{
//                                                 fontSize: '0.8em',
//                                                 color: starIndex < card.rating ? '#ffcc00' : '#e4e5e9',
//                                                 margin: '0 2px',
//                                             }}
//                                         ></span>
//                                     ))}
//                                 </div>
//                                 <p className={styles['tutor-card-text']}>{card.description}</p>
//                                 <div className={styles['tutor-category']}>
//                                     <a href="#" className={styles.tutorButton}>About</a>
//                                     <a href="#" className={styles.tutorButton}>Booking</a>
//                                 </div>
//                             </div>
//                         </div>
//                     ))
//                 ) : (
//                     <p>No tutors found with the selected filters.</p>
//                 )}
//             </div>
//         </div>
//     );
// };

// export default FilterTutor;


import React, { useState, useEffect } from 'react';
import styles from '../Styling/FilterTutor.module.css';
import { getDatabase, ref, get } from 'firebase/database';

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

    const filterOptions = {
        Day: ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'],
        Time: ['Morning', 'Afternoon', 'Evening', 'All Day'],
        Subject: ['Math', 'Computer Science', 'English', 'Physics', 'Chemistry', 'SAT Prep', 'Other'],
        Price: ['Free', '<$20/hour or less', '$20-$50/hour', 'More than $50/hour'],
        Rating: ['1 Star', '2 Stars', '3 Stars', '4 Stars', '5 Stars'],
    };

    const fetchTutors = async () => {
        const db = getDatabase();
        let tutorQuery = ref(db, 'tutors'); // Reference to the tutors collection

        try {
            const snapshot = await get(tutorQuery);
            if (snapshot.exists()) {
                const data = snapshot.val();
                let tutorsArray = Object.keys(data).map(key => ({ ...data[key], id: key }));

                // Apply filters in memory (client-side)
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

                setTutors(tutorsArray);  // Set the tutors state to the filtered data
            } else {
                setTutors([]);  // If no tutors match the filters, show an empty list
            }
        } catch (error) {
            console.error("Error fetching tutors:", error);
        }
    };

    useEffect(() => {
        fetchTutors(); // Trigger fetch every time filters change
    }, [filters]);

    const toggleMenu = (index) => {
        setOpenIndex((prevIndex) => (prevIndex === index ? null : index));
    };

    const closeDropdown = () => {
        setOpenIndex(null);
    };

    const selectFilter = (category, value) => {
        setFilters((prev) => ({ ...prev, [category.toLowerCase()]: value }));
        setSelectedCategory(category); // Set the selected category
        closeDropdown(); // Close the dropdown after selection
    };

    const resetFilters = () => {
        setFilters({ day: '', time: '', subject: '', price: '', rating: '' });
        setSelectedCategory(null); // Reset selected category
        fetchTutors();  // Fetch all tutors when reset
    };

    return (
        <div className={styles.tutorBody}>
            <div className={styles['filter-tutor-content']}>
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

export default FilterTutor;
