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
ReminderRouter.get('/view',TaskManager.getRemindersbyInvoiceNumber);

//## GET ALL INVOICES BY USER ID
ReminderRouter.get('/reminders/invoices/:id',TaskManager.getInvoices);

//## SAVE REMINDERS AND STOP RESEND
<<<<<<< HEAD
>>>>>>> added reminders routes
RouterReminder.post('/save',TaskManager.SaveReminder);
=======
ReminderRouter.post('/save',TaskManager.SaveReminder);
>>>>>>> completed reminders with all features set, next step polishing and rename parameters

// ## SEND A REMINDER
ReminderRouter.post('/send',TaskManager.SendReminders);

// ## GET ALL REMINDERS
ReminderRouter.get('/reminders/view',TaskManager.getRemindersbyInvoiceNumber);

module.exports = ReminderRouter;




