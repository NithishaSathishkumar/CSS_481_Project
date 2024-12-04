// PaymentPortal.jsx

import React, { useEffect, useState } from "react";
import { useParams, useLocation, useNavigate, Navigate } from "react-router-dom";
import '../Styling/paymentpage.css';
import { getDatabase, ref, get } from 'firebase/database';
import { Link } from 'react-router-dom';

const PaymentPortal = () => {
  const { tutorId } = useParams();
  const location = useLocation();
  const db = getDatabase();
  const navigate = useNavigate();

  const [tutorData, setTutorData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [totalPrice, setTotalPrice] = useState(0);
  const [sessionType, setSessionType] = useState("30-minute meeting");

  // Form state
  const [cardNumber, setCardNumber] = useState("");
  const [expiryDate, setExpiryDate] = useState("");
  const [cardName, setCardName] = useState("");
  const [cvv, setCvv] = useState("");
  const [address, setAddress] = useState("");
  const [city, setCity] = useState("");
  const [zipCode, setZipCode] = useState("");
  const [stateValue, setStateValue] = useState("");

  // Error state
  const [errors, setErrors] = useState({});

  // Fetch tutor data from Firebase
  useEffect(() => {
    const fetchTutorData = async () => {
      try {
        const tutorRef = ref(db, `tutors/${tutorId}`);
        const snapshot = await get(tutorRef);
        if (snapshot.exists()) {
          setTutorData(snapshot.val());
        } else {
          console.log('No tutor data available');
        }
      } catch (error) {
        console.error('Error fetching tutor data:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchTutorData();
  }, [db, tutorId]);

  // Calculate total price based on session type and tutor's price
  useEffect(() => {
    if (tutorData) {
      let pricePerHour = parseFloat(tutorData.exactPrice) || 0;

      // Define session durations and multipliers
      const sessionDetails = {
        "30-minute meeting": pricePerHour / 2,
        "1-hour meeting": pricePerHour,
        // Add more session types if needed
      };

      const calculatedPrice = sessionDetails[sessionType] || 0;
      setTotalPrice(calculatedPrice.toFixed(2));
    }
  }, [tutorData, sessionType]);

  // Google Pay Integration (unchanged)
  useEffect(() => {
    if (!tutorData) return;

    const googlePayButtonContainer = document.getElementById("google-pay-button-container");
    let scriptLoaded = false;

    const loadGooglePay = () => {
      if (
        window.google &&
        window.google.payments &&
        window.google.payments.api
      ) {
        initializeGooglePay();
      } else if (!scriptLoaded) {
        scriptLoaded = true;
        const script = document.createElement("script");
        script.src = "https://pay.google.com/gp/p/js/pay.js";
        script.async = true;
        script.onload = initializeGooglePay;
        document.body.appendChild(script);
      }
    };

    const initializeGooglePay = () => {
      if (!window.google || !window.google.payments) {
        console.error("Google Pay SDK failed to load.");
        return;
      }

      const googlePayClient = new window.google.payments.api.PaymentsClient({
        environment: "TEST",
      });

      const allowedPaymentMethods = [
        {
          type: "CARD",
          parameters: {
            allowedAuthMethods: ["PAN_ONLY", "CRYPTOGRAM_3DS"],
            allowedCardNetworks: ["VISA", "MASTERCARD"],
          },
          tokenizationSpecification: {
            type: "PAYMENT_GATEWAY",
            parameters: {
              gateway: "example",
              gatewayMerchantId: "exampleGatewayMerchantId",
            },
          },
        },
      ];

      const paymentDataRequest = {
        apiVersion: 2,
        apiVersionMinor: 0,
        allowedPaymentMethods,
        transactionInfo: {
          totalPriceStatus: "FINAL",
          totalPrice: totalPrice.toString(),
          currencyCode: "USD",
        },
        merchantInfo: {
          merchantName: "MentorMe",
        },
      };

      const button = googlePayClient.createButton({
        buttonColor: "default",
        buttonType: "buy",
        buttonSizeMode: "static",
        onClick: () => {
          googlePayClient
            .loadPaymentData(paymentDataRequest)
            .then((paymentData) => {
                
              console.log("Payment successful!", paymentData);
              
              navigate("/confirmation");
              // Handle successful payment here (e.g., navigate to confirmation page)
            })
            .catch((err) => {
              console.error("Google Pay Error: ", err);
              // Handle payment errors here
            });
        },
      });

      googlePayButtonContainer.innerHTML = "";
      googlePayButtonContainer.appendChild(button);
    };

    loadGooglePay();
  }, [tutorData, totalPrice]);

  // Validation functions
  const validateCardNumber = (number) => {
    const cleaned = number.replace(/\s+/g, '');
    const isValid = /^\d{16}$/.test(cleaned);
    return isValid;
  };

  const validateExpiryDate = (date) => {
    if (!/^\d{2}\/\d{2}$/.test(date)) return false;
    const [month, year] = date.split('/').map(Number);
    if (month < 1 || month > 12) return false;
    const currentYear = new Date().getFullYear() % 100; // Get last two digits
    const currentMonth = new Date().getMonth() + 1;
    if (year < currentYear || (year === currentYear && month < currentMonth)) {
      return false;
    }
    return true;
  };

  const validateCvv = (cvv) => {
    return /^\d{3,4}$/.test(cvv);
  };
  

  const validateZipCode = (zip) => {
    return /^\d{5}$/.test(zip);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    let formErrors = {};

    if (!validateCardNumber(cardNumber)) {
      formErrors.cardNumber = "Card number must be 16 digits.";
    }

    if (!validateExpiryDate(expiryDate)) {
      formErrors.expiryDate = "Expiry date must be in MM/YY format and valid.";
    }

    if (!validateCvv(cvv)) {
      formErrors.cvv = "CVV must be 3 or 4 digits.";
    }

    if (!validateZipCode(zipCode)) {
      formErrors.zipCode = "Zip Code must be 5 digits.";
    }

    if (!cardName.trim()) {
      formErrors.cardName = "Name on card is required.";
    }

    if (!address.trim()) {
      formErrors.address = "Address is required.";
    }

    if (!city.trim()) {
      formErrors.city = "City is required.";
    }

    if (!stateValue) {
      formErrors.state = "State is required.";
    }

    setErrors(formErrors);

    if (Object.keys(formErrors).length === 0) {
      // All validations passed
      alert("Payment submitted! (Implement actual payment handling)");
      // Here you can handle the payment processing
    }
  };

  if (loading) {
    return <p>Loading payment information...</p>;
  }

  if (!tutorData) {
    return <p>Tutor data not available.</p>;
  }

  return (
    <div className="paymentPage-main-content">
      <div className="paymentPage-payment-header">
        <h1>Payment Portal</h1>
      </div>
      <div className="paymentPage-payment-body">
        <div className="paymentPage-payment-body-left">
          <form className="paymentPage-payment-form" onSubmit={handleSubmit}>
            <p className="paymentPage-section-title">Card Info</p>
            <div className="paymentPage-form-row">
              <div className="paymentPage-form-group">
                <label htmlFor="card-number">Card Number</label>
                <input
                  type="text"
                  id="card-number"
                  name="card-number"
                  placeholder="1234 5678 9101 1121"
                  value={cardNumber}
                  onChange={(e) => {
                    // Allow only digits and spaces
                    const value = e.target.value.replace(/[^\d\s]/g, '');
                    setCardNumber(value);
                  }}
                  maxLength="19" // 16 digits + 3 spaces
                  required
                />
                {errors.cardNumber && <span className="error">{errors.cardNumber}</span>}
              </div>
              <div className="paymentPage-form-group">
                <label htmlFor="expiry-date">Expiry Date</label>
                <input
                  type="text"
                  id="expiry-date"
                  name="expiry-date"
                  placeholder="MM/YY"
                  value={expiryDate}
                  onChange={(e) => {
                    let value = e.target.value.replace(/[^\d]/g, '');
                    if (value.length > 4) value = value.slice(0,4);
                    if (value.length > 2) {
                      value = `${value.slice(0,2)}/${value.slice(2)}`;
                    }
                    setExpiryDate(value);
                  }}
                  maxLength="5"
                  required
                />
                {errors.expiryDate && <span className="error">{errors.expiryDate}</span>}
              </div>
            </div>
            <div className="paymentPage-form-row">
              <div className="paymentPage-form-group">
                <label htmlFor="card-name">Name on Card</label>
                <input
                  type="text"
                  id="card-name"
                  name="card-name"
                  placeholder="John Doe"
                  value={cardName}
                  onChange={(e) => setCardName(e.target.value)}
                  required
                />
                {errors.cardName && <span className="error">{errors.cardName}</span>}
              </div>
              <div className="paymentPage-form-group">
                <label htmlFor="cvv">CVV</label>
                <input
                  type="password"
                  id="cvv"
                  name="cvv"
                  placeholder="123"
                  value={cvv}
                  onChange={(e) => {
                    const value = e.target.value.replace(/\D/g, '').slice(0,4);
                    setCvv(value);
                  }}
                  maxLength="4"
                  required
                />
                {errors.cvv && <span className="error">{errors.cvv}</span>}
              </div>
            </div>
            <p className="paymentPage-section-title">Billing Info</p>
            <div className="paymentPage-form-row">
              <div className="paymentPage-form-group">
                <label htmlFor="address">Address</label>
                <input
                  className="paymentPage-address"
                  type="text"
                  id="address"
                  name="address"
                  placeholder="1234 Elm St"
                  value={address}
                  onChange={(e) => setAddress(e.target.value)}
                  required
                />
                {errors.address && <span className="error">{errors.address}</span>}
              </div>
              <div className="paymentPage-form-group">
                <label htmlFor="city">City</label>
                <input
                  type="text"
                  id="city"
                  name="city"
                  placeholder="San Francisco"
                  value={city}
                  onChange={(e) => setCity(e.target.value)}
                  required
                />
                {errors.city && <span className="error">{errors.city}</span>}
              </div>
            </div>
            <div className="paymentPage-form-row">
              <div className="paymentPage-form-group">
                <label htmlFor="zipcode">Zip Code</label>
                <input
                  type="text"
                  id="zipcode"
                  name="zipcode"
                  placeholder="12345"
                  value={zipCode}
                  onChange={(e) => {
                    const value = e.target.value.replace(/\D/g, '').slice(0,5);
                    setZipCode(value);
                  }}
                  maxLength="5"
                  required
                />
                {errors.zipCode && <span className="error">{errors.zipCode}</span>}
              </div>
              <div className="paymentPage-form-group">
                <label htmlFor="state">State</label>
                <select
                  className="paymentPage-state"
                  id="state"
                  name="state"
                  value={stateValue}
                  onChange={(e) => setStateValue(e.target.value)}
                  required
                >
                  <option value="" disabled>
                    Select State
                  </option>
                  {[
                    'Alabama', 'Alaska', 'Arizona', 'Arkansas', 'California', 'Colorado', 'Connecticut', 'Delaware',
                    'Florida', 'Georgia', 'Hawaii', 'Idaho', 'Illinois', 'Indiana', 'Iowa', 'Kansas', 'Kentucky',
                    'Louisiana', 'Maine', 'Maryland', 'Massachusetts', 'Michigan', 'Minnesota', 'Mississippi',
                    'Missouri', 'Montana', 'Nebraska', 'Nevada', 'New Hampshire', 'New Jersey', 'New Mexico', 'New York',
                    'North Carolina', 'North Dakota', 'Ohio', 'Oklahoma', 'Oregon', 'Pennsylvania', 'Rhode Island',
                    'South Carolina', 'South Dakota', 'Tennessee', 'Texas', 'Utah', 'Vermont', 'Virginia', 'Washington',
                    'West Virginia', 'Wisconsin', 'Wyoming'
                  ].map((state) => (
                    <option key={state} value={state}>
                      {state}
                    </option>
                  ))}
                </select>
                {errors.state && <span className="error">{errors.state}</span>}
              </div>
            </div>
            <button
              type="submit"

              className="paymentPage-payment-submit"

              onClick={() => navigate("/confirmation")}
            >
              Complete Purchase
            </button>
          </form>
        </div>
        <div className="paymentPage-payment-body-right">
          <div className="paymentPage-payment-total">
            <h2>Order Summary</h2>
            <div className="paymentPage-payment-total-items">
              <ul>
                <li>{sessionType}: ${totalPrice}</li>
              </ul>
            </div>
            <div className="paymentPage-payment-total-price">
              <p>
                <strong>Total: ${totalPrice}</strong>
              </p>
            </div>
          </div>
          <div className="paymentPage-payment-express">
            <h2>Express Checkout</h2>
            <div className="paymentPage-payment-express-buttons">
              <div id="google-pay-button-container"></div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PaymentPortal;
