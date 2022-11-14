import React from 'react'
import { Elements } from '@stripe/react-stripe-js'
import { loadStripe } from '@stripe/stripe-js'
import StripeCheckoutForm from '../components/Stripe/StripeCheckoutForm'

const StripeCheckoutPage = () => {
    const stripePromise = loadStripe(process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY);
  return (
    <>
        <Elements stripe={stripePromise}>
            <StripeCheckoutForm />
        </Elements>
    </>
  )
}

export default StripeCheckoutPage