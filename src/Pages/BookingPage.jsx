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
import { Link, useParams } from 'react-router-dom';
import { getDatabase, ref, get } from 'firebase/database';

function BookingPage() {
    const { tutorId } = useParams();
    const db = getDatabase();

    const [date, setDate] = useState(new Date());
    const [selectedTime, setSelectedTime] = useState(null);
    const [timeSlots, setTimeSlots] = useState([]);
    const [data, setData] = useState(null);

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

    // Fetch data inside useEffect
    useEffect(() => {
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
                console.error('Error fetching data:', err);
                return null;
            }
        };

        fetchData(tutorId).then((fetchedData) => {
            if (fetchedData) {
                setData(fetchedData);

                // Set time slots based on available time
                if (fetchedData.availableTime === "Morning") {
                    setTimeSlots(morningSlots);
                } else if (fetchedData.availableTime === "Afternoon") {
                    setTimeSlots(afternoonSlots);
                } else if (fetchedData.availableTime === "Evening") {
                    setTimeSlots(eveningSlots);
                } else {
                    setTimeSlots(allDaySlots);
                }
            }
        });
    }, [tutorId]);

    // Implement tileDisabled function
    const tileDisabled = ({ date: tileDate, view }) => {
        if (view === 'month') {
            const dayOfWeek = tileDate.getDay(); // 0 (Sunday) to 6 (Saturday)
            const dayNames = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
            const dayName = dayNames[dayOfWeek];

            // If data is not loaded yet, disable all dates
            if (!data || !data.daysAvailable) {
                return true;
            }

            // Disable the date if it's not in daysAvailable
            return !data.daysAvailable.includes(dayName);
        }
        return false; // Dates are enabled by default
    };

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
                                <img className="BookingDetailsIcon" src={clock} alt="clock" />
                                {data.availableTime}
                            </div>

                            <div className="BookingDetailsItem">
                                <img className="BookingDetailsIcon" src={money} alt="money" /> ${data.exactPrice}/hr
                            </div>
                        </div>
                    </div>
                ) : (
                    <p>Loading tutor information...</p>
                )}

                <div className="BookingPageRightContent">
                    <div className="BookingPageMeetingOption">
                        <img className="BookingPersonIcon" src={inperson} alt="Meeting Option" />
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
                                        <Calendar
                                            onChange={setDate}
                                            value={date}
                                            tileDisabled={tileDisabled}
                                        />
                                    </div>

                                    <div className="BookingTimeZone">
                                        <h4>Time Zone</h4>
                                        <div className="BookingTimeCont">
                                            <select className="BookingTimeZoneSelect">
                                                <option>America/New_York (EDT)</option>
                                                <option>Pacific Time (PT)</option>
                                            </select>

                                            <Link to="/faq">
                                                <button className="BookingHelpButton">FAQ/Help?</button>
                                            </Link>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>

                        <div className="BookingPageRRContent">
                            <div className="BookingPageButtons">
                                <h3>{date.toDateString()}</h3>
                                <div className="BookingPageAvailableTimes">
                                    {timeSlots.map((time) => (
                                        <button
                                            key={time}
                                            className={`time-slot ${selectedTime === time ? "selected" : ""}`}
                                            onClick={() => handleTimeClick(time)}
                                            disabled={selectedTime && selectedTime !== time}
                                        >
                                            {time}
                                        </button>
                                    ))}
                                </div>
                            </div>

                            <div className="BookingConfirmButtonContainer">
                                {data?.exactPrice === "" ? (
                                    <Link to="/confirmation" state={{ date: date.toDateString(), time: selectedTime }}>
                                        <button className="BookingConfirmButton" disabled={!selectedTime}>Confirm</button>
                                    </Link>
                                ) : (
                                    <Link to={`/payment/${tutorId}`} state={{ date: date.toDateString(), time: selectedTime }}>
                                        <button className="BookingConfirmButton" disabled={!selectedTime}>Confirm</button>
                                    </Link>
                                )}
                            </div>

                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default BookingPage;
