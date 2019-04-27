const express = require('express');
const ReminderRouter = express.Router();
const TaskManager = require('../../data/helpers/remindersHelper/TaskManager')

// ** ROUTERS FOR OUR REMINDERS  ** //

// ## GET ALL INVOICES
ReminderRouter.get('/',TaskManager.getInvoices);

// ## Save A REMINDER
RouterReminder.post('/save',TaskManager.SaveReminder);

// ## SEND A REMINDER
RouterReminder.post('/send',TaskManager.SendReminders);

// ## GET ALL REMINDERS
ReminderRouter.get('/reminders/view',TaskManager.getRemindersbyInvoiceNumber);

module.exports = ReminderRouter;




