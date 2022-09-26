import React from "react";
import { useState } from "react";
import { CardElement, useElements, useStripe } from "@stripe/react-stripe-js";

const SubscribeForm = () => {
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const stripe = useStripe();
    const elements = useElements();

    // function for subscription
  const createSubscription = async () => {
    try {
    //   creating a paymet method
    const paymentMethod = await stripe.createPaymentMethod({
        type : 'card',
        card : elements.getElement('card'),
    });
    const response = await fetch('/api/subscribe', {
        method : 'POST',
        headers : {
            "Content-Type" : "application/json",
        },
        body : JSON.stringify({
            name, 
            email,
            paymentMethod : paymentMethod.paymentMethod.id
        })
    });
    if(!response.ok) return alert('Payment Unsuccessfull!...');
    const data = await response.json();
    const confirm = await stripe.confirmCardPayment(data.clientSecret);
    if(confirm.error) return alert('Payment Unsuccessfull!...');
    alert('Payment Successfull ! Subscription Active...');
    } catch (err) {
      console.log(err);
      alert('Payment Failed' + err.message);
    }
  }

  const handleSubmit = (e) => {
    e.preventDefault();
  }

  return (
    <>
    <div className="container">
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label htmlFor="name">Name</label>
          <input
            type="text"
            className="form-control"
            id="name"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
        </div>
        <div className="form-group">
          <label htmlFor="email">Email</label>
          <input
            type="text"
            className="form-control"
            id="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </div>
        <CardElement />
        <button onClick={createSubscription} className="btn btn-primary">
          Subscribe
        </button>
      </form>
      </div>
    </>
  );
};

export default SubscribeForm;
