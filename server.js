import express from 'express';
import cors from 'cors';
import nodemailer from 'nodemailer';
import dotenv from 'dotenv';
import multer from 'multer';

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors());
app.use(express.json());
// Setup multer for parsing multipart/form-data
const upload = multer();

// Configure Nodemailer transporter
const transporter = nodemailer.createTransport({
  host: process.env.SMTP_HOST || 'smtp.gmail.com',
  port: process.env.SMTP_PORT || 465,
  secure: true, // true for 465, false for other ports
  auth: {
    user: process.env.SMTP_USER,
    pass: process.env.SMTP_PASS,
  },
});

app.post('/api/submit', upload.none(), async (req, res) => {
  try {
    const formData = req.body;
    
    // Construct email content based on form data
    const formType = formData.university_name ? 'Workshop Registration' : 'Course Registration';
    
    let htmlContent = `<h2>New ${formType} Received</h2>`;
    htmlContent += `<table border="1" cellpadding="10" style="border-collapse: collapse; min-width: 300px;">`;
    
    for (const [key, value] of Object.entries(formData)) {
      if (key !== 'decl_accuracy' && key !== 'decl_rules' && key !== 'decl_terms') {
        const formattedKey = key.split('_').map(word => word.charAt(0).toUpperCase() + word.slice(1)).join(' ');
        htmlContent += `<tr><td style="font-weight: bold;">${formattedKey}</td><td>${value}</td></tr>`;
      }
    }
    
    htmlContent += `</table>`;

    // Mail options
    const mailOptions = {
      from: `"Registration Portal" <${process.env.SMTP_USER}>`,
      to: process.env.RECEIVER_EMAIL || process.env.SMTP_USER, // send to RECEIVER_EMAIL or self
      subject: `New ${formType} from ${formData.name}`,
      html: htmlContent,
    };

    // Attempt to send email
    if (process.env.SMTP_USER && process.env.SMTP_PASS && process.env.SMTP_USER !== 'your_email@gmail.com') {
      await transporter.sendMail(mailOptions);
      console.log('Admin email sent successfully.');
      
      // Send a confirmation email to the user if email field is present
      if (formData.email) {
        const confirmationHtml = `
          <h2>Registration Successful</h2>
          <p>Hi ${formData.name},</p>
          <p>Thank you for submitting your detailed registration for <strong>${formType}</strong>.</p>
          <p>We have successfully received your information.</p>
          <br/>
          <p>Best Regards,</p>
          <p>The Training Team</p>
        `;

        await transporter.sendMail({
          from: `"Registration Portal" <${process.env.SMTP_USER}>`,
          to: formData.email,
          subject: `${formType} - Application Received`,
          html: confirmationHtml,
        });
        console.log(`Confirmation email sent to ${formData.email}.`);
      }
    } else {
      console.log('Skipping email send. Credentials are not configured in .env file.');
      console.log("Form Data Received:", formData);
    }

    res.status(200).json({ success: true, message: 'Registration successfully received.' });
  } catch (error) {
    console.error('Error processing form submission:', error);
    res.status(500).json({ success: false, message: 'An error occurred while processing the request.', error: error.message });
  }
});

app.listen(PORT, () => {
  console.log(`Backend Server running on http://localhost:${PORT}`);
  if (!process.env.SMTP_USER || process.env.SMTP_USER === 'your_email@gmail.com') {
    console.warn(`[WARNING] Set your SMTP credentials in the .env file to actually send emails!`);
  }
});
