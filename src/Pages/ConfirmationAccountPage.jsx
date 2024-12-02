import '../Styling/ConfirmationPage.css';
import balloon from '../assets/15.png';
import celebrationCorn from '../assets/13.png';
import { Link, useLocation } from 'react-router-dom';  // import Link

function ConfirmationAccountPage() {
    const location = useLocation();
    const { date, time } = location.state || {}; // Destructure state to get date and time

    return (
        <div className="container confirmation-container">
            <div className="row">
                <div className="col-3 left-part"> <img className="balloon-left" src={balloon} ></img>
                    <img className="celebration-left" src={celebrationCorn} ></img>

                </div>
                <div className="col-6 mid-part">
                    <h2>Thank you for creating a new account!</h2>

                    <Link to="/about">
                        <button className="button-cancle">Go to Home Page</button>
                    </Link>

                </div>
                <div className="col-3 right-part"><img className="balloon-right" src={balloon} ></img>
                    <img className="celebration-right" src={celebrationCorn} ></img>
                </div>
            </div>
        </div>
    )
}

export default ConfirmationAccountPage