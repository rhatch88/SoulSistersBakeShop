/*const server = require('server');
const { get } = server.router;
const { render } = server.reply;

server([
  get('/', ctx => render('index.html')),

]);*/
const express = require('express');
const path = require('path');
/*const nodemailer = require('nodemailer');
const axios = require('axios');*/
const dotenv = require('dotenv');
/*const request = require('request');
*/
dotenv.config();
const app = express();
const PORT = process.env.PORT || 3000;

/* Serve static files from the 'public' directory*/
app.use(express.static(path.join(__dirname, 'public')));
/*app.use(express.urlencoded({ extended: false }));
app.use(express.json());*/

// Replace with your actual Google Maps API key
const apiKey = process.env.GOOGLE_MAPS_API_KEY;

// Proxy for Google Maps API
/*app.get('/maps-api', (req, res) => {
    const url = `https://maps.googleapis.com/maps/api/js?key=${apiKey}&callback=initMap&libraries=&v=weekly`;
    request(url).pipe(res);
});*/

/* Nodemailer configuration
const transporter = nodemailer.createTransport({
    service: 'yahoo',
    auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS
    }
});

// Handle form submissions for sending emails
app.post('/email', (req, res) => {
    const { email, subject, text } = req.body;

    const mailOptions = {
        from: email,
        to: 'ssbsjeff@yahoo.com',
        subject: subject || 'Contact Form Submission',
        text: text || 'No message provided'
    };

    transporter.sendMail(mailOptions, (error, info) => {
        if (error) {
            console.error('Error sending email:', error);
            return res.status(500).send('Error sending email');
        }
        console.log('Email sent:', info.response);
        res.send('Email received!');
    });
});*/

// Handle form submissions for saving data
/*app.post('/submit-form', async (req, res) => {
    const formData = req.body;

    const config = {
        method: 'post',
        maxBodyLength: Infinity,
        url: 'https://getpantry.cloud/apiv1/pantry/16cf521b-5c4d-4f8a-9dd2-0dfe851d2e89/basket/SoulSistersBakeShopForm',
        headers: { 
            'Content-Type': 'application/json'
        },
        data: formData
    };

    try {
        const response = await axios(config);
        console.log(response.data);
        res.status(200).send('Form data saved successfully');
    } catch (error) {
        console.error('Error saving form data:', error);
        res.status(500).send('Error saving form data');
    }
});*/

// Serve the main page
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

// Start the server
app.listen(PORT, () => console.log(`Server is running on http://localhost:${PORT}`));
