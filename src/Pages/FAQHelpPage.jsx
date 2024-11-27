import '../Styling/FAQHelpPage.css';
import React, { useState } from 'react';
import backButton from '../assets/ReturnArrow.png';
import { Link } from 'react-router-dom';  // import Link

function FAQHelpPage() {
    // State to track which question is active
    const [activeQuestion, setActiveQuestion] = useState(null);

    // Toggle function for expanding/collapsing answers
    const toggleQuestion = (index) => {
        setActiveQuestion(activeQuestion === index ? null : index);
    };

    // FAQ questions and answers
    const questions = [
        {
            question: "What is MentorMe?",
            answer: "MentorMe is an online tutoring platform designed to provide personalized academic support for students of all levels. We connect learners with skilled tutors who help them meet their unique academic goals."
        },
        {
            question: "How does MentorMe work?",
            answer: "MentorMe connects students with tutors who fit their learning preferences and academic needs through our easy-to-use platform."
        },
        {
            question: "Who are the tutors on MentorMe?",
            answer: "Our tutors are highly qualified professionals with expertise in various academic fields and a passion for teaching."
        },
        {
            question: "What subjects does MentorMe cover?",
            answer: "MentorMe offers tutoring for a wide range of subjects, including math, science, languages, and more."
        },
        {
            question: "How much does it cost to use MentorMe?",
            answer: "The cost varies based on the tutor and session length. You can view pricing details when selecting a tutor."
        },
        {
            question: "Are sessions conducted online or in person?",
            answer: "Sessions are primarily conducted online via video calls for convenience and accessibility."
        },
        {
            question: "How can I find the right tutor for my needs?",
            answer: "You can browse tutor profiles, view reviews, and filter by subject, availability, and experience."
        },
        {
            question: "How do I pay for my tutoring sessions?",
            answer: "You can pay securely through our platform using credit/debit cards or other supported payment methods."
        }
    ];

    return (
        <div className="faq-container">
            <h2 className="head">Frequently Asked Questions</h2>
            <div className="faq-list">
                {questions.map((item, index) => (
                    <div key={index} className="faq-item">
                        <div
                            className={`faq-question ${activeQuestion === index ? 'active' : ''}`}
                            onClick={() => toggleQuestion(index)}
                        >
                            {item.question}
                            <span>{activeQuestion === index ? '▲' : '▼'}</span>
                        </div>
                        {activeQuestion === index && (
                            <div className="faq-answer">{item.answer}</div>
                        )}
                    </div>
                ))}
            </div>
            <Link to="/booking">
                <button className="backButton"><img src={backButton} alt="Back" /></button>
            </Link>

        </div>
    );
}

export default FAQHelpPage;
