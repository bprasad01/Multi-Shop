import React from "react";
import { CardElement, useStripe, useElements } from "@stripe/react-stripe-js";
import axios from "axios";
import { useRouter } from "next/router";
import CARD_OPTIONS from "../constant/directory";
import { useState } from "react";

const StripeCheckoutForm = () => {
  const [isProcessing, setProcessing] = useState(false);
  const [checkoutError, setCheckoutError] = useState("");
  const router = useRouter();

  const stripe = useStripe();
  const elements = useElements();

  const handleCardDetailsChange = event => {
    event.error ? setCheckoutError(event.error.message) : setCheckoutError();
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if(!stripe || !elements){
        return;
    }

    const billingDetails = {
        name : 'Username',
        email : 'username@username.com',
        address : {
            city : 'Pune',
            line1 : 'Street 1',
            state : 'MH',
            postal_code : '890021'
        }
    };

    setProcessing(true);

    const cardElement = elements.getElement('card');
    const price = 10;

    try {
        const { data : clientSecret } = await axios.post('/api/stripe-payment-intent', {
            amount : price * 100,
        });

        const paymentMethodReq = await stripe.createPaymentMethod({
            type : "card",
            card : cardElement,
            billing_details : billingDetails
        });

        if(paymentMethodReq.error){
            setCheckoutError(paymentMethodReq.error.message);
            setProcessing(false);
            return;
        }

        const { error } = await stripe.confirmCardPayment(clientSecret, {
            payment_method : paymentMethodReq.paymentMethod.id,
        });

        if(error){
            setCheckoutError(error.message);
            setProcessing(false);
            return;
        }

        await router.push('/success')
    } catch (err) {
        setCheckoutError(err.message)
    }
  }
  return (
  <>
    <div className="stripe-form-container">
        <form onSubmit={handleSubmit} className="stripe-form w-308px lg:w-608px border px-4 lg:px-8 py-6 lg:py-10 m-auto">
            <h2 className="ext-white mb-6 uppercase font-600">Stripe Payment :- Pay With Card</h2>
            <div className="mb-4">
                <h6 className="text-sm mb-1 text-white">Card Information</h6>
                <CardElement options={CARD_OPTIONS} onChange={handleCardDetailsChange}/>
            </div>
            {checkoutError ? <div className="etxt-sm my-4 text-white">{checkoutError}</div> : ""}
            <button className="bg-pink-400 hover:bg-pink-300 text-white font-bold py-2 px-4" disabled={isProcessing || !stripe}>{isProcessing ? "Processing..." : `Pay $100`}</button>
        </form>
    </div>  
  </>
  );
};

export default StripeCheckoutForm;
