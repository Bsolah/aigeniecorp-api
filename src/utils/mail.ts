// import sgMail from '@sendgrid/mail';
import dotenv from 'dotenv';
// import { BadRequest } from '../errors';
dotenv.config(); // Load .env file with SENDGRID_API_KEY

// const sendMail = async (to: string, subject: string, html: string) => {
//   sgMail.setApiKey(process.env.SENDGRID_API_KEY!);
//   const msg = {
//     to, // Change to your recipient
//     from: 'bisola@niyis.co.uk', // Change to your verified sender
//     subject,
//     html,
//   };

//   try {
//     await sgMail.send(msg);
//   } catch (error) {
//     console.log(error);
//     // throw new BadRequest('Error sending email');
//   }
// };

// export default sendMail;