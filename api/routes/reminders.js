const express = require('express');
const ReminderRouter = express.Router();
const TaskManager = require('../../data/helpers/remindersHelper/TaskManager')

// ** ROUTERS FOR OUR REMINDERS  ** //

<<<<<<< HEAD
// ## GET ALL INVOICES
ReminderRouter.get('/',TaskManager.getInvoices);

// ## Save A REMINDER
=======
// ## GET  REMINDERS
RouterReminder.get('/view',TaskManager.getRemindersbyInvoiceNumber);

//## GET ALL INVOICES BY USER ID
RouterReminder.get('/reminders/invoices/:id',TaskManager.getInvoices);

//## SAVE REMINDERS AND STOP RESEND
>>>>>>> added reminders routes
RouterReminder.post('/save',TaskManager.SaveReminder);

// ## SEND A REMINDER
RouterReminder.post('/send',TaskManager.SendReminders);

// ## GET ALL REMINDERS
ReminderRouter.get('/reminders/view',TaskManager.getRemindersbyInvoiceNumber);

module.exports = ReminderRouter;




