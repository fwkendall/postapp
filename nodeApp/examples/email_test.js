/*jslint node: true, es7: true,esversion: 6 */

import nodemailer from 'nodemailer';

var transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: 'developer.mitra85@gmail.com',
    pass: '123@Mitra#1'
  }
});

var mailOptions = {
  from: 'developer.mitra85@gmail.com',
  to: 'mitra.pushan@gmail.com',
  subject: 'Sending Email using Node.js',
  text: 'That was easy!'
};

transporter.sendMail(mailOptions, function(error, info){
  if (error) {
    console.log(error);
  } else {
    console.log('Email sent: ' + info.response);
  }
});
