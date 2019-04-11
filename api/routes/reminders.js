const express = require('express');
const ReminderRouter = express.Router();
const TaskManager = require('../../data/helpers/remindersHelper/TaskManager')

// ** ROUTERS FOR OUR REMINDERS  ** //


//## GET ALL INVOICES BY USER ID
ReminderRouter.get('/reminders/invoices/:id',TaskManager.getInvoices);

//## SAVE REMINDERS AND STOP RESEND
RouterReminder.post('/save',TaskManager.SaveReminder);



// ## SEND A REMINDER
ReminderRouter.post('/send',TaskManager.SendReminders);

// ## GET ALL REMINDERS
ReminderRouter.get('/reminders/view',TaskManager.getRemindersbyInvoiceNumber);

module.exports = ReminderRouter;




