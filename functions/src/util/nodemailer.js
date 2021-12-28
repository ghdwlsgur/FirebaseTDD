'use strict';

const nodemailer = require('nodemailer');
// const functions = require('firebase-functions');
const emailService = require('../config/email.json');

exports = module.exports = ({
  senderName = 'Email Verification Test',
  destination,
  title = '이메일 인증 테스트입니다.',
  body = 'good',
  user = emailService.email,
  pass = emailService.password,
}) => {
  return new Promise((resolve, reject) => {
    const transporter = nodemailer.createTransport({
      host: 'smtp.gmail.com',
      port: 587,
      secure: false,
      auth: { user, pass },
    });
    transporter.sendMail(
      {
        from: `${senderName} ${user}`,
        to: destination,
        subject: title,
        html: `<p>${body}</p>`,
      },
      (err, res) => {
        if (err) reject(err);
        else resolve(res);
        transporter.close();
      },
    );
  });
};
