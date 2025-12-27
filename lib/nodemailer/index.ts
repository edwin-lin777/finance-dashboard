import nodemailer from 'nodemailer'
import { WELCOME_EMAIL_TEMPLATE } from './template'

export const transporter = nodemailer.createTransport({

    service: 'gmail',
    auth: {
        user: process.env.NODEMAILER_EMAIL,
        pass: process.env.NODEMAILER_PASSWORD,
    }
})

export const sendWelcomeEmail = async ({email, name, intro}: WelcomeEmailData) => {
    const htmlTemplate = WELCOME_EMAIL_TEMPLATE
        .replace('{{name}}', name)
        .replace('{{intro}}', intro);

    const mailOptions = {
        from: '"Finance Dashboard <burgerTrades>"',
        to: email,
        subject: 'Welcome, to your new trading companion',
        html: htmlTemplate,
    }
    await transporter.sendMail(mailOptions)
}
export const sendResetPasswordEmail = async ({ email, url }: ResetPasswordEmailData) => {
  const mailOptions = {
    from: '"Finance Dashboard <burgerTrades>"',
    to: email,
    subject: 'Reset Your Password',
    html: `<p>Click the link below to reset your password:</p>
           <p><a href="${url}">${url}</a></p>
           <p>If you did not request a password reset, ignore this email.</p>`,
  };

  await transporter.sendMail(mailOptions);
  console.log(`Reset password email sent to ${email}`);
};



