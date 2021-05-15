const nodemailer = require('nodemailer');

module.exports = {
  sendMail: async ({
    to, cc, bcc, subject, html
  }) => {
    try {
      const transporter = nodemailer.createTransport({
        host: process.env.MAIL_SMTP_HOST,
        port: process.env.MAIL_SMTP_PORT,
        secureConnection: process.env.MAIL_SMTP_SECURE,
        auth: {
          user: process.env.MAIL_SMTP_USER,
          pass: process.env.MAIL_SMTP_PASS
        }
      });

      return transporter.sendMail({
        from: process.env.MAIL_SMTP_FROM, // sender address
        to,
        cc,
        bcc,
        subject,
        html
      });
    } catch (error) {
      return null;
    }
  }
};
