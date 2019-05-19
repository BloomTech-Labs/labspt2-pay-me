const stripe = require("stripe")("sk_test_9dafEw2WuPPbvN9wu3xovRRD00jcAlw6SQ");
const express = require("express");
const router = express.Router();


//const invoice = require(".../data/helpers/invoiceHelper.js");

router.get("/", async (req, res) => {
    res.status(200).json({charge: "Up"});
});


// === Unlimited Subscription rout === //
router.post("/subscription", async (req, res) => {
  console.log(req.body);
  let error;
  let status;

  try {
    const { token } = req.body;
    //Create customer in Stripe
    const customer = await stripe.customers.create({
      email: token.email,
      source: token.id
    });

    const {id} = customer;

    // Create a subscription in Stripe
    const subscriptions = await stripe.subscriptions.create({
      customer: id,
      plan: 'plan_F554OMLwBjaSkF'
    });
  } catch (error) {
    console.error("Error:", error);
    status = "failed"; // Status === failed if charge is unsuccessful
  }
  res.json({ error, status });
})

// === Single client route === //
router.post("/", async (req, res) => {
  console.log(req.body);
  let error;
  let status;

  try {
    const { token } = req.body;
    //Create customer in Stripe
    const customer = await stripe.customers.create({
      email: token.email,
      source: token.id
    });

    // Create a charge in Stripe
    const charge = await stripe.charges.create(
      {
        amount: 199, // Set payment amount to charge customer $1.99
        currency: "usd",
        customer: customer.id,
        receipt_email: token.email,
        description: "Payment for Single Client Plan",
        source: req.body.id,
      });
    console.log("Charge:", { charge });
    status = "success"; // Status === success if charge is successful
  } catch (error) {
    console.error("Error:", error);
    status = "failed"; // Status === failed if charge is unsuccessful
  }
  res.json({ error, status });
});


// === Pay invoice route === //
router.post("/pay", async (req, res) => {
  console.log(req.body);
  let error;
  let status;

  try {
    const { invoice_number, amount, token } = req.body;
    //Create customer in Stripe
    const customer = await stripe.customers.create({
      email: token.email,
      source: token.id
    });

    // Create a charge in Stripe
    const charge = await stripe.charges.create(
      {
        amount: req.body.amount * 100, // Set payment amount to charge customer 
        currency: "usd",
        customer: customer.id,
        receipt_email: token.email,
        description: `Payment for invoice# ${req.body.invoice_number} from ${req.body.client_name}`,
        source: req.body.id,
      });
    console.log("Charge:", { charge });
    status = "success"; // Status === success if charge is successful
  } catch (error) {
    console.error("Error:", error);
    status = "failed"; // Status === failed if charge is unsuccessful
  }
  res.json({ error, status });
});

module.exports = router;