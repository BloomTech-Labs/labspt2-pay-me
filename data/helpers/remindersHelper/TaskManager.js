require('dotenv').config();
const EmailSmsApiConfig =require('./smsEmailSenderApi');
const TimerJob = require( 'timerjobs' ).TimerJobs;
const emailTemplateSample = require('./emailReminderSample')
const db = require('../../dbConfig');
const smsData = EmailSmsApiConfig.smsHandler;
const emailData = EmailSmsApiConfig.emailHandler;



const getInvoices =  async (req, res)=>{
  const {id} = req.params;
  const user =await db('users').select('username', 'email').where('id', id);
  const invoices = await db('invoices').where('user_id', id);
  const filtered_clients = await db('clients');
  //res.status(200).json({'user': user, 'invoices': invoices});
  let sortMyClients = Array();
  invoices.forEach(invoice => {
    filtered_clients.forEach(client => {
      if (invoice.client_id === client.id) {
        sortMyClients.push({
          'invoice': invoice,
          'client': client,
          'user': user[0]
        })
      }
    })
  })
  console.log(await sortMyClients);
  res.status(200).json(await sortMyClients);
}

    const SendReminders= async (req,res)=>{


        const {isCheckedEmail,isCheckedSms,Sms_CustomText,
            Sms_Freq,Email_Subject,Email_CustomText,Email_Template,
            Email_StartDate,Sms_StartDate,Email_Freq, Sms_From,
            Sms_to,invoicePdfLink,invoiceNumber,UserName,clientName,
            Email_From,Email_to}= req.body
      console.log(req.body)
            // if Email_Template
      const HtmlSample =emailTemplateSample(invoiceNumber,clientName,invoicePdfLink,UserName)   
      console.log(Email_StartDate,Sms_StartDate)
      const setToHappenOn = (fn, dateR)=>{
        const now = new Date();
        const nowInNumber = now.getTime();
        const dateReminders = new Date(dateR);
        const dateRemindersInNumber = dateReminders.getTime()
        const diff =  dateRemindersInNumber - nowInNumber;
        return setTimeout(fn, diff);
       }
       
       if(isCheckedEmail){
       const timerEmail= new TimerJob({
        interval:Email_Freq, //emailFREQ, //The interval in milliseconds which the job should be performed
        /*ref : 1day=86400000ms /1week =604800000ms /30days or a month = 2592000000ms */
        immediate: true,  // runs immediately upon starting the timer
        ignoreErrors: true,//<boolean> - Should we ignore errors? Stops execution if false.
        infinite: false,//true<boolean> - Should the timer run forever?
        countdown: 2 // <number> - The number of times the timer should execute // execute until the invoice is paid? or what?
      }, function( done ) {
      //things are happening
       emailData(Email_to,Email_From,Email_Subject,HtmlSample);
       //or emailData(Email_to,Email_From,Email_Subject,Email_CustomText);
      done()
        });
        
        setToHappenOn(()=>{timerEmail.start()},Email_StartDate) ;
       }
      
       if(isCheckedSms){
        const timerSms    = new TimerJob({
          interval:Sms_Freq, //emailFREQ, //The interval in milliseconds which the job should be performed
          /*ref : 1day=86400000ms /1week =604800000ms /30days or a month = 2592000000ms */
          immediate: true,  // runs immediately upon starting the timer
          ignoreErrors: true,//<boolean> - Should we ignore errors? Stops execution if false.
          infinite: false,//true<boolean> - Should the timer run forever?
          countdown: 1 // <number> - The number of times the timer should execute // execute until the invoice is paid? or what?
        }, function( done ) {
        
        
        //things are happening
       // smsData(Sms_From,Sms_to,Sms_CustomText)
        done()
          });
          
          setToHappenOn(()=>{timerSms.start()},Sms_StartDate)
        }
      }



      const SaveReminder =(req,res)=>{
        const dataTobeSaved=req.body;
      //  const invoiceNumber=dataTobeSaved.invoice_number;
      // console.log(invoiceNumber)
        db('reminders').where('invoice_number',dataTobeSaved.invoice_number).then(item =>{
          console.log(item.length)
         if(item.length!==0){
          console.log('found')
         }else{
          console.log('Notfound')
         
            db('reminders')
            .insert(dataTobeSaved)
            .then( reminders_id =>{
              console.log( reminders_id)
            res.status(200).json(reminders_id)
                })}})
  .catch(err =>{
   res.status(500).json(err)
   
  })
 
   }

const getRemindersbyInvoiceNumber =(req,res)=>{
        db.select().table('reminders').then(item =>{
          res.status(200).json(item)})
          .catch(err =>{
          res.status(500).json(err)
        })
      }
module.exports ={
        getRemindersbyInvoiceNumber ,
        SendReminders,
        SaveReminder,
        getInvoices,
      }
      
