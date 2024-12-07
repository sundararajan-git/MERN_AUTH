import nodemailer from "nodemailer"
import { resetPasswordTemplate, resetSuccessTemplate, sendWelcomeTemplate, verificationTemplate } from "../MAIL TEMPLATE/Template.js";


// SEND VERIFYCATION TOKEN
export const sendVerificationMail = async (emailDetails) => {
    try {
        var transporter = nodemailer.createTransport({
            service: 'gmail',
            auth: {
                user: process.env.EMAIL_FROM,
                pass: process.env.EMAIL_PASSWORD
            }
        });

        var mailOptions = {
            from: process.env.EMAIL_FROM,
            to: emailDetails.email,
            subject: 'Verify Your Email',
            html: verificationTemplate(emailDetails.token)
        };
        transporter.sendMail(mailOptions, function (error, info) {
            if (error) {
                console.log(error);
            } else {
                console.log('Email sent: ' + info.response);
            }
        });
        return true
    } catch (err) {
        console.error(err.message, "sendVerificationMail")
    }
}

// SEND WELCOME EMAIL
export const sendWelcome = (emailDetails) => {
    try {
        var transporter = nodemailer.createTransport({
            service: 'gmail',
            auth: {
                user: process.env.EMAIL_FROM,
                pass: process.env.EMAIL_PASSWORD
            }
        });
        var mailOptions = {
            from: process.env.EMAIL_FROM,
            to: emailDetails.email,
            subject: 'Welcome',
            html: sendWelcomeTemplate(emailDetails.name)
        };
        transporter.sendMail(mailOptions, function (error, info) {
            if (error) {
                console.log(error);
            } else {
                console.log('Email sent: ' + info.response);
            }
        });
        return true
    } catch (err) {
        console.error(err)
    }
}


// SEND PASSWORD RESET EMAIL
export const sendPasswordResetEmail = (emailDetails) => {
    try {
        var transporter = nodemailer.createTransport({
            service: 'gmail',
            auth: {
                user: process.env.EMAIL_FROM,
                pass: process.env.EMAIL_PASSWORD
            }
        });
        var mailOptions = {
            from: process.env.EMAIL_FROM,
            to: emailDetails.email,
            subject: 'Reset Password',
            html: resetPasswordTemplate(emailDetails.link)
        };
        transporter.sendMail(mailOptions, function (error, info) {
            if (error) {
                console.log(error);
            } else {
                console.log('Email sent: ' + info.response);
            }
        });
        return true
    } catch (err) {
        console.error(err)
    }
}


// SEND RESET PASSWORD SUCCESSFULLY
export const sendResetSuccessful = (emailDetails) => {
    try {
        var transporter = nodemailer.createTransport({
            service: 'gmail',
            auth: {
                user: process.env.EMAIL_FROM,
                pass: process.env.EMAIL_PASSWORD
            }
        });
        var mailOptions = {
            from: process.env.EMAIL_FROM,
            to: emailDetails.email,
            subject: 'Reset Password',
            html: resetSuccessTemplate()
        };
        transporter.sendMail(mailOptions, function (error, info) {
            if (error) {
                console.log(error);
            } else {
                console.log('Email sent: ' + info.response);
            }
        });
        return true
    } catch (err) {
        console.error(err)
    }
} 