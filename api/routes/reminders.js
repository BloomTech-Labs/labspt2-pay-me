const express = require('express');
const ReminderRouter = express.Router();
const TaskManager = require('../../data/helpers/remindersHelper/TaskManager')

// ** ROUTERS FOR OUR REMINDERS  ** //

// ## GET ALL INVOICES
ReminderRouter.get('/',TaskManager.getInvoices);

// ## SEND A REMINDER
ReminderRouter.post('/user',TaskManager.SendReminders);

// ## CREATE/SAVE A  REMINDER
ReminderRouter.post('/save',TaskManager.SaveReminder);


// ## GET ALL REMINDERS
ReminderRouter.delete('/reminders/view',TaskManager.getRemindersbyInvoiceNumber);

module.exports = ReminderRouter;




