import { CardElement, useElements, useStripe } from "@stripe/react-stripe-js";
import React from "react";
import { useState } from "react";
import SubscriptionCard from "./SubscriptionCard";

const CheckoutForm = () => {
  const [name, setName] = useState("");
  const [address, setAddress] = useState("");
  const [city, setCity] = useState("");
  const [state, setState] = useState("");
  const [zipcode, setZipcode] = useState("");

  const stripe = useStripe();
  const elements = useElements();

  // function for subscription
  const createSubscription = async () => {
    try {
      //   creating a paymet method
      const paymentMethod = await stripe.createPaymentMethod({
        type: "card",
        card: elements.getElement("card"),
      });
      const response = await fetch("/api/create-subscription", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          name,
          address,
          city,
          state,
          zipcode,
          paymentMethod: paymentMethod.paymentMethod.id,
        }),
      });
      if (!response.ok) return alert("Payment Unsuccessfull!...");
      const data = await response.json();
      const confirm = await stripe.confirmCardPayment(data.clientSecret);
      if (confirm.error) return alert("Payment Unsuccessfull!...");
      alert("Payment Successfull ! Subscription Active...");
    } catch (err) {
      console.log(err);
      alert("Payment Failed" + err.message);
    }
  };
  const handleSubmit = (e) => {
    e.preventDefault();
  };
  const cardOptions = {
    iconStyle: "solid",
    style: {
      base: {
        iconColor: "#1890ff",
        color: "rgba(0, 0, 0, 0.65)",
        fontWeight: 500,
        fontFamily: "Segoe UI, Roboto, Open Sans, , sans-serif",
        fontSize: "15px",
        fontSmoothing: "antialiased",
        ":-webkit-autofill": { color: "#fce883" },
        "::placeholder": { color: "#bfbfbf" },
      },
      invalid: {
        iconColor: "#ffc7ee",
        color: "#ffc7ee",
      },
    },
  };
  return (
    <>
      <div className="container">
        <div className="d-flex m-3">
        <div className="col-md-8">
        <form onSubmit={handleSubmit}>
          <div className="form-row">
            <div className="form-group col-md-12">
              <label htmlFor="name">Name On Card</label>
              <input
                type="text"
                className="form-control"
                id="name"
                value={name}
                onChange={(e) => setName(e.target.value)}
              />
            </div>
          </div>
          <div className="form-group">
            <label htmlFor="address">Address</label>
            <input
              type="text"
              className="form-control"
              id="address"
              placeholder="1234 Main St"
              value={address}
              onChange={(e) => setAddress(e.target.value)}
            />
          </div>
          <div className="form-row">
            <div className="form-group col-md-6">
              <label htmlFor="city">City</label>
              <input
                type="text"
                className="form-control"
                id="city"
                value={city}
                onChange={(e) => setCity(e.target.value)}
              />
            </div>
            <div className="form-group col-md-6">
              <label htmlFor="state">State</label>
              <input
                type="text"
                className="form-control"
                id="state"
                value={state}
                onChange={(e) => setState(e.target.value)}
              />
            </div>
            <div className="form-group col-md-2">
              <label htmlFor="zipcode">Zip</label>
              <input
                type="text"
                className="form-control"
                id="zipcode"
                value={zipcode}
                onChange={(e) => setZipcode(e.target.value)}
              />
            </div>
          </div>
          <div className="form-group">
            <CardElement options={cardOptions} />
          </div>
          <button onClick={createSubscription} type="submit" className="btn btn-primary">
           Subscription
          </button>
        </form>
      </div>
      <SubscriptionCard />
      </div>
      </div>
    </>
  );
};

export default CheckoutForm;
