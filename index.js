require('dotenv').config();
const axios = require("axios");
const express = require("express");
const cors = require("cors");
const bodyParser = require('body-parser');
const moment = require('moment');
const nodemailer = require("nodemailer");

const app = express();
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

app.post('/sendtoclients', async (req, res) => {
    const { name, email, message, subject } = req.body;
    try {
      const transporter = nodemailer.createTransport({
        host: process.env.HOST,
        port: process.env.EMAILPORT,
        secure: false,
        auth: {
          user: process.env.USER,
          pass: process.env.PASS,
        },
        requireTLS:false,
        rejectUnauthorized: false,
        tls:{
            rejectUnauthorized:false,
        }
      });
  
      transporter.sendMail({
        from: process.env.USER,
        to: email,
        subject: subject,
  
        html: `<p>Hello, ${name} ,${message}</p>`
      }).then(() => {
        res.status(200).json({ message: "email deliverd" });
      }).catch((error) => {
        res.status(400).json({ message: "error: " + error?.message });
      })
    } catch (error) {
      res.status(400).json({ message: error?.mesage });
    }
  });
  app.listen(process.env.PORT, () => {
    console.log("Listening on port : " + process.env.PORT)
  });