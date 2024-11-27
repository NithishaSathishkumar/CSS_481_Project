
import '../Styling/ConfirmationPage.css';
import balloon from '../assets/15.png';
import celebrationCorn from '../assets/13.png';
import 'bootstrap/dist/css/bootstrap.min.css';


function ConfirmationPage() {


    return (

        <div className="container confirmation-container">
            <div className="row">
                <div className="col-3 left-part"> <img className="balloon-left" src={balloon} ></img>
                    <img className="celebration-left" src={celebrationCorn} ></img>

                </div>
                <div className="col-6 mid-part">
                    <h2>Your Booking was successful!</h2>
                    <h4>Thank You for Choosing Us!</h4>
                    <button className="button-cancle">Go to Home Page</button>

                </div>
                <div className="col-3 right-part"><img className="balloon-right" src={balloon} ></img>
                    <img className="celebration-right" src={celebrationCorn} ></img>


                </div>

            </div>


        </div>

    )
}

export default ConfirmationPage
