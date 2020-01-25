
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
        user: 'user@gmail.com',
        pass: 'password'
    }
});

exports.sendMail = functions.https.onRequest((req, res) => {
    console.log("TCL: req, res", req, res)
    cors(req, res, () => {
        // getting dest email by query string
        const { name, email, phone, content } = req.query
        const mailOptions = {
            from: 'user@gmail.com',
            to: 'idanlevi2@gmail.com', //TODO: dest
            subject: `הודעה חדשה מ${name}`,
            html: `<p style="font-size: 16px;">פרטי משתמש</p>
                <br />
                <p><b>שם:</b>${name}</p>
                <p><b>אימייל:</b>${email}</p>
                <p><b>פלאפון:</b>${phone}</p>
                <br />
                <p style="font-size: 16px;"><b>תוכן:</b></p>
                <p>${content}</p>
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
