const stripe = require("stripe")("sk_test_4eC39HqLyjWDarjtT1zdp7dc");
const express = require("express");
const router = express.Router();

router.get("/", async (req, res) => {
    res.status(200).json({charge: "Up"});
});

router.post("/payment", async (req, res) => {
   const charge = req.body
   const invoice = req.invoice
   console.log(invoice)
   try {
   //   let {status} = await stripe.charges.create({
   //     amount: charge.amount,
   //     currency: "usd",
   //     description: `${charge.invoice}`,
   //     source: charge.id
   //   });
 
     res.json({status});
   } catch (err) {
      // console.log(err.stack)
     res.status(500).end();
   }
 });

module.exports = router;