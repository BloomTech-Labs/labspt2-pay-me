const express = require('express');
const ReminderRouter = express.Router();
const TaskManager = require('../../data/helpers/remindersHelper/TaskManager')

// ** ROUTERS FOR OUR REMINDERS  ** //

// ## GET  REMINDERS
ReminderRouter.get('/view',TaskManager.getRemindersbyInvoiceNumber);

//## GET ALL INVOICES BY USER ID
ReminderRouter.get('/invoices/:id',TaskManager.getInvoices);

//## SAVE REMINDERS AND STOP RESEND
ReminderRouter.post('/save',TaskManager.SaveReminder);

// ## SEND A REMINDER
ReminderRouter.post('/send',TaskManager.SendReminders);

// ## SEND A REMINDER
ReminderRouter.get('/test/:id',TaskManager.getInvoice);







module.exports = ReminderRouter;




