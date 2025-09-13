// nodemailer/emailservice.js
const nodemailer = require("nodemailer");

let transporter;

const initialTransporter = async () => {
  if (!transporter) {
    transporter = nodemailer.createTransport({
      host: "smtp.gmail.com", 
      port: 465,              
      secure: true,           
      auth: {
        user: process.env.SMTP_EMAIL,     
        pass: process.env.SMTP_PASSWORD,  
      },
    });

    console.log("📧 Nodemailer initialized with Gmail transporter");
  }
  return transporter;
};

const sendEmail = async ({ to, subject, text, html }) => {
  const transporter = await initialTransporter();

  const info = await transporter.sendMail({
    from: `"My App" <${process.env.SMTP_EMAIL}>`, 
    to,        
    subject,   
    text,      
    html,      
  });

  console.log("📩 Email sent: %s", info.messageId);
  return info;
};

module.exports = sendEmail;