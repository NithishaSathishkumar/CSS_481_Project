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

function BookingPage() {

    const [date, setDate] = useState(new Date());

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
                            </div>
                            <div className="col-6">
                                <h3>{date.toDateString()}</h3>
                                <div className="time-list">
                                    <div className="time-slot">09:00 AM</div>
                                    <div className="time-slot">10:00 AM</div>
                                    <div className="time-slot">11:00 AM</div>
                                    <div className="time-slot">12:00 PM</div>
                                    <div className="time-slot">01:00 PM</div>
                                    <div className="time-slot">02:00 PM</div>
                                    <div className="time-slot">03:00 PM</div>
                                    <div className="time-slot">04:00 PM</div>

                                </div>
                                <button className="btn-confirm">CONFIRM</button>
                                <img className="chat" src={chat}></img>
                            </div>
                        </div>
                    </div>
                </div>

            </div>
        </div>
    )
}

export default BookingPage
