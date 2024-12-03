import { useState, useEffect } from 'react';
import '../Styling/BookingPage.css';
import tutor from '../assets/16.png';
import clock from '../assets/17.png';
import money from '../assets/18.png';
import inperson from '../assets/inperson.png';
import chat from '../assets/chat.png';
import globe from '../assets/globe.png';
import Calendar from 'react-calendar';
import 'react-calendar/dist/Calendar.css';
import { Link, useParams } from 'react-router-dom';  // import Link
import { getDatabase, ref, get } from 'firebase/database';

function BookingPage() {
    const { tutorId } = useParams();
    const db = getDatabase();

    const [date, setDate] = useState(new Date());// react help use to set date as selected date when we recall on change
    const [selectedTime, setSelectedTime] = useState(null); // the current selected time
    const [timeSlots, setTimeSlots] = useState([]);

    const morningSlots = [
        "09:00 AM",
        "10:00 AM",
        "11:00 AM",



    ];
    const afternoonSlots = [

        "12:00 PM",
        "01:00 PM",
        "02:00 PM",
        "03:00 PM",
        "04:00 PM",
        "05:00 PM",

    ];
    const eveningSlots = [

        "06:00 PM",
        "07:00 PM",

    ];
    const allDaySlots = morningSlots.concat(afternoonSlots).concat(eveningSlots);


    const handleTimeClick = (time) => {
        if (selectedTime === time) {
            setSelectedTime(null);
        } else {
            setSelectedTime(time);
        }


    };

    const [data, setData] = useState(null);

    const fetchData = async (recordId) => {
        try {
            const recordRef = ref(db, `tutors/${recordId}`);
            const snapshot = await get(recordRef);

            if (snapshot.exists()) {
                return snapshot.val();
            } else {
                console.log('No data available');
                return null;
            }
        } catch (err) {
            return null;
        } finally {
        }
    };




    fetchData(tutorId).then(
        (data) => {
            setData(data);
            if (data.availableTime === "morning")
                setTimeSlots(morningSlots);
            else if (data.availableTime === "afternoon")
                setTimeSlots(afternoonSlots);
            else if (data.availableTime === "evening")
                setTimeSlots(eveningSlots);
            else
                setTimeSlots(allDaySlots);
        }
    )

    return (
        <div className="container booking-container">
            <div className="row">
                <div className="col-4 left-part" >
                    {data != null ?
                        (<div className="left-content">
                            <img id="tutor-img" src={data.photo} alt="tutor" />
                            <div>
                                <button className="tutor-name">{data.username}</button>
                            </div>
                            <div className="course mt-5">{data.primarySubject}</div>

                            <div className="clock-money">
                                <div>
                                    <img className="icon" src={clock} alt="clock" />{data.availableTime}
                                </div>
                                <div>
                                    <img className="icon" src={money} alt="money" />{data.price}
                                </div>
                            </div>

                        </div>)

                        : (<></>)
                    }

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
                                <Link to="/faq">
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