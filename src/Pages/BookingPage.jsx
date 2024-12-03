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
        <div className="BookingConfirmationRootContainer">
            <div className="BookingConfirmationMainContent">
                {data != null ?
                    (<div className="BookingPageLeftContent">
                        <img id="BookingTutorPP" src={data.photo} alt="tutor"/>
                        <div>
                            <button className="BookingTutorsName">{data.username}</button>
                        </div>

                        <div className="BookingTutorsCourse">Tutoring: {data.primarySubject}</div>

                        <div className="BookingDetailsClockMoney">
                            <div className="BookingDetailsItem">
                                <img className="BookingDetailsIcon" src={clock} alt="clock" />{data.availableTime}
                            </div>

                            <div className="BookingDetailsItem">
                                <img className="BookingDetailsIcon" src={money} alt="money" /> ${data.exactPrice}/hr
                            </div>
                        </div>

                    </div>)

                    : (<></>)
                }

                <div className="BookingPageRightContent">
                    <div className="BookingPageMeetingOption">
                            <img className="BookingPersonIcon" src={inperson}></img>
                            <select className="OnlineInPersonSelect">
                                <option>In-Person</option>
                                <option>Online</option>
                            </select>
                    </div>

                    <div className="BookingPageRR">
                        <div className="BookingPageLRContent">
                            <div className="row">
                                <div className="col-6">
                                    <h3>Select a date and time</h3>

                                    <div className="BookingCalendar">
                                        <Calendar onChange={setDate} value={date} />
                                    </div>

                                    <div className="BookingTimeZone">
                                        <h4>Time Zone</h4>
                                        <div className="BookingTimeCont">
                                            <select className="BookingTimeZoneSelect">
                                                <option>America/New_york(EDT)</option>
                                                <option>Pacific Time (PT)</option>
                                            </select>

                                            <Link to="/faq">
                                                <button className="BookingHelpButton">FAQ/Help?</button>
                                            </Link>
                                        </div>
                                    </div>
                                </div>
                            </div >
                        </div >

                        <div className="BookingPageRRContent">
                            <div className="BookingPageButtons">
                                <h3>{date.toDateString()}</h3>
                                <div className="BookingPageAvailableTimes">
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
                            </div>

                            <div className="BookingConfirmButtonContainer">
                                <Link to="/confirmation" state={{ date: date.toDateString(), time: selectedTime }}>
                                        <button className="BookingConfirmButton" disabled={!selectedTime}>Confirm</button>
                                </Link>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default BookingPage;