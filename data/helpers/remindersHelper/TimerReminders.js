require('dotenv').config();
const express = require('express');
const server = express();
const TaskManager =require('./smsEmailSender');
const TimerJob = require( 'timerjobs' ).TimerJobs;
const emailTemplateSample = require('./emailReminderSample')

const smsData = TaskManager.smsHandler;
const emailData = TaskManager.emailHandler;

const reminders = (req,res)=>{
  const {isCheckedEmail,isCheckedSms,comments,Sms_CustomText,Sms_Freq,Email_Subject,Email_CustomText,Email_Template,Email_StartDate,
    Sms_StartDate,Email_Freq, Sms_From,Sms_to,invoicePdfLink,invoiceNumber,UserName,clientName,Email_From,Email_to}=req.body

// for email template
const HtmlSample =emailTemplateSample(invoiceNumber,clientName,invoicePdfLink,UserName)   

//Should start reminders on given date and time
const setToHappenOn = (fn, dateR)=>{
  const now = new Date();
  const nowInNumber = now.getTime();
  const dateReminders = new Date(dateR);
  const dateRemindersInNumber = dateReminders.getTime()
  const diff =  dateRemindersInNumber - nowInNumber;
  return setTimeout(fn, diff);
 }
 
 if(isCheckedEmail){ //user can switch on/off Email reminder
 const timerEmail= new TimerJob({
  interval:Email_Freq, //emailFREQ, //The interval in milliseconds which the job should be performed
  /*ref : 1day=86400000ms /1week =604800000ms /30days or a month = 2592000000ms */
  immediate: true,  // runs immediately upon starting the timer
  ignoreErrors: true,//<boolean> - Should we ignore errors? Stops execution if false.
  infinite: false,//true<boolean> - Should the timer run forever?
  countdown: 2 // <number> - The number of times the timer should execute // execute until the invoice is paid? or what?
}, function( done ) {
  console.log('hello Email')
//things are happening
 emailData(Email_to,Email_From,Email_Subject,Email_CustomText);
done()
  });
  
  setToHappenOn(()=>{timerEmail.start()},Email_StartDate) ;
 }

 if(isCheckedSms){//user can switch on/off Sms reminder
  const timerSms    = new TimerJob({
    interval:Sms_Freq, //emailFREQ, //The interval in milliseconds which the job should be performed
    /*ref : 1day=86400000ms /1week =604800000ms /30days or a month = 2592000000ms */
    immediate: true,  // runs immediately upon starting the timer
    ignoreErrors: true,//<boolean> - Should we ignore errors? Stops execution if false.
    infinite: false,//true<boolean> - Should the timer run forever?
    countdown: 1 // <number> - The number of times the timer should execute // execute until the invoice is paid? or what?
  }, function( done ) {
  
  
  //things are happening
  console.log('hello Sms')
  //smsData(Sms_From,Sms_to,Sms_CustomText)
  done()
    });
    
    setToHappenOn(()=>{timerSms.start()},Sms_StartDate)
  }
})



server.listen(5001, () => {
    console.log(`\n** Server is listening on port: ${PORT} **\n`);
})

     
     
  