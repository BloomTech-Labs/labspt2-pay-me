require('dotenv').config();
const EmailSmsApiConfig =require('./smsEmailSenderApi');
const TimerJob = require( 'timerjobs' ).TimerJobs;
const emailTemplateSample = require('./emailReminderSample')
<<<<<<< HEAD
<<<<<<< HEAD
const db = require('../../dbConfig');
=======
=======
>>>>>>> Reminders TaskManager completed but need to rename many parameters
<<<<<<< HEAD
//const ReminderTimer = require('./TimerReminders')
const db = require('../../dbConfig');
=======
const ReminderTimer = require('./TimerReminders')
const db = require('../dbConfig');
>>>>>>> revert my fake commit

<<<<<<< HEAD
>>>>>>> revert my fake commit
=======
=======
const db = require('../dbconfig');
>>>>>>> Reminders TaskManager completed but need to rename many parameters
>>>>>>> Reminders TaskManager completed but need to rename many parameters
const smsData = EmailSmsApiConfig.smsHandler;
const emailData = EmailSmsApiConfig.emailHandler;
const tblInvs = 'invoices';
const tblClt = 'clients';
const tblUsr = 'users';
const tblRem = 'reminders';
<<<<<<< HEAD


<<<<<<< HEAD
=======
const tblInvs = 'Invoices';
const tblClt = 'Client';
const tblUsr = 'User';
const tblRem = 'Reminders';
>>>>>>> started to reforctor theReminders backend
=======
>>>>>>> Reminders TaskManager completed but need to rename many parameters

const getInvoices =  async (req, res)=>{
  const {id} = req.params;


<<<<<<< HEAD
<<<<<<< HEAD
  const data_user =await db('users').where('user_id',id).map(item=>{
    return item
  })
   
  const filtered_clients = await db('clients').where('user_id',id).map(item=>{
    return item
  });

=======
=======
>>>>>>> Reminders TaskManager completed but need to rename many parameters
<<<<<<< HEAD
const getInvoicesbyClientsbyUserId =  async (req, res)=>{
    const {id} = await req.params;
>>>>>>> started to reforctor theReminders backend
 
 
  const filtered_clients2 = await db('clients').where('user_id',id).map(item=>{
    return item
  })

 
  const data_invoices =await db('invoices').map(item=>{
    return item
  })
  
  data_invoices.map(invoice => {
    for(let i = 0; i < filtered_clients.length; i++) {
        if (invoice.client_id === filtered_clients[i].client_id) {
          filtered_clients[i] = Object.assign({}, filtered_clients[i], {invoice})
        }
<<<<<<< HEAD
    }
}) ;
/*const data = {
  user:data_user[0],
  client:filtered_clients
}*/
<<<<<<< HEAD

var dataToSend  =filtered_clients.map((item,i)=>{
  const invoice = item.invoice;
 return{
  invoice,
  user:data_user[0],
  client:filtered_clients2[i]
}})
async function senddata(){
  return dataToSend
}

=======
=======
    }) ;
const data = {
      user:data_user,
      client:filtered_clients
    };
   if(data){
    (res.status(200).json(data)
    )
    .catch(err =>{
      res.status(500).json(err)
    })
   }
      
  }      
