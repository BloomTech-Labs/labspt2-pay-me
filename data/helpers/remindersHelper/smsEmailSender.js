<<<<<<< HEAD

=======
require('dotenv').config();
<<<<<<< HEAD
<<<<<<< HEAD
<<<<<<< HEAD
>>>>>>> Basic config Reminders Timer
// yarn add nexmo  and then:
const Nexmo = require('nexmo');

=======
=======
>>>>>>> cleaning
// yarn add nexmo  and then:
const Nexmo = require('nexmo');

// yarn add @sendgrid/mail  and then:
const sgMail = require('@sendgrid/mail');


<<<<<<< HEAD
>>>>>>> cleaning
=======

// yarn add nexmo  and then:
const Nexmo = require('nexmo');
=======
>>>>>>> some changes on sms sender

>>>>>>> some changes on sms sender
=======
>>>>>>> cleaning
=======

// yarn add nexmo  and then:
const Nexmo = require('nexmo');


=======
=======
>>>>>>> cleaning

// yarn add nexmo  and then:
const Nexmo = require('nexmo');

<<<<<<< HEAD
>>>>>>> some changes on sms sender
=======
=======
// yarn add nexmo  and then:
const Nexmo = require('nexmo');

// yarn add @sendgrid/mail  and then:
const sgMail = require('@sendgrid/mail');


>>>>>>> cleaning
<<<<<<< HEAD
>>>>>>> cleaning
=======
=======

// yarn add nexmo  and then:
const Nexmo = require('nexmo');

>>>>>>> some changes on sms sender
>>>>>>> some changes on sms sender
 // **Nexmo SMS API Quickstart for Node.JS**
const smsHandler = (smsFromNumber, smstoNumber,smsText) =>{

/*To use this sample you will first need a Nexmo account. Once you have your own API credentials, 
create an .env file and set the values as required.*/

//  **** Pricing: PLAN used******

//Send a message to any number in United States : $0.0075 per message
//Receive a message from any number in United States : free
//$2 bonus for test

 // ## Configure with Your Nexmo API Keys
const nexmo = new Nexmo({
  apiKey:process.env.API_KEY_NEXMO_SMS,
  apiSecret:process.env.API_SECRET_NEXMO_SMS
})

//Send SMS via NEXMO 
console.log(smsFromNumber, smstoNumber, smsText);

// unable only if necessary**cost money**/
/*nexmo.message.sendSms(
 smsFromNumber, smstoNumber, smsText, {type: 'unicode'},
  (err, responseData) => {if (responseData) {console.log(responseData)}}
);*/
}

// **SENDGRID EMAIL API Quickstart for Node.JS**
const emailHandler = (to,from,subject,html) =>{

<<<<<<< HEAD
<<<<<<< HEAD
<<<<<<< HEAD

// yarn add @sendgrid/mail  and then:
const sgMail = require('@sendgrid/mail');

=======
>>>>>>> cleaning
=======
// yarn add @sendgrid/mail  and then:
const sgMail = require('@sendgrid/mail');

>>>>>>> some changes on sms sender
=======
>>>>>>> cleaning
=======
// yarn add @sendgrid/mail  and then:
const sgMail = require('@sendgrid/mail');


=======
// yarn add @sendgrid/mail  and then:
const sgMail = require('@sendgrid/mail');

>>>>>>> some changes on sms sender
=======
=======
>>>>>>> some changes on sms sender
// yarn add @sendgrid/mail  and then:
const sgMail = require('@sendgrid/mail');

=======
>>>>>>> cleaning
<<<<<<< HEAD
>>>>>>> cleaning
=======
=======
// yarn add @sendgrid/mail  and then:
const sgMail = require('@sendgrid/mail');

>>>>>>> some changes on sms sender
>>>>>>> some changes on sms sender
/*To use this sample you will first need a SENDGRID account. Once you have your own API credentials, 
create an .env file and set the value as required.*/

//  **** Pricing: ******

//40,000 emails for your first 30 days, then send 100/day, forever : FREE

// ## Configure with Your SENDGRID API Key
sgMail.setApiKey(process.env.SENDGRID_API_KEY);


//Send EMAIL via SENDGRID API
  sgMail.send({to,from,subject,html} )
  console.log({to,from,subject,html})
}

module.exports ={
  emailHandler,
  smsHandler
}
<<<<<<< HEAD

=======
<<<<<<< HEAD
/* POSTMAN JSON POST 
{"sms" :{
    "smsFromNumber":"a",
   "smstoNumber":"b",
  "smsText":"k",
  "smsFREQ":"120000"
},
"email" : {
       "to":"TO@gmail.com",
   "from":"FROM@gmail.com",
  "subject":"REMINDER EMAIL TEST",
    "html":"<div>GOT A EMAIL TEMPLATE</div>",
    "emailFREQ":"12000"
     }   
}*/
=======
>>>>>>> cleaning
>>>>>>> cleaning
