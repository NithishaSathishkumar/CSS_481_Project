// PaymentPortal.js

import React, { useEffect, useRef } from 'react';
import '../Styling/PaymentPage.css'; // Adjust the path as necessary

const PaymentPortal = () => {
  const googlePayButtonContainerRef = useRef(null);
  const scriptLoadedRef = useRef(false); // To prevent multiple script loads

  useEffect(() => {
    const loadGooglePay = () => {
      if (
        window.google &&
        window.google.payments &&
        window.google.payments.api
      ) {
        initializeGooglePay();
      } else if (!scriptLoadedRef.current) {
        // Load the script only if it hasn't been loaded yet
        scriptLoadedRef.current = true;
        const script = document.createElement('script');
        script.src = 'https://pay.google.com/gp/p/js/pay.js';
        script.async = true;
        script.onload = initializeGooglePay;
        document.body.appendChild(script);
      }
    };

    const initializeGooglePay = () => {
      const googlePayClient = new window.google.payments.api.PaymentsClient({
        environment: 'TEST', // Change to 'PRODUCTION' when deploying live
      });

      // Define allowed payment methods
      const allowedPaymentMethods = [
        {
          type: 'CARD',
          parameters: {
            allowedAuthMethods: ['PAN_ONLY', 'CRYPTOGRAM_3DS'],
            allowedCardNetworks: ['VISA', 'MASTERCARD'],
          },
          tokenizationSpecification: {
            type: 'PAYMENT_GATEWAY',
            parameters: {
              gateway: 'example',
              gatewayMerchantId: 'exampleGatewayMerchantId',
            },
          },
        },
      ];

      // Payment Data Request
      const paymentDataRequest = {
        apiVersion: 2,
        apiVersionMinor: 0,
        allowedPaymentMethods: allowedPaymentMethods,
        transactionInfo: {
          totalPriceStatus: 'FINAL',
          totalPrice: '1.00', // Replace with your total price
          currencyCode: 'USD',
        },
        merchantInfo: {
          merchantName: 'Example Merchant',
          // A merchant ID is available after approval by Google
          // merchantId: '01234567890123456789',
        },
      };

      // Create a Google Pay button
      const button = googlePayClient.createButton({
        buttonColor: 'default',
        buttonType: 'buy',
        buttonSizeMode: 'static',
        onClick: () => {
          googlePayClient
            .loadPaymentData(paymentDataRequest)
            .then((paymentData) => {
              // Handle the response
              processPayment(paymentData);
            })
            .catch((err) => {
              // Show error in developer console for debugging
              console.error('Google Pay Error: ', err);
            });
        },
      });

      // Clear the container before appending the button
      if (googlePayButtonContainerRef.current) {
        googlePayButtonContainerRef.current.innerHTML = '';
        googlePayButtonContainerRef.current.appendChild(button);
      }
    };

    const processPayment = (paymentData) => {
      // Process payment data
      console.log('Payment successful!', paymentData);
      // Send paymentData to your server for processing
    };

    loadGooglePay();
  }, []);

  return (
    <>
      {/* Main Content Section */}
      <div className="main-content">
        <div className="payment-header">
          <h1>Payment Portal</h1>
        </div>
        <div className="payment-body">
          <div className="payment-body-left">
            {/* Payment Form */}
            <form className="payment-form" action="payment.php" method="post">
              <p className="section-title">Card Info</p>
              {/* Card Info Fields */}
              <div className="form-row">
                <div className="form-group">
                  <label htmlFor="card-number">Card Number</label>
                  <input
                    type="text"
                    id="card-number"
                    name="card-number"
                    placeholder="1234 5678 9101 1121"
                    required
                  />
                </div>
                <div className="form-group">
                  <label htmlFor="expiry-date">Expiry Date</label>
                  <input
                    type="text"
                    id="expiry-date"
                    name="expiry-date"
                    placeholder="MM/YY"
                    maxLength="5"
                    required
                  />
                </div>
              </div>
              <div className="form-row">
                <div className="form-group">
                  <label htmlFor="card-name">Name on Card</label>
                  <input
                    type="text"
                    id="card-name"
                    name="card-name"
                    placeholder="John Doe"
                    required
                  />
                </div>
                <div className="form-group">
                  <label htmlFor="cvv">CVV</label>
                  <input
                    type="password"
                    id="cvv"
                    name="cvv"
                    placeholder="123"
                    maxLength="3"
                    required
                  />
                </div>
              </div>
              <p className="section-title">Billing Info</p>
              {/* Billing Info Fields */}
              <div className="form-row">
                <div className="form-group">
                  <label htmlFor="address">Address</label>
                  <input
                    className="address"
                    type="text"
                    id="address"
                    name="address"
                    placeholder="1234 Elm St"
                    required
                  />
                </div>
                <div className="form-group">
                  <label htmlFor="city">City</label>
                  <input
                    type="text"
                    id="city"
                    name="city"
                    placeholder="San Francisco"
                    required
                  />
                </div>
              </div>
              <div className="form-row">
                <div className="form-group">
                  <label htmlFor="zipcode">Zip Code</label>
                  <input
                    type="text"
                    id="zipcode"
                    name="zipcode"
                    placeholder="12345"
                    maxLength="5"
                    required
                  />
                </div>
                <div className="form-group">
                  <label htmlFor="state">State</label>
                  <select id="state" name="state" required>
                    <option value="" disabled>
                      Select State
                    </option>
                    <option value="CA">California</option>
                    <option value="NY">New York</option>
                    <option value="TX">Texas</option>
                    <option value="WA">Washington</option>
                    {/* Add other states as needed */}
                  </select>
                </div>
              </div>
              <input
                className="payment-submit"
                type="submit"
                value="Complete Purchase"
              />
            </form>
          </div>
          <div className="payment-body-right">
            {/* Order Summary */}
            <div className="payment-total">
              <h2>Order Summary</h2>
              <div className="payment-total-items">
                <ul>
                  <li>30-minute tutor session: $35.00</li>
                  <li>30-minute follow-up session: $35.00</li>
                  <li>1-hour tutor session: $30.00</li>
                </ul>
              </div>
              <div className="payment-total-price">
                <p>
                  <strong>Total: $100.00</strong>
                </p>
              </div>
            </div>
            {/* Express Checkout */}
            <div className="payment-express">
              <h2>Express Checkout</h2>
              <div className="payment-express-buttons">
                {/* Google Pay button will be rendered here */}
                <div
                  id="google-pay-button-container"
                  ref={googlePayButtonContainerRef}
                ></div>
              </div>
              {/* Other payment methods can be added here */}
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default PaymentPortal;