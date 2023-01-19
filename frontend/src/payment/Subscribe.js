import React,{Fragment} from 'react'
import "./Subscribe.css"
import {Link} from "react-router-dom"

const Subscribe = () => {
  return (
    <Fragment>
        <div className="subscribepage">
            <div className="subscribecontainer">
                <h3>WelCome</h3>
                <div className="subscribediv">
                    <p>Pro-Pack $299</p>
                    <p>Join Pro-Pack and get access  to all courses</p>
                    <p>$299 Only</p>
                    <Link to={`/subscribe/payment`}>Buy Now</Link>

                </div>
                <div className="subscribebottom">
                    <p>100% Refund at Cancellation</p>
                    <p>Terms And Condition Apply</p>
                </div>
            </div>
        </div>
    </Fragment>
  )
}

export default Subscribe;

// import React, { useState } from 'react';
// import { loadStripe } from '@stripe/stripe-js';
// import {
//   CardElement,
//   useStripe,
//   useElements,
// } from '@stripe/react-stripe-js';

// const CheckoutForm = () => {
//   const stripe = useStripe();
//   const elements = useElements();
//   const [error, setError] = useState(null);
//   const [subscription, setSubscription] = useState(null);

//   const handleSubmit = async (event) => {
//     event.preventDefault();

//     if (!stripe || !elements) {
//       // Stripe.js has not loaded yet. Make sure to disable
//       // form submission until Stripe.js has loaded.
//       return;
//     }

//     // Get a reference to a mounted CardElement. Elements knows how
//     // to find your CardElement because there can only ever be one of
//     // each type of element.
//     const cardElement = elements.getElement(CardElement);

//     const { error, subscription } = await stripe.createSubscription({
//       items: [{ plan: 'plan_123' }],
//       payment_method: {
//         card: cardElement,
//         billing_details: {
//           name: 'John Doe',
//         },
//       },
//     });

//     if (error) {
//       setError(error.message);
//     } else {
//       setSubscription(subscription);
//     }
//   };

//   return (
//     <form onSubmit={handleSubmit}>
//       <h2>Payment Information</h2>
//       <CardElement options={{ hidePostalCode: true }} />
//       <button type="submit" disabled={!stripe}>
//         Pay
//       </button>
//       {error && <p style={{ color: 'red' }}>{error}</p>}
//       {subscription && <p>Subscription created!</p>}
//     </form>
//   );
// };

// const stripePromise = loadStripe('pk_test_your_stripe_publishable_key');

// const App = () => {
//   return (
//     <StripeProvider stripe={stripePromise}>
//       <Elements>
//         <CheckoutForm />
//       </Elements>
//     </StripeProvider>
//   );
// };



// const stripe = require('stripe')('sk_test_your_stripe_secret_key');

// app.post('/subscription', async (req, res) => {
//   try {
//     const { paymentMethodId, plan } = req.body;

//     // Create the subscription
//     const subscription = await stripe.subscriptions.create({
//       customer: 'cus_your_customer_id',
//       items: [{ plan }],
//       payment_method: paymentMethodId,
//       expand: ['latest_invoice.payment_intent']
//     });

//     // If the card is declined, display an error message
//     if (subscription.latest_invoice.payment_intent.status === 'requires_payment_method') {
//       return res.status(402).send({ error: 'Your card was declined' });
//     }

//     res.send(subscription);
//   } catch (error) {
//     res.status(500).send({ error: error.message });
//   }
// });
