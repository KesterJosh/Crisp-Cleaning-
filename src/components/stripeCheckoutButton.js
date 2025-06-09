import React from 'react';
import "../views/transaction.css"
import { loadStripe } from '@stripe/stripe-js';

const stripePromise = loadStripe('your-publishable-key-here');

const stripeCheckoutButton = ({ price }) => {
  const handleClick = async () => {
    const stripe = await stripePromise;

    const response = await fetch('/create-checkout-session', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ amount: price * 100 }),
    });

    const session = await response.json();
    const result = await stripe.redirectToCheckout({
      sessionId: session.id,
    });

    if (result.error) {
      alert(result.error.message);
    }
  };

  return (
    <span className="transaction-text44" onClick={handleClick}>
      Update Payment Method
    </span>
  );
};

export default stripeCheckoutButton;
