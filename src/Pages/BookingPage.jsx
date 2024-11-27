import { useState } from 'react';
import '../Styling/BookingPage.css';
import tutor from '../assets/16.png';
import clock from '../assets/17.png';
import money from '../assets/18.png';
import inperson from '../assets/inperson.png';
import chat from '../assets/chat.png';
import globe from '../assets/globe.png';
import Calendar from 'react-calendar';
import 'react-calendar/dist/Calendar.css';
import { Link } from 'react-router-dom';  // import Link

function BookingPage() {

    const [date, setDate] = useState(new Date());// react help use to set date as selected date when we recall on change
    const [selectedTime, setSelectedTime] = useState(null); // the current selected time

    const timeSlots = [
        "09:00 AM",
        "10:00 AM",
        "11:00 AM",
        "12:00 PM",
        "01:00 PM",
        "02:00 PM",
        "03:00 PM",
        "04:00 PM",
    ];

    const handleTimeClick = (time) => {
        if (selectedTime === time) {
            setSelectedTime(null);
        } else {
            setSelectedTime(time);
        }


    };
    return (
        <div className="container booking-container">
            <div className="row">
                <div className="col-4 left-part" >
                    <div className="left-content">
                        <img id="tutor-img" src={tutor} alt="tutor" />
                        <div>
                            <button className="tutor-name">Tutor-A</button>
                        </div>
                        <div className="course mt-5">Tutoring-Physics</div>

                        <div className="clock-money">
                            <div>
                                <img className="icon" src={clock} alt="clock" />30 minutes
                            </div>
                            <div>
                                <img className="icon" src={money} alt="money" />Free
                            </div>
                        </div>

                    </div>
                </div>
                <div className="col-8 right-part" >
                    <div className="right-content">
                        <div className="text-start mb-4"><img className="icon" src={inperson} ></img>
                            <select className="inperson-select">
                                <option>In-Person</option>
                                <option>Online</option>
                            </select>

                        </div>
                        <div className="row">
                            <div className="col-6">
                                <h3>Select a date and time</h3>
                                <div className="calendar-wrapper">
                                    <Calendar onChange={setDate} value={date} />

                                </div>
                                <div className="time-zone">
                                    <h4>Time Zone</h4>
                                    <select>
                                        <option>America/New_york(EDT)</option>
                                        <option>Pacific Time (PT)</option>
                                    </select>
                                </div>
                                <Link to="/questions">
                                    <button className="help">FAQ/Help</button>
                                </Link>
                            </div>
                            <div className="col-6">
                                <h3>{date.toDateString()}</h3>
                                <div className="time-list">
                                    {timeSlots.map((time) => (
                                        <button
                                            key={time}
                                            className={`time-slot ${selectedTime === time ? "selected" : ""}`}
                                            onClick={() => handleTimeClick(time)}
                                            disabled={selectedTime && selectedTime != time} // disable other time slots
                                        >
                                            {time}
                                        </button>
                                    ))}
                                </div>
                                <Link
                                    to="/confirmation"
                                    state={{ date: date.toDateString(), time: selectedTime }}
                                >
                                    <button className="btn-confirm" disabled={!selectedTime}>
                                        CONFIRM
                                    </button>
                                </Link>
                                <img className="chat" src={chat}></img>
                            </div >
                        </div >
                    </div >
                </div >

            </div >
        </div >
    )
}

export default BookingPage;
