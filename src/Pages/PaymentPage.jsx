import React, { useEffect } from "react";
import '../Styling/paymentpage.css';


const PaymentPortal = () => {
  useEffect(() => {
    const googlePayButtonContainer = document.getElementById(
        "google-pay-button-container"
      );
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
            totalPrice: "100.00",
            currencyCode: "USD",
          },
          merchantInfo: {
            merchantName: "Example Merchant",
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
              })
              .catch((err) => {
                console.error("Google Pay Error: ", err);
              });
          },
        });
  
        googlePayButtonContainer.innerHTML = "";
        googlePayButtonContainer.appendChild(button);
      };
  
      loadGooglePay();

  }, []);

    const usStates = [
        'Alabama', 'Alaska', 'Arizona', 'Arkansas', 'California', 'Colorado', 'Connecticut', 'Delaware', 
        'Florida', 'Georgia', 'Hawaii', 'Idaho', 'Illinois', 'Indiana', 'Iowa', 'Kansas', 'Kentucky', 
        'Louisiana', 'Maine', 'Maryland', 'Massachusetts', 'Michigan', 'Minnesota', 'Mississippi', 
        'Missouri', 'Montana', 'Nebraska', 'Nevada', 'New Hampshire', 'New Jersey', 'New Mexico', 'New York', 
        'North Carolina', 'North Dakota', 'Ohio', 'Oklahoma', 'Oregon', 'Pennsylvania', 'Rhode Island', 
        'South Carolina', 'South Dakota', 'Tennessee', 'Texas', 'Utah', 'Vermont', 'Virginia', 'Washington', 
        'West Virginia', 'Wisconsin', 'Wyoming'
    ];


return (
    <div className="paymentPage-main-content">
        <div className="paymentPage-payment-header">
            <h1>Payment Portal</h1>
        </div>
        <div className="paymentPage-payment-body">
            <div className="paymentPage-payment-body-left">
                <form className="paymentPage-payment-form" action="payment.php" method="post">
                    <p className="paymentPage-section-title">Card Info</p>
                    <div className="paymentPage-form-row">
                        <div className="paymentPage-form-group">
                            <label htmlFor="card-number">Card Number</label>
                            <input
                                type="text"
                                id="card-number"
                                name="card-number"
                                placeholder="1234 5678 9101 1121"
                                required
                            />
                        </div>
                        <div className="paymentPage-form-group">
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
                    <div className="paymentPage-form-row">
                        <div className="paymentPage-form-group">
                            <label htmlFor="card-name">Name on Card</label>
                            <input
                                type="text"
                                id="card-name"
                                name="card-name"
                                placeholder="John Doe"
                                required
                            />
                        </div>
                        <div className="paymentPage-form-group">
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
                                required
                            />
                        </div>
                        <div className="paymentPage-form-group">
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
                    <div className="paymentPage-form-row">
                        <div className="paymentPage-form-group">
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
                        <div className="paymentPage-form-group">
                            <label htmlFor="state">State</label>
                            <select className="paymentPage-state" id="state" name="state" required>
                                <option value="" disabled>
                                    Select State
                                </option>
                                {usStates.map((state) => (
                                    <option key={state} value={state}>
                                        {state}
                                    </option>
                                ))}
                            </select>
                        </div>
                    </div>
                    <input
                        className="paymentPage-payment-submit"
                        type="submit"
                        value="Complete Purchase"
                    />
                </form>
            </div>
            <div className="paymentPage-payment-body-right">
                <div className="paymentPage-payment-total">
                    <h2>Order Summary</h2>
                    <div className="paymentPage-payment-total-items">
                        <ul>
                            <li>30-minute tutor session: $35.00</li>
                            <li>30-minute follow-up session: $35.00</li>
                            <li>1-hour tutor session: $30.00</li>
                        </ul>
                    </div>
                    <div className="paymentPage-payment-total-price">
                        <p>
                            <strong>Total: $100.00</strong>
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

