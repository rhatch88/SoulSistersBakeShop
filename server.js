const express = require('express');
const nodemailer = require('nodemailer');
const path = require('path');




const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(express.static('public'));
app.use(express.json());

app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, '/public/index.html'));
});

app.post('/', (req, res) => {
    console.log(req.body);
    
    const transporter = nodemailer.createTransport({
        service: 'gmail',
        auth: {
            user: process.env.EMAIL_USER,
            pass: process.env.EMAIL_PASS
        }
    });

    const mailOptions = {
        from: req.body.email,
        to: 'rhatch88@gmail.com',
        subject: `Message from ${req.body.name}: ${req.body.subject}`,
        text: req.body.message
    };

    transporter.sendMail(mailOptions, (error, info) => {
        if (error) {
            console.log(error);
            res.status(500).send(JSON.stringify({ message: 'error' }));
        } else {
            console.log('Email sent: ' + info.response);
            res.status(200).send(JSON.stringify({ message: 'success' }));
        }
    });
});

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
