const EmailSmsApiConfig =require('./smsEmailSenderApi');
const TimerJob = require( 'timerjobs' ).TimerJobs;
const emailTemplateSample = require('./emailReminderSample')
const ReminderTimer = require('./TimerReminders')
const db = require('../dbConfig');

const smsData = EmailSmsApiConfig.smsHandler;
const emailData = EmailSmsApiConfig.emailHandler;

const tblInvs = 'Invoices';
const tblClt = 'Client';
const tblUsr = 'User';
const tblRem = 'Reminders';
require('dotenv').config();



const getInvoicesbyClientsbyUserId =  async (req, res)=>{
    const {id} = await req.params;
 
      const data_user =await db('users').where('user_id',id).map(item=>{
        return item
      })
    
      const filtered_clients = await db('clients').where('user_id',id).map(item=>{
        return item
      });
    
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

  const StopReminder = async (req,res) =>{
        const {id} = req.params;
        db(tblRem).where({id})
        .del()
        .then(ids =>{
          res.status(200).json(`You've deleted your ${tableName} with id:${ids}`)
        })
        .catch(err =>{
          res.status(500).json(err)
        })
    }
   

  const getAllReminders = (req, res) => {
    db.select().table(`${tableName}`)
      .then(item =>{
        res.status(200).json(item)
      })
      .catch(err =>{
        res.status(500).json(err)
      })
  }

    const SaveReminder =  async (req, res)=>{
          const newItem = await req.body;
          await db(tblRem).insert(newItem)
          .then(id =>{
            res.status(201).json({message :` inserted with ID :${id}`})
          })
          .catch(err =>{
            res.status(500).json(err)
          })
      }
         
   
    const SendReminders= async (req,res)=>{
        const {isCheckedEmail,isCheckedSms,comments,Sms_CustomText,
            Sms_Freq,Email_Subject,Email_CustomText,Email_Template,
            Email_StartDate,Sms_StartDate,Email_Freq, Sms_From,
            Sms_to,invoicePdfLink,invoiceNumber,UserName,clientName,
            Email_From,Email_to}= req.body
      
            // if Email_Template
      const HtmlSample =emailTemplateSample(invoiceNumber,clientName,invoicePdfLink,UserName)   
      
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

module.exports ={
    getInvoicesbyClientsbyUserId,
        StopReminder,
        getAllReminders,
        SendReminders,
        SaveReminder
      }
      