// server.js or routes/stripeWebhook.js
const express = require("express");
const stripe = require("stripe")(process.env.MY_STRIPE_KEY);
const Payment = require("../models/Payment");
const router = express.Router();

// Stripe webhook signing secret (get this from your Stripe dashboard)
const endpointSecret = process.env.WHS;

// Stripe requires the raw body for signature verification
router.post(
  "/webhook",
  express.raw({ type: "application/json" }),
  async (req, res) => {
    const sig = req.headers["stripe-signature"];
    let event;

    try {
      event = stripe.webhooks.constructEvent(req.body, sig, endpointSecret);
    } catch (err) {
      console.error("⚠️ Webhook signature verification failed:", err.message);
      return res.status(400).send(`Webhook Error: ${err.message}`);
    }

    // Handle the completed session
    if (event.type === "checkout.session.completed") {
      const session = event.data.object;

      try {
        // Fetch payment intent & method
        const paymentIntent = await stripe.paymentIntents.retrieve(
          session.payment_intent
        );
        const paymentMethod = await stripe.paymentMethods.retrieve(
          paymentIntent.payment_method
        );

        // Extract card details
        const cardInfo = {
          brand: paymentMethod.card.brand,
          last4: paymentMethod.card.last4,
          exp_month: paymentMethod.card.exp_month,
          exp_year: paymentMethod.card.exp_year,
        };

        // Update the payment in your DB
        await Payment.findOneAndUpdate(
          { sessionId: session.id },
          {
            status: "completed",
            customerEmail: session.customer_email,
            card: cardInfo,
          }
        );

        console.log("✅ Payment updated with card info:", cardInfo);
      } catch (err) {
        console.error("❌ Failed to update payment:", err);
        return res.status(500).send("Server error");
      }
    }

    res.json({ received: true });
  }
);

module.exports = router;
