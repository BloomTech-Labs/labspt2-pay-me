const stripe = require("stripe")("sk_test_4eC39HqLyjWDarjtT1zdp7dc");
const express = require("express");
const router = express.Router();
// const invoice = require(".../data/helpers/invoiceHelper.js");

router.get("/", async (req, res) => {
    res.status(200).json({charge: "Up"});
});

// router.get("invoice", async (req, res) => {
//    const client_id = req.params;
//    const client_invoice = await invoice.findByClientId(client_id)
//    res.status(200).json({invoice: client_invoice});
// })

router.post("/payment", async (req, res) => {
   const charge = req.body
   try {
      //change to include value pulled from the database
     let {status} = await stripe.charges.create({
       amount: 500,
       currency: "usd",
       description: `Test charge`,
       source: charge
     });
 
     res.json({status});
   } catch (err) {
      // console.log(err.stack)
     res.status(500).end();
   }
 });

module.exports = router;