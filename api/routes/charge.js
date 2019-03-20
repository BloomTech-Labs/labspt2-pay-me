const stripe = require("stripe")
const express = require("express");
const router = express.Router();

router.get("/", async (req, res) => {
    res.status(200).json({charge: "Up"});
});

router.post("/payment", async (req, res) => {
   console.log(`/n/n/n/n${stripe}/n/n/n/n`)
   console.log(stripe.charges)
   try {
     let {status} = await stripe.charges.create({
       amount: 2000,
       currency: "usd",
       description: "An example charge",
       source: req.body
     });
 
     res.json({status});
   } catch (err) {
      // console.log(err)
     res.status(500).end();
   }
 });

module.exports = router;