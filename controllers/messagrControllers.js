const nodemailer = require('nodemailer');
const {checkAdmin} = require("../functions/checkAdmin");
const sqlite = require('sqlite3').verbose();
const db = new sqlite.Database('database.db');

function sendMessage(req, res) {
    const {message, email} = req.body;
    const image = req.file;

    const transporter = nodemailer.createTransport({
        service: 'gmail',
        auth: {
            user: 'sayat.araqelyan9725@gmail.com',
            pass: 'mmsaspkzxfgkflvx',
        },
    });

    const mailOptions = {
        from: email,
        to: 'sayat.araqelyan9725@gmail.com',
        subject: 'New message from website',
        text: message,
        attachments: [
            {
                filename: image.originalname,
                content: image.buffer,
            },
        ],
    };

    transporter.sendMail(mailOptions, (error, info) => {
        if (error) {
            console.error(error);
            return res.status(500).send('Error sending email');
        }

        console.log('Email sent:', info.response);

        const sql = `INSERT INTO SendMessage (image, message, email) VALUES (?, ?, ?)`;
        db.run(sql, [`uploads/users/${req.file.filename}`, message, email], (err) => {
            if (err) {
                console.error(err);
                return res.status(500).send('Error inserting message into database');
            }

            console.log('Message inserted into database successfully');
            return res.status(200).send('Email sent and message inserted into database successfully');
        });
    });
}

function removeMessage(req,res){
    const id = req.params.id;
    const isAdmin = checkAdmin(req, res);
    if (isAdmin) {
        db.run('DELETE FROM SendMessage WHERE id = ?', [id], (error, data) => {
            if (error) {
                res.send(error);
            } else {
                res.status(201).json({msg: "message deleted"});
            }
        })
    } else {
        res.status(401).send({msg: "Denied Access"});
    }

}

module.exports = {
    sendMessage,
    removeMessage
};