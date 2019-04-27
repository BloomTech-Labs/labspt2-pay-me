const express = require('express');
const ReminderRouter = express.Router();
const TaskManager = require('../../data/helpers/remindersHelper/TaskManager')

// ** ROUTERS FOR OUR REMINDERS  ** //

// ## GET  REMINDERS
RouterReminder.get('/view',TaskManager.getRemindersbyInvoiceNumber);

//## GET ALL INVOICES BY USER ID
RouterReminder.get('/reminders/invoices/:id',TaskManager.getInvoices);


// ## SEND A REMINDER
RouterReminder.post('/send',TaskManager.SendReminders);


// ## Save A REMINDER
ReminderRouter.post('/send',TaskManager.SaveReminder);



module.exports = ReminderRouter;




