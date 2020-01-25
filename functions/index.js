
const functions = require('firebase-functions');
const admin = require('firebase-admin');
const nodemailer = require('nodemailer');
const cors = require('cors')({ origin: true });
admin.initializeApp();

/**
* Here we're using Gmail to send 
*/
let transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
        user: 'idanlevi2@gmail.com',
        pass: 'ebkvatzfszgmkxpf'
    }
});

exports.sendMail = functions.https.onRequest((req, res) => {
    console.log("TCL: req, res", req, res)
    cors(req, res, () => {

        // getting dest email by query string
        const dest = req.query.dest || 'idanlevi2@gmail.coms';

        const mailOptions = {
            from: 'סטארטאח', // Something like: Jane Doe <janedoe@gmail.com>
            to: dest,
            subject: 'הודעה חדשה', // email subject
            html: `<p style="font-size: 16px;">new Message!!</p>
                <br />
                <img src="https://images.prod.meredith.com/product/fc8754735c8a9b4aebb786278e7265a5/1538025388228/l/rick-and-morty-pickle-rick-sticker" />
            ` // email content in HTML
        };

        // returning result
        return transporter.sendMail(mailOptions, (err, info) => {
            if (err) {
                return res.send(err.toString());
            }
            return res.send('Sended');
        });
    });
});
