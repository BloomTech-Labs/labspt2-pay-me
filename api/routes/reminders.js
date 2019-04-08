const express = require('express');
const ReminderRouter = express.Router();
const TaskManager = require('../../data/helpers/remindersHelper/TaskManager')

// ** ROUTERS FOR OUR REMINDERS  ** //

// ## GET ALL REMINDERS
ReminderRouter.get('/',TaskManager.getAllReminders);

// ## SEND A REMINDER
ReminderRouter.post('/user',TaskManager.SendReminders);

// ## CREATE/SAVE A  REMINDER
ReminderRouter.post('/save',TaskManager.SaveReminder);


// ## DESTROY/STOP A  REMINDER
ReminderRouter.delete('/delete/:_id',TaskManager.StopReminder);

module.exports = ReminderRouter;





module.exports = router;