=======
>>>>>>> started to reforctor theReminders backend
=======
const getInvoices =  async (req, res)=>{
  const {id} = req.params;
>>>>>>> Reminders TaskManager completed but need to rename many parameters


  const data_user =await db('users').where('user_id',id).map(item=>{
    return item
  })
   
<<<<<<< HEAD
>>>>>>> started to reforctor theReminders backend

var dataToSend  =filtered_clients.map((item,i)=>{
  const invoice = item.invoice;
 return{
  invoice,
  user:data_user[0],
  client:filtered_clients2[i]
}})
async function senddata(){
  return dataToSend
}

>>>>>>> Reminders TaskManager completed but need to rename many parameters
=======
  const filtered_clients = await db('clients').where('user_id',id).map(item=>{
    return item
  });

 
 
  const filtered_clients2 = await db('clients').where('user_id',id).map(item=>{
    return item
  })

 
  const data_invoices =await db('invoices').map(item=>{
    return item
  })
  
  data_invoices.map(invoice => {
    for(let i = 0; i < filtered_clients.length; i++) {
        if (invoice.client_id === filtered_clients[i].client_id) {
          filtered_clients[i] = Object.assign({}, filtered_clients[i], {invoice})
        }
    }
}) ;
/*const data = {
  user:data_user[0],
  client:filtered_clients
}*/

var dataToSend  =filtered_clients.map((item,i)=>{
  const invoice = item.invoice;
 return{
  invoice,
  user:data_user[0],
  client:filtered_clients2[i]
}})
async function senddata(){
  return dataToSend
}

>>>>>>> Reminders TaskManager completed but need to rename many parameters
senddata().then(response=>{
  //console.log(response)
  if(response.length!==0){
    res.status(200).json(response)
  }else{
    res.status(203).json([])
  }
}).catch(err =>{res.status(500).json('eeeerror')})
<<<<<<< HEAD

}

=======

}


      
   
>>>>>>> Reminders TaskManager completed but need to rename many parameters
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
        smsData(Sms_From,Sms_to,Sms_CustomText)
        done()
          });
          
          setToHappenOn(()=>{timerSms.start()},Sms_StartDate)
        }
      }

<<<<<<< HEAD
<<<<<<< HEAD

=======
>>>>>>> Reminders TaskManager completed but need to rename many parameters
=======
>>>>>>> Reminders TaskManager completed but need to rename many parameters
     
      const SaveReminder =(req,res)=>{
        console.log(process.env.API_KEY_NEXMO_SMS,process.env.API_SECRET_NEXMO_SMS,process.env.SENDGRID_API_KEY);
        const dataTobeSaved=req.body.data;
        const invoiceNumber=dataTobeSaved.invoiceNumber;
        const Email_Startdate=dataTobeSaved.invoiceNumber.toString;
        const dateobj = new Date(Email_Startdate)
        const B = dateobj.toString()
        console.log(B)
        db('reminder111').where('invoiceNumber',invoiceNumber).then(item =>{
          console.log(item.length)
         if(item.length!==0){
          console.log('found')
         }else{
          console.log('Notfound')
         
            db('reminder111')
            .insert(dataTobeSaved)
            .then( reminders_id =>{
              console.log( reminders_id)
            res.status(200).json(reminders_id)
<<<<<<< HEAD
<<<<<<< HEAD
                })}
        }
       
    
        )
  .catch(err =>{
   res.status(500).json(err)

=======
=======
>>>>>>> Reminders TaskManager completed but need to rename many parameters
                })}})
  .catch(err =>{
   res.status(500).json(err)
   
<<<<<<< HEAD
>>>>>>> Reminders TaskManager completed but need to rename many parameters
=======
>>>>>>> Reminders TaskManager completed but need to rename many parameters
  })
 
   }

<<<<<<< HEAD
<<<<<<< HEAD

=======
=======
>>>>>>> Reminders TaskManager completed but need to rename many parameters
const getRemindersbyInvoiceNumber =(req,res)=>{
        db.select().table('reminder111').then(item =>{
          res.status(200).json(item)})
          .catch(err =>{
          res.status(500).json(err)
        })
      }
<<<<<<< HEAD
>>>>>>> Reminders TaskManager completed but need to rename many parameters
module.exports ={
        getRemindersbyInvoiceNumber ,
=======
module.exports ={
<<<<<<< HEAD
    getInvoicesbyClientsbyUserId,
        StopReminder,
        getAllReminders,
=======
        getRemindersbyInvoiceNumber ,
>>>>>>> Reminders TaskManager completed but need to rename many parameters
>>>>>>> Reminders TaskManager completed but need to rename many parameters
        SendReminders,
        SaveReminder,
        getInvoices,
      }
      
