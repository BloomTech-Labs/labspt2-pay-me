const express = require('express');
const router = express.Router();
const bcrypt = require('bcryptjs');
const db = require('../../data/helpers/usersHelper');

router.get('/', async (req, res) => {
    db.getAll()
    .then((users) => {
        res.status(200).json(users)
    })
    .catch((err) => {
        res.status(500).json(err)
    })
});

router.get('/:id', async (req, res) => {
    const { id } = req.params;
    await db.findById(id)
    .then ((user) => {
        res.json(user)
    })
    .catch(err => {
        res.status(500).json({ message: 'Unable to find user by id'})
    })
});

router.put('/:id', (req, res, next) => {
    db.findById(req.body.id || req.params.id).then((user) => {
        const id = user[0].id; // Get the first user in the array
        console.log(user);
        // The old password was being sent as old_password. This whole check failed - Jason
        if(req.body.old_password) {
            // Reminder: the database sends objects back in arrays
            if(bcrypt.compareSync(req.body.old_password, user[0].password)) { // get the first user in the array
                const hash = bcrypt.hashSync(req.body.new_password);
                // update object
                const edit = {
                    email: req.body.email,
                    password: hash
                };
                console.log(id, edit)
                //db function to update user
                db.editUser(id, edit)
                .then((updated) => {
                    console.log(updated)
                    if (updated) {
                        res.status(200).json({
                            message:'User is updated'
                        });
                    } else {
                        res.status(404).json({ error: 'User is missing!'})
                    }
                })
                .catch((error) => {
                    next('h500', error)
                });
            } else {
                res.status(401).json({ error: 'The password you entered is incorrect'});
            }
        }
    })
});

router.post('/send', async (req, res) => {
    const output = `
        <p>You have a new contact request</p>
        <h3>Contact Details</h3>
        <ul>
            <li>Name: ${req.body.name}</li>
            <li>Company: ${req.body.company}</li>
            <li>Email: ${req.body.email}</li>
        </ul>
        <h3>Message</h3> 
        <p>${req.body.message}</p>
    `;

    // Nodemailer
    const nodemailer = require("nodemailer");

// async..await is not allowed in global scope, must use a wrapper
async function main(){

  // Generate test SMTP service account from ethereal.email
  // Only needed if you don't have a real mail account for testing
  let testAccount = await nodemailer.createTestAccount();

  // create reusable transporter object using the default SMTP transport
  const transporter = nodemailer.createTransport({
        host: 'smtp.ethereal.email',
        port: 587,
        auth: {
            user: 'issac.harber29@ethereal.email',
            pass: 'MjCqjYrPwGy2D434G1'
        }
    });

  // send mail with defined transport object
  let info = await transporter.sendMail({
    from: '"Pay Me" <issac.harber29@ethereal.email>', // sender address
    to: "issac.harber29@ethereal.email", // list of receivers
    subject: "Pay Me Contact Request", // Subject line
    text: req.body.message, // plain text body
    html: output // html body
  });

  console.log("Message sent: %s", info.messageId);
  // Message sent: <b658f8ca-6296-ccf4-8306-87d57a0b4321@example.com>

  // Preview only available when sending through an Ethereal account
  console.log("Preview URL: %s", nodemailer.getTestMessageUrl(info));
  // Preview URL: https://ethereal.email/message/WaQKMgKddxQDoou...
  res.status(200).json({ message: 'Success!'})
}

main().catch(console.error);

});

module.exports = router;