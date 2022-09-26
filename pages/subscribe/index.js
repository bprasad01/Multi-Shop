import { Elements } from '@stripe/react-stripe-js'
import { loadStripe } from '@stripe/stripe-js'
import React from 'react'
import CheckoutForm from '../../components/Common/CheckoutForm';
import SubscribeForm from '../../components/Common/SubscribeForm'

const stripePromise = loadStripe(process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY);
const Subscribe = () => {
  return (
    <>
      <Elements stripe={stripePromise}>
        {/* <SubscribeForm /> */}
        <CheckoutForm />
        </Elements>
    </>
  )
}

export default Subscribe